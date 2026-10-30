(function(root){
'use strict';
/* Client-side file signature preflight. It is not an antivirus engine.
 * It cannot protect against an attacker bypassing browser JavaScript. */
const decode=(bytes,from,length)=>String.fromCharCode(...bytes.slice(from,from+length));
function supportedSignature(name,bytes){
 const n=String(name||'').toLowerCase();
 if(!bytes||bytes.length<12)return false;
 const h=decode(bytes,0,4);
 if(/\.mp3$/.test(n))return decode(bytes,0,3)==='ID3'||(bytes[0]===255&&(bytes[1]&0xe0)===0xe0);
 if(/\.wav$/.test(n))return h==='RIFF'&&decode(bytes,8,4)==='WAVE';
 if(/\.m4a$/.test(n))return decode(bytes,4,4)==='ftyp';
 if(/\.aac$/.test(n))return decode(bytes,0,3)==='ID3'||(bytes[0]===255&&(bytes[1]&0xf0)===0xf0);
 if(/\.ogg$/.test(n))return h==='OggS';
 if(/\.flac$/.test(n))return h==='fLaC';
 if(/\.(jpg|jpeg)$/.test(n))return bytes[0]===255&&bytes[1]===216&&bytes[2]===255;
 if(/\.png$/.test(n))return bytes[0]===137&&decode(bytes,1,3)==='PNG'&&bytes[4]===13&&bytes[5]===10;
 if(/\.gif$/.test(n))return decode(bytes,0,6)==='GIF87a'||decode(bytes,0,6)==='GIF89a';
 if(/\.webp$/.test(n))return h==='RIFF'&&decode(bytes,8,4)==='WEBP';
 if(/\.avif$/.test(n))return decode(bytes,4,4)==='ftyp'&&/avif|avis/.test(decode(bytes,8,12));
 return false;
}
async function verify(file){
 if(!file||typeof file.slice!=='function')throw Error('Invalid or missing media file');
 const header=new Uint8Array(await file.slice(0,40).arrayBuffer());
 if(!supportedSignature(file.name,header))
  throw Error('Blocked suspicious upload: file contents do not match the audio/image filename. Only genuine original media is accepted.');
 return true;
}
root.MaruSafeMedia={supportedSignature,verify};
if(typeof module!=='undefined'&&module.exports)module.exports=root.MaruSafeMedia;
})(typeof globalThis!=='undefined'?globalThis:this);