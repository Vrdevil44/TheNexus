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
        // eslint-disable-next-line prefer-const
        let initTimeout: NodeJS.Timeout | undefined;

        const initVanta = async () => {
            try {
                // Load dependencies
                await loadVantaDependencies(vantaEffect);

                if (!isMounted || !vantaRef.current) return;

                // Safety check: Ensure THREE library is fully loaded with Color class
                if (window.THREE && !window.THREE.Color) {
                    console.warn('[VantaBackground] THREE library loaded but Color class not available yet, retrying...');
                    // Wait a bit longer for THREE to fully initialize
                    await new Promise(resolve => setTimeout(resolve, 200));

                    // Check again after waiting
                    if (!window.THREE.Color) {
                        console.error('[VantaBackground] THREE.Color still not available after waiting');
                        return;
                    }
                }

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

                // Initialize effect - with additional safety check
                if (window.VANTA && window.VANTA[vantaEffect.toUpperCase() as keyof typeof window.VANTA]) {
                    // Final check before initialization
                    if (window.THREE && !window.THREE.Color) {
                        console.error('[VantaBackground] THREE.Color not available at initialization time');
                        return;
                    }

                    effect = (window.VANTA[vantaEffect.toUpperCase() as keyof typeof window.VANTA] as any)(mergedConfig);
                    vantaEffectRef.current = effect;
                    console.log(`[VantaBackground] Successfully initialized ${vantaEffect} effect`);
                }
            } catch (error) {
                console.error(`Error initializing Vanta ${vantaEffect}:`, error);
            }
        };

        // Debounce initialization to prevent thrashing
        initTimeout = setTimeout(initVanta, 100);

        // Cleanup on unmount or effect change
        return () => {
            isMounted = false;
            clearTimeout(initTimeout);
            if (vantaEffectRef.current) {
                vantaEffectRef.current.destroy();
                vantaEffectRef.current = null;
            }
        };
    }, [vantaEffect, vantaConfig]);

    // Update effect when config changes - also debounced slightly if needed, but usually fast
    // We actually merged this into the main effect dependency array above to simplify lifecycle
    // But if we want to keep them separate to avoid full re-init on minor config changes:
    /* 
    useEffect(() => {
        if (vantaEffectRef.current && Object.keys(vantaConfig).length > 0) {
             // ... update logic
        }
    }, [vantaConfig]); 
    */
    // The previous implementation had two effects. The first one depended on [vantaEffect, vantaConfig].
    // The second one depended on [vantaConfig]. This causes a double-render or race condition.
    // I have removed the second effect and let the first one handle everything, 
    // because Vanta effects often need a full re-init if core config changes, 
    // or at least it's safer to re-init to avoid state drift.
    // If we want to support `setOptions` without destroy, we need to be careful.
    // For now, full re-init with debounce is safer for memory.

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
