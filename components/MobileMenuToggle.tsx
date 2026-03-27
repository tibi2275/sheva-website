"use client";

import { useEffect } from "react";

/**
 * MobileMenuToggle — client component that wires up the mobile menu button.
 * Drop this anywhere in the layout, it doesn't render anything visible.
 */
export function MobileMenuToggle() {
    useEffect(() => {
        const btn = document.getElementById("mobile-menu-btn");
        const menu = document.getElementById("mobile-menu");
        if (!btn || !menu) return;

        const toggle = () => {
            const isOpen = menu.classList.toggle("open");
            btn.setAttribute("aria-expanded", String(isOpen));
            // Swap hamburger ↔ close icon
            btn.innerHTML = isOpen
                ? `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"/>
           </svg>`
                : `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16"/>
           </svg>`;
        };

        btn.addEventListener("click", toggle);

        // Close on outside click
        const outside = (e: MouseEvent) => {
            if (
                !btn.contains(e.target as Node) &&
                !menu.contains(e.target as Node)
            ) {
                menu.classList.remove("open");
                btn.setAttribute("aria-expanded", "false");
            }
        };
        document.addEventListener("click", outside);

        return () => {
            btn.removeEventListener("click", toggle);
            document.removeEventListener("click", outside);
        };
    }, []);

    return null;
}
