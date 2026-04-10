"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { assetPath } from "@/lib/assetPath";

const SWIPE_THRESHOLD = 50; // px minimum pour déclencher un swipe

const photos = [
    "0d33c4f9-64e2-4e20-96c0-fcbc419a827d.jpg",
    "0FAA4EB7-F51A-4DBD-9A11-1603A9478F75.jpeg",
    "13EE2E49-67C3-48EA-B1A0-4E5477A94C2B.jpeg",
    "1A84B066-3E07-4601-AD8C-7F2BB30E64F9.jpeg",
    "2FED1B49-16FB-45CE-97C6-9D5D8B5D36DF.jpeg",
    "316FB0AE-33D2-423C-8F77-A79239C16F8D.jpeg",
    "5B534776-49E8-44CB-8F45-DB560DD110B7.jpeg",
    "6F361C0E-96BA-4ACA-B1CF-BE307A707FA3.jpeg",
    "716FFD1A-9DAB-4C9B-B69D-3A5C63EFE19C.jpeg",
    "stages.jpg",
    "72E273B8-51EB-438E-9854-8B7356E8FE29.jpeg",
    "74E1B71E-0E50-48A1-B243-6A8F087A311F.jpeg",
    "7ADB5A57-7646-4C77-922C-FDA48C420C7D.jpeg",
    "90BFDB09-0FE9-44CA-8016-85CC1A1160CB.jpeg",
    "95756EC0-387D-4D46-8D8A-414A95499F30.jpeg",
    "A4B43F1B-44A0-42E5-8C0A-F4F979CC35E6.jpeg",
    "activ-hero.jpeg",
    "B774D7AA-3D24-4B5B-9EF4-3A5D41DC600A.jpeg",
    "eveil-photo.jpg",
    "C22177C4-7309-4453-8819-B696A549C1F5.jpeg",
    "CBE3F788-436B-48C4-83AC-0D3EBA5C72EF.jpeg",
    "chevaux-hero.jpeg",
    "club-house.jpeg",
    "DD92B457-0BE5-4FF8-8F75-A3FAA2E6A827.jpeg",
    "DF78B272-7058-44B3-93C4-A210C106D212.jpeg",
    "E0194BD2-0257-4E6E-A88B-82B38E25E2CB.jpeg",
    "E0486C42-EAE0-4795-9095-59D7B6F62EE9.jpeg",
    "F1863E89-6A53-468F-884A-64E0D413A911.jpeg",
    "IMG_0058.jpeg",
    "lemans.jpeg",
    "paddocks.jpeg",
    "sorties-act.jpeg",
];

const ITEM_W = 340; // px per photo + gap
const GAP = 12;

