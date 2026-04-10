import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PhotoGallery } from "@/components/PhotoGallery";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { assetPath } from "@/lib/assetPath";

export const metadata: Metadata = {
    title: "Nos Chevaux & Poneys | SHEVA - Pôle équestre Paris Val-de-Marne",
    description:
        "Découvrez les chevaux et poneys de la SHEVA, sélectionnés pour leur qualité, leur gentillesse et leur polyvalence. Des montures adaptées à tous les niveaux pour apprendre et progresser.",
};

// ─── BRAND ────────────────────────────────────────────────────────────────────
const teal = "rgb(94,180,174)";
const tealDark = "rgb(69,144,150)";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const chevaux = [
    {
        name: "Adock Dipo",
        img: "/images/chevaux/adock.png",
        year: "2010",
        level: "Galop 6 & 7",
        breed: "Selle Français",
        color: "Bai",
        bio: "Arrivé à la SHEVA en juin 2015, Adock fait partie de la cavalerie confirmée et participe aux compétitions amateurs. Avec sa bouille de \"bébé peluche\" Adock donne envie de lui faire des bisous, qu'il acceptera avec plaisir (la carotte étant bien sûr préférée !). Très gentil et câlin au box, il en est de même avec ses congénères et dans le travail. Toutefois attention à l'eau qui dort : il peut se révéler très joueur à ses heures !",
    },
    {
        name: "Agatha Ardenaise",
        img: "/images/chevaux/agatha.png",
        year: "2010",
        level: "Galop 4 & 5",
        breed: "Anglo Arabe de Complément",
        color: "Grise",
        bio: "Arrivée à la SHEVA en juin 2015, Agatha fait partie de la cavalerie intermédiaire et participe aux compétitions club. C'est une jument calme et franche dans toute situation. Au box, elle est gentille et attentionnée envers son cavalier. Son seul défaut : un caractère pas toujours aimable envers ses congénères (sauf peut être pour sa grande copine Ariane !).",
    },
    {
        name: "Arek",
        img: "/images/chevaux/arek.avif",
        year: "2010",
        level: "Galop 6 & 7",
        breed: "Selle Français",
        color: "Alezan",
        bio: "Ce grand cheval alezan a rejoint les rangs de la SHEVA l'été 2016. Arek est un cheval très calme, gentil et câlin. Très bien dressé, il fait le bonheur des cavaliers en dressage.",
    },
    {
        name: "Ariane Ardenaise",
        img: "/images/chevaux/ariane.avif",
        year: "2010",
        level: "Galop 6 & 7",
        breed: "Selle Français",
        color: "Bai",
        bio: "Arrivée à la SHEVA en juin 2015. Ariane est une jument qui peut être agitée au pansage mais très calme montée. Elle est assez polyvalente et fait actuellement les cours g4/5.",
    },
    {
        name: "Atchoum Dipo",
        img: "/images/chevaux/atchoul.png",
        level: "Galop 4 & 5",
        breed: "Selle Français",
        color: "Bai",
        bio: "Arrivée à la SHEVA en juin 2015, Atchoum a fait partie de l'équipe compétition amateur puis club et maintenant fait le plaisir des cavaliers galops 0 à 3. C'est une jument tonique qui a envie de bien faire.",
    },
    {
        name: "Athena's Girl Perves",
        img: "/images/chevaux/athenas.png",
        year: "2010",
        level: "Galop 6 & 7",
        breed: "Selle Français",
        color: "Bai",
        bio: "Arrivée en septembre 2016, Athéna's Girl fait partie de la cavalerie confirmée. Cette jeune jument, qui a pu en faire voir de toutes les couleurs à ses cavaliers s'est maintenant bien assagie. C'est une jument très attachante au box.",
    },
    {
        name: "Bali Val Joly",
        img: "/images/chevaux/bali.avif",
        year: "2011",
        level: "Galop 0 - 3",
        breed: "Selle Français",
        color: "Bai",
        bio: "Arrivée à la rentrée 2017, cette jolie petite jument a rejoint la cavalerie galop 0 à 3 après une petite année d'apprentissage. Malgré un caractère ronchon au box et avec ses congénères, Bali est une jument studieuse qui a besoin d'être rassurée.",
    },
    {
        name: "Baltique du Talus",
        img: "/images/chevaux/baltique.png",
        year: "2011",
        level: "Galop 6 & 7",
        breed: "Selle Français",
        color: "Bai",
        bio: "Baltique a rejoint la cavalerie de la SHEVA en juillet 2016. Baltique est actuellement l'un des plus grands chevaux du club en taille et en gabarit, il peut devenir vite très encombrant et se transformer facilement en bêtises : attention donc à vos affaires et vos doigts quand vous devez vous en occuper. Dans le travail, Baltique s'avère être bon élève parfois un peu fainéant.",
    },
    {
        name: "Bingo",
        img: "/images/chevaux/Bingo.png",
        level: "Galop 6 & 7",
        color: "Bai",
        bio: "Bingo est un cheval qui participe actuellement à l'équipe compétition club. C'est un cheval très attachant au box et très bien dressé à cheval. Cependant il peut être un peu peureux surtout le long de la terrasse.",
    },
    {
        name: "Black B",
        img: "/images/chevaux/blackb.png",
        year: "2016",
        breed: "ONC",
        color: "Noir",
        bio: "Arrivé à la SHEVA en 2020, ce joli petit poney à la robe noire brillante est le binôme indiscutable de Perle. Sa bonne énergie agrémentée d'une certaine sensibilité sont autant de qualités appréciées par ses cavaliers.",
    },
    {
        name: "Blanquito",
        img: "/images/chevaux/blanquito.png",
        color: "Palomino",
        bio: "Blanquito est un petit cheval à la robe d'un cheval de Barbie, mais attention, il est très gourmand et fainéant.",
    },
    {
        name: "Bonus du Taillis",
        img: "/images/chevaux/bonus.avif",
        year: "2011",
        level: "Galop 6 & 7",
        breed: "Selle Français",
        color: "Bai",
        bio: "Bonus a rejoint la SHEVA à la rentrée 2016. Bonus est un gentil cheval, très attachant aussi bien au box que monté. C'est un vrai maître d'école. Il participe à l'équipe compétition amateur et a de très bons résultats.",
    },
    {
        name: "Bulma Dipo",
        img: "/images/chevaux/Bulma.avif",
        year: "2011",
        breed: "Selle Français",
        color: "Alezan",
        bio: 'Arrivé à la SHEVA en juin 2015, Bulma fait partie de la cavalerie intermédiaire et participe aux compétitions club. Véritable "cheval de Barbie", Bulma est extrêmement attachant : très câlin, curieux de tout et très gentil. Au travail il est volontaire et gentil et délicat.',
    },
    {
        name: "Canabis",
        img: "/images/chevaux/Cannabis.png",
        year: "2005",
        breed: "ONC",
        color: "Gris",
        bio: "Canabis est une gentille petite jument qui a été recrutée pour les cours débutants. Elle fait toujours volontiers son travail. En plus des cours classiques, Cannabis fait aussi de la voltige, des cours d'équihandi.",
    },
    {
        name: "Comtesse du Taillis",
        img: "/images/chevaux/comtesse.png",
        year: "2012",
        level: "Galop 6 & 7",
        breed: "Selle Français",
        color: "Bai Brun",
        bio: "Comtesse appartient à la SHEVA depuis septembre 2016, mais n'est réellement arrivée au club qu'à la rentrée 2017. En effet durant une année, elle a profité d'un apprentissage auprès d'un cavalier professionnel. À présent Comtesse a un très bon caractère. Elle est également très câline, mais la nourriture passera toujours avant tout pour elle.",
    },
    {
        name: "Eames Boy du Taillis Z",
        img: "/images/chevaux/eams.png",
        level: "Galop 6 & 7",
        color: "Bai",
        bio: "Eames est un grand et gentil cheval, apprécié pour son caractère posé et sa générosité. Arrivé à la SHEVA en 2024, il a suivi une année de formation dans nos écuries afin de développer ses qualités. Il montre de très bonnes allures ainsi que de belles aptitudes à l'obstacle. Grâce à ses progrès constants, Eames rejoint désormais le piquet compétition amateur.",
    },
    {
        name: "Epona Ardenaise",
        img: "/images/chevaux/epona.png",
        year: "2014",
        breed: "Selle Français",
        color: "Alezan",
        bio: "Elle a rejoint les rangs de la SHEVA en juin 2019. Elle fait partie de la cavalerie intermédiaire grâce à son gentil caractère. Epona est une jument gentille et calme, avec un très beau coup de saut.",
    },
    {
        name: "Foster d'Orangerie",
        img: "/images/chevaux/Foster.png",
        level: "Galop 6 & 7",
        color: "Bai Brun",
        bio: "Foster est un grand cheval d'expérience, arrivé à la SHEVA en septembre 2025. Avec un solide parcours en compétition d'obstacle sur de belles épreuves, il met désormais son savoir-faire au service du piquet compétition amateur. Cheval serein et appliqué, il se distingue par sa concentration, son dynamisme et sa puissance. Toujours tonique et volontaire, Foster donne le meilleur de lui-même pour son cavalier.",
    },
    {
        name: "Gaulois Lardennais",
        img: "/images/chevaux/Gaulois.png",
        year: "2016",
        breed: "Poney Français de Selle",
        color: "Bai",
        bio: "Arrivé à la SHEVA en 2020, Gaulois a peaufiné son dressage avec un enseignant. C'est un petit cheval expressif et volontaire, très apprécié de ses cavaliers.",
    },
    {
        name: "Gemme Ardennaise",
        img: "/images/chevaux/Gemme.png",
        year: "2016",
        level: "Galop 6 & 7",
        breed: "OC",
        color: "Noire",
        bio: "Arrivée à la SHEVA en 2020, cette jeune jument a peaufiné son dressage avec un enseignant. C'est une jument sensible, mais très appliquée.",
    },
    {
        name: "Génial Ardennais",
        img: "/images/chevaux/Genial.png",
        year: "2016",
        level: "Galop 6 & 7",
        breed: "OC",
        color: "Noir",
        bio: "Arrivé à la SHEVA en 2020, ce jeune cheval a peaufiné son dressage avec un enseignant. Très attachant avec une volonté de bien faire. Attention au galop ça secoue et ça peut donner le mal de mer !",
    },
    {
        name: "Hacker du Geneley",
        img: "/images/chevaux/hacker.png",
        level: "Galop 6 & 7",
        color: "Bai",
        bio: "Hacker est un cheval qui aime beaucoup avoir l'attention de son cavalier pour avoir un maximum de gratouilles et de carottes. C'est un cheval qui montre de très bonnes allures en dressage, discipline dans laquelle il a pu performer avec la monitrice qui l'a formé.",
    },
    {
        name: "Igdrazil",
        img: "/images/chevaux/igdrazil.png",
        color: "Pie Alezan",
        bio: "Igdrazil est le seul cheval pie de notre cavalerie, ce qui le rend immédiatement reconnaissable. Avec son gabarit imposant, il impressionne autant par sa prestance que par sa douceur. Très calme et bien dressé, il convient parfaitement aux cavaliers de niveau intermédiaire. Malgré une certaine appréhension de l'eau, Igdrazil reste un partenaire fiable et agréable, idéal pour progresser en confiance.",
    },
    {
        name: "Luzi Vera WS",
        img: "/images/chevaux/Luzi.png",
        year: "2016",
        level: "Galop 6 & 7",
        breed: "KWPN",
        color: "Bai",
        bio: "Cette jolie jument arrivée en 2020 a su nous séduire très jeune de sa Belgique lointaine. Ses belles allures, son chic agrémenté d'un poil de caractère lui confèrent un avenir prometteur. Elle participe actuellement aux compétitions amateurs.",
    },
    {
        name: "Mojito de la Mouline",
        img: "/images/chevaux/mojito.png",
        year: "2022",
        level: "En formation",
        breed: "Selle Français",
        color: "Alezan",
        bio: "Mojito, 4 ans, vient tout juste de rejoindre les écuries et nous avons hâte de vous le faire découvrir ✨ Actuellement au travail avec Kyara, il poursuit sa formation avec sérieux et régularité. Déjà remarqué lors des épreuves de présentation des 3 ans, où il a obtenu de très belles notes, Mojito s'est distingué par son modèle et son attitude. C'est un jeune cheval prometteur, doté d'un excellent potentiel et d'un mental intéressant. Une belle aventure commence avec lui… à suivre de près ! 🐎",
    },
    {
        name: "Qavaletti du Brèche",
        img: "/images/chevaux/qavaleti.avif",
        nickname: "Petit poney",
        year: "2004",
        breed: "Selle Français",
        color: "Alezan",
        bio: "Qavaletti rejoint les rangs de la SHEVA au printemps 2008. Après quelques mois de travail avec Cédric, il a intégré l'équipe compétition amateur puis club, il est maintenant moins sollicité et fait les cours intermédiaires et débutants. Très bien dressé et bon sauteur. Surnommé \"Petit poney\" pour sa bouille de bébé qu'il a toujours gardée, c'est un cheval calme et câlin au box.",
    },
    {
        name: "Serafina",
        img: "/images/chevaux/seraphina.avif",
        year: "2011",
        breed: "Hannovrien",
        color: "Noire",
        bio: "Cette jolie petite jument noire a rejoint les rangs de la SHEVA en juin 2016. Séraphina est une jument très sage et attachante au box avec un physique de princesse. Séraphina participe aux compétitions avec l'équipe club.",
    },
    {
        name: "Tareg de l'Orgère",
        img: "/images/chevaux/tareg.avif",
        year: "2007",
        breed: "Selle Français",
        color: "Bai",
        bio: "Tareg est l'un des plus grands chevaux de la SHEVA, mais malgré un caractère un peu grognon au box il reste un grand gentil, autant en main que monté où il est toujours très sage. Après plusieurs années de travail dans les reprises confirmées et en équipe amateur, Tareg fait désormais partie de la cavalerie intermédiaire et débutante.",
    },
    {
        name: "Tarzan des Islots",
        img: "/images/chevaux/tarzan.png",
        year: "2007",
        breed: "Selle Français",
        color: "Bai",
        bio: "Arrivé à la SHEVA en 2020, Tarzan est un petit cheval gentil et formateur pour tous cavaliers, il sait apprendre des plus confirmés, et enseigner aux plus novices.",
    },
    {
        name: "Ukaline des Remonts",
        img: "/images/chevaux/ukaline.png",
        year: "2008",
        breed: "Poney Français de Selle",
        color: "Bai",
        bio: "Arrivée en cours d'année 2014, Ukaline, petite mais très bonne sauteuse. Au box, Ukaline est très gentille et plaît à ses cavaliers et surtout cavalières grâce à sa jolie petite tête et son physique de poupée ! Ukaline participe à l'équipe compétition poney.",
    },
    {
        name: "Une Surprise d'Ay",
        img: "/images/chevaux/unesurprise.png",
        year: "2008",
        breed: "ONC",
        color: "Grise",
        bio: "Arrivée en septembre 2016, Une Surprise est la nouvelle coqueluche des cavalières. Jolie ponette avec un caractère très câlin, elle ne pouvait que plaire. Montée elle peut parfois être délicate car encore jeune dans son travail, mais elle remplit pour le moment correctement son rôle et fait partie de l'équipe compétition club où elle obtient de très bons résultats.",
    },
    {
        name: "Urcéole du Hamel",
        img: "/images/chevaux/urceol.png",
        nickname: "Urcibabe",
        year: "2008",
        breed: "Selle Français",
        color: "Gris",
        instagram: "https://www.instagram.com/urcibabe",
        bio: "Urcéol est un cheval d'expérience, présent à la SHEVA depuis juin 2014. Véritable maître d'école, il sait tout faire et l'obstacle reste pour lui un jeu d'enfant. Fort de l'un des plus beaux palmarès de la cavalerie, il a permis à de nombreux cavaliers amateurs de décrocher de jolis classements. Malgré l'âge et sa raideur, il sait parfois se montrer fougueux et donner du fil à retordre à ses cavaliers. Reconnaissable à son masque qui protège ses yeux des UV et de la poussière, Urcéol transmet désormais son savoir-faire aux cavaliers compétition club.",
    },
    {
        name: "Valentin St Nicolas",
        img: "/images/chevaux/valentin.avif",
        year: "2009",
        breed: "Selle Français",
        color: "Alezan",
        bio: "Valentin fait partie de la cavalerie débutante. C'est un cheval très calme au box et au travail.",
    },
    {
        name: "Vuiderbo Nils",
        img: "/images/chevaux/vuiderbo.png",
        year: "2009",
        breed: "OC",
        color: "Gris",
        bio: "Arrivé à la SHEVA en 2019, Vuiderbo est un joli poney à la largeur singulière... qui lui confère la palme du confort ! Une petite boule d'énergie qu'il faut parfois contenir mais très volontaire.",
    },
];

