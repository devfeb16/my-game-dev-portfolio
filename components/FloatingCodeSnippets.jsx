"use client";
import { useEffect, useState } from "react";

const codeSnippets = [
  "void Update() { ... }",
  "NPC.Dialogue.RAG()",
  "await FineTune()",
  "Instantiate(prefab)",
  "StartCoroutine()",
  "PlayerPrefs.Save()",
];

const animations = [
  { x: 20, y: -30, r: 5 },
  { x: -25, y: 25, r: -5 },
  { x: 15, y: 20, r: 3 },
  { x: -20, y: -20, r: -3 },
  { x: 25, y: 15, r: 4 },
  { x: -15, y: 25, r: -4 },
];

export default function FloatingCodeSnippets() {
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    const newSnippets = codeSnippets.map((text, i) => ({
      id: Math.random() * 100,
      text: text,
      x: animations[i] ? animations[i].x : Math.random() * 100,
      y: animations[i] ? animations[i].y : Math.random() * 100,
      delay: Math.random() * 3,
      animId: i,
    }));
    setSnippets(newSnippets);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float-code-0 {
          0%, 100% { transform(0, 0) rotate(0deg); opacity: 0.3; }
          50% { transform(20px, -30px) rotate(5deg); opacity: 0.6; }
        }
        @keyframes float-code-1 {
          0%, 100% { transform(0, 0) rotate(0deg); opacity: 0.2; }
          50% { transform(-25px, 25px) rotate(-5deg); opacity: 0.5; }
        }
        @keyframes float-code-2 {
          0%, 100% { transform(0, 0) rotate(0deg); opacity: 0.25; }
          50% { transform(15px, 20px) rotate(3deg); opacity: 0.55; }
        }
        @keyframes float-code-3 {
          0%, 100% { transform(0, 0) rotate(0deg); opacity: 0.2; }
          50% { transform(-20px, -20px) rotate(-3deg); opacity: 0.5; }
        }
        @keyframes float-code-4 {
          0%, 100% { transform(0, 0) rotate(0deg); opacity: 0.3; }
          50% { transform(25px, 15px) rotate(4deg); opacity: 0.6; }
        }
        @keyframes float-code-5 {
          0%, 100% { transform(0, 0) rotate(0deg); opacity: 0.25; }
          50% { transform(-15px, 25px) rotate(-4deg); opacity: 0.55; }
        }
      `}} />
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {snippets.map((s) => (
          <div
            key={s.id}
            className="absolute text-[10px] font-mono text-neon-cyan/30 select-none"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              animationDelay: `${s.delay}s`,
              animation: `float-code-${s.animId} ${8 + Math.random() * 4}s ease-in-out infinite`,
            }}
          >
            {s.text}
          </div>
        ))}
      </div>
    </>
  );
}
