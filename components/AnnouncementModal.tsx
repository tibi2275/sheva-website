"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

// ─────────────────────────────────────────────────────────────────────────────
// CONTENU DE L'ANNONCE — modifiez uniquement cette section
//
//  • id     : changez cette valeur pour forcer le modal à réapparaître
//             (même pour les utilisateurs qui l'avaient fermé)
//  • emoji  : grand emoji affiché dans l'en-tête
//  • label  : petit badge au-dessus du titre (ex: "Nouveau", "Important"…)
//  • title  : titre principal (court et percutant)
//  • body   : texte explicatif
//  • ctas   : liste de boutons d'action (0, 1 ou 2 boutons)
//             - 1 bouton → pleine largeur
//             - 2 boutons → côte à côte (1er = primaire orange, 2e = secondaire)
//             - href peut être interne (/activites) ou externe (https://…)
// ─────────────────────────────────────────────────────────────────────────────

export type CtaItem = {
    label: string;
    href: string;
    external?: boolean;
};

export type Announcement = {
    id: string;
    emoji?: string;
    image?: string;
    label?: string;
    title: string;
    body: React.ReactNode;
    ctas?: CtaItem[];
};

// ★ MODIFIEZ ICI pour changer l'annonce
export const currentAnnouncement: Announcement = {
    id: "inscriptions-2026-2027-v13",
    emoji: "🌸",
    label: "Inscriptions",
    title: "Les inscriptions pour la prochaine saison arrivent à grand pas !",
    body: (
        <>
            <span>
                Les inscriptions arrivent très prochaienement ! Si vous
                souhaitez nous rejoindre, quelques dates à retenir :
            </span>
            <br />
            <span>
                🗓️ <strong>6 mai à 20h </strong> — Réunion d&apos;information
            </span>
            <br />
            <span>
                ✨ <strong>11 mai 2026 </strong> — Ouverture des inscriptions
                aux séances d&apos;essai
            </span>
            <br />

            <span>
                📌 <strong>26 mai </strong> — Ouverture aux nouveaux adhérents
            </span>
            <br />
            <br />
            <span>
                Si nous avons l'honneur de déjà vous compter parmi nos
                adhérents, à vos agendas :
            </span>

            <span>
                <br />
                🔑 <strong>A partir du 11 mai 2026 </strong> — début des
                inscriptions
            </span>
            <br />
            <br />
            <span style={{ fontSize: "0.9em", color: "#6b7280" }}>
                Retrouvez toutes les infos sur les pages{" "}
                <em>Infos Pratiques</em> et <em>Planning &amp; Tarifs</em>.
            </span>
        </>
    ),
    ctas: [
        {
            label: "Plus d'infos",
            href: "/infos#inscriptions",
        },
        {
            label: "Planning & tarifs",
            href: "/planning",
        },
    ],
};

// ─────────────────────────────────────────────────────────────────────────────

interface Props {
    announcement?: Announcement;
}

