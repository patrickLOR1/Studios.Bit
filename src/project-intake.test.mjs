import test from 'node:test';
import assert from 'node:assert/strict';
import {isTailored,renderTailored,tailoredSummary,needs} from './project-intake.js';
import {estimate} from './pricing.js';
test('custom solutions never render an automatic price or stale web estimate',()=>{
 for(const need of Object.keys(needs).filter(need=>!['website','marketing'].includes(need)))for(const lang of ['es','en']){
  const state={need,web:'corporate',plan:'integral',challenge:'Follow up',users:'team',connection:'yes',tools:'Sheets',priority:'Contacts'};
  assert.ok(isTailored(state));
  const result=renderTailored(lang,state,'');
  assert.doesNotMatch(result.html,/MXN|tax-breakdown|13,900|12,900/);
  assert.match(result.summary,lang==='es'?/No se ha calculado un precio/:/No price has been calculated/);
  assert.ok(result.summary.includes('Sheets'));
 }
});
test('user text is escaped in markup and retained in plain text summary',()=>{
 const state={need:'crm',challenge:'</textarea><img src=x onerror=alert(1)>',connection:'no',tools:'stale integration'};
 assert.ok(renderTailored('es',state,'').html.includes('&lt;/textarea&gt;'));
 assert.ok(tailoredSummary('es',state).includes(state.challenge));
 assert.ok(!tailoredSummary('es',state).includes('stale integration'));
});
test('existing website and social rates and tax remain unchanged',()=>{
 assert.equal(isTailored({need:'website'}),false);assert.equal(isTailored({need:'marketing'}),false);
 assert.equal(isTailored({web:'landing'}),false);
 const quote=estimate({web:'landing',plan:'essential',units:0});
 assert.equal(quote.once,6900);assert.equal(quote.totalOnce,8004);assert.equal(quote.monthly,5500);assert.equal(quote.totalMonthly,6380);
 assert.equal(estimate({web:'corporate',plan:'none',units:0}).once,13900);
});
