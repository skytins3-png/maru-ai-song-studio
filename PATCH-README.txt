MARU MUSIC LIVE V0.22.82 — BIGO + MARU 2화면 안정화

기준 파일
- 사용자가 올린 github-pages (2)(5).zip

목표
- BIGO 게임 LIVE 화면공유 중 MARU와 BIGO를 한 화면에 함께 표시
- 삼성 분할 화면 기준: MARU 위 / BIGO 아래
- MARU 영상·사진·제목·자막이 짧아진 화면에 자동 적응

V0.22.82 변경
- V0.22.81의 2화면 기능 유지
- index.html의 app.js / sfumato.js 캐시 버전 불일치 수정
- 서비스워커 캐시를 V0.22.82로 갱신해 이전 파일 혼용 방지
- BIGO 복귀 대기 키를 V0.22.82로 분리해 이전 세션의 자동 전환 방지
- 삼성 분할화면/회전/키보드로 화면 높이가 변할 때 MARU 화면 높이 재계산
- 짧은 가로 화면에서 자막·안내 위치 추가 보정

사용
1. MARU에서 `📱 BIGO + MARU 2화면` 누름
2. BIGO → LIVE → 게임 LIVE → 방송 시작
3. MARU로 돌아오기
4. 삼성 최근 앱 → 분할 화면 → BIGO를 아래쪽 앱으로 선택
5. MARU 위 / BIGO 아래 상태가 화면공유로 송출

중요
- Android 보안상 MARU 웹앱이 삼성의 시스템 '분할 화면' 버튼을 자동으로 누를 수는 없습니다.
- 마지막 분할 화면 선택 1회는 직접 해야 합니다.

교체 파일 5개
- index.html
- styles.css
- app.js
- sw.js
- PATCH-README.txt