// Rendu d'un bouton CTA (interne ou externe, primaire ou secondaire)
function CtaButton({
    cta,
    primary,
    onClose,
}: {
    cta: CtaItem;
    primary: boolean;
    onClose: () => void;
}) {
    const isExternal = cta.external || cta.href.startsWith("http");

    const primaryStyle: React.CSSProperties = {
        display: "block",
        width: "100%",
        padding: "13px 16px",
        borderRadius: 12,
        background: "linear-gradient(135deg, #ff6b35, #f7931e)",
        color: "white",
        fontWeight: 700,
        fontSize: 14,
        textAlign: "center",
        textDecoration: "none",
        letterSpacing: "0.2px",
        boxShadow: "0 4px 16px rgba(255,107,53,0.35)",
        transition: "opacity 0.15s ease",
        cursor: "pointer",
        border: "none",
    };

    const secondaryStyle: React.CSSProperties = {
        display: "block",
        width: "100%",
        padding: "13px 16px",
        borderRadius: 12,
        background: "transparent",
        color: "rgb(45,120,128)",
        fontWeight: 700,
        fontSize: 14,
        textAlign: "center",
        textDecoration: "none",
        letterSpacing: "0.2px",
        border: "2px solid rgb(94,180,174)",
        transition: "background 0.15s ease, color 0.15s ease",
        cursor: "pointer",
    };

    const style = primary ? primaryStyle : secondaryStyle;

    const hoverIn = (e: React.MouseEvent<HTMLElement>) => {
        if (primary) {
            e.currentTarget.style.opacity = "0.88";
        } else {
            e.currentTarget.style.background = "rgba(94,180,174,0.1)";
        }
    };
    const hoverOut = (e: React.MouseEvent<HTMLElement>) => {
        if (primary) {
            e.currentTarget.style.opacity = "1";
        } else {
            e.currentTarget.style.background = "transparent";
        }
    };

    if (isExternal) {
        return (
            <a
                href={cta.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                style={style}
                onMouseEnter={hoverIn}
                onMouseLeave={hoverOut}
            >
                {cta.label} →
            </a>
        );
    }

    return (
        <Link
            href={cta.href}
            onClick={onClose}
            style={style}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
        >
            {cta.label} →
        </Link>
    );
}

// ─────────────────────────────────────────────────────────────────────────────

export function AnnouncementModal({
    announcement = currentAnnouncement,
}: Props) {
    const [visible, setVisible] = useState(false);
    const [closing, setClosing] = useState(false);

    useEffect(() => {
        const key = `sheva-annonce-${announcement.id}`;
        if (!localStorage.getItem(key)) {
            const t = setTimeout(() => setVisible(true), 700);
            return () => clearTimeout(t);
        }
    }, [announcement.id]);

    const close = (permanent = true) => {
        setClosing(true);
        if (permanent) {
            localStorage.setItem(`sheva-annonce-${announcement.id}`, "1");
        }
        setTimeout(() => {
            setVisible(false);
            setClosing(false);
        }, 300);
    };

    if (!visible) return null;

    const ctas = announcement.ctas ?? [];
    const hasTwoCtas = ctas.length >= 2;

    return (
        <>
            <style>{`
                @keyframes backdropIn {
                    from { opacity: 0; }
                    to   { opacity: 1; }
                }
                @keyframes cardIn {
                    from { opacity: 0; transform: scale(0.92) translateY(16px); }
                    to   { opacity: 1; transform: scale(1) translateY(0); }
                }
                @keyframes backdropOut {
                    from { opacity: 1; }
                    to   { opacity: 0; }
                }
                @keyframes cardOut {
                    from { opacity: 1; transform: scale(1) translateY(0); }
                    to   { opacity: 0; transform: scale(0.94) translateY(12px); }
                }
            `}</style>

            {/* Backdrop */}
            <div
                onClick={() => close()}
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 300,
                    background: "rgba(15,23,42,0.55)",
                    backdropFilter: "blur(6px)",
                    WebkitBackdropFilter: "blur(6px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px 16px",
                    animation: closing
                        ? "backdropOut 0.3s ease forwards"
                        : "backdropIn 0.35s ease forwards",
                }}
            >
                {/* Card */}
                <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        width: "100%",
                        maxWidth: 420,
                        borderRadius: 24,
                        overflow: "hidden",
                        background: "white",
                        boxShadow:
                            "0 32px 80px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.08)",
                        animation: closing
                            ? "cardOut 0.3s ease forwards"
                            : "cardIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                        position: "relative",
                    }}
                >
                    {/* ── En-tête coloré ────────────────────────── */}
                    <div
                        style={{
                            background:
                                "linear-gradient(135deg, rgb(94,180,174) 0%, rgb(69,144,150) 60%, rgb(45,120,128) 100%)",
                            padding: "36px 28px 32px",
                            textAlign: "center",
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >
                        {/* Cercles décoratifs */}
                        <div
                            style={{
                                position: "absolute",
                                top: -40,
                                right: -40,
                                width: 160,
                                height: 160,
                                borderRadius: "50%",
                                background: "rgba(255,255,255,0.07)",
                                pointerEvents: "none",
                            }}
                        />
                        <div
                            style={{
                                position: "absolute",
                                bottom: -30,
                                left: -30,
                                width: 120,
                                height: 120,
                                borderRadius: "50%",
                                background: "rgba(255,255,255,0.06)",
                                pointerEvents: "none",
                            }}
                        />

                        {/* Badge label */}
                        {announcement.label && (
                            <span
                                style={{
                                    display: "inline-block",
                                    padding: "4px 12px",
                                    borderRadius: 20,
                                    background: "rgba(255,255,255,0.2)",
                                    border: "1px solid rgba(255,255,255,0.3)",
                                    color: "white",
                                    fontSize: 11,
                                    fontWeight: 700,
                                    letterSpacing: "0.8px",
                                    textTransform: "uppercase",
                                    marginBottom: 14,
                                }}
                            >
                                {announcement.label}
                            </span>
                        )}

                        {/* Emoji */}
                        {announcement.emoji && (
                            <div
                                style={{
                                    fontSize: 52,
                                    lineHeight: 1,
                                    marginBottom: 4,
                                }}
                            >
                                {announcement.emoji}
                            </div>
                        )}
                    </div>

                    {/* ── Contenu ───────────────────────────────── */}
                    <div style={{ padding: "28px 28px 32px" }}>
                        <h2
                            style={{
                                fontSize: 20,
                                fontWeight: 800,
                                color: "rgb(15,23,42)",
                                margin: "0 0 12px",
                                lineHeight: 1.3,
                                letterSpacing: "-0.2px",
                            }}
                        >
                            {announcement.title}
                        </h2>
                        <p
                            style={{
                                fontSize: 14,
                                color: "#4b5563",
                                lineHeight: 1.75,
                                margin: "0 0 24px",
                            }}
                        >
                            {announcement.body}
                        </p>

                        {/* CTAs — 1 bouton : pleine largeur / 2 boutons : côte à côte */}
                        {ctas.length > 0 && (
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: hasTwoCtas
                                        ? "row"
                                        : "column",
                                    gap: 10,
                                }}
                            >
                                {ctas.slice(0, 2).map((cta, i) => (
                                    <CtaButton
                                        key={i}
                                        cta={cta}
                                        primary={i === 0}
                                        onClose={close}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Fermer définitivement */}
                        <button
                            onClick={() => close()}
                            style={{
                                display: "block",
                                width: "100%",
                                marginTop: 12,
                                padding: "10px",
                                borderRadius: 10,
                                border: "none",
                                background: "transparent",
                                color: "#9ca3af",
                                fontSize: 13,
                                cursor: "pointer",
                                transition: "color 0.15s ease",
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.color = "#374151")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.color = "#9ca3af")
                            }
                        >
                            Ne plus afficher
                        </button>
                    </div>

                    {/* Bouton ✕ coin */}
                    <button
                        onClick={() => close(false)}
                        aria-label="Fermer"
                        style={{
                            position: "absolute",
                            top: 14,
                            right: 14,
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            border: "none",
                            background: "rgba(255,255,255,0.2)",
                            color: "white",
                            fontSize: 15,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backdropFilter: "blur(4px)",
                            transition: "background 0.15s ease",
                        }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.background =
                                "rgba(255,255,255,0.32)")
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.background =
                                "rgba(255,255,255,0.2)")
                        }
                    >
                        ✕
                    </button>
                </div>
            </div>
        </>
    );
}
