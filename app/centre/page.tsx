import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PhotoGallery } from "@/components/PhotoGallery";
import { DownloadPopup } from "@/components/DownloadPopup";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Le Centre Équestre SHEVA",
    description:
        "Découvrez la SHEVA, centre équestre installé au parc interdépartemental des sports de Choisy à Créteil. Infrastructures récentes, cadre verdoyant, pédagogie de qualité.",
};

// ─── BRAND ────────────────────────────────────────────────────────────────────
const teal = "rgb(94,180,174)";
const tealDark = "rgb(69,144,150)";
const orange = "#ff6b35";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const stats = [
    { value: "670", label: "Licenciés actifs" },
    { value: "75+", label: "Années d'expérience" },
    { value: "50+", label: "Chevaux et poneys" },
    { value: "20 min", label: "De Châtelet (RER D)" },
];

const values = [
    {
        icon: "🐴",
        title: "Respect du cheval",
        desc: "Bien-être et épanouissement de nos équidés",
    },
    {
        icon: "📚",
        title: "Pédagogie",
        desc: "Transmission des savoirs dans la bienveillance",
    },
    {
        icon: "🤝",
        title: "Convivialité",
        desc: "Esprit familial et entraide entre cavaliers",
    },
    {
        icon: "⭐",
        title: "Excellence",
        desc: "Recherche constante de la qualité d'enseignement",
    },
    {
        icon: "🎯",
        title: "Accessibilité",
        desc: "Équitation ouverte à tous les niveaux et budgets",
    },
];

const installations = [
    {
        img: "/images/Images-illustrations/manege-illustration.avif",
        title: "Manège Olympique",
        specs: ["85m × 30m", "Sable fibré", "Subirrigation"],
        desc: "Manège couvert permettant de pratiquer par tout temps. Équipé d'un éclairage performant pour les cours en soirée. Sa taille permet de tenir deux cours simultanément.",
    },
    {
        img: "/images/Images-illustrations/carriere-illustration.avif",
        title: "Carrière Extérieure",
        specs: ["80m × 70m", "Sable fibré", "Subirrigation"],
        desc: "Grande carrière en sable fibré avec système d'arrosage en subirrigation. Idéale pour le dressage et le saut d'obstacles. Pourra accueillir des compétitions de CSO.",
    },
    {
        img: "/images/Images-illustrations/ecuries-illustration.avif",
        title: "Écuries Modernes",
        specs: ["44 boxes chevaux", "16 boxes poneys", "Éclairage adapté"],
        desc: "Boxes spacieux et aérés pour le confort de nos chevaux. Les écuries disposent de 4 douches, deux selleries et des casiers pour le matériel des cavaliers.",
    },
    {
        img: "/images/Images-illustrations/paddocks.jpeg",
        title: "Paddocks",
        specs: ["3 paddocks en sable", "4 paddocks en herbe"],
        desc: "Les paddocks, construits par nos bénévoles, constituent des espaces de liberté pour que nos chevaux puissent se détendre. D'autres installations extérieures sont prévues.",
    },
    {
        img: "/images/Images-illustrations/club-house.jpeg",
        title: "Club-House",
        specs: ["Détente", "Restauration (à venir)", "Terrasse"],
        desc: "Un espace d'accueil pour cavaliers et accompagnateurs. La terrasse et la tribune sont fonctionnelles. Une offre de restauration et snacking sera bientôt proposée.",
    },
    {
        img: "/images/Images-illustrations/paddocks-illustration.avif",
        title: "Accueil Propriétaires",
        specs: ["10 boxes chevaux", "Accès installations"],
        desc: "La SHEVA accueille des chevaux de propriétaires dans 10 boxes spacieux. Les propriétaires ont accès aux paddocks en sable et herbe, carrière et manège.",
    },
];

const equipment = [
    { icon: "🚗", label: "Parking gratuit" },
    { icon: "♿", label: "Accès PMR" },
    { icon: "✌️", label: "Terrasse" },
    { icon: "🚻", label: "Sanitaires" },
];

const orgItems = [
    {
        title: "Le Conseil d'Administration",
        items: [
            "8 à 12 membres bénévoles élus pour 3 ans par tiers parmi les membres actifs depuis plus de 6 mois.",
            "Se réunit 5 à 6 fois par an pour décider des grandes orientations et assurer le bon fonctionnement de l'association.",
        ],
    },
    {
        title: "Le Bureau",
        items: [
            "Composé du/de la Président(e), Vice-Président(e)s, Secrétaire et Trésorier(e).",
            "Élus annuellement parmi les membres du Conseil.",
            "Assure la gestion quotidienne et la mise en œuvre des décisions du Conseil.",
        ],
    },
    {
        title: "Les Bénévoles Actifs",
        items: [
            "Tous les membres motivés sont bienvenus pour contribuer aux activités et au fonctionnement de l'association.",
            "Participent à l'organisation des cours, compétitions, événements et à l'entretien du club.",
        ],
    },
    {
        title: "L'Assemblée Générale",
        items: [
            "Organisée une fois par an.",
            "Présente le rapport d'activités et le rapport financier.",
            "Vote les comptes, le budget et le renouvellement des membres du Conseil.",
            "Le vote est réservé aux membres actifs depuis plus de 6 mois, âgés de plus de 16 ans (ou via leur représentant légal).",
        ],
    },
];

