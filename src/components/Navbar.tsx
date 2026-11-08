"use client";

import {useCallback, useEffect, useRef, useState} from "react";
import LazyBeam from "./LazyBeam";

const links = [
  {href: "#portfolios", label: "Portfolio"},
  {href: "#experience", label: "Experience"},
  {href: "#skills", label: "Skills"},
  {href: "#contact", label: "Contact"}
];

const RESUME_URL = "/resume.pdf";

function Arrow({external = false, size = 11}: {external?: boolean; size?: number}) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
    >
      {external ? <path d="M2.5 9.5 9.5 2.5M4 2.5h5.5V8" /> : <path d="M2 6h8M7 3l3 3-3 3" />}
    </svg>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive("#" + entry.target.id);
        }
      },
      {rootMargin: "-45% 0px -50% 0px"}
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting), {
      threshold: 1
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    const selector = "a[href], button:not([disabled])";
    const focusables = panel ? Array.from(panel.querySelectorAll<HTMLElement>(selector)) : [];
    focusables[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="absolute top-0 h-px w-px" />

      <header className="sticky top-0 z-nav bg-ink">
        {isOpen ? null : (
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-rule/50">
            <div data-progress className="h-px w-full origin-left scale-x-0 bg-accent" />
          </div>
        )}

        <div className="relative z-nav mx-auto flex h-[var(--masthead)] max-w-shell items-center justify-between px-[var(--gutter)]">
          {/* Monogram */}
          <a
            href="#hero"
            className="group -ml-2 flex h-11 min-w-[44px] items-center gap-2 px-2 font-display text-[1.75rem] leading-none tracking-[-0.03em] text-paper"
          >
            <span aria-hidden="true">AS</span>
            <span
              aria-hidden="true"
              className="hidden h-px w-7 origin-left bg-accent transition-transform duration-500 ease-expo group-hover:scale-x-150 sm:block"
            />
            <span className="sr-only">Argya Sabih — back to top</span>
          </a>

          {/* Desktop navigation */}
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-9">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={active === link.href ? "true" : undefined}
                    className="group relative block py-2 font-mono text-[0.8125rem] uppercase tracking-[0.14em] text-paper-dim transition-colors duration-300 hover:text-paper"
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={
                        "absolute -bottom-0.5 left-0 h-px w-full origin-left bg-accent transition-transform duration-500 ease-expo group-hover:scale-x-100 " +
                        (active === link.href ? "scale-x-100" : "scale-x-0")
                      }
                    />
                  </a>
                </li>
              ))}
              <li>
                <LazyBeam trigger="visible">
                  <a
                    href={RESUME_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-rule-strong px-5 py-2.5 font-mono text-[0.8125rem] uppercase tracking-[0.14em] text-paper transition-colors duration-300 hover:text-accent active:translate-y-px"
                  >
                    Resume
                    <span className="sr-only">(PDF, opens in a new tab)</span>
                    <Arrow external />
                  </a>
                </LazyBeam>
              </li>
            </ul>
          </nav>

          {/* Mobile toggle */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="-mr-2 flex h-11 w-11 items-center justify-center md:hidden"
          >
            <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true" className="relative block h-3 w-6">
              <span
                className={
                  "absolute left-0 block h-px w-6 bg-paper transition-all duration-300 ease-expo " +
                  (isOpen ? "top-1.5 rotate-45" : "top-0")
                }
              />
              <span
                className={
                  "absolute left-0 block h-px w-6 bg-paper transition-all duration-300 ease-expo " +
                  (isOpen ? "top-1.5 -rotate-45" : "top-3")
                }
              />
            </span>
          </button>
        </div>

        <div
          aria-hidden="true"
          className={
            "mx-auto h-px max-w-shell origin-left bg-rule transition-transform duration-700 ease-expo " +
            (scrolled ? "scale-x-100" : "scale-x-0")
          }
        />

        {/* Mobile panel */}
        <div
          id="mobile-menu"
          ref={panelRef}
          hidden={!isOpen}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-overlay bg-ink md:hidden"
        >
          <nav aria-label="Site" className="flex h-[100dvh] flex-col justify-center px-[var(--gutter)]">
            <ul className="divide-y divide-rule border-y border-rule">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="flex items-baseline justify-between py-6 font-display text-4xl tracking-[-0.02em] text-paper"
                  >
                    {link.label}
                    <span className="text-paper-faint">
                      <Arrow size={16} />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="mt-10 inline-flex w-full items-center justify-between border border-rule-strong px-6 py-4 font-mono text-sm uppercase tracking-[0.14em] text-paper"
            >
              Resume
              <span className="sr-only">(PDF, opens in a new tab)</span>
              <Arrow external size={13} />
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}
