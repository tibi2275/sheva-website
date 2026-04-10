"use client";

import { useEffect, useRef, useState } from "react";
import { InstagramEmbed } from "./InstagramEmbed";

// ─── Mettez ici les URLs de vos posts Instagram ───────────────────────────────
// Pour ajouter un post : copier l'URL depuis Instagram → Partager → Copier le lien
export const instagramPosts = [
    "https://www.instagram.com/p/DW5oMpjDHys/",
    "https://www.instagram.com/p/DWrIJ4cDNva/",
    "https://www.instagram.com/p/DWkIHm3DEhB/",
    "https://www.instagram.com/p/DWO2kmiDDxZ/",
];
// ─────────────────────────────────────────────────────────────────────────────

const CARD_W = 360;
const CARD_GAP = 20;
const SWIPE_THRESHOLD = 50;

export function InstagramCarousel({ posts = instagramPosts }: { posts?: string[] }) {
    const n = posts.length;
    const all = [...posts, ...posts, ...posts];
    const [rawIndex, setRawIndex] = useState(n);
    const [animated, setAnimated] = useState(true);
    const [paused, setPaused] = useState(false);
    const touchStartX = useRef<number | null>(null);

    const dotIndex = ((rawIndex % n) + n) % n;

    const next = () => { setAnimated(true); setRawIndex(r => r + 1); };
    const prev = () => { setAnimated(true); setRawIndex(r => r - 1); };

    // Saut silencieux aux bords
    useEffect(() => {
        if (rawIndex >= n * 2) {
            const t = setTimeout(() => { setAnimated(false); setRawIndex(rawIndex - n); }, 520);
            return () => clearTimeout(t);
        }
        if (rawIndex < n) {
            const t = setTimeout(() => { setAnimated(false); setRawIndex(rawIndex + n); }, 520);
            return () => clearTimeout(t);
        }
    }, [rawIndex, n]);

    useEffect(() => {
        if (!animated) {
            const t = setTimeout(() => setAnimated(true), 30);
            return () => clearTimeout(t);
        }
    }, [animated]);

    // Auto-avance
    useEffect(() => {
        if (paused) return;
        const t = setInterval(next, 6000);
        return () => clearInterval(t);
    }, [paused, rawIndex]);

    const translateX = -(rawIndex * (CARD_W + CARD_GAP));

    return (
        <>
            <div
                style={{ position: "relative", overflow: "hidden", paddingTop: 10, paddingBottom: 10 }}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                {/* Dégradés latéraux */}
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 64, background: "linear-gradient(to right, white, transparent)", zIndex: 2, pointerEvents: "none" }} />
                <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 64, background: "linear-gradient(to left, white, transparent)", zIndex: 2, pointerEvents: "none" }} />

                {/* Track */}
                <div
                    onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; setPaused(true); }}
                    onTouchEnd={(e) => {
                        if (touchStartX.current === null) return;
                        const delta = e.changedTouches[0].clientX - touchStartX.current;
                        if (delta < -SWIPE_THRESHOLD) next();
                        else if (delta > SWIPE_THRESHOLD) prev();
                        touchStartX.current = null;
                    }}
                    style={{
                        display: "flex",
                        gap: CARD_GAP,
                        transform: `translateX(calc(50vw - ${CARD_W / 2}px + ${translateX}px))`,
                        transition: animated ? "transform 0.52s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
                        willChange: "transform",
                    }}
                >
                    {all.map((url, i) => {
                        const isCenter = i === rawIndex;
                        return (
                            <div
                                key={`${url}-${i}`}
                                onClick={() => { if (!isCenter) { setRawIndex(i); setAnimated(true); } }}
                                style={{
                                    flexShrink: 0,
                                    width: CARD_W,
                                    borderRadius: 20,
                                    overflow: "hidden",
                                    background: "white",
                                    boxShadow: isCenter
                                        ? "0 10px 36px rgba(0,0,0,0.13)"
                                        : "0 2px 10px rgba(0,0,0,0.06)",
                                    transform: isCenter ? "scale(1.015)" : "scale(0.97)",
                                    opacity: isCenter ? 1 : 0.75,
                                    transition: "transform 0.45s ease, box-shadow 0.45s ease, opacity 0.45s ease",
                                    cursor: isCenter ? "default" : "pointer",
                                    // Évite que le click sur le post passe au carousel quand c'est la carte active
                                    pointerEvents: isCenter ? "auto" : "auto",
                                }}
                            >
                                <InstagramEmbed url={url} />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Navigation */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 20 }}>
                <button onClick={() => { prev(); setPaused(true); }} aria-label="Post précédent"
                    style={{ width: 36, height: 36, borderRadius: "50%", border: "1.5px solid rgba(94,180,174,0.4)", background: "white", color: "rgb(69,144,150)", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
                    ‹
                </button>
                <div style={{ display: "flex", gap: 6 }}>
                    {posts.map((_, i) => (
                        <button key={i} onClick={() => { setRawIndex(n + i); setAnimated(true); setPaused(true); }}
                            aria-label={`Post ${i + 1}`}
                            style={{ width: i === dotIndex ? 20 : 6, height: 6, borderRadius: 3, border: "none", background: i === dotIndex ? "rgb(94,180,174)" : "rgba(94,180,174,0.3)", cursor: "pointer", padding: 0, transition: "width 0.3s ease, background 0.3s ease" }} />
                    ))}
                </div>
                <button onClick={() => { next(); setPaused(true); }} aria-label="Post suivant"
                    style={{ width: 36, height: 36, borderRadius: "50%", border: "1.5px solid rgba(94,180,174,0.4)", background: "white", color: "rgb(69,144,150)", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
                    ›
                </button>
            </div>
        </>
    );
}
