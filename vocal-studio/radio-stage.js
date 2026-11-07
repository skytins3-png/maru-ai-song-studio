"use strict";
(function() {
  const C = window.MaruCharacters;
  const S = window.MaruSunoVoiceLibrary;
  const PortraitDB=window.MaruLocalPortraits;
  const $ = id => document.getElementById(id);
  if (!C || !$("visualCanvas")) return;

  const canvas = $("visualCanvas"), cast = $("visualCast"), movie = $("visualMovie");
  const picture = $("visualStill"), modeLabel = $("visualMode"), title = $("visualTitle");
  const subtitle = $("visualSubtitle"), personSelect = $("stagePerson");
  const fileInput = $("stageFile"), rights = $("stageRights"), feedback = $("stageFeedback");
  const assets = new Map();
  let mode = "idle", primary = C.find("아환"), activeSpeaker = "아환", trackLabel = "";
  let sceneCast = null;
  let currentMedia = "", unassignedStageMessage = "가수 미지정";

  function note(text) { feedback.textContent = text; }

  function profileOf(key) {
    const original=C.CHARACTERS.find(c=>c.id===key||c.name===key);
    if(original)return original;
    const singer=S?.singer(key)||S?.SINGERS.find(c=>c.name===key);
    if(!singer)return C.find("아환");
    // A recognisable labelled *placeholder*, not a generated singer face or
    // a promise of an approved voice. Same ID always gets the same color.
    const serial=[...singer.id].reduce((sum,ch)=>sum+ch.charCodeAt(0),0);
    return {
      id:singer.id,name:singer.name,role:"singer",specialty:"AI 가수 후보 · 고유번호 "+singer.id,
      style:"가상 무대 대기",voice:"Suno 녹음 원곡만 사용",
      personality:"보컬/얼굴 개별 검증 전",
      coat:"hsl("+((serial*13)%360)+" 38% 43%)",hair:"#292935",skin:"#e3bb9d",
      accent:"hsl("+((serial*13+45)%360)+" 77% 72%)"
    };
  }

  function personCard(person, active, side) {
    const box = document.createElement("div");
    box.className = "visual-person" + (active ? " is-speaking" : "");
    box.dataset.role = person.role;
    box.dataset.side = side;
    const portrait = document.createElement("div");
    portrait.className = "portrait";
    const media=assets.get(person.id);
    if(media && media.type==="image"){
      const photo=document.createElement("img");
      photo.className="visual-portrait-photo";
      photo.src=media.url;
      photo.alt=person.name+" · 사용자가 등록한 방송 사진";
      portrait.append(photo);
    }else{
      const empty=document.createElement("div");
      empty.className="visual-portrait-placeholder";
      const branding=document.createElement("strong");
      branding.textContent="MARU RADIO";
      const message=document.createElement("span");
      message.textContent=person.name+" · 방송용 사진 미등록";
      empty.append(branding,message);
      portrait.append(empty);
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
    // Interview displays photos in their fixed 3 seats, not an image hiding guests.
    // Instrumental songs have no fabricated singer persona.
    const chosen = mode!=="talk"&&primary ? assets.get(primary.id) : null;
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
    const persons = mode === "talk" ? (sceneCast || C.castForConversation([{speaker:activeSpeaker}])) :
      mode === "stage" ? (primary?[primary]:[]) : [primary || C.find("아환")];
    const identity = mode + ":" + persons.map(x => x.id).join("|");
    // Keep cast cards mounted while another guest answers; only highlight moves.
    if (cast.dataset.identity !== identity) {
      cast.replaceChildren();
      for (let i=0;i<persons.length;i++) {
        const person=persons[i];
        const side=persons.length===3 ? (i===0?"left":i===1?"center":"right") :
          persons.length===2 ? (i===0?"left":"center") : "center";
        cast.append(personCard(person,person.name===activeSpeaker,side));
      }
      cast.dataset.identity = identity;
    }
    for (const card of cast.children) {
      const label = card.querySelector(".visual-name");
      card.classList.toggle("is-speaking",!!label && label.textContent === activeSpeaker);
    }
    title.textContent = trackLabel || (mode === "talk" ? "따뜻한 초대석 대화" :
      mode === "stage" ? "가수 무대 · 미리보기" : "MARU RADIO SHOW");
    subtitle.textContent = mode === "stage" && !primary ?
      unassignedStageMessage :
      mode === "stage" ? (primary?primary.name+" · Suno 원곡 무대":"연주 무대") :
      mode === "talk" ? persons.map(p=>p.name).join(" · ") + " | 가상 초대석 미리듣기" :
      mode === "bridge" ? "곡 소개 · 인사 · 다음 방송 안내" :
      "가상 캐릭터 콘셉트 · 동영상은 직접 등록해야 합니다";
    showMedia();
  }
  function setMode(value, who, label) {
    if (!C.MODES.includes(value)) return;
    mode = value;
    if (value !== "talk") sceneCast = null;
    if (value === "talk" && !sceneCast) sceneCast=C.castForConversation([{speaker:who||"윤솔"}]);
    primary = who === null ? null : profileOf(who || "아환");
    activeSpeaker = who || "아환";
    trackLabel = String(label || "").slice(0,100);
    render();
  }
  async function restoreLocalPortrait(id){
    if(!PortraitDB||assets.has(id))return;
    try{
      const blob=await PortraitDB.load(id);
      if(!blob||assets.has(id)||!PortraitDB.valid(id,blob))return;
      assets.set(id,{url:URL.createObjectURL(blob),type:"image"});
      cast.dataset.identity="";
      render();
      note(profileOf(id).name+"의 저장된 공식 사진을 이 기기에서 불러왔습니다.");
    }catch{/* Private mode or disabled storage: manual upload still works. */}
  }
  $("stageAhwanPhoto").onclick=()=>{
    personSelect.value="ahwan";
    if(!rights.checked){
      note("아환 공식 사진을 사용하려면 먼저 아래 사진·초상권 확인 칸에 체크해 주세요.");
      rights.focus();
      return;
    }
    fileInput.click();
  };
  for (const c of C.CHARACTERS) {
    const opt=document.createElement("option");
    opt.value=c.id;opt.textContent=c.name+" · "+c.specialty;
    personSelect.append(opt);
  }
  for(const candidate of S.SINGERS){
    const opt=document.createElement("option");
    opt.value=candidate.id;
    opt.textContent=candidate.id+" · "+candidate.name+" · Suno 가수 후보";
    personSelect.append(opt);
  }
  personSelect.onchange = () => {
    const c = profileOf(personSelect.value);
    note(c.name + " | 사진 또는 영상을 등록하면 실제 화면으로 보여줍니다.");
    setMode(c.role === "host" ? "bridge" : c.role === "guest" ? "talk" : "stage", c.name);
    void restoreLocalPortrait(c.id);
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
    const person = profileOf(personSelect.value);
    const old = assets.get(person.id);
    if (old) URL.revokeObjectURL(old.url);
    const url = URL.createObjectURL(file);
    assets.set(person.id, {url,type:kind});
    cast.dataset.identity="";
    currentMedia = ""; // replaced URL for currently displayed character
    if(kind==="image"&&$("stageKeepLocal")?.checked&&PortraitDB){
      void PortraitDB.save(person.id,file).then(()=>
        note(person.name+"의 사진을 이 브라우저에만 보관했습니다. 실제 촬영 영상과 다릅니다.")
      ).catch(()=>note("사진은 표시되지만 브라우저 저장에 실패했습니다. 다음 방문 시 다시 등록해야 합니다."));
    }
    setMode(person.role === "host" ? "bridge" :
      person.role === "guest" ? "talk" : "stage", person.name);
    note(person.name + "의 " + (kind === "video" ? "영상" : "사진") +
      "이 이 브라우저에만 등록됐습니다. 소리는 원곡 오디오가 담당합니다.");
  };
  $("stageRemove").onclick = () => {
    const id = personSelect.value, previous = assets.get(id);
    if (previous) URL.revokeObjectURL(previous.url);
    assets.delete(id);
    cast.dataset.identity="";
    if(PortraitDB)void PortraitDB.remove(id).catch(()=>{});
    removeCurrentMedia();
    render();
    note(profileOf(id).name + "의 화면 연결만 해제했습니다. 원본은 삭제하지 않았습니다.");
  };
  window.addEventListener("pagehide",() => {
    removeCurrentMedia();
    for (const asset of assets.values()) URL.revokeObjectURL(asset.url);
    assets.clear();
  });
  window.MaruVisualStage = {
    beginConversation(lines) {
      sceneCast=C.castForConversation(lines);
      // Stay in the same layout from the first question to the final answer.
      mode="talk";
      const invited=sceneCast.length===3?sceneCast[2]:null;
      primary=(invited&&assets.has(invited.id))?invited:C.find("아환");
      activeSpeaker="아환";
      trackLabel="초대석 · 음악 이야기";
      render();
    },
    speech(line, kind) {
      const nextMode=C.modeForCue(kind),name=line&&line.speaker||"아환";
      if(nextMode==="talk") {
        if(!sceneCast) sceneCast=C.castForConversation([line]);
        mode="talk";
        const invited=sceneCast.length===3?sceneCast[2]:null;
        primary=(invited&&assets.has(invited.id))?invited:C.find("아환");
        activeSpeaker=name;
        trackLabel="초대석 · 음악 이야기";
        render();
      } else {
        setMode(nextMode==="idle"?"bridge":nextMode,name,
          kind==="intro"?"곡 소개 · "+name:"방송 진행 · "+name);
      }
    },
    endSpeech() {
      for(const card of cast.children) card.classList.remove("is-speaking");
    },
    song(track) {
      // User-selected Suno vocalist wins over language/genre *guessing*.
      const assigned=S.singer(track.singerId);
      unassignedStageMessage=track.category==="INSTR" ?
        "연주곡 · 보컬 가수를 표시하지 않습니다" :
        "가수 미지정 · 원곡을 부른 가수의 ID를 선택해야 합니다";
      if(!assigned) setMode("stage",null,track.title);
      else setMode("stage",profileOf(assigned.id).id,track.title);
    },
    idle() {setMode("idle","아환","MARU RADIO SHOW");},
    state() {
      return {mode,person:primary&&primary.id,assets:assets.size,
        cast:sceneCast?sceneCast.map(p=>p.name):[],activeSpeaker};
    }
  };
  personSelect.value = "ahwan";
  setMode("idle","아환","MARU RADIO SHOW");
  note("임시 도형 얼굴 제거 · 아환의 공식 사진을 직접 적용해 주세요.");
  void restoreLocalPortrait("ahwan");
})();
