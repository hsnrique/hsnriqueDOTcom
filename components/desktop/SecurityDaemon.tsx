"use client";

import { useEffect, useState } from "react";

const BANNER = `
██╗  ██╗ ██████╗ ███████╗
██║  ██║██╔═══██╗██╔════╝   HenriqueOS security daemon v1.0
███████║██║   ██║███████╗   ─────────────────────────────────
██╔══██║██║   ██║╚════██║   unauthorized access is monitored.
██║  ██║╚██████╔╝███████║   every keystroke in here is a confession.
╚═╝  ╚═╝ ╚═════╝ ╚══════╝
`;

const INSPECT_KEYS = new Set(["F12", "I", "J", "C"]);

function isInspectShortcut(e: KeyboardEvent) {
  if (e.key === "F12") return true;
  const combo = (e.ctrlKey && e.shiftKey) || (e.metaKey && e.altKey);
  return combo && INSPECT_KEYS.has(e.key.toUpperCase());
}

function useIntrusionDetection(onDetect: () => void) {
  useEffect(() => {
    if (sessionStorage.getItem("hos-intrusion")) return;

    let fired = false;
    const trigger = () => {
      if (fired) return;
      fired = true;
      sessionStorage.setItem("hos-intrusion", "1");
      onDetect();
    };

    // devtools bait: the getter only runs when a console panel renders the object
    const bait = new Image();
    Object.defineProperty(bait, "id", { get: trigger });
    const probe = setInterval(() => { if (!fired) console.log(bait); }, 2500);

    const onKey = (e: KeyboardEvent) => { if (isInspectShortcut(e)) trigger(); };
    window.addEventListener("keydown", onKey);

    return () => {
      clearInterval(probe);
      window.removeEventListener("keydown", onKey);
    };
  }, [onDetect]);
}

export default function SecurityDaemon() {
  const [alarm, setAlarm] = useState(false);

  useEffect(() => {
    console.log("%c" + BANNER, "color:#00ff41;font-family:monospace;font-size:11px");
    console.log(
      "%c> relax, it's a portfolio. source: github.com/hsnrique — say hi: hsnriquedev@gmail.com",
      "color:#888;font-family:monospace"
    );
  }, []);

  useIntrusionDetection(() => {
    setAlarm(true);
    setTimeout(() => setAlarm(false), 6000);
  });

  if (!alarm) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center bg-[rgba(120,0,0,0.25)] animate-pulse">
      <div className="border border-[rgba(255,60,60,0.6)] bg-[rgba(0,0,0,0.85)] px-6 py-5 font-mono text-center rounded-md">
        <p className="text-[#ff3c3c] text-sm md:text-base tracking-[0.3em] uppercase">
          ⚠ intrusion detected ⚠
        </p>
        <p className="text-[rgba(255,255,255,0.6)] text-[10px] md:text-xs mt-2">
          unauthorized inspection attempt — session flagged
        </p>
        <p className="text-[rgba(0,255,65,0.7)] text-[10px] md:text-xs mt-3">
          countermeasures: none. it&apos;s a portfolio. enjoy the source ;)
        </p>
      </div>
    </div>
  );
}
