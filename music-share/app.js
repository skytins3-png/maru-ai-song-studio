(function(){
'use strict';
const list=document.getElementById('musicList'),empty=document.getElementById('empty'),count=document.getElementById('trackCount'),search=document.getElementById('search'),sort=document.getElementById('sort'),toast=document.getElementById('toast');
let tracks=[];
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
function showToast(t){toast.textContent=t;toast.hidden=false;clearTimeout(showToast.t);showToast.t=setTimeout(()=>toast.hidden=true,1800)}
function formatDate(s){try{return new Intl.DateTimeFormat('ko-KR',{year:'numeric',month:'short',day:'numeric'}).format(new Date(s))}catch(e){return ''}}
function trackUrl(t){return new URL(t.audio,location.href).href}
function render(){
  const q=(search.value||'').trim().toLowerCase();
  let arr=tracks.filter(t=>!q||[t.title,t.artist,t.description].some(v=>String(v||'').toLowerCase().includes(q)));
  arr.sort((a,b)=>sort.value==='title'?String(a.title).localeCompare(String(b.title),'ko'):sort.value==='oldest'?new Date(a.createdAt)-new Date(b.createdAt):new Date(b.createdAt)-new Date(a.createdAt));
  count.textContent=tracks.length+'곡';
  empty.hidden=arr.length!==0; list.innerHTML='';
  arr.forEach(t=>{
    const card=document.createElement('article'); card.className='track';card.id='track-'+t.id;
    const cover=t.cover?'<img loading="lazy" src="'+esc(t.cover)+'" alt="">':'<div class="fallback">♫</div>';
    card.innerHTML='<div class="cover">'+cover+'</div><div class="track-body"><div class="artist">'+esc(t.artist||'MUSIC SHARE')+'</div><h2>'+esc(t.title||'제목 없음')+'</h2><p class="desc">'+esc(t.description||'')+'</p><audio controls preload="none" src="'+esc(t.audio)+'"></audio><div class="actions"><a class="download" href="'+esc(t.audio)+'" download>⬇ 내려받기</a><button class="share-track" type="button">공유</button></div><div class="meta">'+formatDate(t.createdAt)+'</div></div>';
    card.querySelector('.share-track').addEventListener('click',async()=>{const u=new URL(location.href);u.searchParams.set('track',t.id);try{await navigator.clipboard.writeText(u.href);showToast('곡 링크를 복사했습니다')}catch(e){showToast('주소창의 링크를 복사해 주세요')}});
    list.appendChild(card);
  });
  const id=new URLSearchParams(location.search).get('track');if(id){setTimeout(()=>document.getElementById('track-'+id)?.scrollIntoView({behavior:'smooth',block:'center'}),50)}
}
async function load(){try{const r=await fetch('catalog.json?t='+Date.now(),{cache:'no-store'});if(!r.ok)throw new Error('catalog');tracks=await r.json();if(!Array.isArray(tracks))tracks=[];render()}catch(e){empty.hidden=false;empty.textContent='음악 목록을 불러오지 못했습니다.'}}
search.addEventListener('input',render);sort.addEventListener('change',render);
document.getElementById('shareSite').addEventListener('click',async()=>{try{if(navigator.share)await navigator.share({title:'MUSIC SHARE',url:location.href});else{await navigator.clipboard.writeText(location.href);showToast('사이트 링크를 복사했습니다')}}catch(e){}});
load();
})();