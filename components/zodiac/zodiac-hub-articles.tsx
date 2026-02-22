import { urlFor } from "@/lib/sanity";
import Link from "next/link";

interface Post {
    _id: string;
    title: string;
    slug: { current: string };
    excerpt?: string;
    mainImage?: any;
    publishedAt?: string;
    categories?: string[];
}

interface ZodiacHubArticlesProps {
    posts: Post[];
    signName: string;
}

export default function ZodiacHubArticles({ posts, signName }: ZodiacHubArticlesProps) {
    if (!posts || posts.length === 0) return null;

    return (
        <section className="py-16 px-4 border-t border-border">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-10 space-y-2">
                    <p className="text-foreground/30 text-xs uppercase tracking-[0.2em] font-serif">
                        Холбоотой нийтлэлүүд
                    </p>
                    <h2 className="text-2xl md:text-3xl font-serif text-foreground">
                        {signName} — тухай нийтлэлүүд
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <Link
                            key={post._id}
                            href={`/blog/${post.slug.current}`}
                            className="group block h-full"
                        >
                            <article className="h-full flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/20 transition-all duration-300 shadow-sm hover:shadow-md">
                                {post.mainImage?.asset ? (
                                    <div className="aspect-[16/9] overflow-hidden">
                                        <img
                                            src={urlFor(post.mainImage).width(600).height(340).auto("format").url()}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                                        />
                                    </div>
                                ) : (
                                    <div className="aspect-[16/9] bg-secondary flex items-center justify-center">
                                        <span className="text-foreground/20 text-4xl">✦</span>
                                    </div>
                                )}
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-base font-serif text-foreground group-hover:text-primary transition-colors mb-3 line-clamp-2">
                                        {post.title}
                                    </h3>
                                    {post.excerpt && (
                                        <p className="text-foreground/40 text-sm line-clamp-2 mb-4 flex-1">
                                            {post.excerpt}
                                        </p>
                                    )}
                                    <span className="text-primary/70 text-sm font-medium group-hover:text-primary transition-colors">
                                        Унших →
                                    </span>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
