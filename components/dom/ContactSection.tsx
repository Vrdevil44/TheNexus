"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Download, Calendar } from "lucide-react";

export default function ContactSection() {
    const contactItems = [
        {
            icon: Mail,
            label: "Email",
            value: "vrdikshit44@gmail.com",
            href: "mailto:vrdikshit44@gmail.com",
        },
        {
            icon: MapPin,
            label: "Location",
            value: "Vancouver, British Columbia",
            href: null,
        },
        {
            icon: Linkedin,
            label: "Professional Links",
            value: "linktr.ee/VibhuDikshit",
            href: "https://linktr.ee/VibhuDikshit",
        },
    ];

    return (
        <section className="relative w-full py-20 px-4 md:px-10">

            <div className="max-w-5xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-4">
                        Let's Build Something Great
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-4">
                        Available for select opportunities in infrastructure engineering, full-stack development, and technical leadership
                    </p>
                    <span className="inline-block px-4 py-2 bg-green-500/10 text-green-400 text-sm font-mono rounded-full border border-green-500/20">
                        ● Currently accepting new projects
                    </span>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl h-full flex flex-col justify-center">
                            <h3 className="text-2xl font-bold text-white mb-6">Contact Info</h3>
                            <div className="space-y-6">
                                {contactItems.map((item, index) => (
                                    <div key={index} className="flex items-start gap-4">
                                        <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                                            <item.icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-sm mb-1">{item.label}</p>
                                            {item.href ? (
                                                <a
                                                    href={item.href}
                                                    target={item.href.startsWith("http") ? "_blank" : undefined}
                                                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                                    className="text-white hover:text-primary transition-colors font-mono text-sm md:text-base break-all"
                                                >
                                                    {item.value}
                                                </a>
                                            ) : (
                                                <p className="text-white font-mono text-sm md:text-base">{item.value}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-8 border-t border-white/10">
                                <a
                                    href="/Profile/Vibhu_Dikshit_CV.pdf"
                                    download="Vibhu_Dikshit_CV.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 px-6 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 backdrop-blur-sm text-center w-full group"
                                >
                                    <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    Download Resume
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <form
                            action="mailto:vrdikshit44@gmail.com"
                            method="post"
                            encType="text/plain"
                            className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl space-y-4"
                        >
                            <h3 className="text-2xl font-bold text-white mb-2">Send a Message</h3>
                            <p className="text-gray-400 text-sm mb-6">
                                Direct message to my inbox. No middleman.
                            </p>

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600"
                                    placeholder="Your Name"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    required
                                    className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600 resize-none"
                                    placeholder="What's on your mind?"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 transform hover:scale-[1.02]"
                            >
                                <Mail className="w-5 h-5" />
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>

                {/* Professional Note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center text-gray-500 text-sm"
                >
                    Response time: Within 24 hours on business days
                </motion.p>
            </div>
        </section>
    );
}
