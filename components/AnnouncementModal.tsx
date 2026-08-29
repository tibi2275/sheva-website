"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { assetPath } from "@/lib/assetPath";

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
    /** Position CSS de l'image (object-position), ex: "center bottom" si le sujet est en bas de la photo */
    imagePosition?: string;
    label?: string;
    title: string;
    body: React.ReactNode;
    ctas?: CtaItem[];
};

// ─────────────────────────────────────────────────────────────────────────────
// Petit compteur animé : le taux de remplissage grimpe de 0 à 100 %
// (uniquement des <span> pour rester valide à l'intérieur d'un <p>)
// ─────────────────────────────────────────────────────────────────────────────
function FillGauge({
    target = 100,
    duration = 1900,
}: {
    target?: number;
    duration?: number;
}) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        let raf = 0;
        const start = performance.now() + 350; // petit délai après l'ouverture
        const tick = (now: number) => {
            const t = Math.min(Math.max(now - start, 0) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
            setValue(Math.round(eased * target));
            if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [target, duration]);

    const done = value >= target;

    return (
        <span
            style={{
                display: "block",
                margin: "0 0 22px",
                padding: "16px 18px 14px",
                borderRadius: 16,
                background: "linear-gradient(135deg, #f0fdfa 0%, #fff7ed 100%)",
                border: "1px solid #e2e8f0",
            }}
        >
            <span
                style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: 12,
                    marginBottom: 10,
                }}
            >
                <span
                    style={{
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.9px",
                        textTransform: "uppercase",
                        color: "rgb(45,120,128)",
                    }}
                >
                    Taux de remplissage
                </span>
                <span
                    style={{
                        fontSize: 28,
                        fontWeight: 800,
                        lineHeight: 1,
                        color: "#ff6b35",
                        fontVariantNumeric: "tabular-nums",
                        animation: done
                            ? "gaugePop 0.5s cubic-bezier(0.16,1,0.3,1)"
                            : undefined,
                    }}
                >
                    {value}
                    <span style={{ fontSize: 16, fontWeight: 700 }}>%</span>
                </span>
            </span>

            <span
                style={{
                    display: "block",
                    height: 10,
                    borderRadius: 999,
                    background: "rgba(15,23,42,0.07)",
                    overflow: "hidden",
                }}
            >
                <span
                    style={{
                        display: "block",
                        height: "100%",
                        width: `${value}%`,
                        borderRadius: 999,
                        background:
                            "linear-gradient(90deg, rgb(94,180,174), #f7931e 70%, #ff6b35)",
                        boxShadow: "0 0 14px rgba(255,107,53,0.45)",
                    }}
                />
            </span>

            <span
                style={{
                    display: "block",
                    marginTop: 10,
                    textAlign: "center",
                    fontSize: 12,
                    fontWeight: 800,
                    letterSpacing: "0.6px",
                    color: "#ff6b35",
                    opacity: done ? 1 : 0,
                    transform: done ? "translateY(0)" : "translateY(5px)",
                    transition: "opacity 0.45s ease, transform 0.45s ease",
                }}
            >
                🎉 COMPLET — merci à vous !
            </span>
        </span>
    );
}

// ★ MODIFIEZ ICI pour changer l'annonce
export const currentAnnouncement: Announcement = {
    id: "club_complet_2026", // changez cette valeur pour forcer l'annonce à réapparaître
    emoji: "🙏",
    image: "/images/Images-illustrations/newssept.jpg", // ← remplacez par la nouvelle photo
    imagePosition: "center 55%",
    label: "Merci à vous",
    title: "Le club fait carton plein ! 😍",
    body: (
        <>
            <FillGauge />
            <span>
                Grâce à votre confiance, toutes nos places sont prises pour
                cette saison. Un immense <strong>merci</strong> 😊
            </span>
            <br />
            <br />
            <span>
                Envie de nous rejoindre ? N&apos;hésitez pas à nous contacter
                pour vérifier qu&apos;une place ne s&apos;est pas libérée !
            </span>
            <br />
            <br />
            <span>
                🐴 D&apos;ici là, passez donc nous voir : visite des
                installations, rencontre avec nos chevaux et nos moniteurs,
                c&apos;est avec grand plaisir.
            </span>
            <br />
            <br />
            <span>
                📸 Suivez-nous sur Instagram pour vivre les activités du club au
                quotidien.
            </span>
            <br />
            <br />
            <span>
                ☎️ On reste joignables par téléphone au{" "}
                <a
                    href="tel:+33143768676"
                    style={{
                        color: "rgb(45,120,128)",
                        fontWeight: 700,
                        textDecoration: "none",
                    }}
                >
                    01 43 76 86 76
                </a>{" "}
                et par mail — et toujours ravis de vous accueillir !
            </span>
        </>
    ),
    ctas: [
        {
            label: "Suivre sur Instagram",
            href: "https://www.instagram.com/centreequestresheva/",
            external: true,
        },
        {
            label: "Nous écrire",
            href: "mailto:sheva@sheva.fr",
            external: true,
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
                @keyframes gaugePop {
                    0%   { transform: scale(1); }
                    45%  { transform: scale(1.18); }
                    100% { transform: scale(1); }
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
                        maxHeight: "90svh",
                        borderRadius: 24,
                        overflow: "hidden",
                        overflowY: "auto",
                        background: "white",
                        boxShadow:
                            "0 32px 80px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.08)",
                        animation: closing
                            ? "cardOut 0.3s ease forwards"
                            : "cardIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                        position: "relative",
                    }}
                >
                    {/* ── En-tête ──────────────────────────────── */}
                    <div
                        style={{
                            position: "relative",
                            overflow: "hidden",
                            ...(announcement.image
                                ? { height: 190 }
                                : {
                                      background:
                                          "linear-gradient(135deg, rgb(94,180,174) 0%, rgb(69,144,150) 60%, rgb(45,120,128) 100%)",
                                      padding: "24px 28px 20px",
                                      textAlign: "center" as const,
                                  }),
                        }}
                    >
                        {/* Photo d'illustration */}
                        {announcement.image && (
                            <>
                                <Image
                                    src={assetPath(announcement.image)}
                                    alt={announcement.title}
                                    fill
                                    style={{
                                        objectFit: "cover",
                                        objectPosition:
                                            announcement.imagePosition ??
                                            "center",
                                    }}
                                    sizes="420px"
                                    priority
                                />
                                <div
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        background:
                                            "linear-gradient(to bottom, rgba(45,120,128,0.15) 0%, rgba(20,50,55,0.78) 100%)",
                                    }}
                                />
                            </>
                        )}

                        {/* Cercles décoratifs (uniquement sans photo) */}
                        {!announcement.image && (
                            <>
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
                            </>
                        )}

                        <div
                            style={
                                announcement.image
                                    ? {
                                          position: "absolute",
                                          inset: 0,
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "center",
                                          justifyContent: "flex-end",
                                          padding: "0 28px 18px",
                                          textAlign: "center",
                                      }
                                    : undefined
                            }
                        >
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
                                        marginBottom: announcement.image
                                            ? 10
                                            : 14,
                                    }}
                                >
                                    {announcement.label}
                                </span>
                            )}

                            {/* Emoji */}
                            {announcement.emoji && (
                                <div
                                    style={{
                                        fontSize: announcement.image ? 34 : 40,
                                        lineHeight: 1,
                                        marginBottom: 4,
                                    }}
                                >
                                    {announcement.emoji}
                                </div>
                            )}
                        </div>
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
