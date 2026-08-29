MARU V0.22.95 — QR BUTTON CLICK FIX

- PC의 “휴대폰 연결 QR 크게 보기” 버튼을 누르면 즉시 QR 패널이 열리도록 수정.
- OBS Helper가 꺼져 있어도 버튼이 무반응처럼 보이지 않고 오류 이유를 화면에 표시.
- 모바일의 “PC QR 찍고 바로 연결” 버튼도 즉시 카메라 창을 열도록 클릭 경로를 이중화.
- 버튼에 inline fallback handler + 기존 app.js handler를 함께 적용해 이벤트 바인딩 실패를 우회.
- QR 버튼 pointer-events / touch-action / z-index를 강제해 모바일 터치 누락을 방지.
- 기존 V0.22.94 QR 동기화, V0.22.93 직접 LAN 동기화, OBS 방송 기능은 유지.

OBS Helper는 V0.22.93 이상을 그대로 사용할 수 있습니다.
