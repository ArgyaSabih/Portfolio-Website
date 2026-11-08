import Hero from "@/components/Hero";
import Portfolios from "@/components/Portfolios";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import SectionJoint from "@/components/SectionJoint";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <SectionJoint variant="disc" spin={34} drift={44} />
      <Portfolios />
      <SectionJoint variant="orbit" spin={18} drift={36} />
      <Experience />
      <Skills />
      <SectionJoint variant="quadrant" spin={42} drift={30} />
      <Contact />
    </main>
  );
}
