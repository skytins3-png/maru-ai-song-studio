(function(root){
'use strict';
const EXT=/\.(mp3|wav|m4a|aac|ogg|flac)$/i;
function titleFromFile(name){
 const x=String(name||'').replace(EXT,'').replace(/[\u0000-\u001f\u007f]/g,' ')
  .replace(/\s+/g,' ').trim();
 return x.slice(0,120)||'Original Song';
}
function validateBatch(files,artist,consent){
 if(!consent)throw Error('Confirm that every song is cleared for public downloads.');
 if(!artist||!String(artist).trim())throw Error('Artist or songwriter is required.');
 if(!Array.isArray(files)||!files.length)throw Error('Choose your original music files.');
 if(files.length>15)throw Error('Select no more than 15 songs per batch.');
 let total=0;
 for(const f of files){
  if(!f||!f.size||!EXT.test(String(f.name||'')))throw Error('Use non-empty MP3/WAV/M4A/AAC/OGG/FLAC files.');
  if(f.size>95*1024*1024)throw Error('Individual file is too large.');
  total+=f.size;
 }
 if(total>90*1024*1024)throw Error('This batch exceeds 90 MiB. Split into smaller batches.');
 return files.map(f=>titleFromFile(f.name));
}
function existingHashes(catalog){
 const hash=new Set();
 if(Array.isArray(catalog))for(const row of catalog){
  if(row&&typeof row.audioSha256==='string'&&/^[0-9a-f]{64}$/.test(row.audioSha256))hash.add(row.audioSha256);
 }
 return hash;
}
function hex(bytes){return Array.from(bytes,b=>b.toString(16).padStart(2,'0')).join('')}
root.MaruBatchCore={titleFromFile,validateBatch,existingHashes,hex};
})(typeof globalThis!=='undefined'?globalThis:this);