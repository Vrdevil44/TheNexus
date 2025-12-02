"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shuffle, RotateCcw, Settings, Undo2, ChevronDown } from "lucide-react";
import { useTheme } from "@/lib/contexts/ThemeContext";
import { cn } from "@/lib/utils";

interface ToolPaletteProps {
    onOpenSettings: () => void;
}

export default function ToolPalette({ onOpenSettings }: ToolPaletteProps) {
    const { randomizeAll, resetTheme, undo, canUndo, historyCount } = useTheme();
    const [isExpanded, setIsExpanded] = useState(false);

    // Fixed positions for clean layout
    const distance = 70; // Distance between buttons

    const buttons = [
        {
            id: "undo",
            icon: Undo2,
            label: "Undo",
            onClick: undo,
            disabled: !canUndo,
            badge: canUndo ? historyCount : null,
            position: { x: -distance, y: 0 }, // Directly left
            animation: { rotate: [0, -20, 0] },
        },
        {
            id: "reset",
            icon: RotateCcw,
            label: "Reset",
            onClick: resetTheme,
            disabled: false,
            badge: null,
            position: { x: -distance * 0.707, y: distance * 0.707 }, // 45° diagonal (down-left)
            animation: { rotate: [0, 360] },
        },
        {
            id: "settings",
            icon: Settings,
            label: "Settings",
            onClick: onOpenSettings,
            disabled: false,
            badge: null,
            position: { x: 0, y: distance }, // Directly below
            animation: { rotate: [0, 180, 0] },
        },
    ];

    return (
        <div
            className="fixed top-6 right-6 md:top-8 md:right-8 z-[100]"
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
        >
            {/* Main Shuffle Button - Always Visible */}
            <motion.button
                onClick={randomizeAll}
                className={cn(
                    "relative w-12 h-12 rounded-full",
                    "bg-gradient-to-br from-primary to-secondary",
                    "text-white font-bold",
                    "shadow-xl hover:shadow-2xl",
                    "transition-all duration-300",
                    "overflow-visible",
                    "border-2 border-white/20"
                )}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                {/* Refined Subtle Ripple Effect - 2 Layers for Smooth Pulse */}
                <motion.span
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 to-secondary/40 -z-10"
                    animate={{
                        scale: [1, 2.5],
                        opacity: [0.4, 0],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeOut",
                    }}
                />
                <motion.span
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 -z-10"
                    animate={{
                        scale: [1, 2.5],
                        opacity: [0.4, 0],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: 1.5,
                    }}
                />

                {/* Static Icon - No Rotation */}
                <Shuffle className="w-5 h-5 mx-auto" />
            </motion.button>

            {/* Expanded Buttons - Show on Hover */}
            <AnimatePresence>
                {isExpanded && (
                    <>
                        {buttons.map((button, index) => {
                            const Icon = button.icon;
                            return (
                                <motion.button
                                    key={button.id}
                                    onClick={button.onClick}
                                    disabled={button.disabled}
                                    className={cn(
                                        "absolute top-0 right-0",
                                        "w-12 h-12 rounded-full",
                                        "backdrop-blur-sm",
                                        "text-white",
                                        "shadow-xl",
                                        "transition-all duration-200",
                                        "border-2 border-white/20",
                                        "hidden md:flex items-center justify-center",
                                        "group/btn",
                                        button.disabled
                                            ? "bg-gray-600/50 opacity-40 cursor-not-allowed"
                                            : "bg-gradient-to-br from-primary/90 to-secondary/90 hover:from-primary hover:to-secondary hover:shadow-2xl"
                                    )}
                                    initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                                    animate={{
                                        scale: 1,
                                        x: button.position.x,
                                        y: button.position.y,
                                        opacity: 1,
                                    }}
                                    exit={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 25,
                                        delay: index * 0.05,
                                    }}
                                    whileHover={!button.disabled ? { scale: 1.1 } : {}}
                                    whileTap={!button.disabled ? { scale: 0.95 } : {}}
                                    title={button.label}
                                >
                                    <motion.div
                                        whileHover={!button.disabled ? button.animation : {}}
                                        whileTap={!button.disabled ? button.animation : {}}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </motion.div>

                                    {/* Counter Badge for Undo - Theme Colored */}
                                    {button.badge !== null && (
                                        <motion.span
                                            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-primary to-secondary text-white text-xs font-bold flex items-center justify-center border-2 border-white shadow-lg"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.3, type: "spring" }}
                                        >
                                            {button.badge}
                                        </motion.span>
                                    )}
                                </motion.button>
                            );
                        })}
                    </>
                )}
            </AnimatePresence>

            {/* Mobile: Collapsible Vertical Column */}
            <div className="md:hidden mt-1 flex flex-col gap-2 items-end">
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: "auto" }}
                            exit={{ opacity: 0, y: -20, height: 0 }}
                            className="flex flex-col gap-2"
                        >
                            {buttons.map((button) => {
                                const Icon = button.icon;
                                return (
                                    <motion.button
                                        key={button.id}
                                        onClick={button.onClick}
                                        disabled={button.disabled}
                                        className={cn(
                                            "relative w-10 h-10 rounded-full",
                                            "backdrop-blur-sm",
                                            "text-white",
                                            "shadow-xl",
                                            "transition-all duration-200",
                                            "border-2 border-white/20",
                                            "flex items-center justify-center",
                                            button.disabled
                                                ? "bg-gray-600/50 opacity-40 cursor-not-allowed"
                                                : "bg-gradient-to-br from-primary/90 to-secondary/90"
                                        )}
                                        whileTap={!button.disabled ? { scale: 0.95 } : {}}
                                        title={button.label}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {button.badge !== null && (
                                            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-br from-primary to-secondary text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-lg">
                                                {button.badge}
                                            </span>
                                        )}
                                    </motion.button>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Mobile Toggle Button */}
                <motion.button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={cn(
                        "relative w-8 h-8 rounded-full",
                        "bg-black/40 backdrop-blur-md",
                        "text-white/80",
                        "border border-white/10",
                        "flex items-center justify-center",
                        "shadow-lg"
                    )}
                    whileTap={{ scale: 0.9 }}
                >
                    <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ChevronDown className="w-4 h-4" />
                    </motion.div>
                </motion.button>
            </div>
        </div>
    );
}
