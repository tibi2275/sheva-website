"use client";

import { useEffect } from "react";

export function InstagramEmbed({ url }: { url: string }) {
    useEffect(() => {
        // Load embed script if not already loaded
        if (!document.getElementById("instagram-embed-script")) {
            const script = document.createElement("script");
            script.id = "instagram-embed-script";
            script.src = "https://www.instagram.com/embed.js";
            script.async = true;
            document.body.appendChild(script);
        } else {
            // Script already loaded — just reprocess
            // @ts-ignore
            if (window.instgrm) window.instgrm.Embeds.process();
        }
    }, []);

    return (
        <div
            suppressHydrationWarning
            className="w-full min-h-[420px] flex items-center justify-center p-2"
        >
            <blockquote
                suppressHydrationWarning
                className="instagram-media w-full"
                data-instgrm-permalink={url}
                data-instgrm-version="14"
            />
        </div>
    );
}
