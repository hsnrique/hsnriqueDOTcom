"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// ponytail: static-site honeypot — pure theater, nothing is logged anywhere
const MAX_ATTEMPTS = 3;

const TRACE_LINES = [
  "> ACCESS DENIED — incident logged",
  "> tracing origin ...",
  "> fingerprinting client ... done",
  "> countermeasure: deploying sarcasm",
  "> there is no admin panel. this is a static portfolio.",
  "> but persistence is a good trait. email me: hsnriquedev@gmail.com",
];

export default function HoneypotTerminal() {
  const router = useRouter();
  const [attempts, setAttempts] = useState(0);
  const [value, setValue] = useState("");
  const busted = attempts >= MAX_ATTEMPTS;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setValue("");
    setAttempts((a) => a + 1);
    if (attempts + 1 >= MAX_ATTEMPTS) {
      setTimeout(() => router.push("/"), 7000);
    }
  };

  return (
    <main className="min-h-dvh bg-black text-[#00ff41] font-mono flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <p className="text-xs text-[rgba(0,255,65,0.5)]">HenriqueOS restricted shell — /admin</p>
        <pre className="text-[10px] mt-2 text-[rgba(255,60,60,0.8)]">
{`┌────────────────────────────────┐
│  RESTRICTED AREA — KEEP OUT    │
└────────────────────────────────┘`}
        </pre>

        {busted ? (
          <div className="mt-4 space-y-1 text-xs">
            {TRACE_LINES.map((line) => (
              <p key={line} className={line.includes("DENIED") ? "text-[#ff3c3c]" : ""}>{line}</p>
            ))}
            <p className="text-[rgba(255,255,255,0.4)] mt-3">rebooting to desktop ...</p>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-4">
            {attempts > 0 && (
              <p className="text-[#ff3c3c] text-xs mb-2">
                ACCESS DENIED ({attempts}/{MAX_ATTEMPTS}) — credentials rejected
              </p>
            )}
            <label className="text-xs block mb-1" htmlFor="pw">root password:</label>
            <input
              id="pw"
              type="password"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              autoComplete="off"
              className="w-full bg-transparent border border-[rgba(0,255,65,0.3)] rounded px-2 py-1.5 text-sm outline-none focus:border-[rgba(0,255,65,0.7)]"
              autoFocus
            />
            <button type="submit" className="mt-3 text-xs border border-[rgba(0,255,65,0.3)] rounded px-3 py-1.5 hover:border-[rgba(0,255,65,0.7)]">
              authenticate
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
