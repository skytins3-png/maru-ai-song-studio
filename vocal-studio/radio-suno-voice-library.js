(function(root,factory){
 "use strict";
 const api=factory();
 if(typeof module==="object"&&module.exports)module.exports=api;
 if(root)root.MaruSunoVoiceLibrary=api;
})(typeof globalThis==="object"?globalThis:this,function(){
 "use strict";
 // IDs/names mirror vocal-studio/artists.json, which has 30 *candidates*.
 // None is a confirmed Suno Persona, verified vocal model or finished singer.
 const SINGERS=Object.freeze([
 ["F3-01","한나래"],["F3-02","서하린"],["F3-03","윤소담"],
 ["M7-01","강태준"],["M7-02","문도윤"],["M7-03","차승호"],
 ["M7-04","백지한"],["M7-05","오현준"],["M7-06","서재민"],["M7-07","노태성"],
 ["FS-01","유가은"],["FS-02","정하늬"],["FS-03","임새봄"],["FS-04","송서아"],
 ["FS-05","도나연"],["FS-06","배하영"],["FS-07","신아린"],["FS-08","조보민"],
 ["FS-09","권시은"],["FS-10","남다솔"],
 ["MS-01","류강민"],["MS-02","고하준"],["MS-03","주도현"],["MS-04","진태호"],
 ["MS-05","한재원"],["MS-06","박세찬"],["MS-07","서지환"],["MS-08","문시후"],
 ["MS-09","김태오"],["MS-10","성민우"]
 ].map(([id,name])=>Object.freeze({id,name})));
 const BY_ID=new Map(SINGERS.map(s=>[s.id,s]));
 const BY_NAME=new Map(SINGERS.map(s=>[s.name,s]));
 const EXT=/\.(mp3|wav|m4a|aac|ogg|flac)$/i;
 function singer(id){return BY_ID.get(id)||null;}
 function autoMatch(filename){
  const s=String(filename||"");
  const matches=SINGERS.filter(x=>s.includes(x.name));
  // A song title containing multiple artist names is ambiguous: require manual assignment.
  return matches.length===1?matches[0]:null;
 }
 function eligible(file,maxMiB=80){
  return !!(file && typeof file.name==="string" && EXT.test(file.name)
      && Number.isFinite(file.size) && file.size>1000
      && file.size<=maxMiB*1024*1024
      && (!file.type || file.type.startsWith("audio/") || file.type==="application/ogg"));
 }
 function cueKey(speaker,text){
  return String(speaker||"").trim()+"|"+String(text||"").replace(/\s+/g," ").trim();
 }
 function isKnownVoice(speaker){
  return !!BY_NAME.get(speaker)||speaker==="아환"||speaker==="윤솔"||
    speaker==="민혁"||speaker==="하린"||speaker==="청호"||
    speaker==="서아"||speaker==="린아";
 }
 return {SINGERS,singer,autoMatch,eligible,cueKey,isKnownVoice};
});