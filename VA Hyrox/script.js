// Before loading TF.js
const originalWarn = console.warn;
console.warn = (...args) => {
  if (args[0]?.includes?.('already registered')) return;
  originalWarn(...args);
};
console.log("VA script loaded");
const isMobile = window.matchMedia("(max-width: 991px)").matches;
const lenis = new Lenis({
  syncTouch: !isMobile,
  syncTouchLerp: 0.075,
  touchInertiaExponent: 1.7,
  touchMultiplier: 1,
});

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

lenis.on("scroll", ScrollTrigger.update);

let winW = window.innerWidth;

window.addEventListener("resize", () => {
  if (window.innerWidth !== winW) {
    winW = window.innerWidth;
    ScrollTrigger.refresh();
  }
});
console.log("VA script executed");
