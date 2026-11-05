"use client";

import Image from "next/image";
import {useEffect, useRef, useState, type CSSProperties} from "react";
import gsap from "gsap";

export type HeroSignal = {x: number; y: number; active: boolean; source: "mouse" | "touch" | "gyro"};

const ACCENT = "235, 181, 89";
const TILT = 11;
const REACH_X = 0.2;
const REACH_Y = 0.22;
const AUTO_AFTER = 3.4;

const RINGS = [
  {tilt: 0.62, roll: 0, spin: 0.38, speed: 0.1, count: 52, phase: 0},
  {tilt: 0.22, roll: Math.PI / 3, spin: -0.3, speed: -0.085, count: 46, phase: 2.1},
  {tilt: 0.42, roll: -Math.PI / 3, spin: 0.24, speed: 0.095, count: 40, phase: 4.2},
  {tilt: 0.82, roll: Math.PI / 6, spin: -0.24, speed: -0.055, count: 58, phase: 8.2},
  {tilt: 1.12, roll: -Math.PI / 6, spin: 0.52, speed: 0.07, count: 34, phase: 6.2}
];
const DEPTH = 0.165;

export default function HeroPortrait() {
  const figureRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const figure = figureRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!figure || !stage || !canvas || !ctx) return;

    gsap.set(stage, {transformPerspective: 900, transformStyle: "preserve-3d"});
    const rotX = gsap.quickTo(stage, "rotationX", {duration: 0.6, ease: "power3.out"});
    const rotY = gsap.quickTo(stage, "rotationY", {duration: 0.6, ease: "power3.out"});

    let w = 0;
    let h = 0;
    let frame = 0;
    let mount = 16;
    let bleedX = 0;
    let bleedY = 0;
    let reachX = 0;
    const size = () => {
      const photo = stage.querySelector<HTMLElement>("[data-anim-portrait]");
      if (!photo) return;
      frame = photo.offsetWidth;
      mount = window.matchMedia("(min-width: 768px)").matches ? 16 : 12;
      const pad = 8;
      const drift = Number(gsap.getProperty(figure.parentElement ?? figure, "x")) || 0;
      const room = document.documentElement.clientWidth - (photo.getBoundingClientRect().right - drift) - 22;
      reachX = Math.max(frame * 0.04, Math.min(frame * REACH_X, room - mount - pad));
      bleedX = Math.ceil(frame * REACH_X + pad);
      bleedY = Math.ceil(frame * REACH_Y + mount + pad);
      const right = Math.max(0, Math.min(Math.ceil(mount + reachX + pad), Math.floor(room)));

      w = bleedX + frame + right;
      h = bleedY * 2 + frame;
      canvas.style.left = `${-bleedX}px`;
      canvas.style.top = `${-bleedY}px`;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(stage);
    window.addEventListener("resize", size);

    const state = {intensity: 0, t: 0};
    let running = false;

    const draw = (_time: number, deltaMs: number) => {
      state.t += (deltaMs / 1000) * (0.4 + 0.6 * state.intensity);
      ctx.clearRect(0, 0, w, h);

      const k = frame / 416;
      const shift = mount / 2;
      const cx = bleedX + frame / 2 + shift;
      const cy = bleedY + frame / 2 + shift;
      const grow = 0.88 + 0.12 * state.intensity;
      const ax = ((frame / 2 + shift + reachX) / (1 + DEPTH)) * grow;
      const ay = ((frame / 2 + shift + frame * REACH_Y) / (1 + DEPTH)) * grow;
      const x0 = bleedX;
      const y0 = bleedY;
      const x1 = bleedX + frame + mount;
      const y1 = bleedY + frame + mount;

      for (const ring of RINGS) {
        const ct = Math.cos(ring.tilt);
        const st = Math.sin(ring.tilt);
        const cr = Math.cos(ring.roll);
        const sr = Math.sin(ring.roll);
        const yaw = ring.phase + state.t * ring.spin;
        const cyw = Math.cos(yaw);
        const syw = Math.sin(yaw);
        for (let i = 0; i < ring.count; i++) {
          const a = ((i / ring.count + state.t * ring.speed) % 1) * Math.PI * 2;
          const px = Math.cos(a);
          const py0 = Math.sin(a);
          const py = py0 * ct;
          const pz = py0 * st;
          const rx = px * cr - py * sr;
          const ry = px * sr + py * cr;
          const x = rx * cyw + pz * syw;
          const z = -rx * syw + pz * cyw;
          const s = 1 + DEPTH * z;
          const sx = cx + x * s * ax;
          const sy = cy + ry * s * ay;

          if (z < 0 && sx > x0 && sx < x1 && sy > y0 && sy < y1) continue;

          const near = (z + 1) / 2;
          const alpha = (0.28 + 0.67 * near) * state.intensity;
          const radius = (1.2 + 1.9 * near) * Math.max(k, 0.7);
          ctx.beginPath();
          ctx.arc(sx, sy, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${ACCENT}, ${alpha.toFixed(3)})`;
          ctx.fill();
        }
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      canvas.style.visibility = "visible";
      gsap.ticker.add(draw);
    };
    const stop = () => {
      if (!running) return;
      running = false;
      gsap.ticker.remove(draw);
      ctx.clearRect(0, 0, w, h);
      canvas.style.visibility = "hidden";
    };

    let awake = false;
    const setAwake = (want: boolean) => {
      if (want === awake) return;
      awake = want;
      if (awake) {
        start();
        gsap.to(state, {intensity: 1, duration: 0.8, ease: "power2.out", overwrite: true});
      } else {
        gsap.to(state, {intensity: 0, duration: 0.6, ease: "power2.in", overwrite: true, onComplete: stop});
      }
    };

    const auto = window.matchMedia("(hover: none)").matches;
    let onScreen = false;
    let autoReady = false;
    const updateAuto = () => {
      if (auto && autoReady) setAwake(onScreen && !document.hidden);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        updateAuto();
      },
      {threshold: 0.15}
    );
    io.observe(figure);
    const ready = gsap.delayedCall(AUTO_AFTER, () => {
      autoReady = true;
      updateAuto();
    });
    document.addEventListener("visibilitychange", updateAuto);

    const onSignal = (event: Event) => {
      const {x, y, active, source} = (event as CustomEvent<HeroSignal>).detail;
      rotY(x * TILT);
      rotX(-y * TILT);
      if (!auto) setAwake(active && source !== "gyro");
    };
    window.addEventListener("hero-pointer", onSignal);

    return () => {
      window.removeEventListener("hero-pointer", onSignal);
      window.removeEventListener("resize", size);
      document.removeEventListener("visibilitychange", updateAuto);
      io.disconnect();
      ready.kill();
      ro.disconnect();
      stop();
      gsap.killTweensOf(state);
      gsap.set(stage, {clearProps: "transform"});
    };
  }, [enabled]);

  return (
    <figure
      ref={figureRef}
      className="relative mx-auto w-full max-w-[17rem] sm:max-w-[20rem] lg:ml-auto lg:mr-0 lg:max-w-[26rem]"
    >
      <div ref={stageRef} className="relative [transform-style:preserve-3d]">
        <span
          aria-hidden="true"
          className="absolute -bottom-3 -right-3 left-3 top-3 z-0 border border-rule-strong [transform:translateZ(-28px)] md:-bottom-4 md:-right-4 md:left-4 md:top-4"
        />
        <div
          data-anim-portrait
          className="relative z-10 aspect-square overflow-hidden border-2 border-paper-faint bg-ink-raised"
        >
          <div data-parallax="7" style={{"--depth": 7} as CSSProperties} className="absolute inset-0">
            <Image
              src="/hero.webp"
              alt="Argya Sabih"
              fill
              sizes="(min-width: 1024px) 26rem, (min-width: 640px) 20rem, 72vw"
              className="object-cover object-[50%_34%]"
              priority
            />
          </div>
        </div>
        <span
          aria-hidden="true"
          className="absolute -left-1.5 -top-1.5 z-20 h-5 w-5 border-l-2 border-t-2 border-accent [transform:translateZ(24px)]"
        />
        <span
          aria-hidden="true"
          className="absolute -bottom-1.5 -right-1.5 z-20 h-5 w-5 border-b-2 border-r-2 border-accent [transform:translateZ(24px)]"
        />
        {enabled ? (
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="pointer-events-none invisible absolute left-0 top-0 z-30 h-full w-full [transform:translateZ(24px)]"
          />
        ) : null}
      </div>
    </figure>
  );
}