export function PhotoGallery() {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [lightbox, setLightbox] = useState<number | null>(null);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const carouselTouchStartX = useRef<number | null>(null);
    const lightboxTouchStartX = useRef<number | null>(null);

    // Duplicate list for seamless loop
    const all = [...photos, ...photos];

    const next = () => setIndex((i) => (i + 1) % photos.length);
    const prev = () => setIndex((i) => (i - 1 + photos.length) % photos.length);

    useEffect(() => {
        if (paused) return;
        timerRef.current = setInterval(next, 4000);
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [paused, index]);

    // Close lightbox on Escape
    useEffect(() => {
        const fn = (e: KeyboardEvent) => {
            if (e.key === "Escape") setLightbox(null);
            if (e.key === "ArrowRight")
                setLightbox((i) =>
                    i !== null ? (i + 1) % photos.length : null,
                );
            if (e.key === "ArrowLeft")
                setLightbox((i) =>
                    i !== null ? (i - 1 + photos.length) % photos.length : null,
                );
        };
        window.addEventListener("keydown", fn);
        return () => window.removeEventListener("keydown", fn);
    }, []);

    // Correction : chaque slot fait exactement ITEM_W px (item 328 + gap 12)
    const translateX = -(index * ITEM_W);

    return (
        <>
            <section
                style={{
                    background: "#f4f6f8",
                    padding: "48px 0",
                    overflow: "hidden",
                }}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                {/* Track wrapper */}
                <div style={{ position: "relative" }}>
                    {/* Gradient fade edges */}
                    <div
                        style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: 80,
                            background:
                                "linear-gradient(to right, #f4f6f8, transparent)",
                            zIndex: 2,
                            pointerEvents: "none",
                        }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            right: 0,
                            top: 0,
                            bottom: 0,
                            width: 80,
                            background:
                                "linear-gradient(to left, #f4f6f8, transparent)",
                            zIndex: 2,
                            pointerEvents: "none",
                        }}
                    />

                    {/* Scrolling track */}
                    <div
                        onTouchStart={(e) => {
                            carouselTouchStartX.current = e.touches[0].clientX;
                            setPaused(true);
                        }}
                        onTouchEnd={(e) => {
                            if (carouselTouchStartX.current === null) return;
                            const delta =
                                e.changedTouches[0].clientX -
                                carouselTouchStartX.current;
                            if (delta < -SWIPE_THRESHOLD) next();
                            else if (delta > SWIPE_THRESHOLD) prev();
                            carouselTouchStartX.current = null;
                        }}
                        style={{
                            display: "flex",
                            gap: GAP,
                            transform: `translateX(calc(50vw - ${(ITEM_W - GAP) / 2}px + ${translateX}px))`,
                            transition:
                                "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                            willChange: "transform",
                        }}
                    >
                        {all.map((photo, i) => {
                            const realIndex = i % photos.length;
                            const isCenter =
                                i === index || i === index + photos.length;
                            return (
                                <div
                                    key={`${photo}-${i}`}
                                    onClick={() => setLightbox(realIndex)}
                                    style={{
                                        flexShrink: 0,
                                        width: ITEM_W - GAP,
                                        height: 240,
                                        borderRadius: 14,
                                        overflow: "hidden",
                                        cursor: "pointer",
                                        transform: isCenter
                                            ? "scale(1.04)"
                                            : "scale(0.96)",
                                        transition:
                                            "transform 0.4s ease, box-shadow 0.4s ease",
                                        boxShadow: isCenter
                                            ? "0 12px 32px rgba(0,0,0,0.18)"
                                            : "0 2px 8px rgba(0,0,0,0.08)",
                                        position: "relative",
                                    }}
                                >
                                    <Image
                                        src={assetPath(
                                            `/images/Images-illustrations/${photo}`,
                                        )}
                                        alt={`Photo ${realIndex + 1}`}
                                        fill
                                        sizes="340px"
                                        style={{ objectFit: "cover" }}
                                        loading="lazy"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Navigation */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 12,
                        marginTop: 20,
                    }}
                >
                    <button
                        onClick={() => {
                            prev();
                            setPaused(true);
                        }}
                        style={{
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            border: "1.5px solid rgba(94,180,174,0.4)",
                            background: "white",
                            color: "rgb(69,144,150)",
                            fontSize: 18,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            lineHeight: 1,
                        }}
                    >
                        ‹
                    </button>

                    {/* Dots */}
                    <div style={{ display: "flex", gap: 6 }}>
                        {photos.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    setIndex(i);
                                    setPaused(true);
                                }}
                                style={{
                                    width: i === index ? 20 : 6,
                                    height: 6,
                                    borderRadius: 3,
                                    border: "none",
                                    background:
                                        i === index
                                            ? "rgb(94,180,174)"
                                            : "rgba(94,180,174,0.3)",
                                    cursor: "pointer",
                                    padding: 0,
                                    transition:
                                        "width 0.3s ease, background 0.3s ease",
                                }}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => {
                            next();
                            setPaused(true);
                        }}
                        style={{
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            border: "1.5px solid rgba(94,180,174,0.4)",
                            background: "white",
                            color: "rgb(69,144,150)",
                            fontSize: 18,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            lineHeight: 1,
                        }}
                    >
                        ›
                    </button>
                </div>
            </section>

            {/* Lightbox */}
            {lightbox !== null && (
                <div
                    onClick={() => setLightbox(null)}
                    onTouchStart={(e) => {
                        lightboxTouchStartX.current = e.touches[0].clientX;
                    }}
                    onTouchEnd={(e) => {
                        if (lightboxTouchStartX.current === null) return;
                        const delta =
                            e.changedTouches[0].clientX -
                            lightboxTouchStartX.current;
                        if (delta < -SWIPE_THRESHOLD) {
                            e.stopPropagation();
                            setLightbox((i) =>
                                i !== null ? (i + 1) % photos.length : null,
                            );
                        } else if (delta > SWIPE_THRESHOLD) {
                            e.stopPropagation();
                            setLightbox((i) =>
                                i !== null
                                    ? (i - 1 + photos.length) % photos.length
                                    : null,
                            );
                        }
                        lightboxTouchStartX.current = null;
                    }}
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 100,
                        background: "rgba(0,0,0,0.9)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {/* Prev */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setLightbox(
                                (lightbox - 1 + photos.length) % photos.length,
                            );
                        }}
                        style={{
                            position: "absolute",
                            left: 20,
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: 44,
                            height: 44,
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.15)",
                            border: "none",
                            color: "white",
                            fontSize: 24,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        ‹
                    </button>

                    {/* Image */}
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            position: "relative",
                            width: "min(90vw, 1000px)",
                            height: "min(80vh, 700px)",
                        }}
                    >
                        <Image
                            src={assetPath(
                                `/images/Images-illustrations/${photos[lightbox]}`,
                            )}
                            alt={`Photo ${lightbox + 1}`}
                            fill
                            style={{ objectFit: "contain" }}
                            sizes="90vw"
                        />
                    </div>

                    {/* Next */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setLightbox((lightbox + 1) % photos.length);
                        }}
                        style={{
                            position: "absolute",
                            right: 20,
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: 44,
                            height: 44,
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.15)",
                            border: "none",
                            color: "white",
                            fontSize: 24,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        ›
                    </button>

                    {/* Close */}
                    <button
                        onClick={() => setLightbox(null)}
                        style={{
                            position: "absolute",
                            top: 20,
                            right: 20,
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.15)",
                            border: "none",
                            color: "white",
                            fontSize: 18,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        ✕
                    </button>

                    {/* Counter */}
                    <div
                        style={{
                            position: "absolute",
                            bottom: 20,
                            left: "50%",
                            transform: "translateX(-50%)",
                            color: "rgba(255,255,255,0.6)",
                            fontSize: 13,
                        }}
                    >
                        {lightbox + 1} / {photos.length}
                    </div>
                </div>
            )}
        </>
    );
}
