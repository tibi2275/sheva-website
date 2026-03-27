// app/page.tsx — SHEVA Homepage
// Charte : fond blanc/clair, teal rgb(94,180,174), orange #ff6b35, Poppins

import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { InstagramEmbed } from "@/components/InstagramEmbed";
import { PhotoGallery } from "@/components/PhotoGallery";

// ─── DATA ────────────────────────────────────────────────────────────────────

const navLinks = [
    {
        label: "Le centre",
        href: "/centre",
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
        sub: [
            { label: "Planning des cours", href: "/planning#planning" },
            { label: "Nos tarifs", href: "/planning#tarifs" },
            { label: "Assurance & annulations", href: "/planning#annulation" },
        ],
    },
    {
        label: "Infos pratiques",
        href: "/infos",
        sub: [
            { label: "Contact & accès", href: "/infos#contact" },
            { label: "Fonctionnement", href: "/infos#fonctionnement" },
            { label: "Matériel", href: "/infos#materiel" },
            { label: "Inscriptions", href: "/infos#inscriptions" },
            { label: "FAQ", href: "/infos#faq" },
        ],
    },
];

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
        desc: "Consultez le planning des reprises et nos différents tarifs pour trouver la formule qui vous convient.",
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

const teal = "rgb(94,180,174)";
const tealDark = "rgb(69,144,150)";
const orange = "#ff6b35";

// --- Function headers -----------------

function SectionHeader({ label, title }: { label: string; title: string }) {
    return (
        <div style={{ marginBottom: 40 }}>
            <p
                style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: teal,
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

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
    return (
        <section className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden">
            <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster="/images/Images-illustrations/activ-hero.jpeg"
            >
                <source
                    src="/images/Images-illustrations/herobanner.mp4"
                    type="video/mp4"
                />
            </video>
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.1) 100%)",
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24 pt-24 w-full">
                <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 backdrop-blur-sm border border-white/30 rounded-full mb-5">
                        <span
                            className="w-1.5 h-1.5 rounded-full animate-pulse"
                            style={{ background: "rgb(94,180,174)" }}
                        />
                        <span className="text-white text-xs font-semibold">
                            Créteil — 10 km de Paris
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                        Bienvenue
                        <br />
                        <span style={{ color: "rgb(94,180,174)" }}>
                            à la SHEVA
                        </span>
                    </h1>
                    <p
                        className="text-base sm:text-lg leading-relaxed mb-8 max-w-lg"
                        style={{ color: "rgba(255,255,255,0.85)" }}
                    >
                        Pôle équestre Paris Val-de-Marne. Association loi 1901
                        avec 670 licenciés, dans un cadre exceptionnel au parc
                        de Choisy.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                            href="/centre"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-white font-bold rounded-xl transition-all text-sm shadow-lg hover:-translate-y-0.5"
                            style={{
                                background:
                                    "linear-gradient(45deg, #ff6b35, #f7931e)",
                            }}
                        >
                            Découvrir le centre
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 opacity-60">
                <svg
                    className="w-5 h-5 text-white animate-bounce"
                    fill="none"
                    stroke="currentColor"
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
        </section>
    );
}

// ─── STATS BAR ────────────────────────────────────────────────────────────────

