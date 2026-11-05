import SocialIcons from "./SocialIcons";
import SplitText from "./SplitText";
import HeroPortrait from "./HeroPortrait";
import TextWheel from "./TextWheel";

const interests = ["Web Developer", "Data Analyst", "Computer Vision", "Artificial Intelligence"];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative mx-auto grid min-h-[calc(100dvh-var(--masthead))] max-w-shell grid-cols-1 content-center gap-y-12 px-[var(--gutter)] pb-14 pt-6 md:pb-20 lg:grid-cols-12 lg:items-center lg:gap-x-10"
    >
      <div
        aria-hidden="true"
        data-depth="-0.5"
        data-scroll-depth="10"
        className="grid-rule pointer-events-none absolute inset-y-0 left-[var(--gutter)] right-[var(--gutter)] -z-10 opacity-40 [--grid-step:5rem] md:[--grid-step:7rem]"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, black 22%, black 70%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 22%, black 70%, transparent)"
        }}
      />

      <span
        aria-hidden="true"
        data-anim
        data-anim-hero
        className="pointer-events-none absolute left-1 top-1/2 hidden -translate-y-1/2 select-none font-mono text-[0.625rem] uppercase tracking-[0.42em] text-paper-faint xl:block"
        style={{writingMode: "vertical-rl"}}
      >
        Argya Sabih — Portfolio
      </span>

      <div className="lg:col-span-7 lg:pr-6">
        <div className="flex items-end gap-x-5 lg:block">
          <h1 aria-label="My name is Argya Sabih" className="text-paper">
            <span
              aria-hidden="true"
              data-anim
              data-hero-lead
              className="block font-display text-[1.375rem] leading-none tracking-[0.01em] text-paper-dim md:text-[1.625rem]"
            >
              <SplitText text="My name is" />
              <span className="caret" />
            </span>

            <span
              aria-hidden="true"
              data-anim
              data-hero-name
              className="mt-4 block font-display text-hero md:mt-5"
            >
              <span data-line="1" className="block w-fit overflow-hidden pb-[0.16em] [margin-bottom:-0.16em]">
                <SplitText text="Argya" />
              </span>
              <span
                data-line="2"
                className="block w-fit overflow-hidden pb-[0.16em] text-accent [margin-bottom:-0.16em]"
              >
                <SplitText text="Sabih" />
              </span>
            </span>
          </h1>

          <div
            data-anim
            data-anim-hero
            className="min-w-0 flex-1 border-l-2 border-accent pb-[0.35rem] pl-4 font-display text-[1.375rem] tracking-[-0.01em] text-paper md:pb-2 md:pl-5 md:text-[1.75rem] lg:mt-7 lg:flex lg:flex-none lg:items-center lg:gap-4 lg:border-l-0 lg:p-0 lg:text-[1.875rem]"
          >
            <span aria-hidden="true" className="hidden h-px w-10 shrink-0 bg-accent lg:block" />
            <TextWheel words={interests} />
          </div>
        </div>

        <div data-anim data-anim-hero-rule className="mt-6 h-px w-full max-w-md bg-rule md:mt-7" />

        <p data-anim data-anim-hero className="mt-7 max-w-measure text-lede text-paper-dim md:mt-8">
          A student at DTETI FT UGM who dreamed to be working in programming industries.
          <br className="hidden sm:block" />{" "}
          <span className="text-paper">
            Passionate about Web Developer, Data Analyst, Computer Vision &amp; Artificial Intelligence.
          </span>
        </p>

        <div data-anim data-anim-hero className="mt-8 md:mt-10">
          <SocialIcons />
        </div>
      </div>

      <div className="lg:col-span-5">
        <div data-depth="1" data-scroll-depth="-14">
          <HeroPortrait />
        </div>
      </div>
    </section>
  );
}
