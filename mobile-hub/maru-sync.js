/* MARU ONE local cross-page bridge v1.
 * All transfers are initiated or approved by the user, stay in the same
 * browser + origin, and never submit public stories or control BIGO/Suno.
 */
(function(){
"use strict";
var STORE="maru-one-sync-v1:messages", PAIR="maru-one-sync-v1:paired";
var path=location.pathname;
var role=/\/music-share\/stories\.html$/.test(path)?"stories":/\/music-share\/requests\.html$/.test(path)?"requests":/\/music-share\/radio\.html$/.test(path)?"radio-web":/\/music-share\//.test(path)?"share":"studio";
var ROOT="/maru-ai-song-studio/mobile-hub/";
var panel,button,select,preview,sendText,sendTitle,kindSelect,channel;
function read(){
 try{var d=JSON.parse(localStorage.getItem(STORE)||"[]");return Array.isArray(d)?d.filter(function(m){return m&&typeof m.id==="string"&&typeof m.body==="string"}).slice(-150):[];}catch(e){return []}
}
function write(v){try{localStorage.setItem(STORE,JSON.stringify(v.slice(-150)));if(channel)channel.postMessage({type:"maru-one-sync-changed"});refresh();return true}catch(e){alert("MARU 연동함 저장 공간이 부족합니다.");return false}}
function paired(){try{return localStorage.getItem(PAIR)==="1"}catch(e){return false}}
function id(){return (crypto.randomUUID?crypto.randomUUID():String(Date.now())+"-"+Math.random().toString(36).slice(2))}
function createNode(tag,text){var n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n}
function setText(id,value){var field=document.getElementById(id);if(!field)return false;field.value=value;field.dispatchEvent(new Event("input",{bubbles:true}));field.dispatchEvent(new Event("change",{bubbles:true}));return true}
function notify(msg){if(preview)preview.textContent=msg;}
function send(to,kind,title,body){
 body=String(body||"").trim().slice(0,4500);title=String(title||"").trim().slice(0,150);
 if(!body&&!title){notify("내용을 입력해 주세요.");return false}
 var items=read();items.push({id:id(),from:role,to:to,kind:kind,title:title,body:body,created:new Date().toISOString(),status:"pending"});
 return write(items);
}
function forMe(){return read().filter(function(m){return m.to===role&&m.status==="pending"})}
function refresh(){
 if(!button||!select)return;var pending=forMe();
 button.textContent="🔗 MARU ONE 연동"+(pending.length?" ("+pending.length+")":"");
 var old=select.value;select.replaceChildren();
 if(!pending.length){select.appendChild(new Option("받은 자료 없음",""))}
 else pending.forEach(function(m){select.appendChild(new Option((m.kind||"memo")+" · "+(m.title||m.body).slice(0,32),m.id))});
 if(pending.some(function(m){return m.id===old}))select.value=old;
 showSelected();
}
function showSelected(){
 if(!preview||!select)return;var m=forMe().find(function(i){return i.id===select.value});
 if(!m){preview.textContent="받은 내용이 없습니다. MARU ONE에서 보내면 여기에 표시됩니다.";return}
 preview.textContent=(m.title?m.title+"\n":"")+m.body+"\n\n보낸 곳: "+m.from+" · "+m.created.slice(0,16).replace("T"," ");
}
function selected(){return forMe().find(function(m){return m.id===select.value})}
function mark(id){
 var all=read(),m=all.find(function(x){return x.id===id});if(m){m.status="reviewed";write(all)}
}
function applyMessage(){
 var m=selected();if(!m){notify("받은 자료가 없습니다");return}
 if(!confirm("내용을 확인하고 현재 페이지에 적용할까요? 기존 입력 내용은 바뀔 수 있습니다. 공개 게시나 방송은 자동으로 시작하지 않습니다."))return;
 var applied=false;
 if(role==="studio"){
  if(m.kind==="lyrics")applied=setText("lyrics",m.body);
  else if(m.kind==="style")applied=setText("style",m.body);
  else if(m.kind==="title")applied=setText("title",m.title||m.body);
  else if(m.kind==="request")applied=setText("broadcastSearch",m.title||m.body);
  else if(m.kind==="subtitle")applied=setText("broadcastSubtitleText",m.body);
  else applied=setText("broadcastCustomMessage",m.body);
 }else if(role==="stories"){
  var bodyOk=setText("storyBody",m.body);
  var topicOk=setText("storyTopic",m.title||"MARU ONE 사연");
  applied=bodyOk||topicOk;
 }else if(role==="requests"){
  var list=document.getElementById("requestSong"),want=(m.title||m.body).trim().toLowerCase();
  if(list){var opt=Array.from(list.options).find(function(o){return o.textContent.trim().toLowerCase()===want||o.value.trim().toLowerCase()===want});
   if(opt){list.value=opt.value;list.dispatchEvent(new Event("change",{bubbles:true}));applied=true}}
 }
 if(!applied){
  notify("이 페이지에 자동으로 입력할 수 있는 항목이 없어요. 텍스트를 복사해 직접 사용하세요. 공개 신청이나 방송은 자동 실행되지 않습니다.");
  return;
 }
 mark(m.id);notify("입력칸에 반영했습니다. 내용을 검토하고 필요한 경우에만 직접 저장·방송·게시하세요.");
}
function copyReceived(){
 var m=selected();if(!m){notify("받은 자료가 없습니다");return}
 var text=(m.title?m.title+"\n":"")+m.body;
 if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(text).then(function(){mark(m.id);notify("텍스트를 복사했습니다. 필요한 곳에 붙여 넣으세요.")}).catch(function(){notify("복사 권한이 없어 직접 길게 눌러 선택해 주세요: \n"+text)})}
 else{notify("내용을 길게 눌러 복사하세요: \n"+text)}
}
function collectAndSend(){
 var title=sendTitle.value.trim(),content=sendText.value.trim(),kind=kindSelect.value;
 if(!title&&!content&&role==="studio"){
  title=(document.getElementById("title")||{}).value||"";
  content=(document.getElementById("lyrics")||{}).value||"";
  if(content)kind="lyrics";
  else{content=(document.getElementById("broadcastCustomMessage")||{}).value||"";kind="memo"}
 }
 if(!title&&!content){notify("먼저 내용을 입력하거나 현재 페이지의 가사/대본을 작성하세요.");return}
 if(!confirm("선택한 내용만 MARU ONE으로 보낼까요? 같은 브라우저의 로컬 저장소에만 저장됩니다."))return;
 if(send("hub",kind,title,content)){sendTitle.value="";sendText.value="";notify("MARU ONE에 전달했습니다. 통합 조종실의 '연동함'에서 확인하세요.")}
}
function addButton(parent,text,func){
 var b=createNode("button",text);b.type="button";b.addEventListener("click",func);b.style.cssText="border:0;border-radius:9px;padding:10px;font:600 13px system-ui;cursor:pointer;background:#dce7ff;color:#173268;";parent.appendChild(b);return b
}
function init(){
 if(document.getElementById("maru-one-bridge-toggle"))return;
 button=createNode("button","🔗 MARU ONE 연동");button.id="maru-one-bridge-toggle";button.type="button";
 button.style.cssText="position:fixed;right:12px;bottom:96px;z-index:2147483000;border:1px solid #bbcdf8;border-radius:22px;padding:12px 14px;background:#17376b;color:white;font:700 13px system-ui;box-shadow:0 6px 20px #0004;cursor:pointer;";
 panel=createNode("section");panel.id="maru-one-bridge-panel";panel.hidden=true;
 panel.setAttribute("aria-label","MARU ONE 연동");panel.style.cssText="position:fixed;right:10px;bottom:151px;z-index:2147483000;background:#fff;color:#1d2c48;border:1px solid #c6d4ec;border-radius:15px;box-shadow:0 10px 35px #0005;padding:14px;width:min(365px,calc(100vw - 20px));max-height:67vh;overflow:auto;font:13px/1.6 system-ui;white-space:normal;";
 var hd=createNode("div","MARU ONE · "+role);hd.style.cssText="font-weight:800;font-size:17px;margin-bottom:6px";panel.appendChild(hd);
 var note=createNode("p","받기/보내기는 같은 휴대폰 브라우저에서만 됩니다. 방송 송출·공개 게시·Suno 자동 제작은 실행하지 않습니다.");note.style.cssText="font-size:12px;margin:6px 0;color:#52647d";panel.appendChild(note);
 var h1=createNode("b","받은 자료");panel.appendChild(h1);
 select=createNode("select");select.style.cssText="width:100%;padding:9px;margin:5px 0;border:1px solid #b9c8e3;border-radius:9px;background:#fff;color:#1a2b49;";panel.appendChild(select);select.addEventListener("change",showSelected);
 preview=createNode("pre");preview.style.cssText="max-height:135px;overflow:auto;white-space:pre-wrap;overflow-wrap:anywhere;background:#eef3fb;color:#173268;padding:8px;border-radius:9px;font:12px/1.5 system-ui;margin:6px 0";panel.appendChild(preview);
 var buttons=createNode("div");buttons.style.cssText="display:flex;gap:6px;flex-wrap:wrap";panel.appendChild(buttons);
 addButton(buttons,"검토 후 적용",applyMessage);
 addButton(buttons,"내용 복사",copyReceived);
 addButton(buttons,"새로고침",refresh);
 panel.appendChild(createNode("hr"));
 panel.appendChild(createNode("b","현재 페이지 → MARU ONE"));
 sendTitle=createNode("input");sendTitle.type="text";sendTitle.placeholder="제목 (선택)";sendTitle.maxLength=150;sendTitle.style.cssText="display:block;width:100%;padding:10px;margin:6px 0;border:1px solid #b9c8e3;border-radius:9px;color:#1d2c48;background:#fff;box-sizing:border-box;";panel.appendChild(sendTitle);
 kindSelect=createNode("select");kindSelect.style.cssText=sendTitle.style.cssText;
 [["memo","방송 메모"],["lyrics","가사"],["style","Suno 스타일"],["request","신청곡"],["story","사연"],["subtitle","방송 자막"],["title","곡 제목"]].forEach(function(x){kindSelect.appendChild(new Option(x[1],x[0]))});panel.appendChild(kindSelect);
 sendText=createNode("textarea");sendText.placeholder="연동할 내용을 입력하세요. 스튜디오에서는 내용을 비워두면 현재 가사/대본을 가져옵니다.";sendText.maxLength=4500;sendText.rows=3;sendText.style.cssText=sendTitle.style.cssText+"resize:vertical;";panel.appendChild(sendText);
 var actions=createNode("div");actions.style.cssText="display:flex;gap:8px;flex-wrap:wrap";panel.appendChild(actions);
 addButton(actions,"MARU ONE에 전달",collectAndSend);
 var link=createNode("a","통합 조종실 열기");link.href=ROOT;link.target="_blank";link.rel="noopener noreferrer";link.style.cssText="display:inline-block;padding:10px;border-radius:9px;background:#17376b;color:white;text-decoration:none;font-weight:700";actions.appendChild(link);
 button.addEventListener("click",function(){panel.hidden=!panel.hidden;if(!panel.hidden)refresh()});
 document.body.appendChild(button);document.body.appendChild(panel);refresh();
}
function boot(){if(paired()){init();refresh()}}
window.addEventListener("storage",function(e){if(e.key===PAIR)boot();if(e.key===STORE)refresh()});
try{channel=new BroadcastChannel("maru-one-sync-v1");channel.onmessage=function(){refresh()}}catch(e){}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();