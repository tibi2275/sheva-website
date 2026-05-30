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
