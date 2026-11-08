const roles = [
  {
    dates: "01/2026 – 02/2026",
    title: "Intern, Telkom Indonesia",
    org: "Digital Connectivity Service | PT Telkom Indonesia",
    context: "Datacomm & NextGen Product, Jakarta",
    note: "Built the NCIX Reporting Dashboard in 1 week with Next.js 15, React Leaflet and TailwindCSS: an interactive map with 3 layers (heatmap, bubbles, ASN trace) over 1,622 membership records from 26 data-center locations."
  },
  {
    dates: "07/2025 – 11/2025",
    title: "Sub-Coordinator, Web Development",
    org: "Porsenigama 2025 | Forkom UGM",
    context: "UGM's annual sports and arts week",
    note: "Led an 8-member web team through a 2.5-month build; the site reached 124,947 views."
  },
  {
    dates: "02/2025 – 08/2025",
    title: "Front-End Web Developer",
    org: "PIONIR Gadjah Mada 2025 | Direktorat Kemahasiswaan UGM",
    context: "Official orientation program for new UGM students",
    note: "Built front-end features in a 7-member team over 3 months; the pionir.ugm.ac.id site reached 689,692 views, serving 10,000+ new students."
  },
  {
    dates: "11/2024 – 06/2025",
    title: "Sub-Coordinator, Back-End Web Development",
    org: "Technocorner 2025 | DTETI UGM",
    context: "Annual technology event of the Department of Electrical and Information Engineering",
    note: "Led a 3-person back-end team and built the competition registration API (Node.js, Express, MongoDB): Google OAuth login, JWT authentication, team registration and verification, payment-proof upload to Google Drive, and Google Sheets sync for the committee."
  },
  {
    dates: "09/2024 – 11/2024",
    title: "Front-End Web Developer",
    org: "Porsenigama 2024 | Forkom UGM",
    context: "",
    note: "Built the event site with Next.js, TailwindCSS and GSAP animations; it reached 195,474 views."
  },
  {
    dates: "06/2024 – 08/2024",
    title: "Front-End Web Developer",
    org: "Gelanggang Expo 2024 | Forkom UGM",
    context: "UGM's annual student activity expo",
    note: "Built the expo site (Next.js, TailwindCSS, Firebase) presenting 55 student units under 4 Sekber, with an event timeline, FAQ and a mini game that matches new students to units."
  },
  {
    dates: "11/2023 – 06/2024",
    title: "Back-End Web Developer",
    org: "Technocorner 2024 | DTETI UGM",
    context: "Departemen Teknik Elektro dan Teknologi Informasi",
    note: "Developed back-end features for the Technocorner 2024 event website as IT staff."
  },
  {
    dates: "01/2024 – 01/2025",
    title: "Staff, Public Relations",
    org: "KMTETI",
    context: "Humas KMTETI, DTETI UGM",
    note: "Contributed to 4 core work programs of the department student association, whose Instagram account has 5,606 followers."
  }
];

export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="mx-auto max-w-shell px-[var(--gutter)] py-24 md:py-32"
    >
      <h2 id="experience-title" data-anim data-anim-up className="font-display text-title text-paper">
        Experience
      </h2>

      <div data-anim data-anim-rule className="mt-8 h-px w-full bg-rule" />

      <ol aria-labelledby="experience-title" className="divide-y divide-rule border-b border-rule">
        {roles.map((role) => (
          <li
            key={role.title + role.org}
            data-anim
            data-anim-row
            className="grid gap-x-10 gap-y-3 py-7 md:py-9 lg:grid-cols-12"
          >
            <p className="tnum font-mono text-sm uppercase tracking-[0.16em] text-accent lg:col-span-3 lg:pt-[0.55rem]">
              {role.dates}
            </p>

            <div className="lg:col-span-4">
              <h3 className="font-display text-[1.5rem] leading-snug tracking-[-0.02em] text-paper md:text-[1.75rem]">
                {role.title}
              </h3>
              <p className="mt-2 text-[0.9375rem] text-paper-dim">{role.org}</p>
              {role.context ? <p className="mt-1 text-[0.875rem] text-paper-faint">{role.context}</p> : null}
            </div>

            <p className="max-w-measure text-[0.9375rem] leading-[1.75] text-paper-dim lg:col-span-5 lg:pt-[0.35rem]">
              {role.note}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
