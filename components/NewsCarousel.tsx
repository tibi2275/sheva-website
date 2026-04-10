"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export type Article = {
    date: string;
    title: string;
    excerpt: string;
    body: string;
    img: string;
};

const CARD_W = 320;
const CARD_GAP = 20;
const SWIPE_THRESHOLD = 50;

export function NewsCarousel({ articles }: { articles: Article[] }) {
    const n = articles.length;
    // Triple array pour la boucle infinie — on démarre au milieu (index n = article[0])
    const all = [...articles, ...articles, ...articles];

    const [rawIndex, setRawIndex] = useState(n); // article[0] centré au départ
    const [animated, setAnimated] = useState(true);
    const [paused, setPaused] = useState(false);
    const [modal, setModal] = useState<Article | null>(null);
    const touchStartX = useRef<number | null>(null);

    // Index visible pour les dots
    const dotIndex = ((rawIndex % n) + n) % n;

    const next = () => { setAnimated(true); setRawIndex(r => r + 1); };
    const prev = () => { setAnimated(true); setRawIndex(r => r - 1); };

    // Saut silencieux quand on atteint les bords du triple tableau
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

    // Ré-active l'animation après le saut silencieux
    useEffect(() => {
        if (!animated) {
            const t = setTimeout(() => setAnimated(true), 30);
            return () => clearTimeout(t);
        }
    }, [animated]);

    // Auto-avance
    useEffect(() => {
        if (paused || modal) return;
        const t = setInterval(next, 5000);
        return () => clearInterval(t);
    }, [paused, modal, rawIndex]);

    // Escape pour fermer le modal
    useEffect(() => {
        if (!modal) return;
        const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setModal(null); };
        window.addEventListener("keydown", fn);
        return () => window.removeEventListener("keydown", fn);
    }, [modal]);

    const translateX = -(rawIndex * (CARD_W + CARD_GAP));

    return (
        <>
            {/* ── Carrousel ─────────────────────────────── */}
            <div
                style={{ position: "relative", overflow: "hidden", paddingTop: 8, paddingBottom: 8 }}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                {/* Dégradés latéraux */}
                <div style={{
                    position: "absolute", left: 0, top: 0, bottom: 0, width: 64,
                    background: "linear-gradient(to right, #fafbfb, transparent)",
                    zIndex: 2, pointerEvents: "none",
                }} />
                <div style={{
                    position: "absolute", right: 0, top: 0, bottom: 0, width: 64,
                    background: "linear-gradient(to left, #fafbfb, transparent)",
                    zIndex: 2, pointerEvents: "none",
                }} />

                {/* Track */}
                <div
                    onTouchStart={(e) => {
                        touchStartX.current = e.touches[0].clientX;
                        setPaused(true);
                    }}
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
                    {all.map((article, i) => {
                        const isCenter = i === rawIndex;
                        return (
                            <div
                                key={i}
                                onClick={() => {
                                    if (!isCenter) { setRawIndex(i); setAnimated(true); return; }
                                    setModal(article);
                                    setPaused(true);
                                }}
                                style={{
                                    flexShrink: 0,
                                    width: CARD_W,
                                    borderRadius: 16,
                                    background: "white",
                                    border: "1px solid #f0f0f0",
                                    boxShadow: isCenter
                                        ? "0 8px 24px rgba(0,0,0,0.11)"
                                        : "0 1px 6px rgba(0,0,0,0.05)",
                                    transform: isCenter ? "scale(1.015)" : "scale(0.985)",
                                    transition: "transform 0.4s ease, box-shadow 0.4s ease",
                                    overflow: "hidden",
                                    cursor: "pointer",
                                }}
                            >
                                {/* Photo */}
                                <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
                                    <Image
                                        src={assetPath(article.img)}
                                        alt={article.title}
                                        fill
                                        sizes={`${CARD_W}px`}
                                        style={{ objectFit: "cover" }}
                                    />
                                    <span style={{
                                        position: "absolute", top: 12, left: 12,
                                        padding: "4px 10px",
                                        background: "linear-gradient(45deg, #ff6b35, #f7931e)",
                                        color: "white", fontSize: 11, fontWeight: 700, borderRadius: 8,
                                        letterSpacing: "0.3px",
                                    }}>
                                        Actualité
                                    </span>
                                </div>

                                {/* Texte */}
                                <div style={{ padding: "16px 20px 20px" }}>
                                    <time style={{ fontSize: 11, color: "#9ca3af", letterSpacing: "0.3px" }}>
                                        {article.date}
                                    </time>
                                    <h3 style={{
                                        fontSize: 15, fontWeight: 700,
                                        color: "rgb(30,41,59)",
                                        margin: "6px 0 8px", lineHeight: 1.4,
                                    }}>
                                        {article.title}
                                    </h3>
                                    <p style={{
                                        fontSize: 13, color: "#6b7280", lineHeight: 1.65,
                                        display: "-webkit-box",
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                    }}>
                                        {article.excerpt}
                                    </p>
                                    <span style={{
                                        display: "inline-flex", alignItems: "center",
                                        gap: 4, marginTop: 14, fontSize: 13,
                                        fontWeight: 700, color: "#ff6b35",
                                    }}>
                                        Lire la suite →
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ── Navigation ───────────────────────────── */}
            <div style={{
                display: "flex", alignItems: "center",
                justifyContent: "center", gap: 12, marginTop: 20,
            }}>
                <button
                    onClick={() => { prev(); setPaused(true); }}
                    aria-label="Article précédent"
                    style={{
                        width: 36, height: 36, borderRadius: "50%",
                        border: "1.5px solid rgba(94,180,174,0.4)",
                        background: "white", color: "rgb(69,144,150)",
                        fontSize: 18, cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        lineHeight: 1,
                    }}
                >
                    ‹
                </button>

                <div style={{ display: "flex", gap: 6 }}>
                    {articles.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => { setRawIndex(n + i); setAnimated(true); setPaused(true); }}
                            aria-label={`Article ${i + 1}`}
                            style={{
                                width: i === dotIndex ? 20 : 6,
                                height: 6, borderRadius: 3, border: "none",
                                background: i === dotIndex ? "rgb(94,180,174)" : "rgba(94,180,174,0.3)",
                                cursor: "pointer", padding: 0,
                                transition: "width 0.3s ease, background 0.3s ease",
                            }}
                        />
                    ))}
                </div>

                <button
                    onClick={() => { next(); setPaused(true); }}
                    aria-label="Article suivant"
                    style={{
                        width: 36, height: 36, borderRadius: "50%",
                        border: "1.5px solid rgba(94,180,174,0.4)",
                        background: "white", color: "rgb(69,144,150)",
                        fontSize: 18, cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        lineHeight: 1,
                    }}
                >
                    ›
                </button>
            </div>

            {/* ── Modal ────────────────────────────────── */}
            {modal && (
                <div
                    onClick={() => setModal(null)}
                    style={{
                        position: "fixed", inset: 0, zIndex: 200,
                        background: "rgba(0,0,0,0.72)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        padding: 16,
                        backdropFilter: "blur(4px)",
                        WebkitBackdropFilter: "blur(4px)",
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: "white",
                            borderRadius: 20,
                            overflow: "hidden",
                            width: "min(680px, 100%)",
                            maxHeight: "90vh",
                            overflowY: "auto",
                            position: "relative",
                            boxShadow: "0 24px 64px rgba(0,0,0,0.3)",
                        }}
                    >
                        {/* Image hero */}
                        <div style={{ position: "relative", height: 260 }}>
                            <Image
                                src={assetPath(modal.img)}
                                alt={modal.title}
                                fill
                                style={{ objectFit: "cover" }}
                                sizes="680px"
                            />
                            <div style={{
                                position: "absolute", inset: 0,
                                background: "linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.35))",
                            }} />
                            <span style={{
                                position: "absolute", top: 16, left: 16,
                                padding: "4px 10px",
                                background: "linear-gradient(45deg, #ff6b35, #f7931e)",
                                color: "white", fontSize: 11, fontWeight: 700, borderRadius: 8,
                            }}>
                                Actualité
                            </span>
                        </div>

                        {/* Bouton fermer */}
                        <button
                            onClick={() => setModal(null)}
                            aria-label="Fermer"
                            style={{
                                position: "absolute", top: 16, right: 16,
                                width: 36, height: 36, borderRadius: "50%",
                                background: "rgba(0,0,0,0.45)",
                                border: "none", color: "white",
                                fontSize: 16, cursor: "pointer",
                                display: "flex", alignItems: "center", justifyContent: "center",
                            }}
                        >
                            ✕
                        </button>

                        {/* Contenu */}
                        <div style={{ padding: "28px 28px 36px" }}>
                            <time style={{ fontSize: 12, color: "#9ca3af", letterSpacing: "0.3px" }}>
                                {modal.date}
                            </time>
                            <h2 style={{
                                fontSize: 22, fontWeight: 800,
                                color: "rgb(30,41,59)",
                                margin: "8px 0 20px", lineHeight: 1.3,
                            }}>
                                {modal.title}
                            </h2>
                            <div style={{
                                fontSize: 15, color: "#374151",
                                lineHeight: 1.85, whiteSpace: "pre-line",
                            }}>
                                {modal.body}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
