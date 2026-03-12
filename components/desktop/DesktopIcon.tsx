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
    gsap.to(iconRef.current, {
      scale: 1.1,
      duration: 0.2,
      ease: "back.out(2)",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(iconRef.current, { scale: 1, duration: 0.2 });
  };

  return (
    <div
      ref={iconRef}
      className={`flex flex-col items-center gap-1.5 p-3 rounded-lg cursor-pointer select-none transition-colors hover:bg-[rgba(0,255,65,0.05)] ${className || ''}`}
      onDoubleClick={() => onOpen(id)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[rgba(0,255,65,0.08)] border border-[rgba(0,255,65,0.15)]">
        <Icon size={22} className="text-[#00ff41]" strokeWidth={1.5} />
      </div>
      <span className="text-[10px] font-mono text-[#e0e0e0] text-center leading-tight max-w-[72px]">
        {label}
      </span>
    </div>
  );
}
