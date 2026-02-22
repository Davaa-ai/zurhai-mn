import { SignHubConfig } from "@/lib/zodiac-hub-config";
import Link from "next/link";

interface ZodiacHubHeroProps {
    signName: string;
    subtitle?: string;         // e.g. dates for Western, years for Eastern
    categoryLabel: string;     // "Өрнийн орд" or "Дорнын зурхай"
    config: SignHubConfig;
    backHref?: string;
}

export default function ZodiacHubHero({
    signName,
    subtitle,
    categoryLabel,
    config,
    backHref = "/",
}: ZodiacHubHeroProps) {
    return (
        <section className="relative w-full overflow-hidden">
            {/* Hero Image Placeholder */}
            <div
                className="relative w-full aspect-[21/9] md:aspect-[3/1] min-h-[340px] max-h-[520px] flex items-end justify-center"
                style={{ background: config.heroGradient }}
            >
                {/* Decorative constellation dots */}
                <div className="absolute inset-0 star-field opacity-40" />

                {/* Centered sign icon — large, translucent */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span
                        className="text-[120px] md:text-[180px] lg:text-[220px] opacity-[0.08] select-none"
                        style={{ filter: `drop-shadow(0 0 60px ${config.accentColor})` }}
                    >
                        {config.icon}
                    </span>
                </div>

                {/* Bottom gradient fade into page bg */}
                <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-background via-background/80 to-transparent z-[1]" />

                {/* Image placeholder label */}
                <div className="absolute top-6 right-6 z-10 bg-foreground/5 border border-foreground/10 backdrop-blur-sm px-4 py-2 rounded-xl">
                    <span className="text-foreground/30 text-xs font-mono tracking-wider">IMAGE PLACEHOLDER</span>
                </div>

                {/* Content overlay */}
                <div className="relative z-10 text-center pb-10 md:pb-14 px-6 space-y-4">
                    <Link
                        href={backHref}
                        className="inline-block text-foreground/40 text-sm hover:text-foreground/70 transition-colors mb-2"
                    >
                        ← Нүүр хуудас
                    </Link>

                    <p
                        className="text-xs font-semibold tracking-[0.25em] uppercase"
                        style={{ color: config.accentColor }}
                    >
                        {categoryLabel}
                    </p>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-foreground tracking-tight leading-none">
                        {signName}
                    </h1>

                    {subtitle && (
                        <p className="text-foreground/50 text-lg md:text-xl font-light tracking-wide">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>

            {/* Accent line at bottom */}
            <div
                className="h-[2px] w-full"
                style={{
                    background: `linear-gradient(90deg, transparent, ${config.accentColor}40, transparent)`,
                }}
            />
        </section>
    );
}
