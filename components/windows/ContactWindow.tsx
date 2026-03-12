"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { Send, CheckCircle } from "lucide-react";
import { PROFILE } from "@/lib/constants";

export default function ContactWindow() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const name = (form.elements.namedItem("sender") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const message = (form.elements.namedItem("payload") as HTMLTextAreaElement).value;

    const subject = encodeURIComponent(`Contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.open(`mailto:hsnriquedev@gmail.com?subject=${subject}&body=${body}`, "_blank");

    setSending(true);
    gsap.fromTo(
      progressRef.current,
      { width: "0%" },
      {
        width: "100%",
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          setSending(false);
          setSent(true);
        },
      }
    );
  };

  useEffect(() => {
    if (sent) {
      setTimeout(() => setSent(false), 3000);
    }
  }, [sent]);

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3">
        <CheckCircle size={32} className="text-[#00ff41]" />
        <p className="text-sm font-mono text-[#00ff41] phosphor-glow">
          Message transmitted successfully.
        </p>
        <p className="text-[10px] font-mono text-[rgba(255,255,255,0.3)]">
          Connection established. Awaiting response...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="p-3 rounded-lg bg-[rgba(0,255,65,0.03)] border border-[rgba(0,255,65,0.08)]">
        <p className="text-[10px] font-mono text-[rgba(0,255,65,0.5)] uppercase tracking-widest mb-2">
          System Connections
        </p>
        <div className="flex flex-wrap gap-2">
          {PROFILE.socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-mono px-2.5 py-1 rounded bg-[rgba(0,255,65,0.05)] text-[rgba(0,255,65,0.7)] border border-[rgba(0,255,65,0.1)] hover:border-[rgba(0,255,65,0.3)] transition-colors"
            >
              {social.name.toLowerCase()}
            </a>
          ))}
        </div>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-[10px] font-mono text-[rgba(0,255,65,0.5)] uppercase tracking-widest mb-1.5">
            Sender ID
          </label>
          <input
            name="sender"
            type="text"
            required
            placeholder="your_name"
            className="retro-input w-full rounded text-xs"
          />
        </div>

        <div>
          <label className="block text-[10px] font-mono text-[rgba(0,255,65,0.5)] uppercase tracking-widest mb-1.5">
            Return Address
          </label>
          <input
            name="email"
            type="email"
            required
            placeholder="you@domain.com"
            className="retro-input w-full rounded text-xs"
          />
        </div>

        <div>
          <label className="block text-[10px] font-mono text-[rgba(0,255,65,0.5)] uppercase tracking-widest mb-1.5">
            Payload
          </label>
          <textarea
            name="payload"
            required
            rows={4}
            placeholder="Write your message..."
            className="retro-input w-full rounded text-xs resize-none"
          />
        </div>

        <div className="relative">
          <button
            type="submit"
            disabled={sending}
            className="retro-button w-full rounded flex items-center justify-center gap-2 py-2.5 disabled:opacity-50"
          >
            {sending ? (
              <span className="text-[10px]">Transmitting...</span>
            ) : (
              <>
                <Send size={12} />
                <span>Transmit</span>
              </>
            )}
          </button>
          {sending && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[rgba(0,255,65,0.1)] rounded-b overflow-hidden">
              <div
                ref={progressRef}
                className="h-full bg-[#00ff41]"
                style={{ boxShadow: "0 0 8px rgba(0,255,65,0.5)" }}
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
