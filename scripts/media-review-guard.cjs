'use strict';
/** Public media proposal text gate; never proof of copyright or malware safety. */
const storyGuard=require('../music-share/story-guard.js');
const TYPES=new Set(['image','video','original-audio','external-song']);
const RIGHTS=new Set(['not-verified','creator-attested','licensed-attested']);
const FIELDS=['신청 미디어 종류','방송용 별명','작품 제목','제작자 정보','방송 소개','권리 상태 (자기 신고, 검증 안 됨)','희망 방송 시간 KST','안전 및 공개 동의'];
const CONSENT=['- [x] GitHub 공개 신청임을 이해하며 개인정보·파일·외부 링크를 첨부하지 않았습니다.','- [x] 권리 검증 및 제작자 승인 전에는 방송하지 않는 데 동의합니다.','','자동 송출 금지: 이 Issue에는 실제 파일이 없으며, 서버 바이러스 검사와 권리 검증 및 관리자 승인도 완료되지 않았습니다.'].join('\n');
function assessMedia(issue){
 if(!issue||issue.pull_request||typeof issue.title!=='string'||typeof issue.body!=='string'
   ||!issue.title.startsWith('[MEDIA-REVIEW] ')||issue.body.length>4000)
  return {safe:false};
 const body=issue.body.replace(/\r\n/g,'\n').trim();
 const headings=Array.from(body.matchAll(/^## ([^\n]+)\n/gm));
 if(headings.length!==FIELDS.length||headings[0].index!==0||headings.some((m,i)=>m[1]!==FIELDS[i]))return {safe:false};
 const blocks=headings.map((h,i)=>body.slice(h.index+h[0].length,
   i+1<headings.length?headings[i+1].index:body.length).trim());
 const [type,name,title,creator,description,rights,airtime,consent]=blocks;
 if(!TYPES.has(type)||!RIGHTS.has(rights)
  ||!name||name.length>40||!title||title.length<3||title.length>100
  ||!creator||creator.length>100||description.length<20||description.length>600
  ||issue.title!=='[MEDIA-REVIEW] '+title||consent!==CONSENT)
    return {safe:false};
 const scheduledAt=airtime==='미지정'?'':storyGuard.parseKstSlot(airtime);
 if(scheduledAt===null)return {safe:false};
 if(!storyGuard.assess(name,title,description).safe)return {safe:false};
 if(!storyGuard.assess('제작자','권리 정보',creator+' '+description).safe)return {safe:false};
 return {safe:true,proposal:{type,name,title,creator,description,rights,scheduledAt}};
}
module.exports={assessMedia};