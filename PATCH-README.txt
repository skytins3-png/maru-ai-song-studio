MARU V0.22.99 — 진짜 원터치 방송 / 방송창 자동 실행 수정

핵심 수정:
- 이전 V0.22.98은 브라우저 window.open 팝업에 의존해서 MARU_OBS_LIVE 창이 실제로 안 뜨는 경우가 있었습니다.
- V0.22.99는 PC Helper가 Chrome/Edge를 직접 실행해 별도의 MARU_OBS_LIVE 앱 창을 만듭니다.
- 팝업 차단과 Alt+Tab 문제를 피합니다.
- 원터치 방송 시작 한 번:
  1) Helper 확인
  2) Helper가 MARU_OBS_LIVE 1280x720 전용 창 자동 실행
  3) OBS 실행/연결
  4) OBS 윈도우 캡처를 새 MARU_OBS_LIVE 창에 다시 연결
  5) OBS 송출 시작
  6) 방송목록 확인
  7) 원곡 재생 시작
- 기존 USB 실시간 원곡/RAM 방송과 PC 저장 없음 기능 유지.

처음 한 번:
PC-OBS-HELPER 폴더의 1-ONE-TOUCH-SETUP.bat 실행.

그 다음:
https://skytins3-png.github.io/maru-ai-song-studio/?v=2299
에서 “🚀 원터치 방송 시작” 한 번.

주의:
OBS의 BIGO 송출 연결정보는 OBS에 미리 설정되어 있어야 실제 BIGO 송출이 시작됩니다.
