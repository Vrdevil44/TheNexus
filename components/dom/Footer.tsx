"use client";

import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const sections = [
        { name: "Hero", href: "#hero" },
        { name: "Experience", href: "#experience" },
        { name: "Impact", href: "#impact" },
        { name: "Skills", href: "#skills" },
        { name: "Projects", href: "#projects" },
        { name: "Certifications", href: "#certifications" },
        { name: "Contact", href: "#contact" },
    ];

    const socialLinks = [
        { icon: Linkedin, href: "https://linktr.ee/VibhuDikshit", label: "LinkedIn" },
        { icon: Github, href: "https://github.com/vibhudikshit", label: "GitHub" },
        { icon: Mail, href: "mailto:vibhu.dikshit@example.com", label: "Email" },
    ];

    return (
        <footer className="relative z-20 w-full bg-black/50 border-t border-white/10 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 md:px-10 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2 tracking-tighter">
                            THE NEXUS
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Infrastructure-first IT Specialist & Full Stack Developer
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-white font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {sections.map((section) => (
                                <li key={section.name}>
                                    <a
                                        href={section.href}
                                        className="text-gray-400 hover:text-primary transition-colors text-sm"
                                    >
                                        {section.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-white font-bold mb-4">Connect</h4>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/10 transition-all"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5 text-gray-400 hover:text-primary transition-colors" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-sm">
                        © 2025 Vibhu Dikshit. All rights reserved.
                    </p>
                    <p className="text-gray-500 text-xs font-mono">
                        Built with Next.js, Three.js & Framer Motion
                    </p>
                    <button
                        onClick={scrollToTop}
                        className="p-2 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-all group"
                        aria-label="Back to top"
                    >
                        <ArrowUp className="w-5 h-5 text-primary group-hover:translate-y-[-2px] transition-transform" />
                    </button>
                </div>
            </div>
        </footer>
    );
}
