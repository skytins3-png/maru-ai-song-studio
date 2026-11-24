#!/usr/bin/env python3
"""Unit tests for trustworthy 18-role activity and real Responses API parsing."""
import importlib.util
import io
import json
import os
from pathlib import Path
from unittest import TestCase,main,mock

ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location("maru_18_role_runner",ROOT/"scripts"/"maru_18_role_runner.py")
W=importlib.util.module_from_spec(spec)
spec.loader.exec_module(W)

class TestRoleWorker(TestCase):
    def test_roster_all_original_roles(self):
        self.assertEqual(len(W.ROLES),18)
        for name in ("maru","leo","toto","mimi","happy","tori","nuri","agency-operations"):
            self.assertIn(name,W.ROLES)
        self.assertEqual(len(W.ROLE10),10)

    def test_zero_api_key_must_not_invent_model_execution(self):
        with mock.patch.dict(os.environ,{"MARU_OPENAI_API_KEY":"","OPENAI_API_KEY":""}):
            with mock.patch("urllib.request.urlopen",side_effect=AssertionError("Must not contact model")):
                report=W.build("mimi",W.evidence())
        self.assertEqual(report["execution"],"evidence_checks_performed")
        self.assertEqual(report["model"]["status"],"not_configured")
        self.assertEqual(report["realWorldExternalAction"],"none")
        self.assertFalse(report["broadcastVerified"])

    def test_model_report_must_actually_parse_output_text(self):
        result={"id":"resp_example","output":[{"content":[
            {"type":"output_text","text":"확인된 근거: RADlO 파일 존재\n당일 수행한 판단: 실제 BIGO 수신은 미검증"}
        ]}]}
        class FakeResponse:
            def __enter__(self):return io.BytesIO(json.dumps(result).encode("utf8"))
            def __exit__(self,*args):pass
        def spy(request,*args,**kwargs):
            self.assertEqual(request.full_url,"https://api.openai.com/v1/responses")
            self.assertEqual(request.headers.get("Authorization"),"Bearer test-not-real")
            sent=json.loads(request.data.decode("utf8"))
            self.assertEqual(sent["store"],False)
            self.assertIn("source",sent["input"])
            return FakeResponse()
        with mock.patch.dict(os.environ,{"MARU_OPENAI_API_KEY":"test-not-real","OPENAI_API_KEY":""}):
            with mock.patch("urllib.request.urlopen",side_effect=spy):
                out=W.build("maru",W.evidence())
        self.assertEqual(out["model"]["status"],"model_report_generated")
        self.assertIn("확인된 근거",out["model"]["report"])
        self.assertEqual(out["model"]["responseId"],"resp_example")

    def test_failed_model_request_is_exposed_not_disguised_as_success(self):
        with mock.patch.dict(os.environ,{"MARU_OPENAI_API_KEY":"invalid","OPENAI_API_KEY":""}):
            with mock.patch("urllib.request.urlopen",side_effect=ValueError("provider test error")):
                x=W.build("agency-operations",W.evidence())
        self.assertEqual(x["model"]["status"],"model_call_failed")
        self.assertNotIn("invalid",json.dumps(x))
        self.assertNotIn("provider test error",json.dumps(x))

    def test_copilot_requires_real_subprocess_output_and_never_exposes_token(self):
        korean=("확인된 근거: 저장소의 음악 파일 검증 완료.\\n"
                "담당자 판단: 기기 음성 출력은 아직 미확인.\\n"
                "미해결 사항: BIGO 청취자 송출 기록 없음.\\n"
                "다음 실제 작업: 두 번째 기기로 송출을 청취 확인.\\n"
                "승인 필요 여부: 방송 장치 점검에 사용자 승인 필요.")
        fake=type("Result",(),{"returncode":0,"stdout":korean,"stderr":""})()
        with mock.patch.dict(os.environ,{"MARU_OPENAI_API_KEY":"",
                                     "OPENAI_API_KEY":"",
                                     "MARU_COPILOT_ENABLED":"1",
                                     "GITHUB_TOKEN":"test-secret-not-real"}):
            with mock.patch("subprocess.run",return_value=fake) as runner:
                result=W.build("mimi",W.evidence())
        self.assertEqual(result["model"]["status"],"model_report_generated")
        self.assertEqual(result["model"]["provider"],"github-copilot")
        self.assertIn("다음 실제 작업",result["model"]["report"])
        self.assertNotIn("test-secret-not-real",json.dumps(result))
        cmd=runner.call_args.args[0]
        self.assertEqual(cmd[0],"copilot")
        self.assertIn("--no-ask-user",cmd)

    def test_copilot_does_not_claim_success_on_empty_or_short_output(self):
        short=type("Result",(),{"returncode":0,"stdout":"연결된 것 같아요","stderr":""})()
        with mock.patch.dict(os.environ,{"MARU_OPENAI_API_KEY":"",
                                     "OPENAI_API_KEY":"",
                                     "MARU_COPILOT_ENABLED":"1",
                                     "GITHUB_TOKEN":"test-secret"}):
            with mock.patch("subprocess.run",return_value=short):
                result=W.build("maru",W.evidence())
        self.assertEqual(result["model"]["status"],"model_call_failed")

    def test_only_public_repository_snapshot(self):
        f=W.evidence()
        self.assertEqual(f["phoneLibraryTracks"],"not_accessible_from_server")
        self.assertEqual(f["sunoPrivateSongs"],"not_accessible_from_server")
        self.assertEqual(f["bigoRealListenerAudio"],"not_verified")
        self.assertEqual(f["agencyPaymentRecords"],"not_connected")
        self.assertTrue(all(isinstance(v,bool) for v in f["filesPresent"].values()))

if __name__=="__main__":main()
