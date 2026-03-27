import type { Metadata } from "next";
import ApreshevaClient from "./ApreshevaClient";

export const metadata: Metadata = {
    title: "L'Après SHEVA — Retraités | SHEVA - Pôle équestre Paris Val-de-Marne",
    description:
        "Découvrez nos chevaux et poneys à la retraite. L'Après SHEVA veille à leur offrir la meilleure vie possible après leur carrière au centre équestre.",
};

export default function ApreshevaPage() {
    return <ApreshevaClient />;
}
