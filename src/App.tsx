import Nav from "./components/layout/Nav";
import Intro from "./components/sections/Intro";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Work from "./components/sections/Work";
import LoveMarquee from "./components/sections/LoveMarquee";
import Hackathons from "./components/sections/Hackathons";
import Contact from "./components/sections/Contact";
import SmoothScroll from "./components/layout/SmoothScroll";
import { ResumeProvider } from "./components/layout/ResumeModal";
import { SideBorders } from "./components/decor/Ornaments";
import Travel from "./components/sections/Travel";

export default function App() {
  return (
    <SmoothScroll>
      <ResumeProvider>
        <div className="grain">
          <Nav />
          <SideBorders />
          <main className="relative z-10">
            <Intro />
            <Hero />
            <About />
            <Work />
            <LoveMarquee />
            <Hackathons />
            <Travel />
            <Contact />
          </main>
        </div>
      </ResumeProvider>
    </SmoothScroll>
  );
}
