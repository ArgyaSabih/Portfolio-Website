export default function SectionJoint({
  variant = "disc",
  spin = 28,
  drift = 40,
  className = ""
}: {
  variant?: "disc" | "orbit" | "quadrant";
  spin?: number;
  drift?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      data-joint
      data-joint-spin={spin}
      data-joint-drift={drift}
      className={
        "pointer-events-none relative isolate flex h-24 w-full items-center justify-center select-none md:h-32 " +
        className
      }
    >
      <div
        className="grid-rule absolute inset-x-0 top-1/2 h-14 -translate-y-1/2 opacity-45 [--grid-step:4.5rem] md:h-20 md:[--grid-step:6rem]"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 18%, black 82%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 18%, black 82%, transparent)"
        }}
      />
      <div className="absolute inset-x-[var(--gutter)] top-1/2 h-px -translate-y-1/2 bg-rule" />

      {variant === "disc" ? (
        <svg
          data-joint-drift
          viewBox="0 0 220 220"
          className="relative h-[min(46vw,11rem)] w-[min(46vw,11rem)] overflow-visible md:h-[13.5rem] md:w-[13.5rem]"
          fill="none"
        >
          <circle cx="110" cy="110" r="86" stroke="oklch(var(--c-accent))" strokeWidth="1" opacity="0.75" />
          <circle
            data-joint-spin
            cx="110"
            cy="110"
            r="58"
            stroke="oklch(var(--c-rule-strong))"
            strokeWidth="1"
            strokeDasharray="3 9"
            style={{transformOrigin: "110px 110px"}}
          />
          <circle cx="110" cy="110" r="3" fill="oklch(var(--c-accent))" />
        </svg>
      ) : null}

      {variant === "orbit" ? (
        <svg
          data-joint-drift
          viewBox="0 0 260 180"
          className="relative h-[min(34vw,8rem)] w-[min(72vw,17rem)] overflow-visible md:h-[10rem] md:w-[21rem]"
          fill="none"
        >
          <ellipse
            data-joint-spin
            cx="130"
            cy="90"
            rx="118"
            ry="52"
            stroke="oklch(var(--c-rule-strong))"
            strokeWidth="1"
            style={{transformOrigin: "130px 90px"}}
          />
          <circle cx="130" cy="90" r="30" stroke="oklch(var(--c-accent))" strokeWidth="1" opacity="0.8" />
          <line x1="12" y1="90" x2="60" y2="90" stroke="oklch(var(--c-rule-strong))" strokeWidth="1" />
          <line x1="200" y1="90" x2="248" y2="90" stroke="oklch(var(--c-rule-strong))" strokeWidth="1" />
        </svg>
      ) : null}

      {variant === "quadrant" ? (
        <svg
          data-joint-drift
          viewBox="0 0 200 200"
          className="relative h-[min(40vw,9.5rem)] w-[min(40vw,9.5rem)] overflow-visible md:h-[11.5rem] md:w-[11.5rem]"
          fill="none"
        >
          <rect
            data-joint-spin
            x="46"
            y="46"
            width="108"
            height="108"
            stroke="oklch(var(--c-rule-strong))"
            strokeWidth="1"
            style={{transformOrigin: "100px 100px"}}
          />
          <path
            d="M100 16 A84 84 0 0 1 184 100"
            stroke="oklch(var(--c-accent))"
            strokeWidth="1"
            opacity="0.85"
          />
          <path
            d="M100 184 A84 84 0 0 1 16 100"
            stroke="oklch(var(--c-accent))"
            strokeWidth="1"
            opacity="0.85"
          />
          <circle cx="100" cy="100" r="2.5" fill="oklch(var(--c-accent))" />
        </svg>
      ) : null}
    </div>
  );
}
