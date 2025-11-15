"use client";
import { useEffect, useState } from "react";
import styles from "./FloatingCodeSnippets.module.css";

const codeSnippets = [
  "void Update() { ... }",
  "NPC.Dialogue.RAG()",
  "await FineTune()",
  "Instantiate(prefab)",
  "StartCoroutine()",
  "PlayerPrefs.Save()",
];

// Snippet configurations - distributed across different areas of hero section
// Each snippet has a unique starting position and movement pattern
const snippetConfigs = [
  {
    // Top-left area - Figure-8 pattern
    startX: 10,
    startY: 15,
    duration: 28,
    delay: 0,
  },
  {
    // Top-right area - Zigzag pattern
    startX: 90,
    startY: 20,
    duration: 32,
    delay: 2,
  },
  {
    // Bottom-left area - Spiral pattern
    startX: 12,
    startY: 75,
    duration: 35,
    delay: 4,
  },
  {
    // Bottom-right area - Wave pattern
    startX: 88,
    startY: 80,
    duration: 30,
    delay: 1.5,
  },
  {
    // Top-center area - Diagonal sweep
    startX: 50,
    startY: 12,
    duration: 38,
    delay: 3,
  },
  {
    // Bottom-center area - Random wander
    startX: 50,
    startY: 85,
    duration: 40,
    delay: 5,
  },
];

export default function FloatingCodeSnippets() {
  const [snippets, setSnippets] = useState([]);

  // Animation class mapping
  const animationClasses = [
    styles.floatPath1,
    styles.floatPath2,
    styles.floatPath3,
    styles.floatPath4,
    styles.floatPath5,
    styles.floatPath6,
  ];

  useEffect(() => {
    const newSnippets = codeSnippets.map((text, i) => ({
      id: `snippet-${i}`,
      text: text,
      config: snippetConfigs[i] || snippetConfigs[0],
    }));
    setSnippets(newSnippets);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-[2]" aria-hidden="true">
      {snippets.map((s, index) => {
        const config = s.config;
        const animationClass = animationClasses[index] || animationClasses[0];
        return (
          <div
            key={s.id}
            className={`${styles.codeSnippet} absolute text-[10px] md:text-[11px] font-mono text-neon-cyan/30 select-none ${animationClass}`}
            style={{
              left: `${config.startX}%`,
              top: `${config.startY}%`,
              animationDelay: `${config.delay}s`,
              willChange: 'transform, opacity',
            }}
          >
            <span className={`${styles.codeSnippetBox} relative inline-block px-2.5 py-1.5 rounded-md`}>
              {s.text}
            </span>
          </div>
        );
      })}
    </div>
  );
}
