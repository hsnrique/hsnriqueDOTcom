"use client";

import { useMemo } from "react";

const PALETTES = [
  ["#1a0533", "#0d1b2a", "#1b2838", "#2d1b4e", "#0a192f"],
  ["#0f0c29", "#1a1a2e", "#16213e", "#1f0038", "#0e1428"],
  ["#150020", "#1b0a2e", "#0d0221", "#1a0a30", "#0b0f1e"],
  ["#1c0522", "#0f1a2e", "#0a1628", "#200d35", "#0d1320"],
  ["#120024", "#1e0a3a", "#0a0f1e", "#2a0e4a", "#0c1825"],
  ["#0d0018", "#14082a", "#0b1020", "#1f0a38", "#091522"],
];

function seededRandom(seed: number) {
  let s = Math.abs(seed) || 1;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

interface GradientBlob {
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
}

function generateBlobs(seed: number): GradientBlob[] {
  const rand = seededRandom(seed);
  const palette = PALETTES[Math.floor(rand() * PALETTES.length)];
  const count = 5 + Math.floor(rand() * 3);

  return Array.from({ length: count }, () => ({
    x: rand() * 100,
    y: rand() * 100,
    size: 30 + rand() * 40,
    color: palette[Math.floor(rand() * palette.length)],
    duration: 20 + rand() * 30,
    delay: rand() * -30,
    driftX: 10 + rand() * 30,
    driftY: 10 + rand() * 25,
  }));
}

export default function LofiBackground() {
  const { blobs, keyframes } = useMemo(() => {
    const seed = Math.abs(Date.now() ^ Math.floor(Math.random() * 0xffffffff)) || 42;
    const generatedBlobs = generateBlobs(seed);

    const kf = generatedBlobs.map((blob, i) => `
      @keyframes drift-${i} {
        0%, 100% {
          transform: translate(0, 0) scale(1);
          opacity: 0.6;
        }
        25% {
          transform: translate(${blob.driftX}px, -${blob.driftY}px) scale(1.15);
          opacity: 0.8;
        }
        50% {
          transform: translate(-${blob.driftX * 0.5}px, ${blob.driftY * 0.7}px) scale(0.9);
          opacity: 0.5;
        }
        75% {
          transform: translate(${blob.driftX * 0.7}px, ${blob.driftY * 0.3}px) scale(1.1);
          opacity: 0.7;
        }
      }
    `).join("\n");

    return { blobs: generatedBlobs, keyframes: kf };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden" style={{ background: "#050505" }}>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
      {blobs.map((blob, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${blob.x}%`,
            top: `${blob.y}%`,
            width: `${blob.size}vw`,
            height: `${blob.size}vw`,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
            filter: "blur(80px)",
            animation: `drift-${i} ${blob.duration}s ease-in-out ${blob.delay}s infinite`,
            willChange: "transform, opacity",
            pointerEvents: "none",
          }}
        />
      ))}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, transparent 0%, #050505 75%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
