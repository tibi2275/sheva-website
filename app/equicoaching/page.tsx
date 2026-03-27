import type { Metadata } from "next";
import { EquicoachingClient } from "./EquicoachingClient";

export const metadata: Metadata = {
    title: "Équicoaching | Développement personnel avec le cheval — SHEVA",
    description:
        "Découvrez l'équicoaching à la SHEVA : coaching et développement personnel facilités par les chevaux. Sessions individuelles, stages, teambuilding et offres entreprise.",
};

export default function EquicoachingPage() {
    return <EquicoachingClient />;
}
