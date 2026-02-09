import Image from "next/image";
import SocialIcons from "./SocialIcons";

export default function Hero() {
  return (
    <section id="hero" className="min-h-[85vh] grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] items-center">
      {/* Hero Left - Text */}
      <div className="text-center lg:text-left order-2 lg:order-1">
        <h3 className="reveal-right reveal-pretitle flex items-center gap-3 justify-center lg:justify-start uppercase tracking-[0.5rem] text-secondary-text font-normal text-xs md:text-sm">
          <span className="w-[30px] h-[1px] bg-line inline-block" />
          My name is
        </h3>
        <h1 className="reveal-right reveal-name text-[1.9rem] md:text-[2.3rem] lg:text-[3rem] font-bold mt-2 mb-2 lg:mb-4 text-primary-text">
          Argya <span className="text-accent">Sabih</span>
        </h1>
        <p className="reveal-right reveal-desc text-secondary-text text-xs md:text-sm lg:text-base leading-relaxed lg:leading-[1.9rem]">
          A student at DTETI FT UGM who dreamed to be working in programming industries.
          <br />
          Passionate about Web Developer & Data Analyst.
        </p>
        <div className="reveal-right reveal-icons mt-4">
          <SocialIcons variant="hero" />
        </div>
      </div>

      {/* Hero Right - Image */}
      <div className="reveal-image hero-image-container order-1 lg:order-2 justify-self-center lg:justify-self-auto lg:ml-4 mt-20 lg:mt-0 mb-12 lg:mb-8 w-[240px] h-[240px] sm:w-[270px] sm:h-[270px] lg:w-[360px] lg:h-[360px] rounded-full border-[10px] border-white bg-primary flex justify-center items-center">
        <Image
          src="/hero1.jpg"
          alt="Argya Sabih"
          width={360}
          height={360}
          className="hero-image-fade rounded-full max-w-[190px] sm:max-w-[220px] lg:max-w-[360px]"
          priority
        />
      </div>
    </section>
  );
}
