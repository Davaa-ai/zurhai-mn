"use client";

import MysticForm from "@/components/mystic-form";

/* ──────────────────────────────────────
   Decorative SVG helpers — static, 
   no animation, pure aesthetic depth.
   ────────────────────────────────────── */

/** Thin ornamental diamond divider */
function OrnamentDivider({ className = "" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 200 20"
            className={`w-48 h-5 ${className}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Left line */}
            <line x1="0" y1="10" x2="80" y2="10" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
            {/* Center diamond */}
            <path d="M100 2 L108 10 L100 18 L92 10 Z" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.5" />
            <path d="M100 5 L105 10 L100 15 L95 10 Z" fill="currentColor" opacity="0.15" />
            {/* Right line */}
            <line x1="120" y1="10" x2="200" y2="10" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        </svg>
    );
}

/** Corner filigree for the card frame */
function CornerFiligree({ className = "" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 60 60"
            className={`w-12 h-12 ${className}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M0 0 Q30 0 30 30 Q30 0 60 0"
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.25"
            />
            <path
                d="M0 0 Q0 30 30 30 Q0 30 0 60"
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.25"
            />
            <circle cx="30" cy="30" r="2" fill="currentColor" opacity="0.2" />
            <circle cx="2" cy="2" r="1.5" fill="currentColor" opacity="0.3" />
        </svg>
    );
}

/** Small celestial star icon */
function CelestialStar({ className = "" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={`w-4 h-4 ${className}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M12 2 L13.5 9 L20 10 L14 13 L15 20 L12 15 L9 20 L10 13 L4 10 L10.5 9 Z"
                stroke="currentColor"
                strokeWidth="0.6"
                fill="currentColor"
                opacity="0.2"
            />
        </svg>
    );
}

export default function FormSection() {
    return (
        <section
            id="zurhai-form"
            className="relative py-28 md:py-36 px-6 md:px-12 overflow-hidden bg-secondary/50"
        >
            {/* ── Top border line ── */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            {/* ── Subtle dot pattern ── */}
            <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                    backgroundImage: `
                        radial-gradient(1px 1px at 15% 20%, rgba(184, 149, 47, 0.15) 0%, transparent 100%),
                        radial-gradient(1px 1px at 75% 15%, rgba(184, 149, 47, 0.12) 0%, transparent 100%),
                        radial-gradient(1px 1px at 35% 80%, rgba(15, 27, 61, 0.08) 0%, transparent 100%),
                        radial-gradient(1px 1px at 85% 70%, rgba(184, 149, 47, 0.10) 0%, transparent 100%),
                        radial-gradient(1px 1px at 55% 45%, rgba(15, 27, 61, 0.06) 0%, transparent 100%),
                        radial-gradient(1.5px 1.5px at 10% 65%, rgba(184, 149, 47, 0.10) 0%, transparent 100%),
                        radial-gradient(1px 1px at 92% 35%, rgba(184, 149, 47, 0.12) 0%, transparent 100%),
                        radial-gradient(1px 1px at 45% 10%, rgba(15, 27, 61, 0.05) 0%, transparent 100%)
                    `,
                }}
            />

            {/* ── Vertical accent lines on edges ── */}
            <div className="absolute left-[10%] top-12 bottom-12 w-px bg-gradient-to-b from-transparent via-primary/8 to-transparent pointer-events-none" />
            <div className="absolute right-[10%] top-12 bottom-12 w-px bg-gradient-to-b from-transparent via-primary/8 to-transparent pointer-events-none" />

            {/* ── Main content ── */}
            <div className="relative z-10 w-full max-w-lg mx-auto">

                {/* ─── Section header with ornaments ─── */}
                <div className="flex flex-col items-center text-center mb-14">
                    {/* Top ornament divider */}
                    <OrnamentDivider className="text-primary mb-8" />

                    {/* Label */}
                    <span className="text-primary/60 text-[10px] font-semibold tracking-[0.35em] uppercase mb-5">
                        ✦ &nbsp; Эхлэх &nbsp; ✦
                    </span>

                    {/* Heading */}
                    <h2 className="text-3xl md:text-5xl font-serif text-foreground leading-tight">
                        Зурхайгаа{" "}
                        <span className="hero-gradient-text italic">Бодуулах</span>
                    </h2>

                    {/* Sub-heading with celestial stars */}
                    <div className="flex items-center gap-3 mt-6">
                        <CelestialStar className="text-primary/40" />
                        <p className="text-foreground/40 text-sm md:text-base max-w-[380px] leading-relaxed font-serif">
                            Таны төрсөн өдөр + 7 асуултын хариултанд тулгуурлан
                            Gemini AI хувийн зурхай үүсгэнэ.
                        </p>
                        <CelestialStar className="text-primary/40" />
                    </div>

                    {/* Bottom ornament divider */}
                    <OrnamentDivider className="text-primary mt-8" />
                </div>

                {/* ─── Form card with ornamental frame ─── */}
                <div className="relative">
                    {/* Corner filigrees */}
                    <CornerFiligree className="absolute -top-3 -left-3 text-primary" />
                    <CornerFiligree className="absolute -top-3 -right-3 text-primary rotate-90" />
                    <CornerFiligree className="absolute -bottom-3 -left-3 text-primary -rotate-90" />
                    <CornerFiligree className="absolute -bottom-3 -right-3 text-primary rotate-180" />

                    {/* Card */}
                    <div
                        className="relative rounded-2xl p-px"
                        style={{
                            background: `linear-gradient(135deg, rgba(184, 149, 47, 0.20) 0%, rgba(184, 149, 47, 0.06) 30%, rgba(15, 27, 61, 0.08) 50%, rgba(184, 149, 47, 0.06) 70%, rgba(184, 149, 47, 0.20) 100%)`,
                        }}
                    >
                        <div className="rounded-[15px] overflow-hidden bg-card shadow-lg">
                            {/* Subtle top gold line inside card */}
                            <div className="h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />

                            <div className="px-6 py-8 md:px-8 md:py-10">
                                <MysticForm />
                            </div>

                            {/* Subtle bottom gold line inside card */}
                            <div className="h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
                        </div>
                    </div>
                </div>

                {/* ─── Bottom trust line ─── */}
                <div className="flex items-center justify-center gap-2 mt-10">
                    <div className="h-px w-8 bg-primary/15" />
                    <span className="text-foreground/25 text-[10px] tracking-[0.2em] uppercase font-serif">
                        Powered by Gemini AI
                    </span>
                    <div className="h-px w-8 bg-primary/15" />
                </div>
            </div>

            {/* ── Bottom border line ── */}
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </section>
    );
}
