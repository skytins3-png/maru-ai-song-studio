"use strict";
(function() {
  const C = window.MaruCharacters;
  const $ = id => document.getElementById(id);
  if (!C || !$("visualCanvas")) return;

  const canvas = $("visualCanvas"), cast = $("visualCast"), movie = $("visualMovie");
  const picture = $("visualStill"), modeLabel = $("visualMode"), title = $("visualTitle");
  const subtitle = $("visualSubtitle"), personSelect = $("stagePerson");
  const fileInput = $("stageFile"), rights = $("stageRights"), feedback = $("stageFeedback");
  const assets = new Map();
  let mode = "idle", primary = C.find("아환"), activeSpeaker = "아환", trackLabel = "";
  let currentMedia = "";

  function note(text) { feedback.textContent = text; }
  function personCard(person, active, side) {
    const box = document.createElement("div");
    box.className = "visual-person" + (active ? " is-speaking" : "");
    box.dataset.role = person.role;
    box.dataset.side = side;
    const portrait = document.createElement("div");
    portrait.className = "portrait";
    for (const [key, color] of [["--coat",person.coat],["--hair",person.hair],
                                ["--skin",person.skin],["--accent",person.accent]])
      portrait.style.setProperty(key, color);
    for (const klass of ["hair","neck","face","coat","lapel","shine"]) {
      const part = document.createElement("span");
      part.className = klass;
      portrait.append(part);
    }
    const name = document.createElement("strong");
    name.className = "visual-name";
    name.textContent = person.name;
    const role = document.createElement("span");
    role.className = "visual-role";
    role.textContent = person.specialty;
    box.append(portrait,name,role);
    return box;
  }
  function removeCurrentMedia() {
    movie.pause();
    movie.removeAttribute("src");
    movie.classList.remove("is-visible");
    picture.removeAttribute("src");
    picture.classList.remove("is-visible");
    canvas.classList.remove("has-media");
    currentMedia = "";
  }
  function showMedia() {
    const chosen = assets.get(primary.id);
    if (!chosen) {
      if (currentMedia) removeCurrentMedia();
      return;
    }
    if (currentMedia === chosen.url) return;
    removeCurrentMedia();
    currentMedia = chosen.url;
    if (chosen.type === "video") {
      movie.src = chosen.url;
      movie.muted = true; // videos never steal audio from the original Suno song
      movie.loop = true;
      movie.playsInline = true;
      movie.classList.add("is-visible");
      void movie.play().catch(() => note("영상 자동 재생 제한: 화면을 누른 후 영상 재생을 확인해 주세요."));
    } else {
      picture.src = chosen.url;
      picture.classList.add("is-visible");
    }
    canvas.classList.add("has-media");
  }
  function render() {
    canvas.dataset.mode = mode;
    modeLabel.textContent = mode === "stage" ? "🎤 노래 무대" :
      mode === "talk" ? "🛋 초대석 토크" :
      mode === "bridge" ? "🎙 아환 진행" : "📻 방송 준비";
    cast.replaceChildren();
    if (mode === "talk") {
      const guest = C.guestFor(activeSpeaker);
      cast.append(
        personCard(C.find("아환"), activeSpeaker === "아환", "left"),
        personCard(guest, activeSpeaker !== "아환", "right")
      );
    } else if (mode === "stage" && primary) {
      cast.append(personCard(primary, false, "center"));
    } else {
      cast.append(personCard(C.find("아환"), true, "center"));
    }
    title.textContent = trackLabel || (mode === "talk" ? "따뜻한 초대석 대화" :
      mode === "stage" ? "가수 무대 · 미리보기" : "MARU RADIO SHOW");
    subtitle.textContent = mode === "stage" && !primary ?
      "연주곡 · 노래하는 가수를 표시하지 않습니다" :
      mode === "talk" ? "아환 · " + C.guestFor(activeSpeaker).name + " | 승인된 멘트 미리듣기" :
      mode === "bridge" ? "곡 소개 · 인사 · 다음 방송 안내" :
      "가상 캐릭터 콘셉트 · 동영상은 직접 등록해야 합니다";
    showMedia();
  }
  function setMode(value, who, label) {
    if (!C.MODES.includes(value)) return;
    mode = value;
    primary = who === null ? null : C.find(who || "아환");
    activeSpeaker = value === "talk" ? (who || "윤솔") : "아환";
    trackLabel = String(label || "").slice(0,100);
    render();
  }
  for (const c of C.CHARACTERS) {
    const opt = document.createElement("option");
    opt.value = c.id;
    opt.textContent = c.name + " · " + c.specialty;
    personSelect.append(opt);
  }
  personSelect.onchange = () => {
    const c = C.find(personSelect.value);
    note(c.name + " | " + c.style + " | " + c.personality + " | " + c.voice);
    setMode(c.role === "host" ? "bridge" : c.role === "guest" ? "talk" : "stage", c.name);
  };
  $("stageRatio").onchange = () => {
    canvas.dataset.ratio = $("stageRatio").value === "square" ? "square" : "portrait";
  };
  for (const btn of document.querySelectorAll("[data-stage-preview]")) {
    btn.onclick = () => {
      const value = btn.dataset.stagePreview;
      if (value === "talk") setMode(value,"하린","초대석 이야기");
      else if (value === "stage") setMode(value,"강태준","가수 노래 무대");
      else setMode("bridge","아환","다음 곡을 소개합니다");
      personSelect.value = value === "stage" ? "kang" : value === "talk" ? "harin" : "ahwan";
    };
  }
  fileInput.onchange = () => {
    const file = fileInput.files && fileInput.files[0];
    fileInput.value = "";
    if (!file) return;
    if (!rights.checked) {
      note("이 영상·이미지의 공연·초상·방송 사용권을 확인하고 동의해 주세요.");
      return;
    }
    const kind = C.mediaType(file);
    if (!kind) {
      note("MP4/WebM 200MB 이하 또는 JPG/PNG/WebP 20MB 이하 파일만 등록할 수 있습니다.");
      return;
    }
    const person = C.find(personSelect.value);
    const old = assets.get(person.id);
    if (old) URL.revokeObjectURL(old.url);
    const url = URL.createObjectURL(file);
    assets.set(person.id, {url,type:kind});
    currentMedia = ""; // replaced URL for currently displayed character
    setMode(person.role === "host" ? "bridge" :
      person.role === "guest" ? "talk" : "stage", person.name);
    note(person.name + "의 " + (kind === "video" ? "영상" : "사진") +
      "이 이 브라우저에만 등록됐습니다. 소리는 원곡 오디오가 담당합니다.");
  };
  $("stageRemove").onclick = () => {
    const id = personSelect.value, previous = assets.get(id);
    if (previous) URL.revokeObjectURL(previous.url);
    assets.delete(id);
    removeCurrentMedia();
    render();
    note(C.find(id).name + "의 화면 연결만 해제했습니다. 원본은 삭제하지 않았습니다.");
  };
  window.addEventListener("pagehide",() => {
    removeCurrentMedia();
    for (const asset of assets.values()) URL.revokeObjectURL(asset.url);
    assets.clear();
  });
  window.MaruVisualStage = {
    speech(line, kind) { const mode = C.modeForCue(kind);
      const name = line && line.speaker || "아환";
      setMode(mode === "idle" ? "talk" : mode, name,
        String(line && line.text || "").slice(0,70)); },
    song(track) { const singer = C.singerFor(track.category);
      setMode("stage", singer ? singer.name : null, track.title); },
    idle() {setMode("idle","아환","MARU RADIO SHOW");},
    state() {return {mode,person:primary && primary.id,assets:assets.size};}
  };
  personSelect.value = "ahwan";
  setMode("idle","아환","MARU RADIO SHOW");
  note("8명 가상 캐릭터의 기본 화면 준비 완료 · 실제 공연 영상은 직접 등록하세요.");
})();
