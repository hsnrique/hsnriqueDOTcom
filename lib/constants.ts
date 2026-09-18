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
  category: "saas" | "web" | "opensource";
}

export const PROJECTS: Project[] = [
  {
    name: "leadmire",
    description: "WhatsApp marketing automation on Meta's official API",
    url: "https://leadmire.com",
    stack: ["Next.js", "Supabase", "WhatsApp API"],
    category: "saas",
  },
  {
    name: "myspote",
    description: "Build a page, share the link",
    url: "https://myspote.com",
    stack: ["React", "Vite", "Supabase"],
    category: "saas",
  },
  {
    name: "udilabs",
    description: "Creative studio: brand, film, strategy and apps",
    url: "https://udilabs.com",
    stack: ["Next.js", "Vercel"],
    category: "web",
  },
  {
    name: "udipost",
    description: "Local news portal",
    url: "https://udipost.com.br",
    stack: ["Next.js", "Vercel"],
    category: "web",
  },
  {
    name: "skynt",
    description: "Policy gateway for MCP: AI tool calls go through your rules first",
    url: "https://github.com/hsnrique/skynt",
    stack: ["AI", "Python", "MCP"],
    category: "opensource",
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
