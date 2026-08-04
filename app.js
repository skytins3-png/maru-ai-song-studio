const DATA={
 '한국':[['가야금','현악기','pluck'],['대금','관악기','flute'],['해금','현악기','bow'],['장구','타악기','drum']],
 '중국':[['고쟁','현악기','pluck'],['얼후','현악기','bow'],['비파','현악기','pluck'],['디즈','관악기','flute']],
 '일본':[['고토','현악기','pluck'],['샤미센','현악기','pluck'],['샤쿠하치','관악기','flute'],['타이코','타악기','drum']],
 '인도':[['시타르','현악기','pluck'],['타블라','타악기','drum'],['반수리','관악기','flute'],['탄푸라','현악기','bow']],
 '중동':[['우드','현악기','pluck'],['카눈','현악기','pluck'],['네이','관악기','flute'],['다르부카','타악기','drum']],
 '유럽':[['바이올린','현악기','bow'],['첼로','현악기','bow'],['하프','현악기','pluck'],['플루트','관악기','flute']],
 '아프리카':[['코라','현악기','pluck'],['젬베','타악기','drum'],['칼림바','건반형','pluck'],['발라폰','타악기','bell']],
 '남미':[['차랑고','현악기','pluck'],['케나','관악기','flute'],['팬플루트','관악기','flute'],['봄보','타악기','drum']]
};
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
let region='한국', selected=new Set(), ctx=null, timers=[];
const bpmMap={slow:72,medium:98,fast:126};

