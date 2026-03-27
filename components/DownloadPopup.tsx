"use client";

import { useState } from "react";

const teal = "rgb(94,180,174)";
const tealDark = "rgb(69,144,150)";

const documents = [
    { label: "Statuts", href: "/PDF_docs/Statuts_SHEVA_2023.pdf" },
    { label: "Règlement Intérieur", href: "/PDF_docs/Reglement_interieur_SHEVA_2025_v12.pdf" },
    { label: "Conditions Générales de Vente", href: "/PDF_docs/Conditions Generales de Vente.pdf" },
    { label: "Charte de la Laïcité", href: "/PDF_docs/charte_de_la_laicite signee 2024.pdf" },
];

const pvAG = [
    { label: "PV AG 2024", href: "/PDF_docs/PV_AG_SHEVA_2024-11-30.pdf" },
    { label: "PV AGE 2023", href: "/PDF_docs/PV AGE SHEVA 2023 VF.pdf" },
    { label: "PV AG 2022", href: "/PDF_docs/PV_AG_SHEVA_2022-11-26.pdf" },
    { label: "PV AG 2021", href: "/PDF_docs/PV_AG_SHEVA_2021-11-20.pdf" },
    { label: "PV AG 2020", href: "/PDF_docs/PV_AG_SHEVA_2020-11-28.pdf" },
    { label: "PV AG 2019", href: "/PDF_docs/PV_AG_SHEVA_2019-11-23.pdf" },
    { label: "PV AG 2018", href: "/PDF_docs/PV_AG_SHEVA_2018-12-01.pdf" },
    { label: "PV AG 2017", href: "/PDF_docs/PV_AG_SHEVA_2017-11-25.pdf" },
    { label: "PV AG 2016", href: "/PDF_docs/PV_AG_SHEVA_2016-11-19.pdf" },
    { label: "PV AG 2015", href: "/PDF_docs/PV_AG_SHEVA_2015-11-21.pdf" },
    { label: "PV AG 2014", href: "/PDF_docs/PV_AG_SHEVA_2014-10-11.pdf" },
];

function DocLink({ label, href }: { label: string; href: string }) {
    return (
        <a
            href={href}
            download
            style={{
                display: "block",
                padding: "10px 16px",
                borderRadius: 8,
                border: `1px solid rgba(94,180,174,0.3)`,
                color: tealDark,
                fontWeight: 600,
                fontSize: 14,
                textDecoration: "none",
                background: "rgba(94,180,174,0.05)",
                transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(94,180,174,0.12)")
            }
            onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(94,180,174,0.05)")
            }
        >
            📄 {label}
        </a>
    );
}

export function DownloadPopup() {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Trigger button */}
            <button
                onClick={() => setOpen(true)}
                style={{
                    display: "inline-block",
                    padding: "10px 22px",
                    borderRadius: 8,
                    border: `1.5px solid ${teal}`,
                    background: "transparent",
                    color: teal,
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: "pointer",
                    transition: "background 0.2s ease, color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = teal;
                    e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = teal;
                }}
            >
                Documents de l&apos;association
            </button>

            {/* Overlay */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 200,
                        background: "rgba(0,0,0,0.55)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "20px",
                    }}
                >
                    {/* Modal */}
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: "white",
                            borderRadius: 16,
                            width: "100%",
                            maxWidth: 480,
                            maxHeight: "85vh",
                            overflowY: "auto",
                            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {/* Header */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "20px 24px 16px",
                                borderBottom: "1px solid #f0f0f0",
                                position: "sticky",
                                top: 0,
                                background: "white",
                                zIndex: 1,
                                borderRadius: "16px 16px 0 0",
                            }}
                        >
                            <h2
                                style={{
                                    fontSize: 18,
                                    fontWeight: 700,
                                    color: "rgb(15,23,42)",
                                    margin: 0,
                                }}
                            >
                                🐎 Documents
                            </h2>
                            <button
                                onClick={() => setOpen(false)}
                                style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: "50%",
                                    border: "none",
                                    background: "#f4f6f8",
                                    color: "#6b7280",
                                    fontSize: 18,
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    lineHeight: 1,
                                }}
                            >
                                ✕
                            </button>
                        </div>

                        {/* Content */}
                        <div style={{ padding: "20px 24px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
                            {documents.map((doc) => (
                                <DocLink key={doc.label} {...doc} />
                            ))}

                            <h3
                                style={{
                                    fontSize: 15,
                                    fontWeight: 700,
                                    color: "rgb(15,23,42)",
                                    margin: "14px 0 4px",
                                }}
                            >
                                🐎 Assemblées Générales
                            </h3>
                            {pvAG.map((doc) => (
                                <DocLink key={doc.label} {...doc} />
                            ))}

                            <h3
                                style={{
                                    fontSize: 15,
                                    fontWeight: 700,
                                    color: "rgb(15,23,42)",
                                    margin: "14px 0 4px",
                                }}
                            >
                                🐎 Conseils d&apos;Administration
                            </h3>
                            <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6, margin: 0 }}>
                                Les comptes-rendus des réunions de CA sont disponibles sur demande.
                            </p>
                            <a
                                href="mailto:ca@sheva.fr"
                                style={{
                                    display: "inline-block",
                                    padding: "10px 16px",
                                    borderRadius: 8,
                                    border: `1px solid rgba(94,180,174,0.3)`,
                                    color: tealDark,
                                    fontWeight: 600,
                                    fontSize: 14,
                                    textDecoration: "none",
                                    background: "rgba(94,180,174,0.05)",
                                }}
                            >
                                ✉️ Contactez nous
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
