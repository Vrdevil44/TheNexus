"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Download, Calendar, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function ContactSection() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus("idle");
        setErrorMessage("");

        try {
            const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

            if (!accessKey) {
                throw new Error("Web3Forms access key not configured. Please add NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY to your environment variables.");
            }

            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: accessKey,
                    name: formState.name,
                    email: formState.email,
                    message: formState.message,
                    subject: `New Portfolio Contact from ${formState.name}`,
                }),
            });

            const result = await response.json();

            if (result.success) {
                setSubmitStatus("success");
                setFormState({ name: "", email: "", message: "" });
                // Reset success message after 5 seconds
                setTimeout(() => setSubmitStatus("idle"), 5000);
            } else {
                throw new Error(result.message || "Failed to send message");
            }
        } catch (error) {
            setSubmitStatus("error");
            setErrorMessage(error instanceof Error ? error.message : "Failed to send message. Please try again.");
            // Reset error message after 5 seconds
            setTimeout(() => setSubmitStatus("idle"), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

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
                        <div className="p-8 glass shadow-2xl h-full flex flex-col justify-center">
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
                                    href={`${process.env.NODE_ENV === 'production' ? '/TheNexus' : ''}/Vibhu_Dikshit_CV.pdf`}
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
                            onSubmit={handleSubmit}
                            className="p-8 glass shadow-2xl space-y-4"
                        >
                            <h3 className="text-2xl font-bold text-white mb-2">Send a Message</h3>
                            <p className="text-gray-400 text-sm mb-6">
                                Direct message to my inbox. I'll get back to you within 24 hours.
                            </p>

                            {/* Success Message */}
                            {submitStatus === "success" && (
                                <div className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400">
                                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                    <p className="text-sm">Message sent successfully! I'll get back to you soon.</p>
                                </div>
                            )}

                            {/* Error Message */}
                            {submitStatus === "error" && (
                                <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    <p className="text-sm">{errorMessage}</p>
                                </div>
                            )}

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formState.name}
                                    onChange={handleChange}
                                    required
                                    disabled={isSubmitting}
                                    className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="Your Name"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formState.email}
                                    onChange={handleChange}
                                    required
                                    disabled={isSubmitting}
                                    className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    value={formState.message}
                                    onChange={handleChange}
                                    required
                                    disabled={isSubmitting}
                                    className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="What's on your mind?"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Mail className="w-5 h-5" />
                                        Send Message
                                    </>
                                )}
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
