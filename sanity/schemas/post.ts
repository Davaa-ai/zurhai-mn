import { defineField, defineType } from "sanity";

export const post = defineType({
    name: "post",
    title: "Нийтлэл",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Гарчиг",
            type: "string",
            validation: (rule) => rule.required().max(120),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "excerpt",
            title: "Товч тайлбар",
            type: "text",
            rows: 3,
            validation: (rule) => rule.max(300),
        }),
        defineField({
            name: "mainImage",
            title: "Зураг",
            type: "image",
            options: {
                hotspot: true,
            },
            fields: [
                defineField({
                    name: "alt",
                    title: "Alt текст",
                    type: "string",
                }),
            ],
        }),
        defineField({
            name: "body",
            title: "Агуулга",
            type: "array",
            of: [
                {
                    type: "block",
                    styles: [
                        { title: "Энгийн", value: "normal" },
                        { title: "Гарчиг 2", value: "h2" },
                        { title: "Гарчиг 3", value: "h3" },
                        { title: "Иш татвар", value: "blockquote" },
                    ],
                    lists: [
                        { title: "Цэгтэй жагсаалт", value: "bullet" },
                        { title: "Дугаартай жагсаалт", value: "number" },
                    ],
                    marks: {
                        decorators: [
                            { title: "Тод", value: "strong" },
                            { title: "Налуу", value: "em" },
                            { title: "Доогуур зураас", value: "underline" },
                            { title: "Дундуур зураас", value: "strike-through" },
                            { title: "Код", value: "code" },
                        ],
                        annotations: [
                            {
                                name: "link",
                                type: "object",
                                title: "Холбоос (Link)",
                                fields: [
                                    {
                                        name: "href",
                                        type: "url",
                                        title: "URL",
                                        validation: (Rule) => Rule.required().uri({
                                            scheme: ['http', 'https', 'mailto', 'tel']
                                        })
                                    },
                                    {
                                        name: "blank",
                                        title: "Шинэ цонхонд нээх үү?",
                                        type: "boolean",
                                        initialValue: true
                                    },
                                ],
                            },
                        ],
                    },
                },
                {
                    type: "image",
                    options: { hotspot: true },
                    fields: [
                        defineField({
                            name: "alt",
                            title: "Alt текст",
                            type: "string",
                        }),
                        defineField({
                            name: "caption",
                            title: "Тайлбар",
                            type: "string",
                        }),
                    ],
                },
            ],
        }),
        defineField({
            name: "categories",
            title: "Ангилал",
            type: "array",
            of: [{ type: "string" }],
            options: {
                layout: "tags",
            },
        }),
        defineField({
            name: "publishedAt",
            title: "Нийтлэсэн огноо",
            type: "datetime",
            initialValue: () => new Date().toISOString(),
        }),
    ],
    orderings: [
        {
            title: "Огноогоор (шинэ)",
            name: "publishedAtDesc",
            by: [{ field: "publishedAt", direction: "desc" }],
        },
    ],
    preview: {
        select: {
            title: "title",
            media: "mainImage",
            date: "publishedAt",
        },
        prepare({ title, media, date }) {
            return {
                title,
                subtitle: date
                    ? new Date(date).toLocaleDateString("mn-MN")
                    : "Огноо тодорхойгүй",
                media,
            };
        },
    },
});
