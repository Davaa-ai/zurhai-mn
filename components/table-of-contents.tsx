"use client";

import React, { useEffect, useState, useCallback } from "react";
import { List, ChevronDown, ChevronUp } from "lucide-react";
import type { TocItem } from "@/lib/toc-utils";

// Re-export for convenience
export type { TocItem } from "@/lib/toc-utils";
export { extractHeadings } from "@/lib/toc-utils";

interface TableOfContentsProps {
    headings: TocItem[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>("");
    const [isOpen, setIsOpen] = useState(false);
    const [progress, setProgress] = useState(0);

    // Track which heading is currently in view
    useEffect(() => {
        if (headings.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (a, b) =>
                            a.boundingClientRect.top - b.boundingClientRect.top
                    );

                if (visible.length > 0) {
                    setActiveId(visible[0].target.id);
                }
            },
            {
                rootMargin: "-80px 0px -60% 0px",
                threshold: 0,
            }
        );

        headings.forEach((heading) => {
            const el = document.getElementById(heading.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [headings]);

    // Track scroll progress
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight =
                document.documentElement.scrollHeight - window.innerHeight;
            setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollTo = useCallback((id: string) => {
        const el = document.getElementById(id);
        if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top, behavior: "smooth" });
            setActiveId(id);
            setIsOpen(false);
        }
    }, []);

    if (headings.length === 0) return null;

    return (
        <>
            {/* ═══════════════════════════════════════════════
                MOBILE: Collapsible dropdown at top
            ═══════════════════════════════════════════════ */}
            <div className="toc-mobile">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="toc-mobile-toggle"
                    aria-expanded={isOpen}
                    aria-label="Агуулгын хүснэгт"
                >
                    <List className="w-4 h-4" />
                    <span>Агуулга</span>
                    {isOpen ? (
                        <ChevronUp className="w-4 h-4 ml-auto" />
                    ) : (
                        <ChevronDown className="w-4 h-4 ml-auto" />
                    )}
                </button>

                {isOpen && (
                    <nav className="toc-mobile-nav" aria-label="Агуулгын жагсаалт">
                        <ul>
                            {headings.map((heading) => (
                                <li key={heading.id}>
                                    <button
                                        onClick={() => scrollTo(heading.id)}
                                        className={`toc-mobile-link ${heading.level === "h3"
                                                ? "toc-indent"
                                                : ""
                                            } ${activeId === heading.id
                                                ? "toc-active"
                                                : ""
                                            }`}
                                    >
                                        {heading.text}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )}
            </div>

            {/* ═══════════════════════════════════════════════
                DESKTOP: Sticky sidebar
            ═══════════════════════════════════════════════ */}
            <aside className="toc-sidebar" aria-label="Агуулгын хүснэгт">
                {/* Reading progress bar */}
                <div className="toc-progress-track">
                    <div
                        className="toc-progress-bar"
                        style={{ height: `${progress}%` }}
                    />
                </div>

                <div className="toc-sidebar-inner">
                    <p className="toc-sidebar-title">
                        <List className="w-3.5 h-3.5" />
                        Агуулга
                    </p>

                    <nav>
                        <ul className="toc-sidebar-list">
                            {headings.map((heading) => (
                                <li key={heading.id}>
                                    <button
                                        onClick={() => scrollTo(heading.id)}
                                        className={`toc-sidebar-link ${heading.level === "h3"
                                                ? "toc-indent"
                                                : ""
                                            } ${activeId === heading.id
                                                ? "toc-active"
                                                : ""
                                            }`}
                                    >
                                        {heading.level === "h2" && (
                                            <span className="toc-dot" />
                                        )}
                                        {heading.text}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    );
}
