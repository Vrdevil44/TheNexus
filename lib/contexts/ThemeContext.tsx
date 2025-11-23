"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { VantaEffectType } from "@/lib/vanta/types";

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
    shadowIntensity: number;
    shadowColor: { h: number; s: number; l: number };
    cardOpacity: number;
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
}

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
}

const defaultTheme: ThemeState = {
    fonts: {
        heading: "Inter",
        body: "Inter",
        mono: "JetBrains Mono",
        sizes: {
            h1: "5rem",
            h2: "3rem",
            h3: "2rem",
            h4: "1.5rem",
            body: "1rem",
            small: "0.875rem",
        },
        weights: {
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
        },
    },
    colors: {
        primary: { h: 180, s: 100, l: 50 },
        secondary: { h: 300, s: 100, l: 50 },
        accent: { h: 220, s: 80, l: 60 },
        background: {
            start: { h: 240, s: 10, l: 5 },
            end: { h: 240, s: 10, l: 3 },
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
        section: "5rem",
        sectionMd: "10rem",
        card: "1.5rem",
        cardMd: "2rem",
        gap: "2rem",
    },
    effects: {
        borderRadius: "0.75rem",
        borderWidth: "1px",
        borderColor: { h: 0, s: 0, l: 100 }, // White border
        blur: "12px",
        shadowIntensity: 0.5,
        shadowColor: { h: 0, s: 0, l: 0 }, // Black shadow
        cardOpacity: 0.1,
        glowIntensity: 0,
        saturate: 1,
        brightness: 1,
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
    },
    background: {
        vantaEffect: "net" as VantaEffectType,
        vantaConfig: {
            starsCount: 150,
            starsSize: 1.5,
            starsOpacity: 0.8,
            starsGlow: 0.1,
        },
        backdropFilter: {
            enabled: true, // Enable by default as requested
            blur: 5, // Default to 5px as requested
            gradientOpacity: 0.23, // Default to 23% as requested
            gradient: {
                enabled: true, // Gradient is part of backdrop filter
                color1: { h: 240, s: 50, l: 20 },
                color2: { h: 280, s: 50, l: 10 },
                angle: 135, // 135° creates a lower-right glare effect (45° from vertical)
                radius: 600, // Default radius
                color1Percent: 65, // 65% of color1 for glare effect
                color2Percent: 35, // 35% of color2
            },
        },
    },
};

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

    // Load theme from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem("portfolio-theme");
        if (saved) {
            try {
                setTheme(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to load theme:", e);
            }
        }
    }, []);

    // Save theme to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("portfolio-theme", JSON.stringify(theme));
        applyThemeToDOM(theme);
    }, [theme]);

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

        // Smart Theming: Derived Colors
        // Dim: Lower saturation and lightness for subtle backgrounds/borders
        root.style.setProperty("--color-primary-dim", `${ph} ${Math.max(0, ps - 20)}% ${Math.max(10, pl - 20)}%`);
        root.style.setProperty("--color-secondary-dim", `${sh} ${Math.max(0, ss - 20)}% ${Math.max(10, sl - 20)}%`);

        // Glow: High saturation, medium lightness for shadows/effects
        root.style.setProperty("--color-primary-glow", `${ph} 100% 60%`);
        root.style.setProperty("--color-secondary-glow", `${sh} 100% 60%`);

        const { start, end } = theme.colors.background;
        root.style.setProperty("--bg-start", `${start.h} ${start.s}% ${start.l}%`);
        root.style.setProperty("--bg-end", `${end.h} ${end.s}% ${end.l}%`);

        // If Gravity Stars is active, make body transparent to show the fixed canvas
        if (theme.background.vantaEffect === 'gravity-stars') {
            document.body.style.background = 'transparent';
        } else {
            document.body.style.background = `linear-gradient(to bottom, hsl(${start.h} ${start.s}% ${start.l}%), hsl(${end.h} ${end.s}% ${end.l}%))`;
        }

        // Spacing
        root.style.setProperty("--spacing-section", theme.spacing.section);
        root.style.setProperty("--spacing-section-md", theme.spacing.sectionMd);
        root.style.setProperty("--spacing-card", theme.spacing.card);
        root.style.setProperty("--spacing-card-md", theme.spacing.cardMd);
        root.style.setProperty("--spacing-gap", theme.spacing.gap);

        // Effects
        root.style.setProperty("--border-radius", theme.effects.borderRadius);
        root.style.setProperty("--blur", theme.effects.blur);
        root.style.setProperty("--shadow-intensity", theme.effects.shadowIntensity.toString());
        root.style.setProperty("--animation-speed", theme.effects.animationSpeed.toString());
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
        setTheme(defaultTheme);
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
        // List of available fonts
        const fonts = ["Inter", "Roboto", "Poppins", "Montserrat", "Open Sans", "Lato", "Nunito", "Work Sans", "Outfit", "Space Grotesk", "Orbitron", "Exo 2", "Rajdhani", "Quicksand", "Bebas Neue", "Abril Fatface", "Playfair Display", "Merriweather", "Fira Code"];

        // Randomize Fonts
        const randomHeading = fonts[Math.floor(Math.random() * fonts.length)];
        const randomBody = fonts[Math.floor(Math.random() * fonts.length)];
        updateFonts({
            heading: randomHeading,
            body: randomBody,
        });

        // Randomize Colors (smart palette generation)
        const primaryHue = Math.floor(Math.random() * 360);
        const secondaryHue = (primaryHue + 120 + Math.floor(Math.random() * 60)) % 360;
        updateColors({
            primary: {
                h: primaryHue,
                s: Math.floor(Math.random() * 40) + 60,
                l: Math.floor(Math.random() * 20) + 45
            },
            secondary: {
                h: secondaryHue,
                s: Math.floor(Math.random() * 40) + 60,
                l: Math.floor(Math.random() * 20) + 45
            },
        });

        // Randomize Background
        const effects = ["fog", "waves", "clouds", "net", "cells", "trunk", "topology", "dots", "birds", "globe", "rings", "halo"] as const;
        const randomEffect = effects[Math.floor(Math.random() * effects.length)];
        updateBackground({
            vantaEffect: randomEffect,
        });

        // Randomize Backdrop Gradient for smooth appearance
        const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;
        const gradientHue1 = Math.floor(Math.random() * 360);
        const gradientHue2 = (gradientHue1 + 120 + Math.floor(Math.random() * 60)) % 360;

        updateBackdropFilter({
            enabled: true,
            blur: 5, // Fixed at 5px as requested
            gradientOpacity: 0.23, // Fixed at 23% as requested
            gradient: {
                enabled: true,
                angle: Math.floor(randomRange(90, 180)),
                radius: Math.floor(randomRange(400, 900)), // Randomize radius
                color1: { h: gradientHue1, s: Math.floor(randomRange(60, 90)), l: Math.floor(randomRange(45, 65)) },
                color2: { h: gradientHue2, s: Math.floor(randomRange(60, 90)), l: Math.floor(randomRange(45, 65)) },
                color1Percent: Math.floor(randomRange(30, 45)),
                color2Percent: Math.floor(randomRange(55, 70)),
            }
        });

        // Randomize Effects
        updateEffects({
            borderRadius: `${Math.floor(Math.random() * 12) * 0.25}rem`,
            borderWidth: `${Math.floor(Math.random() * 4) + 1}px`,
            borderColor: {
                h: Math.floor(Math.random() * 360),
                s: Math.floor(Math.random() * 60) + 40,
                l: Math.floor(Math.random() * 40) + 40
            },
            blur: `${Math.floor(Math.random() * 20)}px`,
            shadowIntensity: parseFloat((Math.random() * 0.8).toFixed(2)),
            shadowColor: {
                h: Math.floor(Math.random() * 360),
                s: Math.floor(Math.random() * 50) + 30,
                l: Math.floor(Math.random() * 40) + 10
            },
            cardOpacity: parseFloat((Math.random() * 0.15 + 0.05).toFixed(2)),
            glowIntensity: parseFloat((Math.random() * 0.5).toFixed(2)),
            saturate: parseFloat((Math.random() * 1 + 0.5).toFixed(2)),
            brightness: parseFloat((Math.random() * 0.5 + 0.75).toFixed(2)),
            animationSpeed: parseFloat((Math.random() * 1.5 + 0.5).toFixed(1))
        });
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