const poneys = [
    {
        name: "Casanova",

        nickname: "Le 1er de la classe",
        level: "Galop Bronze et +",
        age: "13 ans",
        color: "Noir",
        bio: "Doté d'un excellent caractère, Casanova est toujours partant pour tout ce qu'on lui propose ! Ses foulées sont assez rapides, mais il reste facile à piloter. Il est le chouchou de nos cavaliers(ères).",
    },
    {
        name: "Creeks",
        img: "/images/poneys/creeks.png",
        nickname: "Le Papi",
        level: "Débutants",
        age: "21 ans",
        height: "1,35m",
        color: "Bai",
        bio: "Poney qui va bientôt nous quitter pour une retraite amplement méritée ! Attention aux doigts et fesses qui traînent, un coup de dents est vite arrivé, mais il est très agréable une fois monté.",
    },
    {
        name: "Hibou",
        nickname: "Le Nain",
        level: "Tous niveaux",
        age: "8 ans",
        height: "1,08m",
        color: "Gris",
        bio: "Il est arrivé avec un petit caractère mais se révèle être un vrai chouchou. Petit par la taille, il peut toutefois se montrer assez rapide.",
    },
    {
        name: "Iroquois",
        img: "/images/poneys/iroquois.png",
        year: "2018",
        level: "Tous niveaux",
        height: "1,25m",
        color: "Alezan",
        bio: "Un look unique avec sa hernie et sa dent, très gentil à pied mais aussi monté ! Arrivé sans trop de qualités, il a montré une véritable progression dans son apprentissage. Attention cependant au curage de pieds !",
    },
    {
        name: "Jenna",
        img: "/images/poneys/jenna.png",
        year: "2005",
        level: "Débutants - Galop Argent",
        height: "1,20m",
        color: "Bai",
        bio: "Ponette très mignonne et très calme, appréciée par de nombreux cavaliers.",
    },
    {
        name: "Joy",
        nickname: "La fusée",
        year: "2009",
        level: "Tous niveaux",
        color: "Bai",
        bio: "Véritable fusée dotée d'une grande gentillesse, elle descend progressivement de niveau pour s'adapter à tous(tes) les cavalier(ères).",
    },
    {
        name: "Junior",
        year: "2021",
        level: "Galop Or",
        height: "1,30m",
        color: "Alezan",
        bio: "Jeune poney dynamique, un peu sensible et délicat (attention aux gestes brusques à son abord), mais s'habitue bien à la vie du club.",
    },
    {
        name: "Kado",
        year: "2020",
        level: "Galop Argent et +",
        height: "1,25m",
        color: "Bai",
        bio: "Jeune et gentil poney, jumeau de Jenna, avec un caractère assez facile.",
    },
    {
        name: "Meen",
        img: "/images/chevaux/meen.png",
        nickname: "Meenou",
        year: "2019",
        level: "Galop Or",
        height: "1,44m",
        color: "Gris",
        bio: "Un excellent poney pour les cavaliers de galop or.",
    },
    {
        name: "Michael",
        img: "/images/poneys/mickael.png",
        nickname: "Mimichou",
        year: "2019",
        level: "Galop Bronze et +",
        color: "Pie Gris",
        bio: "Le moustachu préféré du club, pas le plus rapide certes mais toujours fidèle au poste !",
    },
    {
        name: "Newblack",
        year: "2016",
        nickname: "Newnew",
        level: "Galop Bronze et +",
        color: "Noir",
        bio: "Poney au physique parfait et charmeur, mais un brin coquin ! Attention aux affaires qui traînent, il adore tout grignoter.",
    },
    {
        name: "Perle",
        img: "/images/poneys/perle.png",
        nickname: "Miss parfaite",
        year: "2011",
        level: "Tous niveaux",
        height: "1,19m",
        color: "Aubère",
        bio: "Une vraie princesse ! Élégante et appliquée à l'obstacle (elle fait tout pour ne pas toucher les barres), elle est adorée par tous les cavaliers(ères).",
    },
    {
        name: "Poupette",
        img: "/images/poneys/poupette.png",
        nickname: "L'Escargot",
        year: "2005",
        level: "Débutants - Galop Argent",
        height: "1,18m",
        color: "Gris",
        bio: "Adorable au pansage et notre mannequin préférée pour toutes les animations (déguisement, peinture… !) mais pas la plus rapide du club, et un peu têtue sur les bords !",
    },
    {
        name: "Tintin",
        img: "/images/poneys/tintin.png",
        nickname: "Tintinus",
        year: "2009",
        level: "Tous niveaux",
        height: "1,24m",
        color: "Bai",
        bio: "Très bien dressé et adorable, mais méfiez-vous de l'eau qui dort !",
    },
    {
        name: "Ulysse",
        img: "/images/poneys/ulysse.avif",
        nickname: "L'Hyperactif",
        year: "2008",
        level: "Tous niveaux",
        height: "1,29m",
        color: "Alezan",
        bio: "Un peu agité au pansage, mais une fois lancé, il offre un confort exceptionnel ! Très gourmand, il lui arrive de grossir rien qu'en regardant le foin.",
    },
    {
        name: "Victoire",
        img: "/images/poneys/victoire.avif",
        nickname: "La 1ère de la classe",
        year: "2009",
        level: "Tous niveaux",
        height: "1,30m",
        color: "Pie Alezan",
        bio: "Ponette idéale autant pour les débutants que pour les confirmés (du baby au galop d'or), elle est calme et plutôt tranquille mais elle peut se réveiller avec un(e) cavalier(ère) motivé(e) !",
    },
    {
        name: "Whisper",
        img: "/images/poneys/whisper.png",
        year: "2018",
        level: "Galop Argent et +",
        height: "1,30m",
        color: "Noir",
        bio: "",
    },
];

