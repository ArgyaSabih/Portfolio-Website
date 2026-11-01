"use client";

import {
  type ComponentType,
  type HTMLAttributes,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import type {BorderBeamProps} from "border-beam";

type Trigger = "visible" | "hover";
type BeamConfig = Omit<BorderBeamProps, "children" | "active">;

const PRIMARY: BeamConfig = {
  borderRadius: 0,
  size: "md",
  colorVariant: "gold",
  theme: "dark",
  staticColors: true,
  strength: 1,
  brightness: 1.9,
  saturation: 1.45,
  glowSize: 1.2,
  duration: 3.2,
  css: `
[data-beam="{id}"] { --beam-stroke-opacity: 3.6; --beam-bloom-opacity: 3.2; }
[data-beam="{id}"][data-active]::after, [data-beam="{id}"][data-fading]::after {
  padding: 2px;
  background: conic-gradient(from var(--beam-angle-{id}),
    transparent 0%, transparent 50%,
    rgba(235, 181, 89, 0.22) 56%,
    rgba(240, 190, 60, 0.9) 63%,
    rgb(255, 226, 150) 66.5%,
    rgba(240, 190, 60, 0.9) 70%,
    rgba(235, 181, 89, 0.22) 77%,
    transparent 83%, transparent 100%);
}
[data-beam="{id}"][data-active]::before, [data-beam="{id}"][data-fading]::before {
  opacity: calc(var(--beam-opacity-{id}, 1) * 0.35);
}`
};

export default function LazyBeam({
  children,
  trigger = "visible",
  beam,
  fill = false,
  className = "",
  ...hostProps
}: {
  children: ReactNode;
  trigger?: Trigger;
  beam?: BeamConfig;
  fill?: boolean;
} & HTMLAttributes<HTMLDivElement>) {
  const hostRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);
  const refocusRef = useRef(false);
  const [Beam, setBeam] = useState<ComponentType<BorderBeamProps> | null>(null);
  const [active, setActive] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const load = useCallback(() => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    import("border-beam")
      .then((mod) => {
        const host = hostRef.current;
        refocusRef.current = !!host && host.contains(document.activeElement);
        setBeam(() => mod.BorderBeam);
      })
      .catch(() => {
        loadingRef.current = false;
      });
  }, []);

  useEffect(() => {
    if (!Beam || !refocusRef.current) return;
    refocusRef.current = false;
    hostRef.current
      ?.querySelector<HTMLElement>("a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])")
      ?.focus({preventScroll: true});
  }, [Beam]);

  useEffect(() => {
    if (trigger !== "visible" || reduced) return;
    const host = hostRef.current;
    if (!host) return;

    const near = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          load();
          near.disconnect();
        }
      },
      {rootMargin: "400px 0px"}
    );
    const seen = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
      threshold: fill ? 0.25 : 0.6
    });
    near.observe(host);
    seen.observe(host);
    return () => {
      near.disconnect();
      seen.disconnect();
    };
  }, [trigger, reduced, load, fill]);

  const hoverHandlers =
    trigger === "hover" && !reduced
      ? {
          onPointerEnter: () => {
            load();
            setActive(true);
          },
          onPointerLeave: () => {
            if (!hostRef.current?.contains(document.activeElement)) setActive(false);
          },
          onFocus: () => {
            load();
            setActive(true);
          },
          onBlur: (event: React.FocusEvent<HTMLDivElement>) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setActive(false);
          }
        }
      : {};

  return (
    <div
      ref={hostRef}
      className={(fill ? "flex w-full " : "inline-flex ") + className}
      {...hostProps}
      {...hoverHandlers}
    >
      {Beam && !reduced ? (
        <Beam {...PRIMARY} {...beam} active={active} className={fill ? "flex w-full" : "inline-flex"}>
          {children}
        </Beam>
      ) : (
        children
      )}
    </div>
  );
}
