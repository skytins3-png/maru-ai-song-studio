MARU V0.23.07 — VBS 제거 / V3 충돌 완화 버전

변경:
- .vbs 파일 완전 제거
- START-MARU.cmd 하나로 시작
- CMD는 즉시 숨김 PowerShell Bootstrap을 실행하고 종료
- Bootstrap은 stop flag 제거 -> Keeper 실행 -> Helper 확인 -> MARU 열기
- Keeper는 정상 Helper를 건드리지 않고 계속 유지
- Helper 3회 연속 무응답일 때만 복구
- ADB watcher 실제 종료 시만 복구
- USB 케이블 분리는 watcher 종료로 취급하지 않음
- 현재 사용자 HKCU Run에 Keeper 자동시작 등록
- 가능한 경우 다운로드된 스크립트의 Mark-of-the-Web을 Unblock-File로 제거
- 전체 방송 종료는 Helper 유지
- MARU 완전 종료에서만 Helper/ADB/Keeper 종료

중요:
백신은 어떤 로컬 스크립트도 검사할 수 있으므로 V3 검사를 100% 없앨 수는 없습니다.
이번 버전은 V3에서 반복 검사되던 VBS를 아예 사용하지 않습니다.

사용:
PC-OBS-HELPER/START-MARU.cmd 더블클릭

주소:
https://skytins3-png.github.io/maru-ai-song-studio/?v=2307
