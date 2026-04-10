"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { assetPath } from "@/lib/assetPath";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const navLinks = [
    {
        label: "Le centre",
        href: "/centre",
        emoji: "🏛️",
        sub: [
            { label: "Notre histoire", href: "/centre#histoire" },
            { label: "L'association", href: "/centre#association" },
            { label: "Les installations", href: "/centre#installations" },
            { label: "L'équipe", href: "/centre#equipe" },
        ],
    },
    {
        label: "Activités",
        href: "/activites",
        emoji: "🏇",
        sub: [
            { label: "Cours d'équitation", href: "/activites#cours" },
            { label: "Compétition", href: "/activites#competition" },
            { label: "Examens & galops", href: "/activites#galops" },
            { label: "Stages & sorties", href: "/activites#activites" },
            { label: "Équicoaching", href: "/equicoaching" },
        ],
    },
    {
        label: "Chevaux & poneys",
        href: "/chevaux",
        emoji: "🐴",
        sub: [
            { label: "Chevaux", href: "/chevaux#chevaux-detail" },
            { label: "Poneys", href: "/chevaux#poneys" },
            { label: "Bien-être", href: "/chevaux#bien-etre" },
            { label: "Après SHEVA", href: "/chevaux#apres-sheva" },
        ],
    },
    {
        label: "Planning & tarifs",
        href: "/planning",
        emoji: "📅",
        sub: [
            { label: "Planning des cours", href: "/planning#planning" },
            { label: "Nos tarifs", href: "/planning#tarifs" },
            { label: "Assurance & annulations", href: "/planning#annulation" },
        ],
    },
    {
        label: "Infos pratiques",
        href: "/infos",
        emoji: "ℹ️",
        sub: [
            { label: "Contact & accès", href: "/infos#contact" },
            { label: "Fonctionnement", href: "/infos#fonctionnement" },
            { label: "Matériel", href: "/infos#materiel" },
            { label: "Inscriptions", href: "/infos#inscriptions" },
            { label: "FAQ", href: "/infos#faq" },
        ],
    },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export function Nav({ transparent = false }: { transparent?: boolean }) {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [openSection, setOpenSection] = useState<string | null>(null);
    const [hovered, setHovered] = useState<string | null>(null);

    // Scroll → opaque header
    useEffect(() => {
        if (!transparent) return;
        const fn = () => setScrolled(window.scrollY > 80);
        window.addEventListener("scroll", fn, { passive: true });
        return () => window.removeEventListener("scroll", fn);
    }, [transparent]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    // Close on route change
    useEffect(() => {
        setMenuOpen(false);
        setOpenSection(null);
    }, [pathname]);

    const isOpaque = !transparent || scrolled || menuOpen;
    const close = () => {
        setMenuOpen(false);
        setOpenSection(null);
    };

    // ── TEAL BRAND ──
    const teal = "rgb(94,180,174)";
    const tealDark = "rgb(69,144,150)";
    const headerBg = isOpaque
        ? `linear-gradient(135deg, ${teal} 0%, ${tealDark} 100%)`
        : "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 100%)";

    return (
        <>
            {/* ════════════════════════════════════════
          HEADER — desktop + mobile top bar
      ════════════════════════════════════════ */}
            <header
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 50,
                    background: headerBg,
                    boxShadow:
                        isOpaque && !menuOpen
                            ? "0 2px 16px rgba(0,0,0,0.12)"
                            : "none",
                    transition: "background 0.3s, box-shadow 0.3s",
                }}
            >
                <div
                    style={{
                        maxWidth: 1280,
                        margin: "0 auto",
                        padding: "0 24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        height: 64,
                    }}
                >
                    {/* Logo */}
                    <Link
                        href="/"
                        onClick={close}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            textDecoration: "none",
                            flexShrink: 0,
                        }}
                    >
                        <div
                            style={{
                                width: 42,
                                height: 42,
                                borderRadius: 10,
                                overflow: "hidden",
                                border: "2px solid rgba(255,255,255,0.35)",
                                background: "white",
                                flexShrink: 0,
                            }}
                        >
                            <Image
                                src={assetPath("/images/logos/logo-sheva.jpg")}
                                alt="SHEVA"
                                width={42}
                                height={42}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                lineHeight: 1.2,
                            }}
                        >
                            <span
                                style={{
                                    color: "white",
                                    fontWeight: 700,
                                    fontSize: 15,
                                    letterSpacing: "0.04em",
                                }}
                            >
                                SHEVA
                            </span>
                            <span
                                style={{
                                    color: "rgba(255,255,255,0.65)",
                                    fontWeight: 500,
                                    fontSize: 9,
                                    letterSpacing: "0.14em",
                                    textTransform: "uppercase",
                                }}
                            >
                                Pôle Équestre · Paris - Val de Marne
                            </span>
                        </div>
                    </Link>

                    {/* ── DESKTOP NAV (≥1024px) ── */}
                    <nav
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                        }}
                        className="desktop-nav"
                        onMouseLeave={() => setHovered(null)}
                    >
                        {navLinks.map((link) => {
                            const active = pathname.startsWith(link.href);
                            const open = hovered === link.label;
                            return (
                                <div
                                    key={link.href}
                                    style={{ position: "relative" }}
                                    onMouseEnter={() => setHovered(link.label)}
                                >
                                    <Link
                                        href={link.href}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 4,
                                            padding: "8px 12px",
                                            borderRadius: 8,
                                            color: "rgba(255,255,255,0.92)",
                                            background:
                                                active || open
                                                    ? "rgba(255,255,255,0.18)"
                                                    : "transparent",
                                            fontWeight: 500,
                                            fontSize: 14,
                                            textDecoration: "none",
                                            transition: "background 0.15s",
                                        }}
                                    >
                                        {link.label}
                                        <svg
                                            width="12"
                                            height="12"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            style={{
                                                opacity: 0.6,
                                                transform: open
                                                    ? "rotate(180deg)"
                                                    : "rotate(0deg)",
                                                transition: "transform 0.15s",
                                            }}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </Link>

                                    {/* Dropdown */}
                                    {open && (
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: "100%",
                                                left: 0,
                                                zIndex: 60,
                                                paddingTop: 8,
                                                minWidth: 210,
                                            }}
                                        >
                                            <div
                                                style={{
                                                    background: "white",
                                                    borderRadius: 16,
                                                    boxShadow:
                                                        "0 8px 32px rgba(0,0,0,0.12)",
                                                    border: "0.5px solid rgba(0,0,0,0.06)",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        padding:
                                                            "10px 14px 8px",
                                                        borderBottom:
                                                            "1px solid #f5f5f5",
                                                        background: `rgba(94,180,174,0.05)`,
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            fontSize: 10,
                                                            fontWeight: 700,
                                                            letterSpacing:
                                                                "0.1em",
                                                            textTransform:
                                                                "uppercase",
                                                            color: teal,
                                                        }}
                                                    >
                                                        {link.label}
                                                    </span>
                                                </div>
                                                <div style={{ padding: 6 }}>
                                                    {link.sub.map((s) => (
                                                        <Link
                                                            key={s.href}
                                                            href={s.href}
                                                            onClick={() =>
                                                                setHovered(null)
                                                            }
                                                            style={{
                                                                display: "flex",
                                                                alignItems:
                                                                    "center",
                                                                gap: 8,
                                                                padding:
                                                                    "9px 10px",
                                                                borderRadius: 10,
                                                                color: tealDark,
                                                                fontSize: 13,
                                                                textDecoration:
                                                                    "none",
                                                                transition:
                                                                    "background 0.1s",
                                                            }}
                                                            onMouseEnter={(e) =>
                                                                (e.currentTarget.style.background =
                                                                    "rgba(94,180,174,0.08)")
                                                            }
                                                            onMouseLeave={(e) =>
                                                                (e.currentTarget.style.background =
                                                                    "transparent")
                                                            }
                                                        >
                                                            <span
                                                                style={{
                                                                    width: 5,
                                                                    height: 5,
                                                                    borderRadius:
                                                                        "50%",
                                                                    background:
                                                                        teal,
                                                                    flexShrink: 0,
                                                                    opacity: 0.6,
                                                                }}
                                                            />
                                                            {s.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </nav>

                    {/* Mon compte — desktop */}
                    <Link
                        href="https://cloud6.kavalog.fr/SHEVA/"
                        className="desktop-nav"
                        style={{
                            alignItems: "center",
                            padding: "8px 18px",
                            background: "white",
                            color: tealDark,
                            fontWeight: 700,
                            fontSize: 13,
                            borderRadius: 8,
                            textDecoration: "none",
                            flexShrink: 0,
                        }}
                    >
                        Mon compte
                    </Link>

                    {/* Placeholder right side on mobile (bottom nav handles menu) */}
                    <div className="mobile-only" style={{ width: 42 }} />
                </div>
            </header>

            {/* ════════════════════════════════════════
          MOBILE FULLSCREEN MENU
          Slides down from top, white bg
      ════════════════════════════════════════ */}
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 45,
                    background: "white",
                    transform: menuOpen ? "translateY(0)" : "translateY(-100%)",
                    transition: "transform 0.35s cubic-bezier(0.32,0.72,0,1)",
                    pointerEvents: menuOpen ? "auto" : "none",
                    display: "flex",
                    flexDirection: "column",
                    overflowY: "auto",
                }}
            >
                {/* Space for header */}
                <div style={{ height: 64, flexShrink: 0 }} />

                {/* Nav items */}
                <div style={{ flex: 1, padding: "8px 24px 24px" }}>
                    {navLinks.map((link, i) => {
                        const isOpen = openSection === link.label;
                        return (
                            <div
                                key={link.href}
                                style={{
                                    opacity: menuOpen ? 1 : 0,
                                    transform: menuOpen
                                        ? "translateY(0)"
                                        : "translateY(10px)",
                                    transition: `opacity 0.25s ease ${i * 0.04 + 0.08}s, transform 0.25s ease ${i * 0.04 + 0.08}s`,
                                }}
                            >
                                {/* Section toggle */}
                                <button
                                    onClick={() =>
                                        setOpenSection(
                                            isOpen ? null : link.label,
                                        )
                                    }
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        padding: "18px 0",
                                        borderBottom: `1px solid ${isOpen ? "rgba(94,180,174,0.25)" : "rgba(0,0,0,0.07)"}`,
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer",
                                        borderBottomStyle: "solid",
                                        borderBottomWidth: 1,
                                        borderBottomColor: isOpen
                                            ? "rgba(94,180,174,0.25)"
                                            : "rgba(0,0,0,0.07)",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 14,
                                        }}
                                    >
                                        <span style={{ fontSize: 22 }}>
                                            {link.emoji}
                                        </span>
                                        <span
                                            style={{
                                                fontSize: 17,
                                                fontWeight: 700,
                                                color: isOpen
                                                    ? teal
                                                    : "rgb(15,23,42)",
                                            }}
                                        >
                                            {link.label}
                                        </span>
                                    </div>
                                    <svg
                                        width="18"
                                        height="18"
                                        fill="none"
                                        stroke={teal}
                                        viewBox="0 0 24 24"
                                        style={{
                                            transform: isOpen
                                                ? "rotate(180deg)"
                                                : "rotate(0)",
                                            transition: "transform 0.2s",
                                            flexShrink: 0,
                                        }}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>

                                {/* Accordion content */}
                                <div
                                    style={{
                                        maxHeight: isOpen ? 400 : 0,
                                        overflow: "hidden",
                                        transition: "max-height 0.28s ease",
                                    }}
                                >
                                    <div
                                        style={{
                                            padding: "8px 0 4px 36px",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 2,
                                        }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={close}
                                            style={{
                                                padding: "8px 0",
                                                fontSize: 13,
                                                fontWeight: 700,
                                                color: teal,
                                                textDecoration: "none",
                                            }}
                                        >
                                            → Voir tout
                                        </Link>
                                        {link.sub.map((s) => (
                                            <Link
                                                key={s.href}
                                                href={s.href}
                                                onClick={close}
                                                style={{
                                                    padding: "9px 0",
                                                    fontSize: 14,
                                                    color: "rgb(71,85,105)",
                                                    textDecoration: "none",
                                                    borderBottom:
                                                        "1px solid rgba(0,0,0,0.04)",
                                                }}
                                            >
                                                {s.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* CTA + socials */}
                    <div
                        style={{
                            marginTop: 28,
                            opacity: menuOpen ? 1 : 0,
                            transition: "opacity 0.3s ease 0.28s",
                        }}
                    >
                        <Link
                            href="https://cloud6.kavalog.fr/SHEVA/"
                            onClick={close}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "16px",
                                borderRadius: 14,
                                textDecoration: "none",
                                background: `linear-gradient(135deg, ${teal}, ${tealDark})`,
                                color: "white",
                                fontWeight: 700,
                                fontSize: 15,
                            }}
                        >
                            Mon compte →
                        </Link>

                        {/* Social links */}
                        <div
                            style={{ display: "flex", gap: 10, marginTop: 14 }}
                        >
                            {[
                                {
                                    label: "Instagram",
                                    href: "https://www.instagram.com/centreequestresheva/",
                                    icon: (
                                        <svg
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                    ),
                                },
                                {
                                    label: "Facebook",
                                    href: "https://www.facebook.com/ClubSheva",
                                    icon: (
                                        <svg
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                    ),
                                },
                            ].map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        flex: 1,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 8,
                                        padding: "12px",
                                        borderRadius: 12,
                                        border: `1.5px solid rgba(94,180,174,0.3)`,
                                        color: tealDark,
                                        textDecoration: "none",
                                        fontSize: 13,
                                        fontWeight: 600,
                                    }}
                                >
                                    {s.icon} {s.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ════════════════════════════════════════
          BOTTOM NAV — mobile only
      ════════════════════════════════════════ */}
            <nav
                className="lg:hidden"
                style={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 50,
                    background: "white",
                    borderTop: "1px solid #e5e7eb",
                    paddingBottom: "env(safe-area-inset-bottom)",
                }}
            >
                <div style={{ display: "flex", height: 60 }}>
                    {[
                        {
                            label: "Accueil",
                            href: "/",
                            icon: (
                                <svg
                                    width="22"
                                    height="22"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.8}
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                    />
                                </svg>
                            ),
                        },
                        {
                            label: "Planning",
                            href: "/planning",
                            icon: (
                                <svg
                                    width="22"
                                    height="22"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.8}
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                            ),
                        },
                        {
                            label: "Mon compte",
                            href: "https://cloud6.kavalog.fr/SHEVA/",
                            icon: (
                                <svg
                                    width="22"
                                    height="22"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.8}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            ),
                        },
                    ].map((item) => {
                        const active = !menuOpen && pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={close}
                                style={{
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 3,
                                    color: active ? teal : "#9ca3af",
                                    textDecoration: "none",
                                }}
                            >
                                {item.icon}
                                <span style={{ fontSize: 10, fontWeight: 600 }}>
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}

                    {/* Menu / Fermer */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        style={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 3,
                            color: menuOpen ? teal : "#9ca3af",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        <svg
                            width="22"
                            height="22"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.8}
                                d={
                                    menuOpen
                                        ? "M6 18L18 6M6 6l12 12"
                                        : "M4 6h16M4 12h16M4 18h10"
                                }
                            />
                        </svg>
                        <span style={{ fontSize: 10, fontWeight: 600 }}>
                            {menuOpen ? "Fermer" : "Menu"}
                        </span>
                    </button>
                </div>
            </nav>
        </>
    );
}
