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
        date: "Samedi 14 mars 2026",
        title: "Concours de Printemps : le programme est disponible",
        excerpt:
            "Le traditionnel concours de printemps du SHEVA aura lieu les 4 et 5 avril. Découvrez le programme et les modalités d'inscription pour cavaliers et spectateurs.",
        body: `C'est officiel : le concours de printemps du SHEVA se tiendra les samedi 4 et dimanche 5 avril 2026 sur nos installations.

Au programme, des épreuves de CSO (Club 1 à Amateur 2) ainsi que des épreuves de dressage niveaux débutant et confirmé. La journée du samedi sera consacrée aux épreuves jeunes cavaliers, et le dimanche aux catégories seniors.

📋 Inscription des cavaliers :
Les engagements sont à déposer avant le 28 mars via le formulaire disponible à l'accueil ou en ligne sur la page Activités.

🎪 Pour les spectateurs :
L'entrée est libre et gratuite. Une buvette sera tenue par l'association tout le week-end, et un espace restauration sera disponible le dimanche midi.

Venez nombreux encourager nos cavaliers !`,
        img: "/images/Images-illustrations/activ-hero.jpeg",
    },
    {
        date: "Mardi 3 mars 2026",
        title: "Nouveaux poneys au centre : bienvenue à Noisette et Galéo !",
        excerpt:
            "Le SHEVA a accueilli deux nouveaux poneys en ce début de printemps. Noisette et Galéo viennent renforcer notre troupe et rejoindront les reprises dès avril.",
        body: `Nous avons le plaisir de vous présenter deux nouvelles têtes qui ont rejoint l'écurie du SHEVA début mars.

🐴 Noisette — Poney Welsh section B, 7 ans
Jument douce et fiable, Noisette est idéale pour les cavaliers en apprentissage. Elle a déjà une belle expérience du travail en carrière et s'intégrera dans les reprises débutants dès le mois d'avril.

🐴 Galéo — Poney Connemara, 9 ans
Galéo est un petit costaud plein d'énergie, parfait pour les cavaliers intermédiaires qui souhaitent progresser sur les exercices techniques. Il adore les barres et sera très à l'aise sur les cours de CSO.

Les deux poneys sont en période d'intégration au sein de la troupe. Venez faire leur connaissance aux heures de pansage ou lors de votre prochaine reprise — ils adorent les caresses !`,
        img: "/images/Images-illustrations/chevaux-hero.jpeg",
    },
    {
        date: "Vendredi 20 février 2026",
        title: "Rénovation du club-house : les travaux avancent bien !",
        excerpt:
            "Les travaux de rénovation du club-house sont en bonne voie. Découvrez les changements prévus et la date de réouverture annoncée pour fin mars.",
        body: `Depuis début février, l'équipe du SHEVA s'active pour rénover entièrement le club-house. Les travaux, lancés cet hiver pour minimiser la gêne pendant la saison active, avancent selon le calendrier prévu.

🔨 Ce qui change :
• Peinture intégrale des murs et du plafond
• Remplacement des tables et chaises par du mobilier neuf
• Installation d'un espace cafétéria avec machine à café et micro-ondes
• Création d'un coin lecture / jeux pour les enfants qui attendent pendant les cours

📅 Réouverture prévue : fin mars 2026
La date exacte sera communiquée sur notre page Instagram et sur les panneaux d'affichage de l'accueil. En attendant, les vestiaires et sanitaires restent accessibles normalement.

Merci de votre patience — le résultat va valoir le coup !`,
        img: "/images/Images-illustrations/club-house.jpeg",
    },
    {
        date: "Dimanche 8 février 2026",
        title: "Vacances d'Hiver : Inscriptions aux reprises ouvertes",
        excerpt:
            "Les vacances d'hiver approchent ! Comme chaque année, un planning dédié est mis en place. Les inscriptions se font depuis votre espace en ligne.",
        body: `Les vacances d'hiver approchent à grands pas, et le SHEVA vous prépare un planning de reprises spécialement conçu pour ces deux semaines.

Que vous soyez débutant ou cavalier confirmé, des créneaux adaptés à tous les niveaux seront disponibles du lundi au vendredi tout au long de la période de vacances.

📅 Comment s'inscrire ?
Les inscriptions se font exclusivement depuis votre espace adhérent en ligne. Connectez-vous et réservez votre créneau avant qu'il ne soit complet — les places partent vite !

🐴 Ce qui vous attend :
• Reprises en carrière et en manège
• Séances de longe pour les plus jeunes (à partir de 4 ans)
• Ateliers découverte du pansage et des soins

N'hésitez pas à contacter le club si vous avez des questions. À très bientôt au centre !`,
        img: "/images/Images-illustrations/shevaneige.jpg",
    },
];
