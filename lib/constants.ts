export const PROFILE = {
  name: "Henrique Martins",
  handle: "@henrique",
  title: "Founder at dhrive | Senior iOS Engineer | AI Products",
  location: "Brazil",
  bio: "Senior iOS engineer with a track record of building and shipping AI-powered products end-to-end, from architecture to production.",
  quote: {
    text: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
  },
  stats: [
    { label: "App Store Apps", value: "4" },
    { label: "Active Ventures", value: "3" },
    { label: "Open Source", value: "2" },
  ],
  socials: [
    { name: "Instagram", url: "https://instagram.com/hsnriquemartins", icon: "instagram" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/hsnrique/", icon: "linkedin" },
    { name: "YouTube", url: "https://youtube.com/@hsnrique", icon: "youtube" },
    { name: "GitHub", url: "https://github.com/hsnrique", icon: "github" },
  ],
} as const;

export interface Project {
  name: string;
  description: string;
  url: string;
  stack: string[];
  category: "saas" | "opensource" | "apps";
}

export const PROJECTS: Project[] = [
  {
    name: "dhrive",
    description: "Turns a prompt into a real native iOS app",
    url: "https://dhrive.app",
    stack: ["AI", "Swift", "SwiftUI", "Next.js", "TypeScript"],
    category: "saas",
  },
  {
    name: "neiro",
    description: "AI Deep Research Engine",
    url: "https://neiro.it",
    stack: ["AI/ML", "Next.js", "Node", "TypeScript", "Neon"],
    category: "saas",
  },
  {
    name: "lirk",
    description: "The Creator Network",
    url: "https://lirk.io",
    stack: ["AI", "Vite", "Node.js", "TypeScript", "Neon"],
    category: "saas",
  },
  {
    name: "seoptimize",
    description: "AI-Powered SEO Analysis Tool",
    url: "https://seoptimize.io",
    stack: ["AI", "Next.js", "GSAP", "TypeScript", "Neon"],
    category: "saas",
  },
  {
    name: "nxen",
    description: "Ultra Resolution AI Image Editor",
    url: "https://nxen.io",
    stack: ["AI", "Vite", "Canvas", "WebGL", "TypeScript", "Supabase"],
    category: "saas",
  },
  {
    name: "oura browser",
    description: "The browser, reimagined with AI",
    url: "https://oura.dev",
    stack: ["AI", "Electron", "Node", "TypeScript", "React"],
    category: "opensource",
  },
  {
    name: "opencrab",
    description: "Personal AI assistant built in Rust",
    url: "https://github.com/hsnrique/OpenCrab",
    stack: ["AI", "Rust", "Systems"],
    category: "opensource",
  },
  {
    name: "imagen",
    description: "AI Image Generator",
    url: "https://apps.apple.com/us/app/imagen-ai-image-generator/id6739819365",
    stack: ["AI", "React Native", "Node", "TypeScript"],
    category: "apps",
  },
  {
    name: "firstmed",
    description: "AI Health Assistant",
    url: "https://apps.apple.com/us/app/firstmed-ai-health-assistant/id6747414143",
    stack: ["AI", "React Native", "Rust", "TypeScript"],
    category: "apps",
  },
  {
    name: "haiku",
    description: "AI Poem Generator",
    url: "https://apps.apple.com/us/app/haiku-ai-poem-generator/id6742144558",
    stack: ["AI", "Swift", "SwiftUI"],
    category: "apps",
  },
  {
    name: "wordee",
    description: "Word Search Puzzles",
    url: "https://apps.apple.com/us/app/wordee-word-search-puzzles/id6742909193",
    stack: ["React Native", "Node", "TypeScript"],
    category: "apps",
  },
];

export interface SkillCategory {
  name: string;
  items: string[];
}

export const SKILLS: SkillCategory[] = [
  { name: "Languages", items: ["Swift", "Rust", "TypeScript", "Dart"] },
  { name: "Mobile", items: ["iOS (SwiftUI)", "Flutter", "React Native"] },
  { name: "Frontend", items: ["React", "Next.js", "Tauri", "Three.js", "GSAP"] },
  { name: "Backend", items: ["Node.js", "Express", "Rust"] },
  { name: "AI/ML", items: ["LLM Integration", "Agents", "RAG", "Computer Vision"] },
  { name: "Cloud & Infra", items: ["Supabase", "Neon", "Firebase", "Cloudflare", "Vercel", "Render"] },
];

export interface ExperienceEntry {
  timestamp: string;
  role: string;
  company: string;
  description: string;
  current?: boolean;
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    timestamp: "2026 — PRESENT",
    role: "Founder",
    company: "dhrive",
    description: "dhrive turns a prompt into a real native iOS app.",
    current: true,
  },
  {
    timestamp: "2025 — PRESENT",
    role: "Co-Founder",
    company: "The Arch Company - (Global)",
    description: "Co-founded and lead The Arch, an AI studio building and shipping production-grade AI products.",
    current: true,
  },
  {
    timestamp: "2023 — PRESENT",
    role: "Founder",
    company: "Cyos Technologies - (Brazil)",
    description: "Founded and lead Cyos Technologies, a software consultancy specialized in end-to-end product development and AI integration.",
    current: true,
  },
  {
    timestamp: "2024 — 2026",
    role: "Senior iOS Engineer",
    company: "Going Merry LLC - (United States, Remote)",
    description: "Built and maintained full stack AI-powered iOS apps as part of the core team behind 60+ apps published on the App Store.",
  },
  {
    timestamp: "2023 — 2024",
    role: "Software Engineer",
    company: "Onedev - (Remote)",
    description: "Led the full-stack development team while actively contributing to the overall project development.",
  },
  {
    timestamp: "2020 — 2023",
    role: "Software Engineer",
    company: "SpacedSoft - (Brazil)",
    description: "Operated a software development company delivering full-stack solutions.",
  },
  {
    timestamp: "2018 — 2020",
    role: "Freelance Software Engineer",
    company: "Independent",
    description: "Contracted by small businesses and entrepreneurs to design and ship full-stack web and mobile products.",
  },
];

export const BOOT_LINES = [
  "HenriqueOS v1.0.0",
  "Copyright (c) 2026 Henrique Martins. All rights reserved.",
  "",
  "BIOS Date: 03/11/2026",
  "CPU: Neural Engine x86_64 @ 4.2 GHz",
  "Memory Test: 32768 MB OK",
  "GPU: RTX 5090 Founders Edition",
  "",
  "Detecting drives...",
  "  /dev/sda1 — Projects (11 found)",
  "  /dev/sda2 — Skills (6 categories)",
  "  /dev/sda3 — Experience (7 entries)",
  "",
  "Loading kernel modules...",
  "  [OK] gsap.ko",
  "  [OK] three.ko",
  "  [OK] react-fiber.ko",
  "  [OK] creativity.ko",
  "",
  "Starting HenriqueOS...",
];

export const DESKTOP_ICONS = [
  { id: "about", label: "About.me", icon: "user" },
  { id: "projects", label: "Projects.browser", icon: "folder" },
  { id: "skills", label: "Skills.terminal", icon: "terminal" },
  { id: "experience", label: "Experience.log", icon: "file-text" },
  { id: "contact", label: "Contact.sys", icon: "mail" },
] as const;

export type WindowId = typeof DESKTOP_ICONS[number]["id"];
