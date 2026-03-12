"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Radio } from "lucide-react";

const LOFI_STREAM_ID = "jfKfPfyJRdk";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function LofiWidget() {
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const initPlayer = useCallback(() => {
    if (!containerRef.current || playerRef.current) return;
    playerRef.current = new window.YT.Player(containerRef.current, {
      height: "1",
      width: "1",
      videoId: LOFI_STREAM_ID,
      playerVars: { autoplay: 0, controls: 0, modestbranding: 1 },
      events: {
        onReady: () => setReady(true),
      },
    });
  }, []);

  useEffect(() => {
    if (window.YT?.Player) {
      initPlayer();
      return;
    }

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
    window.onYouTubeIframeAPIReady = initPlayer;

    return () => { window.onYouTubeIframeAPIReady = () => {}; };
  }, [initPlayer]);

  const toggle = () => {
    if (!playerRef.current || !ready) return;
    if (playing) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
    setPlaying(!playing);
  };

  return (
    <div className="fixed bottom-14 right-4 z-20">
      <div className="absolute w-0 h-0 overflow-hidden pointer-events-none opacity-0">
        <div ref={containerRef} />
      </div>

      <button
        onClick={toggle}
        disabled={!ready}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[rgba(0,0,0,0.6)] border border-[rgba(0,255,65,0.15)] backdrop-blur-sm hover:border-[rgba(0,255,65,0.3)] transition-all disabled:opacity-40"
      >
        {playing ? (
          <>
            <Radio size={12} className="text-[#00ff41] animate-pulse" />
            <span className="text-[10px] font-mono text-[rgba(0,255,65,0.6)] uppercase tracking-wider">
              lofi — on air
            </span>
            <Pause size={11} className="text-[rgba(0,255,65,0.5)] ml-1" />
          </>
        ) : (
          <>
            <Radio size={12} className="text-[rgba(255,255,255,0.4)]" />
            <span className="text-[10px] font-mono text-[rgba(255,255,255,0.3)] uppercase tracking-wider">
              lofi radio
            </span>
            <Play size={11} className="text-[rgba(255,255,255,0.3)] ml-1" />
          </>
        )}
      </button>
    </div>
  );
}
