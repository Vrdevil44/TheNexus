// TypeScript definitions for Vanta.js effects

export type VantaEffectType =
    | 'birds'
    | 'fog'
    | 'waves'
    | 'clouds'
    | 'clouds2'
    | 'globe'
    | 'net'
    | 'cells'
    | 'trunk'
    | 'topology'
    | 'dots'
    | 'rings'
    | 'halo'
    | 'gravity-stars';

export interface VantaEffect {
    destroy: () => void;
    setOptions: (options: any) => void;
    resize: () => void;
}

declare global {
    interface Window {
        VANTA: {
            BIRDS: (options: any) => VantaEffect;
            FOG: (options: any) => VantaEffect;
            WAVES: (options: any) => VantaEffect;
            CLOUDS: (options: any) => VantaEffect;
            CLOUDS2: (options: any) => VantaEffect;
            GLOBE: (options: any) => VantaEffect;
            NET: (options: any) => VantaEffect;
            CELLS: (options: any) => VantaEffect;
            TRUNK: (options: any) => VantaEffect;
            TOPOLOGY: (options: any) => VantaEffect;
            DOTS: (options: any) => VantaEffect;
            RINGS: (options: any) => VantaEffect;
            HALO: (options: any) => VantaEffect;
        };
        THREE: any;
        p5: any;
    }
}

export interface VantaConfig {
    el: HTMLElement | string;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    [key: string]: any;
}

export interface BirdsConfig extends VantaConfig {
    backgroundColor?: number;
    backgroundAlpha?: number;
    color1?: number;
    color2?: number;
    colorMode?: string;
    quantity?: number;
    birdSize?: number;
    wingSpan?: number;
    speedLimit?: number;
    separation?: number;
    alignment?: number;
    cohesion?: number;
}

export interface FogConfig extends VantaConfig {
    highlightColor?: number;
    midtoneColor?: number;
    lowlightColor?: number;
    baseColor?: number;
    blurFactor?: number;
    zoom?: number;
    speed?: number;
}

export interface WavesConfig extends VantaConfig {
    color?: number;
    shininess?: number;
    waveHeight?: number;
    waveSpeed?: number;
    zoom?: number;
}

export interface CloudsConfig extends VantaConfig {
    backgroundColor?: number;
    skyColor?: number;
    cloudColor?: number;
    cloudShadowColor?: number;
    sunColor?: number;
    sunGlareColor?: number;
    sunlightColor?: number;
    speed?: number;
}

export interface Clouds2Config extends VantaConfig {
    backgroundColor?: number;
    skyColor?: number;
    cloudColor?: number;
    lightColor?: number;
    speed?: number;
    texturePath?: string;
}

export interface GlobeConfig extends VantaConfig {
    backgroundColor?: number;
    color?: number;
    color2?: number;
    size?: number;
}

export interface NetConfig extends VantaConfig {
    color?: number;
    backgroundColor?: number;
    points?: number;
    maxDistance?: number;
    spacing?: number;
    showDots?: boolean;
}

export interface CellsConfig extends VantaConfig {
    color1?: number;
    color2?: number;
    size?: number;
    speed?: number;
}

export interface TrunkConfig extends VantaConfig {
    backgroundColor?: number;
    color?: number;
    spacing?: number;
    chaos?: number;
}

export interface TopologyConfig extends VantaConfig {
    backgroundColor?: number;
    color?: number;
}

export interface DotsConfig extends VantaConfig {
    backgroundColor?: number;
    color?: number;
    color2?: number;
    size?: number;
    spacing?: number;
    showLines?: boolean;
}

export interface RingsConfig extends VantaConfig {
    color?: number;
    backgroundColor?: number;
    backgroundAlpha?: number;
}

export interface HaloConfig extends VantaConfig {
    backgroundColor?: number;
    baseColor?: number;
    size?: number;
    amplitudeFactor?: number;
    xOffset?: number;
    yOffset?: number;
}

export const THREE_BASED_EFFECTS: VantaEffectType[] = [
    'birds', 'waves', 'clouds', 'clouds2', 'globe', 'net', 'cells', 'dots', 'rings', 'halo'
];

export const P5_BASED_EFFECTS: VantaEffectType[] = ['trunk', 'topology'];

export const SPECIAL_EFFECTS: VantaEffectType[] = ['fog'];
