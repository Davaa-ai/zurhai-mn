import { client } from "@/lib/sanity";
import { easternBySlugQuery, easternSlugsQuery, relatedPostsByTagQuery } from "@/lib/sanity-zodiac";
import PortableText from "@/components/portable-text";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { PortableTextBlock } from "@portabletext/types";
import {
    EASTERN_HUB_CONFIG,
    EASTERN_SIGN_ORDER,
    getSiblings,
} from "@/lib/zodiac-hub-config";
import ZodiacHubHero from "@/components/zodiac/zodiac-hub-hero";
import ZodiacHubStats from "@/components/zodiac/zodiac-hub-stats";
import ZodiacHubTraits from "@/components/zodiac/zodiac-hub-traits";
import ZodiacHubCTA from "@/components/zodiac/zodiac-hub-cta";
import ZodiacHubSiblings from "@/components/zodiac/zodiac-hub-siblings";
import ZodiacHubArticles from "@/components/zodiac/zodiac-hub-articles";

export const revalidate = 60;

interface EasternProfile {
    _id: string;
    animalName: string;
    slug: { current: string };
    polarity: "yin" | "yang";
    years?: string[];
    luckyNumbers?: string[];
    traits?: string[];
    overview?: PortableTextBlock[];
}

interface Post {
    _id: string;
    title: string;
    slug: { current: string };
    excerpt?: string;
    mainImage?: any;
    publishedAt?: string;
    categories?: string[];
}

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    try {
        const slugs: string[] = await client.fetch(easternSlugsQuery);
        return slugs.map((slug) => ({ slug }));
    } catch {
        return [];
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const profile: EasternProfile | null = await client.fetch(easternBySlugQuery, { slug });

    if (!profile) return { title: "Олдсонгүй | Zurhai.mn" };

    return {
        title: `${profile.animalName} жилийн дэлгэрэнгүй зурхай | Zurhai.mn`,
        description: `${profile.animalName} жилтний ерөнхий шинж чанар болон зан араншин.`,
    };
}

export default async function EasternHubPage({ params }: PageProps) {
    const { slug } = await params;
    const profile: EasternProfile | null = await client.fetch(easternBySlugQuery, { slug });

    if (!profile) notFound();

    // Get visual config for this animal sign
    const config = EASTERN_HUB_CONFIG[slug] || {
        icon: "✦",
        accentColor: "#C9A84C",
        accentGlow: "rgba(201,168,76,0.15)",
        heroGradient: "linear-gradient(135deg, #F0F0EC 0%, #EBE8E0 30%, #FAFAF7 100%)",
        mongolianName: profile.animalName,
        element: "earth",
        elementIcon: "✦",
        slug,
    };

    // Fetch related blog posts
    const relatedPosts: Post[] = await client.fetch(relatedPostsByTagQuery, { tag: profile.animalName } as any) as Post[];

    // Get sibling animals for prev/next nav
    const siblings = getSiblings(slug, EASTERN_SIGN_ORDER);

    // Build stats array
    const stats = [];
    if (profile.polarity) {
        const isYin = profile.polarity === "yin";
        stats.push({
            label: "Арга/Билэг",
            value: isYin ? "Билэг" : "Арга",
            icon: isYin ? "🌙" : "☀️",
        });
    }
    if (profile.years && profile.years.length > 0) {
        stats.push({ label: "Он жилүүд", value: profile.years.join(", ") });
    }
    if (profile.luckyNumbers && profile.luckyNumbers.length > 0) {
        stats.push({ label: "Ээлтэй тоо", value: profile.luckyNumbers.join(", ") });
    }

    // Subtitle: show years range or element
    const subtitle = profile.years && profile.years.length > 0
        ? `${profile.years[0]} — ${profile.years[profile.years.length - 1]}`
        : undefined;

    return (
        <main className="min-h-screen bg-background relative overflow-hidden">
            {/* 1. Hero */}
            <ZodiacHubHero
                signName={profile.animalName}
                subtitle={subtitle}
                categoryLabel="Дорнын зурхай"
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
                            Ерөнхий шинж чанар
                        </h2>
                        <div className="prose prose-p:text-foreground/70 prose-headings:text-foreground leading-relaxed text-justify md:text-left">
                            <PortableText value={profile.overview} />
                        </div>
                    </div>
                </section>
            )}

            {/* 5. CTA */}
            <ZodiacHubCTA signName={profile.animalName} config={config} />

            {/* 6. Related Articles */}
            <ZodiacHubArticles posts={relatedPosts} signName={profile.animalName} />

            {/* 7. Sibling Navigation */}
            <ZodiacHubSiblings prev={siblings.prev} next={siblings.next} basePath="/eastern" />
        </main>
    );
}
