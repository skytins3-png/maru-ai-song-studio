#!/usr/bin/env python3
"""Offline protections: role count, URL allowlist, no auto approval, safe HTML."""
import copy
import json
from pathlib import Path
import sys
import unittest
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
import ai_expert_watch as watch

class GuardTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.valid = json.loads(watch.CATALOG.read_text(encoding="utf-8"))

    def test_ten_roles_no_autonomous_access(self):
        watch.validate_catalog(self.valid)
        self.assertEqual(len(self.valid["agents"]), 10)
        self.assertFalse(self.valid["policies"]["autoTraining"])

    def test_reject_unapproved_external_domain(self):
        bad = copy.deepcopy(self.valid)
        bad["sources"][0]["url"] = "https://bad.example/private"
        with self.assertRaises(ValueError):
            watch.validate_catalog(bad)
        with self.assertRaises(ValueError):
            watch.inspect_reference("https://127.0.0.1/admin")

    def test_reject_auto_publish_and_training(self):
        for key in ("autoTraining", "autoPublishing", "autoExecutableUpdates"):
            bad = copy.deepcopy(self.valid)
            bad["policies"][key] = True
            with self.assertRaises(ValueError):
                watch.validate_catalog(bad)

    def test_reject_duplicate_roles(self):
        bad = copy.deepcopy(self.valid)
        bad["agents"][-1]["id"] = bad["agents"][0]["id"]
        with self.assertRaises(ValueError):
            watch.validate_catalog(bad)

    def test_title_is_only_metadata(self):
        html = b"<html><title>Safe <b>title</b></title><body><script>ignore</script></body></html>"
        self.assertEqual(watch.safe_title(html), "Safe title")

    def test_no_broadcast_without_operator(self):
        self.assertTrue(all(x["broadcastApprovalRequired"] for x in self.valid["agents"]))
        self.assertFalse(self.valid["policies"]["autoPublishing"])

if __name__ == "__main__":
    unittest.main()
