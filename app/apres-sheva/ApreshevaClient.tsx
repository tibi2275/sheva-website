"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { assetPath } from "@/lib/assetPath";

import { teal, tealDark } from "@/lib/theme";

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
        photo: "/images/chevaux/poesie.jpg",
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
        nom: "Qavaletti du Brèche",
        photo: "/images/chevaux/qavaleti.avif",
        surnom: "Petit poney",
        naissance: "2004",
        bio: "Qavaletti rejoint les rangs de la SHEVA au printemps 2008. Après quelques mois de travail avec Cédric, il a intégré l'équipe compétition amateur puis club, il est maintenant moins sollicité et fait les cours intermédiaires et débutants. Très bien dressé et bon sauteur. Surnommé \"Petit poney\" pour sa bouille de bébé qu'il a toujours gardée, c'est un cheval calme et câlin au box.",
    },
    {
        nom: "Vasco des Chesnais",
        surnom: "Vasquito",
        naissance: "28/03/2009",
        photo: "/images/chevaux/vasco.avif",
        bio: "Ses aficionados l'appellent Vasquito ! Un magnifique Selle Français arrivé à 4 ans à la SHEVA. De Vasco on a l'image du bon pépère qu'il faut toujours pousser mais il a eu une belle carrière de compétiteur. Et c'est d'ailleurs avec Carmen, une de ses cavalières de compèt qu'une tendre histoire commence… Dorothée, la mère de Carmen ainsi que sa sœur Paloma craqueront à leur tour. Toutes les trois étaient dans les starting-blocks pour lui offrir la plus belle et douce des retraites. Aujourd'hui pas un jour sans qu'elles ne viennent le câliner dans son nouveau pré au Bois Breton.",
    },
];

type Retraite = (typeof RETRAITES)[number];

const N = RETRAITES.length;
const STEP_DEG = 360 / N;

const slugOf = (r: Retraite) =>
    r.nom.split(" ")[0].toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

const ageOf = (naissance: string) => {
    const year = parseInt(naissance.slice(-4), 10);
    return Number.isFinite(year) ? new Date().getFullYear() - year : null;
};

const pad = (n: number) => String(n).padStart(2, "0");

// ─── PHOTO ADAPTATIVE ─────────────────────────────────────────────────────────
// La photo est affichée EN ENTIER (object-fit: contain), quel que soit son
// format. L'espace restant est rempli par une version floutée de la même
// photo : aucun recadrage à faire à la main quand on ajoute un cheval.
function AdaptivePhoto({
    src,
    alt,
    sizes,
    priority = false,
}: {
    src: string;
    alt: string;
    sizes: string;
    priority?: boolean;
}) {
    return (
        <div className="as-photo">
            <Image
                src={assetPath(src)}
                alt=""
                aria-hidden
                fill
                sizes={sizes}
                className="as-photo-bg"
            />
            <Image
                src={assetPath(src)}
                alt={alt}
                fill
                sizes={sizes}
                priority={priority}
                className="as-photo-fg"
            />
        </div>
    );
}

// ─── MODALE « LIRE SON HISTOIRE » ─────────────────────────────────────────────
function StoryModal({ r, onClose }: { r: Retraite; onClose: () => void }) {
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener("keydown", onKey);
        };
    }, [onClose]);

    return (
        <div
            className="as-modal-backdrop"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={r.nom}
        >
            <div className="as-modal" onClick={(e) => e.stopPropagation()}>
                <button
                    className="as-modal-close"
                    onClick={onClose}
                    aria-label="Fermer"
                >
                    ×
                </button>
                <div className="as-modal-photo">
                    <AdaptivePhoto
                        src={r.photo}
                        alt={r.nom}
                        sizes="(max-width: 700px) 100vw, 640px"
                    />
                </div>
                <div style={{ padding: "22px 26px 28px" }}>
                    <HorseHeader r={r} />
                    <p className="as-bio" style={{ marginTop: 14 }}>
                        {r.bio}
                    </p>
                </div>
            </div>
        </div>
    );
}

