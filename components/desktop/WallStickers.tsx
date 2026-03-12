"use client";

import { useEffect, useState } from "react";

const PHRASES = [
  "stay hydrated",
  "coffee break ☕",
  "ship it.",
  "git push --force-with-lease",
  "0 bugs 0 worries",
  "build > talk",
  "rm -rf doubts/",
];

interface Sticker {
  text: string;
  x: number;
  y: number;
  rotation: number;
  size: number;
}

export default function WallStickers() {
  const [stickers, setStickers] = useState<Sticker[]>([]);

  useEffect(() => {
    const placed: Sticker[] = PHRASES.map((text) => ({
      text,
      x: 15 + Math.random() * 70,
      y: 10 + Math.random() * 75,
      rotation: -15 + Math.random() * 30,
      size: 10 + Math.random() * 6,
    }));
    setStickers(placed);
  }, []);

  if (!stickers.length) return null;

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden hidden md:block" aria-hidden="true">
      {stickers.map((s, i) => (
        <span
          key={i}
          className="absolute font-mono whitespace-nowrap select-none"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            transform: `rotate(${s.rotation}deg)`,
            fontSize: `${s.size}px`,
            color: "rgba(0, 255, 65, 0.08)",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          {s.text}
        </span>
      ))}
    </div>
  );
}
