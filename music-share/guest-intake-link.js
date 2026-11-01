(function(){
'use strict';
// Keep the current login-requiring GitHub route until a real private API passes
// a live health check. Never send anonymous form content to GitHub by accident.
async function upgrade(){
 const links=[...document.querySelectorAll('a[href="stories.html"]')];
 if(!links.length)return;
 for(const a of links){
  if(a.classList.contains('listener')){
   const small=a.querySelector('small');
   if(small)small.textContent='현재 임시 접수는 GitHub 로그인 필요';
  }
 }
 try{
  const response=await fetch('guest-intake-config.json',{cache:'no-store'});
  if(!response.ok)return;
  const config=await response.json();
  if(!config.endpoint||!config.turnstileSiteKey)return;
  const base=new URL(config.endpoint);
  if(base.protocol!=='https:')return;
  const health=await fetch(base.origin+'/health',{cache:'no-store'});
  if(!health.ok||(await health.json()).ready!==true)return;
  for(const a of links){
   a.href='guest-stories.html';
   const small=a.querySelector('small');
   if(small)small.textContent='별명·사연·사진·영상 · GitHub 로그인 없음';
  }
 }catch(error){/* Keep honest current fallback if configuration or API is unreachable. */}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',upgrade,{once:true});
else upgrade();
})();