"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { experiences } from "@/lib/data/experience";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ExperienceSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    // State to track expanded items
    const [expandedItems, setExpandedItems] = useState<number[]>([]);

    const toggleExpand = (index: number) => {
        setExpandedItems((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    return (
        <section
            ref={containerRef}
            id="experience"
            className="relative w-full min-h-screen py-20 px-4 md:px-10 flex flex-col items-center"
        >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 tracking-tighter">
                Trace Route
            </h2>

            <div className="relative w-full max-w-4xl flex flex-col items-center">
                {/* Backbone Cable (Central Line) */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gray-800 transform md:-translate-x-1/2">
                    <motion.div
                        style={{ height: lineHeight }}
                        className="w-full bg-gradient-to-b from-secondary to-primary origin-top"
                    />
                </div>

                {/* Experience Nodes */}
                {experiences.map((exp, index) => {
                    const isExpanded = expandedItems.includes(index);
                    return (
                        <div
                            key={index}
                            className={`relative w-full flex flex-col md:flex-row items-start md:items-center mb-16 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                }`}
                        >
                            {/* Spacer for alignment */}
                            <div className="hidden md:block w-1/2" />

                            {/* Termination Point (Node) */}
                            <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-background border-2 border-primary rounded-full transform -translate-x-1/2 z-10 shadow-[0_0_10px_rgba(0,243,255,0.5)]" />

                            {/* Content Card */}
                            <motion.div
                                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className={`w-full md:w-[calc(50%-2rem)] ml-12 md:ml-0 ${index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                                    } p-6 glass shadow-xl hover:border-primary/50 transition-colors duration-300`}
                            >
                                <div className="cursor-pointer" onClick={() => toggleExpand(index)}>
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-xl font-bold text-primary mb-1">
                                            {exp.title}
                                        </h3>
                                        <div className="md:hidden text-theme-gray-400">
                                            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-theme-gray-400 mb-2 font-mono">
                                        <span className="font-semibold">{exp.company}</span>
                                        <span>{exp.period}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mb-4">{exp.location}</p>

                                    {/* Description (Always visible first line, expand for more) */}
                                    <div className="mb-4">
                                        <p className="text-theme-gray-300 text-sm mb-2 leading-relaxed">
                                            {exp.description[0]}
                                        </p>
                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="overflow-hidden"
                                                >
                                                    {exp.description.slice(1).map((item, i) => (
                                                        <p key={i} className="text-theme-gray-300 text-sm mb-2 leading-relaxed">
                                                            {item}
                                                        </p>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Key Achievements (Collapsible) */}
                                <div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleExpand(index);
                                        }}
                                        className="flex items-center gap-2 text-sm font-bold text-secondary mb-2 hover:text-secondary/80 transition-colors w-full text-left"
                                    >
                                        Key Achievements
                                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </button>
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <ul className="space-y-2 pb-2">
                                                    {exp.achievements.map((achievement, i) => (
                                                        <li key={i} className="flex items-start gap-2 text-theme-gray-300 text-sm">
                                                            <span className="text-primary mt-1.5">▸</span>
                                                            <span className="leading-relaxed">{achievement}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
