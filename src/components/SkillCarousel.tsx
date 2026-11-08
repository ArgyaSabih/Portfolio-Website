"use client";

import {type CSSProperties, useEffect, useRef, useState} from "react";
import gsap from "gsap";
import LazyBeam from "./LazyBeam";
import {placeCards} from "./rotatingCards";

const STEP_FOR = 0.65;
const STEP_EVERY = 1.5 - STEP_FOR;

function initialStyle(index: number, count: number, reach: number): CSSProperties {
  const raw = index;
  const slot = ((((raw + count / 2) % count) + count) % count) - count / 2;
  const distance = Math.abs(slot);
  const visibility = Math.min(1, Math.max(0, 1 - (distance - reach) / 0.16));
  const scale = (1.02 + (0.84 - 1.02) * Math.min(distance / 1.5, 1)).toFixed(3);
  return {
    transform: `translate(calc(${slot} * var(--card-step)), ${Math.min(distance, 1.3) * 36}px) rotate(${slot * 5.5}deg) scale(${scale})`,
    opacity: visibility,
    zIndex: 100 - Math.round(distance * 20)
  };
}

export default function SkillCarousel({items}: {items: string[]}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [reduced, setReduced] = useState(false);
  const [held, setHeld] = useState(false);
  const [offscreen, setOffscreen] = useState(true);
  const [hidden, setHidden] = useState(false);
  const state = useRef({pos: 0, entry: 0, entered: false, spacing: 0, reach: 1.1});

  const n = items.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    const onVis = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      mq.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  useEffect(() => {
    if (reduced) return;
    const stage = stageRef.current;
    const list = listRef.current;
    if (!stage || !list) return;
    const cards = Array.from(list.children) as HTMLElement[];
    const s = state.current;

    const render = () => placeCards(cards, s.pos, {spacing: s.spacing, reach: s.reach, entry: s.entry});
    const measure = () => {
      s.spacing = cards[0].offsetWidth * 0.9;
      s.reach = stage.clientWidth >= 900 ? 2.1 : 1.1;
      render();
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stage);

    const io = new IntersectionObserver(([e]) => {
      setOffscreen(!e.isIntersecting);
      if (e.isIntersecting && !s.entered) {
        s.entered = true;
        gsap.fromTo(s, {entry: 0}, {entry: 1, duration: 1, ease: "expo.out", onUpdate: render});
      }
    });
    io.observe(stage);

    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, [reduced]);

  useEffect(() => {
    if (reduced || held || offscreen || hidden) return;
    const list = listRef.current;
    if (!list) return;
    const cards = Array.from(list.children) as HTMLElement[];
    const s = state.current;

    let stopped = false;
    let tween: gsap.core.Tween | null = null;
    let call: gsap.core.Tween | null = null;
    const advance = () => {
      tween = gsap.to(s, {
        pos: Math.round(s.pos) + 1,
        duration: STEP_FOR,
        ease: "power3.inOut",
        onUpdate: () => placeCards(cards, s.pos, {spacing: s.spacing, reach: s.reach, entry: s.entry}),
        onComplete: () => {
          s.pos %= n;
          if (!stopped) call = gsap.delayedCall(STEP_EVERY, advance);
        }
      });
    };
    call = gsap.delayedCall(STEP_EVERY, advance);

    return () => {
      stopped = true;
      call?.kill();
      tween?.progress(1);
      tween?.kill();
    };
  }, [reduced, held, offscreen, hidden, n]);

  if (reduced) return null;

  return (
    <div
      ref={stageRef}
      aria-hidden="true"
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      className="relative h-[calc(var(--card-h)+4.5rem)] overflow-hidden [--card-h:11.5rem] [--card-step:calc(var(--card-w)*0.9)] [--card-w:9rem] md:[--card-h:15rem] md:[--card-w:12rem]"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)"
      }}
    >
      <ul ref={listRef}>
        {items.map((name, i) => (
          <li
            key={name}
            style={initialStyle(i, n, 1.1)}
            className="absolute left-1/2 top-3 -ml-[calc(var(--card-w)/2)] flex h-[var(--card-h)] w-[var(--card-w)] flex-col justify-between border border-rule-strong bg-ink-raised p-4 will-change-transform md:p-5"
          >
            <span aria-hidden="true" className="block h-2 w-2 rotate-45 bg-accent" />
            <span className="font-display text-[1.375rem] leading-[1.05] tracking-[-0.02em] text-paper md:text-[1.875rem]">
              {name}
            </span>
            <span aria-hidden="true" className="block h-px w-8 bg-rule-strong" />
          </li>
        ))}
      </ul>

      <LazyBeam
        trigger="visible"
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-3 z-[200] -translate-x-1/2 -translate-y-[calc(var(--card-h)*0.01)]"
      >
        <div className="h-[calc(var(--card-h)*1.02)] w-[calc(var(--card-w)*1.02)] border border-transparent" />
      </LazyBeam>
    </div>
  );
}
