export default function LowerThird({label}: {label: string}) {
  return (
    <div
      data-lt
      className="pointer-events-none absolute bottom-2.5 left-2.5 z-10 flex items-center gap-2 border-l-2 border-accent bg-ink/85 py-1.5 pl-2 pr-3 md:bottom-6 md:left-6 md:gap-4 md:py-3 md:pl-4 md:pr-6"
    >
      <svg viewBox="0 0 64 80" className="h-5 w-4 shrink-0 overflow-visible md:h-10 md:w-8">
        <path
          data-lt-outline
          d="M32 3C15.4 3 4 15.4 4 31C4 50.8 22.1 69.6 29.3 76.2C30.8 77.6 33.2 77.6 34.7 76.2C41.9 69.6 60 50.8 60 31C60 15.4 48.6 3 32 3Z"
          pathLength={1}
          strokeDasharray={1}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="fill-accent stroke-accent"
        />
        <circle data-lt-dot cx="32" cy="30" r="9" className="fill-ink" />
      </svg>
      <span
        data-lt-text
        className="block whitespace-nowrap font-display text-sm leading-none text-paper md:text-2xl"
      >
        {label}
      </span>
    </div>
  );
}
