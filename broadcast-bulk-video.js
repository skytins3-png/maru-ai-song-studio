(function () {
  'use strict';

  var API_NAME = 'maruBroadcastBulkMediaApi2313';

  function normalizeTitle(value) {
    return String(value || '')
      .normalize('NFKC')
      .replace(/\.[^.]+$/, '')
      .replace(/^\s*\d{1,3}[\s._-]+/, '')
      .replace(/[\[(（【].*?[\])）】]/g, ' ')
      .replace(/\b(official|music|video|lyrics?|mv|4k|hd|audio)\b/gi, ' ')
      .replace(/[＿_\-–—]+/g, ' ')
      .replace(/[^\p{L}\p{N}]+/gu, '')
      .toLocaleLowerCase()
      .trim();
  }

  function uniqueMatch(videoName, tracks, used) {
    var key = normalizeTitle(videoName);
    if (!key) return -1;
    var exact = tracks.filter(function (track) {
      return !used.has(track.index) && normalizeTitle(track.name) === key;
    });
    if (exact.length === 1) return exact[0].index;

    var loose = tracks.filter(function (track) {
      if (used.has(track.index)) return false;
      var song = normalizeTitle(track.name);
      return song.length >= 4 && key.length >= 4 && (song.includes(key) || key.includes(song));
    });
    return loose.length === 1 ? loose[0].index : -1;
  }

  function setStatus(text, state) {
    var el = document.getElementById('broadcastBulkVideoStatus2313');
    if (!el) return;
    el.textContent = text;
    el.dataset.state = state || 'idle';
  }

  async function attachFiles(files) {
    var api = window[API_NAME];
    if (!api) return setStatus('앱을 완전히 종료한 뒤 다시 열어 주세요.', 'error');
    var tracks = await api.list();
    if (!tracks.length) return setStatus('먼저 방송목록에 노래를 추가해 주세요.', 'error');

    var used = new Set();
    var attached = 0;
    var protectedCount = 0;
    var unmatched = [];
    var videos = Array.from(files || []).filter(function (file) {
      return String(file.type || '').startsWith('video/') || /\.(mp4|m4v|mov|webm)$/i.test(file.name || '');
    });
    setStatus(videos.length + '개 영상의 곡 제목을 확인하고 있습니다…', 'busy');

    for (var i = 0; i < videos.length; i++) {
      var video = videos[i];
      var index = uniqueMatch(video.name, tracks, used);
      if (index < 0) {
        unmatched.push(video.name);
        continue;
      }
      var track = tracks.find(function (item) { return item.index === index; });
      used.add(index);
      if (track && track.hasVideo) {
        protectedCount++;
        continue;
      }
      var ok = await api.save(index, video);
      if (ok !== false) attached++;
      else unmatched.push(video.name);
    }

    if (typeof api.refresh === 'function') api.refresh();
    var parts = [attached + '곡 영상 자동 연결 완료'];
    if (protectedCount) parts.push('기존 영상 ' + protectedCount + '곡 보존');
    if (unmatched.length) parts.push('이름 불일치 ' + unmatched.length + '개');
    setStatus(parts.join(' · ') + (unmatched.length ? ' · 영상 파일명을 노래 제목과 같게 바꿔 다시 선택하세요.' : ''), unmatched.length ? 'warn' : 'done');
  }

  function mount() {
    if (document.getElementById('broadcastBulkVideo2313')) return;
    var search = document.getElementById('broadcastSearch');
    var tools = search && search.parentElement;
    if (!tools) return;

    var button = document.createElement('button');
    button.id = 'broadcastBulkVideo2313';
    button.className = 'primary';
    button.type = 'button';
    button.textContent = '🎬 곡별 영상 여러 개 자동 연결';
    var input = document.createElement('input');
    input.id = 'broadcastBulkVideoPicker2313';
    input.type = 'file';
    input.multiple = true;
    input.hidden = true;
    input.accept = 'video/mp4,video/webm,video/*,.mp4,.m4v,.mov,.webm';
    var status = document.createElement('div');
    status.id = 'broadcastBulkVideoStatus2313';
    status.className = 'broadcast-bulk-video-status-2313';
    status.dataset.state = 'idle';
    status.textContent = '영상 파일명과 노래 제목이 같으면 각 곡에 자동 저장됩니다. 기존 영상은 덮어쓰지 않습니다.';

    tools.appendChild(button);
    tools.insertAdjacentElement('afterend', input);
    input.insertAdjacentElement('afterend', status);
    button.addEventListener('click', function () { input.click(); });
    input.addEventListener('change', function () {
      var files = input.files;
      input.value = '';
      attachFiles(files);
    });

    var style = document.createElement('style');
    style.textContent = '.broadcast-bulk-video-status-2313{margin:8px 0 12px;padding:10px 12px;border:1px solid rgba(154,120,255,.42);border-radius:12px;background:rgba(25,17,49,.72);font-size:.9rem}.broadcast-bulk-video-status-2313[data-state=done]{color:#7fffd9}.broadcast-bulk-video-status-2313[data-state=warn]{color:#ffd37f}.broadcast-bulk-video-status-2313[data-state=error]{color:#ff9aab}';
    document.head.appendChild(style);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
