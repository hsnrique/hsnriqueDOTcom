export const PROFILE = {
  name: "Henrique Martins",
  handle: "@henrique",
  title: "Founder at Arch | Senior Full Stack Engineer | AI Specialist",
  location: "Brazil",
  bio: "AI Specialist & Senior Full Stack Engineer specialized in building AI-powered solutions, web and mobile apps, with a focus on innovation, scalability, and future-forward vision.",
  quote: {
    text: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
  },
  stats: [
    { label: "App Store Apps", value: "4" },
    { label: "Active Ventures", value: "4" },
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
  { name: "Languages", items: ["Swift", "Rust", "TypeScript", "Python", "Kotlin", "Dart"] },
  { name: "Frontend", items: ["React", "Next.js", "SwiftUI", "Flutter", "Three.js", "GSAP"] },
  { name: "Backend", items: ["Node.js", "Python", "Rust"] },
  { name: "Mobile", items: ["iOS (Swift)", "Android (Kotlin)", "Flutter", "React Native"] },
  { name: "AI/ML", items: ["LLM Integration", "Computer Vision", "NLP", "RAG"] },
  { name: "Infra", items: ["Vercel", "Render", "Supabase", "Neon", "PostgreSQL"] },
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
    timestamp: "2025 — PRESENT",
    role: "Founder",
    company: "The Arch Company - (Global)",
    description: "Arch is an innovation-driven holding company specializing in the convergence of high-end audiovisual production and advanced software development. As a venture builder, we architect and scale products that leverage AI, cinematic storytelling, and human-centric design.",
    current: true,
  },
  {
    timestamp: "2024 — 2026",
    role: "Senior Mobile Developer",
    company: "Going Merry LLC - (United States, Remote)",
    description: "App Development with extensive experience as part of the core team behind 60+ apps successfully published on the App Store.",
  },
  {
    timestamp: "2023 — 2024",
    role: "Lead Front End Developer",
    company: "Onedev - (Remote)",
    description: "I led the development and maintenance of front-end components for internal applications while actively contributing to the overall project development.",
  },
  {
    timestamp: "2020 — 2024",
    role: "Founder & Mobile Developer",
    company: "hm/labs - (Brazil)",
    description: "Mobile developer focused on developing high-performance mobile applications for iOS and Android. My responsibilities include ensuring seamless user experiences and contributing to the company's technical direction.",
  },
  {
    timestamp: "2018 — 2020",
    role: "Freelance Mobile Developer",
    company: "Independent",
    description: "Freelance developer, providing tailored web and mobile solutions for small businesses and entrepreneurs. I was responsible for the creation of websites and applications, adapting to each project's needs to deliver functional and valuable products.",
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
  "  /dev/sda1 — Projects (10 found)",
  "  /dev/sda2 — Skills (6 categories)",
  "  /dev/sda3 — Experience (4 entries)",
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
