/** @type {import('next').NextConfig} */

// basePath : vide pour un déploiement sur nom de domaine custom (site à la racine /).
// Si tu redéploies un jour sur GitHub Pages SANS domaine custom (ex: user.github.io/sheva),
// passe PAGES_BASE_PATH=/sheva au moment du build.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig = {
    output: "export",
    basePath: basePath,
    images: {
        // Obligatoire pour output: "export" — désactive l'API /_next/image
        // qui n'existe pas dans un export statique.
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
