"use client";

import { Nav } from "@/components/Nav";
import Link from "next/link";
import Image from "next/image";
import { assetPath } from "@/lib/assetPath";
import { useState } from "react";
import { Footer } from "@/components/Footer";

// ─── BRAND ────────────────────────────────────────────────────────────────────
const teal = "rgb(94,180,174)";
const tealDark = "rgb(69,144,150)";

// ─── FAQ DATA ─────────────────────────────────────────────────────────────────
const FAQ_SECTIONS = [
    {
        id: "niveaux",
        icon: "🎯",
        title: "Pour les nouveaux : Choisir son niveau",
        items: [
            {
                q: "Comment évaluer mon niveau d'équitation et la reprise à laquelle s'inscrire ?",
                a: (
                    <>
                        Utilisez nos fiches d&apos;auto-évaluation disponibles
                        ci-dessous. Les niveaux Galop indiqués dans nos cours
                        correspondent au niveau <strong>acquis</strong>, pas au
                        niveau que vous préparez. En cas de doute, nous
                        recommandons fortement de faire une séance d&apos;essai
                        pour une évaluation précise avec nos enseignants.
                        <br />
                        Les séances d&apos;essai ont lieu une fois par an au
                        mois de mai.
                        <br />
                        <br />
                        <a
                            href={assetPath("/PDF_docs/fiche_niveau_poney.pdf")}
                            className="faq-link"
                        >
                            📄 Fiche de niveau Poney
                        </a>
                        <br />
                        <a
                            href={assetPath("/PDF_docs/fiche_niveau_cheval.pdf")}
                            className="faq-link"
                        >
                            📄 Fiche de niveau Cheval
                        </a>
                    </>
                ),
            },
            {
                q: "Puis-je changer de niveau en cours d'année ?",
                a: "Le choix du niveau d'inscription engage votre responsabilité. Aucun remboursement n'est possible en cas de niveau inadapté. Il est donc crucial de bien s'auto-évaluer ou de faire une séance d'essai avant l'inscription définitive.",
            },
            {
                q: "La séance d'essai est-elle obligatoire ?",
                a: "La séance d'essai est facultative mais fortement recommandée pour les cavaliers non-débutants. Elle permet d'évaluer précisément votre niveau et vous donne une priorité lors des inscriptions définitives pour choisir votre créneau.",
            },
            {
                q: "Comment s'inscrire à la séance d'essai ?",
                a: (
                    <>
                        Les séances d&apos;essai ont lieu en général au mois de
                        mai. L&apos;inscription se fait depuis votre{" "}
                        <a
                            href="https://cloud6.kavalog.fr/SHEVA/"
                            className="faq-link"
                        >
                            Espace Personnel
                        </a>
                        , quelques jours avant la séance d&apos;essai.
                    </>
                ),
            },
        ],
    },
    {
        id: "fonctionnement",
        icon: "📅",
        title: "Fonctionnement du club : Forfaits, reprises, annulations, vacances",
        items: [
            {
                q: "Quand ont lieu les inscriptions ?",
                a: (
                    <>
                        Chaque année, les inscriptions ont lieu à partir du mois
                        de mai. Les inscriptions ouvrent en priorité aux
                        adhérents de la SHEVA, puis aux nouveaux cavaliers.
                        Consultez la rubrique{" "}
                        <Link href="/infos#inscriptions" className="faq-link">
                            Inscriptions
                        </Link>{" "}
                        pour les détails.
                    </>
                ),
            },
            {
                q: "Quel est le coût annuel de mon forfait ?",
                a: (
                    <>
                        Le détail des tarifs est disponible sur la page{" "}
                        <Link href="/planning#tarifs" className="faq-link">
                            Tarifs
                        </Link>
                        . Vous pouvez utiliser le simulateur pour évaluer votre
                        coût annuel en fonction de votre niveau et forfait.
                    </>
                ),
            },
            {
                q: "Combien de cours sont inclus dans un forfait ?",
                a: (
                    <>
                        Un forfait annuel comprend <strong>39 reprises</strong>{" "}
                        avec 6 reprises supplémentaires pour les vacances
                        scolaires (hors Toussaint, et sauf pour les niveaux Baby
                        et Débutant poney).
                        <br />
                        Un forfait semestriel comprend 19 ou 20 reprises avec 2
                        ou 4 reprises supplémentaires pour les vacances
                        scolaires en fonction du semestre.
                        <br />
                        <br />
                        Consultez la section{" "}
                        <Link href="/planning#planning" className="faq-link">
                            Planning
                        </Link>{" "}
                        pour les détails.
                    </>
                ),
            },
            {
                q: "J'ai un imprévu pour une reprise, comment récupérer mon cours ?",
                a: (
                    <>
                        Vous devez vous désinscrire au minimum{" "}
                        <strong>24 heures avant</strong> votre cours pour
                        générer un bon de récupération. Ce bon est valable
                        pendant <strong>2 mois</strong> à partir de la date du
                        cours annulé, selon les places disponibles.
                        <br />
                        Quota : 6 bons par forfait annuel, 3 par semestre. Pas
                        de récupération sur les séances d&apos;obstacle ni
                        pendant les 4 dernières semaines de la saison.
                        <br />
                        <br />
                        ❗ En cas d&apos;imprévu de dernière minute (moins de
                        24h), désinscrivez-vous quand même et prévenez votre
                        moniteur en appelant la SHEVA.
                        <br />
                        <Link href="/infos#fonctionnement" className="faq-link">
                            → Voir la section Fonctionnement
                        </Link>
                    </>
                ),
            },
            {
                q: "Que se passe-t-il pendant les vacances scolaires ?",
                a: (
                    <>
                        Pendant les vacances de Noël, Hiver et Printemps, un
                        planning spécial est mis en place avec des reprises
                        d&apos;1 heure par semaine, incluses dans votre forfait
                        (sauf Baby et Débutant poney).
                        <br />
                        <br />
                        Pour vous inscrire : dans l&apos;onglet &quot;Mes
                        Récupérations&quot; de votre Espace Personnel,
                        sélectionnez un bon{" "}
                        <strong>&quot;Reprise vacances&quot;</strong> puis la
                        reprise qui vous convient. Ces bons ne sont pas
                        utilisables en dehors des périodes de vacances.
                        <br />
                        <Link href="/planning" className="faq-link">
                            → Voir le planning des vacances
                        </Link>
                    </>
                ),
            },
            {
                q: "À quelle heure dois-je arriver pour mon cours ?",
                a: "Vous devez arriver 30 minutes avant l'heure de votre reprise pour vous occuper de votre monture (pansage, sellage). Prévoyez également 20 minutes après la reprise pour les soins et le rangement du matériel. Au-delà de ces créneaux, la SHEVA n'est plus responsable en cas d'incidents.",
            },
        ],
    },
    {
        id: "espace",
        icon: "🔒",
        title: "Espace Personnel en Ligne",
        items: [
            {
                q: "Comment créer son compte personnel ? (première connexion)",
                a: (
                    <>
                        Rendez-vous sur votre{" "}
                        <a
                            href="https://cloud6.kavalog.fr/SHEVA/"
                            className="faq-link"
                        >
                            Espace Personnel
                        </a>
                        .
                        <br />
                        <br />
                        👉 Cliquez sur &quot;Créer un compte&quot; et remplissez
                        les informations demandées.
                        <br />
                        ⚠️ Renseignez correctement votre adresse email, elle
                        sera utilisée pour vous envoyer vos identifiants.
                        <br />
                        <br />
                        👉 Vous recevrez un email de confirmation avec vos
                        identifiants, puis pourrez accéder à toutes les
                        fonctionnalités.
                    </>
                ),
            },
            {
                q: "Comment modifier mes informations personnelles ?",
                a: (
                    <>
                        Connectez-vous à votre Espace Personnel, cliquez sur
                        l&apos;icône 👤 en haut à droite, puis sur &quot;Mon
                        Profil&quot;. Depuis cette fenêtre, vous pouvez modifier
                        vos informations personnelles.
                    </>
                ),
            },
            {
                q: "Comment consulter mes factures ?",
                a: (
                    <>
                        Connectez-vous à votre Espace Personnel, cliquez sur
                        l&apos;icône 👤 en haut à droite, puis sur &quot;Mes
                        factures&quot;. Vous y retrouverez l&apos;ensemble de
                        vos factures.
                    </>
                ),
            },
        ],
    },
    {
        id: "inscriptions-faq",
        icon: "✍️",
        title: "Inscriptions",
        items: [
            {
                q: "Comment souscrire à un forfait et s'inscrire à une reprise régulière ?",
                a: (
                    <>
                        Connectez-vous à votre{" "}
                        <a
                            href="https://cloud6.kavalog.fr/SHEVA/"
                            className="faq-link"
                        >
                            Espace Personnel
                        </a>
                        .
                        <br />
                        <br />
                        👉 Allez dans l&apos;onglet &quot;Forfaits&quot; →
                        &quot;Acheter un forfait&quot;.
                        <br />
                        👉 Sélectionnez le forfait souhaité puis choisissez la
                        reprise (jour et heure fixes) à votre niveau.
                        <br />
                        👉 Rendez-vous dans votre panier pour régler et valider
                        votre inscription.
                    </>
                ),
            },
            {
                q: "Comment s'inscrire à une activité / stage ?",
                a: (
                    <>
                        Connectez-vous à votre Espace Personnel. Allez dans
                        l&apos;onglet &quot;Activités&quot; et sélectionnez
                        celle à laquelle vous souhaitez vous inscrire, puis
                        rendez-vous dans votre panier pour régler.
                    </>
                ),
            },
            {
                q: "Comment s'inscrire à une récupération ou une reprise de vacances ?",
                a: (
                    <>
                        Connectez-vous à votre Espace Personnel. Allez dans
                        l&apos;onglet &quot;Reprises&quot; → &quot;Mes
                        récupérations&quot;.
                        <br />
                        <br />
                        👉 Sélectionnez le bon de récupération dans le menu à
                        gauche. ❗ Les bons ont une date d&apos;expiration —
                        utilisez en priorité ceux qui expirent le plus tôt.
                        <br />
                        👉 Une fois le bon sélectionné, filtrez les reprises par
                        date et cliquez sur &quot;S&apos;inscrire&quot;.
                    </>
                ),
            },
            {
                q: "Comment s'inscrire à une reprise isolée (hors bons de récupération) ?",
                a: (
                    <>
                        Connectez-vous à votre Espace Personnel. Allez dans
                        l&apos;onglet &quot;Cartes&quot; → &quot;Acheter une
                        carte&quot;. Ajoutez-la à votre panier et réglez
                        l&apos;achat.
                        <br />
                        <br />
                        Ensuite, allez dans &quot;Reprises&quot; →
                        &quot;S&apos;inscrire à une reprise&quot; et
                        sélectionnez la reprise souhaitée selon les
                        disponibilités.
                    </>
                ),
            },
        ],
    },
    {
        id: "paiement",
        icon: "💰",
        title: "Tarifs & Paiement",
        items: [
            {
                q: "Quels sont les modes de paiement acceptés ?",
                a: (
                    <>
                        👉 Par CB en ligne en 1 fois ou 4 fois sans frais (min.
                        500 €)
                        <br />
                        👉 Acompte en CB + solde par 1 ou 2 chèques à remettre
                        rapidement à la SHEVA (datés au jour du règlement, à
                        l&apos;ordre de « SHEVA », avec le nom du cavalier
                        inscrit au dos).
                        <br />
                        <br />
                        Pour les activités et stages, le paiement se fait
                        uniquement par CB depuis l&apos;espace personnel. Le
                        règlement du forfait doit être fait avant la première
                        reprise.
                    </>
                ),
            },
            {
                q: "Y a-t-il des réductions applicables ?",
                a: (
                    <>
                        📌 Remise sur la cotisation à partir du 3ème membre de
                        la famille (même nom, même adresse, inscription
                        simultanée) :
                        <br />
                        👉 3ème membre : 50% de réduction
                        <br />
                        👉 À partir du 4ème membre : 75% de réduction
                        <br />
                        La réduction s&apos;applique par tarifs décroissants.
                    </>
                ),
            },
            {
                q: "Puis-je être remboursé en cas d'arrêt ?",
                a: (
                    <>
                        Aucun remboursement n&apos;est possible sauf couverture
                        par une assurance facultative (interruption/annulation).
                        Nous recommandons fortement de souscrire cette assurance
                        lors de l&apos;inscription.{" "}
                        <Link href="/planning#annulation" className="faq-link">
                            → Voir les modalités
                        </Link>
                    </>
                ),
            },
        ],
    },
    {
        id: "securite",
        icon: "🛡️",
        title: "Sécurité & Matériel",
        items: [
            {
                q: "Le matériel est-il fourni par le club ?",
                a: (
                    <>
                        Tout est détaillé dans la section{" "}
                        <Link href="/infos#materiel" className="faq-link">
                            Matériel
                        </Link>
                        . Pour votre sécurité, pensez bien à vous équiper
                        d&apos;un casque homologué et de boots ou bottes
                        adaptées.
                    </>
                ),
            },
            {
                q: "Mon enfant mineur est-il surveillé en permanence ?",
                a: "Les enfants mineurs sont sous la responsabilité de la SHEVA uniquement pendant : 30 minutes avant la reprise + durée de la reprise + 20 minutes après. En dehors de ces créneaux, aucune surveillance n'est assurée par le club.",
            },
            {
                q: "Puis-je amener mon chien au centre ?",
                a: "Oui, les chiens sont autorisés mais doivent être obligatoirement tenus en laisse dans toute l'enceinte du club. Aucun comportement risquant d'effrayer les chevaux n'est autorisé.",
            },
        ],
    },
    {
        id: "pratique",
        icon: "🏇",
        title: "Vie Pratique",
        items: [
            {
                q: "Où puis-je acheter le matériel d'équitation ?",
                a: (
                    <>
                        Le matériel peut être acheté dans les magasins de sport
                        généralistes (Décathlon, GO Sport) ou dans des selleries
                        spécialisées. Les adhérents SHEVA bénéficient d&apos;une
                        remise de <strong>10% à la Sellerie du Bois</strong> (
                        <a
                            href="https://horse-prestige.fr/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="faq-link"
                        >
                            horse-prestige.fr
                        </a>
                        ) à Charenton-Le-Pont sur présentation de leur licence.
                    </>
                ),
            },
            {
                q: "Y a-t-il des vestiaires et des douches ?",
                a: "Le club dispose de sanitaires. Il n'y a pas de douches. Les vestiaires sont en cours d'aménagement et seront bientôt disponibles.",
            },
            {
                q: "Puis-je venir visiter le club avant de m'inscrire ?",
                a: "Bien sûr ! Vous pouvez venir visiter le club pendant nos horaires d'ouverture pour découvrir nos installations et discuter avec l'équipe enseignante. Contactez-nous pour organiser votre visite.",
            },
        ],
    },
];

