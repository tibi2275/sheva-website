"use client";

import { useEffect, useState } from "react";

export function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 300);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    if (!visible) return null;

    return (
        <>
            <style>{`
                @media (min-width: 768px) {
                    .scroll-to-top { display: none !important; }
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(8px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
            <button
                className="scroll-to-top"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                aria-label="Retour en haut"
                style={{
                    position: "fixed",
                    bottom: 24,
                    right: 20,
                    zIndex: 200,
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: "none",
                    background: "rgba(45,120,128,0.82)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    color: "white",
                    fontSize: 16,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
                    animation: "fadeInUp 0.2s ease",
                }}
            >
                ↑
            </button>
        </>
    );
}
