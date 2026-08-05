const DATA={
 '한국':[['가야금','현악기','pluck'],['대금','관악기','flute'],['해금','현악기','bow'],['장구','타악기','drum']],
 '중국':[['고쟁','현악기','pluck'],['얼후','현악기','bow'],['비파','현악기','pluck'],['디즈','관악기','flute']],
 '일본':[['고토','현악기','pluck'],['샤미센','현악기','pluck'],['샤쿠하치','관악기','flute'],['타이코','타악기','drum']],
 '인도':[['시타르','현악기','pluck'],['타블라','타악기','drum'],['반수리','관악기','flute'],['탄푸라','현악기','bow']],
 '중동':[['우드','현악기','pluck'],['카눈','현악기','pluck'],['네이','관악기','flute'],['다르부카','타악기','drum']],
 '유럽':[['바이올린','현악기','bow'],['첼로','현악기','bow'],['하프','현악기','pluck'],['플루트','관악기','flute']],
 '아프리카':[['코라','현악기','pluck'],['젬베','타악기','drum'],['칼림바','건반형','bell'],['발라폰','타악기','bell']],
 '남미':[['차랑고','현악기','pluck'],['케나','관악기','flute'],['팬플루트','관악기','flute'],['봄보','타악기','drum']],
 '현대악기':[['피아노','건반악기','piano'],['전자피아노','건반악기','piano'],['어쿠스틱 기타','현악기','pluck'],['일렉 기타','현악기','guitar'],['베이스 기타','현악기','bass'],['드럼 세트','타악기','drum'],['신시사이저','전자악기','synth'],['전자 패드','전자악기','pad'],['색소폰','관악기','sax'],['트럼펫','관악기','brass'],['808 베이스','전자악기','bass'],['EDM 신스','전자악기','synth']],
 '오케스트라':[['그랜드 피아노','건반악기','piano'],['바이올린 섹션','현악기','bow'],['비올라','현악기','bow'],['첼로 섹션','현악기','bow'],['콘트라베이스','현악기','bass'],['프렌치 호른','금관악기','brass'],['팀파니','타악기','drum'],['합창 패드','성악·패드','pad']]
};

