"use client";

import { motion } from "framer-motion";
import { projects, Project } from "@/lib/data/projects";
import { ExternalLink, Zap, Target, TrendingUp } from "lucide-react";

function ProjectCard({ project, index }: { project: Project; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="relative h-full rounded-xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden group hover:border-primary/50 transition-all duration-300"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/50 z-0" />

            <div className="relative z-10 p-6 md:p-8 h-full flex flex-col">
                {/* Header */}
                <div className="mb-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-secondary text-sm font-semibold">{project.subtitle}</p>
                </div>

                {/* Challenge */}
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-primary" />
                        <h4 className="text-sm font-bold text-gray-300">Challenge</h4>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">{project.challenge}</p>
                </div>

                {/* Solution */}
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-secondary" />
                        <h4 className="text-sm font-bold text-gray-300">Solution</h4>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">{project.solution}</p>
                </div>

                {/* Impact */}
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <h4 className="text-sm font-bold text-gray-300">Impact</h4>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-3">{project.impact}</p>

                    {/* Metrics */}
                    {project.metrics && (
                        <div className="flex flex-wrap gap-2">
                            {project.metrics.map((metric, i) => (
                                <span
                                    key={i}
                                    className="px-2 py-1 text-xs bg-green-500/10 text-green-400 rounded border border-green-500/20"
                                >
                                    {metric}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Role */}
                <div className="mb-4">
                    <p className="text-xs text-gray-500 italic">{project.role}</p>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((t) => (
                        <span
                            key={t}
                            className="px-3 py-1 text-xs font-mono text-secondary bg-secondary/10 rounded-full border border-secondary/20"
                        >
                            {t}
                        </span>
                    ))}
                </div>

                {/* Link */}
                {project.link && (
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 flex items-center gap-2 text-primary hover:text-secondary transition-colors text-sm font-mono"
                    >
                        View Project
                        <ExternalLink className="w-4 h-4" />
                    </a>
                )}
            </div>
        </motion.div>
    );
}

export default function ProjectsShowcase() {
    return (
        <section className="relative w-full py-20 px-4 md:px-10">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-4">
                        THE LAB
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Featured projects demonstrating technical expertise, problem-solving ability, and measurable business impact
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
