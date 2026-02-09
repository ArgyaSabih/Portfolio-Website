import Image from "next/image";

const portfolios = [
  {
    title: "Cerita Neira",
    image: "/portfolios/portfolio-1.png",
    link: "https://ceritaneira.com",
    tags: ["NextJS", "TailwindCSS", "GSAP"],
    description:
      "Website created for a team from UGM's Community Service Program (KKN-PPM) that positions the Banda Neira community as the subject of change. Based on the integration of digital technology innovation, strengthening village governance, and natural resource conservation, Cerita Neira aims to strengthen local capabilities amidst the tide of cultural globalization."
  },
  {
    title: "Creative Legal Website",
    image: "/portfolios/portfolio-2.png",
    link: "https://fe-legal-kreatif.vercel.app/",
    tags: ["NodeJS", "ExpressJS", "MongoDB"],
    description:
      "A Creative Legal Website is a website that can help managing business licenses. It has several business entity features such as creating a PT, creating a CV, establishing a foundation, etc. Provided with a tracker feature to check the progress of the document being created and article feature about business and legality."
  },
  {
    title: "Gelanggang Expo 2024",
    image: "/portfolios/portfolio-3.png",
    link: "https://ukm.ugm.ac.id/2024/gelex/",
    tags: ["NextJS", "TailwindCSS", "Firebase"],
    description:
      'Gelanggang Expo is an annual routine activity that aims to introduce Student Activity Units (UKM) and the community at Gadjah Mada University. The Gelanggang Expo 2024 website has several features such as an event timeline, about gelex, list of UKM and communities, and FAQ. This website also has a mini game "UKM Apakah Aku?" for new academic students who want to find a UKM that is suitable for them.'
  },
  {
    title: "Porsenigama 2024",
    image: "/portfolios/portfolio-4.png",
    link: "https://porsenigama24.vercel.app/",
    tags: ["NextJS", "TailwindCSS", "GSAP"],
    description:
      "Pekan Olahraga dan Seni Universitas Gadjah Mada is an abbreviation for Universitas Gadjah Mada Sports and Arts Week. It is an annual event at Gadjah Mada University (UGM) that provides a platform for students to compete in various sports and arts. Porsenigama aims to foster sportsmanship, creativity, and a sense of camaraderie among UGM students."
  },
  {
    title: "PIONIR Gadjah Mada 2025",
    image: "/portfolios/portfolio-5.png",
    link: "https://pionir.ugm.ac.id/2025/",
    tags: ["NextJS", "TailwindCSS", "GSAP"],
    description:
      "PIONIR Gadjah Mada is an orientation and campus introduction activity for new UGM students, also known as Gadjah Mada Muda (Gamada). This official website provides various information about the implementation of PIONIR Gadjah Mada which will be attended by new students of Gadjah Mada University. There are also interactive games that can help Gamada explore Gadjah Mada University."
  },
  {
    title: "Porsenigama 2025",
    image: "/portfolios/portfolio-6.png",
    link: "https://porsenigama25.vercel.app/2025/porsenigama/",
    tags: ["NextJS", "TailwindCSS", "GSAP"],
    description:
      "Pekan Olahraga dan Seni Universitas Gadjah Mada is an abbreviation for Universitas Gadjah Mada Sports and Arts Week. It is an annual event at Gadjah Mada University (UGM) that provides a platform for students to compete in various sports and arts. Porsenigama aims to foster sportsmanship, creativity, and a sense of camaraderie among UGM students."
  }
];

export default function Portfolios() {
  return (
    <section id="portfolios" className="py-16 md:py-24">
      <div className="w-[90%] max-w-[1200px] mx-auto">
        {/* Pre-title */}
        <div className="flex items-center gap-3" data-aos="fade-right">
          <span className="w-[30px] h-[1px] bg-line inline-block" />
          <h3 className="uppercase tracking-[0.5rem] text-secondary-text font-normal text-sm">My Works</h3>
        </div>

        {/* Section Title */}
        <h1
          className="text-[1.6rem] md:text-[2rem] mt-2 mb-10 md:mt-4 md:mb-16 font-bold text-primary-text"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          Featured Portfolios
        </h1>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {portfolios.map((portfolio, index) => (
            <div
              key={index}
              className="rounded-[0.7rem] overflow-hidden border border-border-custom"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="100"
            >
              {/* Cover Image */}
              <div className="h-[250px] relative">
                <Image
                  src={portfolio.image}
                  alt={portfolio.title}
                  fill
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>

              {/* Info */}
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-center gap-4">
                  <h3 className="font-medium text-lg text-primary-text">{portfolio.title}</h3>
                  <a href={portfolio.link} target="_blank" rel="noopener noreferrer" className="shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="fill-primary-text hover:fill-accent transition-colors duration-200"
                    >
                      <path d="M6 17c2.269-9.881 11-11.667 11-11.667v-3.333l7 6.637-7 6.696v-3.333s-6.17-.171-11 5zm12 .145v2.855h-16v-12h6.598c.768-.787 1.561-1.449 2.339-2h-10.937v16h20v-6.769l-2 1.914z" />
                    </svg>
                  </a>
                </div>

                {/* Tags */}
                <div className="flex gap-4 my-4 flex-wrap">
                  {portfolio.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm border border-border-custom px-2 py-1 text-secondary-text"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-secondary-text text-xs md:text-sm lg:text-base leading-relaxed lg:leading-[1.9rem]">
                  {portfolio.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
