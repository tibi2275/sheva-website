/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    basePath: process.env.PAGES_BASE_PATH || "",
    images: {
        // Allow external image domains if needed
        remotePatterns: [],
        // Optimize local images
        formats: ["image/avif", "image/webp"],
    },
    // Expose basePath to client-side code (pour les assets HTML bruts : video, a href, etc.)
    env: {
        NEXT_PUBLIC_BASE_PATH: process.env.PAGES_BASE_PATH || "",
    },
    // Enable strict mode for better dev warnings
    reactStrictMode: true,
};

module.exports = nextConfig;