const teachers = [
    {
        img: "/images/Equipe/cedric.jpeg",
        name: "Cédric Briand",
        role: "Directeur et responsable pédagogique",
        specs: ["Direction", "Perfectionnement", "Coach Équipe Amateur"],
        bio: "Arrivé il y a 30 ans à la SHEVA, Cédric en est le dirigeant. <br/>Il a à cœur de faire grandir et prospérer le centre équestre tout en préservant l'esprit familial et convivial qui en fait son identité. Depuis l'installation dans les nouvelles infrastructures, il pilote avec passion les aménagements et les projets pour accueillir cavaliers et accompagnateurs dans les meilleures conditions, tout en garantissant aux chevaux des installations de qualité, adaptées à leur confort et à leur bien-être. <br/>Titulaire du Brevet d'État d'Éducateur Sportif 2ᵉ degré, Cédric encadre également l'équipe compétition Amateur, qu'il accompagne avec exigence et bienveillance.",
    },
    {
        img: "/images/Equipe/jessica.jpeg",
        name: "Jessica Barlier",
        role: "Monitrice",
        specs: ["Perfectionnement", "Coach Équipe Club"],
        bio: "Jessica a commencé l'équitation à l'âge de 9 ans et a notamment pratiqué la voltige pendant 5/6 ans. Elle s'inscrit à la SHEVA dans le but de passer son diplôme de soigneuse. Elle fera partie des équipes compétitions Club et Amateur sous la tutelle de Muriel Mannier et Cédric Briand. Coachée par Lionel Lariche afin de pouvoir intégrer la formation au monitorat, elle obtient son BPJEPS en 2015. Elle part faire son expérience dans différents clubs hippiques et revient quelques temps à la SHEVA en tant qu'enseignante et soigneuse, à temps partiel. Puis elle est engagée dans un autre centre équestre, où elle prend la responsabilité des soins aux chevaux et coache une équipe de pony-games qu'elle mènera jusqu'à la 3ème place du podium aux championnats de France à Lamotte-Beuvron. Jessica rejoint définitivement l'équipe de la SHEVA à la rentrée 2018, un club qu'elle aime pour son ambiance familiale et pour lequel elle a un attachement particulier depuis le début de son parcours. Elle est responsable de l'équipe compétition Club 2/1.",
    },
    {
        img: "/images/Equipe/michel.avif",
        name: "Michel Vladesco",
        role: "Moniteur",
        specs: ["Tous niveaux", "Équitation de travail"],
        bio: "Michel débute l'équitation à 16 ans et obtient son BEES 1er degré à 22 ans. Après avoir enseigné dans plusieurs centres équestres, il fonde en 1994 les Écuries de Mieles (Oise), où il développe une activité riche : CSO, dressage, CCE, pony-games, spectacles et équitation ibérique. Pendant près de 20 ans, il forme de nombreux cavaliers et organise concours et événements. Depuis 2011, Michel se consacre à la formation et au débourrage des jeunes chevaux. Il rejoint la SHEVA en 2020, retrouvant une équitation classique et raisonnée, fidèle à sa vision : faire progresser chaque élève, valoriser les chevaux et offrir des séances enrichissantes pour tous.",
    },
    {
        img: "/images/Equipe/selma.jpeg",
        name: "Selma Boukhris",
        role: "Monitrice",
        specs: ["Tous niveaux", "Coach Équipe Poney", "Handisport"],
        bio: "Selma a mis le pied à l'étrier dès l'âge de 5 ans, et depuis, elle ne l'a plus jamais quitté ! Passionnée jusqu'au bout des bottes, elle découvre la compétition à 17 ans, d'abord en CSO (sauts d'obstacles), puis en CCE (concours complet), qui devient vite sa discipline de cœur 💙. <br/><br/>Toujours en quête de connaissances, Selma enchaîne les diplômes : une licence STAPS, un BPJEPS en 2018, et plus récemment, le DEJEPS en 2025 🎓🏆. Rien ne l'arrête quand il s'agit de progresser et de partager sa passion. <br/><br/>Parmi ses projets, elle rêve de rendre l'équitation accessible à tous, notamment aux personnes en situation de handicap 🐴💫. C'est aussi cette ouverture d'esprit et sa créativité qui l'ont conduite à rejoindre la SHEVA. <br/><br/>Souriante, dynamique et pleine d'idées, Selma ne manque jamais d'imagination pour proposer de nouvelles aventures. C'est d'ailleurs grâce à elle que vous pouvez suivre le quotidien de la SHEVA sur Instagram 📸✨.",
    },
    {
        img: "/images/Equipe/kyara.avif",
        name: "Kyara Gazin",
        role: "Monitrice",
        specs: ["Tous niveaux", "Compétition Amateur"],
        bio: "Kyara a commencé l'équitation à 6 ans à la SHEVA. Elle a ensuite intégré l'équipe club à 13 ans puis l'équipe amateur à 18 ans. Elle fait une licence STAPS + une 1ere année de Master en Education/Motricité et en parallèle passe son BPJEPS Equitation encadrée par Jessica et Cédric à la SHEVA. Suite à différents remplacement à la SHEVA et à une expérience saisonnière au Centre équestre de Royan, elle se décide à arrêter ses études et à se lancer à temps plein en tant que monitrice d'équitation. Sa discipline de prédilection est le CSO mais elle se perfectionne également en dressage.",
    },
    {
        img: "/images/Equipe/estelle.avif",
        name: "Estelle Go",
        role: "Monitrice",
        specs: ["Tous niveaux", "Compétition Amateur"],
        bio: "Entre Estelle et la SHEVA, c'est une histoire d'amour qui dure depuis presque 20 ans ! C'est en effet à la SHEVA qu'elle apprend à monter à cheval dès l'âge de 14 ans. Compétitrice dans l'âme, elle se lance très vite dans les concours, d'abord internes, puis en intégrant pendant 5 ou 6 ans l'équipe compétition club, et pour finir l'équipe compétition amateur depuis maintenant 8 ans. Estelle a toujours aimé transmettre ses connaissances équestres notamment aux enfants et envisage de passer son monitorat depuis plusieurs années. C'est en 2017 qu'elle saute le pas ! Technicienne en imagerie médical à l'hôpital pédiatrique Trousseau, elle prend une année sabbatique pour passer son BPJEPS. Depuis, elle assure les cours en fonction des besoins de la SHEVA, principalement durant les vacances scolaires et lorsque son planning professionnel le permet. De manière générale, Estelle est très investie au sein de la SHEVA, autant dans l'animation que dans la communication (mises à jour de la page Facebook).",
    },
];

