export default function FeaturesSection() {
    const features = [
        {
            image: "/images/ai-reading.png",
            title: "AI-Зурхайн Уншлага",
            description:
                "Gemini AI таны төрсөн өдөр, амьтны жил, элемент, 7 сэтгэлзүйн хариултанд тулгуурлан гүнзгий хувийн уншлага бэлтгэнэ.",
        },
        {
            image: "/images/energy-dimension.png",
            title: "4 Хэмжээст Энергийн Зураг",
            description:
                "Сэтгэлзүй, Аура, Сүнс & Харилцаа, Карьер & Урсгал — таны амьдралын 4 чухал салбарт дүн шинжилгээ.",
        },
        {
            image: "/images/fire-horse.png",
            title: "Гал Морь Жилийн Glitch",
            description:
                "2026 онд танд тохиох шилжилтийн цонх болон үйлдлийн төлөвлөгөө. 60 жилд нэг удаа ирэх боломж.",
        },
    ];

    return (
        <section className="relative py-24 px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center space-y-4 mb-16">
                    <span className="text-primary/80 text-xs font-semibold tracking-[0.25em] uppercase">
                        ✦ Юу авах вэ? ✦
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif text-primary">
                        Таны хувийн{" "}
                        <span className="hero-gradient-text italic">Зурхайн Код</span>
                    </h2>
                    <p className="text-foreground/50 max-w-lg mx-auto text-sm md:text-base leading-relaxed font-serif">
                        Нэг удаагийн 5,000₮ хөрөнгө оруулалтаар та дараах 3 хэсэгт анализ авна.
                    </p>
                    <div className="section-divider mt-6" />
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative bg-card border border-border rounded-2xl p-7 md:p-8 hover:border-primary/30 transition-colors duration-300 shadow-sm hover:shadow-md"
                        >
                            {/* Gold top accent on hover */}
                            <div className="absolute inset-x-6 top-0 h-0.5 bg-primary opacity-0 group-hover:opacity-100" />

                            <div className="space-y-5">
                                <div className="w-16 h-16 rounded-xl overflow-hidden border border-primary/15">
                                    <img
                                        src={feature.image}
                                        alt={feature.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-foreground font-serif text-xl group-hover:text-primary transition-colors duration-300">
                                    {feature.title}
                                </h3>
                                <p className="text-foreground/40 text-sm leading-relaxed font-serif">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom border */}
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </section>
    );
}
