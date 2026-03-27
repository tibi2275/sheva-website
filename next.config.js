/** @type {import('next').NextConfig} */
const nextConfig = {
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
