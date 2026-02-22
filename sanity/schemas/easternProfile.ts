import { defineField, defineType } from "sanity";

export const easternProfile = defineType({
    name: "easternProfile",
    title: "Дорнын жил (Eastern Hub)",
    type: "document",
    fields: [
        defineField({
            name: "animalName",
            title: "Жилийн нэр",
            description: "Жишээ нь: Луу",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug (URL)",
            type: "slug",
            options: {
                source: "animalName",
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "polarity",
            title: "Билэг/Арга",
            type: "string",
            options: {
                list: [
                    { title: "Арга (Yang)", value: "yang" },
                    { title: "Билэг (Yin)", value: "yin" },
                ],
                layout: "radio",
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "years",
            title: "Он жилүүд",
            description: "Жишээ нь: 1988, 2000, 2012, 2024",
            type: "array",
            of: [{ type: "string" }],
            options: {
                layout: "tags",
            },
        }),
        defineField({
            name: "luckyNumbers",
            title: "Ээлтэй тоонууд",
            type: "array",
            of: [{ type: "string" }],
        }),
        defineField({
            name: "traits",
            title: "Зан чанар (Түлхүүр үгс)",
            type: "array",
            of: [{ type: "string" }],
            options: {
                layout: "tags",
            },
        }),
        defineField({
            name: "overview",
            title: "Ерөнхий шинж чанар",
            type: "array",
            of: [
                {
                    type: "block",
                    styles: [
                        { title: "Энгийн", value: "normal" },
                        { title: "Гарчиг", value: "h3" },
                    ],
                },
            ],
        }),
    ],
    preview: {
        select: {
            title: "animalName",
            subtitle: "polarity",
        },
    },
});
