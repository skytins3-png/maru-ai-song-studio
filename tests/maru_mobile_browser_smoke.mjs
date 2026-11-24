import { chromium } from "playwright-core";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";

const base = "https://skytins3-png.github.io/maru-ai-song-studio/";
const executablePath = [process.env.CHROME_BIN,"/usr/bin/google-chrome","/usr/bin/chromium","/usr/bin/chromium-browser"]
  .find(p=>p&&existsSync(p));
if(!executablePath)throw Error("Chrome browser not installed; end-to-end test NOT performed.");

const browser=await chromium.launch({headless:true,executablePath,args:["--no-sandbox","--disable-dev-shm-usage"]});
let results=[];
async function check(label,fn){
  try{await fn();results.push({label,status:"pass"});console.log("PASS "+label)}
  catch(e){results.push({label,status:"fail",error:String(e.message||e)});console.error("FAIL "+label,e);throw e}
}
try{
  const ctx=await browser.newContext({
    viewport:{width:393,height:851},
    isMobile:true,
    hasTouch:true,
    userAgent:"Mozilla/5.0 (Linux; Android 17; SM-S948N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Mobile Safari/537.36",
    acceptDownloads:true
  });
  ctx.setDefaultTimeout(30000);
  const home=await ctx.newPage();
  await check("MARU ONE served over HTTPS and sync panel exists",async()=>{
    const resp=await home.goto(base+"mobile-hub/",{waitUntil:"domcontentloaded",timeout:45000});
    assert.equal(resp.status(),200);
    await home.locator("#maru-sync-section").waitFor();
    assert.match(await home.title(),/MARU ONE/);
  });
  await check("MARU ONE pairing and actual local storage",async()=>{
    await home.locator("#maru-sync-section button").filter({hasText:"내 휴대폰에서 연동 켜기"}).click();
    const val=await home.evaluate(()=>localStorage.getItem("maru-one-sync-v1:paired"));
    assert.equal(val,"1");
  });
  await check("MARU ONE passes lyrics to STUDIO",async()=>{
    const panel=home.locator("#maru-sync-section");
    await panel.locator("select").nth(0).selectOption("studio");
    await panel.locator("select").nth(1).selectOption("lyrics");
    await panel.locator("input[maxlength='150']").fill("MARU 모바일 통합 실험곡");
    await panel.locator("textarea[maxlength='4500']").fill("원본 보존 연동 테스트 가사");
    home.once("dialog",dialog=>dialog.accept());
    await panel.getByRole("button",{name:"선택한 프로그램으로 전달"}).click();
    const data=await home.evaluate(()=>JSON.parse(localStorage.getItem("maru-one-sync-v1:messages")));
    assert.equal(data.length,1);
    assert.equal(data[0].to,"studio");
    assert.equal(data[0].body,"원본 보존 연동 테스트 가사");
  });
  await check("Wait for deployed STUDIO mobile-overlay fix (not just GitHub commit)",async()=>{
    let found=false;
    for(let attempt=0;attempt<14;attempt++){
      const probe=await home.request.get(base+"?maru_deploy_probe="+Date.now()+"-"+attempt,{headers:{"Cache-Control":"no-cache"},timeout:15000});
      const bridge=await home.request.get(base+"mobile-hub/maru-sync.js?maru_deploy_probe="+Date.now()+"-"+attempt,{headers:{"Cache-Control":"no-cache"},timeout:15000});
      if(probe.ok()&&bridge.ok()&&(await probe.text()).includes("var maruOnePaired=false")&&(await bridge.text()).includes("maruOneUnlockWatch")){found=true;break}
      await new Promise(done=>setTimeout(done,9000));
    }
    assert.equal(found,true,"Latest MARU STUDIO fix was NOT yet deployed");
  });
  const studio=await ctx.newPage();
  await check("STUDIO receives real message in same Android browser context",async()=>{
    const response=await studio.goto(base,{waitUntil:"domcontentloaded",timeout:60000});
    assert.equal(response.status(),200);
    await studio.locator("#maru-one-bridge-toggle").waitFor({timeout:40000});
    const gateState=await studio.evaluate(()=>({css:document.documentElement.className,paired:localStorage.getItem("maru-one-sync-v1:paired"),gateStyle:document.getElementById("maruInstallGate")?.style.display||""}));
    console.log("STUDIO gate state:",JSON.stringify(gateState));
    assert.equal(await studio.evaluate(()=>document.documentElement.classList.contains("maru-browser")),false,"Integrated mobile screen is still blocked by install gate");
    await studio.locator("#maru-one-bridge-toggle").click({timeout:30000});
    await studio.locator("#maru-one-bridge-panel").waitFor({state:"visible"});
    assert.match(await studio.locator("#maru-one-bridge-panel").innerText(),/MARU 모바일 통합 실험곡/);
  });
  await check("STUDIO imports lyrics only after user approval",async()=>{
    studio.once("dialog",dialog=>dialog.accept());
    await studio.locator("#maru-one-bridge-panel button").filter({hasText:"검토 후 적용"}).click();
    assert.equal(await studio.locator("#lyrics").inputValue(),"원본 보존 연동 테스트 가사");
    const data=await studio.evaluate(()=>JSON.parse(localStorage.getItem("maru-one-sync-v1:messages")));
    assert.equal(data[0].status,"reviewed");
  });
  await check("STUDIO sends a reply back to MARU ONE",async()=>{
    const panel=studio.locator("#maru-one-bridge-panel");
    await panel.locator("input").fill("돌아오는 방송 대본");
    await panel.locator("textarea").fill("스튜디오에서 다시 마루 원으로 보내는 테스트");
    studio.once("dialog",dialog=>dialog.accept());
    await panel.getByRole("button",{name:"MARU ONE에 전달"}).click();
    const data=await studio.evaluate(()=>JSON.parse(localStorage.getItem("maru-one-sync-v1:messages")));
    assert.equal(data.filter(x=>x.to==="hub"&&x.status==="pending").length,1);
  });
  await check("Hub imports actual received studio memo",async()=>{
    await home.reload({waitUntil:"domcontentloaded"});
    const panel=home.locator("#maru-sync-section");
    await panel.getByRole("button",{name:"방송 메모로"}).click();
    const saved=await home.evaluate(()=>JSON.parse(localStorage.getItem("maru-one-v1:memo")));
    assert.match(saved,/스튜디오에서 다시 마루 원으로 보내는 테스트/);
  });
  await check("Agent dashboard displays real published seven-role audit",async()=>{
    const s=await ctx.newPage();
    const resp=await s.goto(base+"mobile-hub/agents.html",{waitUntil:"domcontentloaded",timeout:45000});
    assert.equal(resp.status(),200);
    await s.waitForFunction(()=>document.getElementById("overall").textContent.includes("7/7"),{timeout:15000});
    const t=await s.locator("#overall").innerText();
    assert.match(t,/7\/7/);
    assert.equal(await s.locator("#roles .role").count(),7);
  });
  await check("PWA manifest and icon assets load",async()=>{
    const response=await home.request.get(base+"mobile-hub/manifest.webmanifest");
    assert.equal(response.status(),200);
    const manifest=await response.json();
    assert(manifest.icons.some(i=>i.sizes==="192x192"));
    assert(manifest.icons.some(i=>i.sizes==="512x512"));
    for(const icon of manifest.icons.filter(i=>i.type==="image/png")){
      const iconResponse=await home.request.get(new URL(icon.src,base+"mobile-hub/").href);
      assert.equal(iconResponse.status(),200);
      assert((await iconResponse.body()).byteLength>100);
    }
  });
  await check("Wait for published agency mobile page, not only committed source",async()=>{
    let live=false;
    for(let attempt=0;attempt<18;attempt++){
      const resp=await home.request.get(base+"mobile-hub/agency.html?live="+Date.now()+"-"+attempt,{timeout:15000});
      if(resp.ok()&&(await resp.text()).includes("MARU 에이전시 · 업무별 보고서")){live=true;break}
      await new Promise(resolve=>setTimeout(resolve,8000));
    }
    assert.equal(live,true,"Agency mobile page not yet deployed");
  });
  const agency=await ctx.newPage();
  await check("Agency case dashboard opens and displays 11 actual server reports",async()=>{
    const response=await agency.goto(base+"mobile-hub/agency.html",{waitUntil:"domcontentloaded",timeout:60000});
    assert.equal(response.status(),200);
    await agency.waitForFunction(()=>{
      const text=document.getElementById("remoteSummary")?.textContent||"";
      return text.includes("건별 보고서 11건")||text.includes("실제 보고서를 읽을 수 없으므로");
    },null,{timeout:22000});
    const status=await agency.locator("#remoteSummary").innerText();
    assert.match(status,/건별 보고서 11건/);
    assert.equal(await agency.locator("#remoteCases .case").count(),11);
    assert.match(status,/모델이 실제 생성한 보고서 0건/);
  });
  await check("Agency local settlement arithmetic creates a private per-case report",async()=>{
    await agency.locator("#caseName").fill("자동 시험용 정산");
    await agency.locator("#caseCurrency").selectOption("CNY");
    await agency.locator("#caseSpent").fill("11000");
    await agency.locator("#caseReceived").fill("3500");
    await agency.locator("button[type=submit]").click();
    const text=await agency.locator("#calcResult").innerText();
    assert.match(text,/7,500/);
    assert.match(text,/68.18%/);
    const cases=await agency.evaluate(()=>JSON.parse(localStorage.getItem("maru-agency-local-cases-v1")));
    assert.equal(cases.length,1);
    assert.equal(cases[0].difference,7500);
    assert.equal(cases[0].realPlatformFeeVerified,false);
  });

  await check("MARU 18 real role dashboard shows all reports with transparent model connection",async()=>{
    let live=false;
    for(let attempt=0;attempt<15;attempt++){
      const [html,js,index]=await Promise.all([
        home.request.get(base+"mobile-hub/real-agents.html?t="+Date.now()+"-"+attempt,{timeout:15000}),
        home.request.get(base+"mobile-hub/real-agents.js?t="+Date.now()+"-"+attempt,{timeout:15000}),
        home.request.get(base+"agent-runs/latest/index.json?t="+Date.now()+"-"+attempt,{timeout:15000})
      ]);
      if(html.ok()&&js.ok()&&index.ok()&&
         (await html.text()).includes("18개 역할 · 실제 업무 현황")&&
         (await js.text()).includes("model_report_generated")&&
         (await index.json()).totalRoles===18){live=true;break;}
      await new Promise(resolve=>setTimeout(resolve,6000));
    }
    assert(live,"18-role actual page or source-run report has not deployed");
    const tab=await ctx.newPage();
    const resp=await tab.goto(base+"mobile-hub/real-agents.html",{waitUntil:"domcontentloaded",timeout:45000});
    assert.equal(resp.status(),200);
    await tab.waitForFunction(()=>document.getElementById("roleCount").textContent==="18",null,{timeout:20000});
    assert.equal(await tab.locator("#roles .role").count(),18);
    const aiCount=Number(await tab.locator("#aiCount").innerText());
    assert(Number.isFinite(aiCount)&&aiCount>=0&&aiCount<=18);
    const select=tab.locator("#filter");
    await select.selectOption("original");
    assert.equal(await tab.locator("#roles .role").count(),7);
    await select.selectOption("expert");
    assert.equal(await tab.locator("#roles .role").count(),10);
    await select.selectOption("agency");
    assert.equal(await tab.locator("#roles .role").count(),1);
    await select.selectOption("all");
    await tab.locator("#roles .role details").first().locator("summary").click();
    await tab.waitForFunction(()=>document.querySelector("#roles .role .report")?.dataset.loaded==="1",null,{timeout:18000});
    assert.match(await tab.locator("#roles .role .report").first().innerText(),/모델 실행:/);
    await tab.close();
  });
  console.log("MARU LIVE BROWSER TEST SUCCESS: "+results.length+" checks");
}finally{
  await browser.close();
}
