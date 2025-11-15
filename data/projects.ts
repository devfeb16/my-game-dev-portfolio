import type { Project } from "@/components/ProjectCard";

export const projects: Project[] = [
  {
    title: "Neon Drift",
    year: 2025,
    role: "Unity Lead Developer",
    tools: ["Unity", "C#", "URP", "Addressables"],
    description: "Mobile arcade racer with procedural track generation and GPU-driven VFX.",
    images: ["/images/neon-drift.svg"],
    link: "/projects",
  },
  {
    title: "LLM NPC Dialogue",
    year: 2024,
    role: "ML Engineer",
    tools: ["Python", "LoRA", "RAG", "LangChain"],
    description: "Fine-tuned character dialogue models with memory and tool-use for NPC interactions.",
    images: ["/images/llm-npc-dialogue.svg"],
    link: "/projects",
  },
  {
    title: "UnityDev Live Ops",
    year: 2024,
    role: "Mobile Game Dev Specialist",
    tools: ["Unity", "C#", "Analytics"],
    description: "AB-testing framework and economy balancing tools integrated into live titles.",
    images: ["/images/pixls-live-ops.svg"],
    link: "/projects",
  },
  {
    title: "Shader Playground",
    year: 2023,
    role: "Graphics Programmer",
    tools: ["Unity", "HLSL", "URP"],
    description: "Stylized neon effects, bloom, and holographic surfaces optimized for mobile.",
    images: ["/images/shader-playground.svg"],
    link: "/projects",
  },
  {
    title: "RL Tuning for Enemy AI",
    year: 2023,
    role: "Researcher",
    tools: ["Python", "PyTorch", "RL"],
    description: "Policy-gradient tuning for adaptive difficulty in mobile arenas.",
    images: ["/images/rl-ai-tuning.svg"],
    link: "/projects",
  },
];




