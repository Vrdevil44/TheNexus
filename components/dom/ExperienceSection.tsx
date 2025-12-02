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

    // State for "See Early Career"
    const [showEarlyCareer, setShowEarlyCareer] = useState(false);
    const visibleExperiences = showEarlyCareer ? experiences : experiences.slice(0, 4);

    return (
        <section
            ref={containerRef}
            id="experience"
            className="relative w-full min-h-screen py-20 px-2 md:px-10 flex flex-col items-center overflow-hidden"
        >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 tracking-tighter text-center">
                Trace Route
            </h2>

            <div className="relative w-full max-w-4xl flex flex-col items-center">
                {/* Backbone Cable (Central Line) */}
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-800 transform -translate-x-1/2">
                    <motion.div
                        style={{ height: lineHeight }}
                        className="w-full bg-gradient-to-b from-secondary to-primary origin-top"
                    />
                </div>

                {/* Experience Nodes */}
                <AnimatePresence>
                    {visibleExperiences.map((exp, index) => {
                        const isExpanded = expandedItems.includes(index);
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.5 }}
                                className={`relative w-full flex items-center mb-12 md:mb-16 ${index % 2 === 0 ? "flex-row-reverse" : "flex-row"
                                    }`}
                            >
                                {/* Spacer for alignment */}
                                <div className="w-1/2" />

                                {/* Termination Point (Node) */}
                                <div className="absolute left-1/2 w-3 h-3 md:w-4 md:h-4 bg-background border-2 border-primary rounded-full transform -translate-x-1/2 z-10 shadow-[0_0_10px_rgba(0,243,255,0.5)]" />

                                {/* Content Card */}
                                <motion.div
                                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className={`w-[42%] md:w-[calc(50%-2rem)] ${index % 2 === 0 ? "mr-4 md:mr-8" : "ml-4 md:ml-8"
                                        } p-3 md:p-6 glass shadow-xl hover:border-primary/50 transition-colors duration-300`}
                                >
                                    <div className="cursor-pointer" onClick={() => toggleExpand(index)}>
                                        <div className="flex justify-between items-start flex-col md:flex-row">
                                            <h3 className="text-sm md:text-xl font-bold text-primary mb-1 leading-tight">
                                                {exp.title}
                                            </h3>
                                            <div className="md:hidden text-theme-gray-400 absolute top-2 right-2">
                                                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                            </div>
                                        </div>
                                        <div className="flex flex-col text-xs md:text-sm text-theme-gray-400 mb-2 font-mono">
                                            <span className="font-semibold">{exp.company}</span>
                                            <span className="opacity-75">{exp.period}</span>
                                        </div>
                                        <p className="text-[10px] md:text-xs text-gray-500 mb-2 md:mb-4">{exp.location}</p>

                                        {/* Description */}
                                        <div className="mb-2 md:mb-4">
                                            <p className="text-theme-gray-300 text-xs md:text-sm mb-2 leading-relaxed line-clamp-3 md:line-clamp-none">
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
                                                            <p key={i} className="text-theme-gray-300 text-xs md:text-sm mb-2 leading-relaxed">
                                                                {item}
                                                            </p>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>

                                    {/* Key Achievements */}
                                    <div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleExpand(index);
                                            }}
                                            className="hidden md:flex items-center gap-2 text-sm font-bold text-secondary mb-2 hover:text-secondary/80 transition-colors w-full text-left"
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
                                                    <ul className="space-y-1 md:space-y-2 pb-2">
                                                        {exp.achievements.map((achievement, i) => (
                                                            <li key={i} className="flex items-start gap-2 text-theme-gray-300 text-[10px] md:text-sm">
                                                                <span className="text-primary mt-0.5 md:mt-1.5">▸</span>
                                                                <span className="leading-relaxed">{achievement}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>

                {/* "See Early Career" / "Collapse" Button */}
                {experiences.length > 4 && (
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        onClick={() => setShowEarlyCareer(!showEarlyCareer)}
                        className="mt-8 px-6 py-3 bg-gradient-to-r from-primary/20 to-secondary/20 border border-white/10 rounded-full text-white font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-md flex items-center gap-2 group z-20"
                    >
                        <span>{showEarlyCareer ? "Collapse" : "See Early Career"}</span>
                        {showEarlyCareer ? (
                            <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                        ) : (
                            <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                        )}
                    </motion.button>
                )}
            </div>
        </section>
    );
}
