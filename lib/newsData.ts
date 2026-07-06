// lib/newsData.ts
// ─────────────────────────────────────────────────────────────────────────────
// Données des articles d'actualité SHEVA
// ★ C'est ici qu'on ajoute / modifie / supprime les articles
//
// Ordre : le premier = le plus récent (affiché centré par défaut)
// ─────────────────────────────────────────────────────────────────────────────

import type { Article } from "@/components/NewsCarousel";

export const articles: Article[] = [
    {
        date: "Juillet 2026",
        title: "Le centre équestre ferme ses portes pour l'été ☀️",
        excerpt:
            "Nos chevaux sont partis se ressourcer au pré, et toute l'équipe en profite aussi pour souffler ! Rendez-vous le 24 août pour une reprise en pleine forme.",
        body: `☀️ C'est l'heure des vacances à la SHEVA !

Le centre équestre ferme ses portes : nos chevaux sont partis se dégourdir les jambes au pré, entre copains, avec plein d'herbe à brouter et de grands espaces pour se défouler. Un vrai moment de ressourcement bien mérité pour eux aussi !

🏖️ Certain chanceux ont la chance d'aller resprirer l'air marin pour le stage à Deauville et rejoindront très prochainement leurs camarades au pré.

Tout ce petit monde reviendra quelques jours avant la reprise des cours, fin août, prêt à retrouver tous ses amis en pleine forme.

C'est aussi une période de repos bien méritée pour toute l'équipe de la SHEVA, qui a elle aussi besoin de recharger les batteries avant une nouvelle saison.

📅 On se retrouve tous à partir du 24 août !

📧 D'ici là, privilégiez les contacts par email : le téléphone de la SHEVA ne sera pas joignable pendant cette période. Les emails nous permettent une meilleure traçabilité pour vous répondre au mieux dès notre retour.

Belle fin d'été à tous, cavaliers, familles et amis de la SHEVA 🐴🌿`,
        img: "/images/Images-illustrations/vac_news.jpg",
        imgPosition: "center bottom",
    },

    {
        date: "Avril 2026",
        title: "Inscriptions saison 2026-2027 : les dates à retenir",
        excerpt:
            "Les inscriptions pour la prochaine saison sont ouvertes ! Réunion d'information, ouverture des essais, nouveaux adhérents… voici toutes les dates clés.",
        body: `Les inscriptions pour la saison 2026-2027 sont ouvertes ! Si vous souhaitez nous rejoindre, voici quelques dates à retenir :

        📅 6 mai à 20h — Réunion d'information - https://meet.google.com/afr-xbej-the
        Venez découvrir le club, poser vos questions et rencontrer l'équipe. Ouverte à tous, cavaliers débutants comme confirmés.

        ✨ 11 mai 2026 — Ouverture des inscriptions aux séances d'essai
        Vous ne nous connaissez pas encore ? Réservez une séance d'essai pour tester l'équitation dans les meilleures conditions.

        📌 26 mai — Ouverture aux nouveaux adhérents
        Les inscriptions officielles pour la saison 2026-2027 ouvrent aux nouveaux membres.

        Si nous avons déjà l'honneur de vous compter parmi nos adhérents, à vos agendas :

        🔑 À partir du 11 mai 2026 — début des réinscriptions
        Les adhérents actuels peuvent renouveler leur inscription en priorité dès cette date depuis leur espace en ligne.

        Retrouvez toutes les infos sur les pages Planning & Tarifs et Infos pratiques, ou contactez-nous directement à l'accueil.`,
        img: "/images/Images-illustrations/activ-hero.jpeg",
    },

    {
        date: "Mai 2026",
        title: "Notre club house s'équipe !!",
        excerpt:
            "Afin de tujours mieux vous accueillir, nous avons fait l'acquisition de nouveau mobilier pour notre club house.",
        body: `🏡 Un club-house encore plus accueillant !

Ces dernières semaines, nous avons investi dans de nouveaux équipements et du mobilier pour aménager et moderniser notre club-house.

L'objectif ? Offrir à tous un espace plus confortable et convivial, que ce soit pour attendre pendant les cours, se retrouver après une séance, partager un apéritif lors des événements du club ou simplement profiter d'un moment de détente au centre équestre.

Ces nouveaux aménagements permettront également de mieux accueillir nos activités d'équicoaching, nos réunions, ainsi que les groupes souhaitant louer nos installations pour leurs événements.

Nous avons hâte de vous faire découvrir ce nouvel espace de vie, pensé pour que chacun se sente à la SHEVA comme chez lui !

À très bientôt au club-house ☕🐴
`,
        img: "/images/Images-illustrations/clubhousenew.jpg",
    },

    {
        date: "Dimanche 11 avril 2026",
        title: "Journée bénévolat au centre équestre le 18 avril",
        excerpt:
            "Nouvelle mobilisation des super bénévoles de la SHEVA ! Rendez-vous le samedi 18 avril pour une journée de travaux collectifs au centre équestre. Au programme : nettoyage, petits travaux d'entretien, et bien sûr bonne humeur garantie !",
        body: `Avec l'arrivée du printemps, c'est le moment idéal pour une grande session de nettoyage, de jardinage et de travaux aux centre équestre. 

        Au programme de cette journée de bénévolat :
        - Désherbage des allées et des paddocks
        - Réparation des clôtures des paddocks
        - Finaliser l'accès aux paddocks en herbe
Comme toujours vous êtes attendus nombreux, quelques soient vos compétences pour une journée pleine de bonne humeur!`,
        img: "/images/Images-illustrations/challenge.JPG",
    },
];
