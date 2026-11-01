(function(root){
'use strict';
const REPO='https://github.com/skytins3-png/maru-ai-song-studio';
const TYPES=['image','video','original-audio','external-song'];
const RIGHTS=['not-verified','creator-attested','licensed-attested'];
function clean(value,max){
 return root.MaruStoryGuard.clean(value,max);
}
function issueUrl(data){
 const type=String(data.type||'');
 if(!TYPES.includes(type))throw Error('허용되지 않은 미디어 종류입니다.');
 const rights=String(data.rights||'');
 if(!RIGHTS.includes(rights))throw Error('권리 상태를 선택하세요.');
 if(!data.publicConsent||!data.broadcastConsent)throw Error('공개 게시와 방송 권리 확인 사항에 동의해야 합니다.');
 const name=clean(data.name,40)||'익명 청취자',title=clean(data.title,100),creator=clean(data.creator,100);
 const story=clean(data.description,600);
 if(!creator)throw Error('제작자 또는 아티스트 정보를 입력하세요.');
 const guard=root.MaruStoryGuard.assess(name,title,story);
 if(!guard.safe)throw Error('신청 내용 검사: '+guard.reasons[0]);
 const date=root.MaruStoryGuard.parseKstSlot(data.airtime||'');
 if(date===null)throw Error('희망 방송 날짜와 시간을 확인하세요.');
 const body=[
  '## 신청 미디어 종류',type,'','## 방송용 별명',name,'',
  '## 작품 제목',title,'','## 제작자 정보',creator,'',
  '## 방송 소개',story,'',
  '## 권리 상태 (자기 신고, 검증 안 됨)',rights,'',
  '## 희망 방송 시간 KST',date?String(data.airtime).trim():'미지정','',
  '## 안전 및 공개 동의',
  '- [x] GitHub 공개 신청임을 이해하며 개인정보·파일·외부 링크를 첨부하지 않았습니다.',
  '- [x] 권리 검증 및 제작자 승인 전에는 방송하지 않는 데 동의합니다.',
  '',
  '자동 송출 금지: 이 Issue에는 실제 파일이 없으며, 서버 바이러스 검사와 권리 검증 및 관리자 승인도 완료되지 않았습니다.'
 ].join('\n');
 const url=new URL(REPO+'/issues/new');
 url.searchParams.set('title','[MEDIA-REVIEW] '+title);
 url.searchParams.set('body',body);
 return url.href;
}
root.MaruMediaProposal={issueUrl};
if(typeof document==='undefined')return;
const $=id=>document.getElementById(id);
$('mediaProposalForm').addEventListener('submit',event=>{
 event.preventDefault();
 try{
  const url=issueUrl({type:$('mediaType').value,name:$('mediaName').value,
    title:$('mediaTitle').value,creator:$('mediaCreator').value,
    description:$('mediaDescription').value,rights:$('mediaRights').value,
    airtime:$('mediaAirTime').value,publicConsent:$('mediaPublicConsent').checked,
    broadcastConsent:$('mediaBroadcastConsent').checked});
  $('mediaProposalStatus').textContent='GitHub에서 내용을 확인하고 Submit new issue를 눌러야 신청이 접수됩니다. 파일은 전송되지 않습니다.';
  window.location.assign(url);
 }catch(e){$('mediaProposalStatus').textContent=e.message;}
});
})(typeof globalThis!=='undefined'?globalThis:this);