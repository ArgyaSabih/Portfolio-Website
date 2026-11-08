import SkillCarousel from "./SkillCarousel";

const educations = [
  {
    title: "SMA Negeri 1 Semarang",
    field: "Mathematics & Natural Sciences",
    detail: "",
    years: "2020 - 2023"
  },
  {
    title: "Universitas Gadjah Mada - S1 Information Technology",
    field: "Faculty of Engineering, DTETI. Expected graduation 2027.",
    detail:
      "Interested fields: Programming, Web Development, Computer Vision, Artificial Intelligence, Data Analytics. Relevant coursework: Computer Vision, Computer Security.",
    years: "2023 - Present"
  }
];

const skillGroups = [
  {label: "Expert", items: ["HTML", "CSS", "JavaScript"]},
  {label: "Advanced", items: ["Python", "React.js", "Next.js", "TailwindCSS", "MongoDB", "Git/GitHub"]},
  {
    label: "Web Development",
    items: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "MySQL",
      "PostgreSQL",
      "Firebase",
      "Prisma",
      "Strapi",
      "Sanity CMS",
      "Auth.js",
      "JWT",
      "Google OAuth",
      "GSAP",
      "Docker",
      "Figma"
    ]
  },
  {
    label: "AI, vision & data",
    items: [
      "OpenCV",
      "YOLO (YOLOv8-Pose, YOLO26n)",
      "ONNX",
      "OpenVINO",
      "scikit-learn",
      "pandas",
      "NumPy",
      "Isolation Forest",
      "FastAPI",
      "exploratory data analysis",
      "data cleaning"
    ]
  },
  {
    label: "Tools & soft skills",
    items: [
      "Microsoft Word, Excel, PowerPoint",
      "team leadership",
      "communication",
      "public speaking",
      "time management"
    ]
  }
];

const stack = [
  "HTML",
  "CSS",
  "JavaScript",
  "Python",
  "React.js",
  "Next.js",
  "TailwindCSS",
  "Node.js",
  "Express.js",
  "MongoDB",
  "PostgreSQL",
  "Git/GitHub",
  "OpenCV",
  "YOLO",
  "scikit-learn",
  "FastAPI",
  "Docker"
];

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
                  {edu.detail ? (
                    <p className="mt-2 max-w-measure text-[0.875rem] leading-[1.7] text-paper-faint">
                      {edu.detail}
                    </p>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-6 lg:pt-10">
            <p data-anim data-anim-up className="max-w-measure text-lede text-paper-dim">
              A summary of my skills from 3+ years of web development and hands-on computer vision and AI
              projects.
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

            <dl className="mt-12 divide-y divide-rule border-y border-rule md:mt-16">
              {skillGroups.map((group) => (
                <div key={group.label} className="grid gap-2 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
                  <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-paper-faint">
                    {group.label}
                  </dt>
                  <dd className="text-[0.9375rem] leading-[1.75] text-paper-dim">{group.items.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
