/* MARU V0.23.18 — mobile-safe YouTube handoff.
   Builds one 9:16 WebM at a time from the saved original audio and per-track
   video/cover. Nothing is uploaded without the user's Android share action. */
(function(){
 'use strict';
 const W=720,H=1280,FPS=30;
 let running=null,lastFile=null,lastUrl='';
 const $=s=>document.querySelector(s);
 const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function titleOf(name){return String(name||'MARU SONG').replace(/\.[^.]+$/,'').trim()||'MARU SONG'}
 function safeName(name){return titleOf(name).replace(/[\\/:*?"<>|]/g,'_').slice(0,100)}
 function isVideo(blob,name=''){return !!blob&&(String(blob.type||'').startsWith('video/')||/\.(mp4|m4v|mov|webm)$/i.test(name||''))}
 function waitMedia(el){return new Promise((resolve,reject)=>{if(el.readyState>=1)return resolve();const ok=()=>{clean();resolve()},bad=()=>{clean();reject(new Error('미디어 파일을 열지 못했습니다'))},clean=()=>{el.removeEventListener('loadedmetadata',ok);el.removeEventListener('error',bad)};el.addEventListener('loadedmetadata',ok,{once:true});el.addEventListener('error',bad,{once:true})})}
 function fit(ctx,w,h,mode='cover'){
  const r=mode==='contain'?Math.min(W/w,H/h):Math.max(W/w,H/h),dw=w*r,dh=h*r;
  return[(W-dw)/2,(H-dh)/2,dw,dh]
 }
 function recorderType(){
  const types=['video/webm;codecs=vp9,opus','video/webm;codecs=vp8,opus','video/webm'];
  return types.find(t=>{try{return MediaRecorder.isTypeSupported(t)}catch{return false}})||''
 }
 function status(text,pct){const s=$('#youtubeExportStatus2318'),f=$('#youtubeExportProgress2318');if(s)s.textContent=text;if(f)f.style.width=Math.max(0,Math.min(100,Number(pct)||0))+'%'}
 function updateTracks(){
  const sel=$('#youtubeTrack2318');if(!sel)return;
  const old=Number(sel.value),files=typeof broadcastFiles!=='undefined'?broadcastFiles:[];
  sel.innerHTML=files.length?files.map((f,i)=>`<option value="${i}">${i+1}. ${esc(titleOf(f?.name))}</option>`).join(''):'<option value="">방송목록에 곡을 먼저 넣어 주세요</option>';
  const current=typeof broadcastIndex!=='undefined'&&broadcastIndex>=0?broadcastIndex:old;
  if(files[current])sel.value=String(current);else if(files.length)sel.value='0';
  const make=$('#youtubeMake2318');if(make)make.disabled=!files.length||!!running;
 }
 async function getRecord(index){
  const files=typeof broadcastFiles!=='undefined'?broadcastFiles:[],f=files[index];
  if(!f)throw new Error('방송목록에서 곡을 선택해 주세요');
  const ids=typeof broadcastCurrentIds==='function'?broadcastCurrentIds():[],id=ids[index];
  let r=id&&typeof broadcastDbGet==='function'?await broadcastDbGet(id):null;
  if(!r)r={id,name:f.name,type:f.type,blob:f,coverBlob:null,videoBlob:null,coverName:'',videoName:''};
  if(!r.blob?.size)throw new Error('저장된 원곡 파일을 찾지 못했습니다');
  return{f,r,title:titleOf(r.name||f.name)}
 }
 function drawBase(ctx,title){
  const g=ctx.createLinearGradient(0,0,W,H);g.addColorStop(0,'#24143f');g.addColorStop(.55,'#121020');g.addColorStop(1,'#090712');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  ctx.textAlign='center';ctx.fillStyle='rgba(255,255,255,.94)';ctx.font='700 42px sans-serif';const t=title.length>28?title.slice(0,27)+'…':title;ctx.fillText(t,W/2,H-92);
  ctx.fillStyle='rgba(255,255,255,.62)';ctx.font='500 22px sans-serif';ctx.fillText('MARU WORLD MUSIC',W/2,H-50)
 }
 async function createYoutubeVideo(){
  if(running)return;
  if(typeof MediaRecorder==='undefined'||!HTMLCanvasElement.prototype.captureStream)return status('이 브라우저는 완성 영상 만들기를 지원하지 않습니다.',0);
  const index=Number($('#youtubeTrack2318')?.value),make=$('#youtubeMake2318'),cancel=$('#youtubeCancel2318'),share=$('#youtubeShare2318');
  try{
   const {r,title}=await getRecord(index);if(lastUrl){URL.revokeObjectURL(lastUrl);lastUrl=''}lastFile=null;if(share)share.disabled=true;
   const canvas=document.createElement('canvas');canvas.width=W;canvas.height=H;const ctx=canvas.getContext('2d',{alpha:false});
   const audio=document.createElement('audio'),video=document.createElement('video'),img=new Image();audio.preload='auto';video.preload='auto';video.muted=true;video.loop=true;video.playsInline=true;
   const audioUrl=URL.createObjectURL(r.blob);audio.src=audioUrl;await waitMedia(audio);
   const visualBlob=r.videoBlob?.size?r.videoBlob:(isVideo(r.blob,r.name)?r.blob:null),coverBlob=r.coverBlob?.size?r.coverBlob:null;
   let visualUrl='',visual='none';
   if(visualBlob){visualUrl=URL.createObjectURL(visualBlob);video.src=visualUrl;await waitMedia(video);visual='video'}
   else if(coverBlob){visualUrl=URL.createObjectURL(coverBlob);img.src=visualUrl;await img.decode();visual='image'}
   const ac=new(window.AudioContext||window.webkitAudioContext)(),src=ac.createMediaElementSource(audio),dest=ac.createMediaStreamDestination(),monitor=ac.createGain();monitor.gain.value=.82;src.connect(dest);src.connect(monitor).connect(ac.destination);await ac.resume();
   const stream=canvas.captureStream(FPS);for(const tr of dest.stream.getAudioTracks())stream.addTrack(tr);
   const mime=recorderType(),rec=mime?new MediaRecorder(stream,{mimeType:mime,videoBitsPerSecond:2500000,audioBitsPerSecond:160000}):new MediaRecorder(stream),chunks=[];
   let raf=0,cancelled=false,wake=null;running={cancel:()=>{cancelled=true;try{audio.pause();video.pause();if(rec.state!=='inactive')rec.stop()}catch{}}};
   if(make)make.disabled=true;if(cancel)cancel.disabled=false;status(`준비 완료 · ${title} · 실시간으로 완성 영상을 만듭니다`,0);
   try{wake=await navigator.wakeLock?.request?.('screen')}catch{}
   const draw=()=>{drawBase(ctx,title);try{if(visual==='video'&&video.readyState>=2){const d=fit(ctx,video.videoWidth||W,video.videoHeight||H);ctx.drawImage(video,...d)}else if(visual==='image'&&img.naturalWidth){const d=fit(ctx,img.naturalWidth,img.naturalHeight);ctx.drawImage(img,...d)}}catch{};const p=audio.duration?audio.currentTime/audio.duration*100:0;status(`완성 영상 생성 중 · ${Math.floor(audio.currentTime/60)}:${String(Math.floor(audio.currentTime%60)).padStart(2,'0')} / ${Math.floor((audio.duration||0)/60)}:${String(Math.floor((audio.duration||0)%60)).padStart(2,'0')}`,p);raf=requestAnimationFrame(draw)};
   const done=new Promise((resolve,reject)=>{rec.ondataavailable=e=>{if(e.data?.size)chunks.push(e.data)};rec.onerror=e=>reject(e.error||new Error('영상 저장 오류'));rec.onstop=resolve});
   rec.start(1000);draw();if(visual==='video')await video.play();await audio.play();audio.onended=()=>{if(rec.state!=='inactive')rec.stop()};await done;
   cancelAnimationFrame(raf);try{audio.pause();video.pause();stream.getTracks().forEach(t=>t.stop());await ac.close();await wake?.release?.()}catch{}URL.revokeObjectURL(audioUrl);if(visualUrl)URL.revokeObjectURL(visualUrl);
   if(cancelled){status('완성 영상 만들기를 취소했습니다.',0);return}
   const blob=new Blob(chunks,{type:rec.mimeType||'video/webm'}),file=new File([blob],`${safeName(title)}_YOUTUBE.webm`,{type:blob.type,lastModified:Date.now()});lastFile=file;lastUrl=URL.createObjectURL(blob);if(share)share.disabled=false;
   status(`✅ 완성 · ${file.name} · ${(file.size/1024/1024).toFixed(1)}MB`,100);if(typeof toast==='function')toast('유튜브용 완성 영상이 만들어졌습니다. 유튜브 앱으로 보내기를 누르세요.')
  }catch(e){console.error('youtube export',e);status(`❌ ${e.message||e}`,0);if(typeof toast==='function')toast(`유튜브 영상 만들기 실패 · ${e.message||e}`)}finally{running=null;if(make)make.disabled=false;if(cancel)cancel.disabled=true;updateTracks()}
 }
 async function shareYoutubeVideo(){
  if(!lastFile)return status('먼저 유튜브용 완성 영상을 만들어 주세요.',0);
  try{
   if(navigator.canShare?.({files:[lastFile]})&&navigator.share){await navigator.share({files:[lastFile],title:titleOf(lastFile.name),text:'내 YouTube 채널에 업로드'});status('공유 화면에서 YouTube를 선택하고 일부 공개로 올려 주세요.',100);return}
  }catch(e){if(e?.name==='AbortError')return;console.warn('share failed',e)}
  const a=document.createElement('a');a.href=lastUrl;a.download=lastFile.name;document.body.appendChild(a);a.click();a.remove();status('영상 파일을 저장했습니다. YouTube 앱의 + 버튼에서 업로드하세요.',100)
 }
 function mount(){
  if($('#youtubeExportCard2318'))return;
  const host=$('#broadcastCard')||$('#audioAnalyzer')||document.querySelector('main')||document.body,card=document.createElement('section');card.id='youtubeExportCard2318';card.className='card';
  card.innerHTML=`<div class="section-title"><div><h2>▶ YouTube 완성영상</h2><p>곡별 영상과 원음을 하나로 만들어 BIGO 오디오 LIVE의 YouTube에서 재생합니다.</p></div><strong>V0.23.18</strong></div><label for="youtubeTrack2318">유튜브에 올릴 곡</label><select id="youtubeTrack2318"></select><div class="actions"><button id="youtubeMake2318" class="primary" type="button">🎬 유튜브용 영상 만들기</button><button id="youtubeCancel2318" class="danger" type="button" disabled>■ 취소</button><button id="youtubeShare2318" class="secondary" type="button" disabled>▶ 유튜브 앱으로 보내기</button></div><div class="batch-progress"><div id="youtubeExportProgress2318"></div></div><div id="youtubeExportStatus2318" class="analysis-box">방송목록의 곡을 선택하세요. 자막은 새로 넣지 않고 저장된 곡별 영상과 원음만 합칩니다.</div><small>모바일 안전 모드: 한 곡씩 실시간 길이만큼 처리합니다. 원곡과 곡별 영상은 수정하거나 삭제하지 않습니다. 업로드 화면에서는 <b>일부 공개</b>를 권장합니다.</small>`;
  host.insertAdjacentElement('afterend',card);$('#youtubeMake2318').onclick=createYoutubeVideo;$('#youtubeCancel2318').onclick=()=>running?.cancel();$('#youtubeShare2318').onclick=shareYoutubeVideo;updateTracks();
  const observer=new MutationObserver(()=>updateTracks());const q=$('#broadcastQueue');if(q)observer.observe(q,{childList:true,subtree:true});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
