"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "@/lib/contexts/ThemeContext";
import { VANTA_EFFECTS } from "@/lib/vanta/effects";
import type { VantaEffectType } from "@/lib/vanta/types";
import { ChevronDown, ChevronUp, RotateCcw, Eye, Shuffle } from "lucide-react";
import { hslToHex } from "@/lib/utils/contrast";
import VantaBackground from "@/components/canvas/VantaBackground";
import GravityStarsBackground from "@/components/ui/GravityStarsBackground";

export default function BackgroundControls() {
    const { theme, updateBackground, updateBackdropFilter, updateVantaConfig } = useTheme();
    const { vantaEffect, vantaConfig, backdropFilter } = theme.background;
    const [backdropExpanded, setBackdropExpanded] = useState(false);
    const [effectsExpanded, setEffectsExpanded] = useState(true);
    const previewRef = useRef<HTMLDivElement>(null);

    // Live Preview Swivel Effect
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!previewRef.current) return;
        const { left, top, width, height } = previewRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;

        const rotateX = (y - 0.5) * 20; // -10 to 10 degrees
        const rotateY = (x - 0.5) * -20; // -10 to 10 degrees

        previewRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        previewRef.current.style.setProperty('--mouse-x', `${x * 100}%`);
        previewRef.current.style.setProperty('--mouse-y', `${y * 100}%`);
    };

    const handleMouseLeave = () => {
        if (previewRef.current) {
            previewRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            // Reset to center
            previewRef.current.style.setProperty('--mouse-x', '50%');
            previewRef.current.style.setProperty('--mouse-y', '50%');
        }
    };



    // Generate Random Background
    const generateRandomBackground = () => {
        // 1. Randomize Vanta Effect
        const effectKeys = Object.keys(VANTA_EFFECTS) as VantaEffectType[];
        const randomEffect = effectKeys[Math.floor(Math.random() * effectKeys.length)];

        // 2. Generate Sensible Config for the Effect
        const newConfig: any = {};

        // Helper for random color
        const randomColor = () => Math.floor(Math.random() * 0xFFFFFF);
        // Helper for random range
        const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;

        // Independent random colors for background effects
        // We generate a palette for the background specifically, separate from the theme
        const bgHue = Math.floor(Math.random() * 360);
        const bgSat = Math.floor(randomRange(20, 80));
        const bgLight = Math.floor(randomRange(5, 20)); // Keep backgrounds generally dark

        const primaryHue = (bgHue + 180) % 360; // Complementary
        const secondaryHue = (bgHue + 60) % 360; // Analogous/Triadic

        const bgHex = parseInt(hslToHex(bgHue, bgSat, bgLight).slice(1), 16);
        const primaryHex = parseInt(hslToHex(primaryHue, 70, 60).slice(1), 16);
        const secondaryHex = parseInt(hslToHex(secondaryHue, 70, 60).slice(1), 16);

        switch (randomEffect) {
            case 'fog':
                newConfig.highlightColor = secondaryHex;
                newConfig.midtoneColor = primaryHex;
                newConfig.lowlightColor = bgHex;
                newConfig.baseColor = bgHex;
                newConfig.blurFactor = randomRange(0.4, 0.9);
                newConfig.zoom = randomRange(0.8, 1.5);
                newConfig.speed = randomRange(1, 3);
                break;
            case 'net':
                newConfig.color = primaryHex;
                newConfig.backgroundColor = bgHex;
                newConfig.points = Math.floor(randomRange(8, 15));
                newConfig.maxDistance = randomRange(18, 26);
                newConfig.spacing = randomRange(14, 22);
                newConfig.showDots = Math.random() > 0.3;
                break;
            case 'birds':
                newConfig.backgroundColor = bgHex;
                newConfig.color1 = primaryHex;
                newConfig.color2 = secondaryHex;
                newConfig.mode = ['complexity', 'simple', 'beacon'][Math.floor(Math.random() * 3)];
                newConfig.quantity = Math.floor(randomRange(2, 5));
                newConfig.birdSize = randomRange(0.8, 1.5);
                newConfig.speedLimit = randomRange(3, 6);
                break;
            case 'cells':
                newConfig.color1 = primaryHex;
                newConfig.color2 = secondaryHex;
                newConfig.size = randomRange(1.0, 2.5);
                newConfig.speed = randomRange(1, 3);
                break;
            case 'clouds':
            case 'clouds2':
                newConfig.backgroundColor = bgHex;
                newConfig.skyColor = bgHex;
                newConfig.cloudColor = primaryHex; // Tint clouds with primary
                newConfig.speed = randomRange(0.5, 1.5);
                break;
            case 'dots':
                newConfig.backgroundColor = bgHex;
                newConfig.color = primaryHex;
                newConfig.color2 = secondaryHex;
                newConfig.size = randomRange(2, 4);
                newConfig.spacing = randomRange(25, 45);
                newConfig.showLines = Math.random() > 0.4;
                break;
            case 'globe':
                newConfig.backgroundColor = bgHex;
                newConfig.color = primaryHex;
                newConfig.color2 = secondaryHex;
                newConfig.size = randomRange(0.8, 1.4);
                break;
            case 'halo':
                newConfig.backgroundColor = bgHex;
                newConfig.baseColor = primaryHex;
                newConfig.size = randomRange(1, 2);
                newConfig.amplitudeFactor = randomRange(1, 2);
                break;
            case 'rings':
                newConfig.backgroundColor = bgHex;
                newConfig.color = primaryHex;
                break;
            case 'topology':
                newConfig.backgroundColor = bgHex;
                newConfig.color = primaryHex;
                break;
            case 'trunk':
                newConfig.backgroundColor = bgHex;
                newConfig.color = primaryHex;
                newConfig.spacing = randomRange(1, 6);
                newConfig.chaos = randomRange(1, 4);
                break;
            case 'waves':
                newConfig.color = primaryHex;
                newConfig.shininess = randomRange(20, 60);
                newConfig.waveHeight = randomRange(10, 25);
                newConfig.waveSpeed = randomRange(0.5, 1.5);
                newConfig.zoom = randomRange(0.8, 1.3);
                break;
            case 'gravity-stars':
                newConfig.starsCount = Math.floor(randomRange(200, 600));
                newConfig.starsSize = randomRange(1.5, 3);
                newConfig.starsOpacity = randomRange(0.6, 1);
                newConfig.starsGlow = randomRange(0.3, 0.8);
                break;
        }

        // 3. Randomize Backdrop Filter
        const randomBackdrop = {
            enabled: true, // Always enable for smooth gradients
            blur: Math.floor(randomRange(8, 20)),
            gradientOpacity: randomRange(0.25, 0.45),
            gradient: {
                enabled: true,
                angle: Math.floor(randomRange(90, 180)), // Diagonal gradients look better
                radius: Math.floor(randomRange(400, 900)), // Randomize radius
                color1: { h: primaryHue, s: Math.floor(randomRange(60, 90)), l: Math.floor(randomRange(45, 65)) },
                color2: { h: secondaryHue, s: Math.floor(randomRange(60, 90)), l: Math.floor(randomRange(45, 65)) },
                color1Percent: Math.floor(randomRange(30, 45)),
                color2Percent: Math.floor(randomRange(55, 70)),
            }
        };

        // Apply all updates
        updateBackground({
            vantaEffect: randomEffect,
            vantaConfig: newConfig
        });
        updateBackdropFilter(randomBackdrop);
    };

    // Compact color picker (just the box)
    const CompactColorPicker = ({ color, onChange }: { color: { h: number; s: number; l: number }; onChange: (h: number, s: number, l: number) => void }) => (
        <div className="flex flex-col gap-1">
            <div
                className="w-full h-8 rounded border border-white/20 cursor-pointer"
                style={{ background: `hsl(${color.h}, ${color.s}%, ${color.l}%)` }}
            />
            <div className="grid grid-cols-3 gap-1">
                <input type="range" min="0" max="360" value={color.h} onChange={(e) => onChange(parseInt(e.target.value), color.s, color.l)} className="w-full" title="Hue" />
                <input type="range" min="0" max="100" value={color.s} onChange={(e) => onChange(color.h, parseInt(e.target.value), color.l)} className="w-full" title="Saturation" />
                <input type="range" min="0" max="100" value={color.l} onChange={(e) => onChange(color.h, color.s, parseInt(e.target.value))} className="w-full" title="Lightness" />
            </div>
        </div>
    );

    // Get effect-specific controls
    const getEffectControls = () => {
        const config = vantaConfig || {};

        const updateConfig = (key: string, value: any) => {
            updateVantaConfig({ ...config, [key]: value });
        };

        const SliderControl = ({ label, value, min, max, step = 1, prop }: any) => (
            <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">{label}</span>
                    <span className="text-white font-mono">{value ?? config[prop] ?? 0}</span>
                </div>
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value ?? config[prop] ?? 0}
                    onChange={(e) => updateConfig(prop, parseFloat(e.target.value))}
                    className="w-full"
                />
            </div>
        );

        const ColorControl = ({ label, prop }: { label: string; prop: string }) => {
            const hexValue = config[prop] || 0x000000;
            return (
                <div className="mb-3">
                    <label className="text-xs text-gray-400 mb-1 block">{label}</label>
                    <div className="flex gap-2">
                        <input
                            type="color"
                            value={`#${hexValue.toString(16).padStart(6, '0')}`}
                            onChange={(e) => updateConfig(prop, parseInt(e.target.value.slice(1), 16))}
                            className="w-10 h-10 rounded border border-white/20 p-0 bg-transparent cursor-pointer"
                        />
                        <div className="flex-1 flex flex-col justify-center text-[10px] text-gray-400 font-mono">
                            <span>#{hexValue.toString(16).padStart(6, '0')}</span>
                        </div>
                    </div>
                </div>
            );
        };

        const CheckboxControl = ({ label, prop }: { label: string; prop: string }) => (
            <div className="mb-3 flex items-center justify-between">
                <span className="text-xs text-gray-400">{label}</span>
                <input
                    type="checkbox"
                    checked={config[prop] ?? false}
                    onChange={(e) => updateConfig(prop, e.target.checked)}
                    className="w-4 h-4 rounded border-gray-600 text-primary focus:ring-primary bg-gray-700"
                />
            </div>
        );

        const SelectControl = ({ label, prop, options }: { label: string; prop: string, options: string[] }) => (
            <div className="mb-3">
                <label className="text-xs text-gray-400 mb-1 block">{label}</label>
                <select
                    value={config[prop] ?? options[0]}
                    onChange={(e) => updateConfig(prop, e.target.value)}
                    className="w-full px-2 py-1 bg-gray-800 border border-white/20 rounded text-xs text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer [&>option]:bg-gray-800 [&>option]:text-white [&>option:checked]:bg-primary [&>option:hover]:bg-primary/20"
                >
                    {options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
            </div>
        );


        switch (vantaEffect) {
            case 'fog':
                return (
                    <>
                        <div className="grid grid-cols-2 gap-2">
                            <ColorControl label="Highlight" prop="highlightColor" />
                            <ColorControl label="Midtone" prop="midtoneColor" />
                            <ColorControl label="Lowlight" prop="lowlightColor" />
                            <ColorControl label="Base" prop="baseColor" />
                        </div>
                        <SliderControl label="Blur Factor" prop="blurFactor" min={0} max={1} step={0.1} />
                        <SliderControl label="Zoom" prop="zoom" min={0.5} max={2} step={0.1} />
                        <SliderControl label="Speed" prop="speed" min={0} max={5} step={0.5} />
                    </>
                );

            case 'net':
                return (
                    <>
                        <div className="grid grid-cols-2 gap-2">
                            <ColorControl label="Color" prop="color" />
                            <ColorControl label="Background" prop="backgroundColor" />
                        </div>
                        <SliderControl label="Points" prop="points" min={5} max={20} step={1} />
                        <SliderControl label="Max Distance" prop="maxDistance" min={10} max={30} step={1} />
                        <SliderControl label="Spacing" prop="spacing" min={10} max={30} step={1} />
                        <CheckboxControl label="Show Dots" prop="showDots" />
                    </>
                );

            case 'birds':
                return (
                    <>
                        <div className="grid grid-cols-2 gap-2">
                            <ColorControl label="Background" prop="backgroundColor" />
                            <ColorControl label="Color 1" prop="color1" />
                            <ColorControl label="Color 2" prop="color2" />
                        </div>
                        <SelectControl label="Mode" prop="mode" options={['complexity', 'simple', 'beacon']} />
                        <SliderControl label="Quantity" prop="quantity" min={1} max={10} step={1} />
                        <SliderControl label="Bird Size" prop="birdSize" min={0.5} max={3} step={0.1} />
                        <SliderControl label="Wing Span" prop="wingSpan" min={10} max={50} step={1} />
                        <SliderControl label="Speed Limit" prop="speedLimit" min={1} max={10} step={0.5} />
                        <SliderControl label="Separation" prop="separation" min={10} max={30} step={1} />
                        <SliderControl label="Alignment" prop="alignment" min={10} max={30} step={1} />
                        <SliderControl label="Cohesion" prop="cohesion" min={10} max={30} step={1} />
                    </>
                );

            case 'cells':
                return (
                    <>
                        <div className="grid grid-cols-2 gap-2">
                            <ColorControl label="Color 1" prop="color1" />
                            <ColorControl label="Color 2" prop="color2" />
                        </div>
                        <SliderControl label="Size" prop="size" min={0.5} max={3} step={0.1} />
                        <SliderControl label="Speed" prop="speed" min={0} max={5} step={0.5} />
                    </>
                );

            case 'clouds':
                return (
                    <>
                        <div className="grid grid-cols-2 gap-2">
                            <ColorControl label="Background" prop="backgroundColor" />
                            <ColorControl label="Sky" prop="skyColor" />
                            <ColorControl label="Cloud" prop="cloudColor" />
                            <ColorControl label="Shadow" prop="cloudShadowColor" />
                            <ColorControl label="Sun" prop="sunColor" />
                            <ColorControl label="Glare" prop="sunGlareColor" />
                            <ColorControl label="Sunlight" prop="sunlightColor" />
                        </div>
                        <SliderControl label="Speed" prop="speed" min={0} max={3} step={0.1} />
                    </>
                );

            case 'clouds2':
                return (
                    <>
                        <div className="grid grid-cols-2 gap-2">
                            <ColorControl label="Background" prop="backgroundColor" />
                            <ColorControl label="Sky" prop="skyColor" />
                            <ColorControl label="Cloud" prop="cloudColor" />
                            <ColorControl label="Light" prop="lightColor" />
                        </div>
                        <SliderControl label="Speed" prop="speed" min={0} max={3} step={0.1} />
                    </>
                );

            case 'dots':
                return (
                    <>
                        <div className="grid grid-cols-2 gap-2">
                            <ColorControl label="Background" prop="backgroundColor" />
                            <ColorControl label="Color" prop="color" />
                            <ColorControl label="Color 2" prop="color2" />
                        </div>
                        <SliderControl label="Size" prop="size" min={1} max={5} step={0.5} />
                        <SliderControl label="Spacing" prop="spacing" min={20} max={50} step={1} />
                        <CheckboxControl label="Show Lines" prop="showLines" />
                    </>
                );

            case 'globe':
                return (
                    <>
                        <div className="grid grid-cols-2 gap-2">
                            <ColorControl label="Background" prop="backgroundColor" />
                            <ColorControl label="Color" prop="color" />
                            <ColorControl label="Color 2" prop="color2" />
                        </div>
                        <SliderControl label="Size" prop="size" min={0.5} max={2} step={0.1} />
                    </>
                );

            case 'halo':
                return (
                    <>
                        <div className="grid grid-cols-2 gap-2">
                            <ColorControl label="Background" prop="backgroundColor" />
                            <ColorControl label="Base" prop="baseColor" />
                        </div>
                        <SliderControl label="Size" prop="size" min={0.5} max={3} step={0.1} />
                        <SliderControl label="Amplitude" prop="amplitudeFactor" min={0} max={3} step={0.1} />
                        <SliderControl label="X Offset" prop="xOffset" min={-1} max={1} step={0.1} />
                        <SliderControl label="Y Offset" prop="yOffset" min={-1} max={1} step={0.1} />
                    </>
                );

            case 'rings':
                return (
                    <>
                        <div className="grid grid-cols-2 gap-2">
                            <ColorControl label="Color" prop="color" />
                            <ColorControl label="Background" prop="backgroundColor" />
                        </div>
                    </>
                );

            case 'topology':
                return (
                    <>
                        <div className="grid grid-cols-2 gap-2">
                            <ColorControl label="Background" prop="backgroundColor" />
                            <ColorControl label="Color" prop="color" />
                        </div>
                    </>
                );

            case 'trunk':
                return (
                    <>
                        <div className="grid grid-cols-2 gap-2">
                            <ColorControl label="Background" prop="backgroundColor" />
                            <ColorControl label="Color" prop="color" />
                        </div>
                        <SliderControl label="Spacing" prop="spacing" min={0} max={10} step={1} />
                        <SliderControl label="Chaos" prop="chaos" min={0} max={5} step={0.5} />
                    </>
                );

            case 'waves':
                return (
                    <>
                        <ColorControl label="Color" prop="color" />
                        <SliderControl label="Shininess" prop="shininess" min={0} max={100} step={5} />
                        <SliderControl label="Wave Height" prop="waveHeight" min={5} max={30} step={1} />
                        <SliderControl label="Wave Speed" prop="waveSpeed" min={0} max={3} step={0.1} />
                        <SliderControl label="Zoom" prop="zoom" min={0.5} max={2} step={0.1} />
                    </>
                );

            case 'gravity-stars':
                return (
                    <>
                        <SliderControl label="Stars Count" prop="starsCount" min={100} max={1000} step={50} />
                        <SliderControl label="Size" prop="starsSize" min={1} max={5} step={0.5} />
                        <SliderControl label="Opacity" prop="starsOpacity" min={0} max={1} step={0.1} />
                        <SliderControl label="Glow" prop="starsGlow" min={0} max={1} step={0.1} />
                    </>
                );

            default:
                return <p className="text-xs text-gray-500">No additional controls for this effect</p>;
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white mb-2">Background</h3>
                <button
                    onClick={generateRandomBackground}
                    className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-primary to-secondary rounded-lg text-white text-xs font-medium hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 group"
                >
                    <Shuffle className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
                    Randomize
                </button>
            </div>

            {/* Effects Section - Collapsible */}
            <div className="border border-white/10 rounded-lg">
                <button
                    onClick={() => setEffectsExpanded(!effectsExpanded)}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                    <span className="text-sm font-semibold text-white">Effects</span>
                    {effectsExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>

                {effectsExpanded && (
                    <div className="px-4 pb-4 pt-2 border-t border-white/10">
                        {/* Effect Selector */}
                        <select
                            value={vantaEffect}
                            onChange={(e) => {
                                updateBackground({ vantaEffect: e.target.value as VantaEffectType, vantaConfig: {} });
                            }}
                            className="w-full px-3 py-2 mb-4 bg-gray-800 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer [&>option]:bg-gray-800 [&>option]:text-white [&>option:checked]:bg-primary [&>option:hover]:bg-primary/20"
                        >
                            {Object.entries(VANTA_EFFECTS).map(([key, effect]) => (
                                <option key={key} value={key}>
                                    {effect.name}
                                </option>
                            ))}
                        </select>

                        {/* Effect-Specific Controls */}
                        <div className="max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                            {getEffectControls()}
                        </div>
                    </div>
                )}
            </div>

            {/* Backdrop Filter - Collapsible */}
            <div className="border border-white/10 rounded-lg">
                <div
                    onClick={() => setBackdropExpanded(!backdropExpanded)}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer"
                >
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-white">Backdrop Filter</span>
                        {/* Single Toggle for ON/OFF */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                updateBackdropFilter({ enabled: !backdropFilter.enabled });
                            }}
                            className={`w-12 h-6 rounded-full transition-colors ${backdropFilter.enabled ? 'bg-primary' : 'bg-gray-600'}`}
                        >
                            <div className={`w-4 h-4 bg-white rounded-full mt-1 transition-transform ${backdropFilter.enabled ? 'translate-x-7' : 'translate-x-1'}`} />
                        </button>
                    </div>
                    {backdropExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </div>

                {backdropExpanded && backdropFilter.enabled && (
                    <div className="px-4 pb-4 pt-2 border-t border-white/10 space-y-4">
                        {/* Blur Intensity */}
                        <div>
                            <div className="flex justify-between text-xs mb-2">
                                <span className="text-gray-400">Blur Intensity</span>
                                <span className="text-white font-mono">{backdropFilter.blur}px</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="30"
                                value={backdropFilter.blur}
                                onChange={(e) => updateBackdropFilter({ blur: parseInt(e.target.value) })}
                                className="w-full"
                            />
                        </div>

                        {/* Gradient Opacity */}
                        <div>
                            <div className="flex justify-between text-xs mb-2">
                                <span className="text-gray-400">Gradient Opacity</span>
                                <span className="text-white font-mono">{Math.round(backdropFilter.gradientOpacity * 100)}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={backdropFilter.gradientOpacity}
                                onChange={(e) => updateBackdropFilter({ gradientOpacity: parseFloat(e.target.value) })}
                                className="w-full"
                            />
                        </div>

                        {/* Color Pickers for Gradient */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-xs text-gray-400">Gradient Colors</p>
                                <button
                                    onClick={() => updateBackdropFilter({
                                        blur: 0,
                                        gradientOpacity: 0.5,
                                        gradient: {
                                            ...backdropFilter.gradient,
                                            angle: 135,
                                            color1Percent: 65,
                                            color2Percent: 35,
                                        }
                                    })}
                                    className="text-xs text-primary hover:text-secondary transition-colors flex items-center gap-1"
                                    title="Reset to glare effect"
                                >
                                    <RotateCcw className="w-3 h-3" />
                                    Reset
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <span className="text-[10px] text-gray-500 block mb-1">Color 1 ({backdropFilter.gradient.color1Percent ?? 65}%)</span>
                                    <div className="flex gap-2">
                                        <input
                                            type="color"
                                            value={hslToHex(backdropFilter.gradient.color1.h, backdropFilter.gradient.color1.s, backdropFilter.gradient.color1.l)}
                                            onChange={(e) => {
                                                const hex = e.target.value;
                                                const r = parseInt(hex.slice(1, 3), 16) / 255;
                                                const g = parseInt(hex.slice(3, 5), 16) / 255;
                                                const b = parseInt(hex.slice(5, 7), 16) / 255;
                                                // Convert RGB to HSL (proper formula)
                                                const max = Math.max(r, g, b);
                                                const min = Math.min(r, g, b);
                                                let h = 0, s = 0, l = (max + min) / 2;
                                                if (max !== min) {
                                                    const d = max - min;
                                                    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                                                    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                                                    else if (max === g) h = ((b - r) / d + 2) / 6;
                                                    else h = ((r - g) / d + 4) / 6;
                                                }
                                                updateBackdropFilter({
                                                    gradient: {
                                                        ...backdropFilter.gradient,
                                                        color1: { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
                                                    }
                                                });
                                            }}
                                            className="w-8 h-8 rounded border border-white/20 cursor-pointer p-0 bg-transparent"
                                        />
                                        <div className="flex-1 flex flex-col justify-center text-[10px] text-gray-400 font-mono">
                                            <span>{hslToHex(backdropFilter.gradient.color1.h, backdropFilter.gradient.color1.s, backdropFilter.gradient.color1.l)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <span className="text-[10px] text-gray-500 block mb-1">Color 2 ({backdropFilter.gradient.color2Percent ?? 35}%)</span>
                                    <div className="flex gap-2">
                                        <input
                                            type="color"
                                            value={hslToHex(backdropFilter.gradient.color2.h, backdropFilter.gradient.color2.s, backdropFilter.gradient.color2.l)}
                                            onChange={(e) => {
                                                const hex = e.target.value;
                                                const r = parseInt(hex.slice(1, 3), 16) / 255;
                                                const g = parseInt(hex.slice(3, 5), 16) / 255;
                                                const b = parseInt(hex.slice(5, 7), 16) / 255;
                                                // Convert RGB to HSL (proper formula)
                                                const max = Math.max(r, g, b);
                                                const min = Math.min(r, g, b);
                                                let h = 0, s = 0, l = (max + min) / 2;
                                                if (max !== min) {
                                                    const d = max - min;
                                                    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                                                    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                                                    else if (max === g) h = ((b - r) / d + 2) / 6;
                                                    else h = ((r - g) / d + 4) / 6;
                                                }
                                                updateBackdropFilter({
                                                    gradient: {
                                                        ...backdropFilter.gradient,
                                                        color2: { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
                                                    }
                                                });
                                            }}
                                            className="w-8 h-8 rounded border border-white/20 cursor-pointer p-0 bg-transparent"
                                        />
                                        <div className="flex-1 flex flex-col justify-center text-[10px] text-gray-400 font-mono">
                                            <span>{hslToHex(backdropFilter.gradient.color2.h, backdropFilter.gradient.color2.s, backdropFilter.gradient.color2.l)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Gradient Radius */}
                        <div>
                            <div className="flex justify-between text-xs mb-2">
                                <span className="text-gray-400">Gradient Radius</span>
                                <span className="text-white font-mono">{backdropFilter.gradient.radius}px</span>
                            </div>
                            <input
                                type="range"
                                min="200"
                                max="1200"
                                step="50"
                                value={backdropFilter.gradient.radius}
                                onChange={(e) => updateBackdropFilter({ gradient: { ...backdropFilter.gradient, radius: parseInt(e.target.value) } })}
                                className="w-full"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Live Preview */}
            <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-300 flex items-center gap-2">
                        <Eye className="w-4 h-4 text-primary" />
                        Live Preview
                    </p>
                    <span className="text-[10px] text-gray-500">Hover to swivel</span>
                </div>

                <div
                    className="relative w-full h-40 rounded-lg overflow-hidden border border-white/20 shadow-2xl group perspective-container"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{ perspective: '1000px' }}
                >
                    <div
                        ref={previewRef}
                        className="w-full h-full relative transition-transform duration-100 ease-out transform-style-3d"
                    >
                        {/* Background Layer */}
                        <div className="absolute inset-0 z-0">
                            {vantaEffect === 'gravity-stars' ? (
                                <GravityStarsBackground
                                    className="absolute inset-0"
                                    starsCount={Math.min(vantaConfig.starsCount || 150, 300)} // Limit stars for preview performance
                                    starsSize={(vantaConfig.starsSize || 1.5) * 0.8} // Scale down slightly
                                    starsOpacity={vantaConfig.starsOpacity || 0.8}
                                    glowIntensity={vantaConfig.starsGlow ? vantaConfig.starsGlow * 20 : undefined}
                                />
                            ) : (
                                <VantaBackground
                                    className="absolute inset-0"
                                    style={{ pointerEvents: 'none' }} // Disable interaction in preview to allow swivel
                                />
                            )}
                        </div>

                        {/* Backdrop Filter Layer */}
                        {backdropFilter.enabled && (
                            <div
                                className="absolute inset-0 z-10 transition-all duration-300"
                                style={{
                                    backdropFilter: `blur(${backdropFilter.blur}px)`,
                                    background: backdropFilter.gradient.enabled
                                        ? `
                                            radial-gradient(
                                                ${backdropFilter.gradient.radius}px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
                                                hsl(${backdropFilter.gradient.color2.h} ${backdropFilter.gradient.color2.s}% ${backdropFilter.gradient.color2.l}% / ${backdropFilter.gradientOpacity}) 0%, 
                                                transparent 70%
                                            ),
                                            linear-gradient(
                                                ${backdropFilter.gradient.angle}deg, 
                                                hsl(${backdropFilter.gradient.color1.h} ${backdropFilter.gradient.color1.s}% ${backdropFilter.gradient.color1.l}% / ${backdropFilter.gradientOpacity}), 
                                                hsl(${backdropFilter.gradient.color1.h} ${backdropFilter.gradient.color1.s}% ${backdropFilter.gradient.color1.l}% / ${backdropFilter.gradientOpacity})
                                            )
                                        `
                                        : undefined
                                }}
                            >
                            </div>
                        )}


                    </div>
                </div>
            </div>
        </div>
    );
}
