"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Instagram, Linkedin, Youtube, Github, MapPin, Quote, type LucideIcon } from "lucide-react";
import { PROFILE } from "@/lib/constants";

const SOCIAL_ICONS: Record<string, LucideIcon> = {
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  github: Github,
};

export default function AboutWindow() {
  const bioRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bioRef.current) {
      gsap.fromTo(bioRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.2 });
    }
    if (statsRef.current) {
      gsap.fromTo(statsRef.current.children, { opacity: 0, y: 15 }, {
        opacity: 1, y: 0, duration: 0.4, stagger: 0.1, delay: 0.4,
      });
    }
  }, []);

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-lg bg-[rgba(0,255,65,0.08)] border border-[rgba(0,255,65,0.15)] flex items-center justify-center overflow-hidden shrink-0 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(0,255,65,0.03)] to-transparent animate-pulse" />
          <span className="text-2xl font-bold text-[#00ff41] font-mono">H</span>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-[#e0e0e0] font-[family-name:var(--font-space-grotesk)]">
            {PROFILE.name}
          </h2>
          <p className="text-xs font-mono text-[#00ff41] opacity-80 mt-0.5">
            {PROFILE.title}
          </p>
          <div className="flex items-center gap-1.5 mt-1.5">
            <MapPin size={10} className="text-[rgba(255,255,255,0.3)]" />
            <span className="text-[10px] font-mono text-[rgba(255,255,255,0.4)]">
              {PROFILE.location}
            </span>
          </div>
        </div>
      </div>

      <p
        ref={bioRef}
        className="text-sm text-[rgba(255,255,255,0.6)] leading-relaxed font-[family-name:var(--font-space-grotesk)]"
      >
        {PROFILE.bio}
      </p>

      <div ref={statsRef} className="grid grid-cols-3 gap-3">
        {PROFILE.stats.map((stat) => (
          <div
            key={stat.label}
            className="text-center p-3 rounded-lg bg-[rgba(0,255,65,0.04)] border border-[rgba(0,255,65,0.08)]"
          >
            <p className="text-lg font-bold text-[#00ff41] font-mono phosphor-glow">
              {stat.value}
            </p>
            <p className="text-[9px] font-mono text-[rgba(255,255,255,0.4)] uppercase tracking-wider mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="p-3 rounded-lg bg-[rgba(255,176,0,0.04)] border border-[rgba(255,176,0,0.1)]">
        <div className="flex items-start gap-2">
          <Quote size={14} className="text-[#ffb000] shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-[rgba(255,176,0,0.8)] italic font-[family-name:var(--font-space-grotesk)]">
              &ldquo;{PROFILE.quote.text}&rdquo;
            </p>
            <p className="text-[10px] text-[rgba(255,176,0,0.5)] mt-1 font-mono">
              — {PROFILE.quote.author}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-1">
        {PROFILE.socials.map((social) => {
          const Icon = SOCIAL_ICONS[social.icon];
          return (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-[rgba(0,255,65,0.05)] border border-[rgba(0,255,65,0.1)] hover:bg-[rgba(0,255,65,0.12)] hover:border-[rgba(0,255,65,0.25)] transition-all group"
            >
              <Icon size={14} className="text-[rgba(255,255,255,0.4)] group-hover:text-[#00ff41] transition-colors" />
            </a>
          );
        })}
      </div>
    </div>
  );
}
