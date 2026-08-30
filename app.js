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
 breakup:{keywords:['이별','헤어','떠나','끝난','잊지 못','눈물','아픈','후회','미안','사과','뿌리친','10년','십 년'],title:'남겨진 계절',mood:'절제된 슬픔과 긴 여운',genre:'컨템포러리 발라드',bpm:72,meter:'6/8',key:'B Minor',vocal:'낮은 중음에서 시작해 마지막 후렴만 절정',modern:['그랜드 피아노','첼로 섹션','전자 패드','베이스 기타'],arrange:'피아노 단음과 첼로로 여백을 두고 6/8의 흔들림 위에 감정을 천천히 상승'},
 healing:{keywords:['자연','산','바다','비','새벽','치유','편안','쉼','하늘','바람'],title:'마음을 씻는 바람',mood:'맑고 편안한 치유',genre:'어쿠스틱 뉴에이지 팝',bpm:76,meter:'6/8',key:'G Major',vocal:'숨결이 자연스러운 맑은 보컬',modern:['피아노','어쿠스틱 기타','전자 패드','첼로 섹션'],arrange:'자연의 여백을 살린 피아노와 패드, 후렴에서만 부드러운 현악기를 추가'},
 celebration:{keywords:['생일','축하','기념','응원','성공','고마워','감사'],title:'오늘은 너의 날',mood:'밝고 따뜻한 축하',genre:'업리프팅 팝',bpm:118,meter:'4/4',key:'C Major',vocal:'밝은 리드 보컬과 모두 따라 부르는 합창',modern:['피아노','일렉 기타','베이스 기타','드럼 세트'],arrange:'손뼉 리듬과 피아노로 시작해 후렴에서 기타와 단체 하모니를 크게 전개'},
 dance:{keywords:['춤','댄스','클럽','밤중','리듬','신나','파티','네온'],title:'오늘 밤 더 높이',mood:'강렬하고 자유로운',genre:'2026 댄스 팝',bpm:126,meter:'4/4',key:'F# Minor',vocal:'선명한 여성 리드와 짧은 남성 랩',modern:['EDM 신스','808 베이스','드럼 세트','신시사이저'],arrange:'짧은 신스 훅으로 시작해 프리코러스에서 비트를 덜고 드롭형 후렴으로 폭발'},
 hope:{keywords:['희망','꿈','도전','시작','힘내','다시','미래','용기'],title:'한 걸음 더',mood:'차분하게 시작해 벅차오르는 희망',genre:'팝 록 앤섬',bpm:112,meter:'4/4',key:'E Major',vocal:'단단한 중음 리드와 마지막 합창',modern:['피아노','일렉 기타','베이스 기타','드럼 세트'],arrange:'피아노 리듬에서 시작해 기타와 라이브 드럼을 단계적으로 쌓아 마지막에 합창'},
 generic:{keywords:[],title:'오늘의 이야기',mood:'담백하고 진솔한',genre:'모던 팝',bpm:96,meter:'4/4',key:'G Major',vocal:'가사가 또렷한 자연스러운 중음 보컬',modern:['피아노','어쿠스틱 기타','베이스 기타','드럼 세트'],arrange:'벌스는 보컬 중심으로 단순하게, 후렴에서 리듬과 화음을 넓혀 이야기의 핵심을 강조'}
};

const TITLE_BANKS={
 vacation:['다시 걷는 내일','돌아가는 길에도','휴가 끝의 햇살','다시 시작할 시간','가벼워진 발걸음','내일을 향한 여행','쉬어 간 마음','일상으로 돌아가는 길'],
 love:['너를 닮은 하루','눈빛이 머문 자리','자꾸 네가 보여','우리 둘의 리듬','조금 더 가까이','너에게 가는 마음','같은 마음 같은 길','오늘부터 우리'],
 breakup:['남겨진 계절','늦은 미안함','끝내 하지 못한 말','그날 이후의 우리','기억이 머문 자리','보내지 못한 마음','혼자 걷는 계절','마지막 안녕 뒤에'],
 healing:['숲이 건네는 하루','잠시 머문 햇살','바람이 쉬어가는 곳','천천히 돌아오는 나','푸른 숨','오늘의 평온','마음을 쉬게 하는 길','고요가 머무는 시간'],
 celebration:['오늘은 너의 날','가장 빛나는 오늘','웃음이 피는 날','너를 위한 노래','오늘 더 환하게','함께 축하하는 순간','행복이 오는 길','우리의 축하'],
 dance:['오늘 밤 더 높이','네온 속의 우리','멈추지 않는 밤','리듬 위로','한밤의 불빛','더 크게 뛰어','춤추는 도시','비트가 부르는 밤'],
 hope:['한 걸음 더','다시 시작하는 빛','내일을 여는 용기','조금 느려도 괜찮아','끝까지 가는 길','다시 일어나는 우리','새로운 태양','꿈을 향한 한 걸음'],
 generic:['오늘의 이야기','우리의 한 장면','마음에 남은 말','한 줄의 진심','오늘을 노래해','작은 이야기가 노래가 될 때','우리만의 노래','지금 이 순간']
};
const EN_TITLE_BANKS={
 vacation:['Back to Tomorrow','A Lighter Step','The Road Home Again','Sunlight I Take Home','One More Open Road','Back to Ordinary Days'],
 love:['Only You Again','Where Your Eyes Stayed','Our Same Rhythm','Closer to You','From Today, Us','You in Every Day'],
 breakup:['The Season You Left','Words I Never Sent','After Our Goodbye','A Late Apology','Where Memory Stays','One Last Goodbye'],
 healing:['Where the Wind Rests','A Quiet Sky','Back to Myself','The Day the Forest Spoke','A Little Peace','Slowly Breathing'],
 celebration:['This Day Is Yours','Shine a Little Brighter','All for You Today','A Day to Celebrate','Your Brightest Day','We Sing for You'],
 dance:['Higher Tonight','Neon Hearts','Never Stop the Night','Move With the Light','This Beat Is Ours','Dancing Through the City'],
 hope:['One Step More','A New Light','Rise Again','Tomorrow Opens Here','Keep Going','A Brighter Road'],
 generic:['Today’s Story','One Honest Line','Our Little Song','This Moment','A Story in My Heart','Sing It Today']
};
const RECENT_TITLE_KEY='maru_recent_titles_v1';
const LEARNING_MEMORY_KEY='maru_pro_reference_learning_v2';
const LEARNING_ENABLED_KEY='maru_pro_reference_enabled_v2';
const LEARNING_BROADCAST_AUTO_KEY='maru_pro_target_broadcast_auto_v2';
const LEARNING_MIC_AUTO_KEY='maru_pro_target_mic_auto_v2';
const LEARNING_TARGET_HISTORY_KEY='maru_pro_target_history_v1';
const PRO_LYRIC_MEMORY_KEY='maru_pro_lyric_structure_v1';
const LEARNING_MAX_ITEMS=240,LEARNING_TARGET_MAX=160,PRO_LYRIC_MAX=200;
const PRO_PREVIEW_DB_NAME='maru-pro-reference-preview-v1',PRO_PREVIEW_DB_STORE='previews',PRO_PREVIEW_STORE_KEY='maru_pro_preview_store_v1';
let proPreviewDbPromise=null,proPreviewBytes=0,proReferencePlayer=null,proReferencePlayerUrl='',proABContext=null,proABSources=[],proABTimers=[];
const proPreviewKeys=new Set();
let learningBusy=false,learningAutoTimer=0;
const learningAutoQueue=new Map();
// V0.22.71 — dedicated professional-reference microphone capture.
// The full capture lives only in memory until stop; only compact features and optional 15s preview are persisted.
let proMicRecorder=null,proMicStream=null,proMicChunks=[],proMicActive=false,proMicStarted=0,proMicTimer=0;
let proMicAudioCtx=null,proMicSourceNode=null,proMicProcessor=null,proMicSilentGain=null,proMicAnalyser=null,proMicPcmChunks=[],proMicSampleRate=44100,proMicMeterData=null,proMicProcessorFrames=0;
let aiShortenOriginal='',aiShortenResult='',composeShortenOriginal='',composeShortenResult='';


const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
let region='한국',selected=new Set(),chosenWords=new Set(),manualInstrumentSelection=false,ctx=null,timers=[],lastProfile=PROFILES.generic,scoreNotes=[],scoreEntries=[],songBarTexts=[],songPlan=[],lyricCandidates=[],selectedCandidateIndex=-1,lyricInputTimer=0,barOverrides={},selectedNoteIndex=-1,selectedBarIndex=0,selectionStartBar=0,selectionEndBar=-1,selectionCustom=false,melodyFirstMode=false,editingSongIndex=-1,titleCandidateRound=0,titleCandidates=[],titleLockedByUser=false,instrumentCandidateRound=0,instrumentCandidates=[];
let mediaRecorder=null,micStream=null,micAudio=null,micAnalyser=null,micFrame=0,vocalStarted=0,vocalChunks=[],pitchSamples=[],vocalBlob=null,vocalUrl='',correctedBlob=null,correctedUrl='';
let importedSongAnalysis=null,importedSongUrl='',importedSongBuffer=null,sourceReferenceTimer=0,sourceReferenceNode=null,sourcePlaybackBoost=1;
let songMicRecorder=null,songMicStream=null,songMicChunks=[],songMicBlob=null,songMicStarted=0,songMicTimer=0,songMicName='마이크 녹음 노래.wav';
let songMicAudioCtx=null,songMicSourceNode=null,songMicProcessor=null,songMicSilentGain=null,songMicAnalyser=null,songMicPcmChunks=[],songMicSampleRate=44100,songMicActive=false,songMicLastLevel=0,songMicPeakLevel=0,songMicProcessorFrames=0,songMicMeterData=null;
let soundfont=null,soundfontPromise=null,sampleBus=null,sampleLimiter=null,sampleMixerGain=null,sampleEqNodes=[];
let sourceLiveEqNodes=[],sourceLiveMixerGain=null,sourceLiveBaseGain=1,sourceLiveLimiter=null;
const MIXER_EQ_FREQS=[60,100,160,250,400,630,1000,1600,2500,4000,6300,12000];
const mixerEqState={backing:{volume:100,bands:Array(12).fill(0)},source:{volume:100,bands:Array(12).fill(0)}};
let mixerEqTarget='backing';
// V0.20.4 — fully automatic 64-band spectral mix engine. The 64 analysis bands are
// smoothed into 18 real-time filters per bus so mobile playback stays stable.
const AUTO64_FREQS=Array.from({length:64},(_,i)=>31.25*Math.pow(16000/31.25,i/63));
const AUTO64_APPLY_FREQS=[40,55,75,105,145,200,280,390,550,780,1100,1550,2200,3100,4400,6200,8800,12500];
const auto64State={ready:false,backingBands:Array(64).fill(0),sourceBands:Array(64).fill(0),backingVolume:.76,sourceVolume:1.0,summary:'노래를 분석하면 자동으로 맞춥니다.'};
let auto64BackingNodes=[],auto64SourceNodes=[],auto64BackingGain=null,auto64SourceGain=null,sourceAutoAnalyser=null,auto64DuckFrame=0,auto64ReferenceMixActive=false;
let arrangementScheduleOffset=0,analyzedArrangementPlayback=false,adaptiveBarTimingCache={key:'',times:null,confidence:0};
// V0.21.2 — mobile-safe multi-song broadcast mastering queue.
let batchMasterFiles=[],batchMasterRunning=false,batchMasterStopRequested=false,batchWakeLock=null,batchPackIndex=1,batchPackEntries=[],batchPackBytes=0,batchCompleted=0,batchFailed=0;
const BATCH_MAX_FILES=100,BATCH_PACK_MAX_BYTES=320*1024*1024;
const SAMPLE_PROGRAMS={'가야금':[0,107,'고토 계열 현악 샘플 근사'],'대금':[0,73,'플루트 샘플 근사'],'해금':[0,110,'피들 샘플 근사'],'장구':[128,1,'표준 타악기 조합 근사'],'고쟁':[0,107,'고토 계열 지터 샘플 근사'],'얼후':[0,40,'바이올린 샘플 근사'],'비파':[16,25,'만돌린 계열 샘플 근사'],'디즈':[0,72,'피콜로 샘플 근사'],'고토':[0,107,'고토 샘플'],'샤미센':[0,106,'샤미센 샘플'],'샤쿠하치':[0,77,'샤쿠하치 샘플'],'타이코':[0,116,'타이코 샘플'],'시타르':[0,104,'시타르 샘플'],'타블라':[128,32,'재즈 타악기 조합 근사'],'반수리':[0,73,'플루트 계열 대나무 관악기 근사'],'탄푸라':[0,104,'시타르 계열 드론 현악기 근사'],'우드':[0,24,'나일론 기타 근사'],'카눈':[0,46,'하프 샘플 근사'],'네이':[0,77,'숨결이 강한 대나무 플루트 계열 근사'],'다르부카':[128,8,'룸 타악기 조합 근사'],'바이올린':[0,40,'바이올린 샘플'],'첼로':[0,42,'첼로 샘플'],'하프':[0,46,'하프 샘플'],'플루트':[0,73,'플루트 샘플'],'코라':[0,46,'하프 계열 플럭 현악기 근사'],'젬베':[128,16,'파워 타악기 조합 근사'],'칼림바':[0,108,'칼림바 샘플'],'발라폰':[0,12,'마림바 샘플 근사'],'차랑고':[8,24,'우쿨렐레 샘플 근사'],'케나':[0,78,'틴 휘슬 계열 샘플 근사'],'팬플루트':[0,75,'팬플루트 샘플'],'봄보':[128,0,'수르도 저음 북 샘플 근사'],'피아노':[0,0,'따뜻한 그랜드 피아노 샘플'],'그랜드 피아노':[0,0,'그랜드 피아노 샘플'],'전자피아노':[0,4,'전자피아노 샘플'],'어쿠스틱 기타':[0,25,'스틸 기타 샘플'],'일렉 기타':[0,27,'일렉 기타 샘플'],'베이스 기타':[0,33,'베이스 샘플'],'드럼 세트':[128,0,'드럼 세트 샘플'],'신시사이저':[0,80,'신스 샘플'],'전자 패드':[0,89,'웜 패드 샘플'],'색소폰':[0,65,'알토 색소폰 샘플'],'트럼펫':[0,56,'트럼펫 샘플'],'808 베이스':[0,38,'신스 베이스 샘플'],'EDM 신스':[0,81,'리드 신스 샘플'],'바이올린 섹션':[0,48,'현악 섹션 샘플'],'비올라':[0,41,'비올라 샘플'],'첼로 섹션':[0,49,'느린 현악 섹션 샘플'],'콘트라베이스':[0,43,'콘트라베이스 샘플'],'프렌치 호른':[1,60,'솔로 프렌치 호른 샘플'],'팀파니':[0,47,'팀파니 실제 샘플'],'합창 패드':[0,52,'합창 샘플']};
const SAMPLE_DRUM_KEYS={'장구':[45,47,43,50],'타블라':[64,62,63,61],'다르부카':[60,61,60,64],'젬베':[63,64,62,64],'봄보':[87,86,87,86],'드럼 세트':[36,42,38,42]};
const drumHitIndex={};
const SAMPLE_OUTPUT_GAINS={'가야금':1.477,'대금':.965,'해금':.582,'장구':5.439,'고쟁':1.477,'얼후':.582,'비파':.180,'디즈':1.000,'고토':1.477,'샤미센':.561,'샤쿠하치':1.625,'타이코':1.003,'시타르':1.865,'타블라':2.380,'반수리':1.036,'탄푸라':1.774,'우드':1.515,'카눈':2.119,'네이':1.625,'다르부카':2.397,'바이올린':.526,'첼로':.531,'하프':2.119,'플루트':.572,'코라':2.119,'젬베':.727,'칼림바':.763,'발라폰':1.593,'차랑고':.479,'케나':.884,'팬플루트':.760,'봄보':3.654,'피아노':.94,'그랜드 피아노':.967,'전자피아노':2.438,'어쿠스틱 기타':2.725,'일렉 기타':1.545,'베이스 기타':1.282,'드럼 세트':.405,'신시사이저':5.810,'전자 패드':1.254,'색소폰':1.829,'트럼펫':.760,'808 베이스':2.494,'EDM 신스':14.823,'바이올린 섹션':2.568,'비올라':3.093,'첼로 섹션':2.483,'콘트라베이스':1.035,'프렌치 호른':.569,'팀파니':2.049,'합창 패드':2.005};
// V0.18.3: bowed-string push/pull expression, natural vibrato, and bow-change dynamics.
const LISTENING_CORRECTION={"대금":1.45,"해금":1.90,"장구":.72,"고쟁":.78,"얼후":1.90,"비파":1.45,"디즈":1.35,"샤미센":1.68,"타이코":1.35,"타블라":1.45,"반수리":1.75,"다르부카":1.4,"바이올린":1.82,"첼로":1.82,"하프":1.4,"플루트":1.82,"코라":1.42,"젬베":1.45,"칼림바":1.35,"발라폰":1.35,"차랑고":1.45,"케나":1.4,"팬플루트":1.75,"봄보":1.35,"전자피아노":1.62,"일렉 기타":1.35,"드럼 세트":1.62,"전자 패드":1.4,"색소폰":1.42,"트럼펫":1.4,"808 베이스":1.3,"비올라":1.5,"첼로 섹션":1.5,"프렌치 호른":1.68};

const SAMPLE_QUALITY={
 '가야금':'close','대금':'close','해금':'close','장구':'replace','고쟁':'replace','얼후':'close','비파':'close','디즈':'close',
 '고토':'exact','샤미센':'exact','샤쿠하치':'exact','타이코':'exact','시타르':'exact','타블라':'replace','반수리':'close','탄푸라':'replace',
 '우드':'close','카눈':'close','네이':'close','다르부카':'replace','바이올린':'exact','첼로':'exact','하프':'exact','플루트':'exact',
 '코라':'close','젬베':'replace','칼림바':'exact','발라폰':'close','차랑고':'close','케나':'close','팬플루트':'exact','봄보':'close',
 '피아노':'exact','전자피아노':'exact','어쿠스틱 기타':'exact','일렉 기타':'exact','베이스 기타':'exact','드럼 세트':'exact','신시사이저':'exact','전자 패드':'exact','색소폰':'exact','트럼펫':'exact','808 베이스':'close','EDM 신스':'exact',
 '그랜드 피아노':'exact','바이올린 섹션':'close','비올라':'exact','첼로 섹션':'close','콘트라베이스':'exact','프렌치 호른':'exact','팀파니':'exact','합창 패드':'close'
};
const SAMPLE_SOURCE_NAMES={'가야금':'Koto','대금':'Flute','해금':'Fiddle','장구':'Standard 2 drum kit','고쟁':'Koto','얼후':'Violin','비파':'Mandolin','디즈':'Piccolo','고토':'Koto','샤미센':'Shamisen','샤쿠하치':'Shakuhachi','타이코':'Taiko Drum','시타르':'Sitar','타블라':'Jazz drum kit','반수리':'Flute','탄푸라':'Sitar','우드':'Nylon Guitar','카눈':'Orchestral Harp','네이':'Shakuhachi','다르부카':'Room drum kit','바이올린':'Violin','첼로':'Cello','하프':'Orchestral Harp','플루트':'Flute','코라':'Orchestral Harp','젬베':'Power drum kit','칼림바':'Kalimba','발라폰':'Marimba','차랑고':'Ukulele','케나':'Irish Tin Whistle','팬플루트':'Pan Flute','봄보':'Surdo (Standard drum kit)','피아노':'Stereo Grand','그랜드 피아노':'Stereo Grand','전자피아노':'Tine Electric Piano','어쿠스틱 기타':'Steel Guitar','일렉 기타':'Clean Guitar','베이스 기타':'Finger Bass','드럼 세트':'Standard drum kit','신시사이저':'Square Lead','전자 패드':'Warm Pad','색소폰':'Alto Sax','트럼펫':'Trumpet','808 베이스':'Synth Bass 1','EDM 신스':'Saw Lead','바이올린 섹션':'Stereo Strings Fast','비올라':'Viola','첼로 섹션':'Stereo Strings Slow','콘트라베이스':'Double Bass','프렌치 호른':'Solo French Horn','팀파니':'Timpani','합창 패드':'Concert Choir'};
function sampleVelocity(name,vol){
 const type=findInstrument(name)?.[2]||'';let v=.28+Math.max(0,vol)*4.4;
 if(type==='drum')v+=.07;else if(['pluck','guitar','bell'].includes(type))v+=.025;else if(type==='bow')v-=.035;else if(type==='pad')v-=.055;
 return Math.min(.92,Math.max(.34,v))
}
function sampleOutputGain(name){return(SAMPLE_OUTPUT_GAINS[name]||1)*(LISTENING_CORRECTION[name]||1)}
function sampleLabel(name){return SAMPLE_PROGRAMS[name]?.[2]||'표현 합성 음색'}
function sampleSourceName(name){return SAMPLE_SOURCE_NAMES[name]||'알 수 없음'}
function sampleQuality(name){return SAMPLE_QUALITY[name]||'close'}
function sampleQualityText(name){return({exact:'직접 대응',close:'대체 음원',replace:'전용 음원 필요'})[sampleQuality(name)]}

// V0.18.1: gentler approximation voicing; exact GeneralUser presets remain unprocessed for a more original tone.
const CHARACTER_EQ={
 '가야금':{hp:90,mid:[1800,1.0,1.8],high:[4200,1.0]},'고쟁':{hp:90,mid:[2400,1.0,1.3],high:[5200,1.0]},'비파':{hp:100,mid:[2200,1.1,1.8],high:[4800,1.2]},'우드':{hp:70,low:[180,1.5],lp:5600},'카눈':{hp:100,mid:[2600,.9,1.4],high:[5000,1.0]},'코라':{hp:95,mid:[3000,.8,1.0],high:[6000,.7]},'차랑고':{hp:150,mid:[3200,1.0,1.8],high:[6500,1.4]},
 '대금':{hp:100,mid:[1300,.8,1.4],lp:6900},'디즈':{hp:160,mid:[3000,1.0,1.8],high:[5500,1.2]},'반수리':{hp:105,mid:[900,.8,.7],lp:6100},'네이':{hp:120,mid:[1600,.9,1.8],lp:6100},'케나':{hp:130,mid:[1900,.9,1.5],lp:6200},'팬플루트':{hp:110,mid:[900,.8,1.0],lp:5900},
 '해금':{hp:105,mid:[1700,1.2,1.6],lp:7600},'얼후':{hp:100,mid:[1400,1.25,1.8],lp:7200},'바이올린 섹션':{hp:80,mid:[2300,.8,1.0],lp:9000},'첼로 섹션':{hp:55,low:[180,1.2],lp:6500},
 '장구':{hp:65,mid:[900,1.0,1.5],lp:8000},'타블라':{hp:70,mid:[900,1.1,2.0],lp:7200},'다르부카':{hp:90,mid:[1800,1.1,2.0],lp:9000},'젬베':{hp:60,mid:[700,1.0,1.8],lp:7200},'봄보':{hp:35,low:[110,2.0],lp:4200},
 '808 베이스':{hp:28,low:[75,2.2],lp:2600},'베이스 기타':{hp:35,low:[120,1.5],mid:[850,.8,.8],lp:5200},'프렌치 호른':{hp:55,low:[250,1.2],mid:[850,.9,1.5],lp:6000},'색소폰':{hp:90,mid:[1100,1.0,1.5],high:[4200,.7]},'합창 패드':{hp:90,mid:[1800,.8,1.0],lp:8000}
};
const CHARACTER_NOISE={
 '대금':{kind:'air',freq:2600,level:.0038},'디즈':{kind:'air',freq:3500,level:.0025},'반수리':{kind:'air',freq:2200,level:.0024},'네이':{kind:'air',freq:2300,level:.0042},'케나':{kind:'air',freq:2500,level:.0035},'팬플루트':{kind:'air',freq:2000,level:.0036},
 '해금':{kind:'bow',freq:1900,level:.0015},'얼후':{kind:'bow',freq:1600,level:.0016},
 '가야금':{kind:'pluck',freq:4200,level:.0026},'고쟁':{kind:'pluck',freq:5000,level:.0015},'비파':{kind:'pluck',freq:4600,level:.0025},'우드':{kind:'pluck',freq:3000,level:.0020},'카눈':{kind:'pluck',freq:4800,level:.0021},'코라':{kind:'pluck',freq:5200,level:.0014},'차랑고':{kind:'pluck',freq:5800,level:.0022}
};
// V0.21.2 — smoother upper harmonics with stronger, less over-attenuated playback.
const SOFT_TONE_EQ={
 '피아노':{mid:[3200,1.0,-1.8],high:[5600,-2.6],lp:12500},
 '그랜드 피아노':{mid:[3400,1.0,-1.2],high:[6400,-1.9],lp:13500},
 '바이올린 섹션':{mid:[2900,1.0,-1.7],high:[5200,-2.7],lp:9000},
 '비올라':{mid:[3000,1.0,-1.2],high:[5600,-2.0],lp:9800},
 '일렉 기타':{mid:[3300,1.0,-.8],high:[6200,-1.5],lp:12500},
 '드럼 세트':{high:[7200,-1.8],lp:14000},
 '신시사이저':{mid:[3200,1.0,-1.0],high:[6000,-2.1],lp:12000},
 'EDM 신스':{mid:[3400,1.0,-1.3],high:[6200,-2.4],lp:11500}
};
function characterDestination(name){
 const out=sampleDestination(),base=sampleQuality(name)==='exact'?null:CHARACTER_EQ[name],soft=SOFT_TONE_EQ[name];if(!base&&!soft)return out;const c=audio(),input=c.createGain();let tail=input;
 const add=n=>{tail.connect(n);tail=n},apply=p=>{if(!p)return;if(p.hp){const n=c.createBiquadFilter();n.type='highpass';n.frequency.value=p.hp;add(n)}if(p.low){const n=c.createBiquadFilter();n.type='lowshelf';n.frequency.value=p.low[0];n.gain.value=p.low[1];add(n)}if(p.mid){const n=c.createBiquadFilter();n.type='peaking';n.frequency.value=p.mid[0];n.Q.value=p.mid[1];n.gain.value=p.mid[2];add(n)}if(p.high){const n=c.createBiquadFilter();n.type='highshelf';n.frequency.value=p.high[0];n.gain.value=p.high[1];add(n)}if(p.lp){const n=c.createBiquadFilter();n.type='lowpass';n.frequency.value=p.lp;n.Q.value=.55;add(n)}};
 apply(base);apply(soft);tail.connect(out);return input
}
function addCharacterNoise(name,when,dur){const p=CHARACTER_NOISE[name];if(!p||sampleQuality(name)==='exact')return;const c=audio(),t=c.currentTime+when,d=p.kind==='pluck'?Math.min(.055,dur):Math.min(dur*.85,.9),len=Math.max(1,Math.floor(c.sampleRate*d)),buf=c.createBuffer(1,len,c.sampleRate),a=buf.getChannelData(0);for(let i=0;i<len;i++)a[i]=Math.random()*2-1;const src=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();src.buffer=buf;f.type='bandpass';f.frequency.value=p.freq;f.Q.value=p.kind==='pluck'?1.3:.8;g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(p.level*.72,t+(p.kind==='pluck'?.003:.045));g.gain.exponentialRampToValueAtTime(.0001,t+d);src.connect(f).connect(g).connect(sampleDestination());src.start(t);src.stop(t+d)}

// V0.18.3: bowed-string expression. Only true bowed instruments use this path.
const BOW_EXPRESSION={
 '해금':{vibHz:5.25,vibCents:17,depth:.18},'얼후':{vibHz:5.05,vibCents:19,depth:.19},
 '바이올린':{vibHz:5.65,vibCents:12,depth:.13},'첼로':{vibHz:4.55,vibCents:10,depth:.15},
 '바이올린 섹션':{vibHz:5.05,vibCents:5,depth:.08},'비올라':{vibHz:5.0,vibCents:10,depth:.13},
 '첼로 섹션':{vibHz:4.35,vibCents:5,depth:.09},'콘트라베이스':{vibHz:3.7,vibCents:7,depth:.12}
};
const bowStrokeIndex={};
function bowProfile(name){return BOW_EXPRESSION[name]||null}
function bowExpressionDestination(name,when,dur){
 const target=characterDestination(name),p=bowProfile(name);if(!p||analyzedArrangementPlayback)return target;
 const c=audio(),g=c.createGain(),t=c.currentTime+when,d=Math.max(.14,dur),dir=(bowStrokeIndex[name]||0)%2;bowStrokeIndex[name]=(bowStrokeIndex[name]||0)+1;
 // A short note gets one bow stroke. A sustained note has a gentle bow-change dip at the centre,
 // followed by the return stroke. This adds movement without pumping the master volume.
 if(d<.48){
  g.gain.setValueAtTime(.78,t);g.gain.linearRampToValueAtTime(1.0+(!dir?.025:0),t+d*.28);g.gain.linearRampToValueAtTime(.86,t+d*.94)
 }else{
  const dep=p.depth||.12,first=dir?1.0-dep*.25:1.0+dep*.20,second=dir?1.0+dep*.20:1.0-dep*.20;
  g.gain.setValueAtTime(.70,t);
  g.gain.linearRampToValueAtTime(.94,t+d*.10);
  g.gain.linearRampToValueAtTime(first,t+d*.38);
  g.gain.linearRampToValueAtTime(.84,t+d*.51);
  g.gain.linearRampToValueAtTime(second,t+d*.76);
  g.gain.linearRampToValueAtTime(.76,t+d*.97)
 }
 g.connect(target);return g
}
function bowVibratoOptions(name,dur){
 const p=bowProfile(name);if(!p||dur<.34||analyzedArrangementPlayback)return{};
 const scale=dur<.65?.68:1;
 return{vibratoHz:p.vibHz,vibratoCents:p.vibCents*scale,vibratoDelay:Math.min(.22,Math.max(.07,dur*.16))}
}

async function ensureSoundfont(){if(soundfont)return soundfont;if(!window.Sfumato)throw Error('샘플 엔진 없음');setSampleStatus('30MB 실제 악기 샘플을 불러오는 중…','loading');if(!soundfontPromise)soundfontPromise=Sfumato.loadSoundfont('samples/GeneralUser.sf2').then(x=>{soundfont=x;setSampleStatus('실제 악기 샘플 준비 완료','ready');return x}).catch(e=>{soundfontPromise=null;setSampleStatus('샘플 로드 실패 · 합성 음색으로 재생','error');throw e});return soundfontPromise}
function samplePreset(name){const s=SAMPLE_PROGRAMS[name];return s&&soundfont?.presets?.find(p=>p.header.bank===s[0]&&p.header.preset===s[1])}
function sampleMidi(name,midi){if(SAMPLE_PROGRAMS[name]?.[0]!==128)return midi;const seq=SAMPLE_DRUM_KEYS[name]||[36],i=drumHitIndex[name]||0;drumHitIndex[name]=i+1;return seq[i%seq.length]}
function playInstrument(name,freq=440,when=0,dur=.55,vol=.1,gainMul=1,velocityOverride=null){const w=Math.max(0,(Number(when)||0)+(Number(arrangementScheduleOffset)||0)),preset=samplePreset(name);if(preset){const c=audio(),m=sampleMidi(name,Math.max(24,Math.min(100,Math.round(69+12*Math.log2(freq/440))))),velocity=velocityOverride==null?sampleVelocity(name,vol):Math.max(.01,Math.min(1,velocityOverride)),bow=bowVibratoOptions(name,dur),end=Sfumato.startPresetNote(c,preset,m,c.currentTime+w,{velocity,outputGain:sampleOutputGain(name)*gainMul,destination:bowExpressionDestination(name,w,dur),...bow});addCharacterNoise(name,w,dur);if(typeof end==='function')end(c.currentTime+w+Math.max(.08,dur));return}instrumentTone(name,freq,w,dur,Math.min(.2,vol*1.7*gainMul))}
const speedBpm={slow:72,medium:98,fast:126};
const WORDS=['첫 만남','눈빛','미소','기다림','설렘','약속','그리움','사랑','이별','재회','함께','우정','가족','응원','용기','희망','꿈','새로운 시작','내일','여행','바다','숲','바람','비','별빛','달빛','새벽','도시','고향','추억','감사','축하'];
const WORD_LINES={'첫 만남':'처음 마주친 그날의 공기까지','눈빛':'말보다 먼저 다가온 너의 눈빛','미소':'지친 하루를 밝혀 주던 미소','기다림':'긴 기다림도 사랑이 되었고','설렘':'작은 설렘이 심장을 두드려','약속':'우리의 약속을 마음에 새겨','그리움':'그리움은 밤마다 노래가 되고','사랑':'사랑은 두 사람의 길을 비추고','이별':'이별 뒤에도 따뜻한 기억은 남아','재회':'돌고 돌아 다시 마주친 우리','함께':'혼자가 아닌 우리 함께 걸어가','우정':'오랜 우정은 든든한 노래가 되고','가족':'언제나 돌아갈 가족의 품','응원':'언제나 네 편에서 응원할게','용기':'작은 용기가 내일을 열어','희망':'가슴속 희망을 다시 밝혀','꿈':'놓지 않은 꿈이 길이 되어','새로운 시작':'끝이 아닌 새로운 시작 앞에서','내일':'내일은 오늘보다 환하게','여행':'함께한 여행은 길이 되어 남아','바다':'푸른 바다가 마음을 안아 주고','숲':'고요한 숲이 숨을 쉬게 해','바람':'부드러운 바람이 걱정을 씻어','비':'창가의 비가 추억을 두드려','별빛':'별빛 아래 두 마음이 가까워져','달빛':'달빛이 조용히 우리를 비추고','새벽':'새벽 끝에서 새로운 빛을 만나','도시':'도시의 불빛 사이 꿈을 찾아','고향':'그리운 고향의 길을 떠올려','추억':'소중한 추억을 가슴에 품고','감사':'고마운 마음을 노래에 담아','축하':'오늘의 기쁨을 함께 축하해'};
function renderWordChoices(){$('#wordChoices').innerHTML=WORDS.map(w=>`<button class="chip ${chosenWords.has(w)?'active':''}" data-word="${w}">${w}</button>`).join('');$$('[data-word]').forEach(b=>b.onclick=()=>{const w=b.dataset.word;chosenWords.has(w)?chosenWords.delete(w):chosenWords.add(w);renderWordChoices()})}

function renderRegions(){
 $('#regions').innerHTML=Object.keys(DATA).map(r=>`<button class="chip ${r===region?'active':''}" data-region="${r}">${r}</button>`).join('');
 $$('#regions button').forEach(b=>b.onclick=()=>{region=b.dataset.region;const label=$('#blendLabel');if(label)label.textContent=region==='오케스트라'?'오케스트라 악기 비율':region==='현대악기'?'선택 악기 비율':'전통악기 비율';renderRegions();renderInstruments();buildInstrumentCandidates(activeProfile(),false)});
}
function renderInstruments(){
 const summary=$('#selectedInstrumentSummary');if(summary)summary.textContent=`현재 실제 선택 악기 (${selected.size}개): ${[...selected].join(' · ')||'없음'}${[...selected].some(n=>!(DATA[region]||[]).some(x=>x[0]===n))?' · 다른 탭 악기도 포함됨':''}`;
 $('#instruments').innerHTML=DATA[region].map(([n,t])=>`<div class="instrument ${selected.has(n)?'active':''}"><b>${n}</b><span>${region} · ${t}<br>${sampleLabel(n)} <small class="sample-quality q-${sampleQuality(n)}">${sampleQualityText(n)}</small><br><small class="sample-source">원본 SF2: ${sampleSourceName(n)}</small><br><small class="solo-title">대표곡: ${famousSoloTitle(n)}</small></span><button data-one="${n}" class="hear-one">🔊 원음 1음</button> <button data-name="${n}" class="hear">🎼 특징 연주</button> <button data-famous="${n}" class="hear-famous">🎵 대표 독주곡</button> <button data-pick="${n}">${selected.has(n)?'✓ 선택됨':'+ 선택'}</button></div>`).join('');
 $$('.hear-one').forEach(b=>b.onclick=e=>{e.stopPropagation();previewInstrumentOne(b.dataset.one)});
 $$('.hear').forEach(b=>b.onclick=e=>{e.stopPropagation();previewInstrument(b.dataset.name)});
 $$('.hear-famous').forEach(b=>b.onclick=e=>{e.stopPropagation();previewFamousSolo(b.dataset.famous)});
 $$('[data-pick]').forEach(b=>b.onclick=()=>{const n=b.dataset.pick;manualInstrumentSelection=true;selected.has(n)?selected.delete(n):selected.add(n);renderInstruments();renderInstrumentCandidates();updateInfo();renderProCompositionCoach()});
}
function findInstrument(name){for(const list of Object.values(DATA)){const f=list.find(x=>x[0]===name);if(f)return f}return ['피아노','건반악기','piano']}
function detectProfile(story){const s=story.toLowerCase();let best=PROFILES.generic,score=0;for(const p of Object.values(PROFILES)){const n=p.keywords.filter(k=>s.includes(k)).length;if(n>score){best=p;score=n}}return {...best}}
function genrePreset(name){if(/발라드/.test(name))return{bpm:82,meter:'4/4',arrange:'피아노와 어쿠스틱 악기로 시작해 후렴에서 현악기와 보컬 화음을 넓게 확장'};if(/EDM|하우스|테크노|트랜스|댄스|디스코|개러지|퓨처 베이스/.test(name))return{bpm:126,meter:'4/4',arrange:'짧은 전자 훅과 선명한 킥으로 시작해 후렴에서 넓은 신스와 리듬을 확장'};if(/힙합|랩|트랩|R&B|소울|펑크|가스펠/.test(name))return{bpm:94,meter:'4/4',arrange:'보컬과 그루브를 전면에 두고 벌스는 절제하며 후렴에서 코러스와 리듬을 강화'};if(/록/.test(name))return{bpm:116,meter:'4/4',arrange:'기타 리프와 라이브 드럼을 단계적으로 쌓고 마지막 후렴에서 밴드 사운드를 확장'};if(/재즈|보사노바|스윙|블루스/.test(name))return{bpm:96,meter:'4/4',arrange:'피아노와 베이스의 여백 있는 화음 위에 자연스러운 스윙과 즉흥 응답을 배치'};if(/트로트/.test(name))return{bpm:112,meter:'4/4',arrange:'또렷한 2박 리듬과 꺾임을 살리고 후렴에서 브라스와 코러스를 강조'};if(/왈츠/.test(name))return{bpm:90,meter:'3/4',arrange:'한 마디 세 박의 흐름을 살려 피아노와 현악기가 우아하게 회전'};if(/뉴에이지|앰비언트|로파이/.test(name))return{bpm:76,meter:'6/8',arrange:'피아노와 패드의 여백을 살리고 잔잔한 악기 응답으로 감정을 유지'};if(/라틴|레게|아프로|플라멩코/.test(name))return{bpm:104,meter:'4/4',arrange:'싱코페이션과 타악기 그루브를 중심으로 후렴에서 합주를 밝게 확장'};if(/영화|오케스트라|뮤지컬|합창/.test(name))return{bpm:84,meter:'4/4',arrange:'작은 피아노 모티프로 시작해 현악기·관악기·합창을 단계적으로 확장'};if(/국악|전통|월드|중국풍|일본풍|인도|중동/.test(name))return{bpm:98,meter:'4/4',arrange:'전통악기 독주와 현대 리듬이 서로 응답하며 후렴에서 세계 악기 합주로 확장'};return{bpm:100,meter:'4/4',arrange:'보컬 중심의 간결한 벌스에서 시작해 후렴에서 리듬과 화음을 선명하게 확장'}}
function storySeed(text=''){let h=2166136261;for(const ch of String(text)){h^=ch.codePointAt(0);h=Math.imul(h,16777619)}return h>>>0}
function stablePick(list,count,seed=1){const a=[...new Set(list)].filter(Boolean);if(!a.length||count<=0)return[];return a.map((name,i)=>({name,score:((storySeed(name)^seed^(i*2654435761))>>>0)})).sort((x,y)=>x.score-y.score).slice(0,count).map(x=>x.name)}
function recommendTraditionalInstruments(p,text='',salt=0){
 const entries=DATA[region]||[],seed=storySeed(`${text}|${p.genre}|${p.mood}|${p.meter}|${region}|${salt}`),slow=p.bpm<88,fast=p.bpm>112,six=p.meter==='6/8',sad=/슬픈|이별|그리|서정|아픈|잔잔|치유|편안/.test(`${p.mood} ${p.genre} ${text}`),energetic=/신나|강렬|댄스|록|축하|응원|웅장/.test(`${p.mood} ${p.genre} ${text}`);
 const scored=entries.map(([name,_,type],i)=>{let score=0;if(six&&(type==='flute'||type==='bow'||type==='pluck'))score+=3;if(sad&&(type==='bow'||type==='flute'))score+=4;if(energetic&&(type==='drum'||type==='pluck'))score+=4;if(fast&&type==='drum')score+=3;if(slow&&type==='drum')score-=2;if(/전통|국악|월드|중국풍|일본풍|인도|중동/.test(p.genre))score+=2;score+=(((seed>>>((i%4)*4))&15)/50);return{name,type,score}}).sort((a,b)=>b.score-a.score);
 const count=entries.length>=4?2:Math.min(2,entries.length),picked=[];for(const x of scored){if(!picked.length||x.type!==picked[0].type||scored.length<=2)picked.push(x.name);if(picked.length>=count)break}return picked.length?picked:stablePick(entries.map(x=>x[0]),count,seed);
}
function recommendModernInstruments(p,text='',salt=0){
 const g=String(p.genre||''),m=String(p.mood||''),seed=storySeed(`${text}|${g}|${m}|${p.bpm}|${p.meter}|${salt}`);let pools=[];
 if(/EDM|하우스|테크노|트랜스|댄스|디스코|퓨처 베이스|개러지/.test(g))pools=[['전자피아노','신시사이저','EDM 신스'],['808 베이스','베이스 기타'],['드럼 세트'],['전자 패드','합창 패드']];
 else if(/재즈|보사노바|스윙|블루스/.test(g))pools=[['전자피아노','그랜드 피아노'],['색소폰','트럼펫'],['베이스 기타','콘트라베이스'],['드럼 세트']];
 else if(/록/.test(g))pools=[['일렉 기타','어쿠스틱 기타'],['베이스 기타'],['드럼 세트'],['피아노','전자피아노','프렌치 호른']];
 else if(/영화|오케스트라|뮤지컬|합창/.test(g))pools=[['그랜드 피아노','하프'],['바이올린 섹션','첼로 섹션','비올라'],['프렌치 호른','합창 패드'],['팀파니','콘트라베이스']];
 else if(/뉴에이지|앰비언트|로파이|치유/.test(`${g} ${m}`))pools=[['그랜드 피아노','전자피아노','하프'],['전자 패드','합창 패드'],['첼로 섹션','비올라','바이올린 섹션'],['어쿠스틱 기타','플루트']];
 else if(/발라드|어쿠스틱|포크|컨트리/.test(g))pools=[['그랜드 피아노','피아노','어쿠스틱 기타'],['어쿠스틱 기타','전자피아노'],['베이스 기타','첼로 섹션'],['바이올린 섹션','전자 패드','플루트']];
 else if(/힙합|랩|트랩|R&B|소울|펑크/.test(g))pools=[['전자피아노','신시사이저'],['808 베이스','베이스 기타'],['드럼 세트'],['색소폰','전자 패드','일렉 기타']];
 else if(/트로트/.test(g))pools=[['전자피아노','피아노'],['베이스 기타'],['드럼 세트'],['트럼펫','색소폰','일렉 기타']];
 else pools=[['피아노','전자피아노','어쿠스틱 기타'],['일렉 기타','어쿠스틱 기타','신시사이저'],['베이스 기타','808 베이스'],['드럼 세트','전자 패드','바이올린 섹션']];
 const out=[];pools.forEach((pool,i)=>{const options=pool.filter(n=>!out.includes(n));if(options.length){const pickIndex=(storySeed(`${seed}|${i}|${salt}`)+salt+i)%options.length;out.push(options[pickIndex])}});
 if(p.meter==='6/8'&&out.includes('드럼 세트')&&!/록|댄스|EDM/.test(g)){out.splice(out.indexOf('드럼 세트'),1);const alt=stablePick(['첼로 섹션','전자 패드','하프','플루트'].filter(n=>!out.includes(n)),1,seed^0x55aa)[0];if(alt)out.push(alt)}
 return [...new Set(out)].slice(0,4);
}


function readLearningMemory(){try{const raw=JSON.parse(localStorage.getItem(LEARNING_MEMORY_KEY)||'null');if(raw&&Array.isArray(raw.items))return{version:2,items:raw.items.filter(x=>x&&x.role!=='target').slice(-LEARNING_MAX_ITEMS)};return{version:2,items:[]}}catch(e){return{version:2,items:[]}}}
function writeLearningMemory(mem){try{const clean={version:2,mode:'professional-reference',updatedAt:new Date().toISOString(),items:(mem?.items||[]).filter(x=>x&&x.role!=='target').slice(-LEARNING_MAX_ITEMS)};localStorage.setItem(LEARNING_MEMORY_KEY,JSON.stringify(clean));return true}catch(e){toast('전문 기준 데이터 저장 공간이 부족합니다. 백업 후 오래된 기준곡을 정리해 주세요.');return false}}
function readLearningTargets(){try{const x=JSON.parse(localStorage.getItem(LEARNING_TARGET_HISTORY_KEY)||'[]');return Array.isArray(x)?x.slice(-LEARNING_TARGET_MAX):[]}catch(e){return[]}}
function writeLearningTargets(rows){try{localStorage.setItem(LEARNING_TARGET_HISTORY_KEY,JSON.stringify((rows||[]).slice(-LEARNING_TARGET_MAX)));return true}catch(e){return false}}
function learningIsEnabled(){const el=$('#learningEnabled');if(el)return !!el.checked;try{return localStorage.getItem(LEARNING_ENABLED_KEY)!=='0'}catch(e){return true}}
function setLearningEnabled(v){try{localStorage.setItem(LEARNING_ENABLED_KEY,v?'1':'0')}catch(e){}renderLearningProfile();renderProCompositionCoach()}
function learningAutoSetting(key){try{return localStorage.getItem(key)!=='0'}catch(e){return true}}
function learningBroadcastAutoEnabled(){return learningAutoSetting(LEARNING_BROADCAST_AUTO_KEY)}
function learningMicAutoEnabled(){return learningAutoSetting(LEARNING_MIC_AUTO_KEY)}
function setLearningAutoSetting(key,v){try{localStorage.setItem(key,v?'1':'0')}catch(e){}renderLearningProfile();if(key===LEARNING_BROADCAST_AUTO_KEY&&v)queueBroadcastAutoLearning(typeof broadcastFiles!=='undefined'?broadcastFiles:[],{delay:80})}
function learningMemoryBytes(){try{return new Blob([localStorage.getItem(LEARNING_MEMORY_KEY)||'',localStorage.getItem(PRO_LYRIC_MEMORY_KEY)||'']).size}catch(e){try{return new TextEncoder().encode((localStorage.getItem(LEARNING_MEMORY_KEY)||'')+(localStorage.getItem(PRO_LYRIC_MEMORY_KEY)||'')).length}catch{return 0}}}
function learningFormatBytes(n){n=Math.max(0,Number(n)||0);if(n<1024)return `${n} B`;if(n<1024*1024)return `${(n/1024).toFixed(n<10240?1:0)} KB`;return `${(n/1024/1024).toFixed(2)} MB`}
function learningPreviewStoreEnabled(){try{const v=localStorage.getItem(PRO_PREVIEW_STORE_KEY);if(v!==null)return v!=='0'}catch(e){}const el=$('#learningPreviewStore');return el?!!el.checked:true}
function setLearningPreviewStore(v){try{localStorage.setItem(PRO_PREVIEW_STORE_KEY,v?'1':'0')}catch(e){}renderLearningProfile()}
function openProPreviewDb(){if(proPreviewDbPromise)return proPreviewDbPromise;if(!('indexedDB'in window))return Promise.reject(new Error('이 브라우저는 기준곡 청음 저장을 지원하지 않습니다'));proPreviewDbPromise=new Promise((resolve,reject)=>{const req=indexedDB.open(PRO_PREVIEW_DB_NAME,1);req.onupgradeneeded=()=>{const db=req.result;if(!db.objectStoreNames.contains(PRO_PREVIEW_DB_STORE))db.createObjectStore(PRO_PREVIEW_DB_STORE,{keyPath:'sourceKey'})};req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error||new Error('기준곡 청음 저장소를 열지 못했습니다'))});return proPreviewDbPromise}
async function proPreviewDbPut(record){const db=await openProPreviewDb();return new Promise((resolve,reject)=>{const tx=db.transaction(PRO_PREVIEW_DB_STORE,'readwrite');tx.objectStore(PRO_PREVIEW_DB_STORE).put(record);tx.oncomplete=()=>resolve(true);tx.onerror=()=>reject(tx.error||new Error('청음 미리보기 저장 실패'));tx.onabort=()=>reject(tx.error||new Error('청음 미리보기 저장 중단'))})}
async function proPreviewDbGet(sourceKey){if(!sourceKey)return null;const db=await openProPreviewDb();return new Promise((resolve,reject)=>{const r=db.transaction(PRO_PREVIEW_DB_STORE,'readonly').objectStore(PRO_PREVIEW_DB_STORE).get(sourceKey);r.onsuccess=()=>resolve(r.result||null);r.onerror=()=>reject(r.error)})}
async function proPreviewDbDelete(sourceKey){if(!sourceKey)return false;const db=await openProPreviewDb();return new Promise((resolve,reject)=>{const tx=db.transaction(PRO_PREVIEW_DB_STORE,'readwrite');tx.objectStore(PRO_PREVIEW_DB_STORE).delete(sourceKey);tx.oncomplete=()=>resolve(true);tx.onerror=()=>reject(tx.error)})}
async function proPreviewDbClear(){const db=await openProPreviewDb();return new Promise((resolve,reject)=>{const tx=db.transaction(PRO_PREVIEW_DB_STORE,'readwrite');tx.objectStore(PRO_PREVIEW_DB_STORE).clear();tx.oncomplete=()=>resolve(true);tx.onerror=()=>reject(tx.error)})}
async function refreshProPreviewIndex(rerender=false){proPreviewKeys.clear();proPreviewBytes=0;try{const db=await openProPreviewDb();await new Promise((resolve,reject)=>{const req=db.transaction(PRO_PREVIEW_DB_STORE,'readonly').objectStore(PRO_PREVIEW_DB_STORE).openCursor();req.onsuccess=()=>{const cur=req.result;if(!cur)return resolve();const v=cur.value||{};if(v.sourceKey)proPreviewKeys.add(v.sourceKey);proPreviewBytes+=Number(v.bytes||v.blob?.size||0);cur.continue()};req.onerror=()=>reject(req.error)});}catch(e){console.warn('reference preview index',e)}if($('#learningPreviewSize'))$('#learningPreviewSize').textContent=learningFormatBytes(proPreviewBytes);if(rerender)renderLearningProfile();return{count:proPreviewKeys.size,bytes:proPreviewBytes}}
function makeProReferencePreviewBlob(buffer){if(!buffer)return null;const outRate=Math.min(32000,buffer.sampleRate),channels=Math.min(2,Math.max(1,buffer.numberOfChannels)),segSec=5,duration=buffer.duration||buffer.length/buffer.sampleRate,segments=duration<=15?[{start:0,dur:duration}]:[.12,.50,.82].map(pos=>({start:Math.min(Math.max(0,duration-segSec),duration*pos),dur:Math.min(segSec,duration)}));const totalFrames=Math.max(1,Math.floor(segments.reduce((s,x)=>s+x.dur,0)*outRate)),array=new ArrayBuffer(44+totalFrames*channels*2),view=new DataView(array);let p=0;const text=s=>{for(const c of s)view.setUint8(p++,c.charCodeAt(0))},u16=n=>{view.setUint16(p,n,true);p+=2},u32=n=>{view.setUint32(p,n,true);p+=4};text('RIFF');u32(array.byteLength-8);text('WAVE');text('fmt ');u32(16);u16(1);u16(channels);u32(outRate);u32(outRate*channels*2);u16(channels*2);u16(16);text('data');u32(array.byteLength-44);const src=Array.from({length:channels},(_,c)=>buffer.getChannelData(Math.min(c,buffer.numberOfChannels-1))),fadeFrames=Math.max(1,Math.floor(outRate*.035));for(const seg of segments){const frames=Math.floor(seg.dur*outRate),srcStart=seg.start*buffer.sampleRate;for(let i=0;i<frames;i++){const sp=srcStart+i*buffer.sampleRate/outRate,i0=Math.max(0,Math.min(buffer.length-1,Math.floor(sp))),i1=Math.min(buffer.length-1,i0+1),frac=sp-i0,fade=Math.min(1,i/fadeFrames,(frames-1-i)/fadeFrames);for(let c=0;c<channels;c++){const d=src[c],sample=((d[i0]||0)*(1-frac)+(d[i1]||0)*frac)*Math.max(0,fade),x=Math.max(-1,Math.min(1,sample));view.setInt16(p,x<0?x*32768:x*32767,true);p+=2}}}return new Blob([array],{type:'audio/wav'})}
async function saveProReferencePreview(item,buffer){if(!item?.sourceKey||!buffer||!learningPreviewStoreEnabled())return false;try{const blob=makeProReferencePreviewBlob(buffer);if(!blob)return false;await proPreviewDbPut({sourceKey:item.sourceKey,name:item.name||'전문 기준곡',blob,bytes:blob.size,duration:Math.min(15,buffer.duration||15),updatedAt:new Date().toISOString()});proPreviewKeys.add(item.sourceKey);await refreshProPreviewIndex(false);return true}catch(e){console.warn('reference preview save',e);toast('전문 기준 특징은 저장했지만 청음 미리보기 저장 공간이 부족합니다.');return false}}
function setProListenStatus(text,active=false){const el=$('#learningListenStatus');if(!el)return;el.textContent=text;el.classList.toggle('learning-listen-active',!!active)}
function stopProReferencePlayback(silent=false){if(proReferencePlayer){try{proReferencePlayer.pause();proReferencePlayer.currentTime=0}catch(e){}proReferencePlayer=null}if(proReferencePlayerUrl){try{URL.revokeObjectURL(proReferencePlayerUrl)}catch(e){}proReferencePlayerUrl=''}for(const t of proABTimers)clearTimeout(t);proABTimers=[];for(const s of proABSources){try{s.stop()}catch(e){}}proABSources=[];if(proABContext){try{proABContext.close()}catch(e){}proABContext=null}if(!silent)setProListenStatus('⏹ 기준곡 청음을 멈췄습니다.',false)}
function findLearningItem(id){return readLearningMemory().items.find(x=>x.id===id)||null}
async function playProReferenceItem(id){const item=findLearningItem(id);if(!item)return toast('전문 기준곡 정보를 찾지 못했습니다');stopProReferencePlayback(true);try{const rec=await proPreviewDbGet(item.sourceKey);if(!rec?.blob)return toast('이 기준곡은 청음 미리보기가 없습니다. 같은 원본 파일을 ‘전문 기준곡 추가’로 한 번 다시 선택해 주세요.');proReferencePlayerUrl=URL.createObjectURL(rec.blob);const player=new Audio(proReferencePlayerUrl);proReferencePlayer=player;player.muted=false;player.volume=1;player.onended=()=>{if(proReferencePlayer===player){stopProReferencePlayback(true);setProListenStatus(`✓ A · ${item.name} 미리보기 청음 완료`,false)}};await player.play();setProListenStatus(`▶ A · 전문 기준곡: ${item.name} · 5초×3구간 미리보기 재생 중`,true)}catch(e){console.warn('reference audition',e);toast('기준곡 미리보기를 재생하지 못했습니다')}}
function proABGain(metrics){const rms=Number(metrics?.rmsDbfs),peak=Number(metrics?.samplePeakDbfs);let db=Number.isFinite(rms)?-18-rms:0;if(Number.isFinite(peak))db=Math.min(db,-1-peak);db=Math.max(-12,Math.min(12,db));return Math.pow(10,db/20)}
async function playProReferenceAB(id){
 const item=findLearningItem(id);
 if(!item)return toast('전문 기준곡 정보를 찾지 못했습니다');
 if(!importedSongBuffer||!importedSongAnalysis)return toast('B 비교를 위해 먼저 노래 자동 분석에서 비교할 곡을 불러와 분석해 주세요');
 stopAllProListening(true);
 try{
  const rec=await proPreviewDbGet(item.sourceKey);
  if(!rec?.blob)return toast('이 기준곡은 청음 미리보기가 없습니다. 같은 원본 파일을 다시 전문 기준곡으로 추가해 주세요.');
  const AC=window.AudioContext||window.webkitAudioContext;
  const c=new AC();
  proABContext=c;
  await c.resume();
  const aBuf=await c.decodeAudioData(await rec.blob.arrayBuffer());
  const bBuf=importedSongBuffer;
  const dur=Math.max(3,Math.min(7.5,aBuf.duration,bBuf.duration));
  const t0=c.currentTime+.08,gap=.55,t1=t0+dur+gap;
  const bStart=Math.max(0,Math.min(Math.max(0,bBuf.duration-dur),bBuf.duration*.45));
  const make=(buf,gainValue,startAt,offset,duration)=>{
   const src=c.createBufferSource(),g=c.createGain(),lim=c.createDynamicsCompressor();
   src.buffer=buf;
   g.gain.value=gainValue;
   lim.threshold.value=-1;
   lim.knee.value=.5;
   lim.ratio.value=12;
   lim.attack.value=.0015;
   lim.release.value=.10;
   src.connect(g).connect(lim).connect(c.destination);
   src.start(startAt,offset,duration);
   proABSources.push(src);
  };
  make(aBuf,proABGain(item.proMetrics),t0,0,dur);
  make(bBuf,proABGain(importedSongAnalysis.proMetrics),t1,bStart,dur);
  setProListenStatus(`A↔B 음량 맞춤 비교 · A ${item.name} ${dur.toFixed(1)}초 → B ${importedSongAnalysis.fileName||'현재 분석곡'} ${dur.toFixed(1)}초`,true);
  proABTimers.push(setTimeout(()=>setProListenStatus(`▶ A · 전문 기준곡 ${item.name} · 음량 맞춤 청음`,true),40));
  proABTimers.push(setTimeout(()=>setProListenStatus(`▶ B · 현재 분석곡 ${importedSongAnalysis.fileName||''} · 같은 체감 음량으로 비교`,true),Math.max(0,(t1-c.currentTime)*1000)));
  proABTimers.push(setTimeout(()=>{
   stopProReferencePlayback(true);
   setProListenStatus('✓ A↔B 비교 완료 · 보컬 명료도·저역 몸통·고역 피로도·공간감을 비교하세요.',false);
  },Math.max(0,(t1+dur-c.currentTime)*1000+120)));
 }catch(e){
  console.warn('reference A/B',e);
  stopProReferencePlayback(true);
  toast('A/B 비교를 시작하지 못했습니다');
 }
}
async function playCurrentProTarget(){if(!importedSongBuffer)return toast('먼저 노래 자동 분석에서 비교할 곡을 불러와 주세요');stopProReferencePlayback(true);setProListenStatus(`▶ B · 현재 분석곡 ${importedSongAnalysis?.fileName||''} 재생`,true);await playImportedOriginal()}
function stopAllProListening(silent=false){stopProReferencePlayback(true);const el=$('#sourceAudio');if(el){try{el.pause()}catch(e){}}try{stop()}catch(e){}if(!silent)setProListenStatus('⏹ 기준곡/현재 분석곡 청음을 멈췄습니다.',false)}
function clearProPreviewStorage(){if(!proPreviewKeys.size)return toast('비울 청음 미리보기가 없습니다');if(!confirm(`전문 기준 특징은 그대로 두고 청음 미리보기 ${proPreviewKeys.size}곡만 비울까요?`))return;stopProReferencePlayback(true);proPreviewDbClear().then(()=>refreshProPreviewIndex(true)).then(()=>{setProListenStatus('청음 미리보기를 비웠습니다. 전문 기준 특징 데이터는 그대로 유지됩니다.',false);toast('청음 미리보기만 비웠습니다')}).catch(()=>toast('청음 미리보기를 비우지 못했습니다'))}
function readProLyricMemory(){try{const x=JSON.parse(localStorage.getItem(PRO_LYRIC_MEMORY_KEY)||'[]');return Array.isArray(x)?x.slice(-PRO_LYRIC_MAX):[]}catch(e){return[]}}
function writeProLyricMemory(rows){try{localStorage.setItem(PRO_LYRIC_MEMORY_KEY,JSON.stringify((rows||[]).slice(-PRO_LYRIC_MAX)));return true}catch(e){toast('전문 가사 구조 데이터 저장 공간이 부족합니다.');return false}}
function proLyricMemoryBytes(){try{return new Blob([localStorage.getItem(PRO_LYRIC_MEMORY_KEY)||'']).size}catch(e){return 0}}
function proLyricTextFingerprint(text=''){let h=2166136261;const t=String(text).replace(/\s+/g,' ').trim();for(let i=0;i<t.length;i++){h^=t.charCodeAt(i);h=Math.imul(h,16777619)}return(h>>>0).toString(16)}
function lyricSectionKind(line=''){const t=String(line).toLowerCase();if(/chorus|후렴|hook|훅/.test(t))return'chorus';if(/pre.?chorus|프리.?코러스|프리후렴/.test(t))return'pre';if(/bridge|브리지/.test(t))return'bridge';if(/verse|벌스|절/.test(t))return'verse';if(/intro|인트로/.test(t))return'intro';if(/outro|아웃트로|ending|엔딩/.test(t))return'outro';return'other'}
function analyzeLyricReferenceFeatures(text='',p={}){const raw=String(text||'').trim(),rows=raw.split(/\n+/).map(x=>x.trim()).filter(Boolean),markers=rows.filter(x=>/^\[.+\]$/.test(x)||/^\(.+\)$/.test(x)),lines=rows.filter(x=>!markers.includes(x));if(lines.length<4)return null;const units=lines.map(x=>lyricUnits(x.replace(/\//g,' ')).length),norm=lines.map(x=>x.replace(/[\s.,!?~…'"“”‘’()-]/g,'').toLowerCase()).filter(Boolean),unique=new Set(norm).size,repeatRatio=1-unique/Math.max(1,norm.length),tails=lines.map(x=>{const a=x.replace(/[\s.,!?~…'"“”‘’()]/g,'').split(/\s+/).filter(Boolean);const last=a.at(-1)||'';return last.slice(-2).toLowerCase()}).filter(Boolean),tailRepeat=1-new Set(tails).size/Math.max(1,tails.length),sections={verse:0,pre:0,chorus:0,bridge:0,intro:0,outro:0,other:0};for(const m of markers)sections[lyricSectionKind(m)]++;const avg=units.reduce((a,b)=>a+b,0)/units.length,variance=units.reduce((a,b)=>a+(b-avg)*(b-avg),0)/units.length,capacity=Math.max(3,barSyllableTarget({...p,bpm:Number(p.bpm)||96,meter:p.meter||'4/4'})),longRatio=units.filter(n=>n>capacity*1.7).length/units.length,shortRatio=units.filter(n=>n<=capacity*.8).length/units.length;return{lineCount:lines.length,sectionCount:markers.length,sections,avgUnits:avg,p80Units:percentile(units,.8),lineVariation:Math.sqrt(variance),repeatRatio,tailRepeatRatio:tailRepeat,longLineRatio:longRatio,shortLineRatio:shortRatio,hookEconomy:clamp01(repeatRatio*.75+shortRatio*.25),genreFamily:proGenreFamily(p.genre||$('#genre')?.value||''),bpm:Number(p.bpm)||Number($('#bpm')?.value)||96,meter:p.meter||$('#meter')?.value||'4/4',language:$('#language')?.value||'한국어'}}
function registerProLyricReference(){const el=$('#proLyricReferenceInput'),text=el?.value||'';if(!text.trim())return toast('전문 가사 구조를 분석할 가사를 붙여넣어 주세요');const p=activeProfile(),features=analyzeLyricReferenceFeatures(text,p);if(!features)return toast('전문 가사는 최소 4줄 이상 넣어 주세요');const fp=proLyricTextFingerprint(text),rows=readProLyricMemory();if(rows.some(x=>x.fingerprint===fp))return toast('이미 등록한 가사 구조입니다');rows.push({id:`lyr-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,fingerprint:fp,createdAt:new Date().toISOString(),...features});writeProLyricMemory(rows);if(el)el.value='';renderLearningProfile();renderProCompositionCoach();toast('전문 가사 원문은 저장하지 않고 구조 특징만 등록했습니다')}
function clearProLyricReferences(){const rows=readProLyricMemory();if(!rows.length)return toast('삭제할 전문 가사 구조가 없습니다');if(!confirm(`전문 가사 구조 특징 ${rows.length}개를 삭제할까요?`))return;localStorage.removeItem(PRO_LYRIC_MEMORY_KEY);renderLearningProfile();renderProCompositionCoach();toast('전문 가사 구조 특징을 삭제했습니다')}
function lyricReferenceNeighbors(p={},limit=24){const fam=proGenreFamily(p.genre||''),meter=p.meter||'';return readProLyricMemory().map(x=>{let w=1;if(x.genreFamily===fam)w+=4;if(meter&&x.meter===meter)w+=1.2;if(Number.isFinite(Number(p.bpm))&&Number.isFinite(Number(x.bpm)))w+=Math.max(0,1.5-Math.abs(Number(p.bpm)-Number(x.bpm))/28);return{x,w}}).sort((a,b)=>b.w-a.w).slice(0,limit)}
function lyricReferenceProfileFor(p={}){const rows=lyricReferenceNeighbors(p);if(!rows.length)return null;const range=k=>{const vals=rows.map(r=>Number(r.x[k])).filter(Number.isFinite);return{p20:percentile(vals,.2),median:percentile(vals,.5),p80:percentile(vals,.8)}};return{count:rows.length,avgUnits:range('avgUnits'),p80Units:range('p80Units'),repeatRatio:range('repeatRatio'),longLineRatio:range('longLineRatio'),hookEconomy:range('hookEconomy')}}
function learningFileSourceKey(file,prefix='audio',nameOverride=''){const name=String(nameOverride||file?.name||'audio'),size=Number(file?.size||0),lm=Number(file?.lastModified||0),type=String(file?.type||'audio/wav');let h=2166136261;const st=`${prefix}|${name}|${size}|${lm}|${type}`;for(let i=0;i<st.length;i++){h^=st.charCodeAt(i);h=Math.imul(h,16777619)}return `${prefix}-${(h>>>0).toString(16)}-${size}`}
function learningHasSourceKey(key){if(!key)return false;return readLearningMemory().items.some(x=>x.sourceKey===key)}
function targetHasSourceKey(key){if(!key)return false;return readLearningTargets().some(x=>x.sourceKey===key)}
function learningBroadcastStoredCount(){try{const n=typeof broadcastOrderRead==='function'?broadcastOrderRead().length:0;return Math.max(n,typeof broadcastFiles!=='undefined'?(broadcastFiles?.length||0):0)}catch(e){return typeof broadcastFiles!=='undefined'?(broadcastFiles?.length||0):0}}
function proGenreFamily(g=''){g=String(g);if(/발라드/.test(g))return'발라드';if(/댄스|EDM|하우스|테크노|트랜스|디스코|퓨처 베이스|개러지/.test(g))return'댄스·전자';if(/록/.test(g))return'록';if(/힙합|랩|트랩|R&B|소울|펑크/.test(g))return'R&B·힙합';if(/재즈|보사노바|스윙|블루스/.test(g))return'재즈';if(/뉴에이지|앰비언트|로파이|어쿠스틱|포크/.test(g))return'어쿠스틱';if(/영화|오케스트라|뮤지컬|합창/.test(g))return'시네마틱';if(/국악|전통|월드|중국풍|일본풍|인도|중동/.test(g))return'월드·전통';return'팝'}
function clamp01(x){return Math.max(0,Math.min(1,Number(x)||0))}
function db20(x){return 20*Math.log10(Math.max(1e-9,Math.abs(Number(x)||0)))}
function percentile(values,p=.5){const a=(values||[]).filter(Number.isFinite).sort((x,y)=>x-y);if(!a.length)return null;const pos=(a.length-1)*Math.max(0,Math.min(1,p)),lo=Math.floor(pos),hi=Math.ceil(pos),t=pos-lo;return a[lo]*(1-t)+a[hi]*t}
function proSpectralSharesBuffer(buffer){const rate=buffer.sampleRate,channels=Array.from({length:buffer.numberOfChannels},(_,i)=>buffer.getChannelData(i)),bands={sub:[35,50,70],bass:[90,130,180],lowMid:[260,380,550],body:[750,1050],clarity:[1600,2300,3200],presence:[4300,5600],air:[8000,11000,15000]},sum=Object.fromEntries(Object.keys(bands).map(k=>[k,0])),frames=32,size=2048,frame=new Float32Array(size);let valid=0;for(let fi=0;fi<frames;fi++){const center=Math.floor((.02+.96*(fi+.5)/frames)*buffer.length),start=Math.max(0,Math.min(Math.max(0,buffer.length-size),center-size/2));let e=0;for(let i=0;i<size;i++){let v=0;for(const ch of channels)v+=ch[start+i]||0;v/=Math.max(1,channels.length);frame[i]=v;e+=v*v}if(Math.sqrt(e/size)<.0015)continue;valid++;for(const [k,freqs] of Object.entries(bands))for(const f of freqs)if(f<rate*.46)sum[k]+=Math.sqrt(goertzelPower(frame,0,size,rate,f))/size}const total=Object.values(sum).reduce((a,b)=>a+b,0)||1;return{shares:Object.fromEntries(Object.entries(sum).map(([k,v])=>[k,v/total])),valid,rangeHz:[31,Math.min(16000,rate*.46)]}}
function analyzeProAudioMetrics(buffer){if(!buffer)return null;const rate=12000,data=monoDownsample(buffer,rate);let peak=0,e=0;for(let i=0;i<data.length;i++){const v=data[i];peak=Math.max(peak,Math.abs(v));e+=v*v}const rms=Math.sqrt(e/Math.max(1,data.length)),block=Math.max(800,Math.floor(rate*.4)),step=Math.max(400,Math.floor(rate*.2)),blocks=[];for(let i=0;i+block<=data.length;i+=step){let be=0;for(let j=i;j<i+block;j+=2)be+=data[j]*data[j];blocks.push(db20(Math.sqrt(be/Math.max(1,Math.ceil(block/2)))))}const spectralResult=proSpectralSharesBuffer(buffer),spectral=spectralResult.shares;let midE=0,sideE=0,cross=0,l2=0,r2=0;if(buffer.numberOfChannels>1){const L=buffer.getChannelData(0),R=buffer.getChannelData(1),stride=Math.max(1,Math.floor(buffer.length/180000));for(let i=0;i<buffer.length;i+=stride){const l=L[i]||0,r=R[i]||0,m=(l+r)*.5,sd=(l-r)*.5;midE+=m*m;sideE+=sd*sd;cross+=l*r;l2+=l*l;r2+=r*r}}const stereoWidth=buffer.numberOfChannels>1?sideE/Math.max(1e-9,midE+sideE):0,correlation=buffer.numberOfChannels>1?cross/Math.sqrt(Math.max(1e-9,l2*r2)):1,crest=db20(peak/Math.max(1e-9,rms)),lra=Math.max(0,(percentile(blocks,.9)??db20(rms))-(percentile(blocks,.1)??db20(rms))),midCrowding=clamp01((spectral.lowMid||0)*1.5+(spectral.clarity||0)*1.25+(spectral.presence||0)*.65),vocalClarity=clamp01((spectral.clarity||0)*1.55+(spectral.presence||0)*.7-(spectral.lowMid||0)*.45);return{samplePeakDbfs:db20(peak),rmsDbfs:db20(rms),crestDb:crest,dynamicRangeProxyDb:lra,stereoWidth,correlation,bassShare:(spectral.sub||0)+(spectral.bass||0),lowMidShare:spectral.lowMid||0,bodyShare:spectral.body||0,clarityShare:spectral.clarity||0,presenceShare:spectral.presence||0,airShare:spectral.air||0,midCrowding,vocalClarity,analysisRangeHz:spectralResult.rangeHz,measurement:'browser-reference-proxy'}}
function learningSimilarity(item,p){let score=1;const g=proGenreFamily(p?.genre||''),ig=proGenreFamily(item.genre||'');if(g===ig)score+=5;if(p?.meter&&item.meter===p.meter)score+=1.5;if(Number.isFinite(p?.bpm)&&Number.isFinite(item.bpm))score+=Math.max(0,2-Math.abs(p.bpm-item.bpm)/20);return Math.max(.2,score)}
function learningNeighbors(p,limit=18){if(!learningIsEnabled())return[];return readLearningMemory().items.map(x=>{let w=learningSimilarity(x,p);if(x.source==='professional-reference-mic')w*=.65;return{x,w}}).sort((a,b)=>b.w-a.w).slice(0,limit)}
function proMetricRange(rows,key){const micUnsafe=new Set(['rmsDbfs','samplePeakDbfs','stereoWidth','correlation']);const vals=rows.filter(r=>!(micUnsafe.has(key)&&r.x.source==='professional-reference-mic')).map(r=>Number(r.x.proMetrics?.[key])).filter(Number.isFinite);return{n:vals.length,p20:percentile(vals,.2),median:percentile(vals,.5),p80:percentile(vals,.8)}}
function learnedProfileFor(p){const rows=learningNeighbors(p,20);if(!rows.length)return null;let ws=0,bpm=0;const meters={},genres={},inst={},mix={transient:0,bassLikelihood:0,presenceLikelihood:0,sustainLikelihood:0};for(const {x,w} of rows){ws+=w;bpm+=(Number(x.bpm)||0)*w;if(x.meter)meters[x.meter]=(meters[x.meter]||0)+w;if(x.genre)genres[x.genre]=(genres[x.genre]||0)+w;for(const n of x.instruments||[])inst[n]=(inst[n]||0)+w;for(const k of Object.keys(mix))mix[k]+=(Number(x.mixHints?.[k])||0)*w}const top=o=>Object.entries(o).sort((a,b)=>b[1]-a[1]);const metricKeys=['rmsDbfs','samplePeakDbfs','crestDb','dynamicRangeProxyDb','stereoWidth','bassShare','lowMidShare','clarityShare','presenceShare','airShare','midCrowding','vocalClarity'];return{count:rows.length,totalWeight:ws,bpm:ws?bpm/ws:null,meter:top(meters)[0]?.[0]||'',genre:top(genres)[0]?.[0]||'',instruments:top(inst).slice(0,8).map(([name,score])=>({name,score})),mixHints:Object.fromEntries(Object.entries(mix).map(([k,v])=>[k,ws?v/ws:0])),ranges:Object.fromEntries(metricKeys.map(k=>[k,proMetricRange(rows,k)]))}}
function applyLearnedTasteToProfile(p){const lp=learnedProfileFor(p);if(!lp)return p;const out={...p,learningProfile:lp};if(Number.isFinite(lp.bpm)&&Math.abs(lp.bpm-out.bpm)<=26)out.bpm=Math.round(out.bpm*.88+lp.bpm*.12);return out}
function learnedPreferredInstrumentNames(p,limit=5){const lp=learnedProfileFor(p);return(lp?.instruments||[]).slice(0,limit).map(x=>x.name)}
function reorderWithLearning(list,p){const pref=learnedPreferredInstrumentNames(p,8);if(!pref.length)return list;const rank=new Map(pref.map((n,i)=>[n,i]));return [...list].sort((a,b)=>(rank.has(a)?rank.get(a):99)-(rank.has(b)?rank.get(b):99))}
function learningItemFromAnalysis(a,extra={}){if(!a)return null;return{id:extra.id||`${Date.now()}-${Math.random().toString(36).slice(2,8)}`,name:extra.name||a.fileName||'전문 기준곡',learnedAt:new Date().toISOString(),role:'reference',source:extra.source||'professional-reference',sourceKey:extra.sourceKey||'',duration:Number(a.duration||0),bpm:Number(a.bpm||0),meter:a.meter||'',key:a.key||'',genre:a.character?.genre||a.genre||'',genreFamily:proGenreFamily(a.character?.genre||a.genre||''),mood:a.character?.mood||a.mood||'',instruments:[...(a.instruments||[])].slice(0,8),mixHints:{transient:Number(a.mixHints?.transient||0),bassLikelihood:Number(a.mixHints?.bassLikelihood||0),presenceLikelihood:Number(a.mixHints?.presenceLikelihood||0),sustainLikelihood:Number(a.mixHints?.sustainLikelihood||0)},confidence:{tempo:Number(a.tempoConfidence||0),meter:Number(a.meterConfidence||0),key:Number(a.keyConfidence||0),melody:Number(a.reliability||0),chord:Number(a.chordConfidence||0)},captureMode:extra.captureMode||'direct-file',proMetrics:a.proMetrics||null}}
function addLearningItem(item,silent=false){if(!item)return false;const mem=readLearningMemory(),sig=`${item.name}|${Math.round(item.duration||0)}|${item.bpm}|${item.meter}|${item.key}`;const duplicate=mem.items.findIndex(x=>(item.sourceKey&&x.sourceKey===item.sourceKey)||`${x.name}|${Math.round(x.duration||0)}|${x.bpm}|${x.meter}|${x.key}`===sig);if(duplicate>=0)mem.items.splice(duplicate,1);mem.items.push(item);const ok=writeLearningMemory(mem);renderLearningProfile();renderProCompositionCoach();if(ok&&!silent)toast(`전문 기준곡으로 등록: ${item.name}`);return ok}
function removeLearningItem(id){const mem=readLearningMemory(),x=mem.items.find(x=>x.id===id);if(!x)return;mem.items=mem.items.filter(x=>x.id!==id);writeLearningMemory(mem);if(x.sourceKey)proPreviewDbDelete(x.sourceKey).then(()=>refreshProPreviewIndex(true)).catch(()=>{});renderLearningProfile();renderProCompositionCoach();toast('선택한 전문 기준곡 특징과 연결된 청음 미리보기를 삭제했습니다')}
function learningSummaryText(mem=readLearningMemory()){const items=mem.items,lyr=readProLyricMemory();if(!items.length&&!lyr.length)return'전문 기준이 없습니다. Suno 원본 WAV나 신뢰하는 전문 완성 음원, 사용 권한이 있는 전문 가사 구조를 먼저 추가하세요.';const fam={};for(const x of items)fam[x.genreFamily||proGenreFamily(x.genre)]=(fam[x.genreFamily||proGenreFamily(x.genre)]||0)+1;const top=Object.entries(fam).sort((a,b)=>b[1]-a[1]).slice(0,4).map(([k,v])=>`${k} ${v}`).join(' · '),avg=items.length?items.reduce((s,x)=>s+(Number(x.bpm)||0),0)/items.length:0,withMetrics=items.filter(x=>x.proMetrics).length;return`${items.length}곡 전문 음원 기준 · 전문 가사 구조 ${lyr.length}개 · ${Object.keys(fam).length}개 장르군${items.length?` · 평균 ${Math.round(avg)} BPM`:''}
${top||'장르 분류 중'} · 음향 특징 측정 ${withMetrics}곡 · 가사 원문 저장 0 B
${learningIsEnabled()?'✓ 새 작곡·악기 배치·가사 호흡·보컬 명료도 판단에 전문 기준 반영':'전문 기준 반영 꺼짐'}`}
function renderLearningProfile(){const mem=readLearningMemory(),lyr=readProLyricMemory(),targets=readLearningTargets(),count=$('#learningCount'),profile=$('#learningProfile'),items=$('#learningItems'),enabled=$('#learningEnabled'),bAuto=$('#learningBroadcastAuto'),mAuto=$('#learningMicAuto'),previewStore=$('#learningPreviewStore');if(enabled){let v=true;try{v=localStorage.getItem(LEARNING_ENABLED_KEY)!=='0'}catch(e){}enabled.checked=v}if(bAuto)bAuto.checked=learningBroadcastAutoEnabled();if(mAuto)mAuto.checked=learningMicAutoEnabled();if(previewStore)previewStore.checked=learningPreviewStoreEnabled();const broadcastCount=learningBroadcastStoredCount(),bytes=learningMemoryBytes(),families=new Set(mem.items.map(x=>x.genreFamily||proGenreFamily(x.genre))).size;if(count)count.textContent=`${mem.items.length}곡 음원 · ${lyr.length}개 가사 구조`;if($('#learningBroadcastCount'))$('#learningBroadcastCount').textContent=`${broadcastCount}곡`;if($('#learningFeatureCount'))$('#learningFeatureCount').textContent=`${mem.items.length}곡`;if($('#learningLyricCount'))$('#learningLyricCount').textContent=`${lyr.length}개`;if($('#learningMemorySize'))$('#learningMemorySize').textContent=learningFormatBytes(bytes);if($('#learningPreviewSize'))$('#learningPreviewSize').textContent=learningFormatBytes(proPreviewBytes);if($('#proLyricReferenceStatus'))$('#proLyricReferenceStatus').textContent=lyr.length?`전문 가사 구조 ${lyr.length}개 학습 · 원문 저장 0 B · 장르/템포/박자와 함께 호흡 길이·반복·후렴 경제성을 비교합니다.`:'아직 전문 가사 구조가 없습니다. 원문은 저장하지 않고 구조 특징만 저장합니다.';if($('#learningAutoStatus'))$('#learningAutoStatus').textContent=`전문 음원 ${mem.items.length}곡 · 청음 가능 ${proPreviewKeys.size}곡 · 전문 가사 구조 ${lyr.length}개 · 장르군 ${families}개 · 방송목록 자동 비교 ${learningBroadcastAutoEnabled()?'ON':'OFF'} · 마이크 자동 비교 ${learningMicAutoEnabled()?'ON':'OFF'} · 최근 비교 ${targets.length}건 · 특징 데이터 ${learningFormatBytes(bytes)} · 청음 미리보기 ${learningFormatBytes(proPreviewBytes)} · AI 학습 원본 복사 0 B`;if(profile){profile.textContent=learningSummaryText(mem)+(mem.items.length?`\n🎧 청음 미리보기 ${proPreviewKeys.size}/${mem.items.length}곡 · 기존 기준곡에 미리보기가 없으면 같은 원본을 다시 추가하면 특징은 중복되지 않고 청음만 연결됩니다.`:'');profile.classList.toggle('learning-profile-good',mem.items.length>=5||lyr.length>=5)}if(items){const last=[...mem.items].reverse().slice(0,16);items.innerHTML=last.length?last.map(x=>{const m=x.proMetrics||{},has=!!x.sourceKey&&proPreviewKeys.has(x.sourceKey);return`<div class="learning-item"><div><b>${esc(x.name||'전문 기준곡')}</b><small>${x.bpm||'—'} BPM · ${esc(x.meter||'—')} · ${esc(x.key||'—')} · ${esc(x.genreFamily||proGenreFamily(x.genre))}${x.source==='professional-reference-mic'?' · 🎙 녹음 기준':''}<br>RMS ${Number.isFinite(m.rmsDbfs)?m.rmsDbfs.toFixed(1)+' dBFS':'—'} · Crest ${Number.isFinite(m.crestDb)?m.crestDb.toFixed(1)+' dB':'—'} · 명료도 ${Number.isFinite(m.vocalClarity)?Math.round(m.vocalClarity*100)+'%':'—'}${x.source==='professional-reference-mic'?' · 절대 음량/폭은 참고 제외':''} · ${has?'🎧 청음 가능':'🔗 청음 미리보기 없음'}</small></div><div class="learning-item-actions"><button class="secondary ${has?'':'preview-missing'}" data-pro-preview="${esc(x.id)}" ${has?'':'disabled'}>▶ A 기준곡</button><button class="secondary ${has?'':'preview-missing'}" data-pro-ab="${esc(x.id)}" ${has?'':'disabled'}>A↔B 비교</button><button class="danger" data-learning-delete="${esc(x.id)}">삭제</button></div></div>`}).join(''):'<div class="learning-item"><div><b>아직 전문 음원 기준곡이 없습니다.</b><small>Suno 원본 WAV 또는 신뢰하는 전문 완성 음원을 ‘전문 기준곡 추가’로 넣어 주세요. 방송목록과 마이크 녹음은 기준곡에 섞이지 않고 비교 대상만 됩니다.</small></div></div>';$$('[data-learning-delete]').forEach(b=>b.onclick=()=>removeLearningItem(b.dataset.learningDelete));$$('[data-pro-preview]').forEach(b=>b.onclick=()=>playProReferenceItem(b.dataset.proPreview));$$('[data-pro-ab]').forEach(b=>b.onclick=()=>playProReferenceAB(b.dataset.proAb))}}
async function analyzeLearningFile(file,index,total,extra={}){const ac=new(window.AudioContext||window.webkitAudioContext)();try{const buffer=await ac.decodeAudioData(await file.arrayBuffer()),rate=8000,data=monoDownsample(buffer,rate),tempo=estimateTempoVerified(data,rate),meterInfo=estimateMeterVerified(tempo),keyInfo=estimateKeyVerified(data,rate),character=estimateAudioCharacter(data,tempo.bpm),mixHints=bandRoleHints(data,rate,tempo),instruments=audioInstrumentSuggestion({...character,bpm:tempo.bpm,meter:meterInfo.meter},mixHints),proMetrics=analyzeProAudioMetrics(buffer),a={fileName:file.name||extra.name||'전문 기준곡',duration:buffer.duration,bpm:tempo.bpm,meter:meterInfo.meter,key:keyInfo.key,keyConfidence:keyInfo.confidence,tempoConfidence:tempo.confidence,meterConfidence:meterInfo.confidence,character,mixHints,instruments,proMetrics,reliability:0,chordConfidence:0};if(extra.asTarget)return{analysis:a,buffer};const item=learningItemFromAnalysis(a,{name:extra.name||file.name,source:extra.source||'professional-reference',sourceKey:extra.sourceKey||'',captureMode:extra.captureMode||'direct-file'});return extra.returnBuffer?{item,buffer}:item}finally{try{await ac.close()}catch(e){}}}
function proDeviationLabel(value,r,highBad=false){if(!r||!Number.isFinite(value)||!Number.isFinite(r.median))return'기준 부족';const span=Math.max(.0001,(r.p80??r.median)-(r.p20??r.median));const z=(value-r.median)/span;if(Math.abs(z)<.7)return'전문 범위';if(z>0)return highBad?'높음':'높은 편';return highBad?'낮은 편':'낮음'}
function compareToProReference(a){if(!a?.proMetrics)return{score:null,summary:'전문 비교용 음향 특징이 없습니다.',messages:[]};const lp=learnedProfileFor({genre:a.character?.genre||a.genre,bpm:a.bpm,meter:a.meter,mood:a.character?.mood});if(!lp||lp.count<2)return{score:null,summary:'같은 계열 전문 기준곡을 2곡 이상 등록하면 비교가 시작됩니다.',messages:[]};const m=a.proMetrics,r=lp.ranges,msg=[];let penalty=0;const outside=(key,val,weight=8,dir='both')=>{const x=r[key];if(!x||!Number.isFinite(x.p20)||!Number.isFinite(x.p80)||!Number.isFinite(val))return 0;if((dir==='both'||dir==='low')&&val<x.p20){const d=(x.p20-val)/Math.max(.001,Math.abs(x.p80-x.p20)||1);return Math.min(weight*2,d*weight)}if((dir==='both'||dir==='high')&&val>x.p80){const d=(val-x.p80)/Math.max(.001,Math.abs(x.p80-x.p20)||1);return Math.min(weight*2,d*weight)}return 0};const pCrest=outside('crestDb',m.crestDb,9,'low');if(pCrest){penalty+=pCrest;msg.push('다이내믹이 전문 기준보다 눌린 편 — 추가 컴프레션을 피하세요.')}const pLowMid=outside('lowMidShare',m.lowMidShare,8,'high');if(pLowMid){penalty+=pLowMid;msg.push('저중역이 전문 기준보다 붐빔/마스킹 위험 — 보컬 몸통과 반주를 분리하세요.')}const pClarity=outside('vocalClarity',m.vocalClarity,10,'low');if(pClarity){penalty+=pClarity;msg.push('가사 명료도 대역이 전문 기준보다 약함 — 1.5~5kHz 보컬 자리를 비우세요.')}const pPresence=outside('presenceShare',m.presenceShare,8,'high');if(pPresence){penalty+=pPresence;msg.push('고중역 존재감이 과한 편 — 쨍함과 자음 피로를 확인하세요.')}const pWidth=outside('stereoWidth',m.stereoWidth,5,'high');if(pWidth){penalty+=pWidth;msg.push('스테레오 폭이 전문 기준보다 넓음 — 리드 보컬/베이스 중심을 안정시키세요.')}const score=Math.max(0,Math.round(100-penalty));if(!msg.length)msg.push('전문 기준 범위 안에서 다이내믹·대역 균형·명료도가 안정적입니다.');return{score,summary:`전문 기준 ${lp.count}곡 비교 · ${score}점`,messages:msg.slice(0,4),referenceCount:lp.count,ranges:r}}
function recordTargetAnalysis(a,{name='',source='target',sourceKey=''}={}){if(!a)return null;const cmp=compareToProReference(a),rows=readLearningTargets(),item={id:`${Date.now()}-${Math.random().toString(36).slice(2,7)}`,name:name||a.fileName||'분석 대상',source,sourceKey,at:new Date().toISOString(),genre:a.character?.genre||a.genre||'',bpm:a.bpm,meter:a.meter,key:a.key,proMetrics:a.proMetrics||null,comparison:cmp};const dup=rows.findIndex(x=>sourceKey&&x.sourceKey===sourceKey);if(dup>=0)rows.splice(dup,1);rows.push(item);writeLearningTargets(rows);renderLearningProfile();return cmp}
async function learnAudioFiles(files){if(learningBusy)return toast('지금 전문 기준곡을 분석하고 있습니다');const list=[...(files||[])].filter(f=>f.type?.startsWith('audio/')||/\.(mp3|wav|m4a|aac|ogg|flac)$/i.test(f.name)).slice(0,65);if(!list.length)return;learningBusy=true;let ok=0,fail=0,previewOk=0,previewFail=0;const box=$('#learningProgress'),wantPreview=learningPreviewStoreEnabled();try{for(let i=0;i<list.length;i++){if(box)box.textContent=`전문 기준 학습 ${i+1}/${list.length} · ${list[i].name}\nBPM·박자·조성·다이내믹·대역 균형·스테레오 폭·보컬 명료도 특징을 추출합니다${wantPreview?' · 청음 미리보기 생성 중':''}…`;try{const key=learningFileSourceKey(list[i],'pro-reference'),result=await analyzeLearningFile(list[i],i,list.length,{source:'professional-reference',sourceKey:key,returnBuffer:wantPreview}),item=wantPreview?result.item:result;if(addLearningItem(item,true)){ok++;if(wantPreview&&result.buffer){if(await saveProReferencePreview(item,result.buffer))previewOk++;else previewFail++}}}catch(e){console.warn('professional reference',list[i].name,e);fail++}await new Promise(r=>setTimeout(r,35))}await refreshProPreviewIndex(true);if(box)box.textContent=`✅ 전문 기준 학습 완료 · ${ok}곡 등록${fail?` · ${fail}곡 실패`:''}${wantPreview?`\n🎧 청음 미리보기 ${previewOk}곡 저장${previewFail?` · ${previewFail}곡 저장 실패`:''}`:''}\nAI 학습 특징에는 원본 음원을 저장하지 않습니다. 방송목록·마이크는 기준에 섞지 않습니다.`;toast(`전문 기준곡 ${ok}곡 학습 완료${wantPreview?` · 청음 ${previewOk}곡`:''}`)}finally{learningBusy=false;const el=$('#learningAudioFiles');if(el)el.value=''}}

function setProMicLearningStatus(text){const el=$('#proMicLearningStatus');if(el)el.textContent=text}
function updateProMicLearningClock(){
 if(!proMicActive)return;
 const sec=(performance.now()-proMicStarted)/1000;
 let rms=0;
 if(proMicAnalyser){
  const n=proMicAnalyser.fftSize||1024;
  if(!proMicMeterData||proMicMeterData.length!==n)proMicMeterData=new Float32Array(n);
  proMicAnalyser.getFloatTimeDomainData(proMicMeterData);
  let sum=0;for(let i=0;i<n;i++){const x=proMicMeterData[i];sum+=x*x}rms=Math.sqrt(sum/Math.max(1,n));
 }
 const db=rms>0?20*Math.log10(rms):-90,pct=Math.max(0,Math.min(100,Math.round((db+60)/50*100)));
 const fill=$('#proMicLearningLevelFill'),txt=$('#proMicLearningLevelText');if(fill)fill.style.width=pct+'%';if(txt)txt.textContent=pct<4?(sec>2?'입력 매우 작음':'입력 확인 중'):pct<25?'입력 작음':pct<80?'입력 정상':'입력 큼';
 setProMicLearningStatus(`● 전문곡 녹음 학습 중 ${sec.toFixed(1)}초 · 입력 ${pct}% · 종료하면 자동 분석·등록합니다.`);
 proMicTimer=requestAnimationFrame(updateProMicLearningClock);
}
function startProMicMediaRecorder(stream){
 proMicRecorder=null;proMicChunks=[];if(typeof MediaRecorder==='undefined')return null;
 const candidates=['audio/webm;codecs=opus','audio/webm','audio/mp4'];let mime='';
 for(const t of candidates){try{if(MediaRecorder.isTypeSupported?.(t)){mime=t;break}}catch{}}
 try{const rec=mime?new MediaRecorder(stream,{mimeType:mime}):new MediaRecorder(stream);rec.ondataavailable=e=>{if(e.data?.size)proMicChunks.push(e.data)};rec.start(500);proMicRecorder=rec;return rec}catch(e){console.warn('professional reference MediaRecorder unavailable',e);return null}
}
async function stopProMicMediaRecorder(){
 const rec=proMicRecorder;if(!rec)return null;
 if(rec.state!=='inactive')await new Promise(resolve=>{let done=false;const finish=()=>{if(done)return;done=true;resolve()};rec.addEventListener('stop',finish,{once:true});try{rec.requestData?.();rec.stop()}catch{finish()}setTimeout(finish,2500)});
 if(!proMicChunks.length)return null;const type=rec.mimeType||proMicChunks[0]?.type||'audio/webm';return new Blob(proMicChunks,{type});
}
async function startProMicLearning(){
 if(!navigator.mediaDevices?.getUserMedia)return toast('이 브라우저는 마이크 입력을 지원하지 않습니다');
 if(proMicActive)return toast('전문곡 녹음 학습이 이미 진행 중입니다');
 if(songMicActive)return toast('일반 노래 마이크 녹음을 먼저 종료해 주세요');
 if(learningBusy)return toast('다른 전문 기준 분석이 끝난 뒤 시작해 주세요');
 try{
  proMicStream=await openSongMicStream();proMicChunks=[];proMicPcmChunks=[];proMicProcessorFrames=0;proMicMeterData=null;
  const AC=window.AudioContext||window.webkitAudioContext;proMicAudioCtx=new AC();await proMicAudioCtx.resume?.();proMicSampleRate=proMicAudioCtx.sampleRate;
  proMicSourceNode=proMicAudioCtx.createMediaStreamSource(proMicStream);proMicAnalyser=proMicAudioCtx.createAnalyser();proMicAnalyser.fftSize=2048;proMicAnalyser.smoothingTimeConstant=.72;
  proMicSilentGain=proMicAudioCtx.createGain();proMicSilentGain.gain.value=.000001;proMicSourceNode.connect(proMicAnalyser);proMicAnalyser.connect(proMicSilentGain);proMicSilentGain.connect(proMicAudioCtx.destination);
  proMicProcessor=proMicAudioCtx.createScriptProcessor?proMicAudioCtx.createScriptProcessor(4096,1,1):null;
  if(proMicProcessor){proMicProcessor.onaudioprocess=e=>{if(!proMicActive)return;proMicPcmChunks.push(new Float32Array(e.inputBuffer.getChannelData(0)));proMicProcessorFrames++};proMicSourceNode.connect(proMicProcessor);proMicProcessor.connect(proMicSilentGain)}
  const fallback=startProMicMediaRecorder(proMicStream);if(!proMicProcessor&&!fallback)throw new Error('이 브라우저에서 사용할 수 있는 녹음 방식이 없습니다');
  proMicActive=true;proMicStarted=performance.now();const start=$('#startProMicLearning'),stopBtn=$('#stopProMicLearning');if(start)start.disabled=true;if(stopBtn)stopBtn.disabled=false;
  const fill=$('#proMicLearningLevelFill'),txt=$('#proMicLearningLevelText');if(fill)fill.style.width='0%';if(txt)txt.textContent='입력 확인 중';
  setProMicLearningStatus('● 전문곡 녹음 학습 시작 · 전문 사이트의 곡을 스피커로 재생해 주세요. 종료하면 자동 분석합니다.');updateProMicLearningClock();toast('전문곡 녹음 학습을 시작했습니다');
 }catch(e){console.error(e);proMicActive=false;try{if(proMicRecorder?.state==='recording')proMicRecorder.stop()}catch{}proMicRecorder=null;proMicStream?.getTracks().forEach(t=>t.stop());proMicStream=null;try{await proMicAudioCtx?.close()}catch{}proMicAudioCtx=null;const start=$('#startProMicLearning'),stopBtn=$('#stopProMicLearning');if(start)start.disabled=false;if(stopBtn)stopBtn.disabled=true;const msg=songMicErrorText(e);setProMicLearningStatus(msg);toast(msg)}
}
async function stopProMicLearning(){
 if(!proMicActive)return toast('지금 전문곡 녹음 학습 중이 아닙니다');
 proMicActive=false;cancelAnimationFrame(proMicTimer);const stopBtn=$('#stopProMicLearning');if(stopBtn)stopBtn.disabled=true;setProMicLearningStatus('녹음을 마무리하고 전문 기준 특징을 분석하고 있습니다…');
 try{
  const encoded=await stopProMicMediaRecorder();if(proMicProcessor)proMicProcessor.onaudioprocess=null;
  let blob=null,ext='wav',type='audio/wav',samples=mergeFloat32Chunks(proMicPcmChunks),rate=proMicSampleRate,st=songMicSignalStats(samples);
  if(samples.length>=rate*.8&&st.peak>=.00002){blob=pcmToWavBlob(samples,rate)}else if(encoded?.size){blob=encoded;type=encoded.type||'audio/webm';ext=type.includes('mp4')?'m4a':type.includes('ogg')?'ogg':'webm'}
  if(!blob?.size)throw new Error('전문곡 녹음 데이터가 만들어지지 않았습니다');
  const sec=samples.length? samples.length/Math.max(1,rate) : (performance.now()-proMicStarted)/1000;if(sec<1.5)throw new Error('전문곡을 최소 2초 이상 들려준 뒤 종료해 주세요');
  const stamp=new Date().toLocaleString('ko-KR',{year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'}).replace(/[. :]/g,'-').replace(/-+/g,'-');const name=`전문곡 녹음 기준 ${stamp}.${ext}`;
  let file;try{file=new File([blob],name,{type:blob.type||type,lastModified:Date.now()})}catch{file=blob;try{Object.defineProperty(file,'name',{value:name});Object.defineProperty(file,'lastModified',{value:Date.now()})}catch{}}
  learningBusy=true;const key=learningFileSourceKey(file,'pro-reference-mic',name),wantPreview=learningPreviewStoreEnabled();
  const result=await analyzeLearningFile(file,0,1,{source:'professional-reference-mic',sourceKey:key,name,returnBuffer:wantPreview,captureMode:'microphone-room'}),item=wantPreview?result.item:result;
  if(!item)throw new Error('전문 기준 특징을 만들지 못했습니다');addLearningItem(item,true);let previewSaved=false;if(wantPreview&&result.buffer)previewSaved=await saveProReferencePreview(item,result.buffer);await refreshProPreviewIndex(true);
  setProMicLearningStatus(`✅ 전문곡 녹음 학습 완료 · ${sec.toFixed(1)}초 · ${item.bpm||'—'} BPM · ${item.meter||'—'} · ${item.key||'—'}${previewSaved?' · 15초 청음 저장':''}\n🎙 마이크/방 영향 때문에 절대 음량·스테레오 폭은 직접 WAV보다 낮은 신뢰도로 취급하고, 음악 구조·대역 성향·명료도 특징을 보조 기준으로 반영합니다. 원본 녹음 전체는 저장하지 않았습니다.`);toast('전문곡 녹음 기준을 학습했습니다');
 }catch(e){console.error(e);setProMicLearningStatus(`전문곡 녹음 학습 실패: ${e?.message||'알 수 없는 오류'}`);toast('전문곡 녹음 학습에 실패했습니다')}finally{
  learningBusy=false;try{proMicSourceNode?.disconnect();proMicProcessor?.disconnect();proMicAnalyser?.disconnect();proMicSilentGain?.disconnect()}catch{}proMicStream?.getTracks().forEach(t=>t.stop());try{await proMicAudioCtx?.close()}catch{}proMicAudioCtx=null;proMicStream=null;proMicRecorder=null;proMicChunks=[];proMicPcmChunks=[];const start=$('#startProMicLearning');if(start)start.disabled=false;if(stopBtn)stopBtn.disabled=true;const fill=$('#proMicLearningLevelFill'),txt=$('#proMicLearningLevelText');if(fill)fill.style.width='0%';if(txt)txt.textContent='대기';renderLearningProfile();
 }
}

function queueBroadcastAutoLearning(files,{delay=450}={}){if(!learningBroadcastAutoEnabled())return renderLearningProfile();const list=[...(files||[])].filter(f=>f&&(f.type?.startsWith('audio/')||/\.(mp3|wav|m4a|aac|ogg|flac)$/i.test(f.name||'')));for(const f of list){const key=learningFileSourceKey(f,'broadcast-target');if(!targetHasSourceKey(key))learningAutoQueue.set(key,f)}renderLearningProfile();if(!learningAutoQueue.size)return;clearTimeout(learningAutoTimer);learningAutoTimer=setTimeout(processLearningAutoQueue,Math.max(20,delay))}
async function processLearningAutoQueue(){if(!learningBroadcastAutoEnabled()){learningAutoQueue.clear();return renderLearningProfile()}if(learningBusy){learningAutoTimer=setTimeout(processLearningAutoQueue,1200);return}const jobs=[...learningAutoQueue.entries()].filter(([key])=>!targetHasSourceKey(key));learningAutoQueue.clear();if(!jobs.length)return renderLearningProfile();learningBusy=true;let ok=0,fail=0;const box=$('#learningProgress');try{for(let i=0;i<jobs.length;i++){const [key,file]=jobs[i];if(targetHasSourceKey(key))continue;if(box)box.textContent=`방송목록 전문 비교 ${i+1}/${jobs.length} · ${file.name}\n전문 기준과 다이내믹·대역 균형·보컬 명료도·스테레오 폭을 비교합니다. 기준 학습에는 섞지 않습니다.`;try{const r=await analyzeLearningFile(file,i,jobs.length,{asTarget:true}),cmp=recordTargetAnalysis(r.analysis,{name:file.name,source:'broadcast-target',sourceKey:key});ok++;if(i===jobs.length-1&&box)box.textContent=`✅ 방송목록 비교 완료 · ${ok}곡${fail?` · ${fail}곡 실패`:''}\n${cmp?.summary||''} · 음원 복사 0 B · 전문 기준 데이터에는 추가하지 않았습니다.`}catch(e){console.warn('broadcast target compare',file.name,e);fail++}await new Promise(r=>setTimeout(r,60))}if(ok)toast(`방송목록 새 곡 ${ok}곡 전문 기준 비교 완료`)}finally{learningBusy=false;renderLearningProfile();if(learningAutoQueue.size)learningAutoTimer=setTimeout(processLearningAutoQueue,500)}}
function learnBroadcastNow(){if(typeof broadcastFiles==='undefined'||!broadcastFiles.length)return toast('저장된 방송목록이 없습니다');queueBroadcastAutoLearning(broadcastFiles,{delay:20});const pending=[...broadcastFiles].filter(f=>!targetHasSourceKey(learningFileSourceKey(f,'broadcast-target'))).length;if(!pending)toast('방송목록의 모든 곡이 이미 전문 기준과 비교되어 있습니다')}
function autoLearnMicAnalysis(source){if(!learningMicAutoEnabled()||!importedSongAnalysis||!source?.blob)return null;const key=learningFileSourceKey(source.blob,'mic-target',source.name);if(targetHasSourceKey(key))return readLearningTargets().find(x=>x.sourceKey===key)?.comparison||null;return recordTargetAnalysis(importedSongAnalysis,{name:source.name,source:'microphone-target',sourceKey:key})}
async function learnCurrentAnalyzedSong(){if(!importedSongAnalysis)return toast('먼저 전문 기준으로 삼을 노래를 자동 분석해 주세요');const key=learningFileSourceKey({name:importedSongAnalysis.fileName,size:0,lastModified:0,type:'analysis'},'current-pro',importedSongAnalysis.fileName),item=learningItemFromAnalysis(importedSongAnalysis,{source:'current-professional-reference',sourceKey:key});addLearningItem(item);if(learningPreviewStoreEnabled()&&importedSongBuffer)await saveProReferencePreview(item,importedSongBuffer);await refreshProPreviewIndex(true);const b=$('#learnAnalyzedSongQuick');if(b)b.textContent='✓ 전문 기준 등록됨'}
function updateLearningRating(kind){if(!importedSongAnalysis)return;const rows=readLearningTargets(),last=rows.at(-1);if(last){last.feedback=kind;writeLearningTargets(rows)}renderLearningProfile()}
function applyLearningToAudioSuggestion(a){if(!learningIsEnabled())return a;const pref=learnedPreferredInstrumentNames({genre:a.character?.genre,bpm:a.bpm,meter:a.meter,mood:a.character?.mood},4);if(!pref.length)return a;const supported=new Set(allInstrumentNames()),extra=pref.filter(n=>supported.has(n));a.instruments=spaceInstrumentComboForVocal([...new Set([...extra,...(a.instruments||[])])].slice(0,6),{...a,vocal:$('#vocal')?.value||'auto'});return a}
function applyLearningToAuto64(a){if(!learningIsEnabled()||!auto64State.ready)return;const lp=learnedProfileFor({genre:a.character?.genre,bpm:a.bpm,meter:a.meter,mood:a.character?.mood});if(!lp)return;auto64State.summary+=` · 전문 기준 ${lp.count}곡은 비교·진단에만 사용(강제 EQ 0)`;renderAuto64Status()}
function exportLearningMemory(){const mem=readLearningMemory(),lyricReferences=readProLyricMemory();if(!mem.items.length&&!lyricReferences.length)return toast('백업할 전문 기준 데이터가 없습니다');const blob=new Blob([JSON.stringify({...mem,lyricReferences,exportedAt:new Date().toISOString()},null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`MARU-PRO-REFERENCE-${new Date().toISOString().slice(0,10)}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),2000);toast('전문 음원·가사 구조 특징 백업 파일을 저장했습니다')}
async function importLearningMemory(file){if(!file)return;try{const data=JSON.parse(await file.text());if(!Array.isArray(data.items)&&!Array.isArray(data.lyricReferences))throw Error('전문 기준 형식이 아닙니다');if(Array.isArray(data.items)){const cur=readLearningMemory(),by=new Map(cur.items.map(x=>[x.id,x]));for(const x of data.items.slice(-LEARNING_MAX_ITEMS))if(x&&x.id)by.set(x.id,{...x,role:'reference'});writeLearningMemory({version:2,items:[...by.values()].slice(-LEARNING_MAX_ITEMS)})}if(Array.isArray(data.lyricReferences)){const cur=readProLyricMemory(),by=new Map(cur.map(x=>[x.fingerprint||x.id,x]));for(const x of data.lyricReferences.slice(-PRO_LYRIC_MAX))if(x&&(x.fingerprint||x.id))by.set(x.fingerprint||x.id,x);writeProLyricMemory([...by.values()].slice(-PRO_LYRIC_MAX))}renderLearningProfile();renderProCompositionCoach();toast('전문 음원·가사 구조 특징을 불러왔습니다')}catch(e){toast('전문 기준 파일을 읽지 못했습니다')}}
function clearLearningMemory(){const n=readLearningMemory().items.length,l=readProLyricMemory().length;if(!n&&!l)return toast('삭제할 전문 기준 데이터가 없습니다');if(!confirm(`전문 음원 특징 ${n}곡과 전문 가사 구조 ${l}개, 연결된 청음 미리보기를 모두 삭제할까요? 원본 전문 음원 파일은 삭제하지 않습니다.`))return;localStorage.removeItem(LEARNING_MEMORY_KEY);localStorage.removeItem(PRO_LYRIC_MEMORY_KEY);proPreviewDbClear().then(()=>refreshProPreviewIndex(true)).catch(()=>{});renderLearningProfile();renderProCompositionCoach();toast('전문 기준 특징과 청음 미리보기를 모두 삭제했습니다')}


const PRO_INSTRUMENT_SPACE={
 '베이스 기타':[40,320,'bass',.15],'808 베이스':[30,240,'bass',.12],'콘트라베이스':[40,300,'bass',.18],
 '드럼 세트':[45,12000,'rhythm',.25],'장구':[90,8000,'rhythm',.2],'타이코':[45,5000,'rhythm',.18],'젬베':[70,5000,'rhythm',.2],'봄보':[45,500,'rhythm',.1],'팀파니':[50,700,'rhythm',.12],'타블라':[120,8000,'rhythm',.2],'다르부카':[100,9000,'rhythm',.2],
 '피아노':[70,6500,'harmony',.75],'그랜드 피아노':[55,7000,'harmony',.78],'전자피아노':[80,5500,'harmony',.62],
 '어쿠스틱 기타':[90,7000,'harmony',.68],'일렉 기타':[90,7000,'harmony',.72],'신시사이저':[60,10000,'harmony',.72],'EDM 신스':[80,12000,'lead',.68],'전자 패드':[80,9000,'pad',.78],'합창 패드':[120,9000,'pad',.82],
 '바이올린':[190,9000,'lead',.55],'바이올린 섹션':[160,9000,'harmony',.66],'비올라':[130,6500,'harmony',.58],'첼로':[65,5000,'harmony',.5],'첼로 섹션':[60,5000,'harmony',.55],
 '색소폰':[120,8000,'lead',.65],'트럼펫':[160,9000,'lead',.7],'프렌치 호른':[70,4500,'harmony',.48],
 '플루트':[260,11000,'lead',.48],'대금':[180,9000,'lead',.45],'디즈':[300,12000,'lead',.55],'샤쿠하치':[180,7500,'lead',.42],'반수리':[220,8500,'lead',.43],'네이':[180,8000,'lead',.45],'케나':[250,9000,'lead',.48],'팬플루트':[180,8000,'lead',.4],
 '가야금':[90,7000,'harmony',.58],'고쟁':[80,7000,'harmony',.6],'고토':[100,7000,'harmony',.6],'샤미센':[120,8000,'lead',.55],'시타르':[90,9000,'harmony',.62],'우드':[80,4500,'harmony',.55],'비파':[120,7000,'lead',.57],'하프':[65,8500,'harmony',.52],'코라':[100,8000,'harmony',.52],'차랑고':[140,8000,'harmony',.6],
 '해금':[180,6500,'lead',.62],'얼후':[160,6000,'lead',.6],'칼림바':[250,9000,'lead',.42],'발라폰':[150,6000,'harmony',.38]
};
function instrumentSpace(name){if(PRO_INSTRUMENT_SPACE[name])return PRO_INSTRUMENT_SPACE[name];const t=findInstrument(name)?.[2];if(t==='bass')return[40,300,'bass',.15];if(t==='drum')return[50,9000,'rhythm',.22];if(t==='pad'||t==='synth')return[80,10000,'pad',.75];if(t==='flute'||t==='sax'||t==='brass')return[150,9000,'lead',.55];return[90,7000,'harmony',.62]}
function rangeOverlap(a,b){const lo=Math.max(a[0],b[0]),hi=Math.min(a[1],b[1]);if(hi<=lo)return 0;const overlap=Math.log(hi/lo),target=Math.log(Math.max(b[1],b[0]+1)/Math.max(1,b[0]));return Math.max(0,Math.min(1,overlap/Math.max(.001,target)))}
function vocalClarityRange(v=''){v=String(v);if(/여성/.test(v)&&!/남녀/.test(v))return[1700,5200];if(/남성/.test(v)&&!/여성/.test(v))return[1200,4200];return[1400,5000]}
function arrangementMaskingAssessment(names=[],vocal=''){if(/연주곡/.test(String(vocal)))return{risk:0,label:'연주곡',maskers:[],notes:['연주곡은 보컬 명료도 공간 예약을 적용하지 않습니다.']};const vr=vocalClarityRange(vocal),rows=[...new Set(names)].map(name=>{const [lo,hi,role,w]=instrumentSpace(name),over=rangeOverlap([lo,hi],vr);return{name,role,over,score:over*w}}).sort((a,b)=>b.score-a.score),maskers=rows.filter(x=>x.score>.28),bass=rows.filter(x=>x.role==='bass'),broad=rows.filter(x=>['harmony','pad'].includes(x.role)&&x.score>.3),risk=clamp01(maskers.slice(0,4).reduce((s,x)=>s+x.score,0)/2.2+(broad.length>2?.18:0)+(bass.length>1?.12:0)),notes=[];if(bass.length>1)notes.push(`저역 역할 ${bass.map(x=>x.name).join('·')}가 겹침 — 베이스 주역은 한 악기만.`);if(broad.length>2)notes.push(`중역을 넓게 채우는 ${broad.slice(0,4).map(x=>x.name).join('·')}를 동시에 오래 울리지 말고 구간별로 교대.`);if(maskers.length)notes.push(`보컬 명료도 1~5kHz와 겹치는 ${maskers.slice(0,3).map(x=>x.name).join('·')}는 보컬 순간 음량/옥타브/리듬을 비워 주세요.`);if(!notes.length)notes.push('저역·중역·리드 역할이 비교적 잘 분리되어 보컬 공간이 확보되어 있습니다.');return{risk,label:risk<.32?'좋음':risk<.6?'주의':'혼잡',maskers,notes}}
function spaceInstrumentComboForVocal(combo=[],p={}){const vocal=String(p.vocal||$('#vocal')?.value||'');if(/연주곡/.test(vocal))return [...new Set(combo)].slice(0,6);const out=[],roles={bass:0,broad:0,lead:0,rhythm:0};for(const n of [...new Set(combo)]){const [,,role,w]=instrumentSpace(n),broad=['harmony','pad'].includes(role);if(role==='bass'&&roles.bass>=1)continue;if(broad&&roles.broad>=2)continue;if(role==='lead'&&roles.lead>=2)continue;out.push(n);if(role==='bass')roles.bass++;if(broad)roles.broad++;if(role==='lead')roles.lead++;if(role==='rhythm')roles.rhythm++;if(out.length>=6)break}return out.length>=4?out:[...new Set(combo)].slice(0,6)}
function lyricSingabilityAssessment(text='',p={}){const lines=String(text||'').split(/\n+/).map(x=>x.trim()).filter(x=>x&&!/^\[.+\]$/.test(x)&&!/^\(.+\)$/.test(x));if(!lines.length)return{score:null,summary:'가사를 만들면 호흡·음절 밀도를 검사합니다.',notes:[]};const capacity=Math.max(3,barSyllableTarget({...p,bpm:Number(p.bpm)||96,meter:p.meter||'4/4'})),counts=lines.map(x=>lyricUnits(x.replace(/\//g,' ')).length),avg=counts.reduce((a,b)=>a+b,0)/counts.length,long=counts.filter(n=>n>capacity*1.7).length,veryLong=counts.filter(n=>n>capacity*2.4).length,duplicates=lines.length-new Set(lines.map(x=>x.replace(/\s+/g,' '))).size;let score=100-Math.min(45,long*7+veryLong*10)-Math.min(15,duplicates*3)-Math.max(0,(avg-capacity*1.45)*4);const ref=lyricReferenceProfileFor(p);const notes=[];if(long)notes.push(`긴 가사 ${long}줄 — 한 호흡/한 마디에 산문을 몰아넣지 말고 2개 프레이즈로 나누세요.`);if(duplicates>2)notes.push('동일 문장 반복이 많음 — 후렴 훅은 유지하되 벌스의 설명 반복은 줄이세요.');if(ref?.count>=2&&Number.isFinite(ref.avgUnits?.p20)&&Number.isFinite(ref.avgUnits?.p80)){const lo=ref.avgUnits.p20,hi=ref.avgUnits.p80;if(avg>hi*1.15){score-=Math.min(15,(avg-hi)*2);notes.push(`전문 가사 구조 ${ref.count}개보다 한 줄 음절이 긴 편 — 전문 범위 약 ${lo.toFixed(1)}~${hi.toFixed(1)}음절/줄.`)}else if(avg<lo*.72){notes.push(`전문 가사 구조보다 문장이 매우 짧은 편 — 의도적 훅인지 확인하세요.`)}else notes.push(`전문 가사 구조 ${ref.count}개와 한 줄 호흡 길이가 비슷한 범위입니다.`)}else notes.push(`현재 평균 ${avg.toFixed(1)}음절/줄 · 이 템포의 권장 중심 약 ${capacity}음절/마디.`);notes.push('의미 강세가 있는 단어를 강박·긴 음표에 두고, 조사·접속어는 약박이나 짧은 음표로 배치합니다.');score=Math.max(0,Math.round(score));return{score,summary:`가사 가창성 ${score}점${ref?.count?` · 전문 가사 구조 ${ref.count}개 참고`:''}`,notes}}
function proCompositionAdvice(p=activeProfile(),names=[...selected],lyrics=$('#lyrics')?.value||''){const mask=arrangementMaskingAssessment(names,p.vocal),lyric=lyricSingabilityAssessment(lyrics,p),lp=learnedProfileFor(p),ref=lp?`전문 기준 ${lp.count}곡 참고`:'전문 기준곡 추가 필요';return{mask,lyric,ref,text:`${ref}\n🎙 보컬/악기 공간: ${mask.label} · 마스킹 위험 ${Math.round(mask.risk*100)}%\n${mask.notes.slice(0,2).join('\n')}\n✍ ${lyric.summary}${lyric.notes.length?'\n'+lyric.notes.slice(0,2).join('\n'):''}`}}
function renderProCompositionCoach(p=null,lyrics=null){const el=$('#proCompositionCoach');if(!el)return;try{const profile=p||activeProfile(),a=proCompositionAdvice(profile,[...selected],lyrics==null?($('#lyrics')?.value||''):lyrics);el.textContent=a.text;el.classList.toggle('learning-profile-warn',a.mask.risk>.58);el.classList.toggle('learning-profile-good',a.mask.risk<=.32&&readLearningMemory().items.length>=2)}catch(e){el.textContent='전문 기준곡을 추가하면 가사 가창성·보컬 명료도·악기 마스킹을 함께 검사합니다.'}}
function currentStoryText(){return `${$('#story')?.value||''} ${[...chosenWords].join(' ')} ${$('#customWords')?.value||''} ${$('#hookLine')?.value||''}`.trim()}
function readRecentTitles(){try{const x=JSON.parse(localStorage.getItem(RECENT_TITLE_KEY)||'[]');return Array.isArray(x)?x.filter(Boolean).slice(0,20):[]}catch(e){return[]}}
function rememberTitle(title){const t=String(title||'').trim();if(!t)return;try{const out=[t,...readRecentTitles().filter(x=>x!==t)].slice(0,20);localStorage.setItem(RECENT_TITLE_KEY,JSON.stringify(out))}catch(e){}}
function dynamicTitleIdeas(){const pool=uniqueStoryPool(6).map(cleanWord).filter(Boolean),short=pool.filter(x=>lyricChars(x)>=2&&lyricChars(x)<=8).slice(0,4),out=[];for(const w of short){out.push(`${w}의 하루`,`${w}이 머문 자리`,`${w}을 따라`)}return out}
function buildTitleCandidates(p=lastProfile,advance=false){if(advance)titleCandidateRound++;const english=$('#language')?.value==='English',key=profileKey(p),base=[...(english?(EN_TITLE_BANKS[key]||EN_TITLE_BANKS.generic):(TITLE_BANKS[key]||TITLE_BANKS.generic))];if(!english)base.push(...dynamicTitleIdeas());const recent=new Set(readRecentTitles()),current=$('#title')?.value.trim(),pool=[...new Set(base)].filter(Boolean),fresh=pool.filter(x=>!recent.has(x)&&(!advance||x!==current)),source=fresh.length>=6?fresh:pool.filter(x=>!advance||x!==current),seed=storySeed(`${currentStoryText()}|${p.genre}|${p.mood}|title|${titleCandidateRound}`);titleCandidates=stablePick(source,Math.min(6,source.length),seed);renderTitleCandidates();return titleCandidates}
function renderTitleCandidates(){const el=$('#titleCandidates');if(!el)return;const current=$('#title')?.value.trim();el.innerHTML=titleCandidates.length?titleCandidates.map((t,i)=>`<button class="lyric-candidate ${t===current?'active':''}" data-title-choice="${i}"><b>${i+1}. ${esc(t)}</b><span>눌러서 이 제목 선택</span></button>`).join(''):'<p>이야기를 분석하면 제목 후보가 표시됩니다.</p>';$$('[data-title-choice]').forEach(b=>b.onclick=()=>chooseTitleCandidate(Number(b.dataset.titleChoice)))}
function chooseTitleCandidate(index){const t=titleCandidates[index];if(!t)return;$('#title').value=t;titleLockedByUser=true;rememberTitle(t);renderTitleCandidates();toast(`제목 선택: ${t}`)}
function refreshTitleCandidates(){const p=activeProfile();buildTitleCandidates(p,true);toast('다른 제목 후보를 새로 만들었습니다. 마음에 드는 제목을 눌러 주세요')}
function refreshInstrumentCandidates(){const p=activeProfile();buildInstrumentCandidates(p,true);toast('다른 악기 조합 4개를 만들었습니다. 하나를 눌러 선택해 주세요')}
function renderInstrumentCandidates(){const el=$('#instrumentCandidates');if(!el)return;const selectedKey=instrumentCandidateKey([...selected]);el.innerHTML=instrumentCandidates.length?instrumentCandidates.map((x,i)=>`<button class="lyric-candidate ${instrumentCandidateKey(x.combo)===selectedKey?'active':''}" data-instrument-choice="${i}"><b>${i===0?'추천 1':'추천 '+(i+1)}</b><span>${esc(x.combo.join(' + '))}</span></button>`).join(''):'<p>이야기를 분석하면 악기 조합 후보가 표시됩니다.</p>';$$('[data-instrument-choice]').forEach(b=>b.onclick=()=>chooseInstrumentCandidate(Number(b.dataset.instrumentChoice)))}
function chooseInstrumentCandidate(index,silent=false){const x=instrumentCandidates[index];if(!x)return;selected=new Set(x.combo);manualInstrumentSelection=true;lastProfile={...activeProfile(),traditional:[...x.traditional],modern:[...x.modern]};renderInstruments();renderInstrumentCandidates();updateInfo();if(!silent)toast(`악기 조합 ${index+1}번을 선택했습니다`)}
function activeProfile(){
 const custom=$('#customWords')?.value||'',hook=$('#hookLine')?.value||'',clues=[...chosenWords].join(' '),storyText=`${$('#story').value.trim()} ${clues} ${custom} ${hook}`;
 const p=detectProfile(storyText);
 const mood=$('#mood').value,genre=$('#genre').value,vocal=$('#vocal').value,speed=$('#speed').value;
 if(mood!=='auto')p.mood=mood;if(genre!=='auto'){p.genre=genre;const g=genrePreset(genre);p.arrange=g.arrange;if(speed==='auto'){p.bpm=g.bpm;p.meter=g.meter}}if(vocal!=='auto')p.vocal=vocal;
 if(speed!=='auto'){p.bpm=speedBpm[speed];if(speed==='slow'&&p.meter==='4/4')p.meter='6/8'}
 const learned=applyLearnedTasteToProfile(p);Object.assign(p,learned);p.traditional=recommendTraditionalInstruments(p,storyText);p.modern=reorderWithLearning(recommendModernInstruments(p,storyText),p);
 return p;
}


function instrumentCandidateKey(combo){return [...combo].sort().join('|')}
function buildInstrumentCandidates(p=lastProfile,advance=false){if(advance)instrumentCandidateRound++;const text=currentStoryText(),out=[],seen=new Set();for(let attempt=0;attempt<28&&out.length<4;attempt++){const salt=instrumentCandidateRound*31+attempt,traditional0=recommendTraditionalInstruments(p,text,salt),modern0=reorderWithLearning(recommendModernInstruments(p,text,salt),p),learned=learnedPreferredInstrumentNames(p,2),raw=[...new Set([...traditional0,...learned,...modern0])].filter(n=>allInstrumentNames().includes(n)).slice(0,8),combo=spaceInstrumentComboForVocal(raw,p).slice(0,6),traditional=traditional0.filter(n=>combo.includes(n)),modern=[...new Set([...learned,...modern0])].filter(n=>combo.includes(n)),key=instrumentCandidateKey(combo);if(combo.length&&!seen.has(key)){seen.add(key);out.push({traditional,modern,combo})}}instrumentCandidates=out;renderInstrumentCandidates();return out}

function analyze(){
 const story=$('#story').value.trim();if(!story){toast('노래 이야기를 먼저 입력해 주세요');$('#story').focus();return null}
 lastProfile=activeProfile();const traditional=lastProfile.traditional||recommendTraditionalInstruments(lastProfile,story),shown=manualInstrumentSelection&&selected.size?[...selected]:traditional.concat(lastProfile.modern);
 $('#analysisResult').textContent=`이야기 해석: ${lastProfile.mood}
장르: ${lastProfile.genre}
빠르기·박자: ${lastProfile.bpm} BPM · ${lastProfile.meter}
조성: ${lastProfile.key}
보컬: ${lastProfile.vocal}
현재/추천 조합: ${shown.join(', ')}
편곡 방향: ${lastProfile.arrange}
전문 기준: ${learningIsEnabled()?learningSummaryText(readLearningMemory()).split('\n')[0]:'반영 꺼짐'}`;
 renderProCompositionCoach(lastProfile);buildTitleCandidates(lastProfile,false);buildInstrumentCandidates(lastProfile,false);updateInfo();toast('제목 후보와 악기 조합 후보까지 새로 추천했습니다');return lastProfile;
}
function masterSampleLevel(){return Math.max(.7,Math.min(2.2,Number($('#masterSampleVolume')?.value||175)/100))}
function setSampleStatus(text,state=''){const el=$('#sampleStatus');if(!el)return;el.textContent=text;el.dataset.state=state}
function eqBandNode(c,freq,index){const n=c.createBiquadFilter();n.type=index===0?'lowshelf':index===MIXER_EQ_FREQS.length-1?'highshelf':'peaking';n.frequency.value=freq;n.Q.value=(index===0||index===MIXER_EQ_FREQS.length-1)?.72:1.05;return n}
function connectEqChain(c,input,state,kind='backing'){const nodes=MIXER_EQ_FREQS.map((f,i)=>eqBandNode(c,f,i));let tail=input;nodes.forEach((n,i)=>{n.gain.value=Number(state.bands[i]||0);tail.connect(n);tail=n});const gain=c.createGain();gain.gain.value=Math.max(0,Math.min(1.5,Number(state.volume||100)/100));tail.connect(gain);if(kind==='backing'){sampleEqNodes=nodes;sampleMixerGain=gain}else{sourceLiveEqNodes=nodes;sourceLiveMixerGain=gain}return gain}
function auto64GainAt(freq,bands){if(!bands?.length)return 0;const x=Math.log(freq),logs=AUTO64_FREQS.map(Math.log);if(x<=logs[0])return Number(bands[0]||0);if(x>=logs[logs.length-1])return Number(bands[bands.length-1]||0);let hi=1;while(hi<logs.length&&logs[hi]<x)hi++;const lo=hi-1,t=(x-logs[lo])/(logs[hi]-logs[lo]);return(Number(bands[lo]||0)*(1-t)+Number(bands[hi]||0)*t)}
function auto64Node(c,freq,index,total){const n=c.createBiquadFilter();n.type=index===0?'lowshelf':index===total-1?'highshelf':'peaking';n.frequency.value=freq;n.Q.value=(index===0||index===total-1)?.72:1.12;return n}
function connectAuto64Chain(c,input,kind='backing'){const bands=kind==='backing'?auto64State.backingBands:auto64State.sourceBands,nodes=AUTO64_APPLY_FREQS.map((f,i)=>auto64Node(c,f,i,AUTO64_APPLY_FREQS.length));let tail=input;nodes.forEach((n,i)=>{n.gain.value=auto64State.ready?auto64GainAt(AUTO64_APPLY_FREQS[i],bands):0;tail.connect(n);tail=n});const gain=c.createGain();const base=kind==='backing'?(auto64ReferenceMixActive?auto64State.backingVolume:.86):auto64State.sourceVolume;gain.gain.value=auto64State.ready?base:1;tail.connect(gain);if(kind==='backing'){auto64BackingNodes=nodes;auto64BackingGain=gain}else{auto64SourceNodes=nodes;auto64SourceGain=gain}return gain}
function refreshAuto64Audio(){if(!ctx)return;const now=ctx.currentTime;if(auto64BackingNodes.length)auto64BackingNodes.forEach((n,i)=>n.gain.setTargetAtTime(auto64State.ready?auto64GainAt(AUTO64_APPLY_FREQS[i],auto64State.backingBands):0,now,.04));if(auto64SourceNodes.length)auto64SourceNodes.forEach((n,i)=>n.gain.setTargetAtTime(auto64State.ready?auto64GainAt(AUTO64_APPLY_FREQS[i],auto64State.sourceBands):0,now,.04));if(auto64BackingGain)auto64BackingGain.gain.setTargetAtTime(auto64State.ready?(auto64ReferenceMixActive?auto64State.backingVolume:.86):1,now,.06);if(auto64SourceGain)auto64SourceGain.gain.setTargetAtTime(auto64State.ready?auto64State.sourceVolume:1,now,.06)}
function applyMixerEqAudio(){if(ctx&&sampleEqNodes.length){mixerEqState.backing.bands.forEach((v,i)=>sampleEqNodes[i]?.gain.setTargetAtTime(Number(v)||0,ctx.currentTime,.025));sampleMixerGain?.gain.setTargetAtTime(Math.max(0,Math.min(1.5,mixerEqState.backing.volume/100)),ctx.currentTime,.025)}if(ctx&&sourceLiveEqNodes.length){mixerEqState.source.bands.forEach((v,i)=>sourceLiveEqNodes[i]?.gain.setTargetAtTime(Number(v)||0,ctx.currentTime,.025));sourceLiveMixerGain?.gain.setTargetAtTime(sourceLiveBaseGain*Math.max(0,Math.min(1.5,mixerEqState.source.volume/100)),ctx.currentTime,.025)}refreshAuto64Audio()}
function audio(){if(ctx)return ctx;ctx=new(window.AudioContext||window.webkitAudioContext)();sampleBus=ctx.createGain();sampleLimiter=ctx.createDynamicsCompressor();sampleBus.gain.value=masterSampleLevel();sampleLimiter.threshold.value=-1.0;sampleLimiter.knee.value=2;sampleLimiter.ratio.value=5;sampleLimiter.attack.value=.002;sampleLimiter.release.value=.12;const autoOut=connectAuto64Chain(ctx,sampleBus,'backing'),out=connectEqChain(ctx,autoOut,mixerEqState.backing,'backing');out.connect(sampleLimiter).connect(ctx.destination);return ctx}
function sampleDestination(){audio();return sampleBus||ctx.destination}
function updateMasterSampleVolume(){const level=masterSampleLevel(),label=$('#masterSampleValue');if(label)label.textContent=Math.round(level*100)+'%';if(sampleBus&&ctx)sampleBus.gain.setTargetAtTime(level,ctx.currentTime,.02);try{localStorage.setItem('maru_sample_master_v7',String(Math.round(level*100)))}catch(e){}}
function restoreMasterSampleVolume(){let value=175;try{const stored=Number(localStorage.getItem('maru_sample_master_v7'));if(stored>=70&&stored<=220)value=stored}catch(e){}if($('#masterSampleVolume'))$('#masterSampleVolume').value=String(value);updateMasterSampleVolume()}

const TIMBRE_VARIANTS={'가야금':{bright:1.25,decay:.72,harmonic:2.02},'고쟁':{bright:1.05,decay:1.05,harmonic:2.5},'고토':{bright:1.38,decay:.48,harmonic:3.01},'샤미센':{bright:1.65,decay:.32,harmonic:2.96},'시타르':{bright:1.7,decay:1.2,harmonic:2.01},'우드':{bright:.78,decay:.55,harmonic:1.5},'비파':{bright:1.45,decay:.46,harmonic:2.7},'코라':{bright:1.1,decay:.8,harmonic:2},'차랑고':{bright:1.58,decay:.42,harmonic:2.04},'대금':{bright:.72,breath:.25,vibrato:4.7},'샤쿠하치':{bright:.5,breath:.42,vibrato:3.8},'디즈':{bright:1.28,breath:.14,vibrato:5.8},'케나':{bright:.82,breath:.3,vibrato:4.2},'팬플루트':{bright:.58,breath:.36,vibrato:3.4},'해금':{bright:1.12,vibrato:5.4},'얼후':{bright:.92,vibrato:4.9},'바이올린':{bright:1.35,vibrato:5.8},'첼로':{bright:.62,vibrato:4.2},'바이올린 섹션':{bright:1.18,vibrato:5.2},'첼로 섹션':{bright:.55,vibrato:4},'피아노':{bright:1,decay:1},'그랜드 피아노':{bright:1.18,decay:1.35},'전자피아노':{bright:.62,decay:1.4},'어쿠스틱 기타':{bright:1.15,decay:.75},'일렉 기타':{bright:1.45,decay:1.05},'베이스 기타':{bright:.55,decay:1.2},'808 베이스':{bright:.35,decay:1.7},'전자 패드':{bright:.45,decay:2},'합창 패드':{bright:.7,decay:2.2}};
function noiseSource(c,t,dur,amount,destination){const length=Math.max(1,Math.floor(c.sampleRate*dur)),buffer=c.createBuffer(1,length,c.sampleRate),data=buffer.getChannelData(0);for(let i=0;i<length;i++)data[i]=(Math.random()*2-1)*amount;const source=c.createBufferSource(),filter=c.createBiquadFilter();source.buffer=buffer;filter.type='bandpass';filter.frequency.value=2400;filter.Q.value=.7;source.connect(filter).connect(destination);source.start(t);source.stop(t+dur)}
function instrumentTone(name,freq=440,when=0,dur=.55,vol=.1){
 const c=audio(),t=c.currentTime+when,type=findInstrument(name)[2],v=TIMBRE_VARIANTS[name]||{},master=c.createGain(),filter=c.createBiquadFilter(),bright=v.bright||1,decay=Math.max(.08,dur*(v.decay||1));filter.type='lowpass';filter.frequency.setValueAtTime(Math.max(240,Math.min(7200,2200*bright)),t);filter.Q.value=type==='pluck'?1.8:.7;filter.connect(master).connect(sampleDestination());
 const addOsc=(wave,ratio=1,level=1,detune=0)=>{const o=c.createOscillator(),g=c.createGain();o.type=wave;o.frequency.setValueAtTime(freq*ratio,t);o.detune.value=detune;g.gain.value=level;o.connect(g).connect(filter);o.start(t);o.stop(t+Math.max(dur,decay)+.08);return o};
 if(type==='drum'){const kick=addOsc('sine',.5,1);kick.frequency.exponentialRampToValueAtTime(Math.max(38,freq*.18),t+.16);noiseSource(c,t,.16,.8,filter)}
 else if(type==='pluck'){addOsc('triangle',1,1);addOsc('sine',v.harmonic||2,.32);addOsc('sine',3.01,.12)}
 else if(type==='piano'){addOsc(name==='전자피아노'?'sine':'triangle',1,1);addOsc('sine',2,.28);addOsc('sine',3,.1)}
 else if(type==='guitar'){addOsc('sawtooth',1,.62);addOsc('triangle',2,.25);addOsc('sine',.5,.2)}
 else if(type==='bass'){addOsc('sine',1,1);addOsc(name==='808 베이스'?'sine':'square',2,.14)}
 else if(type==='flute'){const main=addOsc('sine',1,1),vib=c.createOscillator(),vg=c.createGain();vib.frequency.value=v.vibrato||4.5;vg.gain.value=freq*.008;vib.connect(vg).connect(main.frequency);vib.start(t);vib.stop(t+dur+.08);addOsc('sine',2,.08);noiseSource(c,t,dur+.03,v.breath||.2,filter)}
 else if(type==='bow'){const main=addOsc('sawtooth',1,.72),vib=c.createOscillator(),vg=c.createGain();addOsc('triangle',1.002,.42,4);vib.frequency.value=v.vibrato||5;vg.gain.value=freq*.012;vib.connect(vg).connect(main.frequency);vib.start(t);vib.stop(t+dur+.08)}
 else if(type==='bell'){[1,2.01,3.98,6.02].forEach((r,i)=>addOsc('sine',r,1/(i+1)))}
 else if(type==='pad'){addOsc('sine',1,.75,-7);addOsc('triangle',1.005,.45,7);addOsc('sine',.5,.25)}
 else if(type==='sax'){addOsc('square',1,.28);addOsc('sawtooth',1,.55);addOsc('sine',2,.18)}
 else if(type==='brass'){addOsc('sawtooth',1,.72);addOsc('square',.5,.18);addOsc('sine',2,.12)}
 else {addOsc('sawtooth',1,.65,-5);addOsc('square',1.005,.3,5)}
 const struck=['pluck','drum','piano','guitar','bell','bass'].includes(type);master.gain.setValueAtTime(.0001,t);master.gain.exponentialRampToValueAtTime(vol,t+(struck?.004:.065));if(!struck)master.gain.setValueAtTime(vol,Math.max(t+.07,t+dur*.72));master.gain.exponentialRampToValueAtTime(.0001,t+Math.max(.09,decay));
}
function tone(type,freq=440,when=0,dur=.55,vol=.1){const fallback={pluck:'가야금',bow:'해금',flute:'대금',bell:'칼림바',drum:'드럼 세트',piano:'피아노',guitar:'일렉 기타',bass:'베이스 기타',synth:'신시사이저',pad:'전자 패드',sax:'색소폰',brass:'트럼펫'};instrumentTone(fallback[type]||'피아노',freq,when,dur,vol)}
const AUDITION_BASE_MIDI={
 '가야금':55,'고쟁':55,'고토':55,'샤미센':55,'시타르':55,'비파':60,'우드':50,'카눈':52,'하프':60,'코라':52,'차랑고':60,'어쿠스틱 기타':52,'일렉 기타':57,
 '대금':62,'디즈':69,'샤쿠하치':60,'반수리':64,'네이':62,'플루트':67,'케나':67,'팬플루트':67,
 '해금':62,'얼후':62,'바이올린':67,'첼로':48,'바이올린 섹션':62,'비올라':60,'첼로 섹션':48,
 '피아노':48,'그랜드 피아노':48,'전자피아노':60,'베이스 기타':40,'808 베이스':36,'콘트라베이스':36,
 '색소폰':55,'트럼펫':60,'프렌치 호른':48,'칼림바':60,'발라폰':60,'신시사이저':60,'EDM 신스':60,'전자 패드':48,'합창 패드':48
};
const FAMOUS_SOLOS={
 "가야금":{title:"아리랑 (전통)",bpm:78,base:57,seq:[[0,1],[2,0.5],[4,0.5],[7,1],[4,1],[2,0.5],[0,0.5],[-3,1],[0,1],[2,0.5],[4,0.5],[2,1],[0,1]]},
 "대금":{title:"청성곡 (전통 정악)",bpm:62,base:67,seq:[[0,1.5],[2,0.5],[5,1],[7,1.5],[5,0.5],[2,1],[0,1.5],[-2,0.5],[0,2]]},
 "해금":{title:"해금산조 자진모리 (전통)",bpm:96,base:62,seq:[[0,0.5],[3,0.5],[5,0.5],[7,0.5],[5,0.5],[3,0.5],[0,1],[-2,0.5],[0,0.5],[3,0.5],[5,0.5],[3,0.5],[0,1]]},
 "장구":{title:"굿거리장단 (전통)",bpm:84,base:60,seq:[[0,0.5,0.12],[0,0.5,0.09],[0,1,0.12],[0,0.5,0.1],[0,0.5,0.09],[0,1,0.13],[0,0.5,0.1],[0,0.5,0.09],[0,1,0.12]]},
 "고쟁":{title:"고산유수 高山流水 (전통)",bpm:88,base:57,seq:[[0,0.5],[4,0.5],[7,0.5],[9,0.5],[12,1],[9,0.5],[7,0.5],[4,0.5],[2,0.5],[4,0.5],[7,0.5],[4,0.5],[0,1]]},
 "얼후":{title:"이천영월 二泉映月",bpm:66,base:62,seq:[[0,1],[2,0.5],[3,1],[5,0.5],[7,1.5],[5,0.5],[3,1],[2,0.5],[0,1.5],[-2,0.5],[0,1]]},
 "비파":{title:"십면매복 十面埋伏 (전통)",bpm:116,base:60,seq:[[0,0.25],[7,0.25],[12,0.25],[7,0.25],[5,0.25],[9,0.25],[12,0.25],[9,0.25],[7,0.5],[5,0.25],[3,0.25],[0,0.5],[7,0.25],[12,0.25],[15,0.5]]},
 "디즈":{title:"자고비 鷓鴣飛 (전통)",bpm:104,base:69,seq:[[0,0.5],[2,0.25],[4,0.25],[7,0.5],[9,0.5],[7,0.25],[4,0.25],[2,0.5],[0,0.5],[2,0.25],[4,0.25],[2,0.5],[0,1]]},
 "고토":{title:"사쿠라 사쿠라 (전통)",bpm:72,base:60,seq:[[0,0.75],[0,0.25],[2,1],[0,0.75],[0,0.25],[2,1],[0,0.5],[2,0.5],[3,0.5],[2,0.5],[0,0.5],[2,0.5],[0,1],[-2,1]]},
 "샤미센":{title:"쓰가루 종가라부시 (전통)",bpm:118,base:57,seq:[[0,0.25],[0,0.25],[7,0.5],[5,0.25],[3,0.25],[0,0.5],[7,0.25],[10,0.25],[12,0.5],[10,0.25],[7,0.25],[5,0.5],[3,0.25],[0,0.75]]},
 "샤쿠하치":{title:"혼시라베 本調 (전통 혼쿄쿠)",bpm:54,base:60,seq:[[0,2],[3,1],[5,1.5],[3,0.5],[0,2],[-2,1],[0,2]]},
 "타이코":{title:"미야케 타이코 (전통)",bpm:104,base:60,seq:[[0,0.5,0.13],[0,0.5,0.1],[0,0.25,0.12],[0,0.25,0.12],[0,0.5,0.14],[0,1,0.11],[0,0.5,0.14],[0,0.25,0.12],[0,0.25,0.12],[0,0.5,0.14]]},
 "시타르":{title:"라가 야만 (전통)",bpm:78,base:57,seq:[[0,1],[2,0.5],[6,0.5],[7,1],[11,0.5],[12,1],[11,0.5],[7,0.5],[6,0.5],[2,1],[0,1]]},
 "타블라":{title:"틴탈 카이다 (전통)",bpm:96,base:60,seq:[[0,0.25,0.12],[0,0.25,0.09],[0,0.25,0.11],[0,0.25,0.09],[0,0.5,0.13],[0,0.5,0.1],[0,0.25,0.12],[0,0.25,0.1],[0,0.5,0.13],[0,0.5,0.1],[0,1,0.12]]},
 "반수리":{title:"라가 부팔리 (전통)",bpm:72,base:64,seq:[[0,1],[2,0.5],[4,0.5],[7,1],[9,1],[12,1],[9,0.5],[7,0.5],[4,0.5],[2,0.5],[0,1.5]]},
 "탄푸라":{title:"라가 야만 탄푸라 드론 (전통)",bpm:60,base:48,seq:[[[0,7],2,0.08],[[0,12],2,0.08],[[0,7],2,0.08],[[0,12],2,0.08]]},
 "우드":{title:"라스트 탁심 (전통)",bpm:76,base:52,seq:[[0,0.75],[1,0.25],[4,0.5],[5,0.5],[7,1],[5,0.5],[4,0.5],[1,0.5],[0,1],[-2,0.5],[0,1]]},
 "카눈":{title:"바야티 사마이 (전통)",bpm:88,base:57,seq:[[0,0.5],[1,0.5],[4,0.5],[5,0.5],[7,1],[8,0.5],[7,0.5],[5,0.5],[4,0.5],[1,0.5],[0,1]]},
 "네이":{title:"라스트 탁심 (전통)",bpm:68,base:62,seq:[[0,1.25],[1,0.25],[4,0.75],[5,0.75],[7,1.25],[5,0.5],[4,0.75],[1,0.5],[0,1.5]]},
 "다르부카":{title:"막숨 리듬 (전통)",bpm:104,base:60,seq:[[0,0.5,0.13],[0,0.25,0.08],[0,0.25,0.1],[0,0.5,0.12],[0,0.5,0.09],[0,0.25,0.08],[0,0.25,0.1],[0,0.5,0.13],[0,0.5,0.1]]},
 "바이올린":{title:"바흐 무반주 파르티타 3번 프렐류드",bpm:116,base:67,seq:[[0,0.25],[4,0.25],[7,0.25],[12,0.25],[11,0.25],[9,0.25],[7,0.25],[5,0.25],[4,0.25],[2,0.25],[0,0.5],[7,0.25],[12,0.25],[16,0.5]]},
 "첼로":{title:"바흐 무반주 첼로 모음곡 1번 프렐류드",bpm:92,base:43,seq:[[0,0.25],[7,0.25],[4,0.25],[2,0.25],[4,0.25],[7,0.25],[4,0.25],[7,0.25],[12,0.25],[7,0.25],[4,0.25],[7,0.25],[2,0.25],[7,0.25],[4,0.25],[7,0.5]]},
 "하프":{title:"헨델 하프 협주곡 Op.4 No.6",bpm:92,base:60,seq:[[0,0.5],[4,0.5],[7,0.5],[12,0.5],[11,0.5],[9,0.5],[7,0.5],[4,0.5],[5,0.5],[9,0.5],[12,1],[7,1]]},
 "플루트":{title:"바흐 관현악 모음곡 2번 바디네리",bpm:132,base:72,seq:[[0,0.25],[2,0.25],[4,0.25],[5,0.25],[7,0.25],[9,0.25],[11,0.25],[12,0.25],[11,0.25],[9,0.25],[7,0.25],[5,0.25],[4,0.25],[2,0.25],[0,0.5]]},
 "코라":{title:"켈레파 바 Kelefa Ba (전통)",bpm:90,base:55,seq:[[0,0.5],[7,0.5],[4,0.5],[9,0.5],[7,0.5],[12,0.5],[9,0.5],[7,0.5],[4,0.5],[2,0.5],[0,1],[7,1]]},
 "젬베":{title:"쿠쿠 Kuku 리듬 (전통)",bpm:112,base:60,seq:[[0,0.25,0.13],[0,0.25,0.1],[0,0.5,0.12],[0,0.25,0.1],[0,0.25,0.12],[0,0.5,0.13],[0,0.25,0.11],[0,0.25,0.1],[0,0.5,0.13],[0,0.5,0.11]]},
 "칼림바":{title:"느헤마무사사 Nhemamusasa (전통)",bpm:96,base:60,seq:[[0,0.5],[7,0.5],[4,0.5],[9,0.5],[7,0.5],[11,0.5],[9,0.5],[4,0.5],[2,0.5],[7,0.5],[4,0.5],[0,0.5],[7,1]]},
 "발라폰":{title:"순자타 파사 Sunjata Fasa (전통)",bpm:104,base:60,seq:[[0,0.5],[4,0.5],[7,0.5],[9,0.5],[7,0.5],[4,0.5],[2,0.5],[0,0.5],[4,0.5],[7,0.5],[12,0.5],[9,0.5],[7,1]]},
 "차랑고":{title:"엘 콘도르 파사 El Cóndor Pasa",bpm:82,base:60,seq:[[0,0.5],[2,0.5],[3,1],[7,1],[8,0.5],[7,0.5],[5,1],[3,0.5],[2,0.5],[0,1],[-2,1]]},
 "케나":{title:"카르나발리토 Carnavalito (전통)",bpm:108,base:67,seq:[[0,0.5],[3,0.5],[5,0.5],[7,0.5],[5,0.5],[3,0.5],[0,0.5],[-2,0.5],[0,0.5],[3,0.5],[5,0.5],[7,1]]},
 "팬플루트":{title:"엘 콘도르 파사 El Cóndor Pasa",bpm:78,base:67,seq:[[0,0.75],[2,0.25],[3,1],[7,1.5],[8,0.5],[7,0.5],[5,1],[3,0.5],[2,0.5],[0,1.5]]},
 "봄보":{title:"카르나발리토 봄보 리듬 (전통)",bpm:108,base:60,seq:[[0,0.5,0.13],[0,0.5,0.1],[0,1,0.13],[0,0.5,0.11],[0,0.5,0.1],[0,1,0.14],[0,0.5,0.11],[0,0.5,0.1]]},
 "피아노":{title:"베토벤 엘리제를 위하여",bpm:118,base:76,seq:[[0,0.25],[-1,0.25],[0,0.25],[-1,0.25],[0,0.25],[-5,0.25],[-3,0.25],[-7,0.5],[-12,0.5],[-5,0.25],[-8,0.25],[-12,0.5],[-7,0.5],[-3,0.5],[-5,1]]},
 "전자피아노":{title:"스콧 조플린 The Entertainer",bpm:104,base:60,seq:[[0,0.25],[4,0.25],[7,0.5],[9,0.25],[8,0.25],[7,0.5],[4,0.25],[0,0.25],[2,0.25],[4,0.25],[5,0.5],[4,0.25],[2,0.25],[0,0.5]]},
 "어쿠스틱 기타":{title:"스페인 로망스 Romance Anónimo",bpm:88,base:64,seq:[[0,0.33],[7,0.33],[12,0.33],[-1,0.33],[7,0.33],[11,0.33],[-2,0.33],[7,0.33],[10,0.33],[-3,0.33],[5,0.33],[9,0.33],[-5,0.33],[4,0.33],[7,0.66]]},
 "일렉 기타":{title:"바흐 Bourrée in E minor",bpm:104,base:64,seq:[[0,0.5],[2,0.5],[3,0.5],[5,0.5],[7,0.5],[3,0.5],[5,0.5],[2,0.5],[3,0.5],[0,0.5],[-2,0.5],[-4,0.5],[0,1]]},
 "베이스 기타":{title:"생상 동물의 사육제 - 코끼리",bpm:84,base:40,seq:[[0,1],[7,0.5],[5,0.5],[3,1],[0,1],[-2,0.5],[-4,0.5],[-5,1],[0,1]]},
 "드럼 세트":{title:"When the Saints Go Marching In 드럼 솔로 스타일",bpm:116,base:60,seq:[[0,0.25,0.11],[0,0.25,0.08],[0,0.25,0.1],[0,0.25,0.09],[0,0.5,0.13],[0,0.25,0.09],[0,0.25,0.1],[0,0.5,0.12],[0,0.5,0.1],[0,1,0.13]]},
 "신시사이저":{title:"바흐 토카타와 푸가 D단조",bpm:100,base:60,seq:[[0,0.5],[0,0.5],[7,0.75],[5,0.25],[3,0.5],[2,0.5],[0,1],[-2,0.5],[-5,0.5],[-7,1],[0,1]]},
 "전자 패드":{title:"파헬벨 캐논",bpm:82,base:48,seq:[[[0,4,7],1.5,0.07],[[7,11,14],1.5,0.07],[[9,12,16],1.5,0.07],[[4,7,11],1.5,0.07],[[5,9,12],1.5,0.07],[[0,4,7],1.5,0.07]]},
 "색소폰":{title:"글라주노프 알토 색소폰 협주곡",bpm:88,base:60,seq:[[0,0.75],[2,0.25],[4,0.5],[5,0.5],[7,1],[9,0.5],[7,0.5],[5,0.5],[4,0.5],[2,0.5],[0,1]]},
 "트럼펫":{title:"하이든 트럼펫 협주곡",bpm:112,base:64,seq:[[0,0.5],[4,0.5],[7,0.5],[12,1],[11,0.5],[9,0.5],[7,0.5],[4,0.5],[5,0.5],[7,0.5],[4,1],[0,1]]},
 "808 베이스":{title:"Dies Irae 중세 선율 - 808 베이스",bpm:76,base:36,seq:[[0,1],[-1,0.5],[0,0.5],[-2,1],[-1,0.5],[-3,0.5],[-2,1],[0,1],[-1,1]]},
 "EDM 신스":{title:"베토벤 교향곡 5번 모티프 - 신스",bpm:126,base:60,seq:[[3,0.25],[3,0.25],[3,0.25],[0,0.75],[2,0.25],[2,0.25],[2,0.25],[-1,0.75],[3,0.25],[3,0.25],[3,0.25],[0,0.75]]},
 "그랜드 피아노":{title:"쇼팽 녹턴 Op.9 No.2",bpm:74,base:60,seq:[[7,0.75],[9,0.25],[7,0.5],[4,0.5],[2,1],[4,0.5],[7,0.5],[9,1],[7,0.5],[4,0.5],[2,1],[0,1]]},
 "바이올린 섹션":{title:"비발디 사계 - 봄",bpm:112,base:64,seq:[[0,0.5],[4,0.5],[4,0.5],[2,0.5],[0,1],[-5,0.5],[-3,0.5],[0,0.5],[4,0.5],[2,0.5],[0,1]]},
 "비올라":{title:"텔레만 비올라 협주곡 G장조",bpm:92,base:55,seq:[[0,0.5],[4,0.5],[7,0.5],[5,0.5],[4,0.5],[2,0.5],[0,1],[2,0.5],[4,0.5],[7,1],[5,1]]},
 "첼로 섹션":{title:"드보르자크 신세계 교향곡 - Largo",bpm:76,base:48,seq:[[0,1],[2,0.5],[4,0.5],[7,1.5],[4,0.5],[2,1],[0,1],[-3,0.5],[0,1.5]]},
 "콘트라베이스":{title:"생상 동물의 사육제 - 코끼리",bpm:80,base:36,seq:[[0,1],[7,0.5],[5,0.5],[3,1],[0,1],[-2,0.5],[-4,0.5],[-5,1],[0,1]]},
 "프렌치 호른":{title:"모차르트 호른 협주곡 4번",bpm:104,base:53,seq:[[0,0.5],[4,0.5],[7,1],[9,0.5],[7,0.5],[5,0.5],[4,0.5],[2,0.5],[0,1],[7,1]]},
 "팀파니":{title:"베토벤 교향곡 9번 스케르초 - 팀파니",bpm:116,base:43,seq:[[0,0.5,0.13],[0,0.5,0.11],[5,0.5,0.13],[0,0.5,0.11],[5,0.5,0.14],[5,0.5,0.12],[0,1,0.13],[5,1,0.14]]},
 "합창 패드":{title:"바흐 Jesu, Joy of Man’s Desiring - 합창 패드",bpm:78,base:48,seq:[[[0,4,7],1,0.065],[[2,5,9],1,0.065],[[4,7,11],1,0.065],[[5,9,12],1,0.065],[[7,11,14],1,0.065],[[4,7,11],1,0.065],[[0,4,7],2,0.065]]}
};
function famousSoloTitle(name){return FAMOUS_SOLOS[name]?.title||'대표 청음곡'}
function midiFreq(m){return 440*Math.pow(2,(m-69)/12)}
function auditionBase(name,type){return AUDITION_BASE_MIDI[name]??(type==='bass'?40:type==='piano'?48:type==='flute'?64:type==='bow'?60:type==='brass'?55:type==='sax'?55:60)}
const AUDITION_NORMALIZE={};
function auditionBoost(name){return 1}
// V0.18.1: audition-only velocity scaling selects more natural SF2 layers while gain correction handles loudness.
const AUDITION_VELOCITY_SCALE={'해금':.88,'장구':.90,'고쟁':.92,'얼후':.88,'샤미센':.92,'반수리':.88,'바이올린':.86,'첼로':.86,'플루트':.88,'코라':.92,'팬플루트':.88,'전자피아노':.90,'드럼 세트':.95,'색소폰':.90,'프렌치 호른':.90};
function auditionVelocity(name,vol){return Math.max(.34,Math.min(.94,sampleVelocity(name,vol)*(AUDITION_VELOCITY_SCALE[name]||1)))}
function auditionPattern(name){
 const type=findInstrument(name)[2],base=auditionBase(name,type),events=[];
 const add=(m,at,dur=.55,vol=.105)=>events.push({m,at,dur,vol});
 if(SAMPLE_PROGRAMS[name]?.[0]===128){[0,.28,.56,.84,1.12,1.4,1.68,1.96].forEach((at,i)=>add(60,at,i%4===0?.42:.24,.115));return events}
 if(name==='팀파니'){[[43,0,.75],[43,.82,.38],[48,1.25,.75],[46,2.08,.42],[48,2.55,.28],[48,2.88,.28]].forEach(x=>add(...x,.12));return events}
 if(name==='타이코'){[[36,0,.45],[36,.52,.28],[43,.88,.42],[36,1.38,.28],[48,1.74,.48],[43,2.3,.3]].forEach(x=>add(...x,.115));return events}
 if(type==='pad'){[base,base+7,base+12].forEach((m,i)=>add(m,i*.035,1.35,.09));[base+5,base+12,base+16].forEach((m,i)=>add(m,1.55+i*.035,1.35,.09));return events}
 if(bowProfile(name)){[base-5,base,base+7,base+12].forEach((m,i)=>add(m,i*.86,1.02,.10));return events}
 if(type==='bow'){[base-5,base,base+7,base+12].forEach((m,i)=>add(m,i*.82,.92,.10));return events}
 if(['flute','sax','brass'].includes(type)){[base,base+5,base+9,base+12].forEach((m,i)=>add(m,i*.72,.78,.105));return events}
 if(type==='bass'){[base,base+5,base+7,base+12].forEach((m,i)=>add(m,i*.58,.62,.11));return events}
 if(['piano','pluck','guitar','bell'].includes(type)){
  [base-12,base,base+12].forEach((m,i)=>add(m,i*.56,.6,.105));
  [base,base+4,base+7,base+12].forEach((m,i)=>add(m,1.85+i*.23,.52,.105));return events
 }
 if(type==='synth'){[base,base+7,base+12].forEach((m,i)=>add(m,i*.5,.58,.1));[base,base+4,base+7].forEach((m,i)=>add(m,1.7+i*.035,1.0,.085));return events}
 [base-5,base,base+7,base+12].forEach((m,i)=>add(m,i*.62,.68,.105));return events
}
async function previewFamousSolo(name){
 stop();const c=audio();try{await c.resume()}catch(e){}const piece=FAMOUS_SOLOS[name];if(!piece)return previewInstrument(name);
 toast(`${name} · ${piece.title} 짧은 청음 구절을 준비합니다…`);try{await ensureSoundfont()}catch(e){toast('샘플을 못 불러와 합성 음색으로 재생합니다')}try{if(c.state==='suspended')await c.resume()}catch(e){}
 const type=findInstrument(name)[2],beat=60/piece.bpm;drumHitIndex[name]=0;let at=0;
 for(const step of piece.seq){const note=step[0],beats=step[1]||.5,vol=step[2]||.105,dur=Math.max(.10,beat*beats*(type==='bow'||['flute','sax','brass','pad'].includes(type)?1.02:type==='drum'?.48:.78));
  if(note!==null){const notes=Array.isArray(note)?note:[note];notes.forEach((off,i)=>playInstrument(name,midiFreq(piece.base+off),at+i*.012,dur,vol,1,auditionVelocity(name,vol)));}
  at+=beat*beats;
 }
 toast(`${name} 대표곡 · ${piece.title} · 짧은 청음용 편곡`)
}
async function previewInstrumentOne(name){
 stop();const c=audio();try{await c.resume()}catch(e){}toast('원음 1음을 준비합니다…');try{await ensureSoundfont()}catch(e){toast('샘플을 못 불러와 합성 음색으로 재생합니다')}try{if(c.state==='suspended')await c.resume()}catch(e){}
 const type=findInstrument(name)[2],base=auditionBase(name,type);drumHitIndex[name]=0;const dur=SAMPLE_PROGRAMS[name]?.[0]===128?.7:(bowProfile(name)?2.15:(type==='pad'||type==='bow'||['flute','sax','brass'].includes(type)?1.45:1.15));playInstrument(name,midiFreq(base),0,dur,.14,auditionBoost(name)*1.85,Math.max(.78,auditionVelocity(name,.14)));
 toast(`${name} 원음 · 원본 SF2: ${sampleSourceName(name)} · ${sampleQualityText(name)}`)
}
async function previewInstrument(name){
 stop();const c=audio();try{await c.resume()}catch(e){}toast('실제 악기 샘플을 불러오는 중입니다…');try{await ensureSoundfont()}catch(e){toast('샘플을 못 불러와 합성 음색으로 재생합니다')}try{if(c.state==='suspended')await c.resume()}catch(e){}
 const boost=auditionBoost(name),events=auditionPattern(name);events.forEach(e=>playInstrument(name,midiFreq(e.m),e.at,e.dur,e.vol,boost,auditionVelocity(name,e.vol)));
 toast(`${name} 특징 연주 · 원본 SF2: ${sampleSourceName(name)} · ${sampleQualityText(name)}`)
}
function stop(){timers.forEach(id=>{clearTimeout(id);clearInterval(id)});timers=[];arrangementScheduleOffset=0;analyzedArrangementPlayback=false;stopSourceReference(false);if(ctx){ctx.close();ctx=null;sampleBus=null;sampleLimiter=null}$('#pulse').classList.remove('playing')}
function arrangementSectionEnergy(section){
 if(/Final Chorus/.test(section))return .98;if(/Chorus/.test(section))return .84;if(/Pre-Chorus/.test(section))return .66;if(/Bridge/.test(section))return .50;if(/Interlude/.test(section))return .58;if(/Intro/.test(section))return .32;if(/Outro/.test(section))return .26;return .43;
}
function arrangementScale(p){return p.key.includes('Minor')?[0,2,3,5,7,8,10]:[0,2,4,5,7,9,11]}
function sectionBarInfo(bar,section){let start=bar,end=bar;while(start>0&&scoreEntries[start-1]?.section===section)start--;while(end+1<scoreEntries.length&&scoreEntries[end+1]?.section===section)end++;return{index:bar-start,count:end-start+1,first:bar===start,last:bar===end,progress:(bar-start)/Math.max(1,end-start)}}
function arrangementProgression(section,p){
 const minor=p.key.includes('Minor');
 if(minor){if(/Pre-Chorus/.test(section))return[3,5,6,4];if(/Bridge/.test(section))return[5,3,0,4];if(/Intro/.test(section))return[0,5,3,4];if(/Outro/.test(section))return[5,3,4,0];return[0,5,2,6]}
 if(/Pre-Chorus/.test(section))return[1,3,0,4]; // ii-IV-I-V: 긴장을 자연스럽게 끌어올림
 if(/Bridge/.test(section))return[5,3,0,4];     // vi-IV-I-V: 대비
 if(/Intro/.test(section))return[0,3,0,4];      // I-IV-I-V
 if(/Outro/.test(section))return[3,0,4,0];      // IV-I-V-I
 return[0,4,5,3];                               // I-V-vi-IV: 모던 팝 중심
}
function scaleDegreeMidi(tonic,scale,degree){const oct=Math.floor(degree/7),idx=((degree%7)+7)%7;return tonic+scale[idx]+oct*12}
function arrangementChord(p,bar,section='Verse 1'){
 const analyzed=scoreEntries[bar]?.transcribed&&importedSongAnalysis?.barChords?.[bar]?analyzedChordObject(importedSongAnalysis.barChords[bar],bar,section,p):null;if(analyzed)return analyzed;
 const rootName=p.key.split(' ')[0],scale=arrangementScale(p),prog=arrangementProgression(section,p),info=sectionBarInfo(bar,section),degree=prog[info.index%prog.length];let tonic=KEY_ROOTS[rootName]||67;while(tonic>60)tonic-=12;while(tonic<48)tonic+=12;const root=scaleDegreeMidi(tonic,scale,degree),third=scaleDegreeMidi(tonic,scale,degree+2),fifth=scaleDegreeMidi(tonic,scale,degree+4),seventh=scaleDegreeMidi(tonic,scale,degree+6),ninth=scaleDegreeMidi(tonic,scale,degree+8);return{degree,root,tones:[root,third,fifth],color:[root,third,fifth,ninth],seventh,ninth,info};
}
function vocalClarityEnabled(){return $('#vocalClarityMode')?.checked!==false}
function autoMixBalanceEnabled(){return $('#autoMixBalance')?.checked!==false}
function arrangementAutoBalanceGain(name){
 if(!autoMixBalanceEnabled())return 1;
 const item=findInstrument(name),type=item?.[2]||'',guide=arrangementGuide([...selected]);let g=.50;
 if(name===guide)g=.62;else if(type==='bass')g=.54;else if(type==='drum')g=.54;else if(type==='piano')g=.50;else if(type==='guitar'||type==='pluck')g=.45;else if(type==='bow'||name==='바이올린 섹션'||name==='첼로 섹션')g=.34;else if(type==='pad')g=.30;else if(['flute','sax','brass','synth','bell'].includes(type))g=.36;
 if(vocalClarityEnabled())g*=.86;
 // 원곡 참고가 켜져 있어도 반주를 과도하게 이중 감쇠하지 않는다.
 if(sourceReferenceEnabled())g*=vocalClarityEnabled()?.82:.88;
 const count=Math.max(1,selected.size),crowd=Math.min(1,Math.sqrt(5/count));return g*crowd
}
function arrangementBlendGain(name){
 const ratio=Math.max(.1,Math.min(.9,Number($('#blend')?.value||50)/100)),chosen=[...selected],regional=new Set((DATA[region]||[]).map(x=>x[0])),trad=chosen.filter(n=>regional.has(n)),modern=chosen.filter(n=>!regional.has(n));if(!trad.length||!modern.length)return arrangementAutoBalanceGain(name);const share=regional.has(name)?ratio/trad.length:(1-ratio)/modern.length,normal=1/chosen.length;return Math.max(.58,Math.min(1.35,share/normal))*arrangementAutoBalanceGain(name);
}
function arrangementGuide(names){return names.includes('피아노')?'피아노':names.includes('그랜드 피아노')?'그랜드 피아노':names.find(n=>!['drum','bass','pad'].includes(findInstrument(n)[2]))||names[0]||'피아노'}
function scheduleChord(name,tones,at,dur,vol,gain=1,spread=.014){tones.forEach((m,i)=>playInstrument(name,midiFreq(m),at+i*spread,dur,vol,gain*arrangementBlendGain(name)))}
function scheduleStrum(name,tones,at,dur,vol,gain=1,up=false){const seq=up?[...tones].reverse():tones;seq.forEach((m,i)=>playInstrument(name,midiFreq(m),at+i*.018,dur,vol,gain*arrangementBlendGain(name)))}
function playDrumKey(name,midi,when,dur,vol,gainMul=1,velocity=.72){const w=Math.max(0,(Number(when)||0)+(Number(arrangementScheduleOffset)||0)),preset=samplePreset(name);if(preset){const c=audio(),end=Sfumato.startPresetNote(c,preset,midi,c.currentTime+w,{velocity:Math.max(.01,Math.min(1,velocity)),outputGain:sampleOutputGain(name)*gainMul*arrangementBlendGain(name),destination:sampleDestination()});if(typeof end==='function')end(c.currentTime+w+Math.max(.05,dur));return}instrumentTone(name,midiFreq(midi),w,dur,Math.min(.2,vol*1.7*gainMul))}
function scheduleModernPopDrums(name,section,bar,q,total,energy,g){
 const info=sectionBarInfo(bar,section),chorus=/Chorus/.test(section),final=/Final Chorus/.test(section),pre=/Pre-Chorus/.test(section),bridge=/Bridge/.test(section),intro=/Intro/.test(section),outro=/Outro/.test(section),verse=/Verse/.test(section);if(intro&&info.index<2)return;
 const hit=(m,b,v,d=.12,vel=.72)=>{if(b<total)playDrumKey(name,m,b*q,d,v,g,vel)};
 if(bridge){[0,2].forEach(b=>hit(36,b,.017*energy,.16,.60));hit(38,2,.018*energy,.13,.62);[0,1,2,3].forEach(b=>hit(42,b,.009*energy,.07,.50));return}
 if(outro){[0,2].forEach(b=>hit(36,b,.013*energy,.14,.56));hit(38,2,.014*energy,.12,.57);return}
 // closed hi-hat: 벌스는 8분음표, 프리/후렴은 조금 더 선명하게
 const hats=chorus||pre?8:verse?6:4;for(let i=0;i<hats;i++){const b=i*(total/hats);hit(42,b,(chorus?.010:.008)*energy,.06,chorus?.62:.52)}
 // kick/snare. 후렴은 킥을 넓히되 과밀하게 만들지 않음
 const kicks=chorus?[0,1.5,2,3.5]:pre?[0,2,3]:verse?(info.index%2?[0,2.5]:[0,2]):[0,2];kicks.forEach(b=>hit(36,b,.022*energy,.15,chorus?.78:.68));[1,3].forEach(b=>hit(38,b,.022*energy,.14,chorus?.80:.70));
 if((chorus||final)&&info.first)hit(49,0,.015*energy,.35,.68);
 if(info.last&&!outro){hit(45,3,.016*energy,.11,.68);hit(47,3.5,.018*energy,.11,.72)}
}
function scheduleModernPopPiano(name,chord,section,bar,q,total,energy,g){
 const {root,tones,color,info}=chord,verse=/Verse/.test(section),pre=/Pre-Chorus/.test(section),chorus=/Chorus/.test(section),final=/Final Chorus/.test(section),bridge=/Bridge/.test(section),intro=/Intro/.test(section),outro=/Outro/.test(section);const gg=g*arrangementBlendGain(name);
 if(intro||outro){const seq=[root,color[2],color[1],color[3]];seq.forEach((m,i)=>playInstrument(name,midiFreq(m),i*q,q*.78,.018*energy,gg));return}
 if(verse){const seq=[root,color[2],color[1],color[2],root+12,color[2],color[1],color[2]];seq.forEach((m,i)=>playInstrument(name,midiFreq(m),i*q*.5,q*.42,.0145*energy,gg));return}
 if(pre){const seq=[root,color[1],color[2],color[3],root+12,color[3],color[2],color[3]];seq.forEach((m,i)=>playInstrument(name,midiFreq(m),i*q*.5,q*.44,.0165*energy*(1+info.progress*.18),gg));return}
 if(bridge){scheduleChord(name,[root,tones[1],tones[2]],0,q*1.75,.018*energy,g);scheduleChord(name,[root+12,tones[1]+12],2*q,q*1.55,.014*energy,g);return}
 if(chorus){scheduleChord(name,[root,tones[1],tones[2],color[3]],0,q*1.6,.020*energy,g,.010);scheduleChord(name,[root+12,tones[1]+12,tones[2]+12],2*q,q*1.55,.017*energy*(final?1.08:1),g,.010);return}
 scheduleChord(name,tones,0,q*3.6,.016*energy,g)
}
function scheduleModernPopGuitar(name,chord,section,bar,q,total,energy,g){
 const {tones,info}=chord,verse=/Verse/.test(section),pre=/Pre-Chorus/.test(section),chorus=/Chorus/.test(section),final=/Final Chorus/.test(section),bridge=/Bridge/.test(section),intro=/Intro/.test(section),outro=/Outro/.test(section);if(intro&&info.index<2)return;if(outro&&info.index>1)return;
 if(bridge){[0,2].forEach((b,i)=>scheduleStrum(name,tones,b*q,q*1.5,.012*energy,g,i%2===1));return}
 const positions=verse?[0,1.5,2.5,3.5]:pre?[0,.5,1.5,2,2.5,3.5]:chorus?[0,.5,1,1.5,2,2.5,3,3.5]:[0,2];positions.forEach((b,i)=>scheduleStrum(name,tones,b*q,q*(chorus?.34:.52),(chorus?.0125:.0105)*energy*(i%4===0?1.15:1),g,i%2===1));if(final&&info.last)scheduleStrum(name,tones.map(x=>x+12),3.5*q,q*.35,.010*energy,g,true)
}
function scheduleModernPopBass(name,chord,nextChord,section,bar,q,total,energy,g){
 const {root,info}=chord,chorus=/Chorus/.test(section),final=/Final Chorus/.test(section),pre=/Pre-Chorus/.test(section),bridge=/Bridge/.test(section),intro=/Intro/.test(section),outro=/Outro/.test(section);let base=root-12;while(base>48)base-=12;while(base<32)base+=12;if(intro&&info.index<2)return;
 const notes=bridge?[[0,base],[2,base+7]]:chorus?[[0,base],[1,base+7],[2,base],[3,base+7]]:pre?[[0,base],[2,base+7],[3.5,(nextChord?.root||root)-12]]:[[0,base],[2,base+7]];notes.forEach(([b,m],i)=>playInstrument(name,midiFreq(m),b*q,q*(chorus?.70:.86),.018*energy*(final?1.08:1),g*arrangementBlendGain(name)));if(outro&&info.last)playInstrument(name,midiFreq(base),0,q*3.5,.016*energy,g*arrangementBlendGain(name))
}
function scheduleModernPopStrings(name,chord,section,bar,q,total,energy,g){
 const {tones,color,info}=chord,verse=/Verse/.test(section),pre=/Pre-Chorus/.test(section),chorus=/Chorus/.test(section),final=/Final Chorus/.test(section),bridge=/Bridge/.test(section),intro=/Intro/.test(section),outro=/Outro/.test(section),upper=final?12:0;if(intro&&info.index<2)return;if(verse&&info.index%2===0)return;
 if(pre){const rise=[tones[1],tones[2],color[3],tones[2]+12];rise.forEach((m,i)=>playInstrument(name,midiFreq(m+upper),i*q,q*.88,.0115*energy*(1+info.progress*.22),g*arrangementBlendGain(name)));return}
 if(bridge){playInstrument(name,midiFreq(tones[1]),0,q*3.65,.014*energy,g*arrangementBlendGain(name));if(info.index%2===1)playInstrument(name,midiFreq(tones[2]),q*2,q*1.55,.010*energy,g*arrangementBlendGain(name));return}
 if(chorus){playInstrument(name,midiFreq(tones[1]+upper),0,q*3.72,.0155*energy,g*arrangementBlendGain(name));playInstrument(name,midiFreq(tones[2]+upper),.03,q*3.66,.0135*energy,g*arrangementBlendGain(name));if(final&&info.index%2===1)playInstrument(name,midiFreq(color[3]+upper),2*q,q*1.55,.0105*energy,g*arrangementBlendGain(name));return}
 if(outro){playInstrument(name,midiFreq(tones[1]),0,q*3.5,.0105*energy,g*arrangementBlendGain(name));return}
 playInstrument(name,midiFreq(tones[1]),0,q*3.55,.010*energy,g*arrangementBlendGain(name))
}
function isModernPopArrangement(p){return p.meter==='4/4'&&/모던 팝/.test(p.genre||'')&&Number(p.bpm)>=84&&Number(p.bpm)<=112}
function analysisTempoUncertain(){return !!(importedSongAnalysis&&importedSongAnalysis.tempoConfidence<.55&&!importedSongAnalysis.tempoUserConfirmed)}
function adaptiveBarTimes(a=importedSongAnalysis){
 if(!a)return null;const t=a.tempoVerification||{},flux=t.flux||[],step=Number(t.step)||0,bpm=Number(a.bpm)||0,beats=analysisBeatsPerBar(a.meter),offset=Math.max(0,Number(a.beatOffsetSec)||0),duration=Math.max(offset+.1,Number(a.duration)||0),bars=Math.max(1,Number(a.bars)||scoreEntries.length||1),key=[a.fileName,bpm,a.meter,duration.toFixed(2),offset.toFixed(3),bars,flux.length].join('|');
 if(adaptiveBarTimingCache.key===key&&adaptiveBarTimingCache.times)return adaptiveBarTimingCache.times;
 const fixed=Array.from({length:bars+1},(_,i)=>Math.min(duration,offset+i*beats*60/Math.max(1,bpm)));if(!flux.length||!step||!bpm){adaptiveBarTimingCache={key,times:fixed,confidence:0};return fixed}
 const beatSec=60/bpm,beatCount=Math.max(beats*bars+1,Math.ceil((duration-offset)/beatSec)+1),mean=Array.from(flux).reduce((x,y)=>x+y,0)/Math.max(1,flux.length),window=Math.min(.15,beatSec*.28),maxShift=Math.min(.105,beatSec*.20),grid=[offset];let snapped=0;
 for(let n=1;n<beatCount;n++){
  const predicted=grid[n-1]+beatSec;if(predicted>=duration+.2){grid.push(predicted);continue}const lo=Math.max(1,Math.floor((predicted-window)/step)),hi=Math.min(flux.length-2,Math.ceil((predicted+window)/step));let bestI=-1,bestScore=-1;
  for(let i=lo;i<=hi;i++){const local=Math.max(flux[i]||0,(flux[i-1]||0)*.78,(flux[i+1]||0)*.78),time=i*step,dist=Math.abs(time-predicted)/Math.max(.001,window),score=local*(1-.42*Math.min(1,dist));if(score>bestScore){bestScore=score;bestI=i}}
  let chosen=predicted;if(bestI>=0&&bestScore>mean*.72){const raw=bestI*step-predicted,shift=Math.max(-maxShift,Math.min(maxShift,raw));chosen=predicted+shift*.72;snapped++}if(chosen<=grid[n-1]+beatSec*.62)chosen=grid[n-1]+beatSec*.62;grid.push(chosen)
 }
 const times=[];for(let b=0;b<=bars;b++){const i=b*beats,tb=grid[i]??(times[b-1]??offset)+beats*beatSec;times.push(Math.min(duration,tb))}for(let i=1;i<times.length;i++)if(times[i]<=times[i-1])times[i]=Math.min(duration,times[i-1]+beats*beatSec*.7);
 adaptiveBarTimingCache={key,times,confidence:snapped/Math.max(1,beatCount-1)};return times
}
function adaptiveBarOffset(bar,firstBar=0){const a=importedSongAnalysis,times=analysisTempoUncertain()?adaptiveBarTimes(a):null;if(!times||times[bar]==null||times[firstBar]==null)return null;return Math.max(0,times[bar]-times[firstBar])}
function scheduleAnalyzedPiano(name,chord,p,section,bar,energy){
 const q=60/p.bpm,{root,tones}=chord,g=arrangementBlendGain(name)*.96;
 const warm=m=>{let x=m;while(x>70)x-=12;while(x<45)x+=12;return x};
 const block=(arr,b,d=.90,v=.017)=>arr.forEach((m,i)=>playInstrument(name,midiFreq(warm(m)),b*q+i*.008,q*d,v*energy*(i?0.88:1),g,null));
 if(p.meter==='6/8'){block([root,tones[1],tones[2]],0,analysisTempoUncertain()?1.08:1.28,.0182);if(!analysisTempoUncertain())block([tones[1],tones[2],root+12],1.5,1.20,.0155);return}
 if(p.meter==='3/4'){block([root,tones[1],tones[2]],0,1.30,.017);if(!analysisTempoUncertain())block([tones[1],tones[2]],2,0.72,.013);return}
 block([root,tones[1],tones[2]],0,analysisTempoUncertain()?1.18:1.55,.0185);if(!analysisTempoUncertain())block([root,tones[1],tones[2]],2,1.45,.016);
}
function scheduleLegacyArrangementBar(bar,section,p,names,guide){
 const q=60/p.bpm,total=p.meter==='6/8'?3:Number(p.meter.split('/')[0])||4,energy=arrangementSectionEnergy(section),chord=arrangementChord(p,bar,section),tones=chord.tones,root=chord.root,isVerse=/Verse/.test(section),isPre=/Pre-Chorus/.test(section),isChorus=/Chorus/.test(section),isFinal=/Final Chorus/.test(section),isBridge=/Bridge/.test(section),isIntro=/Intro/.test(section),isOutro=/Outro/.test(section);
 const syncSafe=!!(importedSongAnalysis&&scoreEntries[bar]?.transcribed&&sourceReferenceEnabled()&&analysisTempoUncertain());
 if(syncSafe){
  names.forEach(name=>{if(name===guide)return;const type=findInstrument(name)[2],g=arrangementBlendGain(name);
   if(type==='piano')scheduleAnalyzedPiano(name,chord,p,section,bar,energy);
   else if(type==='bass')playInstrument(name,midiFreq(root-12),0,q*Math.min(total,2.1),.027*energy,g*1.05);
   // BPM 신뢰가 낮을 때는 기타·드럼·현악/패드의 공격/스웰을 자동 제외해 원곡 리듬을 덮지 않는다.
  });return;
 }
 names.forEach(name=>{if(name===guide)return;const type=findInstrument(name)[2],g=arrangementBlendGain(name);if(type==='piano'){if(importedSongAnalysis&&scoreEntries[bar]?.transcribed){scheduleAnalyzedPiano(name,chord,p,section,bar,energy)}else if(isVerse||isIntro||isOutro){scheduleChord(name,tones,0,q*(total*.86),.026*energy,1)}else{for(let b=0;b<total;b+=isChorus?.5:1){const m=tones[Math.round(b*2)%3];playInstrument(name,midiFreq(m),b*q,q*(isChorus?.42:.7),.024*energy,g)}}}else if(type==='pluck'||type==='guitar'){const step=isChorus||isFinal?.5:1;for(let b=0;b<total;b+=step){if(isBridge&&bar%2&&b>1)continue;const m=tones[Math.floor(b/step)%3]+(type==='guitar'?0:12);playInstrument(name,midiFreq(m),b*q,q*(step*.72),.022*energy,g)}}else if(type==='bass'){const hits=isChorus||isFinal?[0,1,2,3].filter(x=>x<total):[0,Math.min(2,total-1)];hits.forEach((b,i)=>playInstrument(name,midiFreq(root-12+(i&&isFinal?7:0)),b*q,q*.7,.024*energy,g))}else if(type==='drum'){drumHitIndex[name]=0;const hits=isChorus||isFinal?Array.from({length:Math.round(total*2)},(_,i)=>i*.5):isPre?[0,1,2,3].filter(x=>x<total):isBridge?(bar%2?[0,2].filter(x=>x<total):[0,1,2,3].filter(x=>x<total)):[0,2].filter(x=>x<total);hits.forEach((b,i)=>playInstrument(name,90,b*q,q*(i%2?.18:.24),.028*energy,g))}else if(type==='bow'||name==='바이올린 섹션'||name==='첼로 섹션'){if(isVerse&&bar%2)return;if(isIntro&&bar%2)return;const upper=isFinal?12:0,dur=q*total*.92;playInstrument(name,midiFreq(tones[1]+upper),0,dur,.022*energy,g);if(isChorus||isFinal)playInstrument(name,midiFreq(tones[2]+upper),.025,dur*.96,.018*energy,g)}else if(type==='pad'){if(isVerse&&bar%2)return;scheduleChord(name,tones.map(x=>x-12),0,q*total*.95,.014*energy,1)}else if(['flute','sax','brass','synth','bell'].includes(type)){if((isChorus||isFinal||isBridge)&&bar%2===0){const m=tones[2]+(isFinal?12:0);playInstrument(name,midiFreq(m),q*(total-1),q*.75,.018*energy,g)}}});
}
function scheduleArrangementBar(bar,section,p,names,guide,preview=false){
 if(importedSongAnalysis&&scoreEntries[bar]?.transcribed&&sourceReferenceEnabled()&&analysisTempoUncertain())return scheduleLegacyArrangementBar(bar,section,p,names,guide);
 if(!isModernPopArrangement(p))return scheduleLegacyArrangementBar(bar,section,p,names,guide);
 const q=60/p.bpm,total=4,energy=arrangementSectionEnergy(section),chord=arrangementChord(p,bar,section),info=chord.info,prog=arrangementProgression(section,p),nextDegree=prog[(info.index+1)%prog.length],scale=arrangementScale(p),rootName=p.key.split(' ')[0];let tonic=KEY_ROOTS[rootName]||67;while(tonic>60)tonic-=12;while(tonic<48)tonic+=12;const nextRoot=scaleDegreeMidi(tonic,scale,nextDegree),nextChord={root:nextRoot};
 names.forEach(name=>{if(name===guide)return;const type=findInstrument(name)[2],g=1;if(name==='그랜드 피아노'||type==='piano'){if(importedSongAnalysis&&scoreEntries[bar]?.transcribed)scheduleAnalyzedPiano(name,chord,p,section,bar,energy);else scheduleModernPopPiano(name,chord,section,bar,q,total,energy,g);}else if(name==='어쿠스틱 기타'||type==='pluck'||type==='guitar')scheduleModernPopGuitar(name,chord,section,bar,q,total,energy,g);else if(type==='bass')scheduleModernPopBass(name,chord,nextChord,section,bar,q,total,energy,g);else if(type==='drum')scheduleModernPopDrums(name,section,bar,q,total,energy,g);else if(type==='bow'||name==='바이올린 섹션'||name==='첼로 섹션')scheduleModernPopStrings(name,chord,section,bar,q,total,energy,g);else if(type==='pad'){if(!/Verse/.test(section)||info.index%2===1)scheduleChord(name,chord.tones.map(x=>x-12),0,q*total*.94,.0105*energy,g)}else if(['flute','sax','brass','synth','bell'].includes(type)){if((/Chorus|Bridge/.test(section))&&info.index%2===0){const m=chord.tones[2]+(/Final Chorus/.test(section)?12:0);playInstrument(name,midiFreq(m),q*(total-1),q*.72,.0125*energy,arrangementBlendGain(name))}}});
}
function scheduleMelodyBar(bar,p,guide){
 const entry=scoreEntries[bar];if(!entry)return;if((entry.noLyric||entry.instrumental)&&!entry.transcribed)return;const q=60/p.bpm,notes=scoreNotes.filter(n=>n.bar===bar),section=entry.section||'',sectionGain=/Final Chorus/.test(section)?1.10:/Chorus/.test(section)?1.05:/Bridge/.test(section)?.94:1,guideGain=autoMixBalanceEnabled()?(sourceReferenceEnabled()?(vocalClarityEnabled()?.34:.44):(vocalClarityEnabled()?.50:.62)):1.02;let at=0;notes.forEach(n=>{const dur=n.duration*q,vol=(DYNAMIC_VOLUME[n.dynamic]||.07)*.96*sectionGain;if(!n.rest)playInstrument(guide,midiFreq(n.midi),at,dur*(n.duration>=1.5?.96:.88),vol,guideGain);at+=dur});
}
function analysisBeatsPerBar(meter){return meter==='4/4'?4:meter==='3/4'||meter==='6/8'?3:Math.max(1,Number(String(meter||'4/4').split('/')[0])||4)}
function stopSourceReference(reset=false){clearTimeout(sourceReferenceTimer);sourceReferenceTimer=0;auto64ReferenceMixActive=false;stopAuto64Ducking();if(sourceReferenceNode){try{sourceReferenceNode.stop()}catch(e){}try{sourceReferenceNode.disconnect()}catch(e){}sourceReferenceNode=null}sourceLiveEqNodes=[];sourceLiveMixerGain=null;sourceLiveLimiter=null;sourceLiveBaseGain=1;auto64SourceNodes=[];auto64SourceGain=null;refreshAuto64Audio();const el=$('#sourceAudio');if(!el)return;el.pause();if(reset){try{el.currentTime=0}catch(e){}}}
function sourceReferenceEnabled(){return !!(importedSongAnalysis&&$('#mixSourceVoice')?.checked&&($('#sourceAudio')?.src||importedSongBuffer))}
function sourceReferenceVolume(){return Math.max(.20,Math.min(1,Number($('#sourceVoiceVolume')?.value||50)/100))}
function estimateSourcePlaybackBoost(buffer){
 if(!buffer?.length)return 1;let sum=0,count=0,peak=0,activeSum=0,activeCount=0;const step=Math.max(1,Math.floor(buffer.length/90000));
 for(let ch=0;ch<buffer.numberOfChannels;ch++){const d=buffer.getChannelData(ch);for(let i=0;i<d.length;i+=step){const v=Math.abs(d[i]);peak=Math.max(peak,v);sum+=v*v;count++;if(v>.003){activeSum+=v*v;activeCount++}}}
 const rms=Math.sqrt(sum/Math.max(1,count)),activeRms=activeCount?Math.sqrt(activeSum/activeCount):rms;if(peak<.0005||rms<.00005)return 1;
 // V0.22.71: 조용한 녹음/원곡도 실제 청취 음량이 확보되도록 활성 구간 평균을 기준으로 보정한다.
 // 목표 활성 RMS 약 -11.5 dBFS, 최대 +21.6 dB(12배). 마지막 리미터가 순간 피크만 보호한다.
 const basis=Math.max(rms,activeRms*.62),byRms=.265/Math.max(.00005,basis);return Math.max(1,Math.min(12,byRms));
}
function standaloneSourceGain(){return Math.min(12,sourcePlaybackBoost)}
function sourceReferenceGain(){return Math.min(1.55,sourceReferenceVolume()*Math.min(1.45,sourcePlaybackBoost))}
function startSourceReference(startBar,endBar,startDelay=.14){
 if(!sourceReferenceEnabled())return;const a=importedSongAnalysis,beats=analysisBeatsPerBar(a.meter),barSec=beats*60/a.bpm,times=analysisTempoUncertain()?adaptiveBarTimes(a):null,start=Math.max(0,times?.[startBar]??((a.beatOffsetSec||0)+startBar*barSec)),adaptiveEnd=times?.[endBar+1],duration=Math.max(.1,Math.min(a.duration-start,Number.isFinite(adaptiveEnd)?adaptiveEnd-start:(endBar-startBar+1)*barSec));stopSourceReference(false);auto64ReferenceMixActive=true;refreshAuto64Audio();
 if(importedSongBuffer&&duration>.02){try{const c=audio(),src=c.createBufferSource(),hp=c.createBiquadFilter(),mud=c.createBiquadFilter(),presence=c.createBiquadFilter(),lp=c.createBiquadFilter(),gain=c.createGain();src.buffer=importedSongBuffer;hp.type='highpass';hp.frequency.value=vocalClarityEnabled()?38:32;hp.Q.value=.68;mud.type='peaking';mud.frequency.value=310;mud.Q.value=.82;mud.gain.value=vocalClarityEnabled()?-.6:0;presence.type='peaking';presence.frequency.value=2600;presence.Q.value=.9;presence.gain.value=vocalClarityEnabled()?.35:0;lp.type='lowpass';lp.frequency.value=vocalClarityEnabled()?16500:18000;lp.Q.value=.50;gain.gain.value=sourceReferenceGain();src.connect(hp).connect(mud).connect(presence).connect(lp);gain.gain.value=1;lp.connect(gain);connectSourceMixer(c,gain,sourceReferenceGain());sourceReferenceNode=src;src.onended=()=>{if(sourceReferenceNode===src)sourceReferenceNode=null;stopAuto64Ducking();auto64ReferenceMixActive=false;refreshAuto64Audio()};src.start(c.currentTime+startDelay,start,duration);sourceReferenceTimer=setTimeout(()=>stopSourceReference(false),(startDelay+duration)*1000+180);return}catch(e){console.warn('source reference buffer fallback',e)}}
 const el=$('#sourceAudio');if(!el)return;try{el.currentTime=Math.min(Math.max(0,start),Math.max(0,(el.duration||a.duration)-.05))}catch(e){}el.volume=Math.min(1,sourceReferenceGain());setTimeout(()=>el.play().catch(()=>toast('녹음 음성 동기화 재생을 시작하지 못했습니다')),startDelay*1000);sourceReferenceTimer=setTimeout(()=>stopSourceReference(false),(startDelay+duration)*1000+120)
}
function arrangedBarPlayback(bars,p,names,guide,quiet=false,startDelay=.14){
 const q=60/p.bpm,total=p.meter==='6/8'?3:Number(p.meter.split('/')[0])||4,barSec=q*total,analyzed=!!(importedSongAnalysis&&bars.some(bar=>scoreEntries[bar]?.transcribed)),arrangementGuideName=analyzed?null:guide,c=audio(),startAt=c.currentTime+startDelay,lookAhead=2.4,firstBar=bars[0]||0,adaptive=analyzed&&analysisTempoUncertain()?adaptiveBarTimes(importedSongAnalysis):null;
 const rel=(bar,index)=>adaptive&&adaptive[bar]!=null&&adaptive[firstBar]!=null?Math.max(0,adaptive[bar]-adaptive[firstBar]):index*barSec;
 const barDur=(bar,index)=>adaptive&&adaptive[bar+1]!=null&&adaptive[bar]!=null?Math.max(.35,adaptive[bar+1]-adaptive[bar]):barSec;
 const runBarAudio=(bar,index)=>{if(!ctx)return;const target=startAt+rel(bar,index);arrangementScheduleOffset=Math.max(0,target-c.currentTime);const section=scoreEntries[bar]?.section||'Verse 1';if(!analyzed)scheduleMelodyBar(bar,p,guide);scheduleArrangementBar(bar,section,p,names,arrangementGuideName);arrangementScheduleOffset=0};
 let next=0,schedulerId=0;const scheduler=()=>{if(!ctx)return;while(next<bars.length&&startAt+rel(bars[next],next)<=c.currentTime+lookAhead){runBarAudio(bars[next],next);next++}if(next>=bars.length&&schedulerId){clearInterval(schedulerId);schedulerId=0}};
 schedulerId=setInterval(scheduler,300);timers.push(schedulerId);scheduler();
 bars.forEach((bar,i)=>timers.push(setTimeout(()=>{$$('.score-note').forEach(x=>x.classList.remove('active'));$(`[data-bar-select="${bar}"]`)?.classList.add('active')},Math.max(0,(startDelay+rel(bar,i))*1000))));
 const last=bars.at(-1)??firstBar,finish=startDelay+rel(last,Math.max(0,bars.length-1))+barDur(last,Math.max(0,bars.length-1));timers.push(setTimeout(()=>{$$('.score-note').forEach(x=>x.classList.remove('active'));$('#pulse').classList.remove('playing');analyzedArrangementPlayback=false},finish*1000+80));
 if(!quiet)toast(analyzed?(analysisTempoUncertain()?'원곡 타격점을 따라가는 원곡 타격 추종 안전 동기화 반주로 재생합니다':'Web Audio 시계로 분석 코드 반주를 정확히 예약 재생합니다'):`${guide} 멜로디 + 코드 기반 전체 편곡을 재생합니다`);return finish
}

async function playMix(){
 stop();const p=scoreSettings(),names=[...selected];if(!names.length){autoPick();return playMix()}audio().resume();try{await ensureSoundfont()}catch(e){}if(!scoreEntries.length||!scoreNotes.length){if($('#lyrics').value)createScore();else{const beat=60/p.bpm;names.slice(0,6).forEach((n,j)=>playInstrument(n,midiFreq(55+[0,4,7,11][j%4]),j*.05,beat*2,.055));return toast('노래 설계 후에는 구간별 실제 편곡을 들을 수 있습니다')}}
 const sections=['Verse 1','Pre-Chorus','Chorus','Bridge','Final Chorus'],bars=[];sections.forEach(sec=>{const found=scoreEntries.map((e,i)=>e.section===sec?i:-1).filter(i=>i>=0);bars.push(...found.slice(0,sec==='Verse 1'?2:1))});const guide=arrangementGuide(names);$('#pulse').classList.add('playing');arrangedBarPlayback(bars,p,names,guide,true);toast(`${p.bpm} BPM · ${p.key} · 벌스 아르페지오 → 프리 빌드 → 넓은 후렴 → 대비 브리지 → 확장 마지막 후렴`)
}
function autoPick(){
 const p=activeProfile();manualInstrumentSelection=false;const choices=buildInstrumentCandidates(p,false),first=choices[0]||{traditional:p.traditional||recommendTraditionalInstruments(p,$('#story').value),modern:p.modern||recommendModernInstruments(p,$('#story').value)};selected=new Set([...(first.traditional||[]),...(first.modern||[])]);lastProfile={...p,traditional:[...(first.traditional||[])],modern:[...(first.modern||[])]};renderInstruments();renderInstrumentCandidates();updateInfo();renderProCompositionCoach();toast(`악기 조합 후보 ${choices.length||1}개를 만들고 1번을 기본 적용했습니다. 다른 조합을 눌러 바꿀 수 있습니다`)
}
function updateInfo(){const p=activeProfile();$('#musicInfo').textContent=`${p.bpm} BPM · ${p.meter}박자 · ${p.key} · ${[...selected].join(' + ')||'악기를 선택해 주세요'}`}

function hasBatchim(text){const chars=[...text].filter(c=>/[가-힣]/.test(c));if(!chars.length)return false;return (chars.at(-1).charCodeAt(0)-0xAC00)%28!==0}
function joinKorean(names){if(names.length<2)return names[0]||'악기';const head=names.slice(0,-1).join(', '),last=names.at(-1);return `${head}${hasBatchim(head)?'과':'와'} ${last}`}

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
const SHORT_LYRICS={
 vacation:{v1:['짧은 여행','좋은 바람','웃던 하루','다시 일상','추억 안고','힘을 내자','새 아침이','우릴 불러'],chorus:['다시 가자','힘을 내자','한 걸음 더','웃으며 가'],v2:['쉬어 간 길','마음 가득','새 힘 얻고','다시 걷자','오늘보다','밝은 내일','우리 함께','앞을 보자']},
 love:{v1:['처음 본 날','네가 웃어','맘이 뛰어','자꾸 보여','한 걸음 더','다가와 줘','같은 마음','함께 걸어'],chorus:['자꾸자꾸','너만 보여','네 생각 나','우리 함께'],v2:['짧은 인사','설레는 밤','보고 싶어','또 웃게 돼','손을 잡고','눈을 맞춰','같은 리듬','함께 노래']},
 breakup:{v1:['남은 이름','깊은 한숨','자꾸 생각','눈물 흘러','걷던 그 길','혼자 남아','지난 사랑','가슴 안에'],chorus:['잊지 못해','너를 불러','아픈 마음','놓아 줄게'],v2:['짧은 안녕','긴 그리움','지운 번호','남은 기억','눈물 지나','다시 웃어','나의 길을','걸어갈게']},
 healing:{v1:['푸른 바람','맑은 햇살','숲의 노래','마음 쉬어','천천히 가','숨을 쉬어','걱정 놓고','나를 안아'],chorus:['바람 불어','마음 씻어','햇살 비춰','다시 웃어'],v2:['작은 물결','새의 노래','고요한 길','빛을 따라','희망 피어','힘을 얻어','오늘 편히','내일 걸어']},
 celebration:{v1:['오늘 네 날','환히 웃어','손뼉 치며','함께 노래','소원 빌어','기쁨 가득','빛나는 너','축하할게'],chorus:['축하 축하','너의 오늘','웃어 웃어','우리 함께'],v2:['잘해 왔어','힘든 날도','모두 지나','빛이 됐어','좋은 날이','기다리고','우리 계속','응원할게']},
 dance:{v1:['네온 불빛','심장 쿵쿵','리듬 타고','몸을 맡겨','한 걸음 더','손을 들어','웃어 봐요','밤을 달려'],chorus:['더 더 높이','춤춰 춤춰','멈추지 마','우리 함께'],v2:['불빛 따라','발을 굴러','고개 들어','소리 질러','다시 한번','더 신나게','같은 비트','함께 달려']},
 hope:{v1:['작은 용기','가슴 안에','한 걸음 더','앞을 향해','넘어져도','다시 서자','꿈을 잡고','계속 가자'],chorus:['힘을 내자','다시 가자','한 걸음 더','우리 함께'],v2:['어둔 밤도','끝이 있어','작은 빛이','길을 열어','손을 잡고','함께 가면','밝은 내일','우릴 만나']},
 generic:{v1:['오늘 마음','노래 담아','작은 진심','소리 내어','한 걸음 더','천천히 가','우리 노래','함께 불러'],chorus:['노래 노래','마음 담아','다시 한번','우리 함께'],v2:['지난 시간','다가올 날','같은 리듬','이어 가자','짧은 한 줄','진심 되어','세상 하나','노래가 돼']}
};
const EN_LYRICS={
 vacation:{v1:['I folded summer into one last photograph','The quiet road still follows every step','I pack the laughter softly in my suitcase','Tomorrow calls me back to ordinary days'],pre:['I can carry every memory home','A new morning is waiting at my door'],chorus:['One more day and I will start again','All this rest has made my footsteps lighter','I will keep the sunlight in my heart','And meet tomorrow with a brighter smile'],v2:['Stopping for a while has helped me see','Even simple days are worth remembering','When the crowded hours wear me down','I will find this open sky again'],bridge:['Every ending opens up a road','I will take the hope and let it lead']},
 love:{v1:['When your eyes first stayed a while on mine','An ordinary day began to glow','Without a word your smile came over me','And I was smiling everywhere you went'],pre:['Take one little step into my world','This is where our time begins'],chorus:['Again again I only see you','Again again you fill my mind','To the same beat with the same heart','From today we walk this road together'],v2:['Even shy hellos can light the night','Every little message stays with me','Sharing all our days a piece at a time','We can make a season of our own'],bridge:['Even when the road brings us around','I will be the first to take your hand']},
 breakup:{v1:['Your name is waiting in the darkened room','The more I hide it the more it shines','Every road we walked is still the same','But I cross the seasons on my own'],pre:['I keep saying I am doing fine','Why are those few words so hard tonight'],chorus:['Even if our time has come to rest','I will never erase the days we loved','When I learn to hold the aching memory','Maybe I will find my smile again'],v2:['I stop before I call your number now','All the words I could not send remain','Letting go so both of us can grow','May be one more way to show my love'],bridge:['When the final tears have dried','I will walk into my season again']},
 healing:{v1:['Leave the city noise behind a while','Follow where the open wind may lead','When the clear water knocks upon my heart','All the hidden tiredness slips away'],pre:['I do not have to say a word','Nature holds me quietly'],chorus:['Wind come wash the worry from my heart','Sunlight wrap my weary shoulders warm','Tell me I do not have to hurry now','Let the open sky speak peace to me'],v2:['Like the light that filters through the trees','Little hopes are waking up again','Though my busy days are waiting there','I will keep this stillness close to me'],bridge:['Breathing slowly in and out','I return to who I am']},
 celebration:{v1:['The day we waited for is finally here','Open up the door with your bright smile','Every road that brought you to this moment','Makes the light around you shine much more'],pre:['Close your eyes and make a little wish','Happiness is coming close to you'],chorus:['Today today is all for you','Let your brightest laughter fill the room','Step by step with every hand together','We will celebrate you all the way'],v2:['You survived the days that felt too hard','Every one of them has made you strong','May the chapters waiting up ahead','Overflow with everything you love'],bridge:['Any time you need a friend','We will sing our loudest song for you']},
 dance:{v1:['Neon colors pour across the street','My heart already understands the beat','Leave the heavy thinking at the door','Let the rhythm move you through the night'],pre:['One two take a breath and wait','Every light is waking up again'],chorus:['Higher higher put your hands up high','We are never stopping here tonight','Turn around and let the whole room smile','We will ride this rhythm to the end'],v2:['In the mirror I can see me free','This is my time no matter what they say','Every burning footstep wakes the floor','Now the whole wide world begins to shake'],bridge:['When the beat is silent for a breath','All our voices make it rise again']},
 hope:{v1:['Even when the road is hard to see','One small light is burning in the dark','Do not bow your head when they say late','Your own time is starting here and now'],pre:['You can take it slowly if you need','Just keep one foot moving on'],chorus:['Take one more step into tomorrow','If you fall then stand and try again','All the courage that you show today','Will become the road that leads us home'],v2:['Even when the worry holds your feet','Do not let it take the dream you keep','When somebody walks the road beside you','Even the longest tunnel finds an end'],bridge:['After every longest night','A new sun is waiting to arise']},
 generic:{v1:['Open up the story in your heart','Put the hidden words into a song','Gather every honest little feeling','Let your own melody carry you on'],pre:['If somebody hears this simple song','May they understand a piece of me'],chorus:['Sing the story of today out loud','With a voice that does not need disguise','If a single line can carry truth','Then this song is already enough'],v2:['All the days behind and days ahead','Join together in a steady rhythm','Every ordinary little moment','Turns into a song that is our own'],bridge:['Even when the final note is gone','May the warmth remain inside our hearts']}
};
const EN_TITLES={vacation:'Tomorrow Starts Again',love:'A Song That Leads to You',breakup:'The Season You Left Behind',healing:'The Wind That Washes My Heart',celebration:'This Is Your Day',dance:'Higher Tonight',hope:'One More Step',generic:'The Story of Today'};
const EN_GENRES={'모던 팝 발라드':'Modern pop ballad','컨템포러리 발라드':'Contemporary ballad','어쿠스틱 뉴에이지 팝':'Acoustic new-age pop','업리프팅 팝':'Uplifting pop','2026 댄스 팝':'Dance pop','팝 록 앤섬':'Pop-rock anthem','모던 팝':'Modern pop','팝 록 + 포크':'Pop rock with folk'};
const EN_INSTRUMENTS={'가야금':'gayageum','대금':'daegeum','해금':'haegeum','장구':'janggu','피아노':'piano','전자피아노':'electric piano','그랜드 피아노':'grand piano','어쿠스틱 기타':'acoustic guitar','일렉 기타':'electric guitar','베이스 기타':'bass guitar','드럼 세트':'drum kit','전자 패드':'electronic pad','첼로 섹션':'cello section','바이올린 섹션':'violin section','신시사이저':'synthesizer','EDM 신스':'EDM synth','808 베이스':'808 bass'};
const EN_MOODS={'따뜻하고 설레는':'warm and fluttering','절제된 슬픔과 긴 여운':'restrained sadness with a lingering afterglow','맑고 편안한 치유':'clear, peaceful, and healing','밝고 따뜻한 축하':'bright and warmly celebratory','강렬하고 자유로운':'powerful and free','차분하게 시작해 벅차오르는 희망':'calm at first, rising into uplifting hope','담백하고 진솔한':'simple and sincere','아쉬움에서 희망으로':'moving from wistfulness to hope','따뜻한':'warm','신나는':'energetic','웅장한':'grand','슬픈':'sad','신비로운':'mysterious','편안한':'comfortable'};
function profileKey(p){return Object.keys(PROFILES).find(k=>PROFILES[k].title===p.title)||'generic'}
function storyChunks(text,max=8){const clean=text.replace(/\[[^\]]*\]|\([^)]*\)/g,' ').replace(/[,.!?;:·/\\]+/g,' ').replace(/\s+/g,' ').trim(),words=clean.split(' ').filter(Boolean),parts=[];let line='';for(const word of words){if(lyricChars(word)>max){if(line){parts.push(line);line=''}const chars=[...word];while(chars.length>max)parts.push(chars.splice(0,max).join(''));line=chars.join('');continue}const next=line?`${line} ${word}`:word;if(lyricChars(next)<=max)line=next;else{if(line)parts.push(line);line=word}}if(line)parts.push(line);return parts.filter(x=>lyricChars(x)>0)}
function makeStoryBarTexts(){const story=$('#story').value.trim(),extra=[...chosenWords,$('#customWords').value.trim()].filter(Boolean).join(' '),source=storyChunks(`${story} ${extra}`),fallback=storyChunks(story),pool=source.length?source:fallback.length?fallback:['우리 함께'];const hookInput=melodyHook($('#hookLine').value),hook=hookInput||pool.find(x=>lyricChars(x)>=3&&lyricChars(x)<=6)||pool[0],verse1=Array.from({length:8},(_,i)=>pool[i%pool.length]),verse2=Array.from({length:8},(_,i)=>pool[(i+8)%pool.length]),chorus=[hook,pool[1%pool.length],hook,pool[2%pool.length]];return[...Array(4).fill(''),...verse1,...chorus,...Array(4).fill(''),...verse2,...chorus]}
function splitNaturalLine(line){const words=line.trim().split(/\s+/).filter(Boolean);if(words.length<2){const chars=[...line.replace(/\s/g,'')],cut=Math.max(1,Math.ceil(chars.length/2));return[chars.slice(0,cut).join(''),chars.slice(cut).join('')||'－']}let best=1,diff=Infinity;for(let i=1;i<words.length;i++){const a=words.slice(0,i).join(' '),b=words.slice(i).join(' '),d=Math.abs(lyricChars(a)-lyricChars(b));if(d<diff){diff=d;best=i}}return[words.slice(0,best).join(' '),words.slice(best).join(' ')]}
function expandFourLines(lines){return lines.slice(0,4).flatMap(splitNaturalLine).slice(0,8)}
function storySpecificBars(story){if(/미안|사과|후회|뿌리친|10년|십 년|꿈에서/.test(story))return{v1:['꿈속에서도 네가 찾아와','지난날의 눈빛으로 날 바라봐','사랑을 밀어냈던 어리석은 나','돌아서던 너를 붙잡지 못했어','아무렇지 않은 척 살아왔지만','지워지지 않는 마음이 남아서','늦어 버린 미안함을 품은 채','오늘도 네 이름을 불러 본다'],pre:['시간이 흐를수록 더 선명해져','하지 못한 한마디가 나를 붙잡아'],chorus:['꿈에서라도 널 다시 만나면','늦은 미안함을 전하고 싶어','사랑했던 그날을 지우지 않고','고마웠다고 꼭 말하고 싶어'],v2:['십 년이 지나 이제야 알았어','네가 준 사랑이 얼마나 컸는지','바닷가를 홀로 걷는 저녁이면','파도 사이로 네 목소리가 들려','다시 돌아갈 수 없다는 걸 알아','그래도 한 번은 사과하고 싶어','행복했던 기억까지 아프지 않게','이제는 조용히 너를 보내 줄게'],bridge:['만날 수 없어도 괜찮아','내 진심이 네게 닿기를']};return null}
function cycleLines(pool,count,offset=0){const safe=pool.filter(Boolean);if(!safe.length)return Array(count).fill('우리 이야기');return Array.from({length:count},(_,i)=>safe[(i+offset)%safe.length])}
function uniqueStoryPool(max=8){const story=$('#story').value.trim(),sentences=story.split(/[\n.!?]+/).map(s=>s.trim()).filter(Boolean),chunks=sentences.flatMap(s=>storyChunks(s,max)),custom=$('#customWords').value.split(/[,\n]+/).map(cleanWord).filter(Boolean),chosen=[...chosenWords];return[...new Set([...chunks,...chosen,...custom].map(cleanWord).filter(Boolean))]}
function storyHook(pool){const typed=melodyHook($('#hookLine').value);if(typed)return typed;const chosen=[...chosenWords].find(w=>lyricChars(w)>=2&&lyricChars(w)<=6);if(chosen)return cleanWord(chosen);return pool.find(x=>lyricChars(x)>=2&&lyricChars(x)<=6)||pool[0]||'우리 이야기'}
function buildStorySet(max,mode){const pool=uniqueStoryPool(max),hook=storyHook(pool),focus=pool.filter(x=>x!==hook),v1=cycleLines(focus.length?focus:pool,8,0),v2=cycleLines(focus.length?focus:pool,8,Math.min(8,Math.max(1,Math.floor(pool.length/2)))),pre=[v1[6],v1[7]],bridge=[v2[6],v2[7]];let chorus;if(mode==='hook')chorus=[hook,hook,`${hook} 다시`,hook];else if(mode==='emotion')chorus=[hook,pool.at(-1)||hook,hook,pool[0]||hook];else chorus=[hook,pool[1]||hook,hook,pool[2]||pool[0]||hook];return{v1,pre,chorus,v2,bridge}}
function selectedLanguage(){return $('#language').value==='custom'?($('#customLanguage').value.trim()||'사용자 지정 언어'):$('#language').value}
function automaticLyricsLanguage(){return ['한국어','English'].includes($('#language').value)}
function resolvedStyleLanguage(){const chosen=$('#styleLanguage').value;if(chosen!=='auto')return chosen;return $('#language').value==='English'?'English':'한국어'}
function localizedTitle(p){return $('#language').value==='English'?(EN_TITLES[profileKey(p)]||EN_TITLES.generic):p.title}
function englishVocal(v){if(/남녀 듀엣/.test(v))return'a male-female duet, soft verses and upper-mid harmonies in the chorus';if(/여성/.test(v))return'a clear female lead vocal';if(/남성/.test(v))return'a natural male midrange lead vocal';if(/합창/.test(v))return'a lead vocal supported by a sing-along choir';if(/낮은 중음/.test(v))return'a restrained low-mid lead, reaching the climax only in the final chorus';if(/맑은/.test(v))return'a clear vocal with natural breath';return'a natural, lyric-forward midrange lead vocal'}
function englishStylePrompt(p,mins,inst,blend,lang){const genre=EN_GENRES[p.genre]||p.genre,mood=EN_MOODS[p.mood]||p.mood,instruments=inst.map(x=>EN_INSTRUMENTS[x]||x).join(', '),space=arrangementMaskingAssessment(inst,p.vocal);return`${genre}, ${p.bpm} BPM, ${p.meter} time, ${p.key}, approximately ${mins} minutes, ${mood}. Build singable lyric phrases instead of placing prose directly on a melody: one clear thought per breath, meaningful words on strong beats, sentence endings on sustained notes, and a short memorable chorus hook. Vocal direction: ${englishVocal(p.vocal)}. Lyrics language: ${lang}. Instruments: ${instruments}. Traditional instrument ratio: ${blend}%. Arrange by frequency and register so bass owns the low range and no more than two broad harmony instruments crowd the vocal-presence region at the same time. During sung lines, reduce accompaniment density around the vocal clarity range and let piano, guitar, pads, strings, and lead instruments alternate registers or rhythms instead of stacking. Keep verses lyric-forward, widen the chorus without burying consonants, and preserve dynamics. Reference guidance: ${space.label} vocal masking risk. Avoid excessive reverb, compression, limiting, and bass.`}
function koreanStylePrompt(p,mins,inst,blend,lang){const ratioLabel=region==='오케스트라'?'오케스트라 악기 비율':region==='현대악기'?'선택 악기 비율':'전통악기 비율',space=arrangementMaskingAssessment(inst,p.vocal);return`${p.genre}, ${p.bpm} BPM, ${p.meter} time, ${p.key}, 약 ${mins}분, ${p.mood}. 일반 산문을 그대로 멜로디에 얹지 말고 한 호흡에 한 생각이 들어가는 짧은 가창 프레이즈로 재구성. 의미가 강한 단어는 강박과 긴 음표에, 조사·접속어는 약박과 짧은 음표에 자연스럽게 배치하고 후렴 훅은 짧고 기억하기 쉽게 만든다. ${p.vocal}, 가사 언어 ${lang}. 악기: ${inst.join(', ')}. ${ratioLabel} ${blend}%. ${p.arrange}. 저역은 베이스 역할 한 악기가 중심을 잡고, 피아노·기타·패드·스트링처럼 중역을 넓게 채우는 악기는 동시에 2개를 넘겨 오래 겹치지 않게 하며 서로 다른 옥타브·리듬·구간으로 분리. 보컬이 부르는 순간 1~5kHz 명료도 공간과 중앙을 비워 자음과 가사가 또렷하게 들리게 한다. 현재 보컬 마스킹 위험 ${space.label}. 프리코러스에서 긴장을 높이고 브리지에서 대비한 뒤 마지막 후렴에서 음역과 화음을 확장. 보컬 전면, 과도한 리버브·컴프레션·리미팅·베이스 금지.`}
function coherentTemplateSet(){const key=profileKey(activeProfile()),english=$('#language').value==='English',bank=english?EN_LYRICS:LYRICS,base=bank[key]||bank.generic,set={v1:[...base.v1],pre:[...base.pre],chorus:[...base.chorus],v2:[...base.v2],bridge:[...base.bridge]},custom=[...chosenWords,$('#customWords').value.trim()].map(cleanWord).find(Boolean);if(custom&&!english)set.v2[Math.min(2,set.v2.length-1)]=customWordLine(custom);return set}
function buildLyricCandidates(){const story=$('#story').value.trim(),english=$('#language').value==='English',specific=english?null:storySpecificBars(story),base=specific||coherentTemplateSet(),key=profileKey(activeProfile()),short=SHORT_LYRICS[key]||SHORT_LYRICS.generic;let sets;if(english){sets=[base,{...base,chorus:base.chorus.map((line,i)=>i%2?line:`${line} again`)},{...base,chorus:[base.chorus[0],base.chorus[0],base.chorus[2],base.chorus[3]]}]}else sets=specific?[base,{...base,chorus:['꿈에서라도 다시 만난다면','미안했다는 말부터 건넬게','사랑했던 기억을 품에 안고','이제는 너의 행복을 빌어 줄게']},{...base,chorus:['꿈에서라도 너를 만나','미안했다고 말할게','잊지 않을게 그 눈빛','고마웠다고 말할게']}]:[base,{...base,chorus:[...base.chorus].map((line,i)=>i%2?line:`${line} 다시`)},{...base,v1:short.v1||base.v1,chorus:short.chorus||base.chorus,v2:short.v2||base.v2}];const names=['이야기 전개형','감정 집중형','대중적인 후크형'],descs=['1절·2절이 다른 사건으로 이어지는 완성 가사','중심 감정을 후렴에서 선명하게 표현','짧고 기억하기 쉬운 후렴을 반복'];return sets.map((set,i)=>({name:names[i],description:descs[i],set,bars:[...Array(4).fill(''),...set.v1,...set.chorus,...Array(4).fill(''),...set.v2,...set.chorus]}))}

function parseLyricTarget(selectId,customId){const sel=$(selectId),raw=sel?.value||'180';if(raw!=='custom')return Number(raw)||180;const text=$(customId)?.value?.trim()||'3:00',m=text.match(/^(\d{1,2})(?::(\d{1,2}))?$/);if(!m)return 180;const mins=Number(m[1]),secs=Math.min(59,Number(m[2]||0));return Math.max(90,Math.min(420,mins*60+secs))}
function lyricSectionType(title=''){const t=title.toLowerCase();if(/repeat arrangement|반복 편곡/.test(t))return'repeat';if(/pre[- ]?chorus|프리코러스|프리|전후렴/.test(t))return'pre';if(/final.*chorus|last.*chorus|마지막.*후렴|파이널/.test(t))return'final';if(/chorus|refrain|hook|후렴/.test(t))return'chorus';if(/verse|벌스|절/.test(t))return'verse';if(/bridge|브리지/.test(t))return'bridge';if(/intro|interlude|instrumental|간주|인트로/.test(t))return'instrumental';if(/outro|아웃트로|엔딩/.test(t))return'outro';return'other'}
function normalizeLyricLine(line=''){return line.toLowerCase().replace(/[^\p{L}\p{N}]+/gu,'').trim()}
function parseLyricBlocks(text=''){const lines=text.replace(/\r/g,'').split('\n'),blocks=[];let cur={heading:'',lines:[]};const push=()=>{if(cur.heading||cur.lines.some(x=>x.trim()))blocks.push(cur);cur={heading:'',lines:[]}};for(const raw of lines){const line=raw.trimEnd();if(/^\s*\[[^\]]+\]\s*$/.test(line)){push();cur.heading=line.trim()}else if(line.trim()||cur.lines.length)cur.lines.push(line)}push();if(!blocks.length&&text.trim())blocks.push({heading:'',lines:text.trim().split(/\n+/)});return blocks}
function lyricContentLines(block){const out=[];for(const raw of block.lines){const line=raw.trim();if(!line||/^\(.+\)$/.test(line))continue;if(line.includes('/'))line.split('/').map(x=>x.trim()).filter(Boolean).forEach(x=>out.push(x));else out.push(line)}return out}
function pickLyricLines(lines,count,hook=''){const clean=lines.filter(x=>x.trim());if(count>=clean.length)return clean;if(count<=0)return[];const hookNorm=normalizeLyricLine(hook),chosen=new Set([0,clean.length-1]);if(hookNorm){clean.forEach((line,i)=>{if(normalizeLyricLine(line).includes(hookNorm)||hookNorm.includes(normalizeLyricLine(line)))chosen.add(i)})}const seen=new Map();clean.forEach((line,i)=>{const n=normalizeLyricLine(line);if(!n)return;const first=seen.get(n);if(first===undefined)seen.set(n,i);else if(chosen.size<count&&i===clean.length-1)chosen.add(i)});while(chosen.size<count){let best=-1,bestDist=-1;for(let i=0;i<clean.length;i++){if(chosen.has(i))continue;let d=Math.min(...[...chosen].map(j=>Math.abs(i-j)));if(d>bestDist){bestDist=d;best=i}}if(best<0)break;chosen.add(best)}return[...chosen].sort((x,y)=>x-y).slice(0,count).map(i=>clean[i])}
function shortenLyricsText(text,targetSeconds=180){const source=(text||'').trim();if(!source)return{text:'',before:0,after:0,removedSections:0,targetSeconds};const hook=$('#hookLine')?.value?.trim()||'',hasBarSlashes=/\s\/\s|\/\s*[^\n]/.test(source),blocks=parseLyricBlocks(source).map((b,i)=>({...b,index:i,type:lyricSectionType(b.heading),slashMode:b.lines.some(x=>x.includes('/')),content:lyricContentLines(b)}));const before=blocks.reduce((n,b)=>n+b.content.length,0);const targetLines=Math.max(12,Math.round(targetSeconds/(hasBarSlashes?4.5:7.5)));if(before<=targetLines+2)return{text:source,before,after:before,removedSections:0,targetSeconds,unchanged:true};let chorusIndexes=blocks.map((b,i)=>b.type==='chorus'||b.type==='final'?i:-1).filter(i=>i>=0);const keepChorus=new Set();if(chorusIndexes.length){keepChorus.add(chorusIndexes[0]);keepChorus.add(chorusIndexes[chorusIndexes.length-1]);if(targetSeconds>=235&&chorusIndexes.length>2)keepChorus.add(chorusIndexes[Math.floor(chorusIndexes.length/2)])}let working=blocks.filter((b,i)=>b.type!=='repeat'&&(!['chorus','final'].includes(b.type)||keepChorus.has(i)));let removedSections=blocks.length-working.length;const minFor=b=>b.type==='chorus'||b.type==='final'?Math.min(2,b.content.length):b.type==='verse'?Math.min(2,b.content.length):['pre','bridge'].includes(b.type)?Math.min(1,b.content.length):['instrumental','outro'].includes(b.type)?0:Math.min(1,b.content.length);const weight=b=>b.type==='final'?1.65:b.type==='chorus'?1.5:b.type==='verse'?1.0:b.type==='bridge'?.8:b.type==='pre'?.7:['instrumental','outro'].includes(b.type)?.25:.65;let counts=working.map(b=>b.content.length);let total=counts.reduce((x,y)=>x+y,0);while(total>targetLines){let best=-1,bestScore=-Infinity;for(let i=0;i<working.length;i++){const min=minFor(working[i]);if(counts[i]<=min)continue;const score=(counts[i]-min)/(weight(working[i])||.5);if(score>bestScore){bestScore=score;best=i}}if(best<0)break;counts[best]--;total--}const parts=[];working.forEach((b,i)=>{const picked=pickLyricLines(b.content,counts[i],hook);const instrumental=b.lines.filter(x=>/^\(.+\)$/.test(x.trim()));let body='';if(picked.length){if(b.slashMode){const rows=[];for(let j=0;j<picked.length;j+=4)rows.push(picked.slice(j,j+4).join(' / '));body=rows.join('\n')}else body=picked.join('\n')}else if(instrumental.length&&['instrumental','outro'].includes(b.type)&&targetSeconds>=180)body=instrumental[0];if(!body)return;if(b.heading)parts.push(b.heading);parts.push(body)});const out=parts.filter(Boolean).join('\n\n').replace(/\n{3,}/g,'\n\n').trim();const after=parseLyricBlocks(out).reduce((n,b)=>n+lyricContentLines(b).length,0);return{text:out,before,after,removedSections,targetSeconds,unchanged:out===source}}
function formatTargetTime(seconds){const m=Math.floor(seconds/60),s=seconds%60;return`${m}:${String(s).padStart(2,'0')}`}
function lyricShortenSummary(r){if(!r.text)return'가사를 입력해 주세요.';if(r.unchanged)return`현재 가사는 이미 약 ${formatTargetTime(r.targetSeconds)} 목표에 맞는 분량입니다 · ${r.before}구절`;const pct=r.before?Math.max(0,Math.round((1-r.after/r.before)*100)):0;return`약 ${formatTargetTime(r.targetSeconds)} 목표 · ${r.before}구절 → ${r.after}구절 · 약 ${pct}% 축약${r.removedSections?` · 반복 구간 ${r.removedSections}개 정리`:''}`}
function previewComposeShorten(){const src=$('#lyrics').value.trim();if(!src)return toast('먼저 줄일 가사를 입력하거나 새 노래를 만들어 주세요');composeShortenOriginal=src;const target=parseLyricTarget('#composeLyricShortenTarget','#composeLyricShortenCustom');const r=shortenLyricsText(src,target);composeShortenResult=r.text;$('#composeLyricShortenPreview').value=r.text;$('#composeLyricShortenStatus').textContent=lyricShortenSummary(r);$('#applyShortLyrics').disabled=!r.text;$('#restoreBeforeShorten').disabled=false;toast(r.unchanged?'이미 목표 길이에 가까운 가사입니다':'줄인 가사 미리보기를 만들었습니다')}
function applyComposeShorten(){if(!composeShortenResult)return toast('먼저 줄인 가사를 미리보기 해 주세요');if(!composeShortenOriginal)composeShortenOriginal=$('#lyrics').value;$('#lyrics').value=composeShortenResult;applyEditedLyrics(false);$('#composeLyricShortenStatus').textContent='✓ 줄인 가사를 현재 노래와 악보에 적용했습니다. 원본 복원 버튼으로 되돌릴 수 있습니다.';toast('줄인 가사를 적용했습니다')}
function restoreComposeShorten(){if(!composeShortenOriginal)return toast('복원할 원본 가사가 없습니다');$('#lyrics').value=composeShortenOriginal;composeShortenResult='';$('#composeLyricShortenPreview').value='';applyEditedLyrics(false);$('#composeLyricShortenStatus').textContent='↩ 줄이기 전 원본 가사를 복원했습니다.';$('#applyShortLyrics').disabled=true;toast('원본 가사를 복원했습니다')}
function loadCurrentLyricsToAi(){const src=$('#lyrics').value.trim();if(!src)return toast('현재 새 노래 가사 칸이 비어 있습니다');aiShortenOriginal=src;$('#aiLyricShortenSource').value=src;$('#aiLyricShortenStatus').textContent='현재 가사를 가져왔습니다. 목표 길이를 고른 뒤 AI로 줄이기를 누르세요.';toast('현재 가사를 AI 줄이기에 가져왔습니다')}
function runAiLyricShorten(){const src=$('#aiLyricShortenSource').value.trim();if(!src)return toast('AI로 줄일 가사를 입력해 주세요');aiShortenOriginal=src;const target=parseLyricTarget('#aiLyricShortenTarget','#aiLyricShortenCustom');const r=shortenLyricsText(src,target);aiShortenResult=r.text;$('#aiLyricShortenResult').value=r.text;$('#aiLyricShortenStatus').textContent=lyricShortenSummary(r)+' · 후렴 훅과 시작/마지막 흐름을 우선 보존했습니다.';$('#aiApplyShortLyrics').disabled=!r.text;$('#aiRestoreLyrics').disabled=false;toast(r.unchanged?'이미 목표 길이에 가까운 가사입니다':'AI 가사 축약이 끝났습니다')}
function applyAiShortLyrics(){if(!aiShortenResult)return toast('먼저 AI로 가사를 줄여 주세요');if(!composeShortenOriginal)composeShortenOriginal=$('#lyrics').value;$('#lyrics').value=aiShortenResult;applyEditedLyrics(false);$('#aiLyricShortenStatus').textContent='✓ AI 축약 가사를 새 노래 만들기의 현재 가사에 적용했습니다.';toast('AI 축약 가사를 적용했습니다')}
function restoreAiLyrics(){if(!aiShortenOriginal)return toast('복원할 AI 원본 가사가 없습니다');$('#aiLyricShortenSource').value=aiShortenOriginal;$('#aiLyricShortenResult').value='';aiShortenResult='';$('#aiApplyShortLyrics').disabled=true;$('#aiLyricShortenStatus').textContent='↩ AI 줄이기 원본 가사를 다시 불러왔습니다.';toast('AI 원본 가사를 복원했습니다')}
function maybeAutoShortenNewSong(){if(!$('#autoShortenNewSong')?.checked)return;const src=$('#lyrics').value.trim();if(!src)return;composeShortenOriginal=src;const target=Number($('#newSongLyricTarget')?.value||180),r=shortenLyricsText(src,target);if(r.unchanged)return;composeShortenResult=r.text;$('#lyrics').value=r.text;$('#composeLyricShortenPreview').value=r.text;$('#composeLyricShortenStatus').textContent='자동 축약 적용 · '+lyricShortenSummary(r);applyEditedLyrics(true);$('#restoreBeforeShorten').disabled=false;$('#applyShortLyrics').disabled=true}
function lyricsFromBars(bars,intro,mins){return[`[Intro · 4마디]\n(${intro} 멜로디 연주)`,`[Verse 1 · 8마디]\n${bars.slice(4,12).join('\n')}`,`[Chorus · 4마디]\n${bars.slice(12,16).join('\n')}`,`[Interlude · 4마디]\n(${intro} 리듬 변주)`,`[Verse 2 · 8마디]\n${bars.slice(20,28).join('\n')}`,`[Chorus Repeat · 4마디]\n${bars.slice(28,32).join('\n')}`,`[Repeat Arrangement]\n후렴과 핵심 구간을 반복하여 약 ${mins}분 완성`].join('\n\n')}
function targetSongBars(p){const total=p.meter==='6/8'?3:Number(p.meter.split('/')[0]),mins=Number($('#length').value)||4.5;return Math.max(64,Math.min(120,Math.round(mins*p.bpm/total/4)*4))}
function spreadLines(lines,length){const clean=(lines||[]).filter(Boolean),out=Array(length).fill('');if(!clean.length)return out;clean.forEach((line,i)=>out[Math.min(length-1,Math.floor(i*length/clean.length))]=line);return out}
function barSyllableTarget(p=scoreSettings()){const bpm=Number(p.bpm)||96,meter=p.meter||'4/4',beats=meter==='6/8'?3:Number(meter.split('/')[0])||4,base=bpm<=75?4:bpm<=105?6:bpm<=130?9:12;return Math.max(3,Math.round(base*beats/4))}
function lyricLoad(text){return lyricUnits(text).length}
function autoKoreanBars(lines,length,p=scoreSettings()){const clean=(lines||[]).flatMap(line=>String(line||'').split('/')).map(x=>x.trim()).filter(Boolean),target=barSyllableTarget(p),bars=[];for(const line of clean){const words=line.split(/\s+/).filter(Boolean);let current='';for(const word of words){const next=current?`${current} ${word}`:word;if(!current||lyricLoad(next)<=target){current=next;continue}bars.push(current);current=word}if(current)bars.push(current)}if(!bars.length)return Array(length).fill('');return cycleLines(bars,length)}
function phraseTextBars(lines,length,p=scoreSettings()){return autoKoreanBars(lines,length,p)}
function rebuildPhraseGroups(entries){let serial=0,current='',section='';entries.forEach((e,i)=>{if(e.noLyric){e.phraseId='';e.phraseText='';return}if(e.section!==section){section=e.section;current=''}if(e.text||!current){current=`${e.section}:${serial++}`}e.phraseId=current;e.phraseText=e.text||entries.slice(0,i).reverse().find(x=>x.phraseId===current)?.phraseText||''});return entries}
function spreadPhraseEntries(lines,length,section,noLyric,p){if(noLyric)return Array.from({length},()=>({section,text:'',noLyric:true,instrumental:true,phraseId:'',phraseText:''}));const texts=phraseTextBars(lines,length,p),entries=texts.map(text=>({section,text,noLyric:false,instrumental:false}));return rebuildPhraseGroups(entries)}
function buildFullSongPlan(candidate,p){
 const lengths={Intro:4,'Verse 1':16,'Pre-Chorus':4,Chorus:8,Interlude:12,'Verse 2':16,'Pre-Chorus 2':4,'Chorus 2':8,Bridge:8,'Final Chorus':16,Outro:8},mins={Intro:4,'Verse 1':12,'Pre-Chorus':4,Chorus:8,Interlude:4,'Verse 2':12,'Pre-Chorus 2':4,'Chorus 2':8,Bridge:4,'Final Chorus':12,Outro:4},grow=['Interlude','Outro','Final Chorus','Bridge','Verse 1','Verse 2'],target=targetSongBars(p);let current=Object.values(lengths).reduce((a,b)=>a+b,0),cursor=0;
 while(current<target){lengths[grow[cursor++%grow.length]]+=4;current+=4}cursor=0;while(current>target&&cursor<80){const k=grow[cursor++%grow.length];if(lengths[k]>mins[k]){lengths[k]-=4;current-=4}}
 const set=candidate.set,finalLines=[set.chorus[0],set.chorus[1],set.chorus[2],set.chorus[0]],spec=[['Intro',[],true],['Verse 1',set.v1,false],['Pre-Chorus',set.pre,false],['Chorus',set.chorus,false],['Interlude',[],true],['Verse 2',set.v2,false],['Pre-Chorus 2',set.pre,false],['Chorus 2',set.chorus,false],['Bridge',set.bridge,false],['Final Chorus',[...set.chorus,...finalLines],false],['Outro',[],true]],plan=[];
 spec.forEach(([section,lines,noLyric])=>plan.push(...spreadPhraseEntries(lines,lengths[section],section,noLyric,p)));return plan;
}
function lyricsFromPlan(plan,intro){const order=[];for(const e of plan)if(!order.includes(e.section))order.push(e.section);return order.map(section=>{const part=plan.filter(e=>e.section===section),instrumental=part[0]?.noLyric;if(instrumental)return`[${section} · ${part.length}마디]\n(${intro} ${section==='Outro'?'여운':'멜로디 연주'})`;const rows=[];for(let i=0;i<part.length;i+=4)rows.push(part.slice(i,i+4).map(e=>e.text||'—').join(' / '));return`[${section} · ${part.length}마디]\n${rows.join('\n')}`}).join('\n\n')}
function renderLyricCandidates(){$('#lyricCandidates').innerHTML=lyricCandidates.map((c,i)=>`<button class="lyric-candidate ${i===selectedCandidateIndex?'active':''}" data-candidate="${i}"><b>${i+1}. ${esc(c.name)}</b><span>${esc(c.description)}<br>${esc(c.bars.slice(12,14).join(' / '))}</span></button>`).join('');$$('[data-candidate]').forEach(b=>b.onclick=()=>selectLyricCandidate(Number(b.dataset.candidate)))}
function selectLyricCandidate(index){const candidate=lyricCandidates[index];if(!candidate)return;selectedCandidateIndex=index;const p=scoreSettings();songPlan=buildFullSongPlan(candidate,p);songBarTexts=songPlan.map(e=>e.text);barOverrides={};const intro=joinKorean([...selected].slice(0,2));$('#lyrics').value=lyricsFromPlan(songPlan,intro);melodyFirstMode=true;createFixedScore();maybeAutoShortenNewSong();renderLyricCandidates();renderProCompositionCoach(p,$('#lyrics').value);$('#lyricSyncStatus').textContent=`${candidate.name} · ${scoreEntries.length||songPlan.length}마디 전체 곡 · 가사 수정 시 멜로디 유지`;toast(`${candidate.name} 전체 곡을 ${scoreEntries.length||songPlan.length}마디로 작곡했습니다`)}
function fitSectionLines(lines,count){if(lines.length===count)return lines;if(count===8&&lines.length===4)return lines.flatMap(splitNaturalLine);const chunks=storyChunks(lines.join(' '),8);if(!chunks.length)return Array(count).fill('');return Array.from({length:count},(_,i)=>chunks[i%chunks.length])}
function barsFromEditedLyrics(text){if(songPlan.length){const groups={},names=[...new Set(songPlan.map(e=>e.section))];let current='';text.split('\n').forEach(raw=>{const line=raw.trim();if(!line)return;if(/^\[/.test(line)){current=names.find(n=>line.toLowerCase().includes(n.toLowerCase()))||'';if(current&&!groups[current])groups[current]=[];return}if(current&&!/^\(.+\)$/.test(line))groups[current].push(line)});const out=[];names.forEach(name=>{const original=songPlan.filter(e=>e.section===name),lines=groups[name]?.length?groups[name]:original.map(e=>e.text).filter(Boolean),explicit=lines.some(line=>line.includes('/'));if(explicit){const bars=lines.flatMap(line=>line.split('/').map(x=>x.trim()).filter(Boolean));out.push(...Array.from({length:original.length},(_,i)=>bars[i]??original[i]?.text??''))}else out.push(...phraseTextBars(lines,original.length))});return out}const sections={v1:[],chorus:[],v2:[],repeat:[]};let current='';text.split('\n').forEach(raw=>{const line=raw.trim();if(!line)return;if(/^\[/.test(line)){if(/Verse 1/i.test(line))current='v1';else if(/Chorus Repeat/i.test(line))current='repeat';else if(/Chorus/i.test(line))current='chorus';else if(/Verse 2/i.test(line))current='v2';else current='';return}if(current&&!/^\(.+\)$/.test(line))sections[current].push(...line.split('/').map(x=>x.trim()).filter(Boolean))});const v1=fitSectionLines(sections.v1,8),chorus=fitSectionLines(sections.chorus,4),v2=fitSectionLines(sections.v2,8),repeat=sections.repeat.length?fitSectionLines(sections.repeat,4):chorus;return[...Array(4).fill(''),...v1,...chorus,...Array(4).fill(''),...v2,...repeat]}
function applyEditedLyrics(silent=false){if(!$('#lyrics').value.trim())return;const explicit=$('#lyrics').value.includes('/'),nextBars=barsFromEditedLyrics($('#lyrics').value),canKeep=melodyFirstMode&&scoreEntries.length===nextBars.length&&scoreNotes.length>0;songBarTexts=nextBars;if(canKeep){scoreEntries.forEach((e,i)=>{e.text=nextBars[i]||'';if(songPlan[i])songPlan[i].text=e.text});rebuildPhraseGroups(scoreEntries);songPlan=scoreEntries.map(e=>({...e}));createFixedScore()}else createFixedScore();syncLyricsFromScore();const p=scoreSettings(),rule=explicit?'수동 / 마디 고정':`자동 ${p.bpm} BPM · 마디당 약 ${barSyllableTarget(p)}음절`;$('#lyricSyncStatus').textContent=`${rule} · ${scoreNotes.length}개 음표 · ${new Date().toLocaleTimeString('ko-KR',{hour:'2-digit',minute:'2-digit'})}`;if(!silent)toast(explicit?'형이 /로 정한 가사 마디를 그대로 적용했습니다':`${p.bpm} BPM에 맞춰 한국어 단어를 자르지 않고 자동으로 마디를 나눴습니다`)}
function cleanWord(w){return w.replace(/공원\s*(밴츠|밴치|벤취)/g,'공원 벤치').replace(/지지\s*않는/g,'지워지지 않는').replace(/피안(했|한|하)/g,'미안$1').replace(/\s+/g,' ').trim()}
function customWordLine(w){if(w.includes('공원 벤치'))return '공원 벤치에 나란히 앉아 웃던 오후';if(w.includes('바닷가'))return '바닷가에 나란히 남긴 두 사람의 발자국';if(w.includes('카페'))return '작은 카페 창가에 머물던 따뜻한 눈빛';return `${w}에 남겨 둔 우리만의 이야기를 기억해`}
function completeHook(h){const s=cleanWord(h);const known={'눈 맞추기':'눈을 맞추면 마음이 가까워져','돌아선':'돌아선 마음도 다시 피어나','함께':'오늘부터 우리 함께 걸어가','사랑':'사랑아 내 마음에 오래 머물러'};if(known[s])return known[s];if(!s)return '';if(s.length<=5||s.endsWith('기'))return `${s}, 우리 마음에 오래 남아`;return s}
function melodyHook(h){const s=cleanWord(h),known={'눈 맞추기':'눈을 맞춰','돌아선':'다시 돌아','함께':'우리 함께','사랑':'사랑 사랑'};if(!s)return'';if(known[s])return known[s];return[...s.replace(/\s/g,'')].slice(0,4).join('')}
const FINAL_GROWTH={
 love:[['자꾸자꾸 너만 보여','자꾸자꾸 네 생각 나','같은 리듬 같은 마음','조금 더 가까이 우리 함께해'],['이제는 너만 바라볼게','내일도 네 곁을 걸어갈게','같은 리듬 같은 마음','마지막까지 우리 함께 노래해']],
 generic:[['오늘의 이야기를 더 크게 노래해','꾸미지 않은 우리의 목소리로','짧은 한 줄도 서로에게 닿으면','이 노래는 새로운 시작이 되니까'],['마지막 이야기를 함께 노래해','따뜻한 마음을 하나로 모아서','오늘의 진심을 오래 기억하며','우리의 노래는 계속될 테니까']],
 healing:[['바람아 내 마음을 더 씻어 줘','햇살아 지친 어깨를 감싸 줘','천천히 걸어가도 괜찮다고','푸른 하늘이 다시 말해 줘'],['이제는 내 마음이 다시 피어나','햇살을 따라서 한 걸음 나아가','오늘의 평온을 가슴에 품고','새로운 나에게로 돌아갈게']]
};
function finalChorus(base,key,index){if(index===0)return base;return FINAL_GROWTH[key]?.[index-1]||base.map((line,i)=>i===base.length-1?'이 마음을 끝까지 함께 노래해':line)}
function updateLanguageMode(){const value=$('#language').value,custom=value==='custom',auto=automaticLyricsLanguage(),lang=selectedLanguage();$('#customLanguageWrap').hidden=!custom;$('#languageHint').textContent=auto?(value==='English'?'English lyrics: three complete candidates are generated automatically. English words are divided into singable syllables under the notes.':'한국어 이야기를 분석해 한국어 가사 후보 3개를 자동으로 만들고 한글 음절을 음표에 연결합니다.'):`${lang} 가사를 직접 입력하거나 붙여넣으세요. 입력한 /는 마디 경계로 고정되고 문자 체계에 맞춰 음표에 배치됩니다.`}
setTimeout(()=>{$('#language').onchange=updateLanguageMode;$('#customLanguage').oninput=updateLanguageMode;$('#styleMode').onchange=()=>toast($('#styleMode').value==='manual'?'이제 직접 쓴 스타일을 다시 작곡해도 유지합니다':'다음 작곡 때 스타일을 자동 생성합니다');$('#styleLanguage').onchange=()=>toast(`스타일 출력 언어: ${resolvedStyleLanguage()}`);updateLanguageMode()},0);
document.addEventListener('click',e=>{const button=e.target.closest?.('[data-load]');if(!button)return;const songs=JSON.parse(localStorage.getItem('maruSongs')||'[]'),saved=songs[Number(button.dataset.load)];if(!saved)return;setTimeout(()=>{$('#language').value=saved.language||'한국어';$('#customLanguage').value=saved.customLanguage||'';$('#styleMode').value=saved.styleMode||'auto';$('#styleLanguage').value=saved.styleLanguage||'auto';updateLanguageMode()},0)},true);
function makeLyrics(){
 const story=$('#story').value.trim();if(!story){toast('노래 이야기를 먼저 입력해 주세요');$('#story').focus();return}
 const previousLyrics=$('#lyrics').value.trim(),previousStyle=$('#style').value.trim(),previousTitle=$('#title').value.trim(),keepTitle=titleLockedByUser&&!!previousTitle,manualLanguage=!automaticLyricsLanguage();stop();if(!manualLanguage)$('#lyrics').value='';if(!keepTitle)$('#title').value='';songPlan=[];songBarTexts=[];scoreEntries=[];scoreNotes=[];barOverrides={};selectedNoteIndex=-1;const p=analyze();if(!p)return;if(!manualInstrumentSelection||!selected.size)autoPick();else{lastProfile=p;renderInstruments();updateInfo()}const mins=Number($('#length').value),inst=[...selected],lang=selectedLanguage();buildTitleCandidates(p,false);if(keepTitle){$('#title').value=previousTitle}else{$('#title').value=titleCandidates[0]||localizedTitle(p);titleLockedByUser=false}renderTitleCandidates();const blend=$('#blend').value,generatedStyle=resolvedStyleLanguage()==='English'?englishStylePrompt(p,mins,inst,blend,lang):koreanStylePrompt(p,mins,inst,blend,lang);if($('#styleMode').value==='auto'||!previousStyle)$('#style').value=generatedStyle;else $('#style').value=previousStyle;editingSongIndex=-1;
 if(manualLanguage){lyricCandidates=[];selectedCandidateIndex=-1;$('#lyricCandidates').innerHTML=`<p><b>${esc(lang)}</b> 가사를 아래 칸에 직접 붙여넣고 ‘수정 가사를 악보에 반영’을 누르세요. /를 넣으면 원하는 마디 경계가 고정됩니다.</p>`;$('#lyrics').value=previousLyrics;$('#lyricSyncStatus').textContent=`${lang} 수동 가사 대기 · 입력 후 악보에 반영`;if(previousLyrics){melodyFirstMode=false;applyEditedLyrics(false)}else toast(`${lang} 가사를 직접 입력해 주세요`);return}
 lyricCandidates=buildLyricCandidates();selectedCandidateIndex=-1;selectLyricCandidate(0);renderProCompositionCoach(p,$('#lyrics').value);toast(`${lang} 자동 가사 후보 3개를 새로 만들었습니다`)
}
const KEY_ROOTS={C:60,'C#':61,D:62,'D#':63,E:64,F:65,'F#':66,G:67,'G#':68,A:69,'A#':70,B:71};
const KEY_CHORDS={C:['C','G','Am','F'],D:['D','A','Bm','G'],E:['E','B','C#m','A'],F:['F','C','Dm','Bb'],'F#':['F#','C#','D#m','B'],G:['G','D','Em','C'],A:['A','E','F#m','D'],B:['B','F#','G#m','E'],'A Minor':['Am','F','C','G'],'B Minor':['Bm','G','D','A'],'C# Minor':['C#m','A','E','B'],'D Minor':['Dm','Bb','F','C'],'E Minor':['Em','C','G','D'],'F# Minor':['F#m','D','A','E'],'G# Minor':['G#m','E','B','F#']};
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function scoreSettings(){const p={...activeProfile()};if($('#scoreMode').value==='manual'){p.key=$('#manualKey').value;p.meter=$('#manualMeter').value;p.bpm=Math.max(45,Math.min(180,Number($('#manualBpm').value)||96))}return p}
function barRhythm(mode,total,bar,section,instrumental){if(instrumental)return total===4?[2,2]:[2,1];if(mode==='whole')return[total];if(mode==='half')return total===4?[2,2]:[2,1];if(mode==='quarter')return Array(total).fill(1);if(mode==='eighth')return Array(total*2).fill(.5);if(mode==='sixteenth')return Array(total*4).fill(.25);if(mode==='thirtysecond')return Array(total*8).fill(.125);if(mode==='sixtyfourth')return Array(total*16).fill(.0625);const mixed=total===4?[[1,.5,.5,1,1],[.5,.5,1,2],[1,1,.5,.5,1],[2,.5,.5,1]]:[[1,.5,.5,1],[.5,.5,1,1],[1,1,1]];if(mode==='mixed')return mixed[bar%mixed.length];if(/Chorus|Hook/.test(section))return mixed[bar%mixed.length];if(/Bridge|Verse/.test(section))return bar%3===0?mixed[bar%mixed.length]:Array(total).fill(1);return total===4?[2,1,1]:[1,1,1]}
function balancedDurations(count,total,rotate=0){const max=Math.round(total/.0625),target=Math.max(1,Math.min(max,count)),out=[total];while(out.length<target){let best=0;for(let i=1;i<out.length;i++)if(out[i]>out[best])best=i;const half=out[best]/2;if(half<.0625)break;out.splice(best,1,half,half)}if(rotate&&out.length>1)out.push(...out.splice(0,rotate%out.length));return out}
function automaticBarRhythm(p,total,bar){const entry=scoreEntries[bar];if(!entry?.phraseId)return barRhythm('half',total,bar,entry?.section||'',true);const phraseBars=scoreEntries.map((e,i)=>e.phraseId===entry.phraseId?i:-1).filter(i=>i>=0),syllables=Math.max(1,lyricUnits(entry.phraseText||entry.text).length),wanted=Math.max(phraseBars.length,Math.min(phraseBars.length*Math.round(total/.0625),syllables)),position=phraseBars.indexOf(bar),base=Math.floor(wanted/phraseBars.length),extra=wanted%phraseBars.length,count=base+(position<extra?1:0);return balancedDurations(count,total,bar)}
function syllableRhythm(count,total){const max=total*4,n=Math.max(1,Math.min(max,count));if(n===1)return[total];if(n<=total){const out=Array(n).fill(1);out[0]+=total-n;return out}if(n<=total*2){const eighths=(n-total)*2,quarters=n-eighths;return[...Array(eighths).fill(.5),...Array(quarters).fill(1)]}const out=Array(n).fill(.25);let remain=total-n*.25,i=0;while(remain>.001){out[i%n]+=.25;remain-=.25;i++}return out}
function dynamicMark(section,choice){if(choice!=='auto')return choice;if(/Final Chorus/.test(section))return'f';if(/Chorus|Hook/.test(section))return'mf';if(/Intro|Outro|Interlude/.test(section))return'p';return'mp'}
const DYNAMIC_VOLUME={pp:.025,p:.04,mp:.055,mf:.075,f:.095,ff:.12};
function lyricChars(text){return[...String(text||'').replace(/[\s,.!?·'"()]/g,'')].length}
const EN_SYLLABLES={ordinary:['or','di','nar','y'],together:['to','ge','ther'],every:['ev','ery'],everything:['ev','ery','thing'],memory:['mem','o','ry'],melody:['mel','o','dy'],tomorrow:['to','mor','row'],happiness:['hap','pi','ness'],quietly:['qui','et','ly'],somebody:['some','bod','y'],courage:['cour','age'],season:['sea','son'],sunlight:['sun','light'],again:['a','gain'],begin:['be','gin'],begins:['be','gins'],little:['lit','tle'],message:['mes','sage'],remembering:['re','mem','ber','ing'],celebrate:['cel','e','brate'],celebration:['cel','e','bra','tion'],beautiful:['beau','ti','ful'],waiting:['wait','ing'],inside:['in','side'],into:['in','to'],without:['with','out'],around:['a','round'],behind:['be','hind'],tonight:['to','night'],higher:['high','er'],rhythm:['rhyth','m'],voices:['voic','es'],final:['fi','nal']};
function latinWordSyllables(raw){const prefix=(raw.match(/^[^\p{L}]*/u)||[''])[0],suffix=(raw.match(/[^\p{L}]*$/u)||[''])[0],word=raw.slice(prefix.length,raw.length-suffix.length||undefined);if(!word)return[];const lower=word.toLocaleLowerCase(),known=EN_SYLLABLES[lower];let parts;if(known)parts=[...known];else{const chars=[...word],isVowel=c=>/[aeiouyáéíóúüàèìòùâêîôûäëïöü]/i.test(c),nuclei=[];for(let i=0;i<chars.length;i++)if(isVowel(chars[i])&&(i===0||!isVowel(chars[i-1])))nuclei.push(i);if(nuclei.length>1&&/e$/i.test(word)&&!/le$/i.test(word))nuclei.pop();if(nuclei.length<2)parts=[word];else{const cuts=[];for(let i=0;i<nuclei.length-1;i++){const next=nuclei[i+1],previousEnd=next-1;let consonants=0;for(let j=next-1;j>=0&&!isVowel(chars[j]);j--)consonants++;cuts.push(Math.max(1,next-Math.max(1,Math.floor(consonants/2))))}let start=0;parts=cuts.map(c=>{const p=chars.slice(start,c).join('');start=c;return p}).concat(chars.slice(start).join('')).filter(Boolean)}}if(prefix)parts[0]=prefix+parts[0];if(suffix)parts[parts.length-1]+=suffix;return parts.map((part,i)=>i<parts.length-1?part+'-':part)}
function lyricUnits(text){const s=String(text||'').trim();if(!s)return[];if(/[\p{Script=Latin}]/u.test(s)&&!/[가-힣]/.test(s))return s.split(/\s+/).filter(Boolean).flatMap(latinWordSyllables);if(/[가-힣]/.test(s))return[...s.replace(/[\s,.!?·'"()]/g,'')];if(/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/u.test(s))return[...s.replace(/[\s,.!?·'"()]/g,'')];return s.split(/\s+/).filter(Boolean)}
function distributeLyric(text,noteCount){
 const units=lyricUnits(text);if(!noteCount)return[];if(!units.length)return Array(noteCount).fill('');
 const out=Array(noteCount).fill('—');
 if(units.length<=noteCount){units.forEach((u,i)=>out[Math.min(noteCount-1,Math.floor(i*noteCount/units.length))]=u);return out}
 out.fill('');units.forEach((u,i)=>{const slot=Math.min(noteCount-1,Math.floor(i*noteCount/units.length));out[slot]+=u});return out;
}
function assignBarLyrics(bar){const entry=scoreEntries[bar];if(!entry)return;const phraseId=entry.phraseId;if(!phraseId){scoreNotes.filter(n=>n.bar===bar).forEach(n=>n.lyric='');return}const bars=scoreEntries.map((e,i)=>e.phraseId===phraseId?i:-1).filter(i=>i>=0),notes=scoreNotes.filter(n=>bars.includes(n.bar)),text=scoreEntries.find(e=>e.phraseId===phraseId&&e.phraseText)?.phraseText||entry.phraseText||entry.text,labels=distributeLyric(text,notes.length);notes.forEach((n,i)=>n.lyric=labels[i]||'—')}
function assignAllLyrics(){const done=new Set();scoreEntries.forEach((e,bar)=>{const key=e.phraseId||`bar:${bar}`;if(done.has(key))return;done.add(key);assignBarLyrics(bar)})}
function sectionDegrees(section,bar,count){
 const phrase=bar%4,verse=[[0,2,3,2,1,0],[1,2,4,3,2,1],[2,3,4,5,4,2],[3,2,1,0]],pre=[[2,3,4,4],[3,4,5,5],[4,5,6,6],[5,6,7,6]],chorus=[[4,4,5,6,5,4],[4,5,6,7,6,5],[5,6,7,8,7,5],[6,5,4,2]],intro=[[0,2,4,2],[1,3,5,3],[2,4,5,4],[3,2,1,0]],bridge=[[2,4,6,5],[4,6,8,7],[5,7,9,8],[7,5,4,2]];
 const bank=/Chorus|Hook/.test(section)?chorus:/Pre-Chorus/.test(section)?pre:/Bridge/.test(section)?bridge:/Intro|Interlude|Outro/.test(section)?intro:verse,src=bank[phrase];return Array.from({length:count},(_,i)=>src[Math.min(src.length-1,Math.floor(i*src.length/count))]);
}
function lyricCapacity(p){if(p.meter==='6/8')return p.bpm>=100?7:5;if(p.meter==='3/4')return p.bpm>=110?7:5;return p.bpm>=120?8:p.bpm<=80?5:6}
function splitLyric(text,max){const words=text.trim().split(/\s+/),parts=[];let line='';for(const word of words){const next=line?`${line} ${word}`:word;if(lyricChars(next)<=max){line=next;continue}if(line)parts.push(line);if(lyricChars(word)<=max){line=word;continue}const chars=[...word];while(chars.length>max)parts.push(chars.splice(0,max).join(''));line=chars.join('')}if(line)parts.push(line);return parts.length?parts:['']}
function pitchDegree(raw,mode,beat,count){if(mode==='low')return Math.max(0,raw-2);if(mode==='high')return Math.min(8,raw+3);if(mode==='middle')return Math.max(2,Math.min(6,raw));if(mode==='rise')return Math.min(8,beat+1);if(mode==='fall')return Math.max(0,count-beat);return raw}
function updateBarEditor(){const i=Number($('#barSelect').value),item=scoreEntries[i];if(!item)return;const phraseStart=scoreEntries.findIndex(e=>e.phraseId&&e.phraseId===item.phraseId),o=barOverrides[i]||barOverrides[phraseStart]||{};$('#barLyrics').value=o.text??item.phraseText??item.text;$('#barRhythm').value=o.rhythm||'auto';$('#barPitch').value=o.pitch||'auto';$('#barDynamic').value=o.dynamic||'auto';updateBarCount()}
function updateBarCount(){const n=lyricChars($('#barLyrics').value),i=Number($('#barSelect').value),barNotes=scoreNotes.filter(x=>x.bar===i),notes=barNotes.length||4,used=barNotes.reduce((s,x)=>s+x.duration,0),p=scoreSettings(),total=p.meter==='6/8'?3:Number(p.meter.split('/')[0]),beatOk=Math.abs(used-total)<.001,fit=n===notes?'한 음표에 한 음절':n>notes?`긴 가사를 ${notes}개 음표에 자연스럽게 묶음`:`${notes-n}개 음표는 여음으로 유지`;$('#barCount').textContent=`${n}글자 · ${notes}음표 · ${used}/${total}박`;$('#barWarning').textContent=!beatOk?`박자 합계가 맞지 않습니다. 적용하면 ${total}박으로 자동 정리됩니다.`:`박자 정상 · ${fit}`;$('#barWarning').classList.toggle('over',!beatOk)}
function noteFraction(d){return d>=4?'1/1':d>=2?'1/2':d>=1?'1/4':d>=.5?'1/8':d>=.25?'1/16':d>=.125?'1/32':'1/64'}
function drawFractionLabels(){const svg=$('#scoreSvg');if(!svg)return;const p=scoreSettings(),total=p.meter==='6/8'?3:Number(p.meter.split('/')[0]),ns='http://www.w3.org/2000/svg';scoreEntries.forEach((_,bar)=>{const notes=scoreNotes.filter(n=>n.bar===bar),x0=75+(bar%4)*207.5,top=65+Math.floor(bar/4)*155;let elapsed=0;notes.forEach(n=>{const text=document.createElementNS(ns,'text'),x=x0+18+(elapsed/total)*178,y=top+42-n.degree*6;text.setAttribute('x',x);text.setAttribute('y',top+61);text.setAttribute('text-anchor','middle');text.setAttribute('font-size',n.duration<.5?'6':'8');text.setAttribute('fill','#6f3bd2');text.textContent=noteFraction(n.duration);svg.appendChild(text);const extra=n.duration<=.125?2:n.duration<=.25?1:0;for(let k=1;k<=extra;k++){const path=document.createElementNS(ns,'path');path.setAttribute('d',`M ${x+6} ${y-30+k*6} q 13 7 4 18`);path.setAttribute('fill','none');path.setAttribute('stroke','#111');path.setAttribute('stroke-width','1.6');svg.appendChild(path)}elapsed+=n.duration});if(notes[0]){const dyn=document.createElementNS(ns,'text');dyn.setAttribute('x',x0+175);dyn.setAttribute('y',top+100);dyn.setAttribute('font-size','14');dyn.setAttribute('font-style','italic');dyn.setAttribute('font-weight','800');dyn.setAttribute('fill','#b02a62');dyn.textContent=notes[0].dynamic;svg.appendChild(dyn)}})}
function vexDuration(d){return d>=4?'w':d>=2?'h':d>=1?'q':d>=.5?'8':d>=.25?'16':d>=.125?'32':'64'}
function isDottedDuration(d){return[3,1.5,.75,.375,.1875,.09375].some(x=>Math.abs(d-x)<.0001)}
function notationDuration(n){return n.displayDuration||n.duration}
function beamGroups(VF,meter){return meter[0]===6&&meter[1]===8?[new VF.Fraction(3,8)]:[new VF.Fraction(1,4)]}
function midiKey(midi){const names=['c','c#','d','d#','e','f','f#','g','g#','a','a#','b'],oct=Math.floor(midi/12)-1;return`${names[midi%12]}/${oct}`}
function renderEngravedScore(){const VF=window.VexFlow;if(!VF||!scoreEntries.length)return false;const p=scoreSettings(),meter=p.meter.split('/').map(Number),barsPerSystem=4,systems=Math.ceil(scoreEntries.length/barsPerSystem),width=1200,height=systems*180+35,host=$('#scoreSheet');host.innerHTML=`<div class="engraved-title">${esc($('#title').value||'MARU SONG')} · 클릭해서 고치는 전체 오선악보</div><div id="vexScore"></div>`;const renderer=new VF.Renderer($('#vexScore'),VF.Renderer.Backends.SVG);renderer.resize(width,height);const context=renderer.getContext(),keyName=p.key.replace(' Major','').replace(' Minor','m'),chordRoot=p.key.split(' ')[0],chords=KEY_CHORDS[p.key]||KEY_CHORDS[chordRoot]||KEY_CHORDS.G;for(let bar=0;bar<scoreEntries.length;bar++){const system=Math.floor(bar/barsPerSystem),slot=bar%barsPerSystem,x=20+slot*295,y=25+system*180,stave=new VF.Stave(x,y,295);if(slot===0)stave.addClef('treble').addTimeSignature(p.meter).addKeySignature(keyName);if(bar===0||scoreEntries[bar-1].section!==scoreEntries[bar].section)stave.setText(scoreEntries[bar].section,VF.Modifier.Position.ABOVE,{shift_y:-8});stave.setContext(context).draw();const source=scoreNotes.filter(n=>n.bar===bar),letters=[...scoreEntries[bar].text.replace(/[\s,.!?·'\"()]/g,'')];let lyricIndex=0;const notes=source.map((n,i)=>{const rest=scoreEntries[bar].instrumental||n.rest,syllable=rest||scoreEntries[bar].noLyric?'':(letters[lyricIndex++]||'－'),duration=vexDuration(n.duration)+(rest?'r':''),note=new VF.StaveNote({clef:'treble',keys:[rest?'b/4':midiKey(n.midi)],duration});if(n.duration===1.5||n.duration===3)VF.Dot.buildAndAttach([note],{all:true});if(syllable)note.addModifier(new VF.Annotation(syllable).setFont('sans-serif',11).setVerticalJustification(VF.Annotation.VerticalJustify.BOTTOM));if(i===0){note.addModifier(new VF.Annotation(chords[bar%4]).setFont('sans-serif',13,'bold').setVerticalJustification(VF.Annotation.VerticalJustify.TOP));note.addModifier(new VF.Annotation(n.dynamic).setFont('serif',13,'italic').setVerticalJustification(VF.Annotation.VerticalJustify.BOTTOM).setJustification(VF.Annotation.HorizontalJustify.LEFT))}return note});const voice=new VF.Voice({num_beats:meter[0],beat_value:meter[1]}).setStrict(false);voice.addTickables(notes);new VF.Formatter().joinVoices([voice]).format([voice],slot===0?195:255);voice.draw(context,stave);VF.Beam.generateBeams(notes).forEach(beam=>beam.setContext(context).draw())}const svg=$('#vexScore svg');if(svg){svg.id='scoreSvg';svg.setAttribute('viewBox',`0 0 ${width} ${height}`);svg.setAttribute('aria-label','가사 음절과 리듬을 맞춘 정식 전체 악보');const ns='http://www.w3.org/2000/svg';scoreEntries.forEach((_,bar)=>{const system=Math.floor(bar/4),slot=bar%4,x=20+slot*295,y=25+system*180,label=document.createElementNS(ns,'text'),hit=document.createElementNS(ns,'rect');hit.setAttribute('x',x);hit.setAttribute('y',y+18);hit.setAttribute('width',295);hit.setAttribute('height',118);hit.setAttribute('class','measure-hitbox');hit.dataset.barSelect=String(bar);svg.insertBefore(hit,svg.firstChild);label.setAttribute('x',x+6);label.setAttribute('y',y+18);label.setAttribute('class','measure-number');label.dataset.barSelect=String(bar);label.textContent=`${bar+1}마디`;svg.appendChild(label);[x,x+295].forEach(lineX=>{const line=document.createElementNS(ns,'line');line.setAttribute('x1',lineX);line.setAttribute('x2',lineX);line.setAttribute('y1',y+40);line.setAttribute('y2',y+80);line.setAttribute('class','measure-divider');svg.appendChild(line)})});[...svg.querySelectorAll('.vf-stavenote')].forEach((el,i)=>{el.dataset.note=String(i);el.dataset.bar=String(scoreNotes[i]?.bar??'');el.dataset.midi=String(scoreNotes[i]?.midi??'');el.dataset.duration=String(scoreNotes[i]?.duration??'');el.classList.add('score-note');if(i===selectedNoteIndex)el.classList.add('selected')})}return true}
function renderReadableScore(){const VF=window.VexFlow;if(!VF||!scoreEntries.length)return false;const p=scoreSettings(),meter=p.meter.split('/').map(Number),barsPerSystem=4,systems=Math.ceil(scoreEntries.length/barsPerSystem),barWidth=350,systemHeight=225,width=1440,height=systems*systemHeight+70,host=$('#scoreSheet');host.innerHTML=`<div class="engraved-title">${esc($('#title').value||'MARU SONG')} · 한 줄 4마디 전체 오선악보</div><div id="vexScore"></div>`;const renderer=new VF.Renderer($('#vexScore'),VF.Renderer.Backends.SVG);renderer.resize(width,height);const context=renderer.getContext(),keyName=p.key.replace(' Major','').replace(' Minor','m'),chordRoot=p.key.split(' ')[0],chords=KEY_CHORDS[p.key]||KEY_CHORDS[chordRoot]||KEY_CHORDS.G;for(let bar=0;bar<scoreEntries.length;bar++){const system=Math.floor(bar/barsPerSystem),slot=bar%barsPerSystem,x=20+slot*barWidth,y=55+system*systemHeight,stave=new VF.Stave(x,y,barWidth);if(slot===0)stave.addClef('treble').addTimeSignature(p.meter).addKeySignature(keyName);stave.setContext(context).draw();const source=scoreNotes.filter(n=>n.bar===bar),letters=[...scoreEntries[bar].text.replace(/[\s,.!?·'"()]/g,'')];let lyricIndex=0;const notes=source.map((n,i)=>{const rest=scoreEntries[bar].instrumental||n.rest,syllable=rest||scoreEntries[bar].noLyric?'':(letters[lyricIndex++]||'－'),duration=vexDuration(n.duration)+(rest?'r':''),note=new VF.StaveNote({clef:'treble',keys:[rest?'b/4':midiKey(n.midi)],duration});if(n.duration===1.5||n.duration===3)VF.Dot.buildAndAttach([note],{all:true});if(syllable)note.addModifier(new VF.Annotation(syllable).setFont('sans-serif',14,'bold').setVerticalJustification(VF.Annotation.VerticalJustify.BOTTOM));if(i===0){const chordLabel=scoreEntries[bar]?.transcribed&&importedSongAnalysis?.barChords?.[bar]?importedSongAnalysis.barChords[bar]:chords[bar%4];note.addModifier(new VF.Annotation(chordLabel).setFont('sans-serif',15,'bold').setVerticalJustification(VF.Annotation.VerticalJustify.TOP));}return note});const voice=new VF.Voice({num_beats:meter[0],beat_value:meter[1]}).setStrict(false);voice.addTickables(notes);new VF.Formatter().joinVoices([voice]).format([voice],Math.max(120,barWidth-(slot===0?82:34)));voice.draw(context,stave);VF.Beam.generateBeams(notes).forEach(beam=>beam.setContext(context).draw())}const svg=$('#vexScore svg');if(!svg)return false;svg.id='scoreSvg';svg.setAttribute('viewBox',`0 0 ${width} ${height}`);svg.setAttribute('aria-label','큰 음표와 가사 음절을 맞춘 한 줄 4마디 전체 악보');const ns='http://www.w3.org/2000/svg';for(let system=0;system<systems;system++){const y=35+system*systemHeight,bg=document.createElementNS(ns,'rect'),line=document.createElementNS(ns,'line'),first=scoreEntries[system*4];bg.setAttribute('x','10');bg.setAttribute('y',String(y));bg.setAttribute('width','1420');bg.setAttribute('height','190');bg.setAttribute('rx','8');bg.setAttribute('class','system-background');svg.insertBefore(bg,svg.firstChild);line.setAttribute('x1','10');line.setAttribute('x2','1430');line.setAttribute('y1',String(y+189));line.setAttribute('y2',String(y+189));line.setAttribute('class','system-divider');svg.appendChild(line);const section=document.createElementNS(ns,'text');section.setAttribute('x','24');section.setAttribute('y',String(y+18));section.setAttribute('class','section-label');section.textContent=first?.section||'';svg.appendChild(section)}scoreEntries.forEach((item,bar)=>{const system=Math.floor(bar/4),slot=bar%4,x=20+slot*barWidth,y=55+system*systemHeight,label=document.createElementNS(ns,'text'),lyric=document.createElementNS(ns,'text'),dyn=document.createElementNS(ns,'text'),hit=document.createElementNS(ns,'rect');hit.setAttribute('x',String(x));hit.setAttribute('y',String(y+18));hit.setAttribute('width',String(barWidth));hit.setAttribute('height','145');hit.setAttribute('class','measure-hitbox');hit.dataset.barSelect=String(bar);svg.insertBefore(hit,svg.firstChild);label.setAttribute('x',String(x+8));label.setAttribute('y',String(y+18));label.setAttribute('class','measure-number');label.dataset.barSelect=String(bar);label.textContent=`${bar+1}마디`;svg.appendChild(label);lyric.setAttribute('x',String(x+barWidth/2));lyric.setAttribute('y',String(y+136));lyric.setAttribute('text-anchor','middle');lyric.setAttribute('class','measure-lyric');lyric.textContent=item.noLyric||!item.text?'(연주)':item.text;svg.appendChild(lyric);const firstNote=scoreNotes.find(n=>n.bar===bar);if(firstNote){dyn.setAttribute('x',String(x+barWidth-34));dyn.setAttribute('y',String(y+158));dyn.setAttribute('class','measure-dynamic');dyn.textContent=firstNote.dynamic;svg.appendChild(dyn)}[x,x+barWidth].forEach((lineX,i)=>{const divider=document.createElementNS(ns,'line');divider.setAttribute('x1',String(lineX));divider.setAttribute('x2',String(lineX));divider.setAttribute('y1',String(y+40));divider.setAttribute('y2',String(y+82));divider.setAttribute('class',`measure-divider ${slot===3&&i===1?'system-end':''}`);svg.appendChild(divider)})});[...svg.querySelectorAll('.vf-stavenote')].forEach((el,i)=>{el.dataset.note=String(i);el.dataset.bar=String(scoreNotes[i]?.bar??'');el.dataset.midi=String(scoreNotes[i]?.midi??'');el.dataset.duration=String(scoreNotes[i]?.duration??'');el.classList.add('score-note');if(i===selectedNoteIndex)el.classList.add('selected')});applyScoreView();return true}
function applyScoreView(mode){const sheet=$('#scoreSheet');if(mode){sheet.classList.remove('fit','large');if(mode!=='normal')sheet.classList.add(mode);sheet.dataset.view=mode}const view=sheet.dataset.view||'fit',labels={fit:'한 줄 4마디 화면 맞춤',normal:'읽기 편한 크기',large:'가장 크게 보기'};$('#scoreZoomLabel').textContent=labels[view];[['scoreSmaller','fit'],['scoreNormal','normal'],['scoreLarger','large']].forEach(([id,value])=>{$('#'+id).className=value===view?'primary':'secondary'})}
function renderReadableScoreV011(){
 const VF=window.VexFlow;if(!VF||!scoreEntries.length)return false;assignAllLyrics();
 const p=scoreSettings(),meter=p.meter.split('/').map(Number),compact=scoreEntries.every(e=>e.transcribed&&!e.text),barWidth=compact?225:260,systemHeight=compact?116:155,systems=Math.ceil(scoreEntries.length/4),width=40+barWidth*4,height=systems*systemHeight+48;
 $('#scoreSheet').innerHTML=`<div class="engraved-title">${esc($('#title').value||'MARU SONG')} · 한 줄 4마디 · 가사 음절 자동 배치</div><div id="vexScore"></div>`;
 const renderer=new VF.Renderer($('#vexScore'),VF.Renderer.Backends.SVG);renderer.resize(width,height);const context=renderer.getContext(),keyName=p.key.replace(' Major','').replace(' Minor','m'),chords=KEY_CHORDS[p.key]||KEY_CHORDS[p.key.split(' ')[0]]||KEY_CHORDS.G;
 for(let bar=0;bar<scoreEntries.length;bar++){
  const slot=bar%4,system=Math.floor(bar/4),x=20+slot*barWidth,y=(compact?36:45)+system*systemHeight,stave=new VF.Stave(x,y,barWidth);if(slot===0)stave.addClef('treble').addTimeSignature(p.meter).addKeySignature(keyName);stave.setContext(context).draw();
  const source=scoreNotes.filter(n=>n.bar===bar),notes=source.map((n,i)=>{const rest=scoreEntries[bar].noLyric||n.rest,shown=notationDuration(n),duration=vexDuration(shown)+(rest?'r':''),note=new VF.StaveNote({clef:'treble',keys:[rest?'b/4':midiKey(n.midi)],duration});if(isDottedDuration(shown))VF.Dot.buildAndAttach([note],{all:true});if(!rest&&n.lyric)note.addModifier(new VF.Annotation(n.lyric).setFont('sans-serif',14,'bold').setVerticalJustification(VF.Annotation.VerticalJustify.BOTTOM));if(i===0){const chordLabel=scoreEntries[bar]?.transcribed&&importedSongAnalysis?.barChords?.[bar]?importedSongAnalysis.barChords[bar]:chords[bar%4];note.addModifier(new VF.Annotation(chordLabel).setFont('sans-serif',15,'bold').setVerticalJustification(VF.Annotation.VerticalJustify.TOP));}return note});
  const groups=new Map();source.forEach((n,i)=>{if(n.tupletGroup){if(!groups.has(n.tupletGroup))groups.set(n.tupletGroup,[]);groups.get(n.tupletGroup).push(notes[i])}});const tuplets=[...groups.values()].filter(group=>group.length===3).map(group=>new VF.Tuplet(group,{num_notes:3,notes_occupied:2}));
  const voice=new VF.Voice({num_beats:meter[0],beat_value:meter[1]}).setStrict(false);voice.addTickables(notes);new VF.Formatter().joinVoices([voice]).format([voice],Math.max(110,barWidth-(slot===0?82:28)));voice.draw(context,stave);
  VF.Beam.generateBeams(notes,{groups:beamGroups(VF,meter),beam_rests:false}).forEach(b=>b.setContext(context).draw());
  tuplets.forEach(t=>t.setContext(context).draw());
  source.forEach((n,i)=>{if(n.tieNext&&notes[i+1])new VF.StaveTie({firstNote:notes[i],lastNote:notes[i+1],firstIndexes:[0],lastIndexes:[0]}).setContext(context).draw();if(n.slurNext&&notes[i+1]&&VF.Curve)new VF.Curve(notes[i],notes[i+1],{position:VF.Modifier.Position.ABOVE}).setContext(context).draw()});
 }
 const svg=$('#vexScore svg');if(!svg)return false;svg.id='scoreSvg';svg.setAttribute('viewBox',`0 0 ${width} ${height}`);const ns='http://www.w3.org/2000/svg';scoreEntries.forEach((item,bar)=>{const slot=bar%4,system=Math.floor(bar/4),x=20+slot*barWidth,y=(compact?36:45)+system*systemHeight,hit=document.createElementNS(ns,'rect'),label=document.createElementNS(ns,'text'),line=document.createElementNS(ns,'line');hit.setAttribute('x',x);hit.setAttribute('y',y+18);hit.setAttribute('width',barWidth);hit.setAttribute('height',compact?82:118);hit.setAttribute('class','measure-hitbox');hit.dataset.barSelect=bar;svg.insertBefore(hit,svg.firstChild);label.setAttribute('x',x+8);label.setAttribute('y',y+18);label.setAttribute('class','measure-number');label.dataset.barSelect=bar;label.textContent=compact?`${bar+1}`:`${bar+1}마디 · ${item.section}`;svg.appendChild(label);line.setAttribute('x1',x+barWidth);line.setAttribute('x2',x+barWidth);line.setAttribute('y1',y+40);line.setAttribute('y2',y+82);line.setAttribute('class',`measure-divider ${slot===3?'system-end':''}`);svg.appendChild(line)});[...svg.querySelectorAll('.vf-stavenote')].forEach((el,i)=>{el.dataset.note=i;el.classList.add('score-note');if(i===selectedNoteIndex)el.classList.add('selected')});applyScoreView();return true;
}
function fillBarEditor(){if(!renderReadableScoreV011())drawFractionLabels();const current=$('#barSelect').value;$('#barSelect').innerHTML=scoreEntries.map((e,i)=>`<option value="${i}">${i+1}마디 · ${esc(e.section)} · ${esc(e.text)}</option>`).join('');$('#barSelect').value=current&&scoreEntries[current]?current:'0';selectedBarIndex=Number($('#barSelect').value)||0;if(!selectionCustom)selectionEndBar=Math.max(0,scoreEntries.length-1);updateBarEditor();updateRangeUI()}
function normalizedRange(){const last=Math.max(0,scoreEntries.length-1);if(!selectionCustom)return[0,last];return[Math.max(0,Math.min(last,Math.min(selectionStartBar,selectionEndBar))),Math.max(0,Math.min(last,Math.max(selectionStartBar,selectionEndBar)))]}
function updateRangeUI(){const[a,b]=normalizedRange(),status=$('#rangeStatus');if(status)status.textContent=selectionCustom?`선택 구간: ${a+1}~${b+1}마디 (${b-a+1}마디)`:`선택 구간: 전체 곡 (${scoreEntries.length}마디)`;$$('.measure-hitbox').forEach(x=>{const i=Number(x.dataset.barSelect);x.classList.toggle('range-selected',i>=a&&i<=b);x.classList.toggle('range-start',selectionCustom&&i===a);x.classList.toggle('range-end',selectionCustom&&i===b);x.classList.toggle('selected',i===selectedBarIndex)})}
function setRangeEdge(edge){if(!scoreEntries.length)return toast('먼저 악보를 만들어 주세요');selectionCustom=true;if(edge==='start')selectionStartBar=selectedBarIndex;else selectionEndBar=selectedBarIndex;if(selectionEndBar<0)selectionEndBar=selectionStartBar;updateRangeUI();const[a,b]=normalizedRange();toast(`${a+1}~${b+1}마디를 선택했습니다`)}
function clearRange(){selectionCustom=false;selectionStartBar=0;selectionEndBar=Math.max(0,scoreEntries.length-1);updateRangeUI();toast('전체 곡을 선택했습니다')}
function selectBarFromScore(i){if(!scoreEntries[i])return;selectedBarIndex=i;$('#barSelect').value=String(i);updateBarEditor();updateRangeUI();$('#barWarning').textContent=`${i+1}마디를 선택했습니다. 수정하거나 구간의 시작·끝으로 지정하세요.`;document.querySelector('.bar-editor')?.scrollIntoView?.({block:'center',behavior:'smooth'})}
function syncLyricsFromScore(){if(!melodyFirstMode||!scoreEntries.length)return;songBarTexts=scoreEntries.map(x=>x.text);songPlan=scoreEntries.map(x=>({...x}));$('#lyrics').value=lyricsFromPlan(songPlan,joinKorean([...selected].slice(0,2)))}
function applyBarEdit(){const i=Number($('#barSelect').value),item=scoreEntries[i];if(!item)return toast('수정할 마디를 선택해 주세요');const edit={text:$('#barLyrics').value.trim(),rhythm:$('#barRhythm').value,pitch:$('#barPitch').value,dynamic:$('#barDynamic').value},phraseBars=item.phraseId?scoreEntries.map((e,n)=>e.phraseId===item.phraseId?n:-1).filter(n=>n>=0):[i],start=phraseBars[0];phraseBars.forEach((bar,pos)=>barOverrides[bar]={text:pos===0?edit.text:'',rhythm:edit.rhythm,pitch:edit.pitch,dynamic:edit.dynamic});createScore();syncLyricsFromScore();$('#barSelect').value=String(i);updateBarEditor();selectBarFromScore(i);toast(`${start+1}~${phraseBars.at(-1)+1}마디의 가사와 음표를 함께 맞췄습니다`)}
const NOTE_NAMES=['도','도♯','레','레♯','미','파','파♯','솔','솔♯','라','라♯','시'];
function noteName(midi){return`${NOTE_NAMES[midi%12]}${Math.floor(midi/12)-1}`}
function prepareNoteEditor(){if(!$('#notePitch').options.length){for(let midi=48;midi<=84;midi++)$('#notePitch').add(new Option(`${noteName(midi)} · MIDI ${midi}`,midi))}}
function selectNote(index){const n=scoreNotes[index];if(!n)return;selectedNoteIndex=index;selectedBarIndex=n.bar;prepareNoteEditor();const barNotes=scoreNotes.filter(x=>x.bar===n.bar),ordinal=barNotes.indexOf(n)+1,label=`${n.bar+1}마디 · ${ordinal}번째 음표`,isTuplet=!!n.tupletGroup,hasNext=ordinal<barNotes.length;$('#notePosition').value=label;$('#notePitch').value=String(n.midi);$('#noteDuration').value=String(isTuplet?notationDuration(n):n.duration);$('#noteDynamic').value=n.dynamic;$('#noteRest').checked=!!n.rest;$('#noteTieNext').checked=!!n.tieNext&&hasNext;$('#noteSlurNext').checked=!!n.slurNext&&hasNext;['notePitch','noteDynamic','noteRest','applyNote','noteDown','noteUp','floatingDown','floatingUp','floatingPlayBar'].forEach(id=>$('#'+id).disabled=false);$('#noteDuration').disabled=isTuplet;$('#splitNote').disabled=isTuplet;$('#makeTriplet').disabled=isTuplet;$('#noteTieNext').disabled=!hasNext;$('#noteSlurNext').disabled=!hasNext;const special=isTuplet?' · 셋잇단음표 묶음':isDottedDuration(n.duration)?' · 점음표':'';$('#noteHint').textContent=`${noteName(n.midi)} ${noteFraction(notationDuration(n))} ${n.dynamic}${special}${isTuplet?' — 묶음을 보호하기 위해 길이·재분할은 잠깁니다.':' — 아래에서 바꾼 뒤 적용하세요.'}`;$('#floatingNotePosition').textContent=`선택: ${label}`;$('#floatingNoteDetail').textContent=`${noteName(n.midi)} · ${noteFraction(notationDuration(n))} · ${n.dynamic} · ${scoreEntries[n.bar]?.text||'연주'}`;$$('.score-note').forEach(x=>x.classList.toggle('selected',Number(x.dataset.note)===index));updateRangeUI()}
function shiftSelectedNote(amount){const n=scoreNotes[selectedNoteIndex];if(!n)return toast('먼저 음표를 클릭해 주세요');const next=Math.max(48,Math.min(84,n.midi+amount));$('#notePitch').value=String(next);applyNoteEdit()}
function playSelectedBar(){if(selectedNoteIndex<0)return toast('먼저 음표를 클릭해 주세요');selectionCustom=true;selectionStartBar=selectedBarIndex;selectionEndBar=selectedBarIndex;$('#repeatSelection').checked=false;updateRangeUI();playSelection()}
function pairedBar(bar){const section=scoreEntries[bar]?.section,pairs={'Verse 1':'Verse 2','Verse 2':'Verse 1','Chorus':'Chorus 2','Chorus 2':'Chorus'};if(!pairs[section])return-1;const source=scoreEntries.map((e,i)=>e.section===section?i:-1).filter(i=>i>=0),target=scoreEntries.map((e,i)=>e.section===pairs[section]?i:-1).filter(i=>i>=0),pos=source.indexOf(bar);return target[pos]??-1}
function syncRepeatedBar(bar){if(!melodyFirstMode)return;const target=pairedBar(bar);if(target<0)return;const source=scoreNotes.filter(n=>n.bar===bar).map((n,i)=>({...n,bar:target,beat:i,lyric:''}));scoreNotes=scoreNotes.filter(n=>n.bar!==target).concat(source).sort((a,b)=>a.bar-b.bar||a.beat-b.beat);assignBarLyrics(target)}
function applyNoteEdit(){let n=scoreNotes[selectedNoteIndex];if(!n)return toast('먼저 악보의 음표를 클릭해 주세요');const bar=n.bar,ordinal=scoreNotes.filter(x=>x.bar===bar).indexOf(n),isTuplet=!!n.tupletGroup,next=isTuplet?n.duration:Number($('#noteDuration').value);if(!Number.isFinite(next)||next<=0)return toast('올바른 음표 길이를 선택해 주세요');const delta=next-n.duration,barIndices=scoreNotes.map((x,i)=>x.bar===bar?i:-1).filter(i=>i>=0),after=barIndices.find(i=>i>selectedNoteIndex),before=[...barIndices].reverse().find(i=>i<selectedNoteIndex),neighborIndex=after??before,neighbor=scoreNotes[neighborIndex],nextNote=scoreNotes[after],allowed=[.0625,.125,.25,.375,.5,.75,1,1.5,2,3,4],remain=neighbor?neighbor.duration-delta:0;if(Math.abs(delta)>.0001&&(!neighbor||remain<.0625||!allowed.some(x=>Math.abs(x-remain)<.0001)))return toast('옆 음표와 박자가 맞지 않습니다. 먼저 음표를 둘로 나눠 주세요');if(Math.abs(delta)>.0001){neighbor.duration=remain;delete neighbor.displayDuration;delete neighbor.tupletGroup;delete n.displayDuration;delete n.tupletGroup}n.midi=Number($('#notePitch').value);n.duration=next;n.dynamic=$('#noteDynamic').value;n.rest=$('#noteRest').checked;n.tieNext=!!nextNote&&$('#noteTieNext').checked;n.slurNext=!!nextNote&&$('#noteSlurNext').checked;if(n.tieNext)nextNote.midi=n.midi;syncRepeatedBar(bar);assignBarLyrics(bar);selectedNoteIndex=scoreNotes.findIndex((x,i)=>x.bar===bar&&scoreNotes.filter(y=>y.bar===bar).indexOf(x)===ordinal);renderReadableScoreV011();selectNote(selectedNoteIndex);toast(isTuplet?'셋잇단음표 묶음을 유지하며 높이와 표현을 수정했습니다':'선택 음표를 수정하고 마디 전체 박자를 유지했습니다')}
function splitSelectedNote(){const n=scoreNotes[selectedNoteIndex];if(!n)return toast('먼저 악보의 음표를 클릭해 주세요');if(n.tupletGroup)return toast('셋잇단음표 묶음은 먼저 일반 음표로 되돌린 뒤 나눠야 합니다');if(n.duration<=.0625)return toast('1/64 음표는 더 나눌 수 없습니다');const bar=n.bar,ordinal=scoreNotes.filter(x=>x.bar===bar).indexOf(n),half=n.duration/2;if(half<.0625)return toast('현재 지원하는 최소 길이는 1/64입니다');n.duration=half;scoreNotes.splice(selectedNoteIndex+1,0,{...n,duration:half,beat:n.beat+.1});syncRepeatedBar(bar);assignBarLyrics(bar);selectedNoteIndex=scoreNotes.findIndex(x=>x.bar===bar&&scoreNotes.filter(y=>y.bar===bar).indexOf(x)===ordinal);renderReadableScoreV011();selectNote(selectedNoteIndex);toast(`${noteFraction(half)} 음표 두 개로 나누고 가사를 다시 맞췄습니다`)}
function makeSelectedTriplet(){const n=scoreNotes[selectedNoteIndex];if(!n)return toast('먼저 악보의 음표를 클릭해 주세요');if(n.tupletGroup)return toast('이미 셋잇단음표에 포함된 음표입니다');if(n.duration<.25)return toast('셋잇단음표는 16분음표보다 긴 음표에서 만들어 주세요');const bar=n.bar,ordinal=scoreNotes.filter(x=>x.bar===bar).indexOf(n),actual=n.duration/3,shown=n.duration/2,group=`t-${Date.now()}-${bar}-${ordinal}`,base={...n,duration:actual,displayDuration:shown,tupletGroup:group,tieNext:false};scoreNotes.splice(selectedNoteIndex,1,{...base,beat:n.beat},{...base,beat:n.beat+.1,lyric:'—'},{...base,beat:n.beat+.2,lyric:'—',slurNext:false});syncRepeatedBar(bar);assignBarLyrics(bar);selectedNoteIndex=scoreNotes.findIndex(x=>x.bar===bar&&scoreNotes.filter(y=>y.bar===bar).indexOf(x)===ordinal);renderReadableScoreV011();selectNote(selectedNoteIndex);toast('선택한 길이를 같은 셋잇단음표 3개로 나눴습니다. 마디 총박자는 그대로입니다')}
function createFixedScore(){
 const p=scoreSettings();if(!songPlan.length){const candidate=lyricCandidates[selectedCandidateIndex]||lyricCandidates[0];if(candidate)songPlan=buildFullSongPlan(candidate,p);else return toast('먼저 이야기로 작곡해 주세요')}const minor=p.key.includes('Minor'),rootName=p.key.split(' ')[0],root=KEY_ROOTS[rootName]||67,scale=minor?[0,2,3,5,7,8,10]:[0,2,4,5,7,9,11],total=p.meter==='6/8'?3:Number(p.meter.split('/')[0]);selectedNoteIndex=-1;scoreEntries=rebuildPhraseGroups(songPlan.map((item,bar)=>({...item,text:barOverrides[bar]?.text??item.text})));songBarTexts=scoreEntries.map(e=>e.text);scoreNotes=[];
 for(let bar=0;bar<scoreEntries.length;bar++){const override=barOverrides[bar]||{},copiedFrom=pairedBar(bar);if(copiedFrom>=0&&copiedFrom<bar&&!override.rhythm&&!override.pitch){scoreNotes.filter(n=>n.bar===copiedFrom).forEach((n,i)=>scoreNotes.push({...n,bar,beat:i,lyric:'',dynamic:override.dynamic&&override.dynamic!=='auto'?override.dynamic:n.dynamic}));continue}const section=scoreEntries[bar].section,mode=override.rhythm&&override.rhythm!=='auto'?override.rhythm:'auto',durations=scoreEntries[bar].noLyric?barRhythm('half',total,bar,section,true):mode==='auto'?automaticBarRhythm(p,total,bar):barRhythm(mode,total,bar,section,false),degrees=sectionDegrees(section,bar,durations.length),dynamic=override.dynamic&&override.dynamic!=='auto'?override.dynamic:dynamicMark(section,$('#dynamics').value);durations.forEach((duration,beat)=>{let raw=pitchDegree(degrees[beat],override.pitch||'auto',beat,durations.length);if(/Final Chorus/.test(section))raw+=bar%8>=4?2:1;const oct=Math.max(0,Math.floor(raw/7)),degree=((raw%7)+7)%7;scoreNotes.push({midi:root+scale[degree]+oct*12,degree:degree+oct*7,bar,beat,duration,dynamic})})}
 assignAllLyrics();const seconds=scoreEntries.length*total*60/p.bpm,systems=Math.ceil(scoreEntries.length/4);$('#scoreMeta').textContent=`전체 곡 · ${p.key} · ${p.meter}박자 · ${p.bpm} BPM · 한 줄 4마디 × ${systems}줄 · ${scoreEntries.length}마디 · 실제 약 ${Math.floor(seconds/60)}분 ${Math.round(seconds%60)}초`;fillBarEditor();toast('프리코러스·브리지·마지막 고음 후렴까지 전체 곡을 만들었습니다')
}
function createScore(){
 if(melodyFirstMode)return createFixedScore();
 if(!$('#lyrics').value){toast('먼저 노래 설계를 만들어 주세요');return}const p=scoreSettings(),minor=p.key.includes('Minor'),rootName=p.key.split(' ')[0],key=minor?p.key:rootName,root=KEY_ROOTS[rootName]||67,scale=minor?[0,2,3,5,7,8,10]:[0,2,4,5,7,9,11],six=p.meter==='6/8',total=six?3:Number(p.meter.split('/')[0]),patterns=six?[0,2,4,3,2,1,1,3,5,4,3,2,2,4,6,5,4,2]:[0,2,4,3,1,3,5,4,2,4,6,5,3,2,1,0],entries=[];let section='';
 const capacity=barSyllableTarget(p);selectedNoteIndex=-1;$('#lyrics').value.split('\n').forEach(raw=>{const line=raw.trim();if(!line)return;if(/^\[.+\]$/.test(line)){section=line.slice(1,-1);return}const instrumental=/^\(.+\)$/.test(line),text=line.replace(/^\(|\)$/g,'');if(instrumental)entries.push({section,text,instrumental:true});else{const parts=line.includes('/')?line.split('/').map(x=>x.trim()).filter(Boolean):autoKoreanBars([line],Math.max(1,Math.ceil(lyricChars(line)/capacity)),p);parts.forEach(part=>entries.push({section,text:part,instrumental:false}))}});entries.forEach((e,i)=>{if(barOverrides[i]?.text!==undefined)e.text=barOverrides[i].text});scoreEntries=entries;const bars=entries.length,systems=Math.ceil(bars/4),height=65+systems*155+30,rhythmMode=$('#rhythmMode').value,dynamicChoice=$('#dynamics').value;scoreNotes=[];let noteIndex=0;
 for(let bar=0;bar<bars;bar++){const override=barOverrides[bar]||{},mode=override.rhythm&&override.rhythm!=='auto'?override.rhythm:rhythmMode,durations=mode==='auto'&&!entries[bar].instrumental?syllableRhythm(lyricChars(entries[bar].text),total):barRhythm(mode,total,bar,entries[bar].section,entries[bar].instrumental),barDynamic=override.dynamic&&override.dynamic!=='auto'?override.dynamic:dynamicMark(entries[bar].section,dynamicChoice);durations.forEach((duration,beat)=>{const base=patterns[(noteIndex+bar)%patterns.length],raw=pitchDegree(base,override.pitch||'auto',beat,durations.length),oct=raw>=7?1:0,degree=raw%7,midi=root+scale[degree]+oct*12;scoreNotes.push({midi,degree:degree+oct*7,bar,beat,duration,dynamic:barDynamic});noteIndex++})}
 const chords=KEY_CHORDS[key]||KEY_CHORDS.G;let body='';for(let system=0;system<systems;system++){const top=65+system*155,left=70,right=900;for(let l=0;l<5;l++)body+=`<line x1="${left}" y1="${top+l*12}" x2="${right}" y2="${top+l*12}" stroke="#222"/>`;body+=`<text x="25" y="${top+42}" font-size="52">𝄞</text><text x="58" y="${top+22}" font-size="18">${p.meter.split('/')[0]}</text><text x="58" y="${top+42}" font-size="18">${p.meter.split('/')[1]}</text>`;for(let b=0;b<4;b++){const bar=system*4+b;if(bar>=bars)break;const item=entries[bar],x0=75+b*207.5,previous=entries[bar-1];body+=`<line x1="${x0}" y1="${top}" x2="${x0}" y2="${top+48}" stroke="#222"/>`;if(!previous||previous.section!==item.section)body+=`<text x="${x0+5}" y="${top-25}" font-size="12" font-weight="800" fill="#7040a0">${esc(item.section)}</text>`;body+=`<text x="${x0+8}" y="${top-8}" font-size="16" font-weight="700">${esc(chords[bar%4])}</text>`;const notes=scoreNotes.filter(n=>n.bar===bar);let elapsed=0;notes.forEach(n=>{const x=x0+18+(elapsed/total)*178,y=top+42-n.degree*6,index=scoreNotes.indexOf(n),open=n.duration>=2,stem=n.duration<4,flag=n.duration<=.5,dot=n.duration===1.5||n.duration===3;body+=`<g class="score-note" data-note="${index}"><ellipse cx="${x}" cy="${y}" rx="7" ry="5" transform="rotate(-18 ${x} ${y})" fill="${open?'white':'#111'}" stroke="#111" stroke-width="2"/>${stem?`<line x1="${x+6}" y1="${y}" x2="${x+6}" y2="${y-30}" stroke="#111" stroke-width="2"/>`:''}${flag?`<path d="M ${x+6} ${y-30} q 13 7 4 18" fill="none" stroke="#111" stroke-width="2"/>`:''}${dot?`<circle cx="${x+12}" cy="${y}" r="2.2" fill="#111"/>`:''}</g>`;elapsed+=n.duration});body+=`<text x="${x0+7}" y="${top+75}" font-size="12.5" ${item.instrumental?'font-style="italic" fill="#555"':''}>${esc(item.text)}</text>`}const first=entries[system*4];body+=`<text x="78" y="${top+100}" font-size="17" font-weight="800" font-style="italic">${dynamicMark(first?.section||'',dynamicChoice)}</text><line x1="900" y1="${top}" x2="900" y2="${top+48}" stroke="#222" stroke-width="2"/>`}
 const title=esc($('#title').value||'MARU SONG'),modeLabel=$('#scoreMode').value==='manual'?'수동':'자동';$('#scoreSheet').innerHTML=`<svg id="scoreSvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 930 ${height}" role="img" aria-label="${title} 전체 멜로디 악보"><rect width="930" height="${height}" fill="white"/><text x="465" y="28" text-anchor="middle" font-size="22" font-weight="800">${title} · Full Song Melody</text>${body}<text x="465" y="${height-8}" text-anchor="middle" font-size="12">MARU WORLD MUSIC MAKER V0.22.71 · 음절 맞춤·마디 편집 악보</text></svg>`;$('#scoreMeta').textContent=`${modeLabel} · ${p.key} · ${p.meter}박자 · ${p.bpm} BPM · 전체 ${bars}마디 · 음표 ${scoreNotes.length}개 · 한 마디 권장 ${capacity}글자`;fillBarEditor();toast(`${modeLabel} 설정으로 가사와 음표를 맞춘 전체 악보를 만들었습니다`)
}
function scoreTimeline(useSelection=true){const q=60/scoreSettings().bpm,[a,b]=useSelection?normalizedRange():[0,Math.max(0,scoreEntries.length-1)];let time=0;return scoreNotes.map((n,index)=>({...n,index})).filter(n=>n.bar>=a&&n.bar<=b).map(n=>{const item={...n,start:time,end:time+n.duration*q};time=item.end;return item})}
async function playRange(useSelection=true,quiet=false){
 if(!scoreNotes.length){if(importedSongAnalysis)buildImportedArrangementScore(true);else createScore();if(!scoreNotes.length)return toast('재생할 악보가 없습니다')}stop();const p=scoreSettings(),[a,b]=useSelection?normalizedRange():[0,scoreEntries.length-1],bars=Array.from({length:b-a+1},(_,i)=>a+i),names=[...selected];if(!names.length){if(importedSongAnalysis){selected=new Set(importedSongAnalysis.instruments||[]);renderInstruments();names.push(...selected)}else{autoPick();names.push(...selected)}}const guide=arrangementGuide(names),c=audio();try{await c.resume();await ensureSoundfont()}catch(e){console.warn('SoundFont fallback',e)}try{if(c.state!=='running')await c.resume()}catch(e){}if(c.state!=='running')return toast('브라우저 오디오가 잠겨 있습니다. 화면을 한 번 누른 뒤 다시 재생해 주세요');refreshAuto64Audio();const startDelay=.14;analyzedArrangementPlayback=!!importedSongAnalysis;if(importedSongAnalysis&&sourceReferenceEnabled())startSourceReference(a,b,startDelay);$('#pulse').classList.add('playing');const finish=arrangedBarPlayback(bars,p,names,guide,quiet,startDelay),repeat=useSelection&&$('#repeatSelection')?.checked;if(repeat)timers.push(setTimeout(()=>playRange(true,true),finish*1000+100));if(!quiet)toast(useSelection?(importedSongAnalysis?`${a+1}~${b+1}마디 · 분석 코드 반주 · 피아노 코드 중심`:`${a+1}~${b+1}마디 · ${guide} 멜로디 + 코드 반주`):`전체 ${scoreEntries.length}마디 · ${p.bpm} BPM · ${p.key} · 분석 코드 기반 편곡 재생 시작`);return finish
}
function playScore(){return playRange(false)}
function playSelection(){return playRange(true)}
function targetAt(seconds){return scoreTimeline(true).find(n=>seconds>=n.start&&seconds<n.end&&!n.rest)}
function autoCorrelate(buf,rate){let rms=0;for(const v of buf)rms+=v*v;rms=Math.sqrt(rms/buf.length);if(rms<.012)return 0;let best=-1,bestOffset=-1;const min=Math.floor(rate/1000),max=Math.min(Math.floor(rate/70),buf.length/2);for(let off=min;off<max;off++){let corr=0;for(let i=0;i<buf.length-off;i++)corr+=buf[i]*buf[i+off];if(corr>best){best=corr;bestOffset=off}}return bestOffset>0?rate/bestOffset:0}
function pitchMidi(hz){return hz>0?Math.round(69+12*Math.log2(hz/440)):0}
function updateVocalMeter(){if(!micAnalyser)return;const data=new Float32Array(micAnalyser.fftSize);micAnalyser.getFloatTimeDomainData(data);const hz=autoCorrelate(data,micAudio.sampleRate),elapsed=(performance.now()-vocalStarted)/1000,target=targetAt(elapsed);if(hz){const midi=pitchMidi(hz);pitchSamples.push({time:elapsed,hz,midi});$('#vocalMeter span').textContent=`감지 ${noteName(midi)} (${Math.round(hz)}Hz) · 목표 ${target?noteName(target.midi):'쉼표'}`}else $('#vocalMeter span').textContent=`감지 — · 목표 ${target?noteName(target.midi):'쉼표'}`;micFrame=requestAnimationFrame(updateVocalMeter)}
async function startVocal(){if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder)return toast('이 브라우저는 마이크 녹음을 지원하지 않습니다');if(!scoreNotes.length){createScore();if(!scoreNotes.length)return}try{micStream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:false,noiseSuppression:false,autoGainControl:false}});vocalChunks=[];pitchSamples=[];vocalBlob=null;correctedBlob=null;micAudio=new(window.AudioContext||window.webkitAudioContext)();const source=micAudio.createMediaStreamSource(micStream);micAnalyser=micAudio.createAnalyser();micAnalyser.fftSize=2048;source.connect(micAnalyser);mediaRecorder=new MediaRecorder(micStream);mediaRecorder.ondataavailable=e=>{if(e.data.size)vocalChunks.push(e.data)};mediaRecorder.onstop=()=>{vocalBlob=new Blob(vocalChunks,{type:mediaRecorder.mimeType||'audio/webm'});if(vocalUrl)URL.revokeObjectURL(vocalUrl);vocalUrl=URL.createObjectURL(vocalBlob);$('#playOriginal').disabled=false;$('#makeCorrection').disabled=false;$('#vocalMeter b').textContent='녹음 완료';$('#vocalMeter span').textContent=`${((performance.now()-vocalStarted)/1000).toFixed(1)}초 · 음정 표본 ${pitchSamples.length}개`;toast('녹음을 마쳤습니다. 선택 악보 음정으로 보정할 수 있습니다')};mediaRecorder.start(200);vocalStarted=performance.now();$('#startVocal').disabled=true;$('#stopVocal').disabled=false;$('#vocalMeter').classList.add('recording');$('#vocalMeter b').textContent='● 녹음 중';updateVocalMeter();const[a,b]=normalizedRange();toast(`${a+1}~${b+1}마디 녹음 중입니다. 선택 구간의 첫 음부터 불러 주세요`)}catch(e){toast('마이크 허용이 필요합니다')}}
function stopVocal(){if(mediaRecorder?.state==='recording')mediaRecorder.stop();cancelAnimationFrame(micFrame);micStream?.getTracks().forEach(t=>t.stop());micAudio?.close();$('#startVocal').disabled=false;$('#stopVocal').disabled=true;$('#vocalMeter').classList.remove('recording')}
async function playUrl(url){if(!url)return;stop();try{const ab=await (await fetch(url)).arrayBuffer(),c=audio();await c.resume();const buffer=await c.decodeAudioData(ab.slice(0)),src=c.createBufferSource(),g=c.createGain(),lim=c.createDynamicsCompressor();src.buffer=buffer;g.gain.value=Math.min(16,estimateSourcePlaybackBoost(buffer)*1.35);lim.threshold.value=-1.2;lim.knee.value=.7;lim.ratio.value=10;lim.attack.value=.0015;lim.release.value=.13;src.connect(g).connect(lim).connect(c.destination);sourceReferenceNode=src;src.onended=()=>{if(sourceReferenceNode===src)sourceReferenceNode=null};src.start();toast(`목소리 증폭 재생 · ${Math.round(g.gain.value*100)}%`);return}catch(e){console.warn('boosted voice playback',e)}try{const player=new Audio(url);player.muted=false;player.volume=1;await player.play();toast('목소리를 재생합니다')}catch(e){console.warn('voice playback fallback',e);toast('목소리 재생을 시작하지 못했습니다')}}
function averagePitch(start,end){const list=pitchSamples.filter(x=>x.time>=start&&x.time<end&&x.hz>65&&x.hz<1200);if(!list.length)return 0;return list.reduce((s,x)=>s+x.hz,0)/list.length}
async function makeCorrection(){if(!vocalBlob)return toast('먼저 목소리를 녹음해 주세요');$('#makeCorrection').disabled=true;$('#vocalMeter b').textContent='보정 만드는 중';try{const ac=new(window.AudioContext||window.webkitAudioContext)(),input=await ac.decodeAudioData(await vocalBlob.arrayBuffer()),length=input.length,offline=new OfflineAudioContext(input.numberOfChannels,length,input.sampleRate),timeline=scoreTimeline(true);for(const n of timeline){if(n.start>=input.duration)break;if(n.rest)continue;const detected=averagePitch(n.start,Math.min(n.end,input.duration)),target=440*Math.pow(2,(n.midi-69)/12),ratio=detected?Math.max(.67,Math.min(1.5,target/detected)):1,source=offline.createBufferSource(),gain=offline.createGain(),seg=Math.min(n.end-n.start,input.duration-n.start),read=Math.min(seg*ratio,input.duration-n.start);if(read<=.01)continue;source.buffer=input;source.playbackRate.value=ratio;source.connect(gain).connect(offline.destination);gain.gain.setValueAtTime(0,n.start);gain.gain.linearRampToValueAtTime(1,n.start+Math.min(.015,seg/4));gain.gain.setValueAtTime(1,Math.max(n.start+.015,n.start+seg-.02));gain.gain.linearRampToValueAtTime(0,n.start+seg);source.start(n.start,n.start,read)}const rendered=await offline.startRendering();correctedBlob=audioBufferToWav(rendered);if(correctedUrl)URL.revokeObjectURL(correctedUrl);correctedUrl=URL.createObjectURL(correctedBlob);$('#playCorrected').disabled=false;$('#downloadCorrected').disabled=false;$('#makeCorrection').disabled=false;$('#vocalMeter b').textContent='보정 완료';$('#vocalMeter span').textContent='선택 마디의 악보 음별로 목소리 높이를 맞췄습니다';toast('선택 악보 음정에 맞춘 보정 목소리를 만들었습니다');ac.close()}catch(e){$('#makeCorrection').disabled=false;$('#vocalMeter b').textContent='보정 실패';toast('이 녹음 형식은 보정할 수 없습니다. 크롬에서 다시 시도해 주세요')}}
function audioBufferToWav(buffer){const channels=buffer.numberOfChannels,rate=buffer.sampleRate,length=buffer.length*channels*2+44,array=new ArrayBuffer(length),view=new DataView(array);let pos=0;const text=s=>{for(const c of s)view.setUint8(pos++,c.charCodeAt(0))},u16=n=>{view.setUint16(pos,n,true);pos+=2},u32=n=>{view.setUint32(pos,n,true);pos+=4};text('RIFF');u32(length-8);text('WAVE');text('fmt ');u32(16);u16(1);u16(channels);u32(rate);u32(rate*channels*2);u16(channels*2);u16(16);text('data');u32(length-44);const data=Array.from({length:channels},(_,c)=>buffer.getChannelData(c));for(let i=0;i<buffer.length;i++)for(let c=0;c<channels;c++){const sample=Math.max(-1,Math.min(1,data[c][i]));view.setInt16(pos,sample<0?sample*32768:sample*32767,true);pos+=2}return new Blob([array],{type:'audio/wav'})}
function downloadCorrected(){if(!correctedBlob)return;const a=document.createElement('a');a.href=correctedUrl;a.download=`${($('#title').value||'MARU-SONG').replace(/[\\/:*?"<>|]/g,'_')}-보정목소리.wav`;a.click();toast('보정 목소리를 다운로드 폴더에 저장했습니다')}
function downloadScore(){const svg=$('#scoreSvg');if(!svg){toast('먼저 악보를 만들어 주세요');return}const blob=new Blob([new XMLSerializer().serializeToString(svg)],{type:'image/svg+xml;charset=utf-8'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`${($('#title').value||'MARU-SONG').replace(/[\\/:*?"<>|]/g,'_')}-악보.svg`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);toast('다운로드 폴더에 악보를 저장했습니다')}
function updateScoreMode(preserveManual=false){const manual=$('#scoreMode').value==='manual';['manualKey','manualMeter','manualBpm'].forEach(id=>$('#'+id).disabled=!manual);if(manual&&preserveManual!==true){const p=activeProfile();$('#manualKey').value=p.key;$('#manualMeter').value=p.meter;$('#manualBpm').value=p.bpm}if($('#scoreSvg'))createScore()}
function toast(s){const t=$('#toast');t.textContent=s;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1900)}
const SONG_STORAGE_KEY='maruSongs';
function readSavedSongs(){try{const value=JSON.parse(localStorage.getItem(SONG_STORAGE_KEY)||'[]');return Array.isArray(value)?value:[]}catch(e){return[]}}
function writeSavedSongs(songs){localStorage.setItem(SONG_STORAGE_KEY,JSON.stringify(songs.slice(0,30)))}
function newSongId(){return globalThis.crypto?.randomUUID?.()||`maru-${Date.now()}-${Math.random().toString(36).slice(2,9)}`}
function safeFileName(name){return String(name||'MARU-SONG').replace(/[\\/:*?"<>|]/g,'_').trim()||'MARU-SONG'}
function escapeHtml(value){return String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]))}
function downloadJson(data,name){const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json;charset=utf-8'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1200)}
function currentSongRecord(existing={}){const now=new Date();return{...existing,id:existing.id||newSongId(),title:$('#title').value||'제목 없음',story:$('#story').value,lyrics:$('#lyrics').value,style:$('#style').value,language:$('#language').value,customLanguage:$('#customLanguage').value,styleMode:$('#styleMode').value,styleLanguage:$('#styleLanguage').value,songBarTexts:structuredClone(songBarTexts),songPlan:structuredClone(songPlan),barOverrides:structuredClone(barOverrides),scoreNotes:structuredClone(scoreNotes),scoreControls:{mode:$('#scoreMode').value,key:$('#manualKey').value,meter:$('#manualMeter').value,bpm:$('#manualBpm').value,dynamics:$('#dynamics').value,rhythm:$('#rhythmMode').value},projectControls:{mood:$('#mood').value,speed:$('#speed').value,length:$('#length').value,genre:$('#genre').value,vocal:$('#vocal').value,blend:$('#blend').value,hookLine:$('#hookLine').value,density:$('#density').value,chorusCount:$('#chorusCount').value,customWords:$('#customWords').value,region,selectedInstruments:[...selected],chosenWords:[...chosenWords]},melodyFirstMode,createdAt:existing.createdAt||now.toISOString(),updatedAt:now.toISOString(),date:now.toLocaleDateString('ko-KR')}}
function save(){if(!$('#lyrics').value&&!scoreNotes.length){toast('먼저 노래 설계나 자동 채보 악보를 만들어 주세요');return}const songs=readSavedSongs(),updating=editingSongIndex>=0&&editingSongIndex<songs.length,existing=updating?songs[editingSongIndex]:{};const record=currentSongRecord(existing);rememberTitle(record.title);if(updating)songs[editingSongIndex]=record;else{songs.unshift(record);editingSongIndex=0}try{writeSavedSongs(songs)}catch(e){toast('브라우저 저장공간이 부족합니다. 백업 파일로 저장해 주세요');downloadJson({app:'MARU WORLD MUSIC MAKER',version:'0.22.41',exportedAt:new Date().toISOString(),song:record},`${safeFileName(record.title)}.maru.json`);return}renderSaved();$('#songLibrary')?.scrollIntoView({behavior:'smooth',block:'start'});toast(updating?'내 곡 저장함의 기존 곡을 수정 저장했습니다':'내 곡 저장함에 새 노래를 저장했습니다')}
function downloadTxt(){if(!$('#lyrics').value&&!scoreNotes.length){toast('먼저 노래 설계나 자동 채보 악보를 만들어 주세요');return}const title=$('#title').value||'MARU-SONG',safe=safeFileName(title),content=`제목: ${title}\n\n${$('#lyrics').value||''}\n\n[음악 스타일]\n${$('#style').value||importedSongAnalysis?.style||''}\n`;const blob=new Blob(['\ufeff'+content],{type:'text/plain;charset=utf-8'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`${safe}.txt`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);toast('다운로드 폴더에 TXT 파일을 저장했습니다')}
async function copySuno(){if(!$('#lyrics').value)return toast('Suno 복사는 가사가 있는 곡에서 사용해 주세요');const text=`[Title]\n${$('#title').value||'제목 없음'}\n\n[Lyrics]\n${$('#lyrics').value}\n\n[Style of Music]\n${$('#style').value}`;try{await navigator.clipboard.writeText(text)}catch(e){return toast('클립보드 권한을 확인해 주세요')}toast('Suno용 제목·전체 가사·스타일을 모두 복사했습니다')}
function loadSavedSong(index){const songs=readSavedSongs(),x=songs[index];if(!x)return;editingSongIndex=index;$('#story').value=x.story||'';$('#title').value=x.title||'제목 없음';titleLockedByUser=!!$('#title').value.trim();$('#lyrics').value=x.lyrics||'';$('#style').value=x.style||'';$('#language').value=x.language||'한국어';$('#customLanguage').value=x.customLanguage||'';$('#styleMode').value=x.styleMode||'auto';$('#styleLanguage').value=x.styleLanguage||'auto';updateLanguageMode();if(x.projectControls){const q=x.projectControls;['mood','speed','length','genre','vocal','blend','hookLine','density','chorusCount','customWords'].forEach(id=>{if(q[id]!==undefined&&$('#'+id))$('#'+id).value=q[id]});region=q.region||region;selected=new Set(q.selectedInstruments||[]);chosenWords=new Set(q.chosenWords||[]);renderWordChoices();renderRegions();renderInstruments();if($('#blendValue'))$('#blendValue').textContent=$('#blend').value+'%';updateInfo()}songBarTexts=structuredClone(x.songBarTexts||[]);songPlan=structuredClone(x.songPlan||[]);barOverrides=structuredClone(x.barOverrides||{});melodyFirstMode=!!x.melodyFirstMode;if(x.scoreControls){$('#scoreMode').value=x.scoreControls.mode||'auto';$('#manualKey').value=x.scoreControls.key||'G Major';$('#manualMeter').value=x.scoreControls.meter||'4/4';$('#manualBpm').value=x.scoreControls.bpm||96;$('#dynamics').value=x.scoreControls.dynamics||'auto';$('#rhythmMode').value=x.scoreControls.rhythm||'auto';updateScoreMode(true)}if(songPlan.length){scoreEntries=structuredClone(songPlan);scoreNotes=structuredClone(x.scoreNotes||[]);if(scoreNotes.length)fillBarEditor();else createScore()}else if(x.scoreNotes?.length){scoreNotes=structuredClone(x.scoreNotes);scoreEntries=Array.from({length:Math.max(...scoreNotes.map(n=>n.bar),0)+1},(_,bar)=>({section:'Verse',text:'',noLyric:false,instrumental:false,transcribed:true}));fillBarEditor()}else createScore();syncLyricsFromScore();renderSaved();$('#title')?.scrollIntoView({behavior:'smooth',block:'center'});toast('내 곡 저장함에서 전체 곡과 악보를 불러왔습니다')}
function exportSavedSong(index){const x=readSavedSongs()[index];if(!x)return;downloadJson({app:'MARU WORLD MUSIC MAKER',version:'0.22.41',exportedAt:new Date().toISOString(),song:x},`${safeFileName(x.title)}.maru.json`);toast('이 곡의 백업 파일을 다운로드했습니다')}
function exportSongLibrary(){const songs=readSavedSongs();if(!songs.length)return toast('백업할 저장곡이 없습니다');const day=new Date().toISOString().slice(0,10);downloadJson({app:'MARU WORLD MUSIC MAKER',version:'0.22.41',exportedAt:new Date().toISOString(),songs},`MARU-내곡백업-${day}.maru.json`);toast(`${songs.length}곡 전체 백업 파일을 다운로드했습니다`)}
async function importSongLibrary(file){if(!file)return;try{const data=JSON.parse(await file.text()),incoming=Array.isArray(data)?data:Array.isArray(data.songs)?data.songs:data.song?[data.song]:[];if(!incoming.length)throw Error('songs missing');const current=readSavedSongs(),map=new Map(current.map(x=>[x.id||`${x.title}|${x.createdAt||x.date||''}`,x]));for(const raw of incoming){if(!raw||typeof raw!=='object')continue;const song={...raw,id:raw.id||newSongId(),updatedAt:raw.updatedAt||new Date().toISOString(),date:raw.date||new Date().toLocaleDateString('ko-KR')};map.set(song.id,song)}const merged=[...map.values()].sort((a,b)=>String(b.updatedAt||b.createdAt||'').localeCompare(String(a.updatedAt||a.createdAt||''))).slice(0,30);writeSavedSongs(merged);editingSongIndex=-1;renderSaved();toast(`백업에서 ${incoming.length}곡을 불러왔습니다`)}catch(e){toast('MARU 백업 파일을 읽지 못했습니다')}finally{$('#importSongFile').value=''}}
function deleteSavedSong(index){const songs=readSavedSongs(),x=songs[index];if(!x)return;if(!confirm(`“${x.title||'제목 없음'}”을 저장함에서 삭제할까요?`))return;songs.splice(index,1);if(editingSongIndex===index)editingSongIndex=-1;else if(editingSongIndex>index)editingSongIndex--;writeSavedSongs(songs);renderSaved();toast('선택한 저장곡을 삭제했습니다')}
function renderSaved(){const songs=readSavedSongs();if($('#savedCount'))$('#savedCount').textContent=`${songs.length}곡 저장됨`;$('#savedSongs').innerHTML=songs.length?songs.map((x,i)=>`<article><div class="saved-song-info"><b>${escapeHtml(x.title||'제목 없음')}</b><p>${escapeHtml(x.date||'날짜 없음')}${i===editingSongIndex?' · 수정 중':''}</p></div><div class="saved-song-actions"><button class="primary" data-load="${i}">열기</button><button class="secondary" data-export="${i}">⬇ 파일 내보내기</button><button class="danger" data-del="${i}">삭제</button></div></article>`).join(''):'<div class="saved-empty"><b>아직 저장한 노래가 없습니다.</b><p>위의 ‘💾 내 곡 저장함에 저장’을 누르면 여기에 곡 제목이 나타납니다.</p></div>';$$('[data-load]').forEach(b=>b.onclick=()=>loadSavedSong(Number(b.dataset.load)));$$('[data-export]').forEach(b=>b.onclick=()=>exportSavedSong(Number(b.dataset.export)));$$('[data-del]').forEach(b=>b.onclick=()=>deleteSavedSong(Number(b.dataset.del)))}

// V0.20.4 — two-channel real-time 12-band mixer EQ.
const MIXER_EQ_PRESETS={
 flat:{backing:[0,0,0,0,0,0,0,0,0,0,0,0],source:[0,0,0,0,0,0,0,0,0,0,0,0]},
 vocal:{backing:[-2,-2,-1.5,-1.5,-2,-1.5,-1.5,-2.5,-3,-2,-1,0],source:[-5,-4,-3,-2,-1.5,-.5,.5,2,3.5,2.5,1.5,.5]},
 lowclean:{backing:[-4,-3,-2,-1.5,-1,0,.5,.5,.5,0,0,-.5],source:[-5,-4,-3,-2,-1,0,.5,1,1.5,1,.5,0]},
 warm:{backing:[1.5,1.5,1,1,.8,.5,.3,0,-.5,-1,-1.2,-1.5],source:[1,1,.8,.6,.5,.3,.2,0,-.3,-.6,-.8,-1]},
 live:{backing:[1,.5,0,-1,-1.5,-.5,.5,1,1.5,1,.8,.5],source:[0,-.5,-1,-1.5,-1,-.5,.5,1.5,2.5,2,1,.5]},
 duck:{backing:[-2,-2,-2,-2,-2.5,-2.5,-3,-4,-5,-4,-3,-2],source:[-2,-2,-1.5,-1,-.5,0,.5,1.5,2.5,2,1,.5]}
};
function saveMixerEq(){try{localStorage.setItem('maru_mixer_eq_v2',JSON.stringify(mixerEqState))}catch(e){}}
function restoreMixerEq(){try{const x=JSON.parse(localStorage.getItem('maru_mixer_eq_v2')||'null');for(const k of ['backing','source'])if(x?.[k]){mixerEqState[k].volume=Math.max(0,Math.min(150,Number(x[k].volume)||100));if(Array.isArray(x[k].bands)&&x[k].bands.length===12)mixerEqState[k].bands=x[k].bands.map(v=>Math.max(-12,Math.min(12,Number(v)||0)))}}catch(e){}renderMixerEq()}
function mixerTargetLabel(){return mixerEqTarget==='backing'?'반주':'원곡·보컬'}
function renderMixerEq(){const s=mixerEqState[mixerEqTarget];if(!s)return;$$('[data-eq-target]').forEach(b=>b.classList.toggle('active',b.dataset.eqTarget===mixerEqTarget));const title=$('#eqTargetLabel');if(title)title.textContent=mixerTargetLabel();const vol=$('#mixerChannelVolume');if(vol)vol.value=String(s.volume);const vv=$('#mixerChannelVolumeValue');if(vv)vv.textContent=`${Math.round(s.volume)}%`;$$('[data-eq-band]').forEach((input,i)=>{const v=Number(s.bands[i]||0);input.value=String(v);const lab=$(`[data-eq-value="${i}"]`);if(lab)lab.textContent=`${v>0?'+':''}${v.toFixed(v%1?1:0)} dB`});}
function setMixerEqTarget(target){if(!mixerEqState[target])return;mixerEqTarget=target;renderMixerEq()}
function setMixerEqBand(index,value){const s=mixerEqState[mixerEqTarget];s.bands[index]=Math.max(-12,Math.min(12,Number(value)||0));saveMixerEq();renderMixerEq();applyMixerEqAudio()}
function setMixerChannelVolume(value){const s=mixerEqState[mixerEqTarget];s.volume=Math.max(0,Math.min(150,Number(value)||0));saveMixerEq();renderMixerEq();applyMixerEqAudio()}
function applyMixerEqPreset(name){const preset=MIXER_EQ_PRESETS[name];if(!preset)return;if(name==='duck'){mixerEqState.backing.bands=[...preset.backing];mixerEqState.backing.volume=72;mixerEqState.source.bands=[...preset.source];mixerEqState.source.volume=100;saveMixerEq();renderMixerEq();applyMixerEqAudio();return toast('반주 뒤로 · 보컬 앞으로 프리셋 적용')}const s=mixerEqState[mixerEqTarget];s.bands=[...preset[mixerEqTarget]];if(name==='flat')s.volume=100;saveMixerEq();renderMixerEq();applyMixerEqAudio();const label=name==='flat'?'평탄':name==='vocal'?'보컬 선명':name==='lowclean'?'저음 정리':name==='warm'?'따뜻하게':name==='live'?'라이브':'프리셋';toast(`${mixerTargetLabel()} EQ · ${label} 적용`)}
function toggleMixerEq(){const panel=$('#mixerEqPanel');if(!panel)return;panel.classList.toggle('open');const b=$('#toggleMixerEq');if(b)b.textContent=panel.classList.contains('open')?'⚙ 전문가용 수동 EQ 숨기기':'⚙ 전문가용 수동 EQ 펼치기'}
function stopAuto64Ducking(){if(auto64DuckFrame)cancelAnimationFrame(auto64DuckFrame);auto64DuckFrame=0;sourceAutoAnalyser=null}
function startAuto64Ducking(analyser){stopAuto64Ducking();sourceAutoAnalyser=analyser;if(!analyser)return;const data=new Float32Array(analyser.fftSize);const tick=()=>{if(!sourceAutoAnalyser||!ctx)return;sourceAutoAnalyser.getFloatTimeDomainData(data);let e=0;for(const v of data)e+=v*v;const rms=Math.sqrt(e/data.length),activity=Math.max(0,Math.min(1,(rms-.012)/.055)),base=auto64ReferenceMixActive?auto64State.backingVolume:.86,target=base*(1-.10*activity);if(auto64BackingGain)auto64BackingGain.gain.setTargetAtTime(target,ctx.currentTime,.08);auto64DuckFrame=requestAnimationFrame(tick)};tick()}
function connectSourceMixer(c,input,baseGain=1){sourceLiveBaseGain=baseGain;const analyser=c.createAnalyser();analyser.fftSize=1024;analyser.smoothingTimeConstant=.82;input.connect(analyser);startAuto64Ducking(analyser);const autoOut=connectAuto64Chain(c,input,'source'),eqOut=connectEqChain(c,autoOut,{volume:100,bands:mixerEqState.source.bands},'source');sourceLiveMixerGain.gain.value=baseGain*Math.max(0,Math.min(1.5,mixerEqState.source.volume/100));if(auto64SourceGain)auto64SourceGain.gain.value=auto64State.ready?auto64State.sourceVolume:1;const lim=c.createDynamicsCompressor();lim.threshold.value=-1.0;lim.knee.value=.75;lim.ratio.value=4;lim.attack.value=.0025;lim.release.value=.14;sourceLiveLimiter=lim;eqOut.connect(lim).connect(c.destination);return lim}
// V0.20.2 — original playback loudness separated from arrangement reference mix.
function setSelectText(id,text){const el=$('#'+id);if(!el)return false;const option=[...el.options].find(o=>o.value===text||o.textContent.trim()===text);if(!option)return false;el.value=option.value;return true}
function setAnalyzedStyleOutput(text){const el=$('#analyzedStyle');if(!el)return;el.value=text||'';el.textContent=text||'';el.defaultValue=text||'';const preview=$('#analyzedStylePreview');if(preview)preview.textContent=text||'분석 후 스타일 문장이 여기에 표시됩니다.'}
function setAnalyzedProjectControls(a){if(!a)return false;$('#scoreMode').value='manual';updateScoreMode(true);$('#manualBpm').value=String(a.bpm);const meterOk=setSelectText('manualMeter',a.meter),keyOk=setSelectText('manualKey',a.key);const bpmOk=Number($('#manualBpm').value)===Number(a.bpm);return meterOk&&keyOk&&bpmOk&&$('#manualMeter').value===a.meter&&$('#manualKey').value===a.key}
function analyzedSettingsMatch(a){if(!a)return false;return $('#scoreMode').value==='manual'&&Number($('#manualBpm').value)===Number(a.bpm)&&$('#manualMeter').value===a.meter&&$('#manualKey').value===a.key}
function formatSongDuration(seconds){const total=Math.max(0,Math.round(Number(seconds)||0));return`${Math.floor(total/60)}:${String(total%60).padStart(2,'0')}`}
function monoDownsample(buffer,targetRate=8000){const ratio=buffer.sampleRate/targetRate,length=Math.max(1,Math.floor(buffer.length/ratio)),out=new Float32Array(length),channels=Array.from({length:buffer.numberOfChannels},(_,i)=>buffer.getChannelData(i));for(let i=0;i<length;i++){const a=Math.floor(i*ratio),b=Math.min(buffer.length,Math.max(a+1,Math.floor((i+1)*ratio)));let sum=0,count=0;for(let s=a;s<b;s++){let v=0;for(const ch of channels)v+=ch[s]||0;sum+=v/channels.length;count++}out[i]=count?sum/count:0}return out}
function melodyFocusedDownsample(buffer,targetRate=12000){const ratio=buffer.sampleRate/targetRate,length=Math.max(1,Math.floor(buffer.length/ratio)),raw=new Float32Array(length),channels=Array.from({length:buffer.numberOfChannels},(_,i)=>buffer.getChannelData(i));for(let i=0;i<length;i++){const a=Math.floor(i*ratio),b=Math.min(buffer.length,Math.max(a+1,Math.floor((i+1)*ratio)));let sum=0,count=0;for(let s=a;s<b;s++){let v=0;if(channels.length>=2){const l=channels[0][s]||0,r=channels[1][s]||0;v=(l+r)*.5}else v=channels[0]?.[s]||0;sum+=v;count++}raw[i]=count?sum/count:0}const out=new Float32Array(length),hpAlpha=Math.exp(-2*Math.PI*145/targetRate),lpAlpha=1-Math.exp(-2*Math.PI*1750/targetRate);let hp=0,prev=raw[0]||0,lp=0;for(let i=0;i<length;i++){const x=raw[i];hp=hpAlpha*(hp+x-prev);prev=x;lp+=lpAlpha*(hp-lp);out[i]=lp}return out}
function frameRms(data,start,size){let e=0,n=0;for(let i=Math.max(0,start);i<Math.min(data.length,start+size);i++){const v=data[i];e+=v*v;n++}return n?Math.sqrt(e/n):0}
function normalizedLagCorrelation(values,lag){let ab=0,aa=0,bb=0;for(let i=lag;i<values.length;i++){const a=values[i],b=values[i-lag];ab+=a*b;aa+=a*a;bb+=b*b}return aa&&bb?ab/Math.sqrt(aa*bb):0}
function onsetEnvelope(data,rate){const hop=128,win=512,env=[];for(let start=0;start+win<data.length;start+=hop)env.push(frameRms(data,start,win));const flux=new Float32Array(env.length);let mean=0;for(let i=1;i<env.length;i++){flux[i]=Math.max(0,env[i]-env[i-1]);mean+=flux[i]}mean/=Math.max(1,flux.length-1);for(let i=0;i<flux.length;i++)flux[i]=Math.max(0,flux[i]-mean*.2);return{flux,step:hop/rate}}
function estimateTempoFromAudio(data,rate){const{flux,step}=onsetEnvelope(data,rate);let mean=0;for(const v of flux)mean+=v;mean/=Math.max(1,flux.length);let variance=0;for(const v of flux)variance+=(v-mean)*(v-mean);const std=Math.sqrt(variance/Math.max(1,flux.length)),threshold=mean+std*.7,minGap=Math.max(1,Math.round(.18/step)),peaks=[];let last=-minGap;for(let i=1;i<flux.length-1;i++)if(flux[i]>=threshold&&flux[i]>=flux[i-1]&&flux[i]>=flux[i+1]&&i-last>=minGap){peaks.push(i);last=i}const bpms=[];for(let i=1;i<peaks.length;i++){let bpm=60/((peaks[i]-peaks[i-1])*step);while(bpm<65)bpm*=2;while(bpm>170)bpm/=2;if(bpm>=65&&bpm<=170)bpms.push(bpm)}if(bpms.length>=4){bpms.sort((a,b)=>a-b);const mid=bpms[Math.floor(bpms.length/2)],near=bpms.filter(x=>Math.abs(x-mid)<mid*.12),avg=near.reduce((a,b)=>a+b,0)/Math.max(1,near.length);return{bpm:Math.round(avg),confidence:Math.max(.25,Math.min(.92,.35+near.length/Math.max(8,bpms.length)*.5)),flux,step,peaks}}let bestBpm=96,best=-1,second=-1;for(let bpm=60;bpm<=180;bpm++){const lag=Math.max(1,Math.round((60/bpm)/step)),score=normalizedLagCorrelation(flux,lag);if(score>best){second=best;best=score;bestBpm=bpm}else if(score>second)second=score}if(bestBpm<70)bestBpm*=2;if(bestBpm>165)bestBpm=Math.round(bestBpm/2);return{bpm:Math.max(60,Math.min(180,Math.round(bestBpm))),confidence:Math.max(.08,Math.min(.65,best*.55)),flux,step,peaks}}
function estimateMeterFromAudio(tempo){const beatLag=Math.max(1,Math.round((60/tempo.bpm)/tempo.step)),c3=normalizedLagCorrelation(tempo.flux,beatLag*3),c4=normalizedLagCorrelation(tempo.flux,beatLag*4);return tempo.bpm<105&&c3>c4*1.5&&c3>.24?'6/8':'4/4'}
function dominantPitchFrame(data,rate,center,size=1024){let start=Math.max(0,Math.min(data.length-size,Math.round(center-size/2)));if(start<0||start+size>data.length)return{hz:0,confidence:0,rms:0};let mean=0;for(let i=0;i<size;i++)mean+=data[start+i];mean/=size;const frame=new Float32Array(size);let energy=0;for(let i=0;i<size;i++){const v=data[start+i]-mean;frame[i]=v;energy+=v*v}const rms=Math.sqrt(energy/size);if(rms<.006)return{hz:0,confidence:0,rms};const minLag=Math.max(2,Math.floor(rate/1000)),maxLag=Math.min(Math.floor(rate/65),Math.floor(size*.46));let bestLag=0,best=-1;for(let lag=minLag;lag<=maxLag;lag++){let ab=0,aa=0,bb=0;for(let i=0;i<size-lag;i++){const a=frame[i],b=frame[i+lag];ab+=a*b;aa+=a*a;bb+=b*b}const score=aa&&bb?ab/Math.sqrt(aa*bb):0;if(score>best){best=score;bestLag=lag}}return bestLag&&best>.22?{hz:rate/bestLag,confidence:best,rms}:{hz:0,confidence:Math.max(0,best),rms}}
const AUDIO_KEY_NAMES=['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
const AUDIO_KEYS=[['C Major',0,'M'],['D Major',2,'M'],['E Major',4,'M'],['F Major',5,'M'],['F# Major',6,'M'],['G Major',7,'M'],['A Major',9,'M'],['B Major',11,'M'],['A Minor',9,'m'],['B Minor',11,'m'],['C# Minor',1,'m'],['D Minor',2,'m'],['E Minor',4,'m'],['F# Minor',6,'m'],['G# Minor',8,'m']];
function goertzelPower(data,start,size,rate,freq){const w=2*Math.PI*freq/rate,coeff=2*Math.cos(w);let s1=0,s2=0;for(let i=0;i<size;i++){const idx=start+i;if(idx<0||idx>=data.length)continue;const win=.5-.5*Math.cos(2*Math.PI*i/Math.max(1,size-1)),x=data[idx]*win,next=x+coeff*s1-s2;s2=s1;s1=next}return Math.max(0,s1*s1+s2*s2-coeff*s1*s2)}
function clampAutoDb(v){return Math.max(-9,Math.min(5,Number(v)||0))}
function smoothAuto64(values){return values.map((v,i)=>{let sum=v*2,w=2;if(i>0){sum+=values[i-1];w++}if(i<values.length-1){sum+=values[i+1];w++}return clampAutoDb(sum/w)})}
function auto64Spectrum(buffer){const rate=buffer.sampleRate,channels=Array.from({length:buffer.numberOfChannels},(_,i)=>buffer.getChannelData(i)),size=1024,frames=32,acc=new Float64Array(64),frame=new Float32Array(size);let valid=0;for(let fi=0;fi<frames;fi++){const center=Math.floor((.025+.95*(fi+.5)/frames)*buffer.length),start=Math.max(0,Math.min(Math.max(0,buffer.length-size),center-size/2));let e=0;for(let i=0;i<size;i++){let v=0;for(const ch of channels)v+=ch[start+i]||0;v/=Math.max(1,channels.length);frame[i]=v;e+=v*v}const rms=Math.sqrt(e/size);if(rms<.0025)continue;valid++;for(let bi=0;bi<64;bi++){const f=AUTO64_FREQS[bi];if(f>rate*.46)continue;acc[bi]+=Math.sqrt(goertzelPower(frame,0,size,rate,f))/size}}const safe=Math.max(1,valid),raw=[...acc].map(v=>v/safe),max=Math.max(...raw,1e-9),db=raw.map(v=>20*Math.log10(Math.max(1e-9,v)/max));return{db,valid}}
function auto64RegionLevel(db,minF,maxF){let vals=[];AUTO64_FREQS.forEach((f,i)=>{if(f>=minF&&f<=maxF)vals.push(db[i])});if(!vals.length)return-60;return vals.reduce((a,b)=>a+b,0)/vals.length}
function dolbyInspiredSourceBands(db,a={}){
 const bass=auto64RegionLevel(db,55,180),mud=auto64RegionLevel(db,220,520),presence=auto64RegionLevel(db,1400,4200),bright=auto64RegionLevel(db,5200,11000);
 const warmth=bass<-27?1.15:bass<-23?.85:bass<-19?.48:.12;
 const mudCut=Math.max(0,Math.min(1.25,(mud+25)/7));
 const presenceCut=presence>-19?1.0:presence>-24?.58:.22;
 const brightCut=bright>-21?1.25:bright>-26?.72:.32;
 let bands=AUTO64_FREQS.map(f=>{let g=0;
  if(f<35)g=-5.2;
  else if(f<50)g=-2.6;
  else if(f<80)g=.15+warmth*.38;
  else if(f<160)g=.55+warmth*.72;
  else if(f<250)g=.28+warmth*.34;
  else if(f<450)g=.12-mudCut;
  else if(f<800)g=.08;
  else if(f<1600)g=0;
  else if(f<2500)g=-.28-presenceCut*.22;
  else if(f<3500)g=-.68-presenceCut*.40;
  else if(f<5000)g=-1.28-presenceCut*.72;
  else if(f<8000)g=-2.15-brightCut*.70;
  else if(f<10000)g=-2.85-brightCut*.88;
  else if(f<12500)g=-3.55-brightCut*.62;
  else g=-4.35-brightCut*.48;
  return clampAutoDb(g)
 });
 return{bands:smoothAuto64(bands),bass,mud,presence,bright,warmth,mudCut,presenceCut,brightCut}
}
function configureAuto64Mix(buffer,a){try{
 const sp=auto64Spectrum(buffer),db=sp.db,target=dolbyInspiredSourceBands(db,a),bass=target.bass,presence=target.presence,bright=target.bright,transient=a?.mixHints?.transient||0,bassHint=a?.mixHints?.bassLikelihood||0;
 let source=target.bands;
 let backing=AUTO64_FREQS.map(f=>{let g=0;
  if(f<42)g=-2.0;if(f>=55&&f<=180)g-=.45+.75*Math.max(bassHint,bass>-23?.45:.20);
  if(f>=220&&f<=600)g-=.45;if(f>=900&&f<1500)g-=.45;
  if(f>=1500&&f<=3800)g-=1.35+(presence>-25?.50:.18);
  if(f>3800&&f<=6000)g-=1.65+(transient>.48?.45:0);
  if(f>6000&&f<=9000)g-=2.05+(bright>-24?.55:0);
  if(f>9000&&f<=13000)g-=2.05;if(f>13000)g-=1.75;return clampAutoDb(g)
 });
 backing=smoothAuto64(backing);auto64State.ready=true;auto64State.sourceBands=source;auto64State.backingBands=backing;
 auto64State.backingVolume=transient>.52?.80:.84;auto64State.sourceVolume=1.0;
 const pCenter=AUTO64_FREQS.reduce((best,f,i)=>f>=1200&&f<=4200&&db[i]>best.db?{f,db:db[i]}:best,{f:2500,db:-99}),lowText=target.warmth>.7?'80~200Hz 몸통 자동 보강':bass>-19?'저역 과다 부스트 방지':'저역 자연 보강',highText=target.brightCut>.7?'3~16kHz 고음 적극 완화':'1.6kHz부터 완만한 하향 곡선';
 auto64State.summary=`64대역 자동 완료 · Dolby 스튜디오 참고 목표곡선 · ${lowText} · ${highText} · 보컬 중심 ${Math.round(pCenter.f)}Hz`;
 renderAuto64Status();refreshAuto64Audio();try{localStorage.setItem('maru_auto64_last_v3',JSON.stringify({source,backing,backingVolume:auto64State.backingVolume,summary:auto64State.summary}))}catch(e){}return auto64State
 }catch(e){console.warn('auto64 analysis',e);auto64State.ready=false;auto64State.summary='64밴드 자동 분석을 적용하지 못해 안전 기본 믹스를 사용합니다.';renderAuto64Status();return auto64State}}

function renderAuto64Status(){const el=$('#auto64MixStatus');if(el)el.textContent=auto64State.ready?auto64State.summary:'노래 분석 후 64밴드를 자동으로 맞춥니다.';const badge=$('#auto64MixBadge');if(badge)badge.textContent=auto64State.ready?'자동 완료':'항상 켜짐'}

function spectralChroma(data,rate,frames=72,size=2048){const hist=new Float64Array(12);let valid=0;for(let fi=0;fi<frames;fi++){const center=Math.floor((.02+.96*fi/Math.max(1,frames-1))*data.length),start=Math.max(0,Math.min(Math.max(0,data.length-size),center-Math.floor(size/2))),rms=frameRms(data,start,size);if(rms<.003)continue;valid++;for(let midi=48;midi<=83;midi++){const freq=440*Math.pow(2,(midi-69)/12),amp=Math.sqrt(goertzelPower(data,start,size,rate,freq))/size;hist[((midi%12)+12)%12]+=Math.log1p(amp*1000)*Math.min(.14,rms+.02)}}return{hist,valid}}
function pearson12(a,b){let ma=0,mb=0;for(let i=0;i<12;i++){ma+=a[i];mb+=b[i]}ma/=12;mb/=12;let n=0,da=0,db=0;for(let i=0;i<12;i++){const x=a[i]-ma,y=b[i]-mb;n+=x*y;da+=x*x;db+=y*y}return da&&db?n/Math.sqrt(da*db):0}
function estimateKeyFromAudio(data,rate,frames=72){const spectral=spectralChroma(data,rate,frames),hist=spectral.hist,major=[6.35,2.23,3.48,2.33,4.38,4.09,2.52,5.19,2.39,3.66,2.29,2.88],minor=[6.33,2.68,3.52,5.38,2.60,3.53,2.54,4.75,3.98,2.69,3.34,3.17],scores=[];for(const [name,root,mode] of AUDIO_KEYS){const profile=mode==='M'?major:minor,rotated=[];for(let pc=0;pc<12;pc++)rotated.push(profile[(pc-root+12)%12]);const correlation=pearson12(hist,rotated),tonic=hist[root]||0,third=hist[(root+(mode==='M'?4:3))%12]||0,fifth=hist[(root+7)%12]||0,total=Array.from(hist).reduce((a,b)=>a+b,0)||1,triad=(tonic+third+fifth)/total,score=correlation+triad*.16; scores.push({name,root,mode,score,correlation,triad})}scores.sort((a,b)=>b.score-a.score);const best=scores[0]||{name:'G Major',root:7,mode:'M',score:0,correlation:0},second=scores[1]?.score??best.score,margin=Math.max(0,best.score-second),absolute=Math.max(0,(best.correlation+1)/2),coverage=Math.min(1,spectral.valid/Math.max(12,frames*.55)),confidence=spectral.valid?Math.max(.12,Math.min(.98,absolute*.48+Math.min(1,margin*3.4)*.34+coverage*.18)):.08;return{key:best.name,root:best.root,mode:best.mode,confidence,validFrames:spectral.valid,hist,candidates:scores.slice(0,4),margin}}
function audioSegmentSlices(data,rate,seconds=24,maxSegments=7){const len=Math.max(1,Math.round(seconds*rate));if(data.length<=len*1.15)return[data];const count=Math.max(3,Math.min(maxSegments,Math.floor(data.length/len))),out=[];for(let i=0;i<count;i++){const center=(i+.5)/count*data.length,start=Math.max(0,Math.min(data.length-len,Math.round(center-len/2)));out.push(data.subarray(start,start+len))}return out}
function foldTempoNear(bpm,ref){const c=[bpm,bpm*2,bpm/2].filter(x=>x>=55&&x<=190);return c.sort((a,b)=>Math.abs(a-ref)-Math.abs(b-ref))[0]||bpm}
function estimateTempoVerified(data,rate){const global=estimateTempoFromAudio(data,rate),segments=audioSegmentSlices(data,rate,22,7),raw=segments.map(s=>estimateTempoFromAudio(s,rate)),aligned=raw.map(x=>foldTempoNear(x.bpm,global.bpm)),sorted=[...aligned].sort((a,b)=>a-b),median=sorted[Math.floor(sorted.length/2)]||global.bpm,near=aligned.filter(x=>Math.abs(x-median)<=2.5),avg=(near.reduce((s,x)=>s+x,0)+global.bpm*1.5)/(Math.max(1,near.length)+1.5),bpm=Math.max(45,Math.min(190,Math.round(avg))),spread=aligned.reduce((s,x)=>s+Math.abs(x-bpm),0)/Math.max(1,aligned.length),agreement=near.length/Math.max(1,aligned.length),quality=raw.reduce((s,x)=>s+x.confidence,0)/Math.max(1,raw.length),stable=Math.max(0,1-Math.min(1,spread/7)),confidence=Math.min(.99,.18*global.confidence+.32*quality+.34*agreement+.16*stable);const perfect=segments.length>=5&&agreement===1&&spread<.75&&quality>.72&&global.confidence>.72;return{...global,bpm,confidence:perfect?1:confidence,agreement,segmentBpms:aligned.map(x=>Math.round(x)),segmentCount:segments.length,spread}}
function estimateBeatGridOffset(tempo,meterInfo={meter:'4/4'}){
 const beatSec=60/tempo.bpm,period=beatSec/tempo.step,bins=64,flux=tempo.flux||[],beatsPerBar=analysisBeatsPerBar(meterInfo.meter);if(!flux.length||!Number.isFinite(period)||period<=0)return{offsetSec:0,confidence:.2,method:'none'};
 let bestPhase=0,best=-Infinity,second=-Infinity;for(let b=0;b<bins;b++){const phase=b/bins*period;let score=0,count=0;for(let k=0;;k++){const idx=Math.round(phase+k*period);if(idx>=flux.length)break;const v=flux[idx]||0,l=flux[Math.max(0,idx-1)]||0,r=flux[Math.min(flux.length-1,idx+1)]||0;score+=v+.28*Math.max(l,r);count++}score/=Math.max(1,count);if(score>best){second=best;best=score;bestPhase=phase}else if(score>second)second=score}
 let phaseSec=bestPhase*tempo.step;if(phaseSec>beatSec*.55)phaseSec-=beatSec;let bestShift=0,bestDown=-Infinity,secondDown=-Infinity;for(let shift=0;shift<beatsPerBar;shift++){let down=0,other=0,dc=0,oc=0;for(let beat=shift;beat*period+bestPhase<flux.length;beat+=beatsPerBar){const idx=Math.round(bestPhase+beat*period);down+=flux[idx]||0;dc++;for(let j=1;j<beatsPerBar;j++){const oi=Math.round(bestPhase+(beat+j)*period);if(oi<flux.length){other+=flux[oi]||0;oc++}}}const score=(down/Math.max(1,dc))*1.35-(other/Math.max(1,oc))*.35;if(score>bestDown){secondDown=bestDown;bestDown=score;bestShift=shift}else if(score>secondDown)secondDown=score}
 const phaseConfidence=best>0?Math.max(.15,Math.min(.95,(best-second)/Math.max(.000001,best)*5)):.15,downConfidence=bestDown>0?Math.max(.15,Math.min(.95,(bestDown-secondDown)/Math.max(.000001,Math.abs(bestDown))*2.5)):.15,chosenShift=downConfidence>=.58?bestShift:0,offsetSec=Math.max(0,phaseSec+chosenShift*beatSec);return{offsetSec,confidence:Math.max(.15,Math.min(.95,phaseConfidence*.7+downConfidence*.3)),method:'weighted-beat+downbeat',beatPhaseSec:phaseSec,downbeatShift:chosenShift}
}
function beatAccentPeriodScores(tempo){
 const flux=tempo.flux||[],period=(60/tempo.bpm)/tempo.step;if(!flux.length||!Number.isFinite(period)||period<2)return{c2:0,c3:0,c4:0,c6:0,c8:0,c12:0,phase:0,beats:0,seq:[]};
 let bestPhase=0,best=-1,step=Math.max(1,period/32);for(let phase=0;phase<period;phase+=step){let sum=0;for(let x=phase;x<flux.length;x+=period){const i=Math.round(x);let local=0;for(let k=-2;k<=2;k++)local=Math.max(local,flux[i+k]||0);sum+=local}if(sum>best){best=sum;bestPhase=phase}}
 const seq=[];for(let x=bestPhase;x<flux.length;x+=period){const i=Math.round(x);let local=0;for(let k=-2;k<=2;k++)local=Math.max(local,flux[i+k]||0);seq.push(local)}
 return{c2:normalizedLagCorrelation(seq,2),c3:normalizedLagCorrelation(seq,3),c4:normalizedLagCorrelation(seq,4),c6:normalizedLagCorrelation(seq,6),c8:normalizedLagCorrelation(seq,8),c12:normalizedLagCorrelation(seq,12),phase:bestPhase,beats:seq.length,seq}
}
function accentPatternContrast(seq,period){
 if(!seq?.length||period<2)return{range:0,top:0,means:[]};const means=[];for(let phase=0;phase<period;phase++){let sum=0,count=0;for(let i=phase;i<seq.length;i+=period){sum+=seq[i]||0;count++}means.push(sum/Math.max(1,count))}const avg=means.reduce((a,b)=>a+b,0)/Math.max(1,means.length),hi=Math.max(...means),lo=Math.min(...means);return{range:avg?Math.max(0,(hi-lo)/avg):0,top:avg?Math.max(0,(hi-avg)/avg):0,means}
}
function estimateMeterVerified(tempo){
 const beatLag=Math.max(1,Math.round((60/tempo.bpm)/tempo.step)),accent=beatAccentPeriodScores(tempo),half=Math.max(1,Math.round(beatLag/2)),sub=normalizedLagCorrelation(tempo.flux,half),p3=accentPatternContrast(accent.seq,3),p4=accentPatternContrast(accent.seq,4),p6=accentPatternContrast(accent.seq,6),clip=x=>Math.max(0,Math.min(1,Number(x)||0)),ratioBonus=.10*Math.max(0,Math.min(1,p6.range/Math.max(.05,p4.range)-1));
 const score4=.48*accent.c4+.34*clip(p4.range)+.10*accent.c2+.08*Math.max(0,1-sub),score3=.38*accent.c3+.32*clip(p3.range)+.18*accent.c6+.12*clip(p6.range)-.12*sub,score6=.28*accent.c3+.22*accent.c6+.24*clip(p6.range)+.18*sub+.08*clip(p3.range)+ratioBonus,scores={'4/4':score4,'3/4':score3,'6/8':score6},ranked=Object.entries(scores).sort((a,b)=>b[1]-a[1]);let meter=ranked[0][0],gap=Math.max(0,ranked[0][1]-ranked[1][1]);
 // 6/8은 3박 계열 반복뿐 아니라 중간 subdivision과 6펄스 강세가 같이 보여야 선택한다.
 if(meter==='6/8'&&!(sub>.12&&(p6.range>p4.range*.92||accent.c6>accent.c4*.88)))meter=score3>score4?'3/4':'4/4';
 // 기존처럼 4/4를 기본값으로 강제하지 않는다. 점수가 비슷하면 신뢰도를 낮춰 후보 비교를 보여준다.
 const winner=scores[meter],other=Math.max(...Object.entries(scores).filter(([m])=>m!==meter).map(([,v])=>v)),winnerGap=Math.max(0,winner-other),pattern=Math.max(clip(p3.range),clip(p4.range),clip(p6.range)),confidence=Math.max(.30,Math.min(.94,.40+winnerGap*1.6+pattern*.18+(accent.beats>32?.06:0)));
 return{meter,confidence,c2:accent.c2,c3:accent.c3,c4:accent.c4,c6:accent.c6,c8:accent.c8,c12:accent.c12,sub,score4,score3,score6,pattern3:p3.range,pattern4:p4.range,pattern6:p6.range,beatSamples:accent.beats,candidates:ranked.map(([name,score])=>({name,score}))}
}
function estimateKeyVerified(data,rate){const global=estimateKeyFromAudio(data,rate,76),segments=audioSegmentSlices(data,rate,26,7),results=segments.map(s=>estimateKeyFromAudio(s,rate,34)),votes=new Map();const add=(name,w)=>votes.set(name,(votes.get(name)||0)+w);global.candidates.slice(0,3).forEach((c,i)=>add(c.name,[2.4,.8,.35][i]||.2));for(const r of results){r.candidates.slice(0,2).forEach((c,i)=>add(c.name,(i===0?1:.28)*(.55+r.confidence*.65)))}const ranked=[...votes.entries()].sort((a,b)=>b[1]-a[1]),winner=ranked[0]?.[0]||global.key,meta=AUDIO_KEYS.find(x=>x[0]===winner)||[winner,global.root,global.mode],exact=results.filter(r=>r.key===winner).length,agreement=exact/Math.max(1,results.length),bestScore=ranked[0]?.[1]||1,secondScore=ranked[1]?.[1]||0,margin=Math.max(0,(bestScore-secondScore)/Math.max(.001,bestScore)),winnerGlobal=global.candidates.find(c=>c.name===winner),baseConf=winner===global.key?global.confidence:Math.max(.18,(winnerGlobal?global.confidence*.72:.2)),confidence=Math.min(.99,.28*baseConf+.42*agreement+.22*Math.min(1,margin*2.5)+.08*Math.min(1,global.validFrames/70)),perfect=segments.length>=5&&agreement>=.86&&margin>.22&&baseConf>.68;return{key:winner,root:meta[1],mode:meta[2],confidence:perfect?1:confidence,agreement,segmentKeys:results.map(r=>r.key),candidates:ranked.slice(0,3).map(([name,score])=>({name,score})),global}}
const CHORD_ROOT_NAMES=['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
function compactChroma(data,rate,start,end){const hist=new Float64Array(12),size=1024,frames=3,a=Math.max(0,Math.floor(start*rate)),b=Math.min(data.length,Math.max(a+size,Math.floor(end*rate)));for(let f=0;f<frames;f++){const center=a+Math.floor((f+.5)/frames*Math.max(size,b-a)),pos=Math.max(0,Math.min(Math.max(0,data.length-size),center-Math.floor(size/2))),rms=frameRms(data,pos,size);if(rms<.003)continue;for(let midi=48;midi<=74;midi++){const freq=440*Math.pow(2,(midi-69)/12),amp=Math.sqrt(goertzelPower(data,pos,size,rate,freq))/size,weight=midi<=60?1.15:midi<=67?1:.72;hist[midi%12]+=Math.log1p(amp*850)*weight}}return hist}
function chordCandidatesForKey(key){const rootName=String(key||'G Major').split(' ')[0],root=CHORD_ROOT_NAMES.indexOf(rootName),minor=String(key).includes('Minor'),r=root>=0?root:7;const specs=minor?[[0,true],[3,false],[5,true],[7,false],[8,false],[10,false]]:[[0,false],[2,true],[4,true],[5,false],[7,false],[9,true]];return specs.map(([off,isMinor])=>{const pc=(r+off)%12;return{root:pc,minor:isMinor,symbol:CHORD_ROOT_NAMES[pc]+(isMinor?'m':'')}})}
function chordFromChroma(hist,key,previous=''){const total=Array.from(hist).reduce((a,b)=>a+b,0);if(total<.001)return{symbol:previous||key.split(' ')[0],confidence:0};let best=null,second=null;const candidates=chordCandidatesForKey(key);for(const c of candidates){const root=c.root,minor=c.minor,third=(root+(minor?3:4))%12,fifth=(root+7)%12,seventh=(root+(minor?10:11))%12,triad=(hist[root]*1.08+hist[third]*.84+hist[fifth]*.74+hist[seventh]*.08)/total,off=(hist[(root+1)%12]+hist[(root+6)%12]+hist[(root+11)%12])*.055/total,same=c.symbol===previous?.045:0,score=triad-off+same,item={...c,score};if(!best||score>best.score){second=best;best=item}else if(!second||score>second.score)second=item}const margin=Math.max(0,(best?.score||0)-(second?.score||0)),confidence=Math.max(.05,Math.min(.98,.34+margin*5.2));return{symbol:best?.symbol||previous||key.split(' ')[0],confidence}}
function analyzeBarChords(data,rate,a){const beats=analysisBeatsPerBar(a.meter),beatSec=60/a.bpm,barSec=beats*beatSec,startOffset=a.beatOffsetSec||0,out=[],conf=[];let previous='';for(let bar=0;bar<a.bars;bar++){const start=startOffset+bar*barSec,end=Math.min(a.duration,start+barSec),r=chordFromChroma(compactChroma(data,rate,start,end),a.key,previous);out.push(r.symbol);conf.push(r.confidence);previous=r.symbol}return{chords:out,confidence:conf.length?conf.reduce((x,y)=>x+y,0)/conf.length:0}}
function analyzedChordObject(symbol,bar,section,p){const m=String(symbol||'').match(/^([A-G](?:#)?)(m)?$/);if(!m)return null;let rootPc=CHORD_ROOT_NAMES.indexOf(m[1]),root=48+rootPc;while(root<48)root+=12;while(root>59)root-=12;const minor=!!m[2],third=root+(minor?3:4),fifth=root+7,ninth=root+14;return{degree:0,root,tones:[root,third,fifth],color:[root,third,fifth,ninth],seventh:root+(minor?10:11),ninth,info:sectionBarInfo(bar,section)}}
function estimateAudioCharacter(data,bpm){let e=0,z=0,prev=data[0]||0;for(let i=0;i<data.length;i++){const v=data[i];e+=v*v;if((v>=0)!=(prev>=0))z++;prev=v}const rms=Math.sqrt(e/Math.max(1,data.length)),zcr=z/Math.max(1,data.length);let genre='모던 팝',mood='담백하고 진솔한',moodOption='따뜻한';if(bpm<=78){genre='팝 발라드';mood='차분하고 서정적인';moodOption='편안한'}else if(bpm>=122&&rms>.07){genre=zcr>.11?'댄스 팝':'팝 록';mood='신나고 선명한';moodOption='신나는'}else if(bpm>=108){genre='팝 록';mood='밝고 힘 있는';moodOption='따뜻한'}else if(rms<.045){genre='어쿠스틱 팝';mood='담백하고 편안한';moodOption='편안한'}return{rms,zcr,genre,mood,moodOption}}
function tempoClusterCandidates(tempo){const values=[...(tempo?.segmentBpms||[]),tempo?.bpm].filter(Number.isFinite),clusters=[];for(const v of values){let c=clusters.find(x=>Math.abs(x.center-v)<=3);if(!c){c={values:[],center:v};clusters.push(c)}c.values.push(v);c.center=c.values.reduce((a,b)=>a+b,0)/c.values.length}return clusters.sort((a,b)=>b.values.length-a.values.length||Math.abs(a.center-(tempo?.bpm||a.center))-Math.abs(b.center-(tempo?.bpm||b.center))).slice(0,3).map(c=>({bpm:Math.round(c.center),count:c.values.length,total:values.length}))}
function bandRoleHints(data,rate,tempo){const freqs={bass:[65,90,120,160],body:[220,330,440,660],presence:[900,1300,1800,2600],air:[3400]},sums={bass:0,body:0,presence:0,air:0},frames=28,size=1024;for(let fi=0;fi<frames;fi++){const center=Math.floor((fi+.5)/frames*data.length),start=Math.max(0,Math.min(Math.max(0,data.length-size),center-size/2));for(const [band,list] of Object.entries(freqs))for(const f of list)sums[band]+=Math.sqrt(goertzelPower(data,start,size,rate,f))/size}const total=Object.values(sums).reduce((a,b)=>a+b,0)||1,ObjectNorm=Object.fromEntries(Object.entries(sums).map(([k,v])=>[k,v/total])),duration=data.length/rate,onsetDensity=(tempo?.peaks?.length||0)/Math.max(1,duration),transient=Math.max(0,Math.min(1,onsetDensity/3.2)),bass=Math.max(0,Math.min(1,ObjectNorm.bass*3.1)),presence=Math.max(0,Math.min(1,ObjectNorm.presence*2.8)),sustain=Math.max(0,Math.min(1,(ObjectNorm.body+ObjectNorm.presence)*1.55*(1-transient*.35)));return{...ObjectNorm,transient,bassLikelihood:bass,presenceLikelihood:presence,sustainLikelihood:sustain}}
function roleLevel(v){return v>=.68?'높음':v>=.42?'보통':'낮음'}
function audioInstrumentSuggestion(info,hints={}){
 const drums=(hints.transient??.5)>=.34,bass=(hints.bassLikelihood??.5)>=.30,sustain=(hints.sustainLikelihood??.5)>=.40,presence=(hints.presenceLikelihood??.5),seed=storySeed(`${info.genre}|${Math.round((info.bpm||100)/4)*4}|${info.meter||''}|${Math.round((hints.transient||0)*10)}|${Math.round((hints.bassLikelihood||0)*10)}`),list=[];
 const one=(pool,salt)=>stablePick(pool.filter(n=>!list.includes(n)),1,seed^salt)[0];
 if(info.genre==='댄스 팝'){list.push(one(['전자피아노','신시사이저','EDM 신스'],1));if(bass)list.push(one(['808 베이스','베이스 기타'],2));if(drums)list.push('드럼 세트');list.push(one(['전자 패드','합창 패드','신시사이저'],3))}
 else if(info.genre==='팝 발라드'){list.push(one(['그랜드 피아노','전자피아노','어쿠스틱 기타'],4));list.push(one(['어쿠스틱 기타','첼로 섹션','하프'],5));if(bass)list.push(one(['베이스 기타','콘트라베이스'],6));if(sustain)list.push(one(['바이올린 섹션','첼로 섹션','전자 패드'],7));if(drums&&info.meter!=='6/8')list.push('드럼 세트')}
 else if(info.genre==='팝 록'){list.push(one(['일렉 기타','어쿠스틱 기타','전자피아노'],8));if(bass)list.push('베이스 기타');if(drums)list.push('드럼 세트');list.push(one(presence>.6?['트럼펫','색소폰','피아노']:['피아노','전자피아노','바이올린 섹션'],9));if(sustain)list.push(one(['바이올린 섹션','프렌치 호른','전자 패드'],10))}
 else {list.push(one(['피아노','전자피아노','어쿠스틱 기타','그랜드 피아노'],11));if(bass)list.push(one(['베이스 기타','콘트라베이스','808 베이스'],12));if(drums&&info.meter!=='6/8')list.push('드럼 세트');if(sustain)list.push(one(['바이올린 섹션','첼로 섹션','전자 패드','합창 패드'],13));list.push(one(['어쿠스틱 기타','일렉 기타','플루트','색소폰'],14))}
 return [...new Set(list.filter(Boolean))].slice(0,6)
}
function analysisGrade(a){const score=(a.tempoConfidence*.28+a.meterConfidence*.17+a.keyConfidence*.20+a.reliability*.23+(a.chordConfidence||0)*.12);return score>=.78?'A · 안정':score>=.62?'B · 사용 가능':score>=.48?'C · 확인 필요':'D · 수동 확인'}
function instrumentRoleFeedback(a){
 const h=a.mixHints||{},out=[];const has=n=>a.instruments?.includes(n);
 if(has('드럼 세트'))out.push(`드럼 세트 ${roleLevel(h.transient||0)}(타격 성분)`);
 if(has('베이스 기타')||has('808 베이스'))out.push(`베이스 ${roleLevel(h.bassLikelihood||0)}(저역 성분)`);
 if(has('바이올린 섹션')||has('전자 패드'))out.push(`현악/패드 ${roleLevel(h.sustainLikelihood||0)}(지속 화음)`);
 const harmonic=(a.instruments||[]).filter(n=>['피아노','그랜드 피아노','전자피아노','어쿠스틱 기타','일렉 기타'].includes(n));
 if(harmonic.length)out.push(`${harmonic.join('·')} 편곡 역할 추천`);
 return out.join(' · ')||'역할 힌트 부족'
}
function renderAnalysisCoach(a){
 const el=$('#analysisCoachText'),grade=$('#analysisGrade'),buttons=$('#tempoCandidateButtons'),meterButtons=$('#meterCandidateButtons');if(!el||!a)return;
 const tc=tempoClusterCandidates(a.tempoVerification),tempoText=a.tempoConfidence>=.72?`${a.bpm} BPM이 비교적 안정적입니다.`:`${a.bpm} BPM은 1차 후보입니다. 아래 BPM 후보를 원곡과 비교해 고르는 것이 좋습니다.`,mv=a.meterVerification||{},meterRanks=(mv.candidates||[]).slice(0,3).map(x=>`${x.name} ${Math.round(x.score*100)}`).join(' / '),meterText=a.meterUserConfirmed?`${a.meter} 박자를 형이 직접 확인했습니다.`:a.meterConfidence>=.7?`${a.meter} 박자가 비교적 안정적입니다.${meterRanks?` 후보점수 ${meterRanks}`:''}`:`${a.meter} 박자 1차 후보입니다.${meterRanks?` 후보점수 ${meterRanks}.`:''} 4/4·3/4·6/8을 바로 바꿔 들어볼 수 있습니다.`,h=a.mixHints||{},inst=a.instruments.join(', '),roleText=instrumentRoleFeedback(a);
 el.textContent=`박자: ${tempoText}
박자표: ${meterText}
조성: ${a.key} · 신뢰 ${Math.round(a.keyConfidence*100)}%
원음 역할 힌트: 드럼/타격 ${roleLevel(h.transient||0)} · 저역/베이스 ${roleLevel(h.bassLikelihood||0)} · 지속 화음 ${roleLevel(h.sustainLikelihood||0)}
악기 판단: ${roleText}
편곡 추천 악기: ${inst}
보컬/대사 또렷 추천: 자동 음량 균형 ON · 보컬 또렷 모드 ON · 편곡 속 원음 45~60% · 현악/패드는 뒤로, 기타/피아노는 중간, 베이스/드럼은 절제.
※ 완성 음원만으로 피아노/기타/현악 같은 정확한 원음 악기명을 확정하는 것은 어렵습니다. 위 악기는 ‘원음 복제’가 아니라 실제 저역·타격·지속음 힌트와 장르를 합친 역할 기반 편곡 추천입니다.
※ ‘녹음 음성 같이 듣기’는 가수 보컬만 분리하지 않고 원곡 전체를 작게 섞되, 보컬 또렷 모드에서 저역을 덜고 2.5kHz 존재감을 살짝 올려 대사를 참고하기 쉽게 합니다.`;
 const gradeScore=(a.tempoConfidence*.30+a.meterConfidence*.18+a.keyConfidence*.18+a.reliability*.22+(a.chordConfidence||0)*.12);grade.textContent=gradeScore>=.78?'A · 비교적 안정':gradeScore>=.62?'B · 확인 권장':gradeScore>=.46?'C · 후보 비교 필요':'D · 수동 확인 필요';
 buttons.innerHTML=tc.map(x=>`<button type="button" class="${Math.abs(x.bpm-a.bpm)<=1?'primary':'secondary'}" data-tempo-candidate="${x.bpm}">🥁 ${x.bpm} BPM${x.count>1?` · ${x.count}/${x.total}`:''}</button>`).join('');
 buttons.querySelectorAll('[data-tempo-candidate]').forEach(btn=>btn.onclick=()=>confirmTempoCandidate(Number(btn.dataset.tempoCandidate)));
 if(meterButtons){meterButtons.innerHTML=['4/4','3/4','6/8'].map(m=>`<button type="button" class="${m===a.meter?'primary':'secondary'}" data-meter-candidate="${m}">${m} 박자</button>`).join('');meterButtons.querySelectorAll('[data-meter-candidate]').forEach(btn=>btn.onclick=()=>confirmMeterCandidate(btn.dataset.meterCandidate))}
 ['feedbackGood','feedbackTempo','feedbackInstrument','feedbackMelody'].forEach(id=>{if($('#'+id))$('#'+id).disabled=false})
}
async function confirmTempoCandidate(bpm){
 if(!importedSongAnalysis||!importedSongBuffer)return toast('먼저 노래를 분석해 주세요');const a=importedSongAnalysis;if(!Number.isFinite(bpm)||bpm<45||bpm>190)return;
 const analysisRate=8000,data=monoDownsample(importedSongBuffer,analysisRate),melodyRate=12000,melodyData=melodyFocusedDownsample(importedSongBuffer,melodyRate),tempo={...(a.tempoVerification||{}),bpm},beatGrid=estimateBeatGridOffset(tempo,{meter:a.meter});
 a.tempoVerification=tempo;Object.assign(a,{bpm,beatOffsetSec:beatGrid.offsetSec,beatOffsetConfidence:beatGrid.confidence,tempoUserConfirmed:true});
 const melody=buildAnalyzedMelody(a,melodyData,melodyRate),chords=analyzeBarChords(data,analysisRate,{...a,...melody});Object.assign(a,melody,{barChords:chords.chords,chordConfidence:chords.confidence});a.style=makeAnalyzedStyle(a);
 $('#audioBpm').textContent=String(bpm);setAnalyzedStyleOutput(a.style);applyImportedStyle(false);buildImportedArrangementScore(true);renderAnalysisCoach(a);toast(`${bpm} BPM으로 다시 맞춰 악보와 편곡을 재구성했습니다`)
}
async function confirmMeterCandidate(meter){
 if(!importedSongAnalysis||!importedSongBuffer)return toast('먼저 노래를 분석해 주세요');if(!['4/4','3/4','6/8'].includes(meter))return;const a=importedSongAnalysis,analysisRate=8000,data=monoDownsample(importedSongBuffer,analysisRate),melodyRate=12000,melodyData=melodyFocusedDownsample(importedSongBuffer,melodyRate),tempo={...(a.tempoVerification||{}),bpm:a.bpm},beatGrid=estimateBeatGridOffset(tempo,{meter});
 Object.assign(a,{meter,meterUserConfirmed:true,beatOffsetSec:beatGrid.offsetSec,beatOffsetConfidence:beatGrid.confidence});const melody=buildAnalyzedMelody(a,melodyData,melodyRate),chords=analyzeBarChords(data,analysisRate,{...a,...melody});Object.assign(a,melody,{barChords:chords.chords,chordConfidence:chords.confidence});a.style=makeAnalyzedStyle(a);
 $('#audioMeter').textContent=meter;setAnalyzedStyleOutput(a.style);applyImportedStyle(false);buildImportedArrangementScore(true);renderAnalysisCoach(a);toast(`${meter} 박자로 다시 맞춰 악보와 편곡을 재구성했습니다`)
}
function saveAnalysisFeedback(kind){if(!importedSongAnalysis)return;updateLearningRating(kind);try{const key='maru_analysis_feedback_v1',arr=JSON.parse(localStorage.getItem(key)||'[]');arr.push({kind,bpm:importedSongAnalysis.bpm,meter:importedSongAnalysis.meter,key:importedSongAnalysis.key,time:Date.now()});localStorage.setItem(key,JSON.stringify(arr.slice(-40)))}catch(e){}const map={good:'잘 맞음',tempo:'박자 안 맞음',instrument:'악기 안 맞음',melody:'멜로디 안 맞음'};$('#feedbackNote').textContent=`피드백 저장: ${map[kind]||kind} · 분석 대상 피드백으로만 보관되며 전문 기준곡에는 섞이지 않습니다.`;toast('피드백을 저장했습니다')}

function makeAnalyzedStyle(a){const durationText=formatSongDuration(a.duration),inst=a.instruments.join(', '),tone=a.character.mood;return`${a.character.genre}, ${a.bpm} BPM, ${a.meter} time, ${a.key}, 약 ${durationText}, ${tone}. 불러온 음원에서 추정한 박자와 조성, 주멜로디 윤곽을 기준으로 구간별 리듬과 화성을 재구성. 악기: ${inst}. 보컬/대사 또렷함 우선, 리드 보컬은 중앙 전면. 피아노·기타는 중간 크기, 베이스·드럼은 과하지 않게, 현악·패드는 뒤로 얇게 배치. 벌스는 반주를 얇게, 프리코러스에서 긴장을 높이고, 후렴에서만 리듬과 화음을 넓힘. 과도한 리버브·컴프레션·저역 부스트 금지. 자동 분석 악보는 1차 초안이며 BPM 신뢰가 낮으면 상단 후보 BPM을 귀로 비교해 확정.`}
function nearestSupportedMidi(midi,key){const minor=key.includes('Minor'),root=KEY_ROOTS[key.split(' ')[0]]||67,scale=minor?[0,2,3,5,7,8,10]:[0,2,4,5,7,9,11];let target=midi;while(target<55)target+=12;while(target>79)target-=12;let best=target,dist=99;for(let octave=-2;octave<=2;octave++)for(const step of scale){const n=root+step+octave*12,d=Math.abs(n-target);if(d<dist){dist=d;best=n}}return Math.max(48,Math.min(84,best))}
function analysisSectionLengths(bars){const specs=[['Intro',.05],['Verse 1',.18],['Pre-Chorus',.07],['Chorus',.13],['Interlude',.05],['Verse 2',.18],['Pre-Chorus 2',.07],['Chorus 2',.10],['Bridge',.07],['Final Chorus',.08],['Outro',.02]],chunks=Math.max(specs.length,Math.round(bars/4)),counts=specs.map(([name,p])=>[name,Math.max(1,Math.round(chunks*p))]);let used=counts.reduce((s,x)=>s+x[1],0);while(used<chunks){counts[9][1]++;used++}while(used>chunks){const x=counts.slice(0,-1).reverse().find(x=>x[1]>1);if(!x)break;x[1]--;used--}const result=[];counts.forEach(([name,n])=>{for(let i=0;i<n*4;i++)result.push(name)});return result.slice(0,bars)}
function trackedPitchFrame(data,rate,center,size=768){
 let start=Math.max(0,Math.min(data.length-size,Math.round(center-size/2)));if(start<0||start+size>data.length)return{hz:0,confidence:0,rms:0};let mean=0;for(let i=0;i<size;i++)mean+=data[start+i];mean/=size;const frame=new Float32Array(size);let energy=0;for(let i=0;i<size;i++){const v=data[start+i]-mean;frame[i]=v;energy+=v*v}const rms=Math.sqrt(energy/size);if(rms<.004)return{hz:0,confidence:0,rms};const minTau=Math.max(2,Math.floor(rate/1000)),maxTau=Math.min(Math.floor(rate/70),Math.floor(size/2)-2),diff=new Float32Array(maxTau+1),cmnd=new Float32Array(maxTau+1);for(let tau=1;tau<=maxTau;tau++){let d=0;for(let i=0;i<size-tau;i++){const x=frame[i]-frame[i+tau];d+=x*x}diff[tau]=d/(size-tau)}let sum=0;cmnd[0]=1;for(let tau=1;tau<=maxTau;tau++){sum+=diff[tau];cmnd[tau]=sum?diff[tau]*tau/sum:1}let bestTau=minTau;while(bestTau<=maxTau){if(cmnd[bestTau]<.15){while(bestTau+1<=maxTau&&cmnd[bestTau+1]<cmnd[bestTau])bestTau++;break}bestTau++}if(bestTau>maxTau){bestTau=minTau;for(let tau=minTau+1;tau<=maxTau;tau++)if(cmnd[tau]<cmnd[bestTau])bestTau=tau}const best=cmnd[bestTau];if(best>.48)return{hz:0,confidence:Math.max(0,1-best),rms};const y0=cmnd[bestTau-1]||best,y1=cmnd[bestTau]||best,y2=cmnd[bestTau+1]||best,den=y0-2*y1+y2,shift=Math.abs(den)>.000001?.5*(y0-y2)/den:0,tau=Math.max(minTau,Math.min(maxTau,bestTau+Math.max(-.5,Math.min(.5,shift))));return{hz:rate/tau,confidence:Math.max(0,Math.min(1,1-best)),rms}
}
function normalizeTrackedMidi(midi,previous,strong){
 let n=Math.round(midi);while(n<48)n+=12;while(n>84)n-=12;if(previous&&Math.abs(n-previous)>12&&!strong){const options=[n-12,n,n+12].filter(x=>x>=48&&x<=84).sort((x,y)=>Math.abs(x-previous)-Math.abs(y-previous));if(options.length)n=options[0]}return Math.max(48,Math.min(84,n))
}
function splitAnalyzedDuration(total,midi,rest,bar,dynamic,startBeat){
 const allowed=[4,3,2,1.5,1,.5,.375,.25,.125],out=[];let remain=Math.round(total*8)/8,beat=startBeat;while(remain>.0001){let d=allowed.find(x=>x<=remain+.0001)||.125;out.push({midi,degree:Math.max(0,midi-55),bar,beat,duration:d,dynamic,rest:!!rest,tieNext:false,transcribed:true});beat+=d;remain=Math.max(0,Math.round((remain-d)*8)/8)}for(let i=0;i<out.length-1;i++)if(!rest&&out[i].midi===out[i+1].midi)out[i].tieNext=true;return out
}
function trackedPitchCandidates(data,rate,center,size=768){let start=Math.max(0,Math.min(data.length-size,Math.round(center-size/2)));if(start<0||start+size>data.length)return[];let mean=0;for(let i=0;i<size;i++)mean+=data[start+i];mean/=size;const frame=new Float32Array(size);let energy=0;for(let i=0;i<size;i++){const v=data[start+i]-mean;frame[i]=v;energy+=v*v}const rms=Math.sqrt(energy/size);if(rms<.0035)return[];const minTau=Math.max(2,Math.floor(rate/1050)),maxTau=Math.min(Math.floor(rate/78),Math.floor(size/2)-2),diff=new Float32Array(maxTau+1),cmnd=new Float32Array(maxTau+1);for(let tau=1;tau<=maxTau;tau++){let d=0;for(let i=0;i<size-tau;i++){const x=frame[i]-frame[i+tau];d+=x*x}diff[tau]=d/(size-tau)}let sum=0;cmnd[0]=1;for(let tau=1;tau<=maxTau;tau++){sum+=diff[tau];cmnd[tau]=sum?diff[tau]*tau/sum:1}const raw=[];for(let tau=minTau+1;tau<maxTau;tau++)if(cmnd[tau]<=cmnd[tau-1]&&cmnd[tau]<=cmnd[tau+1]&&cmnd[tau]<.46){const y0=cmnd[tau-1],y1=cmnd[tau],y2=cmnd[tau+1],den=y0-2*y1+y2,shift=Math.abs(den)>.000001?.5*(y0-y2)/den:0,t=Math.max(minTau,Math.min(maxTau,tau+Math.max(-.5,Math.min(.5,shift)))),hz=rate/t,midi=Math.round(69+12*Math.log2(hz/440)),confidence=Math.max(0,Math.min(1,1-y1));if(hz>=78&&hz<=1050)raw.push({hz,midi,confidence,rms})}if(!raw.length){let tau=minTau;for(let t=minTau+1;t<=maxTau;t++)if(cmnd[t]<cmnd[tau])tau=t;const v=cmnd[tau];if(v<.5){const hz=rate/tau,midi=Math.round(69+12*Math.log2(hz/440));raw.push({hz,midi,confidence:Math.max(0,1-v),rms})}}const bestByMidi=new Map();for(const x of raw){let midi=x.midi;while(midi<48)midi+=12;while(midi>84)midi-=12;const prev=bestByMidi.get(midi);if(!prev||x.confidence>prev.confidence)bestByMidi.set(midi,{...x,midi})}return[...bestByMidi.values()].sort((a,b)=>b.confidence-a.confidence).slice(0,6)}
function chooseMelodySlot(data,rate,centerTime,beatSec,previous,key,rmsFloor){const center=Math.floor(centerTime*rate),lists=[trackedPitchCandidates(data,rate,center,768)];if(!lists[0].length||lists[0][0].confidence<.55){lists.push(trackedPitchCandidates(data,rate,Math.floor((centerTime-.10*beatSec)*rate),704));lists.push(trackedPitchCandidates(data,rate,Math.floor((centerTime+.10*beatSec)*rate),704))}const flat=lists.flat();if(!flat.length)return{rest:true,midi:previous||64,confidence:0,rms:0};const maxConf=Math.max(...flat.map(x=>x.confidence)),eligible=flat.filter(x=>x.confidence>=maxConf-.13&&x.midi>=50&&x.midi<=81);let pool=eligible.length?eligible:flat,ranked=pool.map(x=>{const jump=previous?Math.abs(x.midi-previous):0,continuity=previous?Math.max(0,1-jump/18):.6,upperLead=(x.midi-50)/31,score=x.confidence*.70+upperLead*.22+continuity*.08;return{...x,score}}).sort((a,b)=>b.score-a.score),best=ranked[0],same=flat.filter(x=>x.midi===best.midi),consensus=Math.min(1,same.length/2);let midi=best.midi,strong=best.confidence>=.64;if(!strong&&best.confidence<.50)midi=nearestSupportedMidi(midi,key);if(previous&&Math.abs(midi-previous)>12&&!strong){const octave=[midi-12,midi,midi+12].filter(x=>x>=48&&x<=84).sort((a,b)=>Math.abs(a-previous)-Math.abs(b-previous));midi=octave[0]??midi}const confidence=Math.max(0,Math.min(1,best.confidence*.78+consensus*.14+.08));return{rest:confidence<.31||best.rms<rmsFloor*.75,midi,confidence,rms:best.rms}}
function buildAnalyzedMelody(a,data,rate){
 const beats=analysisBeatsPerBar(a.meter),beatSec=60/a.bpm,barSec=beats*beatSec,offset=Math.max(0,a.beatOffsetSec||0),bars=Math.max(2,Math.ceil(Math.max(.01,a.duration-offset)/barSec)),sections=analysisSectionLengths(bars),grid=.5,slots=Math.round(beats/grid),notes=[];let previous=64,reliable=0,total=0;const rmsFloor=Math.max(.0030,(a.character?.rms||.04)*.105);
 for(let bar=0;bar<bars;bar++){
  const section=sections[bar]||'Verse',obs=[];
  for(let slot=0;slot<slots;slot++){
   const centerTime=offset+(bar*beats+(slot+.5)*grid)*beatSec;if(centerTime>=a.duration){obs.push({rest:true,midi:previous,confidence:0,rms:0});continue}
   const o=chooseMelodySlot(data,rate,centerTime,beatSec,previous,a.key,rmsFloor);if(!o.rest){previous=o.midi;reliable++}total++;obs.push(o)
  }
  // Remove single-slot spikes while keeping real 16th-note motion.
  for(let i=1;i<obs.length-1;i++)if(!obs[i].rest&&!obs[i-1].rest&&!obs[i+1].rest){const l=obs[i-1].midi,m=obs[i].midi,r=obs[i+1].midi;if(l===r&&Math.abs(m-l)>=3&&obs[i].confidence<.58)obs[i].midi=l;else if(Math.abs(m-l)>=11&&Math.abs(m-r)>=11&&Math.abs(l-r)<=5&&obs[i].confidence<.68)obs[i].midi=Math.round((l+r)/2)}
  let start=0;while(start<obs.length){let end=start+1,first=obs[start];while(end<obs.length&&obs[end].rest===first.rest&&(first.rest||Math.abs(obs[end].midi-first.midi)<=0))end++;const dur=(end-start)*grid,dynamic=dynamicMark(section,'auto');notes.push(...splitAnalyzedDuration(dur,first.midi,first.rest,bar,dynamic,start*grid));start=end}
 }
 const sounded=notes.filter(n=>!n.rest).length;return{bars,sections,notes,reliability:total?reliable/total:0,barSec,detectedNotes:sounded,grid}
}
function importedAudioSource(){const file=$('#songAudioFile')?.files?.[0];if(file)return {blob:file,name:file.name};if(songMicBlob)return {blob:songMicBlob,name:songMicName};return null}

// V0.21.2 — final stereo/master files are not stem-separated. This batch path performs
// conservative automatic mastering only: spectral cleanup, vocal-presence support,
// gentle dynamics control, peak protection and loudness matching.
function batchMasterSafeName(name){const base=(name||'MARU-SONG').replace(/\.[^.]+$/,'').replace(/[\\/:*?"<>|]/g,'_').trim()||'MARU-SONG';return base.slice(0,120)}
function batchOriginalSafeName(name){const clean=(name||'ORIGINAL.wav').replace(/[\\/:*?"<>|]/g,'_').trim()||'ORIGINAL.wav';return clean.slice(0,160)}
function batchMasterDb(x){return 20*Math.log10(Math.max(1e-9,x))}
function batchMasterStats(buffer){let sum=0,count=0,peak=0;const step=Math.max(1,Math.floor(buffer.length/1800000));for(let c=0;c<buffer.numberOfChannels;c++){const d=buffer.getChannelData(c);for(let i=0;i<d.length;i+=step){const v=d[i]||0,a=Math.abs(v);sum+=v*v;count++;if(a>peak)peak=a}}const rms=Math.sqrt(sum/Math.max(1,count));return{rms,peak,rmsDb:batchMasterDb(rms),peakDb:batchMasterDb(peak)}}
function batchMasterProfile(buffer,inputStats={}){const sp=auto64Spectrum(buffer),target=dolbyInspiredSourceBands(sp.db,{}),mastered=(Number(inputStats.rmsDb)||-99)>=-18||(Number(inputStats.peakDb)||-99)>=-2.2;if(mastered){const bands=target.bands.map(v=>Math.max(-.50,Math.min(.25,(Number(v)||0)*.14)));return{bands,mastered:true,summary:'완성 마스터 원본 보호 · 재압축 0 · 초미세 6밴드 보정 · 원곡 다이내믹 유지'}}const bands=target.bands.map(v=>Math.max(-1.5,Math.min(.75,(Number(v)||0)*.42)));return{bands,mastered:false,summary:'일반 자동 보정 · 약한 EQ/다이내믹 제어 · 원곡 우선'}}
function batchConnectAutoEq(offline,input,bands,preserve=false){let tail=input;const freqs=preserve?[80,180,360,3200,7000,12000]:AUTO64_APPLY_FREQS;freqs.forEach((f,i)=>{const n=offline.createBiquadFilter();n.type=i===0?'lowshelf':i===freqs.length-1?'highshelf':'peaking';n.frequency.value=f;n.Q.value=preserve?.52:((i===0||i===freqs.length-1)?.72:1.0);let g=auto64GainAt(f,bands);if(preserve)g=Math.max(-.45,Math.min(.22,g));n.gain.value=g;tail.connect(n);tail=n});return tail}
function audioBufferToWavScaled(buffer,scale=1){const channels=Math.min(2,buffer.numberOfChannels),rate=buffer.sampleRate,length=buffer.length*channels*2+44,array=new ArrayBuffer(length),view=new DataView(array);let pos=0;const text=x=>{for(const c of x)view.setUint8(pos++,c.charCodeAt(0))},u16=n=>{view.setUint16(pos,n,true);pos+=2},u32=n=>{view.setUint32(pos,n,true);pos+=4};text('RIFF');u32(length-8);text('WAVE');text('fmt ');u32(16);u16(1);u16(channels);u32(rate);u32(rate*channels*2);u16(channels*2);u16(16);text('data');u32(length-44);const data=Array.from({length:channels},(_,c)=>buffer.getChannelData(Math.min(c,buffer.numberOfChannels-1)));for(let i=0;i<buffer.length;i++)for(let c=0;c<channels;c++){const sample=Math.max(-1,Math.min(1,(data[c][i]||0)*scale));view.setInt16(pos,sample<0?sample*32768:sample*32767,true);pos+=2}return new Blob([array],{type:'audio/wav'})}
async function batchProcessOne(file){const ac=new(window.AudioContext||window.webkitAudioContext)();try{const buffer=await ac.decodeAudioData(await file.arrayBuffer()),channels=Math.min(2,Math.max(1,buffer.numberOfChannels)),inputStats=batchMasterStats(buffer),profile=batchMasterProfile(buffer,inputStats),offline=new OfflineAudioContext(channels,buffer.length,buffer.sampleRate),src=offline.createBufferSource();src.buffer=buffer;let tail=src;if(profile.mastered){tail=batchConnectAutoEq(offline,tail,profile.bands,true);tail.connect(offline.destination);src.start(0);const rendered=await offline.startRendering(),st=batchMasterStats(rendered),targetPeak=Math.pow(10,-.8/20),scale=st.peak>targetPeak&&st.peak>1e-7?targetPeak/st.peak:1,blob=audioBufferToWavScaled(rendered,scale),afterRms=st.rms*scale,afterPeak=st.peak*scale;return{blob,duration:buffer.duration,rate:buffer.sampleRate,channels,mastered:true,summary:profile.summary,before:{rmsDb:inputStats.rmsDb,peakDb:inputStats.peakDb},after:{rmsDb:batchMasterDb(afterRms),peakDb:batchMasterDb(afterPeak)},gainDb:20*Math.log10(Math.max(1e-9,scale))}}const hp=offline.createBiquadFilter();hp.type='highpass';hp.frequency.value=22;hp.Q.value=.52;src.connect(hp);tail=batchConnectAutoEq(offline,hp,profile.bands,false);const comp=offline.createDynamicsCompressor();comp.threshold.value=-13;comp.knee.value=7;comp.ratio.value=1.08;comp.attack.value=.04;comp.release.value=.28;tail.connect(comp);const makeup=offline.createGain(),needDb=Math.max(0,Math.min(1.2,-16-inputStats.rmsDb));makeup.gain.value=Math.pow(10,needDb/20);comp.connect(makeup);const lim=offline.createDynamicsCompressor();lim.threshold.value=-.7;lim.knee.value=.8;lim.ratio.value=2.5;lim.attack.value=.003;lim.release.value=.17;makeup.connect(lim).connect(offline.destination);src.start(0);const rendered=await offline.startRendering(),st=batchMasterStats(rendered),targetRms=Math.pow(10,-16/20),targetPeak=Math.pow(10,-1.0/20),byRms=st.rms>1e-7?targetRms/st.rms:1,byPeak=st.peak>1e-7?targetPeak/st.peak:1,scale=Math.max(.5,Math.min(1.25,byRms,byPeak)),blob=audioBufferToWavScaled(rendered,scale),afterRms=st.rms*scale,afterPeak=st.peak*scale;return{blob,duration:buffer.duration,rate:buffer.sampleRate,channels,mastered:false,summary:profile.summary,before:{rmsDb:inputStats.rmsDb,peakDb:inputStats.peakDb},after:{rmsDb:batchMasterDb(afterRms),peakDb:batchMasterDb(afterPeak)},gainDb:needDb+20*Math.log10(scale)}}finally{try{await ac.close()}catch(e){}}}
const BATCH_CRC_TABLE=(()=>{const t=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=(c&1)?0xedb88320^(c>>>1):c>>>1;t[n]=c>>>0}return t})();
function batchCrc32(u8){let c=0xffffffff;for(let i=0;i<u8.length;i++)c=BATCH_CRC_TABLE[(c^u8[i])&255]^(c>>>8);return(c^0xffffffff)>>>0}
function batchDosDateTime(d=new Date()){let year=Math.max(1980,d.getFullYear()),date=((year-1980)<<9)|((d.getMonth()+1)<<5)|d.getDate(),time=(d.getHours()<<11)|(d.getMinutes()<<5)|(d.getSeconds()>>1);return{date,time}}
function batchZipLocalHeader(nameBytes,size,crc,date,time){const b=new ArrayBuffer(30+nameBytes.length),v=new DataView(b),u=new Uint8Array(b);v.setUint32(0,0x04034b50,true);v.setUint16(4,20,true);v.setUint16(6,0x0800,true);v.setUint16(8,0,true);v.setUint16(10,time,true);v.setUint16(12,date,true);v.setUint32(14,crc,true);v.setUint32(18,size,true);v.setUint32(22,size,true);v.setUint16(26,nameBytes.length,true);v.setUint16(28,0,true);u.set(nameBytes,30);return b}
function batchZipCentralHeader(nameBytes,size,crc,date,time,offset){const b=new ArrayBuffer(46+nameBytes.length),v=new DataView(b),u=new Uint8Array(b);v.setUint32(0,0x02014b50,true);v.setUint16(4,20,true);v.setUint16(6,20,true);v.setUint16(8,0x0800,true);v.setUint16(10,0,true);v.setUint16(12,time,true);v.setUint16(14,date,true);v.setUint32(16,crc,true);v.setUint32(20,size,true);v.setUint32(24,size,true);v.setUint16(28,nameBytes.length,true);v.setUint16(30,0,true);v.setUint16(32,0,true);v.setUint16(34,0,true);v.setUint16(36,0,true);v.setUint32(38,0,true);v.setUint32(42,offset,true);u.set(nameBytes,46);return b}
async function batchBuildZip(entries){const enc=new TextEncoder(),parts=[],centrals=[];let offset=0;for(const e of entries){const nameBytes=enc.encode(e.name),arr=new Uint8Array(await e.blob.arrayBuffer()),crc=batchCrc32(arr),dt=batchDosDateTime(),local=batchZipLocalHeader(nameBytes,arr.byteLength,crc,dt.date,dt.time);parts.push(local,e.blob);centrals.push(batchZipCentralHeader(nameBytes,arr.byteLength,crc,dt.date,dt.time,offset));offset+=local.byteLength+arr.byteLength}const centralOffset=offset;let centralSize=0;centrals.forEach(c=>{parts.push(c);centralSize+=c.byteLength;offset+=c.byteLength});const end=new ArrayBuffer(22),v=new DataView(end);v.setUint32(0,0x06054b50,true);v.setUint16(4,0,true);v.setUint16(6,0,true);v.setUint16(8,entries.length,true);v.setUint16(10,entries.length,true);v.setUint32(12,centralSize,true);v.setUint32(16,centralOffset,true);v.setUint16(20,0,true);parts.push(end);return new Blob(parts,{type:'application/zip'})}
function batchReportBlob(rows){const lines=['MARU WORLD MUSIC MAKER V0.22.71 · 원본 보호 자동 처리 보고서','원본 파일은 절대 수정하지 않습니다. MP4는 음성 트랙을 분석해 별도 WAV 처리본으로 생성하며, 원본 백업을 선택한 경우 01-ORIGINAL 폴더에 원본 MP4 바이트를 그대로 넣습니다.','Suno/완성 마스터 판정 곡은 재압축하지 않고 초미세 EQ와 필요 시 피크 하향만 적용합니다.',''];rows.forEach((r,i)=>lines.push(`${i+1}. ${r.original}\n   길이 ${formatSongDuration(r.duration)} · ${r.rate}Hz · ${r.channels===1?'모노':'스테레오'} · ${r.summary}\n   입력 RMS ${r.beforeRmsDb.toFixed(1)} dBFS · 입력 피크 ${r.beforePeakDb.toFixed(1)} dBFS\n   출력 RMS ${r.afterRmsDb.toFixed(1)} dBFS · 출력 피크 ${r.afterPeakDb.toFixed(1)} dBFS · 전체 레벨 ${r.gainDb>=0?'+':''}${r.gainDb.toFixed(1)} dB\n`));return new Blob(['\ufeff'+lines.join('\n')],{type:'text/plain;charset=utf-8'})}
async function batchDownloadCurrentPack(reportRows,force=false){if(!batchPackEntries.length)return;const entries=[...batchPackEntries,{name:'MARU-원본보호-자동처리-보고서.txt',blob:batchReportBlob(reportRows)}],zip=await batchBuildZip(entries),a=document.createElement('a'),songCount=Math.max(1,reportRows.length),start=Math.max(1,batchCompleted-songCount+1),end=batchCompleted;a.href=URL.createObjectURL(zip);a.download=`MARU-PRESERVE-${String(start).padStart(3,'0')}-${String(end).padStart(3,'0')}.zip`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),8000);batchPackEntries=[];batchPackBytes=0;batchPackIndex++;await new Promise(r=>setTimeout(r,500))}
function batchRenderQueue(){const q=$('#batchQueue');if(!q)return;q.innerHTML=batchMasterFiles.map((f,i)=>`<div class="batch-row" id="batchRow${i}"><span class="batch-name">${i+1}. ${escapeHtml(f.name)}</span><span class="batch-state">대기</span></div>`).join('')}
function batchSetRow(i,state,text){const row=$('#batchRow'+i);if(!row)return;row.classList.remove('working','done','error');if(state)row.classList.add(state);const st=row.querySelector('.batch-state');if(st)st.textContent=text||'';row.scrollIntoView?.({block:'nearest'})}
function batchUpdateProgress(current,total,text=''){const pct=total?Math.round(current/total*100):0;if($('#batchProgressFill'))$('#batchProgressFill').style.width=pct+'%';if($('#batchMasterSummary'))$('#batchMasterSummary').textContent=text||`${current}/${total}곡 처리`;if($('#batchMasterBadge'))$('#batchMasterBadge').textContent=batchMasterRunning?`${pct}%`:(current>=total&&total?'완료':'대기')}
async function batchAcquireWakeLock(){try{if('wakeLock'in navigator)batchWakeLock=await navigator.wakeLock.request('screen')}catch(e){batchWakeLock=null}}
async function batchReleaseWakeLock(){try{await batchWakeLock?.release()}catch(e){}batchWakeLock=null}
function selectBatchFiles(files){if(batchMasterRunning)return;batchMasterFiles=[...(files||[])].filter(f=>f.type?.startsWith('audio/')||f.type==='video/mp4'||/\.(mp3|wav|m4a|aac|ogg|flac|mp4|m4v|mov)$/i.test(f.name)).slice(0,BATCH_MAX_FILES);batchCompleted=0;batchFailed=0;batchPackEntries=[];batchPackBytes=0;batchPackIndex=1;batchRenderQueue();$('#startBatchMaster').disabled=!batchMasterFiles.length;$('#stopBatchMaster').disabled=true;batchUpdateProgress(0,batchMasterFiles.length,batchMasterFiles.length?`${batchMasterFiles.length}개 선택됨 · MP4는 음성 트랙을 추출해 한 개씩 안전하게 처리합니다.`:'여러 곡을 선택하세요.');}
async function startBatchMaster(){if(batchMasterRunning||!batchMasterFiles.length)return;batchMasterRunning=true;batchMasterStopRequested=false;batchCompleted=0;batchFailed=0;batchPackEntries=[];batchPackBytes=0;$('#startBatchMaster').disabled=true;$('#stopBatchMaster').disabled=false;await batchAcquireWakeLock();const packReports=[],keepOriginal=$('#batchKeepOriginal')?.checked!==false,packLimit=keepOriginal?180*1024*1024:BATCH_PACK_MAX_BYTES;toast(`${batchMasterFiles.length}곡 원본 보호 자동 처리를 시작합니다. 원본은 절대 수정하지 않습니다.`);try{for(let i=0;i<batchMasterFiles.length;i++){if(batchMasterStopRequested)break;const file=batchMasterFiles[i];batchSetRow(i,'working',/\.(mp4|m4v|mov)$/i.test(file.name)?'MP4 음성 트랙 분석·처리 중…':'원본 보호 처리 중…');batchUpdateProgress(i,batchMasterFiles.length,`${i+1}/${batchMasterFiles.length} · ${file.name} 분석 및 원본 보호 처리 중…`);try{const r=await batchProcessOne(file),safe=batchMasterSafeName(file.name),outName=`02-MARU-PROCESSED/${safe}-MARU-PRESERVE.wav`,report={original:file.name,duration:r.duration,rate:r.rate,channels:r.channels,summary:r.summary,beforeRmsDb:r.before.rmsDb,beforePeakDb:r.before.peakDb,afterRmsDb:r.after.rmsDb,afterPeakDb:r.after.peakDb,gainDb:r.gainDb};if(keepOriginal){batchPackEntries.push({name:`01-ORIGINAL/${batchOriginalSafeName(file.name)}`,blob:file});batchPackBytes+=file.size}batchPackEntries.push({name:outName,blob:r.blob});batchPackBytes+=r.blob.size;packReports.push(report);batchCompleted++;batchSetRow(i,'done',`${r.mastered?'원본 보호':'부드러운 보정'} 완료 · ${formatSongDuration(r.duration)}`);if(batchPackBytes>=packLimit){batchUpdateProgress(batchCompleted,batchMasterFiles.length,`${batchCompleted}/${batchMasterFiles.length} · 원본/처리본 ZIP 저장 중…`);await batchDownloadCurrentPack(packReports.splice(0),true)}}catch(e){console.error('batch preserve',file.name,e);batchFailed++;const isVideo=/\.(mp4|m4v|mov)$/i.test(file.name)||file.type==='video/mp4';batchSetRow(i,'error',isVideo?'MP4 음성 트랙을 읽지 못함 · H.264/AAC MP4 권장':'처리 실패')}batchUpdateProgress(batchCompleted+batchFailed,batchMasterFiles.length,`${batchCompleted+batchFailed}/${batchMasterFiles.length}곡 진행 · 완료 ${batchCompleted} · 실패 ${batchFailed}`);await new Promise(r=>setTimeout(r,80))}if(batchPackEntries.length){batchUpdateProgress(batchCompleted+batchFailed,batchMasterFiles.length,'마지막 원본/처리본 ZIP 저장 중…');await batchDownloadCurrentPack(packReports.splice(0),true)}const stopped=batchMasterStopRequested;batchUpdateProgress(batchCompleted+batchFailed,batchMasterFiles.length,stopped?`중지됨 · 완료 ${batchCompleted}곡 · 실패 ${batchFailed}`:`전체 처리 완료 · ${batchCompleted}곡 성공${batchFailed?` · ${batchFailed}곡 실패`:''} · 원본과 처리본은 서로 다른 폴더에 저장되었습니다.`);$('#batchMasterBadge').textContent=stopped?'중지':'완료';toast(stopped?'자동 처리를 중지했습니다':`${batchCompleted}곡 원본 보호 자동 처리 완료`)}finally{batchMasterRunning=false;$('#startBatchMaster').disabled=!batchMasterFiles.length;$('#stopBatchMaster').disabled=true;await batchReleaseWakeLock()}}
function stopBatchMaster(){if(!batchMasterRunning)return;batchMasterStopRequested=true;$('#stopBatchMaster').disabled=true;$('#batchMasterSummary').textContent='현재 곡까지만 마치고 안전하게 중지합니다…'}

function setSingleAnalysisProgress(pct,label,detail,state='working'){
 const card=$('#analysisProgressCard'),fill=$('#analysisProgressFill'),pctEl=$('#analysisProgressPct'),labelEl=$('#analysisProgressLabel'),detailEl=$('#analysisProgressDetail');
 const safe=Math.max(0,Math.min(100,Math.round(Number(pct)||0)));
 if(fill)fill.style.width=safe+'%';if(pctEl)pctEl.textContent=safe+'%';if(labelEl)labelEl.textContent=label||'분석 중';if(detailEl)detailEl.textContent=detail||'';
 if(card){card.classList.remove('done','error');if(state==='done')card.classList.add('done');else if(state==='error')card.classList.add('error')}
}
async function singleAnalysisStage(pct,label,detail){setSingleAnalysisProgress(pct,label,detail);await new Promise(r=>setTimeout(r,20))}

async function analyzeImportedSong(){
 const source=importedAudioSource();if(!source)return toast('먼저 MP3/WAV를 선택하거나 마이크로 노래를 들려주세요');
 $('#analyzeAudio').disabled=true;$('#audioAnalysisResult').textContent='정밀 분석을 시작합니다. 진행 상태를 위에서 확인하세요.';
 let ac=null;
 try{
  await singleAnalysisStage(3,'분석 시작','오디오 파일을 준비하고 있습니다.');
  ac=new(window.AudioContext||window.webkitAudioContext)();
  const buffer=await ac.decodeAudioData(await source.blob.arrayBuffer());importedSongBuffer=buffer;sourcePlaybackBoost=estimateSourcePlaybackBoost(buffer);
  await singleAnalysisStage(12,'오디오 준비 완료',`${formatSongDuration(buffer.duration)} 길이의 음원을 분석용 신호로 변환합니다.`);
  const analysisRate=8000,data=monoDownsample(buffer,analysisRate),melodyRate=12000,melodyData=melodyFocusedDownsample(buffer,melodyRate);
  await singleAnalysisStage(24,'BPM 분석','전체 곡과 여러 구간의 반복 박자를 비교하고 있습니다.');
  const tempo=estimateTempoVerified(data,analysisRate);
  await singleAnalysisStage(36,'박자표 분석',`${tempo.bpm} BPM 기준으로 4/4 · 3/4 · 6/8 강세 패턴을 비교합니다.`);
  const meterInfo=estimateMeterVerified(tempo),beatGrid=estimateBeatGridOffset(tempo,meterInfo);
  await singleAnalysisStage(49,'조성 분석',`${meterInfo.meter} 후보를 적용해 장·단조와 대체 조성을 비교합니다.`);
  const keyInfo=estimateKeyVerified(data,analysisRate),character=estimateAudioCharacter(data,tempo.bpm),mixHints=bandRoleHints(data,analysisRate,tempo),instruments=audioInstrumentSuggestion({...character,bpm:tempo.bpm,meter:meterInfo.meter},mixHints),proMetrics=analyzeProAudioMetrics(buffer);
  let base={fileName:source.name,duration:buffer.duration,bpm:tempo.bpm,meter:meterInfo.meter,key:keyInfo.key,keyConfidence:keyInfo.confidence,tempoConfidence:tempo.confidence,meterConfidence:meterInfo.confidence,beatOffsetSec:beatGrid.offsetSec,beatOffsetConfidence:beatGrid.confidence,character,mixHints,instruments,proMetrics,tempoVerification:tempo,meterVerification:meterInfo,keyVerification:keyInfo};base=applyLearningToAudioSuggestion(base);const learnedInstruments=base.instruments;
  await singleAnalysisStage(62,'주멜로디 분석','보컬·리드 음정 윤곽을 8분음표 단위로 추적합니다.');
  const melody=buildAnalyzedMelody(base,melodyData,melodyRate);
  await singleAnalysisStage(74,'코드 분석','마디별 화음 후보를 조성 안에서 정리하고 있습니다.');
  const chords=analyzeBarChords(data,analysisRate,{...base,...melody});
  importedSongAnalysis={...base,instruments:learnedInstruments,...melody,barChords:chords.chords,chordConfidence:chords.confidence,style:'',analyzedAt:new Date().toISOString()};importedSongAnalysis.proComparison=compareToProReference(importedSongAnalysis);
  await singleAnalysisStage(84,'64밴드 자동 믹싱','31Hz~16kHz를 검사해 보컬 자리와 반주 균형을 자동으로 맞춥니다.');
  configureAuto64Mix(buffer,importedSongAnalysis);applyLearningToAuto64(importedSongAnalysis);importedSongAnalysis.auto64Mix={summary:auto64State.summary,backingVolume:auto64State.backingVolume};importedSongAnalysis.style=makeAnalyzedStyle(importedSongAnalysis);
  $('#audioBpm').textContent=String(base.bpm);$('#audioMeter').textContent=base.meter;$('#audioKey').textContent=base.key;$('#audioDuration').textContent=formatSongDuration(base.duration);setAnalyzedStyleOutput(importedSongAnalysis.style);['copyAnalyzedStyle','applyAnalyzedStyle','buildAnalyzedScore','playExtractedMelody','playAnalyzedArrangement','learnAnalyzedSongQuick'].forEach(id=>$('#'+id).disabled=false);if($('#abAnalyzed'))$('#abAnalyzed').disabled=false;if($('#abOriginal'))$('#abOriginal').disabled=false;
  const tempoPct=Math.round(base.tempoConfidence*100),meterPct=Math.round(base.meterConfidence*100),keyPct=Math.round(base.keyConfidence*100),melodyPct=Math.round(melody.reliability*100),tempoAgree=Math.round((tempo.agreement||0)*100),keyAgree=Math.round((keyInfo.agreement||0)*100),alt=(keyInfo.candidates||[]).filter(x=>x.name!==base.key).slice(0,2).map(x=>x.name).join(' / ')||'없음',chordPct=Math.round(chords.confidence*100);
  $('#audioAnalysisResult').textContent=`입력: ${source.name}
길이: ${formatSongDuration(base.duration)} · 전체 약 ${melody.bars}마디
BPM: ${base.bpm} (신뢰도 ${tempoPct}% · 구간 일치 ${tempoAgree}% · ${tempo.segmentBpms.join(', ')})
박자: ${base.meter} (신뢰도 ${meterPct}% · 후보 ${meterInfo.candidates.slice(0,3).map(x=>`${x.name} ${Math.round(x.score*100)}`).join(' / ')})
조성: ${base.key} (신뢰도 ${keyPct}% · 구간 일치 ${keyAgree}% · 다음 후보 ${alt})
박자 시작점 보정: ${(base.beatOffsetSec||0).toFixed(2)}초
주멜로디 표본: ${melodyPct}%에서 뚜렷한 음높이 감지
마디별 코드 추정: ${chordPct}% · ${chords.chords.slice(0,8).join(' → ')}${chords.chords.length>8?' …':''}
추천 편곡(원음 역할 + 장르 + 전문 기준): ${learnedInstruments.join(', ')}
전문 음향 비교: ${importedSongAnalysis.proComparison?.summary||'기준곡 추가 필요'}
${(importedSongAnalysis.proComparison?.messages||[]).slice(0,2).join(' · ')}
측정 참고: RMS ${proMetrics.rmsDbfs.toFixed(1)} dBFS · Peak ${proMetrics.samplePeakDbfs.toFixed(1)} dBFS · Crest ${proMetrics.crestDb.toFixed(1)} dB · 다이내믹 범위(근사) ${proMetrics.dynamicRangeProxyDb.toFixed(1)} dB · 스테레오 폭 ${Math.round(proMetrics.stereoWidth*100)}%

※ V0.22.71의 전문 기준 분석은 ITU-R BS.1770/EBU R128/IEC 음성 명료도 개념을 참고한 브라우저용 비교 분석이며 인증 계측기를 대체하지 않습니다. AI 음질개선은 전문 기준을 강제 EQ 목표로 사용하지 않습니다.`;
  renderAnalysisCoach(importedSongAnalysis);applyImportedStyle(false);
  await singleAnalysisStage(93,'악보 생성','추출 멜로디와 마디별 코드를 실제 악보와 편곡에 연결합니다.');
  buildImportedArrangementScore(true);
  const autoStatus=$('#audioApplyStatus');if(autoStatus&&analyzedSettingsMatch(importedSongAnalysis))autoStatus.textContent=`✓ 분석·악보 자동 적용 완료 · ${base.bpm} BPM · ${base.meter} · ${base.key} · 악기 ${learnedInstruments.length}개 · 코드 ${chordPct}%`;
  setSingleAnalysisProgress(100,'✅ 분석 완료',`${base.bpm} BPM · ${base.meter} · ${base.key} · 악보 ${melody.bars}마디까지 자동 적용 완료`,'done');
  if(source.name===songMicName||/마이크로 들은 노래/i.test(source.name)){const cmp=autoLearnMicAnalysis(source);$('#songMicStatus').textContent=`✅ 마이크 녹음·자동 분석 완료 · ${formatSongDuration(base.duration)} · ${base.bpm} BPM · ${base.meter} · ${base.key}${learningMicAutoEnabled()?` · 🎯 전문 기준 비교 ${cmp?.score!=null?cmp.score+'점':'기준곡 부족'}`:' · 전문 기준 자동 비교 OFF'}`;if(cmp&&$('#learningProgress'))$('#learningProgress').textContent=`✅ 마이크 분석 대상 비교 완료 · ${source.name}\n${cmp.summary}\n${(cmp.messages||[]).slice(0,2).join('\n')}\n마이크 음원은 전문 기준 학습 데이터에 섞지 않았습니다.`}
  toast('분석 완료 · 실제 악보와 편곡까지 자동 연결했습니다');
 }catch(e){console.error(e);$('#audioAnalysisResult').textContent='이 오디오를 분석하지 못했습니다. 파일을 다시 선택하거나 마이크 녹음을 다시 시도해 주세요.';setSingleAnalysisProgress(0,'분석 실패',e?.message||'오디오 분석 중 오류가 발생했습니다.','error');if(source?.name===songMicName||/마이크로 들은 노래/i.test(source?.name||''))$('#songMicStatus').textContent='마이크 녹음은 저장했지만 자동 분석에 실패했습니다. 다시 분석을 눌러 주세요.';toast('노래 분석에 실패했습니다')}
 finally{$('#analyzeAudio').disabled=false;try{await ac?.close()}catch(e){}}
}

function applyImportedStyle(showToast=true){
 const a=importedSongAnalysis;if(!a)return toast('먼저 노래를 자동 분석해 주세요');
 const controlsOk=setAnalyzedProjectControls(a),mins=a.duration/60,choices=[2,3,4,4.5,5,5.5,6],closest=choices.reduce((x,y)=>Math.abs(y-mins)<Math.abs(x-mins)?y:x);
 $('#length').value=String(closest);setSelectText('genre',a.character.genre);setSelectText('mood',a.character.moodOption);$('#speed').value=a.bpm<85?'slow':a.bpm>115?'fast':'medium';
 $('#style').value=a.style;$('#styleMode').value='manual';setAnalyzedStyleOutput(a.style);
 selected=new Set(a.instruments);manualInstrumentSelection=true;
 const groups=Object.entries(DATA).filter(([_,list])=>list.some(x=>a.instruments.includes(x[0]))).map(([name])=>name);region=groups.includes('현대악기')?'현대악기':groups.includes('오케스트라')?'오케스트라':groups[0]||region;
 renderRegions();renderInstruments();lastProfile={...PROFILES.generic,bpm:a.bpm,meter:a.meter,key:a.key,genre:a.character.genre,mood:a.character.mood,modern:[...a.instruments],arrange:'분석한 원곡의 구간별 에너지와 주멜로디 윤곽을 기준으로 편곡'};
 const syncOk=controlsOk&&analyzedSettingsMatch(a),inst=[...selected].join(' + ');$('#musicInfo').textContent=`분석 적용 · ${a.bpm} BPM · ${a.meter}박자 · ${a.key} · 추천 악기 ${inst}`;
 const status=$('#audioApplyStatus');if(status)status.textContent=`${syncOk?'✓ 분석값 동기화':'⚠ 설정 확인 필요'} · ${a.bpm} BPM · ${a.meter} · ${a.key} · 악기 ${a.instruments.length}개: ${a.instruments.join(', ')}`;
 if(showToast)toast(syncOk?`분석 스타일과 추천 악기 ${selected.size}개를 정확히 적용했습니다`:'분석값을 적용했지만 일부 설정을 확인해 주세요')
}
function buildImportedArrangementScore(silent=false){
 const a=importedSongAnalysis;if(!a)return toast('먼저 노래를 자동 분석해 주세요');applyImportedStyle(false);setAnalyzedProjectControls(a);stop();
 scoreEntries=Array.from({length:a.bars},(_,bar)=>({section:a.sections[bar]||'Verse',text:'',noLyric:false,instrumental:false,transcribed:true,phraseId:null,phraseText:''}));songPlan=scoreEntries.map(e=>({...e}));songBarTexts=Array(a.bars).fill('');scoreNotes=a.notes.map(n=>({...n,transcribed:true}));barOverrides={};melodyFirstMode=true;selectedNoteIndex=-1;selectionCustom=false;selectionStartBar=0;selectionEndBar=Math.max(0,a.bars-1);
 const baseTitle=a.fileName.replace(/\.[^.]+$/,'').trim();if(!$('#title').value.trim())$('#title').value=`${baseTitle} 자동 채보`;
 fillBarEditor();
 // renderReadableScoreV011() reads scoreSettings(), so verify again after rendering and rerender once if any UI callback changed it.
 if(!analyzedSettingsMatch(a)){setAnalyzedProjectControls(a);fillBarEditor()}
 const syncOk=analyzedSettingsMatch(a),seconds=a.duration,notes=scoreNotes.filter(n=>!n.rest).length;
 $('#scoreMeta').textContent=`녹음에서 추출한 실제 음표 초안 · ${a.key} · ${a.meter}박자 · ${a.bpm} BPM · ${a.bars}마디 · 음표 ${notes}개 · 실제 길이 ${formatSongDuration(seconds)} · 감지 신뢰 ${Math.round(a.reliability*100)}% · BPM ${Math.round(a.tempoConfidence*100)}% · 조성 ${Math.round(a.keyConfidence*100)}% · 코드 ${Math.round((a.chordConfidence||0)*100)}% · ${syncOk?'분석값 일치 ✓':'설정 불일치 ⚠'}`;
 const status=$('#audioApplyStatus');if(status)status.textContent=`${syncOk?'✓ 악보까지 분석값 일치':'⚠ 악보 설정 재확인'} · ${a.bpm} BPM · ${a.meter} · ${a.key} · ${a.instruments.join(', ')}`;
 if(!silent)$('#scoreSheet')?.scrollIntoView({behavior:'smooth',block:'start'});if(!silent)toast(syncOk?'분석한 BPM·박자·조성·악기·마디별 코드로 실제 음표 악보를 만들었습니다':'악보는 만들었지만 분석 설정 동기화를 확인해 주세요')
}
async function copyImportedStyle(){const text=importedSongAnalysis?.style||$('#analyzedStyle').value;if(!text)return toast('먼저 노래를 자동 분석해 주세요');try{await navigator.clipboard.writeText(text);toast('분석한 음악 스타일을 복사했습니다')}catch(e){$('#analyzedStyle').select();document.execCommand?.('copy');toast('분석한 음악 스타일을 복사했습니다')}}
function allInstrumentNames(){return Object.values(DATA).flat().map(x=>x[0])}
function applyStyleTextToProject(){const text=$('#style').value.trim();if(!text)return toast('먼저 적용할 스타일을 입력하거나 붙여넣어 주세요');let changed=0;const bpm=text.match(/\b(\d{2,3})\s*BPM\b/i);if(bpm){$('#scoreMode').value='manual';$('#manualBpm').value=Math.max(45,Math.min(180,Number(bpm[1])));changed++}const meter=text.match(/\b(4\/4|3\/4|6\/8)\s*(?:time|박자)?/i);if(meter&&setSelectText('manualMeter',meter[1])){$('#scoreMode').value='manual';changed++}const key=text.match(/\b(C#|F#|G#|C|D|E|F|G|A|B)\s+(Major|Minor)\b/i);if(key){const k=`${key[1].toUpperCase().replace('C#','C#').replace('F#','F#').replace('G#','G#')} ${key[2][0].toUpperCase()+key[2].slice(1).toLowerCase()}`;if(setSelectText('manualKey',k)){$('#scoreMode').value='manual';changed++}}const mins=text.match(/(?:약\s*|approximately\s*)(\d+(?:\.\d+)?)\s*(?:분|minutes?)/i);if(mins){const n=Number(mins[1]),choices=[2,3,4,4.5,5,5.5,6],closest=choices.reduce((x,y)=>Math.abs(y-n)<Math.abs(x-n)?y:x);$('#length').value=String(closest);changed++}const genreOptions=[...$('#genre').options].map(o=>o.value).filter(v=>v&&v!=='auto').sort((a,b)=>b.length-a.length),genre=genreOptions.find(g=>text.toLowerCase().includes(g.toLowerCase()));if(genre&&setSelectText('genre',genre))changed++;const names=allInstrumentNames(),instrumentPart=(text.match(/(?:악기|Instruments?)\s*:\s*([^\.\n]+)/i)||[])[1]||'',found=names.filter(n=>instrumentPart.includes(n));if(found.length){selected=new Set(found);manualInstrumentSelection=true;const groups=Object.entries(DATA).filter(([_,list])=>list.some(x=>found.includes(x[0]))).map(([name])=>name);region=groups.includes('현대악기')?'현대악기':groups.includes('오케스트라')?'오케스트라':groups[0]||region;renderRegions();renderInstruments();changed++}if(bpm){const n=Number(bpm[1]);$('#speed').value=n<85?'slow':n>115?'fast':'medium'}$('#styleMode').value='manual';updateScoreMode(true);const p=scoreSettings();$('#musicInfo').textContent=`스타일 적용 · ${p.bpm} BPM · ${p.meter}박자 · ${p.key} · ${[...selected].join(' + ')||'악기 선택 유지'}`;toast(changed?`스타일에서 ${changed}개 설정을 읽어 바로 적용했습니다`:'스타일 문장은 유지했습니다. BPM·박자·조성·악기 표기를 확인해 주세요')}
async function playImportedOriginal(){
 const el=$('#sourceAudio');if(!el?.src&&!importedSongBuffer)return toast('먼저 노래를 녹음하거나 파일을 선택해 주세요');stop();
 // V0.22.71: 분석된 원곡은 EQ/압축 없이 피크 안전 범위의 전체 gain만 적용한다.
 if(importedSongBuffer){try{const c=audio();await c.resume();const src=c.createBufferSource(),gain=c.createGain(),lim=c.createDynamicsCompressor();src.buffer=importedSongBuffer;gain.gain.value=standaloneSourceGain();lim.threshold.value=-1.0;lim.knee.value=.5;lim.ratio.value=12;lim.attack.value=.0015;lim.release.value=.12;src.connect(gain).connect(lim).connect(c.destination);sourceReferenceNode=src;src.onended=()=>{if(sourceReferenceNode===src)sourceReferenceNode=null};src.start();abSetStatus('A · 원본 재생 중');toast(`A · 원곡 재생 · 평균 음량 자동 보정 ${Math.round(gain.gain.value*100)}% · 피크 보호`);return}catch(e){console.warn('raw source playback',e)}}
 if(el?.src){try{el.pause();el.muted=false;el.defaultMuted=false;el.volume=1;el.playbackRate=1;try{el.currentTime=0}catch(e){}await el.play();if(!el.paused){abSetStatus('A · 원본 재생 중');toast('A · 원곡 그대로 재생합니다');return}}catch(e){console.warn('native source playback fallback',e)}}
 abSetStatus('A · 원본 재생 실패');toast('원곡 재생을 시작하지 못했습니다')
}
async function playAIEnhancedOriginal(){
 if(!importedSongAnalysis||!importedSongBuffer)return toast('먼저 노래 자동 분석을 해 주세요');stop();
 try{const c=audio();await c.resume();const src=c.createBufferSource(),gain=c.createGain(),sg=standaloneSourceGain();src.buffer=importedSongBuffer;gain.gain.value=1;src.connect(gain);auto64ReferenceMixActive=false;connectSourceMixer(c,gain,sg);sourceReferenceNode=src;src.onended=()=>{if(sourceReferenceNode===src)sourceReferenceNode=null;stopAuto64Ducking();refreshAuto64Audio()};src.start();const status=$('#audioApplyStatus');if(status)status.textContent=`✨ AI 음질개선 재생 중 · 새 반주 0% · Dolby 참고 자동곡선 · 저역 풍성함 + 고역 완화 · 원곡 다이내믹 우선`;toast('B · AI 음질개선본 · 저역 몸통 보강 + 고역 자동 완화 · 원곡 다이내믹 우선 · 새 반주 0%');return}catch(e){console.warn('AI enhanced source playback',e);toast('AI 음질개선 재생을 시작하지 못했습니다')}
}
function stopImportedPlayback(){const el=$('#sourceAudio');if(el){el.pause();try{el.currentTime=0}catch{}}stop();toast('재생을 멈췄습니다')}
async function playExtractedMelodyPreview(){const a=importedSongAnalysis;if(!a?.notes?.length)return toast('먼저 노래를 자동 분석해 주세요');$('#sourceAudio')?.pause();stop();const c=audio();try{await c.resume()}catch(e){}try{await ensureSoundfont()}catch(e){}try{if(c.state==='suspended')await c.resume()}catch(e){}const beatSec=60/a.bpm,beats=analysisBeatsPerBar(a.meter),barSec=beats*beatSec,guide='피아노';$('#pulse').classList.add('playing');for(let bar=0;bar<a.bars;bar++){const delay=bar*barSec*1000;timers.push(setTimeout(()=>{let at=0;for(const n of a.notes.filter(x=>x.bar===bar)){const dur=n.duration*beatSec;if(!n.rest){let m=n.midi;while(m>76)m-=12;playInstrument(guide,midiFreq(m),at,Math.max(.08,dur*.88),.060,.72);}at+=dur}},Math.max(0,delay-20)))}timers.push(setTimeout(()=>$('#pulse').classList.remove('playing'),a.bars*barSec*1000+100));toast(`추출 멜로디 확인용 피아노입니다 · 전체 편곡에서는 피아노가 코드 반주로 바뀝니다`)}
async function playAnalyzedArrangementPreview(){return playAIEnhancedOriginal()}
async function playGeneratedArrangementScore(){
 if(!scoreNotes.length){if(importedSongAnalysis)buildImportedArrangementScore(true);else createScore()}
 if(!scoreNotes.length)return toast('먼저 악보를 만들어 주세요');
 stop();const p=scoreSettings();const guide=[...selected].find(n=>{const t=findInstrument(n)?.[2];return t&&t!=='drum'&&t!=='bass'})||'피아노';const c=audio();try{await c.resume();await ensureSoundfont()}catch(e){}
 if(c.state!=='running')return toast('브라우저 오디오가 잠겨 있습니다. 화면을 한 번 누른 뒤 다시 눌러 주세요');
 const bars=Array.from({length:scoreEntries.length},(_,i)=>i),q=60/p.bpm,total=p.meter==='6/8'?3:Number(p.meter.split('/')[0])||4,barSec=q*total,adaptive=importedSongAnalysis&&analysisTempoUncertain()?adaptiveBarTimes(importedSongAnalysis):null,first=bars[0]||0;
 const rel=(bar,index)=>adaptive&&adaptive[bar]!=null&&adaptive[first]!=null?Math.max(0,adaptive[bar]-adaptive[first]):index*barSec;
 const scheduleScoreBar=bar=>{let at=0;const notes=scoreNotes.filter(n=>n.bar===bar);for(const n of notes){const dur=Math.max(.04,n.duration*q);if(!n.rest){let midi=n.midi;while(midi>84)midi-=12;while(midi<45)midi+=12;const dyn=DYNAMIC_VOLUME[n.dynamic]||.07;playInstrument(guide,midiFreq(midi),at,Math.max(.08,dur*.90),Math.max(.055,dyn*.98),1.05)}at+=dur}};
 $('#pulse').classList.add('playing');bars.forEach((bar,i)=>{timers.push(setTimeout(()=>{if(!ctx)return;scheduleScoreBar(bar);$$('.score-note').forEach(x=>x.classList.remove('active'));$(`[data-bar-select="${bar}"]`)?.classList.add('active')},Math.max(0,rel(bar,i)*1000)))});
 const last=bars.at(-1)||0,finish=rel(last,bars.length-1)+barSec;timers.push(setTimeout(()=>{$$('.score-note').forEach(x=>x.classList.remove('active'));$('#pulse').classList.remove('playing')},finish*1000+100));toast(`편곡에서 만든 악보 음표를 ${guide} 음색으로 다시 들려줍니다 · 원곡/추가 반주 없음`);return finish
}

async function playCreatedSongPreview(){
 const lyrics=$('#lyrics')?.value.trim();if(!lyrics)return toast('먼저 새 노래를 만들어 주세요');
 try{applyEditedLyrics(true);if(!scoreNotes.length)createScore();if(!scoreNotes.length)return toast('재생할 멜로디가 없습니다');
  const title=$('#title')?.value.trim()||'새 노래',p=scoreSettings(),names=[...selected];
  $('#createdSongPlayStatus').textContent=`▶ ${title} · ${p.bpm} BPM · ${p.key} · ${names.length?names.slice(0,5).join(', '):'자동 악기'} · 전체 멜로디+반주 재생 준비`;
  const finish=await playRange(false,false);
  if(Number.isFinite(finish)&&finish>0){$('#createdSongPlayStatus').textContent=`▶ ${title} 재생 중 · 멜로디 + 선택 악기 편곡 · ${scoreEntries.length}마디`;timers.push(setTimeout(()=>{const el=$('#createdSongPlayStatus');if(el)el.textContent=`✓ ${title} 미리듣기 완료 · 다시 ▶를 누르면 처음부터 재생합니다.`},finish*1000+160))}
 }catch(e){console.error('created song preview',e);$('#createdSongPlayStatus').textContent='재생을 시작하지 못했습니다. 악기 샘플을 다시 불러온 뒤 시도해 주세요.';toast('새 노래 재생을 시작하지 못했습니다')}
}
async function playCreatedMelodyPreview(){
 const lyrics=$('#lyrics')?.value.trim();if(!lyrics)return toast('먼저 새 노래를 만들어 주세요');
 try{applyEditedLyrics(true);if(!scoreNotes.length)createScore();if(!scoreNotes.length)return toast('재생할 멜로디가 없습니다');const title=$('#title')?.value.trim()||'새 노래';$('#createdSongPlayStatus').textContent=`♫ ${title} · 멜로디만 재생 준비`;const finish=await playGeneratedArrangementScore();if(Number.isFinite(finish)&&finish>0)$('#createdSongPlayStatus').textContent=`♫ ${title} · 멜로디만 재생 중 · ${scoreEntries.length}마디`}catch(e){console.error('created melody preview',e);toast('멜로디 재생을 시작하지 못했습니다')}
}
function stopCreatedSongPreview(){stop();const el=$('#createdSongPlayStatus');if(el)el.textContent='■ 새 노래 미리듣기를 정지했습니다. ▶를 누르면 처음부터 다시 재생합니다.';toast('새 노래 재생을 멈췄습니다')}

function resetImportedAnalysis(){importedSongAnalysis=null;importedSongBuffer=null;sourcePlaybackBoost=1;adaptiveBarTimingCache={key:'',times:null,confidence:0};stopSourceReference(true);setSingleAnalysisProgress(0,'분석 대기','노래 파일을 고르거나 마이크 녹음을 끝내면 자동으로 시작합니다.');if($('#analysisCoachText'))$('#analysisCoachText').textContent='노래를 분석하면 “몇 BPM·몇 박자 / 어떤 악기 역할이 어울리는지 / 보컬을 또렷하게 하려면 어떻게 섞을지”를 여기에 정리합니다.';if($('#analysisGrade'))$('#analysisGrade').textContent='분석 전';if($('#tempoCandidateButtons'))$('#tempoCandidateButtons').innerHTML='';if($('#meterCandidateButtons'))$('#meterCandidateButtons').innerHTML='';['feedbackGood','feedbackTempo','feedbackInstrument','feedbackMelody'].forEach(id=>{if($('#'+id))$('#'+id).disabled=true});['copyAnalyzedStyle','applyAnalyzedStyle','buildAnalyzedScore','playExtractedMelody','playAnalyzedArrangement','learnAnalyzedSongQuick'].forEach(id=>$('#'+id).disabled=true);if($('#abAnalyzed'))$('#abAnalyzed').disabled=true;if($('#abOriginal'))$('#abOriginal').disabled=true;$('#playSourceSong').disabled=true;setAnalyzedStyleOutput('');const status=$('#audioApplyStatus');if(status)status.textContent='분석 후 적용 상태가 표시됩니다.';$('#audioBpm').textContent=$('#audioMeter').textContent=$('#audioKey').textContent=$('#audioDuration').textContent='—'}
function setImportedAudioBlob(blob,name){if(importedSongUrl)URL.revokeObjectURL(importedSongUrl);resetImportedAnalysis();const el=$('#sourceAudio'),saveBtn=$('#saveCurrentToBroadcast');if(!blob){el.removeAttribute('src');el.load?.();if(saveBtn)saveBtn.disabled=true;return}importedSongUrl=URL.createObjectURL(blob);el.muted=false;el.defaultMuted=false;el.volume=1;el.src=importedSongUrl;el.load?.();$('#playSourceSong').disabled=false;if($('#abOriginal'))$('#abOriginal').disabled=false;if(saveBtn)saveBtn.disabled=false;$('#audioAnalysisResult').textContent=`${name}\n입력이 준비됐습니다. ‘🧠 노래 자동 분석’을 눌러 주세요.`}
function setImportedAudioFile(file){songMicBlob=null;if(!file)return setImportedAudioBlob(null,'');setImportedAudioBlob(file,file.name)}
function mergeFloat32Chunks(chunks){const total=chunks.reduce((n,a)=>n+a.length,0),out=new Float32Array(total);let off=0;for(const a of chunks){out.set(a,off);off+=a.length}return out}
function pcmToWavBlob(samples,rate){const buffer=new ArrayBuffer(44+samples.length*2),view=new DataView(buffer);const text=(o,t)=>{for(let i=0;i<t.length;i++)view.setUint8(o+i,t.charCodeAt(i))};text(0,'RIFF');view.setUint32(4,36+samples.length*2,true);text(8,'WAVE');text(12,'fmt ');view.setUint32(16,16,true);view.setUint16(20,1,true);view.setUint16(22,1,true);view.setUint32(24,rate,true);view.setUint32(28,rate*2,true);view.setUint16(32,2,true);view.setUint16(34,16,true);text(36,'data');view.setUint32(40,samples.length*2,true);for(let i=0;i<samples.length;i++){const x=Math.max(-1,Math.min(1,samples[i]));view.setInt16(44+i*2,x<0?x*0x8000:x*0x7fff,true)}return new Blob([buffer],{type:'audio/wav'})}
function songMicErrorText(e){const n=e?.name||'';if(n==='NotAllowedError'||n==='SecurityError')return '마이크 권한이 차단되어 있습니다. 브라우저 사이트 설정에서 마이크를 허용한 뒤 다시 눌러 주세요.';if(n==='NotFoundError'||n==='DevicesNotFoundError')return '사용 가능한 마이크를 찾지 못했습니다. 휴대폰 또는 컴퓨터의 마이크를 확인해 주세요.';if(n==='NotReadableError'||n==='TrackStartError')return '다른 앱이 마이크를 사용 중이거나 브라우저가 마이크를 열지 못했습니다. 다른 방송/녹음 앱을 닫고 다시 시도해 주세요.';if(n==='OverconstrainedError')return '현재 마이크가 요청한 녹음 설정을 지원하지 않습니다. 기본 마이크 설정으로 다시 시도해 주세요.';return `마이크를 시작하지 못했습니다${n?' ('+n+')':''}. 브라우저의 마이크 권한과 입력 장치를 확인해 주세요.`}
function songMicSignalStats(samples){if(!samples?.length)return {rms:0,peak:0};let sum=0,peak=0;for(let i=0;i<samples.length;i++){const x=samples[i],a=Math.abs(x);sum+=x*x;if(a>peak)peak=a}return {rms:Math.sqrt(sum/samples.length),peak}}
function normalizeSongMicSamples(samples){const st=songMicSignalStats(samples);if(!samples?.length||st.peak<.00002)return {samples,gain:1,before:st,after:st};let activeSq=0,activeN=0;const step=Math.max(1,Math.floor(samples.length/120000));for(let i=0;i<samples.length;i+=step){const v=samples[i];if(Math.abs(v)>.003){activeSq+=v*v;activeN++}}const activeRms=activeN?Math.sqrt(activeSq/activeN):st.rms,basis=Math.max(st.rms,activeRms*.62),gain=Math.max(1,Math.min(16,.22/Math.max(.00005,basis)));if(gain<=1.015)return {samples,gain:1,before:st,after:st};const out=new Float32Array(samples.length);for(let i=0;i<samples.length;i++){const x=samples[i]*gain,a=Math.abs(x);out[i]=a<=.90?x:Math.sign(x)*(.90+.079*(1-Math.exp(-(a-.90)/.079)))}return {samples:out,gain,before:st,after:songMicSignalStats(out)}}
function updateSongMicAnalyserLevel(){if(!songMicAnalyser)return songMicLastLevel;const n=songMicAnalyser.fftSize||1024;if(!songMicMeterData||songMicMeterData.length!==n)songMicMeterData=new Float32Array(n);songMicAnalyser.getFloatTimeDomainData(songMicMeterData);let sum=0,peak=0;for(let i=0;i<n;i++){const x=songMicMeterData[i],a=Math.abs(x);sum+=x*x;if(a>peak)peak=a}const rms=Math.sqrt(sum/n);songMicPeakLevel=Math.max(songMicPeakLevel,peak);songMicLastLevel=Math.max(rms,songMicLastLevel*.72);return songMicLastLevel}
function updateSongMicClock(){if(!songMicActive)return;const sec=(performance.now()-songMicStarted)/1000;updateSongMicAnalyserLevel();const db=songMicLastLevel>0?20*Math.log10(songMicLastLevel):-90,pct=Math.max(0,Math.min(100,Math.round((db+60)/50*100)));$('#songMicLevelFill').style.width=pct+'%';const track=songMicStream?.getAudioTracks?.()[0],muted=!!track?.muted;$('#songMicLevelText').textContent=muted?'마이크 음소거됨':pct<4?(sec>2?'입력 없음 · 마이크 확인':'입력 확인 중'):pct<20?'매우 작음':pct<45?'입력 확인':pct<78?'좋음':'너무 큼';$('#songMicStatus').textContent=`● 마이크 녹음 중 ${sec.toFixed(1)}초 · 입력 레벨 ${pct}%${songMicProcessorFrames===0&&sec>2?' · 모바일 호환 녹음 대기':''}`;songMicTimer=requestAnimationFrame(updateSongMicClock)}
async function openSongMicStream(){try{return await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:false,noiseSuppression:false,autoGainControl:false,channelCount:1}})}catch(e){if(e?.name==='OverconstrainedError'||e?.name==='TypeError')return navigator.mediaDevices.getUserMedia({audio:true});throw e}}
function startSongMicMediaRecorder(stream){songMicRecorder=null;songMicChunks=[];if(typeof MediaRecorder==='undefined')return null;const candidates=['audio/webm;codecs=opus','audio/webm','audio/mp4'];let mime='';for(const t of candidates){try{if(MediaRecorder.isTypeSupported?.(t)){mime=t;break}}catch{}}try{const rec=mime?new MediaRecorder(stream,{mimeType:mime}):new MediaRecorder(stream);rec.ondataavailable=e=>{if(e.data?.size)songMicChunks.push(e.data)};rec.start(500);songMicRecorder=rec;return rec}catch(e){console.warn('MediaRecorder fallback unavailable',e);return null}}
async function stopSongMicMediaRecorder(){const rec=songMicRecorder;if(!rec)return null;if(rec.state!=='inactive'){await new Promise(resolve=>{let done=false;const finish=()=>{if(done)return;done=true;resolve()};rec.addEventListener('stop',finish,{once:true});try{rec.requestData?.();rec.stop()}catch{finish()}setTimeout(finish,2500)})}if(!songMicChunks.length)return null;const type=rec.mimeType||songMicChunks[0]?.type||'audio/webm';return new Blob(songMicChunks,{type})}
async function decodeSongMicEncoded(blob){if(!blob?.size||!songMicAudioCtx)return null;const ab=await blob.arrayBuffer();const b=await songMicAudioCtx.decodeAudioData(ab.slice(0));const out=new Float32Array(b.length);for(let ch=0;ch<b.numberOfChannels;ch++){const d=b.getChannelData(ch),scale=1/b.numberOfChannels;for(let i=0;i<out.length;i++)out[i]+=d[i]*scale}return {samples:out,rate:b.sampleRate}}
async function startSongMic(){if(!navigator.mediaDevices?.getUserMedia)return toast('이 브라우저는 마이크 입력을 지원하지 않습니다');if(proMicActive)return toast('전문곡 녹음 학습을 먼저 종료해 주세요');if(songMicActive)return;try{songMicStream=await openSongMicStream();songMicPcmChunks=[];songMicChunks=[];songMicBlob=null;songMicLastLevel=0;songMicPeakLevel=0;songMicProcessorFrames=0;songMicMeterData=null;$('#songAudioFile').value='';const AC=window.AudioContext||window.webkitAudioContext;songMicAudioCtx=new AC();await songMicAudioCtx.resume?.();songMicSampleRate=songMicAudioCtx.sampleRate;songMicSourceNode=songMicAudioCtx.createMediaStreamSource(songMicStream);songMicAnalyser=songMicAudioCtx.createAnalyser();songMicAnalyser.fftSize=2048;songMicAnalyser.smoothingTimeConstant=.72;songMicSilentGain=songMicAudioCtx.createGain();songMicSilentGain.gain.value=.000001;songMicSourceNode.connect(songMicAnalyser);songMicAnalyser.connect(songMicSilentGain);songMicSilentGain.connect(songMicAudioCtx.destination);songMicProcessor=songMicAudioCtx.createScriptProcessor?songMicAudioCtx.createScriptProcessor(4096,1,1):null;songMicActive=true;if(songMicProcessor){songMicProcessor.onaudioprocess=e=>{if(!songMicActive)return;const input=e.inputBuffer.getChannelData(0),copy=new Float32Array(input);songMicPcmChunks.push(copy);songMicProcessorFrames++;const st=songMicSignalStats(input);songMicPeakLevel=Math.max(songMicPeakLevel,st.peak)};songMicSourceNode.connect(songMicProcessor);songMicProcessor.connect(songMicSilentGain)}const fallback=startSongMicMediaRecorder(songMicStream);if(!songMicProcessor&&!fallback)throw new Error('이 브라우저에서 사용할 수 있는 녹음 방식이 없습니다');songMicStarted=performance.now();setSingleAnalysisProgress(0,'녹음 중','녹음을 끝내면 자동 분석이 시작됩니다.');$('#startSongMic').disabled=true;$('#stopSongMic').disabled=false;$('#songMicLevelFill').style.width='0%';$('#songMicLevelText').textContent='입력 확인 중';$('#songMicStatus').textContent='● 마이크 녹음 중 0.0초';updateSongMicClock();toast('마이크 녹음을 시작했습니다. 입력 레벨은 마이크 신호에서 직접 표시합니다')}catch(e){console.error(e);songMicActive=false;try{if(songMicRecorder?.state==='recording')songMicRecorder.stop()}catch{}songMicRecorder=null;songMicStream?.getTracks().forEach(t=>t.stop());songMicStream=null;try{await songMicAudioCtx?.close()}catch{}songMicAudioCtx=null;$('#startSongMic').disabled=false;$('#stopSongMic').disabled=true;const msg=songMicErrorText(e);$('#songMicStatus').textContent=msg;toast(msg)}}
async function stopSongMic(){if(!songMicActive)return toast('지금 마이크로 녹음하고 있지 않습니다');songMicActive=false;cancelAnimationFrame(songMicTimer);$('#songMicStatus').textContent='WAV 녹음 파일을 만들고 있습니다…';$('#stopSongMic').disabled=true;try{const encoded=await stopSongMicMediaRecorder();songMicProcessor&&(songMicProcessor.onaudioprocess=null);let samples=mergeFloat32Chunks(songMicPcmChunks),rate=songMicSampleRate,mode='PCM';let st=songMicSignalStats(samples);if(samples.length<rate*.4||st.peak<.00002){const fallback=await decodeSongMicEncoded(encoded);if(fallback?.samples?.length){samples=fallback.samples;rate=fallback.rate;mode='모바일 호환';st=songMicSignalStats(samples)}}if(samples.length<rate*.4)throw new Error('녹음 데이터가 만들어지지 않았습니다. 브라우저 마이크 권한을 다시 확인해 주세요.');if(st.peak<.00002)throw new Error('마이크 입력 신호가 0입니다. 휴대폰 설정 → 앱 → 사용 중인 브라우저 → 권한 → 마이크를 허용한 뒤 다시 시도해 주세요.');const seconds=samples.length/Math.max(1,rate),normalized=normalizeSongMicSamples(samples);samples=normalized.samples;songMicBlob=pcmToWavBlob(samples,rate);const stamp=new Date().toLocaleString('ko-KR',{year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'}).replace(/[. :]/g,'-').replace(/-+/g,'-');songMicName=`마이크로 들은 노래 ${stamp}.wav`;setImportedAudioBlob(songMicBlob,songMicName);const gainText=normalized.gain>1.015?` · 입력 자동 레벨 +${(20*Math.log10(normalized.gain)).toFixed(1)}dB`:'';$('#songMicStatus').textContent=`마이크 녹음 완료 · ${seconds.toFixed(1)}초 · ${(songMicBlob.size/1024/1024).toFixed(1)}MB · ${mode}${gainText} · 방송목록 저장은 선택 · 자동 분석 시작`;setSingleAnalysisProgress(1,'녹음 완료','자동 분석을 시작합니다. 잠시만 기다려 주세요.');$('#songMicLevelFill').style.width='0%';$('#songMicLevelText').textContent='녹음 완료';songMicSourceNode?.disconnect();songMicProcessor?.disconnect();songMicAnalyser?.disconnect();songMicSilentGain?.disconnect();songMicStream?.getTracks().forEach(t=>t.stop());await songMicAudioCtx?.close();songMicAudioCtx=null;songMicStream=null;songMicRecorder=null;$('#startSongMic').disabled=false;await analyzeImportedSong()}catch(e){console.error(e);try{songMicSourceNode?.disconnect();songMicProcessor?.disconnect();songMicAnalyser?.disconnect();songMicSilentGain?.disconnect()}catch{}songMicStream?.getTracks().forEach(t=>t.stop());try{await songMicAudioCtx?.close()}catch{}songMicAudioCtx=null;songMicStream=null;songMicRecorder=null;$('#songMicStatus').textContent=`마이크 녹음을 저장하지 못했습니다: ${e?.message||'알 수 없는 오류'}`;$('#songMicLevelFill').style.width='0%';$('#songMicLevelText').textContent='입력 실패';$('#startSongMic').disabled=false;toast('마이크 입력을 확인해 주세요')}}


// V0.22.71 — original/analyzed A-B listening + broadcast automatic chain.
let broadcastFiles=[],broadcastUrls=[],broadcastIndex=-1,broadcastRunning=false,broadcastTransitioning=false,broadcastPaused=false;
const BROADCAST_FAV_KEY='maru-broadcast-favorites-v1',BROADCAST_RECENT_KEY='maru-broadcast-recent-v1';
const BROADCAST_DB_NAME='maru-broadcast-audio-v1',BROADCAST_DB_STORE='tracks',BROADCAST_ORDER_KEY='maru-broadcast-order-v2',BROADCAST_SETTINGS_KEY='maru-broadcast-settings-v1';
let broadcastTrackIds=[],broadcastDbPromise=null,broadcastSelectedIds=new Set();
let broadcastTrackMedia=new Map(),broadcastMediaTargetIndex=-1,audienceTrackCoverUrl='',audienceTrackVideoUrl='',audienceTrackId='';
let audiencePopupCoverUrl='',audiencePopupVideoUrl='',audienceMediaLoadToken=0,audiencePopupMediaKey='',audiencePopupMediaStamp=0;
function broadcastIsVideoFile(f){return !!f&&(String(f.type||'').startsWith('video/')||/\.(mp4|m4v|mov|webm)$/i.test(String(f.name||'')))}
function broadcastIsPlayableFile(f){return !!f&&(String(f.type||'').startsWith('audio/')||String(f.type||'').startsWith('video/')||/\.(mp3|wav|m4a|aac|ogg|flac|mp4|m4v|mov|webm)$/i.test(String(f.name||'')))}
function broadcastLanguageProfile(file){const s=String(file?.name||'').replace(/\.[^.]+$/,'');const hang=(s.match(/[가-힣]/g)||[]).length,kana=(s.match(/[ぁ-んァ-ヶ]/g)||[]).length,han=(s.match(/[一-龯]/g)||[]).length,latin=(s.match(/[A-Za-z]/g)||[]).length;if(kana>0)return{code:'ja',label:'일본',icon:'🇯🇵'};if(hang>0)return{code:'ko',label:'한국',icon:'🇰🇷'};if(han>0)return{code:'zh',label:'중국',icon:'🇨🇳'};if(latin>0)return{code:'en',label:'영어',icon:'🇺🇸'};return{code:'other',label:'기타',icon:'🌐'}}
function broadcastMoodProfile(file){const s=String(file?.name||'').toLowerCase();const hot=['신나','댄스','dance','remix','party','rock','edm','club','축하','응원','빠른','快','热','舞','摇滚','欢快','快乐','节奏','ダンス','ロック','パーティ','元気','アップテンポ'];const calm=['조용','잔잔','발라드','치유','그리움','이별','사랑','ballad','slow','healing','love','acoustic','piano','calm','soft','慢','安静','抒情','情歌','治愈','温柔','バラード','静か','癒し','恋','ピアノ','スロー'];if(hot.some(k=>s.includes(k)))return{code:'up',label:'신남',icon:'🔥'};if(calm.some(k=>s.includes(k)))return{code:'calm',label:'조용',icon:'🌙'};return{code:'auto',label:'자동',icon:'🎚'}}
function broadcastSmartProfile(file){return{language:broadcastLanguageProfile(file),mood:broadcastMoodProfile(file)}}
function broadcastCurrentPlayer(){const f=broadcastFiles[broadcastIndex];return broadcastIsVideoFile(f)?$('#broadcastVideoPlayer'):$('#broadcastAudio')}
function stopOtherBroadcastPlayer(active=null){for(const el of [$('#broadcastAudio'),$('#broadcastVideoPlayer')]){if(!el||el===active)continue;try{el.pause();el.removeAttribute('src');el.load()}catch{}}}
function revokeTrackAudienceUrls(){try{audienceTrackCoverUrl&&URL.revokeObjectURL(audienceTrackCoverUrl)}catch{}try{audienceTrackVideoUrl&&URL.revokeObjectURL(audienceTrackVideoUrl)}catch{}audienceTrackCoverUrl='';audienceTrackVideoUrl=''}
function broadcastMediaInfo(id){return broadcastTrackMedia.get(id)||{coverName:'',videoName:'',subtitleText:''}}
function setBroadcastMediaInfo(id,record={}){if(!id)return;broadcastTrackMedia.set(id,{coverName:record.coverName||'',videoName:record.videoName||'',coverSize:Number(record.coverBlob?.size||0),videoSize:Number(record.videoBlob?.size||0),sourceVideo:!!(String(record.type||'').startsWith('video/')||/\.(mp4|m4v|mov|webm)$/i.test(record.name||'')),subtitleText:String(record.subtitleText||''),subtitleUpdatedAt:Number(record.subtitleUpdatedAt||0)})}

function openBroadcastDb(){if(broadcastDbPromise)return broadcastDbPromise;if(!('indexedDB'in window))return Promise.reject(new Error('이 브라우저는 방송곡 자동 저장을 지원하지 않습니다'));broadcastDbPromise=new Promise((resolve,reject)=>{const req=indexedDB.open(BROADCAST_DB_NAME,1);req.onupgradeneeded=()=>{const db=req.result;if(!db.objectStoreNames.contains(BROADCAST_DB_STORE))db.createObjectStore(BROADCAST_DB_STORE,{keyPath:'id'})};req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error||new Error('방송곡 저장소를 열지 못했습니다'))});return broadcastDbPromise}
function broadcastFileId(file,name=file?.name||'audio'){const lm=Number(file?.lastModified||0),size=Number(file?.size||0),type=String(file?.type||'audio/wav');let h=2166136261;const s=`${name}|${size}|${lm}|${type}`;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return `trk-${(h>>>0).toString(16)}-${size}`}
function broadcastOrderRead(){try{const v=JSON.parse(localStorage.getItem(BROADCAST_ORDER_KEY)||'[]');return Array.isArray(v)?v:[]}catch{return[]}}
function broadcastOrderWrite(ids){broadcastTrackIds=[...ids];try{localStorage.setItem(BROADCAST_ORDER_KEY,JSON.stringify(broadcastTrackIds))}catch{}}
async function broadcastRequestPersistentStorage(){try{if(!navigator.storage?.persist)return false;const already=await navigator.storage.persisted?.();if(already)return true;return await navigator.storage.persist()}catch{return false}}
async function broadcastDbPut(record){const db=await openBroadcastDb();return new Promise((resolve,reject)=>{const tx=db.transaction(BROADCAST_DB_STORE,'readwrite');tx.objectStore(BROADCAST_DB_STORE).put(record);tx.oncomplete=()=>resolve(true);tx.onerror=()=>reject(tx.error||new Error('방송곡 저장 실패'));tx.onabort=()=>reject(tx.error||new Error('방송곡 저장 중단'))})}
async function broadcastDbGet(id){const db=await openBroadcastDb();return new Promise((resolve,reject)=>{const r=db.transaction(BROADCAST_DB_STORE,'readonly').objectStore(BROADCAST_DB_STORE).get(id);r.onsuccess=()=>resolve(r.result||null);r.onerror=()=>reject(r.error)})}
async function broadcastDbDelete(id){const db=await openBroadcastDb();return new Promise((resolve,reject)=>{const tx=db.transaction(BROADCAST_DB_STORE,'readwrite');tx.objectStore(BROADCAST_DB_STORE).delete(id);tx.oncomplete=()=>resolve(true);tx.onerror=()=>reject(tx.error)})}
async function broadcastDbClear(){const db=await openBroadcastDb();return new Promise((resolve,reject)=>{const tx=db.transaction(BROADCAST_DB_STORE,'readwrite');tx.objectStore(BROADCAST_DB_STORE).clear();tx.oncomplete=()=>resolve(true);tx.onerror=()=>reject(tx.error)})}
function broadcastRecordToFile(r){try{return new File([r.blob],r.name,{type:r.type||r.blob?.type||'audio/wav',lastModified:r.lastModified||r.addedAt||Date.now()})}catch{const b=r.blob;b.name=r.name;b.lastModified=r.lastModified||r.addedAt||Date.now();return b}}
async function updateBroadcastPersistStatus(prefix=''){const el=$('#broadcastPersistStatus');if(!el)return;let storage='';try{const est=await navigator.storage?.estimate?.();if(est?.usage!=null&&est?.quota)storage=` · 저장공간 ${(est.usage/1024/1024).toFixed(0)}MB / ${(est.quota/1024/1024/1024).toFixed(1)}GB`}catch{}el.textContent=`💾 ${prefix||`${broadcastFiles.length}곡 자동 저장됨 · 다음에 앱을 열어도 그대로 복원`}${storage}`}
function refreshBroadcastListUi(message=''){broadcastIndex=-1;const start=$('#broadcastStart'),skip=$('#broadcastSkip'),stopb=$('#broadcastStop'),prev=$('#broadcastPrev'),pause=$('#broadcastPauseBtn');if(start)start.disabled=!broadcastFiles.length;if(skip)skip.disabled=!broadcastFiles.length;if(prev)prev.disabled=!broadcastFiles.length;if(pause)pause.disabled=true;if(stopb)stopb.disabled=true;if($('#broadcastBadge'))$('#broadcastBadge').textContent=broadcastFiles.length?`${broadcastFiles.length}곡`:'대기';if($('#broadcastNow'))$('#broadcastNow').textContent=message||(broadcastFiles.length?`${broadcastFiles.length}곡 준비 · 저장 목록을 자동 복원했습니다.`:'방송할 곡을 선택하세요.');renderBroadcastQueue();updateBroadcastPersistStatus()}

function normalizeBroadcastSubtitleTitle2266(s=''){
 return String(s||'').replace(/\.[^.]+$/,'').toLowerCase().replace(/\([^)]*\)|\[[^\]]*\]/g,' ').replace(/[_\-]+/g,' ').replace(/\s+/g,' ').trim();
}
function broadcastSavedLyrics2266(fileOrName=''){
 try{
  const name=typeof fileOrName==='string'?fileOrName:(fileOrName?.name||'');
  const target=normalizeBroadcastSubtitleTitle2266(name);
  if(!target)return '';
  const songs=typeof readSavedSongs==='function'?readSavedSongs():[];
  let best='',score=0;
  for(const s of Array.isArray(songs)?songs:[]){
   const lyrics=String(s?.lyrics||'').trim(); if(!lyrics)continue;
   const key=normalizeBroadcastSubtitleTitle2266(s?.title||''); if(!key)continue;
   let sc=0;if(key===target)sc=10;else if(target.includes(key)||key.includes(target))sc=6;
   if(sc>score){score=sc;best=lyrics;}
  }
  return score>=6?best:'';
 }catch(e){return ''}
}
function cleanBroadcastSubtitle2266(text=''){
 return String(text||'').replace(/\r/g,'').split('\n').map(x=>x.trim()).filter(x=>x&&!/^\[(verse|chorus|bridge|intro|outro|pre[- ]?chorus|instrumental)/i.test(x)).join('\n');
}
async function saveBroadcastTrackSubtitle2266(index,text,{silent=false}={}){
 index=Number(index);const ids=broadcastCurrentIds(),id=ids[index];if(!id)return false;
 try{
  const r=await broadcastDbGet(id);if(!r)return false;
  r.subtitleText=cleanBroadcastSubtitle2266(text);r.subtitleUpdatedAt=Date.now();
  await broadcastDbPut(r);setBroadcastMediaInfo(id,r);renderBroadcastQueue();
  if(!silent)toast(r.subtitleText?`${broadcastSafeTitle(broadcastFiles[index]?.name)} · 자막 저장 완료`:'곡별 자막을 삭제했습니다');
  return true;
 }catch(e){console.warn('subtitle save',e);if(!silent)toast('곡별 자막 저장에 실패했습니다');return false}
}
async function autoAttachBroadcastSubtitle2266(index,{silent=true}={}){
 index=Number(index);const ids=broadcastCurrentIds(),id=ids[index];if(!id)return false;
 try{
  const r=await broadcastDbGet(id);if(!r)return false;
  if(String(r.subtitleText||'').trim())return true;
  const found=cleanBroadcastSubtitle2266(broadcastSavedLyrics2266(r.name||broadcastFiles[index]?.name||''));
  if(!found)return false;
  r.subtitleText=found;r.subtitleUpdatedAt=Date.now();await broadcastDbPut(r);setBroadcastMediaInfo(id,r);
  if(!silent)toast(`${broadcastSafeTitle(r.name)} · 저장 가사 자동 연결 완료`);
  return true;
 }catch(e){return false}
}
async function openBroadcastSubtitleEditor2266(index){
 index=Number(index);const ids=broadcastCurrentIds(),id=ids[index];if(!id)return;
 const r=await broadcastDbGet(id);if(!r)return;
 let dlg=document.getElementById('broadcastSubtitleEditor2266');
 if(!dlg){
  dlg=document.createElement('div');dlg.id='broadcastSubtitleEditor2266';dlg.className='subtitle-editor-2266';dlg.innerHTML=`<div class="subtitle-editor-card-2266"><h3>💬 곡별 자막</h3><div id="subtitleEditorTitle2266" class="subtitle-editor-title-2266"></div><textarea id="subtitleEditorText2266" rows="10" placeholder="가사를 붙여넣으세요. 방송 때 곡 길이에 맞춰 자동으로 한 줄씩 표시됩니다."></textarea><div class="subtitle-editor-actions-2266"><button type="button" id="subtitleAuto2266">✨ 저장 가사 자동찾기</button><button type="button" id="subtitleSave2266" class="primary">💾 저장</button><button type="button" id="subtitleClear2266">🗑 삭제</button><button type="button" id="subtitleClose2266">닫기</button></div></div>`;document.body.appendChild(dlg);
 }
 dlg.dataset.index=String(index);document.getElementById('subtitleEditorTitle2266').textContent=broadcastSafeTitle(r.name||broadcastFiles[index]?.name||'');document.getElementById('subtitleEditorText2266').value=String(r.subtitleText||'');dlg.classList.add('show');
 document.getElementById('subtitleAuto2266').onclick=async()=>{const i=Number(dlg.dataset.index);const found=cleanBroadcastSubtitle2266(broadcastSavedLyrics2266(broadcastFiles[i]?.name||''));if(!found)return toast('내 곡 저장함에서 같은 제목의 가사를 찾지 못했습니다');document.getElementById('subtitleEditorText2266').value=found;await saveBroadcastTrackSubtitle2266(i,found,{silent:true});toast('저장 가사를 찾아 곡별 자막에 연결했습니다')};
 document.getElementById('subtitleSave2266').onclick=async()=>{const i=Number(dlg.dataset.index);await saveBroadcastTrackSubtitle2266(i,document.getElementById('subtitleEditorText2266').value);dlg.classList.remove('show')};
 document.getElementById('subtitleClear2266').onclick=async()=>{const i=Number(dlg.dataset.index);if(confirm('이 곡의 저장 자막을 삭제할까요?')){await saveBroadcastTrackSubtitle2266(i,'');document.getElementById('subtitleEditorText2266').value=''}};
 document.getElementById('subtitleClose2266').onclick=()=>dlg.classList.remove('show');
}
async function autoAttachAllBroadcastSubtitles2266(){let count=0;for(let i=0;i<broadcastFiles.length;i++)if(await autoAttachBroadcastSubtitle2266(i,{silent:true}))count++;renderBroadcastQueue();return count}

async function persistBroadcastPlaylist(files,{append=false}={}){const list=[...(files||[])].filter(broadcastIsPlayableFile).slice(0,100);if(!list.length)return false;await broadcastRequestPersistentStorage();const current=append?broadcastOrderRead():[],ids=[...current];for(const f of list){const id=broadcastFileId(f,f.name);let old=null;try{old=await broadcastDbGet(id)}catch{}const record={id,name:f.name||'방송곡',type:f.type||'audio/wav',size:f.size||0,lastModified:f.lastModified||Date.now(),addedAt:old?.addedAt||Date.now(),blob:f,coverBlob:old?.coverBlob||null,coverName:old?.coverName||'',videoBlob:old?.videoBlob||null,videoName:old?.videoName||'',mediaUpdatedAt:old?.mediaUpdatedAt||0,subtitleText:old?.subtitleText||cleanBroadcastSubtitle2266(broadcastSavedLyrics2266(f.name||'')),subtitleUpdatedAt:old?.subtitleUpdatedAt||0};await broadcastDbPut(record);setBroadcastMediaInfo(id,record);if(!ids.includes(id))ids.push(id)}const finalIds=ids.slice(-100);broadcastOrderWrite(finalIds);return true}
async function restoreBroadcastPlaylist(){const ids=broadcastOrderRead();broadcastTrackMedia.clear();if(!ids.length){broadcastTrackIds=[];refreshBroadcastListUi('저장된 방송곡이 없습니다. 한 번 선택하면 다음부터 자동 복원됩니다.');renderLearningProfile();return}const files=[],good=[];for(const id of ids){try{const r=await broadcastDbGet(id);if(r?.blob){files.push(broadcastRecordToFile(r));good.push(id);setBroadcastMediaInfo(id,r)}}catch(e){console.warn('restore broadcast track',id,e)}}broadcastFiles=files;broadcastOrderWrite(good);refreshBroadcastListUi(files.length?`${files.length}곡 자동 복원 완료 · 곡별 커버/영상도 함께 복원됨`:'저장된 방송곡을 찾지 못했습니다. 다시 한 번 선택해 주세요.');renderLearningProfile();renderBroadcastQueue();if(files.length){toast(`방송목록 ${files.length}곡을 자동 복원했습니다`);queueBroadcastAutoLearning(files,{delay:700});setTimeout(()=>autoAttachAllBroadcastSubtitles2266(),900)}}
async function addCurrentSourceToBroadcast({silent=false}={}){const src=importedAudioSource();if(!src?.blob)return toast('먼저 노래 파일을 선택하거나 녹음해 주세요');const name=src.name||`방송 녹음 ${new Date().toLocaleString('ko-KR')}.wav`,file=src.blob instanceof File?src.blob:new File([src.blob],name,{type:src.blob.type||'audio/wav',lastModified:Date.now()});try{await persistBroadcastPlaylist([file],{append:true});await restoreBroadcastPlaylist();if(!silent)toast('현재 노래를 방송목록에 저장했습니다. 다음 방송 때도 그대로 남습니다.');return true}catch(e){console.error('save current broadcast',e);toast('방송곡 저장공간이 부족하거나 브라우저 저장이 차단됐습니다.');return false}}
async function clearSavedBroadcastPlaylist(){if(!broadcastFiles.length&&!broadcastOrderRead().length)return toast('비울 저장 방송목록이 없습니다');if(!confirm('저장된 방송곡 목록과 브라우저에 보관된 음원 파일을 모두 지울까요?'))return;broadcastStop(false);try{await broadcastDbClear()}catch(e){console.warn(e)}broadcastFiles=[];broadcastUrls=[];broadcastSelectedIds.clear();broadcastOrderWrite([]);refreshBroadcastListUi('저장 방송목록을 비웠습니다.');renderLearningProfile();toast('저장 방송목록을 모두 비웠습니다')}
function broadcastCurrentIds(){
 if(broadcastTrackIds.length!==broadcastFiles.length)broadcastTrackIds=broadcastFiles.map(f=>broadcastFileId(f,f?.name||'audio'));
 return [...broadcastTrackIds]
}
function pruneBroadcastSelection(){const live=new Set(broadcastCurrentIds());for(const id of [...broadcastSelectedIds])if(!live.has(id))broadcastSelectedIds.delete(id)}
function updateBroadcastSelectionActions(){pruneBroadcastSelection();const n=broadcastSelectedIds.size,count=$('#broadcastSelectedCount'),del=$('#deleteSelectedBroadcast'),clear=$('#clearBroadcastSelection');if(count)count.textContent=String(n);if(del)del.disabled=n<1;if(clear)clear.disabled=n<1}
function broadcastVisibleRows(){const q=($('#broadcastSearch')?.value||'').trim().toLocaleLowerCase(),favOnly=!!$('#broadcastFavOnly')?.checked,sort=$('#broadcastListSort')?.value||'order',favs=readBroadcastFavs(),recent=readBroadcastRecent();let rows=broadcastFiles.map((f,i)=>({f,i,id:broadcastCurrentIds()[i],title:broadcastSafeTitle(f.name)}));if(q)rows=rows.filter(x=>x.title.toLocaleLowerCase().includes(q)||x.f.name.toLocaleLowerCase().includes(q));if(favOnly)rows=rows.filter(x=>favs.has(x.f.name));if(sort==='title')rows.sort((a,b)=>a.title.localeCompare(b.title,'ko'));if(sort==='recent')rows.sort((a,b)=>(recent[b.f.name]||0)-(recent[a.f.name]||0));return rows}
function selectVisibleBroadcastTracks(){const rows=broadcastVisibleRows();if(!rows.length)return toast('현재 화면에 선택할 곡이 없습니다');rows.forEach(x=>broadcastSelectedIds.add(x.id));renderBroadcastQueue();toast(`${rows.length}곡을 선택했습니다`)}
function clearBroadcastTrackSelection(){broadcastSelectedIds.clear();renderBroadcastQueue()}
async function deleteBroadcastIndices(indices,{confirmDelete=true}={}){const uniq=[...new Set((indices||[]).map(Number).filter(i=>Number.isInteger(i)&&i>=0&&i<broadcastFiles.length))].sort((a,b)=>a-b);if(!uniq.length)return toast('삭제할 방송곡을 선택해 주세요');const names=uniq.slice(0,3).map(i=>`“${broadcastSafeTitle(broadcastFiles[i]?.name)}”`).join(', '),more=uniq.length>3?` 외 ${uniq.length-3}곡`:'';if(confirmDelete&&!confirm(`${names}${more}\n방송목록에서 ${uniq.length}곡을 삭제할까요?\n원본 파일과 내 곡 저장함은 삭제하지 않습니다.`))return;if(broadcastRunning)broadcastStop(false);const ids=broadcastCurrentIds(),removeIndex=new Set(uniq),removeIds=uniq.map(i=>ids[i]).filter(Boolean),removedFiles=uniq.map(i=>broadcastFiles[i]).filter(Boolean);for(const id of removeIds){try{await broadcastDbDelete(id)}catch(e){console.warn('broadcast delete',id,e)}}broadcastFiles=broadcastFiles.filter((_,i)=>!removeIndex.has(i));broadcastTrackIds=ids.filter((_,i)=>!removeIndex.has(i));broadcastOrderWrite(broadcastTrackIds);removeIds.forEach(id=>broadcastSelectedIds.delete(id));const favs=readBroadcastFavs(),remainingNames=new Set(broadcastFiles.map(f=>f.name));for(const f of removedFiles)if(!remainingNames.has(f.name))favs.delete(f.name);saveBroadcastFavs(favs);refreshBroadcastListUi(`${uniq.length}곡 삭제 완료 · ${broadcastFiles.length}곡 남음 · 변경 순서 저장됨`);renderLearningProfile();toast(`방송목록에서 ${uniq.length}곡을 삭제했습니다`)}
async function deleteOneBroadcastTrack(i){return deleteBroadcastIndices([i],{confirmDelete:true})}
async function deleteSelectedBroadcastTracks(){const ids=broadcastCurrentIds(),indices=[];ids.forEach((id,i)=>{if(broadcastSelectedIds.has(id))indices.push(i)});return deleteBroadcastIndices(indices,{confirmDelete:true})}
function moveBroadcastTrack(i,delta){i=Number(i);const j=i+Number(delta);if(!Number.isInteger(i)||i<0||i>=broadcastFiles.length||j<0||j>=broadcastFiles.length)return;if(broadcastRunning){broadcastStop(false);toast('순서 변경을 위해 방송을 정지했습니다')}const ids=broadcastCurrentIds();[broadcastFiles[i],broadcastFiles[j]]=[broadcastFiles[j],broadcastFiles[i]];[ids[i],ids[j]]=[ids[j],ids[i]];broadcastTrackIds=ids;broadcastOrderWrite(ids);const sort=$('#broadcastListSort');if(sort&&sort.value!=='order')sort.value='order';renderBroadcastQueue();updateBroadcastPersistStatus(`${broadcastFiles.length}곡 저장됨 · 변경한 방송 순서 자동 저장`);toast(`${j+1}번으로 순서를 변경했습니다`)}

async function chooseBroadcastTrackMedia(index,kind){index=Number(index);if(!Number.isInteger(index)||index<0||index>=broadcastFiles.length)return;broadcastMediaTargetIndex=index;let input=document.querySelector(kind==='video'?'#broadcastTrackVideoPicker':'#broadcastTrackCoverPicker');if(!input){input=document.createElement('input');input.type='file';input.hidden=true;input.id=kind==='video'?'broadcastTrackVideoPicker':'broadcastTrackCoverPicker';input.accept=kind==='video'?'video/*':'image/*';input.onchange=async e=>{const file=e.target.files?.[0],target=broadcastMediaTargetIndex;e.target.value='';if(file)await saveBroadcastTrackMedia(target,kind,file)};document.body.appendChild(input)}input.click()}
async function saveBroadcastTrackMedia(index,kind,file){const ids=broadcastCurrentIds(),id=ids[index];if(!id||!file)return;const max=kind==='video'?350*1024*1024:25*1024*1024;if(file.size>max)return toast(kind==='video'?'동영상은 곡당 350MB 이하를 권장합니다. 더 작은 영상을 선택해 주세요.':'커버 사진은 25MB 이하 파일을 선택해 주세요.');try{await broadcastRequestPersistentStorage();let r=await broadcastDbGet(id);if(!r?.blob)throw new Error('방송곡 저장 레코드를 찾지 못했습니다');if(kind==='video'){r.videoBlob=file;r.videoName=file.name||'video';}else{r.coverBlob=file;r.coverName=file.name||'cover';}r.mediaUpdatedAt=Date.now();await broadcastDbPut(r);setBroadcastMediaInfo(id,r);renderBroadcastQueue();if(index===broadcastIndex){try{revokeAudiencePopupMediaUrls()}catch{};audienceRenderedTrackKey2261='';audienceRenderedDirectVideo2261='';audienceRenderedDirectCover2261='';await applyBroadcastTrackMedia(index);publishAudienceState({title:broadcastSafeTitle(broadcastFiles[index]?.name),status:`재생 중 · ${index+1}/${broadcastFiles.length}`,message:audienceText()})}toast(`${broadcastSafeTitle(broadcastFiles[index]?.name)} · ${kind==='video'?'동영상':'커버 사진'} 연결 완료`)}catch(e){console.error('save track media',e);toast('곡별 사진/영상 저장에 실패했습니다. 브라우저 저장공간을 확인해 주세요.')}}
async function clearBroadcastTrackMedia(index){index=Number(index);const ids=broadcastCurrentIds(),id=ids[index];if(!id)return;if(!confirm(`“${broadcastSafeTitle(broadcastFiles[index]?.name)}”의 커버 사진과 동영상 연결을 모두 지울까요?\n음원은 삭제하지 않습니다.`))return;try{const r=await broadcastDbGet(id);if(!r)return;if(r.coverBlob)delete r.coverBlob;if(r.videoBlob)delete r.videoBlob;r.coverName='';r.videoName='';r.mediaUpdatedAt=Date.now();await broadcastDbPut(r);setBroadcastMediaInfo(id,r);if(index===broadcastIndex){revokeTrackAudienceUrls();publishAudienceState({cover:audienceCoverData||'',video:audienceVideoUrl||''})}renderBroadcastQueue();toast('이 곡의 커버/동영상 연결을 지웠습니다')}catch(e){console.warn(e);toast('미디어 연결을 지우지 못했습니다')}}
async function applyBroadcastTrackMedia(index){
 revokeTrackAudienceUrls();const id=broadcastCurrentIds()[index];audienceTrackId='';if(!id)return {cover:'',video:''};
 try{const r=await broadcastDbGet(id);if(r){setBroadcastMediaInfo(id,r);if(r.videoBlob?.size)audienceTrackVideoUrl=URL.createObjectURL(r.videoBlob);if(r.coverBlob?.size)audienceTrackCoverUrl=URL.createObjectURL(r.coverBlob);if(r.videoBlob?.size||r.coverBlob?.size)audienceTrackId=id;if(!audienceTrackVideoUrl&&!audienceTrackCoverUrl&&r.blob?.size&&(String(r.type||'').startsWith('video/')||/\.(mp4|m4v|mov|webm)$/i.test(r.name||''))){audienceTrackId=id;audienceTrackVideoUrl=URL.createObjectURL(r.blob)}}if(!audienceTrackVideoUrl&&!audienceTrackCoverUrl){const g=await broadcastDbGet('__audience_global_video__');if(g?.videoBlob?.size){audienceTrackId='__audience_global_video__';audienceTrackVideoUrl=URL.createObjectURL(g.videoBlob)}}return {cover:audienceTrackCoverUrl,video:audienceTrackVideoUrl}}catch(e){console.warn('load track media',e);return {cover:'',video:''}}
}
async function previewBroadcastTrackMedia(index){index=Number(index);if(!broadcastFiles[index])return;await applyBroadcastTrackMedia(index);const title=broadcastSafeTitle(broadcastFiles[index].name);publishAudienceState({title,status:'미리보기',message:audienceText()});openAudienceView();toast(`${title} · 곡별 커버/영상 미리보기`)}
function saveBroadcastSettings(){const obj={custom:$('#broadcastCustomMessage')?.value||'',next:$('#broadcastNextTemplate')?.value||'다음 곡은 {title}입니다.',customEnabled:!!$('#broadcastCustomEnabled')?.checked,nextEnabled:!!$('#broadcastNextEnabled')?.checked,loop:!!$('#broadcastLoop')?.checked,audience:$('#broadcastAudienceText')?.value||'',subtitleEnabled:!!$('#broadcastSubtitleEnabled')?.checked,subtitleText:$('#broadcastSubtitleText')?.value||'',subtitlePosition:$('#broadcastSubtitlePosition')?.value||'bottom',subtitleSize:Number($('#broadcastSubtitleSize')?.value||22),autoSubtitle:$('#broadcastAutoSubtitle')?.checked!==false,karaokeEnabled:$('#broadcastKaraokeEnabled')?.checked!==false,pronunciationEnabled:$('#broadcastPronunciationEnabled')?.checked!==false};try{localStorage.setItem(BROADCAST_SETTINGS_KEY,JSON.stringify(obj))}catch{}}
function restoreBroadcastSettings(){try{const x=JSON.parse(localStorage.getItem(BROADCAST_SETTINGS_KEY)||'null');if(!x)return;if($('#broadcastCustomMessage'))$('#broadcastCustomMessage').value=x.custom||'';if($('#broadcastNextTemplate'))$('#broadcastNextTemplate').value=x.next||'다음 곡은 {title}입니다.';if($('#broadcastCustomEnabled')&&typeof x.customEnabled==='boolean')$('#broadcastCustomEnabled').checked=x.customEnabled;if($('#broadcastNextEnabled')&&typeof x.nextEnabled==='boolean')$('#broadcastNextEnabled').checked=x.nextEnabled;if($('#broadcastLoop')&&typeof x.loop==='boolean')$('#broadcastLoop').checked=x.loop;if($('#broadcastAudienceText'))$('#broadcastAudienceText').value=x.audience||'';if($('#broadcastSubtitleEnabled')&&typeof x.subtitleEnabled==='boolean')$('#broadcastSubtitleEnabled').checked=x.subtitleEnabled;if($('#broadcastSubtitleText'))$('#broadcastSubtitleText').value=x.subtitleText||'';if($('#broadcastSubtitlePosition'))$('#broadcastSubtitlePosition').value=x.subtitlePosition||'bottom';if($('#broadcastSubtitleSize'))$('#broadcastSubtitleSize').value=String(Math.max(16,Math.min(32,Number(x.subtitleSize||22))));if($('#broadcastSubtitleSizeValue'))$('#broadcastSubtitleSizeValue').textContent=`${Math.max(16,Math.min(32,Number(x.subtitleSize||22)))}px`;if($('#broadcastAutoSubtitle')&&typeof x.autoSubtitle==='boolean')$('#broadcastAutoSubtitle').checked=x.autoSubtitle;if($('#broadcastKaraokeEnabled')&&typeof x.karaokeEnabled==='boolean')$('#broadcastKaraokeEnabled').checked=x.karaokeEnabled;if($('#broadcastPronunciationEnabled')&&typeof x.pronunciationEnabled==='boolean')$('#broadcastPronunciationEnabled').checked=x.pronunciationEnabled}catch{}}

function readBroadcastFavs(){try{return new Set(JSON.parse(localStorage.getItem(BROADCAST_FAV_KEY)||'[]'))}catch{return new Set()}}
function saveBroadcastFavs(set){try{localStorage.setItem(BROADCAST_FAV_KEY,JSON.stringify([...set]))}catch{}}
function readBroadcastRecent(){try{return JSON.parse(localStorage.getItem(BROADCAST_RECENT_KEY)||'{}')}catch{return {}}}
function markBroadcastRecent(name){const r=readBroadcastRecent();r[name]=Date.now();try{localStorage.setItem(BROADCAST_RECENT_KEY,JSON.stringify(r))}catch{}}
function abSetStatus(text){const e=$('#abCompareStatus');if(e)e.textContent=text}
async function playABOriginal(){if(!importedSongUrl)return toast('먼저 원본 노래를 넣어 주세요');stopImportedPlayback();abSetStatus('A · 원본 재생 중');await playImportedOriginal()}
async function playABAnalyzed(){if(!importedSongAnalysis)return toast('먼저 노래 자동 분석을 해 주세요');stopImportedPlayback();abSetStatus('B · AI 음질개선본 재생 중 · 새 반주 0%');await playAIEnhancedOriginal()}
function stopAB(){stopImportedPlayback();abSetStatus('A/B 정지 · 원하는 쪽을 다시 누르세요.')}
function broadcastSafeTitle(name=''){return String(name).replace(/\.[^.]+$/,'').replace(/[-_]+/g,' ').trim()||'다음 곡'}

// V0.22.71 — separate audience display from operator controls.
const AUDIENCE_STATE_KEY='maru-audience-state-v1';
const AUDIENCE_SUBTITLE_KEY='maru-audience-subtitle-v1';
let audienceChannel=null,audienceSubtitleChannel=null,audienceCoverData='',audienceVideoUrl='';
try{audienceChannel='BroadcastChannel'in window?new BroadcastChannel('maru-audience-v1'):null}catch{}
try{audienceSubtitleChannel='BroadcastChannel'in window?new BroadcastChannel('maru-audience-subtitle-v1'):null}catch{}
function readAudienceState(){try{return JSON.parse(localStorage.getItem(AUDIENCE_STATE_KEY)||'{}')}catch{return {}}}
function readAudienceSubtitlePacket(){try{return JSON.parse(localStorage.getItem(AUDIENCE_SUBTITLE_KEY)||'{}')}catch{return {}}}
function audienceText(){return $('#broadcastAudienceText')?.value?.trim()||''}
function audienceSubtitleState(){return {enabled:!!$('#broadcastSubtitleEnabled')?.checked,text:$('#broadcastSubtitleText')?.value?.trim()||'',position:$('#broadcastSubtitlePosition')?.value||'bottom',size:Math.max(18,Math.min(48,Number($('#broadcastSubtitleSize')?.value||28))),karaoke:$('#broadcastKaraokeEnabled')?.checked!==false,pronunciation:$('#broadcastPronunciationEnabled')?.checked!==false,auto:false,captionAt:0}}
function applyAudienceSubtitle(state={}){const el=$('#audienceSubtitleOverlay');if(!el)return;const s=state.subtitle||{};const text=s.titleFallback?'':String(s.text||'').trim();const enabled=!s.titleFallback&&!!s.enabled&&!!text;el.hidden=!enabled;if(!enabled){el.textContent='';el.dataset.subtitleKey='';return}el.dataset.position=['top','middle','bottom'].includes(s.position)?s.position:'bottom';el.style.fontSize=`${Math.max(16,Math.min(32,Number(s.size||22)))}px`;const key=[text,s.karaoke!==false,s.pronunciation!==false,s.auto?1:0,s.captionAt||0].join('|');if(el.dataset.subtitleKey===key)return;el.dataset.subtitleKey=key;el.innerHTML='';const line=document.createElement('div');line.className='karaoke-line';if(s.karaoke!==false){Array.from(text).forEach((ch,i)=>{const span=document.createElement('span');span.className='karaoke-char';span.dataset.kIndex=String(i);span.textContent=ch;line.appendChild(span)})}else line.textContent=text;el.appendChild(line);if(s.pronunciation!==false){const p=document.createElement('div');p.className='subtitle-pronunciation';p.textContent='';el.appendChild(p);updateSubtitlePronunciation2259(text,p,key)}el.dataset.autoCaption=s.auto?'1':'0';el.dataset.captionAt=String(s.captionAt||Date.now());startKaraokePainter2259()}
function publishAudienceSubtitleOnly(subtitle=audienceSubtitleState()){
 const packet={subtitle:{...subtitle},updatedAt:Date.now()};
 // V0.22.71: subtitle controls travel on their own channel. Never touch media state, src, load() or currentTime.
 try{localStorage.setItem(AUDIENCE_SUBTITLE_KEY,JSON.stringify(packet))}catch{}
 try{audienceSubtitleChannel?.postMessage(packet)}catch{}
 try{if(new URLSearchParams(location.search).get('mode')==='audience')applyAudienceSubtitle(packet)}catch{}
 return packet;
}
function publishSubtitleOverlay(){const subtitle=audienceSubtitleState();publishAudienceSubtitleOnly(subtitle);saveBroadcastSettings()}

/* V0.22.71 FINAL — karaoke progress and Chinese/Korean pronunciation */
let maruPinyin2259=null,maruPinyinLoading2259=null,maruPronounceToken2259=0,maruKaraokeRaf2259=0;
function containsHangul2259(t){return /[가-힣]/.test(t||'')}
function containsHanzi2259(t){return /[\u3400-\u4DBF\u4E00-\u9FFF]/.test(t||'')}
function romanizeHangul2259(text=''){
 const L=['g','kk','n','d','tt','r','m','b','pp','s','ss','','j','jj','ch','k','t','p','h'];
 const V=['a','ae','ya','yae','eo','e','yeo','ye','o','wa','wae','oe','yo','u','wo','we','wi','yu','eu','ui','i'];
 const T=['','k','k','ks','n','nj','nh','t','l','lk','lm','lb','ls','lt','lp','lh','m','p','ps','t','t','ng','t','t','k','t','p','h'];
 return Array.from(text).map(ch=>{const c=ch.charCodeAt(0);if(c<0xAC00||c>0xD7A3)return ch;const n=c-0xAC00,l=Math.floor(n/588),v=Math.floor((n%588)/28),t=n%28;return (L[l]||'')+V[v]+T[t]}).join('').replace(/\s+/g,' ').trim();
}
async function loadPinyin2259(){
 if(maruPinyin2259)return maruPinyin2259;if(maruPinyinLoading2259)return maruPinyinLoading2259;
 maruPinyinLoading2259=(async()=>{try{const m=await import('https://cdn.jsdelivr.net/npm/pinyin-pro@3.26.0/+esm');maruPinyin2259=m.pinyin||m.default?.pinyin||null;return maruPinyin2259}catch(e){console.warn('pinyin module unavailable',e);return null}})();
 return maruPinyinLoading2259;
}
async function updateSubtitlePronunciation2259(text,el,key){
 const token=++maruPronounceToken2259;if(!el)return;
 try{
  let out='';
  if(containsHanzi2259(text)){el.textContent='병음 불러오는 중…';const fn=await loadPinyin2259();if(fn)out=fn(text,{toneType:'symbol',type:'string',nonZh:'consecutive'});else out='';}
  else if(containsHangul2259(text))out=romanizeHangul2259(text);
  if(token!==maruPronounceToken2259||!el.isConnected)return;
  el.textContent=out||'';el.hidden=!out;
 }catch(e){console.warn('pronunciation render',e);if(token===maruPronounceToken2259){el.textContent='';el.hidden=true}}
}
function currentBroadcastMedia2259(){
 try{const v=$('#broadcastVideoPlayer'),a=$('#broadcastAudio');if(v&&v.src&&v.style.display!=='none')return v;if(a&&a.src)return a}catch{}return null
}
function karaokeProgress2259(el){
 if(!el)return 0;
 if(el.dataset.autoCaption==='1'){const at=Number(el.dataset.captionAt||Date.now());return Math.max(0,Math.min(1,(Date.now()-at)/3600))}
 const m=currentBroadcastMedia2259();if(m&&Number.isFinite(m.duration)&&m.duration>0&&Number.isFinite(m.currentTime))return Math.max(0,Math.min(1,m.currentTime/m.duration));
 return 0
}
function paintKaraoke2259(){
 maruKaraokeRaf2259=0;const el=$('#audienceSubtitleOverlay');if(!el||el.hidden)return;
 const chars=[...el.querySelectorAll('.karaoke-char')];if(chars.length){const p=karaokeProgress2259(el),n=Math.floor(p*chars.length),cur=Math.min(chars.length-1,n);chars.forEach((s,i)=>{s.classList.toggle('sung',i<n);s.classList.toggle('current',i===cur&&p<1)})}
 maruKaraokeRaf2259=requestAnimationFrame(paintKaraoke2259)
}
function startKaraokePainter2259(){if(!maruKaraokeRaf2259)maruKaraokeRaf2259=requestAnimationFrame(paintKaraoke2259)}

function revokeAudiencePopupMediaUrls(){
 try{audiencePopupCoverUrl&&URL.revokeObjectURL(audiencePopupCoverUrl)}catch{}
 try{audiencePopupVideoUrl&&URL.revokeObjectURL(audiencePopupVideoUrl)}catch{}
 audiencePopupCoverUrl='';audiencePopupVideoUrl='';audiencePopupMediaKey='';audiencePopupMediaStamp=0;
}
async function audienceLoadTrackMedia(trackId,force=false){
 const requestedKey=String(trackId||'');
 // V0.22.71: keep the same object URLs while subtitle/title/status changes.
 // Recreating blob URLs makes <video> reload and jump back to 0:00.
 if(!force&&requestedKey&&audiencePopupMediaKey===requestedKey&&(audiencePopupVideoUrl||audiencePopupCoverUrl)){
  return {cover:audiencePopupCoverUrl,video:audiencePopupVideoUrl,key:audiencePopupMediaKey,stamp:audiencePopupMediaStamp};
 }
 const token=++audienceMediaLoadToken;
 try{
  let r=requestedKey?await broadcastDbGet(requestedKey):null;
  let resolvedKey=requestedKey;
  // no per-song media -> saved default video
  if(!r?.coverBlob?.size&&!r?.videoBlob?.size){
   const g=await broadcastDbGet('__audience_global_video__');
   if(g?.videoBlob?.size){r=g;resolvedKey='__audience_global_video__';}
  }
  if(token!==audienceMediaLoadToken)return {cover:'',video:'',key:''};
  const stamp=Number(r?.mediaUpdatedAt||r?.updatedAt||0);
  if(!force&&resolvedKey&&audiencePopupMediaKey===resolvedKey&&audiencePopupMediaStamp===stamp&&(audiencePopupVideoUrl||audiencePopupCoverUrl)){
   return {cover:audiencePopupCoverUrl,video:audiencePopupVideoUrl,key:audiencePopupMediaKey,stamp:audiencePopupMediaStamp};
  }
  revokeAudiencePopupMediaUrls();
  audiencePopupMediaKey=resolvedKey||requestedKey;
  audiencePopupMediaStamp=stamp;
  if(r?.coverBlob?.size)audiencePopupCoverUrl=URL.createObjectURL(r.coverBlob);
  if(r?.videoBlob?.size)audiencePopupVideoUrl=URL.createObjectURL(r.videoBlob);
  else if(r?.blob?.size&&(String(r.type||'').startsWith('video/')||/\.(mp4|m4v|mov|webm)$/i.test(r.name||'')))audiencePopupVideoUrl=URL.createObjectURL(r.blob);
  return {cover:audiencePopupCoverUrl,video:audiencePopupVideoUrl,key:audiencePopupMediaKey,stamp:audiencePopupMediaStamp};
 }catch(e){console.warn('audience track media load',e);return {cover:audiencePopupCoverUrl||'',video:audiencePopupVideoUrl||'',key:audiencePopupMediaKey||''};}
}
async function waitVideoReady2244(videoEl,timeout=4500){
 if(!videoEl)return false;
 if(videoEl.readyState>=2)return true;
 return await new Promise(resolve=>{
  let done=false;
  const finish=v=>{if(done)return;done=true;clearTimeout(timer);videoEl.removeEventListener('loadeddata',ok);videoEl.removeEventListener('canplay',ok);videoEl.removeEventListener('error',bad);resolve(v)};
  const ok=()=>finish(true),bad=()=>finish(false),timer=setTimeout(()=>finish(videoEl.readyState>=2),timeout);
  videoEl.addEventListener('loadeddata',ok,{once:true});videoEl.addEventListener('canplay',ok,{once:true});videoEl.addEventListener('error',bad,{once:true});
 });
}
function makeVideoFrameBackdrop2244(videoEl,wrap,imgBg){
 try{
  if(!videoEl||!wrap||videoEl.videoWidth<2||videoEl.videoHeight<2)return;
  const max=480,scale=Math.min(1,max/videoEl.videoWidth),w=Math.max(2,Math.round(videoEl.videoWidth*scale)),h=Math.max(2,Math.round(videoEl.videoHeight*scale));
  const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d',{alpha:false});if(!x)return;x.drawImage(videoEl,0,0,w,h);
  const data=c.toDataURL('image/jpeg',.62);
  if(imgBg){imgBg.src=data;imgBg.style.display='block';}
  wrap.style.backgroundImage=`url(${JSON.stringify(data).slice(1,-1)})`;
  wrap.style.backgroundSize='cover';wrap.style.backgroundPosition='center';
 }catch(e){console.warn('video backdrop frame',e)}
}
async function audienceRenderMedia(state,vid,img,ph,vidBg,imgBg){
 if(!vid||!img||!ph)return;
 const wrap=document.getElementById('audienceCoverWrap');
 let cover=state.cover||'', video=state.video||'';
 if(state.trackId){const own=await audienceLoadTrackMedia(state.trackId);cover=own.cover||cover;video=own.video||video;}
 // V0.22.71: only ONE video decoder. The former blurred background video is never played.
 try{if(vidBg){vidBg.pause();vidBg.removeAttribute('src');vidBg.load();vidBg.style.display='none';}}catch{}
 const clearBackdrop=()=>{if(imgBg){imgBg.removeAttribute('src');imgBg.style.display='none';}if(wrap){wrap.style.backgroundImage='';wrap.style.backgroundColor='#2c1d45';}};
 if(video){
  try{
   const changing=!!(vid.src&&vid.src!==video);
   // V0.22.76: keep the last decoded frame as a static background while the next
   // per-track/default video is loading. This removes the black flash between videos.
   if(changing&&vid.readyState>=2&&vid.videoWidth>1&&vid.videoHeight>1&&wrap){
    try{const c=document.createElement('canvas');const scale=Math.min(1,540/vid.videoWidth);c.width=Math.max(2,Math.round(vid.videoWidth*scale));c.height=Math.max(2,Math.round(vid.videoHeight*scale));const x=c.getContext('2d',{alpha:false});x?.drawImage(vid,0,0,c.width,c.height);const hold=c.toDataURL('image/jpeg',.72);wrap.style.backgroundImage=`url(${JSON.stringify(hold).slice(1,-1)})`;wrap.style.backgroundSize='cover';wrap.style.backgroundPosition='center';}catch{}
   }
   if(vid.src!==video){vid.style.visibility='hidden';vid.pause();vid.removeAttribute('src');vid.src=video;vid.load();}
   vid.muted=true;vid.defaultMuted=true;vid.loop=true;vid.playsInline=true;vid.setAttribute('playsinline','');vid.setAttribute('webkit-playsinline','');vid.style.display='block';img.style.display='none';ph.style.display='none';
   const ready=await waitVideoReady2244(vid,6500);if(!ready)throw new Error('MP4 metadata/data load failed');
   const p=vid.play();if(p&&typeof p.then==='function')await p;
   vid.style.visibility='visible';
   // V0.22.71: no canvas mirror/backdrop loop during broadcast. The video itself fills the popup.
   try{window.maruStopLiveBackdrop2245?.()}catch{};
   if(imgBg){imgBg.removeAttribute('src');imgBg.style.display='none';}
   if(wrap){wrap.style.backgroundImage='';wrap.style.backgroundColor='#000';}
  }catch(e){
   console.warn('audience MP4 play failed',e,vid.error);
   try{vid.style.visibility='visible';vid.pause()}catch{};
   if(cover){img.src=cover;img.style.display='block';ph.style.display='none';img.onload=()=>{try{window.maruDrawImageBackdrop2245?.(img)}catch{}};if(imgBg){imgBg.src=cover;imgBg.style.display='block';}if(wrap){wrap.style.backgroundImage=`url(${cover})`;wrap.style.backgroundSize='cover';wrap.style.backgroundPosition='center';}}
   else{img.style.display='none';ph.style.display='flex';clearBackdrop();}
  }
 }else{
  try{vid.pause()}catch{};vid.removeAttribute('src');try{vid.load()}catch{};vid.style.display='none';
  if(cover){img.src=cover;img.style.display='block';ph.style.display='none';img.onload=()=>{try{window.maruDrawImageBackdrop2245?.(img)}catch{}};if(imgBg){imgBg.src=cover;imgBg.style.display='block';}if(wrap){wrap.style.backgroundImage=`url(${cover})`;wrap.style.backgroundSize='cover';wrap.style.backgroundPosition='center';}}
  else{img.removeAttribute('src');img.style.display='none';ph.style.display='flex';try{window.maruStopLiveBackdrop2245?.()}catch{};clearBackdrop();}
 }
}
let audienceRenderedTrackKey2261='',audienceRenderedDirectVideo2261='',audienceRenderedDirectCover2261='',audienceRenderedMediaIdentity2264='';
function audienceMediaIdentity2264(state={}){
 const trackKey=String(state.trackId||'').trim();
 // When a track/default-media ID exists, that ID is the ONLY media identity.
 // BroadcastChannel may carry a blob: URL while localStorage intentionally stores video:''.
 // Comparing those transient URL fields caused the same default video to reload repeatedly.
 if(trackKey)return `track:${trackKey}`;
 const directVideo=String(state.video||'').trim();
 if(directVideo)return `video:${directVideo}`;
 const directCover=String(state.cover||'').trim();
 if(directCover)return `cover:${directCover}`;
 return 'none';
}
function applyAudienceTitleClass2279(el,text){
 if(!el)return;
 const raw=String(text||'방송 대기').trim();
 const compact=raw.replace(/\s+/g,'');
 el.classList.remove('audience-title-short','audience-title-medium','audience-title-long','audience-title-xlong');
 const n=Array.from(compact).length;
 const cls=n<=9?'audience-title-short':n<=18?'audience-title-medium':n<=28?'audience-title-long':'audience-title-xlong';
 el.classList.add(cls);
 el.dataset.titleLength=String(n);
}
async function applyAudienceState(state={}){
 const title=$('#audienceTitle'),img=$('#audienceCover'),vid=$('#audienceVideo'),ph=$('#audienceCoverPlaceholder'),vidBg=$('#audienceVideoBg'),imgBg=$('#audienceCoverBg');
 if(title){const t=state.title||'방송 대기';title.textContent=t;applyAudienceTitleClass2279(title,t);}
 // V0.22.76: the old state carried message/custom-ment text but never painted it.
 // Render explicit transition announcement first, otherwise the persistent audience text.
 const ann=$('#audienceAnnouncement');
 if(ann){const t=String(state.announcement||state.message||'').trim();ann.textContent=t;ann.hidden=!t;}
 // Subtitle/title/status updates are DOM-only and must never reset media playback.
 // V0.22.71 defensive invariant: applying subtitle cannot modify video src/load/currentTime.
 applyAudienceSubtitle(state);
 const identity=audienceMediaIdentity2264(state);
 const sameMedia=identity===audienceRenderedMediaIdentity2264;
 if(sameMedia&&vid&&(vid.currentSrc||vid.src||img?.src))return;
 audienceRenderedMediaIdentity2264=identity;
 audienceRenderedTrackKey2261=String(state.trackId||'');
 audienceRenderedDirectVideo2261=String(state.video||'');
 audienceRenderedDirectCover2261=String(state.cover||'');
 await audienceRenderMedia(state,vid,img,ph,vidBg,imgBg);
}
function publishAudienceState(partial={}){const prev=readAudienceState();const state={...prev,title:prev.title||'방송 대기',status:prev.status||'MARU MUSIC LIVE',message:audienceText()||prev.message||'',subtitle:prev.subtitle||audienceSubtitleState(),trackId:audienceTrackId||prev.trackId||'',cover:audienceTrackCoverUrl||audienceCoverData||prev.cover||'',video:audienceTrackVideoUrl||audienceVideoUrl||prev.video||'',...partial,updatedAt:Date.now()};try{localStorage.setItem(AUDIENCE_STATE_KEY,JSON.stringify({...state,cover:audienceCoverData||'',video:''}))}catch{}try{audienceChannel?.postMessage(state)}catch{}try{if(new URLSearchParams(location.search).get('mode')==='audience')applyAudienceState(state)}catch{}return state}
window.addEventListener('beforeunload',()=>{revokeAudiencePopupMediaUrls()});
function setupAudienceMode(){const q=new URLSearchParams(location.search),audience=q.get('mode')==='audience',layout=q.get('layout')||'',obs=layout==='obs'||q.get('obs')==='1',dual=layout==='bigo-dual'||q.get('dual')==='1',bigoFloat=layout==='bigo-float'||dual||q.get('share')==='1';if(audience&&obs){try{document.title='MARU_OBS_LIVE'}catch(e){}}document.body.classList.toggle('audience-mode',audience);document.body.classList.toggle('obs-output-mode',audience&&obs);document.body.classList.toggle('bigo-float-mode',audience&&bigoFloat);document.body.classList.toggle('screen-share-mode',audience&&bigoFloat);document.body.classList.toggle('dual-screen-mode',audience&&dual);applyAudienceState(readAudienceState());const sub=readAudienceSubtitlePacket();if(sub?.subtitle)applyAudienceSubtitle(sub);try{audienceChannel&&(audienceChannel.onmessage=e=>applyAudienceState(e.data||{}))}catch{}try{audienceSubtitleChannel&&(audienceSubtitleChannel.onmessage=e=>applyAudienceSubtitle(e.data||{}))}catch{}window.addEventListener('storage',e=>{if(e.key===AUDIENCE_STATE_KEY)applyAudienceState(readAudienceState());else if(e.key===AUDIENCE_SUBTITLE_KEY)applyAudienceSubtitle(readAudienceSubtitlePacket())})}
function openAudienceView(){const installed=window.matchMedia?.('(display-mode: standalone)').matches||window.matchMedia?.('(display-mode: fullscreen)').matches||window.navigator.standalone===true;if(!installed){try{window.installMaruPwa?.()}catch(e){};return toast('주소창 없는 MARU 앱 설치 후 화면공유 모드를 사용해 주세요.');}publishAudienceState({message:audienceText()});const url=new URL(location.href);url.searchParams.set('mode','audience');url.searchParams.set('layout','bigo-float');url.searchParams.set('share','1');location.href=url.toString()}

/* V0.22.85 — clean 16:9 OBS output for BIGO normal LIVE on PC.
   This does not bypass BIGO's mobile capture rules; it provides a clean source window
   that OBS/BIGO Studio can capture while the main MARU window remains available for control. */
let maruObsWindow2284=null;
function openObsView2284(){
  try{publishSubtitleOverlay?.()}catch(e){}
  publishAudienceState({message:audienceText(),status:'OBS 일반 LIVE 출력'});
  const url=new URL(location.href);
  url.searchParams.set('mode','audience');
  url.searchParams.set('layout','obs');
  url.searchParams.set('obs','1');
  url.searchParams.delete('share');url.searchParams.delete('dual');url.searchParams.delete('from');
  const features='popup=yes,width=1280,height=720,resizable=yes,scrollbars=no';
  try{
    if(maruObsWindow2284&&!maruObsWindow2284.closed){maruObsWindow2284.location.href=url.toString();maruObsWindow2284.focus();toast('OBS 방송 화면을 앞으로 가져왔습니다.');return}
    maruObsWindow2284=window.open(url.toString(),'MARU_OBS_LIVE',features);
    if(maruObsWindow2284){maruObsWindow2284.focus();toast('OBS용 16:9 방송 화면을 열었습니다. OBS에서 이 창을 캡처하세요.');return}
  }catch(e){console.warn('OBS popup',e)}
  // Popup blockers are common. Opening in the current tab still gives a usable clean output.
  toast('팝업이 차단되었습니다. 새 탭 허용 후 다시 누르거나 현재 탭에서 OBS 화면을 엽니다.');
  setTimeout(()=>{location.href=url.toString()},250);
}


/* V0.22.85 — PC broadcast + one-mobile management helper.
   OBS capture selection itself is controlled by OBS, so MARU stores the user's intended
   privacy mode and gives the exact safe capture target. */
const PC_CAPTURE_KEY2285='maru-pc-capture-mode-v2285';
function pcCaptureMode2285(){
  try{return localStorage.getItem(PC_CAPTURE_KEY2285)||document.getElementById('pcCaptureMode')?.value||'window'}catch(e){return 'window'}
}
function renderPcCaptureMode2285(mode){
  mode=mode==='display'?'display':'window';
  const sel=document.getElementById('pcCaptureMode');if(sel&&sel.value!==mode)sel.value=mode;
  const box=document.getElementById('pcCaptureStatus');if(!box)return;
  box.dataset.mode=mode;
  const b=box.querySelector('b'),sp=box.querySelector('span');
  if(mode==='display'){
    if(b)b.textContent='전체 화면 공개';
    if(sp)sp.textContent='OBS에서 디스플레이 캡처를 쓰면 그 모니터의 Chrome·Suno·검색·문서 작업까지 시청자에게 보입니다. 개인정보/알림에 주의하세요.';
  }else{
    if(b)b.textContent='안전 모드';
    if(sp)sp.textContent='OBS에서 창 캡처 → MARU_OBS_LIVE만 선택하세요. 다른 Chrome/Suno/웹 작업은 시청자에게 보이지 않습니다.';
  }
}
function setPcCaptureMode2285(mode){
  mode=mode==='display'?'display':'window';
  try{localStorage.setItem(PC_CAPTURE_KEY2285,mode)}catch(e){}
  renderPcCaptureMode2285(mode);
}
function openPcMobileMode2285(){
  const mode=pcCaptureMode2285();
  setPcCaptureMode2285(mode);
  openObsView2284();
  if(mode==='display') toast('PC 전체 화면 공개 모드: OBS에서 디스플레이 캡처를 선택하면 다른 웹 작업도 방송에 보입니다.');
  else toast('안전 모드: OBS에서 창 캡처 → MARU_OBS_LIVE만 선택하세요. 다른 웹 작업은 방송에 안 보입니다.');
}
function setupPcMobileMode2285(){
  const sel=document.getElementById('pcCaptureMode');
  if(sel){
    let mode='window';try{mode=localStorage.getItem(PC_CAPTURE_KEY2285)||'window'}catch(e){}
    renderPcCaptureMode2285(mode);
    sel.addEventListener('change',()=>setPcCaptureMode2285(sel.value));
  }
  const btn=document.getElementById('openPcMobileView');
  if(btn)btn.addEventListener('click',openPcMobileMode2285);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setupPcMobileMode2285,{once:true});else setupPcMobileMode2285();

/* V0.22.89 — one-click local OBS automation + original audio capture.
   The browser cannot launch/control OBS directly, so the included Windows helper exposes a
   loopback-only API on 127.0.0.1:8765. It uses OBS WebSocket v5 to start OBS, select/create
   a MARU scene, connect the MARU_OBS_LIVE window-capture source and start/stop OBS streaming.
   The actual BIGO stream destination must already be configured in OBS/BIGO-supported tools. */
const OBS_HELPER_URL2286='http://127.0.0.1:8765';
const OBS_AUTO_PREF_KEY2286='maru-obs-auto-pref-v2286';
let obsAutoBusy2286=false;
function setObsAutoStatus2286(state,title,text){
  const box=document.getElementById('obsAutoStatus');if(!box)return;
  box.dataset.state=state||'idle';const b=box.querySelector('b'),sp=box.querySelector('span');
  if(b)b.textContent=title||'대기';if(sp)sp.textContent=text||'';
}
function obsAutoPrefs2286(){
  let saved={};try{saved=JSON.parse(localStorage.getItem(OBS_AUTO_PREF_KEY2286)||'{}')||{}}catch(e){}
  const port=Math.max(1,Math.min(65535,Number(document.getElementById('obsWsPort')?.value||saved.port||4455)||4455));
  const scene=String(document.getElementById('obsAutoScene')?.value||saved.scene||'MARU LIVE').trim().slice(0,80)||'MARU LIVE';
  return{port,scene};
}
function saveObsAutoPrefs2286(){
  const p=obsAutoPrefs2286();try{localStorage.setItem(OBS_AUTO_PREF_KEY2286,JSON.stringify(p))}catch(e){}return p;
}
async function obsHelperCall2286(path,payload=null,timeout=16000){
  const ctrl=typeof AbortController==='function'?new AbortController():null;
  let timedOut=false;
  const timer=setTimeout(()=>{
    timedOut=true;
    if(!ctrl)return;
    try{
      const reason=typeof DOMException==='function'
        ?new DOMException('MARU Helper response timeout','TimeoutError')
        :new Error('MARU Helper response timeout');
      ctrl.abort(reason);
    }catch(_){
      try{ctrl.abort()}catch(__){}
    }
  },Math.max(1000,Number(timeout)||16000));
  try{
    const opt={method:payload?'POST':'GET',cache:'no-store'};
    if(ctrl)opt.signal=ctrl.signal;
    if(payload){opt.headers={'Content-Type':'text/plain;charset=UTF-8'};opt.body=JSON.stringify(payload)}
    const r=await fetch(OBS_HELPER_URL2286+path,opt),txt=await r.text();let data={};
    try{data=txt?JSON.parse(txt):{}}catch(e){data={ok:r.ok,message:txt}}
    if(!r.ok||data.ok===false)throw new Error(data.message||data.error||`도우미 응답 ${r.status}`);
    return data;
  }catch(e){
    const msg=String(e?.message||e||'');
    if(timedOut||ctrl?.signal?.aborted){
      throw new Error(`Helper 응답 시간이 초과되었습니다. (${Math.ceil((Number(timeout)||16000)/1000)}초)`);
    }
    if(/signal is aborted|aborted without reason|aborterror/i.test(msg)){
      throw new Error('Helper 연결이 잠시 끊겼습니다. 자동 복구 후 다시 시도해 주세요.');
    }
    throw e;
  }finally{clearTimeout(timer)}
}
async function checkObsHelper2286({quiet=false}={}){
  try{
    const data=await obsHelperCall2286('/api/status',null,3500);
    const detail=data.obsRunning?'OBS 실행 중':'OBS 대기';
    setObsAutoStatus2286('ready','도우미 연결됨',`${detail} · WebSocket ${data.obsConnected?'연결됨':'연결 대기'} · 자동 방송을 시작할 수 있습니다.`);
    if(!quiet)toast('OBS 자동 도우미가 연결되어 있습니다.');return true;
  }catch(e){
    setObsAutoStatus2286('warn','도우미를 먼저 실행하세요','Helper가 자동 복구됩니다. 계속 꺼져 있으면 START-MARU.bat를 한 번 실행해 주세요.');
    if(!quiet)toast('Helper 자동 복구를 기다립니다. 계속 꺼져 있으면 START-MARU.bat를 한 번 실행해 주세요.');return false;
  }
}

/* V0.23.08 — Helper timeout/abort normalization + self-heal wait.
   Windows supervisor restarts Helper when it dies. The web UI waits for that restart
   instead of immediately failing the one-touch button. */
async function maruWaitHelper2306(timeoutMs=22000){
  const end=Date.now()+Math.max(5000,Number(timeoutMs)||22000);
  let attempt=0;
  while(Date.now()<end){
    attempt++;
    try{
      const data=await obsHelperCall2286('/api/status',null,1800);
      const detail=data.obsRunning?'OBS 실행 중':'OBS 대기';
      setObsAutoStatus2286('ready','✅ Helper 연결됨',`${detail} · ${data.helper||'Helper'} · 백그라운드 유지 중`);
      const box=document.getElementById('maruOneTouchStatus2298');
      if(box){
        box.dataset.state='working';
        const b=box.querySelector('b'),s=box.querySelector('span');
        if(b)b.textContent='1/4 Helper 연결 완료';
        if(s)s.textContent='Helper가 정상 동작 중입니다. 다음 단계를 진행합니다…';
      }
      return true;
    }catch(e){
      const remain=Math.max(0,Math.ceil((end-Date.now())/1000));
      setObsAutoStatus2286('working','Helper 자동 유지 확인 중',`Windows Keeper가 Helper를 준비하고 있습니다 · 약 ${remain}초 남음`);
      const box=document.getElementById('maruOneTouchStatus2298');
      if(box){
        box.dataset.state='working';
        const b=box.querySelector('b'),s=box.querySelector('span');
        if(b)b.textContent='1/4 Helper 자동 준비 중';
        if(s)s.textContent=`Windows Keeper가 Helper를 켜는 중입니다 · ${remain}초`;
      }
      await new Promise(r=>setTimeout(r,1000));
    }
  }
  setObsAutoStatus2286('error','Helper가 실행되지 않음','Windows Keeper도 Helper를 시작하지 못했습니다. START-MARU.cmd를 한 번 실행해 주세요.');
  const box=document.getElementById('maruOneTouchStatus2298');
  if(box){
    box.dataset.state='error';
    const b=box.querySelector('b'),s=box.querySelector('span');
    if(b)b.textContent='Helper 시작 실패';
    if(s)s.textContent='START-MARU.cmd를 한 번 실행해 주세요. 이 오류 문구는 자동으로 사라지지 않습니다.';
  }
  return false;
}

async function startObsAutoBroadcast2286(){
  if(obsAutoBusy2286)return;obsAutoBusy2286=true;
  const start=document.getElementById('obsAutoStart');if(start)start.disabled=true;
  try{
    setPcCaptureMode2285('window');
    setObsAutoStatus2286('working','방송 준비 중','MARU 16:9 방송창을 열고 OBS를 자동 연결하고 있습니다…');
    openObsView2284();
    await new Promise(r=>setTimeout(r,900));
    const ok=await maruWaitHelper2306(22000);if(!ok)throw new Error('Helper가 실행되지 않았습니다. START-MARU.cmd를 한 번 실행해 주세요.');
    const pref=saveObsAutoPrefs2286(),password=String(document.getElementById('obsWsPassword')?.value||'');
    const data=await obsHelperCall2286('/api/start',{obsPort:pref.port,obsPassword:password,sceneName:pref.scene,sourceName:'MARU_OBS_LIVE',windowTitle:'MARU_OBS_LIVE',startStream:true},90000);
    const stream=data.streamActive?'송출 시작됨':'OBS 장면 준비됨';
    setObsAutoStatus2286(data.streamActive?'live':'ready',data.streamActive?'🔴 OBS 방송 중':'OBS 준비 완료',`${stream} · 장면 ${data.sceneName||pref.scene} · MARU 방송창만 시청자에게 보입니다.${data.message?' '+data.message:''}`);
    toast(data.streamActive?'OBS 자동 방송을 시작했습니다.':'OBS 장면은 준비됐지만 송출 시작 상태를 확인해 주세요.');
  }catch(e){
    const msg=String(e?.message||e||'알 수 없는 오류');
    setObsAutoStatus2286('error','자동 시작 실패',msg.includes('401')?'OBS WebSocket 비밀번호를 확인해 주세요.':msg);
    toast('OBS 자동 시작 실패 · '+msg.slice(0,90));
  }finally{obsAutoBusy2286=false;if(start)start.disabled=false}
}
async function stopObsAutoBroadcast2286(){
  if(obsAutoBusy2286)return;obsAutoBusy2286=true;const btn=document.getElementById('obsAutoStop');if(btn)btn.disabled=true;
  try{
    setObsAutoStatus2286('working','송출 종료 중','OBS 송출을 안전하게 종료하고 있습니다…');
    const pref=obsAutoPrefs2286(),password=String(document.getElementById('obsWsPassword')?.value||'');const data=await obsHelperCall2286('/api/stop',{stopStream:true,obsPort:pref.port,obsPassword:password},12000);
    setObsAutoStatus2286('ready','OBS 송출 종료',data.message||'OBS는 그대로 열어 두고 송출만 종료했습니다.');toast('OBS 송출을 종료했습니다.');
  }catch(e){setObsAutoStatus2286('error','송출 종료 실패',String(e?.message||e));toast('OBS 도우미 연결을 확인해 주세요.');}
  finally{obsAutoBusy2286=false;if(btn)btn.disabled=false}
}
function setupObsAuto2286(){
  let saved={};try{saved=JSON.parse(localStorage.getItem(OBS_AUTO_PREF_KEY2286)||'{}')||{}}catch(e){}
  const port=document.getElementById('obsWsPort'),scene=document.getElementById('obsAutoScene');
  if(port&&saved.port)port.value=saved.port;if(scene&&saved.scene)scene.value=saved.scene;
  port?.addEventListener('change',saveObsAutoPrefs2286);scene?.addEventListener('change',saveObsAutoPrefs2286);
  document.getElementById('obsAutoStart')?.addEventListener('click',startObsAutoBroadcast2286);
  document.getElementById('obsAutoStop')?.addEventListener('click',stopObsAutoBroadcast2286);
  document.getElementById('obsHelperCheck')?.addEventListener('click',()=>checkObsHelper2286());
  setTimeout(()=>checkObsHelper2286({quiet:true}),1000);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setupObsAuto2286,{once:true});else setupObsAuto2286();


/* V0.22.82 — BIGO + MARU two-screen stable handoff
   A web/PWA page cannot press BIGO's internal LIVE/Game LIVE/Go Live controls.
   This flow does the part Android allows: save MARU broadcast state -> open BIGO ->
   when BIGO hands control back to MARU, switch MARU into the prepared screen-share view. */
const BIGO_FLOW_KEY2280='maru-bigo-two-screen-flow-v2285';
function maruInstalled2280(){return window.matchMedia?.('(display-mode: standalone)').matches||window.matchMedia?.('(display-mode: fullscreen)').matches||window.navigator.standalone===true}
function isAudienceMode2280(){return new URLSearchParams(location.search).get('mode')==='audience'}
function setBigoLaunchStatus2280(state,msg){
  const box=document.getElementById('bigoLaunchStatus');
  if(!box)return;
  box.dataset.state=state||'ready';
  const b=box.querySelector('b'),sp=box.querySelector('span');
  const labels={ready:'준비',opening:'BIGO 여는 중',waiting:'BIGO 방송 시작 대기',returning:'MARU 전환 중',done:'화면공유 준비 완료',error:'확인 필요'};
  if(b)b.textContent=labels[state]||labels.ready;
  if(sp)sp.textContent=msg||'';
}
function writeBigoFlow2280(obj){try{localStorage.setItem(BIGO_FLOW_KEY2280,JSON.stringify(obj||{}))}catch(e){}}
function readBigoFlow2280(){try{return JSON.parse(localStorage.getItem(BIGO_FLOW_KEY2280)||'null')}catch(e){return null}}
function clearBigoFlow2280(){try{localStorage.removeItem(BIGO_FLOW_KEY2280)}catch(e){}}
function enterPreparedAudience2280(){
  if(isAudienceMode2280())return;
  setBigoLaunchStatus2280('returning','BIGO에서 돌아왔습니다. MARU를 2화면용 상단 레이아웃으로 전환합니다.');
  publishAudienceState({message:audienceText()});
  const url=new URL(location.href);
  url.searchParams.set('mode','audience');
  url.searchParams.set('layout','bigo-dual');
  url.searchParams.set('share','1');
  url.searchParams.set('dual','1');
  url.searchParams.set('from','bigo');
  clearBigoFlow2280();
  // Reload only at the final handoff so audience CSS/PWA bootstrap starts in a clean state.
  location.href=url.toString();
}
function launchBigoAndroid2280(){
  const isAndroid=/Android/i.test(navigator.userAgent||'');
  if(!isAndroid){setBigoLaunchStatus2280('error','Android에서 BIGO 앱을 열 수 있습니다.');toast('Android에서 BIGO 앱 열기를 사용해 주세요.');return false}
  const fallback='https://www.bigo.tv/';
  // BIGO Android package is sg.bigo.live. Explicit package launch avoids opening another app.
  const intent='intent://www.bigo.tv/#Intent;scheme=https;package=sg.bigo.live;S.browser_fallback_url='+encodeURIComponent(fallback)+';end';
  try{
    const a=document.createElement('a');a.href=intent;a.style.display='none';document.body.appendChild(a);a.click();setTimeout(()=>a.remove(),1200);
    return true;
  }catch(e){
    try{location.href=fallback;return true}catch(_){}
  }
  return false;
}
function startBigoScreenShareFlow2280(){
  if(!maruInstalled2280()){try{window.installMaruPwa?.()}catch(e){};setBigoLaunchStatus2280('error','먼저 MARU를 홈 화면 앱으로 설치해 주세요.');return toast('먼저 MARU 앱을 설치한 뒤 다시 눌러 주세요.');}
  if(isAudienceMode2280())return toast('이미 BIGO 화면공유용 MARU 미니 화면입니다.');
  try{publishSubtitleOverlay?.()}catch(e){}
  publishAudienceState({message:audienceText(),status:'BIGO 화면공유 준비'});
  const now=Date.now();
  writeBigoFlow2280({startedAt:now,armedAt:now,stage:'waiting-bigo',expiresAt:now+30*60*1000});
  setBigoLaunchStatus2280('opening','현재 곡 상태를 저장했습니다. BIGO 앱을 엽니다.');
  toast('BIGO가 열립니다 · 게임 LIVE 시작 후 MARU로 돌아오세요.');
  setTimeout(()=>{
    setBigoLaunchStatus2280('waiting','BIGO 게임 LIVE 시작 후 MARU로 돌아오면 2화면용 상단 화면이 자동 준비됩니다.');
    launchBigoAndroid2280();
  },260);
}
function maybeResumeBigoFlow2280(){
  if(isAudienceMode2280())return;
  const f=readBigoFlow2280();if(!f)return;
  const now=Date.now();
  if(!f.startedAt||now>(f.expiresAt||f.startedAt+30*60*1000)){clearBigoFlow2280();setBigoLaunchStatus2280('ready','이전 BIGO 준비가 만료되었습니다. 다시 눌러 주세요.');return;}
  // Do not immediately consume the same click/focus event. BIGO must have had time to open.
  if(now-f.startedAt<3500)return;
  if(document.visibilityState&&document.visibilityState!=='visible')return;
  setBigoLaunchStatus2280('returning','BIGO 방송 시작 뒤 MARU로 돌아온 것을 감지했습니다.');
  setTimeout(enterPreparedAudience2280,320);
}
(function setupBigoOneTapFlow2280(){
  const bind=()=>{
    const btn=document.getElementById('openAudienceView');
    if(btn){btn.textContent='📱 BIGO + MARU 2화면';btn.title='MARU를 위, BIGO를 아래에 두는 2화면 방송을 준비합니다';}
    const f=readBigoFlow2280();
    if(f&&!isAudienceMode2280())setBigoLaunchStatus2280('waiting','BIGO 게임 LIVE 시작 후 MARU로 돌아오면 2화면용으로 자동 전환됩니다.');
    if(isAudienceMode2280()&&new URLSearchParams(location.search).get('from')==='bigo')setTimeout(()=>toast('MARU 2화면 상단 준비 완료 · 분할화면에서 BIGO를 아래에 선택'),500);
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind,{once:true});else bind();
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')setTimeout(maybeResumeBigoFlow2280,450)});
  window.addEventListener('focus',()=>setTimeout(maybeResumeBigoFlow2280,500));
  window.addEventListener('pageshow',()=>setTimeout(maybeResumeBigoFlow2280,650));
  const refreshDualViewport=()=>{try{if(isAudienceMode2280()&&new URLSearchParams(location.search).get('dual')==='1'){document.documentElement.style.setProperty('--maru-dual-vh',(window.innerHeight*.01)+'px')}}catch(e){}};
  window.addEventListener('resize',refreshDualViewport,{passive:true});
  window.addEventListener('orientationchange',()=>setTimeout(refreshDualViewport,180),{passive:true});
  refreshDualViewport();
})();

function loadAudienceCover(file){if(!file)return;const r=new FileReader();r.onload=()=>{audienceCoverData=String(r.result||'');audienceTrackId='';publishAudienceState({trackId:'',cover:audienceCoverData,video:''});toast('시청자 화면 커버를 적용했습니다')};r.readAsDataURL(file)}
async function loadAudienceVideo(file){if(!file)return;const probe=document.createElement('video');const mime=file.type||'video/mp4';const support=probe.canPlayType(mime);if(!support&&/\.mp4$/i.test(file.name||''))toast('MP4 파일이지만 영상 코덱이 이 휴대폰 브라우저에서 지원되지 않을 수 있습니다. H.264 MP4를 권장합니다.');try{let r=await broadcastDbGet('__audience_global_video__')||{id:'__audience_global_video__',name:'MARU viewer video',blob:new Blob([]),type:'application/x-maru-media'};r.videoBlob=file;r.videoName=file.name||'video';r.mediaUpdatedAt=Date.now();await broadcastDbPut(r)}catch(e){console.warn('global audience video store',e)}if(audienceVideoUrl){try{URL.revokeObjectURL(audienceVideoUrl)}catch{}}audienceVideoUrl=URL.createObjectURL(file);audienceTrackId='__audience_global_video__';try{revokeAudiencePopupMediaUrls()}catch{};audienceRenderedTrackKey2261='';audienceRenderedDirectVideo2261='';audienceRenderedDirectCover2261='';audienceRenderedMediaIdentity2264='';try{localStorage.setItem('maru-default-video-enabled-v1','1')}catch{};publishAudienceState({trackId:audienceTrackId,video:audienceVideoUrl,cover:''});toast('기본 동영상을 저장했습니다')}
function updateBroadcastDock(){const paused=broadcastRunning&&broadcastPaused;const start=$('#dockBroadcastStart'),pause=$('#dockBroadcastPause'),prev=$('#dockBroadcastPrev'),next=$('#dockBroadcastNext'),end=$('#dockBroadcastEnd'),mainStart=$('#broadcastStart'),mainPause=$('#broadcastPauseBtn'),mainPrev=$('#broadcastPrev');if(start){start.disabled=false;start.textContent=paused?'▶ 원곡 계속':(broadcastRunning?'● 방송 중':'🚀 원터치 방송')}if(pause){pause.disabled=false;pause.textContent=paused?'⏸ 대기중':'⏸ 대기'}if(prev)prev.disabled=false;if(next)next.disabled=false;if(end)end.disabled=false;if(mainStart){mainStart.disabled=!broadcastFiles.length;mainStart.textContent=paused?'▶ 원곡 계속':'▶ 원곡 방송 시작'}if(mainPause)mainPause.disabled=!broadcastRunning;if(mainPrev)mainPrev.disabled=!broadcastFiles.length}
function renderBroadcastQueue(){const box=$('#broadcastQueue');if(!box){updateBroadcastSelectionActions();updateBroadcastDock();return}const rows=broadcastVisibleRows(),favs=readBroadcastFavs(),ids=broadcastCurrentIds();box.innerHTML=rows.length?rows.map(x=>{const selected=broadcastSelectedIds.has(x.id),canUp=x.i>0,canDown=x.i<broadcastFiles.length-1,media=broadcastMediaInfo(x.id),hasCover=!!media.coverName,hasVideo=!!media.videoName||broadcastIsVideoFile(x.f),pf=broadcastSmartProfile(x.f);return `<div class="qrow ${broadcastRunning&&x.i===broadcastIndex?'playing':''} ${selected?'selected':''}"><button class="qplay" type="button" data-broadcast-play="${x.i}">▶</button><input class="qselect" type="checkbox" data-broadcast-select="${x.i}" ${selected?'checked':''}><span class="qnum">${x.i+1}</span><span class="qtitle" title="${esc(x.title)}">${esc(x.title)}</span><span class="qprofile"><em>${pf.mood.icon} ${pf.mood.label}</em><em>${pf.language.icon} ${pf.language.label}</em><em>${broadcastIsVideoFile(x.f)?'🎬 MP4':'🎵 음원'}</em></span><span class="qmedia"><button class="${hasCover?'active':''}" type="button" data-broadcast-cover="${x.i}"><span>🖼</span><b>커버</b></button><button class="${hasVideo?'active':''}" type="button" data-broadcast-video="${x.i}"><span>🎬</span><b>영상</b></button><button type="button" data-broadcast-media-preview="${x.i}"><span>👁</span><b>보기</b></button>${hasCover||media.videoName?`<button class="media-clear" type="button" data-broadcast-media-clear="${x.i}"><span>×</span><b>해제</b></button>`:''}</span><span class="qmove"><button type="button" data-broadcast-up="${x.i}" ${canUp?'':'disabled'}>▲</button><button type="button" data-broadcast-down="${x.i}" ${canDown?'':'disabled'}>▼</button></span><button class="qfav ${favs.has(x.f.name)?'active':''}" type="button" data-broadcast-fav="${x.i}">${favs.has(x.f.name)?'★':'☆'}</button><button class="qdel" type="button" data-broadcast-delete="${x.i}">🗑</button></div>`}).join(''):`<div class="analysis-box">조건에 맞는 노래가 없습니다.</div>`;box.querySelectorAll('[data-broadcast-play]').forEach(b=>b.onclick=()=>broadcastJumpTo(Number(b.dataset.broadcastPlay)));box.querySelectorAll('[data-broadcast-select]').forEach(b=>b.onchange=()=>{const i=Number(b.dataset.broadcastSelect),id=ids[i];if(!id)return;if(b.checked)broadcastSelectedIds.add(id);else broadcastSelectedIds.delete(id);renderBroadcastQueue()});box.querySelectorAll('[data-broadcast-cover]').forEach(b=>b.onclick=()=>chooseBroadcastTrackMedia(Number(b.dataset.broadcastCover),'cover'));box.querySelectorAll('[data-broadcast-video]').forEach(b=>b.onclick=()=>chooseBroadcastTrackMedia(Number(b.dataset.broadcastVideo),'video'));box.querySelectorAll('[data-broadcast-media-preview]').forEach(b=>b.onclick=()=>previewBroadcastTrackMedia(Number(b.dataset.broadcastMediaPreview)));box.querySelectorAll('[data-broadcast-media-clear]').forEach(b=>b.onclick=()=>clearBroadcastTrackMedia(Number(b.dataset.broadcastMediaClear)));box.querySelectorAll('[data-broadcast-up]').forEach(b=>b.onclick=()=>moveBroadcastTrack(Number(b.dataset.broadcastUp),-1));box.querySelectorAll('[data-broadcast-down]').forEach(b=>b.onclick=()=>moveBroadcastTrack(Number(b.dataset.broadcastDown),1));box.querySelectorAll('[data-broadcast-delete]').forEach(b=>b.onclick=()=>deleteOneBroadcastTrack(Number(b.dataset.broadcastDelete)));box.querySelectorAll('[data-broadcast-fav]').forEach(b=>b.onclick=()=>{const i=Number(b.dataset.broadcastFav),f=broadcastFiles[i],set=readBroadcastFavs();if(set.has(f.name))set.delete(f.name);else set.add(f.name);saveBroadcastFavs(set);renderBroadcastQueue()});updateBroadcastSelectionActions();updateBroadcastDock()}
async function selectBroadcastFiles(files){const incoming=[...(files||[])].filter(broadcastIsPlayableFile).slice(0,100);if(!incoming.length)return toast('MP3·WAV·M4A 또는 MP4·MOV 파일을 선택해 주세요');if(broadcastRunning)broadcastStop(false);const known=new Set(broadcastCurrentIds()),fresh=[];for(const f of incoming){const id=broadcastFileId(f,f.name);if(!known.has(id)){known.add(id);fresh.push(f)}}if(!fresh.length)return toast('이미 방송목록에 있는 파일입니다');try{await persistBroadcastPlaylist(fresh,{append:true});await restoreBroadcastPlaylist();await updateBroadcastPersistStatus(`${broadcastFiles.length}개 자동 저장 완료 · MP3/MP4 통합 목록`);queueBroadcastAutoLearning(fresh,{delay:400});toast(`${fresh.length}개를 같은 방송목록에 추가했습니다`)}catch(e){console.error('persist broadcast playlist',e);toast('방송목록 저장에 실패했습니다. 브라우저 저장공간을 확인해 주세요.')}}
function applySmartBroadcastOrder(){if(broadcastFiles.length<2)return toast('자동편성하려면 방송곡이 2개 이상 필요합니다');if(broadcastRunning)broadcastStop(false);const ids=broadcastCurrentIds(),items=broadcastFiles.map((f,i)=>({f,id:ids[i],i,p:broadcastSmartProfile(f)})),remaining=[...items],out=[];const langOrder=['ko','zh','en','ja'].filter(code=>items.some(x=>x.p.language.code===code));if(items.some(x=>x.p.language.code==='other'))langOrder.push('other');let mood='up',li=0,lastLang='';while(remaining.length){const desiredLang=langOrder.length?langOrder[li%langOrder.length]:'other';let bi=0,bs=-1e9;for(let i=0;i<remaining.length;i++){const x=remaining[i];let s=x.p.mood.code===mood?12:x.p.mood.code==='auto'?6:-4;if(x.p.language.code===desiredLang)s+=8;if(lastLang&&x.p.language.code===lastLang&&remaining.some(y=>y.p.language.code!==lastLang))s-=7;s-=x.i/10000;if(s>bs){bs=s;bi=i}}const x=remaining.splice(bi,1)[0];out.push(x);lastLang=x.p.language.code;mood=mood==='up'?'calm':'up';li++}broadcastFiles=out.map(x=>x.f);broadcastTrackIds=out.map(x=>x.id);broadcastOrderWrite(broadcastTrackIds);const sort=$('#broadcastListSort');if(sort)sort.value='order';renderBroadcastQueue();updateBroadcastPersistStatus(`${broadcastFiles.length}개 저장됨 · 분위기·언어 자동편성 순서 저장`);const counts={up:0,calm:0,auto:0,ko:0,zh:0,en:0,ja:0,other:0};out.forEach(x=>{counts[x.p.mood.code]=(counts[x.p.mood.code]||0)+1;counts[x.p.language.code]=(counts[x.p.language.code]||0)+1});const st=$('#broadcastSmartStatus');if(st)st.textContent=`🎚 자동편성 완료 · 🔥신남 ${counts.up} · 🌙조용 ${counts.calm} · 자동 ${counts.auto} · 🇰🇷${counts.ko} 🇨🇳${counts.zh} 🇺🇸${counts.en} 🇯🇵${counts.ja}`;toast('방송 분위기·언어 자동편성을 완료했습니다')}
let broadcastVoiceCtx=null,broadcastVoiceStream=null,broadcastVoiceNodes=null,broadcastVoiceVadTimer=0,broadcastVoiceSpeech=false,broadcastVoiceLastSpeechAt=0;
function setBroadcastVoiceStatus(t){const e=$('#broadcastVoiceStatus');if(e)e.textContent=t}
function broadcastVoiceAutoEnabled(){return $('#broadcastVoiceAuto')?.checked!==false}
function updateBroadcastVoiceTone(){const depth=Number($('#broadcastVoiceDepth')?.value||65)/100,vol=Number($('#broadcastVoiceVolume')?.value||85)/100;if($('#broadcastVoiceDepthValue'))$('#broadcastVoiceDepthValue').textContent=`${Math.round(depth*100)}%`;if($('#broadcastVoiceVolumeValue'))$('#broadcastVoiceVolumeValue').textContent=`${Math.round(vol*100)}%`;if(!broadcastVoiceNodes)return;const{low,body,presence,air,outGain}=broadcastVoiceNodes;low.gain.value=2+depth*5;body.gain.value=.8+depth*2.2;presence.gain.value=-1.2-depth*2.8;air.gain.value=-.5-depth*3;outGain.gain.value=vol}
function setBroadcastVoiceSpeechActive(active,db=-120){if(!broadcastVoiceNodes)return;broadcastVoiceSpeech=!!active;const{wetGain,dryGain}=broadcastVoiceNodes,auto=broadcastVoiceAutoEnabled();const wet=auto?(active?1:0):1,dry=auto?(active?0:1):0;try{wetGain.gain.setTargetAtTime(wet,broadcastVoiceCtx.currentTime,.025);dryGain.gain.setTargetAtTime(dry,broadcastVoiceCtx.currentTime,.025)}catch{wetGain.gain.value=wet;dryGain.gain.value=dry}const box=$('.broadcast-voice-box');box?.classList.toggle('voice-active',auto&&active);box?.classList.toggle('voice-listening',auto&&!active);if(auto)setBroadcastVoiceStatus(active?`🟢 말소리 감지 · 중저음 자동 적용 중 · ${db.toFixed(0)} dB`:`🎙 음성 감지 중 · 말하면 자동 중저음 적용 · ${db.toFixed(0)} dB`);else setBroadcastVoiceStatus('🟢 수동 고정 · 중저음 계속 적용 중')}
function stopBroadcastVoiceVad(){if(broadcastVoiceVadTimer)cancelAnimationFrame(broadcastVoiceVadTimer);broadcastVoiceVadTimer=0;broadcastVoiceSpeech=false;broadcastVoiceLastSpeechAt=0}
function startBroadcastVoiceVad(){stopBroadcastVoiceVad();const analyser=broadcastVoiceNodes?.analyser;if(!analyser)return;const data=new Float32Array(analyser.fftSize);let noiseFloorDb=-58;const tick=()=>{if(!broadcastVoiceStream||!broadcastVoiceNodes)return;analyser.getFloatTimeDomainData(data);let s=0,peak=0,zc=0,prev=data[0]||0;for(let i=0;i<data.length;i++){const v=data[i]||0;s+=v*v;peak=Math.max(peak,Math.abs(v));if((v>=0)!=(prev>=0))zc++;prev=v}const rms=Math.sqrt(s/Math.max(1,data.length)),db=20*Math.log10(Math.max(1e-7,rms)),zcr=zc/Math.max(1,data.length);if(db<noiseFloorDb+5)noiseFloorDb=noiseFloorDb*.985+db*.015;const threshold=Math.max(-48,noiseFloorDb+12),speechLike=db>threshold&&peak>.018&&zcr>.008&&zcr<.32;const now=performance.now();if(speechLike)broadcastVoiceLastSpeechAt=now;const active=(now-broadcastVoiceLastSpeechAt)<950;if(active!==broadcastVoiceSpeech)setBroadcastVoiceSpeechActive(active,db);else if(broadcastVoiceAutoEnabled()){const e=$('#broadcastVoiceStatus');if(e&&(!active||Math.random()<.08))e.textContent=active?`🟢 말소리 감지 · 중저음 자동 적용 중 · ${db.toFixed(0)} dB`:`🎙 음성 감지 중 · 말하면 자동 중저음 적용 · ${db.toFixed(0)} dB`;}broadcastVoiceVadTimer=requestAnimationFrame(tick)};broadcastVoiceVadTimer=requestAnimationFrame(tick)}
async function startBroadcastVoiceTone(){if(broadcastVoiceStream)return toast('자동 중저음 방송 마이크가 이미 켜져 있습니다');try{broadcastVoiceStream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true,autoGainControl:true,channelCount:1}});broadcastVoiceCtx=new (window.AudioContext||window.webkitAudioContext)();await broadcastVoiceCtx.resume();const src=broadcastVoiceCtx.createMediaStreamSource(broadcastVoiceStream),analyser=broadcastVoiceCtx.createAnalyser(),hp=broadcastVoiceCtx.createBiquadFilter(),low=broadcastVoiceCtx.createBiquadFilter(),body=broadcastVoiceCtx.createBiquadFilter(),presence=broadcastVoiceCtx.createBiquadFilter(),air=broadcastVoiceCtx.createBiquadFilter(),comp=broadcastVoiceCtx.createDynamicsCompressor(),wetGain=broadcastVoiceCtx.createGain(),dryGain=broadcastVoiceCtx.createGain(),outGain=broadcastVoiceCtx.createGain(),dest=broadcastVoiceCtx.createMediaStreamDestination();analyser.fftSize=1024;analyser.smoothingTimeConstant=.55;hp.type='highpass';hp.frequency.value=70;low.type='lowshelf';low.frequency.value=155;body.type='peaking';body.frequency.value=260;body.Q.value=.8;presence.type='peaking';presence.frequency.value=3400;presence.Q.value=.8;air.type='highshelf';air.frequency.value=7600;comp.threshold.value=-23;comp.ratio.value=3.4;comp.attack.value=.008;comp.release.value=.18;src.connect(analyser);src.connect(hp).connect(low).connect(body).connect(presence).connect(air).connect(comp).connect(wetGain);src.connect(dryGain);wetGain.connect(outGain);dryGain.connect(outGain);outGain.connect(broadcastVoiceCtx.destination);outGain.connect(dest);broadcastVoiceNodes={src,analyser,hp,low,body,presence,air,comp,wetGain,dryGain,outGain,dest};window.maruProcessedMicStream=dest.stream;updateBroadcastVoiceTone();broadcastVoiceLastSpeechAt=0;setBroadcastVoiceSpeechActive(false,-120);startBroadcastVoiceVad();$('#broadcastVoiceStart').disabled=true;$('#broadcastVoiceStop').disabled=false;toast('자동 중저음 방송 마이크를 시작했습니다. 말하면 자동 적용됩니다')}catch(e){broadcastVoiceStream=null;setBroadcastVoiceStatus(`마이크 시작 실패 · ${e?.message||'권한 확인'}`);toast('마이크 권한을 확인해 주세요')}}
async function stopBroadcastVoiceTone(){stopBroadcastVoiceVad();try{broadcastVoiceStream?.getTracks().forEach(t=>t.stop())}catch{};try{await broadcastVoiceCtx?.close()}catch{};broadcastVoiceStream=null;broadcastVoiceCtx=null;broadcastVoiceNodes=null;window.maruProcessedMicStream=null;$('#broadcastVoiceStart').disabled=false;$('#broadcastVoiceStop').disabled=true;const box=$('.broadcast-voice-box');box?.classList.remove('voice-active','voice-listening');setBroadcastVoiceStatus('대기 · 자동 중저음 방송 마이크 OFF')}
function speakBroadcast(text,lang='ko-KR'){text=String(text||'').trim();if(!text||!('speechSynthesis'in window))return Promise.resolve();return new Promise(resolve=>{try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang=lang||'ko-KR';u.rate=.96;u.pitch=1;u.volume=1;let done=false;const finish=()=>{if(done)return;done=true;resolve()};u.onend=finish;u.onerror=finish;speechSynthesis.speak(u);setTimeout(finish,Math.max(3500,text.length*170))}catch{resolve()}})}

const COVER_INTRO_ROTATE_KEY='maru-cover-intro-rotate-v1';
const COVER_INTRO_MESSAGES=[
 {lang:'en-US',label:'English',text:'The cover model is Jinxi, a BIGO LIVE broadcaster, who currently streams together with her parrot. She previously worked as a singer under the name Lee Xingyu.'},
 {lang:'zh-CN',label:'中文',text:'封面模特是BIGO LIVE主播锦汐，目前和她的鹦鹉一起直播。她过去曾以李星瑜的名字从事歌手活动。'},
 {lang:'ko-KR',label:'한국어',text:'현재 BIGO LIVE에서 앵무새와 함께 방송하고 있는 비고라이브 방송인 진시이며, 과거 이성유(李星瑜)라는 이름으로 가수 활동을 하셨던 분이 표지 모델입니다.'}
];
function nextCoverIntroMessage(){let n=0;try{n=Number(localStorage.getItem(COVER_INTRO_ROTATE_KEY)||0)||0}catch{};const m=COVER_INTRO_MESSAGES[n%COVER_INTRO_MESSAGES.length];try{localStorage.setItem(COVER_INTRO_ROTATE_KEY,String((n+1)%COVER_INTRO_MESSAGES.length))}catch{};return m}
function showAudienceAnnouncement(text){const t=String(text||'').trim(),el=$('#audienceAnnouncement');if(el){el.textContent=t;el.hidden=!t}try{publishAudienceState({announcement:t})}catch{}}
async function playRotatingCoverIntro(){const m=nextCoverIntroMessage();showAudienceAnnouncement(m.text);$('#broadcastNow').textContent=`표지 모델 소개 · ${m.label}`;publishAudienceState({status:`표지 모델 소개 · ${m.label}`});await speakBroadcast(m.text,m.lang);showAudienceAnnouncement('')}

/* V0.22.71 automatic subtitle fallback (browser speech recognition) */
let broadcastAutoCaptionRecognition=null,broadcastAutoCaptionActive=false,broadcastAutoCaptionRestartTimer=0,broadcastAutoCaptionText='',broadcastAutoCaptionManualText='';
function broadcastAutoCaptionEnabled(){return !!$('#broadcastSubtitleEnabled')?.checked&&$('#broadcastAutoSubtitle')?.checked!==false&&!($('#broadcastSubtitleText')?.value||'').trim()}
function broadcastAutoCaptionLang(file=broadcastFiles[broadcastIndex]){const code=broadcastLanguageProfile(file).code;return code==='ko'?'ko-KR':code==='zh'?'zh-CN':code==='ja'?'ja-JP':'en-US'}
function setBroadcastAutoCaptionStatus(text,cls=''){const el=$('#broadcastAutoSubtitleStatus');if(!el)return;el.textContent=text;el.classList.toggle('live',cls==='live');el.classList.toggle('warn',cls==='warn')}
function publishAutoCaptionText(text){broadcastAutoCaptionText=String(text||'').trim();clearTimeout(autoCaptionFallbackTimer2260);const enabledEl=$('#broadcastSubtitleEnabled');if(enabledEl&&broadcastAutoCaptionText)enabledEl.checked=true;const base=audienceSubtitleState();publishAudienceSubtitleOnly({ ...base,enabled:!!broadcastAutoCaptionText,text:broadcastAutoCaptionText,auto:true,captionAt:Date.now(),titleFallback:false})}
function stopBroadcastAutoCaption({clear=false}={}){broadcastAutoCaptionActive=false;clearTimeout(broadcastAutoCaptionRestartTimer);try{broadcastAutoCaptionRecognition&&(broadcastAutoCaptionRecognition.onend=null,broadcastAutoCaptionRecognition.stop())}catch{}broadcastAutoCaptionRecognition=null;if(clear){broadcastAutoCaptionText='';if(!($('#broadcastSubtitleText')?.value||'').trim())publishAutoCaptionText('')}setBroadcastAutoCaptionStatus('🎤 자동 자막 대기')}
function startBroadcastAutoCaption(){
 // V0.22.73 safety: never start browser SpeechRecognition while music is playing.
 // The full saved-lyric implementation is installed near the end of this file.
 stopBroadcastAutoCaption({clear:false});
 setBroadcastAutoCaptionStatus('📝 저장 가사 자동 자막 대기 · 마이크 사용 안 함');
 return false;
}
function refreshBroadcastSubtitleMode(){saveBroadcastSettings();if(($('#broadcastSubtitleText')?.value||'').trim()){stopBroadcastAutoCaption({clear:false});publishSubtitleOverlay();setBroadcastAutoCaptionStatus('✍ 입력 자막 사용 중')}else if(broadcastRunning&&!broadcastPaused)startBroadcastAutoCaption();else{publishSubtitleOverlay();setBroadcastAutoCaptionStatus('🎤 자동 자막 대기')}}

async function broadcastTransitionToNext(manual=false){if(!broadcastRunning||broadcastTransitioning||broadcastPaused)return;broadcastTransitioning=true;try{if(!manual){await playRotatingCoverIntro();if(!broadcastRunning||broadcastPaused)return;}let next=broadcastIndex+1;if(next>=broadcastFiles.length){if($('#broadcastLoop')?.checked)next=0;else{return broadcastStop(true)}}const nextTitle=broadcastSafeTitle(broadcastFiles[next].name);if(!manual){const custom=$('#broadcastCustomMessage')?.value?.trim();if($('#broadcastCustomEnabled')?.checked&&custom){$('#broadcastNow').textContent=`멘트 재생 중 · ${custom}`;showAudienceAnnouncement(custom);publishAudienceState({status:'안내 중',message:custom,announcement:custom});await speakBroadcast(custom);showAudienceAnnouncement('')}const tpl=$('#broadcastNextTemplate')?.value||'다음 곡은 {title}입니다.';if($('#broadcastNextEnabled')?.checked){const text=tpl.replaceAll('{title}',nextTitle);$('#broadcastNow').textContent=`다음곡 안내 · ${text}`;showAudienceAnnouncement(text);publishAudienceState({title:nextTitle,status:'다음 곡 안내',message:text,announcement:text});await speakBroadcast(text);showAudienceAnnouncement('')}}if(!broadcastRunning||broadcastPaused)return;await playBroadcastIndex(next)}finally{broadcastTransitioning=false;updateBroadcastDock()}}
function prepareOriginalBroadcastElement2289(el){
 if(!el)return;
 // Broadcast path is intentionally direct HTML media playback: no AudioContext EQ,
 // no 64-band processing, no normalization/mastering, no remix.
 try{el.muted=false;el.defaultMuted=false;el.volume=1;el.playbackRate=1;el.preservesPitch=true;el.setAttribute('data-maru-broadcast-audio','original-direct')}catch(e){}
}
async function playBroadcastIndex(i){if(!broadcastRunning||broadcastPaused||!broadcastFiles[i])return;broadcastIndex=i;renderBroadcastQueue();const f=broadcastFiles[i],el=broadcastIsVideoFile(f)?$('#broadcastVideoPlayer'):$('#broadcastAudio');if(!el)return;prepareOriginalBroadcastElement2289(el);stopOtherBroadcastPlayer(el);if(broadcastUrls[i])try{URL.revokeObjectURL(broadcastUrls[i])}catch{};broadcastUrls[i]=URL.createObjectURL(f);el.src=broadcastUrls[i];el.muted=false;el.volume=1;el.load();$('#broadcastAudio').style.display=broadcastIsVideoFile(f)?'none':'block';$('#broadcastVideoPlayer').style.display=broadcastIsVideoFile(f)?'block':'none';const title=broadcastSafeTitle(f.name);let hasPreloadedSubtitle=false;try{if($('#broadcastAutoSubtitle')?.checked)await autoAttachBroadcastSubtitle2266(i,{silent:true});window.maruClearTimedLyric2265?.();hasPreloadedSubtitle=!!(await window.maruSetTimedLyric2265?.(f,title,el))}catch(e){console.warn('subtitle preload',e)};markBroadcastRecent(f.name);$('#broadcastNow').textContent=`▶ 원곡 재생 · ${i+1}/${broadcastFiles.length} · ${title} · ${broadcastIsVideoFile(f)?'MP4/영상':'MP3/음원'}`;$('#broadcastBadge').textContent=`재생 ${i+1}/${broadcastFiles.length}`;broadcastAutoCaptionText='';clearTimeout(autoCaptionFallbackTimer2260);await applyBroadcastTrackMedia(i);const trackSubtitle=audienceSubtitleState();publishAudienceState({title,trackIndex:i,status:`재생 중 · ${i+1}/${broadcastFiles.length}`,message:audienceText(),announcement:'',subtitle:trackSubtitle});try{await el.play();if(!hasPreloadedSubtitle&&$('#broadcastAutoSubtitle')?.checked)startBroadcastAutoCaption();else stopBroadcastAutoCaption();}catch(e){console.warn('broadcast play',e);toast(broadcastIsVideoFile(f)?'MP4 재생 실패 · H.264 + AAC MP4를 권장합니다.':'재생을 시작하지 못했습니다')}}
async function broadcastJumpTo(i){if(!broadcastFiles[i])return;if(!broadcastRunning){broadcastRunning=true;broadcastPaused=false;$('#broadcastStop').disabled=false;$('#broadcastPauseBtn').disabled=false}else{broadcastPaused=false;try{broadcastCurrentPlayer()?.pause()}catch{}}await playBroadcastIndex(i);updateBroadcastDock()}
async function broadcastPrevious(){if(!broadcastFiles.length)return pickBroadcastSongs();const was=broadcastIndex,prev=was>0?was-1:0;if(!broadcastRunning)return broadcastJumpTo(prev);broadcastPaused=false;try{broadcastCurrentPlayer()?.pause()}catch{};await playBroadcastIndex(prev);toast(was<=0?'첫 곡을 처음부터 다시 재생합니다':'이전 곡으로 돌아갑니다')}
function resolveAudienceStartIndex2255(){
 try{
  if(Number.isInteger(broadcastIndex)&&broadcastIndex>=0&&broadcastIndex<broadcastFiles.length)return broadcastIndex;
  const s=typeof readAudienceState==='function'?readAudienceState():{};
  const n=Number(s?.trackIndex);
  if(Number.isInteger(n)&&n>=0&&n<broadcastFiles.length)return n;
  const title=String(s?.title||'').trim();
  if(title&&title!=='방송 종료'&&title!=='방송 대기'){
   const k=broadcastFiles.findIndex(f=>broadcastSafeTitle(f?.name)===title);
   if(k>=0)return k;
  }
 }catch(e){}
 return 0;
}
async function broadcastStart(startIndex=null){
 if(!broadcastFiles.length)return toast('방송할 노래를 먼저 선택해 주세요');
 const requested=Number(startIndex), target=Number.isInteger(requested)&&requested>=0&&requested<broadcastFiles.length?requested:resolveAudienceStartIndex2255();
 // V0.22.71: do not call broadcastStop(false) here. It published the default-video/ended state
 // before the requested song media was applied, which caused the popup to jump to the global video.
 try{speechSynthesis?.cancel?.()}catch{}
 for(const el of [$('#broadcastAudio'),$('#broadcastVideoPlayer')])if(el){try{el.pause();el.removeAttribute('src');el.load()}catch{}}
 broadcastUrls.forEach(u=>{try{u&&URL.revokeObjectURL(u)}catch{}});broadcastUrls=[];
 broadcastRunning=true;broadcastPaused=false;broadcastTransitioning=false;
 $('#broadcastStart').disabled=true;$('#broadcastSkip').disabled=false;$('#broadcastStop').disabled=false;if($('#broadcastPauseBtn'))$('#broadcastPauseBtn').disabled=false;
 $('#broadcastBadge').textContent='시작';
 // Apply the selected/current track media first so the popup never flashes the global default video.
 broadcastIndex=target;
 await applyBroadcastTrackMedia(target);
 const f=broadcastFiles[target];
 publishAudienceState({title:broadcastSafeTitle(f?.name),trackIndex:target,status:`시작 준비 · ${target+1}/${broadcastFiles.length}`,message:audienceText()});
 await playBroadcastIndex(target);updateBroadcastDock();
}
async function broadcastStartOrResume(){
 if(!broadcastFiles.length)return toast('방송할 노래를 먼저 선택해 주세요');
 if(!broadcastRunning)return broadcastStart(resolveAudienceStartIndex2255());
 if(!broadcastPaused)return;
 broadcastPaused=false;
 const el=broadcastCurrentPlayer();
 if(el?.src){try{await el.play()}catch{}}
 else await playBroadcastIndex(resolveAudienceStartIndex2255());
 updateBroadcastDock();
}
function broadcastPause(){if(!broadcastRunning||broadcastPaused)return;broadcastPaused=true;try{broadcastCurrentPlayer()?.pause()}catch{};if($('#broadcastNow'))$('#broadcastNow').textContent=`⏸ 방송 대기 · ${broadcastIndex>=0?broadcastSafeTitle(broadcastFiles[broadcastIndex]?.name):''}`;if($('#broadcastBadge'))$('#broadcastBadge').textContent='방송 대기';publishAudienceState({status:'방송 대기'});updateBroadcastDock()}
function broadcastStop(showToast=true){broadcastRunning=false;broadcastTransitioning=false;broadcastPaused=false;revokeTrackAudienceUrls();try{speechSynthesis?.cancel?.()}catch{};for(const el of [$('#broadcastAudio'),$('#broadcastVideoPlayer')])if(el){try{el.pause();el.removeAttribute('src');el.load()}catch{}}broadcastUrls.forEach(u=>{try{u&&URL.revokeObjectURL(u)}catch{}});broadcastUrls=[];broadcastIndex=-1;const start=$('#broadcastStart'),skip=$('#broadcastSkip'),stopb=$('#broadcastStop'),prev=$('#broadcastPrev'),pause=$('#broadcastPauseBtn');if(start)start.disabled=!broadcastFiles.length;if(skip)skip.disabled=!broadcastFiles.length;if(prev)prev.disabled=!broadcastFiles.length;if(pause)pause.disabled=true;if(stopb)stopb.disabled=true;if($('#broadcastBadge'))$('#broadcastBadge').textContent=broadcastFiles.length?`${broadcastFiles.length}곡`:'대기';renderBroadcastQueue();publishAudienceState({title:'방송 종료',status:'MARU MUSIC LIVE',message:''});if(showToast)toast('방송 이어재생을 정지했습니다')}
function toggleBroadcastCard(){const card=$('#broadcastPlayerCard');if(!card)return;card.classList.toggle('collapsed');const b=$('#broadcastToggle');if(b)b.textContent=card.classList.contains('collapsed')?'▾ 펼치기':'▴ 숨기기'}

function scrollSongStudio(target='story'){
 const card=$('#storyCard');if(!card)return;coreOpenPanel('storyCard');
 const el=target==='compose'?$('#songComposeStart'):$('#songStoryStart');
 setTimeout(()=>el?.scrollIntoView({behavior:'smooth',block:'start'}),80)
}
function createSongAndShowPlayer(){makeLyrics();setTimeout(()=>$('#songComposeStart')?.scrollIntoView({behavior:'smooth',block:'start'}),100)}
function coreOpenPanel(id,action=''){
 const cards=$$('main>.card');cards.forEach(c=>c.classList.remove('core-panel-open'));const card=id?$('#'+id):null;if(card){card.classList.add('core-panel-open');card.classList.remove('collapsed');const t=card.querySelector('.section-collapse-toggle');if(t)t.textContent='▾ 숨기기'}
 if(action==='batch'){const x=$('#batchMasterCard');x?.classList.remove('collapsed')}
 if(action==='broadcast'){const x=$('#broadcastPlayerCard');x?.classList.remove('collapsed')}
 if(action==='eq'){const x=$('#mixerEqPanel');if(x)x.classList.add('open')}
 if(card)setTimeout(()=>card.scrollIntoView({behavior:'smooth',block:'start'}),30);
 if(action==='analysis')setTimeout(()=>$('#songAudioFile')?.click(),120);
 if(action==='enhance'){if(importedSongAnalysis)setTimeout(()=>playAIEnhancedOriginal(),80);else toast('먼저 노래를 분석하면 새 반주 없이 AI 음질개선본을 들을 수 있습니다')}
 if(action==='score-play'){setTimeout(()=>playGeneratedArrangementScore(),80)}
 if(action==='song-workflow'){setTimeout(()=>$('#songStoryStart')?.scrollIntoView({behavior:'smooth',block:'start'}),80)}
 if(action==='compose'){setTimeout(()=>$('#songComposeStart')?.scrollIntoView({behavior:'smooth',block:'start'}),80)}
}
function setupCoreLauncher(){document.body.classList.add('core-menu-mode');$$('[data-core-panel],[data-core-action="audience"]').forEach(b=>b.onclick=()=>{const action=b.dataset.coreAction||'';if(action==='audience'){openAudienceView();return}coreOpenPanel(b.dataset.corePanel||'',action)})}
function setupCollapsibleCards(){$$('.collapsible-card').forEach(card=>{const title=card.querySelector('.section-title');if(!title||title.querySelector('.section-collapse-toggle'))return;const btn=document.createElement('button');btn.type='button';btn.className='secondary section-collapse-toggle';const refresh=()=>btn.textContent=card.classList.contains('collapsed')?'▸ 펼치기':'▾ 숨기기';btn.onclick=()=>{card.classList.toggle('collapsed');refresh()};title.appendChild(btn);refresh()})}
function toggleScoreAdvanced(){const card=$('#scoreCard');if(!card)return;card.classList.toggle('advanced-open');$('#toggleScoreAdvanced').textContent=card.classList.contains('advanced-open')?'⚙ 세부 편집 숨기기':'⚙ 세부 편집 펼치기'}
function jumpToScore(){const card=$('#scoreCard');if(card){card.classList.remove('collapsed');const t=card.querySelector('.section-collapse-toggle');if(t)t.textContent='▾ 숨기기';card.scrollIntoView({behavior:'smooth',block:'start'})}}
function updateSourceVoiceValue(){if($('#sourceVoiceValue'))$('#sourceVoiceValue').textContent=`${$('#sourceVoiceVolume').value}%`;const el=$('#sourceAudio');if(el&&!el.paused&&sourceReferenceEnabled())el.volume=Math.min(1,sourceReferenceGain())}
$('#songAudioFile').onchange=e=>setImportedAudioFile(e.target.files?.[0]);$('#startSongMic').onclick=startSongMic;$('#stopSongMic').onclick=stopSongMic;$('#saveCurrentToBroadcast').onclick=()=>addCurrentSourceToBroadcast();$('#batchAudioFiles').onchange=e=>selectBatchFiles(e.target.files);$('#startBatchMaster').onclick=startBatchMaster;$('#stopBatchMaster').onclick=stopBatchMaster;
$('#abOriginal').onclick=playABOriginal;$('#abAnalyzed').onclick=playABAnalyzed;$('#abStop').onclick=stopAB;$('#broadcastFiles').onchange=async e=>{await selectBroadcastFiles(e.target.files);e.target.value=''};$('#broadcastAudioAdd').onchange=async e=>{await selectBroadcastFiles(e.target.files);e.target.value=''};$('#broadcastVideoAdd').onchange=async e=>{await selectBroadcastFiles(e.target.files);e.target.value=''};$('#selectVisibleBroadcast').onclick=selectVisibleBroadcastTracks;$('#clearBroadcastSelection').onclick=clearBroadcastTrackSelection;$('#deleteSelectedBroadcast').onclick=deleteSelectedBroadcastTracks;$('#clearBroadcastSaved').onclick=clearSavedBroadcastPlaylist;$('#broadcastStart').onclick=broadcastStartOrResume;$('#broadcastPauseBtn').onclick=broadcastPause;$('#broadcastPrev').onclick=broadcastPrevious;$('#broadcastSkip').onclick=()=>broadcastTransitionToNext(true);$('#broadcastStop').onclick=()=>broadcastStop(true);$('#broadcastSearch').oninput=renderBroadcastQueue;$('#broadcastFavOnly').onchange=renderBroadcastQueue;$('#broadcastListSort').onchange=renderBroadcastQueue;$('#smartBroadcastOrder').onclick=applySmartBroadcastOrder;$('#broadcastVoiceStart').onclick=startBroadcastVoiceTone;$('#broadcastVoiceStop').onclick=stopBroadcastVoiceTone;$('#broadcastVoiceDepth').oninput=updateBroadcastVoiceTone;$('#broadcastVoiceVolume').oninput=updateBroadcastVoiceTone;if($('#broadcastVoiceAuto'))$('#broadcastVoiceAuto').onchange=()=>{if(broadcastVoiceNodes)setBroadcastVoiceSpeechActive(broadcastVoiceAutoEnabled()?broadcastVoiceSpeech:true,-120)};for(const el of [$('#broadcastAudio'),$('#broadcastVideoPlayer')])if(el){el.ontimeupdate=()=>{try{window.maruUpdateTimedLyric2265?.(el)}catch{}};el.onended=()=>broadcastTransitionToNext(false);el.onerror=()=>{if(broadcastRunning){toast(broadcastIsVideoFile(broadcastFiles[broadcastIndex])?'MP4를 재생하지 못했습니다. H.264/AAC인지 확인해 주세요.':'이 곡을 재생하지 못해 다음 곡으로 넘어갑니다');broadcastTransitionToNext(true)}}};$('#broadcastToggle').onclick=toggleBroadcastCard;if($('#openObsView'))$('#openObsView').onclick=openObsView2284;$('#openAudienceView').onclick=startBigoScreenShareFlow2280;$('#broadcastCoverFile').onchange=e=>loadAudienceCover(e.target.files?.[0]);$('#broadcastVideoFile').onchange=e=>loadAudienceVideo(e.target.files?.[0]);$('#broadcastAudienceText').oninput=()=>{publishAudienceState({message:audienceText()});saveBroadcastSettings()};if($('#broadcastSubtitleText'))$('#broadcastSubtitleText').oninput=refreshBroadcastSubtitleMode;if($('#broadcastSubtitleEnabled'))$('#broadcastSubtitleEnabled').onchange=refreshBroadcastSubtitleMode;if($('#broadcastAutoSubtitle'))$('#broadcastAutoSubtitle').onchange=refreshBroadcastSubtitleMode;if($('#broadcastSubtitlePosition'))$('#broadcastSubtitlePosition').onchange=publishSubtitleOverlay;if($('#broadcastSubtitleSize'))$('#broadcastSubtitleSize').oninput=()=>{if($('#broadcastSubtitleSizeValue'))$('#broadcastSubtitleSizeValue').textContent=`${$('#broadcastSubtitleSize').value}px`;publishSubtitleOverlay()};['broadcastCustomMessage','broadcastNextTemplate'].forEach(id=>{const el=$('#'+id);if(el)el.oninput=saveBroadcastSettings});['broadcastCustomEnabled','broadcastNextEnabled','broadcastLoop'].forEach(id=>{const el=$('#'+id);if(el)el.onchange=saveBroadcastSettings});
function pickBroadcastSongs(){const input=$('#broadcastFiles');if(input)input.click()}
function dockStart(){if(!broadcastFiles.length)return pickBroadcastSongs();return broadcastStartOrResume()}
function dockPause(){if(!broadcastRunning)return toast('먼저 시작을 눌러 주세요');return broadcastPause()}
function dockPrev(){if(!broadcastFiles.length)return pickBroadcastSongs();return broadcastPrevious()}
function dockNext(){if(!broadcastFiles.length)return pickBroadcastSongs();if(!broadcastRunning)return broadcastStart();return broadcastTransitionToNext(true)}
function dockEnd(){if(!broadcastRunning)return toast('현재 방송 음악은 정지 상태입니다');return broadcastStop(true)}
$('#dockBroadcastStart').onclick=dockStart;$('#dockBroadcastPause').onclick=dockPause;$('#dockBroadcastPrev').onclick=dockPrev;$('#dockBroadcastNext').onclick=dockNext;$('#dockBroadcastEnd').onclick=dockEnd;restoreBroadcastSettings();ensureSubtitleAutoOn2260();setupAudienceMode();if(new URLSearchParams(location.search).get('mode')!=='audience')setTimeout(()=>publishSubtitleOverlay(),120);updateBroadcastDock();restoreBroadcastPlaylist().catch(e=>{console.warn('broadcast restore',e);updateBroadcastPersistStatus('자동 복원 실패 · 노래를 한 번 다시 선택해 주세요.')});
$('#analyzeAudio').onclick=analyzeImportedSong;$('#copyAnalyzedStyle').onclick=copyImportedStyle;$('#applyAnalyzedStyle').onclick=()=>applyImportedStyle(true);$('#buildAnalyzedScore').onclick=buildImportedArrangementScore;$('#playSourceSong').onclick=playImportedOriginal;$('#playExtractedMelody').onclick=playExtractedMelodyPreview;$('#playAnalyzedArrangement').onclick=playAnalyzedArrangementPreview;$('#stopAnalyzedPlayback').onclick=stopImportedPlayback;
function toggleBatchMasterCard(){const card=$('#batchMasterCard');if(!card)return;card.classList.toggle('collapsed');const b=$('#batchMasterToggle');if(b)b.textContent=card.classList.contains('collapsed')?'▾ 펼치기':'▴ 숨기기'}
function toggleAnalysisDetails(){const card=$('#audioAnalyzer');if(!card)return;card.classList.toggle('analysis-details-open');const b=$('#toggleAnalysisDetails');if(b)b.textContent=card.classList.contains('analysis-details-open')?'📊 분석 결과 숨기기':'📊 분석 결과 보기'}
$('#applyStyleText').onclick=applyStyleTextToProject;$('#jumpToScore').onclick=jumpToScore;$('#toggleScoreAdvanced').onclick=toggleScoreAdvanced;$('#sourceVoiceVolume').oninput=updateSourceVoiceValue;$('#toggleMixerEq').onclick=toggleMixerEq;const bmt=$('#batchMasterToggle');if(bmt)bmt.onclick=toggleBatchMasterCard;const tad=$('#toggleAnalysisDetails');if(tad)tad.onclick=toggleAnalysisDetails;$$('[data-eq-target]').forEach(b=>b.onclick=()=>setMixerEqTarget(b.dataset.eqTarget));$$('[data-eq-band]').forEach((x,i)=>x.oninput=()=>setMixerEqBand(i,x.value));$('#mixerChannelVolume').oninput=e=>setMixerChannelVolume(e.target.value);$$('[data-eq-preset]').forEach(b=>b.onclick=()=>applyMixerEqPreset(b.dataset.eqPreset));$('#feedbackGood').onclick=()=>saveAnalysisFeedback('good');$('#feedbackTempo').onclick=()=>saveAnalysisFeedback('tempo');$('#feedbackInstrument').onclick=()=>saveAnalysisFeedback('instrument');$('#feedbackMelody').onclick=()=>saveAnalysisFeedback('melody');
$('#previewShortLyrics').onclick=previewComposeShorten;$('#applyShortLyrics').onclick=applyComposeShorten;$('#restoreBeforeShorten').onclick=restoreComposeShorten;
$('#learningAudioFiles').onchange=e=>learnAudioFiles(e.target.files);$('#startProMicLearning').onclick=startProMicLearning;$('#stopProMicLearning').onclick=stopProMicLearning;$('#learnCurrentSong').onclick=learnCurrentAnalyzedSong;$('#learnAnalyzedSongQuick').onclick=learnCurrentAnalyzedSong;$('#registerProLyricStructure').onclick=registerProLyricReference;$('#clearProLyricStructure').onclick=clearProLyricReferences;$('#learningEnabled').onchange=e=>setLearningEnabled(e.target.checked);$('#learningBroadcastAuto').onchange=e=>setLearningAutoSetting(LEARNING_BROADCAST_AUTO_KEY,e.target.checked);$('#learningMicAuto').onchange=e=>setLearningAutoSetting(LEARNING_MIC_AUTO_KEY,e.target.checked);$('#learningPreviewStore').onchange=e=>setLearningPreviewStore(e.target.checked);$('#learnBroadcastNow').onclick=learnBroadcastNow;$('#playCurrentProTarget').onclick=playCurrentProTarget;$('#stopProReference').onclick=stopAllProListening;$('#clearProPreviews').onclick=clearProPreviewStorage;$('#exportLearning').onclick=exportLearningMemory;$('#importLearning').onclick=()=>$('#importLearningFile').click();$('#importLearningFile').onchange=e=>importLearningMemory(e.target.files?.[0]);$('#clearLearning').onclick=clearLearningMemory;
$('#analyzeStory').onclick=analyze;$('#autoPick').onclick=autoPick;$('#refreshInstrumentCombos').onclick=refreshInstrumentCandidates;$('#refreshTitles').onclick=refreshTitleCandidates;
$('#songStepStory').onclick=()=>scrollSongStudio('story');$('#songStepAnalyze').onclick=()=>{analyze();$('#analysisResult')?.scrollIntoView({behavior:'smooth',block:'center'})};$('#songStepCreate').onclick=createSongAndShowPlayer;$('#songStepPlay').onclick=playCreatedSongPreview;$('#songStepSave').onclick=save;$('#openSongInstruments').onclick=()=>coreOpenPanel('instrumentCard');$('#saveSongQuick').onclick=save;$('#backToSongStudioFromInstruments').onclick=()=>scrollSongStudio('compose');$('#backToSongStudioFromMix').onclick=()=>scrollSongStudio('compose');$('#title').oninput=()=>{titleLockedByUser=!!$('#title').value.trim();renderTitleCandidates()};$('#playCreatedSong').onclick=playCreatedSongPreview;$('#playCreatedMelody').onclick=playCreatedMelodyPreview;$('#stopCreatedSong').onclick=stopCreatedSongPreview;$('#playMix').onclick=playMix;$('#stopMix').onclick=stop;$('#createSong').onclick=createSongAndShowPlayer;$('#saveSong').onclick=save;$('#downloadTxt').onclick=downloadTxt;$('#copySuno').onclick=copySuno;$('#createScore').onclick=createScore;$('#playScore').onclick=playGeneratedArrangementScore;$('#playSelection').onclick=playSelection;$('#stopScore').onclick=stop;$('#setRangeStart').onclick=()=>setRangeEdge('start');$('#setRangeEnd').onclick=()=>setRangeEdge('end');$('#clearRange').onclick=clearRange;$('#printScore').onclick=()=>{if(!$('#scoreSvg'))return toast('먼저 악보를 만들어 주세요');window.print()};$('#downloadScore').onclick=downloadScore;$('#scoreMode').onchange=()=>updateScoreMode(false);$('#barSelect').onchange=()=>selectBarFromScore(Number($('#barSelect').value));$('#barLyrics').oninput=updateBarCount;$('#applyBar').onclick=applyBarEdit;$('#scoreSheet').onclick=e=>{const note=e.target.closest?.('[data-note]');if(note)return selectNote(Number(note.dataset.note));const bar=e.target.closest?.('[data-bar-select]');if(bar)selectBarFromScore(Number(bar.dataset.barSelect))};$('#applyNote').onclick=applyNoteEdit;$('#splitNote').onclick=splitSelectedNote;$('#noteDown').onclick=()=>shiftSelectedNote(-1);$('#noteUp').onclick=()=>shiftSelectedNote(1);$('#floatingDown').onclick=()=>shiftSelectedNote(-1);$('#floatingUp').onclick=()=>shiftSelectedNote(1);$('#floatingPlayBar').onclick=playSelectedBar;$('#scoreSmaller').onclick=()=>applyScoreView('fit');$('#scoreNormal').onclick=()=>applyScoreView('normal');$('#scoreLarger').onclick=()=>applyScoreView('large');$('#startVocal').onclick=startVocal;$('#stopVocal').onclick=stopVocal;$('#playOriginal').onclick=()=>playUrl(vocalUrl);$('#makeCorrection').onclick=makeCorrection;$('#playCorrected').onclick=()=>playUrl(correctedUrl);$('#downloadCorrected').onclick=downloadCorrected;$('#exportSongLibrary').onclick=exportSongLibrary;$('#importSongLibrary').onclick=()=>$('#importSongFile').click();$('#importSongFile').onchange=e=>importSongLibrary(e.target.files?.[0]);$('#clearSavedSongs').onclick=()=>{const songs=readSavedSongs();if(!songs.length)return toast('삭제할 저장곡이 없습니다');if(!confirm(`저장한 ${songs.length}곡을 모두 삭제할까요? 이 작업은 되돌릴 수 없습니다.`))return;localStorage.removeItem(SONG_STORAGE_KEY);editingSongIndex=-1;renderSaved();toast('내 곡 저장함을 모두 비웠습니다')};['manualKey','manualMeter','manualBpm','dynamics','rhythmMode'].forEach(id=>$('#'+id).onchange=()=>{if($('#scoreSvg'))createScore()});$('#blend').oninput=e=>$('#blendValue').textContent=e.target.value+'%';$('#masterSampleVolume').oninput=updateMasterSampleVolume;
$('#applyEditedLyrics').onclick=()=>applyEditedLyrics(false);$('#lyrics').oninput=()=>{renderProCompositionCoach();if(!melodyFirstMode||!$('#autoLyricScore').checked)return;clearTimeout(lyricInputTimer);$('#lyricSyncStatus').textContent='수정 내용을 확인하고 있습니다…';lyricInputTimer=setTimeout(()=>applyEditedLyrics(true),650)};
['speed','genre','mood','vocal'].forEach(id=>$('#'+id).onchange=updateInfo);$$('[data-copy]').forEach(b=>b.onclick=async()=>{const el=$('#'+b.dataset.copy);await navigator.clipboard.writeText(el.value);toast('복사했습니다')});
['broadcastKaraokeEnabled','broadcastPronunciationEnabled'].forEach(id=>{const e=$('#'+id);if(e)e.onchange=()=>{publishSubtitleOverlay();saveBroadcastSettings()}});

/* V0.22.71 — one top-level subtitle manager for the entire broadcast list */
let broadcastSubtitleManagerSelected2269=-1;
function broadcastSubtitleText2269(index){
 try{const ids=broadcastCurrentIds(),id=ids[index],f=broadcastFiles[index];if(!id||!f)return '';const media=broadcastMediaInfo(id);return String(media.subtitleText||subtitleBackupText2268?.(id,f.name)||'').trim()}catch{return ''}
}
async function broadcastSubtitleTextFresh2269(index){
 try{const ids=broadcastCurrentIds(),id=ids[index],f=broadcastFiles[index];if(!id||!f)return '';const r=await broadcastDbGet(id);return String(r?.subtitleText||subtitleBackupText2268?.(id,f.name)||'').trim()}catch{return broadcastSubtitleText2269(index)}
}
function ensureBroadcastSubtitleManager2269(){
 let dlg=document.getElementById('broadcastSubtitleManager2269');if(dlg)return dlg;
 dlg=document.createElement('div');dlg.id='broadcastSubtitleManager2269';dlg.className='subtitle-manager-2269';
 dlg.innerHTML=`<div class="subtitle-manager-card-2269"><div class="subtitle-manager-head-2269"><div><h3>💬 자막 관리</h3><small>방송목록 전체 자막을 한 곳에서 관리합니다.</small></div><button type="button" id="subtitleManagerClose2269">✕</button></div><div class="subtitle-manager-body-2269"><div id="subtitleManagerList2269" class="subtitle-manager-list-2269"></div><div class="subtitle-manager-editor-2269"><div id="subtitleManagerTitle2269" class="subtitle-manager-title-2269">곡을 선택하세요.</div><textarea id="subtitleManagerText2269" rows="10" placeholder="목록에서 곡을 선택한 뒤 가사를 붙여넣으세요."></textarea><div id="subtitleManagerStatus2269" class="subtitle-save-status-2268">곡을 선택하세요.</div><div class="subtitle-manager-actions-2269"><button type="button" id="subtitleManagerAuto2269">✨ 저장 가사 자동찾기</button><button type="button" id="subtitleManagerSave2269" class="primary">💾 저장</button><button type="button" id="subtitleManagerDelete2269" class="danger">🗑 자막 삭제</button></div></div></div></div>`;
 document.body.appendChild(dlg);
 document.getElementById('subtitleManagerClose2269').onclick=()=>dlg.classList.remove('show');
 document.getElementById('subtitleManagerSave2269').onclick=async()=>{const i=broadcastSubtitleManagerSelected2269;if(i<0)return toast('먼저 곡을 선택하세요');const val=document.getElementById('subtitleManagerText2269').value;const ok=await saveBroadcastTrackSubtitle2266(i,val,{silent:true});document.getElementById('subtitleManagerStatus2269').textContent=ok?'✅ 저장 후 다시 읽기까지 확인했습니다.':'❌ 저장 실패';if(ok){toast('✅ 자막 저장 완료');await renderBroadcastSubtitleManager2269(i)}};
 document.getElementById('subtitleManagerAuto2269').onclick=async()=>{const i=broadcastSubtitleManagerSelected2269;if(i<0)return toast('먼저 곡을 선택하세요');const found=cleanBroadcastSubtitle2266(broadcastSavedLyrics2266(broadcastFiles[i]?.name||''));if(!found)return toast('내 곡 저장함에서 같은 제목의 가사를 찾지 못했습니다');document.getElementById('subtitleManagerText2269').value=found;const ok=await saveBroadcastTrackSubtitle2266(i,found,{silent:true});document.getElementById('subtitleManagerStatus2269').textContent=ok?'✅ 저장 가사 자동 연결·저장 완료':'❌ 자동 저장 실패';if(ok)await renderBroadcastSubtitleManager2269(i)};
 document.getElementById('subtitleManagerDelete2269').onclick=async()=>{const i=broadcastSubtitleManagerSelected2269;if(i<0)return toast('먼저 곡을 선택하세요');if(!confirm('선택한 곡의 자막을 삭제할까요?'))return;const ok=await saveBroadcastTrackSubtitle2266(i,'',{silent:true});if(ok){document.getElementById('subtitleManagerText2269').value='';document.getElementById('subtitleManagerStatus2269').textContent='자막을 삭제했습니다.';await renderBroadcastSubtitleManager2269(i)}};
 return dlg;
}
async function renderBroadcastSubtitleManager2269(selectIndex=broadcastSubtitleManagerSelected2269){
 const dlg=ensureBroadcastSubtitleManager2269(),list=document.getElementById('subtitleManagerList2269');
 const ids=broadcastCurrentIds();const rows=[];
 for(let i=0;i<broadcastFiles.length;i++){const text=await broadcastSubtitleTextFresh2269(i);rows.push({i,text,title:broadcastSafeTitle(broadcastFiles[i]?.name||''),id:ids[i]})}
 list.innerHTML=rows.length?rows.map(x=>`<button type="button" class="subtitle-manager-row-2269 ${x.i===selectIndex?'selected':''}" data-subtitle-manager-index="${x.i}"><span class="subtitle-manager-num-2269">${x.i+1}</span><span class="subtitle-manager-song-2269">${esc(x.title)}</span><strong class="${x.text?'has':'none'}">${x.text?'✅ 자막 있음':'— 자막 없음'}</strong></button>`).join(''):'<div class="analysis-box">방송목록이 비어 있습니다.</div>';
 list.querySelectorAll('[data-subtitle-manager-index]').forEach(b=>b.onclick=()=>selectBroadcastSubtitleManager2269(Number(b.dataset.subtitleManagerIndex)));
 if(selectIndex>=0&&broadcastFiles[selectIndex])await selectBroadcastSubtitleManager2269(selectIndex,false);else{broadcastSubtitleManagerSelected2269=-1;document.getElementById('subtitleManagerTitle2269').textContent='곡을 선택하세요.';document.getElementById('subtitleManagerText2269').value='';document.getElementById('subtitleManagerStatus2269').textContent='곡을 선택하세요.'}
}
async function selectBroadcastSubtitleManager2269(index,rerender=true){
 index=Number(index);if(!broadcastFiles[index])return;broadcastSubtitleManagerSelected2269=index;
 const text=await broadcastSubtitleTextFresh2269(index);document.getElementById('subtitleManagerTitle2269').textContent=`${index+1}. ${broadcastSafeTitle(broadcastFiles[index].name)}`;document.getElementById('subtitleManagerText2269').value=text;document.getElementById('subtitleManagerStatus2269').textContent=text?'✅ 저장된 자막이 있습니다.':'자막이 없습니다. 입력하거나 자동찾기를 사용하세요.';
 if(rerender){document.querySelectorAll('.subtitle-manager-row-2269').forEach(x=>x.classList.toggle('selected',Number(x.dataset.subtitleManagerIndex)===index))}
}
async function openBroadcastSubtitleManager2269(){const dlg=ensureBroadcastSubtitleManager2269();dlg.classList.add('show');await renderBroadcastSubtitleManager2269(broadcastSubtitleManagerSelected2269>=0?broadcastSubtitleManagerSelected2269:-1)}

prepareNoteEditor();renderLearningProfile();
try{const b2269=document.getElementById('openBroadcastSubtitleManager');if(b2269)b2269.onclick=openBroadcastSubtitleManager2269}catch(e){console.warn('subtitle manager bind 2269',e)}
refreshProPreviewIndex(true).catch(()=>{});renderProCompositionCoach();restoreMasterSampleVolume();restoreMixerEq();renderAuto64Status();setupCollapsibleCards();setupCoreLauncher();updateSourceVoiceValue();renderWordChoices();renderRegions();renderInstruments();autoPick();buildTitleCandidates(lastProfile,false);renderSaved();updateScoreMode();applyScoreView('fit');updateRangeUI();if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js?v=0.22.97');
$('#makeTriplet').onclick=makeSelectedTriplet;


/* V0.22.71 touch-only popup playback controls */
(function(){
  let __viewerControlsTimer = null;

  function getPopupDoc(){
    try{
      if (window.viewerWindow && !window.viewerWindow.closed) return window.viewerWindow.document;
      if (window.broadcastViewerWindow && !window.broadcastViewerWindow.closed) return window.broadcastViewerWindow.document;
      if (window.viewerPopup && !window.viewerPopup.closed) return window.viewerPopup.document;
    }catch(e){}
    return null;
  }

  function findAudioController(){
    const candidates = [
      window.broadcastAudio, window.audioPlayer, window.mainAudio,
      document.querySelector('audio')
    ];
    return candidates.find(Boolean) || null;
  }

  function popupStartPlayback(){
    try{
      if (typeof window.startBroadcast === 'function') return window.startBroadcast();
      if (typeof window.broadcastStart === 'function') return window.broadcastStart();
      if (typeof window.playCurrentBroadcastSong === 'function') return window.playCurrentBroadcastSong();
      const a = findAudioController();
      if (a && typeof a.play === 'function') return a.play();
    }catch(e){ console.warn('popupStartPlayback', e); }
  }

  function popupPausePlayback(){
    try{
      if (typeof window.pauseBroadcast === 'function') return window.pauseBroadcast();
      if (typeof window.broadcastPause === 'function') return window.broadcastPause();
      const a = findAudioController();
      if (a && typeof a.pause === 'function') return a.pause();
    }catch(e){ console.warn('popupPausePlayback', e); }
  }

  function popupStopPlayback(){
    try{
      if (typeof window.stopBroadcast === 'function') return window.stopBroadcast();
      if (typeof window.broadcastStop === 'function') return window.broadcastStop();
      if (typeof window.stopAll === 'function') return window.stopAll();
      const a = findAudioController();
      if (a){
        try{ a.pause(); }catch(e){}
        try{ a.currentTime = 0; }catch(e){}
      }
    }catch(e){ console.warn('popupStopPlayback', e); }
  }

  function ensurePopupControls(){
    const d = getPopupDoc();
    if (!d) return;
    let c = d.getElementById('viewerTouchControls');
    const root = d.body;
    if (!c && root){
      c = d.createElement('div');
      c.id = 'viewerTouchControls';
      c.className = 'viewer-touch-controls';
      c.innerHTML =
        '<button id="viewerStartBtn" type="button">▶ 시작</button>'+
        '<button id="viewerPauseBtn" type="button">⏸ 일시정지</button>'+
        '<button id="viewerStopBtn" type="button">■ 종료</button>';
      root.appendChild(c);
    }
    if (!c || c.dataset.bound === '1') return;
    c.dataset.bound = '1';

    const start = d.getElementById('viewerStartBtn');
    const pause = d.getElementById('viewerPauseBtn');
    const stop = d.getElementById('viewerStopBtn');
    if (start) start.addEventListener('click', function(ev){ ev.stopPropagation(); popupStartPlayback(); showPopupControls(); });
    if (pause) pause.addEventListener('click', function(ev){ ev.stopPropagation(); popupPausePlayback(); showPopupControls(); });
    if (stop) stop.addEventListener('click', function(ev){ ev.stopPropagation(); popupStopPlayback(); showPopupControls(); });

    root.addEventListener('click', function(ev){
      if (c.contains(ev.target)) return;
      showPopupControls();
    });
    root.addEventListener('touchend', function(ev){
      if (c.contains(ev.target)) return;
      showPopupControls();
    }, {passive:true});
  }

  function showPopupControls(){
    const d = getPopupDoc();
    if (!d) return;
    ensurePopupControls();
    const c = d.getElementById('viewerTouchControls');
    if (!c) return;
    c.classList.add('show');
    clearTimeout(__viewerControlsTimer);
    __viewerControlsTimer = setTimeout(function(){
      try{ c.classList.remove('show'); }catch(e){}
    }, 3000);
  }

  window.showPopupPlaybackControls = showPopupControls;

  setInterval(function(){
    try{ ensurePopupControls(); }catch(e){}
  }, 1000);
})();


/* V0.22.71 ensure popup control styles */
(function(){
  const css = `.viewer-touch-controls{position:absolute;left:50%;bottom:10px;transform:translateX(-50%);display:flex;gap:8px;padding:7px 9px;border-radius:14px;background:rgba(8,8,16,.72);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);opacity:0;pointer-events:none;transition:opacity .18s ease;z-index:99999}.viewer-touch-controls.show{opacity:1;pointer-events:auto}.viewer-touch-controls button{min-width:54px;height:38px;padding:0 10px;border:1px solid rgba(255,255,255,.24);border-radius:11px;background:rgba(38,29,62,.92);color:#fff;font-weight:800;font-size:14px}.viewer-touch-controls button:active{transform:scale(.97)}`;
  setInterval(function(){
    try{
      let w = null;
      if (window.viewerWindow && !window.viewerWindow.closed) w = window.viewerWindow;
      else if (window.broadcastViewerWindow && !window.broadcastViewerWindow.closed) w = window.broadcastViewerWindow;
      else if (window.viewerPopup && !window.viewerPopup.closed) w = window.viewerPopup;
      if(!w || !w.document || !w.document.head) return;
      if(w.document.getElementById('viewerTouchControlStyles')) return;
      const s=w.document.createElement('style');
      s.id='viewerTouchControlStyles';
      s.textContent=css;
      w.document.head.appendChild(s);
    }catch(e){}
  },1000);
})();


/* V0.22.71 friendly end greeting */
(function(){
  const END_GREETING = '오늘도 같이 있어줘서 고마워요. 음악 편하게 즐기셨길 바라요. 다음에 또 놀러 오세요. 우리 다시 만나요~';
  let endGreetingTimer = null;

  function getViewerWindow2238(){
    try {
      if (window.viewerWindow && !window.viewerWindow.closed) return window.viewerWindow;
      if (window.broadcastViewerWindow && !window.broadcastViewerWindow.closed) return window.broadcastViewerWindow;
      if (window.viewerPopup && !window.viewerPopup.closed) return window.viewerPopup;
    } catch(e) {}
    return null;
  }

  function showEndGreeting2238(){
    const w = getViewerWindow2238();
    if (!w || !w.document || !w.document.body) return;
    const d = w.document;
    let box = d.getElementById('maruEndGreeting2238');
    if (!box) {
      box = d.createElement('div');
      box.id = 'maruEndGreeting2238';
      box.style.cssText = [
        'position:absolute',
        'left:10px',
        'right:10px',
        'bottom:10px',
        'z-index:999999',
        'padding:10px 12px',
        'border-radius:12px',
        'background:rgba(10,10,18,.78)',
        'color:#fff',
        'font-size:14px',
        'font-weight:700',
        'line-height:1.45',
        'text-align:center',
        'backdrop-filter:blur(7px)',
        '-webkit-backdrop-filter:blur(7px)'
      ].join(';');
      d.body.appendChild(box);
    }
    box.textContent = END_GREETING;
    box.style.display = 'block';
    clearTimeout(endGreetingTimer);
    endGreetingTimer = setTimeout(() => {
      try { box.style.display = 'none'; } catch(e) {}
    }, 5000);
  }

  function stopBroadcastAfterGreeting2238(){
    showEndGreeting2238();
    setTimeout(() => {
      try {
        if (typeof window.stopBroadcast === 'function') return window.stopBroadcast();
        if (typeof window.broadcastStop === 'function') return window.broadcastStop();
        if (typeof window.stopAll === 'function') return window.stopAll();
        const a = window.broadcastAudio || window.audioPlayer || window.mainAudio || document.querySelector('audio');
        if (a) {
          try { a.pause(); } catch(e) {}
          try { a.currentTime = 0; } catch(e) {}
        }
      } catch(e) {
        console.warn('stopBroadcastAfterGreeting2238', e);
      }
    }, 1800);
  }

  window.showEndGreeting2238 = showEndGreeting2238;
  window.stopBroadcastAfterGreeting2238 = stopBroadcastAfterGreeting2238;

  // Re-bind popup ■ 종료 button to greeting -> stop.
  setInterval(() => {
    try {
      const w = getViewerWindow2238();
      if (!w || !w.document) return;
      const btn = w.document.getElementById('viewerStopBtn');
      if (!btn || btn.dataset.endGreetingBound === '1') return;
      btn.dataset.endGreetingBound = '1';
      btn.addEventListener('click', function(ev) {
        ev.preventDefault();
        ev.stopImmediatePropagation();
        stopBroadcastAfterGreeting2238();
      }, true);
    } catch(e) {}
  }, 700);
})();


/* V0.22.71 direct audience touch controls */
(function(){
  const CONTROL_CHANNEL = 'maru-broadcast-control-v2239';
  let controlChannel = null;
  let hideTimer = 0;

  try{
    if ('BroadcastChannel' in window) controlChannel = new BroadcastChannel(CONTROL_CHANNEL);
  }catch(e){}

  function performBroadcastCommand2239(cmd){
    try{
      if(cmd === 'start'){
        if(typeof window.broadcastStartOrResume === 'function') return window.broadcastStartOrResume();
        const b=document.getElementById('broadcastStart'); if(b) return b.click();
      }
      if(cmd === 'pause'){
        if(typeof window.broadcastPause === 'function') return window.broadcastPause();
        const b=document.getElementById('broadcastPauseBtn'); if(b) return b.click();
      }
      if(cmd === 'stop'){
        if(typeof window.broadcastStop === 'function') return window.broadcastStop(true);
        const b=document.getElementById('broadcastStop'); if(b) return b.click();
      }
    }catch(e){ console.warn('performBroadcastCommand2239',cmd,e); }
  }

  // Main operator window receives commands from popup.
  try{
    controlChannel && controlChannel.addEventListener('message', function(e){
      const cmd=e && e.data && e.data.command;
      if(!cmd) return;
      const audience = new URLSearchParams(location.search).get('mode') === 'audience';
      if(!audience) performBroadcastCommand2239(cmd);
    });
  }catch(e){}

  function sendCommand2239(cmd){
    // First try same-origin opener (fastest and most reliable when available).
    try{
      if(window.opener && !window.opener.closed){
        const ow=window.opener;
        if(cmd==='start' && typeof ow.broadcastStartOrResume==='function'){ ow.broadcastStartOrResume(); return true; }
        if(cmd==='pause' && typeof ow.broadcastPause==='function'){ ow.broadcastPause(); return true; }
        if(cmd==='stop' && typeof ow.broadcastStop==='function'){ ow.broadcastStop(true); return true; }
      }
    }catch(e){}
    try{
      controlChannel && controlChannel.postMessage({command:cmd,at:Date.now()});
    }catch(e){}
    // Installed PWA audience mode can run the saved broadcast list by itself.
    try{
      const audience = new URLSearchParams(location.search).get('mode') === 'audience';
      if(audience){ performBroadcastCommand2239(cmd); return true; }
    }catch(e){}
    return !!controlChannel;
  }

  function showControls2239(){
    const c=document.getElementById('audienceTouchControls');
    if(!c) return;
    c.classList.add('show');
    c.setAttribute('aria-hidden','false');
    clearTimeout(hideTimer);
    hideTimer=setTimeout(function(){
      c.classList.remove('show');
      c.setAttribute('aria-hidden','true');
    },3500);
  }

  function showEndGreetingLocal2239(){
    let box=document.getElementById('audienceEndGreeting2239');
    if(!box){
      box=document.createElement('div');
      box.id='audienceEndGreeting2239';
      box.className='audience-end-greeting';
      document.getElementById('audienceCoverWrap')?.appendChild(box);
    }
    if(!box) return;
    box.textContent='오늘도 같이 있어줘서 고마워요. 음악 편하게 즐기셨길 바라요. 다음에 또 놀러 오세요. 우리 다시 만나요~';
    box.style.display='block';
    setTimeout(()=>{ try{box.style.display='none'}catch(e){} },5000);
  }

  function setupDirectAudienceControls2239(){
    const isAudience=new URLSearchParams(location.search).get('mode')==='audience';
    if(!isAudience) return;
    const wrap=document.getElementById('audienceCoverWrap');
    const controls=document.getElementById('audienceTouchControls');
    const start=document.getElementById('audienceStartBtn');
    const pause=document.getElementById('audiencePauseBtn');
    const stop=document.getElementById('audienceStopBtn');
    const comment=document.getElementById('audienceCommentBtn');
    const restore=document.getElementById('audienceRestoreBtn');
    if(!wrap || !controls) return;

    // One tap anywhere on media toggles controls on.
    const reveal=function(ev){
      if(ev.target && controls.contains(ev.target)) return;
      showControls2239();
    };
    wrap.addEventListener('click', reveal, {passive:true});
    wrap.addEventListener('touchend', reveal, {passive:true});

    start && start.addEventListener('click',function(ev){
      ev.preventDefault(); ev.stopPropagation();
      sendCommand2239('start'); showControls2239();
    });
    pause && pause.addEventListener('click',function(ev){
      ev.preventDefault(); ev.stopPropagation();
      sendCommand2239('pause'); showControls2239();
    });
    stop && stop.addEventListener('click',function(ev){
      ev.preventDefault(); ev.stopPropagation();
      showEndGreetingLocal2239();
      setTimeout(()=>sendCommand2239('stop'),1800);
      showControls2239();
    });
    const geomKey='maru-audience-popup-geometry-v1';
    function savePopupGeometry(){try{localStorage.setItem(geomKey,JSON.stringify({w:outerWidth||innerWidth,h:outerHeight||innerHeight,x:screenX||0,y:screenY||0}))}catch{}}
    function enterCommentMode(auto=false){
      if(document.body.classList.contains('audience-comment-mode'))return;
      savePopupGeometry();window.__maruCommentMediaState={video:document.getElementById('audienceVideo')?.style.display||'',cover:document.getElementById('audienceCover')?.style.display||'',placeholder:document.getElementById('audienceCoverPlaceholder')?.style.display||''};document.body.classList.add('audience-comment-mode');try{const v=document.getElementById('audienceVideo'),i=document.getElementById('audienceCover'),p=document.getElementById('audienceCoverPlaceholder'),c=document.getElementById('audienceBackdropCanvas');const videoOn=!!(v&&v.src&&window.__maruCommentMediaState.video!=='none');const coverOn=!!(i&&i.src&&window.__maruCommentMediaState.cover!=='none');if(c)c.style.setProperty('display','none','important');if(v){v.style.setProperty('display',videoOn?'block':'none','important');v.style.setProperty('opacity','1','important');v.style.setProperty('filter','none','important')}if(i){i.style.setProperty('display',!videoOn&&coverOn?'block':'none','important');i.style.setProperty('opacity','1','important');i.style.setProperty('filter','none','important')}if(p)p.style.setProperty('display',!videoOn&&!coverOn?'flex':'none','important')}catch(e){};
      if(comment)comment.hidden=true;if(restore)restore.hidden=false;
      try{const w=300,h=230;window.resizeTo(w,h);window.moveTo(Math.max(0,(screen.availWidth||w)-w-8),8)}catch(e){}
      if(!auto)showControls2239();
    }
    function exitCommentMode(){
      document.body.classList.remove('audience-comment-mode');if(comment)comment.hidden=false;if(restore)restore.hidden=true;try{const s=window.__maruCommentMediaState||{};const v=document.getElementById('audienceVideo'),i=document.getElementById('audienceCover'),p=document.getElementById('audienceCoverPlaceholder'),c=document.getElementById('audienceBackdropCanvas');for(const el of [v,i,p,c]){try{el?.style.removeProperty('display');el?.style.removeProperty('opacity');el?.style.removeProperty('filter')}catch{}}if(v&&s.video!==undefined)v.style.display=s.video;if(i&&s.cover!==undefined)i.style.display=s.cover;if(p&&s.placeholder!==undefined)p.style.display=s.placeholder;}catch(e){}
      try{const g=JSON.parse(localStorage.getItem(geomKey)||'null');if(g?.w&&g?.h)window.resizeTo(g.w,g.h);if(Number.isFinite(g?.x)&&Number.isFinite(g?.y))window.moveTo(g.x,g.y)}catch(e){}
      showControls2239();
    }
    comment && comment.addEventListener('click',function(ev){ev.preventDefault();ev.stopPropagation();enterCommentMode(false)});
    restore && restore.addEventListener('click',function(ev){ev.preventDefault();ev.stopPropagation();exitCommentMode()});
    // Same-window keyboards (Chrome/Samsung Internet) often resize visualViewport; use it when available.
    try{
      const vv=window.visualViewport;let baseH=vv?.height||innerHeight,autoCompact=false,timer=0;
      const checkKeyboard=()=>{clearTimeout(timer);timer=setTimeout(()=>{const h=vv?.height||innerHeight;if(h>baseH)baseH=h;const keyboardOpen=h<baseH*.72;if(keyboardOpen&&!document.body.classList.contains('audience-comment-mode')){autoCompact=true;enterCommentMode(true)}else if(!keyboardOpen&&autoCompact){autoCompact=false;exitCommentMode()}},80)};
      vv?.addEventListener('resize',checkKeyboard);vv?.addEventListener('scroll',checkKeyboard);
    }catch(e){}
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded', setupDirectAudienceControls2239, {once:true});
  }else{
    setupDirectAudienceControls2239();
  }
})();


/* V0.22.71 installable fullscreen PWA + forced browser gate */
(function(){
  let deferredPwaInstall=null;
  const isInstalled=()=>window.matchMedia?.('(display-mode: standalone)').matches||window.matchMedia?.('(display-mode: fullscreen)').matches||window.navigator.standalone===true;
  function updatePwaClass(){
    const installed=!!isInstalled();
    const mobile=/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent||'');
    const allowDesktop=!mobile;
    document.documentElement.classList.toggle('maru-installed',installed||allowDesktop);
    document.documentElement.classList.toggle('maru-browser',!installed&&!allowDesktop);
    document.documentElement.classList.toggle('maru-desktop-browser-ok-2297',allowDesktop);
    document.body?.classList.toggle('pwa-installed',installed);
    return installed||allowDesktop;
  }
  function setGateStatus(msg){const s=document.getElementById('maruInstallGateStatus');if(s)s.textContent=msg;}
  window.addEventListener('beforeinstallprompt',e=>{
    e.preventDefault();
    deferredPwaInstall=e;
    const a=document.getElementById('pwaInstallBtn'),g=document.getElementById('maruForceInstallBtn');
    if(a)a.disabled=false;if(g)g.disabled=false;
    setGateStatus('설치 준비 완료 · 아래 버튼을 눌러 주세요.');
  });
  window.addEventListener('appinstalled',()=>{
    deferredPwaInstall=null;updatePwaClass();
    setGateStatus('설치 완료 · 홈 화면의 MARU 아이콘으로 실행해 주세요.');
    try{toast?.('MARU 앱 설치가 완료됐습니다')}catch(e){}
  });
  async function installMaruPwa(){
    const mobile=/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent||'');
    if(isInstalled()){try{toast?.('이미 MARU 앱으로 실행 중입니다')}catch(e){};return true;}
    if(!mobile && !deferredPwaInstall){
      setGateStatus('PC에서는 설치 없이 바로 사용할 수 있습니다. 설치는 브라우저 메뉴에서 선택할 수 있습니다.');
      try{toast?.('PC에서는 MARU 설치 없이 바로 사용할 수 있습니다')}catch(e){}
      return true;
    }
    if(deferredPwaInstall){
      setGateStatus('설치창을 여는 중입니다…');
      const prompt=deferredPwaInstall;
      deferredPwaInstall=null;
      try{
        await prompt.prompt();
        const choice=await prompt.userChoice;
        if(choice?.outcome==='accepted') setGateStatus('설치 중입니다. 완료 후 홈 화면 MARU 아이콘을 눌러 주세요.');
        else setGateStatus('MARU를 사용하려면 앱 설치가 필요합니다. 다시 눌러 주세요.');
      }catch(e){setGateStatus('설치창을 열지 못했습니다. 브라우저 메뉴에서 “앱 설치”를 선택해 주세요.');}
      return true;
    }
    setGateStatus('설치 준비 중입니다. 1~2초 뒤 다시 눌러 주세요. 설치창이 없으면 브라우저 메뉴의 “앱 설치”를 선택하세요.');
    return false;
  }
  window.installMaruPwa=installMaruPwa;
  function bindPwaInstall(){
    const installed=updatePwaClass();
    const a=document.getElementById('pwaInstallBtn'),g=document.getElementById('maruForceInstallBtn');
    if(a){a.disabled=false;a.onclick=installMaruPwa;}
    if(g){g.disabled=false;g.onclick=installMaruPwa;}
    if(!installed)setTimeout(()=>{if(!deferredPwaInstall)setGateStatus('설치 버튼을 눌러 주세요. 설치창이 안 뜨면 브라우저 메뉴의 “앱 설치”를 선택하세요.');},1800);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bindPwaInstall,{once:true});else bindPwaInstall();
})();


/* V0.22.71 self-contained audience PWA bootstrap */
(function(){
  async function bootstrapAudiencePwa2240(){
    const q=new URLSearchParams(location.search);
    if(q.get('mode')!=='audience')return;
    document.documentElement.classList.add('audience-pwa');
    try{ if(typeof restoreBroadcastPlaylist==='function' && !broadcastFiles?.length) await restoreBroadcastPlaylist(); }catch(e){console.warn('audience restore',e);}
    try{ if(screen.orientation?.lock) screen.orientation.lock('portrait').catch(()=>{}); }catch(e){}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(bootstrapAudiencePwa2240,350),{once:true});
  else setTimeout(bootstrapAudiencePwa2240,350);
})();


/* V0.22.71 live canvas sidebar fill — one video decoder only */
(function(){
 let raf=0,last=0,activeVideo=null;
 function canvas(){return document.getElementById('audienceBackdropCanvas')}
 function wrap(){return document.getElementById('audienceCoverWrap')}
 function size(c){const w=wrap();if(!c||!w)return false;const r=w.getBoundingClientRect();const d=Math.min(2,window.devicePixelRatio||1);const cw=Math.max(2,Math.round(r.width*d)),ch=Math.max(2,Math.round(r.height*d));if(c.width!==cw)c.width=cw;if(c.height!==ch)c.height=ch;return true}
 function drawCover(ctx,video,c){
  const sw=video.videoWidth,sh=video.videoHeight,dw=c.width,dh=c.height;if(!sw||!sh||!dw||!dh)return;
  const s=Math.max(dw/sw,dh/sh),rw=dw/s,rh=dh/s,sx=(sw-rw)/2,sy=(sh-rh)/2;
  ctx.drawImage(video,sx,sy,rw,rh,0,0,dw,dh);
 }
 function tick(ts){
  if(!activeVideo){raf=0;return}
  if(ts-last>120){last=ts;try{const c=canvas();if(c&&size(c)&&activeVideo.readyState>=2){const x=c.getContext('2d',{alpha:false});x.clearRect(0,0,c.width,c.height);drawCover(x,activeVideo,c);c.style.display='block';}}catch(e){}}
  raf=requestAnimationFrame(tick);
 }
 window.maruStartLiveBackdrop2245=function(video){activeVideo=null;if(raf)cancelAnimationFrame(raf);raf=0;const c=canvas();if(c)c.style.display='none';};
 window.maruStopLiveBackdrop2245=function(){activeVideo=null;if(raf)cancelAnimationFrame(raf);raf=0;const c=canvas();if(c){const x=c.getContext('2d');x&&x.clearRect(0,0,c.width,c.height);c.style.display='none';}};
 window.maruDrawImageBackdrop2245=function(img){try{activeVideo=null;if(raf)cancelAnimationFrame(raf);raf=0;const c=canvas();if(!c||!img||!img.naturalWidth||!size(c))return;const x=c.getContext('2d',{alpha:false}),sw=img.naturalWidth,sh=img.naturalHeight,dw=c.width,dh=c.height,s=Math.max(dw/sw,dh/sh),rw=dw/s,rh=dh/s,sx=(sw-rw)/2,sy=(sh-rh)/2;x.drawImage(img,sx,sy,rw,rh,0,0,dw,dh);c.style.display='block';}catch(e){}};
 window.addEventListener('resize',()=>{last=0});
})();


/* V0.22.71 keep auto captions aligned with playback state */
(function(){
 const oldStop=window.broadcastStop;
 if(typeof oldStop==='function')window.broadcastStop=function(...args){try{stopBroadcastAutoCaption({clear:true})}catch{}return oldStop.apply(this,args)};
 const oldPause=window.broadcastPause;
 if(typeof oldPause==='function')window.broadcastPause=function(...args){try{stopBroadcastAutoCaption({clear:false})}catch{}return oldPause.apply(this,args)};
})();


/* V0.22.71 subtitle auto-enable migration + safe title fallback */
const SUBTITLE_MIGRATION_2260='maru-subtitle-autoon-v2260';
function ensureSubtitleAutoOn2260(){
  try{
    const enabled=document.getElementById('broadcastSubtitleEnabled');
    const auto=document.getElementById('broadcastAutoSubtitle');
    if(!enabled||!auto)return;
    if(!localStorage.getItem(SUBTITLE_MIGRATION_2260)){
      enabled.checked=true; auto.checked=true;
      localStorage.setItem(SUBTITLE_MIGRATION_2260,'1');
      saveBroadcastSettings?.();
    }
  }catch(e){}
}
let autoCaptionFallbackTimer2260=0;
function scheduleAutoCaptionFallback2260(title){
  clearTimeout(autoCaptionFallbackTimer2260);
  autoCaptionFallbackTimer2260=setTimeout(()=>{
    try{
      if(!broadcastRunning||broadcastPaused)return;
      const manual=(document.getElementById('broadcastSubtitleText')?.value||'').trim();
      if(manual||broadcastAutoCaptionText)return;
      // V0.22.71: never promote the song title into the karaoke subtitle layer.
      // Default video still keeps the current song subtitle layer; when there is
      // no real lyric/caption yet, leave the karaoke overlay empty and keep only
      // the small song-title overlay.
      const base=audienceSubtitleState();
      publishAudienceSubtitleOnly({...base,enabled:false,text:'',auto:true,captionAt:Date.now(),titleFallback:false});
      setBroadcastAutoCaptionStatus('🎤 자동 자막 대기 · 마이크에서 실제 말소리가 인식되면 표시됩니다.','warn');
    }catch(e){}
  },2200);
}

/* V0.22.71 stable-media invariant: subtitle/title/status updates must never reload unchanged audience video. */


/* V0.22.71 clear legacy title-as-subtitle state */
(function(){
  try{
    const s=readAudienceState?.()||{};
    if(s?.subtitle?.titleFallback){
      const base=audienceSubtitleState();
      const next={...s,subtitle:{...base,enabled:!!String(base.text||'').trim(),titleFallback:false},updatedAt:Date.now()};
      localStorage.setItem(AUDIENCE_STATE_KEY,JSON.stringify({...next,cover:audienceCoverData||'',video:''}));
      applyAudienceState(next);
    }
  }catch(e){}
})();


/* V0.22.71 stable lyric source + unobtrusive restore control */
(function(){
  let timedLyric2265=null;
  let timedLyricLast2265=-1;

  function normTitle2265(s=''){
    return String(s).replace(/\.[^.]+$/,'').replace(/[\[\]{}()（）【】]/g,' ')
      .replace(/[^0-9A-Za-z가-힣一-龥ぁ-んァ-ンー]+/g,' ').replace(/\s+/g,' ').trim().toLowerCase();
  }
  function cleanLyricLines2265(text=''){
    return String(text).split(/\r?\n/).map(x=>x.trim()).filter(x=>x && !/^\s*[\[(（【].+[\])）】]\s*$/.test(x));
  }
  function findSavedLyrics2265(file,title){
    try{
      const songs=typeof readSavedSongs==='function'?readSavedSongs():[];
      if(!Array.isArray(songs)||!songs.length)return null;
      const keys=[normTitle2265(title),normTitle2265(file?.name||'')].filter(Boolean);
      let best=null,bestScore=0;
      for(const s of songs){
        if(!s?.lyrics)continue;
        const k=normTitle2265(s.title||'');if(!k)continue;
        let score=0;
        for(const q of keys){if(q===k)score=Math.max(score,10);else if(q.includes(k)||k.includes(q))score=Math.max(score,6);}
        if(score>bestScore){bestScore=score;best=s;}
      }
      return bestScore>=6?best:null;
    }catch(e){return null}
  }
  async function setTimedLyric2265(file,title,media){
    let text='';
    try{const id=broadcastCurrentIds()[broadcastIndex];const r=id?await broadcastDbGet(id):null;text=String(r?.subtitleText||subtitleBackupText2268?.(id,file?.name||title)||'').trim();}catch(e){try{const id=broadcastCurrentIds()[broadcastIndex];text=String(subtitleBackupText2268?.(id,file?.name||title)||'').trim()}catch{}}
    if(!text){const saved=findSavedLyrics2265(file,title);text=String(saved?.lyrics||'').trim();}
    const lines=cleanLyricLines2265(text);
    timedLyric2265=lines.length?{lines,title:String(title||''),source:'preloaded'}:null;
    timedLyricLast2265=-1;
    if(timedLyric2265){
      try{const en=document.getElementById('broadcastSubtitleEnabled');if(en)en.checked=true;}catch{}
      setBroadcastAutoCaptionStatus?.(`📝 곡별 사전 자막 · ${lines.length}줄`);
    }else setBroadcastAutoCaptionStatus?.('이 곡은 저장 자막이 없습니다. 목록의 💬 자막에서 미리 저장하세요.','warn');
    return !!timedLyric2265;
  }
  function updateTimedLyric2265(media){
    if(!timedLyric2265||!media)return;
    const dur=Number(media.duration),cur=Number(media.currentTime);
    if(!(dur>1)||!Number.isFinite(cur))return;
    const n=timedLyric2265.lines.length;
    const idx=Math.max(0,Math.min(n-1,Math.floor((cur/dur)*n)));
    if(idx===timedLyricLast2265)return;
    timedLyricLast2265=idx;
    const text=timedLyric2265.lines[idx];
    const base=typeof audienceSubtitleState==='function'?audienceSubtitleState():{position:'bottom',size:20,karaoke:true,pronunciation:true};
    publishAudienceSubtitleOnly?.({...base,enabled:true,text,auto:false,captionAt:Date.now(),titleFallback:false});
  }
  window.maruSetTimedLyric2265=setTimedLyric2265;
  window.maruUpdateTimedLyric2265=updateTimedLyric2265;
  window.maruClearTimedLyric2265=function(){timedLyric2265=null;timedLyricLast2265=-1;};

  function bindRestoreReveal2265(){
    const wrap=document.getElementById('audienceCoverWrap');
    const controls=document.getElementById('audienceTouchControls');
    if(!wrap||!controls||wrap.dataset.restoreReveal2265==='1')return;
    wrap.dataset.restoreReveal2265='1';
    const reveal=()=>{
      if(!document.body.classList.contains('audience-comment-mode'))return;
      controls.classList.add('show');
      clearTimeout(window.__maruRestoreHide2265);
      window.__maruRestoreHide2265=setTimeout(()=>controls.classList.remove('show'),2200);
    };
    wrap.addEventListener('click',e=>{if(!controls.contains(e.target))reveal()});
    wrap.addEventListener('touchend',e=>{if(!controls.contains(e.target))reveal()},{passive:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bindRestoreReveal2265,{once:true});else bindRestoreReveal2265();
})();


/* V0.22.71 BROADCAST READY — visible per-track subtitles + verified persistence */
const BROADCAST_SUBTITLE_BACKUP_2268='maru-broadcast-subtitles-v2268';
function readSubtitleBackup2268(){try{return JSON.parse(localStorage.getItem(BROADCAST_SUBTITLE_BACKUP_2268)||'{}')||{}}catch{return {}}}
function writeSubtitleBackup2268(id,name,text){try{const x=readSubtitleBackup2268();const v=String(text||'');x[id]={name:String(name||''),text:v,updatedAt:Date.now()};localStorage.setItem(BROADCAST_SUBTITLE_BACKUP_2268,JSON.stringify(x));return true}catch{return false}}
function subtitleBackupText2268(id,name=''){try{const x=readSubtitleBackup2268();if(x[id]?.text)return String(x[id].text);const norm=normalizeBroadcastSubtitleTitle2266(name);for(const v of Object.values(x)){if(v?.text&&normalizeBroadcastSubtitleTitle2266(v.name||'')===norm)return String(v.text)}return ''}catch{return ''}}

saveBroadcastTrackSubtitle2266=async function(index,text,{silent=false}={}){
 index=Number(index);const ids=broadcastCurrentIds(),id=ids[index],f=broadcastFiles[index];if(!id||!f){if(!silent)toast('자막을 저장할 곡을 찾지 못했습니다');return false}
 const cleaned=cleanBroadcastSubtitle2266(text);
 try{
  let r=await broadcastDbGet(id);
  if(!r){r={id,name:f.name||'방송곡',type:f.type||'audio/wav',size:f.size||0,lastModified:f.lastModified||Date.now(),addedAt:Date.now(),blob:f,coverName:'',videoName:'',mediaUpdatedAt:0}}
  r.subtitleText=cleaned;r.subtitleUpdatedAt=Date.now();
  await broadcastDbPut(r);writeSubtitleBackup2268(id,r.name||f.name,cleaned);
  const verify=await broadcastDbGet(id);const saved=String(verify?.subtitleText||subtitleBackupText2268(id,f.name)||'');
  if(saved!==cleaned)throw new Error('subtitle readback mismatch');
  setBroadcastMediaInfo(id,verify||r);renderBroadcastQueue();
  if(!silent)toast(cleaned?`✅ ${broadcastSafeTitle(f.name)} · 자막 저장 확인 완료`:'곡별 자막을 삭제했습니다');
  return true;
 }catch(e){console.warn('subtitle save 2268',e);writeSubtitleBackup2268(id,f.name,cleaned);if(!silent)toast('자막을 보조 저장소에 저장했습니다');renderBroadcastQueue();return !!subtitleBackupText2268(id,f.name)}
};

openBroadcastSubtitleEditor2266=async function(index){
 index=Number(index);const ids=broadcastCurrentIds(),id=ids[index],f=broadcastFiles[index];if(!id||!f)return toast('곡을 찾지 못했습니다');
 let r=null;try{r=await broadcastDbGet(id)}catch{};const existing=String(r?.subtitleText||subtitleBackupText2268(id,f.name)||'');
 let dlg=document.getElementById('broadcastSubtitleEditor2266');
 if(!dlg){dlg=document.createElement('div');dlg.id='broadcastSubtitleEditor2266';dlg.className='subtitle-editor-2266';dlg.innerHTML=`<div class="subtitle-editor-card-2266"><h3>💬 곡별 자막</h3><div id="subtitleEditorTitle2266" class="subtitle-editor-title-2266"></div><textarea id="subtitleEditorText2266" rows="10" placeholder="가사를 붙여넣으세요. 저장 후 방송에서는 자동으로 한 줄씩 표시됩니다."></textarea><div id="subtitleSaveStatus2268" class="subtitle-save-status-2268">자막을 입력한 뒤 저장을 누르세요.</div><div class="subtitle-editor-actions-2266"><button type="button" id="subtitleSave2266" class="primary">💾 자막 저장</button><button type="button" id="subtitleAuto2266">✨ 저장 가사 자동찾기</button><button type="button" id="subtitleClear2266">🗑 삭제</button><button type="button" id="subtitleClose2266">닫기</button></div></div>`;document.body.appendChild(dlg)}
 dlg.dataset.index=String(index);document.getElementById('subtitleEditorTitle2266').textContent=broadcastSafeTitle(r?.name||f.name||'');document.getElementById('subtitleEditorText2266').value=existing;const st=document.getElementById('subtitleSaveStatus2268');if(st)st.textContent=existing?'✅ 저장된 자막이 있습니다.':'자막을 입력한 뒤 저장을 누르세요.';dlg.classList.add('show');
 document.getElementById('subtitleSave2266').onclick=async()=>{const i=Number(dlg.dataset.index),val=document.getElementById('subtitleEditorText2266').value;const ok=await saveBroadcastTrackSubtitle2266(i,val,{silent:true});const s=document.getElementById('subtitleSaveStatus2268');if(s)s.textContent=ok?'✅ 저장 후 다시 읽기까지 확인했습니다.':'❌ 저장 실패';if(ok){toast('✅ 자막 저장 확인 완료');setTimeout(()=>dlg.classList.remove('show'),500)}};
 document.getElementById('subtitleAuto2266').onclick=async()=>{const i=Number(dlg.dataset.index);const found=cleanBroadcastSubtitle2266(broadcastSavedLyrics2266(broadcastFiles[i]?.name||''));if(!found)return toast('내 곡 저장함에서 같은 제목의 가사를 찾지 못했습니다');document.getElementById('subtitleEditorText2266').value=found;const ok=await saveBroadcastTrackSubtitle2266(i,found,{silent:true});const s=document.getElementById('subtitleSaveStatus2268');if(s)s.textContent=ok?'✅ 저장 가사 자동 연결·저장 확인 완료':'❌ 자동 저장 실패'};
 document.getElementById('subtitleClear2266').onclick=async()=>{const i=Number(dlg.dataset.index);if(confirm('이 곡의 저장 자막을 삭제할까요?')){await saveBroadcastTrackSubtitle2266(i,'',{silent:true});document.getElementById('subtitleEditorText2266').value='';const s=document.getElementById('subtitleSaveStatus2268');if(s)s.textContent='자막을 삭제했습니다.'}};
 document.getElementById('subtitleClose2266').onclick=()=>dlg.classList.remove('show');
};

/* V0.22.73 AUTO SUBTITLE — NO MIC / NO AUDIO FOCUS
   Android SpeechRecognition is intentionally disabled during music playback.
   Auto subtitle now means: use the per-track saved lyric, or auto-attach a lyric
   already stored in MARU by matching the song title. This never opens the mic,
   never acquires audio focus, and therefore cannot add click/duck/pause artifacts. */
let autoCaptionPlaybackGuard2272=0;

startBroadcastAutoCaption=async function(){
  stopBroadcastAutoCaption({clear:false});
  if(!broadcastAutoCaptionEnabled()){
    setBroadcastAutoCaptionStatus((($('#broadcastSubtitleText')?.value||'').trim())?'✍ 입력 자막 사용 중':'자동 자막 꺼짐');
    return false;
  }
  const i=broadcastIndex;
  if(!(i>=0&&broadcastFiles[i])){
    setBroadcastAutoCaptionStatus('📝 저장 가사 자동 자막 대기');
    return false;
  }
  try{
    // Search MARU saved lyrics and persist them as this track's subtitle when available.
    await autoAttachBroadcastSubtitle2266(i,{silent:true});
    const f=broadcastFiles[i], title=broadcastSafeTitle(f.name), media=broadcastCurrentPlayer?.();
    window.maruClearTimedLyric2265?.();
    const ok=!!(await window.maruSetTimedLyric2265?.(f,title,media));
    if(ok){
      setBroadcastAutoCaptionStatus('📝 저장 가사 자동 자막 사용 중 · 마이크 사용 안 함','live');
      try{window.maruUpdateTimedLyric2265?.(media)}catch{}
      return true;
    }
    setBroadcastAutoCaptionStatus('저장된 가사가 없습니다 · 💬 자막 관리에서 가사를 저장하면 끊김 없이 표시됩니다.','warn');
    return false;
  }catch(e){
    console.warn('saved lyric auto subtitle',e);
    setBroadcastAutoCaptionStatus('저장 가사 자동 자막을 불러오지 못했습니다.','warn');
    return false;
  }
};



/* V0.22.76 — PRE-GENERATED AI SUBTITLES ON TOP OF THE STABLE 0.22.73 PLAYER.
   Important: no SpeechRecognition, captureStream, or microphone is used.
   Whisper runs only while broadcast is stopped; playback continues to use the proven
   0.22.73 saved-subtitle path. If the model/network is unavailable, every existing
   broadcast/ment/manual subtitle feature keeps working. */
const MARU_ASR_MODEL_2276='Xenova/whisper-tiny';
const MARU_ASR_CDN_2276='https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2/+esm';
let maruAsrWorker2276=null,maruAsrSeq2276=0,maruAsrPending2276=new Map(),maruAsrQueue2276=[],maruAsrBusy2276=false;
function maruAsrStatus2276(text,cls=''){try{setBroadcastAutoCaptionStatus(text,cls)}catch{}const s=document.getElementById('subtitleManagerStatus2269');if(s&&document.getElementById('broadcastSubtitleManager2269')?.classList.contains('show'))s.textContent=text}
function maruAsrWorkerCode2276(){return `
import { pipeline, env } from '${MARU_ASR_CDN_2276}';
env.allowLocalModels=false;
let pipe=null;
async function ready(){if(pipe)return pipe;self.postMessage({type:'status',text:'AI 자막 모델 준비 중 · 첫 실행만 다운로드'});pipe=await pipeline('automatic-speech-recognition','${MARU_ASR_MODEL_2276}',{quantized:true,progress_callback:(p)=>self.postMessage({type:'progress',data:p})});self.postMessage({type:'status',text:'AI 자막 모델 준비 완료'});return pipe}
self.onmessage=async(e)=>{const {id,audio}=e.data||{};if(!id||!audio)return;try{const p=await ready();self.postMessage({type:'status',id,text:'음원에서 보컬 문장 분석 중…'});const result=await p(audio,{chunk_length_s:25,stride_length_s:4,return_timestamps:true});self.postMessage({type:'done',id,result})}catch(err){self.postMessage({type:'error',id,error:String(err?.message||err)})}};`}
function ensureMaruAsrWorker2276(){if(maruAsrWorker2276)return maruAsrWorker2276;const u=URL.createObjectURL(new Blob([maruAsrWorkerCode2276()],{type:'text/javascript'}));try{const w=new Worker(u,{type:'module'});w.onmessage=e=>{const m=e.data||{};if(m.type==='status'){maruAsrStatus2276(m.text,m.text?.includes('완료')?'live':'');return}if(m.type==='progress'){const p=m.data||{};if(Number.isFinite(p.progress))maruAsrStatus2276(`AI 자막 모델 내려받는 중 ${Math.max(0,Math.min(100,Math.round(p.progress)))}%`);return}const q=maruAsrPending2276.get(m.id);if(!q)return;maruAsrPending2276.delete(m.id);m.type==='done'?q.resolve(m.result):q.reject(new Error(m.error||'AI 자막 분석 실패'))};w.onerror=e=>{console.warn('AI subtitle worker 2276',e);for(const q of maruAsrPending2276.values())q.reject(new Error('AI 자막 엔진을 불러오지 못했습니다'));maruAsrPending2276.clear()};maruAsrWorker2276=w;return w}finally{URL.revokeObjectURL(u)}}
function cancelMaruAsr2276(reason='방송 시작으로 AI 자막 분석을 중지했습니다.'){try{maruAsrWorker2276?.terminate()}catch{}maruAsrWorker2276=null;for(const q of maruAsrPending2276.values())q.reject(new Error(reason));maruAsrPending2276.clear();maruAsrQueue2276=[];maruAsrBusy2276=false}
async function decodeAudioMono16k2276(file){if(broadcastRunning&&!broadcastPaused)throw new Error('방송 중에는 AI 자막을 분석하지 않습니다');const ab=await file.arrayBuffer();const AC=window.AudioContext||window.webkitAudioContext;if(!AC)throw new Error('오디오 디코딩을 지원하지 않는 브라우저입니다');const ctx=new AC();let b;try{b=await ctx.decodeAudioData(ab.slice(0))}finally{try{await ctx.close()}catch{}}if(b.duration>900)throw new Error('15분 이하 음원만 자동 자막을 생성합니다');const rate=16000,len=Math.max(1,Math.ceil(b.duration*rate)),off=new OfflineAudioContext(1,len,rate),src=off.createBufferSource();src.buffer=b;src.connect(off.destination);src.start();const rendered=await off.startRendering();return new Float32Array(rendered.getChannelData(0))}
function asrResultText2276(result){const chunks=Array.isArray(result?.chunks)?result.chunks:[];let p=chunks.map(c=>String(c?.text||'').trim()).filter(Boolean);if(!p.length&&String(result?.text||'').trim())p=[String(result.text).trim()];const out=[];for(const piece of p){for(const sentence of piece.split(/(?<=[.!?。！？])\s+|\s*\n+\s*/).filter(Boolean)){let s=sentence.replace(/\s+/g,' ').trim();if(!s)continue;const max=/[가-힣一-龥ぁ-んァ-ン]/.test(s)?26:54;while(s.length>max){let cut=s.lastIndexOf(' ',max);if(cut<Math.floor(max*.55))cut=max;out.push(s.slice(0,cut).trim());s=s.slice(cut).trim()}if(s)out.push(s)}}return cleanBroadcastSubtitle2266(out.filter((x,i,a)=>x&&x!==a[i-1]).join('\n'))}
async function transcribeBroadcastTrack2276(index,{silent=false}={}){index=Number(index);const f=broadcastFiles[index];if(!f)throw new Error('곡을 찾지 못했습니다');if(broadcastRunning&&!broadcastPaused)throw new Error('방송 정지 후 AI 자막을 만들어 주세요');const id=broadcastCurrentIds()[index];let r=null;try{r=id?await broadcastDbGet(id):null}catch{}const existing=String(r?.subtitleText||subtitleBackupText2268(id,f.name)||'').trim();if(existing)return existing;const saved=cleanBroadcastSubtitle2266(broadcastSavedLyrics2266(f.name||''));if(saved){await saveBroadcastTrackSubtitle2266(index,saved,{silent:true});return saved}if(!/^audio\//i.test(f.type||'')&&!/\.(mp3|wav|m4a|aac|flac|ogg|webm)$/i.test(f.name||''))throw new Error('AI 자동 자막은 음원 파일부터 지원합니다');maruAsrStatus2276(`🧠 ${broadcastSafeTitle(f.name)} · 음원 준비 중`);const audio=await decodeAudioMono16k2276(f);if(broadcastRunning&&!broadcastPaused)throw new Error('방송이 시작되어 분석을 중지했습니다');const w=ensureMaruAsrWorker2276(),job=++maruAsrSeq2276,result=await new Promise((resolve,reject)=>{maruAsrPending2276.set(job,{resolve,reject});w.postMessage({id:job,audio},[audio.buffer])});const text=asrResultText2276(result);if(!text)throw new Error('보컬 문장을 찾지 못했습니다');const ok=await saveBroadcastTrackSubtitle2266(index,text,{silent:true});if(!ok)throw new Error('AI 자막 저장 실패');if(!silent)toast(`✅ ${broadcastSafeTitle(f.name)} · AI 자막 생성 완료`);maruAsrStatus2276(`✅ AI 사전 자막 생성 완료 · ${text.split(/\r?\n/).filter(Boolean).length}줄`,'live');try{await renderBroadcastSubtitleManager2269(index)}catch{}return text}
async function runMaruAsrQueue2276(){if(maruAsrBusy2276)return;maruAsrBusy2276=true;try{while(maruAsrQueue2276.length){if(broadcastRunning&&!broadcastPaused)break;const id=maruAsrQueue2276.shift(),i=broadcastCurrentIds().indexOf(id);if(i<0)continue;try{await transcribeBroadcastTrack2276(i,{silent:true})}catch(e){console.warn('AI auto subtitle 2276',e);maruAsrStatus2276(`⚠ ${broadcastSafeTitle(broadcastFiles[i]?.name||'곡')} · ${e.message||e}`,'warn')}}}finally{maruAsrBusy2276=false}}
function queueNewBroadcastSubtitles2276(files){if(!document.getElementById('broadcastAutoSubtitle')?.checked)return;const ids=new Set((files||[]).map(f=>broadcastFileId(f,f?.name||'audio')));for(const id of broadcastCurrentIds())if(ids.has(id)&&!maruAsrQueue2276.includes(id))maruAsrQueue2276.push(id);const go=()=>runMaruAsrQueue2276();if('requestIdleCallback'in window)requestIdleCallback(go,{timeout:2500});else setTimeout(go,1600)}
const selectBroadcastFilesStable2276=selectBroadcastFiles;selectBroadcastFiles=async function(files){const copy=[...(files||[])];const out=await selectBroadcastFilesStable2276(files);queueNewBroadcastSubtitles2276(copy);return out};
const ensureBroadcastSubtitleManagerStable2276=ensureBroadcastSubtitleManager2269;ensureBroadcastSubtitleManager2269=function(){const dlg=ensureBroadcastSubtitleManagerStable2276(),actions=dlg?.querySelector('.subtitle-manager-actions-2269');if(actions&&!document.getElementById('subtitleManagerAI2276')){const b=document.createElement('button');b.type='button';b.id='subtitleManagerAI2276';b.textContent='🤖 가사 없으면 AI 자동생성';actions.insertBefore(b,actions.firstChild);b.onclick=async()=>{const i=broadcastSubtitleManagerSelected2269;if(i<0)return toast('먼저 곡을 선택하세요');b.disabled=true;try{await transcribeBroadcastTrack2276(i);const t=await broadcastSubtitleTextFresh2269(i);const ta=document.getElementById('subtitleManagerText2269');if(ta)ta.value=t}catch(e){toast(`AI 자막 생성 실패 · ${e.message||e}`);maruAsrStatus2276(`❌ ${e.message||e}`,'warn')}finally{b.disabled=false}}}return dlg};
document.getElementById('broadcastStart')?.addEventListener('click',()=>cancelMaruAsr2276(),{capture:true});
document.getElementById('dockBroadcastStart')?.addEventListener('click',()=>cancelMaruAsr2276(),{capture:true});
setBroadcastAutoCaptionStatus('🧠 V0.22.76 · 가사 없는 곡은 방송 전에 AI 사전 생성 · 방송 중 마이크/분석 없음');

/* V0.22.92 — MOBILE -> PC BROADCAST LIBRARY SYNC
   One .marusync package carries the saved broadcast order plus original MP3/MP4,
   per-track cover/video and subtitles. No recompression and no base64 expansion. */
const MARU_SYNC_MAGIC_2292='MARUSYNC1\n';
let maruSyncPackage2292=null;
function maruSyncStatus2292(text,state='idle'){
  const el=document.getElementById('broadcastSyncStatus2292');
  if(!el)return;
  el.dataset.state=state;
  const b=el.querySelector('b'),s=el.querySelector('span');
  if(b)b.textContent=state==='busy'?'동기화 준비 중':state==='ready'?'준비 완료':state==='ok'?'동기화 완료':state==='error'?'확인 필요':'대기';
  if(s)s.textContent=String(text||'');
}
function maruSyncFormatBytes2292(n){n=Number(n||0);if(n>=1024**3)return`${(n/1024**3).toFixed(2)} GB`;if(n>=1024**2)return`${(n/1024**2).toFixed(1)} MB`;if(n>=1024)return`${(n/1024).toFixed(0)} KB`;return`${n} B`}
function maruSyncSafeMeta2292(r){return{id:r.id,name:r.name||'방송곡',type:r.type||r.blob?.type||'application/octet-stream',size:Number(r.size||r.blob?.size||0),lastModified:Number(r.lastModified||Date.now()),addedAt:Number(r.addedAt||Date.now()),coverName:r.coverName||'',videoName:r.videoName||'',mediaUpdatedAt:Number(r.mediaUpdatedAt||0),subtitleText:String(r.subtitleText||''),subtitleUpdatedAt:Number(r.subtitleUpdatedAt||0)}}
async function buildBroadcastSyncPackage2292(){
  const ids=broadcastOrderRead();
  if(!ids.length)throw new Error('모바일 방송목록에 저장된 곡이 없습니다.');
  maruSyncStatus2292(`저장된 방송곡 ${ids.length}곡을 한 파일로 묶고 있습니다. 원곡은 재압축하지 않습니다.`,'busy');
  const entries=[],parts=[];let payloadOffset=0,totalBytes=0;
  for(let i=0;i<ids.length;i++){
    const r=await broadcastDbGet(ids[i]);
    if(!r?.blob)continue;
    const meta=maruSyncSafeMeta2292(r),entry={...meta,segments:{}};
    for(const [key,blob] of [['blob',r.blob],['coverBlob',r.coverBlob],['videoBlob',r.videoBlob]]){
      if(!(blob instanceof Blob)||!blob.size)continue;
      entry.segments[key]={offset:payloadOffset,length:blob.size,type:blob.type||'application/octet-stream'};
      parts.push(blob);payloadOffset+=blob.size;totalBytes+=blob.size;
    }
    entries.push(entry);
    maruSyncStatus2292(`${i+1}/${ids.length}곡 확인 중 · ${meta.name}`,'busy');
    if((i+1)%8===0)await new Promise(r=>setTimeout(r,0));
  }
  if(!entries.length)throw new Error('저장된 원곡 파일을 읽지 못했습니다.');
  const goodIds=entries.map(x=>x.id),manifest={format:'MARU-BROADCAST-SYNC',version:1,createdAt:new Date().toISOString(),appVersion:'0.22.92',count:entries.length,order:goodIds,entries};
  const enc=new TextEncoder(),magic=enc.encode(MARU_SYNC_MAGIC_2292),manifestBytes=enc.encode(JSON.stringify(manifest));
  const len=new Uint8Array(4),view=new DataView(len.buffer);view.setUint32(0,manifestBytes.byteLength,true);
  const blob=new Blob([magic,len,manifestBytes,...parts],{type:'application/x-maru-sync'});
  const d=new Date(),pad=n=>String(n).padStart(2,'0'),stamp=`${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}`;
  const file=new File([blob],`MARU-모바일방송목록-${stamp}-${entries.length}곡.marusync`,{type:'application/x-maru-sync',lastModified:Date.now()});
  maruSyncPackage2292=file;
  const share=document.getElementById('broadcastSyncShare2292'),save=document.getElementById('broadcastSyncSave2292');
  if(share)share.hidden=false;if(save)save.hidden=false;
  maruSyncStatus2292(`${entries.length}곡 · ${maruSyncFormatBytes2292(file.size)} 준비 완료. 모바일에서는 ‘Quick Share/공유’, PC에서는 받은 파일을 ‘PC에서 받기’로 선택하세요.`,'ready');
  return file;
}
function downloadBroadcastSyncPackage2292(){
  const file=maruSyncPackage2292;if(!file)return toast('먼저 모바일 동기화 파일을 만들어 주세요.');
  const u=URL.createObjectURL(file),a=document.createElement('a');a.href=u;a.download=file.name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),30000);
  maruSyncStatus2292(`동기화 파일을 저장했습니다 · ${file.name}`,'ready');
}
async function shareBroadcastSyncPackage2292(){
  const file=maruSyncPackage2292;if(!file)return toast('먼저 모바일 동기화 파일을 만들어 주세요.');
  try{
    if(navigator.share&&(!navigator.canShare||navigator.canShare({files:[file]}))){await navigator.share({title:'MARU 방송목록 PC 동기화',text:`MARU 방송목록 ${broadcastOrderRead().length}곡`,files:[file]});maruSyncStatus2292('공유를 열었습니다. Quick Share에서 방송용 PC를 선택하세요.','ready');return}
  }catch(e){if(e?.name==='AbortError')return;console.warn('sync share',e)}
  downloadBroadcastSyncPackage2292();toast('이 기기에서는 파일 공유를 바로 열 수 없어 동기화 파일을 저장했습니다.');
}
async function importBroadcastSyncPackage2292(file){
  if(!file)return;
  maruSyncStatus2292(`${file.name} 확인 중…`,'busy');
  try{
    const enc=new TextEncoder(),magicBytes=enc.encode(MARU_SYNC_MAGIC_2292),head=new Uint8Array(await file.slice(0,magicBytes.length+4).arrayBuffer());
    if(head.length<magicBytes.length+4||!magicBytes.every((v,i)=>head[i]===v))throw new Error('MARU 동기화 파일이 아닙니다.');
    const manifestLen=new DataView(head.buffer,head.byteOffset+magicBytes.length,4).getUint32(0,true);
    if(!manifestLen||manifestLen>20*1024*1024)throw new Error('동기화 목록 정보가 손상되었습니다.');
    const manifestStart=magicBytes.length+4,payloadBase=manifestStart+manifestLen,manifest=JSON.parse(await file.slice(manifestStart,payloadBase).text());
    if(manifest?.format!=='MARU-BROADCAST-SYNC'||!Array.isArray(manifest.entries))throw new Error('지원하지 않는 동기화 파일입니다.');
    await broadcastRequestPersistentStorage();
    const incoming=[];let imported=0;
    for(let i=0;i<manifest.entries.length;i++){
      const e=manifest.entries[i],seg=e.segments||{},makeBlob=s=>s&&Number(s.length)>0?file.slice(payloadBase+Number(s.offset||0),payloadBase+Number(s.offset||0)+Number(s.length||0),s.type||'application/octet-stream'):null;
      const blob=makeBlob(seg.blob);if(!blob)continue;
      const r={id:String(e.id||broadcastFileId(new File([blob],e.name||'방송곡',{type:e.type||blob.type,lastModified:Number(e.lastModified||Date.now())}),e.name||'방송곡')),name:e.name||'방송곡',type:e.type||blob.type||'application/octet-stream',size:Number(e.size||blob.size),lastModified:Number(e.lastModified||Date.now()),addedAt:Number(e.addedAt||Date.now()),blob,coverBlob:makeBlob(seg.coverBlob),coverName:e.coverName||'',videoBlob:makeBlob(seg.videoBlob),videoName:e.videoName||'',mediaUpdatedAt:Number(e.mediaUpdatedAt||0),subtitleText:String(e.subtitleText||''),subtitleUpdatedAt:Number(e.subtitleUpdatedAt||0)};
      await broadcastDbPut(r);incoming.push(r.id);imported++;
      maruSyncStatus2292(`${i+1}/${manifest.entries.length}곡 PC에 저장 중 · ${r.name}`,'busy');
      if((i+1)%6===0)await new Promise(r=>setTimeout(r,0));
    }
    if(!imported)throw new Error('가져올 원곡 파일이 없습니다.');
    const old=broadcastOrderRead(),incomingOrder=(manifest.order||incoming).filter(id=>incoming.includes(id)),merged=[...incomingOrder,...old.filter(id=>!incomingOrder.includes(id))].slice(0,100);
    broadcastOrderWrite(merged);await restoreBroadcastPlaylist();
    maruSyncStatus2292(`모바일 방송목록 ${imported}곡을 PC에 가져왔습니다. 기존 PC 전용곡은 뒤에 그대로 유지했습니다.`,'ok');
    toast(`📱→🖥 방송목록 ${imported}곡 동기화 완료`);
  }catch(e){console.error('MARU sync import',e);maruSyncStatus2292(e.message||String(e),'error');toast(`동기화 실패 · ${e.message||e}`)}
}
function bindBroadcastSync2292(){
  const make=document.getElementById('broadcastSyncExport2292'),share=document.getElementById('broadcastSyncShare2292'),save=document.getElementById('broadcastSyncSave2292'),pick=document.getElementById('broadcastSyncImportBtn2292'),input=document.getElementById('broadcastSyncImport2292');
  if(!make)return;
  make.onclick=async()=>{make.disabled=true;try{await buildBroadcastSyncPackage2292()}catch(e){console.error(e);maruSyncStatus2292(e.message||String(e),'error');toast(`동기화 파일 만들기 실패 · ${e.message||e}`)}finally{make.disabled=false}};
  if(share)share.onclick=shareBroadcastSyncPackage2292;if(save)save.onclick=downloadBroadcastSyncPackage2292;if(pick)pick.onclick=()=>input?.click();if(input)input.onchange=async e=>{const f=e.target.files?.[0];e.target.value='';if(f)await importBroadcastSyncPackage2292(f)};
  const isMobile=/Android|iPhone|iPad|Mobile/i.test(navigator.userAgent||'');
  maruSyncStatus2292(isMobile?'이 휴대폰의 저장 방송목록을 한 파일로 만들어 Quick Share로 PC에 보낼 수 있습니다.':'모바일에서 받은 .marusync 파일을 선택하면 원곡·영상·커버·자막과 순서가 한 번에 들어옵니다.','idle');
}
setTimeout(bindBroadcastSync2292,0);

/* V0.22.93 — MOBILE -> PC DIRECT LAN SYNC
   No .marusync file is required for the normal path. The PC helper relays one small
   base64 chunk at a time in RAM; PC MARU writes completed records to IndexedDB. */
const MARU_DIRECT_HELPER_LOOPBACK_2293='http://127.0.0.1:8765';
const MARU_DIRECT_CHUNK_BYTES_2293=96*1024;
const MARU_DIRECT_PC_KEY_2293='maru.direct.pc.2293';
let maruDirectPollTimer2293=null,maruDirectPollBusy2293=false,maruDirectSending2293=false;
let maruDirectRecv2293={sessionId:'',manifest:null,entries:new Map(),records:new Map(),parts:new Map(),lastSeq:0,receivedBytes:0,importedIds:new Set(),finished:false};

function maruDirectIsMobile2293(){return /Android|iPhone|iPad|Mobile/i.test(navigator.userAgent||'')}
function maruDirectStatus2293(text,state='idle'){
  const el=document.getElementById('directSyncStatus2293');if(!el)return;
  el.dataset.state=state;const b=el.querySelector('b'),s=el.querySelector('span');
  if(b)b.textContent=state==='busy'?'전송 중':state==='ready'?'연결 준비':state==='ok'?'완료':state==='error'?'확인 필요':'대기';
  if(s)s.textContent=String(text||'');
}
function maruDirectProgress2293(p){const el=document.getElementById('directSyncProgress2293');if(el)el.style.width=`${Math.max(0,Math.min(100,Number(p)||0))}%`}
function maruDirectSleep2293(ms){return new Promise(r=>setTimeout(r,ms))}
function maruDirectNormalizePc2293(raw){
  let v=String(raw||'').trim();if(!v)throw new Error('PC 주소를 입력해 주세요.');
  if(!/^https?:\/\//i.test(v))v='http://'+v;
  let u;try{u=new URL(v)}catch{throw new Error('PC 주소 형식이 맞지 않습니다. 예: 192.168.0.12')}
  if(!u.port)u.port='8765';u.protocol='http:';u.pathname='';u.search='';u.hash='';
  if(maruDirectIsMobile2293()&&/^(127\.|localhost$)/i.test(u.hostname))throw new Error('127.0.0.1은 휴대폰 자기 자신입니다. PC 도우미 창의 192.168… 주소를 입력하세요.');
  return u.origin;
}
async function maruDirectFetch2293(base,path,options={}){
  const url=String(base).replace(/\/$/,'')+path,opts={cache:'no-store',...options};
  try{return await fetch(url,{...opts,targetAddressSpace:base.includes('127.0.0.1')?'loopback':'local'})}
  catch(e){
    // Browsers that do not yet expose Request.targetAddressSpace ignore/fail the option.
    if(e instanceof TypeError)return fetch(url,opts);
    throw e;
  }
}
async function maruDirectJson2293(base,path,options={}){
  const r=await maruDirectFetch2293(base,path,options);let data=null;
  try{data=await r.json()}catch{}
  if(!r.ok)throw new Error(data?.message||`PC 도우미 응답 오류 ${r.status}`);
  return data||{};
}
async function maruDirectPost2293(base,path,obj){return maruDirectJson2293(base,path,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(obj||{})})}
function maruDirectBytesToB642293(bytes){let s='',step=0x8000;for(let i=0;i<bytes.length;i+=step)s+=String.fromCharCode.apply(null,bytes.subarray(i,Math.min(bytes.length,i+step)));return btoa(s)}
function maruDirectB64ToBytes2293(s){const bin=atob(String(s||'')),u=new Uint8Array(bin.length),step=0x8000;for(let i=0;i<bin.length;i+=step){const end=Math.min(bin.length,i+step);for(let j=i;j<end;j++)u[j]=bin.charCodeAt(j)}return u}
function maruDirectAssetMeta2293(blob){return blob instanceof Blob&&blob.size?{size:blob.size,type:blob.type||'application/octet-stream'}:null}
function maruDirectSafeRecord2293(e){return{id:String(e.id||''),name:e.name||'방송곡',type:e.type||'application/octet-stream',size:Number(e.size||0),lastModified:Number(e.lastModified||Date.now()),addedAt:Number(e.addedAt||Date.now()),coverName:e.coverName||'',videoName:e.videoName||'',mediaUpdatedAt:Number(e.mediaUpdatedAt||0),subtitleText:String(e.subtitleText||''),subtitleUpdatedAt:Number(e.subtitleUpdatedAt||0),blob:null,coverBlob:null,videoBlob:null}}

async function maruDirectCheckPc2293({quiet=false}={}){
  const input=document.getElementById('directSyncPcAddress2293');let base;
  try{base=maruDirectNormalizePc2293(input?.value||localStorage.getItem(MARU_DIRECT_PC_KEY_2293)||'');if(input)input.value=base.replace(/^http:\/\//,'').replace(/:8765$/,'');
    if(!quiet)maruDirectStatus2293('PC에 연결 중입니다. Chrome에서 로컬 네트워크 허용 창이 뜨면 허용하세요.','busy');
    const st=await maruDirectJson2293(base,'/api/status');if(!st.directSync)throw new Error('PC OBS 도우미가 이전 버전입니다. V0.22.93 이상 도우미로 교체해 주세요.');
    localStorage.setItem(MARU_DIRECT_PC_KEY_2293,base);if(!quiet)maruDirectStatus2293(`PC 연결 성공 · ${st.helper||'MARU Helper'} · 파일 저장 없이 바로 전송할 수 있습니다.`,'ready');return{base,status:st};
  }catch(e){if(!quiet)maruDirectStatus2293(`${e.message||e} · 휴대폰과 PC가 같은 Wi‑Fi인지, PC 도우미 창이 켜져 있는지 확인하세요.`,'error');throw e}
}

async function maruDirectManifest2293(){
  const ids=broadcastOrderRead();if(!ids.length)throw new Error('모바일 방송목록에 저장된 곡이 없습니다.');
  const entries=[],records=[];let totalBytes=0;
  for(let i=0;i<ids.length;i++){
    const r=await broadcastDbGet(ids[i]);if(!r?.blob)continue;
    const meta=maruSyncSafeMeta2292(r),assets={blob:maruDirectAssetMeta2293(r.blob),coverBlob:maruDirectAssetMeta2293(r.coverBlob),videoBlob:maruDirectAssetMeta2293(r.videoBlob)};
    for(const a of Object.values(assets))if(a)totalBytes+=Number(a.size||0);
    entries.push({...meta,assets});records.push(r);
  }
  if(!entries.length)throw new Error('저장된 원곡 파일을 읽지 못했습니다.');
  return{manifest:{format:'MARU-DIRECT-BROADCAST-SYNC',version:1,appVersion:'0.22.94',createdAt:new Date().toISOString(),count:entries.length,totalBytes,order:entries.map(e=>e.id),entries},records};
}
async function maruDirectWaitAck2293(base,sessionId,seq){
  const started=Date.now();let warned=false;
  while(true){
    const st=await maruDirectJson2293(base,'/api/direct/state');
    if(st.sessionId!==sessionId)throw new Error('PC 동기화 세션이 바뀌었습니다. 다시 시작해 주세요.');
    if(Number(st.ackSeq||0)>=seq)return;
    if(Date.now()-started>8000&&!warned){warned=true;maruDirectStatus2293('PC MARU가 데이터를 받기를 기다리고 있습니다. PC에서 MARU V0.22.94 페이지를 열어 두세요.','busy')}
    if(Date.now()-started>180000)throw new Error('PC MARU 수신 대기 시간이 너무 길어 중단했습니다. PC MARU 페이지를 열고 다시 보내세요.');
    await maruDirectSleep2293(260);
  }
}
async function maruDirectSendChunk2293(base,sessionId,packet){
  while(true){const r=await maruDirectPost2293(base,'/api/direct/chunk',{sessionId,...packet});if(r.accepted||r.alreadyAcked)break;if(r.sessionMismatch)throw new Error('PC 동기화 세션이 바뀌었습니다.');await maruDirectSleep2293(220)}
  await maruDirectWaitAck2293(base,sessionId,packet.seq);
}
async function maruDirectSendBlob2293(base,sessionId,trackId,asset,blob,seqRef,progress){
  if(!(blob instanceof Blob)||!blob.size)return;
  const totalChunks=Math.ceil(blob.size/MARU_DIRECT_CHUNK_BYTES_2293);
  for(let i=0;i<totalChunks;i++){
    const chunk=blob.slice(i*MARU_DIRECT_CHUNK_BYTES_2293,Math.min(blob.size,(i+1)*MARU_DIRECT_CHUNK_BYTES_2293));
    const data=maruDirectBytesToB642293(new Uint8Array(await chunk.arrayBuffer())),seq=++seqRef.value;
    await maruDirectSendChunk2293(base,sessionId,{seq,trackId,asset,chunkIndex:i,totalChunks,type:blob.type||'application/octet-stream',data});
    progress.sent+=chunk.size;const pct=progress.total?progress.sent/progress.total*100:0;maruDirectProgress2293(pct);
    maruDirectStatus2293(`${progress.track}/${progress.tracks}곡 전송 중 · ${maruSyncFormatBytes2292(progress.sent)} / ${maruSyncFormatBytes2292(progress.total)} · ${Math.round(pct)}%`,'busy');
  }
}
async function maruDirectSend2293(){
  if(maruDirectSending2293)return;const btn=document.getElementById('directSyncSend2293');maruDirectSending2293=true;if(btn)btn.disabled=true;maruDirectProgress2293(0);
  let base='',sessionId='';
  try{
    ({base}=await maruDirectCheckPc2293({quiet:false}));
    maruDirectStatus2293('모바일 저장 방송목록을 확인하고 있습니다. 원곡은 재압축하지 않습니다.','busy');
    const {manifest,records}=await maruDirectManifest2293(),begin=await maruDirectPost2293(base,'/api/direct/begin',{manifest});sessionId=begin.sessionId;if(!sessionId)throw new Error('PC가 동기화 세션을 만들지 못했습니다.');
    const seqRef={value:0},progress={sent:0,total:Number(manifest.totalBytes||0),track:0,tracks:records.length};
    for(let i=0;i<records.length;i++){
      const r=records[i],id=manifest.entries[i]?.id||r.id;progress.track=i+1;
      await maruDirectSendBlob2293(base,sessionId,id,'blob',r.blob,seqRef,progress);
      await maruDirectSendBlob2293(base,sessionId,id,'coverBlob',r.coverBlob,seqRef,progress);
      await maruDirectSendBlob2293(base,sessionId,id,'videoBlob',r.videoBlob,seqRef,progress);
    }
    await maruDirectPost2293(base,'/api/direct/end',{sessionId});maruDirectStatus2293('모든 원곡 전송 완료 · PC MARU가 목록을 마무리하고 있습니다.','busy');
    const started=Date.now();while(true){const st=await maruDirectJson2293(base,'/api/direct/state');if(st.sessionId!==sessionId)throw new Error('PC 동기화 세션이 바뀌었습니다.');if(st.completed)break;if(Date.now()-started>180000)throw new Error('PC 목록 저장 완료 확인 시간이 초과되었습니다.');await maruDirectSleep2293(400)}
    maruDirectProgress2293(100);maruDirectStatus2293(`✅ ${manifest.count}곡을 PC MARU로 바로 보냈습니다. PC 다운로드 폴더에는 동기화 파일을 만들지 않았습니다.`,'ok');toast(`📱→🖥 ${manifest.count}곡 직접 동기화 완료`);
  }catch(e){console.error('direct sync send 2293',e);if(base&&sessionId)try{await maruDirectPost2293(base,'/api/direct/cancel',{sessionId})}catch{}maruDirectStatus2293(e.message||String(e),'error');toast(`직접 동기화 실패 · ${e.message||e}`)}finally{maruDirectSending2293=false;if(btn)btn.disabled=false}
}

function maruDirectResetReceiver2293(sessionId,manifest){
  const entries=new Map(),records=new Map();for(const e of manifest.entries||[]){entries.set(String(e.id),e);records.set(String(e.id),maruDirectSafeRecord2293(e))}
  maruDirectRecv2293={sessionId,manifest,entries,records,parts:new Map(),lastSeq:0,receivedBytes:0,importedIds:new Set(),finished:false};
  maruDirectProgress2293(0);maruDirectStatus2293(`모바일 ${manifest.count||entries.size}곡 수신 시작 · 파일 선택 없이 자동 저장합니다.`,'busy');
}
async function maruDirectProcessPacket2293(packet){
  const st=maruDirectRecv2293,seq=Number(packet?.seq||0);if(!seq||seq<=st.lastSeq)return;
  const trackId=String(packet.trackId||''),asset=String(packet.asset||''),entry=st.entries.get(trackId),record=st.records.get(trackId);if(!entry||!record||!['blob','coverBlob','videoBlob'].includes(asset))throw new Error('받은 곡 정보가 목록과 맞지 않습니다.');
  const key=`${trackId}|${asset}`,chunkIndex=Number(packet.chunkIndex||0),totalChunks=Math.max(1,Number(packet.totalChunks||1));let part=st.parts.get(key);
  if(!part){part={chunks:[],next:0,totalChunks,type:packet.type||entry.assets?.[asset]?.type||'application/octet-stream'};st.parts.set(key,part)}
  if(chunkIndex!==part.next)throw new Error(`전송 순서 오류 · ${asset} ${chunkIndex+1}/${totalChunks}`);
  const bytes=maruDirectB64ToBytes2293(packet.data);part.chunks.push(bytes);part.next++;st.receivedBytes+=bytes.byteLength;
  if(part.next>=part.totalChunks){record[asset]=new Blob(part.chunks,{type:part.type});st.parts.delete(key);
    const expected=Object.entries(entry.assets||{}).filter(([,v])=>v&&Number(v.size)>0).map(([k])=>k),ready=expected.every(k=>record[k] instanceof Blob&&record[k].size>0);
    if(ready){await broadcastDbPut(record);st.importedIds.add(trackId)}
  }
  st.lastSeq=seq;const total=Number(st.manifest?.totalBytes||0),pct=total?st.receivedBytes/total*100:0;maruDirectProgress2293(pct);maruDirectStatus2293(`PC 자동 수신 중 · ${st.importedIds.size}/${st.entries.size}곡 · ${maruSyncFormatBytes2292(st.receivedBytes)} / ${maruSyncFormatBytes2292(total)} · ${Math.round(pct)}%`,'busy');
}
async function maruDirectFinalizeReceiver2293(){
  const st=maruDirectRecv2293;if(st.finished||!st.sessionId||!st.manifest)return;const expected=(st.manifest.entries||[]).filter(e=>e.assets?.blob&&Number(e.assets.blob.size)>0).length;
  if(st.importedIds.size<expected)throw new Error(`원곡 수신이 끝나지 않았습니다 · ${st.importedIds.size}/${expected}곡`);
  const old=broadcastOrderRead(),incomingOrder=(st.manifest.order||[]).map(String).filter(id=>st.importedIds.has(id)),merged=[...incomingOrder,...old.filter(id=>!incomingOrder.includes(id))].slice(0,100);
  broadcastOrderWrite(merged);await broadcastRequestPersistentStorage();await restoreBroadcastPlaylist();st.finished=true;maruDirectProgress2293(100);maruDirectStatus2293(`✅ 모바일 방송목록 ${st.importedIds.size}곡 자동 수신 완료 · PC 다운로드 파일 없음`,'ok');toast(`📱→🖥 방송목록 ${st.importedIds.size}곡 자동 수신 완료`);
  await maruDirectPost2293(MARU_DIRECT_HELPER_LOOPBACK_2293,'/api/direct/complete',{sessionId:st.sessionId});
}
async function maruDirectPollPc2293(){
  if(maruDirectPollBusy2293||maruDirectIsMobile2293())return;maruDirectPollBusy2293=true;
  try{
    const p=await maruDirectJson2293(MARU_DIRECT_HELPER_LOOPBACK_2293,'/api/direct/poll');
    if(p.manifest&&p.sessionId&&p.sessionId!==maruDirectRecv2293.sessionId){maruDirectResetReceiver2293(p.sessionId,p.manifest);await maruDirectPost2293(MARU_DIRECT_HELPER_LOOPBACK_2293,'/api/direct/manifest-ack',{sessionId:p.sessionId})}
    if(p.packet&&p.sessionId===maruDirectRecv2293.sessionId){const seq=Number(p.packet.seq||0);if(seq>maruDirectRecv2293.lastSeq)await maruDirectProcessPacket2293(p.packet);await maruDirectPost2293(MARU_DIRECT_HELPER_LOOPBACK_2293,'/api/direct/ack',{sessionId:p.sessionId,seq})}
    if(p.ended&&p.sessionId===maruDirectRecv2293.sessionId&&!p.packetPending&&!maruDirectRecv2293.finished)await maruDirectFinalizeReceiver2293();
  }catch(e){
    // Old/offline helper is common before setup; do not spam toasts.
    const text=String(e?.message||e);if(/404|Unsupported|fetch|Failed/i.test(text)){}else console.warn('direct sync receiver 2293',e)
  }finally{maruDirectPollBusy2293=false}
}
async function maruDirectRefreshPc2293(){
  const box=document.getElementById('directSyncPcLanAddress2293');if(!box)return;
  try{const st=await maruDirectJson2293(MARU_DIRECT_HELPER_LOOPBACK_2293,'/api/status');if(!st.directSync)throw new Error('V0.22.93 이상 도우미가 필요합니다.');const urls=Array.isArray(st.lanUrls)?st.lanUrls:[];box.textContent=urls.length?`휴대폰에 입력할 PC 주소: ${urls.join(' 또는 ')}`:'PC의 Wi‑Fi/LAN 주소를 찾지 못했습니다.';maruDirectStatus2293(urls.length?'PC 자동 수신 준비 완료 · 휴대폰에 위 주소를 한 번 입력한 뒤 바로 보내기를 누르세요.':'PC 네트워크 주소를 확인해 주세요.',urls.length?'ready':'error')}
  catch(e){box.textContent='V0.22.93 이상 OBS 도우미를 먼저 실행해 주세요.';maruDirectStatus2293(`${e.message||e} · 새 도우미를 실행하면 PC 자동 수신이 켜집니다.`,'error')}
}
/* V0.22.95 — QR CLICK RELIABILITY + V0.22.94 PAIRING */
let maruQrStream2294=null,maruQrScanTimer2294=null,maruQrDetector2294=null,maruQrAutoSendUsed2294=false,maruQrLastPcUrl2294='';
function maruQrBestLan2294(urls){
  const list=[...(urls||[])].filter(Boolean);const score=u=>{try{const h=new URL(u).hostname;if(/^192\.168\./.test(h))return 0;if(/^10\./.test(h))return 1;if(/^172\.(1[6-9]|2\d|3[01])\./.test(h))return 2;return 9}catch{return 99}};
  return list.sort((a,b)=>score(a)-score(b))[0]||'';
}
function maruQrPairUrl2294(pcBase){
  const here=new URL(location.origin+location.pathname);here.searchParams.set('maruPc',pcBase);here.searchParams.set('maruAutoSend','1');here.hash='broadcastSyncCard2292';return here.toString();
}
function maruQrStopScanner2294(){
  if(maruQrScanTimer2294){clearTimeout(maruQrScanTimer2294);maruQrScanTimer2294=null}
  if(maruQrStream2294){for(const t of maruQrStream2294.getTracks())try{t.stop()}catch{};maruQrStream2294=null}
  const v=document.getElementById('directSyncQrVideo2294');if(v){try{v.pause()}catch{};v.srcObject=null}
  const box=document.getElementById('directSyncQrScanner2294');if(box)box.hidden=true;
}
async function maruQrApplyPair2294(raw,{autoSend=true}={}){
  let value=String(raw||'').trim(),pc='';
  try{
    if(/^https?:\/\//i.test(value)){
      const u=new URL(value);pc=u.searchParams.get('maruPc')||((/\:8765$/.test(u.origin))?u.origin:'');
    }else if(/^MARU-PC:/i.test(value))pc=value.replace(/^MARU-PC:/i,'').trim();
    else pc=value;
    const base=maruDirectNormalizePc2293(pc);localStorage.setItem(MARU_DIRECT_PC_KEY_2293,base);maruQrLastPcUrl2294=base;
    const input=document.getElementById('directSyncPcAddress2293');if(input)input.value=base.replace(/^http:\/\//,'').replace(/:8765$/,'');
    maruDirectStatus2293('QR에서 PC 주소를 찾았습니다. 연결 확인 중…','busy');
    await maruDirectCheckPc2293({quiet:false});
    maruDirectStatus2293('✅ QR 연결 완료 · 이 PC로 바로 보낼 준비가 됐습니다.','ready');
    if(autoSend&&!maruQrAutoSendUsed2294){maruQrAutoSendUsed2294=true;await maruDirectSleep2293(450);await maruDirectSend2293()}
    return true;
  }catch(e){maruDirectStatus2293(`QR 연결 실패 · ${e.message||e}`,'error');toast(`QR 연결 실패 · ${e.message||e}`);throw e}
}
async function maruQrStartScanner2294(){
  const overlay=document.getElementById('directSyncQrScanner2294'),video=document.getElementById('directSyncQrVideo2294'),status=document.getElementById('directSyncQrScanStatus2294');
  if(!overlay||!video)return;overlay.hidden=false;if(status)status.textContent='카메라 준비 중…';
  if(!navigator.mediaDevices?.getUserMedia){if(status)status.textContent='이 브라우저에서는 카메라를 열 수 없습니다. 아래 주소 직접 입력을 사용해 주세요.';return}
  if(!('BarcodeDetector' in window)){if(status)status.textContent='이 브라우저는 QR 자동 인식을 지원하지 않습니다. 휴대폰 기본 카메라로 PC QR을 찍어 MARU 링크를 여세요.';return}
  try{
    maruQrDetector2294=new BarcodeDetector({formats:['qr_code']});
    maruQrStream2294=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'},width:{ideal:1280},height:{ideal:720}},audio:false});video.srcObject=maruQrStream2294;await video.play();if(status)status.textContent='PC 화면의 QR을 네모 안에 맞춰 주세요.';
    const scan=async()=>{if(overlay.hidden||!maruQrStream2294)return;try{const codes=await maruQrDetector2294.detect(video);const raw=codes?.[0]?.rawValue;if(raw){if(status)status.textContent='QR 확인 완료 · PC 연결 중…';maruQrStopScanner2294();await maruQrApplyPair2294(raw,{autoSend:true});return}}catch(e){console.warn('qr scan 2294',e)}maruQrScanTimer2294=setTimeout(scan,220)};scan();
  }catch(e){console.warn('qr camera 2294',e);if(status)status.textContent=`카메라를 열지 못했습니다 · ${e.message||e}`}
}
async function maruQrShowPc2294(){
  const panel=document.getElementById('directSyncQrPanel2294'),box=document.getElementById('directSyncQrCode2294'),label=document.getElementById('directSyncQrAddress2294');if(!panel||!box)return;
  panel.hidden=false;
  box.innerHTML='<div class="qr-click-feedback-2295">QR 준비 중…<br><small>PC 주소 확인 중</small></div>';
  if(label)label.textContent='PC 주소 확인 중…';
  maruDirectStatus2293('QR 버튼 눌림 · PC 주소 확인 중…','busy');
  try{
    const st=await maruDirectJson2293(MARU_DIRECT_HELPER_LOOPBACK_2293,'/api/status');const base=maruQrBestLan2294(st.lanUrls);if(!base)throw new Error('PC Wi‑Fi 주소를 찾지 못했습니다.');maruQrLastPcUrl2294=base;const pair=maruQrPairUrl2294(base);box.innerHTML='';if(label)label.textContent=base;
    if(typeof QRCode==='function')new QRCode(box,{text:pair,width:280,height:280,colorDark:'#000000',colorLight:'#ffffff',correctLevel:QRCode.CorrectLevel.M});
    else{box.innerHTML='<div class="qr-click-error-2295">QR 생성 모듈을 불러오지 못했습니다.<br><small>아래 PC 주소를 직접 입력해 주세요.</small></div>'}
    maruDirectStatus2293('QR 준비 완료 · 휴대폰 MARU의 “📷 PC QR 찍고 바로 연결”로 찍으세요.','ready');
  }catch(e){
    if(label)label.textContent='OBS Helper 연결 필요';
    box.innerHTML='<div class="qr-click-error-2295">QR 버튼은 정상입니다.<br><small>OBS Helper를 먼저 실행한 뒤 다시 눌러 주세요.</small></div>';
    maruDirectStatus2293(`${e.message||e} · OBS 도우미가 켜져 있는지 확인하세요.`,'error');
  }
}
async function maruQrHandleLaunch2294(){
  if(!maruDirectIsMobile2293())return;const u=new URL(location.href),pc=u.searchParams.get('maruPc');if(!pc)return;const auto=u.searchParams.get('maruAutoSend')==='1';u.searchParams.delete('maruPc');u.searchParams.delete('maruAutoSend');history.replaceState(null,'',u.pathname+(u.search?u.search:'')+(u.hash||''));
  setTimeout(()=>maruQrApplyPair2294(pc,{autoSend:auto}).catch(()=>{}),650);
}
function bindMaruDirectSync2293(){
  const mobile=maruDirectIsMobile2293(),m=document.getElementById('directSyncMobile2293'),p=document.getElementById('directSyncPc2293');if(m)m.hidden=!mobile;if(p)p.hidden=mobile;
  const cancelQr=document.getElementById('directSyncQrCancel2294');if(cancelQr)cancelQr.onclick=maruQrStopScanner2294;
  if(mobile){
    const input=document.getElementById('directSyncPcAddress2293'),saved=localStorage.getItem(MARU_DIRECT_PC_KEY_2293)||'';if(input&&saved)input.value=saved.replace(/^http:\/\//,'').replace(/:8765$/,'');
    const check=document.getElementById('directSyncCheck2293'),send=document.getElementById('directSyncSend2293'),scan=document.getElementById('directSyncScanQr2294');if(check)check.onclick=()=>maruDirectCheckPc2293().catch(()=>{});if(send)send.onclick=maruDirectSend2293;if(scan)scan.onclick=maruQrStartScanner2294;
    maruDirectStatus2293('PC MARU에서 QR을 띄운 뒤 “📷 PC QR 찍고 바로 연결”만 누르면 됩니다.','idle');maruQrHandleLaunch2294();
  }else{
    const refresh=document.getElementById('directSyncPcRefresh2293'),showQr=document.getElementById('directSyncShowQr2294');if(refresh)refresh.onclick=maruDirectRefreshPc2293;if(showQr)showQr.onclick=maruQrShowPc2294;maruDirectRefreshPc2293();if(maruDirectPollTimer2293)clearInterval(maruDirectPollTimer2293);maruDirectPollTimer2293=setInterval(maruDirectPollPc2293,650);maruDirectPollPc2293();
  }
}
setTimeout(bindMaruDirectSync2293,50);


/* V0.22.96 — USB tethering live original stream; no PC song-file persistence */
const MARU_USB_PC_KEY_2296='maru-usb-pc-v2296',MARU_USB_CHUNK_BYTES_2296=1024*1024;
let maruUsbMobileSession2296='',maruUsbMobileBase2296='',maruUsbMobilePollTimer2296=null,maruUsbMobileBusy2296=false,maruUsbPcPollTimer2296=null;
let maruUsbRemoteActive2296=false,maruUsbRemoteManifest2296=null,maruUsbCurrentRequest2296='',maruUsbCurrentTrack2296='';
let maruUsbQrStream2296=null,maruUsbQrTimer2296=null,maruUsbQrDetector2296=null;

function maruUsbStatus2296(text,state='idle'){const e=document.getElementById('usbLiveStatus2296');if(!e)return;e.dataset.state=state;const b=e.querySelector('b'),s=e.querySelector('span');if(b)b.textContent=state==='ok'?'완료':state==='ready'?'준비':state==='busy'?'전송 중':state==='error'?'확인 필요':'대기';if(s)s.textContent=text}
function maruUsbProgress2296(p){const e=document.getElementById('usbLiveProgress2296');if(e)e.style.width=`${Math.max(0,Math.min(100,Number(p)||0))}%`}
function maruUsbNormalizePc2296(raw){let s=String(raw||'').trim();if(!s)throw new Error('PC USB 주소가 없습니다.');if(!/^https?:\/\//i.test(s))s='http://'+s;const u=new URL(s);u.protocol='http:';u.port=u.port||'8765';u.pathname='';u.search='';u.hash='';if(maruDirectIsMobile2293()&&/^(127\.|localhost$)/i.test(u.hostname))throw new Error('127.0.0.1은 휴대폰 자기 자신입니다. PC USB 주소를 사용하세요.');return u.origin}
function maruUsbBestUrl2296(st={}){const a=[...(st.usbUrls||[]),...(st.lanUrls||[])].filter(Boolean),score=u=>{try{const h=new URL(u).hostname;if(/^192\.168\.42\./.test(h))return 0;if(/^192\.168\.137\./.test(h))return 1;if(/^192\.168\./.test(h))return 2;if(/^172\./.test(h))return 3;if(/^10\./.test(h))return 4;return 9}catch{return 99}};return a.sort((x,y)=>score(x)-score(y))[0]||''}
async function maruUsbJson2296(base,path,opt={}){const r=await maruDirectFetch2293(base,path,opt);let d=null;try{d=await r.json()}catch{}if(!r.ok||d?.ok===false)throw new Error(d?.message||`USB Helper 오류 ${r.status}`);return d||{}}
function maruUsbPost2296(base,path,obj){return maruUsbJson2296(base,path,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(obj||{})})}
async function maruUsbManifest2296(){const ids=broadcastOrderRead();if(!ids.length)throw new Error('휴대폰 방송목록에 저장된 곡이 없습니다.');const entries=[],order=[];for(const id of ids){const r=await broadcastDbGet(id);if(!r?.blob)continue;const e=maruSyncSafeMeta2292(r);e.assets={blob:maruDirectAssetMeta2293(r.blob),coverBlob:maruDirectAssetMeta2293(r.coverBlob),videoBlob:maruDirectAssetMeta2293(r.videoBlob)};entries.push(e);order.push(String(id))}if(!entries.length)throw new Error('휴대폰 방송목록 원곡을 찾지 못했습니다.');return{version:2296,mode:'usb-live-no-pc-save',count:entries.length,order,entries,createdAt:Date.now()}}
async function maruUsbConnectMobile2296(raw){const base=maruUsbNormalizePc2296(raw);maruUsbStatus2296('USB Helper 연결 확인 중…','busy');const st=await maruUsbJson2296(base,'/api/status');if(!st.usbStream)throw new Error('V0.23.01 USB 자동 Helper가 필요합니다.');const manifest=await maruUsbManifest2296(),reg=await maruUsbPost2296(base,'/api/usb/register',{manifest});maruUsbMobileBase2296=base;maruUsbMobileSession2296=String(reg.sessionId||'');if(!maruUsbMobileSession2296)throw new Error('USB 방송 세션을 만들지 못했습니다.');localStorage.setItem(MARU_USB_PC_KEY_2296,base);const i=document.getElementById('usbLivePcAddress2296');if(i)i.value=base.replace(/^http:\/\//,'').replace(/:8765$/,'');maruUsbStatus2296(`✅ USB 연결 · ${manifest.count}곡 제목 목록만 PC에 전달 · 원곡 저장 없음`,'ready');maruUsbStartMobilePoll2296();return true}
async function maruUsbUploadAsset2296(r,asset,cmd,p){const blob=r?.[asset];if(!(blob instanceof Blob)||!blob.size)return;const totalChunks=Math.ceil(blob.size/MARU_USB_CHUNK_BYTES_2296);for(let n=0;n<totalChunks;n++){const part=blob.slice(n*MARU_USB_CHUNK_BYTES_2296,Math.min(blob.size,(n+1)*MARU_USB_CHUNK_BYTES_2296)),data=maruDirectBytesToB642293(new Uint8Array(await part.arrayBuffer()));await maruUsbPost2296(maruUsbMobileBase2296,'/api/usb/chunk',{sessionId:maruUsbMobileSession2296,requestId:cmd.requestId,trackId:cmd.trackId,asset,chunkIndex:n,totalChunks,type:blob.type||'application/octet-stream',name:asset==='blob'?(r.name||'track'):asset==='coverBlob'?(r.coverName||'cover'):(r.videoName||'video'),data});p.sent+=part.size;maruUsbProgress2296(p.total?p.sent/p.total*100:0);maruUsbStatus2296(`현재 곡 USB 전송 중 · ${maruSyncFormatBytes2292(p.sent)} / ${maruSyncFormatBytes2292(p.total)}`,'busy')}await maruUsbPost2296(maruUsbMobileBase2296,'/api/usb/asset-end',{sessionId:maruUsbMobileSession2296,requestId:cmd.requestId,trackId:cmd.trackId,asset,type:blob.type||'application/octet-stream',size:blob.size})}
async function maruUsbHandleCommand2296(cmd){if(!cmd?.requestId||!cmd?.trackId)return;const r=await broadcastDbGet(String(cmd.trackId));if(!r?.blob)throw new Error('요청한 원곡을 휴대폰에서 찾지 못했습니다.');const assets=Array.isArray(cmd.assets)?cmd.assets:['blob'],total=assets.reduce((n,a)=>n+Number(r?.[a]?.size||0),0),p={sent:0,total};maruUsbProgress2296(0);for(const a of assets)await maruUsbUploadAsset2296(r,a,cmd,p);await maruUsbPost2296(maruUsbMobileBase2296,'/api/usb/ready',{sessionId:maruUsbMobileSession2296,requestId:cmd.requestId,trackId:cmd.trackId});maruUsbProgress2296(100);maruUsbStatus2296(`✅ ${broadcastSafeTitle(r.name)} · 현재 곡 RAM 전송 완료 · 다음 요청 대기`,'ready')}
async function maruUsbMobilePoll2296(){if(!maruUsbMobileSession2296||!maruUsbMobileBase2296||maruUsbMobileBusy2296)return;maruUsbMobileBusy2296=true;try{const x=await maruUsbJson2296(maruUsbMobileBase2296,`/api/usb/mobile-command?sessionId=${encodeURIComponent(maruUsbMobileSession2296)}`);if(x.command)await maruUsbHandleCommand2296(x.command)}catch(e){console.warn(e);maruUsbStatus2296(`USB 연결 확인 필요 · ${e.message||e}`,'error')}finally{maruUsbMobileBusy2296=false}}
function maruUsbStartMobilePoll2296(){if(maruUsbMobilePollTimer2296)clearInterval(maruUsbMobilePollTimer2296);maruUsbMobilePollTimer2296=setInterval(maruUsbMobilePoll2296,500);maruUsbMobilePoll2296()}
function maruUsbPseudoTrack2296(e){return{name:e.name||'방송곡',type:e.type||'audio/mpeg',size:Number(e.size||0),lastModified:Number(e.lastModified||Date.now()),maruUsbRemote2296:true,maruUsbTrackId2296:String(e.id),maruUsbSubtitle2296:String(e.subtitleText||''),maruUsbAssets2296:e.assets||{},coverName:e.coverName||'',videoName:e.videoName||''}}
function maruUsbLoadPcManifest2296(m){if(!m?.entries?.length)return;maruUsbRemoteActive2296=true;maruUsbRemoteManifest2296=m;const map=new Map(m.entries.map(e=>[String(e.id),e])),order=(m.order||[]).map(String).filter(id=>map.has(id)),ids=order.length?order:[...map.keys()];broadcastTrackIds=ids.slice(0,100);broadcastFiles=broadcastTrackIds.map(id=>maruUsbPseudoTrack2296(map.get(id)));broadcastTrackMedia.clear();broadcastTrackIds.forEach(id=>{const e=map.get(id);setBroadcastMediaInfo(id,{coverName:e?.coverName||'',videoName:e?.videoName||'',subtitleText:e?.subtitleText||'',subtitleUpdatedAt:e?.subtitleUpdatedAt||0,type:e?.type||'',name:e?.name||''})});broadcastIndex=-1;broadcastSelectedIds.clear();refreshBroadcastListUi(`🔌 USB 모바일 방송목록 ${broadcastFiles.length}곡 · PC 원곡 저장 없음`);setTimeout(()=>document.querySelectorAll('#broadcastQueue .qrow').forEach(x=>x.classList.add('usb-remote-2296')),0);maruUsbStatus2296(`✅ 휴대폰 ${broadcastFiles.length}곡 목록 연결 · 재생할 때 현재 곡만 RAM 수신`,'ready')}
async function maruUsbPcPoll2296(){if(maruDirectIsMobile2293())return;try{const x=await maruUsbJson2296('http://127.0.0.1:8765','/api/usb/manifest');if(x.manifest?.entries?.length){const stamp=String(x.sessionId||'')+'|'+String(x.manifest.createdAt||'')+'|'+String(x.manifest.count||'');if(window.__maruUsbManifestStamp2296!==stamp){window.__maruUsbManifestStamp2296=stamp;maruUsbLoadPcManifest2296(x.manifest)}}}catch{}}
async function maruUsbRequestTrack2296(i){const f=broadcastFiles[i];if(!f?.maruUsbRemote2296)throw new Error('USB 원격 곡이 아닙니다.');const assets=['blob'];if(f.maruUsbAssets2296?.coverBlob?.size)assets.push('coverBlob');if(f.maruUsbAssets2296?.videoBlob?.size)assets.push('videoBlob');maruUsbStatus2296(`${i+1}/${broadcastFiles.length} · 휴대폰에 현재 곡 요청 중…`,'busy');const q=await maruUsbPost2296('http://127.0.0.1:8765','/api/usb/request',{trackId:f.maruUsbTrackId2296,assets}),rid=String(q.requestId||'');if(!rid)throw new Error('USB 곡 요청 실패');maruUsbCurrentRequest2296=rid;maruUsbCurrentTrack2296=f.maruUsbTrackId2296;const t=Date.now();while(true){const st=await maruUsbJson2296('http://127.0.0.1:8765',`/api/usb/track-state?requestId=${encodeURIComponent(rid)}`);maruUsbProgress2296(Number(st.progress||0));if(st.ready){const base='http://127.0.0.1:8765/api/usb/media',mk=a=>`${base}?requestId=${encodeURIComponent(rid)}&asset=${encodeURIComponent(a)}&v=${Date.now()}`;maruUsbStatus2296('✅ 현재 곡 RAM 준비 · PC 디스크 저장 없음','ready');return{source:mk('blob'),cover:st.assets?.coverBlob?.complete?mk('coverBlob'):'',video:st.assets?.videoBlob?.complete?mk('videoBlob'):''}}if(st.error)throw new Error(st.error);if(Date.now()-t>180000)throw new Error('휴대폰 원곡 전송 대기 시간이 초과되었습니다.');await maruDirectSleep2293(300)}}
async function maruUsbRelease2296(){maruUsbCurrentRequest2296='';maruUsbCurrentTrack2296='';try{await maruUsbPost2296('http://127.0.0.1:8765','/api/usb/release',{})}catch{}}
function maruUsbPairUrl2296(base){const u=new URL(location.origin+location.pathname);u.searchParams.set('maruUsbPc',base);u.hash='broadcastSyncCard2292';return u.toString()}
function maruUsbStopQr2296(){if(maruUsbQrTimer2296){clearTimeout(maruUsbQrTimer2296);maruUsbQrTimer2296=null}if(maruUsbQrStream2296){for(const t of maruUsbQrStream2296.getTracks())try{t.stop()}catch{}maruUsbQrStream2296=null}const v=document.getElementById('usbLiveQrVideo2296');if(v){try{v.pause()}catch{}v.srcObject=null}const o=document.getElementById('usbLiveQrScanner2296');if(o)o.hidden=true}
async function maruUsbApplyQr2296(raw){let s=String(raw||'').trim(),pc='';if(/^https?:\/\//i.test(s)){const u=new URL(s);pc=u.searchParams.get('maruUsbPc')||((/:8765$/.test(u.origin))?u.origin:'')}else pc=s;if(!pc)throw new Error('USB QR에서 PC 주소를 찾지 못했습니다.');maruUsbStopQr2296();return maruUsbConnectMobile2296(pc)}
async function maruUsbScanQr2296(){const o=document.getElementById('usbLiveQrScanner2296'),v=document.getElementById('usbLiveQrVideo2296'),st=document.getElementById('usbLiveQrScanStatus2296');if(!o||!v)return;o.hidden=false;if(st)st.textContent='카메라 준비 중…';if(!navigator.mediaDevices?.getUserMedia){if(st)st.textContent='카메라 사용 불가 · USB 주소 직접 입력을 사용하세요.';return}if(!('BarcodeDetector'in window)){if(st)st.textContent='QR 자동 인식 미지원 · 기본 카메라로 QR을 찍어 링크를 여세요.';return}try{maruUsbQrDetector2296=new BarcodeDetector({formats:['qr_code']});maruUsbQrStream2296=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'}},audio:false});v.srcObject=maruUsbQrStream2296;await v.play();if(st)st.textContent='PC USB QR을 네모 안에 맞춰 주세요.';const scan=async()=>{if(o.hidden||!maruUsbQrStream2296)return;try{const c=await maruUsbQrDetector2296.detect(v),raw=c?.[0]?.rawValue;if(raw){if(st)st.textContent='QR 확인 · USB 연결 중…';await maruUsbApplyQr2296(raw);return}}catch{}maruUsbQrTimer2296=setTimeout(scan,220)};scan()}catch(e){if(st)st.textContent=`카메라 실행 실패 · ${e.message||e}`}}
async function maruUsbShowQr2296(){const p=document.getElementById('usbLiveQrPanel2296'),box=document.getElementById('usbLiveQrCode2296'),lab=document.getElementById('usbLiveQrAddress2296');if(!p||!box)return;p.hidden=false;box.innerHTML='<div class="qr-click-feedback-2295">USB 주소 확인 중…</div>';try{const st=await maruUsbJson2296('http://127.0.0.1:8765','/api/status');if(!st.usbStream)throw new Error('V0.23.01 USB 자동 Helper가 필요합니다.');const base=maruUsbBestUrl2296(st);if(!base)throw new Error('USB 테더링 주소를 찾지 못했습니다. 휴대폰 USB 테더링을 먼저 켜세요.');if(lab)lab.textContent=base;box.innerHTML='';const pair=maruUsbPairUrl2296(base);if(typeof QRCode==='function')new QRCode(box,{text:pair,width:280,height:280,colorDark:'#000',colorLight:'#fff',correctLevel:QRCode.CorrectLevel.M});else box.innerHTML='<div class="qr-click-error-2295">QR 모듈 없음<br><small>'+base+'</small></div>';maruUsbStatus2296('USB QR 준비 완료 · 휴대폰에서 찍으세요.','ready')}catch(e){box.innerHTML='<div class="qr-click-error-2295">USB QR 준비 실패<br><small>'+String(e.message||e)+'</small></div>';if(lab)lab.textContent='USB 테더링 확인 필요';maruUsbStatus2296(e.message||String(e),'error')}}
async function maruUsbRefreshPc2296(){const e=document.getElementById('usbLivePcLanAddress2296');if(!e)return;try{const st=await maruUsbJson2296('http://127.0.0.1:8765','/api/status'),urls=[...(st.usbUrls||[]),...(st.lanUrls||[])];e.textContent=urls.length?`USB 연결 후보 주소: ${urls.join(' 또는 ')}`:'USB 테더링 주소를 찾지 못했습니다.';maruUsbStatus2296(urls.length?'USB Helper 준비 · USB 테더링 ON 후 QR 연결':'휴대폰 USB 테더링을 먼저 켜세요.',urls.length?'ready':'error')}catch(err){e.textContent='V0.22.96 OBS Helper를 먼저 실행해 주세요.';maruUsbStatus2296(err.message||String(err),'error')}}
function maruUsbHandleLaunch2296(){if(!maruDirectIsMobile2293())return;const u=new URL(location.href),pc=u.searchParams.get('maruUsbPc');if(!pc)return;u.searchParams.delete('maruUsbPc');history.replaceState(null,'',u.pathname+(u.search?u.search:'')+(u.hash||''));setTimeout(()=>maruUsbConnectMobile2296(pc).catch(e=>maruUsbStatus2296(e.message||String(e),'error')),650)}
function bindMaruUsb2296(){const mobile=maruDirectIsMobile2293(),m=document.getElementById('usbLiveMobile2296'),p=document.getElementById('usbLivePc2296');if(m)m.hidden=!mobile;if(p)p.hidden=mobile;if(mobile){const saved=localStorage.getItem(MARU_USB_PC_KEY_2296)||'',inp=document.getElementById('usbLivePcAddress2296');if(inp&&saved)inp.value=saved.replace(/^http:\/\//,'').replace(/:8765$/,'');document.getElementById('usbLiveScanQr2296')?.addEventListener('click',maruUsbScanQr2296);document.getElementById('usbLiveQrCancel2296')?.addEventListener('click',maruUsbStopQr2296);document.getElementById('usbLiveConnect2296')?.addEventListener('click',()=>maruUsbConnectMobile2296(inp?.value||'').catch(e=>maruUsbStatus2296(e.message||String(e),'error')));maruUsbStatus2296('USB 케이블 연결 → USB 테더링 ON → PC USB QR을 찍으세요.','idle');maruUsbHandleLaunch2296()}else{document.getElementById('usbLiveShowQr2296')?.addEventListener('click',maruUsbShowQr2296);document.getElementById('usbLiveRefresh2296')?.addEventListener('click',maruUsbRefreshPc2296);maruUsbRefreshPc2296();if(maruUsbPcPollTimer2296)clearInterval(maruUsbPcPollTimer2296);maruUsbPcPollTimer2296=setInterval(maruUsbPcPoll2296,700);maruUsbPcPoll2296()}}
setTimeout(bindMaruUsb2296,130);

const maruUsbOrigIds2296=broadcastCurrentIds;broadcastCurrentIds=function(){if(maruUsbRemoteActive2296&&broadcastTrackIds.length===broadcastFiles.length)return[...broadcastTrackIds];return maruUsbOrigIds2296()};
const maruUsbOrigOrderWrite2296=broadcastOrderWrite;broadcastOrderWrite=function(ids){if(maruUsbRemoteActive2296){broadcastTrackIds=[...(ids||[])];return}return maruUsbOrigOrderWrite2296(ids)};
const maruUsbOrigPersistStatus2296=updateBroadcastPersistStatus;updateBroadcastPersistStatus=async function(prefix=''){if(maruUsbRemoteActive2296){const e=document.getElementById('broadcastPersistStatus');if(e)e.textContent=`🔌 ${prefix||`${broadcastFiles.length}곡 USB 목록 · PC 원곡 저장 없음 · 현재 곡만 RAM 재생`}`;return}return maruUsbOrigPersistStatus2296(prefix)};
const maruUsbOrigApplyMedia2296=applyBroadcastTrackMedia;applyBroadcastTrackMedia=async function(i){const f=broadcastFiles[i];if(!f?.maruUsbRemote2296)return maruUsbOrigApplyMedia2296(i);return{cover:audienceTrackCoverUrl,video:audienceTrackVideoUrl}};
const maruUsbOrigPlay2296=playBroadcastIndex;playBroadcastIndex=async function(i){const f=broadcastFiles[i];if(!f?.maruUsbRemote2296)return maruUsbOrigPlay2296(i);if(!broadcastRunning||broadcastPaused||!f)return;broadcastIndex=i;renderBroadcastQueue();const isVideo=broadcastIsVideoFile(f),el=isVideo?document.getElementById('broadcastVideoPlayer'):document.getElementById('broadcastAudio');if(!el)return;prepareOriginalBroadcastElement2289(el);stopOtherBroadcastPlayer(el);const title=broadcastSafeTitle(f.name);try{const r=await maruUsbRequestTrack2296(i);el.src=r.source;el.muted=false;el.volume=1;el.load();document.getElementById('broadcastAudio').style.display=isVideo?'none':'block';document.getElementById('broadcastVideoPlayer').style.display=isVideo?'block':'none';audienceTrackId=f.maruUsbTrackId2296||'';audienceTrackCoverUrl=r.cover||'';audienceTrackVideoUrl=r.video||(isVideo?r.source:'');const sub=String(f.maruUsbSubtitle2296||'').trim();if(sub){const tx=document.getElementById('broadcastSubtitleText'),en=document.getElementById('broadcastSubtitleEnabled');if(tx)tx.value=sub;if(en)en.checked=true}markBroadcastRecent(f.name);document.getElementById('broadcastNow').textContent=`🔌 USB 원곡 재생 · ${i+1}/${broadcastFiles.length} · ${title} · PC 저장 없음`;document.getElementById('broadcastBadge').textContent=`USB 재생 ${i+1}/${broadcastFiles.length}`;publishAudienceState({title,trackIndex:i,status:`USB 원곡 재생 · ${i+1}/${broadcastFiles.length}`,message:audienceText(),announcement:'',cover:audienceTrackCoverUrl,video:audienceTrackVideoUrl,subtitle:audienceSubtitleState()});await el.play()}catch(e){console.error(e);maruUsbStatus2296(`재생 실패 · ${e.message||e}`,'error');toast(`USB 원곡 재생 실패 · ${e.message||e}`)}};
const maruUsbOrigStop2296=broadcastStop;broadcastStop=function(showToast=true){const r=maruUsbOrigStop2296(showToast);if(maruUsbRemoteActive2296)maruUsbRelease2296();return r};
const maruUsbOrigChooseMedia2296=chooseBroadcastTrackMedia;chooseBroadcastTrackMedia=function(i,k){if(broadcastFiles[i]?.maruUsbRemote2296)return toast('USB 방송곡의 커버/영상은 휴대폰 MARU에서 수정해 주세요.');return maruUsbOrigChooseMedia2296(i,k)};


/* =========================================================
   V0.22.98 — ONE-TOUCH BROADCAST
   One user click:
   1) open/focus MARU_OBS_LIVE popup (popup permission covered by user gesture)
   2) verify local Helper
   3) start/connect OBS and begin OBS stream
   4) use current local/USB broadcast list
   5) start original track playback
   ========================================================= */
let maruOneTouchBusy2298=false;

function maruOneTouchStatus2298(state,title,text){
  const e=document.getElementById('maruOneTouchStatus2298');
  if(!e)return;
  e.dataset.state=state||'idle';
  const b=e.querySelector('b'),s=e.querySelector('span');
  if(b)b.textContent=title||'준비';
  if(s)s.textContent=text||'';
}
function maruSleep2298(ms){return new Promise(r=>setTimeout(r,ms))}
async function maruOneTouchWaitPlaylist2298(timeout=4500){
  if(broadcastFiles?.length)return true;
  const started=Date.now();
  while(Date.now()-started<timeout){
    try{
      if(typeof maruUsbPcPoll2296==='function')await maruUsbPcPoll2296();
    }catch{}
    if(broadcastFiles?.length)return true;
    await maruSleep2298(350);
  }
  return !!broadcastFiles?.length;
}
async function maruOneTouchStart2298(){
  if(maruOneTouchBusy2298)return;
  if(broadcastRunning&&!broadcastPaused){
    toast('이미 원곡 방송이 진행 중입니다.');
    maruOneTouchStatus2298('live','🔴 방송 중','OBS와 원곡 방송이 이미 진행 중입니다.');
    return;
  }
  maruOneTouchBusy2298=true;
  const buttons=[document.getElementById('maruOneTouchStart2298'),document.getElementById('dockBroadcastStart')];
  buttons.forEach(b=>{if(b)b.disabled=true});
  try{
    setPcCaptureMode2285('window');

    // V0.22.99: browser popup is no longer required.
    // The local Helper launches a real Chrome app window for MARU_OBS_LIVE itself.
    const obsUrl2299=new URL(location.href);
    obsUrl2299.searchParams.set('mode','audience');
    obsUrl2299.searchParams.set('layout','obs');
    obsUrl2299.searchParams.set('obs','1');
    obsUrl2299.searchParams.set('v','2308');
    obsUrl2299.searchParams.delete('share');
    obsUrl2299.searchParams.delete('dual');
    obsUrl2299.searchParams.delete('from');

    maruOneTouchStatus2298('working','1/4 Helper 확인','PC Helper가 켜져 있는지 확인하고 있습니다…');

    maruOneTouchStatus2298('working','2/4 방송창 자동 실행','Helper가 MARU_OBS_LIVE 창을 직접 실행하고 OBS가 잡도록 준비합니다…');
    const helperOk=await maruWaitHelper2306(22000);
    if(!helperOk){
      throw new Error('Helper가 실행되지 않았습니다. PC-OBS-HELPER의 START-MARU.cmd를 한 번 실행해 주세요.');
    }

    const pref=saveObsAutoPrefs2286();
    const password=String(document.getElementById('obsWsPassword')?.value||'');

    maruOneTouchStatus2298('working','3/4 OBS 자동 시작','OBS 실행·MARU_OBS_LIVE 창 연결·송출 시작을 한 번에 처리 중입니다…');
    const obs=await obsHelperCall2286('/api/start',{
      obsPort:pref.port,
      obsPassword:password,
      sceneName:pref.scene,
      sourceName:'MARU_OBS_LIVE',
      windowTitle:'MARU_OBS_LIVE',
      obsUrl:obsUrl2299.toString(),
      startStream:true
    },90000);

    if(!obs.streamActive){
      setObsAutoStatus2286('ready','OBS 장면 준비됨','OBS는 연결됐지만 실제 송출이 시작되지 않았습니다. OBS/BIGO 송출 설정을 확인해 주세요.');
      throw new Error('OBS는 준비됐지만 송출이 시작되지 않았습니다. OBS의 BIGO 송출 설정을 확인해 주세요.');
    }
    setObsAutoStatus2286('live','🔴 OBS 방송 중',`송출 시작됨 · 장면 ${obs.sceneName||pref.scene} · MARU 방송창만 송출`);

    maruOneTouchStatus2298('working','4/4 원곡 시작','방송목록을 확인하고 첫 곡을 준비하고 있습니다…');
    const hasList=await maruOneTouchWaitPlaylist2298();
    if(!hasList){
      throw new Error('방송목록이 없습니다. 휴대폰 USB 목록을 먼저 연결하거나 방송곡을 추가해 주세요.');
    }

    if(broadcastPaused){
      await broadcastStartOrResume();
    }else if(!broadcastRunning){
      await broadcastStart(resolveAudienceStartIndex2255());
    }

    maruOneTouchStatus2298('live','🔴 원터치 방송 중',`OBS 송출 + MARU 원곡 재생 시작 · ${broadcastFiles.length}곡 방송목록`);
    toast('원터치 방송을 시작했습니다.');
    updateBroadcastDock();
  }catch(e){
    const msg=String(e?.message||e||'원터치 방송 시작 실패');
    maruOneTouchStatus2298('error','원터치 시작 실패',msg);
    toast('원터치 방송 실패 · '+msg.slice(0,110));
  }finally{
    maruOneTouchBusy2298=false;
    buttons.forEach(b=>{if(b)b.disabled=false});
  }
}
async function maruOneTouchStop2298(){
  if(maruOneTouchBusy2298)return;
  maruOneTouchBusy2298=true;
  const stop=document.getElementById('maruOneTouchStop2298');
  if(stop)stop.disabled=true;
  try{
    maruOneTouchStatus2298('working','전체 방송 종료 중','원곡 재생과 OBS 송출을 순서대로 종료하고 있습니다…');
    try{if(broadcastRunning)broadcastStop(false)}catch{}
    try{await stopObsAutoBroadcast2286()}catch{}
    maruOneTouchStatus2298('idle','방송 종료','원곡 재생과 OBS 송출을 종료했습니다. 다음 방송은 원터치 시작만 누르세요.');
    toast('전체 방송을 종료했습니다.');
    updateBroadcastDock();
  }finally{
    maruOneTouchBusy2298=false;
    if(stop)stop.disabled=false;
  }
}
function setupMaruOneTouch2298(){
  const start=document.getElementById('maruOneTouchStart2298');
  const stop=document.getElementById('maruOneTouchStop2298');
  if(start)start.onclick=maruOneTouchStart2298;
  if(stop)stop.onclick=maruOneTouchStop2298;

  // Bottom fixed start button is now the same one-touch command.
  const dock=document.getElementById('dockBroadcastStart');
  if(dock)dock.onclick=()=>{
    if(broadcastRunning&&broadcastPaused)return broadcastStartOrResume();
    return maruOneTouchStart2298();
  };
  updateBroadcastDock();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setupMaruOneTouch2298,{once:true});
else setupMaruOneTouch2298();


/* =========================================================
   V0.23.00 — OBS USB MEDIA/AUDIO RELAY
   The dedicated MARU_OBS_LIVE window pulls the current RAM track
   directly from Helper. This avoids BroadcastChannel/profile issues
   and makes OBS capture the real cover/video AND original audio.
   ========================================================= */
let maruObsUsbRelayTimer2300=null;
let maruObsUsbRelayRequest2300='';
let maruObsUsbRelayAudio2300=null;
let maruObsUsbRelayVisual2300='';
let maruObsUsbRelayBusy2300=false;

function maruObsIsOutput2300(){
  const q=new URLSearchParams(location.search);
  return q.get('mode')==='audience'&&(q.get('layout')==='obs'||q.get('obs')==='1');
}
function maruObsRelayUrl2300(requestId,asset){
  return `http://127.0.0.1:8765/api/usb/media?requestId=${encodeURIComponent(requestId)}&asset=${encodeURIComponent(asset)}&relay=2300`;
}
function maruObsRelayAudioEl2300(){
  if(maruObsUsbRelayAudio2300&&document.contains(maruObsUsbRelayAudio2300))return maruObsUsbRelayAudio2300;
  let a=document.getElementById('maruObsUsbAudio2300');
  if(!a){
    a=document.createElement('audio');
    a.id='maruObsUsbAudio2300';
    a.preload='auto';
    a.autoplay=true;
    a.controls=false;
    a.style.cssText='position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;left:-10px;bottom:-10px';
    document.body.appendChild(a);
  }
  maruObsUsbRelayAudio2300=a;
  return a;
}
function maruObsRelayStop2300(clearVisual=false){
  const a=maruObsRelayAudioEl2300();
  try{a.pause();a.removeAttribute('src');a.load()}catch{}
  const v=document.getElementById('audienceVideo');
  if(v){try{v.pause()}catch{};if(clearVisual){try{v.removeAttribute('src');v.load()}catch{}}}
  if(clearVisual)maruObsUsbRelayVisual2300='';
}
async function maruObsRelayPlaySafe2300(el){
  if(!el)return false;
  try{
    const p=el.play();
    if(p&&typeof p.then==='function')await p;
    return true;
  }catch(e){
    console.warn('OBS relay autoplay',e);
    return false;
  }
}
function maruObsRelayEntryType2300(cur){
  return String(cur?.entry?.type||cur?.assets?.blob?.type||'').toLowerCase();
}
async function maruObsRelayRender2300(cur){
  if(!cur?.ready||!cur?.requestId)return;
  const rid=String(cur.requestId);
  const entry=cur.entry||{};
  const assets=cur.assets||{};
  const titleText=String(entry.name||cur.title||'MARU MUSIC').replace(/\.[^.]+$/,'');
  const title=document.getElementById('audienceTitle');
  if(title){title.textContent=titleText;try{applyAudienceTitleClass2279(title,titleText)}catch{}}
  const ann=document.getElementById('audienceAnnouncement');
  if(ann){ann.textContent='';ann.hidden=true}
  if(entry.subtitleText){
    try{applyAudienceSubtitle({subtitle:{enabled:true,text:String(entry.subtitleText)}})}catch{}
  }

  const v=document.getElementById('audienceVideo');
  const img=document.getElementById('audienceCover');
  const ph=document.getElementById('audienceCoverPlaceholder');
  const imgBg=document.getElementById('audienceCoverBg');
  const vidBg=document.getElementById('audienceVideoBg');
  const wrap=document.querySelector('.audience-cover-wrap,.audience-media-wrap');
  const audio=maruObsRelayAudioEl2300();
  const originalType=maruObsRelayEntryType2300(cur);
  const originalIsVideo=/^video\//.test(originalType)||/\.(mp4|m4v|mov|webm)$/i.test(String(entry.name||''));
  const source=maruObsRelayUrl2300(rid,'blob');
  const visualVideo=assets.videoBlob?.complete?maruObsRelayUrl2300(rid,'videoBlob'):'';
  const cover=assets.coverBlob?.complete?maruObsRelayUrl2300(rid,'coverBlob'):'';

  // Separate per-song visual video + original MP3/audio.
  if(visualVideo&&v){
    const key='visual:'+rid;
    if(maruObsUsbRelayVisual2300!==key){
      maruObsUsbRelayVisual2300=key;
      try{v.pause()}catch{}
      v.src=visualVideo;v.muted=true;v.defaultMuted=true;v.loop=true;v.playsInline=true;
      v.style.display='block';v.style.visibility='visible';
      if(img)img.style.display='none';if(ph)ph.style.display='none';
      try{v.load()}catch{}
      await maruObsRelayPlaySafe2300(v);
    }
    if(imgBg)imgBg.style.display='none';
    if(wrap){wrap.style.backgroundImage='';wrap.style.backgroundColor='#000'}
  }else if(originalIsVideo&&v){
    // Original file itself is MP4: its video is also the audible source.
    const key='original-video:'+rid;
    if(maruObsUsbRelayVisual2300!==key){
      maruObsUsbRelayVisual2300=key;
      try{audio.pause();audio.removeAttribute('src');audio.load()}catch{}
      try{v.pause()}catch{}
      v.src=source;v.muted=false;v.defaultMuted=false;v.volume=1;v.loop=false;v.playsInline=true;
      v.style.display='block';v.style.visibility='visible';
      if(img)img.style.display='none';if(ph)ph.style.display='none';
      try{v.load()}catch{}
      await maruObsRelayPlaySafe2300(v);
    }
    if(imgBg)imgBg.style.display='none';
    if(wrap){wrap.style.backgroundImage='';wrap.style.backgroundColor='#000'}
  }else{
    // MP3/audio: show cover (or MARU placeholder) and play original audio in this OBS window.
    if(v){try{v.pause()}catch{};v.style.display='none'}
    if(cover&&img){
      img.src=cover;img.style.display='block';if(ph)ph.style.display='none';
      if(imgBg){imgBg.src=cover;imgBg.style.display='block'}
      if(wrap){wrap.style.backgroundImage=`url("${cover}")`;wrap.style.backgroundSize='cover';wrap.style.backgroundPosition='center'}
    }else{
      if(img)img.style.display='none';
      if(imgBg)imgBg.style.display='none';
      if(ph)ph.style.display='flex';
      if(wrap){wrap.style.backgroundImage='';wrap.style.backgroundColor='#171126'}
    }
    const audioKey='audio:'+rid;
    if(maruObsUsbRelayVisual2300!==audioKey){
      maruObsUsbRelayVisual2300=audioKey;
      try{audio.pause()}catch{}
      audio.src=source;audio.muted=false;audio.defaultMuted=false;audio.volume=1;audio.preload='auto';
      try{audio.load()}catch{}
      if(String(cur.playState||'playing')!=='paused')await maruObsRelayPlaySafe2300(audio);
    }
  }

  const state=String(cur.playState||'playing');
  if(state==='paused'){
    try{audio.pause()}catch{};try{v?.pause()}catch{}
  }else if(state==='playing'||state==='ready'){
    if(originalIsVideo&&!visualVideo)await maruObsRelayPlaySafe2300(v);
    else{
      await maruObsRelayPlaySafe2300(audio);
      if(visualVideo)await maruObsRelayPlaySafe2300(v);
    }
  }
}
async function maruObsUsbRelayPoll2300(){
  if(!maruObsIsOutput2300()||maruObsUsbRelayBusy2300)return;
  maruObsUsbRelayBusy2300=true;
  try{
    const r=await fetch('http://127.0.0.1:8765/api/usb/current?relay=2300',{cache:'no-store'});
    if(!r.ok)throw new Error(`Helper ${r.status}`);
    const cur=await r.json();
    if(!cur?.requestId){
      if(maruObsUsbRelayRequest2300){maruObsUsbRelayRequest2300='';maruObsRelayStop2300(true)}
      return;
    }
    if(cur.ready){
      document.body.classList.add('obs-usb-relay-2300');
      if(maruObsUsbRelayRequest2300!==String(cur.requestId)){
        maruObsUsbRelayRequest2300=String(cur.requestId);
        maruObsUsbRelayVisual2300='';
      }
      await maruObsRelayRender2300(cur);
    }
  }catch(e){
    console.warn('OBS USB relay poll',e);
  }finally{
    maruObsUsbRelayBusy2300=false;
  }
}
function maruObsUsbRelayStart2300(){
  if(!maruObsIsOutput2300())return;
  if(maruObsUsbRelayTimer2300)clearInterval(maruObsUsbRelayTimer2300);
  maruObsUsbRelayTimer2300=setInterval(maruObsUsbRelayPoll2300,400);
  maruObsUsbRelayPoll2300();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(maruObsUsbRelayStart2300,250),{once:true});
else setTimeout(maruObsUsbRelayStart2300,250);

/* V0.23.00 remote USB playback:
   The control page is muted (for reliable autoplay/timing).
   The dedicated OBS window is the audible source. */
async function maruUsbSetPlayState2300(state){
  try{
    await maruUsbPost2296('http://127.0.0.1:8765','/api/usb/play-state',{
      requestId:maruUsbCurrentRequest2296||'',
      trackId:maruUsbCurrentTrack2296||'',
      state:String(state||'')
    });
  }catch(e){console.warn('usb play state',e)}
}
playBroadcastIndex=async function(i){
  const f=broadcastFiles[i];
  if(!f?.maruUsbRemote2296)return maruUsbOrigPlay2296(i);
  if(!broadcastRunning||broadcastPaused||!f)return;
  broadcastIndex=i;renderBroadcastQueue();
  const isVideo=broadcastIsVideoFile(f);
  const el=isVideo?document.getElementById('broadcastVideoPlayer'):document.getElementById('broadcastAudio');
  if(!el)return;
  prepareOriginalBroadcastElement2289(el);stopOtherBroadcastPlayer(el);
  const title=broadcastSafeTitle(f.name);
  try{
    const r=await maruUsbRequestTrack2296(i);
    el.src=r.source;
    // Muted playback is allowed after long async one-touch setup and still gives us onended timing.
    el.muted=true;el.defaultMuted=true;el.volume=0;
    el.load();
    document.getElementById('broadcastAudio').style.display=isVideo?'none':'block';
    document.getElementById('broadcastVideoPlayer').style.display=isVideo?'block':'none';
    audienceTrackId=f.maruUsbTrackId2296||'';
    audienceTrackCoverUrl=r.cover||'';
    audienceTrackVideoUrl=r.video||(isVideo?r.source:'');
    const sub=String(f.maruUsbSubtitle2296||'').trim();
    if(sub){
      const tx=document.getElementById('broadcastSubtitleText'),en=document.getElementById('broadcastSubtitleEnabled');
      if(tx)tx.value=sub;if(en)en.checked=true;
    }
    markBroadcastRecent(f.name);
    document.getElementById('broadcastNow').textContent=`🔌 USB 원곡 방송 · ${i+1}/${broadcastFiles.length} · ${title} · OBS창에서 원곡 출력`;
    document.getElementById('broadcastBadge').textContent=`USB 방송 ${i+1}/${broadcastFiles.length}`;
    publishAudienceState({title,trackIndex:i,status:`USB 원곡 방송 · ${i+1}/${broadcastFiles.length}`,message:audienceText(),announcement:'',cover:audienceTrackCoverUrl,video:audienceTrackVideoUrl,subtitle:audienceSubtitleState()});
    await el.play();
    await maruUsbSetPlayState2300('playing');
  }catch(e){
    console.error(e);
    maruUsbStatus2296(`재생 실패 · ${e.message||e}`,'error');
    toast(`USB 원곡 방송 실패 · ${e.message||e}`);
  }
};

const maruBroadcastPause2300=broadcastPause;
broadcastPause=function(){
  maruBroadcastPause2300();
  if(maruUsbRemoteActive2296)maruUsbSetPlayState2300('paused');
};
const maruBroadcastResume2300=broadcastStartOrResume;
broadcastStartOrResume=async function(){
  const wasPaused=broadcastPaused;
  const r=await maruBroadcastResume2300();
  if(wasPaused&&maruUsbRemoteActive2296)maruUsbSetPlayState2300('playing');
  return r;
};
const maruBroadcastStop2300=broadcastStop;
broadcastStop=function(showToast=true){
  if(maruUsbRemoteActive2296)maruUsbSetPlayState2300('stopped');
  return maruBroadcastStop2300(showToast);
};
setTimeout(()=>{
  const p=document.getElementById('broadcastPauseBtn');
  if(p)p.onclick=()=>broadcastPause();
},250);


/* =========================================================
   V0.23.01 — ADB USB AUTO BRIDGE
   After one-time Android USB debugging authorization:
   phone MARU -> http://127.0.0.1:8765 -> adb reverse -> PC Helper
   No USB tethering, no MTP/file-transfer mode, no QR, no address input.
   ========================================================= */
let maruUsbAutoRetry2301=null;
let maruUsbAutoConnected2301=false;

async function maruUsbAutoConnect2301(){
  if(!maruDirectIsMobile2293()||maruUsbAutoConnected2301)return;
  try{
    maruUsbStatus2296('USB 케이블 자동 연결 확인 중…','busy');
    await maruUsbConnectMobile2296('http://127.0.0.1:8765');
    maruUsbAutoConnected2301=true;
    maruUsbStatus2296('✅ USB 자동 연결 완료 · 테더링/QR/주소 입력 없음','ready');
    if(maruUsbAutoRetry2301){clearInterval(maruUsbAutoRetry2301);maruUsbAutoRetry2301=null}
  }catch(e){
    const msg=String(e?.message||e||'');
    if(/failed to fetch|network|load failed|fetch/i.test(msg)){
      maruUsbStatus2296('USB 케이블을 연결하세요. 처음 사용이면 USB 디버깅 허용 창에서 허용을 한 번 눌러 주세요.','idle');
    }else{
      maruUsbStatus2296(`USB 자동 연결 대기 · ${msg}`,'idle');
    }
  }
}
function maruUsbOpenDevSettings2301(){
  try{
    location.href='intent:#Intent;action=android.settings.APPLICATION_DEVELOPMENT_SETTINGS;end';
  }catch{
    toast('설정 → 개발자 옵션 → USB 디버깅을 켜 주세요.');
  }
}
async function maruUsbAutoPcState2301(){
  if(maruDirectIsMobile2293())return;
  const box=document.getElementById('usbAutoBridgeState2301');
  try{
    const x=await maruUsbJson2296('http://127.0.0.1:8765','/api/adb/status');
    const state=String(x.state||'unknown');
    const map={
      ready:'✅ 휴대폰 USB 자동 연결 준비 완료',
      unauthorized:'📱 휴대폰에서 “USB 디버깅 허용”을 한 번 눌러 주세요',
      no_device:'🔌 휴대폰 USB 케이블을 연결하세요',
      adb_missing:'⚙ 처음 한 번 1-ONE-TOUCH-SETUP.bat를 실행해 주세요',
      starting:'USB 자동 연결 준비 중…',
      error:'USB 자동 연결 확인 필요'
    };
    if(box)box.textContent=map[state]||`USB 상태: ${state}`;
    maruUsbStatus2296(map[state]||`USB 상태: ${state}`,state==='ready'?'ready':state==='error'?'error':'idle');
  }catch(e){
    if(box)box.textContent='PC Helper를 먼저 실행해 주세요.';
  }
}
function bindMaruUsbAuto2301(){
  const mobile=maruDirectIsMobile2293();
  if(mobile){
    document.getElementById('usbAutoDevSettings2301')?.addEventListener('click',maruUsbOpenDevSettings2301);
    maruUsbAutoConnect2301();
    if(maruUsbAutoRetry2301)clearInterval(maruUsbAutoRetry2301);
    maruUsbAutoRetry2301=setInterval(maruUsbAutoConnect2301,2200);
  }else{
    document.getElementById('usbAutoBridgeRefresh2301')?.addEventListener('click',maruUsbAutoPcState2301);
    maruUsbAutoPcState2301();
    setInterval(maruUsbAutoPcState2301,2500);
  }
}
setTimeout(bindMaruUsbAuto2301,350);


/* =========================================================
   V0.23.07 — STABLE LIFETIME
   - "전체 방송 종료": music + OBS stream only. Helper/ADB stay alive.
   - "MARU 완전 종료": music + OBS stream -> Helper/ADB/Supervisor intentional stop.
   ========================================================= */
let maruCompleteExitBusy2304=false;

async function maruCompleteExit2304(){
  if(maruCompleteExitBusy2304)return;
  const btn=document.getElementById('maruCompleteExit2304');
  const ok=confirm('MARU를 완전히 종료할까요?\n\n방송·OBS 송출을 종료하고 PC Helper와 USB 자동 연결도 종료합니다.');
  if(!ok)return;
  maruCompleteExitBusy2304=true;
  if(btn)btn.disabled=true;
  try{
    maruOneTouchStatus2298('working','MARU 완전 종료 중','방송을 먼저 안전하게 끈 뒤 Helper와 USB 연결을 종료합니다…');

    try{if(broadcastRunning)broadcastStop(false)}catch{}
    try{await stopObsAutoBroadcast2286()}catch{}

    try{
      await obsHelperCall2286('/api/maru/complete-stop',{reason:'user-complete-exit'},7000);
    }catch(e){
      // If the helper stops immediately after sending the response, fetch can race the shutdown.
      const m=String(e?.message||e||'');
      if(!/fetch|network|failed|abort|closed/i.test(m))throw e;
    }

    maruOneTouchStatus2298('idle','MARU 완전 종료','방송·Helper·USB 자동 연결을 모두 종료했습니다. 다시 사용할 때 START-MARU.bat를 실행하세요.');
    toast('MARU를 완전히 종료했습니다.');
    setTimeout(()=>{try{window.close()}catch{}},900);
  }catch(e){
    const msg=String(e?.message||e||'완전 종료 실패');
    maruOneTouchStatus2298('error','완전 종료 확인 필요',msg);
    toast('MARU 완전 종료 확인 필요 · '+msg.slice(0,100));
  }finally{
    maruCompleteExitBusy2304=false;
    if(btn)btn.disabled=false;
  }
}

function bindMaruCompleteExit2304(){
  document.getElementById('maruCompleteExit2304')?.addEventListener('click',maruCompleteExit2304);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bindMaruCompleteExit2304,{once:true});
else bindMaruCompleteExit2304();

