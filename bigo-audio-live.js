(function () {
  'use strict';

  var MODE_KEY = 'maru-bigo-audio-live-prepared-v1';
  var wakeLock = null;
  var active = false;

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
    return $('broadcastVideoPlayer') && !$('broadcastVideoPlayer').paused
      ? $('broadcastVideoPlayer') : $('broadcastAudio');
  }

  function updateMetadata() {
    if (!('mediaSession' in navigator) || typeof MediaMetadata === 'undefined') return;
    var media = currentMedia();
    var source = media && (media.currentSrc || media.src) || '';
    var title = source ? decodeURIComponent(source.split('/').pop().split('?')[0]) : 'MARU 원곡 방송';
    try { navigator.mediaSession.metadata = new MediaMetadata({ title: title, artist: 'MARU WORLD MUSIC MAKER', album: 'BIGO 오디오 LIVE' }); } catch (_) {}
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
      play: function () { var m = currentMedia(); if (m) m.play().catch(function () {}); },
      pause: function () { clickEnabled('broadcastPauseBtn'); },
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
    $('bigoAudioPrepare').textContent = '✓ 오디오 LIVE 준비됨';
    $('bigoAudioStopMode').disabled = false;
  }

  async function stopMode() {
    active = false;
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

  function mount() {
    var anchor = $('originalBroadcastMode');
    if (!anchor || $('bigoAudioLiveCard')) return;
    var card = document.createElement('section');
    card.id = 'bigoAudioLiveCard';
    card.className = 'bigo-audio-live-card';
    card.innerHTML = '<div class="bigo-audio-live-title"><b>🎙 BIGO 오디오 LIVE</b><span>소리 전용 · 기존 화면 LIVE는 그대로 유지</span></div>' +
      '<p>원곡을 그대로 재생하고 BIGO 오디오 방으로 전환합니다. <strong>곡별 이미지·영상·자막은 오디오 LIVE에 표시되지 않습니다.</strong></p>' +
      '<div class="bigo-audio-live-actions"><button id="bigoAudioPrepare" class="primary" type="button">🎙 오디오 LIVE 준비</button><button id="bigoAudioPlay" class="secondary" type="button">▶ 원곡 재생</button><button id="bigoAudioOpen" class="secondary" type="button">BIGO 앱 열기</button><button id="bigoAudioStopMode" class="danger" type="button" disabled>준비 모드 종료</button></div>' +
      '<div id="bigoAudioLiveStatus" class="bigo-audio-live-status" data-state="idle">대기 · BIGO의 믹서/내부 오디오 지원 여부에 따라 청취자에게 소리가 전달됩니다.</div>' +
      '<small>중요: BIGO에서 오디오 LIVE 시작은 직접 눌러야 합니다. BIGO가 다른 앱 소리를 받지 않는 기기·계정에서는 MARU 웹앱만으로 강제 송출할 수 없습니다.</small>';
    anchor.insertAdjacentElement('afterend', card);
    var style = document.createElement('style');
    style.textContent = '.bigo-audio-live-card{margin:14px 0;padding:16px;border:1px solid rgba(66,230,204,.55);border-radius:18px;background:linear-gradient(135deg,rgba(12,75,79,.55),rgba(35,25,62,.8))}.bigo-audio-live-title{display:flex;flex-wrap:wrap;gap:8px 14px;align-items:center}.bigo-audio-live-title b{font-size:1.12rem}.bigo-audio-live-title span,.bigo-audio-live-card small{opacity:.82}.bigo-audio-live-card p{margin:10px 0}.bigo-audio-live-actions{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.bigo-audio-live-actions button{min-height:48px}.bigo-audio-live-status{margin:11px 0 7px;padding:10px 12px;border-radius:12px;background:rgba(0,0,0,.24)}.bigo-audio-live-status[data-state=ready]{color:#7fffd9}.bigo-audio-live-status[data-state=warn]{color:#ffd37f}@media(max-width:560px){.bigo-audio-live-actions{grid-template-columns:1fr}}';
    document.head.appendChild(style);
    $('bigoAudioPrepare').addEventListener('click', prepare);
    $('bigoAudioPlay').addEventListener('click', startOriginal);
    $('bigoAudioOpen').addEventListener('click', openBigo);
    $('bigoAudioStopMode').addEventListener('click', stopMode);
    ['broadcastAudio', 'broadcastVideoPlayer'].forEach(function (id) {
      var media = $(id); if (media) media.addEventListener('play', updateMetadata);
    });
    try { if (localStorage.getItem(MODE_KEY) === '1') prepare(); } catch (_) {}
  }

  document.addEventListener('visibilitychange', function () { if (active && document.visibilityState === 'visible') requestWakeLock(); });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();