// ─── TYPES ────────────────────────────────────────────────────────────────────

type Horse = {
    name: string;
    img?: string;
    nickname?: string;
    year?: string;
    age?: string;
    level?: string;
    breed?: string;
    color?: string;
    height?: string;
    bio?: string;
    instagram?: string;
};

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

function Chip({ children }: { children: React.ReactNode }) {
    return (
        <span
            style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "2px 9px",
                borderRadius: 20,
                background: `rgba(94,180,174,0.1)`,
                color: tealDark,
                fontSize: 11,
                fontWeight: 600,
                border: `1px solid rgba(94,180,174,0.18)`,
                whiteSpace: "nowrap",
            }}
        >
            {children}
        </span>
    );
}

function HorseCard({ horse }: { horse: Horse }) {
    return (
        <div
            className="horse-card-wrap"
            style={{
                position: "relative",
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
                aspectRatio: "16/9",
                background: "#e8eded",
            }}
        >
            {/* ── Photo (full card) ── */}
            {horse.img ? (
                <Image
                    src={assetPath(horse.img)}
                    alt={horse.name}
                    fill
                    style={{ objectFit: "cover", objectPosition: "center top" }}
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
                    🐴
                </div>
            )}

            {/* ── Gradient footer — always visible ── */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "linear-gradient(to top, rgba(10,20,30,0.82) 0%, rgba(10,20,30,0.3) 40%, transparent 65%)",
                    pointerEvents: "none",
                }}
            />

            {/* ── Name + chips — always visible at bottom ── */}
            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "14px 14px 16px",
                }}
            >
                <h3
                    style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: "white",
                        margin: "0 0 2px",
                        lineHeight: 1.3,
                    }}
                >
                    {horse.name}
                </h3>
                {horse.nickname && (
                    <p
                        style={{
                            fontSize: 11,
                            color: "rgba(94,180,174,0.9)",
                            fontWeight: 600,
                            margin: "0 0 8px",
                        }}
                    >
                        « {horse.nickname} »
                    </p>
                )}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {horse.level && (
                        <span
                            style={{
                                fontSize: 10,
                                fontWeight: 600,
                                padding: "2px 7px",
                                borderRadius: 20,
                                background: "rgba(94,180,174,0.25)",
                                border: "1px solid rgba(94,180,174,0.4)",
                                color: "rgba(255,255,255,0.9)",
                                whiteSpace: "nowrap",
                            }}
                        >
                            🏆 {horse.level}
                        </span>
                    )}
                    {horse.color && (
                        <span
                            style={{
                                fontSize: 10,
                                fontWeight: 600,
                                padding: "2px 7px",
                                borderRadius: 20,
                                background: "rgba(255,255,255,0.15)",
                                border: "1px solid rgba(255,255,255,0.25)",
                                color: "rgba(255,255,255,0.85)",
                                whiteSpace: "nowrap",
                            }}
                        >
                            🌈 {horse.color}
                        </span>
                    )}
                </div>
            </div>

            {/* ── Bio overlay — appears on hover ── */}
            <div
                className="horse-bio-overlay"
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "linear-gradient(160deg, rgba(10,25,35,0.96) 0%, rgba(10,40,50,0.94) 100%)",
                    padding: "20px 16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    overflowY: "auto",
                }}
            >
                <div>
                    <h3
                        style={{
                            fontSize: 15,
                            fontWeight: 700,
                            color: "white",
                            margin: "0 0 3px",
                        }}
                    >
                        {horse.name}
                    </h3>
                    {horse.nickname && (
                        <p
                            style={{
                                fontSize: 12,
                                color: teal,
                                fontWeight: 600,
                                margin: 0,
                            }}
                        >
                            « {horse.nickname} »
                        </p>
                    )}
                </div>

                {/* All specs */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {(horse.year || horse.age) && (
                        <span
                            style={{
                                fontSize: 10,
                                fontWeight: 600,
                                padding: "2px 8px",
                                borderRadius: 20,
                                background: "rgba(94,180,174,0.2)",
                                border: "1px solid rgba(94,180,174,0.35)",
                                color: "rgba(255,255,255,0.85)",
                            }}
                        >
                            🎂 {horse.year ?? horse.age}
                        </span>
                    )}
                    {horse.level && (
                        <span
                            style={{
                                fontSize: 10,
                                fontWeight: 600,
                                padding: "2px 8px",
                                borderRadius: 20,
                                background: "rgba(94,180,174,0.2)",
                                border: "1px solid rgba(94,180,174,0.35)",
                                color: "rgba(255,255,255,0.85)",
                            }}
                        >
                            🏆 {horse.level}
                        </span>
                    )}
                    {horse.height && (
                        <span
                            style={{
                                fontSize: 10,
                                fontWeight: 600,
                                padding: "2px 8px",
                                borderRadius: 20,
                                background: "rgba(94,180,174,0.2)",
                                border: "1px solid rgba(94,180,174,0.35)",
                                color: "rgba(255,255,255,0.85)",
                            }}
                        >
                            📏 {horse.height}
                        </span>
                    )}
                    {horse.breed && (
                        <span
                            style={{
                                fontSize: 10,
                                fontWeight: 600,
                                padding: "2px 8px",
                                borderRadius: 20,
                                background: "rgba(94,180,174,0.2)",
                                border: "1px solid rgba(94,180,174,0.35)",
                                color: "rgba(255,255,255,0.85)",
                            }}
                        >
                            🐎 {horse.breed}
                        </span>
                    )}
                    {horse.color && (
                        <span
                            style={{
                                fontSize: 10,
                                fontWeight: 600,
                                padding: "2px 8px",
                                borderRadius: 20,
                                background: "rgba(94,180,174,0.2)",
                                border: "1px solid rgba(94,180,174,0.35)",
                                color: "rgba(255,255,255,0.85)",
                            }}
                        >
                            🌈 {horse.color}
                        </span>
                    )}
                </div>

                {horse.bio && (
                    <p
                        style={{
                            fontSize: 12.5,
                            color: "rgba(255,255,255,0.82)",
                            lineHeight: 1.65,
                            margin: 0,
                        }}
                    >
                        {horse.bio}
                    </p>
                )}

                {horse.instagram && (
                    <a
                        href={horse.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 5,
                            fontSize: 12,
                            color: teal,
                            fontWeight: 600,
                            textDecoration: "none",
                            marginTop: "auto",
                        }}
                    >
                        <svg
                            width="12"
                            height="12"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                        Suivre sur Instagram
                    </a>
                )}
            </div>
        </div>
    );
}

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
                    justifyContent: "center",
                }}
            >
                {label}
            </p>
            <h2
                style={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: "rgb(15,23,42)",
                    justifyContent: "center",
                    textAlign: "center",
                }}
            >
                {title}
            </h2>
        </div>
    );
}


