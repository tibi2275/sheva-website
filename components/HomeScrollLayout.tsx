"use client";

// ─────────────────────────────────────────────────────────────────────────────
// HomeScrollLayout — Layout immersif de la page d'accueil
//
// Architecture :
//   • Vidéo hero fixée en fond, flouée
//   • Contenu hero (titre + CTA) fixé par-dessus
//   • Panneau blanc qui monte au scroll et recouvre le tout
//   • Section "Explorer" avec cartes qui tournent à l'entrée dans le viewport
//   • Pas de galerie (pour éviter la redondance avec les autres pages)
//
// Pour REVENIR À L'ANCIENNE VERSION : dans app/page.tsx, remplacer
//   <HomeScrollLayout /> par <LegacyHomePage />
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { NewsCarousel } from "./NewsCarousel";
import { InstagramCarousel } from "./InstagramCarousel";
import { articles } from "@/lib/newsData";
import { assetPath } from "@/lib/assetPath";

// ── Données ──────────────────────────────────────────────────────────────────

const stats = [
    { value: "670", label: "licenciés" },
    { value: "40+", label: "chevaux & poneys" },
    { value: "10 km", label: "de Paris" },
    { value: "Loi 1901", label: "association" },
];

const previewCards = [
    {
        href: "/centre",
        img: "/images/Images-illustrations/0d33c4f9-64e2-4e20-96c0-fcbc419a827d.jpg",
        tag: "Centre",
        title: "Le Centre Équestre",
        desc: "Notre histoire, nos installations modernes et notre équipe passionnée au cœur du Val-de-Marne.",
        cta: "En savoir plus",
    },
    {
        href: "/activites",
        img: "/images/Images-illustrations/activites-illustration.avif",
        tag: "Activités",
        title: "Nos Activités",
        desc: "Cours pour tous niveaux, compétitions, examens de galops, stages. De l'initiation au perfectionnement.",
        cta: "Découvrir",
    },
    {
        href: "/chevaux",
        img: "/images/Images-illustrations/chevaux-illustration.avif",
        tag: "Chevaux",
        title: "Chevaux & Poneys",
        desc: "Rencontrez nos chevaux et poneys sélectionnés pour leur tempérament et leurs qualités pédagogiques.",
        cta: "Les rencontrer",
    },
    {
        href: "/planning",
        img: "/images/Images-illustrations/planning-illustration.JPG",
        tag: "Planning",
        title: "Planning & Tarifs",
        desc: "Consultez le planning des reprises et nos différents tarifs.",
        cta: "Consulter",
    },
    {
        href: "/infos",
        img: "/images/Images-illustrations/chevaux-illustration22.avif",
        tag: "Infos",
        title: "Infos Pratiques",
        desc: "Accès, horaires, contact, FAQ. Toutes les informations utiles pour votre première visite.",
        cta: "S'informer",
    },
    {
        href: "https://cloud6.kavalog.fr/SHEVA/",
        img: "/images/Images-illustrations/compte-illustration.avif",
        tag: "Espace membre",
        title: "Espace Membre",
        desc: "Inscrivez-vous, réservez vos cours, gérez vos absences depuis votre compte en ligne.",
        cta: "Se connecter",
        external: true,
    },
];

const quickLinks = [
    { label: "S'inscrire", href: "/planning#inscription", icon: "✏️" },
    { label: "Planning", href: "/planning", icon: "📅" },
    { label: "Tarifs", href: "/planning#tarifs", icon: "💶" },
    { label: "Contact", href: "/infos#contact", icon: "📞" },
    { label: "Galops", href: "/activites#galops", icon: "🏆" },
    {
        label: "Mon compte",
        href: "https://cloud6.kavalog.fr/SHEVA/",
        icon: "👤",
    },
];

const qualityLabels = [
    { src: "/images/logos/logo-efe.jpg", alt: "École Française d'Équitation" },
    { src: "/images/logos/logo-bea.png", alt: "Bien-être animal" },
    {
        src: "/images/logos/FFE-Poney-club-de-France.jpg",
        alt: "Poney Club de France",
    },
    {
        src: "/images/logos/FFE-Logo-Cheval-Club-de-France.jpg",
        alt: "Cheval Club de France",
    },
];

const ffeLogos = [
    {
        src: "/images/logos/FFE_Logo.png",
        alt: "FFE - Fédération Française d'Équitation",
    },
    {
        src: "/images/logos/GHN_logo.png",
        alt: "GHN - Groupement Hippique National",
    },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function SectionHeader({ label, title }: { label: string; title: string }) {
    return (
        <div style={{ marginBottom: 40 }}>
            <p
                style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgb(94,180,174)",
                    marginBottom: 8,
                    textAlign: "center",
                }}
            >
                {label}
            </p>
            <h2
                style={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: "rgb(15,23,42)",
                    textAlign: "center",
                }}
            >
                {title}
            </h2>
        </div>
    );
}

