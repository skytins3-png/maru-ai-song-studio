#!/usr/bin/env python3
import importlib.util
import json
import os
from pathlib import Path
from tempfile import TemporaryDirectory
from unittest import TestCase,main,mock

root=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location("caseworker",root/"scripts"/"maru_issue_case_worker.py")
C=importlib.util.module_from_spec(spec);spec.loader.exec_module(C)

class TestCases(TestCase):
 def test_routing_for_issues_and_explicit_roles(self):
  self.assertEqual(C.select_roles("BIGO 청취자 송출 확인",""),["maru","mimi","audio-engineer"])
  self.assertEqual(C.select_roles("정산 자료","담당: agency-operations, tori"),["agency-operations","tori"])
  self.assertEqual(C.select_roles("Test","roles: leo, nuri, tori, happy"),["leo","nuri","tori"])
 def test_only_owner_issue_is_allowed(self):
  issue={"repository":{"full_name":"skytins3-png/maru-ai-song-studio","owner":{"login":"skytins3-png"}},
   "issue":{"number":101,"title":"공개 음악 검사","body":"담당: maru","user":{"login":"other-account"}}}
  with self.assertRaises(PermissionError):C.execute(issue)
 def test_owner_issue_creates_real_report_file_without_model_fabrication(self):
  event={"repository":{"full_name":"skytins3-png/maru-ai-song-studio","owner":{"login":"skytins3-png"}},
   "issue":{"number":103,"title":"BIGO 방송 검증","body":"담당: maru, mimi","user":{"login":"skytins3-png"}}}
  with TemporaryDirectory() as temp:
   with mock.patch.object(C,"ROOT",Path(temp)):
    with mock.patch.dict(os.environ,{"MARU_OPENAI_API_KEY":"","OPENAI_API_KEY":""}):
     with mock.patch("urllib.request.urlopen",side_effect=AssertionError("No API key, no calls")):
      result=C.execute(event)
   self.assertEqual(result["issue"],103)
   self.assertEqual(result["assignedRoles"],["maru","mimi"])
   self.assertEqual(result["modelReports"],0)
   actual=json.loads((Path(temp)/"agent-tasks/issues/issue-103.json").read_text(encoding="utf8"))
   self.assertEqual(actual["reports"][0]["model"]["status"],"not_configured")
   self.assertTrue((Path(temp)/"agent-tasks/case-summary.md").exists())
if __name__=="__main__":main()
