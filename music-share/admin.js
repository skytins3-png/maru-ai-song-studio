(function(){
'use strict';
const OWNER='skytins3-png',REPO='maru-ai-song-studio',BRANCH='main',ROOT='music-share';
const $=id=>document.getElementById(id),status=$('status'),upload=$('upload');
function setStatus(t){status.textContent=t}
function slug(s){return String(s||'track').normalize('NFKD').replace(/[^a-zA-Z0-9가-힣_-]+/g,'-').replace(/^-+|-+$/g,'').slice(0,55)||'track'}
function ext(name,fallback){const m=String(name||'').match(/\.([a-zA-Z0-9]{1,8})$/);return m?m[1].toLowerCase():fallback}
function bytesToBase64(buf){const bytes=new Uint8Array(buf);let binary='';const step=0x8000;for(let i=0;i<bytes.length;i+=step)binary+=String.fromCharCode.apply(null,bytes.subarray(i,Math.min(i+step,bytes.length)));return btoa(binary)}
function utf8ToBase64(s){return btoa(unescape(encodeURIComponent(s)))}
function base64ToUtf8(s){return decodeURIComponent(escape(atob(String(s||'').replace(/\n/g,''))))}
async function api(path,token,opt={}){
  const r=await fetch('https://api.github.com/repos/'+OWNER+'/'+REPO+path,{...opt,headers:{'Accept':'application/vnd.github+json','Authorization':'Bearer '+token,'X-GitHub-Api-Version':'2022-11-28','Content-Type':'application/json',...(opt.headers||{})}});
  if(!r.ok){let msg='GitHub '+r.status;try{const j=await r.json();msg=j.message||msg}catch(e){}throw new Error(msg)}
  return r.status===204?null:r.json();
}
async function putFile(path,file,token,message){
  const data=bytesToBase64(await file.arrayBuffer());
  return api('/contents/'+path,token,{method:'PUT',body:JSON.stringify({message,content:data,branch:BRANCH})});
}
async function getCatalog(token){
  const path=ROOT+'/catalog.json';
  const r=await api('/contents/'+path+'?ref='+encodeURIComponent(BRANCH),token);
  let list=[];try{list=JSON.parse(base64ToUtf8(r.content))}catch(e){}
  return {list:Array.isArray(list)?list:[],sha:r.sha};
}
async function saveCatalog(list,sha,token){
  return api('/contents/'+ROOT+'/catalog.json',token,{method:'PUT',body:JSON.stringify({message:'music-share: update public catalog',content:utf8ToBase64(JSON.stringify(list,null,2)+'\n'),sha,branch:BRANCH})});
}
upload.addEventListener('click',async()=>{
  const token=$('token').value.trim(),title=$('title').value.trim(),artist=$('artist').value.trim(),description=$('description').value.trim(),audio=$('audio').files[0],cover=$('cover').files[0];
  if(!token){setStatus('GitHub 관리자 토큰을 입력하세요.');return}
  if(!title||!audio){setStatus('곡 제목과 음악 파일이 필요합니다.');return}
  if(!$('allow').checked){setStatus('공개 다운로드 허용 체크가 필요합니다.');return}
  if(audio.size>95*1024*1024){setStatus('음악 파일은 95MB 이하로 올려 주세요.');return}
  upload.disabled=true;
  try{
    const stamp=Date.now(),base=stamp+'-'+slug(title),audioPath=ROOT+'/tracks/'+base+'.'+ext(audio.name,'mp3');
    setStatus('1/3 · 음악 파일 업로드 중…');
    await putFile(audioPath,audio,token,'music-share: upload '+title);
    let coverRel='';
    if(cover){
      if(cover.size>10*1024*1024)throw new Error('표지 이미지는 10MB 이하로 올려 주세요.');
      setStatus('2/3 · 표지 이미지 업로드 중…');
      const coverPath=ROOT+'/covers/'+base+'.'+ext(cover.name,'jpg');
      await putFile(coverPath,cover,token,'music-share: upload cover '+title);
      coverRel='covers/'+base+'.'+ext(cover.name,'jpg');
    }else setStatus('2/3 · 표지 없음 · 목록 준비 중…');
    setStatus('3/3 · 공개 음악 목록 등록 중…');
    const cat=await getCatalog(token);
    cat.list.unshift({id:String(stamp),title,artist:artist||'MUSIC SHARE',description,audio:'tracks/'+base+'.'+ext(audio.name,'mp3'),cover:coverRel,createdAt:new Date().toISOString(),downloadAllowed:true});
    await saveCatalog(cat.list,cat.sha,token);
    setStatus('완료 · 공개 음악 목록에 등록했습니다. GitHub Pages가 새 파일을 반영하면 누구나 재생하고 내려받을 수 있습니다.');
    $('title').value='';$('description').value='';$('audio').value='';$('cover').value='';$('allow').checked=false;
  }catch(e){setStatus('업로드 실패 · '+(e&&e.message?e.message:String(e)))}
  finally{upload.disabled=false}
});
})();