import * as THREE from 'three';
import { VantaEffectType, THREE_BASED_EFFECTS, P5_BASED_EFFECTS } from './types';

const loadedScripts = new Set<string>();

export const loadScript = (src: string): Promise<void> => {
    if (loadedScripts.has(src)) {
        return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => {
            loadedScripts.add(src);
            resolve();
        };
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(script);
    });
};

export const loadVantaDependencies = async (effect: VantaEffectType): Promise<void> => {
    try {
        // Load Three.js for Three.js-based effects
        if (THREE_BASED_EFFECTS.includes(effect)) {
            if (!window.THREE) {
                window.THREE = THREE;
            }
        }

        // Load P5.js for P5-based effects
        if (P5_BASED_EFFECTS.includes(effect) && !window.p5) {
            await loadScript('https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js');
        }

        // Load the specific Vanta effect
        const vantaScriptUrl = `https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.${effect}.min.js`;
        await loadScript(vantaScriptUrl);

        // Wait a bit for scripts to initialize
        await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
        console.error(`Error loading Vanta dependencies for ${effect}:`, error);
        throw error;
    }
};

export const cleanupVantaScripts = () => {
    // Note: We don't remove scripts from DOM as they might be needed again
    // But we clear the loaded set if needed for re-initialization
    // loadedScripts.clear();
};
