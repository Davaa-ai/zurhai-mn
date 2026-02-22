import { SignHubConfig } from "@/lib/zodiac-hub-config";
import Link from "next/link";

interface ZodiacHubSiblingsProps {
    prev: SignHubConfig | null;
    next: SignHubConfig | null;
    basePath: string; // "/zodiac" or "/eastern"
}

export default function ZodiacHubSiblings({ prev, next, basePath }: ZodiacHubSiblingsProps) {
    if (!prev && !next) return null;

    return (
        <section className="py-12 px-4 border-t border-border">
            <div className="max-w-4xl mx-auto">
                <p className="text-foreground/30 text-xs uppercase tracking-[0.2em] text-center mb-8 font-serif">
                    Бусад ордууд
                </p>
                <div className="flex items-stretch justify-between gap-4">
                    {/* Prev */}
                    {prev ? (
                        <Link
                            href={`${basePath}/${prev.slug}`}
                            className="group flex-1 flex items-center gap-4 bg-card border border-border rounded-2xl p-5 hover:border-primary/20 transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                            <span className="text-foreground/30 text-sm group-hover:text-foreground/60 transition-colors">←</span>
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{prev.icon}</span>
                                <div>
                                    <p className="text-foreground/40 text-[10px] uppercase tracking-wider">Өмнөх</p>
                                    <p className="text-foreground font-serif text-lg group-hover:text-primary transition-colors">
                                        {prev.mongolianName}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ) : (
                        <div className="flex-1" />
                    )}

                    {/* Next */}
                    {next ? (
                        <Link
                            href={`${basePath}/${next.slug}`}
                            className="group flex-1 flex items-center justify-end gap-4 bg-card border border-border rounded-2xl p-5 hover:border-primary/20 transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                            <div className="flex items-center gap-3">
                                <div className="text-right">
                                    <p className="text-foreground/40 text-[10px] uppercase tracking-wider">Дараах</p>
                                    <p className="text-foreground font-serif text-lg group-hover:text-primary transition-colors">
                                        {next.mongolianName}
                                    </p>
                                </div>
                                <span className="text-2xl">{next.icon}</span>
                            </div>
                            <span className="text-foreground/30 text-sm group-hover:text-foreground/60 transition-colors">→</span>
                        </Link>
                    ) : (
                        <div className="flex-1" />
                    )}
                </div>
            </div>
        </section>
    );
}
