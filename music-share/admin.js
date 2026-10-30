(function(){
'use strict';
const OWNER='skytins3-png',REPO='maru-ai-song-studio',BRANCH='main',ROOT='music-share';
const $=id=>document.getElementById(id),status=$('status'),upload=$('upload');
const {validateFiles,slug,extension}=MusicShare;
let busy=false;
function setStatus(t){status.textContent=t}
function bytesToBase64(buf){const bytes=new Uint8Array(buf);let binary='';const step=0x8000;for(let i=0;i<bytes.length;i+=step)binary+=String.fromCharCode.apply(null,bytes.subarray(i,Math.min(i+step,bytes.length)));return btoa(binary)}
function decode(s){return new TextDecoder().decode(Uint8Array.from(atob(s.replace(/\s/g,'')),c=>c.charCodeAt(0)))}
async function api(path,token,method='GET',body){
  const r=await fetch('https://api.github.com/repos/'+OWNER+'/'+REPO+path,{method,cache:'no-store',headers:{'Accept':'application/vnd.github+json','Authorization':'Bearer '+token,'X-GitHub-Api-Version':'2022-11-28','Content-Type':'application/json'},body:body===undefined?undefined:JSON.stringify(body)});
  if(!r.ok){const error=new Error(r.status===401?'관리자 토큰이 유효하지 않습니다.':r.status===403?'저장소 쓰기 권한 또는 GitHub 요청 제한을 확인하세요.':'GitHub 요청 실패 ('+r.status+')');error.status=r.status;throw error}
  return r.json();
}
async function snapshot(token){
  const ref=await api('/git/ref/heads/'+BRANCH,token);
  const head=ref.object.sha;
  const commit=await api('/git/commits/'+head,token);
  const cat=await api('/contents/'+ROOT+'/catalog.json?ref='+head,token);
  let list;
  try{list=JSON.parse(decode(cat.content));if(!Array.isArray(list)||list.some(t=>!t||typeof t!=='object'||Array.isArray(t)))throw new Error();}
  catch(e){throw new Error('공개 목록이 손상되어 업로드를 중단했습니다. catalog.json을 먼저 복구하세요.');}
  return {head,tree:commit.tree.sha,list};
}
async function blob(file,token){return (await api('/git/blobs',token,'POST',{content:bytesToBase64(await file.arrayBuffer()),encoding:'base64'})).sha}
upload.addEventListener('click',async()=>{
  if(busy)return;
  let token=$('token').value.trim();
  const title=$('title').value.trim(),artist=$('artist').value.trim(),description=$('description').value.trim(),audio=$('audio').files[0],cover=$('cover').files[0];
  if(!token){setStatus('GitHub 관리자 토큰을 입력하세요.');return}
  if(!title||!audio){setStatus('곡 제목과 음악 파일이 필요합니다.');return}
  if(!$('allow').checked){setStatus('공개 다운로드 허용 체크가 필요합니다.');return}
  try{validateFiles(audio,cover)}catch(e){setStatus(e.message);return}
  busy=true;upload.disabled=true;
  try{
    await MaruSafeMedia.verify(audio);
    if(cover)await MaruSafeMedia.verify(cover);
    setStatus('1/3 · 기존 공개 목록 확인 중…');
    let base=await snapshot(token);
    const id=Date.now()+'-'+crypto.randomUUID(),name=id+'-'+slug(title);
    const track={id,title,artist:artist||'MUSIC SHARE',description,audio:'tracks/'+name+'.'+extension(audio.name),cover:cover?'covers/'+name+'.'+extension(cover.name):'',createdAt:new Date().toISOString(),downloadAllowed:true,genre:['korean','chinese','western','instrumental','other'].includes($('genre').value)?$('genre').value:MaruGenres.detect(title)};
    setStatus('2/3 · 음악과 표지 준비 중…');
    const audioSha=await blob(audio,token);
    const coverSha=cover?await blob(cover,token):null;
    // Files and catalog become visible together in one non-forced branch update.
    for(let attempt=0;attempt<3;attempt++){
      setStatus('3/3 · 음악·표지·공개 목록 함께 등록 중…');
      const entries=[{path:ROOT+'/'+track.audio,mode:'100644',type:'blob',sha:audioSha}];
      if(coverSha)entries.push({path:ROOT+'/'+track.cover,mode:'100644',type:'blob',sha:coverSha});
      entries.push({path:ROOT+'/catalog.json',mode:'100644',type:'blob',content:JSON.stringify([track,...base.list],null,2)+'\n'});
      const tree=await api('/git/trees',token,'POST',{base_tree:base.tree,tree:entries});
      const commit=await api('/git/commits',token,'POST',{message:'music-share: publish '+title,tree:tree.sha,parents:[base.head]});
      try{await api('/git/refs/heads/'+BRANCH,token,'PATCH',{sha:commit.sha,force:false});break}
      catch(e){
        // A lost response can follow a successful write. Check before retrying.
        const latest=await snapshot(token);
        if(latest.list.some(t=>t.id===id))break;
        if((e.status===409||e.status===422)&&latest.head!==base.head&&attempt<2){base=latest;continue}
        throw e;
      }
    }
    setStatus('완료 · 음악과 공개 목록을 함께 등록했습니다. 배포가 끝나면 공개 페이지를 새로고침해 주세요.');
    $('title').value='';$('description').value='';$('audio').value='';$('cover').value='';$('allow').checked=false;
  }catch(e){setStatus('업로드를 완료하지 못했습니다 · '+e.message+' 다시 시도하기 전에 공개 목록을 확인하세요.');}
  finally{token='';$('token').value='';busy=false;upload.disabled=false}
});
window.addEventListener('pagehide',()=>{$('token').value=''});
})();