// ─── ACCORDION ITEM ───────────────────────────────────────────────────────────
function FaqItem({
    q,
    a,
    isOpen,
    onToggle,
}: {
    q: string;
    a: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
}) {
    return (
        <div
            style={{
                borderBottom: "1px solid #e5e7eb",
                overflow: "hidden",
            }}
        >
            <button
                onClick={onToggle}
                style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 12,
                    padding: "16px 20px",
                    background: isOpen
                        ? "rgba(94,180,174,0.04)"
                        : "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "background 0.15s",
                }}
            >
                <span
                    style={{
                        fontWeight: 600,
                        fontSize: 14,
                        color: isOpen ? tealDark : "#374151",
                        lineHeight: 1.5,
                        flex: 1,
                    }}
                >
                    {q}
                </span>
                <span
                    style={{
                        flexShrink: 0,
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        background: isOpen ? teal : "#f3f4f6",
                        color: isOpen ? "white" : "#6b7280",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 14,
                        fontWeight: 700,
                        transition: "all 0.2s",
                        marginTop: 2,
                    }}
                >
                    {isOpen ? "−" : "+"}
                </span>
            </button>
            {isOpen && (
                <div
                    style={{
                        padding: "0 20px 18px 20px",
                        fontSize: 14,
                        color: "#374151",
                        lineHeight: 1.7,
                    }}
                >
                    {a}
                </div>
            )}
        </div>
    );
}

