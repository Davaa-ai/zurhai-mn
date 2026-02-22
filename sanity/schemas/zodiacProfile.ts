import { defineField, defineType } from "sanity";

export const zodiacProfile = defineType({
    name: "zodiacProfile",
    title: "Өрнийн орд (Zodiac Hub)",
    type: "document",
    fields: [
        defineField({
            name: "signName",
            title: "Ордны нэр",
            description: "Жишээ нь: Хилэнц",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug (URL)",
            type: "slug",
            options: {
                source: "signName",
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "element",
            title: "Махбод",
            description: "Энэ нь хуудсын суурь өнгийг (Aura) тодорхойлно.",
            type: "string",
            options: {
                list: [
                    { title: "Гал (Улаан/Алтан)", value: "fire" },
                    { title: "Ус (Гүн цэнхэр/Ногоон)", value: "water" },
                    { title: "Шороо (Бор/Шар)", value: "earth" },
                    { title: "Хий (Мөнгөлөг/Цагаан)", value: "air" },
                ],
                layout: "radio",
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "rulingPlanet",
            title: "Ивээгч гараг",
            type: "string",
        }),
        defineField({
            name: "dates",
            title: "Хугацаа",
            description: "Жишээ нь: 10.23 - 11.21",
            type: "string",
            validation: (rule) => rule.required(),
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
            description: "Жишээ нь: Үнэнч, Зоригтой, Зөрүүд",
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
        defineField({
            name: "compatibility",
            title: "Хайр дурлалын нийцэл",
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
            title: "signName",
            subtitle: "dates",
        },
    },
});
