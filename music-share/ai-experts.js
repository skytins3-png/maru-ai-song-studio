"use strict";
(async function () {
  const team = document.getElementById("team");
  const refs = document.getElementById("references");
  try {
    const response = await fetch("ai-experts.json", {cache:"no-store"});
    if (!response.ok) throw new Error("전문 역할 정보를 읽을 수 없습니다.");
    const cfg = await response.json();
    if (!Array.isArray(cfg.agents) || cfg.agents.length !== 10) throw new Error("역할 목록 검증 실패");
    for (const expert of cfg.agents) {
      const article = document.createElement("article");
      article.className = "item";
      const heading = document.createElement("h2");
      heading.textContent = expert.name + " · " + expert.specialty;
      const p = document.createElement("p");
      p.textContent = expert.mission;
      const status = document.createElement("small");
      status.className = "muted";
      status.textContent = "설계 단계 · 실행/방송은 운영자 승인";
      article.append(heading,p,status);
      team.append(article);
    }
    for (const source of cfg.sources) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      if (!["https://viva.pressbooks.pub/openmusictheory/front-matter/introduction/","https://owasp.org/projects/cheat-sheet-series","https://www.ffmpeg.org/legal.html"].includes(source.url)) continue;
      a.href = source.url; a.rel = "noopener noreferrer"; a.target="_blank";
      a.textContent = source.title;
      li.append(a, document.createTextNode(" — " + source.publisher + " / " + source.license));
      refs.append(li);
    }
  } catch (error) { team.textContent = String(error.message || "정보를 읽을 수 없습니다."); }
})();
