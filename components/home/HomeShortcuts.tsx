import Link from "next/link";
import Image from "next/image";
import { assetPath } from "@/lib/assetPath";
import { ArrowRight, UserIcon, TrophyIcon, InfoIcon, CompassIcon } from "./Icons";
import { Reveal } from "./Reveal";

// ★ Raccourcis de l'accueil — modifier les liens ici
const ESPACE_MEMBRE = "https://cloud6.kavalog.fr/SHEVA/";

export function HomeShortcuts() {
    return (
        <section className="hm-bento-sec">
            <div className="hm-wrap">
                <Reveal>
                    <div className="hm-bento">
                        {/* Planning & tarifs — grande tuile photo */}
                        <Link href="/planning" className="hm-tile hm-tile-big" style={{ color: "#fff", background: "#0F2A2C" }}>
                            <Image
                                src={assetPath("/images/Images-illustrations/planning-illustration.JPG")}
                                alt=""
                                fill
                                sizes="(max-width: 1023px) 100vw, 640px"
                                className="hm-tile-img"
                            />
                            <span className="hm-tile-shade" />
                            <span className="hm-tile-foot" style={{ position: "relative" }}>
                                <span>
                                    <span className="hm-display hm-tile-big-title" style={{ display: "block", fontSize: 40, lineHeight: 1 }}>
                                        Planning &amp; tarifs
                                    </span>
                                    <span className="hm-tile-big-sub" style={{ marginTop: 10, fontSize: 15, opacity: 0.9, maxWidth: 380 }}>
                                        Toutes les reprises de la semaine, filtrées par niveau, et les forfaits de la saison.
                                    </span>
                                </span>
                                <span className="hm-arrow" style={{ flex: "none", width: 56, height: 56, borderRadius: "50%", background: "#D9480F", display: "grid", placeItems: "center" }}>
                                    <ArrowRight width={22} height={22} />
                                </span>
                            </span>
                        </Link>

                        {/* Mon espace membre */}
                        <a href={ESPACE_MEMBRE} target="_blank" rel="noopener noreferrer" className="hm-tile" style={{ background: "#0F2A2C", color: "#fff" }}>
                            <span className="hm-tile-icon" style={{ background: "rgba(255,255,255,.1)", color: "#8FD3CD" }}>
                                <UserIcon />
                            </span>
                            <span>
                                <span className="hm-tile-label">Mon espace membre</span>
                                <span className="hm-tile-sub" style={{ color: "rgba(255,255,255,.75)" }}>Réserver, décommander un cours</span>
                            </span>
                        </a>

                        {/* Activités & stages — couleur pleine */}
                        <Link href="/activites" className="hm-tile" style={{ background: "#2E6E73", color: "#fff" }}>
                            <span className="hm-tile-icon" style={{ background: "rgba(255,255,255,.14)", color: "#fff" }}>
                                <TrophyIcon />
                            </span>
                            <span>
                                <span className="hm-tile-label">Activités &amp; stages</span>
                                <span className="hm-tile-sub" style={{ color: "rgba(255,255,255,.85)" }}>Cours, examens, compétition</span>
                            </span>
                        </Link>

                        {/* Infos pratiques */}
                        <Link href="/infos" className="hm-tile" style={{ background: "#fff", color: "#0F2A2C", border: "1px solid #DCE7E6" }}>
                            <span className="hm-tile-icon" style={{ background: "#EEF5F4", color: "#2E6E73" }}>
                                <InfoIcon />
                            </span>
                            <span>
                                <span className="hm-tile-label">Infos pratiques</span>
                                <span className="hm-tile-sub" style={{ color: "#3D5759" }}>Accès, horaires, contact, FAQ</span>
                            </span>
                        </Link>

                        {/* Découvrir le club */}
                        <Link href="/centre" className="hm-tile" style={{ background: "#D9480F", color: "#fff" }}>
                            <span className="hm-tile-icon" style={{ background: "rgba(255,255,255,.16)", color: "#fff" }}>
                                <CompassIcon />
                            </span>
                            <span className="hm-tile-foot">
                                <span>
                                    <span className="hm-tile-label">Découvrir le club</span>
                                    <span className="hm-tile-sub" style={{ color: "rgba(255,255,255,.9)" }}>Le centre, l&apos;association, l&apos;équipe</span>
                                </span>
                                <span className="hm-arrow">
                                    <ArrowRight width={22} height={22} />
                                </span>
                            </span>
                        </Link>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
