"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const BootSequence = dynamic(
  () => import("@/components/boot/BootSequence"),
  { ssr: false }
);

const Desktop = dynamic(
  () => import("@/components/desktop/Desktop"),
  { ssr: false }
);

export default function Home() {
  const [booted, setBooted] = useState(false);

  return (
    <main className="w-screen h-screen overflow-hidden bg-[#0a0a0a]">
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      {booted && <Desktop />}
    </main>
  );
}
