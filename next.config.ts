import type { NextConfig } from "next";
import path from "path";

// Construct the exact S3 hostname from env vars so next/image only proxies
// images from the CETV bucket over HTTPS.
const s3Bucket = process.env.AWS_S3_BUCKET ?? "";
const s3Region = process.env.AWS_REGION ?? "";
const s3Hostname =
  s3Bucket && s3Region
    ? `${s3Bucket}.s3.${s3Region}.amazonaws.com`
    : "*.s3.amazonaws.com"; // fallback if env vars aren't available at build time

const securityHeaders = [
  // Prevent MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Disallow embedding in iframes (clickjacking protection)
  { key: "X-Frame-Options", value: "DENY" },
  // Force HTTPS for 2 years, include subdomains
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Only send origin in Referer header when crossing origins
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disable browser features the app doesn't use
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  images: {
    remotePatterns: [
      // CETV S3 bucket — the only external image source used by next/image
      {
        protocol: "https",
        hostname: s3Hostname,
      },
      // Local public assets (cetv_logo.png on sign-in/sign-up pages)
      {
        protocol: "https",
        hostname: "localhost",
      },
    ],
  },
};

export default nextConfig;
