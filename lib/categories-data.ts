export interface WesternSign {
    name: string;
    mongolianName: string;
    emoji: string;
    element: string;
    elementColor: string;
    dates: string;
}

export interface ExploreCategory {
    icon: string;
    title: string;
    description: string;
    href?: string;
    comingSoon: boolean;
}

export const WESTERN_ZODIAC: WesternSign[] = [
    { name: "Aries", mongolianName: "Хуц", emoji: "♈", element: "Гал", elementColor: "#EF5350", dates: "03/21 – 04/19" },
    { name: "Taurus", mongolianName: "Бух", emoji: "♉", element: "Шороо", elementColor: "#A1887F", dates: "04/20 – 05/20" },
    { name: "Gemini", mongolianName: "Ихэр", emoji: "♊", element: "Агаар", elementColor: "#90CAF9", dates: "05/21 – 06/20" },
    { name: "Cancer", mongolianName: "Мэлхий", emoji: "♋", element: "Ус", elementColor: "#4FC3F7", dates: "06/21 – 07/22" },
    { name: "Leo", mongolianName: "Арслан", emoji: "♌", element: "Гал", elementColor: "#EF5350", dates: "07/23 – 08/22" },
    { name: "Virgo", mongolianName: "Охин", emoji: "♍", element: "Шороо", elementColor: "#A1887F", dates: "08/23 – 09/22" },
    { name: "Libra", mongolianName: "Жинлүүр", emoji: "♎", element: "Агаар", elementColor: "#90CAF9", dates: "09/23 – 10/22" },
    { name: "Scorpio", mongolianName: "Хилэнц", emoji: "♏", element: "Ус", elementColor: "#4FC3F7", dates: "10/23 – 11/21" },
    { name: "Sagittarius", mongolianName: "Нум", emoji: "♐", element: "Гал", elementColor: "#EF5350", dates: "11/22 – 12/21" },
    { name: "Capricorn", mongolianName: "Матар", emoji: "♑", element: "Шороо", elementColor: "#A1887F", dates: "12/22 – 01/19" },
    { name: "Aquarius", mongolianName: "Хумх", emoji: "♒", element: "Агаар", elementColor: "#90CAF9", dates: "01/20 – 02/18" },
    { name: "Pisces", mongolianName: "Загас", emoji: "♓", element: "Ус", elementColor: "#4FC3F7", dates: "02/19 – 03/20" },
];

export const EXPLORE_CATEGORIES: ExploreCategory[] = [
    {
        icon: "🃏",
        title: "Монгол Тарот",
        description: "78 хуудас — Монгол архетипээр дүрслэгдсэн",
        comingSoon: true,
    },
    {
        icon: "🦴",
        title: "Шагай Мэргэ",
        description: "Шагайн мэргэ — дижитал шагай шидэлт",
        comingSoon: true,
    },
    {
        icon: "🌙",
        title: "Зүүдний Тайлал",
        description: "AI зүүдний тайлбар ба далд утга",
        comingSoon: true,
    },
    {
        icon: "🕯️",
        title: "Зан Үйлийн Хуанли",
        description: "Сарын хуанлитай өдрийн зурхай",
        comingSoon: true,
    },
    {
        icon: "🌳",
        title: "Удмын Хувь Заяа",
        description: "Өвөг дээдсийн карма ба удмын мод",
        comingSoon: true,
    },
    {
        icon: "✨",
        title: "Нэрийн Утга",
        description: "Нэрний далд утга ба тоон судлал",
        href: "/blog/neriin-utga",
        comingSoon: false,
    },
];
