import {spawnSync} from 'node:child_process';import {appendFileSync} from 'node:fs';
for(const file of ['qa.mjs','qa-language-home.mjs','qa-final-cold.mjs','qa-final-tour.mjs']){
 const r=spawnSync(process.execPath,['src/'+file],{encoding:'utf8',env:{...process.env,PREVIEW_URL:'http://127.0.0.1:4395'},timeout:300000});
 appendFileSync('review/final-round/tests.txt','\n## Final SVG rule regression: '+file+' exit '+r.status+'\n'+r.stdout+r.stderr);console.log(file,r.status);if(r.status!==0){console.error(r.stderr);process.exit(1)}
}
