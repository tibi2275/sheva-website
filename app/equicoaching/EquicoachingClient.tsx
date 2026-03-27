"use client";

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

// ─── BRAND ────────────────────────────────────────────────────────────────────
const teal = "rgb(94,180,174)";
const tealDark = "rgb(69,144,150)";
const tealLight = "rgba(94,180,174,0.08)";
const orange = "#ff6b35";

// ─── CONTENT ──────────────────────────────────────────────────────────────────

const QUICKLINKS = [
    { href: "#approche", label: "L'approche" },
    { href: "#pourquoi", label: "Pourquoi le cheval ?" },
    { href: "#offres", label: "Nos offres" },
    { href: "#partenaire", label: "Sementis" },
    { href: "#temoignages", label: "Témoignages" },
];

const FEATURES = [
    {
        icon: "🐴",
        title: "Êtres de connexion",
        text: "À l'état naturel, ils vivent en troupeau. Ils sont par nature sensibles et connectés avec leur environnement.",
    },
    {
        icon: "👁️",
        title: "Révélateurs",
        text: "Leurs sens sont extrêmement développés. Ils lisent notre posture, nos intentions, nos émotions comme ils lisent leur environnement.",
    },
    {
        icon: "🌿",
        title: "Source d'inspiration",
        text: "Herbivores puissants à l'écoute de leurs propres besoins, ils agissent sans égo. Chacun a sa place et son rôle dans le troupeau.",
    },
];

const OFFERS = [
    {
        img: "/images/equicoaching/IMG_5384.JPEG",
        alt: "Atelier découverte équicoaching",
        tag: "Particuliers",
        tagColor: teal,
        title: "Atelier Découverte",
        desc: "Une demi-journée pour découvrir l'équicoaching et vivre vos premières interactions avec le cheval.",
        duration: "½ journée",
    },
    {
        img: "/images/equicoaching/stage rentrée 2a.JPEG",
        alt: "Atelier perfectionnement équicoaching",
        tag: "Particuliers",
        tagColor: teal,
        title: "Atelier Perfectionnement",
        desc: "Pour aller plus loin dans votre exploration et approfondir les apprentissages.",
        duration: "½ journée",
    },
    {
        img: "/images/equicoaching/stage rentrée 3a.JPEG",
        alt: "Stage développement personnel",
        tag: "Particuliers",
        tagColor: teal,
        title: "Stage Développement Personnel",
        desc: "Un ou deux jours pour un travail en profondeur sur vos objectifs personnels.",
        duration: "1 à 2 jours",
    },
    {
        img: "/images/equicoaching/Isabel.JPEG",
        alt: "Stage cavaliers équicoaching",
        tag: "Cavaliers",
        tagColor: orange,
        title: "Stage Cavaliers",
        desc: "Un format unique qui mixe équitation et équicoaching, notamment sur le thème des émotions.",
        duration: "1 journée",
    },
];

