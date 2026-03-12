"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Minus, Square, X } from "lucide-react";
import type { WindowId } from "@/lib/constants";
import type { WindowState } from "@/lib/use-window-manager";

interface WindowProps {
  state: WindowState;
  title: string;
  children: React.ReactNode;
  onClose: (id: WindowId) => void;
  onMinimize: (id: WindowId) => void;
  onMaximize: (id: WindowId) => void;
  onFocus: (id: WindowId) => void;
  onUpdatePosition: (id: WindowId, pos: { x: number; y: number }) => void;
  width?: number;
  height?: number;
}

export default function Window({
  state,
  title,
  children,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onUpdatePosition,
  width = 600,
  height = 450,
}: WindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ dragging: false, startX: 0, startY: 0, origX: 0, origY: 0 });

  useEffect(() => {
    if (windowRef.current && state.isOpen && !state.isMinimized) {
      gsap.fromTo(
        windowRef.current,
        { scale: 0.8, opacity: 0, filter: "blur(8px)" },
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.35, ease: "back.out(1.4)" }
      );
    }
  }, [state.isOpen, state.isMinimized]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("button")) return;
    e.preventDefault();
    onFocus(state.id);
    dragRef.current = {
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      origX: state.position.x,
      origY: state.position.y,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [state.id, state.position.x, state.position.y, onFocus]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current.dragging) return;
    const { startX, startY, origX, origY } = dragRef.current;
    const newX = origX + (e.clientX - startX);
    const newY = origY + (e.clientY - startY);
    onUpdatePosition(state.id, { x: newX, y: newY });
  }, [state.id, onUpdatePosition]);

  const handlePointerUp = useCallback(() => {
    dragRef.current.dragging = false;
  }, []);

  if (!state.isOpen || state.isMinimized) return null;

  const isMax = state.isMaximized;

  return (
    <motion.div
      ref={windowRef}
      className="absolute window-glass rounded-lg overflow-hidden flex flex-col"
      style={{
        zIndex: state.zIndex,
        width: isMax ? "100vw" : width,
        height: isMax ? "calc(100vh - 48px)" : height,
        left: 0,
        top: 0,
        transform: isMax ? "none" : `translate(${state.position.x}px, ${state.position.y}px)`,
      }}
    >
      <div
        className="flex items-center justify-between px-3 py-2 bg-[rgba(0,255,65,0.06)] border-b border-[rgba(0,255,65,0.1)] select-none shrink-0 cursor-grab active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#00ff41] opacity-60" />
          <span className="text-[11px] font-mono text-[rgba(0,255,65,0.7)] tracking-wider uppercase">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(state.id); }}
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-[rgba(255,255,255,0.05)] transition-colors"
          >
            <Minus size={12} className="text-[rgba(255,255,255,0.4)]" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onMaximize(state.id); }}
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-[rgba(255,255,255,0.05)] transition-colors"
          >
            <Square size={10} className="text-[rgba(255,255,255,0.4)]" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(state.id); }}
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-[rgba(255,0,0,0.2)] transition-colors"
          >
            <X size={12} className="text-[rgba(255,255,255,0.4)]" />
          </button>
        </div>
      </div>

      <div
        className="flex-1 overflow-y-auto p-4 custom-scrollbar"
        onPointerDown={() => onFocus(state.id)}
      >
        {children}
      </div>
    </motion.div>
  );
}
