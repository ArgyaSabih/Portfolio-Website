"use client";

import {useEffect, useLayoutEffect} from "react";
import gsap from "gsap";
import type {ScrollTrigger as ScrollTriggerClass} from "gsap/ScrollTrigger";
import type LenisType from "lenis";
import type {HeroSignal} from "./HeroPortrait";
import {placeCards} from "./rotatingCards";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
const EASE = "power3.out";
const HIDDEN_UP = {opacity: 0, y: 20};
const HIDDEN_ROW = {opacity: 0, x: -16};
const SHOWN = {opacity: 1, y: 0, x: 0};
const REDUCED = "(prefers-reduced-motion: reduce)";
const FULL = "(prefers-reduced-motion: no-preference)";
const STAGE = "(min-width: 1024px) and (min-height: 680px)";
const PIP_SCALE = 0.46;
const PIP_INSET = 20;
const PIN_VH = 90;
const SPLASH_LATE_MS = 2200;
const SPLASH_REVEAL = 2.78;
const lockScroll = () => (document.documentElement.style.overflow = "hidden");
const unlockScroll = () => (document.documentElement.style.overflow = "");

function settle() {
  gsap.set("[data-splash]", {display: "none"});
  unlockScroll();
  gsap.set("[data-anim]", {autoAlpha: 1, x: 0, y: 0, clearProps: "clipPath"});
  gsap.set("[data-timeline-rule]", {scaleY: 1});
  gsap.set("[data-anim-rule], [data-anim-hero-rule]", {scaleX: 1});
  gsap.set("[data-hero-lead], [data-hero-name]", {autoAlpha: 1});
  gsap.set("[data-hero-name] .char, [data-hero-lead] .char", {autoAlpha: 1, yPercent: 0});
  gsap.set(".caret", {x: 0, autoAlpha: 1});
}

function heroPointer(): () => void {
  const hero = document.getElementById("hero");
  if (!hero) return () => {};

  const wide = window.matchMedia("(min-width: 768px)").matches;
  const MAX_X = wide ? 10 : 8;
  const MAX_Y = wide ? 16 : 12;

  const layers = gsap.utils.toArray<HTMLElement>("[data-depth]", hero).map((el) => ({
    depth: Number(el.dataset.depth) || 0,
    qx: gsap.quickTo(el, "x", {duration: 0.9, ease: "power3.out"}),
    qy: gsap.quickTo(el, "y", {duration: 0.9, ease: "power3.out"})
  }));

  const emit = (x: number, y: number, active: boolean, source: HeroSignal["source"]) => {
    for (const l of layers) {
      l.qx(x * l.depth * MAX_X);
      l.qy(y * l.depth * MAX_Y);
    }
    window.dispatchEvent(new CustomEvent<HeroSignal>("hero-pointer", {detail: {x, y, active, source}}));
  };

  const clamp = gsap.utils.clamp(-1, 1);
  const fromPoint = (clientX: number, clientY: number) => {
    const r = hero.getBoundingClientRect();
    return {
      x: clamp(((clientX - r.left) / r.width - 0.5) * 2),
      y: clamp(((clientY - r.top) / r.height - 0.5) * 2)
    };
  };

  const onPointerMove = (e: PointerEvent) => {
    if (e.pointerType === "touch") return;
    const p = fromPoint(e.clientX, e.clientY);
    emit(p.x, p.y, true, "mouse");
  };
  const onPointerLeave = (e: PointerEvent) => {
    if (e.pointerType !== "touch") emit(0, 0, false, "mouse");
  };

  let touching = false;
  const onTouch = (e: TouchEvent) => {
    const t = e.touches[0];
    if (!t) return;
    touching = true;
    const p = fromPoint(t.clientX, t.clientY);
    emit(p.x, p.y, true, "touch");
  };
  const onTouchEnd = () => {
    touching = false;
    emit(0, 0, false, "touch");
  };

  let inView = true;
  let base: {g: number; b: number} | null = null;
  let gyroOn = false;
  type DOE = typeof DeviceOrientationEvent & {requestPermission?: () => Promise<string>};
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const startGyro = () => {
    if (gyroOn) return;
    gyroOn = true;
    window.addEventListener("deviceorientation", onTilt);
  };
  const onTilt = (e: DeviceOrientationEvent) => {
    if (touching || !inView || e.gamma == null || e.beta == null) return;
    if (!base) base = {g: e.gamma, b: e.beta};
    emit(clamp((e.gamma - base.g) / 20), clamp((e.beta - base.b) / 20), false, "gyro");
  };
  if (coarse && typeof DeviceOrientationEvent !== "undefined") {
    const ask = (DeviceOrientationEvent as DOE).requestPermission;
    if (typeof ask !== "function") startGyro();
    else
      ask
        .call(DeviceOrientationEvent)
        .then((state) => state === "granted" && startGyro())
        .catch(() => {});
  }

  const io = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    if (!inView) emit(0, 0, false, "gyro");
  });
  io.observe(hero);

  hero.addEventListener("pointermove", onPointerMove);
  hero.addEventListener("pointerleave", onPointerLeave);
  hero.addEventListener("touchstart", onTouch, {passive: true});
  hero.addEventListener("touchmove", onTouch, {passive: true});
  hero.addEventListener("touchend", onTouchEnd);
  hero.addEventListener("touchcancel", onTouchEnd);

  return () => {
    io.disconnect();
    hero.removeEventListener("pointermove", onPointerMove);
    hero.removeEventListener("pointerleave", onPointerLeave);
    hero.removeEventListener("touchstart", onTouch);
    hero.removeEventListener("touchmove", onTouch);
    hero.removeEventListener("touchend", onTouchEnd);
    hero.removeEventListener("touchcancel", onTouchEnd);
    window.removeEventListener("deviceorientation", onTilt);
  };
}

