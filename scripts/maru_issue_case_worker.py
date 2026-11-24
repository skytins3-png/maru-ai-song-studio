#!/usr/bin/env python3
"""Handle one OWNER-created public GitHub issue as a real per-case MARU task.
Each assigned role gets a distinct model request when an API key is configured;
otherwise reports explicit failure to connect (not fake completion).
"""
from __future__ import annotations
import importlib.util
import json
import os
from pathlib import Path
import re
import sys
import datetime as dt

ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location("role_runner",ROOT/"scripts"/"maru_18_role_runner.py")
R=importlib.util.module_from_spec(spec)
spec.loader.exec_module(R)

def select_roles(title,body):
    m=re.search(r"(?im)^\s*(?:담당|roles?)\s*:\s*([a-z0-9,\- ]+)\s*$",body)
    if m:
        requested=[x.strip().lower() for x in m.group(1).split(",")]
        allowed=[x for x in dict.fromkeys(requested) if x in R.ROLES]
        if allowed:return allowed[:3]
    data=(title+"\n"+body).lower()
    if any(x in data for x in ("bigo","비고","송출","라디오","방송")):return ["maru","mimi","audio-engineer"]
    if any(x in data for x in ("suno","30명","가수","음원","목소리")):return ["leo","composer","rights-officer"]
    if any(x in data for x in ("에이전시","정산","수수료","선물")):return ["agency-operations","tori","research-qa"]
    if any(x in data for x in ("오류","버그","테스트","설치","apk")):return ["leo","nuri","tori"]
    return ["maru","leo","tori"]

def execute(data):
    issue=data.get("issue") or {}
    author=str((issue.get("user") or {}).get("login") or "")
    repo=str((data.get("repository") or {}).get("full_name") or "")
    owner=str(((data.get("repository") or {}).get("owner") or {}).get("login") or "")
    if author!=owner or repo!="skytins3-png/maru-ai-song-studio":
        raise PermissionError("Only repository owner public issues are eligible for AI requests.")
    number=issue.get("number")
    if not isinstance(number,int) or number<=0:raise ValueError("Issue number missing")
    title=str(issue.get("title") or "").strip()[:180]
    body=str(issue.get("body") or "").strip()[:2500]
    if not title:raise ValueError("Issue title missing")
    roles=select_roles(title,body)
    facts=R.evidence()
    # Public Issue text is already public; never copy secrets into prompts or logs.
    # The app must not request card details, passwords or account tokens in issues.
    facts["publicIssue"]={"number":number,"title":title,
                           "body":body[:1600],
                           "url":"https://github.com/"+repo+"/issues/"+str(number)}
    records=[]
    for role in roles:
        details=R.build(role,facts)
        details["caseId"]="issue-"+str(number)+"-"+role
        details["issueNumber"]=number
        details["issueTitle"]=title
        records.append(details)
    now=dt.datetime.now(dt.timezone.utc).isoformat()
    summary={
      "caseId":"issue-"+str(number),"issue":number,"title":title,
      "createdAt":now,"source":"public owner issue",
      "assignedRoles":roles,
      "modelReports":sum(x["model"]["status"]=="model_report_generated" for x in records),
      "modelUnconnectedOrFailed":sum(x["model"]["status"]!="model_report_generated" for x in records),
      "status":"model_reports_generated" if all(x["model"]["status"]=="model_report_generated" for x in records) else "model_not_fully_connected",
      "realWorldAction":"none",
      "reports":records
    }
    dest=ROOT/"agent-tasks"/"issues"
    dest.mkdir(parents=True,exist_ok=True)
    path=dest/("issue-"+str(number)+".json")
    path.write_text(json.dumps(summary,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
    md=["## MARU 업무 #"+str(number)+" 건별 처리 결과","","요청: "+title,
         "처리 시각: "+now,"","담당 역할: "+", ".join(R.ROLES[x][0] for x in roles),
         "AI 모델 실제 생성 보고서: "+str(summary["modelReports"])+"/"+str(len(roles)),""]
    for x in records:
       md+=["### "+x["label"],"- 자료 검사: "+str(x["sourceCheckPassed"])+"/"+str(x["sourceCheckCount"]),
            "- 실제 AI: "+x["model"]["status"]]
       if x["model"].get("report"):md+=["",x["model"]["report"][:3000]]
       else:md+=["- 사유: "+x["model"].get("reason","모델 응답 미확인")]
       md+=[""]
    md+=["외부 방송 송출·Suno 로그인·기기 파일 전송·지출 결제: **실행하지 않음**.",
          "이 결과는 GitHub 저장소 내 공개 자료 검사이며, 형의 기기 테스트와 다릅니다."]
    (ROOT/"agent-tasks"/"case-summary.md").write_text("\n".join(md)+"\n",encoding="utf8")
    print("CASE #"+str(number),len(roles),"roles; model completions",summary["modelReports"],"/",len(roles))
    return summary

if __name__=="__main__":
    src=os.environ.get("GITHUB_EVENT_PATH")
    if not src or not Path(src).is_file():raise SystemExit("GitHub issue event JSON unavailable")
    try:execute(json.loads(Path(src).read_text(encoding="utf8")))
    except (PermissionError,ValueError) as e:
        print("ISSUE NOT PROCESSED:",str(e),file=sys.stderr)
        raise SystemExit(2)
