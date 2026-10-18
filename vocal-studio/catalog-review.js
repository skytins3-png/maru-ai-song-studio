"use strict";
(function(){
 const P=window.MaruCatalogReviewPolicy;
 const $=id=>document.getElementById(id);
 const SAVE_KEY="maru-local-audio-analysis-v1",REV_KEY="maru-local-audio-reviews-v1";
 let songs=[],duplicates=[],reviews={},playUrl;
 function msg(s){$("status").textContent=s;}
 function el(tag,props={},txt){const n=document.createElement(tag);Object.assign(n,props);if(txt!==undefined)n.textContent=txt;return n;}
 function getSaved(){
   try{reviews=JSON.parse(localStorage.getItem(REV_KEY)||"{}")||{};}catch{reviews={};}
   try{const saved=JSON.parse(localStorage.getItem(SAVE_KEY)||"null");if(saved)accept(saved,false);}catch{msg("브라우저에 저장된 분석 목록을 읽을 수 없습니다. JSON을 다시 선택하세요.");}
 }
 function saveReviews(){
   try{localStorage.setItem(REV_KEY,JSON.stringify(reviews));}catch(e){msg("결과 저장 공간 부족: JSON 내보내기로 보관하세요.");}
 }
 function accept(raw,save=true){
   const rows=P.validate(raw),sets=P.dedupe(rows);
   songs=sets.unique;duplicates=sets.duplicates;
   if(save&&$("saveCatalog").checked){try{localStorage.setItem(SAVE_KEY,JSON.stringify(raw));}catch(e){msg("분석 목록을 기기에 저장하지 못했습니다.");}}
   show();
 }
 function saveOne(sha,field,val){reviews[sha]??={};reviews[sha][field]=val;saveReviews();renderSummary();}
 function makeOption(value,label){return el("option",{value},label);}
 function rating(sha,property,label){
   const w=el("label",{},label);const select=el("select",{ariaLabel:label});
   select.append(makeOption("","미평가"));
   for(let i=1;i<=5;i++)select.append(makeOption(String(i),i+"점"));
   select.value=reviews[sha]?.[property]||"";
   select.onchange=()=>saveOne(sha,property,select.value);
   w.append(select);return w;
 }
 function renderSummary(){
   $("catalogSummary").textContent="원본 "+(songs.length+duplicates.length)+"곡 · 완전 중복 "+duplicates.length+"곡 제외 → 실제 고유 파일 "+songs.length+"곡 · 청음 완료 기록 "+P.reviewCounts(reviews)+"개 (AI 가수 승인 아님)";
 }
 function linkLocal(file,track){
   if(!file)return;
   const expected=track.filename;
   if(file.name!==expected){
     if(!confirm("분석 목록 제목과 실제 파일명이 다릅니다. 서로 다른 곡일 수 있습니다. 계속 청음할까요?"))return;
   }
   const player=$("player");player.pause();
   if(playUrl)URL.revokeObjectURL(playUrl);
   playUrl=URL.createObjectURL(file);
   player.src=playUrl;
   $("nowPlaying").textContent=track.filename+" · "+file.name+" (원본 로컬 청음)";
   player.play().catch(()=>msg("재생 버튼을 직접 눌러 주세요."));
   msg("오디오 파일은 기기에서만 재생하며 서버로 업로드하지 않습니다.");
 }
 function show(){
   const q=$("filter").value.trim().toLocaleLowerCase();
   const lang=$("langFilter").value;
   const filtered=songs.filter(t=>(lang==="all"||P.languageHint(t)===lang)&&t.filename.toLocaleLowerCase().includes(q));
   $("list").replaceChildren();$("empty").hidden=filtered.length>0;
   for(const song of filtered){
     const sha=song.sha256, c=el("article"), h=el("h3",{},song.filename);c.append(h);
     c.append(el("small",{},P.languageHint(song)+" · "+Math.round(song.durationSeconds)+"초 · RMS 발췌 "+song.sampledAverageRmsDbfs+"dBFS (LUFS 아님)"));
     c.append(el("small",{},(song.rhythmBpmCandidates?.join(" / ")||"없음")+" BPM 참고후보 · 음성 정체성 미검증"));
     const flags=song.signalWarnings||[];
     if(flags.length)c.append(el("small",{className:"tag warn"},flags.join(" / ")));
     const pick=el("input",{type:"file",accept:"audio/*,.mp3,.m4a,.wav,.aac,.ogg,.flac"});
     pick.setAttribute("aria-label",song.filename+" 청음할 원곡 선택");
     pick.onchange=()=>linkLocal(pick.files[0],song);
     const row=el("div",{className:"row detail"});row.append(pick);c.append(row);
     const rates=el("div",{className:"score"});
     for(const [k,l] of [["timbre","음색"],["pitch","음정"],["diction","발음"],["identity","개성"]])rates.append(rating(sha,k,l));
     c.append(rates);
     const voice=el("label",{},"보컬 인원: ");const options=el("select");
     ["미확인","솔로","듀엣","합창","연주곡"].forEach(s=>options.append(makeOption(s,s)));
     options.value=reviews[sha]?.voiceCount||"미확인";
     options.onchange=()=>saveOne(sha,"voiceCount",options.value);voice.append(options);c.append(voice);
     const done=el("label");
     const box=el("input",{type:"checkbox",checked:reviews[sha]?.listeningDone===true});
     box.onchange=()=>saveOne(sha,"listeningDone",box.checked);
     done.append(box,el("span",{},"청음 완료"));c.append(done);
     const notes=el("textarea",{placeholder:"보컬 음색·특징·Persona 후보 메모"});
     notes.value=reviews[sha]?.notes||"";
     notes.onchange=()=>saveOne(sha,"notes",notes.value);c.append(notes);
     $("list").append(c);
   }
   renderSummary();
 }
 $("catalogInput").onchange=async e=>{
   const file=e.target.files?.[0];if(!file)return;
   if(file.size>20*1024*1024){msg("목록 JSON은 20MB 이하만 불러올 수 있습니다.");return;}
   try{const doc=JSON.parse(await file.text());accept(doc);msg("목록 읽기 완료 · 노래 오디션 후보는 음성 청음 후 결정하세요.");}
   catch(err){msg("분석 JSON 읽기 실패: "+err.message);}
 };
 $("filter").oninput=show;$("langFilter").onchange=show;
 $("export").onclick=()=>{
   const data={title:"MARU STUDIO private voice track notes",created:new Date().toISOString(),
     note:"각 SHA-256의 로컬 수동 청음 메모이며 30개 보컬 제작·음성복제 허가·방송 검증을 의미하지 않음",reviews};
   const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:"application/json"}));
   const a=el("a",{href:url,download:"MARU_STUDIO_107곡_보컬청음기록.json"});document.body.append(a);a.click();a.remove();
   setTimeout(()=>URL.revokeObjectURL(url),3000);
 };
 getSaved();if(!songs.length)renderSummary();
})();
