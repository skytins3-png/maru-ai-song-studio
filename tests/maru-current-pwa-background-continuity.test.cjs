'use strict';
const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const app = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
const snippet = app.slice(
  app.indexOf('async function playBroadcastIndex(i){'),
  app.indexOf('\nasync function broadcastJumpTo(i){')
);
assert.ok(snippet.startsWith('async function playBroadcastIndex'), 'broadcast source present');

function mockBroadcast(visibility) {
  const events = [];
  let display = visibility;
  let documentListener = null;
  const player = {
    paused: true, ended: false, src: '', muted: false, currentTime: 67,
    load() {events.push('load');},
    play() {events.push('play');this.paused = false;return Promise.resolve();}
  };
  const els = {
    broadcastAudio: {style: {}}, broadcastVideoPlayer: {style: {}},
    broadcastNow: {textContent: ''}, broadcastBadge: {textContent: ''},
    broadcastAutoSubtitle: {checked: true}
  };
  const env = {
    broadcastRunning: true, broadcastPaused: false, broadcastIndex: 0,
    broadcastFiles: [{name: 'Suno-original.mp3', type: 'audio/mpeg'}],
    broadcastUrls: [], broadcastAutoCaptionText: '',
    broadcastBackgroundVisualIndex: -1, autoCaptionFallbackTimer2260: 0,
    broadcastCurrentPlayer: () => player,
    broadcastIsVideoFile: f => f.type.startsWith('video/'),
    broadcastSafeTitle: n => n.split('.')[0],
    renderBroadcastQueue: () => {},
    prepareOriginalBroadcastElement2289: () => {},
    stopOtherBroadcastPlayer: () => {},
    clearTimeout: () => {},
    URL: {createObjectURL: () => 'blob:original', revokeObjectURL() {}},
    markBroadcastRecent: () => {}, $: id => els[id.slice(1)] || null,
    document: {get visibilityState() {return display;},
      addEventListener(type, fn) { if(type === 'visibilitychange') documentListener=fn; }},
    publishAudienceState: () => {},
    audienceText: () => '',
    audienceSubtitleState: () => '',
    stopBroadcastAutoCaption: () => {},
    startBroadcastAutoCaption: () => {},
    applyBroadcastTrackMedia: async () => {events.push('visual');},
    autoAttachBroadcastSubtitle2266: async () => {events.push('subtitle');},
    window: {
      maruClearTimedLyric2265: () => {},
      maruSetTimedLyric2265: async () => {events.push('timed-lyric');}
    },
    console: {warn() {}}, toast: () => {}
  };
  const setup = new Function(...Object.keys(env), snippet+
    '\nreturn {playBroadcastIndex,maruRestoreBackgroundVisualsOnReturn,pending:()=>broadcastBackgroundVisualIndex};');
  const api = setup(...Object.values(env));
  return {api, player, events, setVisibility: value => {display=value;},
    visibilityEvent: () => documentListener()};
}

test('Android background next song begins audio BEFORE slow lyrics / visuals', async () => {
  const t = mockBroadcast('hidden');
  await t.api.playBroadcastIndex(0);
  assert.deepEqual(t.events, ['load', 'play']);
  assert.equal(t.player.src, 'blob:original');
  assert.equal(t.api.pending(), 0);
  assert.equal(t.player.currentTime, 67);
  t.setVisibility('visible');
  t.visibilityEvent();
  await new Promise(resolve => setImmediate(resolve));
  assert.deepEqual(t.events, ['load', 'play', 'visual', 'subtitle', 'timed-lyric']);
  assert.equal(t.api.pending(), -1);
});

test('visible playback continues to attach visuals and subtitles before playing', async () => {
  const t = mockBroadcast('visible');
  await t.api.playBroadcastIndex(0);
  assert.deepEqual(t.events, ['load', 'subtitle', 'timed-lyric', 'visual', 'play']);
  assert.equal(t.api.pending(), -1);
});

test('MediaSession PLAY recovers paused media when broadcast state was not manually paused', async () => {
  const start = app.indexOf('async function broadcastStartOrResume(){');
  const end = app.indexOf('\nfunction broadcastPause(){', start);
  assert.ok(start >= 0 && end > start);
  const source = app.slice(start, end);
  let plays = 0;
  const media = {src:'blob:old',paused:true,ended:false,async play(){plays++;this.paused=false;}};
  const args = {
    broadcastFiles:[{name:'original.mp3'}],broadcastRunning:true,broadcastPaused:false,
    broadcastCurrentPlayer:()=>media,broadcastStart:()=>{throw Error('must not restart playlist');},
    broadcastSafeTitle: n=>n,$:()=>null,resolveAudienceStartIndex2255:()=>0,
    playBroadcastIndex:()=>{throw Error('must not reload track');},
    updateBroadcastDock:()=>{},toast:()=>{},console:{warn:()=>{}}
  };
  const fn=new Function(...Object.keys(args),source+'\nreturn broadcastStartOrResume;')(...Object.values(args));
  assert.equal(await fn(),true);
  assert.equal(plays,1);
  assert.equal(await fn(),false);
  assert.equal(plays,1);
});
