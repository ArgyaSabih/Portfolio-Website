import SkillCarousel from "./SkillCarousel";

const educations = [
  {
    title: "SMA Negeri 1 Semarang - High School",
    field: "Matematika & IPA",
    years: "2020 - 2023"
  },
  {
    title: "Gadjah Mada University - College",
    field: "Engineering - Information Technology",
    years: "2023 - Present"
  }
];

const skillsLeft = [
  {name: "HTML", stars: 5},
  {name: "CSS", stars: 5},
  {name: "Javascript", stars: 5},
  {name: "TailwindCSS", stars: 5},
  {name: "Github", stars: 5}
];

const skillsRight = [
  {name: "ReactJS", stars: 5},
  {name: "NextJS", stars: 5},
  {name: "ExpressJS", stars: 5},
  {name: "PostgreSQL", stars: 4},
  {name: "MongoDB", stars: 4}
];

const projectStack = ["GSAP", "Sanity CMS", "Neon", "Firebase"];

const stack = Array.from(new Set([...skillsLeft, ...skillsRight].map((s) => s.name).concat(projectStack)));

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="relative border-y border-rule bg-ink-sunken"
    >
      <div
        aria-hidden="true"
        className="grid-rule pointer-events-none absolute inset-0 opacity-30 [--grid-step:5rem] md:[--grid-step:7rem]"
        style={{
          maskImage: "linear-gradient(to bottom, black, transparent 55%)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent 55%)"
        }}
      />

      <div className="relative mx-auto max-w-shell px-[var(--gutter)] py-28 md:py-40">
        <h2 id="skills-title" data-anim data-anim-up className="font-display text-title text-paper">
          Skills &amp; Education
        </h2>

        <div data-anim data-anim-rule className="mt-8 h-px w-full bg-rule" />

        <div className="mt-14 grid gap-x-16 gap-y-14 md:mt-20 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h3
              id="learning-path"
              className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-paper-faint"
            >
              Learning Path
            </h3>

            <ol aria-labelledby="learning-path" className="relative mt-8">
              <span
                aria-hidden="true"
                data-timeline-rule
                className="absolute bottom-0 left-0 top-1 w-px bg-rule-strong"
              />
              {educations.map((edu) => (
                <li key={edu.title} data-anim data-anim-up className="relative pb-12 pl-8 last:pb-0">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[4.5px] top-[0.7rem] block h-2.5 w-2.5 rotate-45 bg-accent"
                  />
                  <p className="tnum font-mono text-sm uppercase tracking-[0.16em] text-accent">
                    {edu.years}
                  </p>
                  <h4 className="mt-3 font-display text-2xl leading-snug tracking-[-0.02em] text-paper md:text-[1.75rem]">
                    {edu.title}
                  </h4>
                  <p className="mt-2 text-[0.9375rem] text-paper-dim">{edu.field}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-6 lg:pt-10">
            <p data-anim data-anim-up className="max-w-measure text-lede text-paper-dim">
              For about three years and a half, these are summary of my skills. Field of web developer.
            </p>
          </div>
        </div>

        <div data-anim data-anim-up className="mt-20 md:mt-24">
          <h3
            id="tech-stack"
            className="mb-8 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-paper-faint"
          >
            Tech Stack
          </h3>
          <div role="region" aria-labelledby="tech-stack">
            <SkillCarousel items={stack} />
          </div>
        </div>
      </div>
    </section>
  );
}
