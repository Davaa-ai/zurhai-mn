import { client, postBySlugQuery, postSlugsQuery, urlFor } from "@/lib/sanity";
import PortableText from "@/components/portable-text";
import { extractHeadings } from "@/lib/toc-utils";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { PortableTextBlock } from "@portabletext/types";
import BlogTracingBeam from "@/components/blog-tracing-beam";

/* eslint-disable @next/next/no-img-element */

export const revalidate = 60;

interface Post {
    _id: string;
    title: string;
    slug: { current: string };
    excerpt?: string;
    mainImage?: { asset: { _ref: string }; alt?: string };
    body?: PortableTextBlock[];
    publishedAt?: string;
    categories?: string[];
}

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    try {
        const slugs: string[] = await client.fetch(postSlugsQuery);
        return slugs.map((slug) => ({ slug }));
    } catch {
        return [];
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    try {
        const { slug } = await params;
        const post: Post | null = await client.fetch(postBySlugQuery, { slug });

        if (!post) {
            return { title: "Нийтлэл олдсонгүй | Zurhai.mn" };
        }

        return {
            title: `${post.title} | Zurhai.mn`,
            description: post.excerpt || `${post.title} — Zurhai.mn блог`,
        };
    } catch {
        return { title: "Блог | Zurhai.mn" };
    }
}

export default async function PostPage({ params }: PageProps) {
    const { slug } = await params;
    let post: Post | null = null;
    try {
        post = await client.fetch(postBySlugQuery, { slug });
    } catch {
        notFound();
    }

    if (!post) {
        notFound();
    }

    const headings = post.body ? extractHeadings(post.body) : [];

    return (
        <main className="min-h-screen bg-background text-foreground/80 relative selection:bg-primary/20 selection:text-primary">
            {/* Ambient background */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 md:py-32">
                <BlogTracingBeam>
                    <div className="max-w-3xl mx-auto antialiased relative">
                        {/* Back link */}
                        <Link
                            href="/blog"
                            className="inline-flex items-center text-primary/60 hover:text-primary text-sm tracking-widest uppercase mb-12 transition-colors"
                        >
                            ← Бүх нийтлэлүүд
                        </Link>

                        {/* Article header */}
                        <header className="mb-20 pb-12 border-b border-border/60">
                            {post.categories && post.categories.length > 0 && (
                                <div className="flex items-center gap-3 mb-6">
                                    {post.categories.map((cat) => (
                                        <span
                                            key={cat}
                                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs tracking-widest font-semibold uppercase"
                                        >
                                            {cat}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground leading-tight mb-6">
                                {post.title}
                            </h1>

                            {post.excerpt && (
                                <p className="text-foreground/50 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                                    {post.excerpt}
                                </p>
                            )}
                        </header>

                        {/* Hero Image */}
                        {post.mainImage?.asset && (
                            <div className="rounded-2xl overflow-hidden mb-16 -mt-6">
                                <img
                                    src={urlFor(post.mainImage).width(1200).auto("format").url()}
                                    alt={post.mainImage.alt || post.title}
                                    className="w-full"
                                />
                            </div>
                        )}

                        {/* Article body */}
                        {post.body && (
                            <div className="leading-loose">
                                <PortableText value={post.body} headings={headings} />
                            </div>
                        )}

                        {/* CTA */}
                        <div className="mt-24 p-8 md:p-10 bg-card border border-border rounded-2xl text-center space-y-5 shadow-sm">
                            <h3 className="text-xl md:text-2xl font-serif text-foreground">
                                2026 Гал Морин жилийн хувийн зурхайгаа бодуулаарай
                            </h3>
                            <p className="text-foreground/50 text-sm max-w-md mx-auto">
                                Таны төрсөн өдөр дээр тулгуурлан AI-аар хувийн зурхай үүсгэнэ.
                            </p>
                            <Link
                                href="/#zurhai-form"
                                className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-full transition-all hover:scale-[1.02] shadow-md text-sm tracking-wide uppercase"
                            >
                                Зурхайгаа бодох
                            </Link>
                        </div>

                        {/* Footer */}
                        <footer className="mt-16 pt-8 border-t border-border/60 flex items-center justify-between text-foreground/30 text-xs">
                            <div className="space-x-4">
                                <Link href="/" className="hover:text-foreground/60 transition-colors">
                                    Нүүр хуудас
                                </Link>
                                <Link href="/blog" className="hover:text-foreground/60 transition-colors">
                                    Блог
                                </Link>
                            </div>
                            <span>© 2026 Zurhai.mn</span>
                        </footer>
                    </div>
                </BlogTracingBeam>
            </div>
        </main>
    );
}
