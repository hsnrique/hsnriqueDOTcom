"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { DESKTOP_ICONS, PROJECTS, type WindowId } from "@/lib/constants";
import { useWindowManager } from "@/lib/use-window-manager";
import DesktopIcon from "./DesktopIcon";
import Taskbar from "./Taskbar";
import DesktopClock from "./DesktopClock";
import LofiWidget from "./LofiWidget";
import WallStickers from "./WallStickers";
import SecurityDaemon from "./SecurityDaemon";
import LofiBackground from "./LofiBackground";
import Window from "./Window";
import AboutWindow from "@/components/windows/AboutWindow";
import ProjectsWindow from "@/components/windows/ProjectsWindow";
import SkillsWindow from "@/components/windows/SkillsWindow";
import ExperienceWindow from "@/components/windows/ExperienceWindow";
import ContactWindow from "@/components/windows/ContactWindow";

const ICON_GRID = "grid grid-cols-3 md:grid-cols-1 gap-4 md:gap-1 w-fit";

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

const WINDOW_CONTENT: Record<Exclude<WindowId, "projects">, React.ComponentType> = {
  about: AboutWindow,
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
  const [projectUrl, setProjectUrl] = useState<string | null>(null);

  const handleOpen = (id: WindowId) => {
    if (id === "projects") setProjectUrl(null);
    openWindow(id);
  };

  const openProject = (url: string) => {
    setProjectUrl(url);
    openWindow("projects");
  };

  return (
    <div className="fixed inset-0 overflow-hidden">
      <SecurityDaemon />
      <LofiBackground />
      <BackgroundScene />

      <div className="relative z-[1] flex flex-col h-[100dvh] pointer-events-none">
        <DesktopClock />

        <div className="flex-1 flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start gap-6 md:gap-0 px-6 md:pt-24">
          <div className={ICON_GRID}>
            {DESKTOP_ICONS.map((icon) => (
              <DesktopIcon
                key={icon.id}
                label={icon.label}
                icon={icon.icon}
                onOpen={() => handleOpen(icon.id)}
                className="pointer-events-auto"
              />
            ))}
          </div>
          <div className={ICON_GRID}>
            {PROJECTS.map((project) => (
              <DesktopIcon
                key={project.name}
                label={`${project.name}.app`}
                imageSrc={project.icon}
                onOpen={() => openProject(project.url)}
                className="pointer-events-auto"
              />
            ))}
          </div>
        </div>

        <WallStickers />
        <div className="pointer-events-auto">
          <LofiWidget />
          <Taskbar
            openWindows={openWindows}
            onFocus={focusWindow}
            onMinimize={minimizeWindow}
          />
        </div>
      </div>

      {Object.values(windows).map((win) => {
        const config = WINDOW_CONFIG[win.id];
        const Content = win.id === "projects" ? null : WINDOW_CONTENT[win.id];
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
            {Content ? <Content /> : <ProjectsWindow url={projectUrl} onNavigate={setProjectUrl} />}
          </Window>
        );
      })}
    </div>
  );
}
