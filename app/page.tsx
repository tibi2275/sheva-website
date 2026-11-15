// app/page.tsx — Page d'accueil SHEVA
// ★ Données : articles → lib/newsData.ts · chiffres & logos → lib/homeData.ts
//   Raccourcis → components/home/HomeShortcuts.tsx
//   Entrées « Découvrir » → components/home/HomeDiscover.tsx

import Image from "next/image";
import { assetPath } from "@/lib/assetPath";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
// import { AnnouncementModal } from "@/components/AnnouncementModal";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeShortcuts } from "@/components/home/HomeShortcuts";
import { HomeNews } from "@/components/home/HomeNews";
import { HomeSocial } from "@/components/home/HomeSocial";
import { HomeDiscover } from "@/components/home/HomeDiscover";
import { articles } from "@/lib/newsData";
import { qualityLabels, ffeLogos } from "@/lib/homeData";
import "@/components/home/home.css";

function Labels() {
    return (
        <section className="hm-labels">
            <div className="hm-wrap hm-labels-row">
                <a
                    href="https://www.ffe.com/pratiquer/labels"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontWeight: 700, fontSize: 15, color: "#0F2A2C", textDecoration: "none" }}
                >
                    Labellisé par la FFE
                </a>
                <div className="hm-labels-logos">
                    {[...qualityLabels, ...ffeLogos].map((l) => (
                        <Image key={l.alt} src={assetPath(l.src)} alt={l.alt} width={88} height={44} />
                    ))}
                </div>
                <a
                    href="https://www.telemat.org/FFE/sif/-ident"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontWeight: 600, fontSize: 14, color: "#2E6E73" }}
                >
                    Mon compte FFE
                </a>
            </div>
        </section>
    );
}

export default function HomePage() {
    return (
        <>
            {/* <AnnouncementModal /> */}
            <Nav transparent />
            <main className="hm-root" style={{ background: "#fff", color: "#0F2A2C" }}>
                <HomeHero />
                <HomeShortcuts />
                <HomeNews articles={articles} />
                <HomeSocial />
                <HomeDiscover />
                <Labels />
            </main>
            <Footer />
        </>
    );
}
