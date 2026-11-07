"use strict";
(function(){
  const Library=window.MaruSunoVoiceLibrary;
  const $=id=>document.getElementById(id);
  if(!Library||!$("sunoVoiceSinger")||!$("sunoVoiceFile"))return;
  const stems=new Map(),cueFiles=new Map();
  let active=null,preview=null,playing=false;
  const status=msg=>{$("sunoVoiceStatus").textContent=msg;};
  function stop() {
    if(active)active.cancel();
    if(preview){preview.pause();preview.removeAttribute("src");preview=null;}
    playing=false;
  }
  function cancelPreview() {
    if(preview){preview.pause();preview.removeAttribute("src");preview=null;}
  }
  function release(entry){if(entry?.url)URL.revokeObjectURL(entry.url);}
  for(const s of Library.SINGERS){
    const opt=document.createElement("option");
    opt.value=s.id;opt.textContent=s.id+" · "+s.name;
    $("sunoVoiceSinger").append(opt);
  }
  $("sunoVoiceFile").onchange=()=>{
    const file=$("sunoVoiceFile").files?.[0];
    $("sunoVoiceFile").value="";
    if(!file)return;
    if(!$("sunoVoiceRights").checked){status("원곡과 분리 보컬의 사용권을 먼저 확인하세요.");return;}
    if(!Library.eligible(file)){status("실제 다운로드한 오디오 파일만 가능합니다: MP3/WAV/M4A/AAC/OGG/FLAC 80MB 이하");return;}
    const id=$("sunoVoiceSinger").value;
    const old=stems.get(id);if(old)release(old);
    stems.set(id,{name:file.name,url:URL.createObjectURL(file)});
    status(Library.singer(id).name+" 보컬 참조 파일 연결됨 · 서버 업로드 없음 · 실제 음성 모델을 생성하거나 새 멘트를 말하게 하지는 않습니다.");
  };
  $("sunoVoicePreview").onclick=()=>{
    if(playing||window.MaruRadioPlayback?.running()){
      status("원곡 방송을 중지한 뒤 가수 보컬을 확인하세요.");return;
    }
    const id=$("sunoVoiceSinger").value,file=stems.get(id);
    if(!file){status("선택한 가수의 보컬 참조 오디오를 먼저 등록하세요.");return;}
    cancelPreview();
    const audio=new Audio(file.url);preview=audio;audio.volume=1;
    audio.onended=()=>{if(preview===audio)preview=null;status("가수 보컬 참조 재생 종료");};
    audio.onerror=()=>{if(preview===audio)preview=null;status("보컬 참조를 재생할 수 없습니다.");};
    void audio.play().then(()=>status(Library.singer(id).name+"의 Suno 보컬 참조 미리듣기"))
      .catch(()=>{if(preview===audio)preview=null;status("기기에서 재생이 차단됐습니다.");});
  };
  $("sunoVoiceRelease").onclick=()=>{
    const id=$("sunoVoiceSinger").value,entry=stems.get(id);
    if(preview)cancelPreview();
    if(entry)release(entry);
    stems.delete(id);status(Library.singer(id).name+"의 보컬 참조 연결 해제 · 원본 파일은 그대로 보존");
  };
  $("cueSpeaker").onchange=()=>status("선택된 화자와 녹음된 문장이 정확히 일치할 때만 음성을 재생합니다.");
  $("cueFile").onchange=()=>{
    const file=$("cueFile").files?.[0];
    $("cueFile").value="";
    if(!file)return;
    if(!$("sunoVoiceRights").checked){status("음성 클립의 방송 사용권을 먼저 확인하세요.");return;}
    const speaker=$("cueSpeaker").value;
    const text=$("cueText").value.replace(/\s+/g," ").trim();
    if(!Library.isKnownVoice(speaker)||text.length<5||text.length>240){
      status("화자와 녹음된 대본 문장 5~240자를 정확하게 입력하세요.");return;
    }
    if(!Library.eligible(file,20)){status("녹음된 멘트 오디오는 20MB 이하 오디오 파일만 등록할 수 있어요.");return;}
    const key=Library.cueKey(speaker,text),old=cueFiles.get(key);if(old)release(old);
    cueFiles.set(key,{url:URL.createObjectURL(file),speaker,text,name:file.name});
    status(speaker+"의 정확한 멘트 녹음 파일이 연결됐습니다. 등록된 문장과 같을 때만 들립니다.");
  };
  function playLine(line){
    const entry=cueFiles.get(Library.cueKey(line?.speaker,line?.text));
    let resolve;
    const promise=new Promise(r=>{resolve=r;});
    let settled=false;
    const finish=ok=>{
      if(settled)return;
      settled=true;
      if(active===handle)active=null;
      resolve(ok);
    };
    let audio=null,timer=null;
    const handle={
      matched:!!entry,promise,
      cancel(){if(timer!==null)clearTimeout(timer);
        if(audio){audio.pause();audio.removeAttribute("src");}
        finish(false);
      }
    };
    if(!entry){
      // Captions only. Never impersonate the voice by synthesizing missing lines.
      timer=setTimeout(()=>finish(true),Math.max(900,Math.min(2400,String(line?.text||"").length*24)));
    }else{
      if(active)active.cancel();
      audio=new Audio(entry.url);
      audio.volume=1;active=handle;
      audio.onended=()=>finish(true);
      audio.onerror=()=>finish(true); // continue with captions, never substitute TTS
      void audio.play().catch(()=>finish(true));
    }
    return handle;
  }
  window.MaruRecordedCues={
    playLine,stop,cancelPreview,
    singer(id){return stems.get(id)||null;},
    singerCount(){return stems.size;},
    cueCount(){return cueFiles.size;}
  };
  window.addEventListener("pagehide",()=>{
    stop();
    for(const entry of stems.values())release(entry);
    for(const entry of cueFiles.values())release(entry);
    stems.clear();cueFiles.clear();
  });
  status("Suno 30명 보컬 원본/분리본 연결 대기 · 음성합성(TTS) 사용 안 함");
})();