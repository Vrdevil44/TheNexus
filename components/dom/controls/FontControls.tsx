"use client";

import { useTheme } from "@/lib/contexts/ThemeContext";
import { Shuffle } from "lucide-react";
import { generateRandomFonts } from "@/lib/utils/randomizer";
import CollapsibleSection from "@/components/ui/CollapsibleSection";

export default function FontControls() {
    const { theme, updateFonts, updateColors } = useTheme();

    const fontOptions = [
        "Inter",
        "Space Grotesk",
        "Montserrat",
        "Outfit",
        "Playfair Display",
        "Work Sans",
        "Roboto",
        "Open Sans",
        "Poppins",
        "Lato",
        "Lobster",
        "Pacifico",
        "Righteous",
        "Fredoka One",
        "Bangers",
        "Abril Fatface",
        "Cormorant Garamond",
        "Cinzel",
        "Great Vibes",
        "Orbitron",
        "Rajdhani",
        "Syncopate",
        "Bebas Neue",
        "Source Sans Pro"
    ];

    const monoFonts = [
        "JetBrains Mono",
        "Fira Code",
        "Source Code Pro",
        "IBM Plex Mono",
        "Inconsolata",
        "Cascadia Code",
        "Space Mono",
        "Courier Prime"
    ];

    const generateRandomFontsHandler = () => {
        const randomFonts = generateRandomFonts(theme.fonts);
        updateFonts(randomFonts);
    };

    // Helper to convert rem to pt (approximate for display)
    const remToPt = (rem: string) => Math.round(parseFloat(rem) * 16);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-white mb-1">Typography</h3>
                    <p className="text-xs text-gray-400">Choose fonts, sizes, and colors</p>
                </div>
                <button
                    onClick={generateRandomFontsHandler}
                    className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-primary to-secondary rounded-lg text-white text-xs font-medium hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 group"
                    title="Generate random font pairing"
                >
                    <Shuffle className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
                    Randomize
                </button>
            </div>

            {/* Font Family Section */}
            <CollapsibleSection title="Font Families" defaultOpen={true}>
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-300 mb-2">
                            Heading Font
                        </label>
                        <select
                            value={theme.fonts.heading}
                            onChange={(e) => updateFonts({ heading: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-800 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer [&>option]:bg-gray-800 [&>option]:text-white [&>option:checked]:bg-primary [&>option:hover]:bg-primary/20"
                            style={{ fontFamily: theme.fonts.heading }}
                        >
                            {fontOptions.map((font) => (
                                <option key={font} value={font} style={{ fontFamily: font }}>
                                    {font}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-300 mb-2">
                            Body Font
                        </label>
                        <select
                            value={theme.fonts.body}
                            onChange={(e) => updateFonts({ body: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-800 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer [&>option]:bg-gray-800 [&>option]:text-white [&>option:checked]:bg-primary [&>option:hover]:bg-primary/20"
                            style={{ fontFamily: theme.fonts.body }}
                        >
                            {fontOptions.map((font) => (
                                <option key={font} value={font} style={{ fontFamily: font }}>
                                    {font}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-300 mb-2">
                            Mono / Code Font
                        </label>
                        <select
                            value={theme.fonts.mono}
                            onChange={(e) => updateFonts({ mono: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-800 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer [&>option]:bg-gray-800 [&>option]:text-white [&>option:checked]:bg-primary [&>option:hover]:bg-primary/20"
                            style={{ fontFamily: theme.fonts.mono }}
                        >
                            {monoFonts.map((font) => (
                                <option key={font} value={font} style={{ fontFamily: font }}>
                                    {font}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </CollapsibleSection>

            {/* Font Sizes Section */}
            <CollapsibleSection title="Font Sizes">
                <div className="space-y-6">
                    {[
                        { label: "Heading 1", key: "h1", min: "2", max: "8", step: "0.25", font: theme.fonts.heading },
                        { label: "Heading 2", key: "h2", min: "1.5", max: "6", step: "0.25", font: theme.fonts.heading },
                        { label: "Body Text", key: "body", min: "0.75", max: "2", step: "0.125", font: theme.fonts.body },
                        { label: "Small Text", key: "small", min: "0.5", max: "1.5", step: "0.125", font: theme.fonts.body },
                    ].map(({ label, key, min, max, step, font }) => (
                        <div key={key}>
                            <div className="flex justify-between items-end mb-2">
                                <span
                                    className="text-sm text-gray-300 leading-none transition-all duration-300"
                                    style={{ fontFamily: font }}
                                >
                                    {label}
                                </span>
                                <span className="text-xs text-gray-500 font-mono mb-0.5">
                                    {remToPt(theme.fonts.sizes[key as keyof typeof theme.fonts.sizes])} pt
                                </span>
                            </div>
                            <input
                                type="range"
                                min={min}
                                max={max}
                                step={step}
                                value={parseFloat(theme.fonts.sizes[key as keyof typeof theme.fonts.sizes])}
                                onChange={(e) =>
                                    updateFonts({
                                        sizes: {
                                            ...theme.fonts.sizes,
                                            [key]: `${e.target.value}rem`,
                                        },
                                    })
                                }
                                className="w-full accent-primary cursor-pointer"
                            />
                        </div>
                    ))}
                </div>
            </CollapsibleSection>

            {/* Text Colors Section */}
            <CollapsibleSection title="Text Colors">
                <div className="space-y-5">
                    <div>
                        <label className="block text-xs font-medium text-gray-300 mb-2">
                            White Text (Headings)
                        </label>
                        <div className="flex gap-2 items-center">
                            <input
                                type="color"
                                value={theme.colors.text.white}
                                onChange={(e) => updateColors({
                                    text: {
                                        ...theme.colors.text,
                                        white: e.target.value
                                    }
                                })}
                                className="w-10 h-10 rounded border border-white/20 cursor-pointer"
                            />
                            <span className="text-xs text-gray-400 font-mono">
                                {theme.colors.text.white}
                            </span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-300 mb-2">
                            Gray 300 (Body Text)
                        </label>
                        <div className="flex gap-2 items-center">
                            <input
                                type="color"
                                value={theme.colors.text.gray300}
                                onChange={(e) => updateColors({
                                    text: {
                                        ...theme.colors.text,
                                        gray300: e.target.value
                                    }
                                })}
                                className="w-10 h-10 rounded border border-white/20 cursor-pointer"
                            />
                            <span className="text-xs text-gray-400 font-mono">
                                {theme.colors.text.gray300}
                            </span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-300 mb-2">
                            Gray 400 (Secondary Text)
                        </label>
                        <div className="flex gap-2 items-center">
                            <input
                                type="color"
                                value={theme.colors.text.gray400}
                                onChange={(e) => updateColors({
                                    text: {
                                        ...theme.colors.text,
                                        gray400: e.target.value
                                    }
                                })}
                                className="w-10 h-10 rounded border border-white/20 cursor-pointer"
                            />
                            <span className="text-xs text-gray-400 font-mono">
                                {theme.colors.text.gray400}
                            </span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-300 mb-2">
                            Gray 500 (Tertiary Text)
                        </label>
                        <div className="flex gap-2 items-center">
                            <input
                                type="color"
                                value={theme.colors.text.gray500}
                                onChange={(e) => updateColors({
                                    text: {
                                        ...theme.colors.text,
                                        gray500: e.target.value
                                    }
                                })}
                                className="w-10 h-10 rounded border border-white/20 cursor-pointer"
                            />
                            <span className="text-xs text-gray-400 font-mono">
                                {theme.colors.text.gray500}
                            </span>
                        </div>
                    </div>
                </div>
            </CollapsibleSection>

            {/* Preview */}
            <div className="pt-4 border-t border-white/10">
                <p className="text-sm font-medium text-gray-300 mb-4">Real-time Preview</p>
                <div className="space-y-4 p-4 rounded-lg border border-white/10 bg-black/20 backdrop-blur-sm">
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Heading 1</p>
                        <div
                            style={{
                                fontFamily: theme.fonts.heading,
                                fontSize: theme.fonts.sizes.h1,
                                color: 'var(--text-white)',
                                lineHeight: 1.2
                            }}
                            className="truncate"
                        >
                            {theme.fonts.heading}
                        </div>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Heading 2</p>
                        <div
                            style={{
                                fontFamily: theme.fonts.heading,
                                fontSize: theme.fonts.sizes.h2,
                                color: 'var(--text-white)',
                                lineHeight: 1.2
                            }}
                            className="truncate"
                        >
                            The quick brown fox
                        </div>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Body Text</p>
                        <div
                            style={{
                                fontFamily: theme.fonts.body,
                                fontSize: theme.fonts.sizes.body,
                                color: 'var(--text-gray-300)',
                                lineHeight: 1.5
                            }}
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. {theme.fonts.body} is selected.
                        </div>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Mono / Code</p>
                        <div
                            style={{
                                fontFamily: theme.fonts.mono,
                                fontSize: theme.fonts.sizes.small,
                                color: 'var(--text-gray-400)'
                            }}
                        >
                            const font = "{theme.fonts.mono}";
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
