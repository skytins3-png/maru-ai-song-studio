(function(root,make){
 "use strict";
 const api=make();
 if(typeof module==="object"&&module.exports)module.exports=api;
 if(root)root.MaruMobileSunoCore=api;
})(typeof globalThis==="object"?globalThis:this,function(){
 "use strict";
 const NAMES_M=["강태준","민도윤","윤시후","한도겸","차이준","서건우","백유찬","강서율","류하준","남지후","오태린","임선우","정하온","유도현","문이안","신재온","권도하","장유건","홍시안","송태오"];
 const NAMES_F=["서하린","윤채린","한세아","차나린","백소윤","류서빈","남예린","오하늬","임다온","정유라"];
 const SINGERS=Object.freeze([
   ...NAMES_M.map((name,i)=>Object.freeze({id:"M"+String(i+1).padStart(2,"0"),name,group:"남성 20명"})),
   ...NAMES_F.map((name,i)=>Object.freeze({id:"F"+String(i+1).padStart(2,"0"),name,group:"여성 10명"}))
 ]);
 const HOSTS=Object.freeze(["雲上居者","윤솔","민혁","하린","청호","서아","린아"]);
 const FORMATS=/\.(mp3|wav|m4a|aac|ogg|flac)$/i;
 const REF_FORMATS=/\.(mp3|wav|m4a|aac|ogg|flac|webm)$/i;
 const MAX=80*1024*1024;
 function eligible(file,{cue=false}={}){
   if(!file||typeof file.name!=="string"||!Number.isFinite(file.size))return false;
   return file.size>=1000&&file.size<=(cue?20*1024*1024:MAX)&&(cue?REF_FORMATS:FORMATS).test(file.name);
 }
 function chooseSinger(filename){
   const matches=SINGERS.filter(s=>String(filename).includes(s.name));
   return matches.length===1?matches[0].id:"";
 }
 function soundFormat(bytes){
   const b=bytes instanceof Uint8Array?bytes:new Uint8Array(bytes||[]);
   if(b.length>=12&&String.fromCharCode(...b.slice(0,4))==="RIFF"&&String.fromCharCode(...b.slice(8,12))==="WAVE")return "wav";
   if(b.length>=4&&String.fromCharCode(...b.slice(0,4))==="OggS")return "ogg";
   if(b.length>=4&&String.fromCharCode(...b.slice(0,4))==="fLaC")return "flac";
   if(b.length>=4&&String.fromCharCode(...b.slice(0,4))==="ID3")return "mp3";
   if(b.length>=2&&b[0]===255&&((b[1]&0xe0)===0xe0))return "mp3";
   if(b.length>=12&&String.fromCharCode(...b.slice(4,8))==="ftyp")return "m4a";
   if(b.length>=4&&String.fromCharCode(...b.slice(0,4))==="\u001aEß£")return "webm";
   return "unknown";
 }
 async function hashBlob(blob){
   if(!globalThis.crypto?.subtle)throw Error("HTTPS 보안 연결이 있어야 SHA-256 중복 검사가 가능합니다.");
   const result=await crypto.subtle.digest("SHA-256",await blob.arrayBuffer());
   return Array.from(new Uint8Array(result),n=>n.toString(16).padStart(2,"0")).join("");
 }
 function cueKey(speaker,script){
   return String(speaker||"").trim()+"|"+String(script||"").replace(/\s+/g," ").trim();
 }
 function safeTitle(name){return String(name||"").replace(/\.(mp3|wav|m4a|aac|ogg|flac|webm)$/i,"").slice(0,130);}
 function sourceTrack({id,name,blob,singerId}){
   return {id:String(id||""),name:String(name||"").slice(0,180),blob,singerId:String(singerId||"").slice(0,30)};
 }
 const idSet=new Set(SINGERS.map(s=>s.id));
 function knownSinger(id){return idSet.has(id)||id==="";}
 return {SINGERS,HOSTS,eligible,chooseSinger,soundFormat,hashBlob,cueKey,safeTitle,sourceTrack,knownSinger,MAX};
});