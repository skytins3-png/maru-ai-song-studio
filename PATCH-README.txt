MARU MUSIC LIVE V0.22.81 — BIGO + MARU 2화면 방송

목표
- BIGO 게임 LIVE 화면공유 중 MARU와 BIGO를 한 화면에 함께 표시
- 삼성 분할 화면 기준: MARU 위 / BIGO 아래
- MARU 쪽은 영상·사진·제목·자막을 짧아진 화면에 자동 맞춤

사용 흐름
1. MARU에서 `📱 BIGO + MARU 2화면` 누름
2. BIGO가 열리면 LIVE → 게임 LIVE → 방송 시작
3. MARU로 돌아오면 V0.22.81이 2화면용 상단 레이아웃으로 자동 전환
4. 삼성 최근 앱에서 분할 화면을 열고 BIGO를 아래쪽 앱으로 선택
5. BIGO 게임 LIVE의 화면공유가 MARU + BIGO 두 화면을 함께 송출

V0.22.81 변경
- 2화면 전용 `bigo-dual` 레이아웃 추가
- 분할 화면 높이가 짧아져도 상단 영상 고정 / 하단부터 크롭
- 제목 길이별 자동 축소 / 최대 2줄 유지
- 자막·안내 문구가 제목과 겹치지 않도록 짧은 창 위치 보정
- BIGO 원터치 준비 흐름을 2화면 모드로 연결

Android 제한
- 웹/PWA가 삼성 시스템의 '분할 화면' 버튼을 보안상 강제로 누를 수는 없습니다.
- 따라서 마지막 시스템 분할 화면 선택 1회는 사용자가 직접 해야 합니다.

패치 파일 5개
- index.html
- styles.css
- app.js
- sw.js
- PATCH-README.txt
