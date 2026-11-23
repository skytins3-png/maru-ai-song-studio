"use strict";
(function(){
  const $ = id => document.getElementById(id);
  const rolesFallback = [
    ["MARU","통합 메뉴 점검"],["LEO","JavaScript 코드 문법 점검"],
    ["TOTO","프로그램 간 자료 전달 점검"],["MIMI","라디오 재생·방송 화면 점검"],
    ["HAPPY","사연·신청곡 동의 절차 점검"],["TORI","보안·로컬 데이터 처리 점검"],
    ["NURI","홈 화면 앱(PWA) 설치 준비 점검"]
  ];
  function el(tag,text,cls){
    const e=document.createElement(tag);
    if(text!==undefined)e.textContent=text;
    if(cls)e.className=cls;
    return e;
  }
  function fail(reason){
    $("overall").textContent="검사 결과를 확인할 수 없습니다. 성공으로 표시하지 않습니다.";
    $("time").textContent="확인 실패: "+reason;
    $("auditSource").textContent="GitHub Actions 로그에서 실행 여부를 직접 확인하세요.";
    $("roles").replaceChildren();
    rolesFallback.forEach(([name,task])=>{
      const d=el("div",undefined,"role");
      d.append(el("h3",name),el("p",task),el("div","실행 확인 안 됨","state warn"));
      $("roles").append(d);
    });
  }
  function showReport(data){
    if(!data||!Array.isArray(data.roles)||data.roles.length!==7||!data.checkedAt)throw Error("보고서 형식 불일치");
    const timestamp=Date.parse(data.checkedAt);
    if(!Number.isFinite(timestamp))throw Error("검사 시각 없음");
    const age=Date.now()-timestamp;
    const stale=age>36*60*60*1000 || age < -10*60*1000;
    const passing=data.roles.filter(r=>r.status==="check_passed").length;
    $("overall").textContent=stale?"검사 기록이 오래되었습니다. 현재 정상 상태는 확인되지 않았습니다.":"자동 점검 "+passing+"/7개 통과 · 독립 AI 상시 활동은 미확인";
    $("time").textContent="마지막 검사: "+new Date(timestamp).toLocaleString("ko-KR",{timeZone:"Asia/Seoul"})+" (한국 시간)"+(stale?" · 기록 오래됨":"");
    $("auditSource").replaceChildren();
    if(typeof data.runUrl==="string" && /^https:\/\/github\.com\/skytins3-png\/maru-ai-song-studio\/actions\/runs\/\d+$/.test(data.runUrl)){
      const a=el("a","이 결과를 만든 GitHub 실행 기록 열기");
      a.href=data.runUrl;a.target="_blank";a.rel="noopener noreferrer";
      $("auditSource").append(a);
    }else $("auditSource").textContent="로컬 수동 실행 보고서 · 서버 검증은 미확인";
    $("roles").replaceChildren();
    data.roles.forEach(r=>{
      const d=el("div",undefined,"role");
      const hd=el("div",undefined,"row");
      hd.append(el("h3",r.name||r.id),el("span",stale?"최근 활동 미확인":r.status==="check_passed"?"자동 검사 통과":"자동 검사 실패","state "+(stale?"warn":r.status==="check_passed"?"good":"bad")));
      d.append(hd,el("p",r.mission||""));
      for(const c of (r.checks||[])){
        d.append(el("div",(c.passed?"✓ ":"✕ ")+(c.check||""),"check"));
      }
      d.append(el("div","독립 AI 실행: 확인되지 않음 · 점검 역할만 자동 수행","sub"));
      $("roles").append(d);
    });
  }
  async function loadReport(){
    $("overall").textContent="실제 보고서를 확인하고 있습니다.";
    try{
      const r=await fetch("./agent-last-report.json?nocache="+Date.now(),{cache:"no-store"});
      if(!r.ok)throw Error("보고서 HTTP "+r.status);
      const d=await r.json();
      showReport(d);
    }catch(e){fail(e.message||"네트워크/파일 오류")}
  }
  async function loadSpecialists(){
    try{
      const response=await fetch("../music-share/ai-experts.json",{cache:"no-store"});
      if(!response.ok)throw Error("설정 HTTP "+response.status);
      const x=await response.json();
      if(!Array.isArray(x.agents))throw Error("설정 오류");
      const list=$("specialists");list.replaceChildren();
      x.agents.forEach(a=>{
        const d=el("div",undefined,"role");
        d.append(el("h3",a.name+" · "+a.specialty),el("p",a.mission||""),el("div",a.autonomous===false?"설계 단계 · 독립 AI로 작동하지 않음":"자동 동작 여부 확인 필요","state warn"));
        list.append(d);
      });
    }catch(e){$("specialists").textContent="전문가 설정 상태를 확인하지 못했습니다: "+e.message}
  }
  let installPrompt=null;
  window.addEventListener("beforeinstallprompt",event=>{
    event.preventDefault();installPrompt=event;
    $("install").hidden=false;
    $("installState").textContent="이 브라우저는 설치 절차 시작을 지원합니다.";
  });
  $("install").addEventListener("click",async()=>{
    if(!installPrompt){$("installState").textContent="브라우저 메뉴에서 홈 화면에 추가를 사용해 주세요.";return}
    installPrompt.prompt();
    const choice=await installPrompt.userChoice;
    $("installState").textContent=choice.outcome==="accepted"?"설치 요청을 수락했습니다. 홈 화면 아이콘 생성 여부는 휴대폰에서 확인하세요.":"설치 요청이 취소되었습니다.";
    installPrompt=null;$("install").hidden=true;
  });
  $("refresh").addEventListener("click",()=>{loadReport();loadSpecialists()});
  $("installState").textContent=window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches?"홈 화면 앱 모드로 실행 중입니다.":"Chrome 메뉴 ⋮에서 홈 화면에 추가 또는 앱 설치를 선택할 수 있습니다.";
  loadReport();
  loadSpecialists();
})();