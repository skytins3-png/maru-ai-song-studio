(function(){
'use strict';
const $=id=>document.getElementById(id),list=$('musicList'),empty=$('empty'),count=$('trackCount'),search=$('search'),sort=$('sort'),toast=$('toast');
const genres=globalThis.MaruGenres;
let tracks=[];
const cards=new Map();
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
function showToast(t){toast.textContent=t;toast.hidden=false;clearTimeout(showToast.t);showToast.t=setTimeout(()=>toast.hidden=true,3000)}
function formatDate(s){try{return new Intl.DateTimeFormat('ko-KR',{year:'numeric',month:'short',day:'numeric'}).format(new Date(s))}catch(e){return ''}}
function shareUrl(id){const u=new URL(location.href);u.search='';u.hash='';if(id)u.searchParams.set('track',id);return u.href}
async function copyLink(url){
  try{await navigator.clipboard.writeText(url);showToast('링크를 복사했습니다')}
  catch(e){const box=$('shareFallback'),input=$('shareUrl');box.hidden=false;input.value=url;input.focus();input.select();showToast('아래 링크를 길게 눌러 복사해 주세요');}
}
function render(){
  const q=search.value.trim().toLowerCase();
  const selected=$('genreFilter').value||'all';
  const arr=[...tracks].sort((a,b)=>sort.value==='title'?String(a.title).localeCompare(String(b.title),'ko'):sort.value==='oldest'?new Date(a.createdAt)-new Date(b.createdAt):new Date(b.createdAt)-new Date(a.createdAt));
  let visible=0;
  arr.forEach((t,index)=>{const card=cards.get(t.id);card.hidden=(!!q&&![t.title,t.artist,t.description].some(v=>String(v||'').toLowerCase().includes(q)))||(selected!=='all'&&genres.genreOf(t)!==selected);card.style.order=index;if(!card.hidden)visible++});
  count.textContent=(q||selected!=='all')?visible+' / '+tracks.length+'곡':tracks.length+'곡';
  empty.hidden=visible!==0;empty.textContent=(q||selected!=='all')?'선택한 장르에 맞는 곡이 없습니다.':'아직 공개된 음악이 없습니다.';
}
function makeCard(t){
  const card=document.createElement('article');card.className='track';card.id='track-'+t.id;
  const cover=MusicShare.mediaPath(t.cover,'covers')?'<img loading="lazy" src="'+esc(t.cover)+'" alt="'+esc(t.title)+' 표지">':'<div class="fallback">♫</div>';
  card.innerHTML='<div class="cover">'+cover+'</div><div class="track-body"><div class="genre-tag">'+esc(genres.label(genres.genreOf(t)))+'</div><div class="artist">'+esc(t.artist||'MUSIC SHARE')+'</div><h2>'+esc(t.title||'제목 없음')+'</h2><p class="desc">'+esc(t.description||'')+'</p><audio controls preload="none" aria-label="'+esc(t.title)+' 재생" src="'+esc(t.audio)+'"></audio><div class="actions"><a class="download" href="'+esc(t.audio)+'" download>⬇ 내려받기</a><button class="share-track" type="button">공유</button></div><div class="meta">'+formatDate(t.createdAt)+'</div></div>';
  const audio=card.querySelector('audio');
  audio.addEventListener('play',()=>{cards.forEach(other=>{const a=other.querySelector('audio');if(a!==audio)a.pause()})});
  audio.addEventListener('error',()=>showToast('음악을 재생하지 못했습니다. 배포 상태와 파일 형식을 확인해 주세요.'));
  card.querySelector('.share-track').addEventListener('click',()=>copyLink(shareUrl(t.id)));
  cards.set(t.id,card);list.appendChild(card);
}
async function load(){
  try{
    const r=await fetch('catalog.json?t='+Date.now(),{cache:'no-store'});if(!r.ok)throw new Error('catalog');
    tracks=MusicShare.publicTracks(await r.json());tracks.forEach(makeCard);render();
    const id=new URLSearchParams(location.search).get('track');
    if(id){const card=cards.get(id);if(card)setTimeout(()=>card.scrollIntoView({behavior:'smooth',block:'center'}),50);else showToast('공개되지 않았거나 찾을 수 없는 곡입니다.');}
  }catch(e){empty.hidden=false;empty.textContent='음악 목록을 불러오지 못했습니다. 잠시 후 새로고침해 주세요.';}
}
search.addEventListener('input',render);sort.addEventListener('change',render);$('genreFilter').addEventListener('change',render);
$('shareSite').addEventListener('click',async()=>{const url=shareUrl();try{if(navigator.share)await navigator.share({title:'MUSIC SHARE',url});else await copyLink(url)}catch(e){if(e.name!=='AbortError')await copyLink(url)}});
load();
})();
