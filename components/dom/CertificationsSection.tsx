"use client";

import { motion } from "framer-motion";
import { certifications } from "@/lib/data/certifications";
import { Award, Clock } from "lucide-react";

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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {inProgress.map((cert, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`p-6 rounded-xl bg-gradient-to-br ${getCategoryColor(
                                        cert.category
                                    )} border backdrop-blur-sm`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h4 className="text-lg font-bold text-white mb-1">
                                                {cert.name}
                                            </h4>
                                            <p className="text-gray-400 text-sm">{cert.issuer}</p>
                                        </div>
                                        <span className="px-3 py-1 bg-secondary/20 text-secondary text-xs font-mono rounded-full border border-secondary/30">
                                            {cert.year}
                                        </span>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {completed.map((cert, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ scale: 1.05 }}
                                className={`p-6 rounded-xl bg-gradient-to-br ${getCategoryColor(
                                    cert.category
                                )} border backdrop-blur-sm cursor-pointer`}
                            >
                                <h4 className="text-lg font-bold text-white mb-2">
                                    {cert.name}
                                </h4>
                                <p className="text-gray-400 text-sm mb-1">{cert.issuer}</p>
                                <span className="text-primary text-xs font-mono">{cert.year}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
