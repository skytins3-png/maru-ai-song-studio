const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm');
const root=__dirname+'/../music-share/';
const ctx=vm.createContext({URL,Date});
vm.runInContext(fs.readFileSync(root+'radio-daily.js','utf8'),ctx);
const f=ctx.MaruDailyFacts;
const now=Date.parse('2026-10-30T11:00:00Z');
const base={generatedAt:new Date(now-60*60*1000).toISOString(),timezone:'Asia/Seoul',
 weather:{Seoul:{city:'Seoul',temperatureC:13.2,windKmh:7.5,weatherCode:3,source:'Open-Meteo',observedLocal:'2026-10-30T19:00'}},
 news:[{source:'BBC News',title:'A new story about science and culture',url:'https://www.bbc.com/news/articles/test-news',publishedAt:new Date(now-1000*60*30).toISOString(),category:'World'}]};
test('weather segment only reports verified observation with chosen city and source',()=>{
 const o=f.facts(base,'Seoul',0,now);
 assert.equal(o.weather.length,2);
 assert.match(o.weather[0].text,/13.2 degrees Celsius/);
 assert.match(o.weather[0].text,/Seoul/);
 assert.match(o.weather[0].text,/Open-Meteo/);
 assert.equal(o.news.length,2);
 assert.match(o.news[0].text,/BBC News/);
 assert.match(o.news[0].text,/science and culture/);
 assert.equal(o.link,base.news[0].url);
 const other=f.facts(base,'Busan',0,now);
 assert.equal(other.weather.length,0);
});
test('expired weather and news do not pretend to be live',()=>{
 const stale=f.facts({...base,generatedAt:new Date(now-12*3600*1000).toISOString()},'Seoul',0,now);
 assert.equal(stale.weather.length,0);assert.equal(stale.news.length,0);
 assert.match(stale.label,/not yet verified/);
 const oldNews=f.facts({...base,news:[{...base.news[0],publishedAt:new Date(now-33*3600*1000).toISOString()}]},'Seoul',0,now);
 assert.equal(oldNews.news.length,0);
});
test('wrong domains, invalid weather, future news, missing API are not broadcast',()=>{
 assert.equal(f.safeUrl('https://evil.example/news'),false);
 assert.equal(f.safeUrl('javascript:alert(1)'),false);
 assert.equal(f.safeUrl(base.news[0].url),true);
 const bad={...base,weather:{Seoul:{...base.weather.Seoul,temperatureC:'99'}},
  news:[{...base.news[0],url:'https://phishing.example/login'},{...base.news[0],publishedAt:new Date(now+3600*1000).toISOString()}]};
 const o=f.facts(bad,'Seoul',0,now);
 assert.equal(o.weather.length,0);assert.equal(o.news.length,0);
 assert.equal(f.facts(null,'Seoul',0,now).news.length,0);
});
test('radio markup includes opt-in daily briefings and links to cited sources',()=>{
 const html=fs.readFileSync(root+'radio.html','utf8');
 assert.match(html,/id="weatherCity"/);
 assert.match(html,/id="dailyEnabled"/);
 assert.match(html,/id="dailySummary"/);
 assert.match(html,/id="newsSource"/);
 assert.match(html,/radio-daily.js/);
});
