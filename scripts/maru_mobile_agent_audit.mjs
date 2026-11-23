#!/usr/bin/env node
/**
 * MARU seven-role mobile system audit.
 * These are deterministic checks, NOT autonomous AI agents.
 * All results are computed afresh from the repository. No fabricated PASS.
 */
import { existsSync, readFileSync, mkdirSync, writeFileSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const exists = p => existsSync(resolve(root,p));
const txt = p => exists(p) ? readFileSync(resolve(root,p),"utf8") : "";
const includes = (p,needles) => needles.every(n => txt(p).includes(n));
const roles = [];
function audit(id,name,mission,tests) {
 let checks = tests.map(([label,passed])=>({check:label,passed:!!passed}));
 roles.push({id,name,mission,kind:"deterministic_automation",autonomousAI:false,status:checks.every(x=>x.passed)?"check_passed":"check_failed",checks});
}
const paths = ["mobile-hub/index.html","mobile-hub/hub-sync.js","mobile-hub/maru-sync.js","mobile-hub/agents.html","mobile-hub/agents.js","mobile-hub/manifest.webmanifest","mobile-hub/sw.js"];
const html = ["index.html","music-share/index.html","music-share/radio.html","music-share/stories.html","music-share/requests.html"];
const js = ["mobile-hub/hub-sync.js","mobile-hub/maru-sync.js","mobile-hub/agents.js"];
function syntaxCheck(p) { if(!exists(p)) return false; const r=spawnSync(process.execPath,["--check",resolve(root,p)],{encoding:"utf8",timeout:15000});return r.status===0; }
function iconCheck(p,w,h){try{const b=readFileSync(resolve(root,p));return b.length>24&&b.toString("hex",0,8)==="89504e470d0a1a0a"&&b.readUInt32BE(16)===w&&b.readUInt32BE(20)===h;}catch{return false}}
let manifest={};try{manifest=JSON.parse(txt("mobile-hub/manifest.webmanifest"))}catch{}
audit("MARU","MARU","통합 메뉴·모바일 대시보드 무결성 검증",[
 ["필수 모바일 파일 7개 존재",paths.every(exists)],
 ["홈 화면 메뉴·연동 스크립트 확인",includes("mobile-hub/index.html",["MARU ONE","hub-sync.js","MARU RADIO"])],
 ["임무 대시보드 상태 표시 자리 존재",includes("mobile-hub/agents.html",["id=\"overall\"","id=\"roles\""])]
]);
audit("LEO","LEO","연동 JavaScript 문법 자동 검사",[
 ...js.map(p=>[p+" 문법",syntaxCheck(p)]),
 ["기존 MUSIC SHARE 스크립트 존재",exists("music-share/radio.js")&&exists("music-share/requests.js")&&exists("music-share/stories.js")]
]);
audit("TOTO","TOTO","연동함 전달·확인 경로 정적 점검",[
 ["모바일 보내기·받기 코드 존재",includes("mobile-hub/hub-sync.js",["maru-one-sync-v1:messages","function add(","function updateMessage("])],
 ["스튜디오 수신 처리 코드 존재",includes("mobile-hub/maru-sync.js",["function applyMessage()","function mark(","maru-one-sync-v1:messages"])],
 ["연동 대상 5페이지에 모두 로더 존재",html.every(p=>includes(p,["maru-sync.js?v=1"]))],
 ["권한 동의 후에만 외부 페이지 연동 표시",includes("mobile-hub/maru-sync.js",["function paired()","if(paired())"])]
]);
audit("MIMI","MIMI","방송·음원·신청곡 화면 구성 점검",[
 ["RADIO 재생기/파일 선택 UI",includes("music-share/radio.html",['id="startRadio"','id="localFiles"'])],
 ["모바일 선택 음원 Android 공유 경로",includes("mobile-hub/hub-sync.js",["navigator.share","musicFiles"])],
 ["방송 자동 송출을 주장하지 않는 제한 안내",includes("mobile-hub/index.html",["BIGO 청취자"])]
]);
audit("HAPPY","HAPPY","사연·신청곡 공개 동의 장치 점검",[
 ["사연 공개 동의 요소",includes("music-share/stories.html",['id="storyConsent"',"required"])],
 ["신청곡 공개 동의 요소",includes("music-share/requests.html",['id="requestConsent"',"required"])],
 ["연동에서 공개 게시 전 사용자 승인",includes("mobile-hub/maru-sync.js",["if(!confirm(","공개 게시"])],
 ["사연·신청곡 페이지에 연동 진입",["music-share/stories.html","music-share/requests.html"].every(p=>includes(p,["maru-sync.js?v=1"]))]
]);
audit("TORI","TORI","최소 권한·기본 보안 장치 정적 점검",[
 ["MUSIC SHARE 보안 정책",["music-share/requests.html","music-share/stories.html"].every(p=>includes(p,["Content-Security-Policy"]))],
 ["웹 메모가 브라우저 로컬 저장소 사용",includes("mobile-hub/hub-sync.js",["localStorage.getItem","localStorage.setItem"])],
 ["원격 자동 게시 없음",!txt("mobile-hub/hub-sync.js").includes("https://api.github.com/repos/")&&!txt("mobile-hub/maru-sync.js").includes("https://api.github.com/repos/")],
 ["수신 입력은 확인 후에만 적용",includes("mobile-hub/maru-sync.js",["if(!confirm(","function applyMessage()"])]
]);
const iconEntries=Array.isArray(manifest.icons)?manifest.icons:[];
audit("NURI","NURI","갤럭시 홈 화면 설치(PWA) 준비 점검",[
 ["PWA display 및 scope",manifest.display==="standalone"&&manifest.scope==="./"],
 ["192px PNG 아이콘 실재 확인",iconCheck("icons/icon-192.png",192,192)],
 ["512px PNG 아이콘 실재 확인",iconCheck("icons/icon-512.png",512,512)],
 ["manifest PNG 아이콘 링크",iconEntries.some(i=>i.src==="../icons/icon-192.png")&&iconEntries.some(i=>i.src==="../icons/icon-512.png")],
 ["서비스워커 홈 등록 코드",includes("mobile-hub/index.html",['register("./sw.js")'])]
]);
const report = {
 schemaVersion:1,
 checkedAt:new Date().toISOString(),
 runId:process.env.GITHUB_RUN_ID || null,
 runUrl:process.env.GITHUB_RUN_ID ? "https://github.com/skytins3-png/maru-ai-song-studio/actions/runs/"+process.env.GITHUB_RUN_ID : null,
 evidence:"static file checks and Node syntax checks from current GitHub Actions runner",
 independentAIAgentsRunning:"not_verified",
 appInstalledOnUserPhone:"not_verified",
 bigoLiveAudioVerified:"not_verified",
 browserEndToEndTest:"not_run",
 labelsExplanation:"check_passed means a deterministic automated check passed; it does not mean an AI agent is alive.",
 roles
};
report.passed=roles.every(r=>r.status==="check_passed");
const target=resolve(root,"mobile-hub/agent-last-report.json");
mkdirSync(dirname(target),{recursive:true});
writeFileSync(target,JSON.stringify(report,null,2)+"\n","utf8");
for(const r of roles) console.log((r.status==="check_passed"?"PASS":"FAIL")+" "+r.name+": "+r.mission+" ("+r.checks.filter(c=>c.passed).length+"/"+r.checks.length+")");
console.log("Report:",target,"overall",report.passed);
if(!report.passed)process.exitCode=1;
