import { SignHubConfig } from "@/lib/zodiac-hub-config";
import Link from "next/link";

interface ZodiacHubCTAProps {
    signName: string;
    config: SignHubConfig;
}

export default function ZodiacHubCTA({ signName, config }: ZodiacHubCTAProps) {
    return (
        <section className="py-16 px-4">
            <div className="max-w-3xl mx-auto text-center">
                <div
                    className="relative rounded-3xl overflow-hidden p-10 md:p-14 border border-border shadow-sm"
                    style={{
                        background: `radial-gradient(ellipse at center, ${config.accentGlow} 0%, transparent 70%), var(--card)`,
                    }}
                >
                    {/* Decorative glow */}
                    <div
                        className="absolute -top-20 left-1/2 -translate-x-1/2 w-60 h-60 rounded-full blur-3xl opacity-20 pointer-events-none"
                        style={{ backgroundColor: config.accentColor }}
                    />

                    <div className="relative z-10 space-y-5">
                        <p className="text-foreground/40 text-xs uppercase tracking-[0.2em] font-sans">
                            ✦ Хувийн зурхай ✦
                        </p>
                        <h2 className="text-2xl md:text-3xl font-serif text-foreground leading-snug">
                            {signName} ордны хувийн<br />
                            <span style={{ color: config.accentColor }}>
                                гүнзгий уншлагаа
                            </span>{" "}
                            аваарай
                        </h2>
                        <p className="text-foreground/50 text-sm md:text-base max-w-lg mx-auto">
                            Таны төрсөн он, сар, өдөр дээр үндэслэн AI зурхайч таны
                            хувь төөргийг тооцоолно.
                        </p>
                        <Link
                            href="/#zurhai-form"
                            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-serif font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105"
                            style={{
                                backgroundColor: config.accentColor,
                                color: "#FFFFFF",
                            }}
                        >
                            ✦ Хувь төөргөө тооцоолох
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
