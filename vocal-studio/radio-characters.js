(function(root, factory) {
  "use strict";
  const catalog = factory();
  if (typeof module === "object" && module.exports) module.exports = catalog;
  if (root) root.MaruCharacters = catalog;
})(typeof globalThis === "object" ? globalThis : this, function() {
  "use strict";
  // All eight identities are fictional, fixed visual concepts, not real singers
  // or active AI models. Never assume someone else's face/voice is licensed.
  const CHARACTERS = Object.freeze([
    {id:"ahwan", name:"아환", role:"host", department:"방송 진행부", specialty:"총괄 진행 · 곡 소개", style:"네이비 재킷 · 흰 셔츠", personality:"따뜻하고 신뢰감 있는 진행자", voice:"차분한 중저음", hair:"#29273c", coat:"#294567", skin:"#e4ba9d", accent:"#c6a3ff"},
    {id:"yunsol", name:"윤솔", role:"host", department:"방송 진행부", specialty:"사연 공감 · 대화", style:"라벤더 재킷 · 단정한 긴 머리", personality:"재치 있고 부드러운 공감형 진행자", voice:"명료하고 편안한 톤", hair:"#543c38", coat:"#8063a1", skin:"#e8c3a6", accent:"#f5c7e7"},
    {id:"kang", name:"강태준", role:"singer", department:"무대 공연부", specialty:"한국 발라드 · 팝", style:"버건디 정장 · 단정한 헤어", personality:"절제된 감정 표현", voice:"허스키한 남성 발라드", hair:"#302d33", coat:"#713f56", skin:"#dab095", accent:"#f4c1d5"},
    {id:"cheongho", name:"청호", role:"singer", department:"무대 공연부", specialty:"트로트 · 밝은 공연", style:"아이보리 무대 재킷", personality:"활기찬 무대 매너", voice:"힘 있는 남성 보컬", hair:"#4a3528", coat:"#c0a479", skin:"#e9bb97", accent:"#ffe4a9"},
    {id:"seoa", name:"서아", role:"singer", department:"무대 공연부", specialty:"한국 감성 발라드", style:"청록색 드레스 · 웨이브 헤어", personality:"섬세하고 진솔한 감정", voice:"부드러운 여성 저음", hair:"#51362d", coat:"#397f83", skin:"#eac7ab", accent:"#9ce9d9"},
    {id:"rina", name:"린아", role:"singer", department:"무대 공연부", specialty:"중국풍 · 서정적 노래", style:"진홍색 동양풍 무대 의상", personality:"차분한 동양적 선율 표현", voice:"서정적인 여성 보컬", hair:"#27202b", coat:"#a74760", skin:"#f0c7ae", accent:"#f8a7b9"},
    {id:"minhyuk", name:"민혁", role:"guest", department:"초대석 대화부", specialty:"인터뷰 · 유쾌한 대화", style:"그레이 니트 재킷", personality:"재치 있고 편안한 게스트", voice:"자연스러운 대화체", hair:"#4e433b", coat:"#64748b", skin:"#dfb298", accent:"#9dc4ff"},
    {id:"harin", name:"하린", role:"guest", department:"초대석 대화부", specialty:"청취자 사연 · 공감", style:"코랄색 블라우스", personality:"따뜻한 공감과 웃음", voice:"친근한 대화체", hair:"#433142", coat:"#b56d82", skin:"#eac6ac", accent:"#ffbccc"}
  ]);
  const BY_NAME = new Map(CHARACTERS.map(c => [c.name, c]));
  const BY_ID = new Map(CHARACTERS.map(c => [c.id, c]));
  const MODES = Object.freeze(["stage","talk","bridge","idle"]);
  function find(value) { return BY_NAME.get(value) || BY_ID.get(value) || CHARACTERS[0]; }
  function singerFor(category) {
    // An instrumental track must not be falsely portrayed as live singing.
    return category === "KR" ? find("강태준") :
      category === "CN" ? find("린아") :
      category === "WEST" ? find("서아") : null;
  }
  function guestFor(speaker) {
    const candidate = find(speaker);
    return candidate.id === "ahwan" ? find("윤솔") : candidate;
  }
  function modeForCue(kind) {
    if (kind === "song") return "stage";
    if (kind === "conversation" || kind === "story") return "talk";
    if (kind === "intro" || kind === "outro" || kind === "intermission") return "bridge";
    return "idle";
  }
  function mediaType(file) {
    if (!file || typeof file.name !== "string" || !Number.isFinite(file.size)) return "";
    const name = file.name.toLowerCase();
    const mime = String(file.type || "").toLowerCase();
    if (/\.(mp4|webm)$/.test(name) && file.size > 1000 &&
        file.size <= 200 * 1024 * 1024 &&
        (!mime || mime === "video/mp4" || mime === "video/webm")) return "video";
    if (/\.(jpg|jpeg|png|webp)$/.test(name) && file.size > 100 &&
        file.size <= 20 * 1024 * 1024 &&
        (!mime || ["image/jpeg","image/png","image/webp"].includes(mime))) return "image";
    return "";
  }
  return { CHARACTERS, MODES, find, singerFor, guestFor, modeForCue, mediaType };
});
