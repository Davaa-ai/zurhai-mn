"use client";

import { useState } from "react";
import { X, Sparkles, ArrowRight } from "lucide-react";
import { ZODIAC_SIGNS, ZodiacSign } from "@/lib/zodiac-data";
import { WESTERN_ZODIAC, EXPLORE_CATEGORIES, WesternSign } from "@/lib/categories-data";
import { cn } from "@/lib/utils";
import { TarotCard } from "@/components/ui/tarot-card";

export default function CategoriesSection() {
    const [selectedSign, setSelectedSign] = useState<ZodiacSign | WesternSign | null>(null);

    const isEasternSign = (sign: ZodiacSign | WesternSign): sign is ZodiacSign => {
        return 'years' in sign;
    };

    return (
        <section id="zodiac-signs" className="relative py-24 px-6 md:px-12 star-field overflow-hidden">
            <div className="max-w-6xl mx-auto space-y-20 relative z-10">

                {/* ── Section Header ── */}
                <div className="text-center space-y-4">
                    <span className="text-primary/80 text-xs font-semibold tracking-[0.25em] uppercase flex items-center justify-center gap-2">
                        <Sparkles className="w-3 h-3 text-primary" />
                        Зурхайн Ангилал
                        <Sparkles className="w-3 h-3 text-primary" />
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif text-primary">
                        Зурхайн{" "}
                        <span className="hero-gradient-text italic">Төрлүүд</span>
                    </h2>
                    <p className="text-foreground/60 max-w-lg mx-auto text-sm md:text-base leading-relaxed font-serif">
                        Өрнө дорнын зурхайн уламжлалт мэдлэг, нэг дороос. Өөрийн ордоо сонгон өнөөдрийн бяцхан төөргийг тайл.
                    </p>
                    <div className="section-divider mt-6" />
                </div>

                {/* ── Two-Column: Western & Eastern ── */}
                <div className="grid md:grid-cols-2 gap-8">

                    {/* Western Zurhai */}
                    <div className={cn(
                        "relative bg-card border border-border rounded-2xl overflow-hidden group",
                        "shadow-sm hover:shadow-lg hover:shadow-primary/5",
                        "hover:border-primary/30 transition-all duration-300"
                    )}>
                        <div className="px-6 pt-6 pb-4 border-b border-border flex items-center gap-4 bg-gradient-to-b from-primary/5 to-transparent">
                            <span className="text-4xl">
                                ♈
                            </span>
                            <div>
                                <h3 className="text-foreground tracking-wide font-serif text-2xl group-hover:text-primary transition-colors">
                                    Өрнийн Зурхай
                                </h3>
                                <p className="text-primary/60 text-xs tracking-wider uppercase mt-1">Western Zodiac · 12 тэмдэг</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-px bg-border">
                            {WESTERN_ZODIAC.map((sign) => (
                                <div
                                    key={sign.name}
                                    onClick={() => setSelectedSign(sign)}
                                    className="bg-card px-4 py-4 hover:bg-primary/5 transition-colors duration-200 cursor-pointer group/item relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                    <div className="flex flex-col items-center gap-2 relative z-10 text-center">
                                        <span className="text-2xl opacity-70 group-hover/item:scale-110 group-hover/item:opacity-100 transition-transform">{sign.emoji}</span>
                                        <div>
                                            <p className="text-foreground/90 text-sm font-serif group-hover/item:text-primary transition-colors">
                                                {sign.mongolianName}
                                            </p>
                                            <p className="text-foreground/40 text-[9px] tracking-wider mt-0.5">
                                                {sign.dates}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Eastern Zurhai */}
                    <div className={cn(
                        "relative bg-card border border-border rounded-2xl overflow-hidden group",
                        "shadow-sm hover:shadow-lg hover:shadow-primary/5",
                        "hover:border-primary/30 transition-all duration-300"
                    )}>
                        <div className="px-6 pt-6 pb-4 border-b border-border flex items-center gap-4 bg-gradient-to-b from-primary/5 to-transparent">
                            <span className="text-4xl">
                                🐉
                            </span>
                            <div>
                                <h3 className="text-foreground tracking-wide font-serif text-2xl group-hover:text-primary transition-colors">
                                    Дорнын Зурхай
                                </h3>
                                <p className="text-primary/60 text-xs tracking-wider uppercase mt-1">Eastern Zodiac · 12 амьтан</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-px bg-border">
                            {ZODIAC_SIGNS.map((sign) => (
                                <div
                                    key={sign.name}
                                    onClick={() => setSelectedSign(sign)}
                                    className="bg-card px-4 py-4 hover:bg-primary/5 transition-colors duration-200 cursor-pointer group/item relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                    <div className="flex flex-col items-center gap-2 relative z-10 text-center">
                                        <span className="text-2xl group-hover/item:scale-110 transition-transform drop-shadow-md">{sign.emoji}</span>
                                        <div>
                                            <p className="text-foreground/90 text-sm font-serif group-hover/item:text-primary transition-colors">
                                                {sign.name}
                                            </p>
                                            <div className="mt-1 flex justify-center gap-1">
                                                <span
                                                    className="inline-block text-[9px] px-1.5 py-px rounded-full font-medium"
                                                    style={{
                                                        backgroundColor: `${sign.elementColor}15`,
                                                        color: sign.elementColor,
                                                        border: `1px solid ${sign.elementColor}30`,
                                                    }}
                                                >
                                                    {sign.element}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Divider ── */}
                <div className="section-divider" />

                {/* ── Explore More Categories ── */}
                <div className="space-y-10">
                    <div className="text-center space-y-3">
                        <span className="text-primary/80 text-xs font-semibold tracking-[0.25em] uppercase">
                            ✦ Нэмэлт Боломжууд ✦
                        </span>
                        <h3 className="text-2xl md:text-4xl font-serif text-primary">
                            Судлах <span className="hero-gradient-text italic">Зүйлс</span>
                        </h3>
                    </div>

                    {/* Category cards grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-0">
                        {EXPLORE_CATEGORIES.map((cat) => {
                            const Wrapper = cat.href ? "a" : "div";
                            const wrapperProps = cat.href ? { href: cat.href } : {};

                            return (
                                <div key={cat.title}>
                                    <Wrapper
                                        {...wrapperProps}
                                        className={cn(
                                            "group block relative bg-card border border-border rounded-2xl p-6 h-full shadow-sm",
                                            cat.href ? "cursor-pointer hover:border-primary/30 hover:shadow-md" : "cursor-default",
                                            "transition-all duration-300"
                                        )}
                                    >
                                        <div className="absolute inset-x-5 top-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        <div className="flex flex-col h-full space-y-4">
                                            <div className="w-12 h-12 rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500">
                                                {cat.icon}
                                            </div>

                                            <div className="flex-grow space-y-2">
                                                <h4 className="text-foreground font-serif text-lg group-hover:text-primary transition-colors duration-300">
                                                    {cat.title}
                                                </h4>
                                                <p className="text-foreground/50 text-sm leading-relaxed font-serif">
                                                    {cat.description}
                                                </p>
                                            </div>

                                            <div className="pt-2">
                                                {cat.comingSoon ? (
                                                    <span className="inline-flex items-center text-[10px] text-primary/40 bg-primary/5 uppercase tracking-widest px-3 py-1 rounded-full border border-primary/10">
                                                        Удахгүй
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-2 text-sm text-primary font-serif font-medium group-hover:gap-3 transition-all">
                                                        Үзэх <ArrowRight className="w-4 h-4" />
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </Wrapper>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ── Zodiac Teaser Modal ── */}
            {selectedSign && (
                <>
                    <div
                        onClick={() => setSelectedSign(null)}
                        className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-50"
                    />
                    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-card border border-primary/20 rounded-2xl shadow-2xl z-50 overflow-hidden">
                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

                        <button
                            onClick={() => setSelectedSign(null)}
                            className="absolute top-4 right-4 text-foreground/50 hover:text-foreground transition-colors p-1"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="p-8 text-center space-y-6">
                            <span className="text-6xl inline-block">
                                {selectedSign.emoji}
                            </span>

                            <div className="space-y-2">
                                <h3 className="text-3xl font-serif text-primary">
                                    {'mongolianName' in selectedSign ? selectedSign.mongolianName : selectedSign.name}
                                </h3>
                                <p className="text-foreground/50 text-sm">
                                    {'dates' in selectedSign ? selectedSign.dates : selectedSign.years}
                                </p>
                            </div>

                            <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl">
                                <p className="text-foreground/80 font-serif leading-relaxed italic">
                                    {isEasternSign(selectedSign)
                                        ? selectedSign.forecast2026
                                        : "Өнөөдрийн нийтлэг хандлага: Өөрчлөлтөнд бэлэн байж, дотоод зөн совингоо сонс."}
                                </p>
                            </div>

                            <div className="pt-2">
                                <a
                                    href="#zurhai-form"
                                    onClick={() => setSelectedSign(null)}
                                    className="w-full inline-flex justify-center items-center gap-2 py-3 bg-primary text-primary-foreground font-serif font-medium rounded-xl hover:bg-primary/90 transition-colors"
                                >
                                    <Sparkles className="w-4 h-4" />
                                    Дэлгэрэнгүй зуруулж тайлах
                                </a>
                                <p className="text-foreground/40 text-[10px] uppercase tracking-widest mt-4">
                                    Бүрэн тайлал авах
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Bottom border */}
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </section>
    );
}
