"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { assetPath } from "@/lib/assetPath";
import { InstagramEmbed } from "@/components/InstagramEmbed";
import { instagramPosts } from "@/components/InstagramCarousel";
import { galleryPhotos } from "@/components/PhotoGallery";
import { ArrowLeft, ArrowRight, CloseIcon, InstaIcon } from "./Icons";
import { Reveal } from "./Reveal";

// ★ Posts Instagram : liste dans components/InstagramCarousel.tsx
// ★ Photos de la galerie : liste dans components/PhotoGallery.tsx

const INSTA_URL = "https://www.instagram.com/centreequestresheva/";
const photoSrc = (f: string) => assetPath(`/images/Images-illustrations/${f}`);

export function HomeSocial() {
    const trackRef = useRef<HTMLDivElement>(null);
    const [lightbox, setLightbox] = useState<number | null>(null);
    const nb = galleryPhotos.length;

    const scrollBy = (dir: 1 | -1) => {
        const t = trackRef.current;
        if (!t) return;
        t.scrollBy({ left: dir * 360, behavior: "smooth" });
    };

    const lbPrev = useCallback(() => setLightbox((i) => (i === null ? null : (i - 1 + nb) % nb)), [nb]);
    const lbNext = useCallback(() => setLightbox((i) => (i === null ? null : (i + 1) % nb)), [nb]);

    useEffect(() => {
        if (lightbox === null) return;
        const fn = (e: KeyboardEvent) => {
            if (e.key === "Escape") setLightbox(null);
            if (e.key === "ArrowRight") lbNext();
            if (e.key === "ArrowLeft") lbPrev();
        };
        window.addEventListener("keydown", fn);
        return () => window.removeEventListener("keydown", fn);
    }, [lightbox, lbNext, lbPrev]);

    // Galerie dupliquée pour un défilement continu
    const loop = [...galleryPhotos, ...galleryPhotos];

    return (
        <section className="hm-social">
            <div className="hm-wrap">
                <Reveal>
                    <div className="hm-sec-head" style={{ flexWrap: "wrap" }}>
                        <div>
                            <p style={{ margin: "0 0 10px", fontSize: 15, fontWeight: 600, color: "#2E6E73" }}>@centreequestresheva</p>
                            <h2 className="hm-h2 hm-display">Côté écuries</h2>
                        </div>
                        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                            <button type="button" className="hm-round" aria-label="Posts précédents" onClick={() => scrollBy(-1)}>
                                <ArrowLeft />
                            </button>
                            <button type="button" className="hm-round" aria-label="Posts suivants" onClick={() => scrollBy(1)}>
                                <ArrowRight />
                            </button>
                            <a href={INSTA_URL} target="_blank" rel="noopener noreferrer" className="hm-btn" style={{ background: "#0F2A2C", color: "#fff", padding: "13px 20px", fontSize: 15, fontWeight: 600, marginLeft: 6 }}>
                                <InstaIcon /> Suivre
                            </a>
                        </div>
                    </div>
                </Reveal>
            </div>

            {/* Rangée 1 — les vrais posts Instagram */}
            <div ref={trackRef} className="hm-insta-track" aria-label="Derniers posts Instagram">
                {instagramPosts.map((url) => (
                    <div key={url} className="hm-insta-card">
                        <InstagramEmbed url={url} />
                    </div>
                ))}
            </div>

            {/* Rangée 2 — galerie photo en défilement continu */}
            <div className="hm-wrap" style={{ marginTop: 40, display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                <h3 style={{ margin: 0, fontWeight: 700, fontSize: 20, color: "#0F2A2C" }}>Galerie photo</h3>
                <span style={{ fontSize: 13, color: "#4A6466" }}>Cliquez sur une photo pour l&apos;agrandir</span>
            </div>
            <div className="hm-gallery">
                <div className="hm-gallery-track">
                    {loop.map((f, i) => (
                        <button
                            type="button"
                            key={`${f}-${i}`}
                            className="hm-gallery-item"
                            onClick={() => setLightbox(i % nb)}
                            aria-label={`Agrandir la photo ${(i % nb) + 1}`}
                            tabIndex={i >= nb ? -1 : 0}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={photoSrc(f)} alt="" loading="lazy" />
                        </button>
                    ))}
                </div>
            </div>

            {lightbox !== null &&
                createPortal(
                    <div className="hm-lightbox hm-root" role="dialog" aria-modal="true" aria-label="Photo agrandie" onClick={() => setLightbox(null)}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={photoSrc(galleryPhotos[lightbox])} alt="" onClick={(e) => e.stopPropagation()} />
                        <button type="button" className="hm-lb-btn" style={{ top: 20, right: 20 }} aria-label="Fermer" onClick={() => setLightbox(null)}>
                            <CloseIcon />
                        </button>
                        <button type="button" className="hm-lb-btn" style={{ left: 20, top: "50%", transform: "translateY(-50%)" }} aria-label="Photo précédente" onClick={(e) => { e.stopPropagation(); lbPrev(); }}>
                            <ArrowLeft />
                        </button>
                        <button type="button" className="hm-lb-btn" style={{ right: 20, top: "50%", transform: "translateY(-50%)" }} aria-label="Photo suivante" onClick={(e) => { e.stopPropagation(); lbNext(); }}>
                            <ArrowRight />
                        </button>
                    </div>,
                    document.body,
                )}
        </section>
    );
}
