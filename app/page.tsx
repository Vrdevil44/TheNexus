"use client";

import HeroOverlay from "@/components/dom/HeroOverlay";
import ExperienceSection from "@/components/dom/ExperienceSection";
import SkillsMatrix from "@/components/dom/SkillsMatrix";
import ProjectsShowcase from "@/components/dom/ProjectsShowcase";
import CertificationsSection from "@/components/dom/CertificationsSection";
import ImpactSection from "@/components/dom/ImpactSection";
import ContactSection from "@/components/dom/ContactSection";
import Footer from "@/components/dom/Footer";
import UIController from "@/components/dom/UIController";
import GithubSection from "@/components/dom/GithubSection";
import VantaBackground from "@/components/canvas/VantaBackground";
import BackdropLayer from "@/components/canvas/BackdropLayer";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen overflow-x-hidden scroll-smooth">
      <VantaBackground />
      <BackdropLayer />

      <div id="hero" className="relative w-full h-screen" style={{ zIndex: 10 }}>
        <HeroOverlay />
      </div>
      <div id="experience" className="relative" style={{ zIndex: 10 }}>
        <ExperienceSection />
      </div>
      <div id="impact" className="relative" style={{ zIndex: 10 }}>
        <ImpactSection />
      </div>
      <div id="skills" className="relative" style={{ zIndex: 10 }}>
        <SkillsMatrix />
      </div>
      <div id="projects" className="relative" style={{ zIndex: 10 }}>
        <ProjectsShowcase />
      </div>
      <div id="github" className="relative" style={{ zIndex: 10 }}>
        <GithubSection />
      </div>
      <div id="certifications" className="relative" style={{ zIndex: 10 }}>
        <CertificationsSection />
      </div>
      <div id="contact" className="relative" style={{ zIndex: 10 }}>
        <ContactSection />
      </div>
      <Footer />
      <UIController />
    </main>
  );
}
