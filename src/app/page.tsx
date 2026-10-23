import { site } from "@/config/site";
import { Preloader } from "@/components/Preloader";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Expertise } from "@/components/sections/Expertise";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Process } from "@/components/sections/Process";
import { Toolkit } from "@/components/sections/Toolkit";
import { Principles } from "@/components/sections/Principles";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Marquee } from "@/components/ui/Marquee";
import { Divider } from "@/components/ui/SectionHeading";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.title,
    url: site.url,
    description: site.seo.description,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Preloader />
      <Navbar />
      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Divider />
        <Expertise />
        <Divider />
        <Experience />
        <Divider />
        <Projects />
        <Divider />
        <Process />
        <Divider />
        <Toolkit />
        <Divider />
        <Principles />
        <Testimonials />
        <Divider />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
