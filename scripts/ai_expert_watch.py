#!/usr/bin/env python3
"""MARU read-only reference monitor for 10 proposed specialist roles.

Fetches only the fixed HTTPS landing pages listed in the repository, records
a small source-integrity digest/title, and uploads a CI report. Does NOT
execute scripts, download songs, learn model weights, scan other sites,
approve broadcasts, or treat fetched text as operational instructions.
"""
from __future__ import annotations

import argparse
import hashlib
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import ssl
import sys
from urllib.parse import urlsplit
from urllib.error import HTTPError, URLError
from urllib.request import HTTPSHandler, HTTPRedirectHandler, Request, build_opener

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "music-share" / "ai-experts.json"
ALLOWED_URLS = {
    "https://viva.pressbooks.pub/openmusictheory/front-matter/introduction/",
    "https://owasp.org/projects/cheat-sheet-series",
    "https://www.ffmpeg.org/legal.html",
}
MAX_BODY = 192 * 1024

class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        raise ValueError("Remote redirect denied")

class PageTitle(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.in_title = False
        self.parts = []

    def handle_starttag(self, tag, attrs):
        if tag == "title":
            self.in_title = True

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False

    def handle_data(self, data):
        if self.in_title and sum(len(x) for x in self.parts) < 180:
            self.parts.append(data)

def safe_title(data: bytes) -> str:
    page = PageTitle()
    page.feed(data.decode("utf-8", errors="replace"))
    result = " ".join(" ".join(page.parts).split())
    result = re.sub(r"<[^>]{1,100}>", " ", result)
    result = " ".join(result.split())
    result = re.sub(r"[\x00-\x1f\x7f]", "", result)
    return result[:120]

def validate_catalog(catalog: dict) -> None:
    agents = catalog.get("agents")
    sources = catalog.get("sources")
    if not isinstance(agents, list) or len(agents) != 10:
        raise ValueError("Exactly ten role definitions required")
    if len({x.get("id") for x in agents}) != 10:
        raise ValueError("Duplicate role IDs")
    if any(x.get("autonomous") is not False or
           x.get("broadcastApprovalRequired") is not True
           for x in agents):
        raise ValueError("Unreviewed autonomous or broadcasting role denied")
    if not isinstance(sources, list) or len(sources) != len(ALLOWED_URLS):
        raise ValueError("Curated source list altered")
    urls = [x.get("url") for x in sources]
    if len(set(urls)) != len(urls) or set(urls) != ALLOWED_URLS:
        raise ValueError("Unexpected source URL; manual allowlist update required")
    for source in sources:
        url = source["url"]
        parsed = urlsplit(url)
        if parsed.scheme != "https" or not parsed.hostname or parsed.username or parsed.password or parsed.query or parsed.fragment:
            raise ValueError("Unsafe source URL")
        if source.get("usage") != "reference_metadata_only":
            raise ValueError("Full content replication not allowed")
        if not source.get("publisher") or not source.get("license") or not source.get("licenseUrl"):
            raise ValueError("Missing attribution/licensing fields")
    p = catalog.get("policies", {})
    if p.get("autoTraining") is not False or p.get("autoPublishing") is not False or p.get("autoExecutableUpdates") is not False:
        raise ValueError("Approval gate disabled")

def inspect_reference(url: str) -> dict:
    if url not in ALLOWED_URLS:
        raise ValueError("Only exact vetted URLs are reachable")
    opener = build_opener(HTTPSHandler(context=ssl.create_default_context()), NoRedirect())
    req = Request(url, headers={"User-Agent": "MARU-ExpertSourceMonitor/0.1 (+readonly)", "Accept": "text/html"})
    with opener.open(req, timeout=12) as response:
        if response.getcode() != 200:
            raise ValueError("HTTP status not 200")
        content_type = response.headers.get_content_type()
        if content_type != "text/html":
            raise ValueError("Non-HTML reference refused")
        body = response.read(MAX_BODY + 1)
    if not 40 <= len(body) <= MAX_BODY:
        raise ValueError("Reference too small or oversized")
    return {"url": url, "status": "observed_unreviewed",
            "title": safe_title(body),
            "sha256": hashlib.sha256(body).hexdigest(),
            "bytesInspected": len(body),
            "rightsApprovedForBroadcast": False,
            "executableActionsApproved": False}

def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--fetch", action="store_true", help="Probe only the curated URLs (CI manual/nightly)")
    ap.add_argument("--report", type=Path, help="Write metadata-only report, never public knowledge")
    args = ap.parse_args()
    catalog = json.loads(CATALOG.read_text(encoding="utf-8"))
    validate_catalog(catalog)
    report = {"schemaVersion": 1, "roleCount": len(catalog["agents"]),
              "mode": "reference-monitor" if args.fetch else "offline-validation",
              "approvedForBroadcast": False, "sources": []}
    for source in catalog["sources"]:
        record = {"sourceId": source["id"], "publisher": source["publisher"],
                  "license": source["license"], "licenseUrl": source["licenseUrl"],
                  "url": source["url"], "status": "not_fetched"}
        if args.fetch:
            try:
                record.update(inspect_reference(source["url"]))
            except (ValueError, HTTPError, URLError, TimeoutError, OSError, UnicodeError) as exc:
                record["status"] = "unavailable_requires_review"
                record["failureType"] = type(exc).__name__
        report["sources"].append(record)
    encoded = json.dumps(report, ensure_ascii=False, indent=2) + "\n"
    if args.report:
        args.report.parent.mkdir(parents=True, exist_ok=True)
        args.report.write_text(encoded, encoding="utf-8")
    else:
        print(encoded)
    return 0

if __name__ == "__main__":
    sys.exit(main())
