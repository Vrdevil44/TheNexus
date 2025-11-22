"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useHackerMode } from "@/lib/context/HackerModeContext";
import { useTheme } from "@/lib/contexts/ThemeContext";
import AnimatedTitle from "@/components/ui/AnimatedTitle";

function AnimatedCounter({ end, duration = 2, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number | null = null;
        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }, [end, duration]);

    return (
        <span className="font-bold text-3xl md:text-4xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {count}{suffix}
        </span>
    );
}

export default function HeroOverlay() {
    const { theme } = useTheme();
    const stats = [
        { value: 5, suffix: "+", label: "Years Experience" },
        { value: 500, suffix: "+", label: "Systems Managed" },
        { value: 15, suffix: "+", label: "Certifications" },
    ];

    const { toggleHackerMode } = useHackerMode();
    const [keySequence, setKeySequence] = useState<string[]>([]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            setKeySequence((prev) => {
                const newSequence = [...prev, e.key];
                if (newSequence.length > 20) newSequence.shift(); // Keep buffer manageable
                return newSequence;
            });
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Check sequences in a separate effect to avoid state update during render
    useEffect(() => {
        const konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
        const keyword = ["v", "i", "b", "h", "u"];

        if (keySequence.length === 0) return;

        // Check Konami Code
        const konamiMatch = keySequence.slice(-konamiCode.length).every((key, i) => key === konamiCode[i]);
        if (konamiMatch) {
            toggleHackerMode();
            setKeySequence([]);
            return;
        }

        // Check Keyword "vibhu"
        const keywordMatch = keySequence.slice(-keyword.length).every((key, i) => key.toLowerCase() === keyword[i]);
        if (keywordMatch) {
            toggleHackerMode();
            setKeySequence([]);
            return;
        }
    }, [keySequence, toggleHackerMode]);

    return (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center max-w-4xl"
            >
                {/* Name */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mb-4"
                >
                    <AnimatedTitle
                        text="Vibhu Dikshit"
                        className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight justify-center"
                    />
                </motion.div>

                {/* Tagline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mb-6"
                >
                    <h2
                        className="text-2xl md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent mb-2"
                        style={{
                            backgroundImage: `linear-gradient(to right, hsl(${theme.colors.primary.h}, ${theme.colors.primary.s}%, ${theme.colors.primary.l}%), hsl(${theme.colors.secondary.h}, ${theme.colors.secondary.s}%, ${theme.colors.secondary.l}%), hsl(${theme.colors.primary.h}, ${theme.colors.primary.s}%, ${theme.colors.primary.l}%))`
                        }}
                    >
                        Architecting Digital Infrastructure
                    </h2>
                    <h3 className="text-xl md:text-2xl text-gray-300 font-light">
                        Building Scalable Solutions
                    </h3>
                </motion.div>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
                >
                    Bridging the gap between enterprise systems and innovative applications.
                    Specialized in cloud infrastructure, full-stack development, and system optimization.
                </motion.p>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 mb-12"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 1.2 + index * 0.2 }}
                            className="p-4 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm"
                        >
                            <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                            <p className="text-gray-400 text-sm mt-2">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <a
                        href="#contact"
                        className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105"
                    >
                        Let's Connect
                    </a>
                    <a
                        href="#projects"
                        className="px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                    >
                        View Projects
                    </a>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 2 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex flex-col items-center gap-2 cursor-pointer"
                    onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}
                >
                    <span className="text-gray-400 text-sm">Scroll to explore</span>
                    <ChevronDown className="w-6 h-6 text-primary" />
                </motion.div>
            </motion.div>
        </div>
    );
}
