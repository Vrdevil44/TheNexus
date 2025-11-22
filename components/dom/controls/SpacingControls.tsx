"use client";

import { useState } from "react";
import { useTheme } from "@/lib/contexts/ThemeContext";
import { Shuffle, Smartphone, Monitor } from "lucide-react";

export default function SpacingControls() {
    const { theme, updateSpacing } = useTheme();
    const [isMobile, setIsMobile] = useState(true);

    const generateRandomSpacing = () => {
        updateSpacing({
            section: `${(Math.random() * 4 + 2).toFixed(1)}rem`,
            sectionMd: `${(Math.random() * 6 + 4).toFixed(1)}rem`,
            card: `${(Math.random() * 2 + 1).toFixed(1)}rem`,
            cardMd: `${(Math.random() * 2.5 + 1.5).toFixed(1)}rem`,
            gap: `${(Math.random() * 2 + 0.5).toFixed(1)}rem`
        });
    };

    const SpacingSlider = ({
        label,
        mobileProp,
        desktopProp,
        min = "1",
        max = "15",
        description,
    }: {
        label: string;
        mobileProp: keyof typeof theme.spacing;
        desktopProp: keyof typeof theme.spacing;
        min?: string;
        max?: string;
        description?: string;
    }) => {
        const currentProp = isMobile ? mobileProp : desktopProp;
        const value = theme.spacing[currentProp];

        const handleChange = (newValue: string) => {
            updateSpacing({ [currentProp]: newValue });
        };

        return (
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
                <div className="flex items-center gap-3">
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step="0.25"
                        value={parseFloat(value)}
                        onChange={(e) => handleChange(`${e.target.value}rem`)}
                        className="flex-1"
                    />
                    <span className="text-sm text-white font-mono w-20 text-right">{value}</span>
                </div>
                {description && <p className="text-xs text-gray-500 mt-2">{description}</p>}
            </div>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-white mb-1">Spacing</h3>
                    <p className="text-xs text-gray-400">Adjust padding, margins, and gaps</p>
                </div>
                <button
                    onClick={generateRandomSpacing}
                    className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-primary to-secondary rounded-lg text-white text-xs font-medium hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 group"
                    title="Generate random spacing"
                >
                    <Shuffle className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
                    Randomize
                </button>
            </div>

            {/* Mobile/Desktop Toggle */}
            <div className="flex items-center justify-center gap-2 p-1 bg-white/5 rounded-lg border border-white/10">
                <button
                    onClick={() => setIsMobile(true)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${isMobile
                            ? 'bg-primary text-white shadow-lg'
                            : 'text-gray-400 hover:text-white'
                        }`}
                >
                    <Smartphone className="w-4 h-4" />
                    <span className="text-sm font-medium">Mobile</span>
                </button>
                <button
                    onClick={() => setIsMobile(false)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${!isMobile
                            ? 'bg-primary text-white shadow-lg'
                            : 'text-gray-400 hover:text-white'
                        }`}
                >
                    <Monitor className="w-4 h-4" />
                    <span className="text-sm font-medium">Desktop</span>
                </button>
            </div>

            <div>
                <h4 className="text-md font-semibold text-white mb-4">Section Padding</h4>
                <SpacingSlider
                    label={isMobile ? "Mobile Padding" : "Desktop Padding"}
                    mobileProp="section"
                    desktopProp="sectionMd"
                    min={isMobile ? "2" : "5"}
                    max={isMobile ? "10" : "15"}
                    description={`Vertical padding for sections on ${isMobile ? 'mobile' : 'desktop'}`}
                />
            </div>

            <div className="pt-4 border-t border-white/10">
                <h4 className="text-md font-semibold text-white mb-4">Card Padding</h4>
                <SpacingSlider
                    label={isMobile ? "Mobile Padding" : "Desktop Padding"}
                    mobileProp="card"
                    desktopProp="cardMd"
                    min={isMobile ? "1" : "1.5"}
                    max={isMobile ? "4" : "5"}
                    description={`Padding inside cards on ${isMobile ? 'mobile' : 'desktop'}`}
                />
            </div>

            <div className="pt-4 border-t border-white/10">
                <h4 className="text-md font-semibold text-white mb-4">Layout</h4>
                <SpacingSlider
                    label="Gap Size"
                    mobileProp="gap"
                    desktopProp="gap"
                    min="0.5"
                    max="5"
                    description="Space between grid items and elements"
                />
            </div>
        </div>
    );
}
