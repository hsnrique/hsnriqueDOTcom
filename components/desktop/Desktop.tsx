"use client";

import dynamic from "next/dynamic";
import { DESKTOP_ICONS, type WindowId } from "@/lib/constants";
import { useWindowManager } from "@/lib/use-window-manager";
import DesktopIcon from "./DesktopIcon";
import Taskbar from "./Taskbar";
import DesktopClock from "./DesktopClock";
import LofiWidget from "./LofiWidget";
import WallStickers from "./WallStickers";
import LofiBackground from "./LofiBackground";
import Window from "./Window";
import AboutWindow from "@/components/windows/AboutWindow";
import ProjectsWindow from "@/components/windows/ProjectsWindow";
import SkillsWindow from "@/components/windows/SkillsWindow";
import ExperienceWindow from "@/components/windows/ExperienceWindow";
import ContactWindow from "@/components/windows/ContactWindow";

const BackgroundScene = dynamic(
  () => import("@/components/three/BackgroundScene"),
  { ssr: false }
);

const WINDOW_CONFIG: Record<WindowId, { title: string; width: number; height: number }> = {
  about: { title: "About.me", width: 520, height: 480 },
  projects: { title: "Projects.browser", width: 820, height: 580 },
  skills: { title: "Skills.terminal", width: 620, height: 420 },
  experience: { title: "Experience.log", width: 500, height: 460 },
  contact: { title: "Contact.sys", width: 440, height: 520 },
};

const WINDOW_CONTENT: Record<WindowId, React.ComponentType> = {
  about: AboutWindow,
  projects: ProjectsWindow,
  skills: SkillsWindow,
  experience: ExperienceWindow,
  contact: ContactWindow,
};

export default function Desktop() {
  const {
    windows,
    openWindows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updatePosition,
  } = useWindowManager();

  return (
    <div className="fixed inset-0 overflow-hidden">
      <LofiBackground />
      <BackgroundScene />
      <DesktopClock />
      <WallStickers />

      <div className="relative z-10 p-6 pt-24 pb-16 pointer-events-none">
        <div className="grid grid-cols-1 gap-1 w-fit">
          {DESKTOP_ICONS.map((icon) => (
            <DesktopIcon
              key={icon.id}
              id={icon.id}
              label={icon.label}
              icon={icon.icon}
              onOpen={openWindow}
              className="pointer-events-auto"
            />
          ))}
        </div>
      </div>

      {Object.values(windows).map((win) => {
        const config = WINDOW_CONFIG[win.id];
        const Content = WINDOW_CONTENT[win.id];
        return (
          <Window
            key={win.id}
            state={win}
            title={config.title}
            width={config.width}
            height={config.height}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
            onMaximize={maximizeWindow}
            onFocus={focusWindow}
            onUpdatePosition={updatePosition}
          >
            <Content />
          </Window>
        );
      })}

      <LofiWidget />
      <Taskbar
        openWindows={openWindows}
        onFocus={focusWindow}
        onMinimize={minimizeWindow}
      />
    </div>
  );
}
