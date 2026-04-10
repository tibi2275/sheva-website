// ─── TYPES ───────────────────────────────────────────────────────────────────
export type CreneauType =
    | "baby"
    | "poney"
    | "cheval"
    | "perf"
    | "galop"
    | "dressage"
    | "vide";

export interface Creneau {
    heure: string;
    duree?: number;
    type: CreneauType;
    label: string;
    lieu: "pm" | "gm";
    simLevels?: string[];
}

export interface JourPlanning {
    jour: string;
    creneaux: Creneau[];
}

// ─── PLANNING HEBDOMADAIRE ────────────────────────────────────────────────────
// prettier-ignore
export const PLANNING_HEBDO: JourPlanning[] = [
    { jour: "Lundi", creneaux: [
        { heure: "12h30",            lieu: "gm", type: "cheval", label: "Galop 4-5 Dressage",    simLevels: ["galop5", "galop4"] },
        { heure: "17h30",            lieu: "pm", type: "poney",  label: "Galop Argent",           simLevels: ["argent"] },
        { heure: "18h30",            lieu: "pm", type: "cheval", label: "Galop 3",                simLevels: ["galop3"] },
        { heure: "18h30",            lieu: "gm", type: "cheval", label: "Galop 4",                simLevels: ["galop4"] },
        { heure: "19h30",            lieu: "gm", type: "cheval", label: "Galop 6",                simLevels: ["galop6"] },
        { heure: "19h30",            lieu: "pm", type: "cheval", label: "Galop 2",                simLevels: ["galop2"] },
        { heure: "20h30", duree: 90, lieu: "gm", type: "perf",   label: "Galop 6-7 Dressage",   simLevels: ["perf_g6", "perf_g7"] },
        { heure: "20h30", duree: 60, lieu: "pm", type: "cheval", label: "Galop 2-3",             simLevels: ["galop2", "galop3"] },
    ]},
    { jour: "Mardi", creneaux: [
        { heure: "12h30",            lieu: "gm", type: "cheval", label: "Galop 6-7",             simLevels: ["galop6", "galop7"] },
        { heure: "17h30", duree: 30, lieu: "pm", type: "poney",  label: "Baby",                  simLevels: ["baby_rep"] },
        { heure: "18h00",            lieu: "gm", type: "cheval", label: "Galop 4",               simLevels: ["galop4"] },
        { heure: "18h00",            lieu: "pm", type: "poney",  label: "Galop Bronze",          simLevels: ["bronze"] },
        { heure: "19h00",            lieu: "pm", type: "cheval", label: "Galop 1-2",             simLevels: ["galop1", "galop2"] },
        { heure: "20h00",            lieu: "pm", type: "cheval", label: "Galop 3-4",             simLevels: ["galop3", "galop4"] },
        { heure: "20h00",            lieu: "gm", type: "cheval", label: "Galop 5",               simLevels: ["galop5"] },
    ]},
    { jour: "Mercredi", creneaux: [
        { heure: "10h00", duree: 30, lieu: "pm", type: "poney",  label: "Baby",                  simLevels: ["baby_rep"] },
        { heure: "10h30", duree: 30, lieu: "pm", type: "poney",  label: "Baby",                  simLevels: ["baby_rep"] },
        { heure: "11h00",            lieu: "pm", type: "poney",  label: "Galop Bronze",          simLevels: ["bronze"] },
        { heure: "12h30", duree: 45, lieu: "pm", type: "poney",  label: "Débutant",              simLevels: ["debutant"] },
        { heure: "13h15", duree: 45, lieu: "pm", type: "poney",  label: "Débutant",              simLevels: ["debutant"] },
        { heure: "14h00",            lieu: "pm", type: "poney",  label: "Galop Bronze",          simLevels: ["bronze"] },
        { heure: "15h00",            lieu: "pm", type: "cheval", label: "Galop 2",               simLevels: ["galop2"] },
        { heure: "15h00",            lieu: "gm", type: "poney",  label: "Galop Or",              simLevels: ["or"] },
        { heure: "16h00",            lieu: "pm", type: "cheval", label: "Galop 1",               simLevels: ["galop1"] },
        { heure: "16h00",            lieu: "gm", type: "cheval", label: "Galop 4",               simLevels: ["galop4"] },
        { heure: "17h00",            lieu: "pm", type: "poney",  label: "Galop Argent",          simLevels: ["argent"] },
        { heure: "17h00",            lieu: "gm", type: "cheval", label: "Galop 5",               simLevels: ["galop5"] },
        { heure: "18h00",            lieu: "pm", type: "cheval", label: "Galop 0",               simLevels: ["debutant_cheval"] },
        { heure: "19h00",            lieu: "pm", type: "cheval", label: "Galop 3",               simLevels: ["galop3"] },
        { heure: "19h30",            lieu: "gm", type: "cheval", label: "Galop 6",               simLevels: ["galop6"] },
        { heure: "20h30", duree: 90, lieu: "gm", type: "perf",   label: "Galop 7 Perf.",        simLevels: ["perf_g7"] },
    ]},
    { jour: "Jeudi", creneaux: [
        { heure: "18h30",            lieu: "pm", type: "cheval", label: "Galop 0+ 1",            simLevels: ["debutant_cheval", "galop1"] },
        { heure: "19h30",            lieu: "pm", type: "cheval", label: "Galop 3",               simLevels: ["galop3"] },
        { heure: "20h30", duree: 60, lieu: "pm", type: "cheval", label: "Galop 1-2",             simLevels: ["galop1", "galop2"] },
        { heure: "18h30",            lieu: "gm", type: "cheval", label: "Galop 4",               simLevels: ["galop4"] },
        { heure: "19h30",            lieu: "gm", type: "cheval", label: "Galop 5",               simLevels: ["galop5"] },
        { heure: "20h30", duree: 60, lieu: "gm", type: "perf",   label: "Galop 7 Perf.",        simLevels: ["perf_g7"] },
    ]},
    { jour: "Vendredi", creneaux: [
        { heure: "17h30", duree: 30, lieu: "pm", type: "poney",  label: "Débutant",              simLevels: ["debutant"] },
        { heure: "18h30",            lieu: "pm", type: "cheval", label: "Galop 1",               simLevels: ["galop1"] },
        { heure: "18h30",            lieu: "gm", type: "cheval", label: "Galop 5",               simLevels: ["galop5"] },
        { heure: "19h30",            lieu: "pm", type: "cheval", label: "Galop 2",               simLevels: ["galop2"] },
        { heure: "20h30",            lieu: "pm", type: "cheval", label: "Galop 4",               simLevels: ["galop4"] },
        { heure: "20h30", duree: 90, lieu: "gm", type: "cheval", label: "Galop 6",               simLevels: ["perf_g6"] },
    ]},
    { jour: "Samedi", creneaux: [
        { heure: "9h30",             lieu: "pm", type: "poney",  label: "Argent",                simLevels: ["argent"] },
        { heure: "9h30",             lieu: "gm", type: "cheval", label: "Galop 5",               simLevels: ["galop5"] },
        { heure: "10h30",            lieu: "pm", type: "cheval", label: "Galop 1",               simLevels: ["galop1"] },
        { heure: "10h30",            lieu: "gm", type: "poney",  label: "Galop Or",              simLevels: ["or"] },
        { heure: "11h30", duree: 45, lieu: "pm", type: "poney",  label: "Débutant",              simLevels: ["debutant"] },
        { heure: "12h15", duree: 45, lieu: "pm", type: "poney",  label: "Débutant",              simLevels: ["debutant"] },
        { heure: "11h30", duree: 90, lieu: "gm", type: "perf",   label: "Galop 7 Perf.",        simLevels: ["perf_g7"] },
        { heure: "13h00",            lieu: "pm", type: "cheval", label: "Galop 2",               simLevels: ["galop2"] },
        { heure: "14h00",            lieu: "gm", type: "poney",  label: "Or",                    simLevels: ["or"] },
        { heure: "14h00",            lieu: "pm", type: "cheval", label: "Galop 0",               simLevels: ["debutant_cheval"] },
        { heure: "15h00",            lieu: "pm", type: "poney",  label: "Bronze",                simLevels: ["bronze"] },
        { heure: "15h00",            lieu: "gm", type: "cheval", label: "Galop 3",               simLevels: ["galop3"] },
        { heure: "16h00",            lieu: "gm", type: "cheval", label: "Galop 4",               simLevels: ["galop4"] },
        { heure: "16h00",            lieu: "pm", type: "poney",  label: "Galop Argent",          simLevels: ["argent"] },
        { heure: "17h00", duree: 45, lieu: "pm", type: "poney",  label: "Débutant",              simLevels: ["debutant"] },
        { heure: "17h00", duree: 90, lieu: "gm", type: "perf",   label: "Galop 6 Perf.",        simLevels: ["perf_g6"] },
    ]},
    { jour: "Dimanche", creneaux: [
        { heure: "9h00",             lieu: "gm", type: "cheval", label: "Galop 4-5",             simLevels: ["galop4", "galop5"] },
        { heure: "10h00",            lieu: "gm", type: "poney",  label: "Galop Or-Argent",       simLevels: ["argent", "or"] },
        { heure: "10h00",            lieu: "pm", type: "cheval", label: "Galop 0",               simLevels: ["debutant_cheval"] },
        { heure: "11h00",            lieu: "pm", type: "poney",  label: "Galop Bronze",          simLevels: ["bronze"] },
        { heure: "12h00", duree: 30, lieu: "pm", type: "baby",   label: "Baby",                  simLevels: ["baby_rep"] },
        { heure: "12h30", duree: 30, lieu: "pm", type: "baby",   label: "Baby",                  simLevels: ["baby_rep"] },
    ]},
];

