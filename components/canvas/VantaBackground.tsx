"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/lib/contexts/ThemeContext";
import { loadVantaDependencies } from "@/lib/vanta/loader";
import { getEffectConfig } from "@/lib/vanta/effects";
import type { VantaEffect } from "@/lib/vanta/types";

interface VantaBackgroundProps {
    className?: string;
    style?: React.CSSProperties;
}

export default function VantaBackground({ className, style }: VantaBackgroundProps) {
    const { theme } = useTheme();
    const vantaRef = useRef<HTMLDivElement>(null);
    const vantaEffectRef = useRef<VantaEffect | null>(null);
    const { vantaEffect, vantaConfig } = theme.background;

    useEffect(() => {
        // If effect is gravity-stars, do nothing (handled by BackgroundManager)
        if (vantaEffect === 'gravity-stars') {
            if (vantaEffectRef.current) {
                vantaEffectRef.current.destroy();
                vantaEffectRef.current = null;
            }
            return;
        }

        if (!vantaRef.current) return;

        let isMounted = true;
        let effect: VantaEffect | null = null;

        const initVanta = async () => {
            try {
                // Load dependencies
                await loadVantaDependencies(vantaEffect);

                if (!isMounted || !vantaRef.current) return;

                // Cleanup existing effect
                if (vantaEffectRef.current) {
                    vantaEffectRef.current.destroy();
                    vantaEffectRef.current = null;
                }

                // Get default config and merge with custom config
                const defaultConfig = getEffectConfig(vantaEffect);

                // Performance optimization for Clouds effect
                let performanceConfig = {};
                if (vantaEffect === 'clouds') {
                    performanceConfig = {
                        speed: 0.5, // Reduce speed for smoother performance
                    };
                }

                const mergedConfig = {
                    ...defaultConfig,
                    ...performanceConfig,
                    ...vantaConfig,
                    el: vantaRef.current,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200,
                    minWidth: 200,
                    scale: 1.0,
                    scaleMobile: 0.8, // Reduce scale on mobile for better performance
                };

                // Initialize effect
                if (window.VANTA && window.VANTA[vantaEffect.toUpperCase() as keyof typeof window.VANTA]) {
                    effect = (window.VANTA[vantaEffect.toUpperCase() as keyof typeof window.VANTA] as any)(mergedConfig);
                    vantaEffectRef.current = effect;
                }
            } catch (error) {
                console.error(`Error initializing Vanta ${vantaEffect}:`, error);
            }
        };

        initVanta();

        // Cleanup on unmount or effect change
        return () => {
            isMounted = false;
            if (vantaEffectRef.current) {
                vantaEffectRef.current.destroy();
                vantaEffectRef.current = null;
            }
        };
    }, [vantaEffect, vantaConfig]);

    // Update effect when config changes
    useEffect(() => {
        if (vantaEffectRef.current && Object.keys(vantaConfig).length > 0) {
            try {
                vantaEffectRef.current.setOptions(vantaConfig);
            } catch (error) {
                console.error("Error updating Vanta config:", error);
            }
        }
    }, [vantaConfig]);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            if (vantaEffectRef.current) {
                vantaEffectRef.current.resize();
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div
            ref={vantaRef}
            className={className || "fixed inset-0 w-full h-full"}
            style={{ zIndex: 0, ...style }}
        />
    );
}
