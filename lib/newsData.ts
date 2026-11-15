// lib/newsData.ts
// ─────────────────────────────────────────────────────────────────────────────
// Données des articles d'actualité SHEVA
// ★ C'est ici qu'on ajoute / modifie / supprime les articles
//
// Ordre : le premier = le plus récent (affiché centré par défaut)
// Badge  : ajouter  tag: "Nouveau"  sur la ou les news à mettre en avant
//          (le retirer quand ce n'est plus d'actualité — sans tag, pas de badge)
// ─────────────────────────────────────────────────────────────────────────────

import type { Article } from "@/components/NewsCarousel";

export const articles: Article[] = [
    {
        date: "Octobre 2026",
        title: "Le Challenge SHEVA 2026-2027 est lancé ! 🏆",
        excerpt:
            "5 étapes, 3 disciplines et surtout plein de bons moments entre copains ! Première étape le dimanche 15 novembre en dressage : à vos reprises 😉",
        body: `🏆 Le Challenge interne de la SHEVA revient pour la saison 2026-2027 !

C'est LE rendez-vous convivial de l'année : on se retrouve entre cavaliers, on s'encourage, on rigole… et on met en pratique tout ce qu'on travaille en reprise depuis la rentrée. Pas besoin d'être un champion : l'idée, c'est de se faire plaisir, de découvrir la compétition en douceur et de partager un bon moment au club.

📅 Les 5 étapes (le dimanche) :
- 15 novembre — Dressage
- 13 décembre — Dressage
- 17 janvier — Hunter
- 28 février — CSO
- 28 mars — CSO

🎯 Dressage : les reprises à apprendre
Pour les deux premières étapes, chaque cavalier présente la reprise de son niveau. Les reprises sont à télécharger juste en dessous 👇 (la reprise Galop 4 est aussi celle des Poneys). Un conseil : apprenez-la tôt, révisez-la à pied (oui, oui, ça marche !) et demandez à votre moniteur de vous la faire travailler en reprise.

🤝 L'esprit du Challenge
Fair-play, bienveillance et encouragements : on applaudit tout le monde, du premier au dernier passage. Et comme d'habitude, on prolonge le plaisir autour d'un repas partagé entre adhérents !

🐴 Infos et inscriptions auprès de l'accueil et de vos moniteurs : n'hésitez pas à leur poser toutes vos questions !

À très vite sur la carrière, et que le meilleur gagne… dans la bonne humeur ! 💪`,
        img: "/images/Images-illustrations/challenge.JPG",
        links: [
            {
                label: "📄 Galop 4 & Poneys",
                href: "/PDF_docs/chall_dress_G4.pdf",
            },
            { label: "📄 Galop 5", href: "/PDF_docs/chall_dress_G5.pdf" },
            { label: "📄 Galop 6", href: "/PDF_docs/chall_dress_G6.pdf" },
            { label: "📄 Galop 7", href: "/PDF_docs/chall_dress_G7.pdf" },
        ],
    },

    {
        date: "19 août 2026",
        title: "C'est la rentrée à la SHEVA 🐴",
        excerpt:
            "La saison 2026-2027 démarre le lundi 24 août ! Toute l'équipe a hâte de retrouver ses fidèles cavaliers et d'accueillir les nouveaux. Voici les infos pratiques pour bien commencer.",
        body: `🕶️ Toute l'équipe de la SHEVA espère que vous avez passé un bel été !

La saison équestre 2026-2027 démarre le lundi 24 août. Nous avons hâte de retrouver nos fidèles cavaliers et de souhaiter la bienvenue aux nouveaux adhérents !

💡 Quelques infos pratiques :

🔑 Mon compte en ligne (www.sheva.fr → bouton Mon Compte)
Suivez vos forfaits, inscrivez-vous aux stages et examens, désinscrivez-vous en cas d'absence et utilisez vos bons de récupération.

⏰ Absences
Pensez à vous désinscrire au moins 24 heures avant votre reprise : cela libère la place pour un autre cavalier et génère un bon de récupération (valable dès l'annulation et jusqu'à 2 mois après la reprise annulée, sauf pour les séances d'obstacle et au mois de juin). Même en cas d'imprévu de dernière minute, faites-le !

🐎 Reprises de rentrée
Nos chevaux et poneys rentrent tout juste du pré : les séances démarrent en douceur, avec beaucoup de travail à pied et au pas.

✉️ Règlement des forfaits
Si vous avez réglé un acompte en ligne, merci de déposer rapidement vos chèques complémentaires au bureau (à l'ordre de la SHEVA, avec le nom du cavalier au dos).

✨ Il reste encore quelques places !
Vous souhaitez nous rejoindre pour cette nouvelle saison ? N'hésitez pas à nous contacter, nous serons ravis de vous accueillir.

📅 Rendez-vous le lundi 24 août, et retrouvez toutes les informations utiles sur www.sheva.fr → Infos pratiques.`,
        img: "/images/Images-illustrations/rentreenews.jpg",
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