function splashTimeline(splash: HTMLElement) {
  lockScroll();
  const tl = gsap.timeline({
    defaults: {ease: EASE},
    onComplete: () => {
      gsap.set(splash, {display: "none"});
      unlockScroll();
    }
  });

  const cards = gsap.utils.toArray<HTMLElement>("[data-splash-card]", splash);
  const fan = {pos: 0, entry: 0};
  const spacing = cards[0] ? cards[0].offsetWidth * 0.9 : 0;
  const place = () => placeCards(cards, fan.pos, {spacing, entry: fan.entry, lift: 28});

  tl.fromTo(
    "[data-splash-col]",
    {scaleY: 0, transformOrigin: "top center"},
    {scaleY: 1, duration: 0.75, stagger: 0.045, ease: "power2.out"},
    0
  )
    .fromTo(
      "[data-splash-mark]",
      {autoAlpha: 0, scale: 0.4},
      {autoAlpha: 1, scale: 1, duration: 0.5, stagger: 0.05},
      0.1
    )
    .fromTo(
      "[data-splash-scan]",
      {autoAlpha: 1, y: 0},
      {y: () => window.innerHeight, duration: 1.15, ease: "power1.inOut"},
      0.12
    )
    .to("[data-splash-scan]", {autoAlpha: 0, duration: 0.2}, 1.1);

  if (cards.length) {
    place();
    tl.to(fan, {entry: 1, duration: 0.5, ease: "expo.out", onUpdate: place}, 0.15)
      .to(fan, {pos: 1, duration: 0.4, ease: "power3.inOut", onUpdate: place}, 0.55)
      .to(fan, {pos: 2, duration: 0.4, ease: "power3.inOut", onUpdate: place}, 0.98)
      .to(fan, {pos: 3, duration: 0.4, ease: "power3.inOut", onUpdate: place}, 1.41)
      .to(cards, {y: "-=36", autoAlpha: 0, duration: 0.3, ease: "power2.in", stagger: 0.02}, 1.81);
  }

  tl.fromTo(
    "[data-splash] .char",
    {yPercent: 115, autoAlpha: 0},
    {yPercent: 0, autoAlpha: 1, duration: 0.7, stagger: 0.08},
    1.88
  )
    .fromTo("[data-splash-rule]", {autoAlpha: 1, scaleX: 0}, {scaleX: 1, duration: 0.55}, 2.08)
    .fromTo("[data-splash-caption]", {autoAlpha: 0, y: 10}, {autoAlpha: 1, y: 0, duration: 0.4}, 2.15)
    .to("[data-splash-content]", {autoAlpha: 0, scale: 1.06, duration: 0.35, ease: "power2.in"}, 2.45)
    .fromTo(
      "[data-splash-split]",
      {autoAlpha: 1, scaleX: 0},
      {scaleX: 1, duration: 0.3, ease: "power2.inOut"},
      2.48
    )
    .to("[data-splash-half='top']", {yPercent: -100, duration: 0.75, ease: "power3.inOut"}, 2.73)
    .to("[data-splash-half='bottom']", {yPercent: 100, duration: 0.75, ease: "power3.inOut"}, 2.73)
    .to("[data-splash-col], [data-splash-mark]", {autoAlpha: 0, duration: 0.35}, 2.73)
    .to("[data-splash-split]", {autoAlpha: 0, duration: 0.25}, 2.91);

  return tl;
}

