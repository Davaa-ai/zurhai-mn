"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled
                ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between h-14">
                {/* Brand */}
                <Link href="/" className="group flex items-center gap-2">
                    <span className="text-lg font-serif text-primary group-hover:text-primary/80 transition-colors">
                        ☯️ Zurhai<span className="text-foreground/60">.mn</span>
                    </span>
                </Link>

                {/* Links */}
                <div className="flex items-center gap-6">
                    <a
                        href="#zodiac-signs"
                        className="hidden sm:inline-block text-foreground/40 hover:text-primary text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                        12 Жил
                    </a>
                    <Link
                        href="/blog"
                        className="text-foreground/40 hover:text-primary text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                        Нийтлэл
                    </Link>
                    <a
                        href="#zurhai-form"
                        className="inline-flex items-center px-4 py-1.5 text-xs font-semibold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors tracking-wide"
                    >
                        ✦ Зурхай бодох
                    </a>
                </div>
            </div>
        </nav>
    );
}
