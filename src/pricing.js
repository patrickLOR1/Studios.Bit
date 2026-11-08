export const booking = 'https://studiosbit.setmore.com/patrick';
export const prices = {
  landing:6900, corporate:13900, essential:5500, growth:8900, integral:12900,
  section:900, page:1600, copy:2500, motion:3500, bilingual:.35, vat:0.16
};
export function estimate(s) {
 const base=prices[s.web]||0;
 const units=base?Math.min(50,Math.max(0,Math.floor(Number(s.units)||0))):0;
 const structure=units*(s.web==='landing'?prices.section:prices.page);
 const language=base&&s.bilingual?Math.round((base+structure)*prices.bilingual):0;
 const writing=base&&s.copy?prices.copy:0;
 const motion=base&&s.motion?prices.motion:0;
 const once=base+structure+language+writing+motion;
 const monthly=prices[s.plan]||0;
 // Preserve the approved pre-tax amounts; add two-decimal IVA and inclusive totals.
 const roundMoney = n => Math.round((n + Number.EPSILON) * 100) / 100;
 const vatOnce=roundMoney(once*prices.vat);
 const vatMonthly=roundMoney(monthly*prices.vat);
 const totalOnce=roundMoney(once+vatOnce);
 const totalMonthly=roundMoney(monthly+vatMonthly);
 return {base,structure,language,writing,motion,once,monthly,vatRate:prices.vat,vatOnce,vatMonthly,totalOnce,totalMonthly};
}