function lowerThirdIn(tl: gsap.core.Timeline, lt: HTMLElement, at: number, span = 1) {
  const outline = lt.querySelector("[data-lt-outline]");
  const dot = lt.querySelector("[data-lt-dot]");
  const text = lt.querySelector("[data-lt-text]");
  tl.fromTo(lt, {autoAlpha: 0, y: 10}, {autoAlpha: 1, y: 0, duration: 0.15 * span}, at);
  if (outline) {
    tl.fromTo(
      outline,
      {strokeDashoffset: 1, fillOpacity: 0},
      {strokeDashoffset: 0, duration: 0.3 * span, ease: "power2.out"},
      at
    ).to(outline, {fillOpacity: 1, duration: 0.15 * span}, at + 0.2 * span);
  }
  if (dot)
    tl.fromTo(
      dot,
      {attr: {r: 0}},
      {attr: {r: 9}, duration: 0.15 * span, ease: "power2.out"},
      at + 0.28 * span
    );
  if (text) {
    tl.fromTo(
      text,
      {clipPath: "inset(0% 100% 0% 0%)"},
      {clipPath: "inset(0% 0% 0% 0%)", duration: 0.4 * span, ease: "power2.out"},
      at + 0.22 * span
    );
  }
}

export default function Motion() {
  useIsoLayoutEffect(() => {
    const root = document.documentElement;
    const arrivedAt = performance.now();

    root.classList.add("anim-ready");

    let stopPointer = () => {};

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(REDUCED, () => {
        gsap.set("[data-splash]", {display: "none"});
        gsap.set("[data-timeline-rule]", {scaleY: 1});
        gsap.to("[data-anim]", {
          autoAlpha: 1,
          duration: 0.5,
          ease: "none",
          stagger: {each: 0.015, from: "start"}
        });
      });

      mm.add(FULL, () => {
        const master = gsap.timeline();
        const splash = document.querySelector<HTMLElement>("[data-splash]");
        const late = arrivedAt > SPLASH_LATE_MS;
        if (splash && !late) master.add(splashTimeline(splash), 0);
        else if (splash) gsap.set(splash, {display: "none"});
        const at = splash && !late ? SPLASH_REVEAL : 0;
        const leadChars = gsap.utils.toArray<HTMLElement>("[data-hero-lead] .char");
        const heroChars = gsap.utils.toArray<HTMLElement>("[data-hero-name] .char");
        const caret = document.querySelector<HTMLElement>(".caret");
        const typed = gsap.utils.toArray<HTMLElement>("[data-hero-lead] .char, [data-hero-lead] .char-space");
        const TYPE = 0.07;
        const typeAt = at + 0.2;
        const typedBy = typeAt + typed.length * TYPE;

        if (leadChars.length) {
          gsap.set("[data-hero-lead]", {autoAlpha: 1});
          gsap.set(leadChars, {autoAlpha: 0});
        }

        if (caret) {
          const caretTo = (edge: number, gap: boolean) => {
            const natural = caret.getBoundingClientRect().left - (gsap.getProperty(caret, "x") as number);
            const margin = gap ? parseFloat(getComputedStyle(caret).marginLeft) || 0 : 0;
            gsap.set(caret, {x: edge + margin - natural});
          };
          gsap.set(caret, {autoAlpha: 1});
          master.add(
            () => typed[0] && caretTo(typed[0].getBoundingClientRect().left, false),
            Math.max(0, typeAt - 0.01)
          );
          typed.forEach((el, i) => {
            master.add(
              () => {
                gsap.set(el, {autoAlpha: 1});
                caretTo(el.getBoundingClientRect().right, true);
              },
              typeAt + i * TYPE
            );
          });

          const blink = gsap.to(caret, {
            autoAlpha: 0,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
            ease: "steps(1)",
            paused: true
          });
          master.add(() => {
            gsap.set(caret, {x: 0});
            blink.play();
          }, typedBy + 0.05);
        } else if (leadChars.length) {
          master.fromTo(leadChars, {autoAlpha: 0}, {autoAlpha: 1, duration: 0.01, stagger: TYPE}, typeAt);
        }

        if (heroChars.length) {
          gsap.set("[data-hero-name]", {autoAlpha: 1});
          master.fromTo(
            heroChars,
            {yPercent: 118, autoAlpha: 0},
            {yPercent: 0, autoAlpha: 1, duration: 0.9, stagger: 0.035, ease: EASE},
            typedBy - 0.3
          );
        }

        master
          .fromTo("[data-anim-portrait] img", {scale: 1.14}, {scale: 1, duration: 1.4, ease: EASE}, at)
          .fromTo(
            "[data-anim-hero-rule]",
            {autoAlpha: 1, scaleX: 0, transformOrigin: "left center"},
            {scaleX: 1, duration: 0.95, ease: EASE},
            typedBy + 0.1
          )
          .fromTo(
            "[data-anim-hero]",
            HIDDEN_UP,
            {...SHOWN, duration: 0.8, stagger: 0.1, ease: EASE},
            typedBy + 0.15
          );

        stopPointer = heroPointer();
      });

      return () => mm.revert();
    });

    const startFrame = gsap.ticker.frame;
    const watchdog = window.setTimeout(() => {
      if (gsap.ticker.frame - startFrame < 5) settle();
    }, 3200);

    return () => {
      window.clearTimeout(watchdog);
      stopPointer();
      ctx.revert();
      unlockScroll();
      root.classList.remove("anim-ready");
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    let ctx: gsap.Context | null = null;
    let lenis: LenisType | null = null;
    let tick: ((time: number) => void) | null = null;
    let onClick: ((event: MouseEvent) => void) | null = null;
    let idle: number | undefined;

    const setup = async () => {
      const mod = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      const ScrollTrigger: typeof ScrollTriggerClass = mod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add({full: FULL, stage: STAGE}, (mmCtx) => {
          if (!mmCtx.conditions?.full) return;
          const stage = Boolean(mmCtx.conditions.stage);
          const wide = window.matchMedia("(min-width: 768px)").matches;
          const jobs: Array<() => void> = [];
          const cleanups: Array<() => void> = [];
          const headerH = () => document.querySelector("header")?.getBoundingClientRect().height ?? 84;
          gsap.utils.toArray<HTMLElement>("[data-scene]").forEach((scene) => {
            const topRight = scene.dataset.corner !== "bl";
            const stageEl = scene.querySelector<HTMLElement>("[data-scene-stage]");
            const shot = scene.querySelector<HTMLElement>("[data-scene-shot]");
            const info = scene.querySelector<HTMLElement>("[data-scene-info]");
            const frame = scene.querySelector<HTMLElement>("[data-scene-frame]");
            const items = scene.querySelectorAll<HTMLElement>("[data-scene-item]");
            const lt = scene.querySelector<HTMLElement>("[data-lt]");
            const alt = scene.querySelector<HTMLElement>("[data-scene-alt]");
            if (!stageEl || !shot || !info) return;

            jobs.push(() => {
              if (stage) {
                const pinAt = () => `top top+=${headerH() + 24}`;

                if (lt) {
                  const approach = gsap.timeline({
                    defaults: {ease: "none"},
                    scrollTrigger: {
                      trigger: stageEl,
                      start: "top 70%",
                      end: pinAt,
                      scrub: 0.6,
                      invalidateOnRefresh: true
                    }
                  });
                  lowerThirdIn(approach, lt, 0);
                }

                const tl = gsap.timeline({
                  defaults: {ease: "none"},
                  scrollTrigger: {
                    trigger: stageEl,
                    start: pinAt,
                    end: `+=${PIN_VH}%`,
                    pin: true,
                    pinSpacing: false,
                    scrub: 0.6,
                    invalidateOnRefresh: true
                  }
                });
                if (lt) tl.to(lt, {autoAlpha: 0, y: 10, duration: 0.08}, 0.04);
                tl.fromTo(
                  shot,
                  {x: 0, y: 0, scale: 1},
                  {
                    x: topRight ? -PIP_INSET : PIP_INSET,
                    y: topRight ? PIP_INSET : -PIP_INSET,
                    scale: PIP_SCALE,
                    duration: 0.5,
                    ease: "power2.inOut"
                  },
                  0.08
                );
                tl.fromTo(
                  items,
                  {opacity: 0, y: 36},
                  {opacity: 1, y: 0, duration: 0.22, stagger: 0.06, ease: "power2.out"},
                  0.38
                );
                if (frame) tl.fromTo(frame, {autoAlpha: 0}, {autoAlpha: 1, duration: 0.1}, 0.6);
                if (alt)
                  tl.fromTo(alt, {opacity: 0}, {opacity: 1, duration: 0.3, ease: "power1.inOut"}, 0.64);
                tl.fromTo(info, {y: 28}, {y: -14, duration: 1}, 0);

                const revealOnFocus = (event: FocusEvent) => {
                  const item = (event.target as HTMLElement).closest<HTMLElement>("[data-scene-item]");
                  const st = tl.scrollTrigger;
                  if (!item || !st) return;
                  requestAnimationFrame(() => {
                    if (Number(getComputedStyle(item).opacity) > 0.98) return;
                    window.scrollTo({top: st.start + (st.end - st.start) * 0.9, behavior: "instant"});
                  });
                };
                info.addEventListener("focusin", revealOnFocus);
                cleanups.push(() => info.removeEventListener("focusin", revealOnFocus));
              } else {
                const tl = gsap.timeline({
                  defaults: {ease: "none"},
                  scrollTrigger: {
                    trigger: scene,
                    start: "top 85%",
                    end: "top 25%",
                    scrub: 0.6,
                    invalidateOnRefresh: true
                  }
                });
                tl.fromTo(
                  shot,
                  {scale: 0.55, transformOrigin: topRight ? "100% 0%" : "0% 100%"},
                  {scale: 1, duration: 0.6, ease: "power2.out"},
                  0
                );
                if (frame) tl.fromTo(frame, {autoAlpha: 0}, {autoAlpha: 1, duration: 0.1}, 0.6);
                if (lt) lowerThirdIn(tl, lt, 0.45, 0.6);
                tl.fromTo(
                  items,
                  {opacity: 0, y: 28},
                  {opacity: 1, y: 0, duration: 0.3, stagger: 0.08, ease: "power2.out"},
                  0.35
                );
                if (alt) {
                  gsap.fromTo(
                    alt,
                    {opacity: 0},
                    {
                      opacity: 1,
                      ease: "none",
                      scrollTrigger: {trigger: scene, start: "top 30%", end: "bottom 70%", scrub: 0.6}
                    }
                  );
                }

                const revealOnFocus = (event: FocusEvent) => {
                  const target = event.target as HTMLElement;
                  const item = target.closest<HTMLElement>("[data-scene-item]");
                  if (!item) return;
                  requestAnimationFrame(() => {
                    if (Number(getComputedStyle(item).opacity) > 0.98) return;
                    target.scrollIntoView({block: "center", behavior: "instant"});
                  });
                };
                info.addEventListener("focusin", revealOnFocus);
                cleanups.push(() => info.removeEventListener("focusin", revealOnFocus));
              }
            });
          });

          jobs.push(() => {
            ScrollTrigger.batch("[data-anim-up]", {
              start: "top 88%",
              onEnter: (batch) =>
                gsap.fromTo(batch, HIDDEN_UP, {...SHOWN, duration: 0.85, stagger: 0.09, ease: EASE}),
              once: true
            });

            ScrollTrigger.batch("[data-anim-row]", {
              start: "top 92%",
              onEnter: (batch) =>
                gsap.fromTo(batch, HIDDEN_ROW, {...SHOWN, duration: 0.7, stagger: 0.055, ease: EASE}),
              once: true
            });

            gsap.utils.toArray<HTMLElement>("[data-anim-rule]").forEach((el) => {
              gsap.fromTo(
                el,
                {autoAlpha: 1, scaleX: 0, transformOrigin: "left center"},
                {
                  scaleX: 1,
                  duration: 0.9,
                  ease: EASE,
                  scrollTrigger: {trigger: el, start: "top 92%", once: true}
                }
              );
            });

            gsap.fromTo(
              "[data-progress]",
              {scaleX: 0, transformOrigin: "left center"},
              {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.3}
              }
            );

            gsap.utils.toArray<HTMLElement>("[data-scroll-depth]").forEach((el) => {
              gsap.to(el, {
                yPercent: Number(el.dataset.scrollDepth) * (wide ? 1 : 0.6),
                ease: "none",
                scrollTrigger: {trigger: "#hero", start: "top top", end: "bottom top", scrub: true}
              });
            });
          });

          jobs.push(() => {
            const group = document.querySelector<HTMLElement>("[data-polaroids]");
            if (!group) return;
            const prints = gsap.utils.toArray<HTMLElement>("[data-polaroid]", group);
            const tl = gsap.timeline({
              defaults: {ease: "none"},
              scrollTrigger: {trigger: group, start: "top 95%", end: "top 60%", scrub: 0.6}
            });
            prints.forEach((el, i) => {
              const fromLeft = i % 2 === 0;
              tl.fromTo(
                el,
                {
                  x: (fromLeft ? -1 : 1) * (wide ? 220 : 110),
                  y: 150 + i * 30,
                  rotate: fromLeft ? -20 : 16,
                  autoAlpha: 0
                },
                {
                  x: 0,
                  y: 0,
                  rotate: Number(el.dataset.rest ?? 0),
                  autoAlpha: 1,
                  duration: 0.7,
                  ease: "power3.out"
                },
                i * 0.2
              );
            });
            gsap.fromTo(
              group,
              {y: 30, scale: 1},
              {
                y: -18,
                scale: 1.035,
                ease: "none",
                scrollTrigger: {trigger: group, start: "top bottom", end: "bottom top", scrub: true}
              }
            );
          });

          jobs.push(() => {
            gsap.fromTo(
              "[data-timeline-rule]",
              {scaleY: 0, transformOrigin: "top center"},
              {
                scaleY: 1,
                ease: "none",
                scrollTrigger: {trigger: "#skills", start: "top 80%", end: "center 60%", scrub: 0.5}
              }
            );

            gsap.utils.toArray<HTMLElement>("[data-joint]").forEach((joint) => {
              const spin = Number(joint.dataset.jointSpin ?? 28);
              const jointDrift = Number(joint.dataset.jointDrift ?? 40);
              const spinners = joint.querySelectorAll("[data-joint-spin]");
              const drifters = joint.querySelectorAll("[data-joint-drift]");
              const st = {trigger: joint, start: "top bottom", end: "bottom top", scrub: 0.8};
              if (spinners.length)
                gsap.fromTo(spinners, {rotate: -spin}, {rotate: spin, ease: "none", scrollTrigger: st});
              if (drifters.length) {
                gsap.fromTo(
                  drifters,
                  {yPercent: jointDrift / 5},
                  {yPercent: -jointDrift / 5, ease: "none", scrollTrigger: st}
                );
              }
            });
          });

          jobs.push(() => {
            gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
              const depth = Number(el.dataset.parallax || 8) * (wide ? 1 : 0.6);
              gsap.fromTo(
                el,
                {yPercent: -depth},
                {
                  yPercent: depth,
                  ease: "none",
                  scrollTrigger: {
                    trigger: el.parentElement ?? el,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                  }
                }
              );
            });
          });

          let timer = 0;
          const run = (i: number) => {
            if (i >= jobs.length) return;
            mmCtx.add(jobs[i]);
            timer = window.setTimeout(() => run(i + 1), 16);
          };
          run(0);
          return () => {
            window.clearTimeout(timer);
            cleanups.forEach((fn) => fn());
          };
        });

        return () => mm.revert();
      });

      if (window.matchMedia(REDUCED).matches) {
        document.documentElement.classList.add("no-lenis");
        return;
      }

      const startLenis = async () => {
        const {default: Lenis} = await import("lenis");
        if (cancelled) return;

        const tickerAlive = await new Promise<boolean>((resolve) => {
          let fired = false;
          requestAnimationFrame(() => {
            fired = true;
            resolve(true);
          });
          window.setTimeout(() => resolve(fired), 500);
        });
        if (cancelled) return;
        if (!tickerAlive) {
          document.documentElement.classList.add("no-lenis");
          return;
        }

        lenis = new Lenis({
          duration: 1.05,
          easing: (t: number) => 1 - Math.pow(1 - t, 3),
          smoothWheel: true,
          syncTouch: false // touch keeps native inertia
        });

        lenis.on("scroll", ScrollTrigger.update);
        tick = (time: number) => lenis?.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        onClick = (event: MouseEvent) => {
          if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
          const link = (event.target as HTMLElement | null)?.closest?.('a[href^="#"]');
          if (!link) return;
          const id = link.getAttribute("href");
          if (!id || id === "#") return;
          const target = document.querySelector<HTMLElement>(id);
          if (!target || !lenis) return;

          event.preventDefault();
          const header = document.querySelector("header");
          const offset = -(header ? header.getBoundingClientRect().height : 76);
          lenis.scrollTo(target, {offset});
          target.setAttribute("tabindex", "-1");
          target.focus({preventScroll: true});
        };
        document.addEventListener("click", onClick);
      };

      idle = window.requestIdleCallback
        ? window.requestIdleCallback(() => void startLenis(), {timeout: 2000})
        : window.setTimeout(() => void startLenis(), 400);
    };

    let started = false;
    let bootIdle: number | undefined;
    const intents = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
    const stopListening = () => intents.forEach((type) => window.removeEventListener(type, boot));
    function boot() {
      if (started || cancelled) return;
      started = true;
      stopListening();
      void setup();
    }
    intents.forEach((type) => window.addEventListener(type, boot, {passive: true}));

    const onLoad = () => {
      bootIdle = window.requestIdleCallback
        ? window.requestIdleCallback(boot, {timeout: 2500})
        : window.setTimeout(boot, 600);
    };
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, {once: true});

    return () => {
      cancelled = true;
      stopListening();
      window.removeEventListener("load", onLoad);
      if (bootIdle !== undefined) {
        if (window.cancelIdleCallback) window.cancelIdleCallback(bootIdle);
        else window.clearTimeout(bootIdle);
      }
      if (idle !== undefined) {
        if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
        else window.clearTimeout(idle);
      }
      if (onClick) document.removeEventListener("click", onClick);
      if (tick) gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis?.destroy();
      ctx?.revert();
      document.documentElement.classList.remove("no-lenis");
    };
  }, []);

  return null;
}
