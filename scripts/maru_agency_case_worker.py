#!/usr/bin/env python3
"""MARU specialist+agency case-worker: evidence-first per-case reports.

No external platform logins, accounts, gifts, financial records or autonomous
broadcast control. Optional LLM inference requires an explicit secret and is
always labeled separately from deterministic checks.
"""
from __future__ import annotations
import datetime as dt
import json
import os
import pathlib
import ssl
import urllib.request
import urllib.error

ROOT = pathlib.Path(__file__).resolve().parents[1]
OUT = ROOT / "agency-reports" / "latest"
RUN = os.environ.get("GITHUB_RUN_ID", "local")
STAMP = dt.datetime.now(dt.timezone.utc).isoformat()
PUBLIC_REPO = "https://github.com/skytins3-png/maru-ai-song-studio"
MAX_AI_CALLS = 11

def load(path, fallback):
    try:
        return json.loads((ROOT / path).read_text(encoding="utf-8"))
    except (ValueError, FileNotFoundError, OSError):
        return fallback

def public_facts():
    experts = load("music-share/ai-experts.json", {})
    catalog = load("music-share/catalog.json", None)
    stories = load("music-share/approved-stories.json", None)
    daily = load("music-share/broadcast-daily.json", {})
    stamp = daily.get("generatedAt")
    age = None
    if isinstance(stamp, str):
        try:
            a = dt.datetime.fromisoformat(stamp.replace("Z", "+00:00"))
            if a.tzinfo:
                age = round((dt.datetime.now(dt.timezone.utc) - a).total_seconds() / 3600, 2)
        except ValueError:
            pass
    paths = {
        "studio_home": (ROOT / "index.html").is_file(),
        "radio_page": (ROOT / "music-share/radio.html").is_file(),
        "story_page": (ROOT / "music-share/stories.html").is_file(),
        "request_page": (ROOT / "music-share/requests.html").is_file(),
        "radio_core": (ROOT / "music-share/radio.js").is_file(),
        "browser_test": (ROOT / "tests/maru_mobile_browser_smoke.mjs").is_file(),
        "audio_source_recording": False,  # NOT a claim of actual listener audio.
    }
    return experts, {
        "publicCatalogCount": len(catalog) if isinstance(catalog, list) else None,
        "approvedStoriesCount": len(stories) if isinstance(stories, list) else None,
        "lastDailyRadioDataUTC": stamp,
        "dailyDataAgeHours": age,
        "publicWeatherCities": len(daily.get("weather", {})) if isinstance(daily.get("weather"),dict) else 0,
        "newsItemCount": len(daily.get("news",[])) if isinstance(daily.get("news"),list) else 0,
        "publicSiteFiles": paths,
        "tenSpecialistRolesDefined": len(experts.get("agents", [])) if isinstance(experts,dict) else 0,
        "agencySettlementRecordsProvided": False,
        "bigoListenerAudioProofProvided": False,
        "source": "Only files read from this public repository; no user account or private agency records",
    }

AGENCY = {
    "id": "agency-operations",
    "name": "MARU 에이전시 운영",
    "specialty": "BIGO 운영·정산·접수 점검",
    "mission": "증빙 없는 수익·수수료를 단정하지 않고, 접수된 건별로 정산·업로드·방송 상태 검토",
}
MISSIONS = {
    "broadcast-director": ("방송 편성 준비", "편성 검토 가능한 공개 방송 자료가 있는지 확인"),
    "conversation": ("사연·방송 대본 검토", "승인된 공개 사연 수와 공개 여부 확인"),
    "audio-engineer": ("실제 송출 근거 확인", "음원 재생 UI와 실제 BIGO 청취 증거를 분리 검토"),
    "composer": ("자작곡 공개 목록 점검", "공개 곡이 없는 경우 신규 완성곡을 꾸며내지 않음"),
    "arranger": ("편곡·전통악기 근거", "공개된 음원과 편곡 확인 자료의 존재 확인"),
    "lyricist": ("가사 작업 자료 점검", "검토 대상 원본 자료 없는 경우 작업 보류"),
    "rights-officer": ("저작권 검증 선행 점검", "공개 곡 목록의 권리 메타데이터 여부 확인"),
    "security-defender": ("보안 허용 화면 점검", "공개 사연과 요청 페이지 존재와 민감 정보 미수집 확인"),
    "incident-responder": ("복구·사고 대응 점검", "실제 사고 제보가 없으면 해결 완료를 선언하지 않음"),
    "research-qa": ("공개 자료 최신성 점검", "뉴스·날씨 타임스탬프와 출처 수 확인"),
    "agency-operations": ("에이전시 접수·정산 확인", "공개 접수/사연 상태와 정산 증빙 유무를 분리 확인"),
}

