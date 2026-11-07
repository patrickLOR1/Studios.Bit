import {spawnSync} from 'node:child_process';
import {writeFileSync} from 'node:fs';
let log='';
for(const file of ['audit-static.mjs','qa-build-config.mjs','qa.mjs','qa-lab.mjs','qa-launch.mjs','qa-language-home.mjs','qa-navigation.mjs','qa-arrows.mjs','qa-poster.mjs','qa-header-glow.mjs','qa-final-cold.mjs']){
const r=spawnSync(process.execPath,['src/'+file],{encoding:'utf8',env:{...process.env,PREVIEW_URL:'http://127.0.0.1:4395'},timeout:300000});
log+='\n## '+file+' exit '+r.status+'\n'+r.stdout+r.stderr;writeFileSync('review/final-round/tests.txt',log);
console.log(file,r.status,r.stdout.trim());if(r.status!==0){console.error(r.stderr);process.exit(1);}
}