function HorseHeader({ r }: { r: Retraite }) {
    const age = ageOf(r.naissance);
    return (
        <>
            <div className="as-name-row">
                <h3 className="as-name">{r.nom}</h3>
                {r.surnom && <span className="as-badge">{r.surnom}</span>}
            </div>
            <p className="as-birth" suppressHydrationWarning>
                🎂 {r.naissance}
                {age !== null && <> · {age} ans</>}
            </p>
        </>
    );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function ApreshevaClient() {
    const sectionRef = useRef<HTMLElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const progressRef = useRef<HTMLDivElement>(null);
    const hintRef = useRef<HTMLDivElement>(null);
    const bioRef = useRef<HTMLParagraphElement>(null);

    const [active, setActive] = useState(0);
    const [reduced, setReduced] = useState(false);
    const [modal, setModal] = useState<Retraite | null>(null);
    const [clamped, setClamped] = useState(false);

    // Préférence « réduire les animations » → affichage en grille simple
    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => setReduced(mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);

    // Carrousel 3D piloté par le scroll
    useEffect(() => {
        if (reduced) return;
        const section = sectionRef.current;
        const stage = stageRef.current;
        const ring = ringRef.current;
        if (!section || !stage || !ring) return;

        let radius = 400;
        let target = 0;
        let current = 0;
        let raf = 0;

        const apply = (p: number) => {
            ring.style.transform = `translateZ(${-radius}px) rotateY(${-p * STEP_DEG}deg)`;
            cardRefs.current.forEach((card, i) => {
                if (!card) return;
                let d = (i - p) * STEP_DEG;
                d = ((((d + 180) % 360) + 360) % 360) - 180; // → [-180, 180]
                const dist = Math.abs(d);
                card.style.transform = `rotateY(${i * STEP_DEG}deg) translateZ(${radius}px)`;
                card.style.opacity = String(Math.max(0, 1 - dist / 115));
                card.style.filter = `saturate(${Math.max(0.35, 1 - dist / 90)})`;
                card.style.pointerEvents = dist < 70 ? "auto" : "none";
            });
            if (progressRef.current)
                progressRef.current.style.transform = `scaleX(${N > 1 ? p / (N - 1) : 1})`;
            if (hintRef.current)
                hintRef.current.style.opacity = String(Math.max(0, 1 - p * 3));
            setActive(Math.round(p));
        };

        const measure = () => {
            const rect = section.getBoundingClientRect();
            const range = section.offsetHeight - stage.offsetHeight;
            const t =
                range > 0 ? Math.min(1, Math.max(0, -rect.top / range)) : 0;
            target = t * (N - 1);
        };

        const tick = () => {
            current += (target - current) * 0.16;
            if (Math.abs(target - current) < 0.001) current = target;
            apply(current);
            raf = current !== target ? requestAnimationFrame(tick) : 0;
        };

        const onScroll = () => {
            measure();
            if (!raf) raf = requestAnimationFrame(tick);
        };

        const onResize = () => {
            const w = cardRefs.current[0]?.offsetWidth ?? 380;
            radius = w / (2 * Math.tan(Math.PI / N)) + w * 0.12;
            measure();
            current = target;
            apply(current);
        };

        onResize();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
            cancelAnimationFrame(raf);
        };
    }, [reduced]);

    // Le texte est-il tronqué ? (affiche le bouton « Lire son histoire »)
    useEffect(() => {
        const el = bioRef.current;
        if (!el) return;
        const check = () => setClamped(el.scrollHeight > el.clientHeight + 2);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, [active, reduced]);

    // Aller à un cheval donné (chips du hero, points, flèches, clic carte)
    const goTo = useCallback(
        (i: number) => {
            const idx = Math.max(0, Math.min(N - 1, i));
            if (reduced) {
                document
                    .getElementById(slugOf(RETRAITES[idx]))
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                return;
            }
            const section = sectionRef.current;
            const stage = stageRef.current;
            if (!section || !stage) return;
            const top = section.getBoundingClientRect().top + window.scrollY;
            const range = section.offsetHeight - stage.offsetHeight;
            window.scrollTo({
                top: top + (N > 1 ? (idx / (N - 1)) * range : 0) + 1,
                behavior: "smooth",
            });
        },
        [reduced],
    );

    const current = RETRAITES[active];

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
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <div className="as-hero-glow" aria-hidden />

                    {/* Breadcrumb */}
                    <div className="as-breadcrumb">
                        <Link href="/">Accueil</Link>
                        <span>›</span>
                        <Link href="/chevaux">Chevaux &amp; Poneys</Link>
                        <span>›</span>
                        <span style={{ color: "white", fontWeight: 600 }}>
                            L&apos;Après SHEVA
                        </span>
                    </div>

                    {/* Logo */}
                    <div className="as-hero-logo">
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
                            position: "relative",
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
                            position: "relative",
                        }}
                    >
                        Ils ont fait la SHEVA. Découvrez les retraités qui
                        coulent désormais de belles journées bien méritées.
                    </p>

                    {/* Quick nav */}
                    <div className="as-chips">
                        {RETRAITES.map((r, i) => (
                            <a
                                key={r.nom}
                                href={`#${slugOf(r)}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    goTo(i);
                                }}
                                className="as-chip"
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
                        <p className="as-eyebrow">Association</p>
                        <h2 className="as-h2">L&apos;Après SHEVA</h2>
                        <div className="as-rule" />
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
                                className="as-btn as-btn-primary"
                            >
                                En savoir plus sur l&apos;association
                            </Link>
                            <a
                                href="https://www.instagram.com/l.apres.sheva"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="as-btn as-btn-ghost"
                            >
                                📸 Instagram
                            </a>
                        </div>
                    </div>
                </section>

                {/* ── EN-TÊTE RETRAITÉS ── */}
                <div
                    style={{
                        background: "#f8fafc",
                        padding: "56px 24px 8px",
                        textAlign: "center",
                    }}
                >
                    <p className="as-eyebrow"></p>
                    <h2 className="as-h2">Les Retraités</h2>
                    <div className="as-rule" style={{ marginBottom: 0 }} />
                </div>

                {reduced ? (
                    /* ── VERSION STATIQUE (animations réduites) ── */
                    <section
                        style={{
                            background: "#f8fafc",
                            padding: "40px 24px 72px",
                        }}
                    >
                        <div className="as-grid">
                            {RETRAITES.map((r) => (
                                <article
                                    key={r.nom}
                                    id={slugOf(r)}
                                    className="as-grid-card"
                                >
                                    <div className="as-grid-photo">
                                        <AdaptivePhoto
                                            src={r.photo}
                                            alt={r.nom}
                                            sizes="(max-width: 640px) 100vw, 450px"
                                        />
                                    </div>
                                    <div style={{ padding: "22px 24px 24px" }}>
                                        <HorseHeader r={r} />
                                        <p
                                            className="as-bio"
                                            style={{ marginTop: 14 }}
                                        >
                                            {r.bio}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                ) : (
                    /* ── CARROUSEL 3D AU SCROLL ── */
                    <section
                        ref={sectionRef}
                        className="as-scroll"
                        style={{
                            height: `calc(${N - 1} * 70vh + 100svh - 64px)`,
                        }}
                        aria-label="Les retraités"
                    >
                        {/* Ancres pour les liens #tess, #poesie… */}
                        {RETRAITES.map((r, i) => (
                            <span
                                key={r.nom}
                                id={slugOf(r)}
                                className="as-anchor"
                                style={{ top: `${i * 70}vh` }}
                            />
                        ))}

                        <div ref={stageRef} className="as-stage">
                            <div className="as-stage-inner">
                                {/* Roue de photos */}
                                <div className="as-wheel-zone">
                                    <div className="as-floor" aria-hidden />
                                    <div className="as-perspective">
                                        <div ref={ringRef} className="as-ring">
                                            {RETRAITES.map((r, i) => (
                                                <button
                                                    key={r.nom}
                                                    ref={(el) => {
                                                        cardRefs.current[i] =
                                                            el;
                                                    }}
                                                    className={`as-card${i === active ? " is-active" : ""}`}
                                                    onClick={() =>
                                                        i === active
                                                            ? setModal(r)
                                                            : goTo(i)
                                                    }
                                                    aria-label={
                                                        i === active
                                                            ? `Lire l'histoire de ${r.nom}`
                                                            : `Voir ${r.nom}`
                                                    }
                                                    tabIndex={
                                                        i === active ? 0 : -1
                                                    }
                                                >
                                                    <div className="as-card-photo">
                                                        <AdaptivePhoto
                                                            src={r.photo}
                                                            alt={r.nom}
                                                            sizes="(max-width: 900px) 75vw, 420px"
                                                            priority={i < 2}
                                                        />
                                                    </div>
                                                    <div className="as-card-caption">
                                                        {r.surnom ??
                                                            r.nom.split(" ")[0]}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div ref={hintRef} className="as-hint">
                                        Faites défiler pour découvrir les
                                        retraités ↓
                                    </div>
                                </div>

                                {/* Fiche du cheval actif */}
                                <div className="as-info">
                                    <div className="as-counter">
                                        <span className="as-counter-now">
                                            {pad(active + 1)}
                                        </span>
                                        <span className="as-counter-total">
                                            / {pad(N)}
                                        </span>
                                        <div className="as-progress">
                                            <div
                                                ref={progressRef}
                                                className="as-progress-bar"
                                            />
                                        </div>
                                    </div>

                                    <div key={active} className="as-fade">
                                        <HorseHeader r={current} />
                                        <p
                                            ref={bioRef}
                                            className="as-bio as-bio-clamp"
                                        >
                                            {current.bio}
                                        </p>
                                        {clamped && (
                                            <button
                                                className="as-more"
                                                onClick={() =>
                                                    setModal(current)
                                                }
                                            >
                                                Lire son histoire →
                                            </button>
                                        )}
                                    </div>

                                    <div className="as-controls">
                                        <button
                                            className="as-arrow"
                                            onClick={() => goTo(active - 1)}
                                            disabled={active === 0}
                                            aria-label="Retraité précédent"
                                        >
                                            ←
                                        </button>
                                        <div className="as-dots">
                                            {RETRAITES.map((r, i) => (
                                                <button
                                                    key={r.nom}
                                                    className={`as-dot${i === active ? " is-active" : ""}`}
                                                    onClick={() => goTo(i)}
                                                    aria-label={r.nom}
                                                />
                                            ))}
                                        </div>
                                        <button
                                            className="as-arrow"
                                            onClick={() => goTo(active + 1)}
                                            disabled={active === N - 1}
                                            aria-label="Retraité suivant"
                                        >
                                            →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </main>

            {modal && <StoryModal r={modal} onClose={() => setModal(null)} />}

            <style>{`
                /* ── Hero ── */
                .as-hero-glow {
                    position: absolute; inset: -40% -10% auto auto;
                    width: 520px; height: 520px; border-radius: 50%;
                    background: radial-gradient(circle, rgba(255,255,255,0.18), transparent 65%);
                    pointer-events: none;
                }
                .as-breadcrumb {
                    position: relative;
                    display: flex; align-items: center; justify-content: center;
                    gap: 8px; margin-bottom: 20px; font-size: 13px;
                    color: rgba(255,255,255,0.7);
                }
                .as-breadcrumb a { color: rgba(255,255,255,0.7); text-decoration: none; }
                .as-breadcrumb a:hover { color: white; }
                .as-hero-logo {
                    position: relative;
                    width: 100px; height: 100px; border-radius: 50%; overflow: hidden;
                    margin: 0 auto 24px; border: 3px solid rgba(255,255,255,0.3);
                    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                }
                .as-chips { position: relative; display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; }
                .as-chip {
                    padding: 8px 18px; border-radius: 8px;
                    background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3);
                    color: white; font-size: 13px; font-weight: 600; text-decoration: none;
                    transition: background .2s, transform .2s;
                }
                .as-chip:hover { background: rgba(255,255,255,0.28); transform: translateY(-1px); }

                /* ── Titres & boutons ── */
                .as-eyebrow {
                    font-size: 11px; font-weight: 700; letter-spacing: .12em;
                    text-transform: uppercase; color: ${teal}; margin-bottom: 10px;
                }
                .as-h2 { font-size: 26px; font-weight: 800; color: #111827; margin: 0 0 8px; }
                .as-rule { width: 48px; height: 3px; background: ${teal}; border-radius: 2px; margin: 12px auto 24px; }
                .as-btn { padding: 10px 22px; border-radius: 8px; font-weight: 700; font-size: 14px; text-decoration: none; }
                .as-btn-primary { background: linear-gradient(135deg, ${teal}, ${tealDark}); color: white; }
                .as-btn-ghost { background: white; border: 1px solid rgba(94,180,174,0.4); color: ${tealDark}; }

                /* ── Photo adaptative ── */
                .as-photo { position: absolute; inset: 0; overflow: hidden; background: #e6f2f1; }
                .as-photo-bg {
                    object-fit: cover; filter: blur(24px) saturate(1.15);
                    transform: scale(1.2); opacity: .75;
                }
                .as-photo-fg { object-fit: contain; }

                /* ── Section scroll ── */
                .as-scroll { position: relative; background: #f8fafc; }
                .as-anchor { position: absolute; left: 0; width: 1px; height: 1px; scroll-margin-top: 64px; }
                .as-stage {
                    position: sticky; top: 64px;
                    height: calc(100svh - 64px);
                    overflow: hidden;
                    background:
                        radial-gradient(ellipse 60% 50% at 30% 55%, rgba(94,180,174,0.13), transparent 70%),
                        #f8fafc;
                }
                .as-stage-inner {
                    height: 100%; max-width: 1180px; margin: 0 auto; padding: 0 24px;
                    display: grid; grid-template-columns: 1.15fr 1fr; gap: 48px; align-items: center;
                }

                /* Roue */
                .as-wheel-zone {
                    position: relative; height: 100%; display: flex; align-items: center; justify-content: center;
                    -webkit-mask-image: linear-gradient(to right, transparent 0, #000 10%, #000 90%, transparent 100%);
                    mask-image: linear-gradient(to right, transparent 0, #000 10%, #000 90%, transparent 100%);
                }
                .as-perspective { perspective: 1400px; perspective-origin: 50% 45%; width: 100%; display: flex; justify-content: center; }
                .as-ring { position: relative; width: min(420px, 38vw); aspect-ratio: 3 / 2.45; transform-style: preserve-3d; }
                .as-floor {
                    position: absolute; left: 50%; top: 50%; width: min(620px, 60vw); height: 90px;
                    transform: translate(-50%, 150px); border-radius: 50%;
                    background: radial-gradient(ellipse, rgba(15,23,42,0.12), transparent 70%);
                }
                .as-card {
                    position: absolute; inset: 0; padding: 0; border: 0; cursor: pointer;
                    background: white; border-radius: 18px; overflow: hidden;
                    box-shadow: 0 10px 30px rgba(15,23,42,0.10), 0 1px 3px rgba(15,23,42,0.06);
                    backface-visibility: hidden; -webkit-backface-visibility: hidden;
                    display: flex; flex-direction: column; text-align: left;
                    font: inherit; will-change: transform, opacity;
                    outline-offset: 4px;
                }
                .as-card.is-active { box-shadow: 0 22px 50px rgba(69,144,150,0.28), 0 2px 6px rgba(15,23,42,0.08); }
                .as-card-photo { position: relative; flex: 1; }
                .as-card-caption {
                    padding: 12px 16px; font-size: 14px; font-weight: 700; color: #111827;
                    border-top: 1px solid #f0f0f0; display: flex; align-items: center; gap: 8px;
                }
                .as-card-caption::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: ${teal}; }
                .as-hint {
                    position: absolute; bottom: 28px; left: 0; right: 0; text-align: center;
                    font-size: 13px; color: #6b7280; animation: as-bounce 2s ease-in-out infinite;
                }

                /* Fiche */
                .as-info { position: relative; z-index: 2; display: flex; flex-direction: column; gap: 18px; max-height: 100%; padding: 32px 0; }
                .as-counter { display: flex; align-items: baseline; gap: 8px; }
                .as-counter-now { font-size: 44px; font-weight: 800; color: ${teal}; line-height: 1; font-variant-numeric: tabular-nums; }
                .as-counter-total { font-size: 16px; font-weight: 600; color: #9ca3af; }
                .as-progress { flex: 1; height: 3px; background: #e5e7eb; border-radius: 2px; margin-left: 12px; overflow: hidden; align-self: center; }
                .as-progress-bar { height: 100%; background: linear-gradient(90deg, ${teal}, ${tealDark}); transform-origin: left; transform: scaleX(0); }
                .as-name-row { display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; margin-bottom: 4px; }
                .as-name { font-size: clamp(20px, 2.4vw, 28px); font-weight: 800; color: #111827; margin: 0; line-height: 1.2; }
                .as-badge {
                    font-size: 12px; font-weight: 600; color: ${tealDark};
                    background: rgba(94,180,174,0.1); padding: 2px 10px; border-radius: 20px;
                    border: 1px solid rgba(94,180,174,0.25); white-space: nowrap;
                }
                .as-birth { font-size: 13px; color: #9ca3af; margin: 0; }
                .as-bio { font-size: 15px; color: #4b5563; line-height: 1.75; margin: 14px 0 0; }
                .as-bio-clamp { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 11; overflow: hidden; }
                .as-more {
                    margin-top: 10px; padding: 0; border: 0; background: none; cursor: pointer;
                    color: ${tealDark}; font-weight: 700; font-size: 14px; font-family: inherit;
                }
                .as-more:hover { text-decoration: underline; }
                .as-fade { animation: as-fade-up .5s cubic-bezier(.2,.7,.2,1); }
                .as-controls { display: flex; align-items: center; gap: 16px; }
                .as-arrow {
                    width: 40px; height: 40px; border-radius: 50%; border: 1px solid rgba(94,180,174,0.4);
                    background: white; color: ${tealDark}; font-size: 16px; cursor: pointer;
                    transition: background .2s, color .2s;
                }
                .as-arrow:hover:not(:disabled) { background: ${teal}; color: white; }
                .as-arrow:disabled { opacity: .35; cursor: default; }
                .as-dots { display: flex; gap: 8px; }
                .as-dot { width: 8px; height: 8px; border-radius: 4px; border: 0; padding: 0; background: #d1d5db; cursor: pointer; transition: width .3s, background .3s; }
                .as-dot.is-active { width: 24px; background: ${teal}; }

                /* Modale */
                .as-modal-backdrop {
                    position: fixed; inset: 0; z-index: 300; background: rgba(15,23,42,0.55);
                    display: flex; align-items: center; justify-content: center; padding: 16px;
                    animation: as-fade-in .2s ease;
                }
                .as-modal {
                    position: relative; background: white; border-radius: 18px; overflow: hidden;
                    width: 100%; max-width: 640px; max-height: calc(100svh - 32px); overflow-y: auto;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.3); animation: as-fade-up .3s ease;
                }
                .as-modal-photo { position: relative; aspect-ratio: 16 / 9; }
                .as-modal-close {
                    position: absolute; top: 12px; right: 12px; z-index: 2; width: 36px; height: 36px;
                    border-radius: 50%; border: 0; background: rgba(255,255,255,0.92); font-size: 22px;
                    line-height: 1; cursor: pointer; color: #111827; box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                }

                /* Grille statique */
                .as-grid { max-width: 900px; margin: 0 auto; display: grid; grid-template-columns: repeat(2, 1fr); gap: 28px; }
                .as-grid-card { background: white; border-radius: 16px; border: 1px solid #e5e7eb; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.04); scroll-margin-top: 80px; }
                .as-grid-photo { position: relative; aspect-ratio: 16 / 9; }

                @keyframes as-fade-up { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
                @keyframes as-fade-in { from { opacity: 0; } to { opacity: 1; } }
                @keyframes as-bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(5px); } }

                /* Écrans peu hauts */
                @media (max-height: 760px) and (min-width: 901px) {
                    .as-bio-clamp { -webkit-line-clamp: 7; }
                    .as-counter-now { font-size: 34px; }
                }

                /* Barre de navigation mobile (lg:hidden → < 1024px) */
                @media (max-width: 1023px) {
                    .as-stage { box-sizing: border-box; padding-bottom: 60px; }
                }

                /* ── Mobile / tablette ── */
                @media (max-width: 900px) {
                    .as-stage-inner {
                        grid-template-columns: 1fr; grid-template-rows: 46% 54%;
                        gap: 0; padding: 0 20px; align-items: stretch;
                    }
                    .as-ring { width: min(360px, 68vw); }
                    .as-perspective { perspective: 1000px; }
                    .as-floor { width: 80vw; transform: translate(-50%, 90px); }
                    .as-hint { bottom: 4px; font-size: 12px; }
                    .as-info { padding: 8px 0 20px; gap: 12px; justify-content: flex-start; }
                    .as-counter-now { font-size: 28px; }
                    .as-bio { font-size: 14px; line-height: 1.65; }
                    .as-bio-clamp { -webkit-line-clamp: 6; }
                    .as-controls { margin-top: auto; justify-content: center; }
                }
                @media (max-width: 640px) {
                    .as-grid { grid-template-columns: 1fr; }
                }
                @media (max-width: 380px), (max-height: 640px) and (max-width: 900px) {
                    .as-bio-clamp { -webkit-line-clamp: 4; }
                }
            `}</style>
            <Footer />
        </>
    );
}
