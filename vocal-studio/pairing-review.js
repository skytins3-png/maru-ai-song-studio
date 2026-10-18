"use strict";
const P=window.MaruVocalPairs,$=id=>document.getElementById(id);
let names=[],selectedPayload=null;
function status(s){$("status").textContent=s;}
function create(tag,text){const e=document.createElement(tag);if(text!==undefined)e.textContent=text;return e;}
function download(text,name){
 const blob=new Blob([text],{type:"application/json"}),url=URL.createObjectURL(blob);
 const a=create("a");a.download=name;a.href=url;document.body.append(a);a.click();a.remove();
 setTimeout(()=>URL.revokeObjectURL(url),2500);
}
function render(){
 const frag=document.createDocumentFragment();
 const review=P.aggregate(selectedPayload,names);
 $("count").textContent="Suno Persona 제작 테스트에 쓸 2곡 선별 완료 "+review.readyCount+"/30명 (가수 제작 완료 아님)";
 for(const r of review.rows){
  const c=create("article"),h=create("h3",r.name+" · "+r.id);
  const label=create("span",r.ready?"두 곡 청음 기준 충족":"청음/선별 중");
  label.className=r.ready?"tag good":"tag warn";
  c.append(h,label);
  c.append(create("p","테스트곡 A: "+(r.songA||"없음")+" · B: "+(r.songB||"없음")));
  c.append(create("small",r.stage));
  if(r.reasons.length){
    const ul=create("ul");
    for(const s of r.reasons)ul.append(create("li",s));
    c.append(ul);
  }else{
    c.append(create("p","다음: Suno에서 해당 후보의 실제 두 곡을 직접 비교해 Persona를 만들고, 다른 곡에서 음색이 유지되는지 확인해야 합니다."));
  }
  const link=create("a","해당 가수 Suno 제작 설정 보기 →");
  link.href="./make.html?artist="+encodeURIComponent(r.id);link.className="link";
  c.append(link);frag.append(c);
 }
 $("results").replaceChildren(frag);
}
document.addEventListener("DOMContentLoaded",async()=>{
 try{
  const roster=await fetch("./artists.json",{cache:"no-store"});
  if(!roster.ok)throw Error("명단을 읽을 수 없습니다.");
  names=(await roster.json()).artists;
  if(names.length!==30)throw Error("명단 30명 확인 실패");
 }catch(e){status("명단 읽기 실패: "+e.message);return;}
 $("file").onchange=async e=>{
  const file=e.target.files?.[0];if(!file)return;
  if(file.size>3*1024*1024){status("선별 기록 JSON은 3MB 이하여야 합니다.");return;}
  try{
   const data=P.validate(JSON.parse(await file.text()));
   selectedPayload=data;
   render();status("선별 기록 "+file.name+"을 이 브라우저 메모리에서만 불러왔습니다. 서버 업로드하지 않았습니다.");
   $("export").disabled=false;
  }catch(err){selectedPayload=null;$("results").replaceChildren();$("count").textContent="선별 기록을 불러오지 못했습니다.";status("읽기 실패: "+err.message);}
 };
 $("export").onclick=()=>{
   if(!selectedPayload)return;
   const audit=P.aggregate(selectedPayload,names);
   const packed={kind:"MARU_PERSONA_TEST_PREP_ONLY",generatedAt:new Date().toISOString(),
    readyCount:audit.readyCount,possibleContentDuplicates:selectedPayload.possibleContentDuplicates||[],results:audit.rows,
    warning:"사용자 선별 데이터. 정식 AI 가수 제작·저작권·법적 허가·BIGO 청취자 수신 인증 아님."};
   download(JSON.stringify(packed,null,2),"MARU_STUDIO_30가수_Persona_제작대기_요약.json");
 };
 status("30명 후보 명단 확인 완료. 비공개 청음키트에서 저장한 JSON을 선택해 주세요.");
});
