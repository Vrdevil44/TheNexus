export interface Experience {
    title: string;
    company: string;
    location: string;
    period: string;
    description: string[];
    achievements: string[];
}

export const experiences: Experience[] = [
    {
        title: "On-Site IT Executive",
        company: "Unio Tech Solutions",
        location: "Vancouver, BC (Multi-City Canada)",
        period: "Jun 2025 – Present",
        description: [
            "Sole field IT executive for BC supporting institutional, commercial, executive, and government clients across BC/Ontario/Alberta.",
            "Act as HQ's technical representative for enterprise acquisitions and infrastructure rollouts.",
        ],
        achievements: [
            "Consolidated fragmented networks: removed 100+ unmanaged switches, deployed 500+ labeled data drops",
            "Boosted performance metrics: Wi-Fi throughput +40%, LAN speeds +30% through strategic remediation",
            "Reduced recurring support tickets by 30% through systematic infrastructure improvements",
            "Created repeatable 'First-Visit Pack' (inventory → risk map → remediation) adopted HQ-wide",
            "Standardized 100+ racks into secure, lockable cabinets with comprehensive labeling",
            "Supported Fortune 500 clients including Bell, Sephora, ADP, Intact across 13+ facilities",
        ],
    },
    {
        title: "IT Analyst Intern",
        company: "Archway Community Services",
        location: "Abbotsford, BC",
        period: "Feb 2025 – Jun 2025",
        description: [
            "Delivered comprehensive Tier 1 & 2 support to 600+ employee organization using Autotask + Datto RMM.",
            "Administered complete Microsoft 365/Entra ID stack including Azure AD, Intune, Exchange, SharePoint, and Defender.",
        ],
        achievements: [
            "Maintained <1 hour average ticket resolution time across all support categories",
            "Led MFA rollout achieving 80% adoption with zero compromised logins",
            "Deployed & imaged 100+ Windows 10/11 workstations, reducing setup time by 30%",
            "Reduced escalations by 30% through comprehensive SOPs and training documentation",
            "Accelerated employee onboarding from 2 weeks to 5 days through process optimization",
            "Resolved 35% of tickets remotely via RMM tools, maximizing uptime across offices",
        ],
    },
    {
        title: "IT Infrastructure Analyst",
        company: "Arini Data Services",
        location: "Abbotsford, BC",
        period: "Mar 2024 – Mar 2025",
        description: [
            "Delivered enterprise-grade infrastructure installations for major retail and commercial clients.",
            "Specialized in structured cabling, network rack design, and device deployment at scale.",
        ],
        achievements: [
            "Installed & certified 10,000+ meters of Cat6/Cat6e cabling with 100% Fluke compliance",
            "Designed 20+ secure network racks with professional labeling and documentation",
            "Deployed 200+ devices (POS, APs, cameras, displays) for Tesla & JD Sports retail sites",
            "Developed React.js/MongoDB inventory tools, reducing tracking errors by 40%",
            "Delivered day-one operational readiness for multi-location retail deployments",
            "Coordinated cross-functional teams (contractors, electricians, client IT) for seamless delivery",
        ],
    },
    {
        title: "Technical Operations Supervisor",
        company: "Veerji’s Haweli",
        location: "Abbotsford, BC",
        period: "Nov 2023 – Nov 2024",
        description: [
            "Supervised 10+ staff per shift across a multi-department restaurant/events business.",
            "Managed scheduling, payroll inputs, and compliance workflows.",
        ],
        achievements: [
            "Achieved 99% uptime for POS systems (Ranger → Clover migration), printers, and networks",
            "Trained staff on POS troubleshooting, reducing escalations by 50%",
            "Migrated manual scheduling/inventory to digital processes, streamlining operations",
            "Coordinated event logistics and tech setups for large-scale bookings",
            "Maintained 4.3/5 Google review score through reliable operations",
        ],
    },
    {
        title: "Digital Operations Assistant (Intern)",
        company: "Coli Spaces",
        location: "India",
        period: "Apr 2023 – Jun 2023",
        description: [
            "Supported internal workflow and inventory tracking systems.",
            "Assisted with vendor automation and digital campaign analytics.",
        ],
        achievements: [
            "Developed a Flutter app for internal workflow/inventory tracking",
            "Built React + FastAPI prototypes for dashboards",
            "Supported vendor automation workflows, reducing manual effort 15%",
            "Improved social media reach 40% through analytics-driven campaigns",
        ],
    },
    {
        title: "Web Developer Intern",
        company: "RAJ Speed Honda",
        location: "India",
        period: "Sep 2019 – Mar 2020",
        description: [
            "Launched dealership’s first responsive website and digital identity.",
            "Managed SEO and analytics to drive customer engagement.",
        ],
        achievements: [
            "Launched dealership’s first responsive website (HTML/CSS/JS/PHP/MySQL)",
            "Boosted organic traffic 60% in 3 months with SEO + Google Analytics",
            "Designed official brand identity aligned with local market",
            "Built inquiry workflows that increased customer leads digitally",
        ],
    },
    {
        title: "Web Developer (Part-Time)",
        company: "Asia Jaunt",
        location: "India",
        period: "Jun 2019 – Aug 2019",
        description: [
            "Built and deployed travel website with modern stack.",
            "Executed SEO strategy to improve search visibility.",
        ],
        achievements: [
            "Built and deployed a multi-page Next.js + Tailwind CSS travel website",
            "Executed SEO strategy, tripling search visibility",
            "Boosted lead capture 40% via Firebase forms",
            "Integrated analytics + conversion tracking to optimize booking funnels",
        ],
    },
    {
        title: "Customer Support Executive",
        company: "Paytm",
        location: "India",
        period: "Apr 2019 – Jun 2019",
        description: [
            "Delivered Tier-1 support resolving tickets within SLA.",
            "Contributed to knowledge base improvements.",
        ],
        achievements: [
            "Delivered Tier-1 support (voice, chat, email), resolving 95% of tickets within SLA",
            "Contributed to customer education redesign, reducing repeat queries",
            "Improved KB UX with HTML/CSS/JS tweaks, enabling smoother self-service",
            "Fed structured feedback reports into product teams",
        ],
    },
];
