"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { EXPERIENCE } from "@/lib/constants";

export default function ExperienceWindow() {
  const entriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!entriesRef.current) return;
    gsap.fromTo(
      entriesRef.current.children,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.4, stagger: 0.15, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[rgba(0,255,65,0.08)]">
        <span className="text-[10px] font-mono text-[rgba(255,255,255,0.3)] uppercase tracking-widest">
          /var/log/experience.log
        </span>
      </div>

      <div ref={entriesRef} className="space-y-4">
        {EXPERIENCE.map((entry, i) => (
          <div key={i} className="flex gap-3 group">
            <div className="flex flex-col items-center shrink-0">
              <div
                className={`w-2.5 h-2.5 rounded-full border-2 ${
                  entry.current
                    ? "border-[#00ff41] bg-[#00ff41] shadow-[0_0_8px_rgba(0,255,65,0.5)]"
                    : "border-[rgba(0,255,65,0.3)] bg-transparent"
                }`}
              />
              {i < EXPERIENCE.length - 1 && (
                <div className="w-px flex-1 bg-[rgba(0,255,65,0.1)] mt-1" />
              )}
            </div>

            <div className="pb-2 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono text-[rgba(0,255,65,0.5)]">
                  [{entry.timestamp}]
                </span>
                {entry.current && (
                  <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-[rgba(0,255,65,0.1)] text-[#00ff41] border border-[rgba(0,255,65,0.2)]">
                    ACTIVE
                  </span>
                )}
              </div>
              <h4 className="text-sm text-[#e0e0e0] font-semibold font-[family-name:var(--font-space-grotesk)]">
                {entry.role}
              </h4>
              <p className="text-xs text-[#ffb000] font-mono opacity-70 mt-0.5">
                {entry.company}
              </p>
              <p className="text-xs text-[rgba(255,255,255,0.4)] mt-1.5 leading-relaxed font-[family-name:var(--font-space-grotesk)]">
                {entry.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-[rgba(0,255,65,0.08)]">
        <p className="text-[10px] font-mono text-[rgba(255,255,255,0.2)]">
          EOF — {EXPERIENCE.length} entries logged
        </p>
      </div>
    </div>
  );
}
