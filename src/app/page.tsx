import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Portfolios from "@/components/Portfolios";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <header className="min-h-screen">
        <div className="w-[90%] xl:max-w-[1200px] mx-auto">
          <Hero />
        </div>
      </header>
      <Portfolios />
      <Skills />
      <Contact />
    </>
  );
}
