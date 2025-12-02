"use client";

import { useState } from "react";
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

import ToolPalette from "@/components/ui/ToolPalette";

export default function Home() {
  const [isUIControllerOpen, setIsUIControllerOpen] = useState(false);

  return (
    <main className="relative w-full min-h-screen overflow-x-hidden scroll-smooth">


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

      {/* Tool Palette - Top Right */}
      <ToolPalette onOpenSettings={() => setIsUIControllerOpen(true)} />

      {/* UI Controller - Controlled by Tool Palette */}
      <UIController
        isOpen={isUIControllerOpen}
        onClose={() => setIsUIControllerOpen(false)}
      />
    </main>
  );
}
