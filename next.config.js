/** @type {import('next').NextConfig} */

// Le basePath est /sheva-website sur GitHub Pages, vide en local.
// On lit PAGES_BASE_PATH (injecté par configure-pages ou le workflow),
// avec fallback sur GITHUB_ACTIONS pour éviter tout problème de timing.
const basePath =
    process.env.PAGES_BASE_PATH ||
    (process.env.GITHUB_ACTIONS === "true" ? "/sheva-website" : "");

const nextConfig = {
    output: "export",
    basePath,
    images: {
        // Obligatoire pour output: "export" — désactive l'API /_next/image
        // qui n'existe pas dans un export statique (GitHub Pages, serve…)
        unoptimized: true,
        remotePatterns: [],
    },
    // Expose basePath côté client pour les assets HTML bruts (video, a href…)
    env: {
        NEXT_PUBLIC_BASE_PATH: basePath,
    },
    reactStrictMode: true,
};

module.exports = nextConfig;
