import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// Poppins — police originale de la SHEVA
const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-poppins",
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: "SHEVA — Pôle équestre Paris Val-de-Marne",
        template: "%s | SHEVA",
    },
    description:
        "Centre équestre moderne et convivial aux portes de Paris, au parc interdépartemental de Choisy à Créteil. Cours, stages et pensions pour tous niveaux.",
    keywords: [
        "équitation",
        "centre équestre",
        "Créteil",
        "Val-de-Marne",
        "Paris",
    ],
    openGraph: {
        title: "SHEVA — Pôle équestre Paris Val-de-Marne",
        description:
            "Association loi 1901 avec 670 licenciés. Cours, stages et pensions pour tous niveaux, à 10 km de Paris.",
        url: "https://www.sheva.fr",
        siteName: "SHEVA",
        images: [{ url: "https://www.sheva.fr/images/logos/logo-sheva.jpg" }],
        locale: "fr_FR",
        type: "website",
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
    alternates: { canonical: "https://www.sheva.fr" },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr" className={poppins.variable}>
            <body
                className="bg-[#fafbfb] text-gray-800 antialiased"
                style={{ fontFamily: "var(--font-poppins), sans-serif" }}
            >
                {children}
            </body>
        </html>
    );
}
