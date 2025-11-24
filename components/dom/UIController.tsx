"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Settings, Palette, Type, Sparkles, Save, Upload, RotateCcw, Image, Shuffle } from "lucide-react";
import { useTheme } from "@/lib/contexts/ThemeContext";
import dynamic from "next/dynamic";

const FontControls = dynamic(() => import("./controls/FontControls"), { loading: () => <div className="p-4 text-sm text-gray-400">Loading fonts...</div> });
const ColorControls = dynamic(() => import("./controls/ColorControls"), { loading: () => <div className="p-4 text-sm text-gray-400">Loading colors...</div> });
const EffectsControls = dynamic(() => import("./controls/EffectsControls"), { loading: () => <div className="p-4 text-sm text-gray-400">Loading effects...</div> });
const PresetSelector = dynamic(() => import("./controls/PresetSelector"), { loading: () => <div className="p-4 text-sm text-gray-400">Loading presets...</div> });
const BackgroundControls = dynamic(() => import("./controls/BackgroundControls"), { loading: () => <div className="p-4 text-sm text-gray-400">Loading background...</div> });

export default function UIController({ isOpen: externalIsOpen, onClose }: { isOpen?: boolean; onClose?: () => void } = {}) {
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("fonts");
    const { resetTheme, randomizeAll, exportTheme, importTheme } = useTheme();

    // Use external control if provided, otherwise use internal state
    const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
    const setIsOpen = onClose || ((value: boolean) => setInternalIsOpen(value));

    // Keyboard shortcut: Ctrl/Cmd + K
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "k") {
                e.preventDefault();
                setIsOpen(!isOpen);
            }
            if ((e.ctrlKey || e.metaKey) && e.key === "r" && isOpen) {
                e.preventDefault();
                if (confirm("Reset theme to default?")) {
                    resetTheme();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, resetTheme, setIsOpen]);

    const handleExport = () => {
        const json = exportTheme();
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "portfolio-theme.json";
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleImport = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".json";
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const json = e.target?.result as string;
                    importTheme(json);
                };
                reader.readAsText(file);
            }
        };
        input.click();
    };

    const tabs = [
        { id: "fonts", label: "Typography", icon: Type },
        { id: "colors", label: "Colors", icon: Palette },
        { id: "background", label: "Background", icon: Image },
        { id: "effects", label: "Effects", icon: Sparkles },
        { id: "presets", label: "Presets", icon: Settings },
    ];

    return (
        <>
            {/* Controller Panel */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
                        />

                        {/* Panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 h-full w-full sm:w-[480px] md:w-[520px] lg:w-[560px] bg-gray-900 border-l border-white/10 shadow-2xl z-[9999] overflow-hidden flex flex-col"
                        >
                            {/* Header */}
                            <div className="p-6 border-b border-white/10 bg-gradient-to-r from-primary/10 to-secondary/10">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                        <Settings className="w-6 h-6 text-primary" />
                                        UI Controller
                                    </h2>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleExport}
                                        className="flex-1 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white flex items-center justify-center gap-2 transition-colors"
                                    >
                                        <Save className="w-4 h-4" />
                                        Export
                                    </button>
                                    <button
                                        onClick={handleImport}
                                        className="flex-1 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white flex items-center justify-center gap-2 transition-colors"
                                    >
                                        <Upload className="w-4 h-4" />
                                        Import
                                    </button>
                                </div>
                            </div>

                            {/* Tabs */}
                            <div className="flex border-b border-white/10 bg-gray-800/50">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex-1 px-2 sm:px-3 py-3 text-xs sm:text-sm font-medium transition-colors relative ${activeTab === tab.id
                                            ? "text-primary"
                                            : "text-gray-400 hover:text-white"
                                            }`}
                                    >
                                        <div className="flex flex-col items-center gap-1">
                                            <tab.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                                            <span className="text-[10px] sm:text-xs whitespace-nowrap">{tab.label}</span>
                                        </div>
                                        {activeTab === tab.id && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto p-6">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeTab}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {activeTab === "fonts" && <FontControls />}
                                        {activeTab === "colors" && <ColorControls />}
                                        {activeTab === "background" && <BackgroundControls />}
                                        {activeTab === "effects" && <EffectsControls />}
                                        {activeTab === "presets" && <PresetSelector />}
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Footer Hint */}
                            <div className="p-4 border-t border-white/10 bg-gray-800/50">
                                <p className="text-xs text-gray-400 text-center">
                                    Press <kbd className="px-2 py-1 bg-white/10 rounded">Ctrl+K</kbd> to toggle
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
