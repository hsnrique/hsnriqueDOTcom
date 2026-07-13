import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// ponytail: 'unsafe-inline' stays until Next.js inline scripts get nonces; frame-src is
// broad because Projects.browser embeds arbitrary project sites over https
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.youtube.com https://s.ytimg.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://i.ytimg.com",
  "font-src 'self' data:",
  "frame-src https:",
  `connect-src 'self' https://www.youtube.com${isDev ? " ws:" : ""}`,
  "media-src 'self' blob:",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
];

const SCANNER_PATHS = ["/wp-login.php", "/wp-admin", "/phpmyadmin", "/.env", "/config.php"];

const nextConfig: NextConfig = {
  reactCompiler: true,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  async rewrites() {
    return SCANNER_PATHS.map((source) => ({ source, destination: "/admin" }));
  },
};

export default nextConfig;
