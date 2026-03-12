"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { BOOT_LINES } from "@/lib/constants";

interface BootSequenceProps {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineIndexRef = useRef(0);
  const [phase, setPhase] = useState<"flash" | "bios" | "loading" | "done">("flash");
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(containerRef.current, { backgroundColor: "#ffffff", duration: 0.08 })
      .to(containerRef.current, {
        backgroundColor: "#0a0a0a",
        duration: 0.3,
        onComplete: () => setPhase("bios"),
      });
    return () => { tl.kill(); };
  }, []);

  useEffect(() => {
    if (phase !== "bios") return;
    const interval = setInterval(() => {
      const idx = lineIndexRef.current;
      if (idx < BOOT_LINES.length) {
        lineIndexRef.current = idx + 1;
        setVisibleLines((prev) => [...prev, BOOT_LINES[idx]]);
      } else {
        clearInterval(interval);
        setTimeout(() => setPhase("loading"), 300);
      }
    }, 80);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase !== "loading") return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            gsap.to(containerRef.current, { opacity: 0, duration: 0.5, onComplete });
          }, 200);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [phase, onComplete]);

  const handleSkip = () => {
    gsap.to(containerRef.current, { opacity: 0, duration: 0.3, onComplete });
  };

  const getLineColor = (line: string) => {
    if (line.startsWith("  [OK]")) return "#00ff41";
    if (line === "") return "transparent";
    return "#e0e0e0";
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col justify-center bg-[#0a0a0a] p-4 md:p-8 font-mono"
      onClick={handleSkip}
    >
      {phase === "bios" && (
        <div className="max-w-2xl mx-auto w-full overflow-y-auto max-h-[80vh]">
          {visibleLines.map((line, i) => (
            <div
              key={i}
              className="text-[10px] md:text-sm leading-5 md:leading-6 whitespace-pre"
              style={{ color: getLineColor(line) }}
            >
              {line || "\u00A0"}
            </div>
          ))}
          <span className="inline-block w-2 h-3 md:h-4 bg-[#00ff41] cursor-blink ml-0.5" />
        </div>
      )}

      {phase === "loading" && (
        <div className="max-w-xs md:max-w-md mx-auto w-full text-center">
          <p className="text-[#00ff41] text-xs md:text-sm mb-4 font-mono phosphor-glow">
            Loading...
          </p>
          <div className="w-full h-1.5 md:h-2 bg-[rgba(0,255,65,0.1)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#00ff41] rounded-full transition-all duration-100"
              style={{
                width: `${Math.min(progress, 100)}%`,
                boxShadow: "0 0 10px rgba(0,255,65,0.5)",
              }}
            />
          </div>
          <p className="text-[#00ff41] text-[10px] md:text-xs mt-2 font-mono opacity-60">
            {Math.min(Math.floor(progress), 100)}%
          </p>
        </div>
      )}

      <p className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 text-[10px] md:text-xs text-[rgba(255,255,255,0.2)] font-mono">
        Tap anywhere to skip
      </p>
    </div>
  );
}