const groomers = [
    {
        name: "Gérald Navas",
        role: "Palefrenier Soigneur",
        bio: "Gérald a rejoint la SHEVA en 2018. Il porte toute son attention au bien-être des chevaux et poneys, assurant leur soin quotidien et l'entretien des écuries.",
    },
    {
        name: "Alexis Empis",
        role: "Palefrenier Soigneur",
        bio: "Alexis nous a rejoint en février 2025 et s'occupe de nos chevaux tous les matins.",
    },
    {
        name: "Maeva Mode Derien",
        role: "Palefrenière Soigneuse",
        bio: "Maeva est la dernière à nous avoir rejoints en septembre 2025.",
    },
];

const bureau = [
    {
        img: "/images/CA/anne.jpg",
        name: "Anne Boisson",
        role: "Présidente",
        bio: "<strong>Dans la vie de tous les jours</strong> <br/>Après 40 ans de pratique, je suis aujourd'hui retraitée de mon activité de vétérinaire canin. <br/><br/>🏇 <strong>Rôle au CA</strong> <br/>Membre du bureau depuis 1994, j'ai exercé successivement les fonctions de trésorière puis de présidente à partir de 2015. Mes activités se concentrent principalement sur la gestion administrative, financière et sociale de l'association. <br/><br/>📅 <strong>Reprises</strong> <br/>Je monte dans la reprise galop 7 le jeudi soir de 20H30 à 22H. <br/><br/>✌️ <strong>Motivation</strong> <br/>Attachée à la SHEVA, où j'ai découvert l'équitation, j'ai constaté au fil des années l'évolution positive du club tant dans son ambiance conviviale que dans la qualité de ses chevaux et de son enseignement. Ma principale motivation demeure la pérennité de la SHEVA, afin qu'elle continue d'accueillir ses membres dans des installations modernes et confortables pour de nombreuses années à venir.",
    },
    {
        img: "/images/CA/ivan.jpeg",
        name: "Ivan Moszer",
        role: "Vice-Président",
        specs: ["Référent Informatique"],
        bio: "<strong>Dans la vie de tous les jours</strong> <br/>Je suis chargé de mission au Ministère de l'Enseignement Supérieur, de la Recherche et de l'Espace, dans le département des grandes infrastructures de recherche. <br/><br/>🏇 <strong>Rôle au CA</strong> <br/>Vice-Président de la SHEVA, j'accompagne la Présidente et le bureau dans de nombreuses actions (communication, subventions), et je suis correspondant pour le logiciel qui gère nos activités (à la fois vis-à-vis des adhérents et de l'éditeur). <br/><br/>📅 <strong>Reprises</strong> <br/>Fidèle de la reprise Galop 7 du samedi matin (11h30) … et de ses apéros, depuis plus de 30 ans ! <br/><br/>✌️ <strong>Motivation</strong> <br/>Cavalier à la SHEVA depuis plusieurs décennies, j'ai été séduit comme beaucoup par l'esprit familial et le respect de nos amis équidés qui y règnent. Investi au CA depuis 2011, j'ai à cœur d'accompagner le fonctionnement et le développement du centre équestre, dans les moments agréables comme dans les plus délicats.",
    },
    {
        img: "/images/CA/benedicte.jpg",
        name: "Bénédicte Daix",
        role: "Trésorière",
        bio: "<strong>Dans la vie de tous les jours</strong> <br/>Je suis vétérinaire, \"vétérinaire un jour, vétérinaire toujours\" telle est la devise de notre profession, mais ça ne m'a pas empêché de prendre ma retraite récemment. <br/><br/>🏇 <strong>Rôle au CA</strong> <br/>Après avoir fait partie du conseil d'administration plusieurs années, je me suis investie dans le bureau en tant que trésorière. Nous partageons actuellement ce poste avec Marie et je suis notamment responsable de tout ce qui concerne les cavaliers. C'est donc moi qui me cache derrière l'adresse mail comptasheva@gmail.com <br/><br/>📅 <strong>Reprises</strong> <br/>Je monte le samedi en galop 7 à 11h30 et le mardi à 12h30. Je suis souvent là le dimanche pour des stages ou des animations. <br/><br/>✌️ <strong>Motivation</strong> <br/>Cavalière depuis mon enfance je suis arrivée à la Sheva en 2003 après avoir testé plusieurs clubs de la région parisienne, je ne voudrais plus en partir. Mon attachement à ce centre équestre est aussi bien lié à l'ambiance conviviale et chaleureuse qu'à la qualité de la cavalerie et de l'enseignement. J'espère par mon engagement, contribuer à le faire vivre dans le même état d'esprit.",
    },
    {
        img: "/images/CA/marie.png",
        name: "Marie Normand-Penillault",
        role: "Vice-Trésorière",
        specs: ["Référente Poney-Club"],
        bio: "<strong>Dans la vie de tous les jours</strong> <br/>Côté professionnel, je travaille au sein du service comptabilité et finance d'une miraculeuse société d'animation. 🐞 <br/><br/>🏇 <strong>Rôle au CA</strong> <br/>Côté SHEVA, je m'implique dans la comptabilité et la gestion des comptes de notre association. <br/><br/>📅 <strong>Reprises</strong> <br/>Cavalière en G7, je suis à la SHEVA le jeudi soir à cheval (régulièrement jusqu'à pas d'heure), et souvent à pied le samedi matin 🐴 <br/><br/>✌️ <strong>Motivation</strong> <br/>Association + club familial + cavalerie au top + équipe enseignante formidable + ambiance bienveillante = la SHEVA ❤️",
    },
    {
        img: "/images/CA/laurence.jpeg",
        name: "Laurence Miroir",
        role: "Secrétaire",
        specs: ["Relation bénévoles"],
        bio: "<strong>Dans la vie de tous les jours</strong> <br/>Dans la vie de tous les jours je suis directrice départementale dans une association de lutte contre les causes de la pauvreté. <br/><br/>🏇 <strong>Rôle au CA</strong> <br/>Au CA, je suis secrétaire et j'ai pour habitude de gérer le groupe WhatsApp des bénévoles et d'organiser la fête du club. <br/><br/>📅 <strong>Reprises</strong> <br/>Ma reprise est le samedi en G7 de 11h30 à 13h. Je suis souvent présente jusqu'en début d'après-midi quand on en profite pour un petit repas ensemble ! <br/><br/>✌️ <strong>Motivation</strong> <br/>Je kiffe la Sheva depuis le début, les moniteurs, les chevaux, mes amis ! Que des bons moments : à cheval, et après en prenant l'apéro ! Et puis, vu mon métier, le bénévolat, j'ai ça dans les veines !",
    },
];

