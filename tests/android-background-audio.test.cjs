'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const read = name => fs.readFileSync(path.join(__dirname, '..', name), 'utf8');
const app = read('app.js');
const bigo = read('bigo-audio-live.js');
const html = read('index.html');
const sw = read('sw.js');
const start = app.indexOf('let broadcastAndroidAudio=null;');
const end = app.indexOf('function revokeTrackAudienceUrls()', start);
assert.ok(start >= 0 && end > start, 'Android engine source must be present');
const playerFunctions = app.slice(start, end);

function mock(userAgent) {
  const calls = [];
  const elements = Object.fromEntries(['broadcastAudio', 'broadcastVideoPlayer'].map(id =>
    [id, { id, pause() { calls.push(id + ':pause'); }, removeAttribute() { calls.push(id + ':remove'); }, load() { calls.push(id + ':load'); } }]
  ));
  let creations = 0;
  class AudioFake {
    constructor() { creations++; this.listeners = {}; this.events = []; }
    addEventListener(event, fn) { this.listeners[event] = fn; }
    setAttribute(key, value) { this[key] = value; }
    getAttribute(key) { return this[key]; }
    pause() { this.events.push('pause'); }
    removeAttribute(key) { delete this[key]; this.events.push('remove'); }
    load() { this.events.push('load'); }
  }
  const params = {
    Audio: AudioFake,
    navigator: { userAgent },
    window: {},
    broadcastFiles: [{ name: 'sample.mp3', type: 'audio/mpeg' }, { name: 'movie.mp4', type: 'video/mp4' }],
    broadcastIndex: 0,
    broadcastRunning: true,
    broadcastPaused: false,
    broadcastTransitioning: false,
    broadcastIsVideoFile: f => !!f && f.type.startsWith('video/'),
    broadcastSafeTitle: x => x.replace(/\.[^.]+$/, ''),
    $: id => elements[id.replace(/^#/, '')],
    toast: () => {},
    broadcastTransitionToNext: () => { calls.push('next'); }
  };
  const make = new Function(...Object.keys(params), playerFunctions + '\nreturn { selected: () => broadcastCurrentPlayer(), stopOthers: stopOtherBroadcastPlayer, setTrack: n => broadcastIndex = n, setPaused: v => broadcastPaused = v, current: window.maruCurrentBroadcastMedia, window };');
  const api = make(...Object.values(params));
  return { ...api, calls, elements, created: () => creations };
}

test('Android music uses one persistent Audio object, independent of the visible player', () => {
  const t = mock('Android 16');
  const player = t.selected();
  assert.notEqual(player, t.elements.broadcastAudio);
  assert.equal(t.selected(), player);
  assert.equal(t.created(), 1);
  assert.equal(t.current(), player);
  assert.equal(player['data-maru-background-player'], 'true');
  assert.equal(t.window.maruBroadcastCurrentTrackTitle(), 'sample');
});

test('Audio ended/errored callbacks advance the playlist only while broadcast is playing', () => {
  const t = mock('Android 16');
  const player = t.selected();
  player.listeners.ended();
  assert.equal(t.calls.filter(x => x === 'next').length, 1);
  t.setPaused(true);
  player.listeners.ended();
  assert.equal(t.calls.filter(x => x === 'next').length, 1);
});

test('switching to MP4 stops independent MP3 and preserves the original video path', () => {
  const t = mock('Android 16');
  const audio = t.selected();
  t.setTrack(1);
  assert.equal(t.selected(), t.elements.broadcastVideoPlayer);
  t.stopOthers(t.elements.broadcastVideoPlayer);
  assert.ok(audio.events.includes('pause'));
});

test('desktop and OBS keep using the existing media element', () => {
  const t = mock('Windows NT 10.0');
  assert.equal(t.selected(), t.elements.broadcastAudio);
  assert.equal(t.created(), 0);
});

test('BIGO Media Session follows the actual player, cache and HTML versions agree', () => {
  assert.match(bigo, /window\.maruCurrentBroadcastMedia/);
  assert.match(bigo, /window\.maruGetStandaloneAudio/);
  assert.match(bigo, /shouldResumePlayback\(\)/);
  assert.match(app, /const f=broadcastFiles\[i\],el=broadcastCurrentPlayer\(\)/);
  assert.match(html, /app\.js\?v=0\.23\.34/);
  assert.match(html, /bigo-audio-live\.js\?v=0\.23\.34/);
  assert.match(sw, /app\.js\?v=0\.23\.34/);
  assert.match(sw, /bigo-audio-live\.js\?v=0\.23\.34/);
  new Function(app);
  new Function(bigo);
  new Function(sw);
});
