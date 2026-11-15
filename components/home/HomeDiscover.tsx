"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { assetPath } from "@/lib/assetPath";
import { stats } from "@/lib/homeData";
import { ArrowRight } from "./Icons";
import { Reveal } from "./Reveal";

// ★ Entrées « Découvrir la SHEVA » — modifier titres, textes, photos et liens ici
const ENTRIES = [
    { t: "Le centre", d: "Manèges, carrière et prés au cœur du parc de Choisy.", href: "/centre", img: "/images/Images-illustrations/carriere-illustration.avif" },
    { t: "Les chevaux", d: "Plus de 40 chevaux et poneys choisis pour leur caractère et leurs qualités pédagogiques.", href: "/chevaux", img: "/images/Images-illustrations/chevaux-illustration.avif" },
    { t: "Planning & tarifs", d: "Toutes les reprises de la semaine et les forfaits de la saison.", href: "/planning", img: "/images/Images-illustrations/planning-illustration.JPG" },
    { t: "L'association", d: "Une association loi 1901 et ses 670 licenciés.", href: "/centre#association", img: "/images/Images-illustrations/clubhousenew.jpg" },
    { t: "L'équipe", d: "Les personnes qui font vivre le club au quotidien.", href: "/centre#equipe", img: "/images/Images-illustrations/compet_club.jpeg" },
    { t: "Les activités", d: "Cours, stages, examens et compétition.", href: "/activites", img: "/images/Images-illustrations/activites-illustration.avif" },
    { t: "Équicoaching", d: "Des séances au contact des chevaux pour apprendre à mieux se connaître.", href: "/equicoaching", img: "/images/equicoaching/IMG_5225.JPEG" },
    { t: "Infos pratiques", d: "Accès, horaires, contact et FAQ.", href: "/infos", img: "/images/Images-illustrations/centre-illustration.avif" },
];

const ROWS = [ENTRIES.slice(0, 4), ENTRIES.slice(4)];

export function HomeDiscover() {
    // Panneau ouvert dans chaque rangée
    const [open, setOpen] = useState<[number, number]>([0, 0]);
    const pick = (row: number, i: number) =>
        setOpen((o) => (row === 0 ? [i, o[1]] : [o[0], i]));

    return (
        <section className="hm-discover">
            <div className="hm-wrap">
                <Reveal>
                    <div className="hm-disc-head">
                        <h2 className="hm-h2 hm-display">Découvrir la SHEVA</h2>
                        <div className="hm-stats">
                            {stats.slice(0, 3).map((s) => (
                                <div key={s.label}>
                                    <div className="hm-stat-v">{s.value}</div>
                                    <div className="hm-stat-l">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Reveal>

                {/* Ordinateur : panneaux en accordéon */}
                <Reveal delay={100}>
                    <div className="hm-panels">
                        {ROWS.map((row, r) => (
                            <div key={r} className="hm-panel-row">
                                {row.map((e, i) => {
                                    const isOpen = open[r] === i;
                                    return (
                                        <Link
                                            key={e.t}
                                            href={e.href}
                                            className={`hm-panel${isOpen ? " is-open" : ""}`}
                                            onMouseEnter={() => pick(r, i)}
                                            onFocus={() => pick(r, i)}
                                        >
                                            <Image src={assetPath(e.img)} alt="" fill sizes="(max-width: 1280px) 50vw, 640px" />
                                            <span className="hm-panel-shade" />
                                            <span className="hm-panel-body">
                                                <span className="hm-panel-title hm-display">{e.t}</span>
                                                <span className="hm-panel-more" aria-hidden={!isOpen}>
                                                    <div>
                                                        <p className="hm-panel-desc">{e.d}</p>
                                                        <span className="hm-panel-cta">
                                                            Découvrir <span className="hm-arrow"><ArrowRight width={16} height={16} /></span>
                                                        </span>
                                                    </div>
                                                </span>
                                            </span>
                                        </Link>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </Reveal>
            </div>

            {/* Mobile : cartes au doigt */}
            <div className="hm-disc-mobile hm-snap">
                {ENTRIES.map((e) => (
                    <Link key={e.t} href={e.href} className="hm-disc-card">
                        <Image src={assetPath(e.img)} alt="" fill sizes="260px" />
                        <span className="hm-panel-shade" />
                        <span style={{ position: "absolute", left: 18, right: 18, bottom: 18 }}>
                            <span className="hm-display" style={{ display: "block", fontSize: 21 }}>{e.t}</span>
                            <span style={{ display: "block", marginTop: 6, fontSize: 13, lineHeight: 1.5, opacity: 0.9 }}>{e.d}</span>
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
}
