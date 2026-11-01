import importlib.util
import tempfile
from pathlib import Path
import unittest
spec=importlib.util.spec_from_file_location("scan",Path(__file__).resolve().parents[1]/"scripts"/"scan_quarantined_media.py")
scan=importlib.util.module_from_spec(spec);spec.loader.exec_module(scan)
class MediaGateTests(unittest.TestCase):
 def test_magic_signatures(self):
  self.assertTrue(scan.signature(".mp3",b"ID3"+b"\0"*20))
  self.assertTrue(scan.signature(".webm",b"\x1a\x45\xdf\xa3"+b"\0"*20))
  self.assertFalse(scan.signature(".mp4",b"<script>alert(1)</script>"))
  self.assertFalse(scan.signature(".exe",b"ID3"+b"\0"*20))
 def test_traversal_and_unknown_extensions(self):
  with tempfile.TemporaryDirectory() as d:
   root=Path(d);other=root/"nested";other.mkdir()
   (root/"legit.mp3").write_bytes(b"ID3"+b"\0"*30)
   (other/"bad.mp3").write_bytes(b"ID3"+b"\0"*30)
   (root/"bad.exe").write_bytes(b"ID3"+b"\0"*30)
   self.assertEqual(scan.source_file(root,root/"legit.mp3")[1],"audio")
   with self.assertRaisesRegex(ValueError,"direct files"):scan.source_file(root,other/"bad.mp3")
   with self.assertRaisesRegex(ValueError,"Disallowed"):scan.source_file(root,root/"bad.exe")
   (root/"alias.mp3").symlink_to(root/"legit.mp3")
   with self.assertRaisesRegex(ValueError,"Symlink"):scan.source_file(root,root/"alias.mp3")
 def test_scanner_failure_defaults_closed(self):
  with tempfile.TemporaryDirectory() as d:
   path=Path(d)/"track.mp3";path.write_bytes(b"ID3"+b"\0"*40)
   with self.assertRaisesRegex(ValueError,"scanner missing|failed|timed out"):
    scan.preflight(d,path,clam="/definitely/missing/clamscan")
if __name__=="__main__":unittest.main()
