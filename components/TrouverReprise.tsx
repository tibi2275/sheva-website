"use client";

import { useState, useEffect } from "react";
import { REPRISES_BY_LEVEL, PONEY_LEVELS, CHEVAL_LEVELS } from "@/lib/planning-data";

const teal = "rgb(94,180,174)";
const tealDark = "rgb(69,144,150)";
const orange = "#ff6b35";

// ─── QUIZ PONEY ───────────────────────────────────────────────────────────────
const PONEY_QUIZ: {
    question: string;
    okLabel: string; koLabel: string;
    okLevel: string | null; koLevel: string | null;
    okNext: number | null; koNext: number | null;
}[] = [
    { question: "Est-ce que tu sais trotter seul(e), sans aide ?",                              okLabel: "Oui", koLabel: "Non / je débute",  okNext: 1,    koNext: null, okLevel: null,    koLevel: "debutant" },
    { question: "Est-ce que tu sais galoper quelques foulées ?",                                okLabel: "Oui", koLabel: "Pas encore",       okNext: 2,    koNext: null, okLevel: null,    koLevel: "bronze" },
    { question: "Tu contrôles les 3 allures et tu as déjà sauté 1 ou 2 obstacles ?",           okLabel: "Oui", koLabel: "Pas vraiment",     okNext: 3,    koNext: null, okLevel: null,    koLevel: "bronze" },
    { question: "Tu es autonome sur les 3 allures et tu enchaînes 2-3 obstacles ?",            okLabel: "Oui", koLabel: "Non, pas encore",  okNext: null, koNext: null, okLevel: "or",    koLevel: "argent" },
];

// ─── QUIZ CHEVAL ──────────────────────────────────────────────────────────────
const CHEVAL_QUIZ: {
    question: string;
    okLabel: string; koLabel: string;
    okLevel: string | null; koLevel: string | null;
    okNext: number | null; koNext: number | null;
}[] = [
    { question: "Tu sais trotter en enlevé et t'arrêter seul(e) ?",                            okLabel: "Oui", koLabel: "Non / je débute",  okNext: 1,    koNext: null, okLevel: null,    koLevel: "debutant_cheval" },
    { question: "Tu sais galoper et tu as déjà sauté un petit obstacle ?",                     okLabel: "Oui", koLabel: "Pas encore",       okNext: 2,    koNext: null, okLevel: null,    koLevel: "galop1" },
    { question: "Tu as une bonne position et tu rides sur une piste précise ?",                 okLabel: "Oui", koLabel: "En cours",         okNext: 3,    koNext: null, okLevel: null,    koLevel: "galop2" },
    { question: "Tu es autonome et tu fais du travail latéral au pas ?",                        okLabel: "Oui", koLabel: "Non",              okNext: 4,    koNext: null, okLevel: null,    koLevel: "galop3" },
    { question: "Tu travailles l'incurvation et la cession à la jambe au pas ?",               okLabel: "Oui", koLabel: "Non",              okNext: 5,    koNext: null, okLevel: null,    koLevel: "galop4" },
    { question: "Tu fais de la cession à la jambe au trot ?",                                  okLabel: "Oui", koLabel: "Non",              okNext: 6,    koNext: null, okLevel: null,    koLevel: "galop5" },
    { question: "Tu travailles l'épaule en dedans et tu te détends de façon autonome ?",       okLabel: "Oui", koLabel: "Non",              okNext: null, koNext: null, okLevel: "galop7", koLevel: "galop6" },
];

const LEVEL_LABELS: Record<string, string> = {
    debutant:       "🌟 Poney Débutant",
    bronze:         "🥉 Galop Bronze",
    argent:         "🥈 Galop Argent",
    or:             "🥇 Galop Or",
    debutant_cheval:"🌟 Cheval Débutant (Galop 0)",
    galop1:         "1️⃣ Galop 1",
    galop2:         "2️⃣ Galop 2",
    galop3:         "3️⃣ Galop 3",
    galop4:         "4️⃣ Galop 4",
    galop5:         "5️⃣ Galop 5",
    galop6:         "6️⃣ Galop 6",
    galop7:         "7️⃣ Galop 7",
    baby_rep:       "🍼 Baby (4-6 ans)",
};

