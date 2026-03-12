"use client";

import { useState, useEffect } from "react";
import { Monitor, Wifi, Volume2 } from "lucide-react";
import type { WindowId } from "@/lib/constants";
import type { WindowState } from "@/lib/use-window-manager";

interface TaskbarProps {
  openWindows: WindowState[];
  onFocus: (id: WindowId) => void;
  onMinimize: (id: WindowId) => void;
}

export default function Taskbar({ openWindows, onFocus, onMinimize }: TaskbarProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="shrink-0 h-12 bg-[rgba(5,5,5,0.95)] backdrop-blur-xl border-t border-[rgba(0,255,65,0.08)] flex items-center justify-between px-2 md:px-3"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center gap-1 md:gap-2 min-w-0 flex-1">
        <button className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1.5 rounded hover:bg-[rgba(0,255,65,0.08)] transition-colors shrink-0">
          <Monitor size={14} className="text-[#00ff41]" />
          <span className="text-[10px] md:text-[11px] font-mono text-[#00ff41] tracking-wider hidden sm:inline">
            HenriqueOS
          </span>
        </button>

        <div className="w-px h-6 bg-[rgba(255,255,255,0.06)] shrink-0 hidden sm:block" />

        <div className="flex items-center gap-1 overflow-x-auto min-w-0 scrollbar-none">
          {openWindows.map((win) => (
            <button
              key={win.id}
              onClick={() => win.isMinimized ? onFocus(win.id) : onMinimize(win.id)}
              className={`px-2 md:px-3 py-1 rounded text-[9px] md:text-[10px] font-mono uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 ${
                win.isMinimized
                  ? "text-[rgba(255,255,255,0.3)] bg-transparent hover:bg-[rgba(255,255,255,0.03)]"
                  : "text-[#00ff41] bg-[rgba(0,255,65,0.06)] border border-[rgba(0,255,65,0.1)]"
              }`}
            >
              {win.id}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3 shrink-0 ml-2">
        <Wifi size={12} className="text-[rgba(0,255,65,0.5)] hidden sm:block" />
        <Volume2 size={12} className="text-[rgba(0,255,65,0.5)] hidden sm:block" />
        <span className="text-[10px] md:text-[11px] font-mono text-[rgba(0,255,65,0.6)]">
          {time}
        </span>
      </div>
    </div>
  );
}
