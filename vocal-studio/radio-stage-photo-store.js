(function(root,factory){
"use strict";
const store=factory();
if(typeof module==="object"&&module.exports)module.exports=store;
if(root)root.MaruLocalPortraits=store;
})(typeof globalThis==="object"?globalThis:this,function(){
"use strict";
// Photos remain only in the viewer's current browser IndexedDB. No network.
// No arbitrary text, SVG, executable file or untrusted media is persisted.
const DB="maru-approved-character-portraits-v1",STORE="portraits",MAX=20*1024*1024;
function valid(id,file){
 return typeof id==="string"&&/^[a-z0-9-]{2,30}$/.test(id)&&
 !!file&&typeof file.size==="number"&&file.size>100&&file.size<=MAX&&
 /^(image\/jpeg|image\/png|image\/webp)$/.test(file.type||"");
}
function request(mode,id,file){
 return new Promise((resolve,reject)=>{
  if(typeof indexedDB==="undefined")return reject(new Error("IndexedDB 사용 불가"));
  let req;try{req=indexedDB.open(DB,1);}catch(e){reject(e);return;}
  req.onupgradeneeded=()=>{const db=req.result;if(!db.objectStoreNames.contains(STORE))db.createObjectStore(STORE);};
  req.onerror=()=>reject(req.error||new Error("사진 저장소 사용 실패"));
  req.onsuccess=()=>{
   const db=req.result;let tx;
   try{
    tx=db.transaction(STORE,mode==="get"?"readonly":"readwrite");
    const store=tx.objectStore(STORE);
    const io=mode==="put"?store.put(file,id):mode==="get"?store.get(id):store.delete(id);
    io.onsuccess=()=>resolve(mode==="get"?(io.result||null):true);
    io.onerror=()=>reject(io.error||new Error("사진 읽기/쓰기 실패"));
    tx.oncomplete=()=>db.close();
    tx.onabort=()=>{db.close();reject(tx.error||new Error("사진 처리 취소"));};
   }catch(e){db.close();reject(e);}
  };
 });
}
function save(id,file){
 if(!valid(id,file))return Promise.reject(new Error("사진 형식 또는 크기 부적합"));
 return request("put",id,file);
}
function load(id){return request("get",id);}
function remove(id){return request("delete",id);}
return {valid,save,load,remove};
});