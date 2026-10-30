(function(root){
'use strict';
const CITIES=['Seoul','Daejeon','Busan','Incheon','Daegu'];
function safeUrl(value){
 try{const u=new URL(value);return u.protocol==='https:'&&
  ['www.bbc.com','bbc.com','www.bbc.co.uk','bbc.co.uk'].includes(u.hostname)}
 catch(e){return false}
}
function summary(code){
 if(code===0)return 'clear skies';
 if(code<=3)return 'partly cloudy skies';
 if(code===45||code===48)return 'mist or fog';
 if(code>=51&&code<=67)return 'rain or drizzle';
 if(code>=71&&code<=77)return 'snow';
 if(code>=80&&code<=82)return 'rain showers';
 if(code>=95)return 'thunderstorms';
 return 'changeable conditions';
}
function minutesAgo(iso,now){
 if(!iso)return Infinity;
 const t=Date.parse(iso);
 return Number.isFinite(t)?(now-t)/60000:Infinity;
}
function facts(data,city,episode,now){
 const t=Number.isFinite(now)?now:Date.now();
 const out={weather:[],news:[],link:'',label:'Weather/news not yet verified'};
 if(!data||!CITIES.includes(city)||!Number.isFinite(Date.parse(data.generatedAt)))return out;
 const feedAge=minutesAgo(data.generatedAt,t);
 // A delayed scheduled job must never be presented as "live".
 if(feedAge<0||feedAge>9*60)return out;
 out.label='Weather: Open-Meteo · News: BBC News · updated '+new Date(data.generatedAt).toLocaleString('en-US');
 const w=data.weather&&data.weather[city];
 if(w&&w.source==='Open-Meteo'
  &&typeof w.temperatureC==='number'&&Number.isFinite(w.temperatureC)
  &&w.temperatureC>=-80&&w.temperatureC<=65
  &&typeof w.windKmh==='number'&&Number.isFinite(w.windKmh)&&w.windKmh>=0&&w.windKmh<300
  &&Number.isInteger(w.weatherCode)&&w.weatherCode>=0&&w.weatherCode<=99){
  out.weather=[
   {who:'host',text:'A quick weather update from Open-Meteo for '+city+'. The latest reported temperature is '+w.temperatureC+' degrees Celsius, with '+summary(w.weatherCode)+'.'},
   {who:'guest',text:'And the wind is around '+w.windKmh+' kilometers per hour. Weather can change, of course. Check an updated forecast before heading outside.'}
  ];
 }
 const list=Array.isArray(data.news)?data.news.filter(x=>x&&
  x.source==='BBC News'&&safeUrl(x.url)&&typeof x.title==='string'&&
  x.title.trim().length>=12&&x.title.length<=160&&
  minutesAgo(x.publishedAt,t)>=-30&&minutesAgo(x.publishedAt,t)<=30*60):[];
 if(list.length){
  const story=list[Math.abs(episode)%list.length];
  out.link=story.url;
  out.news=[
   {who:'host',text:'Time for a headline from BBC News. A recently published report is titled: '+story.title.trim()+'.'},
   {who:'guest',text:"That's the reported headline, not the whole story. We'll leave the details to the linked news source, and we hope everyone stays informed."}
  ];
 }
 return out;
}
root.MaruDailyFacts={facts,safeUrl,summary,CITIES};
})(typeof globalThis!=='undefined'?globalThis:this);