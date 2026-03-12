"use client";

import { useState, useEffect } from "react";

export default function DesktopClock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return null;

  const rawHours = time.getHours() % 12 || 12;
  const hours = rawHours.toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");

  const dateStr = time.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1 pointer-events-none select-none">
      <span className="text-6xl font-bold tracking-wider text-[var(--phosphor)] drop-shadow-[0_0_20px_rgba(0,255,65,0.5)]"
        style={{ fontFamily: "var(--font-mono)", textShadow: "0 0 30px rgba(0,255,65,0.4), 0 0 60px rgba(0,255,65,0.15)" }}
      >
        {hours}:{minutes}
      </span>
      <span className="text-sm tracking-widest uppercase text-[var(--phosphor)] opacity-60"
        style={{ fontFamily: "var(--font-retro)" }}
      >
        {dateStr}
      </span>
    </div>
  );
}
