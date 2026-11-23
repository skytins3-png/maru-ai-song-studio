"use strict";
(function(){
const $=id=>document.getElementById(id);
const API="https://raw.githubusercontent.com/skytins3-png/maru-ai-song-studio/main/agency-reports/latest/";
const STORAGE="maru-agency-local-cases-v1";
function element(tag,text,cls){const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n}
function localRead(){try{const j=JSON.parse(localStorage.getItem(STORAGE)||"[]");return Array.isArray(j)?j.filter(x=>x&&typeof x.id==="string").slice(-250):[]}catch{return []}}
function localSave(items){try{localStorage.setItem(STORAGE,JSON.stringify(items));return true}catch{$("calcResult").textContent="브라우저 저장소 사용에 실패했습니다. 값을 다시 확인하세요.";return false}}
function format(n,c){return new Intl.NumberFormat("ko-KR",{style:"currency",currency:c,maximumFractionDigits:2}).format(n)}
function download(name,data){
 const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json;charset=utf-8"});
 const u=URL.createObjectURL(blob),a=element("a");a.href=u;a.download=name;
 document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),1200);
}
function renderLocal(){
 const l=$("localList");l.replaceChildren();const items=localRead();
 if(!items.length){l.append(element("p","아직 입력한 정산 건이 없어."));return}
 [...items].reverse().forEach(item=>{
  const d=element("div",undefined,"case");
  d.append(element("strong",item.name),element("p",item.currency+" · 지출 "+format(item.spent,item.currency)+", 수령 "+format(item.received,item.currency)));
  const label=item.difference>=0?"차액(지출−수령) ":"초과 수령 ";
  d.append(element("div",label+format(Math.abs(item.difference),item.currency)+" · 차액 비율 "+item.differencePercent.toFixed(2)+"%","status "+(item.difference>=0?"warn":"good")));
  d.append(element("p",item.createdAt+" · 이 계산은 플랫폼 수수료를 확인한 결과가 아닙니다."));
  const dl=element("button","이 건 보고서 저장");dl.addEventListener("click",()=>download("MARU-AGENCY-"+item.id+".json",item));
  const del=element("button","이 건 삭제");del.className="secondary";del.addEventListener("click",()=>{
   if(!confirm("이 건을 휴대폰 기록에서 삭제할까요?"))return;
   const next=localRead().filter(x=>x.id!==item.id);if(localSave(next))renderLocal()
  });
  d.append(dl,del);l.append(d);
 });
}
$("caseForm").addEventListener("submit",event=>{
 event.preventDefault();
 const name=$("caseName").value.trim(),currency=$("caseCurrency").value;
 const spent=Number($("caseSpent").value),received=Number($("caseReceived").value);
 if(!name||!["CNY","KRW","USD"].includes(currency)||!Number.isFinite(spent)||!Number.isFinite(received)||spent<=0||received<0||spent>1e9||received>1e9){
  $("calcResult").textContent="입력 금액과 통화를 확인해.";return
 }
 const difference=spent-received;
 const record={id:(crypto.randomUUID?crypto.randomUUID():"agency-"+Date.now()),name,currency,spent,received,difference,
  differencePercent:100*difference/spent,
  notes:$("caseNotes").value.slice(0,600),createdAt:new Date().toISOString(),
  status:"calculated_only",externalSettlementVerified:false,realPlatformFeeVerified:false,
  explanation:"입력한 동일 통화의 두 금액만 계산함; 플랫폼 수수료나 실제 에이전시 정산을 검증한 것이 아님"};
 const items=localRead();items.push(record);
 if(!localSave(items))return;
 $("calcResult").textContent="저장된 건: "+name+"\n지출: "+format(spent,currency)+
 "\n실수령: "+format(received,currency)+"\n지출−수령 차액: "+format(difference,currency)+
 "\n지출 대비 차액 비율: "+record.differencePercent.toFixed(2)+"%"+
 "\n주의: 이 차액이 플랫폼 수수료라는 뜻은 아니야.";
 renderLocal();$("caseName").value="";$("caseSpent").value="";$("caseReceived").value="";$("caseNotes").value="";
});
$("exportCases").addEventListener("click",()=>download("MARU-AGENCY-PRIVATE-BACKUP-"+new Date().toISOString().slice(0,10)+".json",
 {format:"maru-agency-local-v1",createdAt:new Date().toISOString(),cases:localRead()}));
async function remote(){
 $("remoteSummary").textContent="GitHub에 올라간 실제 건별 보고서를 조회하는 중...";
 const list=$("remoteCases");list.replaceChildren();
 try{
  const response=await fetch(API+"index.json?nocache="+Date.now(),{cache:"no-store"});
  if(!response.ok)throw Error("보고서 연결 HTTP "+response.status);
  const index=await response.json();
  if(!index||index.count!==11||!Array.isArray(index.cases)||index.cases.length!==11)throw Error("보고서 11개 검증 실패");
  const generated=new Date(index.generatedAt);
  if(!Number.isFinite(generated.getTime()))throw Error("보고서 생성 시간 없음");
  const old=Date.now()-generated.getTime()>36*60*60*1000;
  $("remoteSummary").textContent="건별 보고서 "+index.cases.length+"건 · 모델이 실제 생성한 보고서 "+
    index.independentModelsVerified+"건 · "+(old?"오래된 기록":"최근 실행 기록")+
    "\n검사 시각: "+generated.toLocaleString("ko-KR",{timeZone:"Asia/Seoul"})+"\n※ AI 미연결은 활동 중으로 표시하지 않음";
  index.cases.forEach(item=>{
   const d=element("div",undefined,"case");
   d.append(element("strong",item.agentName+" · "+item.title));
   const check=item.passedChecks+"/"+item.totalChecks;
   const status=item.modelStatus==="model_report_generated"?"AI 분석 보고서 생성":
    item.modelStatus==="model_call_failed"?"AI 모델 호출 실패":"AI 모델 미연결";
   const line=item.status==="checks_passed"?"자료 검사 통과":"증거 부족 · 미완료";
   d.append(element("p",line+" ("+check+") · "+status));
   const a=element("a","이 건 실제 보고서 보기");
   const valid=/^[a-z0-9-]+\.json$/.test(item.reportFile);
   if(valid){a.href="https://github.com/skytins3-png/maru-ai-song-studio/blob/main/agency-reports/latest/"+item.reportFile;
    a.target="_blank";a.rel="noopener noreferrer";d.append(a)}else d.append(element("p","파일 이름 오류"));
   list.append(d);
  });
 }catch(error){
  $("remoteSummary").textContent="실제 보고서를 읽을 수 없으므로 성공으로 표시하지 않습니다: "+(error.message||error);
  list.append(element("p","GitHub 작업 기록에서 실패·미완료 사유를 확인하세요."));
 }
}
$("refresh").addEventListener("click",remote);
renderLocal();remote();
})();