(function(root,make){
 "use strict";
 const api=make();
 if(typeof module==="object"&&module.exports)module.exports=api;
 if(root)root.MaruMobileSunoCore=api;
})(typeof globalThis==="object"?globalThis:this,function(){
 "use strict";
 // Same 30 canonical artist IDs as vocal-studio/artists.json.
 // Do not introduce a second incompatible artist roster.
 const CANONICAL=[
 ["F3-01","한나래"],["F3-02","서하린"],["F3-03","윤소담"],
 ["M7-01","강태준"],["M7-02","문도윤"],["M7-03","차승호"],
 ["M7-04","백지한"],["M7-05","오현준"],["M7-06","서재민"],["M7-07","노태성"],
 ["FS-01","유가은"],["FS-02","정하늬"],["FS-03","임새봄"],["FS-04","송서아"],
 ["FS-05","도나연"],["FS-06","배하영"],["FS-07","신아린"],["FS-08","조보민"],
 ["FS-09","권시은"],["FS-10","남다솔"],
 ["MS-01","류강민"],["MS-02","고하준"],["MS-03","주도현"],["MS-04","진태호"],
 ["MS-05","한재원"],["MS-06","박세찬"],["MS-07","서지환"],["MS-08","문시후"],
 ["MS-09","김태오"],["MS-10","성민우"]
 ];
 const SINGERS=Object.freeze(CANONICAL.map(([id,name])=>Object.freeze({
   id,name,group:id.startsWith("F")?"여성":"남성"
 })));
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