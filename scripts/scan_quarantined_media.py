#!/usr/bin/env python3
"""Fail-closed quarantine preflight for a future authenticated media-upload server.

This is NOT an HTTP upload endpoint, content-ID copyright detector, or radio
publisher. Files must already be held in a private quarantine directory.
Run the CLAMAV/ffprobe binaries in a sandboxed least-privileged container.
Never expose their arguments to direct listener input.
"""
import argparse
import hashlib
import json
import os
from pathlib import Path
import re
import subprocess
import sys

ALLOWED={
    ".jpg":("image",20*1024**2), ".jpeg":("image",20*1024**2),
    ".png":("image",20*1024**2), ".webp":("image",20*1024**2),
    ".mp3":("audio",95*1024**2), ".wav":("audio",95*1024**2),
    ".m4a":("audio",95*1024**2), ".flac":("audio",95*1024**2),
    ".ogg":("audio",95*1024**2),
    ".mp4":("video",250*1024**2), ".webm":("video",250*1024**2)
}
AUDIO_CODECS={"mp3","aac","pcm_s16le","pcm_s24le","flac","vorbis","opus"}
VIDEO_CODECS={"h264","hevc","av1","vp8","vp9"}
IMAGE_CODECS={"mjpeg","png","webp"}
def signature(ext,header):
    if len(header)<12:return False
    if ext in {".jpg",".jpeg"}:return header[:3]==b"\xff\xd8\xff"
    if ext==".png":return header[:8]==b"\x89PNG\r\n\x1a\n"
    if ext==".webp":return header[:4]==b"RIFF" and header[8:12]==b"WEBP"
    if ext==".wav":return header[:4]==b"RIFF" and header[8:12]==b"WAVE"
    if ext==".mp3":return header[:3]==b"ID3" or header[0]==255 and header[1]&0xE0==0xE0
    if ext==".m4a":return header[4:8]==b"ftyp"
    if ext==".mp4":return header[4:8]==b"ftyp"
    if ext==".ogg":return header[:4]==b"OggS"
    if ext==".flac":return header[:4]==b"fLaC"
    if ext==".webm":return header[:4]==b"\x1a\x45\xdf\xa3"
    return False

def source_file(root,file):
    """Refuse symlink, hardlink, path escape, devices, and oversized input."""
    root=Path(root).resolve(strict=True)
    candidate=Path(file)
    if candidate.is_symlink():raise ValueError("Symlink upload is blocked")
    resolved=candidate.resolve(strict=True)
    if root not in resolved.parents or resolved.parent!=root:
        raise ValueError("Only direct files under quarantine root may be scanned")
    st=resolved.stat()
    if not resolved.is_file() or st.st_nlink!=1:raise ValueError("Invalid or linked upload")
    ext=resolved.suffix.lower()
    if ext not in ALLOWED:raise ValueError("Disallowed extension")
    kind,limit=ALLOWED[ext]
    if st.st_size<12 or st.st_size>limit:raise ValueError("File size rejected")
    with resolved.open("rb") as f:header=f.read(40)
    if not signature(ext,header):raise ValueError("File extension and magic mismatch")
    return resolved,kind,st.st_size

def run_checked(cmd,timeout):
    try:
        return subprocess.run(cmd,stdout=subprocess.PIPE,stderr=subprocess.PIPE,
            text=True,timeout=timeout,check=False)
    except (OSError,subprocess.TimeoutExpired) as e:
        raise ValueError("Required scanner missing, failed, or timed out") from e

def inspect_clam(path,binary):
    result=run_checked([binary,"--no-summary","--max-filesize=512M",
                        "--max-scansize=512M","--alert-exceeds-max=yes",str(path)],120)
    # 'OK' must appear on the only scanned file; scan errors or silent skip fail.
    if result.returncode!=0 or not any(line.endswith(": OK") for line in result.stdout.splitlines()):
        raise ValueError("Anti-malware check failed or file was skipped")

def inspect_probe(path,kind,binary):
    result=run_checked([binary,"-v","error","-show_streams","-show_format",
                        "-of","json",str(path)],45)
    if result.returncode!=0 or len(result.stdout)>256000:
        raise ValueError("Media container inspection failed")
    try:obj=json.loads(result.stdout)
    except (ValueError,TypeError) as e:raise ValueError("Invalid media probe JSON") from e
    streams=obj.get("streams")
    if not isinstance(streams,list) or not streams or len(streams)>12:
        raise ValueError("Missing or excessive media streams")
    found=False
    found_video=False
    for stream in streams:
        if not isinstance(stream,dict):raise ValueError("Malformed media stream")
        codec=stream.get("codec_name","")
        typ=stream.get("codec_type","")
        if kind=="image":
            if typ!="video" or codec not in IMAGE_CODECS:
                raise ValueError("Unexpected image stream")
            found=True
        elif typ=="audio":
            if codec not in AUDIO_CODECS:raise ValueError("Unexpected audio codec")
            found=True
        elif typ=="video" and kind=="video":
            if codec not in VIDEO_CODECS:raise ValueError("Unexpected video codec")
            found=True
            found_video=True
        else:raise ValueError("Unsupported embedded data/subtitle/attachment stream")
        if typ=="video":
            width=int(stream.get("width") or 0)
            height=int(stream.get("height") or 0)
            if not 1<=width<=3840 or not 1<=height<=2160:
                raise ValueError("Image/video dimensions exceed policy")
    if not found or kind=="video" and not found_video:
        raise ValueError("Expected audio/video stream not found")
    fmt=obj.get("format") or {}
    if kind!="image":
        try:duration=float(fmt.get("duration"))
        except (ValueError,TypeError) as e:raise ValueError("Missing media duration") from e
        if not 0<duration<= (900 if kind=="audio" else 600):
            raise ValueError("Media duration exceeds policy")

def preflight(root,file,clam="clamscan",probe="ffprobe"):
    path,kind,size=source_file(root,file)
    inspect_clam(path,clam)
    inspect_probe(path,kind,probe)
    hash_value=hashlib.sha256()
    with path.open("rb") as f:
        for block in iter(lambda:f.read(1048576),b""):hash_value.update(block)
    # Passing malware/codec checks does not resolve rights or human approval.
    return {"status":"QUARANTINED_SCAN_PASSED","sha256":hash_value.hexdigest(),
       "kind":kind,"bytes":size,"rightsVerified":False,
       "producerApproved":False,"eligibleForBroadcast":False}

def main():
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument("--quarantine",required=True)
    p.add_argument("--file",required=True)
    a=p.parse_args()
    try:
        print(json.dumps(preflight(a.quarantine,a.file),ensure_ascii=False))
    except (OSError,ValueError) as e:
        # No sensitive file contents in operational logs.
        print(json.dumps({"status":"REJECTED","reason":str(e),
          "eligibleForBroadcast":False}),file=sys.stderr)
        return 1
    return 0
if __name__=="__main__":sys.exit(main())
