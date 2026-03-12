import type { Metadata, Viewport } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "HenriqueOS — Senior Full Stack Engineer",
  description: "Founder at Arch | Senior Full Stack Engineer | AI Specialist — An immersive retro OS portfolio.",
  openGraph: {
    title: "HenriqueOS — Senior Full Stack Engineer",
    description: "Explore the portfolio of Henrique Martins through an interactive retro operating system.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
        <div className="crt-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