const PROFILES={
 vacation:{keywords:['휴가','여행','복귀','출근','일상','내일부터','내일'],title:'다시 시작하는 내일',mood:'아쉬움에서 희망으로',genre:'팝 록 + 포크',bpm:108,meter:'4/4',key:'D Major',vocal:'편안한 남성 중음, 후렴에서 힘차게',modern:['어쿠스틱 기타','피아노','베이스 기타','드럼 세트'],arrange:'어쿠스틱 기타로 담백하게 시작하고 후렴에서 드럼과 베이스를 열어 밝게 전환'},
 love:{keywords:['사랑','연인','보고 싶','그리워','설렘','눈빛','마음'],title:'너에게 가는 노래',mood:'따뜻하고 설레는',genre:'모던 팝 발라드',bpm:92,meter:'4/4',key:'A Major',vocal:'남녀 듀엣, 벌스는 부드럽고 후렴은 중고음 하모니',modern:['피아노','어쿠스틱 기타','베이스 기타','드럼 세트'],arrange:'피아노와 기타로 가까이 시작해 후렴에서 현악기와 하모니를 넓게 확장'},
 breakup:{keywords:['이별','헤어','떠나','끝난','잊지 못','눈물','아픈'],title:'남겨진 계절',mood:'절제된 슬픔과 긴 여운',genre:'컨템포러리 발라드',bpm:72,meter:'6/8',key:'B Minor',vocal:'낮은 중음에서 시작해 마지막 후렴만 절정',modern:['그랜드 피아노','첼로 섹션','전자 패드','베이스 기타'],arrange:'피아노 단음과 첼로로 여백을 두고 6/8의 흔들림 위에 감정을 천천히 상승'},
 healing:{keywords:['자연','산','바다','비','새벽','치유','편안','쉼','하늘','바람'],title:'마음을 씻는 바람',mood:'맑고 편안한 치유',genre:'어쿠스틱 뉴에이지 팝',bpm:76,meter:'6/8',key:'G Major',vocal:'숨결이 자연스러운 맑은 보컬',modern:['피아노','어쿠스틱 기타','전자 패드','첼로 섹션'],arrange:'자연의 여백을 살린 피아노와 패드, 후렴에서만 부드러운 현악기를 추가'},
 celebration:{keywords:['생일','축하','기념','응원','성공','고마워','감사'],title:'오늘은 너의 날',mood:'밝고 따뜻한 축하',genre:'업리프팅 팝',bpm:118,meter:'4/4',key:'C Major',vocal:'밝은 리드 보컬과 모두 따라 부르는 합창',modern:['피아노','일렉 기타','베이스 기타','드럼 세트'],arrange:'손뼉 리듬과 피아노로 시작해 후렴에서 기타와 단체 하모니를 크게 전개'},
 dance:{keywords:['춤','댄스','클럽','밤중','리듬','신나','파티','네온'],title:'오늘 밤 더 높이',mood:'강렬하고 자유로운',genre:'2026 댄스 팝',bpm:126,meter:'4/4',key:'F# Minor',vocal:'선명한 여성 리드와 짧은 남성 랩',modern:['EDM 신스','808 베이스','드럼 세트','신시사이저'],arrange:'짧은 신스 훅으로 시작해 프리코러스에서 비트를 덜고 드롭형 후렴으로 폭발'},
 hope:{keywords:['희망','꿈','도전','시작','힘내','다시','미래','용기'],title:'한 걸음 더',mood:'차분하게 시작해 벅차오르는 희망',genre:'팝 록 앤섬',bpm:112,meter:'4/4',key:'E Major',vocal:'단단한 중음 리드와 마지막 합창',modern:['피아노','일렉 기타','베이스 기타','드럼 세트'],arrange:'피아노 리듬에서 시작해 기타와 라이브 드럼을 단계적으로 쌓아 마지막에 합창'},
 generic:{keywords:[],title:'오늘의 이야기',mood:'담백하고 진솔한',genre:'모던 팝',bpm:96,meter:'4/4',key:'G Major',vocal:'가사가 또렷한 자연스러운 중음 보컬',modern:['피아노','어쿠스틱 기타','베이스 기타','드럼 세트'],arrange:'벌스는 보컬 중심으로 단순하게, 후렴에서 리듬과 화음을 넓혀 이야기의 핵심을 강조'}
};

const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
let region='한국',selected=new Set(),ctx=null,timers=[],lastProfile=PROFILES.generic;
const speedBpm={slow:72,medium:98,fast:126};

