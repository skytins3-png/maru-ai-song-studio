(function(root){
'use strict';
const REPO='https://github.com/skytins3-png/maru-ai-song-studio';
function clean(value,max){
  return String(value||'').replace(/[\u0000-\u001f\u007f]/g,' ').replace(/\s+/g,' ').trim().slice(0,max);
}
function issueUrl(name,topic,story,consent,requestedKst='') {
  const title=clean(topic,100),body=clean(story,1200),nick=clean(name,40)||'Anonymous listener';
  if(!consent)throw new Error('Please confirm public posting and radio-reading permission.');
  if(title.length<3)throw new Error('Please add a short title.');
  if(body.length<20)throw new Error('Please write at least 20 characters.');
  const slot=root.MaruStoryGuard.parseKstSlot(requestedKst);
  if(slot===null)throw new Error('Select a valid Korea time for your optional airtime request.');
  const guard=root.MaruStoryGuard.assess(nick,title,story);
  if(!guard.safe)throw new Error('Safety check: '+guard.reasons[0]);

  const issueTitle='[STORY] '+title;
  const issueBody=[
    '## Listener name',nick,'',
    '## Story',body,'',
    ...(slot?['## Requested airtime KST',requestedKst.trim(),'']:[]),
    '## Permission',
    '- [x] I have permission to submit this story for public posting and radio reading.',
    '- [x] I understand this GitHub Issue is publicly visible.',
    '',
    '## Optional public attachments (NOT approved for broadcast)',
    'Attach JPG/PNG, MP4 or MP3/WAV using GitHub paperclip below, if you have permission.',
    'Files become publicly accessible. MARU has NOT virus-scanned or copyright-cleared these files.',
    'Never attach private content, executable files, or unlicensed media.',
    '',
    '---',
    'This is a listener-submitted account, not a verified news report. The MARU producer reviews each story before broadcasting.'
  ].join('\n');
  const u=new URL(REPO+'/issues/new');
  u.searchParams.set('title',issueTitle);
  u.searchParams.set('body',issueBody);
  return u.href;
}
root.MaruStories={issueUrl,clean};
if(typeof document==='undefined')return;
const $=id=>document.getElementById(id);
$('storyForm').addEventListener('submit',event=>{
  event.preventDefault();
  try{
    const url=issueUrl($('storyName').value,$('storyTopic').value,
      $('storyBody').value,$('storyConsent').checked,$('storyAirTime').value);
    $('storyStatus').textContent='GitHub에서 로그인 → 📎 Attach files로 파일 선택 → Submit new issue를 눌러 접수를 완료하세요. 파일은 공개됩니다.';
    // Submit only from a direct click; never auto-post user content.
    window.location.assign(url);
  }catch(err){$('storyStatus').textContent=err.message;}
});
})(typeof globalThis!=='undefined'?globalThis:this);
