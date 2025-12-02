"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/lib/contexts/ThemeContext";
import { Home, FlaskConical, User, Briefcase, Mail, Code, Zap, Award } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PhantomNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [fontV, setFontV] = useState("var(--font-heading)");
    const [fontD, setFontD] = useState("var(--font-heading)");
    const navRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const { theme } = useTheme();

    // Auto-collapse on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Scroll Spy Logic
    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map(item => item.path.replace("/#", ""));

            // Only spy on sections if we are on the home page
            if (pathname === "/") {
                let current = "";
                for (const section of sections) {
                    const element = document.getElementById(section);
                    if (element) {
                        const rect = element.getBoundingClientRect();
                        // If the section is in the viewport (with some offset)
                        if (rect.top <= 200 && rect.bottom >= 200) {
                            current = section;
                            break;
                        }
                    }
                }
                // Special case for top of page
                if (window.scrollY < 100) current = "";

                setActiveSection(current);
            } else {
                setActiveSection("");
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [pathname]);

    // Dynamic Font Glitch Effect
    useEffect(() => {
        const fonts = [
            "var(--font-heading)",
            "monospace",
            "serif",
            "sans-serif",
            "Courier New",
            "Impact"
        ];

        const interval = setInterval(() => {
            if (Math.random() > 0.9) { // 10% chance to glitch
                setFontV(fonts[Math.floor(Math.random() * fonts.length)]);
            } else {
                setFontV("var(--font-heading)");
            }

            if (Math.random() > 0.9) {
                setFontD(fonts[Math.floor(Math.random() * fonts.length)]);
            } else {
                setFontD("var(--font-heading)");
            }
        }, 200);

        return () => clearInterval(interval);
    }, []);

    const navItems = [
        { name: "Home", path: "/", icon: Home },
        { name: "Lab", path: "/lab", icon: FlaskConical },
        { name: "Exp", path: "/#experience", icon: Briefcase },
        { name: "Impact", path: "/#impact", icon: Zap },
        { name: "Skills", path: "/#skills", icon: Code },
        { name: "Contact", path: "/#contact", icon: Mail },
    ];

    // Dynamic styles based on theme
    const primaryColor = `hsl(${theme.colors.primary.h}, ${theme.colors.primary.s}%, ${theme.colors.primary.l}%)`;
    const secondaryColor = `hsl(${theme.colors.secondary.h}, ${theme.colors.secondary.s}%, ${theme.colors.secondary.l}%)`;

    // Glass effect styles derived from theme
    const glassStyle = {
        background: `hsla(${theme.effects.cardColor.h}, ${theme.effects.cardColor.s}%, ${theme.effects.cardColor.l}%, ${theme.effects.cardOpacity * 2})`, // Slightly more opaque for nav
        backdropFilter: `blur(${theme.effects.componentBlur || "12px"})`,
        borderColor: `hsla(${theme.colors.primary.h}, ${theme.colors.primary.s}%, ${theme.colors.primary.l}%, 0.2)`,
        boxShadow: theme.effects.shadowEnabled
            ? `0 10px 30px -10px hsla(${theme.effects.shadowColor.h}, ${theme.effects.shadowColor.s}%, ${theme.effects.shadowColor.l}%, ${theme.effects.shadowIntensity})`
            : "none",
    };

    // Determine border radius based on shape
    const getBorderRadius = () => {
        switch (theme.effects.navShape) {
            case 'boxy': return '0px';
            case 'beveled': return '0.5rem'; // Slight rounding for beveled look
            case 'rounded':
            default: return '9999px';
        }
    };

    const borderRadius = getBorderRadius();

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Set initial value
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div
            className="fixed top-8 left-0 z-50 flex flex-col items-start"
            onMouseLeave={() => setIsOpen(false)}
            style={{ fontFamily: theme.fonts.body }}
        >
            <motion.nav
                ref={navRef}
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                variants={{
                    open: { x: 0 },
                    closed: { x: isMobile ? 0 : "calc(-100% + 4.5rem)" }
                }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="relative flex flex-col md:flex-row items-start md:items-center pl-4 max-w-[90vw] md:max-w-none"
            >
                {/* Main Container */}
                <div
                    className="flex flex-col-reverse md:flex-row items-start md:items-center overflow-hidden border md:border-l-0 border-t-0 md:border-t"
                    style={{
                        ...glassStyle,
                        borderTopRightRadius: borderRadius,
                        borderBottomRightRadius: borderRadius,
                        borderBottomLeftRadius: isMobile ? borderRadius : "0",
                        borderTopLeftRadius: "0",
                        borderWidth: theme.effects.borderWidth,
                        clipPath: theme.effects.navShape === 'beveled'
                            ? 'polygon(0 0, 100% 0, 100% 85%, 95% 100%, 0 100%)'
                            : undefined
                    }}
                >
                    {/* Nav Items Container */}
                    <AnimatePresence>
                        {(isOpen || !isMobile) && (
                            <motion.div
                                initial={{ opacity: 0, height: 0, width: 0 }}
                                animate={{
                                    opacity: 1,
                                    height: isMobile ? "auto" : "auto",
                                    width: isMobile ? "auto" : "auto"
                                }}
                                exit={{ opacity: 0, height: 0, width: 0 }}
                                className="flex flex-col md:flex-row items-start md:items-center px-2 py-2 gap-1"
                            >
                                {navItems.map((item) => {
                                    const isPathMatch = pathname === item.path;
                                    const isSectionMatch = pathname === "/" && activeSection === item.path.replace("/#", "");
                                    const isActive = isPathMatch || isSectionMatch;

                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.path}
                                            onClick={() => setIsOpen(false)}
                                            className="w-full md:w-auto"
                                        >
                                            <motion.div
                                                className={cn(
                                                    "flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 group relative overflow-hidden w-full md:w-auto",
                                                )}
                                                style={{
                                                    borderRadius: theme.effects.borderRadius,
                                                }}
                                                whileHover={{
                                                    scale: 1.05
                                                }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="navActive"
                                                        className="absolute inset-0 opacity-100"
                                                        style={{
                                                            background: `linear-gradient(135deg, ${primaryColor}40, ${secondaryColor}40)`,
                                                            border: `1px solid ${primaryColor}60`,
                                                            borderRadius: theme.effects.borderRadius,
                                                            boxShadow: `0 0 15px ${primaryColor}20`
                                                        }}
                                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                    />
                                                )}

                                                <item.icon
                                                    className="w-4 h-4 relative z-10 transition-colors duration-300"
                                                    style={{
                                                        color: isActive ? theme.colors.text.white : theme.colors.text.gray400
                                                    }}
                                                />
                                                <span
                                                    className="text-xs font-medium whitespace-nowrap relative z-10 transition-colors duration-300"
                                                    style={{
                                                        color: isActive ? theme.colors.text.white : theme.colors.text.gray300,
                                                        fontFamily: theme.fonts.heading
                                                    }}
                                                >
                                                    {item.name}
                                                </span>
                                            </motion.div>
                                        </Link>
                                    );
                                })}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Divider - Hidden on Mobile */}
                    <div
                        className="hidden md:block w-px h-8 mx-2"
                        style={{ backgroundColor: `hsla(${theme.colors.text.white}, 0.1)` }}
                    />

                    {/* The "Peeping" Trigger (VD Initials) */}
                    <motion.div
                        className="relative cursor-pointer p-2 md:pr-3 group perspective-1000"
                        onClick={() => setIsOpen(!isOpen)}
                        onMouseEnter={() => window.innerWidth >= 768 && setIsOpen(true)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <div
                            className="relative w-12 h-12 flex items-center justify-center transition-all duration-300"
                            style={{ borderRadius: borderRadius }}
                        >
                            {/* Animated Gradient Border/Glow - Subtle background */}
                            <motion.div
                                className="absolute inset-0 blur-md opacity-20"
                                style={{
                                    background: `radial-gradient(circle, ${primaryColor}, transparent 70%)`,
                                    borderRadius: borderRadius
                                }}
                                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            />

                            {/* Container for separate floating letters */}
                            <div className="relative w-full h-full flex items-center justify-center">
                                {/* Letter V */}
                                <motion.span
                                    className="font-bold text-2xl tracking-tighter relative z-20"
                                    style={{
                                        display: "inline-block",
                                        backgroundImage: `linear-gradient(to bottom right, ${primaryColor}, ${secondaryColor})`,
                                        backgroundClip: "text",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        color: "transparent", // Fallback
                                        filter: `drop-shadow(0 0 8px ${primaryColor})`,
                                        marginRight: "2px",
                                        marginBottom: "4px",
                                        fontFamily: fontV
                                    }}
                                    animate={{
                                        y: [-2, 2, -2],
                                        rotate: [-5, 5, -5],
                                        filter: [
                                            `drop-shadow(0 0 8px ${primaryColor})`,
                                            `drop-shadow(0 0 15px ${primaryColor})`,
                                            `drop-shadow(0 0 8px ${primaryColor})`
                                        ]
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    V
                                </motion.span>

                                {/* Letter D */}
                                <motion.span
                                    className="font-bold text-2xl tracking-tighter relative z-20"
                                    style={{
                                        display: "inline-block",
                                        backgroundImage: `linear-gradient(to bottom right, ${secondaryColor}, ${primaryColor})`,
                                        backgroundClip: "text",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        color: "transparent", // Fallback
                                        filter: `drop-shadow(0 0 8px ${secondaryColor})`,
                                        marginLeft: "2px",
                                        marginTop: "4px",
                                        fontFamily: fontD
                                    }}
                                    animate={{
                                        y: [2, -2, 2], // Opposite phase to V
                                        rotate: [5, -5, 5],
                                        filter: [
                                            `drop-shadow(0 0 8px ${secondaryColor})`,
                                            `drop-shadow(0 0 15px ${secondaryColor})`,
                                            `drop-shadow(0 0 8px ${secondaryColor})`
                                        ]
                                    }}
                                    transition={{
                                        duration: 5, // Slightly different duration for organic feel
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    D
                                </motion.span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.nav>
        </div>
    );
}
