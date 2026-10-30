(function(root){
'use strict';
const REPO='https://github.com/skytins3-png/maru-ai-song-studio';
function clean(value,max){
  return String(value||'').replace(/[\\u0000-\\u001f\\u007f]/g,' ').replace(/\\s+/g,' ').trim().slice(0,max);
}
function issueUrl(name,topic,story,consent) {
  const title=clean(topic,100),body=clean(story,1200),nick=clean(name,40)||'Anonymous listener';
  if(!consent)throw new Error('Please confirm public posting and radio-reading permission.');
  if(title.length<3)throw new Error('Please add a short title.');
  if(body.length<20)throw new Error('Please write at least 20 characters.');
  const issueTitle='[STORY] '+title;
  const issueBody=[
    '## Listener name',nick,'',
    '## Story',body,'',
    '## Permission',
    '- [x] I have permission to submit this story for public posting and radio reading.',
    '- [x] I understand this GitHub Issue is publicly visible.',
    '',
    '---',
    'This is a listener-submitted account, not a verified news report. The MARU producer reviews each story before broadcasting.'
  ].join('\\n');
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
      $('storyBody').value,$('storyConsent').checked);
    $('storyStatus').textContent='Opening GitHub. Sign in and click Submit new issue to actually send your story.';
    // Submit only from a direct click; never auto-post user content.
    window.location.assign(url);
  }catch(err){$('storyStatus').textContent=err.message;}
});
})(typeof globalThis!=='undefined'?globalThis:this);
