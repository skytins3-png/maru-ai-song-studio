'use strict';
/**
 * Trusted default-branch GitHub Issues moderation worker.
 * NEVER evaluate, shell-interpolate, or execute user-supplied Issue content.
 * The public audio site consumes ONLY the separate approved-stories.json list,
 * never raw Issues. Every edited story requires new human approval.
 */
const fs=require('node:fs');
const guard=require('../music-share/story-guard.js');
const REPO=process.env.GITHUB_REPOSITORY||'';
const TOKEN=process.env.GITHUB_TOKEN||'';
const EVENT_PATH=process.env.GITHUB_EVENT_PATH||'';
const FILE='music-share/approved-stories.json';
const LABELS={scanned:'radio-screened',blocked:'radio-quarantine',approved:'radio-approved'};
const MAX_ISSUES=100;
async function api(path,{method='GET',body,allowMissing=false}={}){
 if(!/^[-\w.]+\/[-\w.]+$/.test(REPO)||!TOKEN)throw Error('Trusted repository/token is not configured');
 const controller=new AbortController();
 const timeout=setTimeout(()=>controller.abort(),12000);
 try{
  const res=await fetch('https://api.github.com/repos/'+REPO+path,{
   method,signal:controller.signal,headers:{
    'Accept':'application/vnd.github+json',
    'Authorization':'Bearer '+TOKEN,
    'X-GitHub-Api-Version':'2022-11-28',
    'Content-Type':'application/json',
    'User-Agent':'maru-radio-story-moderation'
   },body:body===undefined?undefined:JSON.stringify(body)
  });
  if(allowMissing&&res.status===404)return null;
  if(!res.ok)throw Error('GitHub '+method+' '+path.split('?')[0]+' returned '+res.status);
  if(res.status===204)return null;
  return res.json();
 }finally{clearTimeout(timeout)}
}
function labels(issue){return new Set((issue.labels||[]).map(x=>typeof x==='string'?x:x.name))}
async function removeLabel(num,label,known){
 if(!known.has(label))return;
 await api('/issues/'+num+'/labels/'+encodeURIComponent(label),{method:'DELETE'});
 known.delete(label);
}
async function addLabel(num,label,known){
 if(known.has(label))return;
 await api('/issues/'+num+'/labels',{method:'POST',body:{labels:[label]}});
 known.add(label);
}
async function optionalAiScan(parsed){
 const key=process.env.MARU_STORY_MODERATION_API_KEY;
 if(!key)return {ran:false,safe:true};
 // Published public Issue text may be transferred to OpenAI only when the
 // site author has explicitly disclosed optional AI screening.
 const ctrl=new AbortController(),timeout=setTimeout(()=>ctrl.abort(),12000);
 try{
  const r=await fetch('https://api.openai.com/v1/moderations',{
   method:'POST',signal:ctrl.signal,
   headers:{'Authorization':'Bearer '+key,'Content-Type':'application/json'},
   body:JSON.stringify({model:'omni-moderation-latest',input:
    'Title: '+parsed.title+'\nStory: '+parsed.story})
  });
  if(!r.ok)throw Error('Moderation API unavailable: '+r.status);
  const data=await r.json();
  const flagged=data?.results?.[0]?.flagged;
  if(typeof flagged!=='boolean')throw Error('Unexpected moderation classifier response');
  return {ran:true,safe:!flagged};
 }finally{clearTimeout(timeout)}
}
function safeSnapshot(issue,checked){
 return {id:issue.number,name:checked.name,story:checked.story,
  scheduledAt:checked.scheduledAt||'',
  source:'GitHub Issue #'+issue.number};
}
function decodeContents(data){
 if(!data?.content||typeof data.content!=='string')throw Error('Cannot read curated story file');
 const array=JSON.parse(Buffer.from(data.content.replace(/\s/g,''),'base64').toString('utf8'));
 if(!Array.isArray(array))throw Error('Curated story file is not an array');
 return array;
}
async function writeSnapshots(issueNumber,entry){
 for(let attempt=0;attempt<3;attempt++){
  const obj=await api('/contents/'+FILE+'?ref=main');
  const old=decodeContents(obj);
  const filtered=old.filter(x=>x&&Number.isSafeInteger(x.id)&&x.id!==issueNumber);
  if(entry)filtered.unshift(entry);
  const next=filtered.slice(0,MAX_ISSUES);
  if(JSON.stringify(next)===JSON.stringify(old))return;
  try{
   await api('/contents/'+FILE,{method:'PUT',body:{
    message:'security(radio): '+(entry?'approve ':'withdraw ')+'story #'+issueNumber,
    branch:'main',sha:obj.sha,
    content:Buffer.from(JSON.stringify(next,null,2)+'\n').toString('base64')
   }});
   return;
  }catch(e){
   if(/returned (409|422)\b/.test(e.message)&&attempt<2)continue;
   throw e;
  }
 }
 throw Error('Could not update curated radio stories');
}
async function processEvent(event,action){
 const num=Number(event?.issue?.number);
 if(!Number.isSafeInteger(num)||num<1)return;
 const issue=await api('/issues/'+num);
 if(!issue||issue.pull_request||!/^\[STORY\]\s/.test(issue.title||''))return;
 const ls=labels(issue);
 const removeApproval=['edited','closed','unlabeled'].includes(action)
  &&(action!=='unlabeled'||event.label?.name===LABELS.approved);
 if(removeApproval){
  // Revoke on ANY edit, regardless of whether body remains apparently safe.
  await removeLabel(num,LABELS.approved,ls);
  await writeSnapshots(num,null);
 }
 if(issue.state!=='open'){
  await removeLabel(num,LABELS.approved,ls);
  await writeSnapshots(num,null);return;
 }
 if(action==='unlabeled'&&event.label?.name===LABELS.approved)return;
 const checked=guard.evaluateIssue(issue);
 let allowed=checked.safe;
 let aiResult={ran:false,safe:true};
 if(allowed){
  try{aiResult=await optionalAiScan(guard.parseStoryIssue(issue));}
  catch(e){
   allowed=false;
   console.error('Configured AI moderation unavailable; fail closed: '+e.message);
  }
  if(!aiResult.safe)allowed=false;
 }
 if(!allowed){
  await removeLabel(num,LABELS.scanned,ls);
  await removeLabel(num,LABELS.approved,ls);
  await addLabel(num,LABELS.blocked,ls);
  await writeSnapshots(num,null);
  // No story text appears in logs, reviews or failure messages.
  console.log('Story #'+num+' needs review; automated screening did not pass.');
  return;
 }
 await removeLabel(num,LABELS.blocked,ls);
 await addLabel(num,LABELS.scanned,ls);
 // Editing revokes prior producer approval; a trusted producer must re-label.
 if(ls.has(LABELS.approved)&&action!=='edited'){
  await writeSnapshots(num,safeSnapshot(issue,checked));
  console.log('Published a screened, producer-approved snapshot #'+num);
 }else{
  await writeSnapshots(num,null);
  console.log('Story #'+num+' screened; awaiting human approval.');
 }
}
async function main(){
 if(!EVENT_PATH)throw Error('Missing GitHub event payload');
 const event=JSON.parse(fs.readFileSync(EVENT_PATH,'utf8'));
 const action=String(event.action||'');
 // Never use event string data in executable shell scripts.
 await processEvent(event,action);
}
if(require.main===module)main().catch(e=>{console.error('Moderation failed safely: '+e.message);process.exitCode=1});
module.exports={safeSnapshot,decodeContents,processEvent,optionalAiScan};