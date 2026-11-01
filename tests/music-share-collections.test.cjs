'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const root=__dirname+'/../music-share/';
const ctx=vm.createContext({});
vm.runInContext(fs.readFileSync(root+'genre-core.js','utf8'),ctx);
const g=ctx.MaruGenres;
test('Korean trot is in both Korean and trot collections',()=>{
 const t={title:'가을 남자 트로트',genre:'korean',style:'trot'};
 assert.equal(g.matches(t,'korean','all'),true);
 assert.equal(g.matches(t,'all','trot'),true);
 assert.equal(g.matches(t,'chinese','trot'),false);
 assert.equal(g.matches(t,'korean','ballad'),false);
});
test('Chinese ballad and western rock are independent style/region facets',()=>{
 assert.equal(g.matches({title:'云南的清晨 情歌'},'chinese','ballad'),true);
 assert.equal(g.matches({title:'Waves Rock'},'western','rock'),true);
 assert.equal(g.detectStyle('네온싸인 지루박'),'trot');
 assert.equal(g.detectStyle('그리움 발라드'),'ballad');
 assert.equal(g.genreOf({title:'이름이 없는 한국곡'}),'korean');
});
test('music library and radio expose style filters without cluttering player',()=>{
 const index=fs.readFileSync(root+'index.html','utf8');
 const radio=fs.readFileSync(root+'radio.html','utf8');
 const admin=fs.readFileSync(root+'admin.html','utf8');
 const client=fs.readFileSync(root+'app.js','utf8');
 assert.match(index,/id="styleFilter"/);
 assert.match(index,/트로트 모음/);
 assert.match(index,/발라드 모음/);
 assert.match(radio,/id="radioStyle"/);
 assert.ok(radio.indexOf('id="radioStyle"')>radio.indexOf('<details class="radio-advanced"'));
 assert.match(admin,/id="style"/);
 assert.match(client,/styleFilter/);
 assert.match(client,/genres.styleOf/);
 assert.match(fs.readFileSync(root+'admin.js','utf8'),/source:'owner-original'/);
 assert.match(fs.readFileSync(root+'radio.js','utf8'),/MaruGenres.matches/);
});
