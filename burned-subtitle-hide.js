/* MARU V0.23.14 — non-destructive burned-in subtitle hiding.
   This only changes the audience/OBS presentation. It never rewrites a video,
   replaces media URLs, calls load(), or changes playback time. */
(() => {
  'use strict';

  const KEY = 'maru-burned-subtitle-hide-v1';
  const DEFAULT = { enabled: true, crop: 16 };
  const ALLOWED = new Set([10, 16, 22]);

  function read() {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || 'null');
      const crop = Number(saved && saved.crop);
      return {
        enabled: saved && typeof saved.enabled === 'boolean' ? saved.enabled : DEFAULT.enabled,
        crop: ALLOWED.has(crop) ? crop : DEFAULT.crop
      };
    } catch (_) { return { ...DEFAULT }; }
  }

  function write(value) {
    try { localStorage.setItem(KEY, JSON.stringify(value)); } catch (_) {}
  }

  function apply(value = read()) {
    const body = document.body;
    if (!body) return;
    body.classList.toggle('maru-burned-subtitle-hide', !!value.enabled);
    body.style.setProperty('--maru-subtitle-crop', String(value.crop));
    body.style.setProperty('--maru-subtitle-zoom', String(100 / (100 - value.crop)));
  }

  function installStyle() {
    if (document.getElementById('maruBurnedSubtitleStyle2314')) return;
    const style = document.createElement('style');
    style.id = 'maruBurnedSubtitleStyle2314';
    style.textContent = `
      .maru-burned-subtitle-card-2314{margin:10px 0;padding:11px 12px;border:1px solid rgba(154,120,255,.42);border-radius:12px;background:rgba(25,17,49,.72)}
      .maru-burned-subtitle-row-2314{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap}
      .maru-burned-subtitle-row-2314 label{display:flex;align-items:center;gap:8px;font-weight:800}
      .maru-burned-subtitle-row-2314 select{min-height:40px;padding:6px 9px;border-radius:9px;background:#171126;color:#fff;border:1px solid #67528c}
      .maru-burned-subtitle-card-2314 small{display:block;margin-top:7px;color:#cfc3df;line-height:1.45}
      body.audience-mode.maru-burned-subtitle-hide #audienceVideo{
        transform:scale(var(--maru-subtitle-zoom,1.1905))!important;
        transform-origin:center top!important;
        object-position:center top!important;
      }
      @media (prefers-reduced-motion:reduce){body.audience-mode.maru-burned-subtitle-hide #audienceVideo{transition:none!important}}
    `;
    document.head.appendChild(style);
  }

  function installControl() {
    if (document.getElementById('maruBurnedSubtitleCard2314')) return;
    const anchor = document.getElementById('openBroadcastSubtitleManager');
    if (!anchor) return;
    const host = anchor.closest('.actions') || anchor.parentElement;
    if (!host || !host.parentElement) return;
    const value = read();
    const card = document.createElement('div');
    card.id = 'maruBurnedSubtitleCard2314';
    card.className = 'maru-burned-subtitle-card-2314';
    card.innerHTML = `
      <div class="maru-burned-subtitle-row-2314">
        <label><input id="maruBurnedSubtitleEnabled2314" type="checkbox"> 🧹 영상 속 아래 자막 자동 숨김</label>
        <select id="maruBurnedSubtitleCrop2314" aria-label="자막 숨김 범위">
          <option value="10">작게 · 아래 10%</option>
          <option value="16">자동 · 아래 16%</option>
          <option value="22">크게 · 아래 22%</option>
        </select>
      </div>
      <small>영상에 이미 합쳐진 아래쪽 자막만 화면에서 잘라 숨깁니다. 원본 영상은 삭제·변경하지 않으며 재생을 다시 시작하지 않습니다.</small>`;
    host.parentElement.insertBefore(card, host.nextSibling);
    const enabled = card.querySelector('#maruBurnedSubtitleEnabled2314');
    const crop = card.querySelector('#maruBurnedSubtitleCrop2314');
    enabled.checked = value.enabled;
    crop.value = String(value.crop);
    const change = () => {
      const next = { enabled: enabled.checked, crop: Number(crop.value) };
      write(next); apply(next);
      try { window.dispatchEvent(new CustomEvent('maru-burned-subtitle-change', { detail: next })); } catch (_) {}
    };
    enabled.addEventListener('change', change);
    crop.addEventListener('change', change);
  }

  function init() { installStyle(); apply(); installControl(); }
  window.addEventListener('storage', event => { if (event.key === KEY) apply(); });
  window.addEventListener('maru-burned-subtitle-change', event => apply(event.detail || read()));
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
