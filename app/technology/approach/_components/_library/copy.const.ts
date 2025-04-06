import { CorePrinciple } from "../core-guiding-principles/CoreGuidingPrinciples";





export const corePrinciples: CorePrinciple[] = [
    {
        title: "Performance & Scalability First",
        bullets: [
            "Technology should be efficient, scalable, and future-proof.",
            "I prioritize modularity, cloud-native solutions, and distributed computing to ensure resilience."
        ],
        photo: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586751/Convert_to_PNG_project_21_kqqjwf.png"
    },
    {
        title: "Clean, Maintainable, & Secure Code",
        bullets: [
            "Code should be simple, self-documenting, and adaptable.",
            "I follow clean coding principles, emphasizing readability, DRY (Don't Repeat Yourself), and SOLID principles."
        ],
        photo: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586765/Convert_to_PNG_project_7_thr4kh.png"
    },
    {
        title: "AI & Automation as Force Multipliers",
        bullets: [
            "AI isn't just about intelligence—it’s about creating leverage.",
            "I integrate AI & automation where it enhances productivity, decision-making, and long-term sustainability."
        ],
        photo: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586751/Convert_to_PNG_project_17_q0znzm.png"
    },
    {
        title: "Ethical, Human-Centered Design",
        bullets: [
            "Technology should improve lives, not create unnecessary complexity.",
            "Every system I design considers usability, security, and long-term impact on society."
        ],
        photo: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586766/Convert_to_PNG_project_4_cu3yxd.png"
    }
];


export type DesignPattern = {
    title: string;
    description: string;
    photo: string;
};

export const designPatterns: DesignPattern[] = [
    {
        title: "Domain-Driven Design (DDD)",
        description: "Ensuring software models match business needs.",
        photo: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586765/Convert_to_PNG_project_7_thr4kh.png"
    },
    {
        title: "Microservices & Event-Driven Architectures",
        description: "Building scalable, decoupled applications.",
        photo: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586752/Convert_to_PNG_project_12_pb2uhd.png"
    },
    {
        title: "Functional & Reactive Programming",
        description: "Writing resilient, adaptable software.",
        photo: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586766/Convert_to_PNG_project_2_wyltq0.png"
    },
    {
        title: "Layered & Hexagonal Architectures",
        description: "Decoupling dependencies for long-term flexibility.",
        photo: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586765/Convert_to_PNG_project_9_iqwsay.png"
    },
    {
        title: "Test-Driven Development (TDD) & CI/CD Pipelines",
        description: "Ensuring robust, well-tested applications.",
        photo: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586766/Convert_to_PNG_project_4_cu3yxd.png"
    }
];



export type TechPhilosophyPoint = {
    title: string;
    description: string;
    photo: string;
};

export const techPhilosophy: TechPhilosophyPoint[] = [
    {
        title: "Automation to Reduce Cognitive Load",
        description: "Freeing up mental space for creative problem-solving.",
        photo: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586765/Convert_to_PNG_project_6_l6ne1h.png"
    },
    {
        title: "AI to Enhance Decision-Making",
        description: "Using data-driven insights without replacing human intuition.",
        photo: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586752/Convert_to_PNG_project_12_pb2uhd.png"
    },
    {
        title: "Software That Enables, Not Overwhelms",
        description: "Designing tech that simplifies, rather than complicates, life.",
        photo: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586751/Convert_to_PNG_project_21_kqqjwf.png"
    },
    {
        title: "Creating Solutions That Empower People",
        description: "Building tools that increase financial, intellectual, and personal growth.",
        photo: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586750/Convert_to_PNG_project_24_x4dkwa.png"
    }
];

export type ProjectSelectionCriteria = {
    label: string;
    info: string;
    photo: string;
};


export const projectSelectionCriteria: ProjectSelectionCriteria[] = [
    {
        label: "Scalability & Efficiency",
        info: "Can the solution grow and remain cost-effective?",
        photo: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586750/DALL_E_2025-03-11_13.08.27_-_A_high-resolution_3D-styled_abstract_design_featuring_a_liquid_metal_and_carbon_blob_loosely_forming_the_shape_of_an_apartment_building._The_structur_s3hqlz.webp"
    },
    {
        label: "Ethical & Impact-Driven",
        info: "Does it genuinely improve lives, workflows, or industries?",
        photo: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586766/Convert_to_PNG_project_4_cu3yxd.png"
    },
    {
        label: "Technological Innovation",
        info: "Does it push boundaries in AI, automation, or Web3?",
        photo: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586752/Convert_to_PNG_project_10_ntzzap.png"
    },
    {
        label: "Long-Term Sustainability",
        info: "Can it be maintained without unnecessary complexity?",
        photo: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586765/Convert_to_PNG_project_8_grrrui.png"
    },
    {
        label: "Challenging & Innovative Ideas",
        info: "I’m drawn to projects that challenge the norm and demand creativity, deep thinking, and bold technical vision.",
        photo: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586751/Convert_to_PNG_project_13_q3bwj5.png"
    }
];

export type TechImpactHighlight = {
    title: string;
    bullets: string[];
    photo: string;
};

export const techImpactHighlights: TechImpactHighlight[] = [
    {
        title: "🚀 Scalable, Secure, and Maintainable Applications",
        bullets: [
            "✅ Tech that grows with the business—without breaking.",
            "✅ No technical debt, just clean, efficient systems."
        ],
        photo: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586750/DALL_E_2025-03-11_13.08.27_-_A_high-resolution_3D-styled_abstract_design_featuring_a_liquid_metal_and_carbon_blob_loosely_forming_the_shape_of_an_apartment_building._The_structur_s3hqlz.webp"

    },
    {
        title: "🔥 Faster Development & Higher Productivity",
        bullets: [
            "✅ AI-driven automation speeds up workflows.",
            "✅ CI/CD & DevOps practices reduce deployment times."
        ],
        photo: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586750/Convert_to_PNG_project_24_x4dkwa.png"
    },
    {
        title: "🌍 Real-World Impact & Business Success",
        bullets: [
            "✅ Tech that makes businesses more profitable & efficient.",
            "✅ AI & automation that reduce workload and optimize operations."
        ],
        photo: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1742586750/Convert_to_PNG_project_22_rleyna.png"
    }
];
