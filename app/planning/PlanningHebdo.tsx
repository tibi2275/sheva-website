"use client";

import React, { useState, useSyncExternalStore, useRef } from "react";
import {
    PLANNING_HEBDO,
    PONEY_LEVELS,
    CHEVAL_LEVELS,
    type Creneau,
    type CreneauType,
} from "@/lib/planning-data";
import { teal, tealDark, orange } from "@/lib/theme";
import "./PlanningHebdo.css";

// ═══════════════════════════════════════════════════════════════════════════════
// PLANNING HEBDOMADAIRE — composant interactif
//  • Ordinateur / tablette (≥ 768px) : grille de la semaine complète
//  • Téléphone (< 768px) : un jour à la fois, flèches + onglets + swipe
//  • Dès qu'un filtre est actif : liste des reprises correspondantes,
//    groupées par jour, sous le planning
// Données : lib/planning-data.ts
// ═══════════════════════════════════════════════════════════════════════════════

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

const LIEU_LABEL: Record<"pm" | "gm", string> = {
    gm: "Grand manège",
    pm: "Petit manège",
};

// ─── Helpers temps ────────────────────────────────────────────────────────────
const heureToMin = (h: string): number => {
    const [hh, mm] = h.split("h");
    return parseInt(hh) * 60 + (parseInt(mm) || 0);
};
const minToHeure = (min: number): string => {
    const h = Math.floor(min / 60);
    const m = min % 60;
    return m === 0 ? `${h}h` : `${h}h${String(m).padStart(2, "0")}`;
};
const finCreneau = (c: Creneau) =>
    minToHeure(heureToMin(c.heure) + (c.duree ?? 60));
const dureeLabel = (min: number) =>
    min === 60
        ? "1 h"
        : min === 90
          ? "1 h 30"
          : min < 60
            ? `${min} min`
            : minToHeure(min).replace("h", " h ");

const isPoney = (c: Creneau) => c.type === "baby" || c.type === "poney";
const isCheval = (c: Creneau) =>
    c.type === "cheval" ||
    c.type === "galop" ||
    c.type === "perf" ||
    c.type === "dressage";

// ─── Grille temporelle à pas de 15 min ────────────────────────────────────────
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
                const end = slot + (c.duree ?? 60);
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

const hasEntry = (e: GridEntry | undefined) => e !== null && e !== undefined;

// Slots visibles sur la semaine (au moins une colonne occupée)
const WEEK_SLOTS = ALL_SLOTS.filter((slot) =>
    PLANNING_HEBDO.some(
        ({ jour }) =>
            hasEntry(GRID_DATA[jour].pm.get(slot)) ||
            hasEntry(GRID_DATA[jour].gm.get(slot)),
    ),
);

// Slots visibles pour un jour donné
const DAY_SLOTS: Record<string, number[]> = {};
for (const { jour } of PLANNING_HEBDO) {
    DAY_SLOTS[jour] = ALL_SLOTS.filter(
        (slot) =>
            hasEntry(GRID_DATA[jour].pm.get(slot)) ||
            hasEntry(GRID_DATA[jour].gm.get(slot)),
    );
}

// Jour courant (lundi = 0). Lu uniquement côté client, 0 au rendu statique.
const noopSubscribe = () => () => {};
const getTodayIndex = () => (new Date().getDay() + 6) % 7;
const getServerTodayIndex = () => 0;

type MountFilter = "tous" | "poney" | "cheval";

// ═══════════════════════════════════════════════════════════════════════════════