// ── Carte "Explorer" avec animation d'entrée ──────────────────────────────────

function ExploreCard({
    card,
    delay,
}: {
    card: (typeof previewCards)[0];
    delay: number;
}) {
    const ref = useRef<HTMLAnchorElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    obs.disconnect();
                }
            },
            { threshold: 0.15 },
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <Link
            ref={ref}
            href={card.href}
            target={card.external ? "_blank" : undefined}
            rel={card.external ? "noopener noreferrer" : undefined}
            style={{
                display: "block",
                background: "white",
                borderRadius: 16,
                overflow: "hidden",
                border: "1px solid #f0f0f0",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                textDecoration: "none",
                opacity: visible ? 1 : 0,
                transform: visible
                    ? "rotate(0deg) translateY(0)"
                    : `rotate(${delay % 2 === 0 ? 3 : -3}deg) translateY(28px)`,
                transition: `opacity 0.55s ease ${delay * 90}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay * 90}ms`,
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)";
                e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)";
                e.currentTarget.style.transform = "";
            }}
        >
            <div
                style={{
                    position: "relative",
                    overflow: "hidden",
                    height: 200,
                }}
            >
                <Image
                    src={assetPath(card.img)}
                    alt={card.title}
                    fill
                    style={{ objectFit: "cover", transition: "transform 0.6s" }}
                />
                <span
                    style={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        padding: "4px 10px",
                        background: "rgba(255,255,255,0.92)",
                        color: "rgb(69,144,150)",
                        fontSize: 11,
                        fontWeight: 700,
                        borderRadius: 8,
                    }}
                >
                    {card.tag}
                </span>
            </div>
            <div style={{ padding: "16px 20px 20px" }}>
                <h3
                    style={{
                        fontWeight: 700,
                        color: "rgb(30,41,59)",
                        marginBottom: 6,
                        fontSize: 15,
                    }}
                >
                    {card.title}
                </h3>
                <p
                    style={{
                        color: "#6b7280",
                        fontSize: 13,
                        lineHeight: 1.6,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                    }}
                >
                    {card.desc}
                </p>
                <span
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        marginTop: 14,
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#ff6b35",
                    }}
                >
                    {card.cta} →
                </span>
            </div>
        </Link>
    );
}

// ── Layout principal ──────────────────────────────────────────────────────────