// ─── FAQ SECTION ──────────────────────────────────────────────────────────────
function FaqSection({ section }: { section: (typeof FAQ_SECTIONS)[number] }) {
    const [openIdx, setOpenIdx] = useState<number | null>(null);
    return (
        <div style={{ marginBottom: 24 }}>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 16px",
                    background: "rgba(94,180,174,0.08)",
                    borderRadius: "10px 10px 0 0",
                    borderLeft: `3px solid ${teal}`,
                }}
            >
                <span style={{ fontSize: 18 }}>{section.icon}</span>
                <h3
                    style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: tealDark,
                        margin: 0,
                    }}
                >
                    {section.title}
                </h3>
            </div>
            <div
                style={{
                    border: "1px solid #e5e7eb",
                    borderTop: "none",
                    borderRadius: "0 0 10px 10px",
                    overflow: "hidden",
                }}
            >
                {section.items.map((item, i) => (
                    <FaqItem
                        key={i}
                        q={item.q}
                        a={item.a}
                        isOpen={openIdx === i}
                        onToggle={() => setOpenIdx(openIdx === i ? null : i)}
                    />
                ))}
            </div>
        </div>
    );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
// ─── NOTICES ──────────────────────────────────────────────────────────────────
const NOTICES = [
    {
        label: "📋 Notice nouveaux adhérents",
        href: "/PDF_docs/notice-nouveaux.pdf",
    },
    {
        label: "📋 Notice séance d'essai",
        href: "/PDF_docs/notice_seance_essai.pdf",
    },
    {
        label: "📋 Notice réinscriptions trimestrielles",
        href: "/PDF_docs/notice_inscriptions_trimestrielles.pdf",
    },
    {
        label: "📋 Notice récupérations & activités",
        href: "/PDF_docs/Notice_inscriptions_recup_activites.pdf",
    },
    {
        label: "📖 Règlement intérieur 2025",
        href: "/PDF_docs/Reglement_interieur_SHEVA_2025_v12.pdf",
    },
];

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
                    margin: 0,
                }}
            >
                {title}
            </h2>
        </div>
    );
}

