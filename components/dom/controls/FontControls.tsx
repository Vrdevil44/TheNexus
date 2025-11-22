"use client";

import { useTheme } from "@/lib/contexts/ThemeContext";
import { Shuffle } from "lucide-react";

export default function FontControls() {
    const { theme, updateFonts } = useTheme();

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

    // Smart font pairing combinations
    const fontPairs = [
        { heading: "Space Grotesk", body: "Inter" },
        { heading: "Montserrat", body: "Open Sans" },
        { heading: "Playfair Display", body: "Lato" },
        { heading: "Outfit", body: "Work Sans" },
        { heading: "Poppins", body: "Roboto" },
        { heading: "Inter", body: "Inter" },
        { heading: "Space Grotesk", body: "Space Grotesk" },
        { heading: "Abril Fatface", body: "Lato" },
        { heading: "Righteous", body: "Roboto" },
        { heading: "Cinzel", body: "Cormorant Garamond" },
        { heading: "Orbitron", body: "Rajdhani" },
        { heading: "Lobster", body: "Open Sans" },
        { heading: "Pacifico", body: "Work Sans" },
        { heading: "Bangers", body: "Montserrat" },
        { heading: "Great Vibes", body: "Playfair Display" },
        { heading: "Syncopate", body: "Space Grotesk" },
    ];

    const generateRandomFonts = () => {
        const pair = fontPairs[Math.floor(Math.random() * fontPairs.length)];
        const mono = monoFonts[Math.floor(Math.random() * monoFonts.length)];

        updateFonts({
            heading: pair.heading,
            body: pair.body,
            mono: mono
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-white mb-1">Typography</h3>
                    <p className="text-xs text-gray-400">Choose fonts and sizes</p>
                </div>
                <button
                    onClick={generateRandomFonts}
                    className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-primary to-secondary rounded-lg text-white text-xs font-medium hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 group"
                    title="Generate random font pairing"
                >
                    <Shuffle className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
                    Randomize
                </button>
            </div>

            {/* Font Family Selection */}
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
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
                    <label className="block text-sm font-medium text-gray-300 mb-2">
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
            </div>

            {/* Font Size Controls */}
            <div className="pt-4 border-t border-white/10">
                <p className="text-sm font-medium text-gray-300 mb-4">Font Sizes</p>
                <div className="space-y-3">
                    {[
                        { label: "H1", key: "h1", min: "2", max: "8", step: "0.25" },
                        { label: "H2", key: "h2", min: "1.5", max: "6", step: "0.25" },
                        { label: "H3", key: "h3", min: "1.25", max: "4", step: "0.25" },
                        { label: "H4", key: "h4", min: "1", max: "3", step: "0.25" },
                        { label: "Body", key: "body", min: "0.75", max: "2", step: "0.125" },
                        { label: "Small", key: "small", min: "0.5", max: "1.5", step: "0.125" },
                    ].map(({ label, key, min, max, step }) => (
                        <div key={key}>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-gray-400">{label}</span>
                                <span className="text-white font-mono">
                                    {theme.fonts.sizes[key as keyof typeof theme.fonts.sizes]}
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
                                className="w-full"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Preview */}
            <div className="pt-4 border-t border-white/10">
                <p className="text-sm font-medium text-gray-300 mb-3">Preview</p>
                <div className="space-y-2">
                    <div style={{ fontFamily: theme.fonts.heading }} className="text-white">
                        <span className="text-2xl font-bold">Heading</span> - {theme.fonts.heading}
                    </div>
                    <div style={{ fontFamily: theme.fonts.body }} className="text-gray-300">
                        <span className="text-base">Body text</span> - {theme.fonts.body}
                    </div>
                    <div style={{ fontFamily: theme.fonts.mono }} className="text-gray-400">
                        <span className="text-sm">Code text</span> - {theme.fonts.mono}
                    </div>
                </div>
            </div>
        </div>
    );
}
