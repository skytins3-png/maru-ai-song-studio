MARU V0.22.93 — MOBILE → PC DIRECT LAN SYNC

핵심 변경
1. 모바일에서 .marusync 파일을 저장하지 않고 PC로 바로 전송
2. PC에서 파일 선택/다운로드 폴더 작업 없음
3. 같은 Wi‑Fi/LAN의 V0.22.93 OBS Helper가 메모리 릴레이로 전송
4. PC MARU는 자동 수신 후 브라우저 IndexedDB에 원곡/MP4/커버/자막/순서를 저장
5. 전송은 작은 청크 단위로 진행되어 Helper가 전체 89곡을 메모리에 쌓지 않음
6. 기존 수동 .marusync 방식은 접힌 예비 메뉴로 유지
7. 원곡 재압축 없음, OBS 원곡 방송 기능 유지

필수: PC의 OBS Helper도 V0.22.93으로 교체 후 실행해야 합니다.
Windows 방화벽 질문이 나오면 개인 네트워크를 허용하세요.
