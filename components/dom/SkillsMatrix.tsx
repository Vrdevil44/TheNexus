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
                <div className="flex items-center space-x-8">
                    <button
                        onClick={() => setMode("infrastructure")}
                        className={`flex items-center space-x-2 text-xl font-mono transition-colors duration-300 ${mode === "infrastructure" ? "text-secondary" : "text-gray-600"
                            }`}
                    >
                        <Server className="w-6 h-6" />
                        <span>INFRASTRUCTURE</span>
                    </button>

                    {/* Physical Switch UI */}
                    <div
                        className="relative w-20 h-10 bg-gray-800 rounded-full p-1 cursor-pointer shadow-inner"
                        onClick={() =>
                            setMode(mode === "infrastructure" ? "dev" : "infrastructure")
                        }
                    >
                        <motion.div
                            className={`w-8 h-8 rounded-full shadow-md ${mode === "infrastructure" ? "bg-secondary" : "bg-primary"
                                }`}
                            layout
                            transition={{ type: "spring", stiffness: 700, damping: 30 }}
                            style={{
                                x: mode === "infrastructure" ? 0 : 40,
                            }}
                        />
                    </div>

                    <button
                        onClick={() => setMode("dev")}
                        className={`flex items-center space-x-2 text-xl font-mono transition-colors duration-300 ${mode === "dev" ? "text-primary" : "text-gray-600"
                            }`}
                    >
                        <span>DEVELOPMENT</span>
                        <Code className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl">
                <AnimatePresence>
                    {filteredSkills.map((skill) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, rotateX: -90 }}
                            animate={{ opacity: 1, rotateX: 0 }}
                            exit={{ opacity: 0, rotateX: 90 }}
                            transition={{ duration: 0.4 }}
                            className={`flex flex-col items-center justify-center p-6 rounded-xl border bg-white/5 backdrop-blur-sm hover:scale-105 transition-transform duration-300 ${mode === "infrastructure"
                                ? "border-secondary/30 hover:border-secondary"
                                : "border-primary/30 hover:border-primary"
                                }`}
                        >
                            <skill.icon
                                className={`w-12 h-12 mb-4 ${mode === "infrastructure" ? "text-secondary" : "text-primary"
                                    }`}
                            />
                            <span className="text-white font-mono text-center">
                                {skill.name}
                            </span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </section>
    );
}
