export const PROFILE = {
  name: "Henrique Martins",
  handle: "@henrique",
  title: "Senior Product Engineer | Web, Mobile & AI",
  location: "Brazil",
  availability: "Open to relocate · Eligible for visa sponsorship",
  bio: "Senior product engineer with 8+ years building web, mobile, and AI products. Strong in TypeScript, product execution, and shipping reliable software.",
  quote: {
    text: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
  },
  stats: [
    { label: "Years Shipping", value: "8+" },
    { label: "App Store Apps", value: "5" },
    { label: "Open Source", value: "1" },
  ],
  socials: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/hsnrique/", icon: "linkedin" },
    { name: "GitHub", url: "https://github.com/hsnrique", icon: "github" },
    { name: "Instagram", url: "https://instagram.com/hsnriquemartins", icon: "instagram" },
    { name: "YouTube", url: "https://youtube.com/@hsnrique", icon: "youtube" },
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
    name: "lirk",
    description: "The Creator Network",
    url: "https://lirk.io",
    stack: ["AI", "Vite", "Node.js", "TypeScript", "Neon"],
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
    name: "contra",
    description: "Steelman & Debate AI",
    url: "https://apps.apple.com/us/app/contra-steelman-debate-ai/id6742379140",
    stack: ["AI", "Swift", "SwiftUI"],
    category: "apps",
  },
  {
    name: "ember",
    description: "Private AI Journal",
    url: "https://apps.apple.com/us/app/ember-private-ai-journal/id6769944306",
    stack: ["AI", "Swift", "SwiftUI"],
    category: "apps",
  },
  {
    name: "bebes",
    description: "Baby Name Picker",
    url: "https://apps.apple.com/us/app/bebes-baby-name-picker/id6773067379",
    stack: ["Swift", "SwiftUI"],
    category: "apps",
  },
];

export interface SkillCategory {
  name: string;
  items: string[];
}

export const SKILLS: SkillCategory[] = [
  {
    name: "Product & AI",
    items: ["AI Product Development", "LLM Integration", "Agent Workflows", "Structured Outputs", "Model Evaluation"],
  },
  { name: "Engineering", items: ["TypeScript", "Node.js", "React", "Swift", "SwiftUI", "Rust"] },
  {
    name: "Systems",
    items: ["APIs", "Backend Services", "Databases", "Cloudflare", "Supabase", "Neon", "Firebase", "Vercel"],
  },
  { name: "Workflow", items: ["Git", "Claude Code", "Codex", "Cursor"] },
  { name: "Languages", items: ["Portuguese", "English"] },
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
    timestamp: "NOV 2023 — PRESENT",
    role: "Founder",
    company: "Cyos Technologies - (Brazil)",
    description: "Built and shipped AI-powered products from idea to production, owning product, architecture, and delivery.",
    current: true,
  },
  {
    timestamp: "SEP 2024 — APR 2026",
    role: "Senior iOS Engineer",
    company: "Going Merry - (United States, Remote)",
    description: "Built AI-powered iOS products across app and backend, shipped production features and improved reliability.",
  },
  {
    timestamp: "FEB 2023 — SEP 2024",
    role: "Software Engineer",
    company: "Onedev - (Remote)",
    description: "Led full-stack delivery and technical decisions.",
  },
  {
    timestamp: "FEB 2020 — FEB 2023",
    role: "Software Engineer",
    company: "SpacedSoft - (Brazil)",
    description: "Operated a software development company delivering full-stack solutions.",
  },
  {
    timestamp: "OCT 2018 — FEB 2020",
    role: "Software Engineer",
    company: "Freelancer",
    description: "Designed and shipped full-stack web and mobile products for small businesses.",
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
  `  /dev/sda1 — Projects (${PROJECTS.length} found)`,
  `  /dev/sda2 — Skills (${SKILLS.length} categories)`,
  `  /dev/sda3 — Experience (${EXPERIENCE.length} entries)`,
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
