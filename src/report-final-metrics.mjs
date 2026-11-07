import fs from 'node:fs';
const all=[];
for(const phase of ['before','after'])for(let i=1;i<=3;i++){
const j=JSON.parse(fs.readFileSync(`review/final-round/${phase}-${i}.json`));
all.push({phase,run:i,date:j.fetchTime,lighthouse:j.lighthouseVersion,score:j.categories.performance.score*100,TBT:j.audits['total-blocking-time'].numericValue,LCP:j.audits['largest-contentful-paint'].numericValue,CLS:j.audits['cumulative-layout-shift'].numericValue,accessibility:j.categories.accessibility.score*100,seo:j.categories.seo.score*100,mainThread:j.audits['mainthread-work-breakdown'].details.items,settings:j.configSettings.throttling});
}
fs.writeFileSync('review/final-round/metrics.json',JSON.stringify(all,null,2));console.log(all.map(({mainThread,settings,...r})=>r));
