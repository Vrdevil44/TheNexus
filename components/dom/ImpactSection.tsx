"use client";

import { motion } from "framer-motion";
import { Award, TrendingUp, Users, Zap } from "lucide-react";
import { useEffect, useState } from "react";

function AnimatedCounter({ end, duration = 2, suffix = "", prefix = "" }: { end: number; duration?: number; suffix?: string; prefix?: string }) {
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
        const timer = setTimeout(() => requestAnimationFrame(animate), 500);
        return () => clearTimeout(timer);
    }, [end, duration]);

    return (
        <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {prefix}{count}{suffix}
        </span>
    );
}

export default function ImpactSection() {
    const metrics = [
        {
            icon: Users,
            value: 500,
            suffix: "+",
            label: "Systems Managed",
            description: "Enterprise infrastructure across multiple clients",
        },
        {
            icon: TrendingUp,
            value: 82,
            suffix: "%",
            label: "ML Model Accuracy",
            description: "MiRo-E emotion recognition achievement",
        },
        {
            icon: Award,
            value: 15,
            suffix: "+",
            label: "Certifications",
            description: "Industry credentials & continuous learning",
        },
        {
            icon: Zap,
            value: 5,
            suffix: "+",
            label: "Production Apps",
            description: "Deployed & actively serving users",
        },
    ];

    const achievements = [
        "Reduced system downtime by 40% through proactive monitoring",
        "Boosted network performance by 30% via infrastructure optimization",
        "Achieved 99% uptime across critical business systems",
        "Led enterprise cloud migrations serving 600+ employees",
    ];

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
                        Impact & Recognition
                    </h2>
                    <p className="text-theme-gray-400 text-lg">
                        Delivering measurable results across infrastructure and development
                    </p>
                </motion.div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
                    {metrics.map((metric, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-6 glass hover:border-primary/50 transition-all duration-300 text-center"
                        >
                            <div className="flex justify-center mb-4">
                                <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                                    <metric.icon className="w-6 h-6 text-primary" />
                                </div>
                            </div>
                            <AnimatedCounter end={metric.value} suffix={metric.suffix} />
                            <h3 className="text-white font-bold mt-2 mb-1">{metric.label}</h3>
                            <p className="text-theme-gray-400 text-sm">{metric.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Key Achievements */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">Key Achievements</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {achievements.map((achievement, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10"
                            >
                                <div className="mt-1">
                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                </div>
                                <p className="text-theme-gray-300 text-sm leading-relaxed">{achievement}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
