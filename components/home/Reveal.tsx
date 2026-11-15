"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

/**
 * Fait apparaître son contenu (fondu + montée) la première fois qu'il entre
 * à l'écran. Désactivé si l'utilisateur a demandé moins d'animations.
 */
export function Reveal({
    children,
    delay = 0,
    className = "",
    style,
}: {
    children: ReactNode;
    delay?: number;
    className?: string;
    style?: CSSProperties;
}) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (
            window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
            !("IntersectionObserver" in window)
        ) {
            el.classList.add("is-in");
            return;
        }
        const io = new IntersectionObserver(
            (entries) => {
                for (const e of entries) {
                    if (e.isIntersecting) {
                        el.classList.add("is-in");
                        io.disconnect();
                    }
                }
            },
            { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`hm-reveal ${className}`}
            style={{ transitionDelay: delay ? `${delay}ms` : undefined, ...style }}
        >
            {children}
        </div>
    );
}
