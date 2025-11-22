"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface GravityStarsBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
    starsCount?: number;
    starsSize?: number;
    starsOpacity?: number;
    glowIntensity?: number;
    glowAnimation?: "instant" | "ease" | "spring";
    movementSpeed?: number;
    mouseInfluence?: number;
    mouseGravity?: "attract" | "repel";
    gravityStrength?: number;
    starsInteraction?: boolean;
    starsInteractionType?: "bounce" | "merge";
}

interface Star {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    alpha: number;
    glow: number;
}

export default function GravityStarsBackground({
    className,
    starsCount = 75,
    starsSize = 2,
    starsOpacity = 0.75,
    glowIntensity = 15,
    glowAnimation = "ease",
    movementSpeed = 0.3,
    mouseInfluence = 100,
    mouseGravity = "attract",
    gravityStrength = 75,
    starsInteraction = false,
    starsInteractionType = "bounce",
    ...props
}: GravityStarsBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const starsRef = useRef<Star[]>([]);

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const { clientWidth, clientHeight } = containerRef.current;
                setDimensions({ width: clientWidth, height: clientHeight });
            }
        };

        window.addEventListener("resize", updateDimensions);
        updateDimensions();

        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    useEffect(() => {
        if (!canvasRef.current || dimensions.width === 0 || dimensions.height === 0) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = dimensions.width;
        canvas.height = dimensions.height;

        // Initialize stars
        const initStars = () => {
            const stars: Star[] = [];
            for (let i = 0; i < starsCount; i++) {
                stars.push({
                    x: Math.random() * dimensions.width,
                    y: Math.random() * dimensions.height,
                    vx: (Math.random() - 0.5) * movementSpeed,
                    vy: (Math.random() - 0.5) * movementSpeed,
                    radius: Math.random() * starsSize + 0.5,
                    alpha: Math.random() * starsOpacity + 0.1,
                    glow: Math.random() * glowIntensity,
                });
            }
            starsRef.current = stars;
        };

        initStars();

        let animationFrameId: number;

        const animate = () => {
            ctx.clearRect(0, 0, dimensions.width, dimensions.height);

            starsRef.current.forEach((star) => {
                // Basic movement
                star.x += star.vx;
                star.y += star.vy;

                // Bounce off walls
                if (star.x < 0 || star.x > dimensions.width) star.vx *= -1;
                if (star.y < 0 || star.y > dimensions.height) star.vy *= -1;

                // Mouse interaction (Gravity)
                const dx = mouseRef.current.x - star.x;
                const dy = mouseRef.current.y - star.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouseInfluence * 2) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouseInfluence * 2 - distance) / (mouseInfluence * 2);
                    const direction = mouseGravity === "attract" ? 1 : -1;
                    const strength = gravityStrength * 0.001;

                    star.vx += forceDirectionX * force * strength * direction;
                    star.vy += forceDirectionY * force * strength * direction;
                }

                // Friction to prevent infinite acceleration
                star.vx *= 0.99;
                star.vy *= 0.99;

                // Draw star
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
                ctx.fill();

                // Draw glow
                if (star.glow > 0) {
                    const gradient = ctx.createRadialGradient(
                        star.x,
                        star.y,
                        star.radius,
                        star.x,
                        star.y,
                        star.radius + star.glow
                    );
                    gradient.addColorStop(0, `rgba(255, 255, 255, ${star.alpha * 0.5})`);
                    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.radius + star.glow, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                mouseRef.current = {
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                };
            }
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: -1000, y: -1000 };
        };

        window.addEventListener("mousemove", handleMouseMove);
        containerRef.current?.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("mousemove", handleMouseMove);
            containerRef.current?.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [
        dimensions,
        starsCount,
        starsSize,
        starsOpacity,
        glowIntensity,
        movementSpeed,
        mouseInfluence,
        mouseGravity,
        gravityStrength,
    ]);

    return (
        <div
            ref={containerRef}
            className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
            style={{ zIndex: -1 }}
            {...props}
        >
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        </div>
    );
}
