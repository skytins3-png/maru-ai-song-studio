MARU V0.23.06 — 실제 Windows Native Keeper

수정 핵심:
- 브라우저는 Windows 프로그램을 직접 실행할 수 없으므로, one-touch가 '자동 재시작'을 기다리기만 하던 구조 제거
- Windows Script Host의 MARU-KEEPER.vbs가 브라우저와 독립적으로 Helper를 실제 유지
- Helper 정상 시 절대 재시작하지 않음
- Helper 3회 연속 무응답일 때만 실제 재시작
- ADB watcher 실제 종료 시에만 복구
- USB 케이블 분리는 watcher 종료로 취급하지 않음
- START-MARU.vbs: 검은 CMD 창 없이 시작
- START-MARU.bat도 START-MARU.vbs만 실행
- Helper 8765 포트 오류에서 숨김 Read-Host 대기 제거
- One-touch Helper 실패 문구를 화면에 계속 유지
- 전체 방송 종료는 Helper 유지
- MARU 완전 종료에서만 Helper/ADB/Keeper 종료

주소:
https://skytins3-png.github.io/maru-ai-song-studio/?v=2306
