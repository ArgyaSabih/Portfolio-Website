import Image from "next/image";
import SplitText from "./SplitText";
import {portfolios} from "@/data/portfolios";

export default function Splash() {
  return (
    <div data-splash aria-hidden="true" className="pointer-events-none fixed inset-0 z-[70]">
      <div data-splash-half="top" className="absolute inset-x-0 top-0 h-1/2 bg-ink" />
      <div data-splash-half="bottom" className="absolute inset-x-0 bottom-0 h-1/2 bg-ink" />

      <div className="absolute inset-0 px-[var(--gutter)]">
        <div className="mx-auto flex h-full max-w-shell">
          {Array.from({length: 7}, (_, i) => (
            <span
              key={i}
              data-splash-col
              className="block h-full flex-1 border-l border-rule/60 last:border-r"
            />
          ))}
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <ul className="relative h-[calc(var(--sc-w)*1.25)] w-[var(--sc-w)] [--sc-w:clamp(8.5rem,18vw,15rem)]">
          {portfolios.map((p) => (
            <li
              key={p.image}
              data-splash-card
              className="absolute inset-0 border border-rule-strong bg-ink-raised p-1.5 opacity-0 shadow-[0_18px_40px_rgb(0_0_0/0.45)]"
            >
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src={p.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 15rem, 9rem"
                  fetchPriority="low"
                  className="object-cover object-top"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div data-splash-content className="absolute inset-0 flex items-center justify-center">
        <div className="w-[min(80vw,24rem)] text-center">
          <span className="block overflow-hidden pb-[0.12em] font-display text-[clamp(7rem,24vw,15rem)] leading-[0.85] tracking-[-0.04em] text-paper">
            <SplitText text="AS" />
          </span>
          <span data-splash-rule className="mx-auto mt-6 block h-px w-[min(70vw,22rem)] bg-accent" />
          <span
            data-splash-caption
            className="mt-5 block font-mono text-[0.6875rem] uppercase tracking-[0.42em] text-paper-faint"
          >
            Argya Sabih — Portfolio
          </span>
        </div>
      </div>

      <span
        data-splash-scan
        className="absolute inset-x-0 top-0 block h-px bg-accent shadow-[0_0_16px_2px_oklch(var(--c-accent)/0.6)]"
      />
      <span data-splash-split className="absolute inset-x-0 top-1/2 block h-px bg-accent" />

      <span
        data-splash-mark
        className="absolute left-5 top-5 block h-7 w-7 border-l-2 border-t-2 border-accent md:left-8 md:top-8"
      />
      <span
        data-splash-mark
        className="absolute right-5 top-5 block h-7 w-7 border-r-2 border-t-2 border-accent md:right-8 md:top-8"
      />
      <span
        data-splash-mark
        className="absolute bottom-5 left-5 block h-7 w-7 border-b-2 border-l-2 border-accent md:bottom-8 md:left-8"
      />
      <span
        data-splash-mark
        className="absolute bottom-5 right-5 block h-7 w-7 border-b-2 border-r-2 border-accent md:bottom-8 md:right-8"
      />
    </div>
  );
}
