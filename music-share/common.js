(function(root){
'use strict';
const audioExtensions=/\.(mp3|wav|m4a|aac|ogg|flac)$/i;
const imageExtensions=/\.(jpg|jpeg|png|webp|gif|avif)$/i;
function mediaPath(value,folder){
  return typeof value==='string' && new RegExp('^'+folder+'/[^/\\\\?#%]+$').test(value) &&
    !/[\u0000-\u001f]/.test(value) && !value.includes('..') && !/%2e|%2f|%5c/i.test(value) && (folder==='tracks'?audioExtensions:imageExtensions).test(value);
}
function publicTracks(value){
  if(!Array.isArray(value))throw new Error('음악 목록 형식이 올바르지 않습니다.');
  const ids=new Set();
  return value.filter(t=>{
    if(!t||typeof t!=='object'||t.downloadAllowed!==true||typeof t.id!=='string'||!t.id||ids.has(t.id)||!mediaPath(t.audio,'tracks'))return false;
    ids.add(t.id);return true;
  });
}
function validateFiles(audio,cover){
  if(!audio||!audio.size||!audioExtensions.test(audio.name))throw new Error('MP3, WAV, M4A, AAC, OGG, FLAC 음악 파일을 선택하세요.');
  if(audio.size>95*1024*1024)throw new Error('음악 파일은 95MiB 이하로 올려 주세요.');
  if(cover&&(!cover.size||!imageExtensions.test(cover.name)))throw new Error('JPG, PNG, WEBP, GIF, AVIF 표지를 선택하세요.');
  if(cover&&cover.size>10*1024*1024)throw new Error('표지 이미지는 10MiB 이하로 올려 주세요.');
}
function slug(s){return String(s).normalize('NFC').replace(/[^a-zA-Z0-9가-힣_-]+/g,'-').replace(/^-+|-+$/g,'').slice(0,55)||'track'}
function extension(s){return s.split('.').pop().toLowerCase()}
root.MusicShare={mediaPath,publicTracks,validateFiles,slug,extension};
})(globalThis);
