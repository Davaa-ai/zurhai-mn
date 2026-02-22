import { PortableText as PortableTextReact, PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/lib/sanity";
import type { PortableTextBlock } from "@portabletext/types";
import type { TocItem } from "@/lib/toc-utils";

/* eslint-disable @next/next/no-img-element */

/**
 * Build PortableText components with heading IDs injected for TOC linking.
 * Typography system modeled after long-form editorial design:
 *   - leading-loose (line-height: 2) for body text
 *   - font-serif for headings, system sans for body
 *   - generous vertical rhythm between blocks
 */
function buildComponents(headings: TocItem[]): PortableTextComponents {
    let h2Index = 0;
    let h3Index = 0;

    const h2Headings = headings.filter((h) => h.level === "h2");
    const h3Headings = headings.filter((h) => h.level === "h3");

    return {
        types: {
            image: ({ value }) => {
                if (!value?.asset?._ref) return null;
                return (
                    <figure className="my-12">
                        <img
                            src={urlFor(value).width(800).auto("format").url()}
                            alt={value.alt || ""}
                            className="rounded-xl w-full"
                        />
                        {value.caption && (
                            <figcaption className="text-center text-foreground/40 text-sm mt-3 italic">
                                {value.caption}
                            </figcaption>
                        )}
                    </figure>
                );
            },
        },
        block: {
            h2: ({ children }) => {
                const item = h2Headings[h2Index];
                h2Index++;
                return (
                    <h2
                        id={item?.id}
                        className="text-3xl md:text-4xl font-serif font-normal text-foreground mt-20 mb-4 scroll-mt-32 leading-tight"
                    >
                        {children}
                    </h2>
                );
            },
            h3: ({ children }) => {
                const item = h3Headings[h3Index];
                h3Index++;
                return (
                    <h3
                        id={item?.id}
                        className="text-2xl md:text-[1.75rem] font-serif font-normal text-foreground mt-12 mb-4 scroll-mt-32 leading-snug"
                    >
                        {children}
                    </h3>
                );
            },
            normal: ({ children }) => (
                <p className="text-base md:text-lg text-foreground/80 leading-loose mb-6">
                    {children}
                </p>
            ),
            blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-primary/50 pl-6 py-2 my-8 italic text-foreground/60 bg-gradient-to-r from-primary/5 to-transparent rounded-r-lg">
                    {children}
                </blockquote>
            ),
        },
        list: {
            bullet: ({ children }) => (
                <ul className="list-disc list-outside ml-6 mb-6 space-y-4 text-base md:text-lg text-foreground/80 leading-loose">
                    {children}
                </ul>
            ),
            number: ({ children }) => (
                <ol className="list-decimal list-outside ml-6 mb-6 space-y-4 text-base md:text-lg text-foreground/80 leading-loose">
                    {children}
                </ol>
            ),
        },
        listItem: {
            bullet: ({ children }) => <li className="pl-1">{children}</li>,
            number: ({ children }) => <li className="pl-1">{children}</li>,
        },
        marks: {
            strong: ({ children }) => (
                <strong className="font-semibold text-foreground">{children}</strong>
            ),
            em: ({ children }) => <em className="italic text-foreground/90">{children}</em>,
            underline: ({ children }) => (
                <u className="underline underline-offset-4 decoration-primary/40">{children}</u>
            ),
            "strike-through": ({ children }) => (
                <del className="line-through decoration-foreground/30">{children}</del>
            ),
            code: ({ children }) => (
                <code className="bg-muted text-foreground/90 rounded px-1.5 py-0.5 text-[0.85em] font-mono border border-border/50">
                    {children}
                </code>
            ),
            link: ({ value, children }) => {
                const target = value?.blank ? "_blank" : "_self";
                return (
                    <a
                        href={value?.href}
                        target={target}
                        rel={target === "_blank" ? "noopener noreferrer" : undefined}
                        className="text-primary hover:text-primary/80 underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-colors duration-200"
                    >
                        {children}
                    </a>
                );
            },
        },
    };
}

interface PortableTextProps {
    value: PortableTextBlock[];
    headings?: TocItem[];
}

export default function PortableText({ value, headings = [] }: PortableTextProps) {
    const components = buildComponents(headings);
    return <PortableTextReact value={value} components={components} />;
}