function StatsBar() {
    return (
        <section className="bg-white border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gray-100">
                    {stats.map((s) => (
                        <div key={s.label} className="px-6 py-5 text-center">
                            <div
                                className="text-2xl sm:text-3xl font-bold tabular-nums"
                                style={{ color: "rgb(94,180,174)" }}
                            >
                                {s.value}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-500 mt-1">
                                {s.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── QUALITY LABELS ──────────────────────────────────────────────────────────

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

function QualityLabels() {
    const rowStyle: React.CSSProperties = {
        display: "flex",
        flexWrap: "wrap" as const,
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        padding: "16px 24px",
        borderBottom: "1px solid #f0f0f0",
        maxWidth: 1280,
        margin: "0 auto",
    };
    const badgeStyle: React.CSSProperties = {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "7px 14px",
        borderRadius: 8,
        fontSize: 13,
        fontWeight: 700,
        textDecoration: "none",
        whiteSpace: "nowrap" as const,
    };
    return (
        <section
            style={{ background: "#f9fafb", borderBottom: "1px solid #ebebeb" }}
        >
            {/* Ligne 1 — Labels Qualité FFE */}
            <div style={rowStyle}>
                <a
                    href="https://www.ffe.com/pratiquer/labels"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        ...badgeStyle,
                        background: "rgba(94,180,174,0.1)",
                        color: "rgb(69,144,150)",
                        border: "1px solid rgba(94,180,174,0.3)",
                    }}
                >
                    🏆 Labels Qualité FFE
                </a>
                {qualityLabels.map((l) => (
                    <Image
                        key={l.alt}
                        src={l.src}
                        alt={l.alt}
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
            {/* Ligne 2 — Mon compte FFE */}
            <div style={rowStyle}>
                <a
                    href="https://www.telemat.org/FFE/sif/-ident"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        ...badgeStyle,
                        background: "rgba(255,107,53,0.08)",
                        color: "#cc4400",
                        border: "1px solid rgba(255,107,53,0.25)",
                    }}
                >
                    🐴 Mon compte FFE
                </a>
                {ffeLogos.map((l) => (
                    <Image
                        key={l.alt}
                        src={l.src}
                        alt={l.alt}
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
        </section>
    );
}

// ─── NEWS DATA ────────────────────────────────────────────────────────────────
// Pour ajouter une news : ajouter un objet dans ce tableau
// Pour supprimer : retirer l'objet correspondant
// Pour réordonner : changer l'ordre des objets
//
// Deux types disponibles :
//   type: "article" → carte avec image, date, titre, texte, lien
//   type: "instagram" → embed Instagram (juste l'URL du post)

type NewsItem =
    | {
          type: "article";
          date: string;
          title: string;
          excerpt: string;
          img: string;
          href: string;
      }
    | {
          type: "instagram";
          url: string;
      };

const newsItems: NewsItem[] = [
    // ── ARTICLES ──────────────────────────────────────────────────────
    {
        type: "article",
        date: "Dimanche 8 février 2026",
        title: "Vacances d'Hiver : Inscriptions aux reprises ouvertes",
        excerpt:
            "Les vacances d'hiver approchent ! Comme chaque année, un planning dédié est mis en place. Les inscriptions se font depuis votre espace en ligne.",
        img: "/images/Images-illustrations/shevaneige.jpg",
        href: "/activites#planning",
    },
    // ── INSTAGRAMS ────────────────────────────────────────────────────
    // Pour ajouter un post : copier l'URL depuis Instagram (Partager → Copier le lien)
    { type: "instagram", url: "https://www.instagram.com/p/DU7mRjZjBAh/" },
    { type: "instagram", url: "https://www.instagram.com/p/DUJIsvKDLKy/" },
    { type: "instagram", url: "https://www.instagram.com/p/DUIUHcwjPtC/" },
    { type: "instagram", url: "https://www.instagram.com/p/DUGdlUQDM4U/" },
];

// ─── NEWS SECTION ─────────────────────────────────────────────────────────────

function NewsSection() {
    return (
        <section style={{ background: "#fafbfb", padding: "64px 0" }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <SectionHeader
                    label="Découvrir"
                    title="Actualités et Évenements"
                />

                {/* Grid */}
                <div className="news-grid">
                    {newsItems.map((item, i) => {
                        if (item.type === "instagram") {
                            return (
                                <article
                                    key={item.url}
                                    style={{
                                        background: "white",
                                        borderRadius: 16,
                                        overflow: "hidden",
                                        border: "1px solid #f0f0f0",
                                        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                                    }}
                                >
                                    <InstagramEmbed url={item.url} />
                                </article>
                            );
                        }
                        return (
                            <article
                                key={i}
                                style={{
                                    background: "white",
                                    borderRadius: 16,
                                    overflow: "hidden",
                                    border: "1px solid #f0f0f0",
                                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                                }}
                                className="news-article-card"
                            >
                                <div
                                    style={{
                                        position: "relative",
                                        height: 200,
                                        overflow: "hidden",
                                    }}
                                >
                                    <Image
                                        src={item.img}
                                        alt={item.title}
                                        fill
                                        style={{
                                            objectFit: "cover",
                                            transition: "transform 0.6s",
                                        }}
                                        className="news-article-img"
                                    />
                                    <span
                                        style={{
                                            position: "absolute",
                                            top: 12,
                                            left: 12,
                                            padding: "4px 10px",
                                            background:
                                                "linear-gradient(45deg, #ff6b35, #f7931e)",
                                            color: "white",
                                            fontSize: 11,
                                            fontWeight: 700,
                                            borderRadius: 8,
                                        }}
                                    >
                                        Actualité
                                    </span>
                                </div>
                                <div style={{ padding: "16px 20px 20px" }}>
                                    <time
                                        style={{
                                            fontSize: 11,
                                            color: "#9ca3af",
                                        }}
                                    >
                                        {item.date}
                                    </time>
                                    <h3
                                        style={{
                                            fontSize: 15,
                                            fontWeight: 700,
                                            color: "rgb(30,41,59)",
                                            margin: "6px 0 8px",
                                            lineHeight: 1.4,
                                        }}
                                    >
                                        {item.title}
                                    </h3>
                                    <p
                                        style={{
                                            fontSize: 13,
                                            color: "#6b7280",
                                            lineHeight: 1.6,
                                            display: "-webkit-box",
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                        }}
                                    >
                                        {item.excerpt}
                                    </p>
                                    <Link
                                        href={item.href}
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: 4,
                                            marginTop: 14,
                                            fontSize: 13,
                                            fontWeight: 700,
                                            color: "#ff6b35",
                                            textDecoration: "none",
                                        }}
                                    >
                                        En savoir plus →
                                    </Link>
                                </div>
                            </article>
                        );
                    })}
                </div>

                {/* CTA Instagram */}
                <div
                    style={{
                        marginTop: 32,
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
                        📸 Suivez-nous sur Instagram
                    </a>
                </div>
            </div>
        </section>
    );
}

// ─── PREVIEW CARDS ───────────────────────────────────────────────────────────

function PreviewSection() {
    return (
        <section className="py-16 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10">
                    <SectionHeader
                        label="Explorer"
                        title="Découvrez la SHEVA"
                    />
                </div>

                <div className="preview-grid">
                    {previewCards.map((card, i) => (
                        <Link
                            key={card.href}
                            href={card.href}
                            target={card.external ? "_blank" : undefined}
                            rel={
                                card.external
                                    ? "noopener noreferrer"
                                    : undefined
                            }
                            className="preview-card"
                        >
                            <div
                                style={{
                                    position: "relative",
                                    overflow: "hidden",
                                    height: 200,
                                }}
                            >
                                <Image
                                    src={card.img}
                                    alt={card.title}
                                    fill
                                    style={{
                                        objectFit: "cover",
                                        transition: "transform 0.6s",
                                    }}
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
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── QUICK ACCESS ─────────────────────────────────────────────────────────────

function QuickAccess() {
    const links = [
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

    return (
        <section
            className="py-10 border-t border-gray-100"
            style={{ background: "#fafbfb" }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-xs font-bold tracking-widest uppercase mb-5 text-center text-gray-400">
                    Accès rapide
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                    {links.map((l) => (
                        <Link
                            key={l.href}
                            href={l.href}
                            className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-gray-100 hover:border-teal-300 hover:shadow-md transition-all text-center group"
                        >
                            <span className="text-xl">{l.icon}</span>
                            <span className="text-gray-600 group-hover:text-teal-700 text-xs font-semibold leading-tight transition-colors">
                                {l.label}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
    return (
        <>
            <Nav transparent />
            <main>
                <Hero />
                <StatsBar />
                <QualityLabels />
                <NewsSection />
                <PhotoGallery />
                <PreviewSection />
                <QuickAccess />
            </main>
            <Footer />
        </>
    );
}
