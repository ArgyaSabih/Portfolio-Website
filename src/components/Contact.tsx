import LazyBeam from "./LazyBeam";
import Polaroids from "./Polaroids";

const contactItems = [
  {
    icon: (
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        className="fill-paper-faint"
      >
        <path d="M12 1c-3.148 0-6 2.553-6 5.702 0 3.148 2.602 6.907 6 12.298 3.398-5.391 6-9.15 6-12.298 0-3.149-2.851-5.702-6-5.702zm0 8c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm12 14h-24l4-8h3.135c.385.641.798 1.309 1.232 2h-3.131l-2 4h17.527l-2-4h-3.131c.435-.691.848-1.359 1.232-2h3.136l4 8z" />
      </svg>
    ),
    title: "Address",
    detail: "Semarang, Central Java",
    href: null,
    primary: false
  },
  {
    icon: (
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        className="fill-paper-faint"
      >
        <path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.11-1.033z" />
      </svg>
    ),
    title: "Phone",
    detail: "081-252-101-846",
    href: "tel:+6281252101846",
    primary: false
  },
  {
    icon: (
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        className="fill-paper-faint"
      >
        <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
      </svg>
    ),
    title: "Email",
    detail: "argy.sabih@gmail.com",
    href: null,
    primary: true
  }
];

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-x-clip">
      <div className="relative mx-auto max-w-shell px-[var(--gutter)] py-28 md:py-40">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2
              id="contact-title"
              data-anim
              data-anim-up
              className="font-display text-title leading-[0.9] text-paper"
            >
              Contact
            </h2>
            <div data-anim data-anim-rule className="mt-7 h-px w-full max-w-xs bg-rule" />
            <LazyBeam trigger="hover" data-anim data-anim-up className="mt-9">
              <a
                href="mailto:argy.sabih@gmail.com"
                className="group inline-flex min-h-[44px] items-center gap-4 border border-rule-strong px-6 py-4 font-mono text-sm uppercase tracking-[0.14em] text-paper transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                Send an email
                <span className="sr-only">to argy.sabih@gmail.com</span>
                <svg
                  aria-hidden="true"
                  width="14"
                  height="14"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                  className="transition-transform duration-500 ease-expo group-hover:translate-x-1"
                >
                  <path d="M2 6h8M7 3l3 3-3 3" />
                </svg>
              </a>
            </LazyBeam>
            <Polaroids />
          </div>

          <dl className="divide-y divide-rule border-y border-rule lg:col-span-7">
            {contactItems.map((item) => (
              <div
                key={item.title}
                data-anim
                data-anim-row
                className="grid gap-2 py-7 sm:grid-cols-[9rem_1fr] sm:items-center sm:gap-6 md:py-8"
              >
                <dt className="flex items-center gap-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-paper-faint">
                  {item.icon}
                  {item.title}
                </dt>
                <dd className="font-display text-[1.5rem] leading-snug tracking-[-0.02em] text-paper md:text-[1.875rem]">
                  {item.href ? (
                    <a
                      href={item.href}
                      className="group inline-flex min-h-[44px] items-center gap-2 transition-colors duration-300 hover:text-accent"
                    >
                      <span className="border-b border-rule-strong pb-0.5 transition-colors duration-300 group-hover:border-accent">
                        {item.detail}
                      </span>
                      <svg
                        aria-hidden="true"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="square"
                        className="shrink-0 transition-transform duration-500 ease-expo group-hover:translate-x-0.5"
                      >
                        <path d="M2 6h8M7 3l3 3-3 3" />
                      </svg>
                    </a>
                  ) : (
                    <span className="inline-flex min-h-[44px] items-center">{item.detail}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
