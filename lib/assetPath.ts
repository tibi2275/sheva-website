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
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/sheva-website";

export function assetPath(path: string): string {
    // Ne pas préfixer les URLs absolues (http/https) ou les data URIs
    if (!path || path.startsWith("http") || path.startsWith("//") || path.startsWith("data:")) {
        return path;
    }
    return `${basePath}${path}`;
}