export default function PlanningHebdo({
    highlightLevel,
}: {
    highlightLevel?: string;
}) {
    const [filterType, setFilterType] = useState<MountFilter>(
        highlightLevel
            ? PONEY_LEVELS.some((l) => l.val === highlightLevel)
                ? "poney"
                : "cheval"
            : "tous",
    );
    const [filterLevel, setFilterLevel] = useState<string | null>(
        highlightLevel ?? null,
    );

    // Jour affiché sur mobile : null = aujourd'hui
    const todayIndex = useSyncExternalStore(
        noopSubscribe,
        getTodayIndex,
        getServerTodayIndex,
    );
    const [pickedDay, setPickedDay] = useState<number | null>(null);
    const dayIndex = pickedDay ?? todayIndex;
    const nbDays = PLANNING_HEBDO.length;
    const goDay = (i: number) => setPickedDay((i + nbDays) % nbDays);

    const touchStart = useRef<{ x: number; y: number } | null>(null);

    const handleMountFilter = (val: MountFilter) => {
        setFilterType(val);
        setFilterLevel(null);
    };

    const filterActive = filterType !== "tous" || filterLevel !== null;

    // galop6 → inclut aussi perf_g6 ; galop7 → inclut aussi perf_g7
    const effectiveLevels = filterLevel
        ? filterLevel === "galop6"
            ? ["galop6", "perf_g6"]
            : filterLevel === "galop7"
              ? ["galop7", "perf_g7"]
              : [filterLevel]
        : null;

    const matches = (c: Creneau) => {
        const matchesLevel = effectiveLevels
            ? (c.simLevels ?? []).some((l) => effectiveLevels.includes(l))
            : true;
        const matchesMount =
            filterType === "tous" ||
            (filterType === "poney" && isPoney(c)) ||
            (filterType === "cheval" && isCheval(c));
        return matchesMount && matchesLevel;
    };

    // Reprises correspondant au filtre, groupées par jour
    const matchesByDay = PLANNING_HEBDO.map(({ jour, creneaux }) => ({
        jour,
        creneaux: creneaux
            .filter(matches)
            .sort(
                (a, b) =>
                    heureToMin(a.heure) - heureToMin(b.heure) ||
                    (a.lieu === "gm" ? -1 : 1),
            ),
    }));
    const totalMatches = matchesByDay.reduce(
        (n, d) => n + d.creneaux.length,
        0,
    );

    const levelOptions =
        filterType === "poney"
            ? PONEY_LEVELS
            : filterType === "cheval"
              ? CHEVAL_LEVELS
              : [];

    const filterLabel = (() => {
        if (filterLevel) {
            const l = [...PONEY_LEVELS, ...CHEVAL_LEVELS].find(
                (x) => x.val === filterLevel,
            );
            const base = l ? l.label.replace(/^[^\p{L}\d]+/u, "") : "";
            return filterType === "poney" ? `${base} poney` : base;
        }
        return filterType === "poney" ? "poney" : "cheval";
    })();

    // ─── Rendu d'une cellule ───────────────────────────────────────────────────
    const thBase: React.CSSProperties = {
        padding: "6px 3px",
        border: "1px solid #e5e7eb",
        fontSize: 10,
        fontWeight: 700,
        textAlign: "center",
        whiteSpace: "nowrap",
        background: "white",
    };

    const emptyCell = (ri: number, rowSpan?: number, key?: string) => (
        <td
            key={key}
            rowSpan={rowSpan}
            style={{
                padding: 2,
                border: "1px solid #f0f0f0",
                background: ri % 2 === 0 ? "white" : "#fafbfb",
            }}
        />
    );

    const renderCell = (
        entry: GridEntry | undefined,
        ri: number,
    ): React.ReactNode => {
        if (entry === "covered") return null;
        if (!hasEntry(entry)) return emptyCell(ri);
        const { creneau: c, rowSpan } = entry as {
            creneau: Creneau;
            rowSpan: number;
        };
        if (!matches(c)) return emptyCell(ri, rowSpan);
        const col = CRENEAU_COLORS[c.type];
        return (
            <td
                rowSpan={rowSpan}
                style={{
                    padding: "3px 4px",
                    border: "1px solid #e5e7eb",
                    background: col.bg,
                    textAlign: "center",
                    verticalAlign: "middle",
                    lineHeight: 1.2,
                }}
            >
                <div style={{ fontSize: 10, fontWeight: 700, color: col.text }}>
                    {c.label}
                </div>
            </td>
        );
    };

    const timeCell = (slot: number, large = false, forceLabel = false) => (
        <td
            style={{
                padding: large ? "0 8px" : "0 5px",
                border: "1px solid #e5e7eb",
                fontWeight: slot % 60 === 0 ? 700 : 400,
                fontSize: slot % 60 === 0 ? (large ? 12 : 11) : large ? 10 : 9,
                color: slot % 60 === 0 ? "#374151" : "#bbbbbb",
                textAlign: "right",
                whiteSpace: "nowrap",
                background: "#f8fafc",
                position: "sticky",
                left: 0,
                zIndex: 5,
                fontVariantNumeric: "tabular-nums",
            }}
        >
            {slot % 30 === 0 || forceLabel ? minToHeure(slot) : "·"}
        </td>
    );

    // ─── Vue semaine (≥ 768px) ─────────────────────────────────────────────────
    const tableMinWidth = 48 + nbDays * 2 * 65;
    const weekView = (
        <div
            className="ph-week-scroll"
            style={{
                borderRadius: 10,
                border: "1px solid #e5e7eb",
            }}
        >
            <table
                style={{
                    borderCollapse: "collapse",
                    width: "100%",
                    minWidth: tableMinWidth,
                    tableLayout: "fixed",
                }}
            >
                <colgroup>
                    <col style={{ width: 48 }} />
                </colgroup>
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
                                position: "sticky",
                                left: 0,
                                zIndex: 20,
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
                                        background: "#dbeafe",
                                        color: "#1e3a8a",
                                        fontSize: 9,
                                    }}
                                >
                                    🐎 GM
                                </th>
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
                            </React.Fragment>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {WEEK_SLOTS.map((slot, ri) => (
                        <tr key={slot} style={{ height: 5 }}>
                            {timeCell(slot)}
                            {PLANNING_HEBDO.map(({ jour }) => (
                                <React.Fragment key={`cell-${jour}-${slot}`}>
                                    {renderCell(GRID_DATA[jour].gm.get(slot), ri)}
                                    {renderCell(GRID_DATA[jour].pm.get(slot), ri)}
                                </React.Fragment>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    // ─── Vue jour (< 768px) ────────────────────────────────────────────────────
    const day = PLANNING_HEBDO[dayIndex];
    // Avec un filtre, on n'affiche que les horaires des reprises retenues
    const daySlots = filterActive
        ? DAY_SLOTS[day.jour].filter((slot) =>
              day.creneaux.some((c) => {
                  if (!matches(c)) return false;
                  const st = heureToMin(c.heure);
                  return slot >= st && slot < st + (c.duree ?? 60);
              }),
          )
        : DAY_SLOTS[day.jour];

    // Cellules d'une colonne (GM ou PM) pour la vue jour, calculées sur
    // les slots réellement affichés (rowSpan cohérent même filtré)
    const dayColumn = (lieu: "pm" | "gm") => {
        const cells = new Map<number, React.ReactNode>();
        let busyUntil = -1;
        daySlots.forEach((slot, ri) => {
            if (slot < busyUntil) return;
            const c = day.creneaux.find(
                (x) =>
                    x.lieu === lieu &&
                    heureToMin(x.heure) === slot &&
                    matches(x),
            );
            if (!c) {
                cells.set(slot, emptyCell(ri, undefined, `${lieu}-${slot}`));
                return;
            }
            const end = slot + (c.duree ?? 60);
            busyUntil = end;
            const rowSpan = daySlots.filter((s) => s >= slot && s < end).length;
            const col = CRENEAU_COLORS[c.type];
            cells.set(
                slot,
                <td
                    key={`${lieu}-${slot}`}
                    rowSpan={rowSpan}
                    style={{
                        padding: "6px 8px",
                        borderTop: "1px solid #e5e7eb",
                        borderRight: "1px solid #e5e7eb",
                        borderBottom: "1px solid #e5e7eb",
                        borderLeft: `3px solid ${col.text}`,
                        background: col.bg,
                        verticalAlign: "middle",
                        lineHeight: 1.25,
                    }}
                >
                    <div style={{ fontSize: 13, fontWeight: 700, color: col.text }}>
                        {c.label}
                    </div>
                    <div
                        style={{
                            fontSize: 11,
                            color: col.text,
                            opacity: 0.75,
                            marginTop: 2,
                            fontVariantNumeric: "tabular-nums",
                        }}
                    >
                        {c.heure} – {finCreneau(c)}
                    </div>
                </td>,
            );
        });
        return cells;
    };
    const gmCells = dayColumn("gm");
    const pmCells = dayColumn("pm");
    const dayMatches = matchesByDay[dayIndex].creneaux.length;
    const nextDayWithMatch = (() => {
        for (let k = 1; k < nbDays; k++) {
            const i = (dayIndex + k) % nbDays;
            if (matchesByDay[i].creneaux.length > 0) return i;
        }
        return null;
    })();

    const onTouchStart = (e: React.TouchEvent) => {
        const t = e.touches[0];
        touchStart.current = { x: t.clientX, y: t.clientY };
    };
    const onTouchEnd = (e: React.TouchEvent) => {
        const s = touchStart.current;
        touchStart.current = null;
        if (!s) return;
        const t = e.changedTouches[0];
        const dx = t.clientX - s.x;
        const dy = t.clientY - s.y;
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
            goDay(dayIndex + (dx < 0 ? 1 : -1));
        }
    };

    const dayView = (
        <div>
            {/* Navigation jour */}
            <div className="ph-daynav">
                <button
                    type="button"
                    className="ph-btn ph-arrow"
                    onClick={() => goDay(dayIndex - 1)}
                    aria-label={`Jour précédent : ${PLANNING_HEBDO[(dayIndex - 1 + nbDays) % nbDays].jour}`}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
                        <path
                            d="M15 5l-7 7 7 7"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                <div style={{ textAlign: "center", minWidth: 0 }}>
                    <div
                        aria-live="polite"
                        style={{
                            fontSize: 20,
                            fontWeight: 800,
                            color: "rgb(15,23,42)",
                            lineHeight: 1.1,
                        }}
                    >
                        {day.jour}
                    </div>
                    <div style={{ fontSize: 12, color: "#6b7280", marginTop: 3 }}>
                        {dayIndex === todayIndex && pickedDay === null
                            ? "Aujourd'hui, "
                            : ""}
                        {filterActive
                            ? `${dayMatches} reprise${dayMatches > 1 ? "s" : ""} ${filterLabel}`
                            : `${day.creneaux.length} reprises`}
                    </div>
                </div>
                <button
                    type="button"
                    className="ph-btn ph-arrow"
                    onClick={() => goDay(dayIndex + 1)}
                    aria-label={`Jour suivant : ${PLANNING_HEBDO[(dayIndex + 1) % nbDays].jour}`}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
                        <path
                            d="M9 5l7 7-7 7"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>

            {/* Onglets jours */}
            <div className="ph-daytabs" role="group" aria-label="Choisir un jour">
                {PLANNING_HEBDO.map(({ jour }, i) => {
                    const active = i === dayIndex;
                    const has = matchesByDay[i].creneaux.length > 0;
                    const dim = filterActive && !has;
                    return (
                        <button
                            key={jour}
                            type="button"
                            className="ph-btn ph-daytab"
                            aria-pressed={active}
                            aria-label={jour}
                            onClick={() => goDay(i)}
                            style={{
                                background: active ? tealDark : "white",
                                color: active
                                    ? "white"
                                    : dim
                                      ? "#cbd5e1"
                                      : "#374151",
                                borderColor: active ? tealDark : "#e5e7eb",
                            }}
                        >
                            {jour.slice(0, 3)}
                            <span
                                aria-hidden
                                style={{
                                    display: "block",
                                    width: 5,
                                    height: 5,
                                    borderRadius: 3,
                                    margin: "3px auto 0",
                                    background:
                                        filterActive && has
                                            ? active
                                                ? "white"
                                                : orange
                                            : "transparent",
                                }}
                            />
                        </button>
                    );
                })}
            </div>

            {/* Grille du jour */}
            <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
                {filterActive && dayMatches === 0 ? (
                    <div className="ph-empty">
                        <p style={{ margin: 0, fontWeight: 600, color: "#374151" }}>
                            Pas de reprise {filterLabel} le {day.jour.toLowerCase()}.
                        </p>
                        {nextDayWithMatch !== null && (
                            <button
                                type="button"
                                className="ph-btn"
                                onClick={() => goDay(nextDayWithMatch)}
                                style={{
                                    marginTop: 12,
                                    padding: "10px 18px",
                                    borderRadius: 10,
                                    border: "none",
                                    background: tealDark,
                                    color: "white",
                                    fontWeight: 700,
                                    fontSize: 14,
                                    cursor: "pointer",
                                }}
                            >
                                Voir le {PLANNING_HEBDO[nextDayWithMatch].jour.toLowerCase()}
                            </button>
                        )}
                    </div>
                ) : (
                    <div
                        style={{
                            borderRadius: 10,
                            border: "1px solid #e5e7eb",
                            overflow: "hidden",
                        }}
                    >
                        <table
                            style={{
                                borderCollapse: "collapse",
                                width: "100%",
                                tableLayout: "fixed",
                            }}
                        >
                            <colgroup>
                                <col style={{ width: 54 }} />
                                <col />
                                <col />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th
                                        style={{
                                            ...thBase,
                                            background: "#f8fafc",
                                            color: "#6b7280",
                                            fontSize: 10,
                                        }}
                                    />
                                    <th
                                        style={{
                                            ...thBase,
                                            padding: "8px 4px",
                                            background: "#dbeafe",
                                            color: "#1e3a8a",
                                            fontSize: 11,
                                        }}
                                    >
                                        🐎 Grand manège
                                    </th>
                                    <th
                                        style={{
                                            ...thBase,
                                            padding: "8px 4px",
                                            background: "#d1fae5",
                                            color: "#065f46",
                                            fontSize: 11,
                                        }}
                                    >
                                        🐴 Petit manège
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {daySlots.map((slot, ri) => {
                                    const prev = daySlots[ri - 1];
                                    const gap =
                                        prev !== undefined &&
                                        slot - prev > SLOT_STEP;
                                    return (
                                        <React.Fragment key={slot}>
                                            {gap && (
                                                <tr aria-hidden>
                                                    <td
                                                        colSpan={3}
                                                        className="ph-gap"
                                                    />
                                                </tr>
                                            )}
                                            <tr style={{ height: 17 }}>
                                                {timeCell(slot, true, ri === 0 || gap)}
                                                {gmCells.get(slot)}
                                                {pmCells.get(slot)}
                                            </tr>
                                        </React.Fragment>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );

    // ─── Liste des reprises filtrées ───────────────────────────────────────────
    const filteredList = filterActive && (
        <div className="ph-list" aria-live="polite">
            <div
                style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: 12,
                    flexWrap: "wrap",
                    marginBottom: 14,
                }}
            >
                <h3
                    style={{
                        margin: 0,
                        fontSize: 17,
                        fontWeight: 800,
                        color: "rgb(15,23,42)",
                    }}
                >
                    {totalMatches === 0
                        ? `Aucune reprise ${filterLabel} cette saison`
                        : `${totalMatches} reprise${totalMatches > 1 ? "s" : ""} ${filterLabel} par semaine`}
                </h3>
                <button
                    type="button"
                    className="ph-btn"
                    onClick={() => handleMountFilter("tous")}
                    style={{
                        border: "none",
                        background: "none",
                        padding: "4px 0",
                        color: tealDark,
                        fontWeight: 600,
                        fontSize: 13,
                        cursor: "pointer",
                        textDecoration: "underline",
                        textUnderlineOffset: 3,
                    }}
                >
                    Effacer le filtre
                </button>
            </div>

            {matchesByDay
                .filter((d) => d.creneaux.length > 0)
                .map(({ jour, creneaux }) => (
                    <section key={jour} className="ph-list-day">
                        <h4 className="ph-list-dayname">{jour}</h4>
                        <ul className="ph-list-cards">
                            {creneaux.map((c) => {
                                const col = CRENEAU_COLORS[c.type];
                                return (
                                    <li
                                        key={`${jour}-${c.heure}-${c.lieu}`}
                                        className="ph-card"
                                        style={{ borderLeftColor: col.text }}
                                    >
                                        <div className="ph-card-time">
                                            <span>{c.heure}</span>
                                            <span className="ph-card-end">
                                                {finCreneau(c)}
                                            </span>
                                        </div>
                                        <div style={{ minWidth: 0 }}>
                                            <div
                                                style={{
                                                    fontWeight: 700,
                                                    fontSize: 14,
                                                    color: col.text,
                                                }}
                                            >
                                                {c.label}
                                            </div>
                                            <div
                                                style={{
                                                    fontSize: 12,
                                                    color: "#6b7280",
                                                    marginTop: 2,
                                                }}
                                            >
                                                {LIEU_LABEL[c.lieu]},{" "}
                                                {dureeLabel(c.duree ?? 60)}
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                ))}
        </div>
    );

    // ─── Rendu ─────────────────────────────────────────────────────────────────
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
                        type="button"
                        className="ph-btn"
                        aria-pressed={filterType === f.val}
                        onClick={() => handleMountFilter(f.val)}
                        style={{
                            padding: "8px 16px",
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
                <div className="ph-levels">
                    {levelOptions.map((l) => (
                        <button
                            key={l.val}
                            type="button"
                            className="ph-btn"
                            aria-pressed={filterLevel === l.val}
                            onClick={() =>
                                setFilterLevel((prev) =>
                                    prev === l.val ? null : l.val,
                                )
                            }
                            style={{
                                padding: "5px 12px",
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
                                    filterLevel === l.val ? orange : "#6b7280",
                                fontWeight: 600,
                                fontSize: 12,
                                cursor: "pointer",
                                whiteSpace: "nowrap",
                                flexShrink: 0,
                                transition: "all 0.15s",
                            }}
                        >
                            {l.label}
                        </button>
                    ))}
                </div>
            )}

            {!levelOptions.length && <div style={{ marginBottom: 16 }} />}

            <div className="ph-desktop">{weekView}</div>
            <div className="ph-mobile">{dayView}</div>

            {/* Légende */}
            <div
                style={{
                    marginTop: 10,
                    textAlign: "center",
                    fontSize: 11,
                    color: "#9ca3af",
                }}
            >
                <i>Mis à jour le 1/05/2026</i>
                <span className="ph-desktop-inline">
                    {" "}
                    &nbsp;·&nbsp; <strong>PM</strong> = Petit Manège
                    &nbsp;·&nbsp; <strong>GM</strong> = Grand Manège
                </span>
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
                            cheval: "Cheval",
                            perf: "Cheval - Perf. 1h30",
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
                    },
                )}
            </div>
            <div
                style={{
                    marginTop: 10,
                    textAlign: "center",
                    fontSize: 11,
                    color: "#9ca3af",
                }}
            >
                <strong>Note : </strong>
                <i>&quot;Galop 0&quot; correspond à un niveau Débutant à cheval</i>
            </div>

            {filteredList}
        </div>
    );
}
