"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Radio } from "lucide-react";

// ponytail: main lofi girl stream refuses to embed on some networks (YT error 150),
// so the player falls through this list before giving up as offline
const STREAM_IDS = ["jfKfPfyJRdk", "4xDzrJKXOOY"];

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

type Status = "loading" | "ready" | "playing" | "offline";

export default function LofiWidget() {
  const [status, setStatus] = useState<Status>("loading");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);
  const streamIndexRef = useRef(0);
  const wantsPlayRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const advanceStream = useCallback(() => {
    const next = ++streamIndexRef.current;
    if (next >= STREAM_IDS.length) {
      setStatus("offline");
      return;
    }
    if (wantsPlayRef.current) {
      playerRef.current?.loadVideoById(STREAM_IDS[next]);
    } else {
      playerRef.current?.cueVideoById(STREAM_IDS[next]);
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const syncState = useCallback((e: any) => {
    const { PLAYING, PAUSED, ENDED } = window.YT.PlayerState;
    if (e.data === PLAYING) setStatus("playing");
    else if (e.data === PAUSED || e.data === ENDED) setStatus("ready");
  }, []);

  const initPlayer = useCallback(() => {
    if (!containerRef.current || playerRef.current) return;
    playerRef.current = new window.YT.Player(containerRef.current, {
      height: "1",
      width: "1",
      videoId: STREAM_IDS[0],
      playerVars: { autoplay: 0, controls: 0, modestbranding: 1 },
      events: {
        onReady: () => setStatus("ready"),
        onStateChange: syncState,
        onError: advanceStream,
      },
    });
  }, [advanceStream, syncState]);

  useEffect(() => {
    if (window.YT?.Player) {
      initPlayer();
      return;
    }

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    tag.onerror = () => setStatus("offline");
    document.head.appendChild(tag);
    window.onYouTubeIframeAPIReady = initPlayer;

    return () => { window.onYouTubeIframeAPIReady = () => {}; };
  }, [initPlayer]);

  const toggle = () => {
    if (!playerRef.current || status === "loading" || status === "offline") return;
    if (status === "playing") {
      wantsPlayRef.current = false;
      playerRef.current.pauseVideo();
    } else {
      wantsPlayRef.current = true;
      playerRef.current.playVideo();
    }
  };

  const playing = status === "playing";

  return (
    <div className="shrink-0 flex justify-end px-2 md:px-4 pb-1">
      <div className="absolute w-0 h-0 overflow-hidden pointer-events-none opacity-0">
        <div ref={containerRef} />
      </div>

      <button
        onClick={toggle}
        disabled={status === "loading" || status === "offline"}
        className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1.5 rounded-md bg-[rgba(0,0,0,0.6)] border border-[rgba(0,255,65,0.15)] backdrop-blur-sm hover:border-[rgba(0,255,65,0.3)] transition-all disabled:opacity-40"
      >
        {playing ? (
          <>
            <Radio size={12} className="text-[#00ff41] animate-pulse" />
            <span className="text-[9px] md:text-[10px] font-mono text-[rgba(0,255,65,0.6)] uppercase tracking-wider">
              <span className="hidden sm:inline">lofi — </span>on air
            </span>
            <Pause size={11} className="text-[rgba(0,255,65,0.5)] ml-0.5 md:ml-1" />
          </>
        ) : (
          <>
            <Radio size={12} className="text-[rgba(255,255,255,0.4)]" />
            <span className="text-[9px] md:text-[10px] font-mono text-[rgba(255,255,255,0.3)] uppercase tracking-wider">
              <span className="hidden sm:inline">lofi </span>
              {status === "offline" ? "offline" : "radio"}
            </span>
            <Play size={11} className="text-[rgba(255,255,255,0.3)] ml-0.5 md:ml-1" />
          </>
        )}
      </button>
    </div>
  );
}
