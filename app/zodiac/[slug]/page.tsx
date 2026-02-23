import { client } from "@/lib/sanity";
import { zodiacBySlugQuery, zodiacSlugsQuery, relatedPostsByTagQuery } from "@/lib/sanity-zodiac";
import PortableText from "@/components/portable-text";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { PortableTextBlock } from "@portabletext/types";
import {
    WESTERN_HUB_CONFIG,
    WESTERN_SIGN_ORDER,
    getSiblings,
} from "@/lib/zodiac-hub-config";
import ZodiacHubHero from "@/components/zodiac/zodiac-hub-hero";
import ZodiacHubStats from "@/components/zodiac/zodiac-hub-stats";
import ZodiacHubTraits from "@/components/zodiac/zodiac-hub-traits";
import ZodiacHubCTA from "@/components/zodiac/zodiac-hub-cta";
import ZodiacHubSiblings from "@/components/zodiac/zodiac-hub-siblings";
import ZodiacHubArticles from "@/components/zodiac/zodiac-hub-articles";

export const revalidate = 60;

interface ZodiacProfile {
    _id: string;
    signName: string;
    slug: { current: string };
    element: "fire" | "water" | "earth" | "air";
    rulingPlanet?: string;
    dates: string;
    luckyNumbers?: string[];
    traits?: string[];
    overview?: PortableTextBlock[];
    compatibility?: PortableTextBlock[];
}

interface Post {
    _id: string;
    title: string;
    slug: { current: string };
    excerpt?: string;
    mainImage?: { asset?: unknown };
    publishedAt?: string;
    categories?: string[];
}

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    try {
        const slugs: string[] = await client.fetch(zodiacSlugsQuery);
        return slugs.map((slug) => ({ slug }));
    } catch {
        return [];
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const profile: ZodiacProfile | null = await client.fetch(zodiacBySlugQuery, { slug });

    if (!profile) return { title: "Олдсонгүй | Zurhai.mn" };

    return {
        title: `${profile.signName} ордны дэлгэрэнгүй зурхай | Zurhai.mn`,
        description: `${profile.signName} ордны ерөнхий шинж чанар, хайр дурлалын нийцэл, ээлтэй тоонууд.`,
    };
}

export default async function ZodiacHubPage({ params }: PageProps) {
    const { slug } = await params;
    const profile: ZodiacProfile | null = await client.fetch(zodiacBySlugQuery, { slug });

    if (!profile) notFound();

    // Get visual config for this sign (fallback to a default)
    const config = WESTERN_HUB_CONFIG[slug] || {
        icon: "✦",
        accentColor: "#C9A84C",
        accentGlow: "rgba(201,168,76,0.15)",
        heroGradient: "linear-gradient(135deg, #F0F0EC 0%, #EBE8E0 30%, #FAFAF7 100%)",
        mongolianName: profile.signName,
        element: profile.element || "air",
        elementIcon: "✦",
        slug,
    };

    // Fetch related blog posts
    const relatedPosts: Post[] = await client.fetch<Post[]>(relatedPostsByTagQuery, { tag: profile.signName } as Record<string, unknown>);

    // Get sibling signs for prev/next nav
    const siblings = getSiblings(slug, WESTERN_SIGN_ORDER);

    // Build stats array
    const stats = [];
    if (profile.element) {
        const elementMap: Record<string, string> = {
            fire: "Гал 🔥",
            water: "Ус 💧",
            earth: "Шороо 🌿",
            air: "Хий 💨",
        };
        stats.push({ label: "Махбод", value: elementMap[profile.element] || profile.element });
    }
    if (profile.rulingPlanet) {
        stats.push({ label: "Ивээгч гараг", value: profile.rulingPlanet, icon: "🪐" });
    }
    if (profile.luckyNumbers && profile.luckyNumbers.length > 0) {
        stats.push({ label: "Ээлтэй тоо", value: profile.luckyNumbers.join(", ") });
    }

    return (
        <main className="min-h-screen bg-background relative overflow-hidden">
            {/* 1. Hero */}
            <ZodiacHubHero
                signName={profile.signName}
                subtitle={profile.dates}
                categoryLabel="Өрнийн орд"
                config={config}
            />

            {/* 2. Stats Bar */}
            <ZodiacHubStats stats={stats} config={config} />

            {/* 3. Traits */}
            {profile.traits && (
                <ZodiacHubTraits traits={profile.traits} config={config} />
            )}

            {/* 4. Overview Content */}
            {profile.overview && (
                <section className="py-10 px-4">
                    <div className="max-w-3xl mx-auto bg-card border border-border rounded-3xl p-8 md:p-10 shadow-sm">
                        <h2 className="text-xl font-serif text-center mb-8 uppercase tracking-widest" style={{ color: config.accentColor }}>
                            Ерөнхий шинж
                        </h2>
                        <div className="prose prose-p:text-foreground/70 prose-headings:text-foreground prose-a:text-primary leading-relaxed">
                            <PortableText value={profile.overview} />
                        </div>
                    </div>
                </section>
            )}

            {/* 5. Compatibility */}
            {profile.compatibility && (
                <section className="py-10 px-4">
                    <div className="max-w-3xl mx-auto bg-card border border-border rounded-3xl p-8 md:p-10 shadow-sm">
                        <h2 className="text-xl font-serif text-center mb-8 uppercase tracking-widest" style={{ color: config.accentColor }}>
                            Хайр дурлалын нийцэл
                        </h2>
                        <div className="prose prose-p:text-foreground/70 prose-headings:text-foreground prose-a:text-primary leading-relaxed">
                            <PortableText value={profile.compatibility} />
                        </div>
                    </div>
                </section>
            )}

            {/* 6. CTA */}
            <ZodiacHubCTA signName={profile.signName} config={config} />

            {/* 7. Related Articles */}
            <ZodiacHubArticles posts={relatedPosts} signName={profile.signName} />

            {/* 8. Sibling Navigation */}
            <ZodiacHubSiblings prev={siblings.prev} next={siblings.next} basePath="/zodiac" />
        </main>
    );
}
