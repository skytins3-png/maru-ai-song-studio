'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const source = fs.readFileSync(path.join(__dirname, '..', 'bigo-audio-live.js'), 'utf8');
const testable = source.replace(/\}\)\(\);\s*$/, "window.__audioTest = {prepare, keepBackgroundPlaying, recoverOnReturn, recoverSound, installMediaControls, shouldResumePlayback, last:()=>lastAudioStatus};})();");
assert.notEqual(source, testable, 'Audio helper closure must be injectable');

function harness() {
  const elements = {
    bigoAudioPrepare: { textContent: '' },
    bigoAudioStopMode: { disabled: true },
    bigoAudioLiveStatus: { dataset: {}, textContent: '' },
    maruBackgroundAudioState: { dataset: {}, textContent: '' },
    bigoAudioRecover: {disabled: false},
    broadcastSoundRestore: {disabled: false},
    broadcastPauseBtn: {click() {clickedPause++;}}
  };
  const listeners = {}, timers = [], memory = {}, actions = {};
  let plays = 0, reject = false, clickedPause = 0, pauses = 0;
  const media = {
    currentTime: 125.4, paused: true, ended: false, src: 'blob:original-track',
    muted: false, defaultMuted: false, volume: 1,
    pause() {pauses++;this.paused = true;},
    currentSrc: 'blob:original-track',
    getAttribute: key => key === 'src' ? 'blob:original-track' : null,
    async play() { plays++; if (reject) {const e=new Error('blocked');e.name='NotAllowedError';throw e;} this.paused = false; },
    addEventListener() {}
  };
  const w = { maruCurrentBroadcastMedia: () => media, maruBroadcastCurrentTrackTitle: () => 'Original.mp3',
    addEventListener: (name, fn) => listeners[name] = fn };
  const context = {
    window: w, document: { visibilityState: 'hidden', readyState: 'loading',
      getElementById: id => elements[id] || null, addEventListener: (name, fn) => listeners['doc:' + name] = fn },
    navigator: {mediaSession: { setActionHandler(name, fn) {actions[name] = fn;} } },
    localStorage: { getItem: key => memory[key] ?? null, setItem: (key, value) => memory[key] = value,
      removeItem: key => delete memory[key] },
    setTimeout: (fn, delay) => {timers.push({fn, delay});return timers.length;},
    clearTimeout() {},
    broadcastRunning: true, broadcastPaused: false,
    MediaMetadata: class { constructor(data) {Object.assign(this, data);} },
    console, Promise
  };
  vm.runInNewContext(testable, context);
  return { api: w.__audioTest, media, listeners, timers, elements, memory, actions,
    count: () => plays, pauseCount: () => pauses, clickedPause: () => clickedPause,
    rejectPlay: v => reject = v, userPaused: v => context.broadcastPaused = v,
    visibility: v => context.document.visibilityState = v };
}

test('transient interruption resumes the same original track position', async () => {
  const h = harness();
  await h.api.prepare();
  await h.api.keepBackgroundPlaying();
  assert.equal(h.count(), 1);
  assert.equal(h.media.paused, false);
  assert.equal(h.media.currentTime, 125.4);
  assert.equal(h.api.last().cause, 'resume-ok');
  await h.api.keepBackgroundPlaying();
  assert.equal(h.count(), 1, 'never restart an already playing track');
});

test('user pause is never overridden by interruption recovery', async () => {
  const h = harness();
  await h.api.prepare();
  h.userPaused(true);
  await h.api.keepBackgroundPlaying();
  assert.equal(h.count(), 0);
});

test('autoplay rejection is surfaced without corrupting song position', async () => {
  const h = harness();
  await h.api.prepare();
  h.rejectPlay(true);
  await h.api.keepBackgroundPlaying();
  assert.equal(h.api.last().cause, 'resume-failed');
  assert.equal(h.api.last().error, 'NotAllowedError');
  assert.equal(h.media.currentTime, 125.4);
  assert.match(h.elements.maruBackgroundAudioState.textContent, /차단/);
});

test('return to MARU installs capped resume attempts, without a permanent focus fight', async () => {
  const h = harness();
  await h.api.prepare();
  h.api.recoverOnReturn();
  assert.deepEqual(Array.from(h.timers, x => x.delay), [300, 1600, 4500]);
  assert.equal(h.api.last().cause, 'return-check');
});

test('a hidden background change records diagnostic playback state', async () => {
  const h = harness();
  await h.api.prepare();
  h.listeners['doc:visibilitychange']();
  assert.equal(h.api.last().cause, 'background-enter');
  assert.equal(h.api.last().expected, true);
  assert.equal(h.api.last().hidden, true);
});

test('BIGO background MediaSession pause no longer converts temporary focus loss to permanent manual pause', async () => {
  const h = harness();
  await h.api.prepare();
  h.actions.pause();
  assert.equal(h.clickedPause(), 0, 'hidden focus pause must not click the manual pause button');
  assert.equal(h.api.last().cause, 'focus-session-pause');
  assert.equal(h.api.shouldResumePlayback(), true);
  assert.deepEqual(Array.from(h.timers, x => x.delay), [300, 1600, 4500]);
});

test('visible MediaSession pause still honors the user pause control', async () => {
  const h = harness();
  await h.api.prepare();
  h.visibility('visible');
  h.actions.pause();
  assert.equal(h.clickedPause(), 1);
});

test('one-tap sound recovery unmutes and restores existing sound output without resetting track position', async () => {
  const h = harness();
  await h.api.prepare();
  h.media.paused = false; // Android can retain paused=false after focus-induced silence.
  h.media.muted = true;
  h.media.volume = 0;
  const restored = await h.api.recoverSound();
  assert.equal(restored, true);
  assert.equal(h.media.currentTime, 125.4);
  assert.equal(h.media.muted, false);
  assert.equal(h.media.volume, 1);
  assert.equal(h.pauseCount(), 1);
  assert.equal(h.count(), 1);
  assert.equal(h.api.last().cause, 'sound-output-reconnected');
  assert.equal(h.elements.bigoAudioRecover.disabled, false);
});

test('one-tap sound recovery reports denial instead of claiming it fixed Android volume', async () => {
  const h = harness();
  await h.api.prepare();
  h.rejectPlay(true);
  assert.equal(await h.api.recoverSound(), false);
  assert.equal(h.api.last().cause, 'sound-recovery-failed');
  assert.match(h.elements.bigoAudioLiveStatus.textContent, /복구 실패/);
  assert.equal(h.media.currentTime, 125.4);
});

test('service worker and UI versions activate the patched helper', () => {
  const index = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  const sw = fs.readFileSync(path.join(__dirname, '..', 'sw.js'), 'utf8');
  assert.match(index, /V0\.24\.8/);
  assert.match(index, /id="broadcastSoundRestore"/);
  assert.match(index, /bigo-audio-live\.js\?v=0\.23\.36/);
  assert.match(sw, /bigo-audio-live\.js\?v=0\.23\.36/);
  assert.match(sw, /maru-music-v0\.24\.8-bigo-audio-recovery/);
});
