import { SignHubConfig } from "@/lib/zodiac-hub-config";

interface StatItem {
    label: string;
    value: string;
    icon?: string;
}

interface ZodiacHubStatsProps {
    stats: StatItem[];
    config: SignHubConfig;
}

export default function ZodiacHubStats({ stats, config }: ZodiacHubStatsProps) {
    if (stats.length === 0) return null;

    return (
        <section className="py-8 px-4">
            <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="relative bg-card border border-border backdrop-blur-md px-7 py-4 rounded-2xl flex flex-col items-center min-w-[120px] group hover:border-primary/20 transition-all duration-300 shadow-sm"
                        style={{
                            boxShadow: `0 0 30px ${config.accentGlow}`,
                        }}
                    >
                        <span className="text-foreground/40 text-[10px] uppercase tracking-widest block mb-1.5">
                            {stat.label}
                        </span>
                        <span className="text-foreground font-medium text-base flex items-center gap-2">
                            {stat.icon && <span className="text-lg">{stat.icon}</span>}
                            {stat.value}
                        </span>
                        {/* Hover accent border */}
                        <div
                            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                            style={{
                                boxShadow: `inset 0 0 0 1px ${config.accentColor}30`,
                            }}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
