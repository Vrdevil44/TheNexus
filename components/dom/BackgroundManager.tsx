"use client";

import { useTheme } from "@/lib/contexts/ThemeContext";
import GravityStarsBackground from "@/components/ui/GravityStarsBackground";

export default function BackgroundManager() {
    const { theme } = useTheme();
    const { vantaEffect, vantaConfig } = theme.background;
    const { start, end } = theme.colors.background;

    if (vantaEffect === "gravity-stars") {
        return (
            <GravityStarsBackground
                className="fixed inset-0 z-[-1]"
                style={{
                    background: `linear-gradient(to bottom, hsl(${start.h} ${start.s}% ${start.l}%), hsl(${end.h} ${end.s}% ${end.l}%))`
                }}
                starsCount={vantaConfig.starsCount}
                starsSize={vantaConfig.starsSize}
                starsOpacity={vantaConfig.starsOpacity}
                glowIntensity={vantaConfig.starsGlow ? vantaConfig.starsGlow * 20 : undefined} // Map 0-1 to 0-20
            />
        );
    }

    return null;
}
