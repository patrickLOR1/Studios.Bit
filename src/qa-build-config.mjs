import assert from 'node:assert/strict';
import {mkdtemp,cp,readFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';import {join,resolve} from 'node:path';import {spawnSync} from 'node:child_process';
const temp=await mkdtemp(join(tmpdir(),'studios-rc-'));
try{
await cp('src',join(temp,'src'),{recursive:true});
for(const [label,extra,index] of [
['default',{},false],
['preview-guard',{SITE_ENV:'production',SITE_INDEXABLE:'true',VERCEL_ENV:'preview'},false],
['production-disabled',{SITE_ENV:'production',VERCEL_ENV:'production'},false],
['production-approved-simulation',{SITE_ENV:'production',SITE_INDEXABLE:'true',VERCEL_ENV:'production'},true]
]){
const env={...process.env,SITE_URL:'https://www.studiosbit.org',SITE_ENV:'preview',SITE_INDEXABLE:'false',LEADS_ENABLED:'false',APPROVED_PRIVACY_URL:'',PRIVACY_VERSION:'',...extra};
const r=spawnSync(process.execPath,[resolve('src/build-locales.js')],{cwd:temp,env,encoding:'utf8'});assert.equal(r.status,0,r.stderr);
const html=await readFile(join(temp,'dist/es/index.html'),'utf8');assert.equal(html.includes('content="index,follow"'),index);assert.match(await readFile(join(temp,'dist/launch-config.js'),'utf8'),/"leadEnabled":false/);
console.log(label,'PASS');
}
for(const extra of [{SITE_URL:'http://www.studiosbit.org'},{LEADS_ENABLED:'true',APPROVED_PRIVACY_URL:'',PRIVACY_VERSION:''}]){
const r=spawnSync(process.execPath,[resolve('src/build-locales.js')],{cwd:temp,env:{...process.env,SITE_ENV:'preview',...extra},encoding:'utf8'});assert.notEqual(r.status,0);
}
console.log('Invalid HTTP origin and unapproved lead activation rejected. No live configuration changed.');
}finally{await rm(temp,{recursive:true,force:true})}
