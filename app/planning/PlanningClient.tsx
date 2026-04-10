"use client";

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { assetPath } from "@/lib/assetPath";
import React from "react";
import { Noto_Sans_Old_Italic } from "next/font/google";
import { TrouverReprise } from "@/components/TrouverReprise";
import { Simulateur } from "@/components/Simulateur";
import {
    PLANNING_HEBDO,
    REPRISES_BY_LEVEL,
    FORFAITS_PRICING,
    COTISATIONS,
    PONEY_LEVELS,
    CHEVAL_LEVELS,
    type Creneau,
    type JourPlanning,
    type CreneauType,
} from "@/lib/planning-data";

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
    { nom: "Reprise des cours", dates: "Le 24 août 2026", type: "normal" },
    {
        nom: "Vacances de Toussaint",
        detail: "reprises normales",
        dates: "Du 19 octobre au 1 novembre 2026",
        type: "normal",
    },
    {
        nom: "Vacances de Noël",
        detail: "reprises de vacances",
        dates: "Du 21 décembre 2026 au 3 janvier 2027",
        type: "vacances",
    },
    {
        nom: "Vacances d'hiver",
        detail: "reprises de vacances",
        dates: "Du 8 février au 21 février 2027",
        type: "vacances",
        // pdf: "/PDF_docs/Reprises Vacances Hiver 2026.pdf")},
    },
    {
        nom: "Vacances de printemps",
        detail: "reprises de vacances",
        dates: "Du 5 avril au 18 avril 2027",
        type: "vacances",
    },
    {
        nom: "Vacances d'été",
        detail: "fin des reprises",
        dates: "À partir du 4 juillet",
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
// Données centralisées dans lib/planning-data.ts — modifiez-les là-bas.

// ─── TARIFS ────────────────────────────────────────────────────────────────────
// Pour chaque forfait :
//   annuel  : prix annuel + nb de séances incluses (hors vacances)
//   s1      : forfait 1er semestre (sep → jan) — plus long
//   s2      : forfait 2nd semestre (jan → juin)
// Les séances vacances (ex: +6 annuel, +4 S1, +2 S2) sont en supplément.
// Mettez null pour les prix encore à définir.
const TARIFS_FORFAITS: {
    categorie: string;
    icon: string;
    items: {
        nom: string;
        desc: string;
        badge: string;
        note?: string;
        annuel: { prix: number | null; seances: string };
        s1: { prix: number | null; seances: string };
        s2: { prix: number | null; seances: string };
    }[];
}[] = [
    {
        categorie: "Poney",
        icon: "🐴",
        items: [
            {
                nom: "Baby (4-6 ans)",
                desc: "Éveil équestre, séances de 30 min",
                badge: "Poney",
                note: "Pas de cours pendant les vacances",
                annuel: { prix: 537, seances: "39 séances" },
                s1: { prix: null, seances: "" },
                s2: { prix: null, seances: "" },
            },
            {
                nom: "Poney Débutant",
                desc: "Apprentissage des bases à poney",
                badge: "Poney",
                note: "Pas de cours pendant les vacances",
                annuel: { prix: 671, seances: "39 séances" },
                s1: { prix: 396, seances: "20 séances" },
                s2: { prix: 376, seances: "19 séances" },
            },
            {
                nom: "Poney (Bronze/Argent/Or)",
                desc: "Perfectionnement niveau poney",
                badge: "Poney",
                annuel: { prix: 895, seances: "39 + 6 vacances" },
                s1: { prix: 503, seances: "20 + 2 vacances" },
                s2: { prix: 526, seances: "19 + 4 vacances" },
            },
        ],
    },
    {
        categorie: "Cheval",
        icon: "🐎",
        items: [
            {
                nom: "Cheval -16 ans",
                desc: "Équitation cheval pour les jeunes",
                badge: "Cheval",
                annuel: { prix: 1042, seances: "39 + 6 vacances" },
                s1: { prix: 586, seances: "20 + 2 vacances" },
                s2: { prix: 612, seances: "19 + 4 vacances" },
            },
            {
                nom: "Cheval +16 ans",
                desc: "Équitation cheval pour les adultes",
                badge: "Cheval",
                annuel: { prix: 1108, seances: "39 + 6 vacances" },
                s1: { prix: 623, seances: "20 + 2 vacances" },
                s2: { prix: 651, seances: "19 + 4 vacances" },
            },
            {
                nom: "Perfectionnement 1h30",
                desc: "Cours 1h30 pour G6-G7",
                badge: "Perf.",
                annuel: { prix: 1241, seances: "39 + 6 vacances" },
                s1: { prix: null, seances: "" },
                s2: { prix: null, seances: "" },
            },
        ],
    },
];

// COTISATIONS importées depuis lib/planning-data.ts

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

// REPRISES_BY_LEVEL, FORFAITS_PRICING importés depuis lib/planning-data.ts

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

// PONEY_LEVELS, CHEVAL_LEVELS importés depuis lib/planning-data.ts

function PlanningComponent({ highlightLevel }: { highlightLevel?: string }) {
    const [filterType, setFilterType] = useState<"tous" | "poney" | "cheval">(
        highlightLevel
            ? PONEY_LEVELS.some((l) => l.val === highlightLevel)
                ? "poney"
                : "cheval"
            : "tous",
    );
    const [filterLevel, setFilterLevel] = useState<string | null>(
        highlightLevel ?? null,
    );

    const handleMountFilter = (val: "tous" | "poney" | "cheval") => {
        setFilterType(val);
        setFilterLevel(null);
    };

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
            // If a level is selected, filter to only créneaux that include this simLevel.
            // galop6 → inclut aussi perf_g6 ; galop7 → inclut aussi perf_g7
            const effectiveLevels = filterLevel
                ? filterLevel === "galop6"
                    ? ["galop6", "perf_g6"]
                    : filterLevel === "galop7"
                      ? ["galop7", "perf_g7"]
                      : [filterLevel]
                : null;
            const matchesLevel = effectiveLevels
                ? (c.simLevels ?? []).some((l) => effectiveLevels.includes(l))
                : true;
            const matchesMount =
                filterType === "tous" ||
                (filterType === "poney" && isPoney(c)) ||
                (filterType === "cheval" && isCheval(c));
            const filtered = !matchesMount || !matchesLevel;
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

    const levelOptions =
        filterType === "poney"
            ? PONEY_LEVELS
            : filterType === "cheval"
              ? CHEVAL_LEVELS
              : [];

    return (
        <div>
            {/* Filtre — type de monture */}
            <div
                style={{
                    display: "flex",
                    gap: 8,
                    justifyContent: "center",
                    marginBottom: 10,
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
                        onClick={() => handleMountFilter(f.val)}
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

            {/* Filtre — niveau (apparaît si poney ou cheval sélectionné) */}
            {levelOptions.length > 0 && (
                <div
                    style={{
                        display: "flex",
                        gap: 6,
                        justifyContent: "center",
                        marginBottom: 16,
                        flexWrap: "wrap",
                    }}
                >
                    {levelOptions.map((l) => (
                        <button
                            key={l.val}
                            onClick={() =>
                                setFilterLevel((prev) =>
                                    prev === l.val ? null : l.val,
                                )
                            }
                            style={{
                                padding: "4px 12px",
                                borderRadius: 14,
                                border:
                                    filterLevel === l.val
                                        ? `2px solid ${orange}`
                                        : "2px solid #e5e7eb",
                                background:
                                    filterLevel === l.val
                                        ? "rgba(255,107,53,0.08)"
                                        : "white",
                                color:
                                    filterLevel === l.val
                                        ? orange
                                        : "#9ca3af",
                                fontWeight: 600,
                                fontSize: 12,
                                cursor: "pointer",
                                transition: "all 0.15s",
                            }}
                        >
                            {l.label}
                        </button>
                    ))}
                </div>
            )}

            {!levelOptions.length && <div style={{ marginBottom: 16 }} />}

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
                <i>Mis à jour le 10/04/2026</i> &nbsp;·&nbsp;{" "}
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
                {(["baby", "poney", "cheval", "perf"] as CreneauType[]).map(
                    (type) => {
                        const c = CRENEAU_COLORS[type];
                        const labels: Record<string, string> = {
                            baby: "Baby (30min)",
                            poney: "Poney",

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
                                <span
                                    style={{ color: c.text, fontWeight: 600 }}
                                >
                                    {labels[type]}
                                </span>
                            </div>
                        );
                    },
                )}
            </div>
        </div>
    );
}


// TrouverReprise et Simulateur importés depuis @/components/


// ═══════════════════════════════════════════════════════════════════════════════
// PAGE PRINCIPALE
// ═══════════════════════════════════════════════════════════════════════════════

export default function PlanningClient() {
    const [simOpen, setSimOpen] = useState(false);
    const [finderOpen, setFinderOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<"forfaits" | "activites">(
        "forfaits",
    );

    useEffect(() => {
        document.body.style.overflow = simOpen || finderOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [simOpen, finderOpen]);

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
                            <Link href="/" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>
                                Accueil
                            </Link>
                            <span>›</span>
                            <span style={{ color: "white", fontWeight: 600 }}>Planning & Tarifs</span>
                        </div>

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
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
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
                                    e.currentTarget.style.transform = "translateY(-2px)";
                                    e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.2)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)";
                                }}
                            >
                                🐎 Simuler mon inscription
                            </button>
                            <button
                                onClick={() => setFinderOpen(true)}
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 8,
                                    padding: "14px 28px",
                                    borderRadius: 50,
                                    border: "2px solid rgba(255,255,255,0.6)",
                                    background: "rgba(255,255,255,0.15)",
                                    color: "white",
                                    fontWeight: 800,
                                    fontSize: 15,
                                    cursor: "pointer",
                                    backdropFilter: "blur(8px)",
                                    transition: "transform 0.2s, background 0.2s",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-2px)";
                                    e.currentTarget.style.background = "rgba(255,255,255,0.25)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                                }}
                            >
                                🔍 Trouver ma reprise
                            </button>
                        </div>

                        {/* Quick nav */}
                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 10,
                                justifyContent: "center",
                                marginTop: 28,
                            }}
                        >
                            {[
                                { label: "Planning",  href: "#planning" },
                                { label: "Calendrier", href: "#calendrier" },
                                { label: "Tarifs",    href: "#tarifs" },
                                { label: "Annulation", href: "#annulation" },
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
                        <div id="calendrier" className="planning-cal-grid">
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
                                        Calendrier des vacances - Saison
                                        2026-2027
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

                                            {/*v.pdf && (
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
                                            )*/}
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
                                        Calendrier des forfaits - Saison
                                        2026-2027
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
                                    textAlign: "center",
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

                        {/* Bouton simulateur */}
                        <div style={{ textAlign: "center", marginTop: -24, marginBottom: 20 }}>
                            <button
                                onClick={() => setSimOpen(true)}
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 8,
                                    padding: "10px 22px",
                                    borderRadius: 50,
                                    border: "none",
                                    background: `linear-gradient(135deg, ${teal}, ${tealDark})`,
                                    color: "white",
                                    fontWeight: 700,
                                    fontSize: 14,
                                    cursor: "pointer",
                                    boxShadow: "0 4px 16px rgba(94,180,174,0.35)",
                                    transition: "transform 0.2s, box-shadow 0.2s",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-2px)";
                                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(94,180,174,0.45)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(94,180,174,0.35)";
                                }}
                            >
                                🧮 Simuler mon tarif
                            </button>
                        </div>

                        <p
                            style={{
                                textAlign: "center",
                                fontSize: 14,
                                color: "#6b7280",
                                marginBottom: 0,
                                marginTop: 0,
                            }}
                        >
                            Tarifs valables pour la saison {SAISON}. Consultez
                            nos{" "}
                            <a
                                href={assetPath("/PDF_docs/Conditions Generales de Vente.pdf")}
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
                                    label: "🎫 Forfaits",
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
                                <p
                                    style={{
                                        textAlign: "center",
                                        fontSize: 13,
                                        color: "#6b7280",
                                        marginBottom: 28,
                                    }}
                                >
                                    Tarifs des forfaits, cotisations et
                                    licences. Mis à jour 10/04/2026.
                                    <br />
                                </p>
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
                                            minWidth: 620,
                                        }}
                                    >
                                        {/* Ligne de groupes */}
                                        <colgroup>
                                            <col style={{ width: "32%" }} />
                                            <col style={{ width: "8%" }} />
                                            <col style={{ width: "20%" }} />
                                            <col style={{ width: "20%" }} />
                                            <col style={{ width: "20%" }} />
                                        </colgroup>
                                        <thead>
                                            {/* Ligne groupes */}
                                            <tr
                                                style={{
                                                    background:
                                                        "rgba(94,180,174,0.04)",
                                                }}
                                            >
                                                <th
                                                    colSpan={2}
                                                    style={{
                                                        borderBottom:
                                                            "1px solid rgba(94,180,174,0.15)",
                                                    }}
                                                />
                                                {[
                                                    {
                                                        label: "Annuel",
                                                        sub: "sep → juillet",
                                                    },
                                                    {
                                                        label: "1er Semestre",
                                                        sub: "sep → jan",
                                                    },
                                                    {
                                                        label: "2nd Semestre",
                                                        sub: "jan → juillet",
                                                    },
                                                ].map((g) => (
                                                    <th
                                                        key={g.label}
                                                        style={{
                                                            padding:
                                                                "8px 12px 4px",
                                                            textAlign:
                                                                "center" as const,
                                                            fontSize: 11,
                                                            fontWeight: 700,
                                                            color: tealDark,
                                                            borderBottom:
                                                                "1px solid rgba(94,180,174,0.15)",
                                                            borderLeft:
                                                                "1px solid rgba(94,180,174,0.15)",
                                                        }}
                                                    >
                                                        {g.label}
                                                        <div
                                                            style={{
                                                                fontSize: 10,
                                                                fontWeight: 400,
                                                                color: "#9ca3af",
                                                                marginTop: 1,
                                                            }}
                                                        >
                                                            {g.sub}
                                                        </div>
                                                    </th>
                                                ))}
                                            </tr>
                                            {/* Ligne colonnes */}
                                            <tr
                                                style={{
                                                    background:
                                                        "rgba(94,180,174,0.08)",
                                                }}
                                            >
                                                <th
                                                    style={{
                                                        padding: "9px 16px",
                                                        textAlign:
                                                            "left" as const,
                                                        fontSize: 12,
                                                        fontWeight: 700,
                                                        color: tealDark,
                                                        borderBottom:
                                                            "2px solid rgba(94,180,174,0.2)",
                                                    }}
                                                >
                                                    Forfait
                                                </th>
                                                <th
                                                    style={{
                                                        padding: "9px 10px",
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
                                                {[
                                                    "Séances / Prix",
                                                    "Séances / Prix",
                                                    "Séances / Prix",
                                                ].map((h, i) => (
                                                    <th
                                                        key={i}
                                                        style={{
                                                            padding: "9px 12px",
                                                            textAlign:
                                                                "center" as const,
                                                            fontSize: 11,
                                                            fontWeight: 600,
                                                            color: "#6b7280",
                                                            borderBottom:
                                                                "2px solid rgba(94,180,174,0.2)",
                                                            borderLeft:
                                                                "1px solid rgba(94,180,174,0.12)",
                                                            whiteSpace:
                                                                "nowrap" as const,
                                                        }}
                                                    >
                                                        {h}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {TARIFS_FORFAITS.map((cat, ci) => (
                                                <React.Fragment
                                                    key={`fcat-${ci}`}
                                                >
                                                    <tr>
                                                        <td
                                                            colSpan={5}
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
                                                        (item, ii) => {
                                                            const badgeBg =
                                                                item.badge ===
                                                                "Poney"
                                                                    ? "#f0fdf4"
                                                                    : item.badge ===
                                                                        "Cheval"
                                                                      ? "#eff6ff"
                                                                      : "#fff7ed";
                                                            const badgeColor =
                                                                item.badge ===
                                                                "Poney"
                                                                    ? "#15803d"
                                                                    : item.badge ===
                                                                        "Cheval"
                                                                      ? "#1d4ed8"
                                                                      : "#c2410c";
                                                            const priceCellStyle =
                                                                (slot: {
                                                                    prix:
                                                                        | number
                                                                        | null;
                                                                    seances: string;
                                                                }) => (
                                                                    <td
                                                                        style={{
                                                                            padding:
                                                                                "10px 12px",
                                                                            textAlign:
                                                                                "center" as const,
                                                                            borderBottom:
                                                                                "1px solid #f3f4f6",
                                                                            borderLeft:
                                                                                "1px solid #f0f0f0",
                                                                            verticalAlign:
                                                                                "middle" as const,
                                                                        }}
                                                                    >
                                                                        <div
                                                                            style={{
                                                                                fontSize: 15,
                                                                                fontWeight: 800,
                                                                                color:
                                                                                    slot.prix !==
                                                                                    null
                                                                                        ? tealDark
                                                                                        : "#9ca3af",
                                                                                whiteSpace:
                                                                                    "nowrap" as const,
                                                                            }}
                                                                        >
                                                                            {slot.prix !==
                                                                            null
                                                                                ? `${slot.prix} €`
                                                                                : "—"}
                                                                        </div>
                                                                        <div
                                                                            style={{
                                                                                fontSize: 10,
                                                                                color: "#9ca3af",
                                                                                marginTop: 2,
                                                                            }}
                                                                        >
                                                                            {
                                                                                slot.seances
                                                                            }
                                                                        </div>
                                                                    </td>
                                                                );
                                                            return (
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
                                                                        {item.note && (
                                                                            <div
                                                                                style={{
                                                                                    fontSize: 10,
                                                                                    color: "#f59e0b",
                                                                                    marginTop: 2,
                                                                                }}
                                                                            >
                                                                                ⚠{" "}
                                                                                {
                                                                                    item.note
                                                                                }
                                                                            </div>
                                                                        )}
                                                                    </td>
                                                                    <td
                                                                        style={{
                                                                            padding:
                                                                                "10px 10px",
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
                                                                                    "3px 7px",
                                                                                borderRadius: 20,
                                                                                background:
                                                                                    badgeBg,
                                                                                color: badgeColor,
                                                                            }}
                                                                        >
                                                                            {
                                                                                item.badge
                                                                            }
                                                                        </span>
                                                                    </td>
                                                                    {priceCellStyle(
                                                                        item.annuel,
                                                                    )}
                                                                    {priceCellStyle(
                                                                        item.s1,
                                                                    )}
                                                                    {priceCellStyle(
                                                                        item.s2,
                                                                    )}
                                                                </tr>
                                                            );
                                                        },
                                                    )}
                                                </React.Fragment>
                                            ))}
                                            {/* Séparateur cotisation */}
                                            <tr>
                                                <td
                                                    colSpan={5}
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
                                        href={assetPath("/PDF_docs/Conditions Generales de Vente.pdf")}
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
                                    animations. Mis à jour 10/04/2026.
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
                                                            colSpan={5}
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
                                        href={assetPath("/PDF_docs/Conditions Generales de Vente.pdf")}
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
                                            href: assetPath("/PDF_docs/Notice_assu.pdf"),
                                            label: "📋 Notice assurance",
                                        },
                                        {
                                            href: assetPath("/PDF_docs/assu_infocontractuelles.pdf"),
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

            {/* Trouver ma reprise drawer */}
            <TrouverReprise isOpen={finderOpen} onClose={() => setFinderOpen(false)} />
        </>
    );
}
