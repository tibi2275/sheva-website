"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { assetPath } from "@/lib/assetPath";
import type { Article } from "@/components/NewsCarousel";
import { ArrowLeft, ArrowRight, CloseIcon } from "./Icons";
import { Reveal } from "./Reveal";

// ★ Les articles se modifient dans lib/newsData.ts (le premier = le plus récent)

export function HomeNews({ articles }: { articles: Article[] }) {
    const n = articles.length;
    const [offset, setOffset] = useState(0);
    const [open, setOpen] = useState<Article | null>(null);

    const at = (k: number) => articles[(((offset + k) % n) + n) % n];
    const featured = at(0);
    const side = n > 2 ? [at(1), at(2)] : n > 1 ? [at(1)] : [];

    if (!n) return null;

    return (
        <section id="actualites" className="hm-news-sec">
            <div className="hm-wrap">
                <Reveal>
                    <div className="hm-sec-head">
                        <h2 className="hm-h2 hm-display">La vie du club</h2>
                        {n > 3 && (
                            <div className="hm-news-arrows">
                                <button type="button" className="hm-round" aria-label="Actualités précédentes" onClick={() => setOffset((o) => o - 1)}>
                                    <ArrowLeft />
                                </button>
                                <button type="button" className="hm-round" aria-label="Actualités suivantes" onClick={() => setOffset((o) => o + 1)}>
                                    <ArrowRight />
                                </button>
                            </div>
                        )}
                    </div>
                </Reveal>

                {/* Ordinateur : une à la une + deux à côté */}
                <Reveal delay={100}>
                    <div className="hm-news-grid">
                        <button type="button" className="hm-card hm-feat" onClick={() => setOpen(featured)} key={`f-${featured.title}`}>
                            <div className="hm-feat-media">
                                <Image
                                    src={assetPath(featured.img)}
                                    alt=""
                                    fill
                                    sizes="(max-width: 1280px) 60vw, 760px"
                                    className="hm-card-img"
                                    style={{ objectPosition: featured.imgPosition ?? "center" }}
                                />
                                {featured.tag && <span className="hm-badge">{featured.tag}</span>}
                            </div>
                            <div style={{ padding: "28px 30px 30px" }}>
                                <p className="hm-date">{featured.date}</p>
                                <h3 className="hm-display" style={{ margin: "8px 0 0", fontSize: 30, lineHeight: 1.12, fontStretch: "105%" }}>
                                    {featured.title}
                                </h3>
                                <p style={{ margin: "12px 0 0", fontSize: 15, lineHeight: 1.65, color: "#3D5759", maxWidth: 620 }}>
                                    {featured.excerpt}
                                </p>
                                <span style={{ marginTop: 20, display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 700, fontSize: 15, color: "#2E6E73" }}>
                                    Lire l&apos;article
                                    <span className="hm-arrow"><ArrowRight width={16} height={16} /></span>
                                </span>
                            </div>
                        </button>

                        <div className="hm-side">
                            {side.map((a) => (
                                <button type="button" key={`s-${a.title}`} className="hm-card hm-side-card" onClick={() => setOpen(a)}>
                                    <div className="hm-side-media" style={{ position: "relative" }}>
                                        <Image
                                            src={assetPath(a.img)}
                                            alt=""
                                            fill
                                            sizes="180px"
                                            className="hm-card-img"
                                            style={{ objectPosition: a.imgPosition ?? "center" }}
                                        />
                                    </div>
                                    <div style={{ padding: "22px 24px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                        <p className="hm-date">{a.date}</p>
                                        <h3 style={{ margin: "6px 0 0", fontWeight: 700, fontSize: 18, lineHeight: 1.3 }}>{a.title}</h3>
                                        <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.55, color: "#3D5759", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                                            {a.excerpt}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </Reveal>
            </div>

            {/* Mobile : carrousel au doigt */}
            <div className="hm-news-mobile hm-snap">
                {articles.map((a) => (
                    <button type="button" key={`m-${a.title}`} className="hm-card" style={{ width: 290 }} onClick={() => setOpen(a)}>
                        <div style={{ position: "relative", height: 190, overflow: "hidden" }}>
                            <Image src={assetPath(a.img)} alt="" fill sizes="290px" className="hm-card-img" style={{ objectPosition: a.imgPosition ?? "center" }} />
                            {a.tag && <span className="hm-badge" style={{ top: 12, left: 12, fontSize: 11, padding: "5px 10px" }}>{a.tag}</span>}
                        </div>
                        <div style={{ padding: "16px 18px 18px" }}>
                            <p className="hm-date" style={{ fontSize: 12 }}>{a.date}</p>
                            <h3 style={{ margin: "6px 0 0", fontWeight: 700, fontSize: 17, lineHeight: 1.3 }}>{a.title}</h3>
                        </div>
                    </button>
                ))}
            </div>

            {open && createPortal(<ArticleModal article={open} onClose={() => setOpen(null)} />, document.body)}
        </section>
    );
}

function ArticleModal({ article, onClose }: { article: Article; onClose: () => void }) {
    useEffect(() => {
        const fn = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", fn);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", fn);
            document.body.style.overflow = prev;
        };
    }, [onClose]);

    return (
        <div
            className="hm-root"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={article.title}
            style={{ position: "fixed", inset: 0, zIndex: 250, background: "rgba(8,22,24,.72)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, animation: "fadeIn .2s ease" }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{ background: "#fff", borderRadius: 24, overflow: "hidden", width: "min(720px, 100%)", maxHeight: "90vh", overflowY: "auto", position: "relative", boxShadow: "0 24px 64px rgba(0,0,0,.3)", animation: "hmRise .35s cubic-bezier(.2,.7,.2,1) both" }}
            >
                <div style={{ position: "relative", height: 280 }}>
                    <Image src={assetPath(article.img)} alt="" fill sizes="720px" style={{ objectFit: "cover", objectPosition: article.imgPosition ?? "center" }} />
                    {article.tag && <span className="hm-badge">{article.tag}</span>}
                </div>
                <button type="button" onClick={onClose} aria-label="Fermer" style={{ position: "absolute", top: 16, right: 16, width: 44, height: 44, borderRadius: "50%", background: "rgba(15,42,44,.55)", border: "none", color: "#fff", cursor: "pointer", display: "grid", placeItems: "center" }}>
                    <CloseIcon />
                </button>
                <div style={{ padding: "28px 32px 36px" }}>
                    <p className="hm-date">{article.date}</p>
                    <h2 className="hm-display" style={{ fontSize: 28, lineHeight: 1.15, margin: "8px 0 20px", color: "#0F2A2C", fontStretch: "105%" }}>{article.title}</h2>
                    <div style={{ fontSize: 15, color: "#2B3F41", lineHeight: 1.85, whiteSpace: "pre-line" }}>{article.body}</div>
                    {article.links && article.links.length > 0 && (
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 8, marginTop: 24 }}>
                            {article.links.map((l) => (
                                <a key={l.href} href={assetPath(l.href)} target="_blank" rel="noopener noreferrer" style={{ display: "block", padding: "12px 14px", borderRadius: 12, border: "1.5px solid #5EB4AE", color: "#2E6E73", fontSize: 14, fontWeight: 700, textAlign: "center", textDecoration: "none" }}>
                                    {l.label}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
