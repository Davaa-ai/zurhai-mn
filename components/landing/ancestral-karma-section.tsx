"use client";

import { TreeOfLifeSVG } from "@/components/icons/tree-of-life";
import { MoveRight, ShieldCheck, HeartHandshake, History } from "lucide-react";

const ANCESTRAL_FEATURES = [
    {
        title: "Гурван үеийн хэлхээ",
        description: "Өвөө, эмээ, аав, ээжийнхээ мэнгэ, ордыг оруулан гэр бүлийн энергийн урсгалыг харах.",
        icon: <History className="w-5 h-5" />
    },
    {
        title: "Өвлөгдсөн зан чанар",
        description: "Удмаас танд ямар зан чанар, давуу тал, айдас шилжиж ирснийг тайлах.",
        icon: <ShieldCheck className="w-5 h-5" />
    },
    {
        title: "Карма ба Үйлийн үр",
        description: "Гэр бүлд давтагддаг үйлийн үрийн гогцоог таньж, түүнийг хэрхэн тайлах арга зам.",
        icon: <HeartHandshake className="w-5 h-5" />
    }
];

export default function AncestralKarmaSection() {
    return (
        <section className="relative py-24 px-6 md:px-12 bg-gradient-to-b from-background via-card/30 to-background overflow-hidden">
            {/* Ambient Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">

                {/* Visual Tree Side */}
                <div className="relative w-full aspect-square max-w-lg mx-auto flex items-center justify-center p-8">
                    <TreeOfLifeSVG className="w-full h-full opacity-80" />

                    {/* Static labels indicating connections */}
                    <div className="absolute inset-0">
                        <div className="absolute top-1/4 left-1/4 bg-primary/10 border border-primary/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-serif text-primary/80">
                            Эмээ: Усан Могой
                        </div>
                        <div className="absolute bottom-1/3 right-1/4 bg-primary/10 border border-primary/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-serif text-primary/80">
                            Ээж: Гал Бар
                        </div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary/15 border border-primary/30 backdrop-blur-md px-4 py-2 rounded-full text-sm font-serif text-primary shadow-md">
                            Та: Усан Луу
                        </div>
                    </div>
                </div>

                {/* Content Side */}
                <div className="space-y-10">
                    <div className="space-y-4">
                        <span className="text-primary/80 text-xs font-semibold tracking-[0.25em] uppercase">
                            ✦ Удмын Хувь Заяа ✦
                        </span>
                        <h2 className="text-3xl md:text-5xl font-serif text-foreground leading-tight">
                            Та өвөг дээдсээсээ юу <br className="hidden md:block" />
                            <span className="hero-gradient-text italic">өвлөж авсан бэ?</span>
                        </h2>
                        <p className="text-foreground/60 text-lg leading-relaxed font-serif pt-2 max-w-xl">
                            Хувь төөргийн модныхоо үндсийг усал. Таны ордын байрлал өвөг дээдсийнхтэй хэрхэн огтлолцож, ямар далд зан чанар, амьдралын хэв маягийг дамжуулсныг тайлна.
                        </p>
                    </div>

                    <div className="space-y-5">
                        {ANCESTRAL_FEATURES.map((feature, idx) => (
                            <div
                                key={idx}
                                className="flex gap-4 p-4 rounded-2xl bg-card border border-border hover:bg-secondary hover:border-primary/20 transition-all group shadow-sm"
                            >
                                <div className="mt-1 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h4 className="text-foreground font-serif text-lg">{feature.title}</h4>
                                    <p className="text-foreground/50 text-sm leading-relaxed mt-1">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-4">
                        <a
                            href="#zurhai-form"
                            className="inline-flex items-center gap-3 px-8 py-3.5 bg-card border border-foreground/10 text-foreground font-serif rounded-full hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 group shadow-sm"
                        >
                            Удмын модоо бүтээх
                            <MoveRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>

            </div>

            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </section>
    );
}
