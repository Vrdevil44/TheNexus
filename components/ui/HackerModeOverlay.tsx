"use client";

import { useEffect, useRef } from "react";
import { useHackerMode } from "@/lib/context/HackerModeContext";
import { motion, AnimatePresence } from "framer-motion";

export default function HackerModeOverlay() {
    const { isHackerMode } = useHackerMode();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!isHackerMode || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops: number[] = [];

        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        let animationFrameId: number;

        const draw = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#0F0"; // Green text
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", handleResize);
        };
    }, [isHackerMode]);

    return (
        <AnimatePresence>
            {isHackerMode && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-50 pointer-events-none mix-blend-screen"
                >
                    <canvas ref={canvasRef} className="w-full h-full" />
                    <div className="absolute inset-0 bg-green-900/20 pointer-events-none" />
                    <div className="absolute top-4 right-4 text-green-500 font-mono text-sm animate-pulse">
                        SYSTEM OVERRIDE: ACTIVE
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
