export interface SignHubConfig {
    icon: string;
    accentColor: string;
    accentGlow: string;
    heroGradient: string;       // CSS gradient for hero placeholder
    mongolianName: string;
    englishName?: string;       // For Western signs
    element: string;
    elementIcon: string;
    slug: string;
}

// ============================================
// WESTERN ZODIAC — 12 Signs (Light Theme)
// ============================================

export const WESTERN_HUB_CONFIG: Record<string, SignHubConfig> = {
    "aries": {
        icon: "♈",
        accentColor: "#D04040",
        accentGlow: "rgba(208,64,64,0.10)",
        heroGradient: "linear-gradient(135deg, #FDE8E8 0%, #F5D0D0 30%, #FAFAF7 100%)",
        mongolianName: "Хуц",
        englishName: "Aries",
        element: "fire",
        elementIcon: "🔥",
        slug: "aries",
    },
    "taurus": {
        icon: "♉",
        accentColor: "#8D7660",
        accentGlow: "rgba(141,118,96,0.10)",
        heroGradient: "linear-gradient(135deg, #F5EDE4 0%, #E8DDD0 30%, #FAFAF7 100%)",
        mongolianName: "Бух",
        englishName: "Taurus",
        element: "earth",
        elementIcon: "🌿",
        slug: "taurus",
    },
    "gemini": {
        icon: "♊",
        accentColor: "#4A90B8",
        accentGlow: "rgba(74,144,184,0.10)",
        heroGradient: "linear-gradient(135deg, #E0F0FA 0%, #CCE4F5 30%, #FAFAF7 100%)",
        mongolianName: "Ихэр",
        englishName: "Gemini",
        element: "air",
        elementIcon: "💨",
        slug: "gemini",
    },
    "cancer": {
        icon: "♋",
        accentColor: "#3A8AB0",
        accentGlow: "rgba(58,138,176,0.10)",
        heroGradient: "linear-gradient(135deg, #DCF0F8 0%, #C5E4F0 30%, #FAFAF7 100%)",
        mongolianName: "Мэлхий",
        englishName: "Cancer",
        element: "water",
        elementIcon: "💧",
        slug: "cancer",
    },
    "leo": {
        icon: "♌",
        accentColor: "#D4922A",
        accentGlow: "rgba(212,146,42,0.10)",
        heroGradient: "linear-gradient(135deg, #FFF3DC 0%, #F5E4C0 30%, #FAFAF7 100%)",
        mongolianName: "Арслан",
        englishName: "Leo",
        element: "fire",
        elementIcon: "🔥",
        slug: "leo",
    },
    "virgo": {
        icon: "♍",
        accentColor: "#5A9A5C",
        accentGlow: "rgba(90,154,92,0.10)",
        heroGradient: "linear-gradient(135deg, #E5F5E5 0%, #D0EAD0 30%, #FAFAF7 100%)",
        mongolianName: "Охин",
        englishName: "Virgo",
        element: "earth",
        elementIcon: "🌿",
        slug: "virgo",
    },
    "libra": {
        icon: "♎",
        accentColor: "#A06CB0",
        accentGlow: "rgba(160,108,176,0.10)",
        heroGradient: "linear-gradient(135deg, #F3E6F8 0%, #E6D0EE 30%, #FAFAF7 100%)",
        mongolianName: "Жинлүүр",
        englishName: "Libra",
        element: "air",
        elementIcon: "💨",
        slug: "libra",
    },
    "scorpio": {
        icon: "♏",
        accentColor: "#C04040",
        accentGlow: "rgba(192,64,64,0.12)",
        heroGradient: "linear-gradient(135deg, #F8E0E0 0%, #EEC8C8 30%, #FAFAF7 100%)",
        mongolianName: "Хилэнц",
        englishName: "Scorpio",
        element: "water",
        elementIcon: "💧",
        slug: "scorpio",
    },
    "sagittarius": {
        icon: "♐",
        accentColor: "#D07A40",
        accentGlow: "rgba(208,122,64,0.10)",
        heroGradient: "linear-gradient(135deg, #FCEEE0 0%, #F0DCC8 30%, #FAFAF7 100%)",
        mongolianName: "Нум",
        englishName: "Sagittarius",
        element: "fire",
        elementIcon: "🔥",
        slug: "sagittarius",
    },
    "capricorn": {
        icon: "♑",
        accentColor: "#6B8090",
        accentGlow: "rgba(107,128,144,0.10)",
        heroGradient: "linear-gradient(135deg, #E8EEF2 0%, #D4DEE6 30%, #FAFAF7 100%)",
        mongolianName: "Матар",
        englishName: "Capricorn",
        element: "earth",
        elementIcon: "🌿",
        slug: "capricorn",
    },
    "aquarius": {
        icon: "♒",
        accentColor: "#30A0B0",
        accentGlow: "rgba(48,160,176,0.10)",
        heroGradient: "linear-gradient(135deg, #D8F2F6 0%, #C0E8EE 30%, #FAFAF7 100%)",
        mongolianName: "Хумх",
        englishName: "Aquarius",
        element: "air",
        elementIcon: "💨",
        slug: "aquarius",
    },
    "pisces": {
        icon: "♓",
        accentColor: "#5A68A8",
        accentGlow: "rgba(90,104,168,0.12)",
        heroGradient: "linear-gradient(135deg, #E4E8F6 0%, #D0D6EE 30%, #FAFAF7 100%)",
        mongolianName: "Загас",
        englishName: "Pisces",
        element: "water",
        elementIcon: "💧",
        slug: "pisces",
    },
};

// ============================================
// EASTERN ZODIAC — 12 Animals (Light Theme)
// ============================================

