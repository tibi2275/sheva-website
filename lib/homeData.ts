// lib/homeData.ts
// ─────────────────────────────────────────────────────────────────────────────
// Données statiques de la page d'accueil SHEVA
// ★ C'est ici qu'on modifie les stats, les cartes "Explorer" et les accès rapides
// ─────────────────────────────────────────────────────────────────────────────

// ── Chiffres clés ─────────────────────────────────────────────────────────────

export const stats = [
    { value: "670", label: "licenciés" },
    { value: "40+", label: "chevaux & poneys" },
    { value: "10 km", label: "de Paris" },
    { value: "Loi 1901", label: "association" },
];

// ── Cartes "Explorer le centre" ───────────────────────────────────────────────

export const previewCards = [
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

// ── Accès rapide ──────────────────────────────────────────────────────────────

export const quickLinks = [
    { label: "S'inscrire", href: "/infos#inscriptions", icon: "✏️" },
    { label: "Planning", href: "/planning", icon: "📅" },
    { label: "Tarifs", href: "/planning#tarifs", icon: "💶" },
    { label: "Contact", href: "/infos#contact", icon: "📞" },
    { label: "Activités", href: "/activites", icon: "🏆" },
    {
        label: "Mon compte",
        href: "https://cloud6.kavalog.fr/SHEVA/",
        icon: "👤",
    },
];

// ── Logos & labels qualité ────────────────────────────────────────────────────

export const qualityLabels = [
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

export const ffeLogos = [
    {
        src: "/images/logos/FFE_Logo.png",
        alt: "FFE - Fédération Française d'Équitation",
    },
    {
        src: "/images/logos/GHN_logo.png",
        alt: "GHN - Groupement Hippique National",
    },
];
