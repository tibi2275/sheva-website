"use client";

import Image from "next/image";

const partnerLogos = [
    {
        src: "/images/logos/logo-valdemarne.png",
        alt: "Val-de-Marne",
        href: "https://www.valdemarne.fr",
    },
    {
        src: "/images/logos/idf_logo.png",
        alt: "Île-de-France",
        href: "https://www.iledefrance.fr",
    },
    {
        src: "/images/logos/logo-creteil.png",
        alt: "Créteil",
        href: "https://www.ville-creteil.fr",
    },
    {
        src: "/images/logos/logo-ans.png",
        alt: "Agence Nationale du Sport",
        href: "http://www.agencedusport.fr",
    },
    {
        src: "/images/logos/fonds-eperon.png",
        alt: "Fonds Éperon",
        href: "https://www.fondseperon.com",
    },
    {
        src: "/images/logos/logo-inspiraction.png",
        alt: "Inspiraction Consulting",
        href: "https://www.iaconsulting.fr",
    },
    {
        src: "/images/logos/Logo_laureat_BPE.jpg",
        alt: "Budget Participatif Écologique",
        href: "https://www.iledefrance.fr",
    },
];

export function Footer() {
    return (
        <footer
            className="bg-white border-t-2"
            style={{ borderColor: "rgb(94,180,174)" }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
                    <div>
                        <h3 className="font-bold text-gray-800 text-sm mb-4">
                            Suivez-nous
                        </h3>
                        <div className="flex flex-col gap-2.5">
                            <a
                                href="https://www.instagram.com/centreequestresheva/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm transition-colors"
                            >
                                📸 Instagram
                            </a>
                            <a
                                href="https://www.facebook.com/ClubSheva"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm transition-colors"
                            >
                                👥 Facebook
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 text-sm mb-4">
                            Contact
                        </h3>
                        <div className="space-y-2 text-sm text-gray-500">
                            <p>Parc Interdépartemental des Sports</p>
                            <p>Créteil — 94000</p>
                            <a
                                href="tel:+33143768676"
                                className="flex items-center gap-1.5 hover:text-gray-800 transition-colors"
                            >
                                📞 01 43 76 86 76
                            </a>
                            <a
                                href="mailto:sheva@sheva.fr"
                                className="flex items-center gap-1.5 hover:text-gray-800 transition-colors"
                            >
                                📧 sheva@sheva.fr
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 text-sm mb-4">
                            Accès
                        </h3>
                        <div className="space-y-2 text-sm text-gray-500">
                            <p>🚆 RER D — Créteil Pompadour</p>
                            <p>🚇 Métro ligne 8 + TVM</p>
                            <p>🚌 Bus O1, O2, 393</p>
                            <p>🚗 A86 — Parking gratuit</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 text-sm mb-4">
                            Liens utiles
                        </h3>
                        <div className="space-y-2 text-sm">
                            <a
                                href="/PDF_docs/Conditions%20Generales%20de%20Vente.pdf"
                                className="block text-gray-500 hover:text-gray-800 transition-colors"
                            >
                                CGV
                            </a>
                            <a
                                href="/politique-confidentialite"
                                className="block text-gray-500 hover:text-gray-800 transition-colors"
                            >
                                Politique de confidentialité
                            </a>
                            <a
                                href="/PDF_docs/charte_de_la_laicite%20signee%202024.pdf"
                                className="block text-gray-500 hover:text-gray-800 transition-colors"
                            >
                                Charte de la Laïcité
                            </a>
                            <a
                                href="/PDF_docs/Reglement_interieur_SHEVA_2025_v12.pdf"
                                className="block text-gray-500 hover:text-gray-800 transition-colors"
                            >
                                Règlement Intérieur
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8">
                    <p className="text-gray-400 text-xs mb-5 text-center">
                        Partenaires & soutiens
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
                        {partnerLogos.map((l) => (
                            <a
                                key={l.alt}
                                href={l.href}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Image
                                    src={l.src}
                                    alt={l.alt}
                                    width={72}
                                    height={36}
                                    className="object-contain opacity-50 hover:opacity-80 transition-opacity h-8 w-auto"
                                />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-gray-400 text-xs">
                        © 2025 SHEVA. Tous droits réservés.
                    </p>
                </div>
            </div>
        </footer>
    );
}
