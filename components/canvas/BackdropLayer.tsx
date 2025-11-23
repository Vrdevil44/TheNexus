"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/lib/contexts/ThemeContext";

export default function BackdropLayer() {
    const { theme } = useTheme();
    const { backdropFilter } = theme.background;
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); // Start at 0,0 or center

    useEffect(() => {
        // Initialize to center
        setMousePos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: e.clientX,
                y: e.clientY,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    if (!backdropFilter.enabled) return null;

    const { blur, gradientOpacity, gradient } = backdropFilter;

    // Use HSLA to apply opacity to the gradient colors
    // We want a "flashlight" effect, so we'll use the primary/secondary colors but with a focus on the center
    const color1 = `hsla(${gradient.color1.h}, ${gradient.color1.s}%, ${gradient.color1.l}%, ${gradientOpacity})`;
    const color2 = `hsla(${gradient.color2.h}, ${gradient.color2.s}%, ${gradient.color2.l}%, ${gradientOpacity})`;

    return (
        <div
            className="fixed inset-0 w-full h-full pointer-events-none"
            style={{
                zIndex: 1,
                backdropFilter: `blur(${blur}px)`,
                WebkitBackdropFilter: `blur(${blur}px)`,
                background: `
                    radial-gradient(
                        ${gradient.radius}px circle at ${mousePos.x}px ${mousePos.y}px, 
                        ${color2} 0%, 
                        transparent 80%
                    ),
                    linear-gradient(
                        ${gradient.angle}deg, 
                        ${color1} 0%, 
                        ${color1} 100%
                    )
                `,
                transition: "background 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)", // Smooth follow
            }}
        />
    );
}
