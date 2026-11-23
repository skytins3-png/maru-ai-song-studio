/* MARU ONE mobile hub: opt-in cross-page handoff + Android audio shares.
   No remote server, automatic public posting, background execution or access to
   other applications' private storage. */
(function(){
"use strict";
var STORE="maru-one-sync-v1:messages", PAIR="maru-one-sync-v1:paired";
var bc=null,ui={},LIMIT=150;
try{bc=new BroadcastChannel("maru-one-sync-v1");bc.onmessage=function(){render()}}catch(e){}
function get(id){return document.getElementById(id)}
function node(tag,text){var n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n}
function read(){try{var x=JSON.parse(localStorage.getItem(STORE)||"[]");return Array.isArray(x)?x.filter(function(m){return m&&typeof m.id==="string"&&typeof m.body==="string"}).slice(-LIMIT):[]}catch(e){return []}}
function write(v){try{localStorage.setItem(STORE,JSON.stringify(v.slice(-LIMIT)));bc&&bc.postMessage({type:"sync"});render();return true}catch(e){tell("휴대폰 브라우저 저장 공간 부족");return false}}
function notifyPair(){try{localStorage.setItem(PAIR,"1");bc&&bc.postMessage({type:"pair"});render()}catch(e){tell("브라우저 저장을 사용할 수 없습니다")}}
function paired(){try{return localStorage.getItem(PAIR)==="1"}catch(e){return false}}
function tell(msg){if(ui.status)ui.status.textContent=msg}
function textbutton(title,fn){var b=node("button",title);b.type="button";b.className="btn secondary";b.addEventListener("click",fn);return b}
function id(){return (crypto.randomUUID?crypto.randomUUID():"maru"+Date.now()+Math.random().toString(36).slice(2))}
function add(to,kind,title,body){
 var msg={id:id(),from:"hub",to:to,kind:kind,title:String(title||"").slice(0,150),body:String(body||"").slice(0,4500),created:new Date().toISOString(),status:"pending"};
 if(!msg.title.trim()&&!msg.body.trim()){tell("전달할 내용을 입력하세요");return false}
 var all=read();all.push(msg);return write(all);
}
function updateMessage(mId,action){
 var all=read(),m=all.find(function(x){return x.id===mId});if(!m)return;
 if(action==="memo"){
   var field=get("broadcastMemo");if(field){var prev=field.value||"";field.value=prev?(prev+"\n\n"+(m.title||"")+"\n"+m.body):(m.title+"\n"+m.body);field.dispatchEvent(new Event("input",{bubbles:true}));}
   // Existing MARU ONE local-storage key, not external app data
   try{localStorage.setItem("maru-one-v1:memo",JSON.stringify(field.value))}catch(e){tell("메모 저장 실패: 백업을 확인하세요");return}
 }else if(action==="task"){
   var list=[];try{list=JSON.parse(localStorage.getItem("maru-one-v1:tasks")||"[]");if(!Array.isArray(list))list=[]}catch(e){}
   list.unshift({agent:"MARU",text:(m.title?m.title+"\n":"")+m.body,created:new Date().toLocaleString("ko-KR")});
   try{localStorage.setItem("maru-one-v1:tasks",JSON.stringify(list.slice(0,500)))}catch(e){tell("작업 저장 실패");return}
   window.dispatchEvent(new Event("maru-one-tasks-updated"));
 }
 m.status="reviewed";write(all);
 tell(action==="memo"?"기존 방송 메모에 추가했습니다. 방송 화면에서 확인하세요.":action==="task"?"AI 작업 기록에 추가했습니다. AI 총괄 화면을 다시 열어 확인하세요.":"확인 완료로 표시했습니다.");
}
function render(){
 if(!ui.pair)return;
 ui.pair.textContent=paired()?"연동 사용 중 ✓":"내 휴대폰에서 연동 켜기";
 ui.pair.disabled=paired();ui.pairStatus.textContent=paired()?"같은 사이트를 동일 브라우저에서 열면 서로 전달할 수 있어요.":"먼저 연동을 켜면 MARU STUDIO·MUSIC SHARE 화면에 연동 버튼이 나타납니다.";
 var all=read(),incoming=all.filter(function(x){return x.to==="hub"&&x.status==="pending"}).slice(-30).reverse();
 ui.inbox.replaceChildren();
 if(!incoming.length)ui.inbox.appendChild(node("p","들어온 메시지가 없습니다. 스튜디오에서 'MARU ONE에 전달' 버튼으로 보내 보세요."));
 incoming.forEach(function(m){
  var card=node("div");card.className="task";
  var hd=node("strong",(m.title||"제목 없음")+" · "+m.kind);card.appendChild(hd);
  var dt=node("small",(m.from||"unknown")+" → MARU ONE · "+(m.created||"").replace("T"," ").slice(0,16));card.appendChild(dt);
  var snippet=node("div",m.body);snippet.style.cssText="white-space:pre-wrap;overflow-wrap:anywhere;max-height:135px;overflow:auto;margin:9px 0";card.appendChild(snippet);
  var acts=node("div");acts.className="actions";card.appendChild(acts);
  acts.appendChild(textbutton("방송 메모로",function(){updateMessage(m.id,"memo")}));
  acts.appendChild(textbutton("AI 작업으로",function(){updateMessage(m.id,"task")}));
  acts.appendChild(textbutton("확인",function(){updateMessage(m.id,"reviewed")}));
  ui.inbox.appendChild(card);
 });
 var sent=all.filter(function(x){return x.from==="hub"}).slice(-8).reverse();
 ui.sent.replaceChildren();
 sent.forEach(function(m){var item=node("div",m.to+" · "+(m.title||m.kind)+" · "+(m.status==="reviewed"?"상대 화면에서 확인함":"대기 중"));item.className="mini";item.style.padding="5px 0";ui.sent.appendChild(item)});
 if(!sent.length)ui.sent.appendChild(node("p","보낸 자료가 없습니다."));
 ui.counter.textContent="보낸 자료 "+all.filter(function(x){return x.from==="hub"}).length+"건 · 받은 자료 "+incoming.length+"건";
}
function field(label,tag,options){
 var wrap=node("div");var cap=node("label",label);cap.className="tinylabel";wrap.appendChild(cap);
 var el=node(tag);el.className="field";if(tag==="select")options.forEach(function(v){el.appendChild(new Option(v[1],v[0]))});
 wrap.appendChild(el);ui.form.appendChild(wrap);return el
}
function show(){
 var home=get("home");if(!home||get("maru-sync-section"))return;
 var sec=node("section");sec.id="maru-sync-section";sec.className="panel";
 var h=node("h3","🔗 실제 프로그램 연동");sec.appendChild(h);
 var p=node("p","MARU ONE ↔ STUDIO ↔ MUSIC SHARE의 가사·방송 대본·사연·신청곡 메모를 휴대폰 브라우저 안에서 전달합니다. 공개 게시나 방송 재생은 형이 확인한 뒤 진행합니다.");sec.appendChild(p);
 ui.pair=node("button");ui.pair.className="btn";ui.pair.addEventListener("click",notifyPair);sec.appendChild(ui.pair);
 ui.pairStatus=node("p");ui.pairStatus.className="mini";sec.appendChild(ui.pairStatus);
 var state=node("h3","전달할 자료");state.style.marginTop="19px";sec.appendChild(state);
 ui.form=node("div");sec.appendChild(ui.form);
 ui.target=field("받는 프로그램","select",[["studio","MARU STUDIO · 가사/대본"],["radio-web","MARU RADIO 웹 미리듣기"],["stories","MUSIC SHARE · 사연 작성"],["requests","MUSIC SHARE · 신청곡"],["share","MUSIC SHARE · 음악 공유"]]);
 ui.kind=field("자료 종류","select",[["memo","방송 대본 / 메모"],["lyrics","노래 가사"],["style","Suno 스타일"],["title","노래 제목"],["subtitle","방송 자막"],["request","신청곡"],["story","사연"]]);
 ui.title=field("제목","input");ui.title.placeholder="노래 제목 또는 사연 제목";ui.title.maxLength=150;
 ui.content=field("전달할 내용","textarea");ui.content.placeholder="가사, 방송 멘트, 사연 등을 입력해 주세요.";ui.content.maxLength=4500;ui.content.rows=4;
 var acts=node("div");acts.className="actions";sec.appendChild(acts);
 var send=node("button","선택한 프로그램으로 전달");send.className="btn";send.addEventListener("click",function(){
  if(!paired()){tell("먼저 연동 켜기를 누르세요.");return}
  var t=ui.title.value.trim(),b=ui.content.value.trim();
  if(!t&&!b){tell("내용을 입력해 주세요.");return}
  if(!confirm(ui.target.options[ui.target.selectedIndex].text+"에 메모를 전달할까요? 실제 방송 또는 공개 게시를 시작하지는 않습니다."))return;
  if(add(ui.target.value,ui.kind.value,t,b)){tell("전달했습니다. 상대 페이지의 MARU ONE 버튼을 눌러 검토 후 적용하세요.")}
 });acts.appendChild(send);
 acts.appendChild(textbutton("현재 방송 메모 가져오기",function(){ui.content.value=get("broadcastMemo")?.value||"";ui.kind.value="memo";tell("기존 방송 메모를 입력칸으로 불러왔습니다.")}));
 acts.appendChild(textbutton("전달 내용 복사",function(){if(!ui.content.value){tell("복사할 내용이 없습니다.");return}if(navigator.clipboard){navigator.clipboard.writeText((ui.title.value?ui.title.value+"\n":"")+ui.content.value).then(function(){tell("복사 완료")}).catch(function(){tell("복사 권한 거부")})}else tell("텍스트를 길게 눌러 복사하세요")}));
 ui.status=node("div","연동 대기");ui.status.className="notice";ui.status.setAttribute("role","status");sec.appendChild(ui.status);
 var head=node("h3","MARU ONE으로 받은 자료");sec.appendChild(head);
 ui.inbox=node("div");sec.appendChild(ui.inbox);
 var sh=node("h3","전달 기록");sec.appendChild(sh);
 ui.counter=node("p");ui.counter.className="mini";sec.appendChild(ui.counter);
 ui.sent=node("div");sec.appendChild(ui.sent);
 var key=node("p","보안: 같은 도메인·같은 브라우저의 로컬 저장소만 사용하며 계정 로그인, 서버 업로드, 외부 앱의 비공개 데이터 읽기, 자동 게시 기능은 없습니다. 다른 브라우저 또는 다른 기기에는 동기화되지 않습니다.");
 key.className="mini";sec.appendChild(key);
 home.insertBefore(sec,home.querySelector(".grid"));
 var bsec=get("broadcast");
 if(bsec&&!get("maru-radio-share-box")){
  var box=node("div");box.id="maru-radio-share-box";box.className="panel";
  box.appendChild(node("h3","📲 선택한 음원 → MARU RADIO에 직접 공유"));
  var help=node("p","위에서 선택한 MP3/WAV를 Android 공유 메뉴로 보내면, 설치된 MARU RADIO 앱이 공유 대상에 표시되는 경우 직접 가져올 수 있습니다. 앱에서 파일을 확인하고 등록하세요. BIGO 방송 자동 송출은 별도입니다.");box.appendChild(help);
  var share=node("button","선택 음원 공유하기");share.className="btn";share.addEventListener("click",function(){
   var input=get("musicFiles"),files=Array.from(input&&input.files||[]);
   if(!files.length){alert("먼저 위의 음원 선택 버튼으로 파일을 골라 주세요.");return}
   files=files.filter(function(f){return f.type.startsWith("audio/")||/\.(mp3|wav|m4a|aac|ogg|flac)$/i.test(f.name)}).slice(0,10);
   if(!files.length){alert("오디오 파일을 선택해 주세요.");return}
   if(!navigator.share||navigator.canShare&&!navigator.canShare({files:files})){alert("이 브라우저는 파일 직접 공유를 지원하지 않습니다. Android 파일 앱에서 음원을 선택하여 '공유 → MARU RADIO'를 이용하세요.");return}
   navigator.share({title:"MARU ONE 음원 보내기",files:files}).then(function(){tell("Android 공유 메뉴 처리가 완료됐습니다. MARU RADIO에서 파일 등록 여부를 확인하세요.")}).catch(function(e){if(e.name!=="AbortError")alert("공유할 수 없습니다: "+e.message)})
  });box.appendChild(share);bsec.insertBefore(box,bsec.firstElementChild.nextElementSibling)
 }
 render();
}
window.addEventListener("storage",function(e){if(e.key===STORE||e.key===PAIR)render()});
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",show,{once:true});else show();
})();