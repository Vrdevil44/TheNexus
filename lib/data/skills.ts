import { LucideIcon, Server, Network, Shield, Terminal, Code, Database, Layout, Box } from "lucide-react";

export interface Skill {
    name: string;
    icon: LucideIcon;
    category: "infrastructure" | "dev";
}

export const skills: Skill[] = [
    // Infrastructure
    { name: "Windows Server 2019", icon: Server, category: "infrastructure" },
    { name: "Active Directory", icon: Shield, category: "infrastructure" },
    { name: "Azure AD / Entra", icon: Shield, category: "infrastructure" },
    { name: "Intune", icon: Box, category: "infrastructure" },
    { name: "Cisco Switching", icon: Network, category: "infrastructure" },
    { name: "Structured Cabling", icon: Network, category: "infrastructure" },
    { name: "Sophos Firewall", icon: Shield, category: "infrastructure" },
    { name: "M365 Admin", icon: Server, category: "infrastructure" },

    // Development
    { name: "React.js", icon: Code, category: "dev" },
    { name: "Next.js 14", icon: Layout, category: "dev" },
    { name: "TypeScript", icon: Code, category: "dev" },
    { name: "Tailwind CSS", icon: Layout, category: "dev" },
    { name: "Three.js / R3F", icon: Box, category: "dev" },
    { name: "Python / FastAPI", icon: Terminal, category: "dev" },
    { name: "MongoDB", icon: Database, category: "dev" },
    { name: "Docker", icon: Box, category: "dev" },
];