// ─── PAGE ─────────────────────────────────────────────────────────────────────

const sectionStyle: React.CSSProperties = { padding: "80px 0" };
const containerStyle: React.CSSProperties = {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 24px",
};

export default function ChevauxPage() {
    const quickLinks = [
        { href: "#chevaux", label: "🐴 Chevaux" },
        { href: "#poneys", label: "🦄 Poneys" },
        { href: "#bien-etre", label: "💚 Bien-être" },
        { href: "#apres-sheva", label: "🌿 L'Après SHEVA" },
    ];

    return (
        <>
            <Nav />
            <main
                style={{
                    paddingTop: 64,
                }}
            >
                {/* ── HERO ──────────────────────────────────────────────── */}
                <section
                    style={{
                        background: `linear-gradient(135deg, ${teal} 0%, ${tealDark} 100%)`,
                        padding: "72px 24px 56px",
                        textAlign: "center",
                    }}
                >
                    {/* background texture */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            opacity: 0.06,
                            backgroundImage:
                                "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
                            backgroundSize: "60px 60px",
                        }}
                    />

                    <div style={{ ...containerStyle, position: "relative" }}>
                        {/* Breadcrumb */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 8,
                                marginBottom: 20,
                                fontSize: 13,
                                color: "rgba(255,255,255,0.75)",
                            }}
                        >
                            <Link
                                href="/"
                                style={{
                                    color: "rgba(255,255,255,0.75)",
                                    textDecoration: "none",
                                }}
                            >
                                Accueil
                            </Link>
                            <span>›</span>
                            <span style={{ color: "white", fontWeight: 600 }}>
                                Chevaux & Poneys
                            </span>
                        </div>

                        <h1
                            style={{
                                fontSize: "clamp(28px, 5vw, 44px)",
                                fontWeight: 800,
                                color: "white",
                                marginBottom: 16,
                                lineHeight: 1.15,
                            }}
                        >
                            Nos Chevaux & Poneys
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
                            Découvrez notre cavalerie d'exception, sélectionnée
                            avec soin pour leur caractère, leurs qualités
                            pédagogiques et leur bien-être.
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
                            {quickLinks.map((l) => (
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
                    </div>
                </section>

                {/* ── STATS OVERVIEW ─────────────────────────────────────── */}
                <section
                    style={{
                        background: "white",
                        borderBottom: "1px solid #f0f0f0",
                    }}
                >
                    <div style={containerStyle}>
                        <div style={{ padding: "40px 0 32px" }}>
                            <p
                                style={{
                                    fontSize: 15,
                                    color: "#4b5563",
                                    lineHeight: 1.75,
                                    maxWidth: 780,
                                    marginBottom: 32,
                                    margin: "0 auto 32px",
                                }}
                            >
                                La cavalerie de la SHEVA comprend des{" "}
                                <strong>chevaux et des poneys</strong> pour tout
                                type de cavaliers, des plus faciles pour les
                                débutants aux plus performants pour les
                                cavaliers émérites. Tous nos équidés sont{" "}
                                <strong>soigneusement sélectionnés</strong> pour
                                leur dressage et leur bon caractère,
                                garantissant une expérience sécurisée et
                                enrichissante.
                            </p>
                            <p
                                style={{
                                    fontSize: 15,
                                    color: "#4b5563",
                                    lineHeight: 1.75,
                                    maxWidth: 780,
                                    marginBottom: 40,
                                    margin: "0 auto 40px",
                                }}
                            >
                                Les chevaux de la SHEVA sont{" "}
                                <strong>répartis par piquet</strong>. Les
                                cavaliers les plus confirmés montent les chevaux
                                les plus jeunes et nécessitant encore de la
                                formation. Au fur et à mesure de leur
                                apprentissage les chevaux descendent de piquet
                                vers les niveaux débutants. Cela assure{" "}
                                <strong>une bonne formation des chevaux</strong>{" "}
                                et une adéquation avec le niveau de chacun.
                            </p>

                            {/* Stats */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                {[
                                    { num: "50+", label: "Équidés au total" },
                                    { num: "35", label: "Chevaux de selle" },
                                    { num: "17", label: "Poneys" },
                                    { num: "100%", label: "Bien-être garanti" },
                                ].map((s) => (
                                    <div
                                        key={s.label}
                                        style={{
                                            textAlign: "center",
                                            padding: "24px 16px",
                                            borderRadius: 16,
                                            background: `linear-gradient(135deg, rgba(94,180,174,0.08), rgba(94,180,174,0.04))`,
                                            border: `1px solid rgba(94,180,174,0.2)`,
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize: 32,
                                                fontWeight: 800,
                                                color: teal,
                                                lineHeight: 1,
                                            }}
                                        >
                                            {s.num}
                                        </div>
                                        <div
                                            style={{
                                                fontSize: 13,
                                                color: "#6b7280",
                                                marginTop: 6,
                                                fontWeight: 500,
                                            }}
                                        >
                                            {s.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── NOS CHEVAUX ────────────────────────────────────────── */}
                <section
                    id="chevaux"
                    style={{ ...sectionStyle, background: "#fafbfb" }}
                >
                    <div style={containerStyle}>
                        <SectionHeader
                            label="Notre cavalerie"
                            title="🐴 Nos Chevaux"
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
                            Nos chevaux de selle sont adaptés à tous les
                            niveaux, du cavalier débutant au compétiteur
                            confirmé. Chaque cheval a sa personnalité et ses
                            spécialités.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                            {chevaux.map((h) => (
                                <HorseCard key={h.name} horse={h} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── PHOTO GALLERY ───────────────────────────────────────── */}
                <PhotoGallery />

                {/* ── NOS PONEYS ──────────────────────────────────────────── */}
                <section
                    id="poneys"
                    style={{ ...sectionStyle, background: "white" }}
                >
                    <div style={containerStyle}>
                        <SectionHeader
                            label="Pour les jeunes cavaliers"
                            title="🦄 Nos Poneys"
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
                            Notre cavalerie compte 17 poneys répartis en
                            différentes catégories, parfaitement adaptés à
                            l'apprentissage des jeunes cavaliers de 3 à 12 ans.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                            {poneys.map((p) => (
                                <HorseCard key={p.name} horse={p} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── BIEN-ÊTRE ───────────────────────────────────────────── */}
                <section
                    id="bien-etre"
                    style={{ ...sectionStyle, background: "#fafbfb" }}
                >
                    <div style={containerStyle}>
                        <SectionHeader
                            label="Notre engagement"
                            title="Bien-être de nos Équidés"
                        />

                        <div
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            style={{ marginBottom: 48 }}
                        >
                            {/* Soins quotidiens */}
                            <div
                                style={{
                                    background: "white",
                                    borderRadius: 16,
                                    border: "1px solid #f0f0f0",
                                    padding: "28px 28px 28px",
                                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                                    justifyContent: "center",
                                }}
                            >
                                <h3
                                    style={{
                                        fontSize: 17,
                                        fontWeight: 700,
                                        color: "rgb(15,23,42)",
                                        marginBottom: 16,
                                        textAlign: "center",
                                    }}
                                >
                                    Soins Quotidiens
                                </h3>
                                <p
                                    style={{
                                        fontSize: 14,
                                        color: "#4b5563",
                                        lineHeight: 1.7,
                                        marginBottom: 16,
                                    }}
                                >
                                    Chaque jour, nos équidés bénéficient de{" "}
                                    <strong>soins attentifs</strong> prodigués
                                    par notre équipe expérimentée :
                                </p>
                                <ul
                                    style={{
                                        listStyle: "none",
                                        padding: 0,
                                        margin: 0,
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 10,
                                    }}
                                >
                                    {[
                                        [
                                            "Alimentation équilibrée",
                                            "Foin de qualité, granulés adaptés, compléments si nécessaire",
                                        ],
                                        [
                                            "Soins quotidiens",
                                            "Pansage, vérification des membres, soins des pieds",
                                        ],
                                        [
                                            "Surveillance médicale",
                                            "Contrôles réguliers, vaccinations, vermifuges",
                                        ],
                                        [
                                            "Exercice adapté",
                                            "Travail progressif selon l'âge et les capacités. Pas de surmenage !",
                                        ],
                                    ].map(([title, desc]) => (
                                        <li
                                            key={title}
                                            style={{
                                                display: "flex",
                                                gap: 12,
                                                alignItems: "flex-start",
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
                                                    marginTop: 5,
                                                }}
                                            />
                                            <span>
                                                <strong>{title}</strong> —{" "}
                                                {desc}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Vacances */}
                            <div
                                style={{
                                    background: "white",
                                    borderRadius: 16,
                                    border: "1px solid #f0f0f0",
                                    padding: "28px",
                                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                                }}
                            >
                                <h3
                                    style={{
                                        fontSize: 17,
                                        fontWeight: 700,
                                        color: "rgb(15,23,42)",
                                        marginBottom: 16,
                                        textAlign: "center",
                                    }}
                                >
                                    Des Vacances Tous les Ans
                                </h3>
                                <p
                                    style={{
                                        fontSize: 14,
                                        color: "#4b5563",
                                        lineHeight: 1.7,
                                        marginBottom: 16,
                                    }}
                                >
                                    Tous les ans,{" "}
                                    <strong>
                                        l'ensemble de nos chevaux et poneys
                                    </strong>{" "}
                                    prennent des vacances. De la fin des cours
                                    en juillet à la reprise fin août,{" "}
                                    <strong>tous partent au pré</strong> !
                                </p>
                                <ul
                                    style={{
                                        listStyle: "none",
                                        padding: 0,
                                        margin: 0,
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 10,
                                    }}
                                >
                                    {[
                                        [
                                            "Un espace important",
                                            "Pour que nos chevaux se dépensent sans se marcher dessus",
                                        ],
                                        [
                                            "Repos garanti",
                                            "Ces vacances méritées permettent de retrouver des chevaux au moral d'acier à la rentrée",
                                        ],
                                        [
                                            "Reprise en douceur",
                                            "La reprise se fait progressivement pour réhabituer cavaliers et chevaux au travail",
                                        ],
                                    ].map(([title, desc]) => (
                                        <li
                                            key={title}
                                            style={{
                                                display: "flex",
                                                gap: 12,
                                                alignItems: "flex-start",
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
                                                    marginTop: 5,
                                                }}
                                            />
                                            <span>
                                                <strong>{title}</strong> —{" "}
                                                {desc}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Notre engagement bien-être */}
                        <div
                            style={{
                                background: "white",
                                borderRadius: 20,
                                border: "1px solid #f0f0f0",
                                padding: "32px",
                                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                            }}
                        >
                            <h3
                                style={{
                                    fontSize: 17,
                                    fontWeight: 700,
                                    color: "rgb(15,23,42)",
                                    marginBottom: 24,
                                    textAlign: "center",
                                }}
                            >
                                Notre Engagement Bien-Être
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                {[
                                    {
                                        icon: "🏡",
                                        title: "Logement adapté",
                                        desc: "Boxes spacieux avec litière confortable changée toutes les semaines",
                                    },
                                    {
                                        icon: "🌿",
                                        title: "Accès aux paddocks",
                                        desc: "Sorties régulières en liberté",
                                    },
                                    {
                                        icon: "☀️",
                                        title: "Éclairage confortable",
                                        desc: "Un éclairage conçu spécialement pour le confort des chevaux",
                                    },
                                    {
                                        icon: "🐎",
                                        title: "Charge adaptée",
                                        desc: "Les charges des chevaux sont adaptées à leurs âges et capacités. Pas de surmenage à la SHEVA.",
                                    },
                                ].map((f) => (
                                    <div
                                        key={f.title}
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 10,
                                        }}
                                    >
                                        <span style={{ fontSize: 32 }}>
                                            {f.icon}
                                        </span>
                                        <div>
                                            <p
                                                style={{
                                                    fontSize: 14,
                                                    fontWeight: 700,
                                                    color: "rgb(15,23,42)",
                                                    marginBottom: 4,
                                                }}
                                            >
                                                {f.title}
                                            </p>
                                            <p
                                                style={{
                                                    fontSize: 13,
                                                    color: "#6b7280",
                                                    lineHeight: 1.6,
                                                    margin: 0,
                                                }}
                                            >
                                                {f.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── L'APRÈS SHEVA ──────────────────────────────────────── */}
                <section
                    id="apres-sheva"
                    style={{ ...sectionStyle, background: "white" }}
                >
                    <div style={containerStyle}>
                        <SectionHeader
                            label="Association"
                            title="L'Après SHEVA"
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
                            L'Après Sheva est une association créée par des{" "}
                            <strong>cavaliers du centre équestre</strong>, dont
                            toutes les actions sont menées en concertation avec
                            l'équipe enseignante et le bureau de la SHEVA.
                        </p>
                        <p
                            style={{
                                fontSize: 15,
                                color: "#4b5563",
                                lineHeight: 1.75,
                                maxWidth: 850,
                                marginBottom: 12,
                                margin: "0 auto 40px",
                            }}
                        >
                            Ses deux missions principales sont :
                        </p>
                        <ul
                            style={{
                                listStyle: "none",
                                padding: 0,
                                margin: "0 auto 40px",
                                display: "flex",
                                flexDirection: "column",
                                gap: 12,
                                maxWidth: 850,
                            }}
                        >
                            {[
                                "Trouver les meilleures personnes capables d'assurer une belle retraite à nos chevaux et poneys. Nous avons à cœur d'identifier le meilleur endroit pour eux, que ce soit chez un de nos cavaliers ou non. Dans tous les cas, nous suivrons nos retraités et nous nous assurerons qu'ils coulent des jours heureux.",
                                "Contribuer au bien-être des équidés de la SHEVA en activité ; nous avons à cœur de mener des actions pour améliorer leur confort de vie.",
                            ].map((text, i) => (
                                <li
                                    key={i}
                                    style={{
                                        display: "flex",
                                        gap: 12,
                                        alignItems: "flex-start",
                                        fontSize: 14,
                                        color: "#4b5563",
                                        lineHeight: 1.7,
                                    }}
                                >
                                    <span
                                        style={{
                                            width: 22,
                                            height: 22,
                                            borderRadius: "50%",
                                            background: `rgba(94,180,174,0.15)`,
                                            border: `1px solid rgba(94,180,174,0.3)`,
                                            color: tealDark,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: 11,
                                            fontWeight: 700,
                                            flexShrink: 0,
                                            marginTop: 2,
                                        }}
                                    >
                                        {i + 1}
                                    </span>
                                    {text}
                                </li>
                            ))}
                        </ul>

                        <div
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            style={{ marginBottom: 48 }}
                        >
                            {/* Nos actions */}
                            <div
                                style={{
                                    background: "#fafbfb",
                                    borderRadius: 16,
                                    border: "1px solid #f0f0f0",
                                    padding: "28px",
                                }}
                            >
                                <h3
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 700,
                                        color: "rgb(15,23,42)",
                                        marginBottom: 16,
                                        textAlign: "center",
                                    }}
                                >
                                    Nos Actions
                                </h3>
                                <p
                                    style={{
                                        fontSize: 14,
                                        color: "#4b5563",
                                        lineHeight: 1.7,
                                        marginBottom: 14,
                                    }}
                                >
                                    <strong>
                                        Grâce aux cotisations perçues, à nos
                                        sponsors et actions variées
                                    </strong>
                                    , nous pouvons financer pour nos chevaux :
                                </p>
                                <ul
                                    style={{
                                        listStyle: "none",
                                        padding: 0,
                                        margin: "0 0 16px",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 8,
                                    }}
                                >
                                    {[
                                        "Des cadeaux — Pour nos équidés retraités",
                                        "Le déplacement vers le pré — En cas de besoin, nous pouvons participer au déplacement",
                                        "La pension du pré — En cas d'urgence",
                                    ].map((item) => (
                                        <li
                                            key={item}
                                            style={{
                                                display: "flex",
                                                gap: 8,
                                                fontSize: 13,
                                                color: "#4b5563",
                                                lineHeight: 1.6,
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
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <p
                                    style={{
                                        fontSize: 13,
                                        color: "#4b5563",
                                        marginBottom: 10,
                                    }}
                                >
                                    <strong>Dans un second temps</strong>, des
                                    achats pour nos compagnons comme :
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
                                    {[
                                        "Boules d'aliments",
                                        "Séances d'ostéopathie",
                                        "Séances de massages",
                                    ].map((item) => (
                                        <li
                                            key={item}
                                            style={{
                                                display: "flex",
                                                gap: 8,
                                                fontSize: 13,
                                                color: "#4b5563",
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
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Comment aider */}
                            <div
                                style={{
                                    background: "#fafbfb",
                                    borderRadius: 16,
                                    border: "1px solid #f0f0f0",
                                    padding: "28px",
                                }}
                            >
                                <h3
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 700,
                                        color: "rgb(15,23,42)",
                                        marginBottom: 16,
                                        textAlign: "center",
                                    }}
                                >
                                    Comment Nous Aider ?
                                </h3>
                                <p
                                    style={{
                                        fontSize: 14,
                                        color: "#4b5563",
                                        lineHeight: 1.7,
                                        marginBottom: 14,
                                    }}
                                >
                                    Vous pouvez{" "}
                                    <strong>
                                        contribuer au financement de nos actions
                                    </strong>{" "}
                                    en :
                                </p>
                                <ul
                                    style={{
                                        listStyle: "none",
                                        padding: 0,
                                        margin: 0,
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 10,
                                    }}
                                >
                                    {[
                                        [
                                            "Adhérant à L'Après SHEVA",
                                            "Par cotisation annuelle (calendaire) de 20€ — voir ci-dessous les modalités d'adhésion",
                                        ],
                                        [
                                            "Nous rencontrant sur nos stands",
                                            "Vente de gâteaux, boissons et autres lors des évènements du club",
                                        ],
                                        [
                                            "Commandant nos goodies",
                                            "Prochainement disponibles",
                                        ],
                                    ].map(([title, desc]) => (
                                        <li
                                            key={title}
                                            style={{
                                                display: "flex",
                                                gap: 10,
                                                alignItems: "flex-start",
                                                fontSize: 13,
                                                color: "#4b5563",
                                                lineHeight: 1.65,
                                            }}
                                        >
                                            <span
                                                style={{
                                                    color: teal,
                                                    flexShrink: 0,
                                                    marginTop: 1,
                                                }}
                                            >
                                                ›
                                            </span>
                                            <span>
                                                <strong>{title}</strong> —{" "}
                                                {desc}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* CTA adhésion */}
                        <div
                            style={{
                                borderRadius: 20,
                                padding: "36px 40px",
                                background: `linear-gradient(135deg, rgba(94,180,174,0.1), rgba(94,180,174,0.05))`,
                                border: `1px solid rgba(94,180,174,0.25)`,
                                textAlign: "center",
                            }}
                        >
                            <h3
                                style={{
                                    fontSize: 20,
                                    fontWeight: 700,
                                    color: "rgb(15,23,42)",
                                    marginBottom: 10,
                                }}
                            >
                                Vous souhaitez adhérer à L'Après SHEVA ?
                            </h3>
                            <p
                                style={{
                                    fontSize: 14,
                                    color: "#4b5563",
                                    lineHeight: 1.7,
                                    marginBottom: 24,
                                    maxWidth: 600,
                                    margin: "0 auto 24px",
                                }}
                            >
                                Un GRAND merci à tous de contribuer au bien-être
                                des chevaux et poneys de la SHEVA !<br />
                                Vous pouvez rencontrer les membres du bureau les
                                samedis matin ou lors des évènements du club.
                            </p>
                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 12,
                                    justifyContent: "center",
                                    marginBottom: 24,
                                }}
                            >
                                <a
                                    href={assetPath("/PDF_docs/Bull Adhesion ApresSHEVA 2026.pdf")}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        padding: "12px 28px",
                                        borderRadius: 10,
                                        background: `linear-gradient(135deg, ${teal}, ${tealDark})`,
                                        color: "white",
                                        fontWeight: 700,
                                        fontSize: 14,
                                        textDecoration: "none",
                                    }}
                                >
                                    Complétez le bulletin d'adhésion
                                </a>
                                <a
                                    href="mailto:apres.sheva@gmail.com"
                                    style={{
                                        padding: "12px 28px",
                                        borderRadius: 10,
                                        background: "white",
                                        border: `1px solid rgba(94,180,174,0.35)`,
                                        color: tealDark,
                                        fontWeight: 700,
                                        fontSize: 14,
                                        textDecoration: "none",
                                    }}
                                >
                                    Contactez-nous
                                </a>
                                <Link
                                    href="/apres-sheva"
                                    style={{
                                        padding: "12px 28px",
                                        borderRadius: 10,
                                        background: "white",
                                        border: `1px solid rgba(94,180,174,0.35)`,
                                        color: tealDark,
                                        fontWeight: 700,
                                        fontSize: 14,
                                        textDecoration: "none",
                                    }}
                                >
                                    Découvrir nos retraités
                                </Link>
                            </div>
                            <a
                                href="https://www.instagram.com/l.apres.sheva"
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
                                Suivre L'Après SHEVA sur Instagram
                            </a>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
