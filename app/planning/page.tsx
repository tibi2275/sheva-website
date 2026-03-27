import type { Metadata } from "next";
import PlanningClient from "./PlanningClient";

export const metadata: Metadata = {
    title: "Planning & Tarifs | SHEVA - Centre équestre Créteil",
    description:
        "Consultez le planning des reprises et les tarifs de la SHEVA, centre équestre à Créteil Pompadour. Simulez votre inscription en ligne.",
};

export default function PlanningPage() {
    return <PlanningClient />;
}
