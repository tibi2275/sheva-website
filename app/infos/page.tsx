import type { Metadata } from "next";
import InfosClient from "./InfosClient";

export const metadata: Metadata = {
    title: "Informations Pratiques | SHEVA - Pôle équestre Paris Val-de-Marne",
    description:
        "Retrouvez toutes les informations pratiques de la SHEVA : adresse au parc interdépartemental de Choisy à Créteil, horaires, accès, FAQ et contacts.",
};

export default function InfosPage() {
    return <InfosClient />;
}
