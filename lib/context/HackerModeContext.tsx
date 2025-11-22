"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface HackerModeContextType {
    isHackerMode: boolean;
    toggleHackerMode: () => void;
}

const HackerModeContext = createContext<HackerModeContextType | undefined>(undefined);

export function HackerModeProvider({ children }: { children: ReactNode }) {
    const [isHackerMode, setIsHackerMode] = useState(false);

    const toggleHackerMode = () => {
        setIsHackerMode((prev) => !prev);
    };

    return (
        <HackerModeContext.Provider value={{ isHackerMode, toggleHackerMode }}>
            {children}
        </HackerModeContext.Provider>
    );
}

export function useHackerMode() {
    const context = useContext(HackerModeContext);
    if (context === undefined) {
        throw new Error("useHackerMode must be used within a HackerModeProvider");
    }
    return context;
}
