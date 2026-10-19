(function(root,factory){"use strict";const api=factory();if(typeof module==="object"&&module.exports)module.exports=api;if(root)root.MaruRadioBridge=api;})(typeof globalThis==="object"?globalThis:this,function(){
"use strict";
const STORES=[
 {db:"maru-studio-original-vocals-v1",store:"samples",source:"studio-sample"},
 {db:"maru-studio-vocal-auditions-local-v1",store:"takes",source:"audition-take"}
];
function valid(row){
 return !!(row&&row.blob instanceof Blob&&row.blob.size>=1000&&row.blob.size<=80*1024*1024&&
   typeof row.name==="string"&&/\.(mp3|wav|m4a|aac|ogg|flac)$/i.test(row.name));
}
function openIfExists(dbName,store){
 return new Promise((resolve,reject)=>{
  if(typeof indexedDB==="undefined"){reject(Error("이 기기에서 IndexedDB를 사용할 수 없습니다."));return;}
  let req;
  try{req=indexedDB.open(dbName)}catch(e){reject(e);return;}
  let missing=false;
  req.onupgradeneeded=()=>{missing=true;try{req.transaction.abort()}catch(e){}};
  req.onsuccess=()=>{const db=req.result;if(missing||!db.objectStoreNames.contains(store)){db.close();resolve(null);}else resolve(db);};
  req.onerror=()=>{if(missing)resolve(null);else reject(req.error||Error("IndexedDB 열기 실패"));};
  req.onblocked=()=>reject(Error("다른 화면에서 로컬 음악 저장소 사용 중입니다."));
 });
}
async function entries(source){
 const db=await openIfExists(source.db,source.store);
 if(!db)return [];
 try{
  const records=await new Promise((resolve,reject)=>{
   const tx=db.transaction(source.store,"readonly"),req=tx.objectStore(source.store).getAll();
   req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error||Error("로컬 파일 읽기 실패"));
   tx.onabort=()=>reject(tx.error||Error("로컬 저장소 잠김"));
  });
  return records.filter(valid).map((row)=>({
    origin:source.source,
    originId:String(row.id||"").slice(0,50),
    name:row.name,
    blob:row.blob
  }));
 }finally{db.close();}
}
async function loadAll(){
 const output=[],failures=[];
 for(const source of STORES){
  try{output.push(...await entries(source));}
  catch(e){failures.push(source.source+": "+e.message);}
 }
 return {songs:output,failures};
}
return {valid,loadAll,STORES};
});