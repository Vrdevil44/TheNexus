"use client";

import { useState } from "react";
import Footer from "@/components/dom/Footer";
import UIController from "@/components/dom/UIController";
import ToolPalette from "@/components/ui/ToolPalette";
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import { useTheme } from "@/lib/contexts/ThemeContext";

export default function LabPage() {
    const [isUIControllerOpen, setIsUIControllerOpen] = useState(false);
    const { theme } = useTheme();

    return (
        <main className="relative w-full min-h-screen overflow-x-hidden scroll-smooth pt-24">
            {/* Content Container */}
            <div className="relative z-10 container mx-auto px-4 min-h-[calc(100vh-100px)] flex flex-col">

                {/* Header Section */}
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <AnimatedTitle
                        text="THE LAB"
                        className="text-6xl md:text-8xl font-black mb-6 tracking-tighter"
                    />
                    <p
                        className="text-xl md:text-2xl max-w-2xl mx-auto opacity-80"
                        style={{ fontFamily: theme.fonts.body, color: theme.colors.text.gray300 }}
                    >
                        Experimental Projects & Digital Playground
                    </p>
                </div>

                {/* Placeholder for Project View System */}
                <div className="flex-grow flex items-center justify-center">
                    <div
                        className="p-12 rounded-3xl border backdrop-blur-md text-center max-w-3xl w-full"
                        style={{
                            background: `hsla(${theme.effects.cardColor.h}, ${theme.effects.cardColor.s}%, ${theme.effects.cardColor.l}%, ${theme.effects.cardOpacity})`,
                            borderColor: `hsla(${theme.colors.primary.h}, ${theme.colors.primary.s}%, ${theme.colors.primary.l}%, 0.3)`,
                            borderRadius: theme.effects.borderRadius
                        }}
                    >
                        <h2
                            className="text-3xl font-bold mb-4"
                            style={{ fontFamily: theme.fonts.heading, color: theme.colors.text.white }}
                        >
                            Project View System
                        </h2>
                        <p
                            className="text-lg opacity-70"
                            style={{ fontFamily: theme.fonts.body, color: theme.colors.text.gray400 }}
                        >
                            This area is under construction. It will feature an immersive 3D view of experimental projects.
                        </p>
                    </div>
                </div>

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