const caMembers = [
    {
        img: "/images/CA/thomas.jpeg",
        name: "Thomas Beaugendre",
        role: "Membre",
        specs: ["Partenariat", "Investissements"],
        bio: "<strong>Dans la vie de tous les jours</strong> <br/>Je suis investisseur dans des startups sur les secteurs de l'agriculture et de l'énergie. <br/><br/>🏇 <strong>Rôle au CA</strong> <br/>Au sein du conseil d'administration, je joue un rôle polyvalent, notamment dans le pôle animation, les travaux et la recherche de financements. <br/><br/>📅 <strong>Reprises</strong> <br/>J'ai fraichement rejoint l'équipe compétition amateur. Vous pouvez me retrouver à cheval le mardi soir et souvent le dimanche. <br/><br/>✌️ <strong>Motivation</strong> <br/>Mes 2 passions :  les tours de tracteur et l'organisation d'apéros et barbecue à la SHEVA !",
    },
    {
        img: "/images/CA/catherinebv.png",
        name: "Catherine Boisson-Vidal",
        role: "Membre",
        specs: ["Référent Licences", "Référent Propriétaires"],
        bio: "<strong>Dans la vie de tous les jours</strong> <br/>Je suis directrice de recherche au CNRS fraîchement retraitée. <br/><br/>🏇 <strong>Rôle au CA</strong> <br/>À la Sheva, je gère les licences (671 à ce jour) ainsi que les contrats de pension et la vie des propriétaires. <br/><br/>📅 <strong>Reprises</strong> <br/>Je ne monte plus depuis six ans, mais après plus de 45 ans passés à la Sheva — dont 25 à galoper le jeudi soir — je continue d'y être bien présente, souvent pour papoter ou tenir la buvette. <br/><br/>✌️ <strong>Motivation</strong> <br/>Fidèle au club, je m'occupe aussi de Java et Nacre, que j'ai repris à la retraite et que je bichonne depuis plus de dix ans et avec qui je profite de balades qui me comblent toujours.",
    },
    {
        img: "/images/CA/isabelle.png",
        name: "Isabelle Durand-Zaleski",
        role: "Membre",
        specs: ["Relation CA-Adhérents"],
        bio: "Adhérente de la SHEVA depuis 1998, vous pouvez me trouver : <br/><br/><strong>A cheval :</strong> <br/>Le lundi soir, reprise G6 de 19h30 <br/>Le mercredi soir, reprise G6 de 19h30 <br/><br/><strong>Dans les locaux de la SHEVA :</strong> <br/>Lors d'événements/sorties chevaux (concours, stages, balades en forêt...)",
    },
    {
        img: "/images/CA/catherinelr.png",
        name: "Catherine Laroche",
        role: "Membre",
        specs: ["Travaux", "Entretien"],
        bio: "Adhérente de la SHEVA depuis 1985, vous pouvez me trouver : <br/><br/><strong>A cheval :</strong> <br/>Le jeudi soir, reprise G7 de 20h30. <br/><br/><strong>Dans les locaux de la SHEVA :</strong> <br/>Le jeudi soir à partir de 20h et en nocturne après ma reprise.",
    },
    {
        img: "/images/CA/alice.jpeg",
        name: "Alice Sibeud",
        role: "Membre",
        specs: ["Animation", "Communication"],
        bio: "<strong>Dans la vie de tous les jours</strong> <br/>Je suis responsable du développement patrimonial dans une cie d'assurance. <br/><br/>🏇 <strong>Rôle au CA</strong> <br/>Impliquée dans la communication, l'animation et la vie du poney-club. <br/><br/>📅 <strong>Reprises</strong> <br/>Galop 2 le vendredi soir à 19h30 et le samedi à 13h. Vous pouvez également me trouver le samedi matin, j'accompagne mon fils qui est en galop d'or. <br/><br/>✌️ <strong>Motivation</strong> <br/>J'apprécie tout particulièrement l'ambiance chaleureuse de la SHEVA, l'esprit qui y règne… et bien sûr les apéritifs régulièrement partagés !",
    },
    {
        img: "/images/CA/caroline.jpg",
        name: "Caroline Salles",
        role: "Membre",
        specs: ["Animation", "Retraite chevaux & poneys"],
        bio: "<strong>Dans la vie de tous les jours</strong> <br/>🕵🏻‍♀️ <br/><br/>🏇 <strong>Rôle au CA</strong> <br/>Impliquée dans la retraite des chevaux et poneys en lien avec l'Après SHEVA, l'animation et la vie du club. <br/><br/>📅 <strong>Reprises</strong> <br/>Je monte tous les samedis matins à 11H30 dans la reprise Galop 7. <br/><br/>✌️ <strong>Motivation</strong> <br/>J'adore l'esprit familial de la SHEVA et l'accueil incomparable qui m'a été réservé depuis le premier jour où j'y suis arrivée pour ma reprise du jeudi soir il y a plus de 10 ans, sans jamais y avoir mis les pieds avant. J'adore l'ambiance, l'attention qui est portée aux chevaux et surtout les apéros avec ma reprise du samedi matin !!!",
    },
];

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

