import Link from "next/link";

export default function Footer() {
    return (
        <footer className="relative bg-secondary/50 border-t border-border">
            <div className="max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-16">
                <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
                    {/* Brand */}
                    <div className="text-center md:text-left space-y-3">
                        <Link href="/" className="inline-block group">
                            <h3 className="text-xl font-serif text-primary group-hover:text-primary/80 transition-colors">
                                ☯️ Zurhai<span className="text-foreground/60">.mn</span>
                            </h3>
                        </Link>
                        <p className="text-foreground/30 text-xs max-w-[250px] leading-relaxed font-serif">
                            AI-д суурилсан Монгол зурхайн уншлага.
                            <br />
                            2026 Гал Морин жилийн хувийн код.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex gap-8 text-sm">
                        <div className="space-y-3">
                            <h4 className="text-primary/50 text-xs font-semibold uppercase tracking-wider font-serif">
                                Хуудас
                            </h4>
                            <nav className="flex flex-col gap-2">
                                <Link
                                    href="/"
                                    className="text-foreground/30 hover:text-primary transition-colors text-xs font-serif"
                                >
                                    Нүүр
                                </Link>
                                <Link
                                    href="/blog"
                                    className="text-foreground/30 hover:text-primary transition-colors text-xs font-serif"
                                >
                                    Блог
                                </Link>
                                <a
                                    href="#zurhai-form"
                                    className="text-foreground/30 hover:text-primary transition-colors text-xs font-serif"
                                >
                                    Зурхай бодох
                                </a>
                            </nav>
                        </div>
                        <div className="space-y-3">
                            <h4 className="text-primary/50 text-xs font-semibold uppercase tracking-wider font-serif">
                                Бусад
                            </h4>
                            <nav className="flex flex-col gap-2">
                                <span className="text-foreground/30 text-xs cursor-default font-serif">
                                    Нууцлал
                                </span>
                                <span className="text-foreground/30 text-xs cursor-default font-serif">
                                    Үйлчилгээний нөхцөл
                                </span>
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-foreground/25 text-xs font-serif">
                        © 2026 Zurhai.mn — Бүх эрх хуулиар хамгаалагдсан.
                    </p>
                    <p className="text-foreground/15 text-[10px] font-serif">
                        Powered by Gemini AI ✦ Built in Mongolia 🇲🇳
                    </p>
                </div>
            </div>
        </footer>
    );
}
