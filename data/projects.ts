import type { Project } from "@/components/ProjectCard";

export const projects: Project[] = [
  {
    title: "Neon Drift",
    year: 2025,
    role: "Unity Lead Developer",
    tools: ["Unity", "C#", "URP", "Addressables"],
    description: "Mobile arcade racer with procedural track generation and GPU-driven VFX.",
    images: ["/images/featured.svg"],
    link: "/projects",
  },
  {
    title: "LLM NPC Dialogue",
    year: 2024,
    role: "ML Engineer",
    tools: ["Python", "LoRA", "RAG", "LangChain"],
    description: "Fine-tuned character dialogue models with memory and tool-use for NPC interactions.",
    images: ["/images/placeholder-ml.svg"],
    link: "/projects",
  },
  {
    title: "Pixls Live Ops",
    year: 2024,
    role: "Mobile Game Dev Specialist",
    tools: ["Unity", "C#", "Analytics"],
    description: "AB-testing framework and economy balancing tools integrated into live titles.",
    images: ["/images/placeholder.svg"],
    link: "/projects",
  },
  {
    title: "Shader Playground",
    year: 2023,
    role: "Graphics Programmer",
    tools: ["Unity", "HLSL", "URP"],
    description: "Stylized neon effects, bloom, and holographic surfaces optimized for mobile.",
    images: ["/images/placeholder.svg"],
    link: "/projects",
  },
  {
    title: "RL Tuning for Enemy AI",
    year: 2023,
    role: "Researcher",
    tools: ["Python", "PyTorch", "RL"],
    description: "Policy-gradient tuning for adaptive difficulty in mobile arenas.",
    images: ["/images/placeholder-ml.svg"],
    link: "/projects",
  },
];