def inspect(role, facts):
    rid=role["id"]
    available = facts["publicSiteFiles"]
    checks=[]
    def add(title,ok,note):
        checks.append({"check":title,"passed":bool(ok),"evidence":str(note)[:350]})
    if rid=="broadcast-director":
        add("방송 페이지 확인",available["radio_page"],"music-share/radio.html")
        add("방송 자료 시각 확인",facts["dailyDataAgeHours"] is not None, facts["lastDailyRadioDataUTC"])
    elif rid=="conversation":
        add("사연 접수 페이지",available["story_page"],"music-share/stories.html")
        add("승인 사연 메타데이터 확인",facts["approvedStoriesCount"] is not None,facts["approvedStoriesCount"])
    elif rid=="audio-engineer":
        add("라디오 코드 존재",available["radio_core"],"music-share/radio.js")
        add("BIGO 실청취 별도 증거",False,"이 저장소에서 실제 청취 녹음 검증 불가")
    elif rid in ("composer","arranger","lyricist","rights-officer"):
        n=facts["publicCatalogCount"]
        add("공개 음원 목록 확인",n is not None, "공개 음원 수: "+str(n))
        add("검토 가능한 공개 음원 존재",n is not None and n>0, "공개 목록이 비면 새 곡 완성/저작권 통과를 주장할 수 없음")
    elif rid=="security-defender":
        add("사연 폼 존재",available["story_page"],"music-share/stories.html")
        add("신청곡 폼 존재",available["request_page"],"music-share/requests.html")
    elif rid=="incident-responder":
        add("코드·인터페이스 출처 존재",available["studio_home"],"index.html")
        add("실제 사고 제보·로그 증빙",False,"사고 발생/종결 증빙 미제공")
    elif rid=="research-qa":
        age=facts["dailyDataAgeHours"]
        add("뉴스·날씨 수집 시간 유효",age is not None and 0 <=age<=48, "생성 시각: "+str(facts["lastDailyRadioDataUTC"])+" (현재로부터 "+str(age)+"시간)")
        add("뉴스 항목 확인",facts["newsItemCount"]>0,"공개 뉴스 개수: "+str(facts["newsItemCount"]))
    elif rid=="agency-operations":
        add("공개 접수 페이지 접근 준비",available["request_page"] and available["story_page"],"음악·사연 신청 화면만 확인")
        add("공개 접수 내역 집계",facts["approvedStoriesCount"] is not None and facts["publicCatalogCount"] is not None,"공개 음원 "+str(facts["publicCatalogCount"])+"곡, 승인 사연 "+str(facts["approvedStoriesCount"])+"건")
        add("실제 에이전시 정산 증빙",False,"지급 계약·수수료 명세·계좌 자료 연결 없음; 수익 주장 금지")
    return checks

