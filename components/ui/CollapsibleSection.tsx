"use client";

import { useState, ReactNode } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface CollapsibleSectionProps {
    title: string;
    children: ReactNode;
    defaultOpen?: boolean;
    className?: string;
}

export default function CollapsibleSection({
    title,
    children,
    defaultOpen = false,
    className = ""
}: CollapsibleSectionProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className={`border-t border-white/10 ${className}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-3 text-left group hover:bg-white/5 transition-colors rounded-lg px-2 -mx-2"
            >
                <h4 className="text-sm font-semibold text-white group-hover:text-primary transition-colors">
                    {title}
                </h4>
                {isOpen ? (
                    <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                )}
            </button>

            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[1000px] opacity-100 mb-4" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="pt-2 px-1">
                    {children}
                </div>
            </div>
        </div>
    );
}
