"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { VantaEffectType } from "@/lib/vanta/types";
import { generateRandomFonts, generateRandomColors, generateRandomEffects, generateRandomBackground } from "@/lib/utils/randomizer";
import { useThemeHistory } from "@/lib/hooks/useThemeHistory";

export interface ThemeColors {
    primary: { h: number; s: number; l: number };
    secondary: { h: number; s: number; l: number };
    accent: { h: number; s: number; l: number };
    background: {
        start: { h: number; s: number; l: number };
        end: { h: number; s: number; l: number };
    };
    text: {
        white: string;
        gray300: string;
        gray400: string;
        gray500: string;
    };
    borders: {
        primary: { opacity: number };
        secondary: { opacity: number };
        glass: { opacity: number };
    };
}

export interface ThemeFonts {
    heading: string;
    body: string;
    mono: string;
    sizes: {
        h1: string;
        h2: string;
        h3: string;
        h4: string;
        body: string;
        small: string;
    };
    weights: {
        normal: number;
        medium: number;
        semibold: number;
        bold: number;
    };
}

export interface ThemeSpacing {
    section: string;
    sectionMd: string;
    card: string;
    cardMd: string;
    gap: string;
}

export interface ThemeEffects {
    borderRadius: string;
    borderWidth: string;
    borderColor: { h: number; s: number; l: number };
    blur: string;
    shadowEnabled: boolean;
    shadowIntensity: number;
    shadowColor: { h: number; s: number; l: number };
    cardColor: { h: number; s: number; l: number };
    cardOpacity: number;
    glowEnabled: boolean;
    glowIntensity: number;
    saturate: number;
    brightness: number;
    animationSpeed: number;
    sectionFade: {
        intensity: number;
        blur: number;
    };
    transitionDuration: {
        fast: string;
        normal: string;
        slow: string;
    };
    componentBlur: string;
    navShape: 'rounded' | 'boxy' | 'beveled';
}

// ... existing code ...

const defaultTheme: ThemeState = {
    fonts: {
        heading: "Outfit",
        body: "Work Sans",
        mono: "JetBrains Mono",
        sizes: {
            h1: "clamp(3rem, 5vw + 1rem, 5.5rem)",
            h2: "clamp(2rem, 4vw + 1rem, 3.5rem)",
            h3: "clamp(1.5rem, 3vw + 1rem, 2.5rem)",
            h4: "clamp(1.25rem, 2vw + 1rem, 2rem)",
            body: "clamp(1rem, 1vw + 0.5rem, 1.125rem)",
            small: "clamp(0.75rem, 0.5vw + 0.5rem, 0.875rem)",
        },
        weights: {
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
        },
    },
    colors: {
        primary: { h: 0, s: 0, l: 82 },
        secondary: { h: 0, s: 0, l: 38 },
        accent: { h: 220, s: 80, l: 60 },
        background: {
            start: { h: 0, s: 0, l: 5 },
            end: { h: 0, s: 0, l: 0 },
        },
        text: {
            white: "#ffffff",
            gray300: "#d1d5db",
            gray400: "#9ca3af",
            gray500: "#6b7280",
        },
        borders: {
            primary: { opacity: 0.1 },
            secondary: { opacity: 0.2 },
            glass: { opacity: 0.05 },
        },
    },
    spacing: {
        section: "clamp(3rem, 5vw + 2rem, 6rem)",
        sectionMd: "clamp(5rem, 8vw + 2rem, 10rem)",
        card: "clamp(1rem, 2vw + 0.5rem, 2rem)",
        cardMd: "clamp(1.5rem, 3vw + 0.5rem, 2.5rem)",
        gap: "clamp(1rem, 2vw + 0.5rem, 2.5rem)",
    },
    effects: {
        borderRadius: "0.75rem",
        borderWidth: "1px",
        borderColor: { h: 0, s: 0, l: 20 },
        blur: "12px",
        shadowEnabled: true,
        shadowIntensity: 0,
        shadowColor: { h: 0, s: 0, l: 0 },
        cardColor: { h: 0, s: 0, l: 76 },
        cardOpacity: 0.05,
        glowEnabled: false,
        glowIntensity: 0,
        saturate: 0.8,
        brightness: 0.9,
        animationSpeed: 1,
        sectionFade: {
            intensity: 0.2,
            blur: 4,
        },
        transitionDuration: {
            fast: "0.15s",
            normal: "0.3s",
            slow: "0.6s",
        },
        componentBlur: "8px",
        navShape: "rounded",
    },
    background: {
        vantaEffect: "gravity-stars",
        vantaConfig: {
            starsCount: 150,
            starsSize: 1.5,
            starsOpacity: 0.5,
            starsGlow: 0.1,
        },
        backdropFilter: {
            enabled: true,
            blur: 1,
            gradientOpacity: 0.2,
            gradient: {
                enabled: true,
                color1: { h: 0, s: 0, l: 0 },
                color2: { h: 0, s: 0, l: 39 },
                angle: 135,
                radius: 400,
                color1Percent: 65,
                color2Percent: 35,
            },
        },
    },
};



