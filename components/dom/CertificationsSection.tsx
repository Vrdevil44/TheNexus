"use client";

import { motion } from "framer-motion";
import { certifications } from "@/lib/data/certifications";
import { Award, Clock, Cloud, Network, Shield, Code, Terminal } from "lucide-react";

export default function CertificationsSection() {
    const inProgress = certifications.filter((cert) => cert.status === "in-progress");
    const completed = certifications.filter((cert) => cert.status === "completed");

    const getCategoryColor = (category: string) => {
        const colors = {
            cloud: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
            networking: "from-secondary/20 to-orange-500/20 border-secondary/30",
            development: "from-primary/20 to-blue-400/20 border-primary/30",
            security: "from-red-500/20 to-pink-500/20 border-red-500/30",
        };
        return colors[category as keyof typeof colors] || colors.development;
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case "cloud":
                return <Cloud className="w-5 h-5 md:w-6 md:h-6 text-primary" />;
            case "networking":
                return <Network className="w-5 h-5 md:w-6 md:h-6 text-secondary" />;
            case "security":
                return <Shield className="w-5 h-5 md:w-6 md:h-6 text-primary" />;
            case "development":
                return <Code className="w-5 h-5 md:w-6 md:h-6 text-secondary" />;
            default:
                return <Terminal className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />;
        }
    };

    return (
        <section className="relative w-full py-20 px-4 md:px-10">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-4">
                        Credential Stack
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Professional certifications & continuous learning
                    </p>
                </motion.div>

                {/* In Progress */}
                {inProgress.length > 0 && (
                    <div className="mb-12">
                        <h3 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-2">
                            <Clock className="w-6 h-6" />
                            In Progress
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                            {inProgress.map((cert, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`p-4 md:p-6 rounded-xl bg-gradient-to-br ${getCategoryColor(
                                        cert.category
                                    )} glass flex flex-col justify-between h-full`}
                                >
                                    <div className="mb-4">
                                        <div className="flex justify-between items-start mb-3">
                                            {getCategoryIcon(cert.category)}
                                            <span className="px-2 py-0.5 md:px-3 md:py-1 bg-secondary/20 text-secondary text-[10px] md:text-xs font-mono rounded-full border border-secondary/30 whitespace-nowrap">
                                                {cert.year}
                                            </span>
                                        </div>
                                        <h4 className="text-sm md:text-lg font-bold text-white mb-1 leading-tight">
                                            {cert.name}
                                        </h4>
                                        <p className="text-gray-400 text-xs md:text-sm">{cert.issuer}</p>
                                    </div>
                                    <div className="w-full bg-white/10 rounded-full h-1.5 mt-auto">
                                        <div className="bg-secondary h-1.5 rounded-full w-2/3 animate-pulse" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Completed */}
                <div>
                    <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                        <Award className="w-6 h-6" />
                        Completed
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                        {completed.map((cert, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ scale: 1.05 }}
                                className={`p-4 md:p-6 rounded-xl bg-gradient-to-br ${getCategoryColor(
                                    cert.category
                                )} glass cursor-pointer flex flex-col h-full`}
                            >
                                <div className="flex justify-between items-start mb-3">
                                    {getCategoryIcon(cert.category)}
                                    <span className="text-primary text-[10px] md:text-xs font-mono opacity-80">
                                        {cert.year}
                                    </span>
                                </div>
                                <h4 className="text-sm md:text-lg font-bold text-white mb-1 leading-tight">
                                    {cert.name}
                                </h4>
                                <p className="text-gray-400 text-xs md:text-sm mt-auto">{cert.issuer}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
