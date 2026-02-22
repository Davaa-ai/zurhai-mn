import type { PortableTextBlock } from "@portabletext/types";

export interface TocItem {
    id: string;
    text: string;
    level: "h2" | "h3";
}

/**
 * Extracts headings from Portable Text blocks and generates slug IDs.
 * This runs on the server — it's a pure utility with no React or DOM usage.
 */
export function extractHeadings(blocks: PortableTextBlock[]): TocItem[] {
    const headings: TocItem[] = [];
    const slugCount: Record<string, number> = {};

    for (const block of blocks) {
        if (
            block._type === "block" &&
            (block.style === "h2" || block.style === "h3")
        ) {
            // Extract plain text from children spans
            const text = (block.children as { text?: string }[])
                ?.map((child) => child.text || "")
                .join("")
                .trim();

            if (!text) continue;

            // Generate a URL-safe slug from the heading text
            let slug = text
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^\p{L}\p{N}-]/gu, "") // keep unicode letters & numbers
                .replace(/-+/g, "-")
                .replace(/^-|-$/g, "");

            // Handle duplicate slugs
            if (slugCount[slug] !== undefined) {
                slugCount[slug]++;
                slug = `${slug}-${slugCount[slug]}`;
            } else {
                slugCount[slug] = 0;
            }

            headings.push({
                id: slug || `heading-${headings.length}`,
                text,
                level: block.style as "h2" | "h3",
            });
        }
    }

    return headings;
}
