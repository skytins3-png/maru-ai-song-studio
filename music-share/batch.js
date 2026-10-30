(function(){
'use strict';
const OWNER='skytins3-png',REPO='maru-ai-song-studio',BRANCH='main',ROOT='music-share';
const $=id=>document.getElementById(id),status=$('batchStatus'),button=$('batchUpload');
const core=globalThis.MaruBatchCore;
let busy=false;
let genreSelects=[];
const genres=globalThis.MaruGenres;
const show=message=>{status.textContent=message};
function b64(buf){
 const bytes=new Uint8Array(buf);
 let out='',step=32768;
 for(let i=0;i<bytes.length;i+=step){
  out+=String.fromCharCode.apply(null,bytes.subarray(i,Math.min(i+step,bytes.length)));
 }
 return btoa(out);
}
function decode(value){
 return new TextDecoder().decode(Uint8Array.from(atob(value.replace(/\s/g,'')),c=>c.charCodeAt(0)));
}
async function api(path,token,method='GET',body){
 const response=await fetch('https://api.github.com/repos/'+OWNER+'/'+REPO+path,{
  method,cache:'no-store',headers:{
   'Accept':'application/vnd.github+json',
   'Authorization':'Bearer '+token,
   'X-GitHub-Api-Version':'2022-11-28',
   'Content-Type':'application/json'
  },body:body===undefined?undefined:JSON.stringify(body)
 });
 if(!response.ok){
  const e=new Error(response.status===401?'Invalid GitHub token':
   response.status===403?'Permission denied, or GitHub API rate limit':
   'GitHub API request failed ('+response.status+')');
  e.status=response.status;throw e;
 }
 return response.json();
}
async function snapshot(token){
 const ref=await api('/git/ref/heads/'+BRANCH,token);
 const commit=await api('/git/commits/'+ref.object.sha,token);
 const cat=await api('/contents/'+ROOT+'/catalog.json?ref='+ref.object.sha,token);
 let list;
 try{
  list=JSON.parse(decode(cat.content));
  if(!Array.isArray(list)||list.some(x=>!x||typeof x!=='object'||Array.isArray(x)))throw Error();
 }catch(e){throw Error('Catalog is corrupted; no files will be published. Restore catalog.json first.')}
 return {head:ref.object.sha,tree:commit.tree.sha,list};
}
async function uploadBlob(bytes,token){
 const sha=(await api('/git/blobs',token,'POST',{content:b64(bytes),encoding:'base64'})).sha;
 return sha;
}
async function prepare(files,token,knownHashes,artist,description,genreMap){
 const records=[],already=new Set(knownHashes);
 for(let i=0;i<files.length;i++){
  const file=files[i];
  show('Uploading original '+(i+1)+' / '+files.length+': '+file.name);
  const bytes=await file.arrayBuffer();
  const digest=await crypto.subtle.digest('SHA-256',bytes);
  const sha256=core.hex(new Uint8Array(digest));
  if(already.has(sha256))continue;
  already.add(sha256);
  const sha=await uploadBlob(bytes,token);
  const id=Date.now()+'-'+crypto.randomUUID();
  const title=core.titleFromFile(file.name);
  const path='tracks/'+id+'-'+MusicShare.slug(title)+'.'+MusicShare.extension(file.name);
  const track={id,title,artist:artist.slice(0,120),
   description:description.slice(0,400),
   genre:genreMap.get(file)||genres.detect(file.name),
   audio:path,cover:'',createdAt:new Date().toISOString(),
   downloadAllowed:true,audioSha256:sha256};
  records.push({sha,track});
 }
 return records;
}
async function publish(records,token,initial){
 let base=initial;
 for(let attempt=0;attempt<3;attempt++){
  const existing=core.existingHashes(base.list);
  const add=records.filter(r=>!existing.has(r.track.audioSha256)
     && !base.list.some(t=>t.id===r.track.id));
  if(!add.length)return 0;
  const files=add.map(r=>({path:ROOT+'/'+r.track.audio,mode:'100644',type:'blob',sha:r.sha}));
  files.push({path:ROOT+'/catalog.json',mode:'100644',type:'blob',
   content:JSON.stringify([...add.map(x=>x.track),...base.list],null,2)+'\n'});
  show('Publishing '+add.length+' tracks in one safe catalog commit…');
  const tree=await api('/git/trees',token,'POST',{base_tree:base.tree,tree:files});
  const commit=await api('/git/commits',token,'POST',{
   message:'music-share: batch publish '+add.length+' rights-cleared originals',
   tree:tree.sha,parents:[base.head]
  });
  try{
   await api('/git/refs/heads/'+BRANCH,token,'PATCH',{sha:commit.sha,force:false});
   return add.length;
  }catch(error){
   const latest=await snapshot(token);
   const allIds=new Set(latest.list.map(t=>t.id));
   if(add.every(r=>allIds.has(r.track.id)))return add.length;
   if((error.status===409||error.status===422)&&latest.head!==base.head&&attempt<2){
    base=latest;continue;
   }
   throw error;
  }
 }
 throw Error('Another upload updated the catalog repeatedly. Please retry after checking the music list.');
}
// Keep every category user-reviewable instead of pretending audio-content AI analysis.
function renderGenreReview(){
 const root=$('genreReview');
 genreSelects=[];
 if(!root||typeof document.createElement!=='function'||typeof root.replaceChildren!=='function')return;
 root.replaceChildren();
 for(const file of Array.from($('audioFiles').files||[])){
  const label=document.createElement('label');label.className='genre-review-row';
  const title=document.createElement('span');title.textContent=file.name;
  const select=document.createElement('select');select.setAttribute('aria-label','Category for '+file.name);
  for(const id of ['korean','chinese','western','instrumental','other']){
   const option=document.createElement('option');option.value=id;option.textContent=genres.label(id);select.appendChild(option);
  }
  select.value=genres.detect(file.name);label.appendChild(title);label.appendChild(select);
  root.appendChild(label);genreSelects.push(select);
 }
}
$('audioFiles').addEventListener('change',renderGenreReview);
$('batchForm').addEventListener('submit',async event=>{
 event.preventDefault();if(busy)return;
 let token=$('token').value.trim();
 const files=Array.from($('audioFiles').files||[]);
 const artist=$('artist').value.trim(),description=$('description').value.trim();
 if(!token){show('Enter an authorized GitHub Contents-write token.');return}
 try{core.validateQueue(files,artist,$('uploadConsent').checked)}
 catch(error){show(error.message);return}
 busy=true;button.disabled=true;
 let publishedTotal=0;
 try{
  for(const file of files)await MaruSafeMedia.verify(file);
  show('Checking existing catalog and duplicate fingerprints…');
  const groups=genres.splitBatches(files);
  const selectedGenres=new Map(files.map((file,i)=>[file,genreSelects[i]&&genreSelects[i].value||genres.detect(file.name)]));
  let base=await snapshot(token);
  const known=core.existingHashes(base.list);
  for(let i=0;i<groups.length;i++){
   show('Preparing batch '+(i+1)+' / '+groups.length+' · '+publishedTotal+' published so far');
   const records=await prepare(groups[i],token,known,artist,description,selectedGenres);
   if(records.length){
    const added=await publish(records,token,base);
    publishedTotal+=added;
    for(const entry of records)known.add(entry.track.audioSha256);
   }
   // Read the current head after every atomic commit to avoid dropping another update.
   if(i<groups.length-1)base=await snapshot(token);
  }
  show(publishedTotal
   ?'Published '+publishedTotal+' original tracks in '+groups.length+' batches. The radio updates after Pages deployment.'
   :'These exact original files are already in the public catalog. No duplicate upload.');
  $('audioFiles').value='';$('uploadConsent').checked=false;renderGenreReview();
 }catch(error){
  show('Upload did not finish: '+error.message+'. '+publishedTotal+' track(s) confirmed published; check the public list before retrying.');
 }finally{
  token='';$('token').value='';busy=false;button.disabled=false;
 }
});
window.addEventListener('pagehide',()=>{$('token').value=''});
})();