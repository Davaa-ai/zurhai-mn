"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface TarotCardProps {
    cardImage?: string;
    title: string;
    description: string;
    backPattern?: React.ReactNode;
    className?: string;
}

export function TarotCard({ title, description, backPattern, className }: TarotCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className={cn("relative w-full aspect-[2/3] perspective-1000", className)}
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <div
                className={cn(
                    "w-full h-full relative preserve-3d cursor-pointer shadow-2xl rounded-xl",
                    "transition-transform duration-500 ease-out",
                    isFlipped && "[transform:rotateY(180deg)]"
                )}
            >
                {/* ── Front of Card ── */}
                <div
                    className={cn(
                        "absolute inset-0 backface-hidden rounded-xl border border-primary/20 overflow-hidden",
                        "bg-gradient-to-br from-secondary to-card shadow-md"
                    )}
                >
                    {/* Ornate Border */}
                    <div className="absolute inset-2 border-2 border-primary/20 rounded-lg pointer-events-none" />
                    <div className="absolute inset-3 border border-primary/10 rounded-md pointer-events-none" />

                    {/* Card Pattern/Art */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-80">
                        {backPattern || (
                            <div className="text-primary/40 flex flex-col items-center gap-4">
                                <span className="text-4xl">👁️</span>
                                <div className="w-16 h-px bg-primary/30" />
                                <span className="font-serif text-[10px] tracking-[0.3em] uppercase">Монгол Тарот</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Back of Card (The Reading) ── */}
                <div
                    className={cn(
                        "absolute inset-0 backface-hidden rounded-xl border border-primary/25 overflow-hidden",
                        "bg-gradient-to-b from-accent to-card",
                        "[transform:rotateY(180deg)]"
                    )}
                >
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

                    <div className="h-full flex flex-col p-6 items-center justify-center text-center space-y-6">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                            <span className="text-2xl">🃏</span>
                        </div>

                        <div className="space-y-3">
                            <h4 className="font-serif text-xl text-primary">{title}</h4>
                            <p className="text-sm font-serif text-foreground/70 leading-relaxed">
                                {description}
                            </p>
                        </div>

                        <div className="mt-auto pt-4 w-full">
                            <button className="w-full py-2 bg-primary/10 text-primary text-xs font-serif rounded-lg border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-colors">
                                Дахин татах
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
