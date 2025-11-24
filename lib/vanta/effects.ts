import type { VantaEffectType } from './types';

export const VANTA_EFFECTS: Record<VantaEffectType, { name: string; description: string; config: any }> = {
    birds: {
        name: 'Birds',
        description: 'Flocking birds simulation with murmuration effect',
        config: {
            backgroundColor: 0x07192f,
            backgroundAlpha: 1,
            color1: 0xff0000,
            color2: 0x00d1ff,
            colorMode: 'varianceGradient',
            quantity: 5,
            birdSize: 1,
            wingSpan: 30,
            speedLimit: 5,
            separation: 20,
            alignment: 20,
            cohesion: 20,
        },
    },
    fog: {
        name: 'Fog',
        description: 'Volumetric fog with color gradients',
        config: {
            highlightColor: 0xffc300,
            midtoneColor: 0xff1f00,
            lowlightColor: 0x2d00ff,
            baseColor: 0xffebeb,
            blurFactor: 0.6,
            zoom: 1,
            speed: 1,
        },
    },
    waves: {
        name: 'Waves',
        description: 'Animated ocean waves with realistic movement',
        config: {
            color: 0x005588,
            shininess: 30,
            waveHeight: 15,
            waveSpeed: 1,
            zoom: 1,
        },
    },
    clouds: {
        name: 'Clouds',
        description: 'Sky with sun and volumetric clouds',
        config: {
            backgroundColor: 0xffffff,
            skyColor: 0x68b8d7,
            cloudColor: 0xadc1de,
            cloudShadowColor: 0x183550,
            sunColor: 0xff9919,
            sunGlareColor: 0xff6633,
            sunlightColor: 0xff9933,
            speed: 1,
        },
    },
    clouds2: {
        name: 'Clouds 2',
        description: 'Alternate clouds effect with lighting',
        config: {
            backgroundColor: 0x000000,
            skyColor: 0x5ca6ca,
            cloudColor: 0x334d80,
            lightColor: 0xffffff,
            speed: 1,
        },
    },
    globe: {
        name: 'Globe',
        description: 'Rotating globe with connection lines',
        config: {
            backgroundColor: 0x23153c,
            color: 0xff3f81,
            color2: 0xffffff,
            size: 1,
        },
    },
    net: {
        name: 'Network',
        description: 'Connected network of particles (Current default!)',
        config: {
            color: 0xff3f81,
            backgroundColor: 0x23153c,
            points: 10,
            maxDistance: 20,
            spacing: 15,
            showDots: true,
        },
    },
    cells: {
        name: 'Cells',
        description: 'Organic cell movement and growth',
        config: {
            color1: 0x008c8c,
            color2: 0xf2e735,
            size: 1.5,
            speed: 1,
        },
    },
    trunk: {
        name: 'Trunk',
        description: 'Tree trunk-like patterns',
        config: {
            backgroundColor: 0x222426,
            color: 0x98465f,
            spacing: 0,
            chaos: 1,
        },
    },
    topology: {
        name: 'Topology',
        description: 'Topological surface animation',
        config: {
            backgroundColor: 0x002222,
            color: 0x89964e,
        },
    },
    dots: {
        name: 'Dots',
        description: 'Animated dot matrix with connections',
        config: {
            backgroundColor: 0x222222,
            color: 0xff8820,
            color2: 0xff8820,
            size: 3,
            spacing: 35,
            showLines: true,
        },
    },
    rings: {
        name: 'Rings',
        description: 'Concentric ring patterns',
        config: {
            color: 0x88ff00,
            backgroundColor: 0x202428,
            backgroundAlpha: 1,
        },
    },
    halo: {
        name: 'Halo',
        description: 'Radial halo effect with waves',
        config: {
            backgroundColor: 0x131a43,
            baseColor: 0x001a59,
            size: 1,
            amplitudeFactor: 1,
            xOffset: 0,
            yOffset: 0,
        },
    },
    'gravity-stars': {
        name: 'Gravity Stars',
        description: 'Interactive stars with gravity effect',
        config: {
            starsCount: 150,
            starsSize: 1.5,
            starsOpacity: 0.6,
            starsGlow: 0.1,
        },
    },
};

export const getEffectConfig = (effect: VantaEffectType) => {
    return VANTA_EFFECTS[effect]?.config || {};
};

export const getEffectName = (effect: VantaEffectType) => {
    return VANTA_EFFECTS[effect]?.name || effect;
};

export const getEffectDescription = (effect: VantaEffectType) => {
    return VANTA_EFFECTS[effect]?.description || '';
};
