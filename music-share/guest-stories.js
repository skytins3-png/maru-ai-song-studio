(function(){
'use strict';
const $=id=>document.getElementById(id);
let endpoint='',widgetId=null,ready=false;
const status=text=>$('guestServiceStatus').textContent=text;
async function setup(){
 try{
  const r=await fetch('guest-intake-config.json',{cache:'no-store'});
  if(!r.ok)throw Error('config unavailable');
  const config=await r.json(),url=new URL(config.endpoint||'',location.href);
  if(!config.endpoint||!config.turnstileSiteKey||url.protocol!=='https:')
   throw Error('접수 서버가 아직 연결되지 않았습니다.');
  endpoint=url.origin+url.pathname.replace(/\/$/,'')+'/api/stories';
  const script=document.createElement('script');
  script.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
  script.onload=()=>{
   if(!window.turnstile)return;
   widgetId=window.turnstile.render('#guestTurnstile',{
     sitekey:config.turnstileSiteKey,
     callback:()=>{
      ready=true;$('guestSend').disabled=false;
      status('익명 접수 가능 · GitHub 로그인 필요 없음');
     },'expired-callback':()=>{ready=false;$('guestSend').disabled=true;},
     'error-callback':()=>{ready=false;$('guestSend').disabled=true;status('보안 확인 실패 · 다시 시도해 주세요.')}
   });
  };
  script.onerror=()=>status('보안 확인 화면을 불러오지 못했습니다.');
  document.head.appendChild(script);
  status('서버 연결됨 · 자동 접수 방지 확인을 완료해 주세요.');
 }catch(e){
  ready=false;$('guestSend').disabled=true;
  status('로그인 없는 접수 서버 연결 준비 중입니다. 아직 이 화면으로는 사연이 전송되지 않습니다.');
 }
}
$('guestStoryForm').addEventListener('submit',async event=>{
 event.preventDefault();
 if(!ready||!endpoint)return;
 const file=$('guestMedia').files[0];
 if(file && file.size>8*1024*1024){
  $('guestResult').textContent='파일은 8MB 이하만 첨부할 수 있습니다.';return;
 }
 if(file && !$('guestMediaRights').checked){
  $('guestResult').textContent='첨부 파일의 이용 권리를 확인해 주세요.';return;
 }
 const form=new FormData($('guestStoryForm'));
 if(!file)form.delete('media');
 $('guestSend').disabled=true;
 $('guestResult').textContent='사연을 안전하게 접수하는 중…';
 try{
  const response=await fetch(endpoint,{method:'POST',body:form,mode:'cors',cache:'no-store'});
  const result=await response.json();
  if(!response.ok||!result.ok)throw Error(result.error||'접수 실패');
  $('guestResult').textContent='접수 완료! 접수번호: '+result.receipt+' · 형의 검토 전에는 방송되지 않습니다.';
  $('guestStoryForm').reset();
 }catch(e){
  $('guestResult').textContent='접수 실패: '+(e.message||'네트워크 오류')+' · 접수되었다고 처리하지 않았습니다.';
 }finally{
  ready=false;
  if(widgetId!==null&&window.turnstile)window.turnstile.reset(widgetId);
  $('guestSend').disabled=true;
 }
});
setup();
})();