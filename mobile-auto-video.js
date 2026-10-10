(function(){
'use strict';
if(window.__MARU_AUTO_VIDEO_PLATFORM__) return;
window.__MARU_AUTO_VIDEO_PLATFORM__=true;

const VERSION='0.24.3';
const state={images:[],imageUrls:[],audioFile:null,audioBuffer:null,scenes:[],previewIndex:0,recording:false,preparing:false,preparedFile:null,lastAutoTitle:'',lastAutoLyrics:''};

function qs(id){return document.getElementById(id);}
function escapeHtml(s){return String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
function clamp(n,a,b){return Math.max(a,Math.min(b,n));}
function fmt(sec){sec=Math.max(0,Number(sec)||0);const m=Math.floor(sec/60),s=Math.floor(sec%60);return m+':'+String(s).padStart(2,'0');}
function setStatus(msg,type='idle'){
  const el=qs('autoVideoStatus'); if(!el)return;
  el.dataset.state=type; el.innerHTML='<b>'+({ready:'완료',busy:'작업 중',error:'확인 필요',idle:'대기'}[type]||'상태')+'</b><span>'+escapeHtml(msg)+'</span>';
}

function injectStyles(){
  if(qs('maruAutoVideoStyle'))return;
  const st=document.createElement('style'); st.id='maruAutoVideoStyle';
  st.textContent=`
  #autoVideoPlatform{scroll-margin-top:10px}
  .auto-video-layout{display:grid;grid-template-columns:minmax(0,1fr) 290px;gap:16px;align-items:start}
  .auto-video-form{display:grid;gap:10px}
  .auto-video-form textarea{min-height:180px}
  .auto-video-preview-wrap{position:sticky;top:10px}
  #autoVideoCanvas{display:block;width:100%;max-width:270px;aspect-ratio:9/16;margin:0 auto;border-radius:18px;background:#090710;border:1px solid #4b3d68;box-shadow:0 14px 40px rgba(0,0,0,.28)}
  .auto-video-scenes{display:grid;gap:10px;margin-top:12px}
  .auto-video-scene{padding:12px;border:1px solid #403653;border-radius:14px;background:#151126}
  .auto-video-scene-head{display:flex;justify-content:space-between;gap:8px;align-items:center}
  .auto-video-scene h4{margin:0;font-size:14px}
  .auto-video-scene p{margin:7px 0 0;line-height:1.5;font-size:13px;color:#d8cfea}
  .auto-video-scene small{display:block;margin-top:7px;color:#a99dbd}
  .auto-video-actions{display:flex;flex-wrap:wrap;gap:8px}
  .auto-video-actions button,.auto-video-actions label{flex:1 1 150px}
  .auto-video-file{display:none}
  .auto-video-file-label{display:flex;align-items:center;justify-content:center;min-height:44px;padding:10px 12px;border-radius:10px;background:#32264a;border:1px solid #6b5b89;color:#fff;font-weight:700;cursor:pointer}
  .auto-video-mini{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
  .auto-video-progress{height:9px;background:#211a31;border-radius:999px;overflow:hidden;border:1px solid #514269;margin-top:8px}
  .auto-video-progress i{display:block;height:100%;width:0;background:linear-gradient(90deg,#6da8ff,#ba89ff);transition:width .15s}
  @media(max-width:760px){.auto-video-layout{grid-template-columns:1fr}.auto-video-preview-wrap{position:static}.auto-video-mini{grid-template-columns:1fr 1fr}#autoVideoCanvas{max-width:250px}}
  `;
  document.head.appendChild(st);
}

function injectUI(){
  injectStyles();
  const grid=document.querySelector('#coreLauncher .core-launcher-grid');
  if(grid && !qs('openAutoVideoPlatform')){
    const b=document.createElement('button'); b.type='button'; b.id='openAutoVideoPlatform'; b.className='primary'; b.textContent='🎬 자동 영상 만들기';
    b.addEventListener('click',()=>{
      const panel=qs('autoVideoPlatform');
      if(!panel)return;
      document.querySelectorAll('main>.card.core-panel-open').forEach(el=>el.classList.remove('core-panel-open'));
      panel.classList.add('core-panel-open');
      panel.classList.remove('collapsed');
      panel.scrollIntoView({behavior:'smooth',block:'start'});
    });
    grid.appendChild(b);
  }
  if(qs('autoVideoPlatform'))return;
  const main=document.querySelector('main'); if(!main)return;
  const section=document.createElement('section'); section.className='card collapsible-card'; section.id='autoVideoPlatform';
  section.innerHTML=`
    <div class="section-title"><div><h2>🎬 MARU 자동 영상 제작</h2><p>가사를 읽어 장면·배경·시간·분위기를 자동 구성하고 9:16 영상을 만듭니다.</p></div><strong>V${VERSION}</strong></div>
    <div class="auto-video-layout">
      <div class="auto-video-form">
        <label>영상 제목 · 노래 파일명에서 자동<input id="autoVideoTitle" type="text" placeholder="노래를 고르면 자동 입력됩니다"></label>
        <label>가사 · 노래 음성에서 AI 자동 인식<textarea id="autoVideoLyrics" placeholder="노래를 고르면 가사가 자동으로 들어옵니다. 필요할 때만 직접 고치세요."></textarea></label>
        <div class="auto-video-mini">
          <label>화면 비율<select id="autoVideoRatio"><option value="9:16" selected>9:16 세로 · Shorts/BIGO</option><option value="1:1">1:1 정사각</option><option value="16:9">16:9 가로 · YouTube</option></select></label>
          <label>장면 길이<select id="autoVideoSceneSeconds"><option value="4">빠르게 · 약 4초</option><option value="6" selected>보통 · 약 6초</option><option value="8">느리게 · 약 8초</option></select></label>
        </div>
        <div class="auto-video-actions">
          <label class="auto-video-file-label" for="autoVideoImages">🖼 내 사진 추가 · 선택사항</label><input id="autoVideoImages" class="auto-video-file" type="file" multiple accept="image/*">
          <label class="auto-video-file-label" for="autoVideoAudio">🎵 노래 하나 선택 · 제목/가사 자동</label><input id="autoVideoAudio" class="auto-video-file" type="file" accept="audio/*,.mp3,.wav,.m4a,.aac,.ogg,.flac">
        </div>
        <button id="autoVideoOneTouch" type="button" class="primary" style="min-height:62px;font-size:17px">✨ 준비된 노래로 자동 영상 만들기</button>
        <div class="auto-video-actions"><button id="autoVideoAnalyze" type="button" class="secondary">🧠 장면 먼저 확인</button><button id="autoVideoPreview" type="button" class="secondary">▶ 미리보기</button><button id="autoVideoExport" type="button" class="primary">⬇ 영상 만들기</button></div>
        <div id="autoVideoStatus" class="analysis-box" data-state="idle"><b>대기</b><span>노래 하나만 선택하세요. 제목·가사·장면을 자동으로 준비합니다. 사진은 선택사항입니다.</span></div>
        <div class="auto-video-progress"><i id="autoVideoProgress"></i></div>
        <div id="autoVideoScenes" class="auto-video-scenes"></div>
      </div>
      <div class="auto-video-preview-wrap">
        <canvas id="autoVideoCanvas" width="540" height="960" aria-label="자동 영상 미리보기"></canvas>
        <small style="display:block;text-align:center;margin-top:8px">휴대폰 출력 기본값 · 540×960 렌더링 / 9:16</small>
      </div>
    </div>
  `;
  const lib=qs('songLibrary'); if(lib) main.insertBefore(section,lib); else main.appendChild(section);
  bind();
  drawScene(0,0);
}

function keywordInfo(text){
  const t=String(text||'').toLowerCase();
  const places=[
    [['바다','해변','파도','sea','ocean','海','海边'],'바다·해변'],
    [['산','설산','정상','mountain','snow mountain','雪山'],'산·고원'],
    [['공원','벤치','park','公园'],'공원'],
    [['도시','거리','강남','city','street','城市','街'],'도시 거리'],
    [['기차','열차','역','train','station','火车','车站'],'기차·역'],
    [['집','방','창문','home','room','家','房间'],'실내·집'],
    [['카페','커피','cafe','coffee','咖啡'],'카페'],
    [['강변','강','river','江','河'],'강변'],
    [['하늘','구름','sky','cloud','天空','云'],'넓은 하늘'],
    [['가을','은행잎','단풍','autumn','fall','秋'],'가을 풍경'],
    [['눈','설원','snow','雪'],'눈 내리는 풍경'],
    [['비','우산','rain','雨'],'비 오는 거리'],
    [['밤','별','달','night','moon','star','夜','月'],'밤하늘']
  ];
  const moods=[
    [['사랑','좋아','연인','키스','love','爱'],'따뜻한 로맨스'],
    [['그리움','보고 싶','기다','miss','思念','想念'],'그리움'],
    [['슬프','눈물','이별','sad','泪','离别'],'애절함'],
    [['웃','행복','기분이 좋','happy','smile','笑'],'밝고 편안함'],
    [['달려','강한','폭발','긴장','run','strong'],'긴장감·에너지'],
    [['새벽','고요','조용','dawn','quiet','清晨'],'고요함'],
    [['희망','다시','새로운','hope','希望'],'희망적']
  ];
  let place='노래 분위기에 맞는 시네마틱 배경', mood='감성적';
  for(const [keys,val] of places){if(keys.some(k=>t.includes(k))){place=val;break;}}
  for(const [keys,val] of moods){if(keys.some(k=>t.includes(k))){mood=val;break;}}
  let time='낮';
  if(/밤|새벽|달|별|night|dawn|夜|月/.test(t)) time='야간/새벽';
  else if(/노을|석양|저녁|sunset|夕阳|晚霞/.test(t)) time='노을/저녁';
  return {place,mood,time};
}

function splitScenes(raw){
  const text=String(raw||'').replace(/\r/g,'').trim();
  if(!text)return [];
  const lines=text.split('\n').map(s=>s.trim()).filter(Boolean);
  const scenes=[]; let section='Scene', bucket=[];
  const flush=()=>{if(bucket.length){scenes.push({section,lyrics:bucket.join('\n')});bucket=[];}};
  for(const line of lines){
    const m=line.match(/^\[([^\]]+)\]$/);
    if(m){flush();section=m[1];continue;}
    bucket.push(line);
    if(bucket.length>=2) flush();
  }
  flush();
  return scenes;
}

async function loadAudio(file){
  if(!file){state.audioBuffer=null;return;}
  try{
    setStatus('노래 길이를 읽고 있습니다.','busy');
    const ab=await file.arrayBuffer();
    const ctx=new (window.AudioContext||window.webkitAudioContext)();
    state.audioBuffer=await ctx.decodeAudioData(ab.slice(0));
    await ctx.close();
    setStatus('노래 '+fmt(state.audioBuffer.duration)+' · 장면 길이에 자동 맞춤','ready');
  }catch(err){
    state.audioBuffer=null;
    setStatus('음원 길이를 읽지 못했습니다. 장면 기본 길이로 영상을 만듭니다.','error');
  }
}

function titleFromAudio(file){
  return String(file?.name||'').replace(/\.[^.]+$/,'').replace(/[_-]+/g,' ').replace(/\s+/g,' ').trim()||'MARU MUSIC';
}

async function prepareSong(file){
  if(!file||state.preparing)return false;
  if(state.preparedFile===file&&state.scenes.length)return true;
  state.preparing=true;
  const titleEl=qs('autoVideoTitle'),lyricsEl=qs('autoVideoLyrics');
  try{
    const autoTitle=titleFromAudio(file);
    if(titleEl&&(!titleEl.value.trim()||titleEl.value===state.lastAutoTitle))titleEl.value=autoTitle;
    state.lastAutoTitle=autoTitle;
    await loadAudio(file);
    if(!lyricsEl)throw new Error('가사 입력 화면을 찾지 못했습니다');
    if(!lyricsEl.value.trim()||lyricsEl.value===state.lastAutoLyrics){
      if(typeof window.maruTranscribeAudioFile2276!=='function')throw new Error('AI 가사 엔진을 불러오지 못했습니다. 앱을 새로 열어 주세요');
      const lyrics=await window.maruTranscribeAudioFile2276(file,msg=>setStatus(msg,'busy'));
      lyricsEl.value=lyrics;
      state.lastAutoLyrics=lyrics;
    }
    analyze();
    state.preparedFile=file;
    setStatus('제목·가사·'+state.scenes.length+'개 장면 자동 준비 완료 · 아래 영상 만들기 버튼을 누르세요.','ready');
    return true;
  }catch(err){
    state.preparedFile=null;
    setStatus('가사 자동 인식 실패 · '+(err?.message||String(err))+' · 가사 칸에 직접 붙여넣어도 됩니다.','error');
    return false;
  }finally{state.preparing=false;}
}

function analyze(){
  const raw=qs('autoVideoLyrics')?.value||'';
  let base=splitScenes(raw);
  if(!base.length){setStatus('가사 또는 영상 설명을 먼저 입력하세요.','error');return;}
  const defaultSec=Number(qs('autoVideoSceneSeconds')?.value||6);
  const total=state.audioBuffer?.duration||base.length*defaultSec;
  const per=total/base.length;
  state.scenes=base.map((s,i)=>{
    const info=keywordInfo(s.lyrics+' '+s.section);
    return {...s,index:i,start:i*per,end:(i+1)*per,duration:per,...info,
      prompt:`${info.place}, ${info.time}, ${info.mood}, 인물과 배경이 자연스럽게 연결되는 영화 같은 장면, 세로 영상 구도, 과한 글자 없음`
    };
  });
  renderScenes();
  state.previewIndex=0; drawScene(0,0);
  setStatus(state.scenes.length+'개 장면으로 자동 구성했습니다. 이미지 '+state.images.length+'장과 순서대로 연결됩니다.','ready');
}

function renderScenes(){
  const box=qs('autoVideoScenes'); if(!box)return;
  if(!state.scenes.length){box.innerHTML='';return;}
  box.innerHTML=state.scenes.map((s,i)=>`
    <div class="auto-video-scene" data-i="${i}">
      <div class="auto-video-scene-head"><h4>${i+1}. ${escapeHtml(s.section)}</h4><strong>${fmt(s.start)}–${fmt(s.end)}</strong></div>
      <p>${escapeHtml(s.lyrics).replace(/\n/g,'<br>')}</p>
      <small>배경: ${escapeHtml(s.place)} · 분위기: ${escapeHtml(s.mood)} · 시간: ${escapeHtml(s.time)}</small>
      <small>장면 프롬프트: ${escapeHtml(s.prompt)}</small>
      <button type="button" class="secondary" data-preview-scene="${i}" style="margin-top:8px">이 장면 보기</button>
    </div>`).join('');
  box.querySelectorAll('[data-preview-scene]').forEach(b=>b.addEventListener('click',()=>{state.previewIndex=Number(b.dataset.previewScene)||0;drawScene(state.previewIndex,0);}));
}

function ratioSize(){
  const r=qs('autoVideoRatio')?.value||'9:16';
  if(r==='16:9') return [960,540];
  if(r==='1:1') return [720,720];
  return [540,960];
}

function fitCanvas(){
  const c=qs('autoVideoCanvas'); if(!c)return;
  const [w,h]=ratioSize();
  if(c.width!==w)c.width=w;if(c.height!==h)c.height=h;
  c.style.aspectRatio=w+'/'+h;
}

function sceneImage(i){
  if(!state.imageUrls.length)return null;
  return state.imageUrls[i%state.imageUrls.length];
}

function wrapText(ctx,text,maxWidth){
  const words=String(text||'').replace(/\n/g,' \n ').split(/\s+/);const lines=[];let line='';
  for(const word of words){
    if(word==='\n'){if(line)lines.push(line);line='';continue;}
    const test=line?line+' '+word:word;
    if(ctx.measureText(test).width>maxWidth && line){lines.push(line);line=word;}else line=test;
  }
  if(line)lines.push(line);
  return lines.slice(0,4);
}

function drawGradient(ctx,w,h,scene){
  const g=ctx.createLinearGradient(0,0,0,h);
  const warm=/로맨스|밝고|희망/.test(scene?.mood||'');
  if(warm){g.addColorStop(0,'#6b567c');g.addColorStop(1,'#17121f');}
  else {g.addColorStop(0,'#23334c');g.addColorStop(1,'#090710');}
  ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
}

function drawAutoSceneArt(ctx,w,h,scene,progress=0){
  const p=clamp(progress,0,1),place=String(scene?.place||''),time=String(scene?.time||'');
  const night=/야간|새벽|밤/.test(time+place),sunset=/노을|저녁/.test(time),sky=ctx.createLinearGradient(0,0,0,h);
  if(night){sky.addColorStop(0,'#07152f');sky.addColorStop(.58,'#263054');sky.addColorStop(1,'#100b1c');}
  else if(sunset){sky.addColorStop(0,'#432f68');sky.addColorStop(.52,'#e27868');sky.addColorStop(1,'#291529');}
  else{sky.addColorStop(0,'#6ba9d6');sky.addColorStop(.62,'#d7b68b');sky.addColorStop(1,'#243145');}
  ctx.fillStyle=sky;ctx.fillRect(0,0,w,h);
  if(night){ctx.fillStyle='rgba(255,255,235,.88)';for(let i=0;i<38;i++){const x=(i*137)%w,y=(i*83)%(h*.58);ctx.fillRect(x,y,2+(i%2),2+(i%2));}ctx.beginPath();ctx.arc(w*.78,h*.16,w*.075,0,Math.PI*2);ctx.fill();}
  const shift=(p-.5)*w*.035;
  if(/바다|해변/.test(place)){ctx.fillStyle=night?'#101d3c':'#275d78';ctx.fillRect(0,h*.55,w,h*.45);for(let i=0;i<7;i++){ctx.strokeStyle=`rgba(255,255,255,${.12+i*.025})`;ctx.lineWidth=3;ctx.beginPath();for(let x=0;x<=w;x+=18)ctx.lineTo(x,h*(.61+i*.048)+Math.sin(x/42+p*5+i)*7);ctx.stroke();}}
  else if(/산|고원|눈/.test(place)){ctx.fillStyle='#293449';ctx.beginPath();ctx.moveTo(-40,h*.76);ctx.lineTo(w*.26+shift,h*.30);ctx.lineTo(w*.49,h*.70);ctx.lineTo(w*.69-shift,h*.22);ctx.lineTo(w+40,h*.76);ctx.closePath();ctx.fill();ctx.fillStyle='rgba(238,244,255,.9)';ctx.beginPath();ctx.moveTo(w*.18,h*.44);ctx.lineTo(w*.26+shift,h*.30);ctx.lineTo(w*.34,h*.45);ctx.closePath();ctx.fill();ctx.beginPath();ctx.moveTo(w*.58,h*.37);ctx.lineTo(w*.69-shift,h*.22);ctx.lineTo(w*.80,h*.40);ctx.closePath();ctx.fill();ctx.fillStyle='#17202d';ctx.fillRect(0,h*.74,w,h*.26);}
  else if(/도시|거리/.test(place)){ctx.fillStyle='#161727';for(let i=0;i<9;i++){const bw=w*(.08+(i%3)*.025),bh=h*(.17+(i%4)*.07),x=i*w*.12+shift;ctx.fillRect(x,h*.78-bh,bw,bh);ctx.fillStyle=sunset?'#ffd58a':'#8fc8e8';for(let yy=h*.8-bh;yy<h*.72;yy+=28)for(let xx=x+10;xx<x+bw-7;xx+=20)ctx.fillRect(xx,yy,6,10);ctx.fillStyle='#161727';}ctx.fillStyle='#232333';ctx.fillRect(0,h*.78,w,h*.22);}
  else if(/기차|역/.test(place)){ctx.fillStyle='#26313e';ctx.fillRect(0,h*.68,w,h*.32);ctx.fillStyle='#57465b';ctx.fillRect(w*.08+shift,h*.48,w*.84,h*.25);ctx.fillStyle='#b8d8de';for(let i=0;i<6;i++)ctx.fillRect(w*(.14+i*.12)+shift,h*.52,w*.08,h*.09);ctx.fillStyle='#15151e';for(let i=0;i<5;i++){ctx.beginPath();ctx.arc(w*(.2+i*.15)+shift,h*.74,w*.035,0,Math.PI*2);ctx.fill();}}
  else{ctx.fillStyle='#334033';ctx.fillRect(0,h*.66,w,h*.34);for(let i=0;i<14;i++){const x=(i*79+shift)%w;ctx.strokeStyle='#34251f';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(x,h*.70);ctx.lineTo(x+8,h*(.42+(i%4)*.04));ctx.stroke();ctx.fillStyle=/가을/.test(place)?['#e49a3a','#c85a35','#f0bd51'][i%3]:'#3e6b48';ctx.beginPath();ctx.arc(x+8,h*(.42+(i%4)*.04),22+(i%3)*6,0,Math.PI*2);ctx.fill();}}
  if(/눈/.test(place)){ctx.fillStyle='rgba(255,255,255,.9)';for(let i=0;i<55;i++){const x=(i*97+p*70)%w,y=(i*61+p*h*.25)%h;ctx.beginPath();ctx.arc(x,y,2+(i%4),0,Math.PI*2);ctx.fill();}}
  if(/비/.test(place)){ctx.strokeStyle='rgba(190,220,255,.52)';ctx.lineWidth=2;for(let i=0;i<45;i++){const x=(i*73+p*100)%w,y=(i*47+p*200)%h;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-9,y+28);ctx.stroke();}}
}

function drawScene(i,progress=0){
  const c=qs('autoVideoCanvas'); if(!c)return;
  fitCanvas(); const ctx=c.getContext('2d'); const w=c.width,h=c.height;
  const scene=state.scenes[i]||{section:'MARU AUTO VIDEO',lyrics:qs('autoVideoTitle')?.value||'가사와 이미지를 넣어 영상을 만드세요',mood:'감성적',place:'시네마틱 배경'};
  ctx.clearRect(0,0,w,h); drawGradient(ctx,w,h,scene);
  const url=sceneImage(i);
  if(url){
    const img=new Image(); img.onload=()=>{
      const zoom=1.02+clamp(progress,0,1)*0.04;
      const scale=Math.max(w/img.width,h/img.height)*zoom;
      const dw=img.width*scale,dh=img.height*scale;
      ctx.drawImage(img,(w-dw)/2,(h-dh)/2,dw,dh);
      drawOverlay(ctx,w,h,scene,i);
    }; img.src=url;
  }else {drawAutoSceneArt(ctx,w,h,scene,progress);drawOverlay(ctx,w,h,scene,i);}
}

function drawOverlay(ctx,w,h,scene,i){
  const shade=ctx.createLinearGradient(0,h*.45,0,h);shade.addColorStop(0,'rgba(0,0,0,0)');shade.addColorStop(1,'rgba(0,0,0,.78)');ctx.fillStyle=shade;ctx.fillRect(0,0,w,h);
  ctx.fillStyle='rgba(0,0,0,.45)';ctx.fillRect(0,0,w,Math.max(54,h*.07));
  const title=qs('autoVideoTitle')?.value||'MARU MUSIC';
  ctx.fillStyle='#fff';ctx.textAlign='center';ctx.font='700 '+Math.round(w*.045)+'px system-ui,sans-serif';ctx.fillText(title,w/2,Math.max(36,h*.045));
  ctx.font='700 '+Math.round(w*.052)+'px system-ui,sans-serif';
  const lyric=String(scene.lyrics||'').split('\n').join(' ');
  const lines=wrapText(ctx,lyric,w*.82); const lh=Math.round(w*.07); let y=h-Math.max(110,h*.13)-((lines.length-1)*lh);
  ctx.shadowColor='rgba(0,0,0,.8)';ctx.shadowBlur=8;
  lines.forEach(line=>{ctx.fillText(line,w/2,y);y+=lh;});
  ctx.shadowBlur=0;ctx.font='600 '+Math.round(w*.028)+'px system-ui,sans-serif';ctx.fillStyle='rgba(255,255,255,.82)';ctx.fillText((i+1)+' / '+Math.max(1,state.scenes.length)+' · '+scene.place,w/2,h-28);
}

function startPreview(){
  if(!state.scenes.length)analyze();
  if(!state.scenes.length)return;
  const started=performance.now(); const total=Math.min(20000,state.scenes.reduce((a,s)=>a+s.duration,0)*1000);
  setStatus('미리보기 재생 중입니다.','busy');
  function tick(now){
    const elapsed=(now-started)/1000; let idx=state.scenes.findIndex(s=>elapsed>=s.start && elapsed<s.end);
    if(idx<0)idx=Math.min(state.scenes.length-1,Math.floor(elapsed/(state.scenes[0]?.duration||6)));
    const sc=state.scenes[idx]||state.scenes[0]; const p=sc?clamp((elapsed-sc.start)/Math.max(.1,sc.duration),0,1):0;
    drawScene(idx,p);
    if(now-started<total)requestAnimationFrame(tick); else {drawScene(0,0);setStatus('미리보기 완료','ready');}
  }
  requestAnimationFrame(tick);
}

async function exportVideo(){
  if(state.recording)return;
  if(!state.scenes.length)analyze();
  if(!state.scenes.length)return;
  fitCanvas();
  const c=qs('autoVideoCanvas'), fps=24;
  if(!c.captureStream || !window.MediaRecorder){setStatus('이 브라우저에서는 영상 녹화를 지원하지 않습니다. Chrome 최신 버전을 사용하세요.','error');return;}
  state.recording=true;
  const bar=qs('autoVideoProgress'); if(bar)bar.style.width='0%';
  try{
    const canvasStream=c.captureStream(fps);
    let audioCtx=null,src=null,dest=null; let total=state.scenes[state.scenes.length-1].end;
    const tracks=[...canvasStream.getVideoTracks()];
    if(state.audioBuffer){
      audioCtx=new (window.AudioContext||window.webkitAudioContext)();
      dest=audioCtx.createMediaStreamDestination();
      src=audioCtx.createBufferSource();src.buffer=state.audioBuffer;src.connect(dest);src.connect(audioCtx.destination);
      tracks.push(...dest.stream.getAudioTracks());
      total=state.audioBuffer.duration;
    }
    const stream=new MediaStream(tracks);
    const types=['video/mp4;codecs=h264,aac','video/mp4','video/webm;codecs=vp9,opus','video/webm;codecs=vp8,opus','video/webm'];
    const mime=types.find(t=>MediaRecorder.isTypeSupported(t))||'';
    const rec=new MediaRecorder(stream,mime?{mimeType:mime,videoBitsPerSecond:5000000}:{videoBitsPerSecond:5000000});
    const chunks=[];rec.ondataavailable=e=>{if(e.data&&e.data.size)chunks.push(e.data);};
    const done=new Promise((resolve,reject)=>{rec.onstop=resolve;rec.onerror=e=>reject(e.error||e);});
    rec.start(1000); if(src){await audioCtx.resume();src.start(0);}
    const started=performance.now(); setStatus('영상을 실시간 렌더링하고 있습니다. 화면을 닫지 마세요.','busy');
    await new Promise(resolve=>{
      function frame(now){
        const elapsed=(now-started)/1000;
        const idx=Math.min(state.scenes.length-1,Math.max(0,state.scenes.findIndex(s=>elapsed>=s.start&&elapsed<s.end)));
        const sc=state.scenes[idx]||state.scenes[state.scenes.length-1];
        const p=sc?clamp((elapsed-sc.start)/Math.max(.1,sc.duration),0,1):0;drawScene(idx,p);
        if(bar)bar.style.width=(clamp(elapsed/Math.max(.1,total),0,1)*100).toFixed(1)+'%';
        if(elapsed<total)requestAnimationFrame(frame);else resolve();
      }
      requestAnimationFrame(frame);
    });
    if(src){try{src.stop();}catch(e){}}
    rec.stop(); await done;
    stream.getTracks().forEach(t=>t.stop()); if(audioCtx)await audioCtx.close();
    const outType=rec.mimeType||mime||'video/webm'; const ext=outType.includes('mp4')?'mp4':'webm';
    const blob=new Blob(chunks,{type:outType});
    const a=document.createElement('a');a.href=URL.createObjectURL(blob);
    const safe=(qs('autoVideoTitle')?.value||'MARU_AUTO_VIDEO').replace(/[\\/:*?"<>|]+/g,'_').trim()||'MARU_AUTO_VIDEO';
    a.download=safe+'.'+ext;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),10000);
    if(bar)bar.style.width='100%';
    setStatus(ext==='mp4'?'MP4 영상을 만들었습니다.':'영상이 완성되었습니다. 이 휴대폰 브라우저는 MP4 직접 녹화가 없어 WebM으로 저장했습니다.','ready');
  }catch(err){
    setStatus('영상 생성 실패 · '+(err?.message||String(err)),'error');
  }finally{state.recording=false;}
}

function bind(){
  qs('autoVideoImages')?.addEventListener('change',e=>{
    state.imageUrls.forEach(u=>URL.revokeObjectURL(u));state.images=[...(e.target.files||[])];state.imageUrls=state.images.map(f=>URL.createObjectURL(f));
    setStatus('이미지 '+state.images.length+'장을 불러왔습니다. 장면 순서대로 자동 반복 배치합니다.','ready');drawScene(state.previewIndex,0);
  });
  qs('autoVideoAudio')?.addEventListener('change',async e=>{
    state.audioFile=e.target.files?.[0]||null;state.preparedFile=null;
    if(state.audioFile)await prepareSong(state.audioFile);
  });
  qs('autoVideoAnalyze')?.addEventListener('click',analyze);
  qs('autoVideoOneTouch')?.addEventListener('click',async()=>{
    if(!state.audioFile){setStatus('먼저 노래 하나를 선택하세요.','error');return;}
    if(state.preparedFile!==state.audioFile||!state.scenes.length){const ok=await prepareSong(state.audioFile);if(!ok)return;}
    await exportVideo();
  });
  qs('autoVideoPreview')?.addEventListener('click',startPreview);
  qs('autoVideoExport')?.addEventListener('click',exportVideo);
  qs('autoVideoRatio')?.addEventListener('change',()=>drawScene(state.previewIndex,0));
  window.addEventListener('beforeunload',()=>state.imageUrls.forEach(u=>URL.revokeObjectURL(u)));
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',injectUI);else injectUI();
})();
