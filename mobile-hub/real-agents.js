"use strict";
(function(){
const base="../agent-runs/latest/";
const $=id=>document.getElementById(id);
const group7=new Set(["maru","leo","toto","mimi","happy","tori","nuri"]);
const groupAgency=new Set(["agency-operations"]);
let latest=null;
const n=(tag,txt,className)=>{const x=document.createElement(tag);if(txt!==undefined)x.textContent=txt;if(className)x.className=className;return x};
function statusLabel(x){
 if(x==="model_report_generated")return["AI 실제 보고서 생성","ok"];
 if(x==="model_call_failed")return["AI 호출 실패","bad"];
 if(x==="not_scheduled_quota")return["이번 실행은 모델 순환 대기","pending"];
 return["AI 미연결","pending"];
}
function roleLabel(role) {
 const group=group7.has(role.id)?"original":groupAgency.has(role.id)?"agency":"expert";
 return group;
}
function showRole(role){
 const root=n("div",undefined,"role");
 const heading=n("div",undefined,"row");
 heading.append(n("h3",role.name+" · "+role.id));
 const [txt,cls]=statusLabel(role.modelStatus);
 heading.append(n("span",txt,"state "+cls));
 root.append(heading);
 root.append(n("p",role.mission));
 root.append(n("small","근거 검사 "+role.checks+"/"+role.total+" · "+role.checkStatus));
 const details=n("details");
 details.append(n("summary","이 담당자의 원본 보고서 열기"));
 const data=n("div","클릭하면 서버에 저장된 이 담당자의 JSON 결과를 확인합니다.","report");
 details.append(data);
 let loading=false;
 details.addEventListener("toggle",async()=>{
  if(!details.open||loading||data.dataset.loaded==="1")return;
  loading=true;data.textContent="실제 담당자 보고서 확인 중";
  try{
    if(!/^[a-z0-9-]+\.json$/.test(role.reportPath)||role.reportPath!==role.id+".json")throw Error("보고서 파일 이름 검증 실패");
    const response=await fetch(base+role.reportPath+"?version="+Date.now(),{cache:"no-store"});
    if(!response.ok)throw Error("서버 응답 "+response.status);
    const raw=await response.json();
    if(raw.id!==role.id)throw Error("담당자 보고서 일치하지 않음");
    const lines=["담당: "+raw.label,"임무: "+raw.mission,"수집 시각: "+raw.checkedAt,
      "실행 분류: "+raw.execution,"",
      "검사된 증거:"];
    for(const c of raw.checks||[])lines.push((c.passed?"✓ ":"✕ ")+c.test+" · "+c.evidence);
    lines.push("","모델 실행: "+(raw.model?.status||"미확인"));
    if(raw.model?.model)lines.push("모델: "+raw.model.model);
    if(raw.model?.report)lines.push("","AI 분석 보고서:",raw.model.report);
    else lines.push("","모델 연결/실패 이유: "+(raw.model?.reason||"미확인"));
    lines.push("","외부 계정·Suno·BIGO 조작: "+(raw.realWorldExternalAction||"기록 없음"));
    data.textContent=lines.join("\n");
    data.dataset.loaded="1";
  }catch(error){data.textContent="보고서를 열 수 없습니다: "+(error.message||error)}
  finally{loading=false}
 });
 root.append(details);
 return root;
}
function render(){
 const root=$("roles");root.replaceChildren();
 if(!latest||!Array.isArray(latest.roles)){root.append(n("p","검사 결과가 없습니다."));return}
 const wanted=$("filter").value;
 const list=latest.roles.filter(r=>wanted==="all"||roleLabel(r)===wanted);
 for(const x of list)root.append(showRole(x));
 if(!list.length)root.append(n("p","선택한 그룹의 보고서는 없습니다."));
}
async function refresh(){
 $("summary").textContent="실제 GitHub 서버의 보고서를 확인하는 중입니다.";
 try{
  const response=await fetch(base+"index.json?v="+Date.now(),{cache:"no-store"});
  if(!response.ok)throw Error("보고서 서버 HTTP "+response.status);
  const data=await response.json();
  if(data.totalRoles!==18||!Array.isArray(data.roles)||data.roles.length!==18)throw Error("18명 보고서가 완전하지 않음");
  const unique=new Set(data.roles.map(x=>x.id));
  if(unique.size!==18)throw Error("중복 담당자가 있어 보고서가 유효하지 않음");
  const date=new Date(data.generatedAt);
  if(!Number.isFinite(date.getTime()))throw Error("검사 시각이 없음");
  latest=data;
  const age=Date.now()-date.getTime();
  const old=age<0||age>36*60*60*1000;
  const modelCount=data.roles.filter(x=>x.modelStatus==="model_report_generated").length;
  $("summary").textContent=old?"보고서가 오래되었습니다. 현재 상태로 단정할 수 없습니다.":
   "GitHub 18개 개별 보고서 확인 · "+(modelCount===18?"모든 모델 보고서 생성 완료":modelCount===0?"실제 AI 모델 보고서 0건 · 미연결/실패":"실제 AI 모델 보고서 "+modelCount+"건");
  $("roleCount").textContent=String(data.roles.length);
  $("aiCount").textContent=String(modelCount);
  $("checksCount").textContent=String(data.roles.filter(x=>x.checkStatus==="evidence_checks_performed").length);
  $("lastCheck").textContent="마지막 실행: "+date.toLocaleString("ko-KR",{timeZone:"Asia/Seoul"})+" (한국 시간)"+(old?" · 오래된 보고서":"");
  if(typeof data.runUrl==="string"&&/^https:\/\/github\.com\/skytins3-png\/maru-ai-song-studio\/actions\/runs\/\d+$/.test(data.runUrl)){
   $("runLink").href=data.runUrl;
  }
  render();
 }catch(error){
  latest=null;$("roleCount").textContent="—";$("aiCount").textContent="—";$("checksCount").textContent="—";
  $("summary").textContent="현재 실제 보고서 조회 실패: "+(error.message||error);
  $("lastCheck").textContent="성공 상태를 확인할 수 없습니다.";render();
 }
}
$("refresh").addEventListener("click",refresh);
$("filter").addEventListener("change",render);
refresh();
})();