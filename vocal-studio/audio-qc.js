(function(root,factory){
"use strict";const api=factory();if(typeof module==="object"&&module.exports)module.exports=api;if(root)root.MaruAudioQC=api;
})(typeof globalThis==="object"?globalThis:this,function(){
"use strict";
function round(x,n=2){return Number(x.toFixed(n));}
function dbFS(linear){return linear<=0?-120:20*Math.log10(linear);}
function assess(channels,sampleRate){
 if(!Array.isArray(channels)||!channels.length||!sampleRate||sampleRate<8000)throw Error("오디오 채널 형식 오류");
 const len=channels[0].length;if(!len)throw Error("오디오 데이터가 비어 있습니다.");
 for(const ch of channels)if(ch.length!==len)throw Error("서로 다른 길이의 채널");
 let peak=0,sum=0,clipped=0,count=0,dcSum=0,nonFinite=0;
 // Streaming-friendly sample stride: analyze up to ~3m samples per audio channel.
 const step=Math.max(1,Math.floor(len/1500000));
 for(let i=0;i<len;i+=step){
   for(const data of channels){
     const x=Number(data[i]);if(!Number.isFinite(x)){nonFinite++;continue;}
     const abs=Math.abs(x);if(abs>peak)peak=abs;
     sum+=x*x;dcSum+=x;count++;
     if(abs>=0.999)clipped++;
   }
 }
 if(count===0)throw Error("유효한 오디오 샘플이 없습니다.");
 const rms=Math.sqrt(sum/count);
 const rmsDb=round(dbFS(rms)),peakDb=round(dbFS(peak));
 const clipPct=round(100*clipped/count,4),dc=round(dcSum/count,5);
 const durationSec=round(len/sampleRate,2);
 const flags=[];
 if(rmsDb< -50)flags.push("평균 음량 매우 작음 (보컬 청취 곤란 가능)");
 if(clipPct>1)flags.push("클리핑 의심 샘플 비율 1% 초과 · 음질 청취 확인");
 if(Math.abs(dc)>0.04)flags.push("오디오 DC 오프셋 이상 의심");
 if(nonFinite)flags.push("비정상 수치 샘플 감지");
 if(sampleRate<32000)flags.push("낮은 샘플 레이트 · 원본 확인");
 if(channels.length===1)flags.push("모노 음원 · 스테레오 필요 여부 확인");
 return {durationSec,sampleRate,channelCount:channels.length,rmsDb,peakDb,clipPct,dc,
   integrityOk:rmsDb>=-50&&clipPct<=1&&Math.abs(dc)<=0.04&&nonFinite===0&&durationSec>=45,
   flags,note:"PCM 기반 참고 지표. 마스터 음질·음정·보컬 동일성·저작권을 자동 증명하지 않습니다."};
}
async function fromFile(file){
 if(!globalThis.AudioContext&&!globalThis.webkitAudioContext)throw Error("기기에서 Web Audio 오디오 분석을 지원하지 않습니다.");
 const Ctx=globalThis.AudioContext||globalThis.webkitAudioContext;
 const ctx=new Ctx();
 try{
  const data=await file.arrayBuffer();
  const decoded=await ctx.decodeAudioData(data);
  const channels=[];
  for(let i=0;i<decoded.numberOfChannels;i++)channels.push(decoded.getChannelData(i));
  return assess(channels,decoded.sampleRate);
 }finally{await ctx.close().catch(()=>{});}
}
return {assess,fromFile};
});