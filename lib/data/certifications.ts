export interface Certification {
    name: string;
    issuer: string;
    year: string;
    status: "completed" | "in-progress";
    category: "cloud" | "networking" | "development" | "security";
}

export const certifications: Certification[] = [
    // In Progress
    {
        name: "CCNA (200-301)",
        issuer: "Cisco",
        year: "In Progress",
        status: "in-progress",
        category: "networking",
    },
    {
        name: "Azure Administrator (AZ-104)",
        issuer: "Microsoft",
        year: "In Progress",
        status: "in-progress",
        category: "cloud",
    },
    // Completed
    {
        name: "Google IT Support Professional",
        issuer: "Google",
        year: "2025",
        status: "completed",
        category: "networking",
    },
    {
        name: "Microsoft Cybersecurity Fundamentals",
        issuer: "Microsoft",
        year: "2024",
        status: "completed",
        category: "security",
    },
    {
        name: "Web Scraping with Python",
        issuer: "Coursera",
        year: "2024",
        status: "completed",
        category: "development",
    },
    {
        name: "Java SE 7 Programmer II",
        issuer: "Oracle",
        year: "2023",
        status: "completed",
        category: "development",
    },
    {
        name: "React.js Developer",
        issuer: "Certificate Authority",
        year: "2023",
        status: "completed",
        category: "development",
    },
    {
        name: "Google Technical Support Fundamentals",
        issuer: "Google",
        year: "2023",
        status: "completed",
        category: "networking",
    },
    {
        name: "HackerRank Problem Solving (Basic)",
        issuer: "HackerRank",
        year: "2023",
        status: "completed",
        category: "development",
    },
];
