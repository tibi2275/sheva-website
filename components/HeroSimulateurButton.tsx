"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { Simulateur } from "@/components/Simulateur";

/**
 * Bouton du hero d'accueil qui ouvre le simulateur d'inscription.
 *
 * Le drawer est monté via un portal sur <body> : le hero crée un contexte
 * d'empilement (`relative z-10`), sans ça le simulateur passerait sous le menu
 * et sa croix de fermeture serait inaccessible.
 */
export function HeroSimulateurButton() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-white font-bold rounded-xl text-sm shadow-lg transition-all hover:-translate-y-0.5 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/40 cursor-pointer"
            >
                Simuler mon inscription
            </button>

            {/* Rendu uniquement à l'ouverture → jamais rendu côté serveur,
                donc `document` est toujours disponible ici. */}
            {open &&
                createPortal(
                    <Simulateur isOpen onClose={() => setOpen(false)} />,
                    document.body,
                )}
        </>
    );
}
