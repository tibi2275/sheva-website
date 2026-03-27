"use client";

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import React from "react";

// ─── BRAND ────────────────────────────────────────────────────────────────────
const teal = "rgb(94,180,174)";
const tealDark = "rgb(69,144,150)";
const orange = "#ff6b35";

// ═══════════════════════════════════════════════════════════════════════════════
// ██  CONSTANTES — MODIFIEZ ICI POUR METTRE À JOUR LE PLANNING ET LES TARIFS ██
// ═══════════════════════════════════════════════════════════════════════════════

const SAISON = "2026-2027";
const SAISON_DEBUT = "24 août 2026";
const SAISON_FIN = "4 juillet 2027";

// Vacances scolaires
const VACANCES = [
    { nom: "Reprise des cours", dates: "Le 25 août 2025", type: "normal" },
    {
        nom: "Vacances de Toussaint",
        detail: "reprises normales",
        dates: "Du 20 octobre au 2 novembre 2025",
        type: "normal",
    },
    {
        nom: "Vacances de Noël",
        detail: "reprises de vacances",
        dates: "Du 22 décembre 2025 au 4 janvier 2026",
        type: "vacances",
    },
    {
        nom: "Vacances d'hiver",
        detail: "reprises de vacances",
        dates: "Du 23 février au 8 mars 2026",
        type: "vacances",
        pdf: "/PDF_docs/Reprises Vacances Hiver 2026.pdf",
    },
    {
        nom: "Vacances de printemps",
        detail: "reprises de vacances",
        dates: "Du 20 avril au 3 mai 2026",
        type: "vacances",
    },
    {
        nom: "Vacances d'été",
        detail: "fin des reprises",
        dates: "À partir du 5 juillet",
        type: "fin",
    },
];

// Forfaits calendrier
const FORFAITS_CAL = [
    {
        nom: "Forfait Annuel",
        badges: ["39 séances", "+6 vacances"],
        dates: "Du 24 août 2026 au 4 juillet 2027",
    },
    {
        nom: "Forfait 1er Semestre",
        badges: ["20 séances", "+2 vacances"],
        dates: "Du 25 août 2026 au 24 janvier 2027",
    },
    {
        nom: "Forfait 2nd Semestre",
        badges: ["19 séances", "+4 vacances"],
        dates: "Du 25 janvier au 4 juillet 2027",
    },
];

// ─── PLANNING HEBDOMADAIRE ────────────────────────────────────────────────────
// Pour modifier le planning : ajoutez/supprimez des créneaux dans chaque jour.
// types disponibles : "baby" | "poney" | "cheval" | "perf" | "galop"
type CreneauType =
    | "baby"
    | "poney"
    | "cheval"
    | "perf"
    | "galop"
    | "dressage"
    | "vide";

interface Creneau {
    heure: string;
    duree?: number; // minutes (défaut 60)
    type: CreneauType;
    label: string;
    lieu: "pm" | "gm"; // petit manège ou grand manège
    simLevels?: string[]; // clés simulateur accessibles à ce créneau — dérive REPRISES_BY_LEVEL
}

interface JourPlanning {
    jour: string;
    creneaux: Creneau[];
}

// prettier-ignore
const PLANNING_HEBDO: JourPlanning[] = [
    { jour: "Lundi", creneaux: [
        { heure: "12h30",            lieu: "gm", type: "cheval", label: "Galop 4-5",    simLevels: ["galop5"] },
        { heure: "17h30",            lieu: "gm", type: "cheval", label: "Galop 2",      simLevels: ["argent"] },
        { heure: "18h30",            lieu: "gm", type: "cheval", label: "Galop 3-4",    simLevels: ["galop3", "galop4"] },
        { heure: "19h30",            lieu: "gm", type: "cheval", label: "Galop 2",      simLevels: ["galop2"] },
        { heure: "20h30", duree: 90, lieu: "gm", type: "perf",   label: "Perf. 1h30",   simLevels: ["perf_g6", "perf_g7"] },
    ]},
    { jour: "Mardi", creneaux: [
        { heure: "12h30",            lieu: "gm", type: "cheval", label: "Galop 6-7",    simLevels: ["galop6", "galop7"] },
        { heure: "17h30", duree: 30, lieu: "pm", type: "poney",  label: "Baby",         simLevels: ["baby_rep"] },
        { heure: "18h00",            lieu: "gm", type: "cheval", label: "Galop 1 / 4",  simLevels: ["galop4"] },
        { heure: "19h00",            lieu: "gm", type: "cheval", label: "Galop 1-2",    simLevels: ["galop1", "galop2"] },
        { heure: "20h00",            lieu: "gm", type: "cheval", label: "Galop 3-5",    simLevels: ["galop3", "galop4", "galop5"] },
    ]},
    { jour: "Mercredi", creneaux: [
        { heure: "10h00", duree: 30, lieu: "pm", type: "poney",  label: "Baby",         simLevels: ["baby_rep"] },
        { heure: "10h30", duree: 30, lieu: "pm", type: "poney",  label: "Baby",         simLevels: ["baby_rep"] },
        { heure: "11h00",            lieu: "pm", type: "poney",  label: "Bronze",       simLevels: ["bronze"] },
        { heure: "12h30", duree: 45, lieu: "pm", type: "poney",  label: "Débutant",     simLevels: ["debutant"] },
        { heure: "13h15", duree: 45, lieu: "pm", type: "poney",  label: "Débutant",     simLevels: ["debutant"] },
        { heure: "14h00",            lieu: "pm", type: "poney",  label: "Bronze",       simLevels: ["bronze"] },
        { heure: "15h00",            lieu: "gm", type: "cheval", label: "Galop 2",      simLevels: ["galop2"] },
        { heure: "16h00",            lieu: "gm", type: "cheval", label: "Galop 1 / 4",  simLevels: ["galop1", "galop4"] },
        { heure: "17h00",            lieu: "pm", type: "poney",  label: "Argent",       simLevels: ["argent"] },
        { heure: "18h00",            lieu: "pm", type: "poney",  label: "Débutant",     simLevels: ["debutant"] },
        { heure: "19h00",            lieu: "gm", type: "cheval", label: "Galop 3",      simLevels: ["galop3"] },
        { heure: "19h30",            lieu: "gm", type: "cheval", label: "Galop 6",      simLevels: ["galop6"] },
        { heure: "20h30", duree: 90, lieu: "gm", type: "perf",   label: "Perf. 1h30",   simLevels: ["perf_g7"] },
    ]},
    { jour: "Jeudi", creneaux: [
        { heure: "18h00",            lieu: "gm", type: "cheval", label: "Galop 1 / 4",  simLevels: ["galop1", "galop4"] },
        { heure: "18h30",            lieu: "pm", type: "poney",  label: "Débutant",     simLevels: ["debutant"] },
        { heure: "19h30",            lieu: "gm", type: "cheval", label: "Galop 3-5",    simLevels: ["galop3", "galop4", "galop5"] },
        { heure: "20h30", duree: 90, lieu: "gm", type: "perf",   label: "Perf. 1h30",   simLevels: ["perf_g7"] },
    ]},
    { jour: "Vendredi", creneaux: [
        { heure: "17h30",            lieu: "pm", type: "poney",  label: "Débutant",     simLevels: ["debutant"] },
        { heure: "18h30",            lieu: "gm", type: "cheval", label: "Galop 1",      simLevels: ["galop5"] },
        { heure: "19h30",            lieu: "gm", type: "cheval", label: "Galop 2",      simLevels: ["galop2"] },
        { heure: "20h30",            lieu: "gm", type: "cheval", label: "Galop 4",      simLevels: ["galop4"] },
    ]},
    { jour: "Samedi", creneaux: [
        { heure: "9h30",             lieu: "pm", type: "poney",  label: "Argent / G5",  simLevels: ["argent", "galop5"] },
        { heure: "10h30",            lieu: "pm", type: "poney",  label: "Galop 1 / Or", simLevels: ["galop1", "or"] },
        { heure: "11h30", duree: 45, lieu: "pm", type: "poney",  label: "Débutant",     simLevels: ["debutant"] },
        { heure: "12h15", duree: 45, lieu: "pm", type: "poney",  label: "Débutant",     simLevels: ["debutant"] },
        { heure: "13h00",            lieu: "gm", type: "cheval", label: "Galop 2",      simLevels: ["galop2"] },
        { heure: "14h00",            lieu: "gm", type: "cheval", label: "Or / Galop 3", simLevels: ["debutant_chev", "or", "galop3"] },
        { heure: "15h00",            lieu: "gm", type: "cheval", label: "Bronze / G3",  simLevels: ["bronze", "galop3"] },
        { heure: "16h00",            lieu: "gm", type: "cheval", label: "Galop 4",      simLevels: ["galop4"] },
        { heure: "17h00",            lieu: "pm", type: "poney",  label: "Débutant",     simLevels: ["debutant"] },
        { heure: "17h00", duree: 90, lieu: "gm", type: "perf",   label: "Perf. 1h30",   simLevels: ["perf_g6"] },
    ]},
    { jour: "Dimanche", creneaux: [
        { heure: "9h00",             lieu: "gm", type: "galop",  label: "Galop 4-5",    simLevels: ["galop4", "galop5"] },
        { heure: "10h00",            lieu: "gm", type: "galop",  label: "Argent / G2",  simLevels: ["argent", "or"] },
        { heure: "11h00",            lieu: "pm", type: "poney",  label: "Bronze",       simLevels: ["bronze"] },
        { heure: "12h00", duree: 30, lieu: "pm", type: "baby",   label: "Baby",         simLevels: ["baby_rep"] },
        { heure: "12h30", duree: 30, lieu: "pm", type: "baby",   label: "Baby",         simLevels: ["baby_rep"] },
    ]},
];

// ─── TARIFS ────────────────────────────────────────────────────────────────────
const TARIFS_FORFAITS = [
    {
        categorie: "Poney",
        icon: "🐴",
        items: [
            {
                nom: "Baby (4-6 ans)",
                prix: 537,
                desc: "Éveil équestre, séances de 30 min",
                badge: "Poney",
            },
            {
                nom: "Poney Débutant",
                prix: 671,
                desc: "Apprentissage des bases à poney",
                badge: "Poney",
            },
            {
                nom: "Poney (Bronze/Argent/Or)",
                prix: 895,
                desc: "Perfectionnement niveau poney",
                badge: "Poney",
            },
        ],
    },
    {
        categorie: "Cheval",
        icon: "🐎",
        items: [
            {
                nom: "Cheval -16 ans",
                prix: 1042,
                desc: "Équitation cheval pour les jeunes",
                badge: "Cheval",
            },
            {
                nom: "Cheval +16 ans",
                prix: 1108,
                desc: "Équitation cheval pour les adultes",
                badge: "Cheval",
            },
            {
                nom: "Perfectionnement 1h30",
                prix: 1241,
                desc: "Cours 1h30 pour G6-G7",
                badge: "Perf.",
            },
        ],
    },
];

const COTISATIONS = {
    under16: 128,
    over16: 155,
    licenceUnder18: 29,
    licenceOver18: 40,
};

