MARU MUSIC LIVE V0.22.80 — BIGO 원터치 방송 준비

핵심 흐름
1. MARU에서 곡/영상 재생 준비
2. `🚀 BIGO 방송 준비` 한 번 누름
3. MARU가 현재 제목/커버/영상/자막 상태를 저장
4. BIGO Android 앱(sg.bigo.live)을 자동으로 엶
5. BIGO에서 LIVE → 게임 LIVE → 방송 시작만 사용자가 직접 누름
6. 방송 시작 뒤 MARU로 돌아오면 BIGO 플로팅 화면공유 모드로 자동 전환

유지된 기능
- V0.22.77: 창 축소 시 위쪽 고정, 아래쪽부터 잘림
- V0.22.78: 큰 제목/굵은 제목
- V0.22.79: 제목 길이별 자동 크기, 최대 2줄, BIGO 화면공유 레이아웃

중요
- Android 보안 때문에 MARU가 BIGO 앱 내부의 LIVE/게임 LIVE/방송 시작 버튼을 대신 누를 수는 없습니다.
- BIGO가 공개한 내부 방송화면용 딥링크가 없어 앱 내부의 특정 '게임 LIVE' 화면으로 직접 점프하는 것은 보장할 수 없습니다.
- 따라서 V0.22.80은 MARU에서 가능한 자동화(상태 저장 → BIGO 앱 실행 → 복귀 시 MARU 미니 화면 자동 전환)를 최대한 자동화하고, BIGO의 마지막 방송 시작 조작만 사용자에게 남깁니다.

패치 파일 5개
- index.html
- styles.css
- app.js
- sw.js
- PATCH-README.txt
