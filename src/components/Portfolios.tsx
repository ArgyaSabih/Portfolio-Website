import ProjectIndex from "./ProjectIndex";
import {portfolios, slug} from "@/data/portfolios";
import ShotImage from "./ShotImage";
import LazyBeam from "./LazyBeam";
import LowerThird from "./LowerThird";

export default function Portfolios() {
  const index = portfolios.map((p) => ({id: slug(p.title), title: p.title}));

  return (
    <section
      id="portfolios"
      aria-labelledby="portfolios-title"
      className="mx-auto max-w-shell px-[var(--gutter)] py-24 md:py-32"
    >
      <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-5">
          <h2 id="portfolios-title" data-anim data-anim-up className="font-display text-title text-paper">
            Featured Portfolios
          </h2>
          <div data-anim data-anim-rule className="mt-6 h-px w-full bg-rule" />
        </div>

        <div data-anim data-anim-up className="lg:col-span-7">
          <p
            id="works-label"
            className="mb-2 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-paper-faint"
          >
            My Works
          </p>
          <ProjectIndex items={index} labelledBy="works-label" />
        </div>
      </div>

      <div className="mt-16 md:mt-24">
        {portfolios.map((portfolio, i) => {
          const id = slug(portfolio.title);
          const corner = i % 2 === 0 ? "tr" : "bl";

          return (
            <article
              key={id}
              id={id}
              data-scene="pip"
              data-corner={corner}
              className="scroll-mt-[calc(var(--masthead)+1.5rem)] border-t border-rule py-12 first:border-t-0 first:pt-0 md:py-16"
            >
              <div data-scene-stage className="scene-stage">
                <div data-scene-info className="scene-info">
                  <div>
                    <h3
                      data-scene-item
                      className="font-display text-[1.875rem] leading-[1.02] tracking-[-0.025em] text-paper md:text-[2.5rem]"
                    >
                      {portfolio.title}
                    </h3>
                    <ul data-scene-item className="mt-5 flex flex-wrap gap-2">
                      {portfolio.tags.map((tag) => (
                        <li
                          key={tag}
                          className="border border-rule px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-paper-dim"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <p
                      data-scene-item
                      className="mt-5 max-w-measure text-[0.9375rem] leading-[1.7] text-paper-dim"
                    >
                      {portfolio.description}
                    </p>
                    <div data-scene-item>
                      <a
                        href={portfolio.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={"Visit site: " + portfolio.title + " (opens in a new tab)"}
                        className="group mt-4 inline-flex min-h-[44px] items-center gap-2 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-paper transition-colors duration-300 hover:text-accent"
                      >
                        <span className="border-b border-rule-strong pb-1 transition-colors duration-300 group-hover:border-accent">
                          Visit site
                        </span>
                        <svg
                          aria-hidden="true"
                          width="11"
                          height="11"
                          viewBox="0 0 12 12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="square"
                          className="transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        >
                          <path d="M2.5 9.5 9.5 2.5M4 2.5h5.5V8" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                <a
                  href={portfolio.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={-1}
                  aria-hidden="true"
                  data-scene-shot
                  className="scene-shot group"
                >
                  <div className="absolute inset-0 overflow-hidden bg-ink-raised">
                    <ShotImage src={portfolio.image} sizes="(min-width: 1024px) 78rem, 100vw" parallax={6} />
                  </div>
                  <span className="absolute inset-0 border border-rule transition-colors duration-500 group-hover:border-rule-strong" />
                  {portfolio.location ? <LowerThird label={portfolio.location} /> : null}
                </a>
                <div data-scene-frame aria-hidden="true" className="scene-frame">
                  <LazyBeam trigger="visible" fill className="h-full">
                    <div className="h-full w-full" />
                  </LazyBeam>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
