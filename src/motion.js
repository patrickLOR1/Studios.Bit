import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
gsap.registerPlugin(ScrollTrigger);
const media = gsap.matchMedia();
media.add({ motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 901px) and (pointer: fine)' }, context => {
  if (!context.conditions.motion) return;
  const desktop = context.conditions.desktop;
  let lenis, tick;
  if (desktop) {
    lenis = new Lenis({ smoothWheel: true, syncTouch: false, anchors: true, duration: 0.9 });
    lenis.on('scroll', ScrollTrigger.update);
    tick = time => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    document.documentElement.classList.add('motion-scroll');
  }
  gsap.from('.hero-kicker, .hero h1, .hero-bottom', { y: desktop ? 28 : 14, opacity: 0, duration: .8, stagger: .12, ease: 'power3.out', clearProps: 'transform,opacity' });
  gsap.utils.toArray('.manifesto-copy>p, .manifesto-note, .section-head, .why>h2, .why-grid article, .steps article, .service, .audience>p, .contact-copy, #project-form').forEach(el => {
    gsap.from(el, { y: desktop ? 30 : 14, opacity: 0, duration: .65, ease: 'power2.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: el, start: 'top 96%', once: true } });
  });
  if (desktop) gsap.to('.orb', { y: 80, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .6 } });
  return () => { if (tick) gsap.ticker.remove(tick); lenis?.destroy(); document.documentElement.classList.remove('motion-scroll'); };
});
document.fonts.ready.then(() => ScrollTrigger.refresh());
document.addEventListener('languagechange',()=>requestAnimationFrame(()=>ScrollTrigger.refresh()));
