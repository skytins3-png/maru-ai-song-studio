(function () {
  'use strict';

  var MODE_KEY = 'maru-bigo-audio-live-prepared-v1';
  var wakeLock = null;
  var active = false;
  var backgroundResumeTimer = 0;
  var backgroundResumeTimers = [];
  var resumeInFlight = false;
  var interruptionKey = 'maru-background-audio-status-v0247';
  var lastAudioStatus = null;

  // The web platform cannot observe Android's audio-focus owner directly.
  // Record real HTMLMediaElement events to distinguish pause from Android mute.
  function recordAudioState(cause, extra) {
    var media = currentMedia();
    var state = {
      at: Date.now(),
      cause: cause,
      expected: shouldResumePlayback(),
      hidden: document.visibilityState === 'hidden',
      paused: media ? !!media.paused : true,
      ended: media ? !!media.ended : false,
      muted: media ? !!media.muted : false,
      elementVolume: media ? Number(media.volume) : null,
      seconds: media ? Math.round((Number(media.currentTime) || 0) * 10) / 10 : 0,
      error: extra || ''
    };
    lastAudioStatus = state;
    try { localStorage.setItem(interruptionKey, JSON.stringify(state)); } catch (_) {}
    showAudioState();
  }
  function showAudioState() {
    var box = $('maruBackgroundAudioState');
    if (!box || !lastAudioStatus) return;
    var s = lastAudioStatus;
    var hint = s.expected && s.paused
      ? '방송 재생은 켜져 있지만 음악이 일시정지되었습니다. 복구를 시도합니다.'
      : s.expected && !s.paused
        ? '재생기는 작동 중입니다. 소리가 안 들리면 휴대폰의 오디오 우선권 충돌 가능성이 있습니다.'
        : '수동 일시정지 또는 방송 대기 상태입니다.';
    if (s.cause === 'resume-failed') hint = '다른 앱 사용 중 자동 재생이 차단되었습니다. 돌아오면 재시도합니다.';
    if (s.cause === 'resume-ok') hint = '중단된 음악 재생을 다시 시작했습니다.';
    if (s.cause === 'focus-session-pause') hint = '다른 앱으로 이동한 상태에서 재생 중단 신호가 왔습니다. 방송곡은 종료하지 않고 복구를 시도합니다.';
    if (s.cause === 'sound-output-reconnected') hint = '소리 출력 연결을 다시 요청했습니다. 실제 미디어·통화 음량은 갤럭시가 제어합니다.';
    if (s.cause === 'sound-recovery-failed') hint = '소리 복구가 거부되었습니다. 다른 앱의 오디오 사용이 끝나면 다시 시도하세요.';
    if (s.muted && s.expected) hint = 'MARU 오디오 요소가 음소거 상태입니다. 🔊 소리 복구를 눌러주세요.';
    box.textContent = '🎵 다른 앱 재생 점검 · ' + hint;
    box.dataset.state = s.cause === 'resume-failed' ? 'warn' : 'ready';
  }

  function $(id) { return document.getElementById(id); }
  function status(message, state) {
    var el = $('bigoAudioLiveStatus');
    if (!el) return;
    el.dataset.state = state || 'idle';
    el.textContent = message;
  }

  async function requestWakeLock() {
    if (!active || !('wakeLock' in navigator) || document.visibilityState !== 'visible') return;
    try {
      wakeLock = await navigator.wakeLock.request('screen');
      wakeLock.addEventListener('release', function () { wakeLock = null; });
    } catch (_) {
      status('준비됨 · 화면 자동 꺼짐 방지는 지원되지 않습니다. BIGO에서 오디오 LIVE를 직접 시작하세요.', 'warn');
    }
  }

  function currentMedia() {
    // Prefer the real playback engine, including Android's detached Audio object.
    var activePlayer = typeof window.maruCurrentBroadcastMedia === 'function'
      ? window.maruCurrentBroadcastMedia() : null;
    if (activePlayer && activePlayer.getAttribute('src')) return activePlayer;
    var video = $('broadcastVideoPlayer');
    var audio = $('broadcastAudio');
    if (video && video.getAttribute('src') && video.style.display !== 'none') return video;
    return audio && audio.getAttribute('src') ? audio : null;
  }

  function shouldResumePlayback() {
    // Only resume if the MARU playlist is actually meant to be playing.
    // A user-initiated pause must stay paused even when the app is hidden.
    try {
      return typeof broadcastRunning !== 'undefined' &&
        typeof broadcastPaused !== 'undefined' && broadcastRunning && !broadcastPaused;
    } catch (_) { return false; }
  }

  function updateMetadata() {
    if (!('mediaSession' in navigator) || typeof MediaMetadata === 'undefined') return;
    var media = currentMedia();
    var source = media && (media.currentSrc || media.src) || '';
    // Object URLs do not contain the song title; use MARU's actual playlist metadata.
    var title = typeof window.maruBroadcastCurrentTrackTitle === 'function'
      ? window.maruBroadcastCurrentTrackTitle() : (source ? decodeURIComponent(source.split('/').pop().split('?')[0]) : 'MARU 원곡 방송');
    try {
      navigator.mediaSession.metadata = new MediaMetadata({ title: title, artist: 'MARU WORLD MUSIC MAKER', album: 'BIGO 오디오 LIVE' });
      navigator.mediaSession.playbackState = media && !media.paused ? 'playing' : 'paused';
    } catch (_) {}
  }

  async function keepBackgroundPlaying() {
    if (!active || !shouldResumePlayback() || resumeInFlight) return;
    var media = currentMedia();
    if (!media || !media.getAttribute('src') || media.ended) { updateMetadata(); return; }
    // A focus-induced mute can leave .paused=false. HTML has no API to override
    // Android's enforced audio focus. Never restart a playing song from 0.
    if (!media.paused) { updateMetadata(); return; }
    resumeInFlight = true;
    try {
      await media.play();
      recordAudioState('resume-ok');
    } catch (err) {
      recordAudioState('resume-failed', err && err.name ? err.name : 'play-rejected');
    } finally {
      resumeInFlight = false;
      updateMetadata();
    }
  }

  async function recoverSound() {
    var media = currentMedia();
    if (!media || !media.getAttribute('src')) {
      status('먼저 MARU 원곡 방송을 재생하세요. 파일·목록은 그대로 유지됩니다.', 'warn');
      return false;
    }
    var buttons = [$('broadcastSoundRestore'), $('bigoAudioRecover')];
    buttons.forEach(function (b) { if (b) b.disabled = true; });
    var at = Number.isFinite(media.currentTime) ? media.currentTime : 0;
    try {
      // Refresh this existing Android media session in a real user gesture.
      // Do not reload the page, replace the Blob URL or decode/remaster audio.
      media.muted = false;
      media.defaultMuted = false;
      try { media.volume = 1; } catch (_) {}
      if (!shouldResumePlayback()) {
        if (typeof broadcastStartOrResume !== 'function') throw new Error('재생 대기 상태');
        await broadcastStartOrResume();
      } else {
        // If audio focus dropped output while paused=false, pause/play reissues
        // a playback request without recreating the track or seeking to 0.
        if (!media.paused) media.pause();
        await media.play();
      }
      updateMetadata();
      recordAudioState('sound-output-reconnected');
      status('MARU 음악 출력 다시 연결 요청 완료 · 현재 곡 ' + Math.round(at) + '초 위치 유지. 소리가 없으면 BIGO의 오디오 경로/우선권을 확인해야 합니다.', 'ready');
      return true;
    } catch (err) {
      var reason = err && err.name ? err.name : '재생 차단';
      recordAudioState('sound-recovery-failed', reason);
      status('소리 복구 실패 (' + reason + ') · BIGO가 오디오를 독점 사용 중일 수 있습니다. MARU로 돌아와 다시 눌러주세요.', 'warn');
      return false;
    } finally {
      buttons.forEach(function (b) { if (b) b.disabled = false; });
    }
  }
  function scheduleBackgroundResume() {
    clearTimeout(backgroundResumeTimer);
    backgroundResumeTimers.forEach(clearTimeout);
    // Capped recovery only: do not spin or repeatedly seize audio focus from
    // an active call/voice session in another app.
    backgroundResumeTimers = [300, 1600, 4500].map(function (delay) {
      return setTimeout(keepBackgroundPlaying, delay);
    });
  }
  function recoverOnReturn() {
    if (!active || !shouldResumePlayback()) return;
    updateMetadata();
    recordAudioState('return-check');
    scheduleBackgroundResume();
  }

  function clickEnabled(id) {
    var button = $(id);
    if (!button || button.disabled) return false;
    button.click();
    return true;
  }

  function installMediaControls() {
    if (!('mediaSession' in navigator)) return;
    var actions = {
      play: function () {
        if (typeof broadcastStartOrResume === 'function') {
          Promise.resolve(broadcastStartOrResume()).then(updateMetadata).catch(function () {});
        } else {
          var m = currentMedia(); if (m) m.play().then(updateMetadata).catch(function () {});
        }
      },
      pause: function () {
        // Android/BIGO can suspend a background MediaSession. Previously this
        // blindly clicked 'broadcastPauseBtn', converting a transient focus
        // interruption into permanent user pause (broadcastPaused=true), so
        // raising the hardware volume could never resume MARU automatically.
        if (document.visibilityState === 'hidden' && shouldResumePlayback()) {
          recordAudioState('focus-session-pause');
          scheduleBackgroundResume();
          return;
        }
        recordAudioState('media-session-pause');
        clickEnabled('broadcastPauseBtn');
      },
      previoustrack: function () { clickEnabled('broadcastPrev'); },
      nexttrack: function () { clickEnabled('broadcastSkip'); },
      stop: function () { clickEnabled('broadcastStop'); }
    };
    Object.keys(actions).forEach(function (name) {
      try { navigator.mediaSession.setActionHandler(name, actions[name]); } catch (_) {}
    });
  }

  async function prepare() {
    active = true;
    try { localStorage.setItem(MODE_KEY, '1'); } catch (_) {}
    installMediaControls();
    updateMetadata();
    await requestWakeLock();
    status('준비됨 · 원곡을 재생한 뒤 BIGO 앱에서 오디오 LIVE를 선택하고 방송 시작을 직접 누르세요.', 'ready');
    showAudioState();
    $('bigoAudioPrepare').textContent = '✓ 오디오 LIVE 준비됨';
    $('bigoAudioStopMode').disabled = false;
  }

  async function stopMode() {
    active = false;
    clearTimeout(backgroundResumeTimer);
    backgroundResumeTimers.forEach(clearTimeout);
    backgroundResumeTimers = [];
    try { localStorage.removeItem(MODE_KEY); } catch (_) {}
    if (wakeLock) { try { await wakeLock.release(); } catch (_) {} wakeLock = null; }
    status('오디오 LIVE 준비 모드가 종료됐습니다. 현재 곡은 기존 방송 버튼으로 제어하세요.', 'idle');
    $('bigoAudioPrepare').textContent = '🎙 오디오 LIVE 준비';
    $('bigoAudioStopMode').disabled = true;
  }

  function startOriginal() {
    if (!active) prepare();
    if (!clickEnabled('broadcastStart')) {
      status('먼저 방송 파일을 추가하세요. 파일이 준비되면 원곡 재생 버튼이 활성화됩니다.', 'warn');
      return;
    }
    status('원곡 재생 중 · 이제 BIGO 앱에서 오디오 LIVE를 직접 시작하세요.', 'ready');
  }

  function openBigo() {
    status('BIGO가 열리면 “라이브 하기 → 오디오 LIVE”를 선택하세요. 최종 방송 시작은 직접 누릅니다.', 'ready');
    window.location.href = 'intent://www.bigo.tv/#Intent;scheme=https;package=sg.bigo.live;S.browser_fallback_url=https%3A%2F%2Fwww.bigo.tv%2F;end';
  }

  function prepareScreenLive() {
    var message = $('bigoScreenLiveStatus');
    var start = $('broadcastStart');
    if (!start || start.disabled) {
      if (message) message.textContent = '먼저 아래에서 방송 파일을 추가하세요. 저장된 곡은 자동으로 불러옵니다.';
      return;
    }
    prepare();
    start.click();
    if (message) message.textContent = '원곡 재생 시작 · BIGO를 열고 게임 LIVE/화면공유를 준비합니다.';
    if (typeof window.startBigoScreenShareFlow2280 === 'function') window.startBigoScreenShareFlow2280();
    else openBigoScreenLive();
  }

  function stopScreenLive() {
    clickEnabled('broadcastStop');
    try { localStorage.removeItem('maru-bigo-two-screen-flow-v2285'); } catch (_) {}
    var message = $('bigoScreenLiveStatus');
    if (message) message.textContent = '모바일 방송을 종료했습니다. OBS와 PC 방송 설정에는 영향을 주지 않습니다.';
  }

  function openBigoScreenLive() {
    var message = $('bigoScreenLiveStatus');
    if (message) message.textContent = 'BIGO가 열리면 “라이브 하기 → 화면 LIVE/게임 LIVE → 화면공유”를 선택하세요.';
    window.location.href = 'intent://www.bigo.tv/#Intent;scheme=https;package=sg.bigo.live;S.browser_fallback_url=https%3A%2F%2Fwww.bigo.tv%2F;end';
  }

  function mount() {
    var anchor = document.querySelector('.broadcast-body');
    if (!anchor || $('bigoAudioLiveCard')) return;
    var screenCard = document.createElement('section');
    screenCard.id = 'bigoScreenLiveCard';
    screenCard.className = 'bigo-audio-live-card bigo-screen-live-card';
    screenCard.innerHTML = '<div class="bigo-audio-live-title"><b>📱 모바일 단독 방송</b><span>PC·OBS·Helper·USB 없이 휴대폰만 사용</span></div>' +
      '<p>저장된 원곡과 곡별 이미지·영상·자막을 MARU 방송화면에 표시하고 BIGO의 게임 LIVE/화면공유로 보냅니다.</p>' +
      '<div class="mobile-no-obs-badge">원곡 직접 재생 · 음질개선 재처리 없음</div>' +
      '<div class="bigo-audio-live-actions"><button id="bigoScreenPrepare" class="primary mobile-live-start" type="button">🚀 모바일 방송 시작</button><button id="bigoScreenOpen" class="secondary" type="button">BIGO만 다시 열기</button><button id="bigoScreenStop" class="danger" type="button">■ 모바일 방송 종료</button></div>' +
      '<div id="bigoScreenLiveStatus" class="bigo-audio-live-status" data-state="idle">사용법: 모바일 방송 시작 → BIGO 게임 LIVE/화면공유 시작 → MARU로 돌아오기</div>' +
      '<small>BIGO의 보안상 최종 방송 시작과 화면공유 허용은 직접 눌러야 합니다. 그 외 준비와 화면 전환은 MARU가 자동으로 합니다.</small>';
    anchor.insertAdjacentElement('afterbegin', screenCard);
    var card = document.createElement('section');
    card.id = 'bigoAudioLiveCard';
    card.className = 'bigo-audio-live-card';
    card.innerHTML = '<div class="bigo-audio-live-title"><b>🎙 2. BIGO 오디오 LIVE</b><span>OBS 불필요 · 소리 전용</span></div>' +
      '<p>원곡을 그대로 재생하고 BIGO 오디오 방으로 전환합니다. <strong>곡별 이미지·영상·자막은 오디오 LIVE에 표시되지 않습니다.</strong></p>' +
      '<div class="bigo-audio-live-actions"><button id="bigoAudioPrepare" class="primary" type="button">🎙 오디오 LIVE 준비</button><button id="bigoAudioPlay" class="secondary" type="button">▶ 원곡 재생</button><button id="bigoAudioRecover" class="primary" type="button">🔊 소리 복구 · 현재곡 유지</button><button id="bigoAudioOpen" class="secondary" type="button">BIGO 앱 열기</button><button id="bigoAudioStopMode" class="danger" type="button" disabled>준비 모드 종료</button></div>' +
      '<div id="bigoAudioLiveStatus" class="bigo-audio-live-status" data-state="idle">대기 · BIGO의 믹서/내부 오디오 지원 여부에 따라 청취자에게 소리가 전달됩니다.</div>' +
      '<small>중요: BIGO에서 오디오 LIVE 시작은 직접 눌러야 합니다. BIGO가 다른 앱 소리를 받지 않는 기기·계정에서는 MARU 웹앱만으로 강제 송출할 수 없습니다.</small>' +
      '<div id="maruBackgroundAudioState" class="bigo-audio-live-status" role="status">🎵 다른 앱 음악 재생 상태를 기록합니다.</div>';
    screenCard.insertAdjacentElement('afterend', card);
    var style = document.createElement('style');
    style.textContent = '.bigo-audio-live-card{margin:14px 0;padding:16px;border:1px solid rgba(66,230,204,.55);border-radius:18px;background:linear-gradient(135deg,rgba(12,75,79,.55),rgba(35,25,62,.8))}.bigo-audio-live-title{display:flex;flex-wrap:wrap;gap:8px 14px;align-items:center}.bigo-audio-live-title b{font-size:1.12rem}.bigo-audio-live-title span,.bigo-audio-live-card small{opacity:.82}.bigo-audio-live-card p{margin:10px 0}.bigo-audio-live-actions{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.bigo-audio-live-actions button{min-height:48px}.bigo-audio-live-status{margin:11px 0 7px;padding:10px 12px;border-radius:12px;background:rgba(0,0,0,.24)}.bigo-audio-live-status[data-state=ready]{color:#7fffd9}.bigo-audio-live-status[data-state=warn]{color:#ffd37f}@media(max-width:560px){.bigo-audio-live-actions{grid-template-columns:1fr}}';
    document.head.appendChild(style);
    $('bigoAudioPrepare').addEventListener('click', prepare);
    $('bigoAudioPlay').addEventListener('click', startOriginal);
    $('bigoAudioOpen').addEventListener('click', openBigo);
    $('bigoAudioRecover').addEventListener('click', recoverSound);
    var restoreMain = $('broadcastSoundRestore');
    if (restoreMain) restoreMain.addEventListener('click', recoverSound);
    $('bigoAudioStopMode').addEventListener('click', stopMode);
    $('bigoScreenPrepare').addEventListener('click', prepareScreenLive);
    $('bigoScreenOpen').addEventListener('click', openBigoScreenLive);
    $('bigoScreenStop').addEventListener('click', stopScreenLive);
    var mediaPlayers = [$('broadcastAudio'), $('broadcastVideoPlayer')];
    if (typeof window.maruGetStandaloneAudio === 'function') {
      var standalone = window.maruGetStandaloneAudio();
      if (standalone) mediaPlayers.push(standalone);
    }
    mediaPlayers.forEach(function (media) {
      if (!media) return;
      media.setAttribute('preload', 'auto');
      media.setAttribute('playsinline', '');
      media.addEventListener('play', function () {
        active = true;
        try { localStorage.setItem(MODE_KEY, '1'); } catch (_) {}
        installMediaControls(); updateMetadata();
        recordAudioState('play');
      });
      media.addEventListener('playing', function () { recordAudioState('playing'); });
      media.addEventListener('pause', function () {
        updateMetadata();
        if (active && shouldResumePlayback()) {
          recordAudioState('interrupted-pause');
          scheduleBackgroundResume();
        } else recordAudioState('intentional-pause');
      });
      media.addEventListener('stalled', function () {
        if (active && shouldResumePlayback()) recordAudioState('stalled');
      });
      media.addEventListener('volumechange', function () {
        // HTMLMediaElement volume is distinct from Galaxy's hardware volume.
        // Only repair an inadvertent element mute, not the phone's sound slider.
        if (!active || !shouldResumePlayback()) return;
        if (media.muted) {
          recordAudioState('element-muted');
          media.muted = false;
          media.defaultMuted = false;
        }
      });
    });
    try {
      var last = JSON.parse(localStorage.getItem(interruptionKey) || 'null');
      if (last && typeof last.cause === 'string') lastAudioStatus = last;
    } catch (_) {}
    showAudioState();
    try { if (localStorage.getItem(MODE_KEY) === '1') prepare(); } catch (_) {}
  }

  document.addEventListener('visibilitychange', function () {
    if (!active) return;
    installMediaControls(); updateMetadata();
    if (document.visibilityState === 'visible') {
      requestWakeLock();
      recoverOnReturn();
    } else if (shouldResumePlayback()) {
      recordAudioState('background-enter');
      scheduleBackgroundResume();
    }
  });
  // ChatGPT (and other apps) can trigger transient Android audio-focus loss.
  // Try recovery after foregrounding without changing the stored track/position.
  window.addEventListener('focus', recoverOnReturn);
  window.addEventListener('pageshow', recoverOnReturn);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();
