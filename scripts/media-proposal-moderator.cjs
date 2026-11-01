'use strict';
/** Screen public request TEXT, not binary media. Never approve broadcast. */
const fs=require('node:fs');
const guard=require('./media-review-guard.cjs');
const REPO=process.env.GITHUB_REPOSITORY||'',TOKEN=process.env.GITHUB_TOKEN||'';
async function api(path,{method='GET',body}={}){
 if(!/^[-\w.]+\/[-\w.]+$/.test(REPO)||!TOKEN)throw Error('Missing credential');
 const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),12000);
 try{
  const r=await fetch('https://api.github.com/repos/'+REPO+path,{
   method,signal:controller.signal,
   headers:{Accept:'application/vnd.github+json',Authorization:'Bearer '+TOKEN,
   'X-GitHub-Api-Version':'2022-11-28','Content-Type':'application/json','User-Agent':'MARU-media-text-screener'},
   body:body===undefined?undefined:JSON.stringify(body)});
  if(!r.ok)throw Error('GitHub moderation request '+r.status);
  return r.status===204?null:r.json();
 }finally{clearTimeout(timeout)}
}
async function remove(num,label,existing){
 if(!existing.has(label))return;
 await api('/issues/'+num+'/labels/'+label,{method:'DELETE'});
 existing.delete(label);
}
async function add(num,label,existing){
 if(existing.has(label))return;
 await api('/issues/'+num+'/labels',{method:'POST',body:{labels:[label]}});
 existing.add(label);
}
async function processEvent(event){
 const num=Number(event?.issue?.number);
 if(!Number.isSafeInteger(num)||num<1)return;
 const issue=await api('/issues/'+num);
 if(!issue||issue.pull_request)return;
 const existing=new Set((issue.labels||[]).map(x=>typeof x==='string'?x:x.name));
 if(!String(issue.title||'').startsWith('[MEDIA-REVIEW] ')&& !existing.has('media-screened')&&!existing.has('media-quarantine'))return;
 if(issue.state==='open'&&guard.assessMedia(issue).safe){
  await remove(num,'media-quarantine',existing);
  await add(num,'media-screened',existing);
  console.log('Proposal #'+num+' text screened; NO file scan, copyright clearance or broadcast.');
 }else{
  await remove(num,'media-screened',existing);
  if(issue.state==='open')await add(num,'media-quarantine',existing);
  else await remove(num,'media-quarantine',existing);
  console.log('Proposal #'+num+' quarantined or closed, not broadcast.');
 }
}
async function main(){
 if(!process.env.GITHUB_EVENT_PATH)throw Error('Missing GitHub event file');
 await processEvent(JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH,'utf8')));
}
if(require.main===module)main().catch(e=>{console.error('Media proposal scan failed closed: '+e.message);process.exitCode=1});
module.exports={processEvent};