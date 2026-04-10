import { Nav } from "@/components/Nav";
import { PhotoGallery } from "@/components/PhotoGallery";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Activités équestres | Cours, stages et loisirs — SHEVA",
    description:
        "Cours d'équitation, stages, balades, compétitions et animations : la SHEVA propose une large gamme d'activités équestres à Créteil, dans une ambiance conviviale.",
};

// ─── BRAND ────────────────────────────────────────────────────────────────────
const teal = "rgb(94,180,174)";
const tealDark = "rgb(69,144,150)";
const orange = "#ff6b35";

// ─── GALLERY ──────────────────────────────────────────────────────────────────

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

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

function Tag({ children }: { children: React.ReactNode }) {
    return (
        <span
            style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "3px 10px",
                borderRadius: 20,
                background: `rgba(94,180,174,0.1)`,
                color: tealDark,
                fontSize: 12,
                fontWeight: 600,
                border: `1px solid rgba(94,180,174,0.2)`,
                whiteSpace: "nowrap",
            }}
        >
            {children}
        </span>
    );
}

function CourseCard({
    img,
    title,
    tags,
    desc,
    objectives,
    extra,
}: {
    img: string;
    title: string;
    tags: string[];
    desc: string;
    objectives: string[];
    extra?: React.ReactNode;
}) {
    return (
        <div
            style={{
                background: "white",
                borderRadius: 16,
                overflow: "hidden",
                border: "1px solid #f0f0f0",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <div style={{ position: "relative", height: 180, flexShrink: 0 }}>
                <Image
                    src={img}
                    alt={title}
                    fill
                    style={{ objectFit: "cover" }}
                />
            </div>
            <div
                style={{
                    padding: "18px 20px 20px",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <h4
                    style={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: "rgb(15,23,42)",
                        marginBottom: 10,
                    }}
                >
                    {title}
                </h4>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 6,
                        marginBottom: 12,
                    }}
                >
                    {tags.map((t) => (
                        <Tag key={t}>{t}</Tag>
                    ))}
                </div>
                <p
                    style={{
                        fontSize: 13,
                        color: "#4b5563",
                        lineHeight: 1.65,
                        marginBottom: 12,
                    }}
                >
                    {desc}
                </p>
                <ul
                    style={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: 5,
                        flex: 1,
                    }}
                >
                    {objectives.map((o) => (
                        <li
                            key={o}
                            style={{
                                display: "flex",
                                gap: 8,
                                alignItems: "flex-start",
                                fontSize: 13,
                                color: "#6b7280",
                            }}
                        >
                            <span
                                style={{
                                    color: teal,
                                    flexShrink: 0,
                                    marginTop: 2,
                                }}
                            >
                                ›
                            </span>
                            {o}
                        </li>
                    ))}
                </ul>
                {extra && (
                    <div
                        style={{
                            marginTop: 14,
                            padding: "10px 12px",
                            borderRadius: 8,
                            background: `rgba(94,180,174,0.06)`,
                            border: `1px solid rgba(94,180,174,0.15)`,
                            fontSize: 12,
                            color: "#4b5563",
                            lineHeight: 1.6,
                        }}
                    >
                        {extra}
                    </div>
                )}
            </div>
        </div>
    );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function ActivitesPage() {
    const containerStyle = {
        maxWidth: 1280,
        margin: "0 auto",
        padding: "0 24px",
    };
    const sectionStyle = { padding: "72px 0" };

    return (
        <>
            <Nav />

            <main style={{ paddingTop: 64 }}>
                {/* ── HERO ──────────────────────────────────────────────── */}
                <section
                    style={{
                        background: `linear-gradient(135deg, ${teal} 0%, ${tealDark} 100%)`,
                        padding: "72px 24px 56px",
                        textAlign: "center",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 8,
                            marginBottom: 20,
                            fontSize: 13,
                            color: "rgba(255,255,255,0.7)",
                        }}
                    >
                        <Link
                            href="/"
                            style={{
                                color: "rgba(255,255,255,0.7)",
                                textDecoration: "none",
                            }}
                        >
                            Accueil
                        </Link>
                        <span>›</span>
                        <span style={{ color: "white" }}>Activités</span>
                    </div>
                    <h1
                        style={{
                            fontSize: 40,
                            fontWeight: 700,
                            color: "white",
                            marginBottom: 16,
                            lineHeight: 1.2,
                        }}
                    >
                        Nos Activités Équestres
                    </h1>
                    <p
                        style={{
                            fontSize: 17,
                            color: "rgba(255,255,255,0.85)",
                            maxWidth: 600,
                            margin: "0 auto 32px",
                            lineHeight: 1.7,
                            textAlign: "center",
                        }}
                    >
                        De l'initiation au perfectionnement, découvrez toutes
                        nos activités adaptées à chaque cavalier, quel que soit
                        son niveau.
                    </p>
                    {/* Quick nav */}
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 10,
                            justifyContent: "center",
                        }}
                    >
                        {[
                            { label: "Cours", href: "#cours" },
                            { label: "Compétition", href: "#competition" },
                            { label: "Galops", href: "#galops" },
                            { label: "Stages & sorties", href: "#activites" },
                        ].map((l) => (
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

                {/* ── COURS ─────────────────────────────────────────────── */}
                <section
                    id="cours"
                    style={{ ...sectionStyle, background: "#fafbfb" }}
                >
                    <div style={containerStyle}>
                        <SectionHeader
                            label="Tous les niveaux"
                            title="Nos Cours d'Équitation"
                        />

                        <p
                            style={{
                                fontSize: 15,
                                color: "#4b5563",
                                lineHeight: 1.7,
                                marginBottom: 40,
                                maxWidth: 680,
                                textAlign: "center",
                                margin: "0 auto 40px",
                            }}
                        >
                            Nos cours sont adaptés à tous les âges et tous les
                            niveaux. Chaque cavalier évolue à son rythme dans
                            une ambiance bienveillante et sécurisée.
                        </p>
                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 12,
                                marginBottom: 48,
                                justifyContent: "center",
                            }}
                        >
                            <Link
                                href="/planning"
                                style={{
                                    padding: "10px 20px",
                                    borderRadius: 10,
                                    background: `linear-gradient(135deg, ${teal}, ${tealDark})`,
                                    color: "white",
                                    fontWeight: 700,
                                    fontSize: 13,
                                    textDecoration: "none",
                                }}
                            >
                                Les Forfaits
                            </Link>
                            <Link
                                href="/infos#fonctionnement"
                                style={{
                                    padding: "10px 20px",
                                    borderRadius: 10,
                                    background: "white",
                                    border: `1px solid rgba(94,180,174,0.35)`,
                                    color: tealDark,
                                    fontWeight: 700,
                                    fontSize: 13,
                                    textDecoration: "none",
                                }}
                            >
                                Fonctionnement des cours
                            </Link>
                        </div>

                        {/* ── Catégorie 1 : Éveil ── */}
                        <div style={{ marginBottom: 56 }}>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 12,
                                    marginBottom: 24,
                                }}
                            >
                                <span style={{ fontSize: 22 }}>🦄</span>
                                <h3
                                    style={{
                                        fontSize: 20,
                                        fontWeight: 700,
                                        color: "rgb(15,23,42)",
                                    }}
                                >
                                    Pour les plus petits (3-4 ans)
                                </h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {/* Éveil Poney */}
                                <div
                                    style={{
                                        background: "white",
                                        borderRadius: 16,
                                        overflow: "hidden",
                                        border: "1px solid #f0f0f0",
                                        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <div
                                        style={{
                                            position: "relative",
                                            height: 180,
                                        }}
                                    >
                                        <Image
                                            src="/images/Images-illustrations/activites-illustration.avif"
                                            alt="Éveil Poney"
                                            fill
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>
                                    <div
                                        style={{
                                            padding: "18px 20px 20px",
                                            flex: 1,
                                        }}
                                    >
                                        <h4
                                            style={{
                                                fontSize: 16,
                                                fontWeight: 700,
                                                color: "rgb(15,23,42)",
                                                marginBottom: 10,
                                            }}
                                        >
                                            Éveil Poney
                                        </h4>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexWrap: "wrap",
                                                gap: 6,
                                                marginBottom: 12,
                                            }}
                                        >
                                            <Tag>👶 3 et 4 ans</Tag>
                                            <Tag>⏰ 45 minutes</Tag>
                                        </div>
                                        <p
                                            style={{
                                                fontSize: 13,
                                                color: "#4b5563",
                                                lineHeight: 1.65,
                                                marginBottom: 12,
                                            }}
                                        >
                                            Première approche du poney par le
                                            jeu. Des activités à pied et à poney
                                            pour évoluer à son rythme.
                                        </p>
                                        <ul
                                            style={{
                                                listStyle: "none",
                                                padding: 0,
                                                margin: 0,
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: 5,
                                            }}
                                        >
                                            {[
                                                "7 dimanches par an",
                                                "Découverte du poney et partage",
                                                "Premiers soins",
                                                "Équilibre et motricité",
                                                "Jeux éducatifs et goûter",
                                            ].map((o) => (
                                                <li
                                                    key={o}
                                                    style={{
                                                        display: "flex",
                                                        gap: 8,
                                                        alignItems:
                                                            "flex-start",
                                                        fontSize: 13,
                                                        color: "#6b7280",
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            color: teal,
                                                            flexShrink: 0,
                                                            marginTop: 2,
                                                        }}
                                                    >
                                                        ›
                                                    </span>
                                                    {o}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Dates & Fonctionnement */}
                                <div
                                    style={{
                                        background: "white",
                                        borderRadius: 16,
                                        border: "1px solid #f0f0f0",
                                        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                                        padding: "24px",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: 10,
                                            marginBottom: 20,
                                        }}
                                    >
                                        <span style={{ fontSize: 28 }}>📅</span>
                                        <h4
                                            style={{
                                                fontSize: 16,
                                                fontWeight: 700,
                                                color: "rgb(15,23,42)",
                                                textAlign: "center",
                                            }}
                                        >
                                            Dates & Fonctionnement
                                        </h4>
                                    </div>
                                    <h5
                                        style={{
                                            fontSize: 13,
                                            fontWeight: 700,
                                            color: tealDark,
                                            marginBottom: 10,
                                            textTransform: "uppercase",
                                            letterSpacing: "0.06em",
                                        }}
                                    >
                                        📆 Séances 2025-2026
                                    </h5>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 8,
                                            marginBottom: 20,
                                        }}
                                    >
                                        {[
                                            "Dimanche 21 septembre 2025",
                                            "Dimanche 12 octobre 2025",
                                            "Dimanche 9 novembre 2025",
                                            "Dimanche 7 décembre 2025",
                                            "Dimanche 25 janvier 2026",
                                            "Dimanche 8 février 2026",
                                            "Dimanche 15 mars 2026",
                                        ].map((d) => (
                                            <div
                                                key={d}
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 10,
                                                    padding: "8px 12px",
                                                    borderRadius: 8,
                                                    background: `rgba(94,180,174,0.06)`,
                                                    fontSize: 13,
                                                    color: "#4b5563",
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        width: 6,
                                                        height: 6,
                                                        borderRadius: "50%",
                                                        background: teal,
                                                        flexShrink: 0,
                                                    }}
                                                />
                                                {d}
                                            </div>
                                        ))}
                                    </div>
                                    <div
                                        style={{
                                            padding: "14px 16px",
                                            borderRadius: 10,
                                            background: `rgba(255,107,53,0.06)`,
                                            border: `1px solid rgba(255,107,53,0.15)`,
                                        }}
                                    >
                                        <h5
                                            style={{
                                                fontSize: 13,
                                                fontWeight: 700,
                                                color: orange,
                                                marginBottom: 8,
                                            }}
                                        >
                                            ℹ️ Informations pratiques
                                        </h5>
                                        <p
                                            style={{
                                                fontSize: 13,
                                                color: "#4b5563",
                                                lineHeight: 1.65,
                                                margin: 0,
                                            }}
                                        >
                                            <strong>Tarifs :</strong> 130€ + 29€
                                            de licence
                                            <br />
                                            <strong>Inscription :</strong>{" "}
                                            Ouvertes, sur votre espace en ligne.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── Catégorie 2 : Poney ── */}
                        <div style={{ marginBottom: 56 }}>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 12,
                                    marginBottom: 24,
                                }}
                            >
                                <span style={{ fontSize: 22 }}>🐎</span>
                                <h3
                                    style={{
                                        fontSize: 20,
                                        fontWeight: 700,
                                        color: "rgb(15,23,42)",
                                    }}
                                >
                                    Cours Poney (4-12 ans)
                                </h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                <CourseCard
                                    img="/images/Images-illustrations/eveil-photo.jpg"
                                    title="Baby Poney"
                                    tags={[
                                        "🐴 6 cavaliers",
                                        "👶 4 à 6 ans",
                                        "⏰ 30 minutes",
                                    ]}
                                    desc="Développer le sens de l'équilibre du jeune cavalier, sa capacité psychomotrice, et lui permettre de gagner en autonomie."
                                    objectives={[
                                        "Responsabilité du poney sur la séance",
                                        "Position à cheval",
                                        "Premiers déplacements",
                                        "Autonomie progressive",
                                    ]}
                                    extra={
                                        <>
                                            Les cours Baby Poney ont lieu
                                            uniquement pendant les périodes hors
                                            vacances scolaires. Ces reprises
                                            nécessitent la présence d'un parent
                                            à pied à côté du poney pendant toute
                                            la durée de la reprise.
                                        </>
                                    }
                                />
                                <CourseCard
                                    img="/images/Images-illustrations/manege-illustration.avif"
                                    title="Débutant Poney"
                                    tags={[
                                        "🐴 8 cavaliers",
                                        "⏰ 45 minutes",
                                        "🏆 Débutants",
                                    ]}
                                    desc="Des cours adaptés aux enfants qui démarrent l'équitation."
                                    objectives={[
                                        "Apprentissage des bases de l'équitation",
                                        "Découverte du poney",
                                        "Position et allures",
                                        "Soins et sécurité",
                                    ]}
                                />
                                <CourseCard
                                    img="/images/Images-illustrations/activites-illustration.avif"
                                    title="Le Forfait 1h"
                                    tags={[
                                        "🐴 10 cavaliers",
                                        "⏰ 1h",
                                        "🏆 Galop de Bronze à Or",
                                    ]}
                                    desc="Développement technique et préparation aux Galops Bronze à Or. Un programme de 4 activités par mois : mise en selle assis, dressage, mise en selle obstacle et obstacle."
                                    objectives={[
                                        "Travail aux 3 allures",
                                        "Figures de manège",
                                        "Premiers sauts",
                                        "Autonomie complète",
                                    ]}
                                />
                            </div>
                        </div>

                        {/* ── Catégorie 3 : Chevaux ── */}
                        <div>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 12,
                                    marginBottom: 24,
                                }}
                            >
                                <span style={{ fontSize: 22 }}>🎯</span>
                                <h3
                                    style={{
                                        fontSize: 20,
                                        fontWeight: 700,
                                        color: "rgb(15,23,42)",
                                    }}
                                >
                                    Cours Chevaux (10 ans et +)
                                </h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                <CourseCard
                                    img="/images/Images-illustrations/forfait1h.png"
                                    title="Le Forfait 1h"
                                    tags={[
                                        "🐴 11 cavaliers max",
                                        "⏰ 1 heure",
                                        "🏆 Tous niveaux",
                                    ]}
                                    desc="Pratique de l'équitation par groupe de niveau, du Galop 0 au Galop 6/7. Un programme de 4 activités par mois : mise en selle assis, dressage, mise en selle obstacle et obstacle."
                                    objectives={[
                                        "Cours de niveaux",
                                        "Travail multi-activité",
                                        "Dressage",
                                        "Obstacle",
                                    ]}
                                />
                                <CourseCard
                                    img="/images/Images-illustrations/WhatsApp Image 2025-10-29 at 23.13.55.jpeg"
                                    title="Perfectionnement"
                                    tags={[
                                        "🐴 11 cavaliers max",
                                        "⏰ 1h15",
                                        "🏆 Galop 6 & 7",
                                    ]}
                                    desc="Comme pour le forfait 1h, il se compose toujours de 4 activités sur le mois (mise en selle dressage, dressage, mise en selle obstacle et obstacle), mais les reprises de dressage et d'obstacle durent 1h30 au lieu de 1h."
                                    objectives={[
                                        "Travail aux 3 allures",
                                        "Dressage ou obstacle",
                                        "Finesse des aides",
                                    ]}
                                />
                                <CourseCard
                                    img="/images/Images-illustrations/dressage.jpeg"
                                    title="Reprises de dressage"
                                    tags={[
                                        "🐴 11 cavaliers max",
                                        "⏰ 1h ou 1h30",
                                        "🏆 Galops 2 à 7",
                                    ]}
                                    desc="Reprises de dressage pour se perfectionner. Idéal pour tout cavalier qui souhaite améliorer son assiette, la précision de ses aides..."
                                    objectives={[
                                        "Reprises de dressage",
                                        "Précision des aides",
                                        "Mise en selle",
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── COMPÉTITION ───────────────────────────────────────── */}
                <section
                    id="competition"
                    style={{ ...sectionStyle, background: "white" }}
                >
                    <div style={containerStyle}>
                        <SectionHeader
                            label="Esprit sportif & fair-play"
                            title="Compétition"
                        />
                        <p
                            style={{
                                fontSize: 15,
                                color: "#4b5563",
                                lineHeight: 1.7,
                                marginBottom: 40,
                                maxWidth: 680,
                                textAlign: "center",
                                margin: "0 auto 40px",
                            }}
                        >
                            La SHEVA encourage la participation aux compétitions
                            pour tous les cavaliers souhaitant se mesurer et
                            progresser dans un esprit sportif et fair-play.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                {
                                    emoji: "🏆",
                                    title: "Équipes Poney",
                                    img: "/images/Images-illustrations/compet-poney.jpg",
                                    desc: "Deux équipes compétition à poney sont constituées. Une équipe d'initiation qui réalise ses toutes premières sorties et une équipe confirmée qui arpente les pistes toute l'année.",
                                    features: [
                                        "Débutants et moins débutants",
                                        "Compétition de Dressage, Saut d'Obstacles et Hunter",
                                    ],
                                    highlight: {
                                        label: "Saison 2026",
                                        text: "Objectif Championnats de France 🏆",
                                    },
                                    instagram:
                                        "https://www.instagram.com/compet_poney/",
                                },
                                {
                                    emoji: "🎯",
                                    title: "Équipe Club",
                                    img: "/images/Images-illustrations/compet_club.jpeg",
                                    desc: "Une équipe de cavaliers expérimentés, menée par Jessica, sillonne la France à la recherche des podiums.",
                                    features: [
                                        "Épreuves Club 3 à Club Elite",
                                        "Compétition de Dressage et Saut d'Obstacles",
                                    ],
                                    highlight: {
                                        label: "Saison 2025",
                                        text: "De nombreux classements !",
                                    },
                                    instagram:
                                        "https://www.instagram.com/compet_club_sheva/",
                                },
                                {
                                    emoji: "🌟",
                                    title: "Équipe Amat'",
                                    img: "/images/Images-illustrations/lemans.jpeg",
                                    desc: "Sous la houlette de Cédric, cette équipe de 10 cavaliers troque ses dimanches tranquilles pour avaler des parcours. Une équipe unie, aussi redoutable sur les pistes que conviviale autour du barbecue.",
                                    features: [
                                        "Amateur 3-2 (1m-1m15)",
                                        "Compétition d'Obstacles",
                                    ],
                                    highlight: {
                                        label: "Saison 2025",
                                        text: "Systématiquement classés sur les épreuves courues.",
                                    },
                                    instagram:
                                        "https://www.instagram.com/amat_sheva/",
                                },
                            ].map((team) => (
                                <div
                                    key={team.title}
                                    style={{
                                        background: "white",
                                        borderRadius: 16,
                                        border: "1px solid #f0f0f0",
                                        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                                        overflow: "hidden",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <div
                                        style={{
                                            position: "relative",
                                            height: 200,
                                        }}
                                    >
                                        <Image
                                            src={team.img}
                                            alt={team.title}
                                            fill
                                            style={{ objectFit: "cover" }}
                                        />
                                        <div
                                            style={{
                                                position: "absolute",
                                                inset: 0,
                                                background:
                                                    "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)",
                                            }}
                                        />
                                        <div
                                            style={{
                                                position: "absolute",
                                                bottom: 14,
                                                left: 16,
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 8,
                                            }}
                                        >
                                            <span style={{ fontSize: 22 }}>
                                                {team.emoji}
                                            </span>
                                            <h3
                                                style={{
                                                    fontSize: 18,
                                                    fontWeight: 700,
                                                    color: "white",
                                                    margin: 0,
                                                }}
                                            >
                                                {team.title}
                                            </h3>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            padding: "20px",
                                            flex: 1,
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 12,
                                        }}
                                    >
                                        <p
                                            style={{
                                                fontSize: 13,
                                                color: "#4b5563",
                                                lineHeight: 1.65,
                                                margin: 0,
                                            }}
                                        >
                                            {team.desc}
                                        </p>
                                        <ul
                                            style={{
                                                listStyle: "none",
                                                padding: 0,
                                                margin: 0,
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: 6,
                                            }}
                                        >
                                            {team.features.map((f) => (
                                                <li
                                                    key={f}
                                                    style={{
                                                        display: "flex",
                                                        gap: 8,
                                                        alignItems:
                                                            "flex-start",
                                                        fontSize: 13,
                                                        color: "#6b7280",
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            color: teal,
                                                            flexShrink: 0,
                                                            marginTop: 2,
                                                        }}
                                                    >
                                                        ›
                                                    </span>
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>
                                        <div
                                            style={{
                                                padding: "10px 14px",
                                                borderRadius: 10,
                                                background: `rgba(94,180,174,0.08)`,
                                                border: `1px solid rgba(94,180,174,0.2)`,
                                            }}
                                        >
                                            <p
                                                style={{
                                                    fontSize: 13,
                                                    color: "#374151",
                                                    margin: 0,
                                                }}
                                            >
                                                <strong>
                                                    {team.highlight.label} :
                                                </strong>{" "}
                                                {team.highlight.text}
                                            </p>
                                        </div>
                                        <a
                                            href={team.instagram}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                gap: 6,
                                                fontSize: 13,
                                                color: tealDark,
                                                fontWeight: 600,
                                                textDecoration: "none",
                                                marginTop: "auto",
                                            }}
                                        >
                                            <svg
                                                width="14"
                                                height="14"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                            </svg>
                                            Suivre sur Instagram
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── GALOPS ────────────────────────────────────────────── */}
                <section
                    id="galops"
                    style={{ ...sectionStyle, background: "#fafbfb" }}
                >
                    <div style={containerStyle}>
                        <SectionHeader
                            label="Diplômes officiels FFE"
                            title="Examens des Galops"
                        />
                        <p
                            style={{
                                fontSize: 15,
                                color: "#4b5563",
                                lineHeight: 1.7,
                                marginBottom: 40,
                                maxWidth: 750,
                                textAlign: "center",
                                margin: "0 auto 40px",
                            }}
                        >
                            Les Galops FFE sont les diplômes officiels
                            d'équitation en France.
                            <br />
                            Tout au long de l'année, les moniteurs accompagnent
                            les cavaliers pour suivre leur progression et les
                            former au passage de Galop. En fin d'année nous
                            organisons les examens.
                            <br />À la SHEVA nous préparons les Galops selon le
                            programme officiel de la FFE.
                        </p>
                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 12,
                                marginBottom: 48,
                                justifyContent: "center",
                            }}
                        >
                            <a
                                href="https://www.ffe.com/encadrer/diplomes-de-cavalier/les-galops-de-cavalier"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    padding: "10px 20px",
                                    borderRadius: 10,
                                    background: `linear-gradient(135deg, ${teal}, ${tealDark})`,
                                    color: "white",
                                    fontWeight: 700,
                                    fontSize: 13,
                                    textDecoration: "none",
                                    display: "inline-block",
                                }}
                            >
                                Programme Officiel des Galops →
                            </a>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {[
                                {
                                    title: "Galops Bronze à Or",
                                    badge: "À poney",
                                    badgeColor: teal,
                                    skills: [
                                        "Découverte de la pratique équestre à pieds et à cheval",
                                        "Apprendre à s'occuper de son poney",
                                        "Théorie générale autour du poney",
                                        "Transition vers le passage à cheval",
                                    ],
                                    exam: "Maniabilité à pieds et à poney",
                                    theory: "Connaissances générales du poney",
                                },
                                {
                                    title: "Galops 1-2",
                                    badge: "Débutant",
                                    badgeColor: "#22c55e",
                                    skills: [
                                        "Découverte du cheval et de son environnement",
                                        "Soins de base et sécurité",
                                        "Équilibre au pas et au trot",
                                        "Direction et contrôle des allures",
                                    ],
                                    exam: "Maniabilité au pas et trot",
                                    theory: "Connaissances générales du cheval",
                                },
                                {
                                    title: "Galops 3-4",
                                    badge: "Intermédiaire",
                                    badgeColor: "#f59e0b",
                                    skills: [
                                        "Maîtrise des 3 allures",
                                        "Travail en autonomie",
                                        "Premiers sauts d'obstacles",
                                        "Pansage et sellage/bridage",
                                    ],
                                    exam: "Dressage et saut",
                                    theory: "Hippologie et soins",
                                },
                                {
                                    title: "Galops 5-7",
                                    badge: "Confirmé",
                                    badgeColor: orange,
                                    skills: [
                                        "Équitation de précision",
                                        "Saut d'obstacles technique",
                                        "Travail du jeune cheval",
                                        "Connaissances approfondies",
                                    ],
                                    exam: "Dressage, Saut et Cross",
                                    theory: "Expertise équestre",
                                },
                            ].map((g) => (
                                <div
                                    key={g.title}
                                    style={{
                                        background: "white",
                                        borderRadius: 16,
                                        border: "1px solid #f0f0f0",
                                        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                                        overflow: "hidden",
                                    }}
                                >
                                    {/* Header */}
                                    <div
                                        style={{
                                            padding: "16px 20px",
                                            borderBottom: "1px solid #f5f5f5",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <h3
                                            style={{
                                                fontSize: 16,
                                                fontWeight: 700,
                                                color: "rgb(15,23,42)",
                                                margin: 0,
                                            }}
                                        >
                                            {g.title}
                                        </h3>
                                        <span
                                            style={{
                                                padding: "3px 10px",
                                                borderRadius: 20,
                                                background: `${g.badgeColor}18`,
                                                color: g.badgeColor,
                                                fontSize: 11,
                                                fontWeight: 700,
                                                border: `1px solid ${g.badgeColor}40`,
                                            }}
                                        >
                                            {g.badge}
                                        </span>
                                    </div>
                                    {/* Content */}
                                    <div style={{ padding: "16px 20px" }}>
                                        <p
                                            style={{
                                                fontSize: 11,
                                                fontWeight: 700,
                                                color: "#9ca3af",
                                                letterSpacing: "0.08em",
                                                textTransform: "uppercase",
                                                marginBottom: 10,
                                            }}
                                        >
                                            Compétences à acquérir
                                        </p>
                                        <ul
                                            style={{
                                                listStyle: "none",
                                                padding: 0,
                                                margin: "0 0 16px",
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: 6,
                                            }}
                                        >
                                            {g.skills.map((s) => (
                                                <li
                                                    key={s}
                                                    style={{
                                                        display: "flex",
                                                        gap: 8,
                                                        alignItems:
                                                            "flex-start",
                                                        fontSize: 13,
                                                        color: "#4b5563",
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            width: 5,
                                                            height: 5,
                                                            borderRadius: "50%",
                                                            background:
                                                                g.badgeColor,
                                                            flexShrink: 0,
                                                            marginTop: 5,
                                                        }}
                                                    />
                                                    {s}
                                                </li>
                                            ))}
                                        </ul>
                                        <div
                                            style={{
                                                padding: "10px 12px",
                                                borderRadius: 8,
                                                background: "#f9fafb",
                                                border: "1px solid #f0f0f0",
                                                fontSize: 12,
                                                color: "#6b7280",
                                                lineHeight: 1.6,
                                            }}
                                        >
                                            <strong>Épreuve pratique :</strong>{" "}
                                            {g.exam}
                                            <br />
                                            <strong>Théorie :</strong>{" "}
                                            {g.theory}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── GALLERY ───────────────────────────────────────────── */}
                <PhotoGallery />

                {/* ── ACTIVITÉS / STAGES ────────────────────────────────── */}
                <section
                    id="activites"
                    style={{ ...sectionStyle, background: "white" }}
                >
                    <div style={containerStyle}>
                        <SectionHeader
                            label="Toute l'année"
                            title="Activités & Stages"
                        />
                        <p
                            style={{
                                fontSize: 15,
                                color: "#4b5563",
                                lineHeight: 1.7,
                                marginBottom: 40,
                                maxWidth: 720,
                                textAlign: "center",
                                margin: "0 auto 40px",
                            }}
                        >
                            Des activités variées sont régulièrement organisées
                            par la SHEVA (stages thématiques pour les différents
                            niveaux de Galops, concours internes et externes,
                            animations conviviales, etc.), généralement tous les
                            dimanches après-midi, ou à l'occasion d'événements
                            spécifiques (sorties en forêt, fêtes du club, etc.).
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {/* Challenge interne */}
                            <div
                                style={{
                                    background: "#fafbfb",
                                    borderRadius: 16,
                                    border: "1px solid #f0f0f0",
                                    overflow: "hidden",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <div
                                    style={{
                                        position: "relative",
                                        height: 180,
                                    }}
                                >
                                    <Image
                                        src="/images/Images-illustrations/challenge.JPG"
                                        alt="Challenge Interne"
                                        fill
                                        style={{ objectFit: "cover" }}
                                    />
                                </div>
                                <div
                                    style={{
                                        padding: "20px",
                                        flex: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 12,
                                    }}
                                >
                                    <div>
                                        <h3
                                            style={{
                                                fontSize: 17,
                                                fontWeight: 700,
                                                color: "rgb(15,23,42)",
                                                marginBottom: 8,
                                            }}
                                        >
                                            Challenge Interne
                                        </h3>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexWrap: "wrap",
                                                gap: 6,
                                            }}
                                        >
                                            <Tag>⏰ 5 épreuves</Tag>
                                            <Tag>🎯 Tous niveaux</Tag>
                                        </div>
                                    </div>
                                    <p
                                        style={{
                                            fontSize: 13,
                                            color: "#4b5563",
                                            lineHeight: 1.65,
                                            margin: 0,
                                        }}
                                    >
                                        Le challenge est la rencontre interne où
                                        nos cavaliers se confrontent (dans la
                                        bonne ambiance et le fair-play) sur 5
                                        épreuves (2 Dressage, 1 Hunter, 2
                                        Obstacle).
                                    </p>
                                    <ul
                                        style={{
                                            listStyle: "none",
                                            padding: 0,
                                            margin: 0,
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 5,
                                        }}
                                    >
                                        {[
                                            "Pour mettre un pied dans la compétition",
                                            "Convivialité garantie",
                                            "Repas entre les adhérents",
                                        ].map((o) => (
                                            <li
                                                key={o}
                                                style={{
                                                    display: "flex",
                                                    gap: 8,
                                                    fontSize: 13,
                                                    color: "#6b7280",
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        color: teal,
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    ›
                                                </span>
                                                {o}
                                            </li>
                                        ))}
                                    </ul>
                                    <div
                                        style={{
                                            padding: "12px 14px",
                                            borderRadius: 10,
                                            background: `rgba(94,180,174,0.07)`,
                                            border: `1px solid rgba(94,180,174,0.2)`,
                                            fontSize: 13,
                                            color: "#374151",
                                            lineHeight: 1.7,
                                            marginTop: "auto",
                                        }}
                                    >
                                        <strong>
                                            Du grand sport garanti !
                                        </strong>
                                        <br />
                                        <strong>Dates édition 2025 :</strong>
                                        <br />
                                        <u>Dressage</u> : 16/11 et 14/12 —{" "}
                                        <u>Hunter</u> : 18/01 — <u>Obstacle</u>{" "}
                                        : 15/02 et 22/03
                                    </div>
                                </div>
                            </div>

                            {/* Stages variés */}
                            <div
                                style={{
                                    background: "#fafbfb",
                                    borderRadius: 16,
                                    border: "1px solid #f0f0f0",
                                    overflow: "hidden",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <div
                                    style={{
                                        position: "relative",
                                        height: 180,
                                    }}
                                >
                                    <Image
                                        src="/images/Images-illustrations/stages.jpg"
                                        alt="Stages SHEVA"
                                        fill
                                        style={{ objectFit: "cover" }}
                                    />
                                </div>
                                <div
                                    style={{
                                        padding: "20px",
                                        flex: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 12,
                                    }}
                                >
                                    <div>
                                        <h3
                                            style={{
                                                fontSize: 17,
                                                fontWeight: 700,
                                                color: "rgb(15,23,42)",
                                                marginBottom: 8,
                                            }}
                                        >
                                            Stages variés
                                        </h3>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexWrap: "wrap",
                                                gap: 6,
                                            }}
                                        >
                                            <Tag>⏰ Week-end et vacances</Tag>
                                            <Tag>🎯 Tous niveaux</Tag>
                                        </div>
                                    </div>
                                    <p
                                        style={{
                                            fontSize: 13,
                                            color: "#4b5563",
                                            lineHeight: 1.65,
                                            margin: 0,
                                        }}
                                    >
                                        Tout au long de l'année, la SHEVA
                                        propose de nombreux stages et cours
                                        particuliers thématiques visant à vous
                                        perfectionner ou à découvrir de
                                        nouvelles activités.
                                    </p>
                                    <ul
                                        style={{
                                            listStyle: "none",
                                            padding: 0,
                                            margin: 0,
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 5,
                                        }}
                                    >
                                        {[
                                            "Cours Particuliers",
                                            "Stages de Perfectionnement",
                                            "Ethologie",
                                            "Stages thématiques",
                                            "Equicoaching",
                                        ].map((o) => (
                                            <li
                                                key={o}
                                                style={{
                                                    display: "flex",
                                                    gap: 8,
                                                    fontSize: 13,
                                                    color: "#6b7280",
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        color: teal,
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    ›
                                                </span>
                                                {o}
                                            </li>
                                        ))}
                                    </ul>
                                    <p
                                        style={{
                                            fontSize: 13,
                                            fontWeight: 700,
                                            color: tealDark,
                                            margin: "auto 0 0",
                                        }}
                                    >
                                        Un programme riche pour évoluer et
                                        s'épanouir !
                                    </p>
                                </div>
                            </div>

                            {/* Balades */}
                            <div
                                style={{
                                    background: "#fafbfb",
                                    borderRadius: 16,
                                    border: "1px solid #f0f0f0",
                                    overflow: "hidden",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <div
                                    style={{
                                        position: "relative",
                                        height: 180,
                                    }}
                                >
                                    <Image
                                        src="/images/Images-illustrations/sorties-act.jpeg"
                                        alt="Sorties extérieures"
                                        fill
                                        style={{ objectFit: "cover" }}
                                    />
                                </div>
                                <div
                                    style={{
                                        padding: "20px",
                                        flex: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 12,
                                    }}
                                >
                                    <div>
                                        <h3
                                            style={{
                                                fontSize: 17,
                                                fontWeight: 700,
                                                color: "rgb(15,23,42)",
                                                marginBottom: 8,
                                            }}
                                        >
                                            Balades et sorties extérieures
                                        </h3>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexWrap: "wrap",
                                                gap: 6,
                                            }}
                                        >
                                            <Tag>⏰ 1 à 5 jours</Tag>
                                            <Tag>🎯 Tous niveaux</Tag>
                                        </div>
                                    </div>
                                    <p
                                        style={{
                                            fontSize: 13,
                                            color: "#4b5563",
                                            lineHeight: 1.65,
                                            margin: 0,
                                        }}
                                    >
                                        Parce que l'équitation ce n'est pas que
                                        du manège, nous proposons régulièrement
                                        des sorties en extérieur avec vos
                                        chevaux.
                                    </p>
                                    <ul
                                        style={{
                                            listStyle: "none",
                                            padding: 0,
                                            margin: 0,
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 5,
                                        }}
                                    >
                                        {[
                                            "Balades en forêt",
                                            "Séjour en bord de mer",
                                        ].map((o) => (
                                            <li
                                                key={o}
                                                style={{
                                                    display: "flex",
                                                    gap: 8,
                                                    fontSize: 13,
                                                    color: "#6b7280",
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        color: teal,
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    ›
                                                </span>
                                                {o}
                                            </li>
                                        ))}
                                    </ul>
                                    <p
                                        style={{
                                            fontSize: 13,
                                            fontWeight: 700,
                                            color: tealDark,
                                            margin: "auto 0 0",
                                        }}
                                    >
                                        Pour s'évader !
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* ── Équicoaching banner ── */}
                        <div
                            style={{
                                marginTop: 40,
                                borderRadius: 20,
                                overflow: "hidden",
                                display: "grid",
                                background: `linear-gradient(135deg, ${teal}18, ${tealDark}12)`,
                                border: `1px solid rgba(94,180,174,0.25)`,
                            }}
                            className="grid-cols-1 md:[grid-template-columns:300px_1fr]"
                        >
                            <div
                                style={{ position: "relative", minHeight: 220 }}
                            >
                                <Image
                                    src="/images/equicoaching/IMG_5225.JPEG"
                                    alt="Équicoaching SHEVA"
                                    fill
                                    style={{ objectFit: "cover" }}
                                />
                            </div>
                            <div
                                style={{
                                    padding: "32px 36px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    gap: 14,
                                }}
                            >
                                <h3
                                    style={{
                                        fontSize: 22,
                                        fontWeight: 700,
                                        color: "rgb(15,23,42)",
                                        margin: 0,
                                    }}
                                >
                                    Équicoaching
                                </h3>
                                <p
                                    style={{
                                        fontSize: 14,
                                        color: "#4b5563",
                                        lineHeight: 1.7,
                                        margin: 0,
                                    }}
                                >
                                    Découvrez une approche unique de
                                    développement personnel accompagné par le
                                    cheval. L'équicoaching vous permet de
                                    travailler sur la confiance en soi, le
                                    leadership et la gestion des émotions grâce
                                    à la relation authentique avec l'animal.
                                </p>
                                <Link
                                    href="/equicoaching"
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 8,
                                        padding: "10px 22px",
                                        borderRadius: 10,
                                        background: `linear-gradient(135deg, ${teal}, ${tealDark})`,
                                        color: "white",
                                        fontWeight: 700,
                                        fontSize: 14,
                                        textDecoration: "none",
                                        width: "fit-content",
                                    }}
                                >
                                    Découvrir l'équicoaching →
                                </Link>
                            </div>
                        </div>

                        {/* ── CTA ── */}
                        <div
                            style={{
                                marginTop: 40,
                                textAlign: "center",
                                padding: "40px 32px",
                                borderRadius: 20,
                                background: `linear-gradient(135deg, ${teal} 0%, ${tealDark} 100%)`,
                            }}
                        >
                            <h3
                                style={{
                                    fontSize: 22,
                                    fontWeight: 700,
                                    color: "white",
                                    marginBottom: 10,
                                }}
                            >
                                Ces activités vous intéressent ?
                            </h3>
                            <p
                                style={{
                                    fontSize: 14,
                                    color: "rgba(255,255,255,0.85)",
                                    marginBottom: 24,
                                }}
                            >
                                Vous pouvez vous y inscrire via votre espace
                                personnel. Activités réservées aux adhérents.
                            </p>
                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 12,
                                    justifyContent: "center",
                                }}
                            >
                                <a
                                    href="https://cloud6.kavalog.fr/SHEVA/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        padding: "12px 28px",
                                        borderRadius: 10,
                                        background: "white",
                                        color: tealDark,
                                        fontWeight: 700,
                                        fontSize: 14,
                                        textDecoration: "none",
                                    }}
                                >
                                    Mon Compte
                                </a>
                                <Link
                                    href="/infos#contact"
                                    style={{
                                        padding: "12px 28px",
                                        borderRadius: 10,
                                        background: "rgba(255,255,255,0.15)",
                                        border: "1px solid rgba(255,255,255,0.35)",
                                        color: "white",
                                        fontWeight: 700,
                                        fontSize: 14,
                                        textDecoration: "none",
                                    }}
                                >
                                    Demander des infos
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