function renderRegions(){
 $('#regions').innerHTML=Object.keys(DATA).map(r=>`<button class="chip ${r===region?'active':''}" data-region="${r}">${r}</button>`).join('');
 $$('#regions button').forEach(b=>b.onclick=()=>{region=b.dataset.region;renderRegions();renderInstruments()});
}
function renderInstruments(){
 $('#instruments').innerHTML=DATA[region].map(([n,t])=>`<div class="instrument ${selected.has(n)?'active':''}"><b>${n}</b><span>${region} · ${t}</span><button data-name="${n}" class="hear">▶ 소리</button> <button data-pick="${n}">${selected.has(n)?'✓ 선택됨':'+ 선택'}</button></div>`).join('');
 $$('.hear').forEach(b=>b.onclick=e=>{e.stopPropagation();previewTone(findInstrument(b.dataset.name)[2])});
 $$('[data-pick]').forEach(b=>b.onclick=()=>{const n=b.dataset.pick;selected.has(n)?selected.delete(n):selected.add(n);renderInstruments();updateInfo()});
}
function findInstrument(name){for(const list of Object.values(DATA)){const f=list.find(x=>x[0]===name);if(f)return f}return ['피아노','건반악기','piano']}
function detectProfile(story){const s=story.toLowerCase();let best=PROFILES.generic,score=0;for(const p of Object.values(PROFILES)){const n=p.keywords.filter(k=>s.includes(k)).length;if(n>score){best=p;score=n}}return {...best}}
function activeProfile(){
 const p=detectProfile($('#story').value.trim());
 const mood=$('#mood').value,genre=$('#genre').value,vocal=$('#vocal').value,speed=$('#speed').value;
 if(mood!=='auto')p.mood=mood;if(genre!=='auto')p.genre=genre;if(vocal!=='auto')p.vocal=vocal;
 if(speed!=='auto'){p.bpm=speedBpm[speed];if(speed==='slow'&&p.meter==='4/4')p.meter='6/8'}
 return p;
}
function analyze(){
 const story=$('#story').value.trim();if(!story){toast('노래 이야기를 먼저 입력해 주세요');$('#story').focus();return null}
 lastProfile=activeProfile();const traditional=DATA[region].slice(0,2).map(x=>x[0]);
 $('#analysisResult').textContent=`이야기 해석: ${lastProfile.mood}\n장르: ${lastProfile.genre}\n빠르기·박자: ${lastProfile.bpm} BPM · ${lastProfile.meter}\n조성: ${lastProfile.key}\n보컬: ${lastProfile.vocal}\n추천 조합: ${traditional.concat(lastProfile.modern).join(', ')}\n편곡 방향: ${lastProfile.arrange}`;
 updateInfo();toast('이야기와 음악을 분석했습니다');return lastProfile;
}
function audio(){return ctx||(ctx=new (window.AudioContext||window.webkitAudioContext)())}
function tone(type,freq=440,when=0,dur=.55,vol=.1){
 const c=audio(),t=c.currentTime+when,g=c.createGain(),o=c.createOscillator(),filter=c.createBiquadFilter();
 const waves={pluck:'triangle',bow:'sawtooth',flute:'sine',bell:'sine',drum:'square',piano:'triangle',guitar:'sawtooth',bass:'sine',synth:'sawtooth',pad:'sine',sax:'square',brass:'sawtooth'};
 o.type=waves[type]||'sine';o.frequency.setValueAtTime(type==='drum'?freq/2:freq,t);filter.type='lowpass';filter.frequency.value=type==='bass'?500:type==='pad'?1200:2600;o.connect(filter);filter.connect(g);g.connect(c.destination);
 if(['pluck','drum','piano','guitar','bell'].includes(type)){g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.001,t+dur)}else{g.gain.setValueAtTime(.001,t);g.gain.linearRampToValueAtTime(vol,t+.08);g.gain.exponentialRampToValueAtTime(.001,t+dur)}o.start(t);o.stop(t+dur+.03);
}
function previewTone(type){audio().resume();const seq=type==='drum'?[110,90,130,90]:type==='bass'?[130.8,146.8,164.8,196]:[261.6,329.6,392,523.2];seq.forEach((f,i)=>tone(type,f,i*.18,.5,.09))}
function stop(){timers.forEach(clearTimeout);timers=[];if(ctx){ctx.close();ctx=null}$('#pulse').classList.remove('playing')}
function playMix(){
 stop();const p=activeProfile();audio().resume();const beat=60/p.bpm,chosen=[...selected];if(!chosen.length){autoPick();return playMix()}
 const scale=p.key.includes('Minor')?[220,246.9,261.6,329.6,370,440]:[261.6,293.7,329.6,392,440,523.2];let count=0;$('#pulse').classList.add('playing');
 const loop=()=>{chosen.slice(0,5).forEach((n,j)=>{const type=findInstrument(n)[2],note=scale[(count+j*2)%scale.length];tone(type,type==='drum'?100:note,j*.02,beat*.85,.045)});count++;if(count<32)timers.push(setTimeout(loop,beat*1000));else $('#pulse').classList.remove('playing')};loop();
}
function autoPick(){
 const p=activeProfile();selected.clear();DATA[region].slice(0,2).forEach(x=>selected.add(x[0]));p.modern.forEach(n=>selected.add(n));lastProfile=p;renderInstruments();updateInfo();toast(`${region} 전통악기와 현대악기를 조합했습니다`)
}
function updateInfo(){const p=activeProfile();$('#musicInfo').textContent=`${p.bpm} BPM · ${p.meter}박자 · ${p.key} · ${[...selected].join(' + ')||'악기를 선택해 주세요'}`}

