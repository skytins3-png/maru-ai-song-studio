(function(root){
'use strict';
// Categories describe the language or instrumental format, not acoustic genre.
const values=['all','korean','chinese','western','instrumental','other'];
function detect(name){
 const t=String(name||'').normalize('NFC');
 if(/(연주|독주|합주|반주|피아노|가야금|대금|얼후|고쟁|纯音乐|演奏|instrumental|piano solo|orchestra)/i.test(t))return 'instrumental';
 if(/[가-힣]/.test(t))return 'korean';
 if(/[\u3400-\u9fff]/.test(t))return 'chinese';
 if(/[a-z]/i.test(t))return 'western';
 return 'other';
}
function genreOf(track){const g=track&&track.genre;return values.includes(g)&&g!=='all'?g:detect(track&&(track.title||track.audio))}
function label(g){return ({all:'전체',korean:'한국곡',chinese:'중국곡',western:'서양곡',instrumental:'연주곡',other:'미분류'})[g]||'미분류'}
function splitBatches(files,maxFiles=15,maxBytes=90*1024*1024){
 const out=[];let curr=[],bytes=0;
 for(const f of files){
  if(!f||!Number.isFinite(f.size)||f.size<=0||f.size>maxBytes)throw Error('Invalid audio size');
  if(curr.length>=maxFiles||bytes+f.size>maxBytes){
   if(curr.length)out.push(curr);
   curr=[];bytes=0;
  }
  curr.push(f);bytes+=f.size;
 }
 if(curr.length)out.push(curr);
 return out;
}
root.MaruGenres={values,detect,genreOf,label,splitBatches};
})(typeof globalThis!=='undefined'?globalThis:this);
