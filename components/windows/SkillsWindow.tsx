"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { SKILLS } from "@/lib/constants";

const EASTER_EGGS: Record<string, string> = {
  whoami: "henrique — tech entrepreneur & senior engineer",
  "ls projects": "neiro/  lirk/  nxen/  oura-browser/  opencrab/",
  "cat skills.json": JSON.stringify({ total: 30, categories: 6, level: "senior" }, null, 2),
  help: "Available: whoami, ls projects, cat skills.json, clear, neofetch",
  neofetch: `
  ╔═══════════════════════════╗
  ║     HenriqueOS v2.026     ║
  ║  Kernel: creativity-6.0   ║
  ║  Shell: imagination/zsh   ║
  ║  Uptime: since 2019       ║
  ║  Packages: 60+ (appstore) ║
  ║  CPU: Neural Engine x86   ║
  ╚═══════════════════════════╝`,
};

export default function SkillsWindow() {
  const [lines, setLines] = useState<Array<{ type: "output" | "input"; text: string }>>([]);
  const [input, setInput] = useState("");
  const [autoPhase, setAutoPhase] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!autoPhase) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    const entries: Array<{ type: "output" | "input"; text: string }> = [];
    let delay = 0;

    SKILLS.forEach((cat) => {
      entries.push({ type: "input", text: `cat /sys/${cat.name.toLowerCase()}.conf` });
      entries.push({ type: "output", text: `[${cat.name.toUpperCase()}]` });
      cat.items.forEach((item) => {
        entries.push({ type: "output", text: `  ▸ ${item}` });
      });
      entries.push({ type: "output", text: "" });
    });

    entries.forEach((entry) => {
      timers.push(setTimeout(() => {
        setLines((prev) => [...prev, entry]);
      }, delay));
      delay += entry.type === "input" ? 400 : 80;
    });

    timers.push(setTimeout(() => {
      setAutoPhase(false);
      setLines((prev) => [...prev, { type: "output", text: 'Type "help" for available commands.' }]);
    }, delay + 300));

    return () => timers.forEach(clearTimeout);
  }, [autoPhase]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    setLines((prev) => [...prev, { type: "input", text: cmd }]);

    if (cmd === "clear") {
      setLines([]);
    } else if (EASTER_EGGS[cmd]) {
      setLines((prev) => [...prev, { type: "output", text: EASTER_EGGS[cmd] }]);
    } else if (cmd) {
      setLines((prev) => [...prev, { type: "output", text: `command not found: ${cmd}` }]);
    }

    setInput("");
  };

  return (
    <div
      className="h-full bg-[rgba(0,0,0,0.5)] rounded p-2 md:p-3 font-mono text-[10px] md:text-xs"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="space-y-0.5 max-h-[calc(100%-28px)] overflow-y-auto">
        {lines.map((line, i) => (
          <div key={i} className={line.type === "input" ? "text-[#00ff41]" : "text-[rgba(255,255,255,0.5)]"}>
            {line.type === "input" ? (
              <span>
                <span className="text-[#ffb000]">henrique</span>
                <span className="text-[rgba(255,255,255,0.3)]">@</span>
                <span className="text-[#00ff41]">os</span>
                <span className="text-[rgba(255,255,255,0.3)]">:~$ </span>
                {line.text}
              </span>
            ) : (
              <pre className="whitespace-pre-wrap">{line.text || "\u00A0"}</pre>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {!autoPhase && (
        <form onSubmit={handleSubmit} className="flex items-center mt-2">
          <span className="text-[#ffb000]">henrique</span>
          <span className="text-[rgba(255,255,255,0.3)]">@</span>
          <span className="text-[#00ff41]">os</span>
          <span className="text-[rgba(255,255,255,0.3)]">:~$ </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-[#00ff41] outline-none text-[10px] md:text-xs font-mono ml-1 caret-[#00ff41]"
            autoFocus
          />
          <span className="w-2 h-3.5 bg-[#00ff41] cursor-blink ml-0.5" />
        </form>
      )}
    </div>
  );
}
