"use client";

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { assetPath } from "@/lib/assetPath";

// ─── BRAND ────────────────────────────────────────────────────────────────────
const teal = "rgb(94,180,174)";
const tealDark = "rgb(69,144,150)";

// ─── DONNÉES — RETRAITÉS ───────────────────────────────────────────────────────
const RETRAITES = [
    {
        nom: "Tess de l'Orgère",
        surnom: null,
        naissance: "26/05/2007",
        photo: "/images/chevaux/tess.avif",
        bio: "Tess a débuté parmi la cavalerie confirmée. Une boiterie pendant l'hiver 2014 l'oblige à réduire son activité. Elle reprend le travail dans les reprises de niveau intermédiaire et l'équipe compétition club. C'est une jument sensible et intelligente mais elle n'apprécie pas énormément ses congénères et leur fait bien comprendre par ses oreilles couchées dès que l'un d'eux se rapproche un peu trop pendant les cours. Ses qualités ont su toucher Manon (qui a fait 3 ans de compétition avec Tess), Andréa (qui s'en est beaucoup occupée pendant le confinement) et Sandrine (qui la montait tous les mardis soir avec Lionel). Elles ont maintenant le bonheur de la bichonner autant qu'elles le veulent dans un grand pré du 77.",
    },
    {
        nom: "Poésie des Joncs",
        surnom: "Popo",
        naissance: "28/05/2003",
        photo: "/images/chevaux/poesie.jpeg",
        bio: "Popo de son petit nom est arrivée toute bébé à la SHEVA et a commencé la compétition en amateur et en club. C'est la jument la plus gentille qu'il soit. Tous les cavaliers se battaient pour la monter. Ces dernières années elle faisait le bonheur des petits galops. Elle a pourtant un point faible : son instinct grégaire et ce besoin incompressible d'être avec les copains… Et des nouveaux copains Poésie s'en est fait plein depuis qu'elle a commencé sa nouvelle vie de retraitée. Camille, sa toute première cavalière de compétition, veille désormais sur elle du côté de Belfort !",
    },
    {
        nom: "Teckila d'Oz",
        surnom: "Teck-Teck",
        naissance: "28/04/2007",
        photo: "/images/chevaux/teckila.avif",
        bio: "Alias Teck-Teck… Cette belle jument Selle Français a marqué l'histoire de notre club. D'abord par sa longue et belle carrière de compétitrice en amateur et en club qui lui a permis d'être plusieurs fois classée. Et puis ceux qui la connaissent bien savent que cette jument a un sacré caractère : quand elle a décidé de ne pas travailler, difficile de la mettre au boulot… au risque de se retrouver par terre !! Mais ses problèmes de tendons ont mis un terme à sa carrière. Elle fait désormais le plus grand bonheur d'Helka, une de ses cavalières de compétition. Grâce à elle, Teck-Teck coule des jours heureux dans les verts et jolis pâturages de la campagne normande…",
    },
    {
        nom: "Telma des Plaines",
        surnom: "Telmouche",
        naissance: "20/05/2007",
        photo: "/images/chevaux/telma.avif",
        bio: "Telmouche, c'est aussi comme cela que l'appellent ses fervents supporters, est arrivée en 2013 à la SHEVA à 6 ans. Reconnue pour ses allures incroyables, la belle Telma est aussi célèbre pour ses « coups d'épaule » qui ont marqué bien des cavaliers… Elle a aussi marqué l'histoire de la SHEVA par une carrière en compétition plus qu'honorable. Elle a commencé avec les G7 puis elle a intégré l'équipe Amateurs. Une vraie championne ! Elle profite désormais d'une belle retraite au côté de Cécile où elle découvre les joies des balades sans aucun « coup d'épaule ».",
    },
    {
        nom: "Capucine Dubois Maréchal",
        surnom: "Capu",
        naissance: "2002",
        photo: "/images/poneys/capucine.avif",
        bio: "La petite Capu, c'est simple tout le monde l'aime même si on pense qu'elle est croisée sanglier ! Quand elle a un truc en tête, elle y va tête baissée et rien ne peut l'arrêter ! Mais ce caractère bien trempé ne l'empêche pas d'être la plus douce, la plus chouette des ponettes ! Une assurance tout risque, laissez-lui un baby sur le dos, aucun souci elle gère ! Après avoir fait le bonheur des petits cavaliers, elle est maintenant dans le Perche où elle a retrouvé son pote de toujours l'inoubliable Tigroo ! Tous les deux coulent des jours heureux grâce à Anouck qui veille désormais sur eux.",
    },
    {
        nom: "Vasco des Chesnais",
        surnom: "Vasquito",
        naissance: "28/03/2009",
        photo: "/images/chevaux/vasco.avif",
        bio: "Ses aficionados l'appellent Vasquito ! Un magnifique Selle Français arrivé à 4 ans à la SHEVA. De Vasco on a l'image du bon pépère qu'il faut toujours pousser mais il a eu une belle carrière de compétiteur. Et c'est d'ailleurs avec Carmen, une de ses cavalières de compèt qu'une tendre histoire commence… Dorothée, la mère de Carmen ainsi que sa sœur Paloma craqueront à leur tour. Toutes les trois étaient dans les starting-blocks pour lui offrir la plus belle et douce des retraites. Aujourd'hui pas un jour sans qu'elles ne viennent le câliner dans son nouveau pré au Bois Breton.",
    },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function ApreshevaClient() {
    return (
        <>
            <Nav />

            <main style={{ paddingTop: 64 }}>
                {/* ── HERO ── */}
                <section
                    style={{
                        background: `linear-gradient(135deg, ${teal} 0%, ${tealDark} 100%)`,
                        padding: "72px 24px 56px",
                        textAlign: "center",
                    }}
                >
                    {/* Breadcrumb */}
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
                        <Link
                            href="/chevaux"
                            style={{
                                color: "rgba(255,255,255,0.7)",
                                textDecoration: "none",
                            }}
                        >
                            Chevaux &amp; Poneys
                        </Link>
                        <span>›</span>
                        <span style={{ color: "white", fontWeight: 600 }}>
                            L&apos;Après SHEVA
                        </span>
                    </div>

                    {/* Logo */}
                    <div
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: "50%",
                            overflow: "hidden",
                            margin: "0 auto 24px",
                            border: "3px solid rgba(255,255,255,0.3)",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                        }}
                    >
                        <Image
                            src={assetPath("/images/logos/apressheva.jpeg")}
                            alt="Logo L'Après SHEVA"
                            width={100}
                            height={100}
                            style={{
                                objectFit: "cover",
                                width: "100%",
                                height: "100%",
                            }}
                        />
                    </div>

                    <h1
                        style={{
                            fontSize: "clamp(28px, 5vw, 40px)",
                            fontWeight: 700,
                            color: "white",
                            marginBottom: 16,
                            lineHeight: 1.2,
                        }}
                    >
                        Nos Chevaux &amp; Poneys à la Retraite
                    </h1>
                    <p
                        style={{
                            fontSize: 17,
                            color: "rgba(255,255,255,0.85)",
                            maxWidth: 600,
                            margin: "0 auto 32px",
                            lineHeight: 1.6,
                        }}
                    >
                        Ils ont fait la SHEVA. Découvrez les retraités qui
                        coulent désormais de belles journées bien méritées.
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
                        {RETRAITES.map((r) => (
                            <a
                                key={r.nom}
                                href={`#${r.nom.split(" ")[0].toLowerCase()}`}
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
                                {r.surnom ?? r.nom.split(" ")[0]}
                            </a>
                        ))}
                    </div>
                </section>

                {/* ── INTRO L'APRÈS SHEVA ── */}
                <section style={{ background: "white", padding: "48px 24px" }}>
                    <div
                        style={{
                            maxWidth: 760,
                            margin: "0 auto",
                            textAlign: "center",
                        }}
                    >
                        <p
                            style={{
                                fontSize: 11,
                                fontWeight: 700,
                                letterSpacing: "0.12em",
                                textTransform: "uppercase" as const,
                                color: teal,
                                marginBottom: 12,
                            }}
                        >
                            Association
                        </p>
                        <h2
                            style={{
                                fontSize: 26,
                                fontWeight: 800,
                                color: "#111827",
                                marginBottom: 8,
                            }}
                        >
                            L&apos;Après SHEVA
                        </h2>
                        <div
                            style={{
                                width: 48,
                                height: 3,
                                background: teal,
                                borderRadius: 2,
                                margin: "0 auto 24px",
                            }}
                        />
                        <p
                            style={{
                                fontSize: 15,
                                color: "#4b5563",
                                lineHeight: 1.75,
                                marginBottom: 16,
                            }}
                        >
                            L&apos;Après Sheva est une association créée par des{" "}
                            <strong>cavaliers du centre équestre</strong>, dont
                            toutes les actions sont menées en concertation avec
                            l&apos;équipe enseignante et le bureau de la SHEVA.
                            Sa mission : trouver les meilleures personnes
                            capables d&apos;assurer une belle retraite à nos
                            chevaux et poneys, et veiller à leur bien-être tout
                            au long de leur carrière.
                        </p>
                        <div
                            style={{
                                display: "flex",
                                gap: 12,
                                justifyContent: "center",
                                flexWrap: "wrap",
                                marginTop: 28,
                            }}
                        >
                            <Link
                                href="/chevaux#apres-sheva"
                                style={{
                                    padding: "10px 22px",
                                    borderRadius: 8,
                                    background: `linear-gradient(135deg, ${teal}, ${tealDark})`,
                                    color: "white",
                                    fontWeight: 700,
                                    fontSize: 14,
                                    textDecoration: "none",
                                }}
                            >
                                En savoir plus sur l&apos;association
                            </Link>
                            <a
                                href="https://www.instagram.com/l.apres.sheva"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    padding: "10px 22px",
                                    borderRadius: 8,
                                    background: "white",
                                    border: `1px solid rgba(94,180,174,0.4)`,
                                    color: tealDark,
                                    fontWeight: 700,
                                    fontSize: 14,
                                    textDecoration: "none",
                                }}
                            >
                                📸 Instagram
                            </a>
                        </div>
                    </div>
                </section>

                {/* ── RETRAITÉS ── */}
                <section
                    style={{ background: "#f8fafc", padding: "56px 24px 72px" }}
                >
                    <div style={{ maxWidth: 900, margin: "0 auto" }}>
                        <div
                            style={{
                                textAlign: "center",
                                marginBottom: 48,
                            }}
                        >
                            <p
                                style={{
                                    fontSize: 11,
                                    fontWeight: 700,
                                    letterSpacing: "0.12em",
                                    textTransform: "uppercase" as const,
                                    color: teal,
                                    marginBottom: 10,
                                }}
                            >
                                2025
                            </p>
                            <h2
                                style={{
                                    fontSize: 26,
                                    fontWeight: 800,
                                    color: "#111827",
                                    marginBottom: 0,
                                }}
                            >
                                Les Retraités
                            </h2>
                            <div
                                style={{
                                    width: 48,
                                    height: 3,
                                    background: teal,
                                    borderRadius: 2,
                                    margin: "12px auto 0",
                                }}
                            />
                        </div>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(2, 1fr)",
                                gap: 28,
                            }}
                            className="apres-grid"
                        >
                            {RETRAITES.map((r) => (
                                <div
                                    key={r.nom}
                                    id={r.nom.split(" ")[0].toLowerCase()}
                                    style={{
                                        background: "white",
                                        borderRadius: 16,
                                        border: "1px solid #e5e7eb",
                                        overflow: "hidden",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    {/* Photo 16:9 */}
                                    <div
                                        style={{
                                            position: "relative",
                                            aspectRatio: "16/9",
                                            background: "#f0f0f0",
                                        }}
                                    >
                                        <Image
                                            src={assetPath(r.photo)}
                                            alt={r.nom}
                                            fill
                                            style={{
                                                objectFit: "cover",
                                                objectPosition: "center top",
                                            }}
                                            sizes="(max-width: 640px) 100vw, 450px"
                                        />
                                    </div>

                                    {/* Infos */}
                                    <div
                                        style={{
                                            padding: "22px 24px 24px",
                                            flex: 1,
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "baseline",
                                                gap: 10,
                                                marginBottom: 4,
                                                flexWrap: "wrap",
                                            }}
                                        >
                                            <h3
                                                style={{
                                                    fontSize: 18,
                                                    fontWeight: 800,
                                                    color: "#111827",
                                                    margin: 0,
                                                }}
                                            >
                                                {r.nom}
                                            </h3>
                                            {r.surnom && (
                                                <span
                                                    style={{
                                                        fontSize: 12,
                                                        fontWeight: 600,
                                                        color: tealDark,
                                                        background: `rgba(94,180,174,0.1)`,
                                                        padding: "2px 10px",
                                                        borderRadius: 20,
                                                        border: `1px solid rgba(94,180,174,0.25)`,
                                                    }}
                                                >
                                                    {r.surnom}
                                                </span>
                                            )}
                                        </div>
                                        <p
                                            style={{
                                                fontSize: 12,
                                                color: "#9ca3af",
                                                marginBottom: 14,
                                            }}
                                        >
                                            🎂 {r.naissance}
                                        </p>
                                        <p
                                            style={{
                                                fontSize: 14,
                                                color: "#4b5563",
                                                lineHeight: 1.75,
                                                margin: 0,
                                            }}
                                        >
                                            {r.bio}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <style>{`
                @media (max-width: 640px) {
                    .apres-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
            <Footer />
        </>
    );
}
