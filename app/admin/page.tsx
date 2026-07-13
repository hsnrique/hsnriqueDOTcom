import type { Metadata } from "next";
import HoneypotTerminal from "./HoneypotTerminal";

export const metadata: Metadata = {
  title: "HenriqueOS — restricted",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <HoneypotTerminal />;
}
