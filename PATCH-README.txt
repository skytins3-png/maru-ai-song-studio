MARU V0.23.04 — 완전 자동 안정 유지 구조

핵심 구조:
- Helper는 MARU 시작 때 한 번 실행되고 백그라운드에서 계속 유지
- USB ADB watcher도 한 번 실행되어 케이블이 빠져도 종료하지 않고 다시 연결될 때까지 대기
- 정상 상태의 Helper/ADB 프로세스에는 Keeper가 손대지 않음
- Helper 응답 실패가 연속 3회 확인될 때만 비정상 종료/멈춤으로 판단해 1회 복구
- ADB watcher 프로세스가 연속 3회 사라진 경우에만 1회 복구
- '전체 방송 종료'는 음악 + OBS 송출만 종료. Helper/USB 자동 연결은 그대로 유지
- 'MARU 완전 종료' 버튼에서만 Helper + ADB + Keeper를 의도적으로 종료
- 의도적 완전 종료에는 stop flag를 남겨 Keeper가 다시 켜지 않음
- 다음 START-MARU.bat 실행 시 stop flag를 자동 해제하고 정상 시작

자동 시작:
- Windows 로그인 자동 실행 유지
- START-MARU.bat 하나로 최초 설정 여부 자동 판단
- USB 테더링/QR/주소 입력 없음

Android 보안상 최초 USB 디버깅 허용은 사용자 1회 승인이 필요합니다.