const TARIFS_ACTIVITES = [
    {
        categorie: "Séance à l'unité",
        items: [
            { nom: "Heure isolée adhérent", cheval: "26 €", poney: "22 €" },
            {
                nom: "Heure passager (non-adhérent)",
                cheval: "30 €",
                poney: "26 €",
            },
        ],
    },
    {
        categorie: "Stages",
        items: [
            { nom: "Obstacle / MSO", cheval: "38 €", poney: "28 €" },
            {
                nom: "Dressage / éthologie / travail à pied",
                cheval: "32 €",
                poney: "26 €",
            },
            { nom: "Longe / Longues rênes", cheval: "25 €", poney: "—" },
        ],
    },
    {
        categorie: "Passage d'examens",
        items: [
            { nom: "Théorie + pratiques G1-G4", cheval: "40 €", poney: "35 €" },
            { nom: "Théorie + pratiques G5-G7", cheval: "59 €", poney: "—" },
            { nom: "Préparation examens", cheval: "40 €", poney: "30 €" },
        ],
    },
    {
        categorie: "Concours",
        items: [
            { nom: "1 tour (dressage/CSO)", cheval: "48 €*", poney: "35 €*" },
            { nom: "2 tours (dressage/CSO)", cheval: "18 €*", poney: "15 €*" },
            { nom: "Concours interne", cheval: "42 €", poney: "32 €" },
        ],
    },
    {
        categorie: "Autres",
        items: [
            { nom: "Challenge annuel", cheval: "190 €", poney: "136 €" },
            { nom: "Challenge équifun", cheval: "—", poney: "80 €" },
            {
                nom: "Éveil poney (3-4 ans)",
                cheval: "—",
                poney: "120 € + 25 € licence",
            },
        ],
    },
];

// ─── SIMULATEUR — DONNÉES (dérivées de PLANNING_HEBDO via simLevels) ──────────
const REPRISES_BY_LEVEL: Record<
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

const FORFAITS_PRICING: Record<
    string,
    { name: string; price: number; desc: string; icon: string }
> = {
    baby: {
        name: "Baby",
        price: 537,
        desc: "Éveil équestre (4-6 ans)",
        icon: "🍼",
    },
    poney_debutant: {
        name: "Poney Débutant",
        price: 671,
        desc: "Bases avec les poneys",
        icon: "🐴",
    },
    poney: {
        name: "Poney",
        price: 895,
        desc: "Perfectionnement poney",
        icon: "🏇",
    },
    cheval_under16: {
        name: "Cheval -16 ans",
        price: 1042,
        desc: "Cheval pour les jeunes",
        icon: "🐎",
    },
    cheval_over16: {
        name: "Cheval +16 ans",
        price: 1108,
        desc: "Cheval adultes",
        icon: "🏆",
    },
    perfectionnement: {
        name: "Perfectionnement 1h30",
        price: 1241,
        desc: "Cours avancés G6-G7",
        icon: "⭐",
    },
};

// ═══════════════════════════════════════════════════════════════════════════════
// SUB-COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

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

// Couleurs par type de créneau
const CRENEAU_COLORS: Record<
    CreneauType,
    { bg: string; text: string; border: string }
> = {
    baby: { bg: "#fdf4ff", text: "#7c3aed", border: "#e9d5ff" },
    poney: { bg: "#f0fdf4", text: "#15803d", border: "#bbf7d0" },
    cheval: { bg: "#eff6ff", text: "#1d4ed8", border: "#bfdbfe" },
    perf: { bg: "#fff7ed", text: "#c2410c", border: "#fed7aa" },
    galop: {
        bg: "rgba(94,180,174,0.08)",
        text: tealDark,
        border: "rgba(94,180,174,0.25)",
    },
    dressage: { bg: "#fef9c3", text: "#854d0e", border: "#fde68a" },
    vide: { bg: "transparent", text: "#9ca3af", border: "transparent" },
};

const CRENEAU_TYPE_LABEL: Record<CreneauType, string> = {
    baby: "Baby",
    poney: "Poney",
    cheval: "Cheval",
    perf: "Perf.",
    galop: "Galop",
    dressage: "Dressage",
    vide: "",
};

// ─── Planning hebdomadaire — composant interactif ─────────────────────────────
const heureToMin = (h: string): number => {
    const [hh, mm] = h.split("h");
    return parseInt(hh) * 60 + (parseInt(mm) || 0);
};
const isPoney = (c: Creneau) => c.type === "baby" || c.type === "poney";
const isCheval = (c: Creneau) =>
    c.type === "cheval" ||
    c.type === "galop" ||
    c.type === "perf" ||
    c.type === "dressage";

// Grille temporelle à pas de 15 min — précalcul depuis les constantes
const SLOT_STEP = 15;

const ALL_SLOTS: number[] = (() => {
    const set = new Set<number>();
    for (const { creneaux } of PLANNING_HEBDO) {
        for (const c of creneaux) {
            const start = heureToMin(c.heure);
            const dur = c.duree ?? 60;
            for (let t = start; t < start + dur; t += SLOT_STEP) set.add(t);
        }
    }
    return Array.from(set).sort((a, b) => a - b);
})();

const minToHeure = (min: number): string => {
    const h = Math.floor(min / 60);
    const m = min % 60;
    return m === 0 ? `${h}h` : `${h}h${String(m).padStart(2, "0")}`;
};

type GridEntry = { creneau: Creneau; rowSpan: number } | "covered" | null;

const GRID_DATA: Record<
    string,
    Record<"pm" | "gm", Map<number, GridEntry>>
> = {};
for (const { jour, creneaux } of PLANNING_HEBDO) {
    GRID_DATA[jour] = { pm: new Map(), gm: new Map() };
    for (const col of ["pm", "gm"] as const) {
        const occupied = new Set<number>();
        for (const slot of ALL_SLOTS) {
            if (occupied.has(slot)) {
                GRID_DATA[jour][col].set(slot, "covered");
                continue;
            }
            const c = creneaux.find(
                (x) => heureToMin(x.heure) === slot && x.lieu === col,
            );
            if (c) {
                const dur = c.duree ?? 60;
                const end = slot + dur;
                const rowSpan = ALL_SLOTS.filter(
                    (s) => s >= slot && s < end,
                ).length;
                GRID_DATA[jour][col].set(slot, { creneau: c, rowSpan });
                ALL_SLOTS.filter((s) => s > slot && s < end).forEach((s) =>
                    occupied.add(s),
                );
            } else {
                GRID_DATA[jour][col].set(slot, null);
            }
        }
    }
}

