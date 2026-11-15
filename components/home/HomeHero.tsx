"use client";

import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { assetPath } from "@/lib/assetPath";
import { Simulateur } from "@/components/Simulateur";
import { TrouverReprise } from "@/components/TrouverReprise";
import { ArrowRight, PauseIcon, PlayIcon } from "./Icons";

/**
 * Hero vidéo de l'accueil.
 * Les drawers (simulateur, trouver ma reprise) sont montés via un portal sur
 * <body> : le hero crée un contexte d'empilement, sans portal ils passeraient
 * sous le menu.
 */
export function HomeHero() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [paused, setPaused] = useState(false);
    const [simOpen, setSimOpen] = useState(false);
    const [finderOpen, setFinderOpen] = useState(false);

    const togglePlay = () => {
        const v = videoRef.current;
        if (!v) return;
        if (v.paused) {
            v.play();
            setPaused(false);
        } else {
            v.pause();
            setPaused(true);
        }
    };

    return (
        <section className="hm-hero">
            <video
                ref={videoRef}
                className="hm-hero-video"
                autoPlay
                muted
                loop
                playsInline
                poster={assetPath("/images/Images-illustrations/activ-hero.jpeg")}
            >
                <source
                    src={assetPath("/images/Images-illustrations/herobanner2.mp4")}
                    type="video/mp4"
                />
            </video>
            <div className="hm-hero-shade" />

            <div className="hm-hero-content">
                <div className="hm-wrap">
                    <p className="hm-chip hm-rise hm-d1">
                        <span className="hm-chip-dot" />
                        Créteil, à 10 km de Paris
                    </p>
                    <h1 className="hm-hero-title hm-display">
                        <span className="hm-rise hm-d2">Bienvenue</span>
                        <span className="hm-rise hm-d3">à la SHEVA</span>
                    </h1>
                    <p className="hm-hero-sub hm-rise hm-d4">
                        Pôle équestre Paris Val-de-Marne. Association loi 1901
                        avec 670 licenciés, dans un cadre exceptionnel au parc
                        de Choisy.
                    </p>
                    <div className="hm-hero-ctas hm-rise hm-d4">
                        <button
                            type="button"
                            className="hm-btn hm-btn-primary"
                            onClick={() => setFinderOpen(true)}
                        >
                            Trouver ma reprise
                            <span className="hm-arrow">
                                <ArrowRight />
                            </span>
                        </button>
                        <button
                            type="button"
                            className="hm-btn hm-btn-glass"
                            onClick={() => setSimOpen(true)}
                        >
                            Simuler mon inscription
                        </button>
                    </div>
                </div>
            </div>

            <button
                type="button"
                className="hm-pause"
                onClick={togglePlay}
                aria-label={paused ? "Relancer la vidéo" : "Mettre la vidéo en pause"}
            >
                {paused ? <PlayIcon /> : <PauseIcon />}
            </button>

            {simOpen &&
                createPortal(
                    <Simulateur isOpen onClose={() => setSimOpen(false)} />,
                    document.body,
                )}
            {finderOpen &&
                createPortal(
                    <TrouverReprise isOpen onClose={() => setFinderOpen(false)} />,
                    document.body,
                )}
        </section>
    );
}
