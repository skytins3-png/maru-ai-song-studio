// MARU anonymous intake. A Worker is REQUIRED; GitHub Pages cannot accept private uploads.
// User uploads NEVER enter a public song catalog or a broadcast queue.
const ORIGIN = "https://skytins3-png.github.io";
const HOSTNAME = "skytins3-png.github.io";
const MAX_BODY = 8 * 1024 * 1024 + 32 * 1024;
const MAX_FILE = 8 * 1024 * 1024;
const KINDS = {
  ".jpg": ["image/jpeg", b => b[0]===255&&b[1]===216&&b[2]===255],
  ".jpeg":["image/jpeg", b => b[0]===255&&b[1]===216&&b[2]===255],
  ".png": ["image/png", b => [137,80,78,71,13,10,26,10].every((n,i)=>b[i]===n)],
  ".webp":["image/webp", b => ascii(b,0,4)==="RIFF"&&ascii(b,8,12)==="WEBP"],
  ".mp3": ["audio/mpeg", b => ascii(b,0,3)==="ID3"||(b[0]===255&&(b[1]&224)===224)],
  ".wav": ["audio/wav", b => ascii(b,0,4)==="RIFF"&&ascii(b,8,12)==="WAVE"],
  ".mp4": ["video/mp4", b => ascii(b,4,8)==="ftyp"]
};
function ascii(a,from,to){return Array.from(a.slice(from,to)).map(x=>String.fromCharCode(x)).join("");}
const reject=(reason,status=400)=>Object.assign(new Error(reason),{status});
function json(value,status=200,origin=""){
 const headers={"content-type":"application/json; charset=utf-8","cache-control":"no-store",
   "x-content-type-options":"nosniff","referrer-policy":"no-referrer","vary":"Origin"};
 if(origin===ORIGIN)headers["access-control-allow-origin"]=ORIGIN;
 return new Response(JSON.stringify(value),{status,headers});
}
function clean(s,max){
 if(typeof s!=="string")throw reject("입력값을 확인해 주세요.");
 const v=s.normalize("NFKC").trim();
 if(v.length>max||/[\u0000-\u001f\u007f-\u009f\u200b-\u200f\u202a-\u202e\u2060-\u206f]/u.test(v))
   throw reject("입력 길이 또는 특수문자를 확인해 주세요.");
 return v;
}
function kstToUtc(raw){
 const v=clean(raw,16);
 if(!v)return "";
 if(!/^20\d{2}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])T(?:[01]\d|2[0-3]):[0-5]\d$/.test(v))
   throw reject("한국시간 날짜를 확인해 주세요.");
 const [year,month,day,hour,min]=v.match(/\d+/g).map(Number);
 const time=Date.UTC(year,month-1,day,hour-9,min);
 if(new Date(time+9*3600000).toISOString().slice(0,16)!==v)
   throw reject("존재하지 않는 날짜입니다.");
 if(time<Date.now()-5*60000 || time>Date.now()+31*86400000)
   throw reject("희망 날짜는 현재 이후 31일 이내로 선택하세요.");
 return new Date(time).toISOString();
}
function safeText(name,title,story){
 const joined=[name,title,story].join(" ");
 if(/(?:https?:\/\/|www\.|(?:[\w-]+\.)+(?:com|net|org|kr|cn|io)\b|<[^>]+>|javascript\s*:)/iu.test(joined)
   ||/[\w.+-]+@[\w.-]+\.[a-z]{2,}/iu.test(joined)
   ||/(?:\+?\d[\d ()-]{8,}\d)/.test(joined)
   ||/(?:비밀번호|계좌번호|주민등록번호|password|otp|ignore previous instructions|system prompt)/iu.test(joined))
   throw reject("개인정보·링크·실행 지시문은 사연에 넣을 수 없습니다.");
 if(title.length<3||story.length<20)throw reject("제목 3자 이상, 사연 20자 이상 입력해 주세요.");
}
function inspectFile(file){
 if(!file || !(file instanceof Blob) || !Number.isSafeInteger(file.size)
    ||file.size<12||file.size>MAX_FILE)throw reject("첨부파일은 8MB 이하만 접수합니다.",413);
 const filename=String(file.name||"");
 const ext=/\.[A-Za-z0-9]+$/.exec(filename)?.[0]?.toLowerCase();
 if(!ext||!Object.hasOwn(KINDS,ext))throw reject("사진 JPG/PNG/WEBP, 영상 MP4, 음악 MP3/WAV만 지원합니다.");
 return {ext,mime:KINDS[ext][0],check:KINDS[ext][1]};
}
async function readForm(request){
 if(!request.body)throw reject("내용이 없습니다.");
 const length=Number(request.headers.get("content-length")||0);
 if(length>MAX_BODY)throw reject("전체 접수 용량이 너무 큽니다.",413);
 if(!/^multipart\/form-data;\s*boundary=/i.test(request.headers.get("content-type")||""))
   throw reject("폼 전송 형식이 올바르지 않습니다.",415);
 const reader=request.body.getReader(),chunks=[];let size=0;
 try{
  while(true){
   const {value,done}=await reader.read();
   if(done)break;
   size+=value.byteLength;
   if(size>MAX_BODY)throw reject("전체 접수 용량이 너무 큽니다.",413);
   chunks.push(value);
  }
 }catch(e){await reader.cancel().catch(()=>{});throw e}
 const req=new Request(request.url,{method:"POST",
   headers:{"content-type":request.headers.get("content-type")},body:new Blob(chunks)});
 return req.formData();
}
async function verifyTurnstile(token,env){
 if(!env.TURNSTILE_SECRET||!token)return false;
 const r=await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify",{
  method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},
  body:new URLSearchParams({secret:env.TURNSTILE_SECRET,response:token}),
  signal:AbortSignal.timeout(8000)
 });
 if(!r.ok)return false;
 const d=await r.json();
 return d.success===true && d.hostname===HOSTNAME;
}
async function hash(bytes){
 return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",bytes)))
  .map(x=>x.toString(16).padStart(2,"0")).join("");
}
async function submit(req,env){
 if(!env.DB||!env.QUARANTINE||!env.TURNSTILE_SECRET||!env.RATE_LIMITER)
   throw reject("접수 서버가 아직 준비되지 않았습니다.",503);
 // Anonymous but not unprotected; Turnstile and a server-side throttle are compulsory.
 const ip=req.headers.get("cf-connecting-ip")||"unknown";
 const key=await hash(new TextEncoder().encode(String(env.RATE_SALT||"MARU")+ip));
 const {success}=await env.RATE_LIMITER.limit({key});
 if(!success)throw reject("너무 많은 요청입니다. 잠시 후 다시 시도해 주세요.",429);
 const form=await readForm(req);
 if(!(await verifyTurnstile(String(form.get("cf-turnstile-response")||""),env)))
   throw reject("자동 접수 방지 확인에 실패했습니다.",403);
 const name=clean(String(form.get("nickname")||""),40)||"익명 청취자";
 const title=clean(String(form.get("title")||""),100);
 const story=clean(String(form.get("story")||""),1200);
 safeText(name,title,story);
 const scheduledAt=kstToUtc(String(form.get("airtime")||""));
 if(form.get("consent")!=="yes")throw reject("사연 방송 검토 동의가 필요합니다.");
 const f=form.get("media");let uploaded=null,bytes=null;
 if(f && typeof f==="object" && f.size>0){
  if(form.get("mediaRights")!=="yes")throw reject("첨부자료의 이용 권한 확인에 동의해 주세요.");
  const spec=inspectFile(f);
  bytes=new Uint8Array(await f.arrayBuffer());
  if(!spec.check(bytes.slice(0,40)))throw reject("파일 내용이 확장자와 일치하지 않습니다.");
  uploaded={ext:spec.ext,size:bytes.byteLength,sha256:await hash(bytes)};
 }
 const id=crypto.randomUUID(), now=new Date().toISOString();
 const objectKey=uploaded?"quarantine/"+id+uploaded.ext:"";
 try{
  if(uploaded){
   // Private R2 storage. Never attach a public domain to this bucket.
   await env.QUARANTINE.put(objectKey,bytes,{
    httpMetadata:{contentType:"application/octet-stream"},
    customMetadata:{sha256:uploaded.sha256,review:"unscanned"}
   });
  }
  await env.DB.prepare("INSERT INTO listener_stories (id, nickname, title, story, requested_at, created_at, status, media_key, media_size, media_sha256) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
   .bind(id,name,title,story,scheduledAt,now,"pending_security_review",
     objectKey,uploaded?.size||0,uploaded?.sha256||"").run();
 }catch(e){
  if(uploaded)await env.QUARANTINE.delete(objectKey).catch(()=>{});
  throw reject("접수 저장에 실패했습니다. 다시 시도해 주세요.",503);
 }
 return {ok:true,receipt:id,status:"pending_review",
   message:"사연이 접수되었습니다. 방송 여부는 형의 검토 후 결정됩니다."};
}
export default {
 async fetch(req,env){
  const url=new URL(req.url),origin=req.headers.get("origin")||"";
  if(req.method==="OPTIONS"){
   if(origin!==ORIGIN)return json({error:"Origin not allowed"},403);
   return new Response(null,{status:204,headers:{
    "access-control-allow-origin":ORIGIN,"access-control-allow-methods":"POST, OPTIONS",
    "access-control-allow-headers":"content-type","access-control-max-age":"600",
    "vary":"Origin"}});
  }
  if(req.method==="GET"&&url.pathname==="/health")
    return json({ready:!!(env.DB&&env.QUARANTINE&&env.TURNSTILE_SECRET&&env.RATE_LIMITER)},200,origin);
  if(req.method!=="POST"||url.pathname!=="/api/stories")return json({error:"Not found"},404);
  if(origin!==ORIGIN)return json({error:"허용되지 않은 출처입니다."},403);
  try{return json(await submit(req,env),201,origin)}
  catch(e){return json({ok:false,error:e.status?e.message:"안전한 접수 처리에 실패했습니다."},e.status||503,origin)}
 }
};