function PlanningComponent() {
    const [filterType, setFilterType] = useState<"tous" | "poney" | "cheval">(
        "tous",
    );

    // Largeur minimale du tableau : 48px (heure) + 65px × nb colonnes data
    // Garantit que le texte ne déborde pas ; le scroll horizontal prend le relais sur mobile
    const numDataCols = PLANNING_HEBDO.length * 2; // toujours pm + gm
    const tableMinWidth = 48 + numDataCols * 65;

    // Slots visibles : on inclut un slot si au moins une colonne a une entrée non-nulle
    const visibleSlots = ALL_SLOTS.filter((slot) => {
        for (const { jour } of PLANNING_HEBDO) {
            const ep = GRID_DATA[jour].pm.get(slot);
            const eg = GRID_DATA[jour].gm.get(slot);
            if (
                (ep !== null && ep !== undefined) ||
                (eg !== null && eg !== undefined)
            )
                return true;
        }
        return false;
    });

    const thBase: React.CSSProperties = {
        padding: "6px 3px",
        border: "1px solid #e5e7eb",
        fontSize: 10,
        fontWeight: 700,
        textAlign: "center",
        whiteSpace: "nowrap",
        background: "white",
    };

    const renderCell = (
        entry: GridEntry | undefined,
        ri: number,
    ): React.ReactNode => {
        if (entry === "covered") return null;
        if (entry !== null && entry !== undefined) {
            const { creneau: c, rowSpan } = entry;
            const filtered =
                (filterType === "poney" && !isPoney(c)) ||
                (filterType === "cheval" && !isCheval(c));
            if (filtered) {
                return (
                    <td
                        rowSpan={rowSpan}
                        style={{
                            padding: "2px",
                            border: "1px solid #f0f0f0",
                            background: ri % 2 === 0 ? "white" : "#fafbfb",
                        }}
                    />
                );
            }
            return (
                <td
                    rowSpan={rowSpan}
                    style={{
                        padding: "3px 4px",
                        border: "1px solid #e5e7eb",
                        background: CRENEAU_COLORS[c.type].bg,
                        textAlign: "center",
                        verticalAlign: "middle",
                        lineHeight: 1.2,
                    }}
                >
                    <div
                        style={{
                            fontSize: 10,
                            fontWeight: 700,
                            color: CRENEAU_COLORS[c.type].text,
                        }}
                    >
                        {c.label}
                    </div>
                    <div
                        style={{
                            fontSize: 9,
                            color: CRENEAU_COLORS[c.type].text,
                            opacity: 0.65,
                            marginTop: 1,
                        }}
                    >
                        {c.duree ?? 60}min
                    </div>
                </td>
            );
        }
        return (
            <td
                style={{
                    padding: "2px",
                    border: "1px solid #f0f0f0",
                    background: ri % 2 === 0 ? "white" : "#fafbfb",
                }}
            />
        );
    };

    return (
        <div>
            {/* Filtre */}
            <div
                style={{
                    display: "flex",
                    gap: 8,
                    justifyContent: "center",
                    marginBottom: 16,
                    flexWrap: "wrap",
                }}
            >
                {[
                    { val: "tous" as const, label: "Tous" },
                    { val: "poney" as const, label: "🐴 Poney" },
                    { val: "cheval" as const, label: "🐎 Cheval" },
                ].map((f) => (
                    <button
                        key={f.val}
                        onClick={() => setFilterType(f.val)}
                        style={{
                            padding: "7px 16px",
                            borderRadius: 20,
                            border:
                                filterType === f.val
                                    ? `2px solid ${teal}`
                                    : "2px solid #e5e7eb",
                            background:
                                filterType === f.val
                                    ? "rgba(94,180,174,0.1)"
                                    : "white",
                            color: filterType === f.val ? tealDark : "#6b7280",
                            fontWeight: 600,
                            fontSize: 13,
                            cursor: "pointer",
                            transition: "all 0.15s",
                        }}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {/* Tableau planning — scroll horizontal + vertical */}
            <div
                style={{
                    overflowX: "auto",
                    overflowY: "auto",
                    maxHeight: 540,
                    borderRadius: 10,
                    border: "1px solid #e5e7eb",
                }}
            >
                <table
                    style={{
                        borderCollapse: "collapse",
                        width: "100%",
                        minWidth: tableMinWidth,
                        tableLayout: "fixed" as const,
                    }}
                >
                    <thead style={{ position: "sticky", top: 0, zIndex: 10 }}>
                        <tr>
                            <th
                                rowSpan={2}
                                style={{
                                    ...thBase,
                                    padding: "8px 6px",
                                    background: "#f8fafc",
                                    color: "#6b7280",
                                    verticalAlign: "middle",
                                    width: 48,
                                    position: "sticky",
                                    left: 0,
                                    zIndex: 20,
                                    boxShadow: "2px 0 4px rgba(0,0,0,0.06)",
                                }}
                            >
                                Heure
                            </th>
                            {PLANNING_HEBDO.map(({ jour }) => (
                                <th
                                    key={jour}
                                    colSpan={2}
                                    style={{
                                        ...thBase,
                                        fontSize: 11,
                                        fontWeight: 800,
                                        background: tealDark,
                                        color: "white",
                                    }}
                                >
                                    {jour.slice(0, 3).toUpperCase()}
                                </th>
                            ))}
                        </tr>
                        <tr>
                            {PLANNING_HEBDO.map(({ jour }) => (
                                <React.Fragment key={`sub-${jour}`}>
                                    <th
                                        style={{
                                            ...thBase,
                                            background: "#d1fae5",
                                            color: "#065f46",
                                            fontSize: 9,
                                        }}
                                    >
                                        🐴 PM
                                    </th>
                                    <th
                                        style={{
                                            ...thBase,
                                            background: "#dbeafe",
                                            color: "#1e3a8a",
                                            fontSize: 9,
                                        }}
                                    >
                                        🐎 GM
                                    </th>
                                </React.Fragment>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {visibleSlots.map((slot, ri) => (
                            <tr key={slot} style={{ height: 26 }}>
                                <td
                                    style={{
                                        padding: "0 5px",
                                        border: "1px solid #e5e7eb",
                                        fontWeight: slot % 60 === 0 ? 700 : 400,
                                        fontSize: slot % 60 === 0 ? 11 : 9,
                                        color:
                                            slot % 60 === 0
                                                ? "#374151"
                                                : "#bbbbbb",
                                        textAlign: "right",
                                        whiteSpace: "nowrap",
                                        background: "#f8fafc",
                                        width: 48,
                                        position: "sticky",
                                        left: 0,
                                        zIndex: 5,
                                        boxShadow: "2px 0 4px rgba(0,0,0,0.04)",
                                    }}
                                >
                                    {slot % 30 === 0 ? minToHeure(slot) : "·"}
                                </td>
                                {PLANNING_HEBDO.map(({ jour }) => (
                                    <React.Fragment
                                        key={`cell-${jour}-${slot}`}
                                    >
                                        {renderCell(
                                            GRID_DATA[jour].pm.get(slot),
                                            ri,
                                        )}
                                        {renderCell(
                                            GRID_DATA[jour].gm.get(slot),
                                            ri,
                                        )}
                                    </React.Fragment>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Légende */}
            <div
                style={{
                    marginTop: 10,
                    textAlign: "center",
                    fontSize: 11,
                    color: "#9ca3af",
                }}
            >
                <strong>PM</strong> = Petit Manège &nbsp;·&nbsp;{" "}
                <strong>GM</strong> = Grand Manège
            </div>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    marginTop: 8,
                    justifyContent: "center",
                }}
            >
                {(
                    [
                        "baby",
                        "poney",
                        "galop",
                        "cheval",
                        "perf",
                    ] as CreneauType[]
                ).map((type) => {
                    const c = CRENEAU_COLORS[type];
                    const labels: Record<string, string> = {
                        baby: "Baby (30min)",
                        poney: "Poney",
                        galop: "Galops",
                        cheval: "Cheval débutant",
                        perf: "Perf. 1h30",
                    };
                    return (
                        <div
                            key={type}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 5,
                                fontSize: 11,
                                color: "#6b7280",
                            }}
                        >
                            <div
                                style={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: 2,
                                    background: c.border,
                                }}
                            />
                            <span style={{ color: c.text, fontWeight: 600 }}>
                                {labels[type]}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// ─── SIMULATEUR (drawer latéral) ──────────────────────────────────────────────
type MountType = "poney" | "cheval" | null;

interface MemberData {
    age: string;
    height: string;
    weight: string;
    level: string;
    forfait: string;
    reprise: string;
}

interface MemberResult {
    index: number;
    age: number;
    forfaitName: string;
    forfaitPrice: number;
    reprise: string;
    cotisationBase: number;
    cotisation: number;
    cotisationDiscount: number;
    licence: number;
    total: number;
}

function Simulateur({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const [step, setStep] = useState(1);
    const [memberCount, setMemberCount] = useState(1);
    const [currentMember, setCurrentMember] = useState(0);
    const [members, setMembers] = useState<MemberData[]>([]);
    const [results, setResults] = useState<MemberResult[] | null>(null);
    const [totalPrice, setTotalPrice] = useState(0);

    const emptyMember = (): MemberData => ({
        age: "",
        height: "",
        weight: "",
        level: "",
        forfait: "",
        reprise: "",
    });

    const updateMember = useCallback(
        (field: keyof MemberData, value: string) => {
            setMembers((prev) => {
                const updated = [...prev];
                const cur = { ...updated[currentMember] };
                if (field === "age") {
                    updated[currentMember] = { ...emptyMember(), age: value };
                } else if (field === "level") {
                    updated[currentMember] = {
                        ...cur,
                        level: value,
                        forfait: "",
                        reprise: "",
                    };
                } else if (field === "forfait") {
                    updated[currentMember] = {
                        ...cur,
                        forfait: value,
                        reprise: "",
                    };
                } else {
                    updated[currentMember] = { ...cur, [field]: value };
                }
                return updated;
            });
        },
        [currentMember],
    );

    const getMountType = (m: MemberData): MountType => {
        const age = parseInt(m.age);
        if (!age) return null;
        if (age <= 6) return null; // baby — pas de mount type
        if (age <= 9) return "poney";
        if (age >= 13) return "cheval";
        const h = parseFloat(m.height),
            w = parseInt(m.weight);
        if (h && w) return h > 1.5 || w > 60 ? "cheval" : "poney";
        return null;
    };

    const getAvailableLevels = (m: MemberData) => {
        const age = parseInt(m.age);
        const mt = getMountType(m);
        if (!age || age <= 6) return [];
        if (mt === "poney")
            return [
                { val: "debutant", label: "🌟 Débutant" },
                { val: "bronze", label: "🥉 Bronze" },
                { val: "argent", label: "🥈 Argent" },
                { val: "or", label: "🥇 Or" },
            ];
        if (mt === "cheval")
            return [
                { val: "debutant", label: "🌟 Débutant" },
                { val: "galop1", label: "1️⃣ Galop 1" },
                { val: "galop2", label: "2️⃣ Galop 2" },
                { val: "galop3", label: "3️⃣ Galop 3" },
                { val: "galop4", label: "4️⃣ Galop 4" },
                { val: "galop5", label: "5️⃣ Galop 5" },
                { val: "galop6", label: "6️⃣ Galop 6" },
                { val: "galop7", label: "7️⃣ Galop 7" },
            ];
        return [];
    };

    const getAvailableForfaits = (m: MemberData): string[] => {
        const age = parseInt(m.age);
        const mt = getMountType(m);
        if (!age) return [];
        if (age <= 6) return ["baby"];
        if (!mt) return [];
        if (mt === "poney")
            return m.level === "debutant"
                ? ["poney_debutant"]
                : m.level
                  ? ["poney"]
                  : [];
        const base = age < 16 ? "cheval_under16" : "cheval_over16";
        if (!m.level) return [];
        const list = [base];
        if (m.level === "galop6" || m.level === "galop7")
            list.push("perfectionnement");
        return list;
    };

    const getAvailableReprises = (m: MemberData) => {
        let key: string | null = null;
        if (m.forfait === "baby") key = "baby_rep";
        else if (m.forfait === "poney_debutant") key = "debutant";
        else if (m.forfait === "poney") key = m.level;
        else if (
            m.forfait === "cheval_under16" ||
            m.forfait === "cheval_over16"
        ) {
            key = m.level === "debutant" ? "debutant_chev" : m.level;
        } else if (m.forfait === "perfectionnement") {
            key = m.level === "galop6" ? "perf_g6" : "perf_g7";
        }
        return key ? (REPRISES_BY_LEVEL[key] ?? []) : [];
    };

    const calcTotal = () => {
        const rawData = members.map((m, i) => {
            const age = parseInt(m.age);
            const forfait = FORFAITS_PRICING[m.forfait];
            const reprises = getAvailableReprises(m);
            const repriseInfo = reprises.find((r) => r.id === m.reprise);
            return {
                index: i + 1,
                age,
                forfaitName: forfait.name,
                forfaitPrice: forfait.price,
                reprise: repriseInfo
                    ? `${repriseInfo.day} ${repriseInfo.time}`
                    : "—",
                cotisationBase:
                    age < 16 ? COTISATIONS.under16 : COTISATIONS.over16,
                licence:
                    age < 18
                        ? COTISATIONS.licenceUnder18
                        : COTISATIONS.licenceOver18,
            };
        });

        // Remise famille : tri par cotisation décroissante
        const sorted = [...rawData].sort(
            (a, b) => b.cotisationBase - a.cotisationBase,
        );
        const withDiscount = sorted.map((m, idx) => ({
            ...m,
            cotisationDiscount: idx === 2 ? 0.5 : idx >= 3 ? 0.75 : 0,
            cotisation:
                idx === 2
                    ? m.cotisationBase * 0.5
                    : idx >= 3
                      ? m.cotisationBase * 0.25
                      : m.cotisationBase,
        }));

        const finalResults: MemberResult[] = rawData.map((m) => {
            const d = withDiscount.find((w) => w.index === m.index)!;
            return {
                ...m,
                cotisation: d.cotisation,
                cotisationDiscount: d.cotisationDiscount,
                total: d.cotisation + m.licence + m.forfaitPrice,
            };
        });

        setResults(finalResults);
        setTotalPrice(finalResults.reduce((acc, r) => acc + r.total, 0));
        setStep(3);
    };

    const resetSimulator = () => {
        setStep(1);
        setMemberCount(1);
        setMembers([]);
        setCurrentMember(0);
        setResults(null);
        setTotalPrice(0);
    };

    const startWithCount = (n: number) => {
        setMemberCount(n);
        setMembers(Array.from({ length: n }, emptyMember));
        setCurrentMember(0);
        setStep(2);
    };

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const currentM = members[currentMember] ?? emptyMember();
    const age = parseInt(currentM.age);
    const mt = getMountType(currentM);
    const needsMorpho = age >= 10 && age <= 12;
    const morphoDone = !needsMorpho || (!!currentM.height && !!currentM.weight);
    const levels = getAvailableLevels(currentM);
    const forfaits = getAvailableForfaits(currentM);
    const reprises = getAvailableReprises(currentM);
    const memberReady = !!currentM.forfait && !!currentM.reprise;
    const allReady =
        members.length > 0 && members.every((m) => !!m.forfait && !!m.reprise);

    return (
        <>
            {/* Overlay */}
            <div
                onClick={onClose}
                style={{
                    position: "fixed",
                    inset: 0,
                    background: "rgba(0,0,0,0.45)",
                    backdropFilter: "blur(2px)",
                    zIndex: 200,
                    animation: "fadeIn 0.2s ease",
                }}
            />

            {/* Drawer latéral */}
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: "min(520px, 100vw)",
                    background: "white",
                    zIndex: 201,
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "-8px 0 40px rgba(0,0,0,0.15)",
                    animation: "slideInRight 0.3s ease",
                }}
            >
                {/* En-tête */}
                <div
                    style={{
                        padding: "20px 24px",
                        borderBottom: "1px solid #f0f0f0",
                        background: `linear-gradient(135deg, ${teal}, ${tealDark})`,
                        color: "white",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                        }}
                    >
                        <div>
                            <div
                                style={{
                                    fontSize: 11,
                                    fontWeight: 700,
                                    letterSpacing: "0.1em",
                                    textTransform: "uppercase" as const,
                                    opacity: 0.8,
                                    marginBottom: 4,
                                }}
                            >
                                SHEVA — Outil d'aide
                            </div>
                            <h2
                                style={{
                                    fontSize: 20,
                                    fontWeight: 800,
                                    margin: 0,
                                }}
                            >
                                🐎 Simulateur de tarif
                            </h2>
                            <p
                                style={{
                                    fontSize: 12,
                                    opacity: 0.8,
                                    margin: "4px 0 0",
                                    lineHeight: 1.4,
                                }}
                            >
                                Estimation indicative — l'inscription en ligne
                                reste obligatoire
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            style={{
                                background: "rgba(255,255,255,0.2)",
                                border: "none",
                                borderRadius: 8,
                                color: "white",
                                width: 32,
                                height: 32,
                                cursor: "pointer",
                                fontSize: 18,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                            }}
                        >
                            ×
                        </button>
                    </div>
                    {/* Progress bar membres */}
                    {step === 2 && memberCount > 1 && (
                        <div style={{ display: "flex", gap: 6, marginTop: 16 }}>
                            {Array.from({ length: memberCount }, (_, i) => (
                                <div
                                    key={i}
                                    style={{
                                        flex: 1,
                                        height: 4,
                                        borderRadius: 2,
                                        background:
                                            i < currentMember
                                                ? "rgba(255,255,255,0.9)"
                                                : i === currentMember
                                                  ? "rgba(255,255,255,0.6)"
                                                  : "rgba(255,255,255,0.25)",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => {
                                        if (
                                            members[i].reprise ||
                                            i <= currentMember
                                        )
                                            setCurrentMember(i);
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Contenu scrollable */}
                <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
                    {/* ÉTAPE 1 — Nombre de membres */}
                    {step === 1 && (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 20,
                            }}
                        >
                            <div>
                                <h3
                                    style={{
                                        fontSize: 17,
                                        fontWeight: 700,
                                        color: "rgb(15,23,42)",
                                        marginBottom: 6,
                                    }}
                                >
                                    Combien de membres à inscrire ?
                                </h3>
                                <p
                                    style={{
                                        fontSize: 13,
                                        color: "#6b7280",
                                        lineHeight: 1.5,
                                    }}
                                >
                                    Réduction de 50% sur la cotisation dès le
                                    3ème membre, 75% dès le 4ème.
                                </p>
                            </div>
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(4, 1fr)",
                                    gap: 10,
                                }}
                            >
                                {[1, 2, 3, 4].map((n) => (
                                    <button
                                        key={n}
                                        onClick={() => startWithCount(n)}
                                        style={{
                                            padding: "20px 12px",
                                            borderRadius: 12,
                                            border: `2px solid ${n >= 3 ? teal : "#e5e7eb"}`,
                                            background:
                                                n >= 3
                                                    ? "rgba(94,180,174,0.06)"
                                                    : "white",
                                            color: "rgb(15,23,42)",
                                            fontWeight: 700,
                                            fontSize: 22,
                                            cursor: "pointer",
                                            transition: "all 0.15s",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            gap: 4,
                                        }}
                                    >
                                        {n}
                                        <span
                                            style={{
                                                fontSize: 11,
                                                fontWeight: 500,
                                                color: "#9ca3af",
                                            }}
                                        >
                                            {n === 1 ? "membre" : "membres"}
                                        </span>
                                        {n >= 3 && (
                                            <span
                                                style={{
                                                    fontSize: 10,
                                                    fontWeight: 700,
                                                    color: teal,
                                                }}
                                            >
                                                −{n === 3 ? "50" : "75"}%
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ÉTAPE 2 — Profil du membre courant */}
                    {step === 2 && members.length > 0 && (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 18,
                            }}
                        >
                            {/* En-tête membre */}
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <h3
                                    style={{
                                        fontSize: 17,
                                        fontWeight: 700,
                                        color: "rgb(15,23,42)",
                                        margin: 0,
                                    }}
                                >
                                    Membre {currentMember + 1} / {memberCount}
                                </h3>
                                {memberCount > 1 && (
                                    <div style={{ display: "flex", gap: 6 }}>
                                        {members.map((m, i) => (
                                            <button
                                                key={i}
                                                onClick={() =>
                                                    setCurrentMember(i)
                                                }
                                                style={{
                                                    width: 28,
                                                    height: 28,
                                                    borderRadius: "50%",
                                                    border:
                                                        i === currentMember
                                                            ? `2px solid ${teal}`
                                                            : "2px solid #e5e7eb",
                                                    background: m.reprise
                                                        ? teal
                                                        : i === currentMember
                                                          ? "rgba(94,180,174,0.1)"
                                                          : "white",
                                                    color: m.reprise
                                                        ? "white"
                                                        : i === currentMember
                                                          ? tealDark
                                                          : "#9ca3af",
                                                    fontWeight: 700,
                                                    fontSize: 12,
                                                    cursor: "pointer",
                                                }}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Âge */}
                            <div>
                                <label
                                    style={{
                                        fontSize: 13,
                                        fontWeight: 600,
                                        color: "#374151",
                                        marginBottom: 6,
                                        display: "block",
                                    }}
                                >
                                    Âge{" "}
                                    <span style={{ color: "#ef4444" }}>*</span>
                                </label>
                                <input
                                    type="number"
                                    value={currentM.age}
                                    onChange={(e) =>
                                        updateMember("age", e.target.value)
                                    }
                                    min={4}
                                    max={99}
                                    placeholder="Ex : 12"
                                    style={{
                                        width: "100%",
                                        padding: "11px 14px",
                                        border: `1.5px solid ${currentM.age ? teal : "#e5e7eb"}`,
                                        borderRadius: 10,
                                        fontSize: 15,
                                        outline: "none",
                                        boxSizing: "border-box" as const,
                                    }}
                                />
                                {age >= 4 && (
                                    <div
                                        style={{
                                            marginTop: 8,
                                            padding: "8px 12px",
                                            borderRadius: 8,
                                            background:
                                                age <= 6
                                                    ? "#fdf4ff"
                                                    : age <= 9
                                                      ? "#f0fdf4"
                                                      : "rgba(94,180,174,0.07)",
                                            fontSize: 12,
                                            fontWeight: 600,
                                            color:
                                                age <= 6
                                                    ? "#7c3aed"
                                                    : age <= 9
                                                      ? "#15803d"
                                                      : tealDark,
                                        }}
                                    >
                                        {age <= 6
                                            ? "🍼 Forfait Baby recommandé"
                                            : age <= 9
                                              ? "🐴 Forfaits Poney"
                                              : needsMorpho
                                                ? "📏 Indiquez taille et poids pour affiner"
                                                : "🐎 Forfaits Cheval"}
                                    </div>
                                )}
                            </div>

                            {/* Morphologie 10-12 ans */}
                            {needsMorpho && (
                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr",
                                        gap: 12,
                                    }}
                                >
                                    {[
                                        {
                                            field: "height" as keyof MemberData,
                                            label: "Taille (m)",
                                            placeholder: "1.45",
                                        },
                                        {
                                            field: "weight" as keyof MemberData,
                                            label: "Poids (kg)",
                                            placeholder: "45",
                                        },
                                    ].map(({ field, label, placeholder }) => (
                                        <div key={field}>
                                            <label
                                                style={{
                                                    fontSize: 13,
                                                    fontWeight: 600,
                                                    color: "#374151",
                                                    marginBottom: 6,
                                                    display: "block",
                                                }}
                                            >
                                                {label}
                                            </label>
                                            <input
                                                type="number"
                                                value={currentM[field]}
                                                onChange={(e) =>
                                                    updateMember(
                                                        field,
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder={placeholder}
                                                step={
                                                    field === "height"
                                                        ? 0.01
                                                        : 1
                                                }
                                                style={{
                                                    width: "100%",
                                                    padding: "11px 12px",
                                                    border: `1.5px solid ${currentM[field] ? teal : "#e5e7eb"}`,
                                                    borderRadius: 10,
                                                    fontSize: 14,
                                                    outline: "none",
                                                    boxSizing:
                                                        "border-box" as const,
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Monture déterminée */}
                            {mt && morphoDone && age > 6 && (
                                <div
                                    style={{
                                        padding: "8px 12px",
                                        borderRadius: 8,
                                        background:
                                            mt === "poney"
                                                ? "#f0fdf4"
                                                : "#eff6ff",
                                        border: `1px solid ${mt === "poney" ? "#bbf7d0" : "#bfdbfe"}`,
                                        fontSize: 13,
                                        fontWeight: 600,
                                        color:
                                            mt === "poney"
                                                ? "#15803d"
                                                : "#1d4ed8",
                                    }}
                                >
                                    {mt === "poney"
                                        ? "🐴 Forfaits Poney"
                                        : "🐎 Forfaits Cheval"}
                                </div>
                            )}

                            {/* Niveau */}
                            {levels.length > 0 && morphoDone && (
                                <div>
                                    <label
                                        style={{
                                            fontSize: 13,
                                            fontWeight: 600,
                                            color: "#374151",
                                            marginBottom: 8,
                                            display: "block",
                                        }}
                                    >
                                        Niveau acquis
                                    </label>
                                    <div
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns: "1fr 1fr",
                                            gap: 8,
                                        }}
                                    >
                                        {levels.map((l) => (
                                            <button
                                                key={l.val}
                                                onClick={() =>
                                                    updateMember("level", l.val)
                                                }
                                                style={{
                                                    padding: "9px 10px",
                                                    borderRadius: 8,
                                                    border:
                                                        currentM.level === l.val
                                                            ? `2px solid ${teal}`
                                                            : "2px solid #e5e7eb",
                                                    background:
                                                        currentM.level === l.val
                                                            ? "rgba(94,180,174,0.08)"
                                                            : "white",
                                                    color:
                                                        currentM.level === l.val
                                                            ? tealDark
                                                            : "#374151",
                                                    fontWeight: 600,
                                                    fontSize: 13,
                                                    cursor: "pointer",
                                                    textAlign: "left" as const,
                                                    transition: "all 0.15s",
                                                }}
                                            >
                                                {l.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Forfait */}
                            {forfaits.length > 0 && (
                                <div>
                                    <label
                                        style={{
                                            fontSize: 13,
                                            fontWeight: 600,
                                            color: "#374151",
                                            marginBottom: 8,
                                            display: "block",
                                        }}
                                    >
                                        Forfait
                                    </label>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 8,
                                        }}
                                    >
                                        {forfaits.map((fk) => {
                                            const f = FORFAITS_PRICING[fk];
                                            const sel = currentM.forfait === fk;
                                            return (
                                                <button
                                                    key={fk}
                                                    onClick={() =>
                                                        updateMember(
                                                            "forfait",
                                                            fk,
                                                        )
                                                    }
                                                    style={{
                                                        padding: "12px 14px",
                                                        borderRadius: 10,
                                                        border: sel
                                                            ? `2px solid ${teal}`
                                                            : "2px solid #e5e7eb",
                                                        background: sel
                                                            ? "rgba(94,180,174,0.06)"
                                                            : "white",
                                                        cursor: "pointer",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 12,
                                                        textAlign:
                                                            "left" as const,
                                                        transition: "all 0.15s",
                                                    }}
                                                >
                                                    <span
                                                        style={{ fontSize: 22 }}
                                                    >
                                                        {f.icon}
                                                    </span>
                                                    <div style={{ flex: 1 }}>
                                                        <div
                                                            style={{
                                                                fontSize: 14,
                                                                fontWeight: 700,
                                                                color: sel
                                                                    ? tealDark
                                                                    : "rgb(15,23,42)",
                                                            }}
                                                        >
                                                            {f.name}
                                                        </div>
                                                        <div
                                                            style={{
                                                                fontSize: 12,
                                                                color: "#6b7280",
                                                            }}
                                                        >
                                                            {f.desc}
                                                        </div>
                                                    </div>
                                                    <div
                                                        style={{
                                                            fontSize: 16,
                                                            fontWeight: 800,
                                                            color: sel
                                                                ? teal
                                                                : "#374151",
                                                            whiteSpace:
                                                                "nowrap" as const,
                                                        }}
                                                    >
                                                        {f.price} €
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Créneau */}
                            {reprises.length > 0 && (
                                <div>
                                    <label
                                        style={{
                                            fontSize: 13,
                                            fontWeight: 600,
                                            color: "#374151",
                                            marginBottom: 8,
                                            display: "block",
                                        }}
                                    >
                                        Créneau préféré
                                    </label>
                                    <div
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns:
                                                "repeat(auto-fill, minmax(120px, 1fr))",
                                            gap: 8,
                                        }}
                                    >
                                        {reprises.map((r) => {
                                            const sel =
                                                currentM.reprise === r.id;
                                            return (
                                                <button
                                                    key={r.id}
                                                    onClick={() =>
                                                        updateMember(
                                                            "reprise",
                                                            r.id,
                                                        )
                                                    }
                                                    style={{
                                                        padding: "10px 8px",
                                                        borderRadius: 8,
                                                        border: sel
                                                            ? `2px solid ${orange}`
                                                            : "2px solid #e5e7eb",
                                                        background: sel
                                                            ? "#fff4ef"
                                                            : "white",
                                                        color: sel
                                                            ? orange
                                                            : "#374151",
                                                        fontWeight: 600,
                                                        fontSize: 13,
                                                        cursor: "pointer",
                                                        textAlign:
                                                            "center" as const,
                                                        transition: "all 0.15s",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            fontSize: 11,
                                                            color: sel
                                                                ? orange
                                                                : "#9ca3af",
                                                            marginBottom: 2,
                                                        }}
                                                    >
                                                        {r.day}
                                                    </div>
                                                    <div
                                                        style={{
                                                            fontSize: 15,
                                                            fontWeight: 800,
                                                        }}
                                                    >
                                                        {r.time}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Boutons navigation */}
                            <div
                                style={{
                                    display: "flex",
                                    gap: 10,
                                    marginTop: 4,
                                }}
                            >
                                {currentMember < memberCount - 1 && (
                                    <button
                                        disabled={!memberReady}
                                        onClick={() =>
                                            setCurrentMember((p) => p + 1)
                                        }
                                        style={{
                                            flex: 1,
                                            padding: "13px",
                                            borderRadius: 10,
                                            border: `2px solid ${memberReady ? teal : "#e5e7eb"}`,
                                            background: memberReady
                                                ? "rgba(94,180,174,0.08)"
                                                : "#f9fafb",
                                            color: memberReady
                                                ? tealDark
                                                : "#9ca3af",
                                            fontWeight: 700,
                                            fontSize: 14,
                                            cursor: memberReady
                                                ? "pointer"
                                                : "not-allowed",
                                        }}
                                    >
                                        Membre suivant →
                                    </button>
                                )}
                                {currentMember === memberCount - 1 && (
                                    <button
                                        disabled={!allReady}
                                        onClick={calcTotal}
                                        style={{
                                            flex: 1,
                                            padding: "13px",
                                            borderRadius: 10,
                                            border: "none",
                                            background: allReady
                                                ? `linear-gradient(135deg, ${orange}, #f7931e)`
                                                : "#e5e7eb",
                                            color: allReady
                                                ? "white"
                                                : "#9ca3af",
                                            fontWeight: 700,
                                            fontSize: 14,
                                            cursor: allReady
                                                ? "pointer"
                                                : "not-allowed",
                                        }}
                                    >
                                        💰 Calculer mon tarif
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* ÉTAPE 3 — Résultat */}
                    {step === 3 && results && (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 18,
                            }}
                        >
                            {/* Total */}
                            <div
                                style={{
                                    textAlign: "center",
                                    padding: "24px 20px",
                                    background: "rgba(94,180,174,0.06)",
                                    border: "1px solid rgba(94,180,174,0.2)",
                                    borderRadius: 16,
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: 13,
                                        fontWeight: 600,
                                        color: "#6b7280",
                                        marginBottom: 4,
                                        textTransform: "uppercase" as const,
                                        letterSpacing: "0.08em",
                                    }}
                                >
                                    Estimation totale
                                </div>
                                <div
                                    style={{
                                        fontSize: 44,
                                        fontWeight: 900,
                                        color: tealDark,
                                        lineHeight: 1,
                                    }}
                                >
                                    {totalPrice.toFixed(0)} €
                                </div>
                                <div
                                    style={{
                                        fontSize: 12,
                                        color: "#9ca3af",
                                        marginTop: 6,
                                    }}
                                >
                                    Pour {results.length} membre
                                    {results.length > 1 ? "s" : ""} · Saison{" "}
                                    {SAISON}
                                </div>
                            </div>

                            {/* Détail par membre */}
                            {results.map((r) => (
                                <div
                                    key={r.index}
                                    style={{
                                        background: "white",
                                        border: "1px solid #f0f0f0",
                                        borderRadius: 12,
                                        overflow: "hidden",
                                    }}
                                >
                                    <div
                                        style={{
                                            padding: "10px 14px",
                                            background: "#f8fafc",
                                            borderBottom: "1px solid #f0f0f0",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontWeight: 700,
                                                fontSize: 14,
                                                color: "rgb(15,23,42)",
                                            }}
                                        >
                                            👤 Membre {r.index}
                                        </span>
                                        <span
                                            style={{
                                                fontWeight: 800,
                                                fontSize: 16,
                                                color: tealDark,
                                            }}
                                        >
                                            {r.total.toFixed(0)} €
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            padding: "12px 14px",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 7,
                                        }}
                                    >
                                        {[
                                            {
                                                label: `Forfait ${r.forfaitName}`,
                                                value: `${r.forfaitPrice} €`,
                                                green: false,
                                            },
                                            {
                                                label: `Cotisation${r.cotisationDiscount > 0 ? ` (−${r.cotisationDiscount * 100}%)` : ""}`,
                                                value: `${r.cotisation.toFixed(0)} €`,
                                                green: r.cotisationDiscount > 0,
                                            },
                                            {
                                                label: "Licence FFE",
                                                value: `${r.licence} €`,
                                                green: false,
                                            },
                                            {
                                                label: "Créneau",
                                                value: r.reprise,
                                                green: false,
                                                muted: true,
                                            },
                                        ].map(
                                            ({
                                                label,
                                                value,
                                                green,
                                                muted,
                                            }) => (
                                                <div
                                                    key={label}
                                                    style={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "space-between",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            fontSize: 13,
                                                            color: muted
                                                                ? "#9ca3af"
                                                                : "#6b7280",
                                                        }}
                                                    >
                                                        {label}
                                                    </span>
                                                    <span
                                                        style={{
                                                            fontSize: 13,
                                                            fontWeight: 600,
                                                            color: green
                                                                ? "#16a34a"
                                                                : muted
                                                                  ? "#9ca3af"
                                                                  : "#374151",
                                                        }}
                                                    >
                                                        {value}
                                                    </span>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>
                            ))}

                            {/* Avertissement */}
                            <div
                                style={{
                                    padding: "10px 12px",
                                    background: "#fef9c3",
                                    border: "1px solid #fde68a",
                                    borderRadius: 8,
                                    fontSize: 12,
                                    color: "#92400e",
                                    lineHeight: 1.5,
                                }}
                            >
                                ⚠️ Simulation indicative. Les tarifs exacts sont
                                confirmés lors de l'inscription en ligne.
                            </div>

                            {/* Actions */}
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 10,
                                }}
                            >
                                <a
                                    href="https://cloud6.kavalog.fr/SHEVA/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: "block",
                                        padding: "14px",
                                        borderRadius: 10,
                                        background: `linear-gradient(135deg, ${orange}, #f7931e)`,
                                        color: "white",
                                        fontWeight: 700,
                                        fontSize: 15,
                                        textAlign: "center" as const,
                                        textDecoration: "none",
                                    }}
                                >
                                    🚀 S'inscrire en ligne
                                </a>
                                <button
                                    onClick={resetSimulator}
                                    style={{
                                        padding: "12px",
                                        borderRadius: 10,
                                        border: `1.5px solid ${teal}`,
                                        background: "white",
                                        color: tealDark,
                                        fontWeight: 600,
                                        fontSize: 14,
                                        cursor: "pointer",
                                    }}
                                >
                                    ↩ Nouvelle simulation
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE PRINCIPALE
// ═══════════════════════════════════════════════════════════════════════════════

export default function PlanningClient() {
    const [simOpen, setSimOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<"forfaits" | "activites">(
        "forfaits",
    );

    useEffect(() => {
        document.body.style.overflow = simOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [simOpen]);

    return (
        <>
            <Nav />
            <main style={{ background: "#fafbfb", minHeight: "100vh" }}>
                {/* ── HERO ─────────────────────────────────────────────────── */}
                <section
                    style={{
                        background: `linear-gradient(135deg, ${teal} 0%, ${tealDark} 100%)`,
                        paddingTop: "calc(80px + 48px)",
                        paddingBottom: 56,
                        textAlign: "center",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            backgroundImage:
                                "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.06) 0%, transparent 60%)",
                        }}
                    />
                    <div
                        style={{
                            maxWidth: 640,
                            margin: "0 auto",
                            padding: "0 24px",
                            position: "relative",
                        }}
                    >
                        <p
                            style={{
                                fontSize: 11,
                                fontWeight: 700,
                                letterSpacing: "0.15em",
                                textTransform: "uppercase" as const,
                                color: "rgba(255,255,255,0.7)",
                                marginBottom: 12,
                            }}
                        >
                            SAISON {SAISON}
                        </p>
                        <h1
                            style={{
                                fontSize: "clamp(28px,5vw,42px)",
                                fontWeight: 900,
                                color: "white",
                                lineHeight: 1.15,
                                marginBottom: 14,
                            }}
                        >
                            Planning & Tarifs
                        </h1>
                        <p
                            style={{
                                fontSize: 16,
                                color: "rgba(255,255,255,0.85)",
                                lineHeight: 1.65,
                                marginBottom: 28,
                            }}
                        >
                            Retrouvez les horaires de toutes nos reprises et nos
                            tarifs adaptés à tous les niveaux.
                        </p>
                        <button
                            onClick={() => setSimOpen(true)}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                padding: "14px 28px",
                                borderRadius: 50,
                                border: "none",
                                background: "white",
                                color: tealDark,
                                fontWeight: 800,
                                fontSize: 15,
                                cursor: "pointer",
                                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                                transition: "transform 0.2s, box-shadow 0.2s",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(-2px)";
                                e.currentTarget.style.boxShadow =
                                    "0 8px 28px rgba(0,0,0,0.2)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(0)";
                                e.currentTarget.style.boxShadow =
                                    "0 4px 20px rgba(0,0,0,0.15)";
                            }}
                        >
                            🐎 Simuler mon inscription
                        </button>
                    </div>
                </section>

                {/* ── PLANNING ──────────────────────────────────────────────── */}
                <section id="planning" style={{ padding: "64px 0" }}>
                    <div
                        style={{
                            maxWidth: 1100,
                            margin: "0 auto",
                            padding: "0 24px",
                        }}
                    >
                        <SectionHeader
                            label="HORAIRES"
                            title="Planning des reprises"
                        />

                        <div
                            style={{
                                padding: "14px 20px",
                                background: "white",
                                border: "1px solid rgba(94,180,174,0.2)",
                                borderRadius: 12,
                                marginBottom: 28,
                                textAlign: "center",
                                fontSize: 14,
                                color: "#374151",
                            }}
                        >
                            <strong>Saison {SAISON} :</strong> Du {SAISON_DEBUT}{" "}
                            au {SAISON_FIN}
                            <span style={{ color: "#9ca3af", margin: "0 8px" }}>
                                ·
                            </span>
                            <em style={{ color: "#6b7280" }}>
                                Planning adapté pendant les vacances scolaires
                            </em>
                        </div>

                        <div
                            style={{
                                background: "white",
                                borderRadius: 16,
                                padding: "20px 8px",
                                border: "1px solid #f0f0f0",
                                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                                marginBottom: 32,
                            }}
                        >
                            <PlanningComponent />
                        </div>

                        {/* Calendrier vacances + forfaits */}
                        <div className="planning-cal-grid">
                            <div
                                style={{
                                    background: "white",
                                    borderRadius: 16,
                                    padding: "24px",
                                    border: "1px solid #f0f0f0",
                                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                        marginBottom: 20,
                                    }}
                                >
                                    <span style={{ fontSize: 20 }}>📅</span>
                                    <h3
                                        style={{
                                            fontSize: 16,
                                            fontWeight: 700,
                                            color: "rgb(15,23,42)",
                                            margin: 0,
                                        }}
                                    >
                                        Calendrier des vacances - 2025-2026
                                    </h3>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    {VACANCES.map((v, i) => (
                                        <div
                                            key={i}
                                            style={{
                                                padding: "12px 0",
                                                borderBottom:
                                                    i < VACANCES.length - 1
                                                        ? "1px solid #f3f4f6"
                                                        : "none",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 8,
                                                    flexWrap: "wrap" as const,
                                                    marginBottom: 4,
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        fontSize: 13,
                                                        fontWeight: 600,
                                                        color: "rgb(15,23,42)",
                                                    }}
                                                >
                                                    {v.nom}
                                                </span>
                                                {v.detail && (
                                                    <span
                                                        style={{
                                                            fontSize: 11,
                                                            fontWeight: 600,
                                                            padding: "2px 8px",
                                                            borderRadius: 20,
                                                            background:
                                                                v.type ===
                                                                "vacances"
                                                                    ? "#fef3c7"
                                                                    : v.type ===
                                                                        "fin"
                                                                      ? "#fee2e2"
                                                                      : "rgba(94,180,174,0.1)",
                                                            color:
                                                                v.type ===
                                                                "vacances"
                                                                    ? "#92400e"
                                                                    : v.type ===
                                                                        "fin"
                                                                      ? "#991b1b"
                                                                      : tealDark,
                                                        }}
                                                    >
                                                        {v.detail}
                                                    </span>
                                                )}
                                            </div>
                                            <div
                                                style={{
                                                    fontSize: 12,
                                                    color: "#9ca3af",
                                                }}
                                            >
                                                {v.dates}
                                            </div>

                                            {v.pdf && (
                                                <a
                                                    href={v.pdf}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{
                                                        fontSize: 12,
                                                        color: orange,
                                                        fontWeight: 600,
                                                        textDecoration: "none",
                                                        display: "inline-block",
                                                        marginTop: 4,
                                                    }}
                                                >
                                                    📋 Consulter le planning →
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div
                                style={{
                                    background: "white",
                                    borderRadius: 16,
                                    padding: "24px",
                                    border: "1px solid #f0f0f0",
                                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                        marginBottom: 20,
                                    }}
                                >
                                    <span style={{ fontSize: 20 }}>💰</span>
                                    <h3
                                        style={{
                                            fontSize: 16,
                                            fontWeight: 700,
                                            color: "rgb(15,23,42)",
                                            margin: 0,
                                        }}
                                    >
                                        Calendrier des forfaits
                                    </h3>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 12,
                                    }}
                                >
                                    {FORFAITS_CAL.map((f, i) => (
                                        <div
                                            key={i}
                                            style={{
                                                padding: "14px",
                                                background: "#f8fafc",
                                                borderRadius: 10,
                                                border: "1px solid #f0f0f0",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 8,
                                                    flexWrap: "wrap" as const,
                                                    marginBottom: 6,
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        fontSize: 13,
                                                        fontWeight: 700,
                                                        color: "rgb(15,23,42)",
                                                    }}
                                                >
                                                    {f.nom}
                                                </span>
                                                {f.badges.map((b) => (
                                                    <span
                                                        key={b}
                                                        style={{
                                                            fontSize: 11,
                                                            fontWeight: 700,
                                                            padding: "2px 8px",
                                                            borderRadius: 20,
                                                            background:
                                                                "rgba(94,180,174,0.1)",
                                                            color: tealDark,
                                                        }}
                                                    >
                                                        {b}
                                                    </span>
                                                ))}
                                            </div>
                                            <div
                                                style={{
                                                    fontSize: 12,
                                                    color: "#6b7280",
                                                }}
                                            >
                                                {f.dates}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div
                                    style={{
                                        marginTop: 16,
                                        padding: "12px 14px",
                                        background: "#f0fdf4",
                                        border: "1px solid #bbf7d0",
                                        borderRadius: 10,
                                        fontSize: 12,
                                        color: "#15803d",
                                        lineHeight: 1.6,
                                    }}
                                >
                                    <strong>Points importants :</strong>
                                    <br />
                                    Planning spécial pendant les vacances
                                    scolaires (hors Toussaint).
                                    <br />
                                    Inscriptions aux reprises de vacances sur
                                    votre espace personnel.
                                    <br />
                                    Les bons vacances ne s'utilisent pas hors
                                    vacances.
                                </div>
                            </div>
                        </div>

                        {/* Notes importantes */}
                        <div
                            style={{
                                marginTop: 28,
                                background: "white",
                                borderRadius: 16,
                                padding: "24px",
                                border: "1px solid #f0f0f0",
                                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                            }}
                        >
                            <h3
                                style={{
                                    fontSize: 16,
                                    fontWeight: 700,
                                    color: "rgb(15,23,42)",
                                    marginBottom: 16,
                                }}
                            >
                                📝 Informations importantes
                            </h3>
                            <div className="planning-notes-grid">
                                {[
                                    {
                                        icon: "📱",
                                        title: "Inscriptions en ligne",
                                        text: "Inscriptions et désinscriptions depuis votre espace personnel. L'annulation est obligatoire en cas d'imprévu.",
                                    },
                                    {
                                        icon: "⏰",
                                        title: "Délai d'annulation",
                                        text: "Annulation possible jusqu'à 24h avant la reprise. Au-delà, aucun bon n'est généré (prévenez-nous quand même).",
                                    },
                                    {
                                        icon: "🔄",
                                        title: "Bons de récupération",
                                        text: "Une annulation à temps génère un bon de récupération. Maximum 6 bons par an. Inscriptions en ligne.",
                                    },
                                    {
                                        icon: "🎯",
                                        title: "Bons vacances",
                                        text: "Les bons dédiés aux vacances sont uniquement utilisables pendant les vacances scolaires.",
                                    },
                                ].map(({ icon, title, text }) => (
                                    <div
                                        key={title}
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
                                            <div
                                                style={{
                                                    fontSize: 13,
                                                    fontWeight: 700,
                                                    color: "rgb(15,23,42)",
                                                    marginBottom: 4,
                                                }}
                                            >
                                                {title}
                                            </div>
                                            <div
                                                style={{
                                                    fontSize: 13,
                                                    color: "#6b7280",
                                                    lineHeight: 1.55,
                                                }}
                                            >
                                                {text}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── TARIFS ────────────────────────────────────────────────── */}
                <section
                    id="tarifs"
                    style={{ padding: "64px 0", background: "white" }}
                >
                    <div
                        style={{
                            maxWidth: 1100,
                            margin: "0 auto",
                            padding: "0 24px",
                        }}
                    >
                        <SectionHeader label="TARIFS" title="Nos Tarifs" />
                        <p
                            style={{
                                textAlign: "center",
                                fontSize: 14,
                                color: "#6b7280",
                                marginBottom: 0,
                                marginTop: -20,
                            }}
                        >
                            Tarifs valables pour la saison {SAISON}. Consultez
                            nos{" "}
                            <a
                                href="/PDF_docs/Conditions Generales de Vente.pdf"
                                style={{
                                    color: teal,
                                    fontWeight: 600,
                                    textDecoration: "none",
                                }}
                            >
                                CGV
                            </a>{" "}
                            pour les conditions de remboursement.
                        </p>

                        {/* Onglets */}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                gap: 8,
                                margin: "24px 0",
                            }}
                        >
                            {[
                                {
                                    id: "forfaits" as const,
                                    label: "🎫 Forfaits annuels",
                                },
                                {
                                    id: "activites" as const,
                                    label: "🎯 Tarifs activités",
                                },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    style={{
                                        padding: "10px 20px",
                                        borderRadius: 10,
                                        border:
                                            activeTab === tab.id
                                                ? `2px solid ${teal}`
                                                : "2px solid #e5e7eb",
                                        background:
                                            activeTab === tab.id
                                                ? teal
                                                : "white",
                                        color:
                                            activeTab === tab.id
                                                ? "white"
                                                : "#374151",
                                        fontWeight: 700,
                                        fontSize: 14,
                                        cursor: "pointer",
                                        transition: "all 0.15s",
                                    }}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Forfaits annuels */}
                        {activeTab === "forfaits" && (
                            <div>
                                {/* Tableau compact forfaits */}
                                <div
                                    style={{
                                        overflowX: "auto",
                                        borderRadius: 12,
                                        border: "1px solid #e5e7eb",
                                        marginBottom: 20,
                                    }}
                                >
                                    <table
                                        style={{
                                            width: "100%",
                                            borderCollapse: "collapse",
                                            minWidth: 380,
                                        }}
                                    >
                                        <thead>
                                            <tr
                                                style={{
                                                    background:
                                                        "rgba(94,180,174,0.08)",
                                                }}
                                            >
                                                <th
                                                    style={{
                                                        padding: "11px 16px",
                                                        textAlign:
                                                            "left" as const,
                                                        fontSize: 12,
                                                        fontWeight: 700,
                                                        color: tealDark,
                                                        borderBottom:
                                                            "2px solid rgba(94,180,174,0.2)",
                                                    }}
                                                >
                                                    Forfait annuel
                                                </th>
                                                <th
                                                    style={{
                                                        padding: "11px 16px",
                                                        textAlign:
                                                            "center" as const,
                                                        fontSize: 12,
                                                        fontWeight: 700,
                                                        color: tealDark,
                                                        borderBottom:
                                                            "2px solid rgba(94,180,174,0.2)",
                                                        whiteSpace:
                                                            "nowrap" as const,
                                                    }}
                                                >
                                                    Type
                                                </th>
                                                <th
                                                    style={{
                                                        padding: "11px 16px",
                                                        textAlign:
                                                            "right" as const,
                                                        fontSize: 12,
                                                        fontWeight: 700,
                                                        color: tealDark,
                                                        borderBottom:
                                                            "2px solid rgba(94,180,174,0.2)",
                                                        whiteSpace:
                                                            "nowrap" as const,
                                                    }}
                                                >
                                                    Prix
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {TARIFS_FORFAITS.map((cat, ci) => (
                                                <React.Fragment
                                                    key={`fcat-${ci}`}
                                                >
                                                    <tr>
                                                        <td
                                                            colSpan={3}
                                                            style={{
                                                                padding:
                                                                    "8px 16px 5px",
                                                                fontSize: 11,
                                                                fontWeight: 700,
                                                                textTransform:
                                                                    "uppercase" as const,
                                                                letterSpacing:
                                                                    "0.08em",
                                                                color: teal,
                                                                background:
                                                                    "#fafbfb",
                                                                borderTop:
                                                                    ci > 0
                                                                        ? "2px solid #f0f0f0"
                                                                        : "none",
                                                            }}
                                                        >
                                                            {cat.icon}{" "}
                                                            {cat.categorie}
                                                        </td>
                                                    </tr>
                                                    {cat.items.map(
                                                        (item, ii) => (
                                                            <tr
                                                                key={`fitem-${ci}-${ii}`}
                                                                style={{
                                                                    background:
                                                                        ii %
                                                                            2 ===
                                                                        0
                                                                            ? "white"
                                                                            : "#fafbfb",
                                                                }}
                                                            >
                                                                <td
                                                                    style={{
                                                                        padding:
                                                                            "10px 16px",
                                                                        fontSize: 13,
                                                                        color: "#374151",
                                                                        borderBottom:
                                                                            "1px solid #f3f4f6",
                                                                    }}
                                                                >
                                                                    <div
                                                                        style={{
                                                                            fontWeight: 600,
                                                                        }}
                                                                    >
                                                                        {
                                                                            item.nom
                                                                        }
                                                                    </div>
                                                                    <div
                                                                        style={{
                                                                            fontSize: 11,
                                                                            color: "#9ca3af",
                                                                            marginTop: 2,
                                                                        }}
                                                                    >
                                                                        {
                                                                            item.desc
                                                                        }
                                                                    </div>
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        padding:
                                                                            "10px 16px",
                                                                        textAlign:
                                                                            "center" as const,
                                                                        borderBottom:
                                                                            "1px solid #f3f4f6",
                                                                    }}
                                                                >
                                                                    <span
                                                                        style={{
                                                                            fontSize: 11,
                                                                            fontWeight: 700,
                                                                            padding:
                                                                                "3px 8px",
                                                                            borderRadius: 20,
                                                                            background:
                                                                                item.badge ===
                                                                                "Poney"
                                                                                    ? "#f0fdf4"
                                                                                    : item.badge ===
                                                                                        "Cheval"
                                                                                      ? "#eff6ff"
                                                                                      : "#fff7ed",
                                                                            color:
                                                                                item.badge ===
                                                                                "Poney"
                                                                                    ? "#15803d"
                                                                                    : item.badge ===
                                                                                        "Cheval"
                                                                                      ? "#1d4ed8"
                                                                                      : "#c2410c",
                                                                        }}
                                                                    >
                                                                        {
                                                                            item.badge
                                                                        }
                                                                    </span>
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        padding:
                                                                            "10px 16px",
                                                                        textAlign:
                                                                            "right" as const,
                                                                        fontSize: 16,
                                                                        fontWeight: 800,
                                                                        color: tealDark,
                                                                        borderBottom:
                                                                            "1px solid #f3f4f6",
                                                                        whiteSpace:
                                                                            "nowrap" as const,
                                                                    }}
                                                                >
                                                                    {item.prix}{" "}
                                                                    €
                                                                </td>
                                                            </tr>
                                                        ),
                                                    )}
                                                </React.Fragment>
                                            ))}
                                            {/* Séparateur cotisation */}
                                            <tr>
                                                <td
                                                    colSpan={3}
                                                    style={{
                                                        padding: "8px 16px 5px",
                                                        fontSize: 11,
                                                        fontWeight: 700,
                                                        textTransform:
                                                            "uppercase" as const,
                                                        letterSpacing: "0.08em",
                                                        color: teal,
                                                        background: "#fafbfb",
                                                        borderTop:
                                                            "2px solid #f0f0f0",
                                                    }}
                                                >
                                                    ➕ Cotisation & Licence (à
                                                    ajouter)
                                                </td>
                                            </tr>
                                            {[
                                                {
                                                    label: "Cotisation adhérent -16 ans",
                                                    val: COTISATIONS.under16,
                                                },
                                                {
                                                    label: "Cotisation adhérent +16 ans",
                                                    val: COTISATIONS.over16,
                                                },
                                                {
                                                    label: "Licence FFE -18 ans",
                                                    val: COTISATIONS.licenceUnder18,
                                                },
                                                {
                                                    label: "Licence FFE +18 ans",
                                                    val: COTISATIONS.licenceOver18,
                                                },
                                            ].map((row, ii) => (
                                                <tr
                                                    key={`cotis-${ii}`}
                                                    style={{
                                                        background:
                                                            ii % 2 === 0
                                                                ? "white"
                                                                : "#fafbfb",
                                                    }}
                                                >
                                                    <td
                                                        style={{
                                                            padding: "9px 16px",
                                                            fontSize: 13,
                                                            color: "#374151",
                                                            borderBottom:
                                                                "1px solid #f3f4f6",
                                                        }}
                                                    >
                                                        {row.label}
                                                    </td>
                                                    <td
                                                        style={{
                                                            padding: "9px 16px",
                                                            borderBottom:
                                                                "1px solid #f3f4f6",
                                                        }}
                                                    />
                                                    <td
                                                        style={{
                                                            padding: "9px 16px",
                                                            textAlign:
                                                                "right" as const,
                                                            fontSize: 15,
                                                            fontWeight: 800,
                                                            color: tealDark,
                                                            borderBottom:
                                                                "1px solid #f3f4f6",
                                                            whiteSpace:
                                                                "nowrap" as const,
                                                        }}
                                                    >
                                                        {row.val} €
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Infos compactes */}
                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr",
                                        gap: 12,
                                        marginBottom: 20,
                                    }}
                                >
                                    <div
                                        style={{
                                            padding: "14px 16px",
                                            background: "#f0fdf4",
                                            border: "1px solid #bbf7d0",
                                            borderRadius: 10,
                                            fontSize: 13,
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontWeight: 700,
                                                color: "#15803d",
                                                marginBottom: 6,
                                            }}
                                        >
                                            👨‍👩‍👧‍👦 Réductions familiales
                                        </div>
                                        <p
                                            style={{
                                                margin: 0,
                                                color: "#374151",
                                                lineHeight: 1.55,
                                                fontSize: 12,
                                            }}
                                        >
                                            3ème membre : <strong>−50%</strong>{" "}
                                            sur la cotisation
                                            <br />
                                            4ème membre et + :{" "}
                                            <strong>−75%</strong> sur la
                                            cotisation
                                        </p>
                                    </div>
                                    <div
                                        style={{
                                            padding: "14px 16px",
                                            background: "#eff6ff",
                                            border: "1px solid #bfdbfe",
                                            borderRadius: 10,
                                            fontSize: 13,
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontWeight: 700,
                                                color: "#1d4ed8",
                                                marginBottom: 6,
                                            }}
                                        >
                                            🎟️ Paiement
                                        </div>
                                        <p
                                            style={{
                                                margin: 0,
                                                color: "#374151",
                                                lineHeight: 1.55,
                                                fontSize: 12,
                                            }}
                                        >
                                            En ligne 1× ou 4× sans frais (min.
                                            500 €)
                                            <br />
                                            Ou acompte CB + 1/2 chèques avant la
                                            1ère séance
                                        </p>
                                    </div>
                                </div>

                                <div style={{ textAlign: "center" }}>
                                    <a
                                        href="/PDF_docs/Conditions Generales de Vente.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: "inline-block",
                                            padding: "11px 22px",
                                            borderRadius: 10,
                                            border: `2px solid ${teal}`,
                                            color: tealDark,
                                            fontWeight: 700,
                                            fontSize: 13,
                                            textDecoration: "none",
                                        }}
                                    >
                                        📄 Consulter les CGV
                                    </a>
                                </div>
                            </div>
                        )}

                        {/* Tarifs activités */}
                        {activeTab === "activites" && (
                            <div>
                                <p
                                    style={{
                                        textAlign: "center",
                                        fontSize: 13,
                                        color: "#6b7280",
                                        marginBottom: 28,
                                    }}
                                >
                                    Tarifs des activités ponctuelles, stages et
                                    animations. Mis à jour 08/2024.
                                    <br />* Tarifs hors engagement et frais
                                    kilométriques pour les concours.
                                </p>
                                <div style={{ overflowX: "auto" }}>
                                    <table
                                        style={{
                                            width: "100%",
                                            borderCollapse: "collapse" as const,
                                            minWidth: 420,
                                        }}
                                    >
                                        <thead>
                                            <tr
                                                style={{
                                                    background:
                                                        "rgba(94,180,174,0.08)",
                                                }}
                                            >
                                                <th
                                                    style={{
                                                        padding: "12px 16px",
                                                        textAlign:
                                                            "left" as const,
                                                        fontSize: 13,
                                                        fontWeight: 700,
                                                        color: tealDark,
                                                        borderBottom:
                                                            "2px solid rgba(94,180,174,0.2)",
                                                    }}
                                                >
                                                    Prestation
                                                </th>
                                                <th
                                                    style={{
                                                        padding: "12px 16px",
                                                        textAlign:
                                                            "center" as const,
                                                        fontSize: 13,
                                                        fontWeight: 700,
                                                        color: "#1d4ed8",
                                                        borderBottom:
                                                            "2px solid rgba(94,180,174,0.2)",
                                                        whiteSpace:
                                                            "nowrap" as const,
                                                    }}
                                                >
                                                    🐎 Cheval
                                                </th>
                                                <th
                                                    style={{
                                                        padding: "12px 16px",
                                                        textAlign:
                                                            "center" as const,
                                                        fontSize: 13,
                                                        fontWeight: 700,
                                                        color: "#15803d",
                                                        borderBottom:
                                                            "2px solid rgba(94,180,174,0.2)",
                                                        whiteSpace:
                                                            "nowrap" as const,
                                                    }}
                                                >
                                                    🐴 Poney
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {TARIFS_ACTIVITES.map((cat, ci) => (
                                                <React.Fragment
                                                    key={`cat-${ci}`}
                                                >
                                                    <tr>
                                                        <td
                                                            colSpan={3}
                                                            style={{
                                                                padding:
                                                                    "10px 16px 6px",
                                                                fontSize: 11,
                                                                fontWeight: 700,
                                                                textTransform:
                                                                    "uppercase" as const,
                                                                letterSpacing:
                                                                    "0.1em",
                                                                color: teal,
                                                                background:
                                                                    "#fafbfb",
                                                                borderTop:
                                                                    ci > 0
                                                                        ? "1px solid #f0f0f0"
                                                                        : "none",
                                                            }}
                                                        >
                                                            {cat.categorie}
                                                        </td>
                                                    </tr>
                                                    {cat.items.map(
                                                        (item, ii) => (
                                                            <tr
                                                                key={`item-${ci}-${ii}`}
                                                                style={{
                                                                    background:
                                                                        ii %
                                                                            2 ===
                                                                        0
                                                                            ? "white"
                                                                            : "#fafbfb",
                                                                }}
                                                            >
                                                                <td
                                                                    style={{
                                                                        padding:
                                                                            "10px 16px",
                                                                        fontSize: 13,
                                                                        color: "#374151",
                                                                        borderBottom:
                                                                            "1px solid #f3f4f6",
                                                                    }}
                                                                >
                                                                    {item.nom}
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        padding:
                                                                            "10px 16px",
                                                                        textAlign:
                                                                            "center" as const,
                                                                        fontSize: 14,
                                                                        fontWeight: 700,
                                                                        color: "#1d4ed8",
                                                                        borderBottom:
                                                                            "1px solid #f3f4f6",
                                                                    }}
                                                                >
                                                                    {
                                                                        item.cheval
                                                                    }
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        padding:
                                                                            "10px 16px",
                                                                        textAlign:
                                                                            "center" as const,
                                                                        fontSize: 14,
                                                                        fontWeight: 700,
                                                                        color: "#15803d",
                                                                        borderBottom:
                                                                            "1px solid #f3f4f6",
                                                                    }}
                                                                >
                                                                    {item.poney}
                                                                </td>
                                                            </tr>
                                                        ),
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div
                                    style={{
                                        textAlign: "center",
                                        marginTop: 24,
                                    }}
                                >
                                    <Link
                                        href="/activites"
                                        style={{
                                            display: "inline-block",
                                            padding: "12px 24px",
                                            borderRadius: 10,
                                            background: `linear-gradient(135deg, ${teal}, ${tealDark})`,
                                            color: "white",
                                            fontWeight: 700,
                                            fontSize: 14,
                                            textDecoration: "none",
                                        }}
                                    >
                                        Voir toutes les activités →
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* ── ANNULATION & ASSURANCE ────────────────────────────────── */}
                <section id="annulation" style={{ padding: "64px 0" }}>
                    <div
                        style={{
                            maxWidth: 1100,
                            margin: "0 auto",
                            padding: "0 24px",
                        }}
                    >
                        <SectionHeader
                            label="INFOS PRATIQUES"
                            title="Annulation & Assurance"
                        />
                        <div className="annulation-grid">
                            <div
                                style={{
                                    background: "white",
                                    borderRadius: 16,
                                    padding: "28px",
                                    border: "1px solid #f0f0f0",
                                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                        marginBottom: 20,
                                    }}
                                >
                                    <span style={{ fontSize: 20 }}>✅</span>
                                    <h3
                                        style={{
                                            fontSize: 16,
                                            fontWeight: 700,
                                            color: "rgb(15,23,42)",
                                            margin: 0,
                                        }}
                                    >
                                        Engagements & Règles SHEVA
                                    </h3>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 10,
                                    }}
                                >
                                    {[
                                        "Consultez les CGV pour les conditions de vente complètes.",
                                        "Aucun remboursement des forfaits, cotisation et licence, quelle que soit la raison d'interruption.",
                                        "Aucun remboursement en cas d'abandon en cours d'année.",
                                        "Conseil : forfait semestriel recommandé pour les jeunes cavaliers débutants.",
                                        "Le choix du niveau sans validation SHEVA est sous la responsabilité de l'adhérent.",
                                        "Activités ponctuelles : pas de remboursement si annulation < 48h. Si ≥ 48h : remboursement ou avoir avec frais.",
                                    ].map((txt, i) => (
                                        <div
                                            key={i}
                                            style={{
                                                display: "flex",
                                                gap: 10,
                                                alignItems: "flex-start",
                                            }}
                                        >
                                            <span
                                                style={{
                                                    color: teal,
                                                    fontWeight: 700,
                                                    flexShrink: 0,
                                                    marginTop: 1,
                                                }}
                                            >
                                                ›
                                            </span>
                                            <p
                                                style={{
                                                    fontSize: 13,
                                                    color: "#4b5563",
                                                    lineHeight: 1.6,
                                                    margin: 0,
                                                }}
                                            >
                                                {txt}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ marginTop: 20 }}>
                                    <a
                                        href="/PDF_docs/Conditions Generales de Vente.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: "inline-block",
                                            padding: "10px 18px",
                                            borderRadius: 8,
                                            border: `1.5px solid ${teal}`,
                                            color: tealDark,
                                            fontWeight: 700,
                                            fontSize: 13,
                                            textDecoration: "none",
                                        }}
                                    >
                                        📄 CGV
                                    </a>
                                </div>
                            </div>

                            <div
                                style={{
                                    background: "white",
                                    borderRadius: 16,
                                    padding: "28px",
                                    border: "1px solid #f0f0f0",
                                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                        marginBottom: 20,
                                    }}
                                >
                                    <span style={{ fontSize: 20 }}>🛡️</span>
                                    <h3
                                        style={{
                                            fontSize: 16,
                                            fontWeight: 700,
                                            color: "rgb(15,23,42)",
                                            margin: 0,
                                        }}
                                    >
                                        Assurance annulation (facultative)
                                    </h3>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 10,
                                    }}
                                >
                                    {[
                                        "Proposée par un organisme partenaire de la SHEVA.",
                                        "Couvre l'incapacité temporaire ou définitive de pratiquer (accident, maladie, grossesse…).",
                                        "Doit être souscrite dans les 30 jours suivant l'inscription à la SHEVA.",
                                        "Documents mis à jour régulièrement — vérifier la dernière version avant souscription.",
                                    ].map((txt, i) => (
                                        <div
                                            key={i}
                                            style={{
                                                display: "flex",
                                                gap: 10,
                                                alignItems: "flex-start",
                                            }}
                                        >
                                            <span
                                                style={{
                                                    color: teal,
                                                    fontWeight: 700,
                                                    flexShrink: 0,
                                                    marginTop: 1,
                                                }}
                                            >
                                                ›
                                            </span>
                                            <p
                                                style={{
                                                    fontSize: 13,
                                                    color: "#4b5563",
                                                    lineHeight: 1.6,
                                                    margin: 0,
                                                }}
                                            >
                                                {txt}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <div
                                    style={{
                                        marginTop: 20,
                                        display: "flex",
                                        gap: 10,
                                        flexWrap: "wrap" as const,
                                    }}
                                >
                                    {[
                                        {
                                            href: "/PDF_docs/Notice_assu.pdf",
                                            label: "📋 Notice assurance",
                                        },
                                        {
                                            href: "/PDF_docs/assu_infocontractuelles.pdf",
                                            label: "📄 Fiche contractuelle",
                                        },
                                    ].map(({ href, label }) => (
                                        <a
                                            key={href}
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                display: "inline-block",
                                                padding: "10px 18px",
                                                borderRadius: 8,
                                                border: `1.5px solid ${teal}`,
                                                color: tealDark,
                                                fontWeight: 700,
                                                fontSize: 13,
                                                textDecoration: "none",
                                            }}
                                        >
                                            {label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── CTA FINAL ────────────────────────────────────────────── */}
                <section
                    style={{
                        padding: "56px 24px",
                        background: `linear-gradient(135deg, ${teal}, ${tealDark})`,
                        textAlign: "center",
                    }}
                >
                    <div style={{ maxWidth: 560, margin: "0 auto" }}>
                        <h2
                            style={{
                                fontSize: 26,
                                fontWeight: 800,
                                color: "white",
                                marginBottom: 12,
                            }}
                        >
                            Prêt à nous rejoindre ?
                        </h2>
                        <p
                            style={{
                                fontSize: 15,
                                color: "rgba(255,255,255,0.85)",
                                lineHeight: 1.65,
                                marginBottom: 28,
                            }}
                        >
                            Consultez notre{" "}
                            <Link
                                href="/infos#faq"
                                style={{ color: "white", fontWeight: 700 }}
                            >
                                FAQ
                            </Link>{" "}
                            pour toutes vos questions sur les inscriptions.
                        </p>
                        <div
                            style={{
                                display: "flex",
                                gap: 12,
                                justifyContent: "center",
                                flexWrap: "wrap" as const,
                            }}
                        >
                            <Link
                                href="/infos#contact"
                                style={{
                                    padding: "13px 24px",
                                    borderRadius: 10,
                                    background: "white",
                                    color: tealDark,
                                    fontWeight: 700,
                                    fontSize: 14,
                                    textDecoration: "none",
                                }}
                            >
                                Nous contacter
                            </Link>
                            <button
                                onClick={() => setSimOpen(true)}
                                style={{
                                    padding: "13px 24px",
                                    borderRadius: 10,
                                    border: "2px solid rgba(255,255,255,0.6)",
                                    background: "transparent",
                                    color: "white",
                                    fontWeight: 700,
                                    fontSize: 14,
                                    cursor: "pointer",
                                }}
                            >
                                🐎 Simuler mon tarif
                            </button>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />

            {/* Simulateur drawer */}
            <Simulateur isOpen={simOpen} onClose={() => setSimOpen(false)} />
        </>
    );
}
