"use client";

import { useRef } from "react";
import gsap from "gsap";
import { User, Folder, Terminal, FileText, Mail, Globe, type LucideIcon } from "lucide-react";
import type { WindowId } from "@/lib/constants";

const ICON_MAP: Record<string, LucideIcon> = {
  user: User,
  folder: Folder,
  terminal: Terminal,
  "file-text": FileText,
  mail: Mail,
  globe: Globe,
};

interface DesktopIconProps {
  id: WindowId;
  label: string;
  icon: string;
  onOpen: (id: WindowId) => void;
  className?: string;
}

export default function DesktopIcon({ id, label, icon, onOpen, className }: DesktopIconProps) {
  const iconRef = useRef<HTMLDivElement>(null);
  const Icon = ICON_MAP[icon] || FileText;

  const handleMouseEnter = () => {
    gsap.to(iconRef.current, { scale: 1.1, duration: 0.2, ease: "back.out(2)" });
  };

  const handleMouseLeave = () => {
    gsap.to(iconRef.current, { scale: 1, duration: 0.2 });
  };

  return (
    <div
      ref={iconRef}
      className={`flex flex-col items-center gap-2 md:gap-1.5 p-3 md:p-3 rounded-2xl md:rounded-lg cursor-pointer select-none transition-colors hover:bg-[rgba(0,255,65,0.05)] active:bg-[rgba(0,255,65,0.1)] ${className || ""}`}
      onDoubleClick={() => onOpen(id)}
      onTouchEnd={(e) => { e.preventDefault(); onOpen(id); }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-14 h-14 md:w-12 md:h-12 flex items-center justify-center rounded-2xl md:rounded-lg bg-[rgba(0,255,65,0.08)] border border-[rgba(0,255,65,0.15)] shadow-[0_0_12px_rgba(0,255,65,0.06)]">
        <Icon size={24} className="text-[#00ff41] md:hidden" strokeWidth={1.5} />
        <Icon size={22} className="text-[#00ff41] hidden md:block" strokeWidth={1.5} />
      </div>
      <span className="text-[11px] md:text-[10px] font-mono text-[#e0e0e0] text-center leading-tight">
        <span className="md:hidden">{label.split(".")[0]}</span>
        <span className="hidden md:inline">{label}</span>
      </span>
    </div>
  );
}
