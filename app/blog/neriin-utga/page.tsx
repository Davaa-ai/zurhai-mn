"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, Loader2, BookOpen } from "lucide-react";

export default function NameDestinyArticle() {
    const [name, setName] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<null | {
        destinyNumber: number;
        element: string;
        hiddenMeaning: string;
        karma: string;
    }>(null);

    const analyzeName = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        setIsAnalyzing(true);
        setResult(null);

        setTimeout(() => {
            const num = (name.length % 9) + 1;
            const elements = ["Гал", "Ус", "Мод", "Төмөр", "Шороо"];
            const element = elements[name.length % elements.length];

            setResult({
                destinyNumber: num,
                element: element,
                hiddenMeaning: "Таны нэрэнд эртний дайчин удмын эрчим нуугдаж байна. Энэ нь амьдралын чухал шийдвэр гаргах үед дотоод зөн совингоор тань дамжин илэрдэг.",
                karma: "Та гэр бүлийнхээ өмнөх үеийн 'дуусаагүй үйл'-ийг гүйцээх хувьтай хүн. Тийм ч учраас заримдаа шалтгаангүйгээр ганцаардах мэдрэмж төрдөг."
            });
            setIsAnalyzing(false);
        }, 2500);
    };

    return (
        <div className="min-h-screen bg-background text-foreground/80 selection:bg-primary/20 selection:text-primary relative">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />
            </div>

            <main className="relative z-10 max-w-3xl mx-auto px-6 py-20 md:py-32">
                {/* Back Link */}
                <a href="/" className="inline-flex items-center text-primary/60 hover:text-primary text-sm tracking-widest uppercase mb-12 transition-colors">
                    <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                    Нүүр хуудас
                </a>

                {/* Article Header */}
                <header className="mb-20 pb-12 border-b border-border/60">
                    <div className="flex items-center space-x-3 text-primary/80 mb-6">
                        <BookOpen className="w-5 h-5" />
                        <span className="text-xs font-bold tracking-[0.2em] uppercase">Нууцлагдмал Мэдлэг</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground leading-tight mb-6">
                        Таны нэр зүгээр л авиа биш. <br />
                        <span className="hero-gradient-text italic">Энэ бол хувь заяаны код юм.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-foreground/50 font-light leading-relaxed max-w-2xl">
                        Монголчууд хүүхдэд нэр өгөхдөө &quot;Нэр хугарахаар яс хугар&quot; хэмээн ихэд болгоомжилдог байсны учир юу вэ? Таны нэрний ард ямар далд эрчим нуугдаж байгааг хамтдаа нээцгээе.
                    </p>
                </header>

                {/* Article Body */}
                <article className="leading-loose">
                    <p className="text-base md:text-lg text-foreground/80 leading-loose mb-6">
                        Бидний өвөг дээдэс хүний нэрийг зөвхөн дуудах зорилгоор бус, тухайн хүний амьдралын замыг зурах <strong className="font-semibold text-foreground">&quot;Тарни&quot;</strong> гэж үздэг байв. Нэрний авиа бүр сансар огторгуйн тодорхой давтамжтай резонанс үүсгэдэг.
                    </p>

                    <blockquote className="border-l-2 border-primary/50 pl-6 py-2 my-8 italic text-foreground/60 bg-gradient-to-r from-primary/5 to-transparent rounded-r-lg">
                        &quot;Зарим хүн амьдралынхаа туршид өөрийнхөө бус, нэрнийхээ амьдралаар амьдардаг.&quot;
                    </blockquote>

                    <p className="text-base md:text-lg text-foreground/80 leading-loose mb-6">
                        Орчин үеийн квант физик болон эртний тооны зурхай (Numerology) огтлолцох цэг дээр нэгэн сонирхолтой зүй тогтол ажиглагддаг. Таны нэрний үсэг бүр 1-ээс 9 хүртэлх тоонд хувирч, таны <strong className="font-semibold text-foreground">Дотоод сүнсний тоо</strong> болон <strong className="font-semibold text-foreground">Хувь заяаны тоог</strong> гаргаж ирдэг.
                    </p>

                    <h3 className="text-2xl md:text-[1.75rem] font-serif font-normal text-foreground mt-20 mb-4">Хувь заяаныхаа кодыг шалгах</h3>
                    <p className="text-base text-foreground/50 mb-6">
                        Gemini AI-ийн тусламжтайгаар өөрийн нэрний далд утга болон өвөг дээдсээс өвлөсөн кармаг яг одоо тооцоолж үзээрэй.
                    </p>

                    {/* Interactive Hook Section */}
                    <div className="bg-card border border-border rounded-2xl p-6 md:p-10 my-12 shadow-sm relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        {!result && !isAnalyzing && (
                            <form
                                onSubmit={analyzeName}
                                className="relative z-10 space-y-6"
                            >
                                <div>
                                    <label className="block text-sm text-primary/80 uppercase tracking-widest mb-3">Овог, Нэрээ оруулна уу</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Ж: Доржийн Бат"
                                        className="w-full bg-background border border-border rounded-lg px-5 py-4 text-xl text-foreground outline-none focus:border-primary transition-colors"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-4 bg-primary text-primary-foreground font-bold uppercase tracking-widest text-sm rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center shadow-md"
                                >
                                    <Sparkles className="w-4 h-4 mr-2" />
                                    Нэрний Далд Утгыг Нээх
                                </button>
                            </form>
                        )}

                        {isAnalyzing && (
                            <div className="relative z-10 flex flex-col items-center justify-center py-12 space-y-6">
                                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                                <div className="space-y-2 text-center">
                                    <p className="text-primary font-medium">Огторгуйн давтамжийг тооцоолж байна...</p>
                                    <p className="text-sm text-foreground/40">Эртний судрын өгөгдөл рүү хандаж байна</p>
                                </div>
                            </div>
                        )}

                        {result && (
                            <div className="relative z-10 space-y-8">
                                <div className="text-center space-y-2">
                                    <h4 className="text-xl md:text-2xl text-foreground font-serif">{name}, таны шинжилгээний үр дүн:</h4>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-secondary border border-border rounded-xl p-5 text-center">
                                        <p className="text-xs text-foreground/40 uppercase tracking-widest mb-2">Хувь заяаны тоо</p>
                                        <p className="text-5xl font-serif text-primary">{result.destinyNumber}</p>
                                    </div>
                                    <div className="bg-secondary border border-border rounded-xl p-5 text-center">
                                        <p className="text-xs text-foreground/40 uppercase tracking-widest mb-2">Зонхилох элемент</p>
                                        <p className="text-4xl font-serif text-foreground mt-1">{result.element}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-gradient-to-r from-primary/10 to-transparent border-l-2 border-primary p-5 rounded-r-lg">
                                        <h5 className="text-sm font-bold text-primary uppercase tracking-wider mb-2">Далд утга</h5>
                                        <p className="text-foreground/70 font-serif leading-relaxed">{result.hiddenMeaning}</p>
                                    </div>

                                    <div className="bg-gradient-to-r from-destructive/10 to-transparent border-l-2 border-destructive/40 p-5 rounded-r-lg">
                                        <h5 className="text-sm font-bold text-destructive/80 uppercase tracking-wider mb-2">Ургийн карма</h5>
                                        <p className="text-foreground/70 font-serif leading-relaxed">{result.karma}</p>
                                    </div>
                                </div>

                                {/* The Next Hook */}
                                <div className="pt-6 border-t border-border">
                                    <p className="text-center text-sm text-foreground/50 mb-4">
                                        Энэ бол таны талаарх мэдээллийн ердөө <span className="text-primary font-semibold">5%</span> юм.
                                    </p>
                                    <a
                                        href="/#zurhai-form"
                                        className="w-full py-4 bg-foreground text-background font-bold uppercase tracking-widest text-sm rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
                                    >
                                        Бүрэн зурхайгаа бодуулах
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </a>
                                    <button
                                        onClick={() => { setResult(null); setName(""); }}
                                        className="w-full mt-4 py-2 text-xs text-foreground/40 hover:text-foreground/70 uppercase tracking-widest transition-colors"
                                    >
                                        Өөр нэр шалгах
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <p className="text-base md:text-lg text-foreground/80 leading-loose mb-6">
                        Хэрэв та өөрийн нэрний утгыг бүрэн дүүрэн ухамсарлаж чадвал, амьдралд тань тохиолдож буй давтагдсан хэв маягууд (pattern) устгагдаж, урсгалд орох болно. Бидний санал болгож буй <strong className="font-semibold text-foreground">Бүрэн Зурхайн Уншлага</strong>-д таны төрсөн он сар өдөр болон нэрний огтлолцол дээрх илүү гүнзгий анализ багтсан болно.
                    </p>
                </article>
            </main>
        </div>
    );
}
