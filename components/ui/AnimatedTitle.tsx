"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/contexts/ThemeContext";

interface AnimatedTitleProps {
    text: string;
    className?: string;
}

export default function AnimatedTitle({ text, className }: AnimatedTitleProps) {
    const { theme } = useTheme();
    const controls = useAnimationControls();
    const [isHovered, setIsHovered] = useState(false);

    // Get theme colors for glow effect
    const primaryColor = `hsl(${theme.colors.primary.h}, ${theme.colors.primary.s}%, ${theme.colors.primary.l}%)`;
    const secondaryColor = `hsl(${theme.colors.secondary.h}, ${theme.colors.secondary.s}%, ${theme.colors.secondary.l}%)`;

    // Continuous subtle pulse animation with theme colors
    useEffect(() => {
        controls.start({
            textShadow: [
                `0 0 10px ${primaryColor}80`,
                `0 0 20px ${primaryColor}4D`,
                `0 0 10px ${primaryColor}80`,
            ],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
            },
        });
    }, [controls, primaryColor]);

    const characters = text.split("");

    return (
        <div
            className={cn("flex overflow-hidden cursor-default", className)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ fontFamily: theme.fonts.heading }}
        >
            {characters.map((char, index) => (
                <AnimatedChar
                    key={index}
                    char={char}
                    index={index}
                    primaryColor={primaryColor}
                    secondaryColor={secondaryColor}
                />
            ))}
        </div>
    );
}

const AnimatedChar = ({
    char,
    index,
    primaryColor,
    secondaryColor
}: {
    char: string;
    index: number;
    primaryColor: string;
    secondaryColor: string;
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const controls = useAnimationControls();

    const handleHover = async () => {
        setIsHovered(true);

        // Glitch/Matrix effect on hover with theme colors
        await controls.start({
            scale: [1, 1.2, 0.9, 1.1, 1],
            color: ["#ffffff", primaryColor, secondaryColor, "#ffffff"],
            y: [0, -5, 5, 0],
            transition: { duration: 0.4 },
        });

        setIsHovered(false);
    };

    return (
        <motion.span
            className="inline-block"
            animate={controls}
            whileHover={{ scale: 1.2, color: primaryColor }}
            onMouseEnter={handleHover}
            style={{
                display: char === " " ? "inline-block" : "inline-block",
                width: char === " " ? "0.5em" : "auto"
            }}
        >
            {char}
        </motion.span>
    );
};
