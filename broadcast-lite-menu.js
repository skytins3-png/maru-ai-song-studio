/* MARU V0.23.15 — broadcast-first light menu.
   Features are hidden, not deleted, so saved songs and old projects remain safe. */
(() => {
  'use strict';
  const KEY = 'maru-broadcast-lite-menu-v1';
  const HIDE = [
    '[data-core-action="analysis"]',
    '[data-core-action="enhance"]',
    '[data-core-action="score-play"]',
    '[data-core-action="song-workflow"]',
    '[data-core-action="compose"]',
    '[data-core-action="batch"]',
    '[data-core-action="eq"]',
    '[data-core-panel="instrumentCard"]',
    '[data-core-panel="mixCard"]',
    '[data-core-panel="scoreCard"]',
    '[data-core-panel="learningAiCard"]',
    '[data-core-panel="vocalCard"]'
  ];

  function read() {
    try { return localStorage.getItem(KEY) !== '0'; } catch (_) { return true; }
  }
  function save(on) {
    try { localStorage.setItem(KEY, on ? '1' : '0'); } catch (_) {}
  }
  function apply(on = read()) {
    document.body?.classList.toggle('maru-broadcast-lite-2315', on);
    const toggle = document.getElementById('maruBroadcastLiteToggle2315');
    if (toggle) {
      toggle.checked = on;
      const text = document.getElementById('maruBroadcastLiteText2315');
      if (text) text.textContent = on ? '방송 전용 메뉴' : '전체 메뉴';
    }
  }
  function init() {
    const launcher = document.getElementById('coreLauncher');
    if (!launcher || document.getElementById('maruBroadcastLite2315')) return;
    const style = document.createElement('style');
    style.id = 'maruBroadcastLiteStyle2315';
    style.textContent = `
      body.maru-broadcast-lite-2315 ${HIDE.join(',body.maru-broadcast-lite-2315 ')}{display:none!important}
      body.maru-broadcast-lite-2315 .core-launcher-grid{grid-template-columns:repeat(3,minmax(0,1fr))!important}
      .maru-broadcast-lite-2315{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:0 0 12px;padding:10px 12px;border:1px solid #5f4a86;border-radius:12px;background:#151025}
      .maru-broadcast-lite-2315 b{font-size:14px}.maru-broadcast-lite-2315 small{display:block;color:#c9bfdc;margin-top:3px}
      .maru-broadcast-lite-switch-2315{display:flex;align-items:center;gap:7px;white-space:nowrap;font-weight:800}
      @media(max-width:700px){body.maru-broadcast-lite-2315 .core-launcher-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}.maru-broadcast-lite-2315{align-items:flex-start;flex-direction:column}}
    `;
    document.head.appendChild(style);
    const row = document.createElement('div');
    row.id = 'maruBroadcastLite2315';
    row.className = 'maru-broadcast-lite-2315';
    row.innerHTML = '<div><b>📡 방송에 필요한 메뉴만 표시</b><small>기존 기능과 저장곡은 삭제하지 않고 화면에서만 안전하게 숨깁니다.</small></div><label class="maru-broadcast-lite-switch-2315"><input id="maruBroadcastLiteToggle2315" type="checkbox"><span id="maruBroadcastLiteText2315">방송 전용 메뉴</span></label>';
    const grid = launcher.querySelector('.core-launcher-grid');
    launcher.insertBefore(row, grid || launcher.firstChild);
    row.querySelector('#maruBroadcastLiteToggle2315').addEventListener('change', event => {
      const on = !!event.target.checked;
      save(on); apply(on);
    });
    apply();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
