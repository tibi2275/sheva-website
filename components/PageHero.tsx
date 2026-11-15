import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { assetPath } from "@/lib/assetPath";
import "./PageHero.css";

/**
 * Hero commun des pages intérieures : grande photo, fil d'Ariane, titre,
 * sous-titre, boutons d'action et liens d'ancre en pastilles.
 * À utiliser avec <Nav transparent /> et sans padding-top sur <main>.
 *
 *   <PageHero
 *     crumbs={[{ label: "Le centre équestre" }]}
 *     title="Le Centre Équestre SHEVA"
 *     subtitle="…"
 *     image="/images/Images-illustrations/carriere-illustration.avif"
 *     links={[{ label: "Notre histoire", href: "#histoire" }]}
 *   />
 *
 * Pour une pastille qui n'est pas un simple lien (bouton, onClick…), la passer
 * en `extraLinks` avec className="pg-chip". Pour des boutons : `actions`,
 * avec className="pg-btn pg-btn-primary" ou "pg-btn pg-btn-glass".
 */
export function PageHero({
    crumbs,
    title,
    subtitle,
    image,
    imagePosition = "center",
    links,
    extraLinks,
    actions,
    top,
}: {
    /** Étapes après « Accueil ». La dernière est la page courante (sans href). */
    crumbs: { label: string; href?: string }[];
    title: ReactNode;
    subtitle?: ReactNode;
    /** Chemin dans /public, ex. "/images/Images-illustrations/xxx.jpg" */
    image: string;
    imagePosition?: string;
    links?: { label: string; href: string }[];
    extraLinks?: ReactNode;
    actions?: ReactNode;
    /** Contenu au-dessus du titre (ex. un logo) */
    top?: ReactNode;
}) {
    return (
        <section className="pg-hero">
            <Image
                src={assetPath(image)}
                alt=""
                fill
                priority
                sizes="100vw"
                className="pg-hero-img"
                style={{ objectPosition: imagePosition }}
            />
            <div className="pg-hero-shade" />
            <div className="pg-hero-inner">
                <nav aria-label="Fil d'Ariane" className="pg-crumbs">
                    <Link href="/">Accueil</Link>
                    {crumbs.map((c, i) => (
                        <span key={c.label} style={{ display: "contents" }}>
                            <span aria-hidden>›</span>
                            {c.href && i < crumbs.length - 1 ? (
                                <Link href={c.href}>{c.label}</Link>
                            ) : (
                                <span aria-current="page">{c.label}</span>
                            )}
                        </span>
                    ))}
                </nav>
                {top && <div className="pg-hero-top">{top}</div>}
                <h1 className="pg-hero-title">{title}</h1>
                {subtitle && <p className="pg-hero-sub">{subtitle}</p>}
                {actions && <div className="pg-hero-actions">{actions}</div>}
                {(links?.length || extraLinks) && (
                    <nav aria-label="Dans cette page" className="pg-hero-links">
                        {links?.map((l) => (
                            <a key={l.href} href={l.href} className="pg-chip">
                                {l.label}
                            </a>
                        ))}
                        {extraLinks}
                    </nav>
                )}
            </div>
        </section>
    );
}