function Pill({ label }: { label: string }) {
    return (
        <span
            style={{
                display: "inline-block",
                padding: "3px 10px",
                borderRadius: 20,
                background: `rgba(94,180,174,0.1)`,
                color: tealDark,
                fontSize: 12,
                fontWeight: 600,
                border: `1px solid rgba(94,180,174,0.25)`,
            }}
        >
            {label}
        </span>
    );
}

function PersonCard({
    img,
    name,
    role,
    specs,
    bio,
    emoji,
}: {
    img?: string;
    name: string;
    role: string;
    specs?: string[];
    bio: string;
    emoji?: string;
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
            {/* Photo */}
            <div
                style={{
                    position: "relative",
                    height: 200,
                    background: "#f4f6f8",
                    flexShrink: 0,
                }}
            >
                {img ? (
                    <Image
                        src={img}
                        alt={name}
                        fill
                        style={{
                            objectFit: "contain",
                            objectPosition: "center top",
                        }}
                    />
                ) : (
                    <div
                        style={{
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 64,
                        }}
                    >
                        {emoji || "🙎"}
                    </div>
                )}
            </div>
            {/* Content */}
            <div style={{ padding: "16px 20px 20px", flex: 1 }}>
                <h3
                    style={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: "rgb(15,23,42)",
                        marginBottom: 4,
                    }}
                >
                    {name}
                </h3>
                <p
                    style={{
                        fontSize: 13,
                        color: teal,
                        fontWeight: 600,
                        marginBottom: specs?.length ? 10 : 12,
                    }}
                >
                    {role}
                </p>
                {specs && (
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 6,
                            marginBottom: 12,
                        }}
                    >
                        {specs.map((s) => (
                            <Pill key={s} label={s} />
                        ))}
                    </div>
                )}
                <div
                    style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.65 }}
                    dangerouslySetInnerHTML={{ __html: bio }}
                />
            </div>
        </div>
    );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function CentrePage() {
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
                        <span style={{ color: "white" }}>
                            Le centre équestre
                        </span>
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
                        Le Centre Équestre SHEVA
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
                        Découvrez notre histoire, nos installations et l'équipe
                        qui fait vivre la passion équestre depuis plus de 75
                        ans.
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
                            { label: "Notre histoire", href: "#histoire" },
                            { label: "L'association", href: "#association" },
                            { label: "Installations", href: "#installations" },
                            { label: "L'équipe", href: "#equipe" },
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

                {/* ── STATS ─────────────────────────────────────────────── */}
                <section
                    style={{
                        background: "white",
                        borderBottom: "1px solid #f0f0f0",
                    }}
                >
                    <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(4, 1fr)",
                            }}
                            className="stats-grid-centre"
                        >
                            {stats.map((s) => (
                                <div
                                    key={s.label}
                                    style={{
                                        padding: "24px 16px",
                                        textAlign: "center",
                                        borderRight: "1px solid #f0f0f0",
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: 32,
                                            fontWeight: 700,
                                            color: teal,
                                        }}
                                    >
                                        {s.value}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: 13,
                                            color: "#6b7280",
                                            marginTop: 4,
                                        }}
                                    >
                                        {s.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── HISTOIRE & VALEURS ────────────────────────────────── */}
                <section
                    id="histoire"
                    style={{ ...sectionStyle, background: "#fafbfb" }}
                >
                    <div style={containerStyle}>
                        <SectionHeader
                            label="Depuis 1949"
                            title="Notre Histoire et Nos Valeurs"
                        />
                        <div className="centre-two-col">
                            {/* Histoire */}
                            <div
                                style={{
                                    background: "white",
                                    borderRadius: 16,
                                    padding: "28px 32px",
                                    border: "1px solid #f0f0f0",
                                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                                }}
                            >
                                <h3
                                    style={{
                                        fontSize: 18,
                                        fontWeight: 700,
                                        color: "rgb(15,23,42)",
                                        marginBottom: 16,
                                        textAlign: "center",
                                    }}
                                >
                                    Notre Histoire
                                </h3>
                                <div
                                    style={{
                                        fontSize: 14,
                                        color: "#4b5563",
                                        lineHeight: 1.75,
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 12,
                                    }}
                                >
                                    <p>
                                        La{" "}
                                        <strong style={{ color: tealDark }}>
                                            SHEVA
                                        </strong>{" "}
                                        puise ses racines à l'
                                        <strong style={{ color: tealDark }}>
                                            École Vétérinaire d'Alfort
                                        </strong>
                                        , où l'équitation était autrefois une
                                        matière essentielle pour la formation
                                        des étudiants. Devenue{" "}
                                        <strong style={{ color: tealDark }}>
                                            association loi 1901 en 1949
                                        </strong>
                                        , elle s'est ouverte à tous les
                                        cavaliers, enfants comme adultes, dans
                                        une{" "}
                                        <strong style={{ color: tealDark }}>
                                            ambiance conviviale et familiale,
                                        </strong>{" "}
                                        fondée sur{" "}
                                        <strong style={{ color: tealDark }}>
                                            le partage, la bienveillance et le
                                            respect du cheval.
                                        </strong>
                                        .
                                    </p>
                                    <p>
                                        En{" "}
                                        <strong style={{ color: tealDark }}>
                                            2023
                                        </strong>
                                        , la SHEVA a franchi une nouvelle étape
                                        en s'installant sur{" "}
                                        <strong style={{ color: tealDark }}>
                                            4,5 hectares d'installations
                                            modernes
                                        </strong>{" "}
                                        au{" "}
                                        <strong style={{ color: tealDark }}>
                                            Parc Interdépartemental des Sports
                                            Paris Val-de-Marne
                                        </strong>
                                        . Ces infrastructures spacieuses et
                                        performantes permettent de proposer une
                                        équitation de qualité, tout en
                                        préservant l'esprit et l'héritage de
                                        l'École :{" "}
                                        <strong style={{ color: tealDark }}>
                                            passion, rigueur et transmission des
                                            savoirs
                                        </strong>{" "}
                                        restent au cœur du club.
                                    </p>
                                    <p>
                                        Aujourd'hui, la SHEVA combine{" "}
                                        <strong style={{ color: tealDark }}>
                                            histoire et modernité
                                        </strong>
                                        , offrant à chaque cavalier un cadre{" "}
                                        <strong style={{ color: tealDark }}>
                                            sûr et chaleureux
                                        </strong>{" "}
                                        pour progresser, découvrir, et partager
                                        la passion du cheval dans un
                                        environnement{" "}
                                        <strong style={{ color: tealDark }}>
                                            convivial et familial
                                        </strong>
                                        .
                                    </p>
                                </div>
                            </div>
                            {/* Valeurs */}
                            <div
                                style={{
                                    background: "white",
                                    borderRadius: 16,
                                    padding: "28px 32px",
                                    border: "1px solid #f0f0f0",
                                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                                }}
                            >
                                <h3
                                    style={{
                                        fontSize: 18,
                                        fontWeight: 700,
                                        color: "rgb(15,23,42)",
                                        marginBottom: 16,
                                        textAlign: "center",
                                    }}
                                >
                                    Nos Valeurs
                                </h3>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 14,
                                    }}
                                >
                                    {values.map((v) => (
                                        <div
                                            key={v.title}
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
                                                    marginTop: 1,
                                                }}
                                            >
                                                {v.icon}
                                            </span>
                                            <div>
                                                <span
                                                    style={{
                                                        fontSize: 14,
                                                        fontWeight: 700,
                                                        color: "rgb(15,23,42)",
                                                    }}
                                                >
                                                    {v.title}
                                                </span>
                                                <span
                                                    style={{
                                                        fontSize: 14,
                                                        color: "#6b7280",
                                                    }}
                                                >
                                                    {" "}
                                                    — {v.desc}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── ASSOCIATION ───────────────────────────────────────── */}
                <section
                    id="association"
                    style={{ ...sectionStyle, background: "white" }}
                >
                    <div style={containerStyle}>
                        <SectionHeader
                            label="Loi 1901"
                            title="Le Fonctionnement Associatif"
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
                            La SHEVA fonctionne sous le statut d'
                            <strong style={{ color: tealDark }}>
                                association loi 1901
                            </strong>
                            , garantissant une gestion transparente et
                            démocratique. Chaque cavalier de la SHEVA est
                            adhérent à l'association ce qui lui permet d'être
                            activement impliqué dans la vie du club. Notre
                            organisation repose sur :
                        </p>
                        <div className="org-grid">
                            {orgItems.map((o) => (
                                <div
                                    key={o.title}
                                    style={{
                                        background: "#fafbfb",
                                        padding: "20px 24px",
                                        border: "1px solid #f0f0f0",
                                        borderLeft: `3px solid ${teal}`,
                                        borderRadius: "0 14px 14px 0",
                                    }}
                                >
                                    <h4
                                        style={{
                                            fontSize: 14,
                                            fontWeight: 700,
                                            color: "rgb(15,23,42)",
                                            marginBottom: 10,
                                        }}
                                    >
                                        {o.title}
                                    </h4>
                                    <ul
                                        style={{
                                            listStyle: "none",
                                            padding: 0,
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 6,
                                        }}
                                    >
                                        {o.items.map((item) => (
                                            <li
                                                key={item}
                                                style={{
                                                    fontSize: 13,
                                                    color: "#6b7280",
                                                    display: "flex",
                                                    gap: 8,
                                                    alignItems: "flex-start",
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
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {/* Liens Utiles */}
                        <div style={{ marginTop: 40 }}>
                            <h3
                                style={{
                                    fontSize: 15,
                                    fontWeight: 700,
                                    color: "rgb(15,23,42)",
                                    marginBottom: 16,
                                    textAlign: "center",
                                }}
                            >
                                Liens Utiles
                            </h3>
                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 12,
                                    justifyContent: "center",
                                }}
                            >
                                <a
                                    href="#board"
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
                                    Voir les membres
                                </a>
                                <a
                                    href="mailto:ca@sheva.fr"
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
                                    Contacter le Conseil d'Administration
                                </a>
                                <DownloadPopup />
                            </div>
                        </div>

                        {/* Bénévoles */}
                        <div
                            style={{
                                marginTop: 32,
                                background: `rgba(94,180,174,0.06)`,
                                borderRadius: 16,
                                padding: "28px 32px",
                                border: `1px solid rgba(94,180,174,0.2)`,
                                textAlign: "center",
                            }}
                        >
                            <h3
                                style={{
                                    fontSize: 16,
                                    fontWeight: 700,
                                    color: "rgb(15,23,42)",
                                    marginBottom: 10,
                                    textAlign: "center",
                                }}
                            >
                                Nos Bénévoles
                            </h3>
                            <p
                                style={{
                                    fontSize: 14,
                                    color: "#4b5563",
                                    lineHeight: 1.7,
                                    marginBottom: 20,
                                    textAlign: "center",
                                }}
                            >
                                La SHEVA, c'est aussi une équipe de bénévoles
                                passionnés qui contribuent au bon fonctionnement
                                de l'association : organisation d'événements,
                                entretien des installations, animation des
                                concours internes...{" "}
                                <strong>Rejoignez-nous !</strong>
                            </p>
                            <a
                                href="mailto:ca@sheva.fr"
                                style={{
                                    display: "inline-block",
                                    padding: "10px 20px",
                                    borderRadius: 10,
                                    background: `linear-gradient(135deg, ${teal}, ${tealDark})`,
                                    color: "white",
                                    fontWeight: 700,
                                    fontSize: 13,
                                    textDecoration: "none",
                                    justifyContent: "center",
                                }}
                            >
                                Devenir bénévole →
                            </a>
                        </div>
                    </div>
                </section>

                {/* ── INSTALLATIONS ─────────────────────────────────────── */}
                <section
                    id="installations"
                    style={{ ...sectionStyle, background: "#fafbfb" }}
                >
                    <div style={containerStyle}>
                        <SectionHeader
                            label="4,5 hectares"
                            title="Nos Installations"
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
                            Situées au cœur du Parc Interdépartemental des
                            Sports de Créteil, nos installations modernes et
                            sécurisées offrent un cadre idéal pour la pratique
                            équestre.
                        </p>
                        <div className="installations-grid-new">
                            {installations.map((inst) => (
                                <div
                                    key={inst.title}
                                    style={{
                                        background: "white",
                                        borderRadius: 16,
                                        overflow: "hidden",
                                        border: "1px solid #f0f0f0",
                                        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                                    }}
                                >
                                    <div
                                        style={{
                                            position: "relative",
                                            height: 200,
                                        }}
                                    >
                                        <Image
                                            src={inst.img}
                                            alt={inst.title}
                                            fill
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>
                                    <div style={{ padding: "16px 20px 20px" }}>
                                        <h3
                                            style={{
                                                fontSize: 16,
                                                fontWeight: 700,
                                                color: "rgb(15,23,42)",
                                                marginBottom: 10,
                                            }}
                                        >
                                            {inst.title}
                                        </h3>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexWrap: "wrap",
                                                gap: 6,
                                                marginBottom: 12,
                                            }}
                                        >
                                            {inst.specs.map((s) => (
                                                <Pill key={s} label={s} />
                                            ))}
                                        </div>
                                        <p
                                            style={{
                                                fontSize: 13,
                                                color: "#6b7280",
                                                lineHeight: 1.65,
                                            }}
                                        >
                                            {inst.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Équipements */}
                        <div
                            style={{
                                marginTop: 40,
                                background: "white",
                                borderRadius: 16,
                                padding: "24px 28px",
                                border: "1px solid #f0f0f0",
                                alignItems: "center",
                                textAlign: "center",
                            }}
                        >
                            <h3
                                style={{
                                    fontSize: 15,
                                    fontWeight: 700,
                                    color: "rgb(15,23,42)",
                                    marginBottom: 16,
                                }}
                            >
                                Équipements & Services
                            </h3>
                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 12,

                                    justifyContent: "center",
                                }}
                            >
                                {equipment.map((e) => (
                                    <div
                                        key={e.label}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 8,
                                            padding: "8px 16px",
                                            borderRadius: 10,
                                            background: "#f4f6f8",
                                            fontSize: 13,
                                            fontWeight: 600,
                                            color: "#4b5563",
                                        }}
                                    >
                                        <span style={{ fontSize: 18 }}>
                                            {e.icon}
                                        </span>{" "}
                                        {e.label}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Location */}
                        <div
                            style={{
                                marginTop: 24,
                                background: `rgba(94,180,174,0.06)`,
                                borderRadius: 16,
                                padding: "28px 32px",
                                border: `1px solid rgba(94,180,174,0.2)`,
                                textAlign: "center",
                            }}
                        >
                            <h3
                                style={{
                                    fontSize: 16,
                                    fontWeight: 700,
                                    color: "rgb(15,23,42)",
                                    marginBottom: 10,
                                }}
                            >
                                Louez nos installations
                            </h3>
                            <p
                                style={{
                                    fontSize: 14,
                                    color: "#4b5563",
                                    lineHeight: 1.7,
                                    marginBottom: 20,
                                }}
                            >
                                Nos installations sont disponibles à la location
                                pour des événements équestres, séminaires ou
                                autres activités. Carrière, manège ou club-house
                                — nous proposons des formules adaptées à vos
                                besoins.
                            </p>
                            <a
                                href="mailto:sheva@sheva.fr"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    padding: "10px 22px",
                                    borderRadius: 10,
                                    background: `linear-gradient(135deg, ${orange}, #f7931e)`,
                                    color: "white",
                                    fontWeight: 700,
                                    fontSize: 13,
                                    textDecoration: "none",
                                }}
                            >
                                Nous contacter →
                            </a>
                        </div>
                    </div>
                </section>

                {/* ── GALERIE ───────────────────────────────────────────── */}
                <PhotoGallery />

                {/* ── ÉQUIPE ────────────────────────────────────────────── */}
                <section
                    id="equipe"
                    style={{ ...sectionStyle, background: "white" }}
                >
                    <div style={containerStyle}>
                        <SectionHeader
                            label="Nos experts"
                            title="Notre Équipe"
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
                            Pour que chaque cavalier trouve l'équitation qui lui
                            correspond, notre équipe de 6 enseignants diplômés
                            d'État propose un large choix d'activités : de
                            l'éveil poney dès 3 ans à la compétition.
                        </p>

                        <h3
                            style={{
                                fontSize: 17,
                                fontWeight: 700,
                                color: "rgb(15,23,42)",
                                marginBottom: 20,
                                paddingBottom: 10,
                                borderBottom: "1px solid #f0f0f0",
                                textAlign: "center",
                            }}
                        >
                            L'Équipe Pédagogique
                        </h3>
                        <div className="team-grid-new">
                            {teachers.map((t) => (
                                <PersonCard key={t.name} {...t} />
                            ))}
                        </div>

                        <h3
                            style={{
                                fontSize: 17,
                                fontWeight: 700,
                                color: "rgb(15,23,42)",
                                margin: "48px 0 20px",
                                paddingBottom: 10,
                                borderBottom: "1px solid #f0f0f0",
                                textAlign: "center",
                            }}
                        >
                            Les Soigneurs
                        </h3>
                        <div className="team-grid-new">
                            {groomers.map((g) => (
                                <PersonCard key={g.name} {...g} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── CA ────────────────────────────────────────────────── */}
                <section style={{ ...sectionStyle, background: "#fafbfb" }}>
                    <div style={containerStyle}>
                        <SectionHeader
                            label="Gouvernance"
                            title="Le Conseil d'Administration"
                        />

                        <h3
                            id="board"
                            style={{
                                fontSize: 17,
                                fontWeight: 700,
                                color: "rgb(15,23,42)",
                                marginBottom: 20,
                                paddingBottom: 10,
                                borderBottom: "1px solid #f0f0f0",
                                textAlign: "center",
                            }}
                        >
                            Le Bureau
                        </h3>
                        <div className="ca-grid-new">
                            {bureau.map((m) => (
                                <PersonCard key={m.name} {...m} />
                            ))}
                        </div>

                        <h3
                            style={{
                                fontSize: 17,
                                fontWeight: 700,
                                color: "rgb(15,23,42)",
                                margin: "48px 0 20px",
                                paddingBottom: 10,
                                borderBottom: "1px solid #f0f0f0",
                                textAlign: "center",
                            }}
                        >
                            Les Membres
                        </h3>
                        <div className="ca-grid-new">
                            {caMembers.map((m) => (
                                <PersonCard key={m.name} {...m} />
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
