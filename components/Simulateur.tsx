"use client";

import { useState, useEffect, useCallback } from "react";
import { REPRISES_BY_LEVEL, FORFAITS_PRICING, COTISATIONS } from "@/lib/planning-data";

const teal = "rgb(94,180,174)";
const tealDark = "rgb(69,144,150)";
const orange = "#ff6b35";
const SAISON = "2026-2027";

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

export function Simulateur({
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
        age: "", height: "", weight: "", level: "", forfait: "", reprise: "",
    });

    const updateMember = useCallback(
        (field: keyof MemberData, value: string) => {
            setMembers((prev) => {
                const updated = [...prev];
                const cur = { ...updated[currentMember] };
                if (field === "age") {
                    updated[currentMember] = { ...emptyMember(), age: value };
                } else if (field === "level") {
                    updated[currentMember] = { ...cur, level: value, forfait: "", reprise: "" };
                } else if (field === "forfait") {
                    updated[currentMember] = { ...cur, forfait: value, reprise: "" };
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
        if (age <= 6) return null;
        if (age <= 9) return "poney";
        if (age >= 13) return "cheval";
        const h = parseFloat(m.height), w = parseInt(m.weight);
        if (h && w) return h > 1.5 || w > 60 ? "cheval" : "poney";
        return null;
    };

    const getAvailableLevels = (m: MemberData) => {
        const age = parseInt(m.age);
        const mt = getMountType(m);
        if (!age || age <= 6) return [];
        if (mt === "poney") return [
            { val: "debutant", label: "🌟 Débutant" },
            { val: "bronze",   label: "🥉 Bronze" },
            { val: "argent",   label: "🥈 Argent" },
            { val: "or",       label: "🥇 Or" },
        ];
        if (mt === "cheval") return [
            { val: "debutant_cheval", label: "🌟 Débutant" },
            { val: "galop1",          label: "1️⃣ Galop 1" },
            { val: "galop2",          label: "2️⃣ Galop 2" },
            { val: "galop3",          label: "3️⃣ Galop 3" },
            { val: "galop4",          label: "4️⃣ Galop 4" },
            { val: "galop5",          label: "5️⃣ Galop 5" },
            { val: "galop6",          label: "6️⃣ Galop 6" },
            { val: "galop7",          label: "7️⃣ Galop 7" },
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
            return m.level === "debutant" ? ["poney_debutant"] : m.level ? ["poney"] : [];
        const base = age < 16 ? "cheval_under16" : "cheval_over16";
        if (!m.level) return [];
        const list = [base];
        if (m.level === "galop6" || m.level === "galop7") list.push("perfectionnement");
        return list;
    };

    const getAvailableReprises = (m: MemberData) => {
        let key: string | null = null;
        if (m.forfait === "baby") key = "baby_rep";
        else if (m.forfait === "poney_debutant") key = "debutant";
        else if (m.forfait === "poney") key = m.level;
        else if (m.forfait === "cheval_under16" || m.forfait === "cheval_over16")
            key = m.level === "debutant" ? "debutant_chev" : m.level;
        else if (m.forfait === "perfectionnement")
            key = m.level === "galop6" ? "perf_g6" : "perf_g7";
        return key ? (REPRISES_BY_LEVEL[key] ?? []) : [];
    };

    const calcTotal = () => {
        const rawData = members.map((m, i) => {
            const age = parseInt(m.age);
            const forfait = FORFAITS_PRICING[m.forfait];
            const reprises = getAvailableReprises(m);
            const repriseInfo = reprises.find((r) => r.id === m.reprise);
            return {
                index: i + 1, age,
                forfaitName: forfait.name,
                forfaitPrice: forfait.price,
                reprise: repriseInfo ? `${repriseInfo.day} ${repriseInfo.time}` : "—",
                cotisationBase: age < 16 ? COTISATIONS.under16 : COTISATIONS.over16,
                licence: age < 18 ? COTISATIONS.licenceUnder18 : COTISATIONS.licenceOver18,
            };
        });

        const sorted = [...rawData].sort((a, b) => b.cotisationBase - a.cotisationBase);
        const withDiscount = sorted.map((m, idx) => ({
            ...m,
            cotisationDiscount: idx === 2 ? 0.5 : idx >= 3 ? 0.75 : 0,
            cotisation: idx === 2 ? m.cotisationBase * 0.5 : idx >= 3 ? m.cotisationBase * 0.25 : m.cotisationBase,
        }));

        const finalResults: MemberResult[] = rawData.map((m) => {
            const d = withDiscount.find((w) => w.index === m.index)!;
            return { ...m, cotisation: d.cotisation, cotisationDiscount: d.cotisationDiscount, total: d.cotisation + m.licence + m.forfaitPrice };
        });

        setResults(finalResults);
        setTotalPrice(finalResults.reduce((acc, r) => acc + r.total, 0));
        setStep(3);
    };

    const resetSimulator = () => {
        setStep(1); setMemberCount(1); setMembers([]); setCurrentMember(0);
        setResults(null); setTotalPrice(0);
    };

    const startWithCount = (n: number) => {
        setMemberCount(n);
        setMembers(Array.from({ length: n }, emptyMember));
        setCurrentMember(0);
        setStep(2);
    };

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
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
    const allReady = members.length > 0 && members.every((m) => !!m.forfait && !!m.reprise);

    return (
        <>
            <style>{`
                @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
                @keyframes slideInRight { from { transform: translateX(100%) } to { transform: translateX(0) } }
            `}</style>

            {/* Overlay */}
            <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", backdropFilter: "blur(2px)", zIndex: 200, animation: "fadeIn 0.2s ease" }} />

            {/* Drawer latéral */}
            <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "min(520px, 100vw)", background: "white", zIndex: 201, display: "flex", flexDirection: "column", boxShadow: "-8px 0 40px rgba(0,0,0,0.15)", animation: "slideInRight 0.3s ease" }}>
                {/* En-tête */}
                <div style={{ padding: "20px 24px", borderBottom: "1px solid #f0f0f0", background: `linear-gradient(135deg, ${teal}, ${tealDark})`, color: "white" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.8, marginBottom: 4 }}>
                                SHEVA — Outil d&apos;aide
                            </div>
                            <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>🐎 Simulateur de tarif</h2>
                            <p style={{ fontSize: 12, opacity: 0.8, margin: "4px 0 0", lineHeight: 1.4 }}>
                                Estimation indicative — l&apos;inscription en ligne reste obligatoire
                            </p>
                        </div>
                        <button onClick={onClose} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 8, color: "white", width: 32, height: 32, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>×</button>
                    </div>
                    {step === 2 && memberCount > 1 && (
                        <div style={{ display: "flex", gap: 6, marginTop: 16 }}>
                            {Array.from({ length: memberCount }, (_, i) => (
                                <div key={i} onClick={() => { if (members[i].reprise || i <= currentMember) setCurrentMember(i); }}
                                    style={{ flex: 1, height: 4, borderRadius: 2, cursor: "pointer", background: i < currentMember ? "rgba(255,255,255,0.9)" : i === currentMember ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.25)" }} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Contenu scrollable */}
                <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>

                    {/* ÉTAPE 1 — Nombre de membres */}
                    {step === 1 && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                            <div>
                                <h3 style={{ fontSize: 17, fontWeight: 700, color: "rgb(15,23,42)", marginBottom: 6 }}>Combien de membres à inscrire ?</h3>
                                <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.5 }}>
                                    Réduction de 50% sur la cotisation dès le 3ème membre, 75% dès le 4ème.
                                </p>
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                                {[1, 2, 3, 4].map((n) => (
                                    <button key={n} onClick={() => startWithCount(n)}
                                        style={{ padding: "20px 12px", borderRadius: 12, border: `2px solid ${n >= 3 ? teal : "#e5e7eb"}`, background: n >= 3 ? "rgba(94,180,174,0.06)" : "white", color: "rgb(15,23,42)", fontWeight: 700, fontSize: 22, cursor: "pointer", transition: "all 0.15s", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                                        {n}
                                        <span style={{ fontSize: 11, fontWeight: 500, color: "#9ca3af" }}>{n === 1 ? "membre" : "membres"}</span>
                                        {n >= 3 && <span style={{ fontSize: 10, fontWeight: 700, color: teal }}>−{n === 3 ? "50" : "75"}%</span>}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ÉTAPE 2 — Profil du membre courant */}
                    {step === 2 && members.length > 0 && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                            {/* En-tête membre */}
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <h3 style={{ fontSize: 17, fontWeight: 700, color: "rgb(15,23,42)", margin: 0 }}>
                                    Membre {currentMember + 1} / {memberCount}
                                </h3>
                                {memberCount > 1 && (
                                    <div style={{ display: "flex", gap: 6 }}>
                                        {members.map((m, i) => (
                                            <button key={i} onClick={() => setCurrentMember(i)}
                                                style={{ width: 28, height: 28, borderRadius: "50%", border: i === currentMember ? `2px solid ${teal}` : "2px solid #e5e7eb", background: m.reprise ? teal : i === currentMember ? "rgba(94,180,174,0.1)" : "white", color: m.reprise ? "white" : i === currentMember ? tealDark : "#9ca3af", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
                                                {i + 1}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Âge */}
                            <div>
                                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6, display: "block" }}>
                                    Âge <span style={{ color: "#ef4444" }}>*</span>
                                </label>
                                <input type="number" value={currentM.age} onChange={(e) => updateMember("age", e.target.value)}
                                    min={4} max={99} placeholder="Ex : 12"
                                    style={{ width: "100%", padding: "11px 14px", border: `1.5px solid ${currentM.age ? teal : "#e5e7eb"}`, borderRadius: 10, fontSize: 15, outline: "none", boxSizing: "border-box" }} />
                                {age >= 4 && (
                                    <div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: age <= 6 ? "#fdf4ff" : age <= 9 ? "#f0fdf4" : "rgba(94,180,174,0.07)", fontSize: 12, fontWeight: 600, color: age <= 6 ? "#7c3aed" : age <= 9 ? "#15803d" : tealDark }}>
                                        {age <= 6 ? "🍼 Forfait Baby recommandé" : age <= 9 ? "🐴 Forfaits Poney" : needsMorpho ? "📏 Indiquez taille et poids pour affiner" : "🐎 Forfaits Cheval"}
                                    </div>
                                )}
                            </div>

                            {/* Morphologie 10-12 ans */}
                            {needsMorpho && (
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                                    {[
                                        { field: "height" as keyof MemberData, label: "Taille (m)", placeholder: "1.45" },
                                        { field: "weight" as keyof MemberData, label: "Poids (kg)", placeholder: "45" },
                                    ].map(({ field, label, placeholder }) => (
                                        <div key={field}>
                                            <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6, display: "block" }}>{label}</label>
                                            <input type="number" value={currentM[field]} onChange={(e) => updateMember(field, e.target.value)}
                                                placeholder={placeholder} step={field === "height" ? 0.01 : 1}
                                                style={{ width: "100%", padding: "11px 12px", border: `1.5px solid ${currentM[field] ? teal : "#e5e7eb"}`, borderRadius: 10, fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Monture déterminée */}
                            {mt && morphoDone && age > 6 && (
                                <div style={{ padding: "8px 12px", borderRadius: 8, background: mt === "poney" ? "#f0fdf4" : "#eff6ff", border: `1px solid ${mt === "poney" ? "#bbf7d0" : "#bfdbfe"}`, fontSize: 13, fontWeight: 600, color: mt === "poney" ? "#15803d" : "#1d4ed8" }}>
                                    {mt === "poney" ? "🐴 Forfaits Poney" : "🐎 Forfaits Cheval"}
                                </div>
                            )}

                            {/* Niveau */}
                            {levels.length > 0 && morphoDone && (
                                <div>
                                    <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8, display: "block" }}>Niveau acquis</label>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                                        {levels.map((l) => (
                                            <button key={l.val} onClick={() => updateMember("level", l.val)}
                                                style={{ padding: "9px 10px", borderRadius: 8, border: currentM.level === l.val ? `2px solid ${teal}` : "2px solid #e5e7eb", background: currentM.level === l.val ? "rgba(94,180,174,0.08)" : "white", color: currentM.level === l.val ? tealDark : "#374151", fontWeight: 600, fontSize: 13, cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}>
                                                {l.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Forfait */}
                            {forfaits.length > 0 && (
                                <div>
                                    <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8, display: "block" }}>Forfait</label>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                        {forfaits.map((fk) => {
                                            const f = FORFAITS_PRICING[fk];
                                            const sel = currentM.forfait === fk;
                                            return (
                                                <button key={fk} onClick={() => updateMember("forfait", fk)}
                                                    style={{ padding: "12px 14px", borderRadius: 10, border: sel ? `2px solid ${teal}` : "2px solid #e5e7eb", background: sel ? "rgba(94,180,174,0.06)" : "white", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, textAlign: "left", transition: "all 0.15s" }}>
                                                    <span style={{ fontSize: 22 }}>{f.icon}</span>
                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ fontSize: 14, fontWeight: 700, color: sel ? tealDark : "rgb(15,23,42)" }}>{f.name}</div>
                                                        <div style={{ fontSize: 12, color: "#6b7280" }}>{f.desc}</div>
                                                    </div>
                                                    <div style={{ fontSize: 16, fontWeight: 800, color: sel ? teal : "#374151", whiteSpace: "nowrap" }}>{f.price} €</div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Créneau */}
                            {reprises.length > 0 && (
                                <div>
                                    <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8, display: "block" }}>Créneau préféré</label>
                                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 8 }}>
                                        {reprises.map((r) => {
                                            const sel = currentM.reprise === r.id;
                                            return (
                                                <button key={r.id} onClick={() => updateMember("reprise", r.id)}
                                                    style={{ padding: "10px 8px", borderRadius: 8, border: sel ? `2px solid ${orange}` : "2px solid #e5e7eb", background: sel ? "#fff4ef" : "white", color: sel ? orange : "#374151", fontWeight: 600, fontSize: 13, cursor: "pointer", textAlign: "center", transition: "all 0.15s" }}>
                                                    <div style={{ fontSize: 11, color: sel ? orange : "#9ca3af", marginBottom: 2 }}>{r.day}</div>
                                                    <div style={{ fontSize: 15, fontWeight: 800 }}>{r.time}</div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Boutons navigation */}
                            <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                                {currentMember < memberCount - 1 && (
                                    <button disabled={!memberReady} onClick={() => setCurrentMember((p) => p + 1)}
                                        style={{ flex: 1, padding: "13px", borderRadius: 10, border: `2px solid ${memberReady ? teal : "#e5e7eb"}`, background: memberReady ? "rgba(94,180,174,0.08)" : "#f9fafb", color: memberReady ? tealDark : "#9ca3af", fontWeight: 700, fontSize: 14, cursor: memberReady ? "pointer" : "not-allowed" }}>
                                        Membre suivant →
                                    </button>
                                )}
                                {currentMember === memberCount - 1 && (
                                    <button disabled={!allReady} onClick={calcTotal}
                                        style={{ flex: 1, padding: "13px", borderRadius: 10, border: "none", background: allReady ? `linear-gradient(135deg, ${orange}, #f7931e)` : "#e5e7eb", color: allReady ? "white" : "#9ca3af", fontWeight: 700, fontSize: 14, cursor: allReady ? "pointer" : "not-allowed" }}>
                                        💰 Calculer mon tarif
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* ÉTAPE 3 — Résultat */}
                    {step === 3 && results && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                            <div style={{ textAlign: "center", padding: "24px 20px", background: "rgba(94,180,174,0.06)", border: "1px solid rgba(94,180,174,0.2)", borderRadius: 16 }}>
                                <div style={{ fontSize: 13, fontWeight: 600, color: "#6b7280", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>Estimation totale</div>
                                <div style={{ fontSize: 44, fontWeight: 900, color: tealDark, lineHeight: 1 }}>{totalPrice.toFixed(0)} €</div>
                                <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 6 }}>Pour {results.length} membre{results.length > 1 ? "s" : ""} · Saison {SAISON}</div>
                            </div>

                            {results.map((r) => (
                                <div key={r.index} style={{ background: "white", border: "1px solid #f0f0f0", borderRadius: 12, overflow: "hidden" }}>
                                    <div style={{ padding: "10px 14px", background: "#f8fafc", borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <span style={{ fontWeight: 700, fontSize: 14, color: "rgb(15,23,42)" }}>👤 Membre {r.index}</span>
                                        <span style={{ fontWeight: 800, fontSize: 16, color: tealDark }}>{r.total.toFixed(0)} €</span>
                                    </div>
                                    <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: 7 }}>
                                        {[
                                            { label: `Forfait ${r.forfaitName}`, value: `${r.forfaitPrice} €`, green: false },
                                            { label: `Cotisation${r.cotisationDiscount > 0 ? ` (−${r.cotisationDiscount * 100}%)` : ""}`, value: `${r.cotisation.toFixed(0)} €`, green: r.cotisationDiscount > 0 },
                                            { label: "Licence FFE", value: `${r.licence} €`, green: false },
                                            { label: "Créneau", value: r.reprise, green: false, muted: true },
                                        ].map(({ label, value, green, muted }) => (
                                            <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <span style={{ fontSize: 13, color: muted ? "#9ca3af" : "#6b7280" }}>{label}</span>
                                                <span style={{ fontSize: 13, fontWeight: 600, color: green ? "#16a34a" : muted ? "#9ca3af" : "#374151" }}>{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            <div style={{ padding: "10px 12px", background: "#fef9c3", border: "1px solid #fde68a", borderRadius: 8, fontSize: 12, color: "#92400e", lineHeight: 1.5 }}>
                                ⚠️ Simulation indicative. Les tarifs exacts sont confirmés lors de l&apos;inscription en ligne.
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                <a href="https://cloud6.kavalog.fr/SHEVA/" target="_blank" rel="noopener noreferrer"
                                    style={{ display: "block", padding: "14px", borderRadius: 10, background: `linear-gradient(135deg, ${orange}, #f7931e)`, color: "white", fontWeight: 700, fontSize: 15, textAlign: "center", textDecoration: "none" }}>
                                    🚀 S&apos;inscrire en ligne
                                </a>
                                <button onClick={resetSimulator}
                                    style={{ padding: "12px", borderRadius: 10, border: `1.5px solid ${teal}`, background: "white", color: tealDark, fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
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
