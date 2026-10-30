#!/usr/bin/env python3
import datetime as dt
import json
import unittest
from unittest.mock import patch
import update_radio_daily as radio


class DailyRadioTests(unittest.TestCase):
    def test_weather_does_not_invent_temperature(self):
        response = json.dumps({"current": {
            "temperature_2m": 11.7, "wind_speed_10m": 6.2,
            "weather_code": 3, "time": "2026-10-30T18:00"
        }}).encode()
        with patch.object(radio, "https", return_value=response):
            weather = radio.get_weather("Seoul", (37.5665, 126.9780))
        self.assertEqual(weather["temperatureC"], 11.7)
        self.assertEqual(weather["source"], "Open-Meteo")
        self.assertEqual(weather["city"], "Seoul")

    def test_refuse_invalid_sensor_data(self):
        response = json.dumps({"current": {
            "temperature_2m": "unavailable", "wind_speed_10m": 6.2,
            "weather_code": 3, "time": "2026-10-30T18:00"
        }}).encode()
        with patch.object(radio, "https", return_value=response):
            with self.assertRaises(ValueError):
                radio.get_weather("Seoul", (37.5665, 126.9780))

    def test_news_only_allowed_verified_fresh_bbc_links(self):
        recent = (radio.NOW - dt.timedelta(minutes=35)).strftime("%a, %d %b %Y %H:%M:%S GMT")
        older = (radio.NOW - dt.timedelta(days=3)).strftime("%a, %d %b %Y %H:%M:%S GMT")
        rss = ("<rss><channel>"
               f"<item><title>Verified science story</title><link>https://www.bbc.com/news/articles/a123</link><pubDate>{recent}</pubDate></item>"
               f"<item><title>Too old</title><link>https://www.bbc.com/news/articles/a124</link><pubDate>{older}</pubDate></item>"
               f"<item><title>Poison link</title><link>https://evil.example/malware</link><pubDate>{recent}</pubDate></item>"
               "</channel></rss>").encode()
        with patch.object(radio, "https", return_value=rss):
            result = radio.read_rss("World", "https://feeds.bbci.co.uk/news/world/rss.xml")
        self.assertEqual(len(result), 1)
        self.assertEqual(result[0]["title"], "Verified science story")
        self.assertEqual(result[0]["source"], "BBC News")

    def test_reject_rss_doctype_entity_expansion(self):
        malicious = b'<!DOCTYPE rss [ <!ENTITY x SYSTEM "file:///etc/passwd"> ]><rss><channel/></rss>'
        with patch.object(radio, "https", return_value=malicious):
            with self.assertRaises(ValueError):
                radio.read_rss("World", "https://feeds.bbci.co.uk/news/world/rss.xml")


if __name__ == "__main__":
    unittest.main()
