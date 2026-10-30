# MARU MUSIC SHARE · Public music and listener stories

The site already has a static public music library and an administrator upload flow:
- `index.html`: public creator-approved tracks, search, play, share and download.
- `admin.html`: uploads creator-owned MP3/WAV and cover using a user-provided GitHub Contents-write token. This does not bypass copyright or upload permission; do not post the token in chat.
- `stories.html`: **public listener submissions**. The writer enters a pen name, story title and message and explicitly consents to the text becoming public and eligible for on-air reading. A GitHub Issue form opens with the submitted text, and the listener must sign in and click Submit. The station producer can review issues and manually paste approved stories into MARU RADIO's local story inbox. There is no automatic import of unreviewed third-party stories.
- This is **not a private story inbox**. A private, login-free intake service requires an approved backend with moderation, rate limiting and privacy safeguards.
- Suno playlists are created and shared at Suno. This site cannot scrape or bulk download private Suno audio. Download your own licensed tracks through Suno's official service and then upload them to the music library.
- `node --test tests/music-share.test.cjs tests/music-share-stories.test.cjs` tests the published catalog, upload validation and public story URL behavior; actual GitHub login, network uploads and live Pages deployment require separate checks.

# MUSIC SHARE

MARU와 분리된 공개 음악 배포 페이지. 공개 페이지는 `./`, 관리자 폼은 `admin.html`이다.

## 공개·권한 정책

- GitHub 저장소 Contents 쓰기 권한을 가진 토큰만 업로드 가능하다. 관리자 폼 URL 자체를 숨기는 로그인 기능은 없다.
- 관리자 업로드는 공개 다운로드 동의를 필수로 받는다. 공개 페이지는 `downloadAllowed === true`와 올바른 로컬 음원 경로를 가진 항목만 표시한다.
- 이 사이트는 **공개 배포 전용**이다. 목록에서 숨기거나 false로 바꾸는 것은 파일 접근 통제가 아니다. 공개 저장소/정적 호스팅의 파일 주소와 이미 저장된 사본을 회수하거나 회원별로 제한하지 않는다. 비공개 음원은 이 저장소에 업로드하지 않는다.
- 토큰은 URL·저장소·브라우저 저장소에 기록하지 않으며, 업로드 시도 완료와 페이지 이탈 시 입력칸에서 지운다.

## 업로드

1. 제목, 음악(MP3/WAV/M4A/AAC/OGG/FLAC, 95MiB 이하), 선택 표지(JPG/PNG/WEBP/GIF/AVIF, 10MiB 이하), 아티스트와 설명을 입력한다.
2. 공개 다운로드 동의 후 업로드한다. 파일 확장자·용량을 먼저 검사하며 실제 코덱 지원은 기기별로 확인한다.
3. 현재 main의 목록을 검증한 뒤 음악·표지 blob을 준비하고, 목록과 파일 경로를 **한 커밋으로 반영**한다. 잘못된 목록을 빈 배열로 덮어쓰지 않는다.
4. main이 동시에 바뀌면 최신 트리를 기반으로 최대 3회 반영을 시도한다. 강제 push는 하지 않는다. 네트워크 응답이 끊기면 목록의 고유 ID를 확인해 중복 반영을 피한다.
5. 완료는 저장소 반영 완료다. Pages 배포가 성공한 다음 방문자 창을 새로고침한다.

실패한 Git blob/commit 객체가 저장소 객체 데이터베이스에 남을 수 있지만, main/Pages의 음악 파일 경로와 공개 목록에는 최종 ref 갱신 전까지 반영되지 않는다. 이것은 비공개 저장 기능이 아니다.

## 실제 사용 점검 순서

| 순서 | 작업 | 합격 기준 |
|---|---|---|
| 1 | 관리자와 방문자 시크릿 창 분리 | 방문자는 업로드 메뉴 없이 목록 접근 |
| 2 | 토큰/제목/음원/동의 누락 검사 | 업로드 전에 안내, 저장소 변경 없음 |
| 3 | 작은 배포 허용 MP3와 표지 업로드 | 한 커밋에 음원·표지·catalog 반영, 토큰 지워짐 |
| 4 | Pages 배포 후 새로고침 | 제목·아티스트·설명·표지 일치, 총 곡 수 증가 |
| 5 | 제목·아티스트·설명, 대소문자·양끝 공백 검색 | 일치하는 공개곡만 표시, 결과 없음 안내 |
| 6 | 최신/제목/오래된 순 정렬, 재생 중 검색 | 정렬 정상, 기존 오디오 요소와 재생 유지 |
| 7 | 재생·정지·탐색·끝까지 듣기, 다른 곡 재생 | 올바른 음원 재생, 동시 재생 방지 |
| 8 | 곡 공유 후 다른 창 열기 | 해당 곡 카드로 이동, 비공개/없는 ID는 안내 |
| 9 | 상단 사이트 공유, 클립보드 거부 | 사이트 URL에서 곡 파라미터 제거, 실패하면 복사할 정확한 링크 표시 |
| 10 | 내려받기 후 원본 비교 | 저장된 파일 재생, 크기/길이 및 가능하면 SHA-256 일치 |
| 11 | 휴대폰 Chrome·Samsung Internet 세로/가로 | 680px 이하 1열, 가로 넘침 없음, 파일 선택·공유·저장 가능 |
| 12 | 틀린/읽기 전용 토큰 | GitHub 쓰기 거절, 목록/공개 파일 경로 추가 없음 |
| 13 | 격리 테스트 목록의 false/누락 허용 값 | 목록·검색·플레이어·다운로드 버튼에서 제외 |

현재 실제 곡 목록은 비어 있다. 승인받지 않은 음원이나 테스트 음원을 운영 목록에 자동 등록하지 않는다.

## 자동 검사

저장소 루트에서 `node --test tests/music-share.test.cjs`.

브라우저 DOM과 GitHub HTTP 응답을 모의한 Node 검사다. 공개 필터, 입력 검증, 원자적 반영 요청, 권한 거절, 손상 목록, 동시 갱신, 응답 유실, 재생 요소 보존, 한 곡 재생, 공유 복구를 검증한다. 실제 GitHub 토큰 권한·파일 업로드·브라우저 코덱·실기 화면을 테스트한 것으로 해석하지 않는다.
