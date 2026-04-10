/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    basePath: process.env.PAGES_BASE_PATH || "/sheva-website",
    images: {
        // Obligatoire pour output: "export" — désactive l'API /_next/image
        // qui n'existe pas dans un export statique (GitHub Pages, serve…)
        unoptimized: true,
        remotePatterns: [],
    },
    // Expose basePath to client-side code (pour les assets HTML bruts : video, a href, etc.)
    env: {
        NEXT_PUBLIC_BASE_PATH: process.env.PAGES_BASE_PATH || "/sheva-website",
    },
    // Enable strict mode for better dev warnings
    reactStrictMode: true,
};

module.exports = nextConfig;
