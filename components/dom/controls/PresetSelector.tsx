"use client";

import { useTheme } from "@/lib/contexts/ThemeContext";
import { Check } from "lucide-react";

const PRESETS = [
    {
        id: "default",
        name: "Default",
        description: "Original cyber-physical theme",
        preview: "linear-gradient(135deg, hsl(180, 100%, 50%), hsl(300, 100%, 50%))",
    },
    {
        id: "cyberpunk",
        name: "Cyberpunk",
        description: "Neon pink and cyan vibes",
        preview: "linear-gradient(135deg, hsl(320, 100%, 50%), hsl(180, 100%, 50%))",
    },
    {
        id: "professional",
        name: "Professional",
        description: "Corporate blue and orange",
        preview: "linear-gradient(135deg, hsl(210, 80%, 50%), hsl(25, 80%, 50%))",
    },
    {
        id: "minimal",
        name: "Minimal",
        description: "Clean black and white",
        preview: "linear-gradient(135deg, hsl(0, 0%, 100%), hsl(0, 0%, 70%))",
    },
    {
        id: "sunset",
        name: "Sunset",
        description: "Warm orange and pink tones",
        preview: "linear-gradient(135deg, hsl(30, 100%, 60%), hsl(350, 100%, 60%))",
    },
    {
        id: "ocean",
        name: "Ocean",
        description: "Cool blue depths",
        preview: "linear-gradient(135deg, hsl(195, 90%, 55%), hsl(230, 90%, 60%))",
    },
    {
        id: "midnight",
        name: "Midnight",
        description: "Deep purple and dark blue",
        preview: "linear-gradient(135deg, hsl(270, 70%, 60%), hsl(240, 60%, 50%))",
    },
    {
        id: "forest",
        name: "Forest",
        description: "Natural green tones",
        preview: "linear-gradient(135deg, hsl(140, 60%, 45%), hsl(85, 50%, 50%))",
    },
    {
        id: "neon",
        name: "Neon",
        description: "Tokyo-style hot pink and purple",
        preview: "linear-gradient(135deg, hsl(330, 100%, 65%), hsl(280, 100%, 70%))",
    },
    {
        id: "arctic",
        name: "Arctic",
        description: "Icy blue and white",
        preview: "linear-gradient(135deg, hsl(190, 70%, 75%), hsl(200, 60%, 85%))",
    },
    {
        id: "volcano",
        name: "Volcano",
        description: "Fiery red and molten orange",
        preview: "linear-gradient(135deg, hsl(10, 90%, 55%), hsl(35, 95%, 50%))",
    },
    {
        id: "vintage",
        name: "Vintage",
        description: "Warm retro gold and brown",
        preview: "linear-gradient(135deg, hsl(35, 70%, 55%), hsl(20, 60%, 50%))",
    },
];

export default function PresetSelector() {
    const { loadPreset, theme } = useTheme();

    // Determine current preset by comparing colors
    const getCurrentPreset = () => {
        const currentPrimary = theme.colors.primary;
        if (currentPrimary.h === 180 && currentPrimary.s === 100 && currentPrimary.l === 50) return "default";
        if (currentPrimary.h === 320) return "cyberpunk";
        if (currentPrimary.h === 210 && currentPrimary.s === 80) return "professional";
        if (currentPrimary.h === 0 && currentPrimary.s === 0) return "minimal";
        if (currentPrimary.h === 30) return "sunset";
        if (currentPrimary.h === 195) return "ocean";
        if (currentPrimary.h === 270) return "midnight";
        if (currentPrimary.h === 140) return "forest";
        if (currentPrimary.h === 330) return "neon";
        if (currentPrimary.h === 190 && currentPrimary.l === 75) return "arctic";
        if (currentPrimary.h === 10) return "volcano";
        if (currentPrimary.h === 35) return "vintage";
        return null;
    };

    const currentPreset = getCurrentPreset();

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-bold text-white mb-4">Theme Presets</h3>
                <p className="text-sm text-gray-400 mb-6">
                    Quick-load professionally designed color schemes
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {PRESETS.map((preset) => (
                    <button
                        key={preset.id}
                        onClick={() => loadPreset(preset.id)}
                        className={`relative p-3 md:p-4 rounded-lg border-2 transition-all duration-300 text-left ${currentPreset === preset.id
                            ? "border-primary bg-primary/10"
                            : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10"
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            {/* Color Preview */}
                            <div
                                className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 rounded-lg border border-white/20 flex-shrink-0"
                                style={{ background: preset.preview }}
                            />

                            {/* Info */}
                            <div className="flex-1">
                                <h4 className="text-white font-semibold mb-1">{preset.name}</h4>
                                <p className="text-sm text-gray-400">{preset.description}</p>
                            </div>

                            {/* Active Indicator */}
                            {currentPreset === preset.id && (
                                <div className="flex-shrink-0">
                                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                                        <Check className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </button>
                ))}
            </div>

            <div className="pt-4 border-t border-white/10">
                <p className="text-xs text-gray-500">
                    💡 Tip: Select a preset then customize individual colors, fonts, and effects to create your unique theme
                </p>
            </div>
        </div>
    );
}