const TESTIMONIALS = [
    "Cette activité m'a permis de mieux me connaître et donc de mieux interagir avec les autres, dans le pro comme dans le perso.",
    "Je ne m'attendais pas à une transformation de la relation avec ma monture à ce point.",
    "Ça m'a permis d'avoir plus confiance en moi et d'être fière de ce que j'ai pu réaliser.",
    "Très riche en émotions dont je ressors sereine, un moment fort !",
    "Je ne m'attendais pas à autant d'émotions et d'authenticité. Une vraie expérience sensorielle !",
    "J'ai appris à mieux comprendre mes émotions.",
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const container: React.CSSProperties = {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "0 24px",
};

const sectionPad: React.CSSProperties = { padding: "80px 0" };

function SectionLabel({ text }: { text: string }) {
    return (
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
            {text}
        </p>
    );
}

function SectionTitle({ text }: { text: string }) {
    return (
        <h2
            style={{
                fontSize: "clamp(22px, 3vw, 32px)",
                fontWeight: 700,
                color: "rgb(15,23,42)",
                textAlign: "center",
                marginBottom: 48,
            }}
        >
            {text}
        </h2>
    );
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export function EquicoachingClient() {
    return (
        <>
            <Nav />
            <main style={{ paddingTop: 64 }}>

                {/* ── HERO ──────────────────────────────────────────────────── */}
                <section
                    style={{
                        background: `linear-gradient(135deg, ${teal} 0%, ${tealDark} 100%)`,
                        padding: "72px 24px 56px",
                        textAlign: "center",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    {/* Motif décoratif */}
                    <div
                        aria-hidden
                        style={{
                            position: "absolute",
                            inset: 0,
                            backgroundImage:
                                "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(255,255,255,0.05) 0%, transparent 50%)",
                            pointerEvents: "none",
                        }}
                    />

                    {/* Breadcrumb */}
                    <div
                        style={{
                            fontSize: 12,
                            color: "rgba(255,255,255,0.7)",
                            marginBottom: 20,
                            letterSpacing: "0.03em",
                        }}
                    >
                        <Link
                            href="/"
                            style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}
                        >
                            Accueil
                        </Link>
                        {" › "}
                        <Link
                            href="/activites"
                            style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}
                        >
                            Activités
                        </Link>
                        {" › "}
                        <span style={{ color: "white" }}>Équicoaching</span>
                    </div>

                    <h1
                        style={{
                            fontSize: "clamp(32px, 5vw, 56px)",
                            fontWeight: 800,
                            color: "white",
                            margin: "0 0 16px",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        Équicoaching
                    </h1>
                    <p
                        style={{
                            fontSize: "clamp(15px, 2vw, 18px)",
                            color: "rgba(255,255,255,0.88)",
                            maxWidth: 560,
                            margin: "0 auto 36px",
                            lineHeight: 1.6,
                        }}
                    >
                        Une approche unique de développement personnel accompagné par le cheval
                    </p>

                    {/* Quicklinks */}
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 10,
                            justifyContent: "center",
                        }}
                    >
                        {QUICKLINKS.map((l) => (
                            <a
                                key={l.href}
                                href={l.href}
                                style={{
                                    padding: "8px 18px",
                                    borderRadius: 8,
                                    background: "rgba(255,255,255,0.15)",
                                    border: "1px solid rgba(255,255,255,0.3)",
                                    color: "white",
                                    fontSize: 13,
                                    fontWeight: 600,
                                    textDecoration: "none",
                                }}
                            >
                                {l.label}
                            </a>
                        ))}
                    </div>
                </section>

                {/* ── INTRO ─────────────────────────────────────────────────── */}
                <section id="approche" style={sectionPad}>
                    <div
                        style={{
                            ...container,
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 64,
                            alignItems: "center",
                        }}
                        className="equi-two-col"
                    >
                        <div>
                            <SectionLabel text="L'approche" />
                            <h2
                                style={{
                                    fontSize: "clamp(22px, 2.5vw, 30px)",
                                    fontWeight: 700,
                                    color: "rgb(15,23,42)",
                                    marginBottom: 24,
                                }}
                            >
                                L'équicoaching à la SHEVA
                            </h2>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 16,
                                    fontSize: 16,
                                    color: "#4b5563",
                                    lineHeight: 1.7,
                                }}
                            >
                                <p>
                                    L'équicoaching est une méthode de coaching et de développement
                                    personnel facilitée par les chevaux. Lors des séances ou stages,
                                    tout se déroule{" "}
                                    <strong style={{ color: "rgb(15,23,42)" }}>
                                        à pied avec le cheval
                                    </strong>{" "}
                                    — aucune expérience équestre n'est requise.
                                </p>
                                <p>
                                    En session individuelle ou en petit groupe, on peut aborder des
                                    thèmes personnels ou professionnels : confiance en soi,
                                    reconnexion à soi, assertivité, créativité, leadership, travail
                                    en équipe, management ou teambuilding.
                                </p>
                                <p>
                                    La SHEVA a souhaité proposer ces activités car l'équicoaching
                                    permet d'établir une{" "}
                                    <strong style={{ color: "rgb(15,23,42)" }}>
                                        relation différente entre l'humain et le cheval
                                    </strong>
                                    .
                                </p>
                            </div>
                        </div>

                        <div
                            style={{
                                borderRadius: 16,
                                overflow: "hidden",
                                boxShadow: "0 16px 48px rgba(0,0,0,0.12)",
                                aspectRatio: "16/9",
                                position: "relative",
                            }}
                        >
                            <Image
                                src="/images/equicoaching/Elsa Florence et Valentin.JPEG"
                                alt="Séance d'équicoaching à la SHEVA"
                                fill
                                style={{ objectFit: "cover", objectPosition: "center" }}
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    </div>
                </section>

                {/* ── POURQUOI ──────────────────────────────────────────────── */}
                <section
                    id="pourquoi"
                    style={{ ...sectionPad, background: tealLight }}
                >
                    <div style={container}>
                        <SectionLabel text="Le cheval comme partenaire" />
                        <SectionTitle text="Pourquoi coacher avec les chevaux ?" />

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: 56,
                                alignItems: "center",
                                marginBottom: 56,
                            }}
                            className="equi-two-col"
                        >
                            <div
                                style={{
                                    borderRadius: 16,
                                    overflow: "hidden",
                                    boxShadow: "0 12px 36px rgba(0,0,0,0.10)",
                                    aspectRatio: "16/9",
                                    position: "relative",
                                }}
                            >
                                <Image
                                    src="/images/equicoaching/IMG_4097.JPEG"
                                    alt="Connexion humain-cheval en équicoaching"
                                    fill
                                    style={{ objectFit: "cover", objectPosition: "center" }}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 20,
                                    fontSize: 16,
                                    color: "#4b5563",
                                    lineHeight: 1.7,
                                }}
                            >
                                <p>
                                    Le cheval a toujours accompagné l'Homme. Depuis la nuit des
                                    temps, nos espèces sont liées. Alors que nos ancêtres réalisaient
                                    des peintures rupestres, l'animal qu'ils ont le plus représenté
                                    est le cheval.
                                </p>
                                <p>
                                    Dans un monde hyperconnecté où tout va très vite, les chevaux
                                    nous permettent de nous rappeler qui l'on est vraiment, à quel
                                    point nous appartenons nous aussi à la nature. Ils nous permettent
                                    de nous connecter à eux avec{" "}
                                    <strong style={{ color: "rgb(15,23,42)" }}>
                                        simplicité et authenticité
                                    </strong>
                                    .
                                </p>
                                <p
                                    style={{
                                        fontStyle: "italic",
                                        color: tealDark,
                                        fontWeight: 500,
                                        borderLeft: `3px solid ${teal}`,
                                        paddingLeft: 16,
                                    }}
                                >
                                    Chaque interaction avec le cheval est une opportunité
                                    d'apprentissage et de transformation.
                                </p>
                            </div>
                        </div>

                        {/* 3 features */}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(3, 1fr)",
                                gap: 24,
                            }}
                            className="equi-three-col"
                        >
                            {FEATURES.map((f) => (
                                <div
                                    key={f.title}
                                    style={{
                                        background: "white",
                                        borderRadius: 16,
                                        padding: "32px 28px",
                                        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                                        border: "1px solid rgba(94,180,174,0.15)",
                                    }}
                                >
                                    <div style={{ fontSize: 36, marginBottom: 16 }}>{f.icon}</div>
                                    <h3
                                        style={{
                                            fontSize: 17,
                                            fontWeight: 700,
                                            color: "rgb(15,23,42)",
                                            marginBottom: 10,
                                        }}
                                    >
                                        {f.title}
                                    </h3>
                                    <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}>
                                        {f.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── OFFRES ────────────────────────────────────────────────── */}
                <section id="offres" style={sectionPad}>
                    <div style={container}>
                        <SectionLabel text="Nos formats" />
                        <SectionTitle text="Nos offres" />

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(2, 1fr)",
                                gap: 28,
                                marginBottom: 48,
                            }}
                            className="equi-offers-grid"
                        >
                            {OFFERS.map((o) => (
                                <div
                                    key={o.title}
                                    style={{
                                        borderRadius: 16,
                                        overflow: "hidden",
                                        background: "white",
                                        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                                        border: "1px solid #f0f0f0",
                                    }}
                                >
                                    <div
                                        style={{
                                            position: "relative",
                                            aspectRatio: "16/9",
                                        }}
                                    >
                                        <Image
                                            src={o.img}
                                            alt={o.alt}
                                            fill
                                            style={{ objectFit: "cover", objectPosition: "center top" }}
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px"
                                        />
                                        {/* Badge durée */}
                                        <span
                                            style={{
                                                position: "absolute",
                                                top: 12,
                                                right: 12,
                                                background: "rgba(0,0,0,0.55)",
                                                color: "white",
                                                fontSize: 11,
                                                fontWeight: 600,
                                                padding: "4px 10px",
                                                borderRadius: 20,
                                                backdropFilter: "blur(4px)",
                                            }}
                                        >
                                            {o.duration}
                                        </span>
                                    </div>
                                    <div style={{ padding: "24px 28px" }}>
                                        <span
                                            style={{
                                                display: "inline-block",
                                                padding: "3px 10px",
                                                borderRadius: 20,
                                                background: `${o.tagColor}20`,
                                                color: o.tagColor,
                                                fontSize: 11,
                                                fontWeight: 700,
                                                letterSpacing: "0.06em",
                                                textTransform: "uppercase",
                                                marginBottom: 10,
                                            }}
                                        >
                                            {o.tag}
                                        </span>
                                        <h3
                                            style={{
                                                fontSize: 18,
                                                fontWeight: 700,
                                                color: "rgb(15,23,42)",
                                                marginBottom: 8,
                                            }}
                                        >
                                            {o.title}
                                        </h3>
                                        <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}>
                                            {o.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Offre Entreprise */}
                        <div
                            style={{
                                background: `linear-gradient(135deg, ${teal}15 0%, ${tealDark}20 100%)`,
                                border: `1px solid ${teal}30`,
                                borderRadius: 20,
                                padding: "40px 48px",
                                display: "grid",
                                gridTemplateColumns: "1fr auto",
                                gap: 32,
                                alignItems: "center",
                            }}
                            className="equi-enterprise"
                        >
                            <div>
                                <h3
                                    style={{
                                        fontSize: 20,
                                        fontWeight: 700,
                                        color: "rgb(15,23,42)",
                                        marginBottom: 12,
                                    }}
                                >
                                    🏢 Offre Entreprise
                                </h3>
                                <p
                                    style={{
                                        fontSize: 15,
                                        color: "#4b5563",
                                        marginBottom: 16,
                                        lineHeight: 1.6,
                                    }}
                                >
                                    Sementis Équicoaching propose des événements entreprise à la
                                    SHEVA : coaching d'équipe, formation leadership & management,
                                    teambuilding et accompagnements individuels sur mesure.
                                </p>
                                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                                    <a
                                        href="mailto:E.Dogliotti@sementiscoaching.com"
                                        style={{
                                            fontSize: 14,
                                            color: tealDark,
                                            fontWeight: 600,
                                            textDecoration: "none",
                                        }}
                                    >
                                        📧 E.Dogliotti@sementiscoaching.com
                                    </a>
                                    <a
                                        href="tel:0663120137"
                                        style={{
                                            fontSize: 14,
                                            color: tealDark,
                                            fontWeight: 600,
                                            textDecoration: "none",
                                        }}
                                    >
                                        📞 06 63 12 01 37
                                    </a>
                                </div>
                            </div>
                            <a
                                href="mailto:E.Dogliotti@sementiscoaching.com"
                                style={{
                                    padding: "12px 28px",
                                    borderRadius: 10,
                                    background: tealDark,
                                    color: "white",
                                    fontWeight: 700,
                                    fontSize: 14,
                                    textDecoration: "none",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                Nous contacter
                            </a>
                        </div>
                    </div>
                </section>

                {/* ── PARTENAIRE ────────────────────────────────────────────── */}
                <section
                    id="partenaire"
                    style={{ ...sectionPad, background: tealLight }}
                >
                    <div style={container}>
                        <SectionLabel text="Notre partenaire" />
                        <SectionTitle text="Sementis Équicoaching" />

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "400px 1fr",
                                gap: 64,
                                alignItems: "center",
                            }}
                            className="equi-two-col"
                        >
                            <div
                                style={{
                                    borderRadius: 16,
                                    overflow: "hidden",
                                    boxShadow: "0 16px 48px rgba(0,0,0,0.12)",
                                    aspectRatio: "16/9",
                                    position: "relative",
                                }}
                            >
                                <Image
                                    src="/images/equicoaching/IMG_5225.JPEG"
                                    alt="Elsa Dogliotti — Sementis Équicoaching"
                                    fill
                                    style={{ objectFit: "cover", objectPosition: "center top" }}
                                    sizes="(max-width: 768px) 100vw, 400px"
                                />
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 18,
                                }}
                            >
                                <div
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 10,
                                        background: "white",
                                        border: `1px solid ${teal}40`,
                                        borderRadius: 12,
                                        padding: "10px 18px",
                                        width: "fit-content",
                                    }}
                                >
                                    <span style={{ fontSize: 22 }}>🌱</span>
                                    <div>
                                        <div
                                            style={{
                                                fontSize: 15,
                                                fontWeight: 700,
                                                color: "rgb(15,23,42)",
                                            }}
                                        >
                                            Elsa Dogliotti
                                        </div>
                                        <div style={{ fontSize: 12, color: "#6b7280" }}>
                                            Fondatrice — Sementis Équicoaching
                                        </div>
                                    </div>
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 14,
                                        fontSize: 15,
                                        color: "#4b5563",
                                        lineHeight: 1.7,
                                    }}
                                >
                                    <p>
                                        <strong style={{ color: "rgb(15,23,42)" }}>Sementis</strong>{" "}
                                        est une entreprise de coaching créée en 2024 par{" "}
                                        <strong style={{ color: "rgb(15,23,42)" }}>
                                            Elsa Dogliotti
                                        </strong>
                                        , cavalière et bénévole à la SHEVA.
                                    </p>
                                    <p>
                                        Après 25 ans en entreprise en tant que Directrice des
                                        Ressources Humaines, Elsa a expérimenté l'équicoaching — ça
                                        a été une véritable révélation !
                                    </p>
                                    <p>
                                        Formée au coaching professionnel chez Mosaik International, à
                                        l'équicoaching avec la méthode{" "}
                                        <em>Medicine Horse Way</em> pour les adultes et{" "}
                                        <em>Poneymotions</em> pour les enfants.
                                    </p>
                                </div>

                                <div style={{ display: "flex", gap: 12 }}>
                                    <a
                                        href="https://www.instagram.com/sementis_coaching_equicoaching/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: 6,
                                            padding: "8px 16px",
                                            borderRadius: 8,
                                            background: "white",
                                            border: "1px solid #e5e7eb",
                                            color: "#374151",
                                            fontSize: 13,
                                            fontWeight: 600,
                                            textDecoration: "none",
                                        }}
                                    >
                                        📸 Instagram
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/in/elsa-dogliotti/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: 6,
                                            padding: "8px 16px",
                                            borderRadius: 8,
                                            background: "white",
                                            border: "1px solid #e5e7eb",
                                            color: "#374151",
                                            fontSize: 13,
                                            fontWeight: 600,
                                            textDecoration: "none",
                                        }}
                                    >
                                        💼 LinkedIn
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── TÉMOIGNAGES ───────────────────────────────────────────── */}
                <section id="temoignages" style={sectionPad}>
                    <div style={container}>
                        <SectionLabel text="Retours participants" />
                        <SectionTitle text="Ce qu'en disent les participants" />

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(3, 1fr)",
                                gap: 20,
                            }}
                            className="equi-testimonials"
                        >
                            {TESTIMONIALS.map((t, i) => (
                                <div
                                    key={i}
                                    style={{
                                        background: "white",
                                        border: "1px solid #f0f0f0",
                                        borderRadius: 16,
                                        padding: "28px 24px",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                                        position: "relative",
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: 48,
                                            lineHeight: 1,
                                            color: teal,
                                            opacity: 0.3,
                                            fontFamily: "Georgia, serif",
                                            marginBottom: 8,
                                        }}
                                    >
                                        "
                                    </div>
                                    <p
                                        style={{
                                            fontSize: 14,
                                            color: "#4b5563",
                                            lineHeight: 1.65,
                                            fontStyle: "italic",
                                        }}
                                    >
                                        {t}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── PROS ──────────────────────────────────────────────────── */}
                <section
                    style={{
                        background: `linear-gradient(135deg, ${tealDark} 0%, rgb(45,110,115) 100%)`,
                        padding: "56px 24px",
                    }}
                >
                    <div style={{ ...container, textAlign: "center" }}>
                        <h3
                            style={{
                                fontSize: 22,
                                fontWeight: 700,
                                color: "white",
                                marginBottom: 16,
                            }}
                        >
                            📣 À l'attention des équicoachs
                        </h3>
                        <p
                            style={{
                                fontSize: 15,
                                color: "rgba(255,255,255,0.85)",
                                maxWidth: 580,
                                margin: "0 auto 24px",
                                lineHeight: 1.65,
                            }}
                        >
                            Vous souhaitez organiser des événements à la SHEVA avec vos propres
                            clients ?{" "}
                            <strong style={{ color: "white" }}>
                                La SHEVA loue ses installations !
                            </strong>{" "}
                            N'hésitez pas à nous contacter pour un devis.
                        </p>
                        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                            <a
                                href="mailto:sheva@sheva.fr"
                                style={{
                                    padding: "11px 24px",
                                    borderRadius: 10,
                                    background: "white",
                                    color: tealDark,
                                    fontWeight: 700,
                                    fontSize: 14,
                                    textDecoration: "none",
                                }}
                            >
                                📧 sheva@sheva.fr
                            </a>
                            <a
                                href="mailto:E.Dogliotti@sementiscoaching.com"
                                style={{
                                    padding: "11px 24px",
                                    borderRadius: 10,
                                    background: "rgba(255,255,255,0.15)",
                                    border: "1px solid rgba(255,255,255,0.3)",
                                    color: "white",
                                    fontWeight: 600,
                                    fontSize: 14,
                                    textDecoration: "none",
                                }}
                            >
                                📧 Sementis Coaching
                            </a>
                        </div>
                    </div>
                </section>

                {/* ── CTA FINAL ─────────────────────────────────────────────── */}
                <section style={{ padding: "72px 24px", background: "#f8fafc" }}>
                    <div style={{ ...container, textAlign: "center" }}>
                        <div
                            style={{
                                display: "inline-flex",
                                flexDirection: "column",
                                alignItems: "center",
                                background: "white",
                                borderRadius: 20,
                                padding: "48px 56px",
                                boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                                border: "1px solid #f0f0f0",
                            }}
                        >
                            <div style={{ fontSize: 48, marginBottom: 20 }}>🐴</div>
                            <h3
                                style={{
                                    fontSize: 24,
                                    fontWeight: 700,
                                    color: "rgb(15,23,42)",
                                    marginBottom: 12,
                                }}
                            >
                                Prêt à vivre l'expérience ?
                            </h3>
                            <p
                                style={{
                                    fontSize: 15,
                                    color: "#6b7280",
                                    marginBottom: 28,
                                    maxWidth: 440,
                                    lineHeight: 1.65,
                                }}
                            >
                                Contactez-nous pour connaître les prochaines dates ou pour toute
                                question.
                            </p>
                            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
                                <a
                                    href="mailto:E.Dogliotti@sementiscoaching.com"
                                    style={{
                                        padding: "13px 28px",
                                        borderRadius: 10,
                                        background: tealDark,
                                        color: "white",
                                        fontWeight: 700,
                                        fontSize: 15,
                                        textDecoration: "none",
                                    }}
                                >
                                    Contacter Sementis
                                </a>
                                <Link
                                    href="/activites"
                                    style={{
                                        padding: "13px 28px",
                                        borderRadius: 10,
                                        background: "white",
                                        border: "1px solid #e5e7eb",
                                        color: "#374151",
                                        fontWeight: 600,
                                        fontSize: 15,
                                        textDecoration: "none",
                                    }}
                                >
                                    Voir toutes les activités
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Responsive */}
            <style>{`
                @media (max-width: 768px) {
                    .equi-two-col { grid-template-columns: 1fr !important; gap: 32px !important; }
                    .equi-three-col { grid-template-columns: 1fr !important; }
                    .equi-offers-grid { grid-template-columns: 1fr !important; }
                    .equi-testimonials { grid-template-columns: 1fr !important; }
                    .equi-enterprise { grid-template-columns: 1fr !important; }
                    .equi-enterprise a:last-child { width: 100%; text-align: center; }
                }
                @media (max-width: 1024px) and (min-width: 769px) {
                    .equi-three-col { grid-template-columns: repeat(2, 1fr) !important; }
                    .equi-testimonials { grid-template-columns: repeat(2, 1fr) !important; }
                }
            `}</style>

            <Footer />
        </>
    );
}
