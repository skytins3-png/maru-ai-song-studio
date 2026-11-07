(function(root,factory) {
  "use strict";
  const api=factory();
  if(typeof module==="object"&&module.exports) module.exports=api;
  if(root) root.MaruVoiceCast=api;
})(typeof globalThis==="object"?globalThis:this,function(){
  "use strict";
  // These are fictional *TTS delivery settings*, not trained singer voices,
  // voice cloning or a verified age/gender identity of a browser voice.
  const SETTINGS=Object.freeze([
    {name:"아환",rate:0.94,pitch:0.89,slot:0,example:"안녕하세요. 아환입니다. 오늘도 음악과 함께해요."},
    {name:"윤솔",rate:0.99,pitch:1.05,slot:1,example:"반가워요. 윤솔이에요. 오늘은 어떤 노래가 기다릴까요?"},
    {name:"강태준",rate:0.96,pitch:0.92,slot:2,example:"음악이 전하는 마음에 귀 기울여 주세요."},
    {name:"청호",rate:1.03,pitch:1.01,slot:3,example:"좋습니다. 다음 무대도 신나게 이어갈까요?"},
    {name:"서아",rate:0.95,pitch:1.08,slot:4,example:"천천히 들어봐요. 가끔은 한 음이 오래 남잖아요."},
    {name:"린아",rate:0.96,pitch:1.04,slot:5,example:"서로 다른 언어라도 음악은 마음을 전해주죠."},
    {name:"민혁",rate:1.02,pitch:0.98,slot:6,example:"하하, 오늘 초대석 이야기도 재미있네요."},
    {name:"하린",rate:0.97,pitch:1.1,slot:7,example:"그 이야기에 마음이 따뜻해지는 것 같아요."}
  ]);
  const BY_NAME=new Map(SETTINGS.map(x=>[x.name,x]));
  const DEFAULT=SETTINGS[0];
  function style(speaker){
    const s=BY_NAME.get(speaker)||DEFAULT;
    return {rate:s.rate,pitch:s.pitch,name:s.name,example:s.example};
  }
  function key(voice){
    return String(voice && (voice.voiceURI||voice.name)||"")+"|"+
      String(voice&&voice.lang||"").toLowerCase();
  }
  function candidates(voices,lang){
    const all=Array.from(voices||[]).filter(x=>x&&typeof x.lang==="string"&&
      (typeof x.name==="string"||typeof x.voiceURI==="string"));
    const normal=String(lang||"ko-KR").toLowerCase().replace("_","-");
    const exact=all.filter(v=>v.lang.toLowerCase().replace("_","-")===normal);
    const result=exact.length?exact:all.filter(v=>v.lang.toLowerCase().split(/[-_]/)[0]===normal.split("-")[0]);
    // Sorted keys prevent getVoices() enumeration order from reshuffling cast.
    return result.slice().sort((a,b)=>key(a).localeCompare(key(b)));
  }
  function pick(voices,lang,speaker,preferredKey){
    const all=candidates(voices,lang);
    if(!all.length)return null; // Browser will select a default voice; explain in UI.
    const requested=all.find(v=>key(v)===preferredKey);
    if(requested)return requested;
    const local=all.filter(v=>v.localService!==false);
    const pool=local.length?local:all;
    const slot=(BY_NAME.get(speaker)||DEFAULT).slot;
    return pool[slot%pool.length];
  }
  function availableLanguages(voices){
    return [...new Set(Array.from(voices||[]).map(v=>String(v&&v.lang||"").toLowerCase()).filter(Boolean))];
  }
  return {SETTINGS,style,key,candidates,pick,availableLanguages};
});