"use client";

import { useTheme } from "@/lib/contexts/ThemeContext";
import { Shuffle, AlertTriangle, CheckCircle } from "lucide-react";
import { getContrastRatio, meetsWCAG } from "@/lib/utils/contrast";

export default function ColorControls() {
    const { theme, updateColors } = useTheme();

    // Convert HSL to RGB for color picker
    const hslToRgb = (h: number, s: number, l: number): string => {
        s /= 100;
        l /= 100;
        const k = (n: number) => (n + h / 30) % 12;
        const a = s * Math.min(l, 1 - l);
        const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
        const r = Math.round(255 * f(0));
        const g = Math.round(255 * f(8));
        const b = Math.round(255 * f(4));
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    };

    // Convert RGB hex to HSL
    const rgbToHsl = (hex: string): { h: number; s: number; l: number } => {
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = 0, s, l = (max + min) / 2;

        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch (max) {
                case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                case g: h = ((b - r) / d + 2) / 6; break;
                case b: h = ((r - g) / d + 4) / 6; break;
            }
        } else {
            s = 0;
        }

        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    };

    // Smart random theme generation
    const generateRandomTheme = () => {
        // Curated palettes for better results
        const palettes = [
            { name: "Cyberpunk", primary: { h: 320, s: 100, l: 50 }, secondary: { h: 180, s: 100, l: 50 } },
            { name: "Sunset", primary: { h: 30, s: 100, l: 60 }, secondary: { h: 280, s: 60, l: 50 } },
            { name: "Forest", primary: { h: 140, s: 60, l: 45 }, secondary: { h: 80, s: 70, l: 40 } },
            { name: "Ocean", primary: { h: 200, s: 80, l: 50 }, secondary: { h: 170, s: 70, l: 45 } },
            { name: "Lavender", primary: { h: 260, s: 70, l: 65 }, secondary: { h: 290, s: 60, l: 60 } },
            { name: "Slate", primary: { h: 210, s: 20, l: 70 }, secondary: { h: 210, s: 10, l: 50 } },
            { name: "Gold", primary: { h: 45, s: 90, l: 50 }, secondary: { h: 15, s: 80, l: 40 } },
        ];

        // 30% chance to pick a curated palette
        if (Math.random() < 0.3) {
            const palette = palettes[Math.floor(Math.random() * palettes.length)];
            updateColors({
                primary: palette.primary,
                secondary: palette.secondary
            });
            return;
        }

        // Generate harmonious color combinations
        const baseHue = Math.floor(Math.random() * 360);

        // Complementary or analogous scheme
        const isComplementary = Math.random() > 0.5;
        const secondaryHue = isComplementary
            ? (baseHue + 180) % 360
            : (baseHue + 30 + Math.random() * 60) % 360;

        // Generate vibrant primary, moderate secondary
        const primary = {
            h: baseHue,
            s: 80 + Math.random() * 20, // 80-100%
            l: 45 + Math.random() * 15   // 45-60%
        };

        const secondary = {
            h: secondaryHue,
            s: 70 + Math.random() * 30,  // 70-100%
            l: 50 + Math.random() * 15   // 50-65%
        };

        updateColors({
            primary,
            secondary
        });
    };

    // Check contrast for text readability
    const checkContrast = () => {
        const whiteOnPrimary = getContrastRatio({ h: 0, s: 0, l: 100 }, theme.colors.primary);
        const whiteOnSecondary = getContrastRatio({ h: 0, s: 0, l: 100 }, theme.colors.secondary);

        return {
            whiteOnPrimary: { ratio: whiteOnPrimary, accessible: meetsWCAG(whiteOnPrimary, 'AA', false) },
            whiteOnSecondary: { ratio: whiteOnSecondary, accessible: meetsWCAG(whiteOnSecondary, 'AA', false) },
        };
    };

    const contrastResults = checkContrast();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-white mb-1">Colors</h3>
                    <p className="text-xs text-gray-400">Customize your color palette</p>
                </div>
                <button
                    onClick={generateRandomTheme}
                    className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-primary to-secondary rounded-lg text-white text-xs font-medium hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 group"
                >
                    <Shuffle className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
                    Randomize
                </button>
            </div>

            {/* Compact Color Pickers */}
            <div className="grid grid-cols-2 gap-4">
                {/* Primary Color */}
                <div>
                    <label className="block text-xs font-medium text-gray-300 mb-2">
                        Primary
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="color"
                            value={hslToRgb(theme.colors.primary.h, theme.colors.primary.s, theme.colors.primary.l)}
                            onChange={(e) => {
                                const hsl = rgbToHsl(e.target.value);
                                updateColors({ primary: hsl });
                            }}
                            className="w-12 h-12 rounded-lg border border-white/20 cursor-pointer p-0 bg-transparent"
                        />
                        <div className="flex-1 flex flex-col justify-center text-xs text-gray-400">
                            <span>HEX: {hslToRgb(theme.colors.primary.h, theme.colors.primary.s, theme.colors.primary.l)}</span>
                            <span>HSL: {Math.round(theme.colors.primary.h)}, {Math.round(theme.colors.primary.s)}%, {Math.round(theme.colors.primary.l)}%</span>
                        </div>
                    </div>
                </div>

                {/* Secondary Color */}
                <div>
                    <label className="block text-xs font-medium text-gray-300 mb-2">
                        Secondary
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="color"
                            value={hslToRgb(theme.colors.secondary.h, theme.colors.secondary.s, theme.colors.secondary.l)}
                            onChange={(e) => {
                                const hsl = rgbToHsl(e.target.value);
                                updateColors({ secondary: hsl });
                            }}
                            className="w-12 h-12 rounded-lg border border-white/20 cursor-pointer p-0 bg-transparent"
                        />
                        <div className="flex-1 flex flex-col justify-center text-xs text-gray-400">
                            <span>HEX: {hslToRgb(theme.colors.secondary.h, theme.colors.secondary.s, theme.colors.secondary.l)}</span>
                            <span>HSL: {Math.round(theme.colors.secondary.h)}, {Math.round(theme.colors.secondary.s)}%, {Math.round(theme.colors.secondary.l)}%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Color Preview */}
            <div className="mt-6 p-4 rounded-lg border border-white/10 bg-white/5">
                <p className="text-xs text-gray-400 mb-3">Preview</p>
                <div className="space-y-2">
                    <div
                        className="h-8 rounded flex items-center justify-center text-white text-xs font-medium"
                        style={{ backgroundColor: `hsl(${theme.colors.primary.h}, ${theme.colors.primary.s}%, ${theme.colors.primary.l}%)` }}
                    >
                        Primary
                    </div>
                    <div
                        className="h-8 rounded flex items-center justify-center text-white text-xs font-medium"
                        style={{ backgroundColor: `hsl(${theme.colors.secondary.h}, ${theme.colors.secondary.s}%, ${theme.colors.secondary.l}%)` }}
                    >
                        Secondary
                    </div>
                </div>
            </div>

            {/* Contrast Checking */}
            <div className="mt-6 p-4 rounded-lg border border-white/10 bg-white/5">
                <p className="text-xs text-gray-400 mb-3 font-semibold">Contrast Checking (WCAG AA)</p>
                <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-300">White on Primary</span>
                        <div className="flex items-center gap-2">
                            <span className="font-mono text-gray-400">{contrastResults.whiteOnPrimary.ratio.toFixed(2)}:1</span>
                            {contrastResults.whiteOnPrimary.accessible ? (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                            )}
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-300">White on Secondary</span>
                        <div className="flex items-center gap-2">
                            <span className="font-mono text-gray-400">{contrastResults.whiteOnSecondary.ratio.toFixed(2)}:1</span>
                            {contrastResults.whiteOnSecondary.accessible ? (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                            )}
                        </div>
                    </div>
                    <p className="text-gray-500 mt-3 text-[10px]">
                        {!contrastResults.whiteOnPrimary.accessible || !contrastResults.whiteOnSecondary.accessible ? (
                            <><AlertTriangle className="w-3 h-3 inline mr-1" />Some combinations may be hard to read. Aim for 4.5:1 ratio.</>
                        ) : (
                            <><CheckCircle className="w-3 h-3 inline mr-1" />All combinations meet WCAG AA standards!</>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}
