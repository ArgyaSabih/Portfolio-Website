const contactItems = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        className="fill-accent"
      >
        <path d="M12 1c-3.148 0-6 2.553-6 5.702 0 3.148 2.602 6.907 6 12.298 3.398-5.391 6-9.15 6-12.298 0-3.149-2.851-5.702-6-5.702zm0 8c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm12 14h-24l4-8h3.135c.385.641.798 1.309 1.232 2h-3.131l-2 4h17.527l-2-4h-3.131c.435-.691.848-1.359 1.232-2h3.136l4 8z" />
      </svg>
    ),
    title: "Address",
    detail: "Semarang, Central Java"
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        className="fill-accent"
      >
        <path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.11-1.033z" />
      </svg>
    ),
    title: "Phone",
    detail: "081-252-101-846"
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        className="fill-accent"
      >
        <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
      </svg>
    ),
    title: "Email",
    detail: "argy.sabih@gmail.com"
  }
];

export default function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="w-[90%] max-w-[1200px] mx-auto">
        {/* Pre-title */}
        <div className="flex items-center gap-3 mb-16" data-aos="fade-right" data-aos-duration="1000">
          <span className="w-[30px] h-[1px] bg-line inline-block" />
          <h3 className="uppercase tracking-[0.5rem] text-secondary-text font-normal text-sm">Contact</h3>
        </div>

        {/* Contact Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
          {contactItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-row gap-6 items-center justify-center mb-10 h-full"
              data-aos="flip-up"
              data-aos-delay="300"
            >
              <div className="bg-third-bg px-4 py-3 min-w-[83px] h-[83px] rounded-[9px] flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div className="text-left min-w-[150px]">
                <h4 className="text-primary-text font-medium">{item.title}</h4>
                <p className="text-secondary-text text-sm">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
