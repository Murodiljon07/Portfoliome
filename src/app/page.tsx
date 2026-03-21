import Navbar from "@/components/layout/NavBar";

import Hero from "@/components/public/HeroSection";
import Projects from "@/components/public/ProjectsSection";
import Skills from "@/components/public/SkillsSection";
import Contact from "@/components/public/ContactSection";
import Footer from "@/components/layout/Footer";
import ExperienceSection from "@/components/public/Experience";
import FloatingWeather from "@/components/ui/FloatingWeather";

function page() {
  return (
    <>
      <header>
        <Navbar />
        <FloatingWeather />
      </header>
      <main>
        <Hero />
        <Projects />
        <Skills />
        <ExperienceSection />
        <Contact />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default page;
