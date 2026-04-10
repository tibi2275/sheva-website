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
    // Enable strict mode for better dev warnings
    reactStrictMode: true,
};

module.exports = nextConfig;