function renderRegions(){
 $('#regions').innerHTML=Object.keys(DATA).map(r=>`<button class="chip ${r===region?'active':''}" data-region="${r}">${r}</button>`).join('');
 $$('#regions button').forEach(b=>b.onclick=()=>{region=b.dataset.region;renderRegions();renderInstruments()});
}
function renderInstruments(){
 $('#instruments').innerHTML=DATA[region].map(([n,t])=>`<div class="instrument ${selected.has(n)?'active':''}"><b>${n}</b><span>${region} · ${t}</span><button data-name="${n}" class="hear">▶ 소리</button> <button data-pick="${n}">${selected.has(n)?'✓ 선택됨':'+ 선택'}</button></div>`).join('');
 $$('.hear').forEach(b=>b.onclick=e=>{e.stopPropagation();previewTone(findInstrument(b.dataset.name)[2])});
 $$('[data-pick]').forEach(b=>b.onclick=()=>{let n=b.dataset.pick;selected.has(n)?selected.delete(n):selected.add(n);renderInstruments();updateInfo()});
}
function findInstrument(name){for(const list of Object.values(DATA)){const f=list.find(x=>x[0]===name);if(f)return f}return ['피아노','건반','pluck']}
function audio(){return ctx||(ctx=new (window.AudioContext||window.webkitAudioContext)())}
function tone(type,freq=440,when=0,dur=.55,vol=.12){
 const c=audio(), t=c.currentTime+when, g=c.createGain(), o=c.createOscillator();o.connect(g);g.connect(c.destination);
 const waves={pluck:'triangle',bow:'sawtooth',flute:'sine',bell:'sine',drum:'square'};o.type=waves[type]||'sine';o.frequency.setValueAtTime(type==='drum'?freq/2:freq,t);
 if(type==='pluck'||type==='drum'){g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.001,t+dur)}else{g.gain.setValueAtTime(.001,t);g.gain.linearRampToValueAtTime(vol,t+.08);g.gain.exponentialRampToValueAtTime(.001,t+dur)}
 o.start(t);o.stop(t+dur+.02);
}
function previewTone(type){audio().resume();const seq=type==='drum'?[110,90,130,90]:[261.6,329.6,392,523.2];seq.forEach((f,i)=>tone(type,f,i*.18,.45,.1))}
function stop(){timers.forEach(clearTimeout);timers=[];if(ctx){ctx.close();ctx=null}$('#pulse').classList.remove('playing')}
function playMix(){
 stop();audio().resume();const bpm=bpmMap[$('#speed').value], beat=60/bpm, chosen=[...selected];if(!chosen.length){autoPick();return playMix()}
 const scale=[261.6,293.7,329.6,392,440,523.2];let count=0;$('#pulse').classList.add('playing');
 const loop=()=>{chosen.slice(0,4).forEach((n,j)=>{const type=findInstrument(n)[2], note=scale[(count+j*2)%scale.length];tone(type,type==='drum'?100:note,j*.025,beat*.8,.055)});tone('drum',90,0,.16,.035);count++;if(count<32)timers.push(setTimeout(loop,beat*1000));else $('#pulse').classList.remove('playing')};loop();
}
function autoPick(){selected.clear();const picks=DATA[region].slice(0,3);picks.forEach(x=>selected.add(x[0]));const european=DATA['유럽'][region==='유럽'?3:Math.random()>.5?1:0][0];selected.add(european);renderInstruments();updateInfo();toast(`${region} 악기와 ${european}을 조합했습니다`)}
function updateInfo(){const bpm=bpmMap[$('#speed').value];$('#musicInfo').textContent=`${bpm} BPM · 4/4박자 · ${[...selected].join(' + ')||'악기를 선택해 주세요'}`}
function makeLyrics(){
 const story=$('#story').value.trim()||'마음속에 간직한 소중한 사람',mood=$('#mood').value,lang=$('#language').value,vocal=$('#vocal').value;
 const key=story.replace(/[,.!?]/g,'').split(/\s+/).slice(0,3).join(' '), title=`${key||mood+' 마음'}`;
 $('#title').value=title;
 $('#lyrics').value=`[Intro]\n(${[...selected].slice(0,2).join('와 ')||region+' 전통악기'}가 천천히 시작)\n\n[Verse 1]\n오늘도 문득 떠오르는 이야기\n말하지 못한 마음이 바람을 타고\n멀리 있어도 들을 수 있도록\n작은 멜로디에 내 진심을 담아\n\n[Pre-Chorus]\n한 걸음 두 걸음 가까워지는 순간\n멈춰 있던 시간이 다시 흐르고\n\n[Chorus]\n${key}, 내 마음이 노래해\n어두운 밤에도 빛을 잃지 마\n${key}, 우리 함께 걸어가\n이 노래 끝까지 곁에 있을게\n\n[Verse 2]\n수많은 계절이 지나간다 해도\n처음의 그 미소 잊지 않을게\n서로 다른 길을 걷고 있어도\n같은 하늘 아래 다시 만날 테니\n\n[Bridge]\n조용히 눈을 감으면 들려와\n우리의 마음이 하나 되는 소리\n\n[Final Chorus]\n${key}, 더 크게 노래해\n세상의 바람도 우릴 막지 못해\n${key}, 손을 잡고 걸어가\n오늘의 이 노래 영원히 기억해\n\n[Outro]\n(${[...selected].slice(-2).join('와 ')||'현악기'}의 여운)`;
 const bpm=bpmMap[$('#speed').value],mins=$('#length').value,blend=$('#blend').value,inst=[...selected].join(', ')||`${region} 전통악기`;
 $('#style').value=`${mood} ${$('#genre').value}, ${bpm} BPM, 4/4 time, 약 ${mins}분, ${vocal} 보컬, ${lang}. 악기: ${inst}. 전통악기 비율 ${blend}%. 도입은 여백 있게, 벌스는 보컬 중심, 후렴은 현악기와 타악기를 넓게 쌓고, 브리지에서 전통악기 독주 후 마지막 후렴을 웅장하게. 보컬을 선명하게, 과도한 저음과 리버브 제외.`;
 toast('가사와 음악 설계를 만들었습니다')
}
function toast(s){const t=$('#toast');t.textContent=s;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1800)}
function save(){const songs=JSON.parse(localStorage.getItem('maruSongs')||'[]');songs.unshift({title:$('#title').value||'제목 없음',lyrics:$('#lyrics').value,style:$('#style').value,date:new Date().toLocaleDateString('ko-KR')});localStorage.setItem('maruSongs',JSON.stringify(songs.slice(0,30)));renderSaved();toast('노래를 저장했습니다')}
function renderSaved(){const songs=JSON.parse(localStorage.getItem('maruSongs')||'[]');$('#savedSongs').innerHTML=songs.length?songs.map((s,i)=>`<article><b>${s.title}</b><p>${s.date}</p><button class="secondary" data-load="${i}">열기</button> <button class="danger" data-del="${i}">삭제</button></article>`).join(''):'<p>아직 저장한 노래가 없습니다.</p>';$$('[data-load]').forEach(b=>b.onclick=()=>{const s=songs[b.dataset.load];$('#title').value=s.title;$('#lyrics').value=s.lyrics;$('#style').value=s.style;scrollTo({top:document.body.scrollHeight/2,behavior:'smooth'})});$$('[data-del]').forEach(b=>b.onclick=()=>{songs.splice(b.dataset.del,1);localStorage.setItem('maruSongs',JSON.stringify(songs));renderSaved()})}

$('#autoPick').onclick=autoPick;$('#playMix').onclick=playMix;$('#stopMix').onclick=stop;$('#createSong').onclick=makeLyrics;$('#saveSong').onclick=save;$('#blend').oninput=e=>$('#blendValue').textContent=e.target.value+'%';$('#speed').onchange=updateInfo;
$$('[data-copy]').forEach(b=>b.onclick=async()=>{const el=$('#'+b.dataset.copy);await navigator.clipboard.writeText(el.value);toast('복사했습니다')});
renderRegions();renderInstruments();autoPick();renderSaved();if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js');
