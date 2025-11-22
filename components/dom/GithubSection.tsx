"use client";

import { motion } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import { ExternalLink, Star, GitFork, Github } from "lucide-react";
import { useTheme } from "@/lib/contexts/ThemeContext";
import { useState, useEffect, useRef } from "react";
import { fetchGitHubRepos, type GitHubRepo } from "@/lib/api/github-api";

const GITHUB_USERNAME = "Vrdevil44";

export default function GithubSection() {
    const { theme } = useTheme();
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [loading, setLoading] = useState(true);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        async function loadRepos() {
            setLoading(true);
            const data = await fetchGitHubRepos(GITHUB_USERNAME);
            setRepos(data);
            setLoading(false);
        }
        loadRepos();
    }, []);

    // Auto-scroll effect with infinite loop
    useEffect(() => {
        if (!scrollContainerRef.current || repos.length === 0 || isPaused) return;

        const container = scrollContainerRef.current;
        let animationFrameId: number;
        const scrollSpeed = 0.5; // pixels per frame

        const autoScroll = () => {
            if (container && !isPaused) {
                container.scrollTop += scrollSpeed;

                // For infinite scroll: when we've scrolled past the first set of repos,
                // seamlessly reset to the beginning (the duplicated content makes this invisible)
                const halfwayPoint = container.scrollHeight / 2;
                if (container.scrollTop >= halfwayPoint) {
                    container.scrollTop = 0;
                }
            }
            animationFrameId = requestAnimationFrame(autoScroll);
        };

        animationFrameId = requestAnimationFrame(autoScroll);

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [repos, isPaused]);

    return (
        <section className="relative w-full py-20 px-4 md:px-10">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Github className="w-10 h-10 text-white" />
                        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
                            Open Source
                        </h2>
                    </div>
                    <p className="text-gray-400 text-lg">
                        Contributions and repositories on GitHub
                    </p>
                </motion.div>

                {/* Bento Box Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Contribution Calendar */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col"
                    >
                        <h3 className="text-2xl font-bold text-white mb-4">Activity</h3>
                        <div className="h-auto lg:h-[450px] p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden flex items-center justify-center text-white">
                            <div className="w-full overflow-x-auto flex justify-center">
                                <GitHubCalendar
                                    username={GITHUB_USERNAME}
                                    colorScheme="dark"
                                    theme={{
                                        dark: [
                                            "rgba(255, 255, 255, 0.05)",
                                            `hsl(${theme.colors.primary.h}, ${theme.colors.primary.s}%, 25%)`,
                                            `hsl(${theme.colors.primary.h}, ${theme.colors.primary.s}%, 40%)`,
                                            `hsl(${theme.colors.primary.h}, ${theme.colors.primary.s}%, 60%)`,
                                            `hsl(${theme.colors.primary.h}, ${theme.colors.primary.s}%, 80%)`,
                                        ],
                                    }}
                                    fontSize={14}
                                    blockSize={12}
                                    blockMargin={4}
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Repository List with Auto-scroll */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex flex-col"
                    >
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Repositories ({repos.length})
                        </h3>

                        {loading ? (
                            <div className="h-[450px] p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center">
                                <p className="text-gray-400">Loading repositories...</p>
                            </div>
                        ) : (
                            <div
                                ref={scrollContainerRef}
                                onMouseEnter={() => setIsPaused(true)}
                                onMouseLeave={() => setIsPaused(false)}
                                className="h-[450px] p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
                            >
                                {/* Render repos twice for infinite scroll effect */}
                                {[...repos, ...repos].map((repo, index) => (
                                    <motion.a
                                        key={`${repo.id}-${index}`}
                                        href={repo.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: (index % repos.length) * 0.05 }}
                                        className="group block p-4 rounded-lg bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all duration-300"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                                                {repo.name}
                                            </h4>
                                            <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors flex-shrink-0 ml-2" />
                                        </div>

                                        {repo.description && (
                                            <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                                                {repo.description}
                                            </p>
                                        )}

                                        <div className="flex items-center gap-4 text-xs text-gray-500 font-mono">
                                            {repo.language && (
                                                <span className="flex items-center gap-1">
                                                    <div className="w-2 h-2 rounded-full bg-secondary" />
                                                    {repo.language}
                                                </span>
                                            )}
                                            <span className="flex items-center gap-1">
                                                <Star className="w-3 h-3" />
                                                {repo.stargazers_count}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <GitFork className="w-3 h-3" />
                                                {repo.forks_count}
                                            </span>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
