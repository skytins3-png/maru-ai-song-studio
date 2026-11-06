# MARU 10 전문가 역할 연구팀 (2026-11-07)

이 버전은 **작동 중인 독립 AI 10개가 아니라**, 10개 담당 역할·승인 정책·외부 출처 감시 파이프라인의 첫 단계이다. `music-share/experts.html`에 역할과 검증 출처를 표시한다.

## 연구·진화 절차
1. 고정된 3개 HTTPS 공식 출처에서 제목/본문 최대 192 KiB SHA-256 **관측값만** 수집 (원문·가사·악성코드·스크립트 다운로드 및 저장 금지).
2. 출처 변경 시 GitHub Actions artifact 보고서 작성. 운영자가 출처 및 이용권리를 검토하고 독자적 요약/코드 변경을 PR로 작성.
3. CI·악성코드/보안 검사·수동 저작권 검토를 마친 PR만 배포 대상으로 고려. 자동 학습 가중치 변경, 코드 실행, Suno 계정 접근, 댓글 수집, 무단 BIGO 송출은 하지 않음.
4. 기존 `scripts/scan_quarantined_media.py`는 미래 서버의 격리 파일 선행 검사일 뿐, 이 출처 확인 도구가 바이러스를 치료하는 기능은 아님.

## 출처 및 조건
- [Open Music Theory](https://viva.pressbooks.pub/openmusictheory/front-matter/introduction/): CC BY-SA 4.0, 개별 미디어/예제는 별도 확인 필요.
- [OWASP Cheat Sheet Series](https://owasp.org/projects/cheat-sheet-series): CC BY-SA 4.0, 보안 방어 교육에만 사용.
- [FFmpeg 법적 안내](https://www.ffmpeg.org/legal.html): 참고 문서. FFmpeg 바이너리 빌드 옵션에 따라 LGPL/GPL 조건 다름. 이 도구는 FFmpeg 바이너리를 재배포하지 않음.

이용 조건/robots 정책이 바뀌면 소스 목록과 사용 허용 범위를 사람이 다시 평가한다. 청취자 업로드는 ClamAV+ffprobe 결과와 저작권/운영자 승인을 따로 충족해야 한다.

## 검증
`python3 -m unittest discover -s tests -p 'test_ai_expert_watch.py'`

`python3 scripts/ai_expert_watch.py` (오프라인 검증)

`python3 scripts/ai_expert_watch.py --fetch --report reports/ai-expert-source-report.json` (허용된 3개 출처만 관측)

GitHub Actions는 매일 아침 KST 약 10:14에 예약 실행(실제 실행 지연 가능)하며 산출물만 남긴다. 저장소 자동 변경, 병합 또는 방송 공개는 하지 않는다.
