/**
 * Préfixe un chemin d'asset avec le basePath du site.
 *
 * À utiliser pour tout élément HTML brut qui ne passe PAS par les composants
 * Next.js (qui gèrent le basePath automatiquement) :
 *   - <video src> / <source src> / <video poster>
 *   - <a href="/PDF_docs/..."> ou <a href="/images/...">
 *   - backgroundImage: `url(...)` en inline style
 *
 * Exemples :
 *   assetPath("/images/photo.jpg")   → "/sheva-website/images/photo.jpg"  (prod)
 *   assetPath("/images/photo.jpg")   → "/images/photo.jpg"                 (dev)
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function assetPath(path: string): string {
    return `${basePath}${path}`;
}