type FinderStep =
    | { type: "knowLevel" }
    | { type: "knowMount" }
    | { type: "knowMountLevel"; mount: "poney" | "cheval" }
    | { type: "unknownAge" }
    | { type: "unknownMorpho"; age: number }
    | { type: "quizPoney"; qIndex: number }
    | { type: "quizCheval"; qIndex: number }
    | { type: "result"; level: string; mount: "poney" | "cheval" | "baby" };

export function TrouverReprise({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const [history, setHistory] = useState<FinderStep[]>([{ type: "knowLevel" }]);
    const step = history[history.length - 1];

    const push = (s: FinderStep) => setHistory((h) => [...h, s]);
    const back = () => setHistory((h) => (h.length > 1 ? h.slice(0, -1) : h));
    const reset = () => setHistory([{ type: "knowLevel" }]);

    const [ageInput, setAgeInput] = useState("");
    const [heightInput, setHeightInput] = useState("");
    const [weightInput, setWeightInput] = useState("");

    useEffect(() => {
        const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        if (isOpen) window.addEventListener("keydown", fn);
        return () => window.removeEventListener("keydown", fn);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (!isOpen) { reset(); setAgeInput(""); setHeightInput(""); setWeightInput(""); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    if (!isOpen) return null;

    const getMountFromAge = (
        age: number, height?: number, weight?: number,
    ): "poney" | "cheval" | "baby" | null => {
        if (age <= 6) return "baby";
        if (age <= 9) return "poney";
        if (age >= 13) return "cheval";
        if (height !== undefined && weight !== undefined)
            return height > 1.5 || weight > 60 ? "cheval" : "poney";
        return null;
    };

    const btnBase: React.CSSProperties = {
        padding: "12px 20px", borderRadius: 12,
        border: `2px solid rgba(94,180,174,0.35)`,
        background: "rgba(94,180,174,0.06)", color: tealDark,
        fontWeight: 700, fontSize: 14, cursor: "pointer",
        transition: "all 0.15s", textAlign: "left", width: "100%",
    };
    const orangeBtn: React.CSSProperties = {
        ...btnBase,
        border: `2px solid rgba(255,107,53,0.35)`,
        background: "rgba(255,107,53,0.06)", color: orange,
    };

    const renderStep = () => {
        if (step.type === "knowLevel") return (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}>
                    On va t&apos;aider à trouver la reprise qui te correspond.
                    Est-ce que tu connais déjà ton niveau&nbsp;?
                </p>
                <button style={btnBase} onClick={() => push({ type: "knowMount" })}>
                    ✅ Oui, je connais mon niveau
                </button>
                <button style={orangeBtn} onClick={() => push({ type: "unknownAge" })}>
                    ❓ Non, je veux le découvrir
                </button>
            </div>
        );

        if (step.type === "knowMount") return (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}>
                    Tu pratiques avec des poneys ou des chevaux&nbsp;?
                </p>
                <button style={btnBase} onClick={() => push({ type: "knowMountLevel", mount: "poney" })}>🐴 Poney</button>
                <button style={btnBase} onClick={() => push({ type: "knowMountLevel", mount: "cheval" })}>🐎 Cheval</button>
            </div>
        );

        if (step.type === "knowMountLevel") {
            const levels = step.mount === "poney" ? PONEY_LEVELS : CHEVAL_LEVELS;
            return (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}>Quel est ton niveau&nbsp;?</p>
                    {levels.map((l) => (
                        <button key={l.val} style={btnBase}
                            onClick={() => push({ type: "result", level: l.val, mount: step.mount })}>
                            {l.label}
                        </button>
                    ))}
                </div>
            );
        }

        if (step.type === "unknownAge") {
            const age = parseInt(ageInput);
            const valid = age >= 4 && age <= 80;
            return (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}>
                        Quel âge as-tu ? (ou quel âge a le cavalier à inscrire ?)
                    </p>
                    <input type="number" min={4} max={80} placeholder="Ex : 8"
                        value={ageInput} onChange={(e) => setAgeInput(e.target.value)}
                        style={{ padding: "12px 16px", borderRadius: 10, border: "2px solid #e5e7eb", fontSize: 16, outline: "none", width: "100%" }} />
                    <button disabled={!valid}
                        onClick={() => {
                            if (age <= 6) push({ type: "result", level: "baby_rep", mount: "baby" });
                            else if (age <= 9) push({ type: "quizPoney", qIndex: 0 });
                            else if (age >= 13) push({ type: "quizCheval", qIndex: 0 });
                            else push({ type: "unknownMorpho", age });
                        }}
                        style={{ ...btnBase, opacity: valid ? 1 : 0.4, cursor: valid ? "pointer" : "not-allowed", textAlign: "center" }}>
                        Continuer →
                    </button>
                </div>
            );
        }

        if (step.type === "unknownMorpho") {
            const h = parseFloat(heightInput), w = parseInt(weightInput);
            const valid = h >= 1.0 && h <= 2.2 && w >= 20 && w <= 150;
            return (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}>
                        Pour les {step.age} ans, ça dépend de la morphologie.
                    </p>
                    <div>
                        <label style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>Taille (en mètres, ex: 1.52)</label>
                        <input type="number" min={1.0} max={2.2} step={0.01} placeholder="Ex : 1.52"
                            value={heightInput} onChange={(e) => setHeightInput(e.target.value)}
                            style={{ marginTop: 4, padding: "10px 14px", borderRadius: 10, border: "2px solid #e5e7eb", fontSize: 15, outline: "none", width: "100%" }} />
                    </div>
                    <div>
                        <label style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>Poids (en kg, ex: 55)</label>
                        <input type="number" min={20} max={150} placeholder="Ex : 55"
                            value={weightInput} onChange={(e) => setWeightInput(e.target.value)}
                            style={{ marginTop: 4, padding: "10px 14px", borderRadius: 10, border: "2px solid #e5e7eb", fontSize: 15, outline: "none", width: "100%" }} />
                    </div>
                    <button disabled={!valid}
                        onClick={() => {
                            const mount = getMountFromAge(step.age, h, w);
                            if (mount === "poney") push({ type: "quizPoney", qIndex: 0 });
                            else push({ type: "quizCheval", qIndex: 0 });
                        }}
                        style={{ ...btnBase, opacity: valid ? 1 : 0.4, cursor: valid ? "pointer" : "not-allowed", textAlign: "center" }}>
                        Continuer →
                    </button>
                </div>
            );
        }

        if (step.type === "quizPoney") {
            const q = PONEY_QUIZ[step.qIndex];
            return (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <div style={{ padding: "12px 16px", background: "rgba(94,180,174,0.06)", borderRadius: 10, border: "1px solid rgba(94,180,174,0.2)" }}>
                        <p style={{ fontSize: 15, fontWeight: 600, color: "rgb(15,23,42)", lineHeight: 1.5, margin: 0 }}>{q.question}</p>
                    </div>
                    <button style={btnBase} onClick={() => {
                        if (q.okLevel) push({ type: "result", level: q.okLevel, mount: "poney" });
                        else if (q.okNext !== null) push({ type: "quizPoney", qIndex: q.okNext });
                    }}>✅ {q.okLabel}</button>
                    <button style={orangeBtn} onClick={() => {
                        if (q.koLevel) push({ type: "result", level: q.koLevel, mount: "poney" });
                        else if (q.koNext !== null) push({ type: "quizPoney", qIndex: q.koNext });
                    }}>❌ {q.koLabel}</button>
                </div>
            );
        }

        if (step.type === "quizCheval") {
            const q = CHEVAL_QUIZ[step.qIndex];
            return (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <div style={{ padding: "12px 16px", background: "rgba(94,180,174,0.06)", borderRadius: 10, border: "1px solid rgba(94,180,174,0.2)" }}>
                        <p style={{ fontSize: 15, fontWeight: 600, color: "rgb(15,23,42)", lineHeight: 1.5, margin: 0 }}>{q.question}</p>
                    </div>
                    <button style={btnBase} onClick={() => {
                        if (q.okLevel) push({ type: "result", level: q.okLevel, mount: "cheval" });
                        else if (q.okNext !== null) push({ type: "quizCheval", qIndex: q.okNext });
                    }}>✅ {q.okLabel}</button>
                    <button style={orangeBtn} onClick={() => {
                        if (q.koLevel) push({ type: "result", level: q.koLevel, mount: "cheval" });
                        else if (q.koNext !== null) push({ type: "quizCheval", qIndex: q.koNext });
                    }}>❌ {q.koLabel}</button>
                </div>
            );
        }

        if (step.type === "result") {
            const reprises = REPRISES_BY_LEVEL[step.level] ?? [];
            const levelLabel = LEVEL_LABELS[step.level] ?? step.level;
            return (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ padding: "16px", background: "rgba(94,180,174,0.08)", borderRadius: 12, border: "1.5px solid rgba(94,180,174,0.3)", textAlign: "center" }}>
                        <div style={{ fontSize: 28, marginBottom: 6 }}>🎉</div>
                        <p style={{ fontSize: 13, color: tealDark, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>
                            Ton niveau recommandé
                        </p>
                        <p style={{ fontSize: 20, fontWeight: 800, color: "rgb(15,23,42)", margin: 0 }}>{levelLabel}</p>
                    </div>
                    {reprises.length > 0 ? (
                        <div>
                            <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                                Créneaux disponibles ({reprises.length})
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                {reprises.map((r) => (
                                    <div key={r.id} style={{ padding: "10px 14px", background: "white", border: "1.5px solid #e5e7eb", borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <span style={{ fontWeight: 700, color: "rgb(15,23,42)", fontSize: 14 }}>{r.day}</span>
                                        <span style={{ fontWeight: 600, color: tealDark, fontSize: 14 }}>{r.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p style={{ fontSize: 14, color: "#9ca3af", textAlign: "center" }}>
                            Aucun créneau trouvé pour ce niveau. Contacte-nous pour plus d&apos;info.
                        </p>
                    )}
                    <button onClick={reset} style={{ ...orangeBtn, textAlign: "center", marginTop: 8 }}>
                        🔄 Recommencer
                    </button>
                </div>
            );
        }

        return null;
    };

    const stepTitles: Partial<Record<FinderStep["type"], string>> = {
        knowLevel: "Trouver ma reprise", knowMount: "Type de monture",
        knowMountLevel: "Choisir mon niveau", unknownAge: "Mon âge",
        unknownMorpho: "Ma morphologie", quizPoney: "Évaluation poney 🐴",
        quizCheval: "Évaluation cheval 🐎", result: "Mon résultat",
    };

    return (
        <>
            <style>{`
                @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
                @keyframes slideInRight { from { transform: translateX(100%) } to { transform: translateX(0) } }
            `}</style>

            {/* Overlay */}
            <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", backdropFilter: "blur(2px)", zIndex: 200, animation: "fadeIn 0.2s ease" }} />

            {/* Drawer */}
            <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "min(460px, 100vw)", background: "white", zIndex: 201, display: "flex", flexDirection: "column", boxShadow: "-8px 0 40px rgba(0,0,0,0.15)", animation: "slideInRight 0.3s ease" }}>
                {/* Header */}
                <div style={{ padding: "20px 24px", borderBottom: "1px solid #f0f0f0", background: `linear-gradient(135deg, ${orange}, #e85d20)`, color: "white" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.8, marginBottom: 4 }}>
                                SHEVA — Orientation
                            </div>
                            <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>🔍 Trouver ma reprise</h2>
                            <p style={{ fontSize: 12, opacity: 0.85, margin: "4px 0 0", lineHeight: 1.4 }}>
                                {stepTitles[step.type] ?? ""}
                            </p>
                        </div>
                        <button onClick={onClose} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 8, color: "white", width: 32, height: 32, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>×</button>
                    </div>
                    {history.length > 1 && (
                        <button onClick={back} style={{ marginTop: 12, background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 6, color: "white", fontSize: 12, fontWeight: 600, padding: "4px 10px", cursor: "pointer" }}>
                            ← Retour
                        </button>
                    )}
                </div>

                {/* Content */}
                <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
                    {renderStep()}
                </div>
            </div>
        </>
    );
}
