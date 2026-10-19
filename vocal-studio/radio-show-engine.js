(function(root,build){"use strict";const x=build();if(typeof module==="object"&&module.exports)module.exports=x;if(root)root.MaruShow=x;})(typeof globalThis==="object"?globalThis:this,function(){"use strict";
const CATEGORIES=["KR","CN","WEST","INSTR"],NAMES={KR:"한국",CN:"중국",WEST:"서양",INSTR:"연주"};
const HOSTS=["마루","별하","가람","서율","나린","하온","채온","우림"];
function clean(v,n=120){return String(v??"").replace(/[<>\u0000-\u001f]/g,"").trim().slice(0,n)}
function title(s){return clean(String(s).replace(/\.(mp3|m4a|wav|aac|flac|ogg)$/i,""),90)}
function category(s){const v=title(s).toLowerCase();if(/instrumental|piano|연주|피아노|纯音乐|鋼琴|钢琴|no vocals/.test(v))return "INSTR";if(/[\uac00-\ud7a3]/.test(v))return "KR";if(/[\u4e00-\u9fff]/.test(v))return "CN";return "WEST"}
function choose(tracks,history,now,index,cooldown=1200000){
 const valid=tracks.filter(t=>!history.some(x=>x.id===t.id&&now-x.at<cooldown));
 if(!valid.length)return null;for(let j=0;j<4;j++){const i=((index+j)%4+4)%4,t=valid.find(x=>x.category===CATEGORIES[i]);if(t)return {track:t,index:(i+1)%4}}return null;
}
function before(track,number){
 const t=title(track.title);
 if(track.category==="CN")return [
 {speaker:"마루",lang:"ko-KR",text:"마루 라디오입니다. 이번에는 중국어 자작곡을 소개할게요."},
 {speaker:"별하",lang:"zh-CN",text:"大家好，欢迎来到马鲁音乐时间。接下来请欣赏一首原创歌曲。"},
 {speaker:"가람",lang:"ko-KR",text:"함께 편안한 시간 보내세요. 곡 제목은 "+t+"입니다."}];
 if(track.category==="INSTR")return [
 {speaker:"마루",lang:"ko-KR",text:"잠시 쉬어 가며 연주곡 한 편을 들려드릴게요."},
 {speaker:"나린",lang:"ko-KR",text:"편안하게 음악에 귀 기울여 주세요."},
 {speaker:"우림",lang:"ko-KR",text:t+"입니다."}];
 if(track.category==="WEST")return [
 {speaker:"마루",lang:"ko-KR",text:"이번에는 서양풍 자작곡을 소개해요."},
 {speaker:"하온",lang:"en-US",text:"Welcome to Maru Radio. Here comes our next original song."},
 {speaker:"서율",lang:"ko-KR",text:"오늘의 "+number+"번째 곡, "+t+" 들려드립니다."}];
 return [
 {speaker:"마루",lang:"ko-KR",text:"어서 오세요. 자작곡을 들려드리는 마루 라디오입니다."},
 {speaker:"별하",lang:"ko-KR",text:"함께 노래를 듣고 이야기 나눌 수 있어 좋아요."},
 {speaker:"채온",lang:"ko-KR",text:"이번에 들려드릴 노래는 "+t+"입니다."}];
}
function after(track){return [{speaker:"가람",lang:"ko-KR",text:title(track.title)+", 잘 들으셨나요? 음악의 여운을 함께 나눠요."},{speaker:"마루",lang:"ko-KR",text:"잠시 후 다음 자작곡과 새로운 이야기로 이어집니다."}]}
function reply(s){const msg=clean(s,150).toLowerCase();if(!msg)return null;
if(/욕|죽어|씨발|fuck|bitch|idiot|꺼져|멍청|성희롱|性骚扰/.test(msg))return {speaker:"서율",lang:"ko-KR",text:"서로 존중하며 음악을 즐겨 주세요. 불쾌한 댓글은 읽지 않겠습니다."};
if(/신청곡|노래.*틀|点歌|request|play a song/.test(msg))return {speaker:"마루",lang:"ko-KR",text:"고맙습니다. 이 방송은 준비된 자작곡 위주로 들려드리고 있어요."};
if(/谢谢|你好|好听/.test(msg))return {speaker:"나린",lang:"zh-CN",text:"谢谢你的留言，欢迎一起欣赏音乐！"};
if(/고마|감사|좋아|안녕|반가|hello|hi|thanks|good/.test(msg))return {speaker:"채온",lang:"ko-KR",text:"함께해 주셔서 고마워요. 다음 노래도 기대해 주세요."};
return {speaker:"우림",lang:"ko-KR",text:"메시지 고맙습니다. 음악과 함께 편안한 시간 보내세요."}};
return {CATEGORIES,NAMES,HOSTS,clean,title,category,choose,before,after,reply};
});