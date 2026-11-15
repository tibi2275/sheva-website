// Icônes au trait (24×24) utilisées sur l'accueil et les heros de pages
import type { SVGProps } from "react";

const base = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
};

export const ArrowRight = (p: SVGProps<SVGSVGElement>) => (
    <svg {...base} strokeWidth={2.2} width={18} height={18} {...p}>
        <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
);
export const ArrowLeft = (p: SVGProps<SVGSVGElement>) => (
    <svg {...base} strokeWidth={2.2} width={18} height={18} {...p}>
        <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
);
export const UserIcon = (p: SVGProps<SVGSVGElement>) => (
    <svg {...base} {...p}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
);
export const TrophyIcon = (p: SVGProps<SVGSVGElement>) => (
    <svg {...base} {...p}>
        <path d="M8 4h8v5a4 4 0 0 1-8 0z" />
        <path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M9 20h6" />
    </svg>
);
export const InfoIcon = (p: SVGProps<SVGSVGElement>) => (
    <svg {...base} {...p}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5M12 8h.01" />
    </svg>
);
export const CompassIcon = (p: SVGProps<SVGSVGElement>) => (
    <svg {...base} {...p}>
        <circle cx="12" cy="12" r="9" />
        <path d="M15.5 8.5l-2 5-5 2 2-5z" />
    </svg>
);
export const InstaIcon = (p: SVGProps<SVGSVGElement>) => (
    <svg {...base} width={18} height={18} {...p}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
);
export const CloseIcon = (p: SVGProps<SVGSVGElement>) => (
    <svg {...base} strokeWidth={2.2} width={18} height={18} {...p}>
        <path d="M6 6l12 12M18 6L6 18" />
    </svg>
);
export const PauseIcon = (p: SVGProps<SVGSVGElement>) => (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
        <rect x="6" y="5" width="4" height="14" rx="1" />
        <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
);
export const PlayIcon = (p: SVGProps<SVGSVGElement>) => (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
        <path d="M8 5.5v13l11-6.5z" />
    </svg>
);
