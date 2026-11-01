"use client";

import {type CSSProperties, useEffect, useRef} from "react";
import gsap from "gsap";

const STEP_EVERY = 2.6;
const STEP_FOR = 1.1;
const FIRST_AFTER = 4.4;

const FACES = 8;
const STEP = 360 / FACES;
const RADIUS_EM = 1.15 / (2 * Math.tan(Math.PI / FACES));

function face(angle: number): CSSProperties {
  const a = ((((angle + 180) % 360) + 360) % 360) - 180;
  const d = Math.abs(a);
  return {
    transform: `rotateX(${-a}deg) translateZ(${RADIUS_EM}em)`,
    opacity: d < 1 ? 1 : d <= STEP ? 1 - (0.72 * d) / STEP : Math.max(0, 0.28 - (0.28 * (d - STEP)) / STEP)
  };
}

export default function TextWheel({words}: {words: string[]}) {
  const drumRef = useRef<HTMLDivElement>(null);
  const faces = Array.from({length: FACES}, (_, i) => words[i % words.length]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const drum = drumRef.current;
    if (!drum) return;
    const els = Array.from(drum.children) as HTMLElement[];
    const s = {turn: 0};
    const render = () => els.forEach((el, i) => gsap.set(el, face(i * STEP - s.turn)));

    let visible = true;
    let call: gsap.core.Tween | null = null;
    const advance = () => {
      if (!visible || document.hidden) {
        call = gsap.delayedCall(0.5, advance);
        return;
      }
      gsap.to(s, {
        turn: Math.round(s.turn / STEP) * STEP + STEP,
        duration: STEP_FOR,
        ease: "power4.inOut",
        onUpdate: render,
        onComplete: () => {
          s.turn %= 360;
          call = gsap.delayedCall(STEP_EVERY, advance);
        }
      });
    };
    call = gsap.delayedCall(FIRST_AFTER, advance);

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(drum);
    return () => {
      io.disconnect();
      call?.kill();
      gsap.killTweensOf(s);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="relative h-[2.9em] w-[12em] max-w-full overflow-hidden [perspective-origin:0_50%] [perspective:40em]"
      style={{
        maskImage: "linear-gradient(to bottom, transparent, black 32%, black 68%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 32%, black 68%, transparent)"
      }}
    >
      <div ref={drumRef} className="absolute inset-0 [transform-style:preserve-3d]">
        {faces.map((word, i) => (
          <span
            key={i}
            style={face(i * STEP)}
            className="absolute inset-x-0 top-1/2 -mt-[0.575em] block h-[1.15em] whitespace-nowrap leading-[1.15] [backface-visibility:hidden]"
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
