import { client, postsQuery, urlFor } from "@/lib/sanity";
import Link from "next/link";
import type { Metadata } from "next";

/* eslint-disable @next/next/no-img-element */

export const metadata: Metadata = {
    title: "Блог | Zurhai.mn",
    description: "Зурхай, од гарагийн мэдлэг, амьдралын зөвлөгөө — Zurhai.mn блог",
};

export const revalidate = 60; // ISR: revalidate every 60 seconds

interface Post {
    _id: string;
    title: string;
    slug: { current: string };
    excerpt?: string;
    mainImage?: { asset: { _ref: string }; alt?: string };
    publishedAt?: string;
    categories?: string[];
}

export default async function BlogPage() {
    let posts: Post[] = [];
    try {
        posts = await client.fetch(postsQuery);
    } catch {
        // Sanity not configured yet
    }

    return (
        <main className="min-h-screen bg-background relative overflow-hidden">
            {/* Background accents */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-accent rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto px-4 py-12 md:py-20">
                {/* Header */}
                <div className="mb-12 text-center space-y-4">
                    <Link href="/" className="text-primary text-sm hover:underline">
                        ← Нүүр хуудас
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-serif text-foreground">Блог</h1>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        Зурхай, од гарагийн мэдлэг, буддын философи, амьдралын зөвлөгөө
                    </p>
                </div>

                {/* Posts */}
                {posts.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-foreground/50 text-lg">Одоогоор нийтлэл байхгүй байна.</p>
                        <p className="text-foreground/30 text-sm mt-2">
                            /studio хуудаснаас нийтлэл нэмнэ үү.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {posts.map((post) => (
                            <Link
                                key={post._id}
                                href={`/blog/${post.slug.current}`}
                                className="block group"
                            >
                                <article className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/20 transition-all duration-300 hover:shadow-md shadow-sm">
                                    {post.mainImage?.asset && (
                                        <div className="aspect-[2/1] overflow-hidden">
                                            <img
                                                src={urlFor(post.mainImage).width(800).height(400).auto("format").url()}
                                                alt={post.mainImage.alt || post.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    )}
                                    <div className="p-6 space-y-3">
                                        <div className="flex items-center gap-3 text-xs text-foreground/40">
                                            {post.categories?.map((cat) => (
                                                <span
                                                    key={cat}
                                                    className="bg-primary/10 text-primary px-2 py-0.5 rounded-full"
                                                >
                                                    {cat}
                                                </span>
                                            ))}
                                        </div>
                                        <h2 className="text-xl font-serif text-foreground group-hover:text-primary transition-colors">
                                            {post.title}
                                        </h2>
                                        {post.excerpt && (
                                            <p className="text-foreground/50 text-sm leading-relaxed line-clamp-2">
                                                {post.excerpt}
                                            </p>
                                        )}
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Footer */}
                <div className="mt-16 pt-8 border-t border-border text-center text-xs text-foreground/30 space-x-4">
                    <Link href="/" className="hover:text-foreground/60 transition-colors">
                        Нүүр хуудас
                    </Link>
                    <span>© 2026 Zurhai.mn</span>
                </div>
            </div>
        </main>
    );
}
