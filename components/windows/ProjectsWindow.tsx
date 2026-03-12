"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { ArrowLeft, Globe, ExternalLink, Loader2, ShieldAlert } from "lucide-react";
import { PROJECTS, type Project } from "@/lib/constants";

const BLOCKED_DOMAINS = new Set([
  "neiro.it",
  "github.com",
  "apps.apple.com",
]);

function isBlocked(url: string): boolean {
  try {
    const host = new URL(url).hostname.replace("www.", "");
    return BLOCKED_DOMAINS.has(host);
  } catch { return false; }
}

function findProject(url: string): Project | undefined {
  return PROJECTS.find((p) => url.startsWith(p.url));
}

function ProjectCard({ project, onNavigate }: { project: Project; onNavigate: (url: string) => void }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(cardRef.current, { rotateY: x * 10, rotateX: -y * 10, duration: 0.3, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, duration: 0.4, ease: "power2.out" });
  };

  return (
    <div
      ref={cardRef}
      onClick={() => onNavigate(project.url)}
      className="p-4 rounded-lg bg-[rgba(0,255,65,0.03)] border border-[rgba(0,255,65,0.08)] hover:border-[rgba(0,255,65,0.2)] transition-colors cursor-pointer group"
      style={{ perspective: "800px", transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-sm font-semibold text-[#e0e0e0] font-mono group-hover:text-[#00ff41] transition-colors">
          {project.name}
        </h3>
        <Globe size={12} className="text-[rgba(255,255,255,0.2)] group-hover:text-[#00ff41] transition-colors shrink-0 mt-0.5" />
      </div>
      <p className="text-xs text-[rgba(255,255,255,0.5)] mb-3 font-[family-name:var(--font-space-grotesk)]">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 text-[9px] font-mono rounded-full bg-[rgba(0,255,65,0.06)] text-[rgba(0,255,65,0.7)] border border-[rgba(0,255,65,0.1)]"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

function BlockedFallback({ url }: { url: string }) {
  const project = findProject(url);
  const hostname = (() => { try { return new URL(url).hostname; } catch { return url; } })();

  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="max-w-sm w-full space-y-6 text-center">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-[rgba(255,176,0,0.08)] border border-[rgba(255,176,0,0.15)] flex items-center justify-center">
          <ShieldAlert size={24} className="text-[#ffb000]" />
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-[#e0e0e0] font-mono">
            {project?.name || hostname}
          </h3>
          {project && (
            <p className="text-xs text-[rgba(255,255,255,0.5)] font-[family-name:var(--font-space-grotesk)]">
              {project.description}
            </p>
          )}
          <p className="text-[10px] font-mono text-[rgba(255,176,0,0.6)] leading-relaxed">
            This site blocks embedded previews.
          </p>
        </div>

        {project && (
          <div className="flex flex-wrap justify-center gap-1.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[9px] font-mono rounded-full bg-[rgba(0,255,65,0.06)] text-[rgba(0,255,65,0.7)] border border-[rgba(0,255,65,0.1)]"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[rgba(0,255,65,0.08)] border border-[rgba(0,255,65,0.2)] hover:bg-[rgba(0,255,65,0.15)] hover:border-[rgba(0,255,65,0.35)] transition-all text-xs font-mono text-[#00ff41]"
        >
          <ExternalLink size={12} />
          Open in browser
        </a>
      </div>
    </div>
  );
}

function ProjectList({ onNavigate }: { onNavigate: (url: string) => void }) {
  const saasProjects = PROJECTS.filter((p) => p.category === "saas");
  const openSourceProjects = PROJECTS.filter((p) => p.category === "opensource");
  const appsProjects = PROJECTS.filter((p) => p.category === "apps");

  return (
    <div className="space-y-5 p-1">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00ff41]" />
          <h3 className="text-xs font-mono text-[#00ff41] uppercase tracking-widest">SAAS Army</h3>
        </div>
        <div className="space-y-2">
          {saasProjects.map((project) => (
            <ProjectCard key={project.name} project={project} onNavigate={onNavigate} />
          ))}
        </div>
      </div>

      <div className="w-full h-px bg-[rgba(0,255,65,0.08)]" />

      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00b4ff]" />
          <h3 className="text-xs font-mono text-[#00b4ff] uppercase tracking-widest">Apps Army</h3>
        </div>
        <div className="space-y-2">
          {appsProjects.map((project) => (
            <ProjectCard key={project.name} project={project} onNavigate={onNavigate} />
          ))}
        </div>
      </div>

      <div className="w-full h-px bg-[rgba(0,255,65,0.08)]" />

      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#ffb000]" />
          <h3 className="text-xs font-mono text-[#ffb000] uppercase tracking-widest">Open Source</h3>
        </div>
        <div className="space-y-2">
          {openSourceProjects.map((project) => (
            <ProjectCard key={project.name} project={project} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsWindow() {
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleNavigate = (url: string) => {
    if (!isBlocked(url)) setLoading(true);
    setCurrentUrl(url);
  };

  const handleBack = () => {
    setCurrentUrl(null);
    setLoading(false);
  };

  const blocked = currentUrl ? isBlocked(currentUrl) : false;

  return (
    <div className="h-full flex flex-col -m-4">
      <div className="flex items-center gap-2 px-3 py-2 bg-[rgba(0,0,0,0.3)] border-b border-[rgba(0,255,65,0.08)] shrink-0">
        {currentUrl && (
          <button
            onClick={handleBack}
            className="p-1 rounded hover:bg-[rgba(255,255,255,0.05)] transition-colors"
          >
            <ArrowLeft size={14} className="text-[rgba(255,255,255,0.4)]" />
          </button>
        )}

        <div className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-md bg-[rgba(0,0,0,0.4)] border border-[rgba(0,255,65,0.1)]">
          {loading && currentUrl ? (
            <Loader2 size={10} className="text-[#00ff41] animate-spin shrink-0" />
          ) : blocked ? (
            <ShieldAlert size={10} className="text-[#ffb000] shrink-0" />
          ) : (
            <Globe size={10} className="text-[rgba(0,255,65,0.4)] shrink-0" />
          )}
          <span className="text-[11px] font-mono text-[rgba(255,255,255,0.4)] truncate">
            {currentUrl || "henriqueos://projects"}
          </span>
        </div>

        {currentUrl && (
          <a
            href={currentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded hover:bg-[rgba(255,255,255,0.05)] transition-colors"
          >
            <ExternalLink size={12} className="text-[rgba(255,255,255,0.3)]" />
          </a>
        )}
      </div>

      <div className="flex-1 overflow-hidden">
        {currentUrl ? (
          blocked ? (
            <BlockedFallback url={currentUrl} />
          ) : (
            <iframe
              src={currentUrl}
              className="w-full h-full border-0 bg-white"
              onLoad={() => setLoading(false)}
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          )
        ) : (
          <div className="h-full overflow-y-auto p-4 custom-scrollbar">
            <ProjectList onNavigate={handleNavigate} />
          </div>
        )}
      </div>
    </div>
  );
}
