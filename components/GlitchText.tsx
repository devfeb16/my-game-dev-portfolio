"use client";

type GlitchTextProps = {
  children: React.ReactNode;
  className?: string;
};

export default function GlitchText({ children, className }: GlitchTextProps) {
  return (
    <span className={`relative inline-block ${className || ""}`}>
      <span className="glitch-text" data-text={children}>
        {children}
      </span>
      <style jsx>{`
        .glitch-text {
          position: relative;
          display: inline-block;
        }
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .glitch-text::before {
          left: 2px;
          text-shadow: -2px 0 #ff4dff;
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim 5s infinite linear alternate-reverse;
          opacity: 0.8;
        }
        .glitch-text::after {
          left: -2px;
          text-shadow: -2px 0 #00d8ff, 2px 2px #ff4dff;
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim2 1s infinite linear alternate-reverse;
          opacity: 0.8;
        }
        @keyframes glitch-anim {
          0% { clip: rect(10px, 9999px, 70px, 0); }
          20% { clip: rect(50px, 9999px, 30px, 0); }
          40% { clip: rect(30px, 9999px, 60px, 0); }
          60% { clip: rect(70px, 9999px, 20px, 0); }
          80% { clip: rect(20px, 9999px, 80px, 0); }
          100% { clip: rect(40px, 9999px, 50px, 0); }
        }
        @keyframes glitch-anim2 {
          0% { clip: rect(80px, 9999px, 10px, 0); }
          20% { clip: rect(20px, 9999px, 70px, 0); }
          40% { clip: rect(60px, 9999px, 30px, 0); }
          60% { clip: rect(10px, 9999px, 90px, 0); }
          80% { clip: rect(90px, 9999px, 20px, 0); }
          100% { clip: rect(30px, 9999px, 60px, 0); }
        }
      `}</style>
    </span>
  );
}