const LYRICS={
 vacation:{v1:['달력 끝에 접어 둔 짧은 여행','느리게 흐르던 하루가 참 좋았지','사진 속 웃음은 가방에 챙겨 두고','익숙한 거리로 다시 돌아갈 시간'],pre:['아쉬운 마음도 오늘까지만','새 아침이 문 앞에서 날 기다려'],chorus:['짧았던 휴가는 추억으로 남기고','내일이면 다시 길을 나서야 해','쉬어 간 만큼 더 가벼운 발걸음','새로운 하루를 힘차게 시작해'],v2:['잠시 멈춰 보니 알 것만 같아','평범한 하루도 소중했다는 걸','바쁜 시간 속 지칠 때가 오면','오늘의 바람을 다시 꺼내 볼게'],bridge:['끝은 또 다른 시작이 되니까','아쉬움 대신 설렘을 안고 가']},
 love:{v1:['처음 네 눈빛이 내게 머문 순간','익숙한 하루가 조금 달라졌어','말하지 않아도 번지는 미소','나도 모르게 너를 따라 웃었어'],pre:['한 걸음만 더 가까이','우리의 시간이 시작돼'],chorus:['자꾸자꾸 너만 보여','자꾸자꾸 네 생각 나','같은 리듬 같은 마음','오늘부터 우리 함께해'],v2:['서툰 인사도 특별해지는 밤','짧은 메시지도 오래 남아 있어','서로의 하루를 천천히 나누며','두 사람의 계절을 만들어 가'],bridge:['멀리 돌아온 날에도','내가 먼저 네 손을 잡을게']},
 breakup:{v1:['불을 끈 방 안에 남은 네 이름','지우려 할수록 더 선명해져','함께 걷던 길은 그대로인데','나 혼자 계절을 건너고 있어'],pre:['괜찮다는 짧은 한마디','오늘은 왜 이렇게 어려운지'],chorus:['우리의 시간이 여기 멈춰도','사랑했던 날까지 지우진 않을게','아픈 기억마저 품고 나면','언젠가 나도 웃을 수 있겠지'],v2:['익숙한 번호를 누르다 멈추고','보내지 못한 말을 접어 두었어','서로의 내일을 위해 놓아주는 일','그것도 사랑이라 믿어 보려고'],bridge:['마지막 눈물이 마르면','나의 계절을 다시 걸어갈게']},
 healing:{v1:['도시의 소리를 잠시 내려놓고','바람이 부르는 길을 따라가','맑은 물소리가 마음을 두드리면','숨겨 둔 피로가 천천히 풀려'],pre:['말하지 않아도 괜찮아','자연은 조용히 안아 주니까'],chorus:['바람아 내 마음을 씻어 줘','햇살아 지친 어깨를 감싸 줘','서두르지 않아도 괜찮다고','오늘의 하늘이 내게 말해 줘'],v2:['깊은 숲 사이로 번지는 빛처럼','작은 희망이 다시 피어나고','돌아갈 일상이 기다리고 있어도','지금 이 평온을 오래 간직할게'],bridge:['천천히 숨을 들이쉬면','나는 다시 나에게 돌아와']},
 celebration:{v1:['기다려 온 오늘이 드디어 왔어','환한 웃음으로 문을 열어 봐','네가 걸어온 수많은 날들이','이 순간을 더욱 빛나게 해'],pre:['두 눈을 감고 소원을 빌어','행복이 네 곁으로 오고 있어'],chorus:['오늘은 오늘은 너의 날','세상에서 가장 환하게 웃어','한 걸음 두 걸음 손을 맞잡고','우리 함께 끝까지 축하할게'],v2:['힘들었던 날도 잘 견뎌 냈어','그 모든 시간이 널 만들었어','앞으로 펼쳐질 새로운 장면마다','좋은 일들이 가득하기를'],bridge:['언제든 네 편이 되어','가장 큰 목소리로 응원할게']},
 dance:{v1:['네온이 번지는 한밤의 거리','심장이 먼저 비트를 알아봐','복잡한 생각은 문밖에 두고','오늘의 리듬에 몸을 맡겨 봐'],pre:['하나 둘 숨을 고르고','다시 불이 켜지는 순간'],chorus:['더 높이 더 높이 손을 들어','오늘 밤 우리는 멈추지 않아','한 바퀴 돌아서 웃어 봐','이 리듬 끝까지 함께 달려가'],v2:['거울 속 모습도 자유로워져','누가 뭐래도 지금은 나의 시간','발끝의 열기가 무대를 깨우고','점점 더 크게 세상이 흔들려'],bridge:['비트가 잠시 멈춘 그때','우리의 함성이 다시 터져']},
 hope:{v1:['막막한 길 앞에 멈춰 선 날도','작은 빛 하나는 사라지지 않아','늦었다는 말에 고개 숙이지 마','너의 시간은 바로 지금이니까'],pre:['천천히 가도 괜찮아','멈추지만 않으면 돼'],chorus:['한 걸음 더 앞으로 가자','넘어져도 다시 일어나','오늘의 용기가 길이 되어','내일의 우리를 만나게 할 거야'],v2:['수많은 걱정이 발을 붙잡아도','가슴속 꿈까지 놓지는 말아 줘','함께 걷는 사람이 곁에 있다면','어두운 터널도 끝이 보일 테니'],bridge:['가장 긴 밤을 지나면','새로운 태양이 떠오를 거야']},
 generic:{v1:['오늘의 마음을 조용히 펼쳐','숨겨 둔 이야기를 노래에 담아','서툰 말 사이 진심을 모아서','나만의 멜로디로 천천히 걸어가'],pre:['누군가 이 노래를 듣는다면','내 마음을 조금은 알아주기를'],chorus:['오늘의 이야기를 노래해','꾸미지 않은 나의 목소리로','짧은 한 줄도 진심이 된다면','이 노래는 이미 충분하니까'],v2:['지나간 시간과 다가올 날들이','하나의 리듬으로 이어져 가고','평범했던 순간 하나하나가','세상에 하나뿐인 노래가 돼'],bridge:['마지막 음이 멈춘 뒤에도','따뜻한 마음은 남아 있기를']}
};
function profileKey(p){return Object.keys(PROFILES).find(k=>PROFILES[k].title===p.title)||'generic'}
function makeLyrics(){
 const story=$('#story').value.trim();if(!story){toast('노래 이야기를 먼저 입력해 주세요');$('#story').focus();return}
 const p=analyze();if(!p)return;autoPick();const l=LYRICS[profileKey(p)]||LYRICS.generic,mins=Number($('#length').value),inst=[...selected],intro=inst.slice(0,2).join('와 '),outro=inst.slice(-2).join('와 ');
 const lines=[`[Intro]\n(${intro}가 곡의 분위기를 여는 연주)`,`[Verse 1]\n${l.v1.join('\n')}`,`[Pre-Chorus]\n${l.pre.join('\n')}`,`[Chorus]\n${l.chorus.join('\n')}`,`[Verse 2]\n${l.v2.join('\n')}`];
 if(mins>2)lines.push(`[Bridge]\n${l.bridge.join('\n')}`);lines.push(`[Final Chorus]\n${l.chorus.join('\n')}`);if(mins>=4)lines.push(`[Final Chorus Repeat]\n${l.chorus.slice(0,2).join('\n')}\n마지막까지 우리 함께 노래해`);lines.push(`[Outro]\n(${outro}의 짧고 선명한 여운)`);
 $('#title').value=p.title;$('#lyrics').value=lines.join('\n\n');const blend=$('#blend').value,lang=$('#language').value;
 $('#style').value=`${p.genre}, ${p.bpm} BPM, ${p.meter} time, ${p.key}, 약 ${mins}분, ${p.mood}. ${p.vocal}, ${lang}. 악기: ${inst.join(', ')}. 전통악기 비율 ${blend}%. 편곡: ${p.arrange}. 벌스는 가사가 또렷하게 들리도록 악기를 절제하고, 후렴에서만 저역과 화음을 확장. 과도한 리버브·컴프레션·베이스 금지, 보컬을 전면에 배치.`;
 toast('이야기에 맞춘 가사와 음악 설계를 만들었습니다')
}
function toast(s){const t=$('#toast');t.textContent=s;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1900)}
function save(){if(!$('#lyrics').value){toast('먼저 노래 설계를 만들어 주세요');return}const songs=JSON.parse(localStorage.getItem('maruSongs')||'[]');songs.unshift({title:$('#title').value||'제목 없음',lyrics:$('#lyrics').value,style:$('#style').value,date:new Date().toLocaleDateString('ko-KR')});localStorage.setItem('maruSongs',JSON.stringify(songs.slice(0,30)));renderSaved();toast('브라우저에 임시 저장했습니다')}
function downloadTxt(){if(!$('#lyrics').value){toast('먼저 노래 설계를 만들어 주세요');return}const title=$('#title').value||'MARU-SONG',safe=title.replace(/[\\/:*?"<>|]/g,'_'),content=`제목: ${title}\n\n${$('#lyrics').value}\n\n[음악 스타일]\n${$('#style').value}\n`;const blob=new Blob(['\ufeff'+content],{type:'text/plain;charset=utf-8'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`${safe}.txt`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);toast('다운로드 폴더에 TXT 파일을 저장했습니다')}
function renderSaved(){const songs=JSON.parse(localStorage.getItem('maruSongs')||'[]');$('#savedSongs').innerHTML=songs.length?songs.map((s,i)=>`<article><b>${s.title}</b><p>${s.date}</p><button class="secondary" data-load="${i}">열기</button> <button class="danger" data-del="${i}">삭제</button></article>`).join(''):'<p>아직 임시 저장한 노래가 없습니다.</p>';$$('[data-load]').forEach(b=>b.onclick=()=>{const s=songs[b.dataset.load];$('#title').value=s.title;$('#lyrics').value=s.lyrics;$('#style').value=s.style;scrollTo({top:document.body.scrollHeight/2,behavior:'smooth'})});$$('[data-del]').forEach(b=>b.onclick=()=>{songs.splice(Number(b.dataset.del),1);localStorage.setItem('maruSongs',JSON.stringify(songs));renderSaved()})}

$('#analyzeStory').onclick=analyze;$('#autoPick').onclick=autoPick;$('#playMix').onclick=playMix;$('#stopMix').onclick=stop;$('#createSong').onclick=makeLyrics;$('#saveSong').onclick=save;$('#downloadTxt').onclick=downloadTxt;$('#blend').oninput=e=>$('#blendValue').textContent=e.target.value+'%';
['speed','genre','mood','vocal'].forEach(id=>$('#'+id).onchange=updateInfo);$$('[data-copy]').forEach(b=>b.onclick=async()=>{const el=$('#'+b.dataset.copy);await navigator.clipboard.writeText(el.value);toast('복사했습니다')});
renderRegions();renderInstruments();autoPick();renderSaved();if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js');
