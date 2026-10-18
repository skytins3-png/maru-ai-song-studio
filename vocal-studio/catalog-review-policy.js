/* Pure validation and dedup helpers. Does not upload songs or infer singers. */
(function(root,factory) {
  const api=factory();
  if(typeof module==="object" && module.exports) module.exports=api;
  if(root) root.MaruCatalogReviewPolicy=api;
})(typeof globalThis==="object"?globalThis:this,function() {
 "use strict";
 function validate(report) {
   if(!report||!Array.isArray(report.tracks)||report.tracks.length<1||report.tracks.length>10000)throw new Error("유효한 오디오 분석 JSON을 선택하세요.");
   const tracks=[];
   for(const row of report.tracks){
     if(typeof row.filename!=="string"||!row.filename.trim()||typeof row.sha256!=="string"||!/^[a-f0-9]{64}$/i.test(row.sha256))
       throw new Error("분석 JSON의 파일명 또는 SHA-256 형식이 잘못되었습니다.");
     if(!Number.isFinite(row.durationSeconds)||row.durationSeconds<=0)throw new Error("재생시간 데이터 오류");
     tracks.push({...row,sha256:row.sha256.toLowerCase()});
   }
   return tracks;
 }
 function dedupe(tracks){
   const first=new Map(),dupes=[];
   for(const song of tracks){
      if(first.has(song.sha256))dupes.push({original:first.get(song.sha256).filename,duplicate:song.filename,sha256:song.sha256});
      else first.set(song.sha256,song);
   }
   return {unique:[...first.values()],duplicates:dupes};
 }
 function languageHint(s){
   const hint=s.titleLanguageHint||"";
   if(hint.includes("중국어"))return "중국어 제목";
   if(hint.includes("한국어"))return "한국어 제목";
   if(hint.includes("일본어"))return "일본어 제목";
   return "기타·확인 필요";
 }
 function reviewCounts(reviews){let complete=0;
    for(const s of Object.values(reviews||{}))if(s&&s.listeningDone===true)complete++;
    return complete;
 }
 return {validate,dedupe,languageHint,reviewCounts};
});