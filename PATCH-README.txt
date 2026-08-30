MARU V0.23.00 — OBS 커버/영상/원곡 오디오 직접 출력

이번 수정의 핵심:
- V0.22.99에서는 MARU_OBS_LIVE 창은 잡혔지만, 실제 원곡 오디오는 PC 제어창에서 재생하고
  커버/영상 상태는 브라우저 창 간 전달에 의존해 OBS에서 빠질 수 있었습니다.
- V0.23.00은 MARU_OBS_LIVE 전용 창이 PC Helper의 RAM에서 현재 곡을 직접 읽습니다.
- 따라서 OBS 방송창에서 직접:
  · 곡별 커버 표시
  · 곡별 영상 반복 표시
  · 원본 MP3 오디오 재생
  · 원본 MP4 영상+오디오 재생
- PC 제어 MARU는 같은 원곡을 음소거 상태로 재생하여 곡 종료/다음곡 타이밍만 관리합니다.
- PC 디스크에는 원곡을 저장하지 않습니다.
- Helper의 현재 곡 API: /api/usb/current
- Helper의 재생 상태 API: /api/usb/play-state
- 전용 Chrome/Edge 방송창은 autoplay 허용 옵션으로 실행됩니다.
- OBS Window Capture는 MARU_OBS_LIVE와 그 창의 오디오를 캡처하도록 유지합니다.

사용:
1) 새 PC-OBS-HELPER의 1-ONE-TOUCH-SETUP.bat 처음 한 번 실행
2) 휴대폰 USB 테더링 + 모바일 MARU 연결
3) PC MARU에서 🚀 원터치 방송 시작
4) OBS 화면에 커버/영상이 나오고 원곡 소리가 OBS 오디오 믹서에 들어오는지 확인

주소:
https://skytins3-png.github.io/maru-ai-song-studio/?v=2300
