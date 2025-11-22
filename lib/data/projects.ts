export interface Project {
    title: string;
    subtitle: string;
    challenge: string;
    solution: string;
    impact: string;
    tech: string[];
    role: string;
    link?: string;
    metrics?: string[];
}

export const projects: Project[] = [
    {
        title: "Prognosys",
        subtitle: "Health Analytics Platform",
        challenge: "Transform complex blood biomarker data into actionable, personalized nutrition insights for wellness optimization.",
        solution: "Architected end-to-end data pipeline and built production-ready Next.js platform with Python backend for real-time biomarker analysis.",
        impact: "Enabled personalized health recommendations through advanced data processing and intuitive user interface.",
        tech: ["Python", "Next.js", "Data Science", "API Integration", "UI/UX"],
        role: "Technical Lead - Backend Architecture & Product Development",
        metrics: ["Real-time data processing", "Scalable architecture", "Production deployment"],
    },
    {
        title: "Nebula-Portal",
        subtitle: "Immersive 3D Landing Page",
        challenge: "Create a visually stunning, high-performance landing page that showcases technical creativity while maintaining optimal load times.",
        solution: "Built immersive 3D experience using Next.js, React, and Three.js with optimized rendering and smooth animations.",
        impact: "Delivered seamless 3D web experience with 60fps performance across devices, demonstrating advanced frontend capabilities.",
        tech: ["Next.js", "Three.js", "React", "WebGL", "Performance Optimization"],
        role: "Frontend Developer - 3D Implementation & Performance",
        metrics: ["60fps rendering", "< 2s load time", "Mobile optimized"],
    },
    {
        title: "Fractal-Gallery",
        subtitle: "Interactive 3D Math-Art Platform",
        challenge: "Build an educational platform that makes complex fractal geometry accessible and visually engaging for users.",
        solution: "Developed interactive 3D gallery with Three.js and WebGL, featuring dynamic controls and cyberpunk aesthetics for exploring mathematical concepts.",
        impact: "Created engaging educational tool that combines art and mathematics, making fractal geometry accessible to broader audiences.",
        tech: ["Three.js", "WebGL", "JavaScript", "GLSL", "Interactive Design"],
        role: "Full-Stack Developer - 3D Graphics & User Experience",
        metrics: ["Real-time rendering", "Interactive controls", "Educational impact"],
    },
    {
        title: "MiRo-E Robot Emotion",
        subtitle: "AI-Powered Emotion Recognition",
        challenge: "Develop real-time emotion recognition system for MiRo-E robot to enable natural human-robot interaction.",
        solution: "Integrated BERT NLP model with TensorFlow for real-time sentiment analysis, achieving high classification accuracy through model optimization.",
        impact: "Achieved ~82% classification accuracy with live demonstrations, advancing social robotics capabilities.",
        tech: ["Python", "TensorFlow", "BERT", "NLP", "Robotics"],
        role: "ML Engineer - Model Development & Integration",
        metrics: ["82% accuracy", "Real-time processing", "Live deployment"],
    },
    {
        title: "Enterprise Billing System",
        subtitle: "Production Financial Platform",
        challenge: "Design and implement production-grade billing management system for enterprise clients with complex workflow requirements.",
        solution: "Led UI/UX design and Next.js implementation, integrating Java REST services with modular architecture for scalability.",
        impact: "Delivered production-used billing system serving enterprise clients, streamlining financial operations and reducing processing time.",
        tech: ["Next.js", "Java", "REST API", "UI/UX", "Enterprise Architecture"],
        role: "Lead Developer - Full-Stack Implementation & Design",
        metrics: ["Production deployment", "Enterprise scale", "Modular design"],
    },
];
