"use client";

import { useState, useCallback, useRef } from "react";
import type { WindowId } from "./constants";

export interface WindowState {
  id: WindowId;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
}

const WINDOW_SIZES: Record<WindowId, { w: number; h: number }> = {
  about: { w: 520, h: 480 },
  projects: { w: 560, h: 520 },
  skills: { w: 620, h: 420 },
  experience: { w: 500, h: 460 },
  contact: { w: 440, h: 520 },
};

function getCenteredPosition(id: WindowId, offset = 0): { x: number; y: number } {
  const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const size = WINDOW_SIZES[id];
  const x = Math.max(40, Math.min((vw - size.w) / 2 + offset, vw - size.w - 40));
  const y = Math.max(80, Math.min((vh - size.h) / 2 + offset, vh - size.h - 80));
  return { x, y };
}

export function useWindowManager() {
  const defaultPos = { x: 0, y: 0 };
  const [windows, setWindows] = useState<Record<WindowId, WindowState>>({
    about: { id: "about", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0, position: defaultPos },
    projects: { id: "projects", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0, position: defaultPos },
    skills: { id: "skills", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0, position: defaultPos },
    experience: { id: "experience", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0, position: defaultPos },
    contact: { id: "contact", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0, position: defaultPos },
  });

  const topZRef = useRef(1);

  const getNextZ = useCallback(() => {
    topZRef.current += 1;
    return topZRef.current;
  }, []);

  const openWindow = useCallback((id: WindowId) => {
    const z = getNextZ();
    const pos = getCenteredPosition(id, (z % 5) * 20);
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: true, isMinimized: false, zIndex: z, position: pos },
    }));
  }, [getNextZ]);

  const closeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false, isMinimized: false, isMaximized: false },
    }));
  }, []);

  const minimizeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: !prev[id].isMinimized },
    }));
  }, []);

  const maximizeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMaximized: !prev[id].isMaximized },
    }));
  }, []);

  const focusWindow = useCallback((id: WindowId) => {
    const z = getNextZ();
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], zIndex: z, isMinimized: false },
    }));
  }, [getNextZ]);

  const updatePosition = useCallback((id: WindowId, position: { x: number; y: number }) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], position },
    }));
  }, []);

  const openWindows = Object.values(windows).filter((w) => w.isOpen);

  return {
    windows,
    openWindows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updatePosition,
  };
}
