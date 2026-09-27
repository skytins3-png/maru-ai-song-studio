/* MARU V0.23.16 — broadcast video pre-cleaner.
   Runs before broadcast, keeps the source file untouched, and exports a new WebM.
   Fixed BIGO UI areas are replaced with nearby blurred pixels. Pixels hidden by the
   original UI cannot be recovered exactly, so the UI explains that limitation. */
(() => {
  'use strict';
  let sourceFile = null;
  let sourceUrl = '';
  let outputUrl = '';
  let busy = false;

  const $ = selector => document.querySelector(selector);
  const mobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent || '');

  function revoke(url) { if (url) try { URL.revokeObjectURL(url); } catch (_) {} }
  function setStatus(text, state = '') {
    const el = $('#maruVideoCleanStatus2316');
    if (!el) return;
    el.textContent = text;
    el.dataset.state = state;
  }
  function safeBase(name = 'video') {
    return String(name).replace(/\.[^.]+$/, '').replace(/[\\/:*?"<>|]+/g, '_').trim() || 'video';
  }
  function maskEnabled(id) { return !!document.getElementById(id)?.checked; }

  function paintPatch(ctx, video, sx, sy, sw, sh, dx, dy, dw, dh, blur = 18) {
    const w = video.videoWidth, h = video.videoHeight;
    sx = Math.max(0, Math.min(w - 2, sx)); sy = Math.max(0, Math.min(h - 2, sy));
    sw = Math.max(2, Math.min(w - sx, sw)); sh = Math.max(2, Math.min(h - sy, sh));
    ctx.save();
    ctx.filter = `blur(${blur}px)`;
    ctx.drawImage(video, sx, sy, sw, sh, dx, dy, dw, dh);
    ctx.restore();
  }

  function drawCleanFrame(ctx, video, w, h) {
    ctx.drawImage(video, 0, 0, w, h);
    // The source strips stay outside the removed UI zones. Unmasked pixels—people,
    // animals and background—are copied without modification.
    if (maskEnabled('maruCleanTop2316'))
      paintPatch(ctx, video, video.videoWidth * .18, video.videoHeight * .18, video.videoWidth * .64, video.videoHeight * .09, 0, 0, w, h * .18, 22);
    if (maskEnabled('maruCleanLeft2316'))
      paintPatch(ctx, video, video.videoWidth * .43, video.videoHeight * .30, video.videoWidth * .12, video.videoHeight * .50, 0, h * .25, w * .43, h * .60, 20);
    if (maskEnabled('maruCleanRight2316'))
      paintPatch(ctx, video, video.videoWidth * .57, video.videoHeight * .48, video.videoWidth * .12, video.videoHeight * .38, w * .72, h * .48, w * .28, h * .42, 20);
    if (maskEnabled('maruCleanBottom2316'))
      paintPatch(ctx, video, video.videoWidth * .12, video.videoHeight * .74, video.videoWidth * .76, video.videoHeight * .10, 0, h * .84, w, h * .16, 22);
  }

  async function startClean() {
    if (busy) return;
    if (!sourceFile) return setStatus('먼저 정리할 MP4·MOV·WebM 영상을 선택하세요.', 'error');
    if (mobile) return setStatus('영상 정리는 PC에서 실행하세요. 모바일은 CLEAN 영상을 방송할 때만 사용합니다.', 'warn');
    if (!window.MediaRecorder || !HTMLCanvasElement.prototype.captureStream)
      return setStatus('이 PC 브라우저는 영상 저장을 지원하지 않습니다. 최신 Chrome 또는 Edge를 사용하세요.', 'error');

    const video = $('#maruVideoCleanPreview2316');
    const canvas = document.createElement('canvas');
    const maxW = 720;
    const scale = Math.min(1, maxW / Math.max(1, video.videoWidth));
    canvas.width = Math.max(2, Math.round(video.videoWidth * scale));
    canvas.height = Math.max(2, Math.round(video.videoHeight * scale));
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return setStatus('영상 처리 화면을 만들지 못했습니다.', 'error');

    busy = true;
    const button = $('#maruVideoCleanStart2316');
    if (button) button.disabled = true;
    revoke(outputUrl); outputUrl = '';
    $('#maruVideoCleanDownload2316')?.setAttribute('hidden', '');
    const chunks = [];
    let recorder = null, raf = 0;
    try {
      video.pause(); video.currentTime = 0; video.muted = false; video.volume = 0;
      await video.play();
      const canvasStream = canvas.captureStream(30);
      const mediaStream = typeof video.captureStream === 'function' ? video.captureStream() : null;
      if (mediaStream) mediaStream.getAudioTracks().forEach(track => canvasStream.addTrack(track));
      const mime = ['video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm']
        .find(type => MediaRecorder.isTypeSupported(type)) || '';
      recorder = mime ? new MediaRecorder(canvasStream, { mimeType: mime, videoBitsPerSecond: 5500000 }) : new MediaRecorder(canvasStream);
      recorder.ondataavailable = event => { if (event.data?.size) chunks.push(event.data); };
      const stopped = new Promise((resolve, reject) => {
        recorder.onstop = resolve;
        recorder.onerror = event => reject(event.error || new Error('영상 저장 실패'));
      });
      recorder.start(1000);
      const draw = () => {
        if (!busy || video.ended) return;
        drawCleanFrame(ctx, video, canvas.width, canvas.height);
        const pct = video.duration ? Math.min(99, Math.round(video.currentTime / video.duration * 100)) : 0;
        setStatus(`영상 정리 중 ${pct}% · 방송 전에 한 번만 처리합니다.`, 'busy');
        raf = requestAnimationFrame(draw);
      };
      draw();
      await new Promise((resolve, reject) => {
        video.onended = resolve;
        video.onerror = () => reject(new Error('원본 영상을 재생하지 못했습니다'));
      });
      cancelAnimationFrame(raf);
      drawCleanFrame(ctx, video, canvas.width, canvas.height);
      recorder.stop();
      await stopped;
      const blob = new Blob(chunks, { type: recorder.mimeType || 'video/webm' });
      if (!blob.size) throw new Error('정리된 영상 데이터가 만들어지지 않았습니다');
      outputUrl = URL.createObjectURL(blob);
      const link = $('#maruVideoCleanDownload2316');
      link.href = outputUrl;
      link.download = `${safeBase(sourceFile.name)}_CLEAN.webm`;
      link.removeAttribute('hidden');
      setStatus(`완료 · ${(blob.size / 1024 / 1024).toFixed(1)}MB · CLEAN 영상 저장을 누르세요.`, 'done');
    } catch (error) {
      console.error('MARU video pre-cleaner', error);
      setStatus(`영상 정리 실패 · ${error?.message || error}`, 'error');
    } finally {
      busy = false;
      cancelAnimationFrame(raf);
      try { video.pause(); } catch (_) {}
      video.onended = null; video.onerror = null;
      if (button) button.disabled = false;
    }
  }

  function chooseFile(file) {
    if (!file) return;
    if (!String(file.type || '').startsWith('video/') && !/\.(mp4|m4v|mov|webm)$/i.test(file.name || ''))
      return setStatus('영상 파일만 선택할 수 있습니다.', 'error');
    if (file.size > 700 * 1024 * 1024)
      return setStatus('700MB 이하 영상으로 먼저 시험해 주세요.', 'error');
    sourceFile = file;
    revoke(sourceUrl); sourceUrl = URL.createObjectURL(file);
    const video = $('#maruVideoCleanPreview2316');
    video.src = sourceUrl; video.load();
    video.onloadedmetadata = () => setStatus(`${file.name} · ${Math.round(video.duration || 0)}초 · 원본 보존`, 'ready');
    $('#maruVideoCleanStart2316').disabled = false;
  }

  function install() {
    const body = document.querySelector('#broadcastPlayerCard .broadcast-body');
    if (!body || $('#maruVideoCleaner2316')) return;
    const card = document.createElement('details');
    card.id = 'maruVideoCleaner2316';
    card.className = 'maru-video-cleaner-2316';
    card.innerHTML = `
      <summary>🧹 방송 전 영상 정리 · PC에서 한 번</summary>
      <div class="maru-video-clean-body-2316">
        <p><b>영상 선택 → BIGO 고정 메뉴 정리 → 새 CLEAN 영상 저장</b></p>
        <label class="file-button primary" for="maruVideoCleanFile2316">🎬 정리할 영상 선택</label>
        <input id="maruVideoCleanFile2316" type="file" accept="video/mp4,video/webm,video/quicktime,.mp4,.mov,.m4v,.webm" hidden>
        <video id="maruVideoCleanPreview2316" controls playsinline preload="metadata"></video>
        <div class="maru-video-clean-masks-2316">
          <label><input id="maruCleanTop2316" type="checkbox" checked> 위 알림·계정</label>
          <label><input id="maruCleanLeft2316" type="checkbox" checked> 왼쪽 댓글·선물</label>
          <label><input id="maruCleanRight2316" type="checkbox" checked> 오른쪽 투표·창</label>
          <label><input id="maruCleanBottom2316" type="checkbox" checked> 아래 자막·버튼</label>
        </div>
        <button id="maruVideoCleanStart2316" class="primary" type="button" disabled>✨ 정리 시작</button>
        <a id="maruVideoCleanDownload2316" class="button primary" hidden>💾 CLEAN 영상 저장</a>
        <div id="maruVideoCleanStatus2316" data-state="idle">PC에서 실제 영상을 선택하세요. 모바일 방송에는 완성된 CLEAN 영상만 사용합니다.</div>
        <small>원본 파일은 변경하지 않습니다. 메뉴가 얼굴·머리카락·동물을 가린 부분은 원래 픽셀이 없어서 주변 화면으로 채워지며 완벽한 복원은 불가능합니다.</small>
      </div>`;
    const anchor = body.querySelector('.simple-broadcast-primary-note');
    if (anchor) anchor.insertAdjacentElement('afterend', card); else body.prepend(card);
    const style = document.createElement('style');
    style.textContent = `
      .maru-video-cleaner-2316{margin:12px 0;border:1px solid #67528c;border-radius:14px;background:#100c1e;overflow:hidden}.maru-video-cleaner-2316 summary{padding:13px;font-weight:900;cursor:pointer}.maru-video-clean-body-2316{padding:0 13px 13px}.maru-video-clean-body-2316 p{margin:0 0 10px}.maru-video-clean-body-2316 video{display:block;width:100%;max-height:42vh;margin:10px 0;border-radius:10px;background:#000}.maru-video-clean-masks-2316{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin:9px 0}.maru-video-clean-masks-2316 label{margin:0;padding:8px;border:1px solid #4c3c68;border-radius:9px;background:#171126}.maru-video-clean-body-2316 button,.maru-video-clean-body-2316 a.button{width:100%;margin-top:8px;text-align:center;text-decoration:none;box-sizing:border-box}.maru-video-clean-body-2316 [data-state]{margin-top:9px;padding:9px;border-radius:9px;background:#171126}.maru-video-clean-body-2316 [data-state=done]{color:#7fffd9}.maru-video-clean-body-2316 [data-state=error]{color:#ff9aab}.maru-video-clean-body-2316 [data-state=warn]{color:#ffd37f}.maru-video-clean-body-2316 small{display:block;margin-top:8px;color:#cfc3df;line-height:1.45}@media(max-width:620px){.maru-video-clean-masks-2316{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);
    $('#maruVideoCleanFile2316').addEventListener('change', event => { chooseFile(event.target.files?.[0]); event.target.value = ''; });
    $('#maruVideoCleanStart2316').addEventListener('click', startClean);
    if (mobile) setStatus('모바일에서는 방송만 사용하세요. 영상 정리는 PC에서 실행합니다.', 'warn');
  }

  window.addEventListener('beforeunload', () => { revoke(sourceUrl); revoke(outputUrl); });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install, { once: true });
  else install();
})();