export function HomeScrollLayout() {
    return (
        <>
            <style>{`
                .home-content-panel {
                    position: relative;
                    z-index: 10;
                    background: white;
                    border-radius: 24px 24px 0 0;
                    margin-top: calc(100svh - 48px);
                    box-shadow: 0 -8px 40px rgba(0,0,0,0.18);
                }
                @media (max-width: 639px) {
                    .home-content-panel { margin-top: calc(100svh - 32px); border-radius: 16px 16px 0 0; }
                }
                .explore-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 16px;
                }
                @media (min-width: 640px) { .explore-grid { grid-template-columns: 1fr 1fr; } }
                @media (min-width: 1024px) { .explore-grid { grid-template-columns: 1fr 1fr 1fr; } }
            `}</style>

            {/* ── Vidéo fixée en fond ─────────────────────────────────────── */}
            <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={assetPath(
                        "/images/Images-illustrations/activ-hero.jpeg",
                    )}
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                >
                    <source
                        src={assetPath(
                            "/images/Images-illustrations/herobanner.mp4",
                        )}
                        type="video/mp4"
                    />
                </video>
                {/* Flou + assombrissement */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backdropFilter: "blur(3px)",
                        WebkitBackdropFilter: "blur(3px)",
                        background: "rgba(0,0,0,0.38)",
                    }}
                />
            </div>

            {/* ── Contenu hero fixé par-dessus la vidéo ──────────────────── */}
            <div
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 5,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    pointerEvents: "none",
                }}
            >
                <div
                    style={{
                        maxWidth: 1280,
                        margin: "0 auto",
                        padding: "0 24px 80px",
                        width: "100%",
                        pointerEvents: "auto",
                    }}
                >
                    <div className="max-w-2xl" style={{ maxWidth: 560 }}>
                        <div
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                padding: "6px 14px",
                                background: "rgba(255,255,255,0.14)",
                                backdropFilter: "blur(8px)",
                                WebkitBackdropFilter: "blur(8px)",
                                border: "1px solid rgba(255,255,255,0.28)",
                                borderRadius: 999,
                                marginBottom: 20,
                            }}
                        >
                            <span
                                style={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: "50%",
                                    background: "rgb(94,180,174)",
                                    display: "inline-block",
                                }}
                            />
                            <span
                                style={{
                                    color: "white",
                                    fontSize: 12,
                                    fontWeight: 600,
                                }}
                            >
                                Créteil — 10 km de Paris
                            </span>
                        </div>
                        <h1
                            style={{
                                fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                                fontWeight: 800,
                                color: "white",
                                lineHeight: 1.15,
                                marginBottom: 16,
                                letterSpacing: "-0.5px",
                            }}
                        >
                            Bienvenue
                            <br />
                            <span style={{ color: "rgb(94,180,174)" }}>
                                à la SHEVA
                            </span>
                        </h1>
                        <p
                            style={{
                                fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
                                color: "rgba(255,255,255,0.82)",
                                lineHeight: 1.65,
                                marginBottom: 32,
                                maxWidth: 440,
                            }}
                        >
                            Pôle équestre Paris Val-de-Marne. Association loi
                            1901 avec 670 licenciés, dans un cadre exceptionnel
                            au parc de Choisy.
                        </p>
                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 12,
                            }}
                        >
                            <Link
                                href="/centre"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 8,
                                    padding: "13px 24px",
                                    background:
                                        "linear-gradient(45deg, #ff6b35, #f7931e)",
                                    color: "white",
                                    fontWeight: 700,
                                    fontSize: 14,
                                    borderRadius: 12,
                                    textDecoration: "none",
                                    boxShadow:
                                        "0 4px 16px rgba(255,107,53,0.4)",
                                }}
                            >
                                Découvrir le centre →
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Flèche scroll */}
                <div
                    style={{
                        position: "absolute",
                        bottom: 28,
                        left: "50%",
                        transform: "translateX(-50%)",
                        opacity: 0.6,
                        animation: "bounce 2s infinite",
                    }}
                >
                    <svg
                        width="20"
                        height="20"
                        fill="none"
                        stroke="white"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </div>
            </div>

            {/* ── Panneau blanc qui monte au scroll ──────────────────────── */}
            <div className="home-content-panel">
                {/* Stats */}
                <section style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(2, 1fr)",
                                borderBottom: "none",
                            }}
                            className="stats-grid-home"
                        >
                            {stats.map((s) => (
                                <div
                                    key={s.label}
                                    style={{
                                        padding: "20px 24px",
                                        textAlign: "center",
                                        borderRight: "1px solid #f0f0f0",
                                        borderBottom: "1px solid #f0f0f0",
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: "1.75rem",
                                            fontWeight: 800,
                                            color: "rgb(94,180,174)",
                                        }}
                                    >
                                        {s.value}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: 12,
                                            color: "#6b7280",
                                            marginTop: 2,
                                        }}
                                    >
                                        {s.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Labels qualité */}
                <section
                    style={{
                        background: "#f9fafb",
                        borderBottom: "1px solid #ebebeb",
                    }}
                >
                    {[
                        {
                            links: [
                                {
                                    href: "https://www.ffe.com/pratiquer/labels",
                                    label: "🏆 Labels Qualité FFE",
                                    style: {
                                        background: "rgba(94,180,174,0.1)",
                                        color: "rgb(69,144,150)",
                                        border: "1px solid rgba(94,180,174,0.3)",
                                    },
                                },
                            ],
                            logos: qualityLabels,
                        },
                        {
                            links: [
                                {
                                    href: "https://www.telemat.org/FFE/sif/-ident",
                                    label: "🐴 Mon compte FFE",
                                    style: {
                                        background: "rgba(255,107,53,0.08)",
                                        color: "#cc4400",
                                        border: "1px solid rgba(255,107,53,0.25)",
                                    },
                                },
                            ],
                            logos: ffeLogos,
                        },
                    ].map((row, ri) => (
                        <div
                            key={ri}
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 20,
                                padding: "14px 24px",
                                borderBottom:
                                    ri === 0 ? "1px solid #f0f0f0" : "none",
                                maxWidth: 1280,
                                margin: "0 auto",
                            }}
                        >
                            {row.links.map((l) => (
                                <a
                                    key={l.label}
                                    href={l.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 6,
                                        padding: "7px 14px",
                                        borderRadius: 8,
                                        fontSize: 13,
                                        fontWeight: 700,
                                        textDecoration: "none",
                                        whiteSpace: "nowrap",
                                        ...l.style,
                                    }}
                                >
                                    {l.label}
                                </a>
                            ))}
                            {row.logos.map((logo) => (
                                <Image
                                    key={logo.alt}
                                    src={assetPath(logo.src)}
                                    alt={logo.alt}
                                    width={72}
                                    height={48}
                                    style={{
                                        objectFit: "contain",
                                        height: 48,
                                        width: "auto",
                                        opacity: 0.85,
                                    }}
                                />
                            ))}
                        </div>
                    ))}
                </section>

                {/* ── Actualités ──────────────────────────────────────── */}
                <section
                    style={{ background: "#fafbfb", padding: "64px 0 52px" }}
                >
                    <div
                        style={{
                            maxWidth: 1280,
                            margin: "0 auto",
                            padding: "0 24px",
                        }}
                    >
                        <SectionHeader
                            label="Le club en direct"
                            title="Nos actualités"
                        />
                    </div>
                    <NewsCarousel articles={articles} />
                </section>

                {/* ── Instagram ───────────────────────────────────────── */}
                <section
                    style={{ background: "white", padding: "52px 0 56px" }}
                >
                    <div
                        style={{
                            maxWidth: 1280,
                            margin: "0 auto",
                            padding: "0 24px",
                        }}
                    >
                        <SectionHeader
                            label="Instagram"
                            title="@centreequestresheva"
                        />
                    </div>
                    <InstagramCarousel />
                    <div
                        style={{
                            marginTop: 28,
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <a
                            href="https://www.instagram.com/centreequestresheva/"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                padding: "12px 24px",
                                borderRadius: 12,
                                background:
                                    "linear-gradient(45deg, rgb(94,180,174), rgb(69,144,150))",
                                color: "white",
                                fontWeight: 700,
                                fontSize: 14,
                                textDecoration: "none",
                            }}
                        >
                            📸 Voir notre profil Instagram
                        </a>
                    </div>
                </section>

                {/* Explorer — cartes avec rotation d'entrée */}
                <section style={{ background: "white", padding: "64px 0" }}>
                    <div
                        style={{
                            maxWidth: 1280,
                            margin: "0 auto",
                            padding: "0 24px",
                        }}
                    >
                        <SectionHeader
                            label="Découvrez la SHEVA"
                            title="Explorer le centre"
                        />
                        <div className="explore-grid">
                            {previewCards.map((card, i) => (
                                <ExploreCard
                                    key={card.href}
                                    card={card}
                                    delay={i}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Accès rapide */}
                <section
                    style={{
                        background: "#fafbfb",
                        padding: "40px 0",
                        borderTop: "1px solid #f0f0f0",
                    }}
                >
                    <div
                        style={{
                            maxWidth: 1280,
                            margin: "0 auto",
                            padding: "0 24px",
                        }}
                    >
                        <p
                            style={{
                                fontSize: 11,
                                fontWeight: 700,
                                letterSpacing: "0.12em",
                                textTransform: "uppercase",
                                color: "#9ca3af",
                                marginBottom: 20,
                                textAlign: "center",
                            }}
                        >
                            Accès rapide
                        </p>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(3, 1fr)",
                                gap: 12,
                            }}
                            className="quick-grid"
                        >
                            {quickLinks.map((l) => (
                                <Link
                                    key={l.href}
                                    href={l.href}
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: 8,
                                        padding: "16px 8px",
                                        background: "white",
                                        borderRadius: 12,
                                        border: "1px solid #f0f0f0",
                                        textDecoration: "none",
                                        transition: "all 0.2s",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor =
                                            "rgb(94,180,174)";
                                        e.currentTarget.style.boxShadow =
                                            "0 4px 12px rgba(0,0,0,0.07)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor =
                                            "#f0f0f0";
                                        e.currentTarget.style.boxShadow =
                                            "none";
                                    }}
                                >
                                    <span style={{ fontSize: 20 }}>
                                        {l.icon}
                                    </span>
                                    <span
                                        style={{
                                            color: "#374151",
                                            fontSize: 12,
                                            fontWeight: 600,
                                            textAlign: "center",
                                            lineHeight: 1.3,
                                        }}
                                    >
                                        {l.label}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            <style>{`
                @keyframes bounce {
                    0%, 100% { transform: translateX(-50%) translateY(0); }
                    50% { transform: translateX(-50%) translateY(6px); }
                }
                @media (min-width: 640px) {
                    .stats-grid-home { grid-template-columns: repeat(4, 1fr) !important; }
                    .quick-grid { grid-template-columns: repeat(6, 1fr) !important; }
                }
            `}</style>
        </>
    );
}
