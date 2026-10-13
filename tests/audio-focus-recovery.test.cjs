'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const source = fs.readFileSync(path.join(__dirname, '..', 'bigo-audio-live.js'), 'utf8');
const testable = source.replace(/\}\)\(\);\s*$/, "window.__audioTest = {prepare, keepBackgroundPlaying, recoverOnReturn, shouldResumePlayback, last:()=>lastAudioStatus};})();");
assert.notEqual(source, testable, 'Audio helper closure must be injectable');

function harness() {
  const elements = {
    bigoAudioPrepare: { textContent: '' },
    bigoAudioStopMode: { disabled: true },
    bigoAudioLiveStatus: { dataset: {}, textContent: '' },
    maruBackgroundAudioState: { dataset: {}, textContent: '' }
  };
  const listeners = {}, timers = [], memory = {};
  let plays = 0, reject = false;
  const media = {
    currentTime: 125.4, paused: true, ended: false, src: 'blob:original-track',
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
    navigator: {mediaSession: { setActionHandler() {} } },
    localStorage: { getItem: key => memory[key] ?? null, setItem: (key, value) => memory[key] = value,
      removeItem: key => delete memory[key] },
    setTimeout: (fn, delay) => {timers.push({fn, delay});return timers.length;},
    clearTimeout() {},
    broadcastRunning: true, broadcastPaused: false,
    MediaMetadata: class { constructor(data) {Object.assign(this, data);} },
    console, Promise
  };
  vm.runInNewContext(testable, context);
  return { api: w.__audioTest, media, listeners, timers, elements, memory,
    count: () => plays, rejectPlay: v => reject = v, userPaused: v => context.broadcastPaused = v };
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
