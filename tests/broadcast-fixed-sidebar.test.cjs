const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.join(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const html=read('index.html'),css=read('styles.css'),js=read('app.js'),sw=read('sw.js');
test('fixed-size left list and dedicated per-song media area exist',()=>{
 assert.match(html,/id="maruBroadcastWorkspace"/);
 assert.match(html,/class="maru-broadcast-sidebar"/);
 assert.match(html,/id="broadcastQueue"/);
 assert.match(html,/id="maruMediaStageVideo"/);
 assert.match(html,/id="maruMediaStageImage"/);
 assert.match(html,/id="maruMediaStageFullscreen"/);
 assert.match(css,/#maruBroadcastWorkspace #broadcastQueue[\s\S]*?overflow-y:auto!important/);
 assert.match(css,/#maruBroadcastWorkspace[^\n]*grid-template-columns:minmax\(245px,40%\)/);
 assert.match(css,/#maruBroadcastWorkspace \.maru-media-stage-frame img,#maruBroadcastWorkspace \.maru-media-stage-frame video[\s\S]*?object-fit:cover!important/);
});
test('every row has a selectable title and retains its existing track controls',()=>{
 assert.match(js,/data-broadcast-preview=/);
 assert.match(js,/data-broadcast-play=/);
 assert.match(js,/data-broadcast-cover=/);
 assert.match(js,/data-broadcast-video=/);
 assert.match(js,/data-broadcast-up=/);
 assert.match(js,/data-broadcast-down=/);
 assert.match(js,/function showMaruTrackPreview\(/);
 assert.match(js,/id===maruPreviewTrackId\)void showMaruTrackPreview\(index,\{force:true\}\)/);
});
test('preview does not replace original audio stream or overwrite saved media',()=>{
 assert.match(js,/video\.muted=true/);
 assert.match(js,/revokeObjectURL\(maruPreviewObjectUrl\)/);
 assert.match(js,/record\?\.coverBlob/);
 assert.match(js,/record\?\.videoBlob/);
 assert.match(js,/broadcastCurrentIds\(\)\[index\]/);
 assert.match(js,/prepareOriginalBroadcastElement2289\(el\)/);
});
test('cache version prevents stale UI in installed browser PWA',()=>{
 assert.match(html,/styles\.css\?v=0\.24\.10/);
 assert.match(html,/app\.js\?v=0\.24\.10/);
 assert.match(sw,/maru-music-v0\.24\.10-left-fixed-playlist/);
 assert.match(sw,/styles\.css\?v=0\.24\.10/);
 assert.match(sw,/app\.js\?v=0\.24\.10/);
});

test('playlist scroll stays in place when playback, checkbox or media changes rerender rows',()=>{
 assert.match(js,/sidebarScrollTop=box\.scrollTop/);
 assert.match(js,/box\.scrollTop=sidebarScrollTop/);
 assert.match(css,/overflow-y:auto!important/);
 assert.match(css,/touch-action:pan-y/);
});
test('move directly to first position preserves the original track identity and media binding',()=>{
 assert.match(js,/function moveBroadcastTrackToTop\(i\)/);
 assert.match(js,/const ids=broadcastCurrentIds\(\),\[song\]=broadcastFiles\.splice\(i,1\),\[songId\]=ids\.splice\(i,1\)/);
 assert.match(js,/broadcastFiles\.unshift\(song\);ids\.unshift\(songId\)/);
 assert.match(js,/data-broadcast-top=/);
 assert.match(js,/data-broadcast-up=/);
 assert.match(js,/data-broadcast-down=/);
});
test('song video and cover decoding failures keep a visible fallback',()=>{
 assert.match(js,/video\.onerror=\(\)=>/);
 assert.match(js,/img\.onerror=\(\)=>/);
 assert.match(js,/video\.muted=true/);
 assert.match(css,/object-fit:cover!important/);
});
test('existing playback previous and next controls still use the same original song queue',()=>{
 assert.match(js,/async function broadcastPrevious\(\)/);
 assert.match(js,/async function broadcastTransitionToNext\(manual=false\)/);
 assert.match(js,/async function broadcastJumpTo\(i\)/);
 assert.match(js,/data-broadcast-play=/);
 assert.match(js,/broadcastOrderWrite\(ids\)/);
});
