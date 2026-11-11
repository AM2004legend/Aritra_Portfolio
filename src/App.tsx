import { useEffect } from "react";
import Nav from "./components/layout/Nav";
import SmoothScroll, { scrollToId } from "./components/layout/SmoothScroll";
import { ResumeProvider } from "./components/layout/ResumeModal";
import { SideBorders } from "./components/decor/Ornaments";
import Intro from "./components/sections/Intro";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Work from "./components/sections/Work";
import LoveMarquee from "./components/sections/LoveMarquee";
import Hackathons from "./components/sections/Hackathons";
import Travel from "./components/sections/Travel";
import Contact from "./components/sections/Contact";
import CertificatesPage from "./pages/CertificatesPage";
import { isCertificatesPath, usePath } from "./lib/router";

function HomePage() {
  // arriving from another page with /#section: land on that section
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const t = window.setTimeout(() => scrollToId(id), 120);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <>
      <Intro />
      <Hero />
      <About />
      <Work />
      <LoveMarquee />
      <Hackathons />
      <Travel />
      <Contact />
    </>
  );
}

export default function App() {
  const path = usePath();
  const onCerts = isCertificatesPath(path);

  // each page starts at the top (unless jumping to a #section)
  useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0);
    document.title = onCerts ? "Certificates · Aritra Maity" : "Aritra Maity";
  }, [onCerts]);

  return (
    <SmoothScroll>
      <ResumeProvider>
        <div className="grain">
          <Nav />
          <SideBorders />
          <main key={onCerts ? "certs" : "home"} className="relative z-10">
            {onCerts ? <CertificatesPage /> : <HomePage />}
          </main>
        </div>
      </ResumeProvider>
    </SmoothScroll>
  );
}
