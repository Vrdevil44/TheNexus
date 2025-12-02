"use client";

import { useTheme } from "@/lib/contexts/ThemeContext";
import { Shuffle } from "lucide-react";
import CollapsibleSection from "@/components/ui/CollapsibleSection";

export default function EffectsControls() {
    const { theme, updateEffects } = useTheme();

    // Provide default values for new properties to handle old saved themes
    const borderColor = theme.effects.borderColor || { h: 0, s: 0, l: 100 };
    const shadowColor = theme.effects.shadowColor || { h: 0, s: 0, l: 0 };
    const cardColor = theme.effects.cardColor || { h: 0, s: 0, l: 100 };
    const borderWidth = theme.effects.borderWidth || "1px";
    const cardOpacity = theme.effects.cardOpacity ?? 0.1;
    const glowIntensity = theme.effects.glowIntensity ?? 0;
    const saturate = theme.effects.saturate ?? 1;
    const brightness = theme.effects.brightness ?? 1;

    const generateRandomEffects = () => {
        updateEffects({
            borderRadius: `${Math.floor(Math.random() * 12) * 0.25}rem`,
            borderWidth: `${Math.floor(Math.random() * 4) + 1}px`,
            borderColor: {
                h: Math.floor(Math.random() * 360),
                s: Math.floor(Math.random() * 60) + 40,
                l: Math.floor(Math.random() * 40) + 40
            },
            blur: `${Math.floor(Math.random() * 20)}px`,
            shadowEnabled: Math.random() > 0.3,
            shadowIntensity: parseFloat((Math.random() * 0.8).toFixed(2)),
            shadowColor: {
                h: Math.floor(Math.random() * 360),
                s: Math.floor(Math.random() * 50) + 30,
                l: Math.floor(Math.random() * 40) + 10
            },
            cardColor: { h: Math.floor(Math.random() * 360), s: Math.floor(Math.random() * 30), l: Math.floor(Math.random() * 10) + 90 },
            cardOpacity: parseFloat((Math.random() * 0.15 + 0.05).toFixed(2)),
            glowEnabled: Math.random() > 0.5,
            glowIntensity: parseFloat((Math.random() * 0.5).toFixed(2)),
            saturate: parseFloat((Math.random() * 1 + 0.5).toFixed(2)),
            brightness: parseFloat((Math.random() * 0.5 + 0.75).toFixed(2)),
            animationSpeed: parseFloat((Math.random() * 1.5 + 0.5).toFixed(1))
        });
    };

    const hslToHex = (h: number, s: number, l: number) => {
        l /= 100;
        const a = (s * Math.min(l, 1 - l)) / 100;
        const f = (n: number) => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color)
                .toString(16)
                .padStart(2, "0");
        };
        return `#${f(0)}${f(8)}${f(4)}`;
    };

    const hexToHSL = (hex: string) => {
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = 0,
            s = 0,
            l = (max + min) / 2;
        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
            else if (max === g) h = ((b - r) / d + 2) / 6;
            else h = ((r - g) / d + 4) / 6;
        }
        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    };

    const EffectSlider = ({
        label,
        value,
        onChange,
        min,
        max,
        step = "0.1",
        unit = "",
        description,
        disabled = false
    }: {
        label: string;
        value: number | string;
        onChange: (value: any) => void;
        min: string;
        max: string;
        step?: string;
        unit?: string;
        description?: string;
        disabled?: boolean;
    }) => (
        <div className={`mb-5 ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
            <label className="block text-xs font-medium text-gray-300 mb-1.5">{label}</label>
            <div className="flex items-center gap-3">
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={typeof value === "string" ? parseFloat(value) : value}
                    onChange={(e) => onChange(parseFloat(e.target.value))}
                    className="flex-1"
                    disabled={disabled}
                />
                <span className="text-xs text-white font-mono w-16 text-right">
                    {typeof value === "string" ? value : value.toFixed(step === "1" ? 0 : step === "0.01" ? 2 : 1)}
                    {unit}
                </span>
            </div>
            {description && <p className="text-[10px] text-gray-500 mt-1">{description}</p>}
        </div>
    );

    const ColorPicker = ({
        label,
        color,
        onChange,
        disabled = false
    }: {
        label: string;
        color: { h: number; s: number; l: number };
        onChange: (color: { h: number; s: number; l: number }) => void;
        disabled?: boolean;
    }) => (
        <div className={`mb-5 ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
            <label className="block text-xs font-medium text-gray-300 mb-1.5">{label}</label>
            <div className="flex gap-2 items-center">
                <input
                    type="color"
                    value={hslToHex(color.h, color.s, color.l)}
                    onChange={(e) => onChange(hexToHSL(e.target.value))}
                    className="w-10 h-10 rounded border border-white/20 cursor-pointer"
                    disabled={disabled}
                />
                <span className="text-[10px] text-gray-400 font-mono">
                    {hslToHex(color.h, color.s, color.l)}
                </span>
            </div>
        </div>
    );

    const Toggle = ({
        label,
        checked,
        onChange,
        description
    }: {
        label: string;
        checked: boolean;
        onChange: (checked: boolean) => void;
        description?: string;
    }) => (
        <div className="mb-5 flex items-center justify-between">
            <div>
                <label className="block text-xs font-medium text-gray-300">{label}</label>
                {description && <p className="text-[10px] text-gray-500 mt-0.5">{description}</p>}
            </div>
            <button
                onClick={() => onChange(!checked)}
                className={`w-10 h-5 rounded-full relative transition-colors duration-200 ${checked ? 'bg-primary' : 'bg-white/10'}`}
            >
                <div className={`absolute top-1 left-1 w-3 h-3 rounded-full bg-white transition-transform duration-200 ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-white mb-1">Visual Effects</h3>
                    <p className="text-xs text-gray-400">Customize all visual properties</p>
                </div>
                <button
                    onClick={generateRandomEffects}
                    className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-primary to-secondary rounded-lg text-white text-xs font-medium hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 group"
                    title="Generate random effects"
                >
                    <Shuffle className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
                    Randomize
                </button>
            </div>

            {/* Cards Section */}
            <CollapsibleSection title="Cards & Tiles" defaultOpen={true}>
                <ColorPicker
                    label="Card Shade"
                    color={cardColor}
                    onChange={(color) => updateEffects({ cardColor: color })}
                />
                <EffectSlider
                    label="Background Opacity"
                    value={cardOpacity}
                    onChange={(value: number) => updateEffects({ cardOpacity: value })}
                    min="0"
                    max="0.5"
                    step="0.01"
                    description="Transparency of the glass effect"
                />
                <EffectSlider
                    label="Component Blur"
                    value={parseFloat(theme.effects.componentBlur || "12")}
                    onChange={(value: number) => updateEffects({ componentBlur: `${value}px` })}
                    min="0"
                    max="30"
                    step="1"
                    unit="px"
                    description="Blur for cards and navbar"
                />
            </CollapsibleSection>

            {/* Borders Section */}
            <CollapsibleSection title="Borders">
                <EffectSlider
                    label="Border Radius"
                    value={parseFloat(theme.effects.borderRadius)}
                    onChange={(value: number) => updateEffects({ borderRadius: `${value}rem` })}
                    min="0"
                    max="3"
                    step="0.125"
                    unit="rem"
                    description="Roundness of cards and buttons"
                />
                <EffectSlider
                    label="Border Width"
                    value={parseFloat(borderWidth)}
                    onChange={(value: number) => updateEffects({ borderWidth: `${value}px` })}
                    min="0"
                    max="5"
                    step="1"
                    unit="px"
                    description="Thickness of borders"
                />
                <ColorPicker
                    label="Border Color"
                    color={borderColor}
                    onChange={(color) => updateEffects({ borderColor: color })}
                />
                <div className="mb-5">
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">Navbar Shape</label>
                    <div className="grid grid-cols-3 gap-2">
                        {['rounded', 'boxy', 'beveled'].map((shape) => (
                            <button
                                key={shape}
                                onClick={() => updateEffects({ navShape: shape as any })}
                                className={`px-2 py-1.5 text-[10px] border rounded transition-colors ${theme.effects.navShape === shape
                                    ? 'bg-primary text-white border-primary'
                                    : 'bg-transparent text-gray-400 border-white/20 hover:border-white/40'
                                    }`}
                            >
                                {shape.charAt(0).toUpperCase() + shape.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </CollapsibleSection>

            {/* Shadows & Glow Section */}
            <CollapsibleSection title="Shadows & Glow">
                <Toggle
                    label="Enable Shadows"
                    checked={theme.effects.shadowEnabled ?? true}
                    onChange={(checked) => updateEffects({ shadowEnabled: checked })}
                />
                <EffectSlider
                    label="Shadow Intensity"
                    value={theme.effects.shadowIntensity}
                    onChange={(value: number) => updateEffects({ shadowIntensity: value })}
                    min="0"
                    max="1"
                    step="0.05"
                    description="Strength of drop shadows"
                    disabled={!theme.effects.shadowEnabled}
                />
                <ColorPicker
                    label="Shadow Color"
                    color={shadowColor}
                    onChange={(color) => updateEffects({ shadowColor: color })}
                    disabled={!theme.effects.shadowEnabled}
                />

                <div className="my-4 border-t border-white/5" />

                <Toggle
                    label="Enable Glow"
                    checked={theme.effects.glowEnabled ?? true}
                    onChange={(checked) => updateEffects({ glowEnabled: checked })}
                />
                <EffectSlider
                    label="Glow Intensity"
                    value={glowIntensity}
                    onChange={(value: number) => updateEffects({ glowIntensity: value })}
                    min="0"
                    max="1"
                    step="0.05"
                    description="Halo/glow effect around cards"
                    disabled={!theme.effects.glowEnabled}
                />
            </CollapsibleSection>

            {/* Filters Section */}
            <CollapsibleSection title="Global Filters">
                <EffectSlider
                    label="Saturation"
                    value={saturate}
                    onChange={(value: number) => updateEffects({ saturate: value })}
                    min="0"
                    max="2"
                    step="0.1"
                    unit="x"
                    description="Color vibrancy"
                />
                <EffectSlider
                    label="Brightness"
                    value={brightness}
                    onChange={(value: number) => updateEffects({ brightness: value })}
                    min="0.5"
                    max="1.5"
                    step="0.05"
                    unit="x"
                    description="Overall lightness"
                />
                <EffectSlider
                    label="Animation Speed"
                    value={theme.effects.animationSpeed}
                    onChange={(value: number) => updateEffects({ animationSpeed: value })}
                    min="0.5"
                    max="2"
                    step="0.1"
                    unit="x"
                    description="Global animation multiplier"
                />
            </CollapsibleSection>

            {/* Visual Preview */}
            <div className="pt-4 border-t border-white/10">
                <h4 className="text-sm font-semibold text-white mb-3">Preview</h4>
                <div
                    className="p-6 transition-all duration-300 relative"
                    style={{
                        borderRadius: theme.effects.borderRadius,
                        borderWidth: borderWidth,
                        borderColor: `hsl(${borderColor.h} ${borderColor.s}% ${borderColor.l}%)`,
                        borderStyle: "solid",
                        backdropFilter: `blur(${theme.effects.blur}) saturate(${saturate}) brightness(${brightness})`,
                        boxShadow: [
                            theme.effects.shadowEnabled ? `0 10px 30px hsl(${shadowColor.h} ${shadowColor.s}% ${shadowColor.l}% / ${theme.effects.shadowIntensity})` : null,
                            theme.effects.glowEnabled ? `0 0 ${glowIntensity * 40}px hsl(${borderColor.h} ${borderColor.s}% ${borderColor.l}% / ${glowIntensity})` : null
                        ].filter(Boolean).join(', '),
                        backgroundColor: `hsla(${cardColor.h}, ${cardColor.s}%, ${cardColor.l}%, ${cardOpacity})`,
                    }}
                >
                    <p className="text-white text-sm font-medium">
                        Preview Card
                    </p>
                    <p className="text-white/70 text-xs mt-2">
                        All effects are applied here.
                    </p>
                </div>
            </div>
        </div>
    );
}