export default function InfosClient() {
    const [noticesOpen, setNoticesOpen] = useState(false);

    const cardStyle: React.CSSProperties = {
        background: "white",
        borderRadius: 14,
        border: "1px solid #e5e7eb",
        padding: "24px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
    };

    return (
        <>
            <Nav />

            {/* ── HERO ── */}
            <section
                style={{
                    background: `linear-gradient(135deg, ${teal} 0%, ${tealDark} 100%)`,
                    padding: "72px 24px 56px",
                    paddingTop: "calc(64px + 72px)",
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
                    <span style={{ color: "white", fontWeight: 600 }}>
                        Informations Pratiques
                    </span>
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
                    Informations Pratiques
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
                    Tout ce que vous devez savoir : contact, accès,
                    fonctionnement et modalités d&apos;inscription.
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
                        { label: "Contact & Accès", href: "#contact" },
                        { label: "Fonctionnement", href: "#fonctionnement" },
                        { label: "Matériel", href: "#materiel" },
                        { label: "Inscriptions", href: "#inscriptions" },
                        { label: "Espace personnel", href: "#espace" },
                        { label: "FAQ", href: "#faq" },
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
                    <button
                        onClick={() => setNoticesOpen(true)}
                        style={{
                            padding: "8px 18px",
                            borderRadius: 8,
                            background: "white",
                            border: "1px solid white",
                            color: tealDark,
                            fontSize: 13,
                            fontWeight: 700,
                            cursor: "pointer",
                        }}
                    >
                        📄 Notices PDF
                    </button>
                </div>
            </section>

            <main style={{ background: "#f8fafc", minHeight: "60vh" }}>
                {/* ══════════════════════════════════════
                    CONTACT & ACCÈS
                ══════════════════════════════════════ */}
                <section id="contact" style={{ padding: "56px 24px" }}>
                    <div style={{ maxWidth: 900, margin: "0 auto" }}>
                        <SectionHeader
                            label="Localisation"
                            title="Contact & Accès"
                        />

                        {/* Coordonnées + Emails */}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fit, minmax(280px, 1fr))",
                                gap: 20,
                                marginBottom: 28,
                            }}
                        >
                            {/* Coordonnées */}
                            <div style={cardStyle}>
                                <h3
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 700,
                                        color: tealDark,
                                        marginBottom: 16,
                                        marginTop: 0,
                                    }}
                                >
                                    📍 Nos Coordonnées
                                </h3>
                                <p
                                    style={{
                                        margin: "0 0 14px",
                                        lineHeight: 1.7,
                                        fontSize: 14,
                                        color: "#374151",
                                    }}
                                >
                                    <strong>Pôle équestre SHEVA</strong>
                                    <br />
                                    Parc Interdépartemental des Sports
                                    <br />
                                    Paris Val-de-Marne (PIDS)
                                    <br />
                                    Chemin des Bœufs
                                    <br />
                                    94000 CRÉTEIL
                                </p>
                                <p style={{ margin: "0 0 18px", fontSize: 14 }}>
                                    <strong>Téléphone :</strong>{" "}
                                    <a
                                        href="tel:+33143768676"
                                        style={{ color: tealDark }}
                                    >
                                        +33 1 43 76 86 76
                                    </a>
                                </p>
                                <div
                                    style={{
                                        background: "rgba(94,180,174,0.06)",
                                        borderRadius: 10,
                                        padding: "14px 16px",
                                    }}
                                >
                                    <p
                                        style={{
                                            fontWeight: 700,
                                            fontSize: 13,
                                            color: tealDark,
                                            margin: "0 0 10px",
                                        }}
                                    >
                                        🕐 Horaires d&apos;accueil
                                    </p>
                                    {[
                                        {
                                            j: "Lun, Mar, Jeu, Ven",
                                            h: "14h – 19h",
                                        },
                                        { j: "Mercredi", h: "11h – 19h" },
                                        { j: "Samedi", h: "11h – 17h30" },
                                        { j: "Dimanche", h: "11h – 15h30" },
                                    ].map(({ j, h }) => (
                                        <div
                                            key={j}
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                fontSize: 13,
                                                padding: "4px 0",
                                                borderBottom:
                                                    "1px solid rgba(94,180,174,0.15)",
                                                color: "#374151",
                                            }}
                                        >
                                            <span>{j}</span>
                                            <strong>{h}</strong>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Emails */}
                            <div style={cardStyle}>
                                <h3
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 700,
                                        color: tealDark,
                                        marginBottom: 16,
                                        marginTop: 0,
                                    }}
                                >
                                    ✉️ Contacts Email
                                </h3>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 12,
                                    }}
                                >
                                    {[
                                        {
                                            label: "Renseignements généraux",
                                            email: "sheva@sheva.fr",
                                        },
                                        {
                                            label: "Problèmes espace en ligne",
                                            email: "shevaweb@sheva.fr",
                                        },
                                        {
                                            label: "Comptabilité & factures",
                                            email: "comptasheva@gmail.com",
                                        },
                                        {
                                            label: "Licences FFE",
                                            email: "licence@sheva.fr",
                                        },
                                        {
                                            label: "Conseil d'Administration",
                                            email: "ca@sheva.fr",
                                        },
                                    ].map(({ label, email }) => (
                                        <div
                                            key={email}
                                            style={{
                                                padding: "10px 14px",
                                                background: "#f9fafb",
                                                borderRadius: 8,
                                                border: "1px solid #f3f4f6",
                                            }}
                                        >
                                            <p
                                                style={{
                                                    margin: "0 0 4px",
                                                    fontSize: 12,
                                                    fontWeight: 600,
                                                    color: "#6b7280",
                                                    textTransform: "uppercase",
                                                    letterSpacing: "0.04em",
                                                }}
                                            >
                                                {label}
                                            </p>
                                            <a
                                                href={`mailto:${email}`}
                                                style={{
                                                    fontSize: 14,
                                                    color: tealDark,
                                                    fontWeight: 600,
                                                    textDecoration: "none",
                                                }}
                                            >
                                                {email}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Comment venir */}
                        <div style={{ ...cardStyle, marginBottom: 20 }}>
                            <h3
                                style={{
                                    fontSize: 16,
                                    fontWeight: 700,
                                    color: tealDark,
                                    marginBottom: 16,
                                    marginTop: 0,
                                }}
                            >
                                🚇 Comment Venir
                            </h3>
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns:
                                        "repeat(auto-fit, minmax(180px, 1fr))",
                                    gap: 12,
                                    marginBottom: 16,
                                }}
                            >
                                {[
                                    {
                                        icon: "🚆",
                                        title: "RER D",
                                        desc: "Gare Créteil Pompadour — 10-15 min de Paris",
                                    },
                                    {
                                        icon: "🚇",
                                        title: "Métro Ligne 8",
                                        desc: "Station Créteil-Université puis TVM, ou Créteil-L'Échat puis bus O1/O2",
                                    },
                                    {
                                        icon: "🚌",
                                        title: "Bus",
                                        desc: "Lignes TVM, 393, O1, O2 — Arrêt Pompadour",
                                    },
                                    {
                                        icon: "🚗",
                                        title: "Voiture",
                                        desc: "Via A86, D86, N406 — Parking gratuit au PIDS",
                                    },
                                ].map(({ icon, title, desc }) => (
                                    <div
                                        key={title}
                                        style={{
                                            background: "#f9fafb",
                                            borderRadius: 10,
                                            padding: "14px",
                                            display: "flex",
                                            gap: 10,
                                            alignItems: "flex-start",
                                        }}
                                    >
                                        <span style={{ fontSize: 22 }}>
                                            {icon}
                                        </span>
                                        <div>
                                            <p
                                                style={{
                                                    fontWeight: 700,
                                                    margin: "0 0 4px",
                                                    fontSize: 14,
                                                    color: "#111827",
                                                }}
                                            >
                                                {title}
                                            </p>
                                            <p
                                                style={{
                                                    margin: 0,
                                                    fontSize: 13,
                                                    color: "#6b7280",
                                                    lineHeight: 1.5,
                                                }}
                                            >
                                                {desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Alerte parking */}
                            <div
                                style={{
                                    background: "#fffbeb",
                                    border: "1px solid #fde68a",
                                    borderRadius: 8,
                                    padding: "12px 16px",
                                    fontSize: 13,
                                    color: "#92400e",
                                }}
                            >
                                <strong>⚠️ Parking : </strong>
                                Le parking privé de la SHEVA n&apos;est pas
                                encore utilisable. Merci de vous garer sur le{" "}
                                <strong>parking public du PIDS </strong>
                                et d&apos;accéder à la SHEVA par l&apos;entrée
                                piétons.
                            </div>
                        </div>

                        {/* Carte + Photo accès */}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fit, minmax(300px, 1fr))",
                                gap: 20,
                            }}
                        >
                            <div style={cardStyle}>
                                <h3
                                    style={{
                                        fontSize: 15,
                                        fontWeight: 700,
                                        color: tealDark,
                                        margin: "0 0 12px",
                                    }}
                                >
                                    📍 Comment nous trouver
                                </h3>
                                <div
                                    style={{
                                        borderRadius: 10,
                                        overflow: "hidden",
                                        height: 260,
                                    }}
                                >
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2807.6059632708057!2d2.430959876651862!3d48.77114757132042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e6731d6f3981f1%3A0x7a61c36cc364a0e9!2sSHEVA%20P%C3%B4le%20%C3%A9questre%20Paris%20Val-de-Marne!5e1!3m2!1sfr!2sfr!4v1755464902633!5m2!1sfr!2sfr"
                                        width="100%"
                                        height="260"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                            <div style={cardStyle}>
                                <h3
                                    style={{
                                        fontSize: 15,
                                        fontWeight: 700,
                                        color: tealDark,
                                        margin: "0 0 12px",
                                    }}
                                >
                                    📸 Parking et accès
                                </h3>
                                <div
                                    style={{
                                        borderRadius: 10,
                                        overflow: "hidden",
                                        height: 260,
                                        position: "relative",
                                    }}
                                >
                                    <Image
                                        src="/images/acces-sheva.avif"
                                        alt="Accès et parking SHEVA"
                                        fill
                                        style={{ objectFit: "cover" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════
                    FONCTIONNEMENT
                ══════════════════════════════════════ */}
                <section
                    id="fonctionnement"
                    style={{ padding: "56px 24px", background: "white" }}
                >
                    <div style={{ maxWidth: 900, margin: "0 auto" }}>
                        <SectionHeader
                            label="Organisation"
                            title="Fonctionnement du Club"
                        />
                        <p
                            style={{
                                color: "#6b7280",
                                fontSize: 15,
                                marginBottom: 8,
                                textAlign: "center",
                            }}
                        >
                            La SHEVA vous accueille de fin août à début juillet,
                            et fonctionne sur la base de forfaits avec reprises
                            hebdomadaires, animations le dimanche, et programmes
                            adaptés pendant les vacances scolaires.
                        </p>
                        <p
                            style={{
                                color: "#6b7280",
                                fontSize: 15,
                                marginBottom: 20,
                                textAlign: "center",
                            }}
                        >
                            Consultez notre règlement intérieur pour tout
                            connaître sur le fonctionnement du club et les bons
                            usages du savoir-vivre à la SHEVA.
                        </p>
                        <div style={{ textAlign: "center", marginBottom: 36 }}>
                            <a
                                href={assetPath("/PDF_docs/Reglement_interieur_SHEVA_2025_v12.pdf")}
                                style={{
                                    display: "inline-block",
                                    background: teal,
                                    color: "white",
                                    padding: "10px 22px",
                                    borderRadius: 8,
                                    fontWeight: 700,
                                    fontSize: 14,
                                    textDecoration: "none",
                                }}
                            >
                                📄 Règlement Intérieur
                            </a>
                        </div>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fit, minmax(300px, 1fr))",
                                gap: 20,
                                marginBottom: 20,
                            }}
                        >
                            {/* Organisation */}
                            <div style={cardStyle}>
                                <h3
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 700,
                                        color: tealDark,
                                        marginBottom: 14,
                                        marginTop: 0,
                                        textAlign: "center",
                                    }}
                                >
                                    📅 Organisation
                                </h3>
                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 13,
                                        color: "#111827",
                                        margin: "0 0 8px",
                                    }}
                                >
                                    Les forfaits :
                                </p>
                                <ul
                                    className="dot-list"
                                    style={{
                                        margin: "0 0 14px",
                                        fontSize: 14,
                                        color: "#374151",
                                        lineHeight: 1.7,
                                    }}
                                >
                                    <li>
                                        La SHEVA propose des forfaits annuels ou
                                        semestriels, donnant accès à une reprise
                                        hebdomadaire à jour et heure fixes.
                                    </li>
                                    <li>
                                        Une saison complète compte{" "}
                                        <strong>45 semaines</strong> : 39 hors
                                        vacances scolaires et 6 pendant les
                                        vacances de Noël, Hiver et Printemps.
                                    </li>
                                    <li>
                                        Un forfait annuel comprend donc{" "}
                                        <strong>39 reprises standards.</strong>
                                    </li>
                                </ul>
                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 13,
                                        color: "#111827",
                                        margin: "0 0 8px",
                                    }}
                                >
                                    Les reprises :
                                </p>
                                <ul
                                    className="dot-list"
                                    style={{
                                        margin: 0,
                                        fontSize: 14,
                                        color: "#374151",
                                        lineHeight: 1.7,
                                    }}
                                >
                                    <li>
                                        Chaque reprise regroupe 10 à 11
                                        cavaliers maximum (sauf cas
                                        particuliers).
                                    </li>
                                    <li>
                                        Pour tous les niveaux (hors débutants),
                                        les cours suivent un cycle de 4 semaines
                                        : mise en selle assis, dressage, mise en
                                        selle obstacle, saut d&apos;obstacles.
                                    </li>
                                    <li>
                                        Toutes les séances sont mixtes et
                                        adaptées au niveau, sauf les reprises
                                        labellisées « Dressage » et les
                                        débutants qui ne sautent pas.
                                    </li>
                                    <li>
                                        Les niveaux indiqués correspondent au
                                        Galop acquis, non au Galop préparé.
                                    </li>
                                </ul>
                            </div>

                            {/* Déroulement */}
                            <div style={cardStyle}>
                                <h3
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 700,
                                        color: tealDark,
                                        marginBottom: 14,
                                        marginTop: 0,
                                        textAlign: "center",
                                    }}
                                >
                                    ⏰ Déroulement
                                </h3>
                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 13,
                                        color: "#111827",
                                        margin: "0 0 8px",
                                    }}
                                >
                                    Timing d&apos;une reprise :
                                </p>
                                <ul
                                    className="dot-list"
                                    style={{
                                        margin: "0 0 16px",
                                        fontSize: 14,
                                        color: "#374151",
                                        lineHeight: 1.7,
                                    }}
                                >
                                    <li>
                                        Le cavalier doit arriver{" "}
                                        <strong>30 minutes avant</strong> sa
                                        reprise pour préparer sa monture.
                                    </li>
                                    <li>
                                        Prévoir{" "}
                                        <strong>20 minutes après</strong> pour
                                        les soins et le rangement du matériel.
                                    </li>
                                    <li>
                                        Les mineurs sont sous la responsabilité
                                        du club de 30 minutes avant la reprise à
                                        20 minutes après.
                                    </li>
                                    <li>
                                        En dehors de ce créneau, la SHEVA
                                        n&apos;assure pas leur surveillance.
                                    </li>
                                </ul>
                                <h4
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 700,
                                        color: tealDark,
                                        margin: "0 0 8px",
                                    }}
                                >
                                    🐴 Alternance des reprises
                                </h4>
                                <ul
                                    className="dot-list"
                                    style={{
                                        margin: "0 0 16px",
                                        fontSize: 14,
                                        color: "#374151",
                                        lineHeight: 1.7,
                                    }}
                                >
                                    <li>
                                        Alternance de disciplines avec un cycle
                                        de 4 semaines afin de pratiquer
                                        l&apos;ensemble des disciplines.
                                    </li>
                                    <li>
                                        Reprise progressive du travail à la
                                        rentrée avec des séances de travail à
                                        pied et au pas.
                                    </li>
                                </ul>
                                <h4
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 700,
                                        color: tealDark,
                                        margin: "0 0 8px",
                                    }}
                                >
                                    🏖️ Vacances Scolaires
                                </h4>
                                <ul
                                    className="dot-list"
                                    style={{
                                        margin: 0,
                                        fontSize: 14,
                                        color: "#374151",
                                        lineHeight: 1.7,
                                    }}
                                >
                                    <li>
                                        Pendant les vacances scolaires (Noël,
                                        Hiver, Printemps) le planning des
                                        reprises est modifié.{" "}
                                        <Link
                                            href="/planning#planning"
                                            style={{ color: tealDark }}
                                        >
                                            Consultez le planning.
                                        </Link>
                                    </li>
                                    <li>
                                        Les forfaits (à l&apos;exception des
                                        forfaits &quot;Baby&quot; et
                                        &quot;Débutants Poney&quot;) incluent
                                        des reprises dédiées aux vacances.
                                    </li>
                                    <li>
                                        Les cavaliers doivent s&apos;inscrire
                                        aux reprises de vacances via leur espace
                                        en ligne en utilisant un bon de
                                        récupération &quot;Reprise vacance
                                        incluse dans le forfait&quot;.
                                    </li>
                                    <li>
                                        ⚠️ Les inscriptions sont ouvertes 1 à 2
                                        semaines avant le début des vacances et
                                        les places sont limitées.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fit, minmax(300px, 1fr))",
                                gap: 20,
                            }}
                        >
                            {/* Absences */}
                            <div style={cardStyle}>
                                <h3
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 700,
                                        color: tealDark,
                                        marginBottom: 14,
                                        marginTop: 0,
                                        textAlign: "center",
                                    }}
                                >
                                    🔄 Absences
                                </h3>
                                {[
                                    {
                                        title: "Récupération possible :",
                                        items: [
                                            "En cas d'absence, vous devez vous désinscrire au plus tard 24h avant votre reprise via votre espace en ligne.",
                                            "Cela génère un bon de récupération, utilisable sur votre espace en ligne pour s'inscrire à une autre reprise.",
                                            "Ces bons constituent une facilité offerte par la SHEVA (non un droit). Leur usage dépend des places disponibles, hors séances d'obstacle et hors des 4 dernières semaines de la saison.",
                                        ],
                                    },
                                    {
                                        title: "Discipline et solidarité :",
                                        items: [
                                            "Il est recommandé de se désinscrire dès que l'absence est connue, même plusieurs semaines à l'avance, afin de libérer des places pour d'autres cavaliers.",
                                        ],
                                    },
                                    {
                                        title: "Conditions d'utilisation :",
                                        items: [
                                            "Il est possible de générer jusqu'à 6 bons par forfait annuel (3 par semestre). Au-delà, les absences ne sont pas récupérables.",
                                            "Les bons sont valides dès leur création et pendant 2 mois après la reprise annulée.",
                                            "Une récupération non utilisée dans les 2 mois ou réservée mais non effectuée est perdue définitivement.",
                                        ],
                                    },
                                    {
                                        title: "Absences tardives :",
                                        items: [
                                            "Au-delà du délai de 24h, aucun bon n'est généré mais la désinscription reste obligatoire, de préférence en ligne, ou en prévenant la SHEVA (sheva@sheva.fr / 01 43 76 86 76).",
                                            "Même sans bon disponible, signalez vos absences afin de libérer des places et d'équilibrer le travail des chevaux.",
                                        ],
                                    },
                                ].map(({ title, items }) => (
                                    <div
                                        key={title}
                                        style={{ marginBottom: 14 }}
                                    >
                                        <p
                                            style={{
                                                fontWeight: 700,
                                                fontSize: 13,
                                                color: "#111827",
                                                margin: "0 0 6px",
                                            }}
                                        >
                                            {title}
                                        </p>
                                        <ul
                                            className="dot-list"
                                            style={{
                                                margin: 0,
                                                fontSize: 13,
                                                color: "#374151",
                                                lineHeight: 1.65,
                                            }}
                                        >
                                            {items.map((it) => (
                                                <li key={it}>{it}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            {/* Sécurité */}
                            <div style={cardStyle}>
                                <h3
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 700,
                                        color: tealDark,
                                        marginBottom: 14,
                                        marginTop: 0,
                                        textAlign: "center",
                                    }}
                                >
                                    🛡️ Sécurité
                                </h3>
                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 13,
                                        color: "#111827",
                                        margin: "0 0 8px",
                                    }}
                                >
                                    Consignes importantes :
                                </p>
                                <ul
                                    className="dot-list"
                                    style={{
                                        margin: 0,
                                        fontSize: 14,
                                        color: "#374151",
                                        lineHeight: 1.8,
                                    }}
                                >
                                    {[
                                        "Interdiction de fumer dans l'enceinte",
                                        "Chiens tenus en laisse obligatoirement",
                                        "Pas d'encombrement des allées",
                                        "Les accompagnants ne doivent pas s'occuper des équidés. Seuls les adhérents sont sous la responsabilité de la SHEVA.",
                                        "Pas de jeux de ballons, ne pas courir ou adopter des comportements qui pourraient effrayer nos chevaux.",
                                    ].map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════
                    MATÉRIEL
                ══════════════════════════════════════ */}
                <section id="materiel" style={{ padding: "56px 24px" }}>
                    <div style={{ maxWidth: 900, margin: "0 auto" }}>
                        <SectionHeader
                            label="Équipement"
                            title="Matériel Requis"
                        />
                        <p
                            style={{
                                color: "#6b7280",
                                fontSize: 15,
                                marginBottom: 28,
                                textAlign: "center",
                            }}
                        >
                            Le matériel peut être acheté dans les magasins de
                            sport ou selleries spécialisées.{" "}
                            <strong>10% de réduction</strong> aux cavaliers
                            SHEVA à la Sellerie du Bois (Charenton).
                        </p>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fit, minmax(280px, 1fr))",
                                gap: 20,
                            }}
                        >
                            {/* Obligatoire */}
                            <div style={cardStyle}>
                                <h3
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 700,
                                        color: "#15803d",
                                        marginBottom: 14,
                                        marginTop: 0,
                                        textAlign: "center",
                                    }}
                                >
                                    ✅ Obligatoire
                                </h3>
                                <ul
                                    className="dot-list"
                                    style={{
                                        margin: "0 0 14px",
                                        fontSize: 14,
                                        color: "#374151",
                                        lineHeight: 1.8,
                                    }}
                                >
                                    <li>
                                        <strong>Casque homologué FFE</strong>{" "}
                                        (norme NF) — Port obligatoire
                                    </li>
                                    <li>
                                        <strong>
                                            Pantalon d&apos;équitation
                                        </strong>{" "}
                                        ou pantalon de sport pour débutants
                                    </li>
                                    <li>
                                        <strong>
                                            Bottes d&apos;équitation
                                        </strong>{" "}
                                        ou boots + mini-chaps
                                    </li>
                                    <li>
                                        <strong>Cravache</strong>
                                    </li>
                                    <li>
                                        <strong>Matériel de pansage</strong> :
                                        cure-pieds, étrille, bouchon, brosse
                                    </li>
                                </ul>
                                <div
                                    style={{
                                        background: "#fef2f2",
                                        borderRadius: 8,
                                        padding: "10px 14px",
                                        fontSize: 13,
                                        color: "#991b1b",
                                        fontWeight: 600,
                                    }}
                                >
                                    ❌ Pas de baskets, tennis ou chaussures sans
                                    talons
                                </div>
                            </div>

                            {/* Recommandé & Déconseillé */}
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 16,
                                }}
                            >
                                <div style={cardStyle}>
                                    <h3
                                        style={{
                                            fontSize: 16,
                                            fontWeight: 700,
                                            color: "#d97706",
                                            marginBottom: 14,
                                            marginTop: 0,
                                            textAlign: "center",
                                        }}
                                    >
                                        ⭐ Recommandé
                                    </h3>
                                    <ul
                                        className="dot-list"
                                        style={{
                                            margin: 0,
                                            fontSize: 14,
                                            color: "#374151",
                                            lineHeight: 1.8,
                                        }}
                                    >
                                        <li>
                                            <strong>Gilet de protection</strong>{" "}
                                            (surtout pour obstacle)
                                        </li>
                                        <li>
                                            <strong>Galop 1+ :</strong> Guêtres
                                            + protèges-boulets
                                        </li>
                                        <li>
                                            <strong>Galop 4+ :</strong> Éperons
                                            + stick (sur demande enseignant)
                                        </li>
                                        <li>
                                            <strong>Galop 5+ :</strong>{" "}
                                            Couvre-rein (hiver obligatoire)
                                        </li>
                                        <li>
                                            <strong>Confirmés :</strong> Licol
                                            personnel
                                        </li>
                                    </ul>
                                </div>
                                <div style={cardStyle}>
                                    <h3
                                        style={{
                                            fontSize: 16,
                                            fontWeight: 700,
                                            color: "#991b1b",
                                            marginBottom: 14,
                                            marginTop: 0,
                                            textAlign: "center",
                                        }}
                                    >
                                        ❌ Déconseillé
                                    </h3>
                                    <ul
                                        className="dot-list"
                                        style={{
                                            margin: 0,
                                            fontSize: 14,
                                            color: "#374151",
                                            lineHeight: 1.8,
                                        }}
                                    >
                                        <li>
                                            <strong>
                                                Utilisation de tapis personnel :
                                            </strong>{" "}
                                            Nous en fournissons. Ils peuvent
                                            malheureusement transmettre des
                                            maladies (surtout si vous montez
                                            dans plusieurs clubs) et mettre à
                                            risque la santé de nos chevaux.
                                        </li>
                                        <li>
                                            <strong>
                                                Filet et bride personnel :
                                            </strong>{" "}
                                            Demandez à votre moniteur avant de
                                            l&apos;utiliser.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════
                    INSCRIPTIONS
                ══════════════════════════════════════ */}
                <section
                    id="inscriptions"
                    style={{ padding: "56px 24px", background: "white" }}
                >
                    <div style={{ maxWidth: 900, margin: "0 auto" }}>
                        <SectionHeader
                            label="Rejoindre la SHEVA"
                            title="Modalités d'Inscription"
                        />
                        <p
                            style={{
                                color: "#6b7280",
                                fontSize: 15,
                                marginBottom: 16,
                                textAlign: "center",
                            }}
                        >
                            Les inscriptions se font entièrement sur{" "}
                            <a
                                href="https://cloud6.kavalog.fr/SHEVA/"
                                style={{ color: tealDark, fontWeight: 600 }}
                            >
                                votre espace personnel
                            </a>
                            . Consultez la{" "}
                            <a href="#faq" style={{ color: tealDark }}>
                                FAQ
                            </a>{" "}
                            en cas de problèmes.
                        </p>

                        {/* Alerte saison */}
                        <div
                            style={{
                                background: "#fffbeb",
                                border: "1px solid #fde68a",
                                borderRadius: 10,
                                padding: "14px 18px",
                                fontSize: 14,
                                color: "#92400e",
                                marginBottom: 28,
                            }}
                        >
                            <strong>⚠️ Informations inscriptions :</strong> Les
                            informations affichées correspondent aux
                            inscriptions pour la{" "}
                            <strong>saison 2026-2027</strong>. Les inscriptions
                            pour la saison 2025-2026 sont closes, sauf pour les
                            cavaliers souhaitant s&apos;inscrire à des reprises
                            isolées (voir la section Espace Personnel).
                        </div>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fit, minmax(300px, 1fr))",
                                gap: 20,
                            }}
                        >
                            {/* Nouveaux cavaliers */}
                            <div style={cardStyle}>
                                <h3
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 700,
                                        color: tealDark,
                                        marginBottom: 14,
                                        marginTop: 0,
                                    }}
                                >
                                    🆕 Nouveaux Cavaliers
                                </h3>
                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 13,
                                        color: "#111827",
                                        margin: "0 0 8px",
                                    }}
                                >
                                    Calendrier d&apos;inscription :
                                </p>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 8,
                                        marginBottom: 18,
                                    }}
                                >
                                    {[
                                        {
                                            date: "6 mai",
                                            text: "Réunion d'informations en visio conférence - à 20h30 (environ 1h)",
                                            link: {
                                                href: "",
                                                label: "Lien de la visio à venir",
                                            },
                                        },
                                        {
                                            date: "11 mai",
                                            text: "Ouverture inscriptions séances d'essai — depuis l'espace en ligne, attention à créer votre compte avant de pouvoir vous inscrire à une séance d'essai",
                                        },
                                        {
                                            date: "24 mai",
                                            text: "Séances d'essai fortement conseillées (30€, 55 min, pour les non-débutants)",
                                        },
                                        {
                                            date: "25 mai",
                                            text: "Inscriptions prioritaires (pour ceux ayant effectué une séance d'essai)",
                                        },
                                        {
                                            date: "26 mai",
                                            text: "Inscriptions ouvertes à tous",
                                        },
                                    ].map(({ date, text, link }) => (
                                        <div
                                            key={date}
                                            style={{
                                                display: "flex",
                                                gap: 12,
                                                alignItems: "flex-start",
                                                padding: "10px 12px",
                                                background: "#f9fafb",
                                                borderRadius: 8,
                                                borderLeft: `3px solid ${teal}`,
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontWeight: 800,
                                                    fontSize: 12,
                                                    color: tealDark,
                                                    minWidth: 42,
                                                    paddingTop: 1,
                                                }}
                                            >
                                                {date}
                                            </span>
                                            <span
                                                style={{
                                                    fontSize: 13,
                                                    color: "#374151",
                                                    lineHeight: 1.5,
                                                }}
                                            >
                                                {text}
                                                {link && (
                                                    <>
                                                        {" — "}
                                                        <a
                                                            href={link.href}
                                                            style={{
                                                                color: tealDark,
                                                            }}
                                                        >
                                                            {link.label}
                                                        </a>
                                                    </>
                                                )}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 13,
                                        color: "#111827",
                                        margin: "0 0 8px",
                                    }}
                                >
                                    Avant inscription :
                                </p>
                                <ul
                                    className="dot-list"
                                    style={{
                                        margin: 0,
                                        fontSize: 13,
                                        color: "#374151",
                                        lineHeight: 1.7,
                                    }}
                                >
                                    <li>
                                        Auto-évaluer votre niveau —{" "}
                                        <a
                                            href="#faq"
                                            style={{ color: tealDark }}
                                        >
                                            consultez la FAQ
                                        </a>
                                    </li>
                                    <li>
                                        Créer un compte en ligne —{" "}
                                        <a
                                            href="#espace"
                                            style={{ color: tealDark }}
                                        >
                                            voir Espace Personnel
                                        </a>
                                    </li>
                                    <li>
                                        Consulter tarifs et conditions —{" "}
                                        <Link
                                            href="/planning#tarifs"
                                            style={{ color: tealDark }}
                                        >
                                            page tarifs
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Réinscriptions */}
                            <div style={cardStyle}>
                                <h3
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 700,
                                        color: tealDark,
                                        marginBottom: 14,
                                        marginTop: 0,
                                    }}
                                >
                                    🔄 Réinscriptions
                                </h3>
                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 13,
                                        color: "#111827",
                                        margin: "0 0 10px",
                                    }}
                                >
                                    Cavaliers actuels :
                                </p>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 8,
                                        marginBottom: 16,
                                    }}
                                >
                                    {[
                                        {
                                            date: "11 mai à 13h",
                                            label: "Reprises Cheval G5-G7",
                                        },
                                        {
                                            date: "12 mai à 13h",
                                            label: "Reprises Cheval G0-G4",
                                        },
                                        {
                                            date: "13 mai à 13h",
                                            label: "Reprises Poney tous niveaux",
                                        },
                                    ].map(({ date, label }) => (
                                        <div
                                            key={date}
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                padding: "10px 14px",
                                                background: "#f9fafb",
                                                borderRadius: 8,
                                                borderLeft: `3px solid ${teal}`,
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontWeight: 700,
                                                    fontSize: 13,
                                                    color: tealDark,
                                                }}
                                            >
                                                {date}
                                            </span>
                                            <span
                                                style={{
                                                    fontSize: 13,
                                                    color: "#374151",
                                                }}
                                            >
                                                {label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div
                                    style={{
                                        background: "rgba(94,180,174,0.06)",
                                        borderRadius: 8,
                                        padding: "10px 14px",
                                        fontSize: 13,
                                        color: "#374151",
                                        marginBottom: 14,
                                    }}
                                >
                                    📌 Les créneaux ouvriront aux dates et
                                    heures mentionnées. Il est inutile de vous
                                    connecter ou nous contacter avant ces
                                    horaires.
                                </div>
                                <p
                                    style={{
                                        fontWeight: 700,
                                        fontSize: 13,
                                        color: "#111827",
                                        margin: "0 0 8px",
                                    }}
                                >
                                    Points importants :
                                </p>
                                <ul
                                    className="dot-list"
                                    style={{
                                        margin: 0,
                                        fontSize: 13,
                                        color: "#374151",
                                        lineHeight: 1.7,
                                    }}
                                >
                                    <li>Compte à jour (non débiteur)</li>
                                    <li>
                                        Vérifiez la connexion à votre compte
                                    </li>
                                    <li>
                                        Consultez votre moniteur pour vous
                                        orienter vers le bon niveau
                                    </li>
                                    <li>
                                        Paiement CB dans les 2h. ⚠️ Système de
                                        paiement non disponible en dehors des
                                        pays de la zone SEPA, des États-Unis et
                                        du Canada.
                                    </li>
                                    <li>
                                        Max 2 forfaits les 24 premières heures
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════
                    ESPACE PERSONNEL
                ══════════════════════════════════════ */}
                <section id="espace" style={{ padding: "56px 24px" }}>
                    <div style={{ maxWidth: 900, margin: "0 auto" }}>
                        <SectionHeader
                            label="Espace Client"
                            title="Espace Personnel en Ligne"
                        />
                        <p
                            style={{
                                color: "#6b7280",
                                fontSize: 15,
                                marginBottom: 28,
                                textAlign: "center",
                            }}
                        >
                            Accédez à votre espace personnel pour gérer tous vos
                            besoins équestres en ligne, 24h/24 et 7j/7.
                        </p>

                        {/* Fonctionnalités */}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fit, minmax(200px, 1fr))",
                                gap: 16,
                                marginBottom: 28,
                            }}
                        >
                            {[
                                {
                                    icon: "📝",
                                    title: "Gestion des Cours",
                                    items: [
                                        "Se désinscrire de vos reprises",
                                        "Gérer vos récupérations",
                                        "S'inscrire à des reprises isolées",
                                        "Consulter votre historique de monte",
                                    ],
                                },
                                {
                                    icon: "💳",
                                    title: "Gestion Administrative",
                                    items: [
                                        "Modifier vos informations personnelles",
                                        "Acheter vos forfaits",
                                        "Consulter votre compte et factures",
                                        "Payer en ligne de façon sécurisée",
                                    ],
                                },
                                {
                                    icon: "🎯",
                                    title: "Activités & Événements",
                                    items: [
                                        "S'inscrire aux stages",
                                        "S'inscrire aux concours internes",
                                        "S'inscrire aux examens galops",
                                        "Participer aux animations",
                                    ],
                                },
                            ].map(({ icon, title, items }) => (
                                <div
                                    key={title}
                                    style={{
                                        ...cardStyle,
                                        borderTop: `3px solid ${teal}`,
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 10,
                                            marginBottom: 14,
                                        }}
                                    >
                                        <span style={{ fontSize: 24 }}>
                                            {icon}
                                        </span>
                                        <h3
                                            style={{
                                                fontSize: 14,
                                                fontWeight: 700,
                                                color: tealDark,
                                                margin: 0,
                                            }}
                                        >
                                            {title}
                                        </h3>
                                    </div>
                                    <ul
                                        style={{
                                            paddingLeft: 16,
                                            margin: 0,
                                            fontSize: 13,
                                            color: "#374151",
                                            lineHeight: 1.8,
                                        }}
                                    >
                                        {items.map((it) => (
                                            <li key={it}>{it}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {/* Accès + Compatibilité */}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fit, minmax(280px, 1fr))",
                                gap: 20,
                            }}
                        >
                            <div style={cardStyle}>
                                <h3
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 700,
                                        color: tealDark,
                                        marginBottom: 14,
                                        marginTop: 0,
                                    }}
                                >
                                    🔐 Accès à Votre Compte
                                </h3>
                                <p
                                    style={{
                                        fontSize: 14,
                                        color: "#374151",
                                        marginBottom: 8,
                                    }}
                                >
                                    <strong>Première connexion :</strong> Créez
                                    votre compte avec vos informations
                                    personnelles. Les notices d&apos;inscription
                                    sont disponibles via le bouton en haut de
                                    page.
                                </p>
                                <p
                                    style={{
                                        fontSize: 14,
                                        color: "#374151",
                                        marginBottom: 18,
                                    }}
                                >
                                    <strong>Mot de passe oublié :</strong>{" "}
                                    Cliquez sur &quot;Mot de passe oublié&quot;
                                    pour le récupérer.
                                </p>
                                <div
                                    style={{
                                        display: "flex",
                                        gap: 10,
                                        flexWrap: "wrap",
                                    }}
                                >
                                    <a
                                        href="https://cloud6.kavalog.fr/SHEVA/"
                                        style={{
                                            background: teal,
                                            color: "white",
                                            padding: "10px 18px",
                                            borderRadius: 8,
                                            fontWeight: 700,
                                            fontSize: 14,
                                            textDecoration: "none",
                                        }}
                                    >
                                        Accéder à Mon Compte
                                    </a>
                                    <a
                                        href="mailto:shevaweb@sheva.fr"
                                        style={{
                                            background: "white",
                                            color: tealDark,
                                            padding: "10px 18px",
                                            borderRadius: 8,
                                            fontWeight: 700,
                                            fontSize: 14,
                                            textDecoration: "none",
                                            border: `1px solid ${teal}`,
                                        }}
                                    >
                                        Aide technique
                                    </a>
                                </div>
                            </div>

                            <div style={cardStyle}>
                                <h3
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 700,
                                        color: tealDark,
                                        marginBottom: 14,
                                        marginTop: 0,
                                    }}
                                >
                                    💻 Compatibilité &amp; Support
                                </h3>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 12,
                                    }}
                                >
                                    {[
                                        {
                                            icon: "✅",
                                            label: "Navigateurs recommandés",
                                            desc: "Chrome, Firefox, Safari, Edge",
                                        },
                                        {
                                            icon: "❌",
                                            label: "Non compatible",
                                            desc: "Internet Explorer",
                                        },
                                        {
                                            icon: "📱",
                                            label: "Accès mobile",
                                            desc: "Optimisé pour smartphones et tablettes",
                                        },
                                    ].map(({ icon, label, desc }) => (
                                        <div
                                            key={label}
                                            style={{
                                                display: "flex",
                                                gap: 12,
                                                alignItems: "flex-start",
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontSize: 20,
                                                    flexShrink: 0,
                                                }}
                                            >
                                                {icon}
                                            </span>
                                            <div>
                                                <p
                                                    style={{
                                                        fontWeight: 700,
                                                        fontSize: 14,
                                                        margin: "0 0 2px",
                                                        color: "#111827",
                                                    }}
                                                >
                                                    {label}
                                                </p>
                                                <p
                                                    style={{
                                                        fontSize: 13,
                                                        color: "#6b7280",
                                                        margin: 0,
                                                    }}
                                                >
                                                    {desc}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════
                    FAQ
                ══════════════════════════════════════ */}
                <section
                    id="faq"
                    style={{ padding: "56px 24px", background: "white" }}
                >
                    <div style={{ maxWidth: 900, margin: "0 auto" }}>
                        <SectionHeader
                            label="Aide & FAQ"
                            title="Questions Fréquentes"
                        />
                        <p
                            style={{
                                color: "#6b7280",
                                fontSize: 15,
                                marginBottom: 32,
                                textAlign: "center",
                            }}
                        >
                            Cliquez sur une question pour voir la réponse.
                        </p>

                        {FAQ_SECTIONS.map((section) => (
                            <FaqSection key={section.id} section={section} />
                        ))}

                        {/* Contact si question non trouvée */}
                        <div
                            style={{
                                marginTop: 32,
                                background: "rgba(94,180,174,0.06)",
                                border: `1px solid rgba(94,180,174,0.2)`,
                                borderRadius: 14,
                                padding: "28px 32px",
                                textAlign: "center",
                            }}
                        >
                            <p
                                style={{
                                    fontSize: 18,
                                    fontWeight: 700,
                                    color: tealDark,
                                    margin: "0 0 8px",
                                }}
                            >
                                ❓ Votre question n&apos;est pas listée ?
                            </p>
                            <p
                                style={{
                                    color: "#6b7280",
                                    margin: "0 0 20px",
                                    fontSize: 15,
                                }}
                            >
                                N&apos;hésitez pas à nous contacter directement,
                                notre équipe se fera un plaisir de vous
                                renseigner !
                            </p>
                            <div
                                style={{
                                    display: "flex",
                                    gap: 12,
                                    justifyContent: "center",
                                    flexWrap: "wrap",
                                }}
                            >
                                <a
                                    href="mailto:sheva@sheva.fr"
                                    style={{
                                        background: teal,
                                        color: "white",
                                        padding: "11px 24px",
                                        borderRadius: 8,
                                        fontWeight: 700,
                                        fontSize: 14,
                                        textDecoration: "none",
                                    }}
                                >
                                    ✉️ Nous écrire
                                </a>
                                <a
                                    href="tel:+33143768676"
                                    style={{
                                        background: "white",
                                        color: tealDark,
                                        padding: "11px 24px",
                                        borderRadius: 8,
                                        fontWeight: 700,
                                        fontSize: 14,
                                        textDecoration: "none",
                                        border: `1px solid ${teal}`,
                                    }}
                                >
                                    📞 Nous appeler
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />

            {/* ── MODAL NOTICES ── */}
            {noticesOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        onClick={() => setNoticesOpen(false)}
                        style={{
                            position: "fixed",
                            inset: 0,
                            background: "rgba(0,0,0,0.45)",
                            backdropFilter: "blur(2px)",
                            zIndex: 200,
                            animation: "fadeIn 0.2s ease",
                        }}
                    />
                    {/* Panel centré */}
                    <div
                        style={{
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "min(480px, 92vw)",
                            background: "white",
                            borderRadius: 18,
                            boxShadow: "0 24px 80px rgba(0,0,0,0.25)",
                            zIndex: 201,
                            overflow: "hidden",
                            animation: "fadeIn 0.2s ease",
                        }}
                    >
                        {/* En-tête */}
                        <div
                            style={{
                                background: `linear-gradient(135deg, ${teal}, ${tealDark})`,
                                padding: "20px 24px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <div>
                                <p
                                    style={{
                                        fontSize: 11,
                                        fontWeight: 700,
                                        letterSpacing: "0.12em",
                                        textTransform: "uppercase" as const,
                                        color: "rgba(255,255,255,0.7)",
                                        margin: "0 0 4px",
                                    }}
                                >
                                    Documents PDF
                                </p>
                                <h2
                                    style={{
                                        fontSize: 18,
                                        fontWeight: 800,
                                        color: "white",
                                        margin: 0,
                                    }}
                                >
                                    Notices &amp; règlement
                                </h2>
                            </div>
                            <button
                                onClick={() => setNoticesOpen(false)}
                                style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: "50%",
                                    border: "none",
                                    background: "rgba(255,255,255,0.2)",
                                    color: "white",
                                    fontSize: 18,
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    lineHeight: 1,
                                    flexShrink: 0,
                                }}
                            >
                                ×
                            </button>
                        </div>

                        {/* Liste des notices */}
                        <div style={{ padding: "16px 24px 24px" }}>
                            <p
                                style={{
                                    fontSize: 13,
                                    color: "#6b7280",
                                    margin: "0 0 16px",
                                }}
                            >
                                Cliquez sur une notice pour l&apos;ouvrir en
                                PDF.
                            </p>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 10,
                                }}
                            >
                                {NOTICES.map((n) => (
                                    <a
                                        key={n.href}
                                        href={assetPath(n.href)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 12,
                                            padding: "14px 16px",
                                            borderRadius: 10,
                                            border: `1px solid #e5e7eb`,
                                            background: "#f9fafb",
                                            color: "#111827",
                                            fontWeight: 600,
                                            fontSize: 14,
                                            textDecoration: "none",
                                            transition:
                                                "background 0.15s, border-color 0.15s",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = `rgba(94,180,174,0.08)`;
                                            e.currentTarget.style.borderColor =
                                                teal;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background =
                                                "#f9fafb";
                                            e.currentTarget.style.borderColor =
                                                "#e5e7eb";
                                        }}
                                    >
                                        <span style={{ flexGrow: 1 }}>
                                            {n.label}
                                        </span>
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke={tealDark}
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                            <polyline points="15 3 21 3 21 9" />
                                            <line
                                                x1="10"
                                                y1="14"
                                                x2="21"
                                                y2="3"
                                            />
                                        </svg>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* ── CSS GLOBAL ── */}
            <style>{`
                @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
                .faq-link {
                    color: ${tealDark};
                    font-weight: 600;
                    text-decoration: none;
                }
                .faq-link:hover { text-decoration: underline; }
            `}</style>
        </>
    );
}
