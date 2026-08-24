MARU MUSIC LIVE V0.22.74 — 가사 없는 곡 자동 자막

핵심 수정
- 저장 가사가 있으면 기존처럼 저장 가사를 자막으로 사용
- 저장 가사가 없으면 현재 재생 중인 오디오/영상의 MediaStream 오디오 트랙을 직접 SpeechRecognition에 전달
- getUserMedia()를 호출하지 않음: 마이크를 열지 않음
- SpeechRecognition.start()를 인자 없이 호출하지 않음: 마이크 폴백 금지
- Android 마이크 오디오 포커스 전환에 따른 클릭음/순간 끊김 방지
- 직접 오디오 트랙 인식 미지원 브라우저에서는 음악은 계속 재생하고 경고만 표시

브라우저 조건
- 최신 브라우저의 SpeechRecognition.start(audioTrack) + HTMLMediaElement.captureStream() 지원 필요
- 지원 범위가 제한적인 API이므로 기기/브라우저에 따라 직접 음원 인식이 불가능할 수 있음

기준 원본
- github-pages(6).zip / V0.22.73
