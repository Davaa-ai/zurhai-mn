import { SignHubConfig } from "@/lib/zodiac-hub-config";

interface ZodiacHubTraitsProps {
    traits: string[];
    config: SignHubConfig;
}

export default function ZodiacHubTraits({ traits, config }: ZodiacHubTraitsProps) {
    if (!traits || traits.length === 0) return null;

    return (
        <section className="py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <h3 className="text-foreground/40 text-xs uppercase tracking-[0.2em] text-center mb-6 font-serif">
                    Гол зан чанарууд
                </h3>
                <div className="flex flex-wrap justify-center gap-3">
                    {traits.map((trait) => (
                        <span
                            key={trait}
                            className="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 cursor-default"
                            style={{
                                border: `1px solid ${config.accentColor}30`,
                                backgroundColor: `${config.accentColor}08`,
                                color: config.accentColor,
                                boxShadow: `0 0 20px ${config.accentGlow}`,
                            }}
                        >
                            {trait}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
