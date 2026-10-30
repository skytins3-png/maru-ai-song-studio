(function(root){
'use strict';
/* Shared client + trusted CI guard. Rules prevent obvious phishing/PII/XSS;
 * do not claim they detect every malware, impersonation or abusive story. */
function norm(value){return String(value??'').normalize('NFKC').replace(/[\u200b-\u200f\u202a-\u202e\u2060-\u206f\ufeff]/g,'').trim()}
function clean(value,max){return norm(value).replace(/[\u0000-\u001f\u007f]/g,' ').replace(/\s+/g,' ').slice(0,max)}
function assess(name,title,body){
 const reasons=[];
 const raw=[name,title,body].map(norm);
 if(raw[0].length>40||raw[1].length>100||raw[2].length>1200)reasons.push('Length exceeds the public story limit.');
 if(raw[1].length<3||raw[2].length<20)reasons.push('Title and story must contain meaningful text.');
 const joined=raw.join(' ');
 if(/https?:\/\/|www\.|(?:[\w-]+\.)+(?:com|net|org|io|co|ru|xyz|info|site|app|top|click|shop|online|cn|kr)\b/i.test(joined)
    ||/(?:bit\.ly|tinyurl|t\.me|discord\.gg|wa\.me)\/?/i.test(joined))
    reasons.push('External links and domains are not permitted in on-air stories.');
 if(/(?:<\s*\/?\s*(?:script|iframe|svg|object|embed|img|a|style|form)\b|(?:javascript|data|vbscript)\s*:|on(?:error|load|click)\s*=|&#x?[0-9a-f]+;)/i.test(joined))
    reasons.push('HTML, active markup or executable code patterns are not permitted.');
 if(/[\w.+-]+@[\w.-]+\.[a-z]{2,}/i.test(joined))
    reasons.push('Email addresses must not be posted publicly.');
 if(/(?:\+?\d[\d\s().-]{8,}\d)/.test(joined) || /\b(?:\d[ -]?){13,19}\b/.test(joined))
    reasons.push('Phone numbers, financial or identification number patterns are not permitted.');
 if(/(?:비밀번호|인증번호|계좌번호|주민등록번호|password|passcode|one.time.code|otp|bank account|credit card|crypto wallet|seed phrase|private key)/i.test(joined))
    reasons.push('Potential credentials or sensitive account details must be removed.');
 if(/(?:download\s+(?:this|the)\s+(?:app|apk|exe)|install\s+(?:this|the)\s+(?:app|apk|exe)|send\s+money|wire\s+money|urgent\s+payment|free\s+gift\s+card|limited\s+time\s+offer|수익\s*보장|송금\s*요청|돈\s*보내)/i.test(joined))
    reasons.push('Potential scam, malware-distribution or solicitation language.');
 if(/(?:ignore\s+(?:all|previous)\s+instructions|system\s+prompt|developer\s+message|you\s+are\s+now\s+(?:chatgpt|an\s+ai)|override\s+the\s+safety|방송\s*안전\s*규칙\s*무시)/i.test(joined))
    reasons.push('Prompt-injection or fake administrative instruction.');
 if(/(.)\1{23,}/su.test(joined) || /(.)\1{12,}/u.test(joined))
    reasons.push('Repetitive spam-like text.');
 if(/\x60{3}|<[^>]{2,}>/.test(joined))reasons.push('Code or markup is not accepted in listener stories.');
 if(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(joined))
    reasons.push('Unsafe control characters in story text.');
 return {safe:reasons.length===0,reasons,
   name:clean(name,40)||'Anonymous listener',
   title:clean(title,100),story:clean(body,1200)};
}
function parseStoryIssue(issue){
 if(!issue||issue.pull_request||typeof issue.title!=='string'||!/^\[STORY\]\s/.test(issue.title)||typeof issue.body!=='string')
  return null;
 const body=issue.body;
 const nameMatch=body.match(/^## Listener name\s*\r?\n([^\r\n]*)/m);
 const storyMatch=body.match(/^## Story\s*\r?\n([\s\S]*?)(?:\r?\n## Permission|$)/m);
 if(!storyMatch)return null;
 const consentA=body.includes('- [x] I have permission to submit this story for public posting and radio reading.');
 const consentB=body.includes('- [x] I understand this GitHub Issue is publicly visible.');
 return {name:nameMatch?.[1]||'Anonymous listener',
  title:issue.title.slice('[STORY] '.length),story:storyMatch[1].trim(),
  consent:consentA&&consentB};
}
function evaluateIssue(issue){
 const parsed=parseStoryIssue(issue);
 if(!parsed)return {safe:false,reasons:['Not a valid MARU listener story.']};
 if(!parsed.consent)return {safe:false,reasons:['Public reading and publication consent are required.']};
 return assess(parsed.name,parsed.title,parsed.story);
}
const guard={assess,parseStoryIssue,evaluateIssue,clean};
root.MaruStoryGuard=guard;
if(typeof module!=='undefined'&&module.exports)module.exports=guard;
})(typeof globalThis!=='undefined'?globalThis:this);