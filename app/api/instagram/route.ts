// app/api/instagram/route.ts
// ─────────────────────────────────────────────────────────────────────────────
// Récupère les N derniers posts du compte Instagram via le Graph API de Meta.
//
// SETUP (à faire une fois) :
//   1. Va sur https://developers.facebook.com/ → crée une App (type "Consumer")
//   2. Ajoute le produit "Instagram Basic Display"
//   3. Génère un token utilisateur → échange-le contre un long-lived token
//      (valable 60 jours, voir https://developers.facebook.com/docs/instagram-basic-display-api/guides/long-lived-access-tokens)
//   4. Copie le token dans ton fichier .env.local :
//        INSTAGRAM_ACCESS_TOKEN=ton_token_ici
//
// NOTE : Le token expire au bout de 60 jours. Pour éviter ça, cette route
// appelle automatiquement l'endpoint de refresh à chaque requête.
// ─────────────────────────────────────────────────────────────────────────────

import { NextResponse } from "next/server";

export const revalidate = 3600; // revalide le cache toutes les heures

const FIELDS = "id,media_type,media_url,thumbnail_url,permalink,timestamp,caption";
const LIMIT = 5;

export async function GET() {
    const token = process.env.INSTAGRAM_ACCESS_TOKEN;

    if (!token) {
        return NextResponse.json(
            { error: "INSTAGRAM_ACCESS_TOKEN manquant dans .env.local" },
            { status: 500 },
        );
    }

    try {
        // ── 1. Refresh silencieux du token (prolonge la durée de vie à 60 j)
        await fetch(
            `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`,
        ).catch(() => {
            // Non bloquant — si le refresh échoue on continue quand même
        });

        // ── 2. Récupération des posts
        const res = await fetch(
            `https://graph.instagram.com/me/media?fields=${FIELDS}&limit=${LIMIT}&access_token=${token}`,
            { next: { revalidate: 3600 } },
        );

        if (!res.ok) {
            const err = await res.json();
            console.error("[Instagram API]", err);
            return NextResponse.json(
                { error: "Erreur Graph API Instagram", detail: err },
                { status: res.status },
            );
        }

        const data = await res.json();

        // On normalise : les videos n'ont pas de media_url mais ont thumbnail_url
        const posts = (data.data ?? []).map((p: any) => ({
            id: p.id,
            media_type: p.media_type,
            image_url: p.media_type === "VIDEO" ? p.thumbnail_url : p.media_url,
            permalink: p.permalink,
            timestamp: p.timestamp,
            caption: p.caption ?? "",
        }));

        return NextResponse.json({ posts });
    } catch (e) {
        console.error("[Instagram API] fetch error", e);
        return NextResponse.json({ error: "Erreur réseau" }, { status: 500 });
    }
}