export interface BackdropFilter {
    enabled: boolean;
    blur: number; // Frosted glass blur effect (0-30px) - independent of gradient
    gradientOpacity: number; // Visibility of the gradient overlay (0-1) - independent of blur
    gradient: {
        enabled: boolean;
        color1: { h: number; s: number; l: number };
        color2: { h: number; s: number; l: number };
        angle: number; // Gradient angle in degrees (135° = lower-right glare)

        radius: number; // Radius of the radial gradient in pixels (default 600)
        color1Percent: number; // Percentage of color1 in gradient (default 65)
        color2Percent: number; // Percentage of color2 in gradient (default 35)
    };
}

export interface BackgroundState {
    vantaEffect: VantaEffectType;
    vantaConfig: Record<string, any>;
    backdropFilter: BackdropFilter;
}

export interface ThemeState {
    fonts: ThemeFonts;
    colors: ThemeColors;
    spacing: ThemeSpacing;
    effects: ThemeEffects;
    background: BackgroundState;
}

interface ThemeContextType {
    theme: ThemeState;
    updateFonts: (fonts: Partial<ThemeFonts>) => void;
    updateColors: (colors: Partial<ThemeColors>) => void;
    updateSpacing: (spacing: Partial<ThemeSpacing>) => void;
    updateEffects: (effects: Partial<ThemeEffects>) => void;
    updateBackground: (background: Partial<BackgroundState>) => void;
    updateBackdropFilter: (filter: Partial<BackdropFilter>) => void;
    updateVantaConfig: (config: Record<string, any>) => void;
    resetTheme: () => void;
    randomizeAll: () => void;
    exportTheme: () => string;
    importTheme: (json: string) => void;
    loadPreset: (preset: string) => void;
    undo: () => void;
    canUndo: boolean;
    historyCount: number;
}

