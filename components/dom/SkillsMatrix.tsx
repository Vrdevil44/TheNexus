"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills } from "@/lib/data/skills";
import { Server, Code } from "lucide-react";

export default function SkillsMatrix() {
    const [mode, setMode] = useState<"infrastructure" | "dev">("infrastructure");

    const filteredSkills = skills.filter((skill) => skill.category === mode);

    return (
        <section className="relative w-full py-20 px-4 md:px-10 flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 tracking-tighter">
                Skills Matrix
            </h2>

            {/* Toggle Switch (Server Rack Breaker Style) */}
            <div className="relative mb-16">
                <div className="flex items-center space-x-4 md:space-x-8">
                    <button
                        onClick={() => setMode("infrastructure")}
                        className={`flex items-center space-x-2 text-xs md:text-xl font-mono transition-colors duration-300 ${mode === "infrastructure" ? "text-secondary" : "text-gray-600"
                            }`}
                    >
                        <Server className="w-4 h-4 md:w-6 md:h-6" />
                        <span>INFRASTRUCTURE</span>
                    </button>

                    {/* Physical Switch UI */}
                    <div
                        className="relative w-16 h-8 md:w-20 md:h-10 bg-gray-800 rounded-full p-1 cursor-pointer shadow-inner"
                        onClick={() =>
                            setMode(mode === "infrastructure" ? "dev" : "infrastructure")
                        }
                    >
                        <motion.div
                            className={`w-6 h-6 md:w-8 md:h-8 rounded-full shadow-md ${mode === "infrastructure" ? "bg-secondary" : "bg-primary"
                                }`}
                            layout
                            transition={{ type: "spring", stiffness: 700, damping: 30 }}
                            style={{
                                x: mode === "infrastructure" ? 0 : "100%", // Use percentage for responsive movement
                            }}
                        />
                    </div>

                    <button
                        onClick={() => setMode("dev")}
                        className={`flex items-center space-x-2 text-xs md:text-xl font-mono transition-colors duration-300 ${mode === "dev" ? "text-primary" : "text-gray-600"
                            }`}
                    >
                        <span>DEVELOPMENT</span>
                        <Code className="w-4 h-4 md:w-6 md:h-6" />
                    </button>
                </div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-4 md:grid-cols-4 gap-3 md:gap-6 w-full max-w-6xl">
                <AnimatePresence>
                    {filteredSkills.map((skill) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, rotateX: -90 }}
                            animate={{ opacity: 1, rotateX: 0 }}
                            exit={{ opacity: 0, rotateX: 90 }}
                            transition={{ duration: 0.4 }}
                            className={`flex flex-col items-center justify-center p-3 md:p-6 glass hover:scale-105 transition-transform duration-300 ${mode === "infrastructure"
                                ? "border-secondary/30 hover:border-secondary"
                                : "border-primary/30 hover:border-primary"
                                }`}
                        >
                            <skill.icon
                                className={`w-8 h-8 md:w-12 md:h-12 mb-2 md:mb-4 ${mode === "infrastructure" ? "text-secondary" : "text-primary"
                                    }`}
                            />
                            <span className="text-white font-mono text-center text-[10px] md:text-base leading-tight">
                                {skill.name}
                            </span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </section>
    );
}