// ─── REPRISES PAR NIVEAU (dérivé de PLANNING_HEBDO) ──────────────────────────
export const REPRISES_BY_LEVEL: Record<
    string,
    { id: string; day: string; time: string }[]
> = {};
for (const { jour, creneaux } of PLANNING_HEBDO) {
    for (const c of creneaux) {
        for (const lvl of c.simLevels ?? []) {
            if (!REPRISES_BY_LEVEL[lvl]) REPRISES_BY_LEVEL[lvl] = [];
            const dayShort = jour.slice(0, 3).toLowerCase();
            REPRISES_BY_LEVEL[lvl].push({
                id: `${lvl}_${dayShort}_${c.heure}`,
                day: jour,
                time: c.heure,
            });
        }
    }
}

// ─── TARIFICATION ─────────────────────────────────────────────────────────────
export const FORFAITS_PRICING: Record<
    string,
    { name: string; price: number; desc: string; icon: string }
> = {
    baby:            { name: "Baby",                price: 537,  desc: "Éveil équestre (4-6 ans)", icon: "🍼" },
    poney_debutant:  { name: "Poney Débutant",      price: 671,  desc: "Bases avec les poneys",    icon: "🐴" },
    poney:           { name: "Poney",               price: 895,  desc: "Perfectionnement poney",   icon: "🏇" },
    cheval_under16:  { name: "Cheval -16 ans",      price: 1042, desc: "Cheval pour les jeunes",   icon: "🐎" },
    cheval_over16:   { name: "Cheval +16 ans",      price: 1108, desc: "Cheval adultes",           icon: "🏆" },
    perfectionnement:{ name: "Perfectionnement 1h30", price: 1241, desc: "Cours avancés G6-G7",   icon: "⭐" },
};

export const COTISATIONS = {
    under16: 128,
    over16: 155,
    licenceUnder18: 29,
    licenceOver18: 40,
};

// ─── NIVEAUX (filtres et sélecteurs) ─────────────────────────────────────────
export const PONEY_LEVELS = [
    { val: "debutant", label: "🌟 Débutant" },
    { val: "bronze",   label: "🥉 Bronze" },
    { val: "argent",   label: "🥈 Argent" },
    { val: "or",       label: "🥇 Or" },
];

export const CHEVAL_LEVELS = [
    { val: "debutant_cheval", label: "🌟 Débutant" },
    { val: "galop1",          label: "Galop 1" },
    { val: "galop2",          label: "Galop 2" },
    { val: "galop3",          label: "Galop 3" },
    { val: "galop4",          label: "Galop 4" },
    { val: "galop5",          label: "Galop 5" },
    { val: "galop6",          label: "Galop 6" },
    { val: "galop7",          label: "Galop 7" },
];