export const EASTERN_HUB_CONFIG: Record<string, SignHubConfig> = {
    "hulgan": {
        icon: "🐀",
        accentColor: "#3A8AB0",
        accentGlow: "rgba(58,138,176,0.10)",
        heroGradient: "linear-gradient(135deg, #DCF0F8 0%, #C5E4F0 30%, #FAFAF7 100%)",
        mongolianName: "Хулгана",
        element: "water",
        elementIcon: "💧",
        slug: "hulgan",
    },
    "ukher": {
        icon: "🐂",
        accentColor: "#8D7660",
        accentGlow: "rgba(141,118,96,0.10)",
        heroGradient: "linear-gradient(135deg, #F5EDE4 0%, #E8DDD0 30%, #FAFAF7 100%)",
        mongolianName: "Үхэр",
        element: "earth",
        elementIcon: "🪨",
        slug: "ukher",
    },
    "bar": {
        icon: "🐅",
        accentColor: "#4A9050",
        accentGlow: "rgba(74,144,80,0.10)",
        heroGradient: "linear-gradient(135deg, #E0F5E2 0%, #C8EAD0 30%, #FAFAF7 100%)",
        mongolianName: "Бар",
        element: "wood",
        elementIcon: "🌿",
        slug: "bar",
    },
    "tuulai": {
        icon: "🐇",
        accentColor: "#5A9A5C",
        accentGlow: "rgba(90,154,92,0.10)",
        heroGradient: "linear-gradient(135deg, #E5F5E5 0%, #D0EAD5 30%, #FAFAF7 100%)",
        mongolianName: "Туулай",
        element: "wood",
        elementIcon: "🌿",
        slug: "tuulai",
    },
    "luu": {
        icon: "🐉",
        accentColor: "#D4922A",
        accentGlow: "rgba(212,146,42,0.12)",
        heroGradient: "linear-gradient(135deg, #FFF3DC 0%, #F5E4C0 30%, #FAFAF7 100%)",
        mongolianName: "Луу",
        element: "earth",
        elementIcon: "🪨",
        slug: "luu",
    },
    "mogoi": {
        icon: "🐍",
        accentColor: "#C04040",
        accentGlow: "rgba(192,64,64,0.10)",
        heroGradient: "linear-gradient(135deg, #F8E0E0 0%, #EEC8C8 30%, #FAFAF7 100%)",
        mongolianName: "Могой",
        element: "fire",
        elementIcon: "🔥",
        slug: "mogoi",
    },
    "mori": {
        icon: "🐴",
        accentColor: "#D07040",
        accentGlow: "rgba(208,112,64,0.12)",
        heroGradient: "linear-gradient(135deg, #FCEEE0 0%, #F0DCC8 30%, #FAFAF7 100%)",
        mongolianName: "Морь",
        element: "fire",
        elementIcon: "🔥",
        slug: "mori",
    },
    "khoni": {
        icon: "🐑",
        accentColor: "#9A8880",
        accentGlow: "rgba(154,136,128,0.10)",
        heroGradient: "linear-gradient(135deg, #F0EBE8 0%, #E2DAD6 30%, #FAFAF7 100%)",
        mongolianName: "Хонь",
        element: "earth",
        elementIcon: "🪨",
        slug: "khoni",
    },
    "bich": {
        icon: "🐒",
        accentColor: "#7088A0",
        accentGlow: "rgba(112,136,160,0.10)",
        heroGradient: "linear-gradient(135deg, #E8EEF4 0%, #D4DEE8 30%, #FAFAF7 100%)",
        mongolianName: "Бич",
        element: "metal",
        elementIcon: "⚔️",
        slug: "bich",
    },
    "takhia": {
        icon: "🐓",
        accentColor: "#8090A0",
        accentGlow: "rgba(128,144,160,0.10)",
        heroGradient: "linear-gradient(135deg, #EAF0F5 0%, #D8E2EA 30%, #FAFAF7 100%)",
        mongolianName: "Тахиа",
        element: "metal",
        elementIcon: "⚔️",
        slug: "takhia",
    },
    "nokhoi": {
        icon: "🐕",
        accentColor: "#8D7660",
        accentGlow: "rgba(141,118,96,0.10)",
        heroGradient: "linear-gradient(135deg, #F2EAE2 0%, #E4D8CC 30%, #FAFAF7 100%)",
        mongolianName: "Нохой",
        element: "earth",
        elementIcon: "🪨",
        slug: "nokhoi",
    },
    "gakhai": {
        icon: "🐖",
        accentColor: "#30A0B0",
        accentGlow: "rgba(48,160,176,0.10)",
        heroGradient: "linear-gradient(135deg, #D8F2F6 0%, #C0E8EE 30%, #FAFAF7 100%)",
        mongolianName: "Гахай",
        element: "water",
        elementIcon: "💧",
        slug: "gakhai",
    },
};

// Ordered arrays for sibling navigation
export const WESTERN_SIGN_ORDER = [
    "aries", "taurus", "gemini", "cancer", "leo", "virgo",
    "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces",
];

export const EASTERN_SIGN_ORDER = [
    "hulgan", "ukher", "bar", "tuulai", "luu", "mogoi",
    "mori", "khoni", "bich", "takhia", "nokhoi", "gakhai",
];

export function getSiblings(slug: string, order: string[]): { prev: SignHubConfig | null; next: SignHubConfig | null } {
    const config = order === WESTERN_SIGN_ORDER ? WESTERN_HUB_CONFIG : EASTERN_HUB_CONFIG;
    const idx = order.indexOf(slug);
    if (idx === -1) return { prev: null, next: null };

    const prevSlug = order[(idx - 1 + order.length) % order.length];
    const nextSlug = order[(idx + 1) % order.length];

    return {
        prev: config[prevSlug] || null,
        next: config[nextSlug] || null,
    };
}