const presets: Record<string, ThemeState> = {
    default: defaultTheme,
    cyberpunk: {
        ...defaultTheme,
        fonts: { ...defaultTheme.fonts, heading: "Space Grotesk" },
        colors: {
            ...defaultTheme.colors,
            primary: { h: 320, s: 100, l: 50 }, // Neon Pink
            secondary: { h: 180, s: 100, l: 50 }, // Cyan
            background: {
                start: { h: 280, s: 30, l: 10 },
                end: { h: 240, s: 30, l: 5 },
            },
        },
        effects: {
            ...defaultTheme.effects,
            borderRadius: "0.25rem",
            borderWidth: "2px",
            borderColor: { h: 320, s: 100, l: 50 },
            shadowIntensity: 0.8,
            shadowColor: { h: 320, s: 100, l: 30 },
            cardOpacity: 0.15,
            glowIntensity: 0.3,
            saturate: 1.3,
            brightness: 1.1,
        },
        background: {
            ...defaultTheme.background,
            vantaEffect: "net",
            backdropFilter: {
                enabled: true,
                blur: 0,
                gradientOpacity: 0.7,
                gradient: {
                    enabled: true,
                    color1: { h: 320, s: 100, l: 50 },
                    color2: { h: 180, s: 100, l: 50 },
                    angle: 135,
                    radius: 600,
                    color1Percent: 60,
                    color2Percent: 40,
                }
            }
        }
    },
    ocean: {
        ...defaultTheme,
        fonts: { ...defaultTheme.fonts, heading: "Inter", body: "Work Sans" },
        colors: {
            ...defaultTheme.colors,
            primary: { h: 195, s: 90, l: 55 }, // Ocean Blue
            secondary: { h: 230, s: 90, l: 60 }, // Deep Blue
            background: {
                start: { h: 200, s: 40, l: 15 },
                end: { h: 220, s: 40, l: 10 },
            },
        },
        effects: {
            ...defaultTheme.effects,
            borderRadius: "0.5rem",
            borderWidth: "1px",
            borderColor: { h: 195, s: 70, l: 60 },
            shadowIntensity: 0.3,
            shadowColor: { h: 200, s: 60, l: 20 },
            cardOpacity: 0.1,
            glowIntensity: 0.15,
            saturate: 1.1,
            brightness: 1,
        },
        background: {
            ...defaultTheme.background,
            vantaEffect: "waves",
            backdropFilter: {
                enabled: true,
                blur: 15,
                gradientOpacity: 0.3,
                gradient: {
                    enabled: true,
                    color1: { h: 195, s: 80, l: 55 },
                    color2: { h: 230, s: 80, l: 60 },
                    angle: 180,
                    radius: 600,
                    color1Percent: 50,
                    color2Percent: 50,
                }
            }
        }
    },
    professional: {
        ...defaultTheme,
        fonts: { ...defaultTheme.fonts, heading: "Montserrat", body: "Open Sans" },
        colors: {
            ...defaultTheme.colors,
            primary: { h: 210, s: 80, l: 50 }, // Corporate Blue
            secondary: { h: 25, s: 80, l: 50 }, // Professional Orange
            background: {
                start: { h: 220, s: 15, l: 12 },
                end: { h: 210, s: 15, l: 8 },
            },
        },
        effects: {
            ...defaultTheme.effects,
            borderRadius: "0.375rem",
            borderWidth: "1px",
            borderColor: { h: 210, s: 60, l: 55 },
            shadowIntensity: 0.4,
            shadowColor: { h: 210, s: 50, l: 25 },
            cardOpacity: 0.12,
            glowIntensity: 0.15,
            saturate: 1,
            brightness: 1,
        },
        background: {
            ...defaultTheme.background,
            vantaEffect: "globe",
            backdropFilter: {
                enabled: true,
                blur: 8,
                gradientOpacity: 0.35,
                gradient: {
                    enabled: true,
                    color1: { h: 210, s: 70, l: 50 },
                    color2: { h: 25, s: 70, l: 50 },
                    angle: 45,
                    radius: 600,
                    color1Percent: 60,
                    color2Percent: 40,
                }
            }
        }
    },
    sunset: {
        ...defaultTheme,
        fonts: { ...defaultTheme.fonts, heading: "Playfair Display" },
        colors: {
            ...defaultTheme.colors,
            primary: { h: 30, s: 100, l: 60 }, // Orange
            secondary: { h: 280, s: 60, l: 50 }, // Purple
            background: {
                start: { h: 20, s: 40, l: 15 },
                end: { h: 260, s: 40, l: 10 },
            },
        },
        effects: {
            ...defaultTheme.effects,
            borderRadius: "1.5rem",
            borderWidth: "1px",
            borderColor: { h: 30, s: 100, l: 60 },
            shadowIntensity: 0.5,
            shadowColor: { h: 30, s: 80, l: 30 },
            cardOpacity: 0.15,
            glowIntensity: 0.25,
            saturate: 1.4,
            brightness: 1.15,
        },
        background: {
            ...defaultTheme.background,
            vantaEffect: "clouds",
            backdropFilter: {
                enabled: true,
                blur: 10,
                gradientOpacity: 0.5,
                gradient: {
                    enabled: true,
                    color1: { h: 30, s: 100, l: 60 },
                    color2: { h: 280, s: 80, l: 50 },
                    angle: 45,
                    radius: 600,
                    color1Percent: 50,
                    color2Percent: 50,
                }
            }
        }
    },
    minimal: {
        ...defaultTheme,
        fonts: { ...defaultTheme.fonts, heading: "Outfit", body: "Work Sans" },
        colors: {
            ...defaultTheme.colors,
            primary: { h: 0, s: 0, l: 100 }, // White
            secondary: { h: 0, s: 0, l: 50 }, // Gray
            background: {
                start: { h: 0, s: 0, l: 5 },
                end: { h: 0, s: 0, l: 0 },
            },
        },
        effects: {
            ...defaultTheme.effects,
            borderRadius: "0rem",
            borderWidth: "1px",
            borderColor: { h: 0, s: 0, l: 20 },
            shadowIntensity: 0,
            shadowColor: { h: 0, s: 0, l: 0 },
            cardOpacity: 0.05,
            glowIntensity: 0,
            saturate: 0.8,
            brightness: 0.9,
        },
        background: {
            ...defaultTheme.background,
            vantaEffect: "halo",
            backdropFilter: {
                enabled: false,
                blur: 0,
                gradientOpacity: 0,
                gradient: {
                    enabled: false,
                    color1: { h: 0, s: 0, l: 0 },
                    color2: { h: 0, s: 0, l: 0 },
                    angle: 0,
                    radius: 600,
                    color1Percent: 50,
                    color2Percent: 50,
                }
            }
        }
    },
    midnight: {
        ...defaultTheme,
        fonts: { ...defaultTheme.fonts, heading: "Orbitron", body: "Roboto" },
        colors: {
            ...defaultTheme.colors,
            primary: { h: 270, s: 70, l: 60 }, // Deep Purple
            secondary: { h: 240, s: 60, l: 50 }, // Dark Blue
            background: {
                start: { h: 260, s: 30, l: 8 },
                end: { h: 240, s: 30, l: 3 },
            },
        },
        effects: {
            ...defaultTheme.effects,
            borderRadius: "0.75rem",
            borderWidth: "1px",
            borderColor: { h: 270, s: 60, l: 50 },
            shadowIntensity: 0.7,
            shadowColor: { h: 270, s: 70, l: 20 },
            cardOpacity: 0.08,
            glowIntensity: 0.25,
            saturate: 1.1,
            brightness: 0.85,
        },
        background: {
            ...defaultTheme.background,
            vantaEffect: "rings",
            backdropFilter: {
                enabled: true,
                blur: 12,
                gradientOpacity: 0.4,
                gradient: {
                    enabled: true,
                    color1: { h: 270, s: 70, l: 50 },
                    color2: { h: 240, s: 60, l: 40 },
                    angle: 135,
                    radius: 600,
                    color1Percent: 60,
                    color2Percent: 40,
                }
            }
        }
    },
    forest: {
        ...defaultTheme,
        fonts: { ...defaultTheme.fonts, heading: "Poppins", body: "Lato" },
        colors: {
            ...defaultTheme.colors,
            primary: { h: 140, s: 60, l: 45 }, // Forest Green
            secondary: { h: 85, s: 50, l: 50 }, // Moss Green
            background: {
                start: { h: 130, s: 25, l: 12 },
                end: { h: 150, s: 20, l: 8 },
            },
        },
        effects: {
            ...defaultTheme.effects,
            borderRadius: "1rem",
            borderWidth: "2px",
            borderColor: { h: 140, s: 50, l: 50 },
            shadowIntensity: 0.4,
            shadowColor: { h: 130, s: 60, l: 15 },
            cardOpacity: 0.12,
            glowIntensity: 0.2,
            saturate: 1.3,
            brightness: 0.95,
        },
        background: {
            ...defaultTheme.background,
            vantaEffect: "trunk",
            backdropFilter: {
                enabled: true,
                blur: 10,
                gradientOpacity: 0.35,
                gradient: {
                    enabled: true,
                    color1: { h: 140, s: 60, l: 40 },
                    color2: { h: 85, s: 50, l: 45 },
                    angle: 90,
                    radius: 600,
                    color1Percent: 55,
                    color2Percent: 45,
                }
            }
        }
    },
    neon: {
        ...defaultTheme,
        fonts: { ...defaultTheme.fonts, heading: "Exo 2", body: "Rajdhani" },
        colors: {
            ...defaultTheme.colors,
            primary: { h: 330, s: 100, l: 65 }, // Hot Pink
            secondary: { h: 280, s: 100, l: 70 }, // Neon Purple
            background: {
                start: { h: 300, s: 20, l: 8 },
                end: { h: 280, s: 20, l: 3 },
            },
        },
        effects: {
            ...defaultTheme.effects,
            borderRadius: "0.5rem",
            borderWidth: "2px",
            borderColor: { h: 330, s: 100, l: 65 },
            shadowIntensity: 0.8,
            shadowColor: { h: 330, s: 100, l: 40 },
            cardOpacity: 0.1,
            glowIntensity: 0.4,
            saturate: 1.5,
            brightness: 1.15,
        },
        background: {
            ...defaultTheme.background,
            vantaEffect: "topology",
            backdropFilter: {
                enabled: true,
                blur: 6,
                gradientOpacity: 0.5,
                gradient: {
                    enabled: true,
                    color1: { h: 330, s: 100, l: 60 },
                    color2: { h: 280, s: 100, l: 65 },
                    angle: 45,
                    radius: 600,
                    color1Percent: 65,
                    color2Percent: 35,
                }
            }
        }
    },
    arctic: {
        ...defaultTheme,
        fonts: { ...defaultTheme.fonts, heading: "Quicksand", body: "Nunito" },
        colors: {
            ...defaultTheme.colors,
            primary: { h: 190, s: 70, l: 75 }, // Ice Blue
            secondary: { h: 200, s: 60, l: 85 }, // Light Cyan
            background: {
                start: { h: 195, s: 30, l: 15 },
                end: { h: 200, s: 25, l: 10 },
            },
        },
        effects: {
            ...defaultTheme.effects,
            borderRadius: "1.25rem",
            borderWidth: "1px",
            borderColor: { h: 190, s: 50, l: 70 },
            shadowIntensity: 0.25,
            shadowColor: { h: 190, s: 60, l: 30 },
            cardOpacity: 0.15,
            glowIntensity: 0.3,
            saturate: 0.8,
            brightness: 1.1,
        },
        background: {
            ...defaultTheme.background,
            vantaEffect: "cells",
            backdropFilter: {
                enabled: true,
                blur: 18,
                gradientOpacity: 0.25,
                gradient: {
                    enabled: true,
                    color1: { h: 190, s: 60, l: 70 },
                    color2: { h: 200, s: 50, l: 80 },
                    angle: 180,
                    radius: 600,
                    color1Percent: 50,
                    color2Percent: 50,
                }
            }
        }
    },
    volcano: {
        ...defaultTheme,
        fonts: { ...defaultTheme.fonts, heading: "Bebas Neue", body: "Oxygen" },
        colors: {
            ...defaultTheme.colors,
            primary: { h: 10, s: 90, l: 55 }, // Lava Red
            secondary: { h: 35, s: 95, l: 50 }, // Molten Orange
            background: {
                start: { h: 15, s: 35, l: 10 },
                end: { h: 5, s: 30, l: 5 },
            },
        },
        effects: {
            ...defaultTheme.effects,
            borderRadius: "0.625rem",
            borderWidth: "2px",
            borderColor: { h: 10, s: 80, l: 55 },
            shadowIntensity: 0.65,
            shadowColor: { h: 10, s: 90, l: 25 },
            cardOpacity: 0.12,
            glowIntensity: 0.35,
            saturate: 1.4,
            brightness: 1.05,
        },
        background: {
            ...defaultTheme.background,
            vantaEffect: "net",
            backdropFilter: {
                enabled: true,
                blur: 8,
                gradientOpacity: 0.45,
                gradient: {
                    enabled: true,
                    color1: { h: 10, s: 85, l: 50 },
                    color2: { h: 35, s: 90, l: 50 },
                    angle: 120,
                    radius: 600,
                    color1Percent: 60,
                    color2Percent: 40,
                }
            }
        }
    },
    vintage: {
        ...defaultTheme,
        fonts: { ...defaultTheme.fonts, heading: "Abril Fatface", body: "Merriweather" },
        colors: {
            ...defaultTheme.colors,
            primary: { h: 35, s: 70, l: 55 }, // Vintage Gold
            secondary: { h: 20, s: 60, l: 50 }, // Warm Brown
            background: {
                start: { h: 30, s: 20, l: 12 },
                end: { h: 25, s: 18, l: 8 },
            },
        },
        effects: {
            ...defaultTheme.effects,
            borderRadius: "0.25rem",
            borderWidth: "2px",
            borderColor: { h: 35, s: 60, l: 50 },
            shadowIntensity: 0.5,
            shadowColor: { h: 25, s: 50, l: 20 },
            cardOpacity: 0.14,
            glowIntensity: 0.1,
            saturate: 0.9,
            brightness: 0.95,
        },
        background: {
            ...defaultTheme.background,
            vantaEffect: "birds",
            backdropFilter: {
                enabled: true,
                blur: 12,
                gradientOpacity: 0.3,
                gradient: {
                    enabled: true,
                    color1: { h: 35, s: 65, l: 50 },
                    color2: { h: 20, s: 55, l: 45 },
                    angle: 135,
                    radius: 600,
                    color1Percent: 55,
                    color2Percent: 45,
                }
            }
        }
    },
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<ThemeState>(defaultTheme);
    const { saveState, undo: undoHistory, canUndo, historyCount, clearHistory } = useThemeHistory();

    // Load theme from localStorage on mount - DISABLED for fresh load on every reload
    // useEffect(() => {
    //     const saved = localStorage.getItem("portfolio-theme");
    //     if (saved) {
    //         try {
    //             setTheme(JSON.parse(saved));
    //         } catch (e) {
    //             console.error("Failed to load theme:", e);
    //         }
    //     }
    // }, []);

    // Save theme to localStorage whenever it changes - DISABLED for fresh load on every reload
    // useEffect(() => {
    //     const timeoutId = setTimeout(() => {
    //         localStorage.setItem("portfolio-theme", JSON.stringify(theme));
    //     }, 1000); // 1s debounce for storage
    //
    //     return () => clearTimeout(timeoutId);
    // }, [theme]);

    // Apply theme to DOM immediately for responsiveness
    useEffect(() => {
        applyThemeToDOM(theme);
        // Save to history (with debounce to avoid saving every keystroke)
        const timeoutId = setTimeout(() => {
            saveState(theme);
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [theme, saveState]);

    const applyThemeToDOM = (theme: ThemeState) => {
        const root = document.documentElement;

        // Fonts
        root.style.setProperty("--font-heading", theme.fonts.heading);
        root.style.setProperty("--font-body", theme.fonts.body);
        root.style.setProperty("--font-mono", theme.fonts.mono);
        root.style.setProperty("--text-h1", theme.fonts.sizes.h1);
        root.style.setProperty("--text-h2", theme.fonts.sizes.h2);
        root.style.setProperty("--text-h3", theme.fonts.sizes.h3);
        root.style.setProperty("--text-h4", theme.fonts.sizes.h4);
        root.style.setProperty("--text-body", theme.fonts.sizes.body);
        root.style.setProperty("--text-small", theme.fonts.sizes.small);

        // Colors
        const { h: ph, s: ps, l: pl } = theme.colors.primary;
        const { h: sh, s: ss, l: sl } = theme.colors.secondary;
        root.style.setProperty("--color-primary", `${ph} ${ps}% ${pl}%`);
        root.style.setProperty("--color-secondary", `${sh} ${ss}% ${sl}%`);

        // Text Colors
        root.style.setProperty("--text-white", theme.colors.text.white);
        root.style.setProperty("--text-gray-300", theme.colors.text.gray300);
        root.style.setProperty("--text-gray-400", theme.colors.text.gray400);
        root.style.setProperty("--text-gray-500", theme.colors.text.gray500);

        // Background
        root.style.setProperty("--bg-start", `${theme.colors.background.start.h} ${theme.colors.background.start.s}% ${theme.colors.background.start.l}%`);
        root.style.setProperty("--bg-end", `${theme.colors.background.end.h} ${theme.colors.background.end.s}% ${theme.colors.background.end.l}%`);

        // Spacing
        root.style.setProperty("--spacing-section", theme.spacing.section);
        root.style.setProperty("--spacing-section-md", theme.spacing.sectionMd);
        root.style.setProperty("--spacing-card", theme.spacing.card);
        root.style.setProperty("--spacing-card-md", theme.spacing.cardMd);
        root.style.setProperty("--spacing-gap", theme.spacing.gap);

        // Effects
        root.style.setProperty("--border-radius", theme.effects.borderRadius);
        root.style.setProperty("--blur", theme.effects.blur);
        root.style.setProperty("--glass-blur", theme.effects.componentBlur || "12px");
        root.style.setProperty("--shadow-intensity", (theme.effects.shadowIntensity ?? 0.5).toString());
        root.style.setProperty("--animation-speed", (theme.effects.animationSpeed ?? 1).toString());

        // Card Effects
        const cardColor = theme.effects.cardColor || { h: 0, s: 0, l: 100 }; // Default to white if missing
        root.style.setProperty("--card-bg-color", `${cardColor.h} ${cardColor.s}% ${cardColor.l}%`);
        root.style.setProperty("--card-opacity", (theme.effects.cardOpacity ?? 0.05).toString());

        root.style.setProperty("--card-border-width", theme.effects.borderWidth);
        const borderColor = theme.effects.borderColor;
        root.style.setProperty("--card-border-color", `hsl(${borderColor.h} ${borderColor.s}% ${borderColor.l}% / 0.1)`); // Default low opacity for border

        // Shadows & Glow
        const shadowColor = theme.effects.shadowColor;
        const shadowOpacity = theme.effects.shadowEnabled ? theme.effects.shadowIntensity : 0;
        root.style.setProperty("--card-shadow", `0 10px 30px -10px hsl(${shadowColor.h} ${shadowColor.s}% ${shadowColor.l}% / ${shadowOpacity})`);

        const glowOpacity = theme.effects.glowEnabled ? theme.effects.glowIntensity : 0;
        root.style.setProperty("--card-glow", `0 0 ${glowOpacity * 20}px hsl(${theme.colors.primary.h} ${theme.colors.primary.s}% ${theme.colors.primary.l}% / ${glowOpacity})`);

        // Section Fade
        root.style.setProperty("--section-fade-intensity", (theme.effects.sectionFade?.intensity ?? 0.2).toString());
        root.style.setProperty("--section-fade-blur", `${theme.effects.sectionFade?.blur ?? 4}px`);

        // Transitions
        root.style.setProperty("--transition-fast", theme.effects.transitionDuration.fast);
        root.style.setProperty("--transition-normal", theme.effects.transitionDuration.normal);
        root.style.setProperty("--transition-slow", theme.effects.transitionDuration.slow);
    };

    const updateFonts = (fonts: Partial<ThemeFonts>) => {
        setTheme((prev) => ({ ...prev, fonts: { ...prev.fonts, ...fonts } }));
    };

    const updateColors = (colors: Partial<ThemeColors>) => {
        setTheme((prev) => ({ ...prev, colors: { ...prev.colors, ...colors } }));
    };

    const updateSpacing = (spacing: Partial<ThemeSpacing>) => {
        setTheme((prev) => ({ ...prev, spacing: { ...prev.spacing, ...spacing } }));
    };

    const updateEffects = (effects: Partial<ThemeEffects>) => {
        setTheme((prev) => ({ ...prev, effects: { ...prev.effects, ...effects } }));
    };

    const updateBackground = (background: Partial<BackgroundState>) => {
        setTheme((prev) => ({ ...prev, background: { ...prev.background, ...background } }));
    };

    const updateBackdropFilter = (filter: Partial<BackdropFilter>) => {
        setTheme((prev) => ({
            ...prev,
            background: {
                ...prev.background,
                backdropFilter: { ...prev.background.backdropFilter, ...filter },
            },
        }));
    };

    const updateVantaConfig = (config: Record<string, any>) => {
        setTheme((prev) => ({
            ...prev,
            background: { ...prev.background, vantaConfig: config },
        }));
    };

    const resetTheme = () => {
        clearHistory();
        setTheme(defaultTheme);
    };

    const undo = () => {
        const previousState = undoHistory();
        if (previousState) {
            setTheme(previousState);
        }
    };

    const exportTheme = () => {
        return JSON.stringify(theme, null, 2);
    };

    const importTheme = (json: string) => {
        try {
            const imported = JSON.parse(json);
            setTheme(imported);
        } catch (e) {
            console.error("Failed to import theme:", e);
            alert("Invalid theme JSON");
        }
    };

    const loadPreset = (preset: string) => {
        if (presets[preset]) {
            setTheme((prev) => ({
                ...presets[preset],
                background: prev.background, // Preserve background settings
            }));
        }
    };

    const randomizeAll = () => {
        const randomFonts = generateRandomFonts(theme.fonts);
        const randomColors = generateRandomColors();
        const randomEffects = generateRandomEffects();
        const randomBackground = generateRandomBackground();

        // Batch updates to avoid multiple re-renders
        // Ideally we would have a single setUpdate method, but for now we update state pieces
        // Since React batches state updates in event handlers, this should be fine
        updateFonts(randomFonts);
        updateColors(randomColors);
        updateEffects(randomEffects);

        // Update background and backdrop filter
        updateBackground({
            vantaEffect: randomBackground.vantaEffect,
            vantaConfig: randomBackground.vantaConfig,
        });
        updateBackdropFilter(randomBackground.backdropFilter);
    };

    return (
        <ThemeContext.Provider
            value={{
                theme,
                updateFonts,
                updateColors,
                updateSpacing,
                updateEffects,
                updateBackground,
                updateBackdropFilter,
                updateVantaConfig,
                resetTheme,
                randomizeAll,
                exportTheme,
                importTheme,
                loadPreset,
                undo,
                canUndo,
                historyCount,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within ThemeProvider");
    }
    return context;
}
