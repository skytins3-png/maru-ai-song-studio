#!/usr/bin/env python3
"""Prepare cited news headlines and weather facts for the MARU English radio.

GitHub Actions runs this on a schedule. Never pretend we have live facts when an
upstream source is unavailable. Headlines only, not copyrighted article bodies.
"""
import datetime as dt
import email.utils
import json
import os
import pathlib
import re
import sys
import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET

NOW = dt.datetime.now(dt.timezone.utc)
DEST = pathlib.Path(__file__).resolve().parent.parent / "music-share" / "broadcast-daily.json"
CITIES = {
    "Daejeon": (36.3504, 127.3845),
    "Seoul": (37.5665, 126.9780),
    "Busan": (35.1796, 129.0756),
    "Incheon": (37.4563, 126.7052),
    "Daegu": (35.8714, 128.6014),
}
RSS = (
    ("World", "https://feeds.bbci.co.uk/news/world/rss.xml"),
    ("Technology", "https://feeds.bbci.co.uk/news/technology/rss.xml"),
)
ALLOWED_NEWS_HOSTS = {"www.bbc.com", "www.bbc.co.uk", "bbc.com", "bbc.co.uk", "www.bbcnews.com"}


def https(url: str, max_bytes: int = 750_000) -> bytes:
    if not url.startswith("https://"):
        raise ValueError("HTTPS required")
    req = urllib.request.Request(url, headers={"User-Agent": "MARU-RADIO/1.0 feed reader"})
    with urllib.request.urlopen(req, timeout=14) as response:
        if response.status != 200:
            raise ValueError("Upstream HTTP not successful")
        result = response.read(max_bytes + 1)
    if len(result) > max_bytes:
        raise ValueError("Upstream body too large")
    return result


def scrub(s: str, maximum: int = 150) -> str:
    s = re.sub(r"<[^>]+>", " ", str(s or ""))
    s = re.sub(r"[\x00-\x1f\x7f]+", " ", s)
    return re.sub(r"\s+", " ", s).strip()[:maximum]


def get_weather(city: str, coords: tuple[float, float]) -> dict:
    q = urllib.parse.urlencode({
        "latitude": coords[0], "longitude": coords[1],
        "current": "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m",
        "timezone": "Asia/Seoul", "forecast_days": 1
    })
    data = json.loads(https("https://api.open-meteo.com/v1/forecast?" + q))
    c = data.get("current", {})
    temp = c.get("temperature_2m")
    wind = c.get("wind_speed_10m")
    code = c.get("weather_code")
    if type(temp) not in (float, int) or not -80 <= temp <= 65:
        raise ValueError("No credible temperature")
    if type(wind) not in (float, int) or not 0 <= wind <= 300:
        raise ValueError("No credible wind value")
    if type(code) is not int or not 0 <= code <= 99:
        raise ValueError("No credible weather code")
    timestamp = str(c.get("time", ""))[:16]
    if not re.fullmatch(r"\d{4}-\d\d-\d\dT\d\d:\d\d", timestamp):
        raise ValueError("No valid local weather sample time")
    return {"city": city, "temperatureC": round(float(temp), 1),
            "windKmh": round(float(wind), 1), "weatherCode": code,
            "observedLocal": timestamp, "source": "Open-Meteo",
            "sourceUrl": "https://open-meteo.com/"}


def read_rss(category: str, url: str) -> list[dict]:
    raw = https(url, 850_000)
    if b"<!DOCTYPE" in raw.upper() or b"<!ENTITY" in raw.upper():
        raise ValueError("RSS XML entity expansion prohibited")
    root = ET.fromstring(raw)
    results = []
    for item in root.findall(".//item")[:35]:
        headline = scrub(item.findtext("title", ""), 140)
        link = scrub(item.findtext("link", ""), 350)
        pub = item.findtext("pubDate", "")
        host = urllib.parse.urlparse(link).hostname
        if not headline or not link.startswith("https://") or host not in ALLOWED_NEWS_HOSTS:
            continue
        try:
            published = email.utils.parsedate_to_datetime(pub).astimezone(dt.timezone.utc)
        except (ValueError, TypeError):
            continue
        age = (NOW - published).total_seconds()
        if age < -1800 or age > 30 * 3600:
            continue
        if any(t in headline.lower() for t in ["sponsored", "advertisement", "breaking live"]):
            continue
        results.append({"title": headline, "url": link, "source": "BBC News",
                        "category": category, "publishedAt": published.isoformat(timespec="seconds")})
    return results


def main():
    fresh = {"generatedAt": NOW.isoformat(timespec="seconds"),
             "timezone": "Asia/Seoul", "weather": {}, "news": []}
    for city, coords in CITIES.items():
        try:
            fresh["weather"][city] = get_weather(city, coords)
            print("Weather verified:", city)
        except Exception as exc:
            print("Weather unavailable for", city, type(exc).__name__, file=sys.stderr)
    seen = set()
    for category, url in RSS:
        try:
            for entry in read_rss(category, url):
                key = entry["url"].split("?")[0]
                if key in seen:
                    continue
                seen.add(key)
                fresh["news"].append(entry)
        except Exception as exc:
            print("News unavailable:", category, type(exc).__name__, file=sys.stderr)
    fresh["news"] = sorted(fresh["news"], key=lambda x: x["publishedAt"], reverse=True)[:12]
    # A broken upstream must not overwrite the previous forecast with fabricated
    # data, but does publish a clear empty/stale snapshot when all APIs fail.
    if not fresh["weather"] and not fresh["news"]:
        print("Both external sources unavailable: leaving previous feed unchanged", file=sys.stderr)
        return 1
    text = json.dumps(fresh, ensure_ascii=False, indent=2) + "\n"
    if DEST.exists() and DEST.read_text() == text:
        return 0
    DEST.write_text(text)
    print("Published", len(fresh["news"]), "cited headlines and",
          len(fresh["weather"]), "weather locations; UTC", fresh["generatedAt"])
    return 0


if __name__ == "__main__":
    sys.exit(main())
