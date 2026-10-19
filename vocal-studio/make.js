"use strict";
(function(){
const $=id=>document.getElementById(id);
let roster=[],artist=null,task=null;
function note(s){$("status").textContent=s;}
function choose(){
 artist=roster.find(p=>p.id===$("person").value);
 if(!artist)return;
 $("group").textContent=artist.group+" · "+artist.genre;
 const personaLink=$("personaLink");if(personaLink)personaLink.href="./persona-evidence.html?artist="+encodeURIComponent(artist.id);
 task=artist.tracks[0];$("version").value="A";display();
}
function display(){
 task=artist.tracks.find(x=>x.version===$("version").value);
 $("title").value=task.title;$("style").value=task.style;$("lyrics").value=task.lyrics;
 $("test").textContent=task.testPurpose+" · "+task.bpm+" BPM · 목표 4분 20초";
 $("generation").textContent="이 곡은 제작 지시서입니다. 실제 노래는 Suno에서 별도 생성하고 원본을 내려받아 오디션에 업로드하세요.";
}
async function copy(id){
 const field=$(id);
 try{await navigator.clipboard.writeText(field.value);note(id+" 복사 완료");}
 catch(e){field.focus();field.select();note("복사가 차단됐습니다. 선택된 내용을 길게 눌러 복사하세요.");}
}
document.addEventListener("DOMContentLoaded",async()=>{
 try{
  const response=await fetch("./production-plans.json",{cache:"no-store"});
  if(!response.ok)throw Error("제작팩 읽기 실패");
  const obj=await response.json();roster=obj.candidates;
  if(roster.length!==30||roster.some(r=>r.tracks.length!==2))throw Error("제작팩 60곡 미완성");
  for(const artist of roster){
    const op=document.createElement("option");op.value=artist.id;op.textContent=artist.name+" · "+artist.group;
    $("person").append(op);
  }
  $("person").onchange=choose;$("version").onchange=display;
  for(const id of ["title","style","lyrics"])$("copy-"+id).onclick=()=>copy(id);
  $("openSuno").onclick=()=>window.open("https://suno.com/create","_blank","noopener,noreferrer");
  $("openAudition").onclick=()=>window.location.assign("./audition.html");
  $("exportPack").onclick=()=>{
   const url=URL.createObjectURL(new Blob([JSON.stringify(obj,null,2)],{type:"application/json"}));
   const link=document.createElement("a");link.href=url;link.download="MARU_STUDIO_60_SUNO_TEST_SONG_PROMPTS.json";
   document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),3000);
  };
  const requested=new URLSearchParams(window.location.search).get("artist");
  $("person").value=roster.some(p=>p.id===requested)?requested:roster[0].id;choose();note("제작 준비 60개 설정 완료 · 생성된 음원은 0개");
 }catch(e){note("화면 초기화 실패: "+e.message);}
});
})();