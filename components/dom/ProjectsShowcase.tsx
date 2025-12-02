import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, Project } from "@/lib/data/projects";
import { ExternalLink, Zap, Target, TrendingUp, Maximize2, X } from "lucide-react";

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
    // Close on escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-start justify-center px-4 py-8 pt-32 md:pt-40 bg-black/80 backdrop-blur-md"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-2xl max-h-[calc(100vh-160px)] overflow-y-auto glass border border-primary/20 rounded-2xl p-6 md:p-8"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="mb-6 pr-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 text-primary">
                        {project.title}
                    </h3>
                    <p className="text-secondary text-sm font-semibold">{project.subtitle}</p>
                </div>

                {/* Image */}
                {project.image && (
                    <div className="mb-6 rounded-xl overflow-hidden border border-white/10">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                )}

                {/* Challenge */}
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-primary" />
                        <h4 className="text-sm font-bold text-theme-gray-300">Challenge</h4>
                    </div>
                    <p className="text-theme-gray-400 text-sm leading-relaxed">{project.challenge}</p>
                </div>

                {/* Solution */}
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-secondary" />
                        <h4 className="text-sm font-bold text-theme-gray-300">Solution</h4>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">{project.solution}</p>
                </div>

                {/* Impact */}
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <h4 className="text-sm font-bold text-theme-gray-300">Impact</h4>
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
                        className="mt-6 flex items-center gap-2 text-primary hover:text-secondary transition-colors text-sm font-mono w-fit"
                    >
                        View Project
                        <ExternalLink className="w-4 h-4" />
                    </a>
                )}
            </motion.div>
        </motion.div>
    );
}

function ProjectCard({ project, index, onExpand }: { project: Project; index: number; onExpand: (project: Project) => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="relative h-full aspect-square glass overflow-hidden group hover:border-primary/50 transition-all duration-300"
        >
            {/* Background Gradient (Default State) */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/50 z-0 transition-opacity duration-500 group-hover:opacity-0" />

            {/* Project Image (Hover State) */}
            {project.image && (
                <div className="absolute inset-0 z-0 h-full w-full">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-top opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out"
                    />
                </div>
            )}

            {/* Mobile Expand Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onExpand(project);
                }}
                className="md:hidden absolute top-2 right-2 z-30 p-1.5 rounded-full bg-black/50 text-white border border-white/20 backdrop-blur-sm hover:bg-primary/20 transition-colors"
            >
                <Maximize2 className="w-3 h-3" />
            </button>

            {/* Content Container (Exits on Hover) */}
            <div className="relative z-10 p-4 md:p-8 h-full flex flex-col transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-4">
                {/* Header */}
                <div className="mb-2 md:mb-6">
                    <h3 className="text-lg md:text-3xl font-bold text-white mb-1 md:mb-2 group-hover:text-primary transition-colors line-clamp-1">
                        {project.title}
                    </h3>
                    <p className="text-secondary text-xs md:text-sm font-semibold line-clamp-1">{project.subtitle}</p>
                </div>

                {/* Challenge */}
                <div className="mb-2 md:mb-4 hidden md:block">
                    <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-primary" />
                        <h4 className="text-sm font-bold text-theme-gray-300">Challenge</h4>
                    </div>
                    <p className="text-theme-gray-400 text-sm leading-relaxed line-clamp-2">{project.challenge}</p>
                </div>

                {/* Solution */}
                <div className="mb-2 md:mb-4 hidden md:block">
                    <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-secondary" />
                        <h4 className="text-sm font-bold text-theme-gray-300">Solution</h4>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{project.solution}</p>
                </div>

                {/* Impact */}
                <div className="mb-2 md:mb-4">
                    <div className="flex items-center gap-2 mb-1 md:mb-2">
                        <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
                        <h4 className="text-xs md:text-sm font-bold text-theme-gray-300">Impact</h4>
                    </div>
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-2 md:mb-3 line-clamp-2 md:line-clamp-none">{project.impact}</p>

                    {/* Metrics */}
                    {project.metrics && (
                        <div className="flex flex-wrap gap-1 md:gap-2">
                            {project.metrics.slice(0, 2).map((metric, i) => (
                                <span
                                    key={i}
                                    className="px-1.5 py-0.5 md:px-2 md:py-1 text-[10px] md:text-xs bg-green-500/10 text-green-400 rounded border border-green-500/20 whitespace-nowrap"
                                >
                                    {metric}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Role */}
                <div className="mb-2 md:mb-4 hidden md:block">
                    <p className="text-xs text-gray-500 italic">{project.role}</p>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1 md:gap-2 mt-auto">
                    {project.tech.slice(0, 3).map((t) => (
                        <span
                            key={t}
                            className="px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs font-mono text-secondary bg-secondary/10 rounded-full border border-secondary/20"
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
                        className="mt-4 md:mt-6 flex items-center gap-2 text-primary hover:text-secondary transition-colors text-xs md:text-sm font-mono"
                    >
                        View Project
                        <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
                    </a>
                )}
            </div>

            {/* Full Card Link Overlay (Visible on Hover) */}
            {project.link && (
                <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-label={`View ${project.title}`}
                />
            )}
        </motion.div>
    );
}

import { ChevronDown, ChevronUp } from "lucide-react";

export default function ProjectsShowcase() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [showAllProjects, setShowAllProjects] = useState(false);

    const visibleProjects = showAllProjects ? projects : projects.slice(0, 4);

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
                    <p className="text-theme-gray-400 text-lg max-w-2xl mx-auto">
                        Featured projects demonstrating technical expertise, problem-solving ability, and measurable business impact
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 md:gap-8">
                    {visibleProjects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            project={project}
                            index={index}
                            onExpand={setSelectedProject}
                        />
                    ))}
                </div>

                {/* See More / Collapse Button */}
                {projects.length > 4 && (
                    <div className="flex justify-center mt-12">
                        <motion.button
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            onClick={() => setShowAllProjects(!showAllProjects)}
                            className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-white font-semibold hover:bg-white/10 hover:border-primary/50 transition-all duration-300 backdrop-blur-md flex items-center gap-2 group"
                        >
                            <span>{showAllProjects ? "Collapse" : "See More Projects"}</span>
                            {showAllProjects ? (
                                <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                            ) : (
                                <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                            )}
                        </motion.button>
                    </div>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