def ask_model(role, mission, facts, checks):
    key=os.environ.get("MARU_OPENAI_API_KEY","").strip()
    if not key:
        return {"status":"not_configured","error":"MARU_OPENAI_API_KEY GitHub Actions secret 미설정","model":None}
    model=os.environ.get("MARU_AGENT_MODEL","gpt-5-mini").strip()
    instructions=(
        "당신은 독립 실행되는 MARU 역할 담당 분석자입니다. 제공된 공개 저장소의 검사 데이터만 사용하세요. "
        "없는 실적·정산금·방송 송출 결과·라이선스 승인을 만들어내지 마세요. "
        "문서에 없는 사실은 '미확인'으로 표시하고, 위험한 자동 조작이나 유료 결제는 제안만 하세요. "
        "항목: 근거, 오늘의 판단, 미해결, 형의 승인 후 다음 단계. 짧은 한국어 보고서를 작성하세요."
    )
    payload={"model":model,"instructions":instructions,
        "input":json.dumps({"role":role["name"],"mission":mission,
                            "public_facts":facts,"checks":checks},ensure_ascii=False),
        "max_output_tokens":450,"store":False}
    req=urllib.request.Request("https://api.openai.com/v1/responses",
        data=json.dumps(payload).encode("utf-8"),
        headers={"Authorization":"Bearer "+key,"Content-Type":"application/json"},method="POST")
    try:
        with urllib.request.urlopen(req,timeout=35,context=ssl.create_default_context()) as response:
            obj=json.load(response)
        parts=[]
        for item in obj.get("output",[]):
            for t in item.get("content",[]):
                if t.get("type")=="output_text" and isinstance(t.get("text"),str):
                    parts.append(t["text"])
        result="\n".join(parts).strip()
        if not result: raise ValueError("Model returned no output_text")
        return {"status":"model_report_generated","model":model,"text":result[:6000],"response_id":str(obj.get("id",""))[:80]}
    except (urllib.error.HTTPError,urllib.error.URLError,TimeoutError,ValueError,KeyError) as exc:
        kind=type(exc).__name__
        return {"status":"model_call_failed","model":model,"error":kind+" (details withheld to avoid exposing credentials)"}

def main():
    experts,facts=public_facts()
    allroles=[]
    for role in experts.get("agents",[]):
        if role.get("id") in MISSIONS:allroles.append(role)
    allroles.append(AGENCY)
    assert len(allroles)==11, "Must preserve all ten specialists plus one agency role"
    OUT.mkdir(parents=True,exist_ok=True)
    summary=[]
    for role in allroles:
        rid=role["id"]
        title,mission=MISSIONS[rid]
        checks=inspect(role,facts)
        ai=ask_model(role,mission, facts,checks)
        outcome="checks_passed" if all(c["passed"] for c in checks) else "blocked_missing_evidence"
        case={"caseId":rid+"-"+dt.datetime.now(dt.timezone.utc).strftime("%Y%m%d"),
              "agentId":rid,"agentName":role["name"],"caseTitle":title,"mission":mission,
              "checkedAt":STAMP,"runId":RUN,"runUrl":(PUBLIC_REPO+"/actions/runs/"+RUN if RUN.isdigit() else None),
              "automationType":"repository_evidence_audit",
              "reportStatus":outcome,
              "checks":checks,"modelInference":ai,
              "realWorldAction":"none","approvedForBroadcast":False,
              "note":"정적 보고서는 사실 검사입니다. 독립 모델 활동은 modelInference.status= model_report_generated일 때만 입증됩니다."}
        (OUT/(rid+".json")).write_text(json.dumps(case,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
        summary.append({"agentId":rid,"agentName":role["name"],"title":title,
                        "caseId":case["caseId"],"reportFile":rid+".json",
                        "status":outcome,"modelStatus":ai["status"],
                        "passedChecks":sum(c["passed"] for c in checks),"totalChecks":len(checks)})
        print(f"CASE {rid}: {outcome} {sum(c['passed'] for c in checks)}/{len(checks)}; model={ai['status']}")
    index={"schemaVersion":1,"generatedAt":STAMP,"runId":RUN,"runUrl":(PUBLIC_REPO+"/actions/runs/"+RUN if RUN.isdigit() else None),
           "source":"actual GitHub repository files","count":len(summary),
           "independentModelsVerified":sum(x["modelStatus"]=="model_report_generated" for x in summary),
           "privacy":"public-source metadata only; no private settlement details",
           "cases":summary}
    (OUT/"index.json").write_text(json.dumps(index,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    print("REPORTS "+str(OUT)+" ("+str(len(summary))+" cases)")
if __name__=="__main__":
    main()
