"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

type Step =
    | "init"
    | "commitment"
    | "name"
    | "date"
    | "q1_pain"
    | "q2_potential"
    | "q3_friction"
    | "q4_coping"
    | "q5_energy"
    | "q6_future"
    | "q7_whynow"
    | "calculating"
    | "teaser"
    | "payment"
    | "success";

// Steps that show a progress indicator (the interactive form steps)
const PROGRESS_STEPS: Step[] = [
    "commitment",
    "name",
    "date",
    "q1_pain",
    "q2_potential",
    "q3_friction",
    "q4_coping",
    "q5_energy",
    "q6_future",
    "q7_whynow",
];

// Back navigation map: which step to go back to from each step
const BACK_MAP: Partial<Record<Step, Step>> = {
    commitment: "init",
    name: "commitment",
    date: "name",
    q1_pain: "date",
    q2_potential: "q1_pain",
    q3_friction: "q2_potential",
    q4_coping: "q3_friction",
    q5_energy: "q4_coping",
    q6_future: "q5_energy",
    q7_whynow: "q6_future",
};

const calculateZodiac = (year: number) => {
    const animals = ['Хулгана', 'Үхэр', 'Бар', 'Туулай', 'Луу', 'Могой', 'Морь', 'Хонь', 'Бич', 'Тахиа', 'Нохой', 'Гахай'];
    const elements = ['Мод', 'Гал', 'Шороо', 'Төмөр', 'Ус'];

    const y = year - 4;
    const animalIndex = ((y % 12) + 12) % 12;
    const elementIndex = Math.floor(((y % 10) + 10) % 10 / 2);

    return {
        animal: animals[animalIndex],
        element: elements[elementIndex],
    };
};

const calculateLifePath = (year: string, month: string, day: string) => {
    const sum = year + month + day;
    let total = sum.split('').reduce((a, b) => a + parseInt(b, 10), 0);
    while (total > 9 && total !== 11 && total !== 22) {
        total = String(total).split('').reduce((a, b) => a + parseInt(b, 10), 0);
    }
    return total;
};

export default function MysticForm() {
    const [step, setStep] = useState<Step>("init");
    const [name, setName] = useState("");
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");

    // Psychological Data
    const [q1, setQ1] = useState("");
    const [q2, setQ2] = useState("");
    const [q3, setQ3] = useState("");
    const [q4, setQ4] = useState("");
    const [q5, setQ5] = useState("");
    const [q6, setQ6] = useState("");
    const [q7, setQ7] = useState("");

    const [igHandle, setIgHandle] = useState("");
    const [readingData, setReadingData] = useState<{ animal: string, element: string, lifePath: number } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [aiReading, setAiReading] = useState<string[] | null>(null);
    const [apiError, setApiError] = useState<string | null>(null);

    // Urgency Timer State
    const [timeLeft, setTimeLeft] = useState(15 * 60);

    // Validation errors
    const [nameError, setNameError] = useState("");
    const [dateError, setDateError] = useState("");
    const [igError, setIgError] = useState("");

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (step === "payment" && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [step, timeLeft]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    // --- Validation helpers ---
    const validateName = (val: string): boolean => {
        if (!val.trim()) {
            setNameError("Нэрээ оруулна уу.");
            return false;
        }
        if (val.trim().length > 50) {
            setNameError("Нэр 50-аас олон тэмдэгт байж болохгүй.");
            return false;
        }
        setNameError("");
        return true;
    };

    const validateDate = (): boolean => {
        const y = parseInt(year, 10);
        const m = parseInt(month, 10);
        const d = parseInt(day, 10);

        if (year.length !== 4 || isNaN(y) || y < 1920 || y > 2025) {
            setDateError("Он 1920-2025 хооронд байх ёстой.");
            return false;
        }
        if (isNaN(m) || m < 1 || m > 12) {
            setDateError("Сар 1-12 хооронд байх ёстой.");
            return false;
        }
        if (isNaN(d) || d < 1 || d > 31) {
            setDateError("Өдөр 1-31 хооронд байх ёстой.");
            return false;
        }
        setDateError("");
        return true;
    };

    const validateIg = (val: string): boolean => {
        if (!val.trim()) {
            setIgError("Инстаграм хаягаа оруулна уу.");
            return false;
        }
        if (!val.startsWith("@") || val.length < 2) {
            setIgError("@username форматаар оруулна уу.");
            return false;
        }
        if (!/^@[a-zA-Z0-9._]{1,30}$/.test(val)) {
            setIgError("Зөвхөн латин үсэг, тоо, цэг, доогуур зураас хэрэглэнэ.");
            return false;
        }
        setIgError("");
        return true;
    };

    const handleCalculate = () => {
        const zodiac = calculateZodiac(parseInt(year, 10));
        const lifePath = calculateLifePath(year, month, day);
        setReadingData({ animal: zodiac.animal, element: zodiac.element, lifePath });

        setStep("calculating");
        setTimeout(() => {
            setStep("teaser");
        }, 5500);
    };

    const handleGenerateReading = useCallback(async () => {
        setIsSubmitting(true);
        setApiError(null);

        const payload = {
            name,
            birthdate: `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`,
            animal_sign: readingData?.animal,
            element: readingData?.element,
            life_path_number: readingData?.lifePath,
            psychology: {
                feeling: q1,
                potential_used: q2,
                friction_area: q3,
                coping_mechanism: q4,
                energy_level: q5,
                future_projection: q6,
                why_now: q7,
            },
            instagram_handle: igHandle,
        };

        try {
            const res = await fetch("/api/generate-reading", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                setApiError(data.error || "Алдаа гарлаа. Дахин оролдоно уу.");
                return;
            }

            setAiReading(data.messages);
            setStep("success");
        } catch {
            setApiError("Сүлжээний алдаа гарлаа. Дахин оролдоно уу.");
        } finally {
            setIsSubmitting(false);
        }
    }, [name, year, month, day, readingData, q1, q2, q3, q4, q5, q6, q7, igHandle]);

    // --- Progress indicator ---
    const renderProgress = () => {
        const currentIndex = PROGRESS_STEPS.indexOf(step);
        if (currentIndex === -1) return null;

        return (
            <div className="w-full mb-6 space-y-2">
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>Алхам {currentIndex + 1}/{PROGRESS_STEPS.length}</span>
                </div>
                <div className="w-full h-1 bg-border rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${((currentIndex + 1) / PROGRESS_STEPS.length) * 100}%` }}
                    />
                </div>
            </div>
        );
    };

    // --- Back button ---
    const renderBackButton = () => {
        const prevStep = BACK_MAP[step];
        if (!prevStep) return null;

        return (
            <button
                onClick={() => setStep(prevStep)}
                className="text-xs text-foreground/30 hover:text-primary transition-colors mt-4 font-serif"
            >
                &larr; Буцах
            </button>
        );
    };

    const renderQuestion = (
        title: string,
        options: string[],
        setter: (val: string) => void,
        nextStep: Step | (() => void)
    ) => (
        <div className="space-y-6 text-left w-full">
            {renderProgress()}
            <h2 className="text-lg text-primary font-serif font-medium leading-relaxed">{title}</h2>
            <div className="space-y-3">
                {options.map((option) => (
                    <button
                        key={option}
                        onClick={() => {
                            setter(option);
                            if (typeof nextStep === 'function') {
                                nextStep();
                            } else {
                                setStep(nextStep);
                            }
                        }}
                        className="w-full text-left p-4 rounded-lg bg-card/60 border border-primary/10 hover:border-primary/40 hover:bg-card text-foreground/80 transition-all text-sm leading-relaxed font-serif"
                    >
                        {option}
                    </button>
                ))}
            </div>
            {renderBackButton()}
        </div>
    );

    const renderContent = () => {
        switch (step) {
            case "init":
                return (
                    <div className="flex flex-col items-center space-y-4">
                        <Button
                            size="lg"
                            className="w-full text-lg rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-serif font-semibold transition-colors tracking-wide"
                            onClick={() => setStep("commitment")}
                        >
                            ✦ Зурхайгаа бодох
                        </Button>
                        <p className="text-sm text-foreground/30 font-serif">Гүнзгий анализ • Зөвхөн танд зориулсан</p>
                    </div>
                );

            case "commitment":
                return (
                    <div className="space-y-6 text-center">
                        {renderProgress()}
                        <h2 className="text-xl font-serif text-primary leading-relaxed">
                            Та 2026 онд өөрийнхөө <br /><span className="hero-gradient-text tracking-wide">ЖИНХЭНЭ ДАЛД ХҮЧИЙГ</span> <br />сэрээхэд бэлэн үү?
                        </h2>
                        <Button
                            onClick={() => setStep("name")}
                            className="w-full h-12 text-md font-serif font-semibold bg-card border border-primary/20 text-foreground hover:border-primary/40 hover:bg-card/80 transition-colors"
                        >
                            Тийм, би бэлэн байна
                        </Button>
                        <button
                            onClick={() => setStep("init")}
                            className="text-xs text-foreground/30 hover:text-primary transition-colors mt-2 font-serif"
                        >
                            Үгүй, би одоогоор бэлэн биш байна
                        </button>
                    </div>
                );

            case "name":
                return (
                    <div className="space-y-4 text-left">
                        {renderProgress()}
                        <div className="space-y-2">
                            <Label className="text-primary/80 font-serif">Таны нэр хэн бэ?</Label>
                            <Input
                                placeholder="Жишээ: Анужин"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    if (nameError) validateName(e.target.value);
                                }}
                                maxLength={50}
                                className="bg-card/60 border-primary/15 text-foreground placeholder:text-foreground/25 text-lg h-12 focus-visible:ring-primary/50 font-serif"
                            />
                            {nameError && <p className="text-destructive text-xs font-serif">{nameError}</p>}
                        </div>
                        <Button
                            onClick={() => {
                                if (validateName(name)) setStep("date");
                            }}
                            className="w-full mt-4 h-12 text-md font-serif"
                        >
                            Үргэлжлүүлэх
                        </Button>
                        {renderBackButton()}
                    </div>
                );

            case "date":
                return (
                    <div className="space-y-4 text-left">
                        {renderProgress()}
                        <div className="space-y-2">
                            <Label className="text-primary/80 font-serif">{name}, таны төрсөн өдөр?</Label>
                            <div className="grid grid-cols-3 gap-2 mt-2">
                                <Input placeholder="Он" value={year} onChange={(e) => { setYear(e.target.value.replace(/\D/g, '')); if (dateError) setDateError(""); }} maxLength={4} className="bg-card/60 border-primary/15 text-foreground placeholder:text-foreground/25 text-center h-12 focus-visible:ring-primary/50 font-serif" />
                                <Input placeholder="Сар" value={month} onChange={(e) => { setMonth(e.target.value.replace(/\D/g, '')); if (dateError) setDateError(""); }} maxLength={2} className="bg-card/60 border-primary/15 text-foreground placeholder:text-foreground/25 text-center h-12 focus-visible:ring-primary/50 font-serif" />
                                <Input placeholder="Өдөр" value={day} onChange={(e) => { setDay(e.target.value.replace(/\D/g, '')); if (dateError) setDateError(""); }} maxLength={2} className="bg-card/60 border-primary/15 text-foreground placeholder:text-foreground/25 text-center h-12 focus-visible:ring-primary/50 font-serif" />
                            </div>
                            {dateError && <p className="text-destructive text-xs">{dateError}</p>}
                        </div>
                        <Button
                            onClick={() => {
                                if (validateDate()) setStep("q1_pain");
                            }}
                            className="w-full mt-4 h-12 text-md font-serif"
                        >
                            Үргэлжлүүлэх
                        </Button>
                        {renderBackButton()}
                    </div>
                );

            case "q1_pain":
                return renderQuestion(
                    "1. Сүүлийн үед танд дараах мэдрэмжүүдээс аль нь хамгийн их төрж байна вэ?",
                    [
                        "Ядарсан, энергээ соруулсан мэт",
                        "Нэг л байрандаа гацчихсан мэт",
                        "Илүү том зүйл хийх ёстойгоо мэдэрч буй",
                        "Миний амьдралд өөрчлөлт яаралтай хэрэгтэй"
                    ],
                    setQ1,
                    "q2_potential"
                );

            case "q2_potential":
                return renderQuestion(
                    "2. Та одоогоор өөрийнхөө жинхэнэ нөөц бололцоо, далд хүчний хэдэн хувийг ашиглаж байна гэж боддог вэ?",
                    [
                        "Маш бага (10-30%)",
                        "Дунд зэрэг (40-60%)",
                        "Сайн мэдэхгүй байна, гэхдээ хамаагүй илүүг хийж чадна"
                    ],
                    setQ2,
                    "q3_friction"
                );

            case "q3_friction":
                return renderQuestion(
                    "3. Одоогийн байдлаар таны амьдралын аль хэсэгт хамгийн их 'гацалт' үүссэн мэт санагдаж байна?",
                    [
                        "Ажил, карьер болон санхүүгийн тогтворгүй байдал",
                        "Хайр дурлал, хүмүүстэй харилцах харилцаа",
                        "Дотоод амар амгалан, өөрийгөө олох аялал",
                        "Бүх зүйл нэг л биш, хэвийн бус байна"
                    ],
                    setQ3,
                    "q4_coping"
                );

            case "q4_coping":
                return renderQuestion(
                    "4. Энэ гацалтаас гарахын тулд та ихэвчлэн ямар үйлдэл хийдэг вэ?",
                    [
                        "Илүү шаргуу ажиллаж, өөрийгөө хүчилдэг",
                        "Хүмүүсээс чимээгүйхэн холддог",
                        "Утас ухаж, өөр зүйлд сатаарахыг оролддог",
                        "Сүнслэг зүйлс, бясалгал, зурхайгаас хариулт хайдаг"
                    ],
                    setQ4,
                    "q5_energy"
                );

            case "q5_energy":
                return renderQuestion(
                    "5. Таны өглөөний энерги, сэрэх үеийн мэдрэмж ямар түвшинд байна вэ?",
                    [
                        "Сэрэхэд л аль хэдийн ядарсан байдаг",
                        "Хэвийн боловч, өдрийг эхлүүлэх урам зориг дутагддаг",
                        "Эрч хүчтэй байдаг ч, түүнийгээ хаашаа чиглүүлэхээ мэддэггүй"
                    ],
                    setQ5,
                    "q6_future"
                );

            case "q6_future":
                return renderQuestion(
                    "6. Хэрэв таны амьдрал яг одоогийнх шигээ дахин 5 жил үргэлжилбэл танд ямар санагдах вэ?",
                    [
                        "Төсөөлөхөөс ч айдас хүрч байна",
                        "Маш гунигтай, утгагүй санагдана",
                        "Зүгээр байх, гэхдээ үүнээс илүү амьдрахыг хүсч байна"
                    ],
                    setQ6,
                    "q7_whynow"
                );

            case "q7_whynow":
                return renderQuestion(
                    "7. Та яагаад яг өнөөдөр, энэ мөчид зурхайгаа шалгахаар шийдсэн бэ?",
                    [
                        "Зүгээр л сониуч зан хөдөлсөн",
                        "Шийдвэр гаргахын тулд ямар нэг 'Дохио' хайж байна",
                        "Одоо л нэг өөрчлөлт хийх цаг нь болсон гэж төрсөн",
                        "Бүрэн төөрөлдсөн, хаашаа явахаа мэдэхгүй байна"
                    ],
                    setQ7,
                    handleCalculate
                );

            case "calculating":
                return (
                    <div className="flex flex-col items-center space-y-6 pt-4">
                        <div className="w-16 h-16 rounded-full border-2 border-primary/30 border-t-primary animate-spin"></div>
                        <div className="text-center space-y-3">
                            <p className="text-primary font-serif font-medium">9 түвшний алгоритмыг тооцоолж байна...</p>
                            <p className="text-foreground/40 text-sm font-serif">Таны мэдээллийг боловсруулж байна...</p>
                        </div>
                    </div>
                );

            case "teaser":
                return (
                    <div className="space-y-6 text-left">
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-serif text-primary">{name}</h2>
                            <p className="hero-gradient-text mt-1 font-serif tracking-wide uppercase text-sm">
                                {readingData?.animal} жил, {readingData?.element} махбодь
                            </p>
                            <p className="text-foreground/40 text-xs mt-1 font-serif">Амьдралын зам: {readingData?.lifePath}</p>
                        </div>

                        <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-xl space-y-3">
                            <h3 className="text-xs uppercase tracking-wider text-destructive font-semibold font-serif flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-destructive" /> ОНОШИЛГОО: СҮНСЛЭГ BURN-OUT
                            </h3>
                            <p className="text-foreground/70 leading-relaxed text-[15px] font-serif">
                                {name}, таны <span className="font-semibold text-foreground">&quot;{q1.toLowerCase()}&quot;</span> гэж мэдэрч, амьдралынхаа <span className="font-semibold text-foreground">&quot;{q3.toLowerCase()}&quot;</span> хамгийн их гацалттай байгаагаа хэлсэн чинь санамсаргүй зүйл биш. Бид таны 7 хариулт болон төрсөн өдрийг алгоритмаар шалгахад 2026 оны Гал Морин жилийн хүчтэй хэмнэл таны одоогийн үйлдлүүдтэй <span className="text-destructive font-medium">ноцтой зөрчилдөж байна.</span>
                            </p>
                            <p className="text-foreground/50 leading-relaxed text-sm font-serif">
                                Та <span className="font-medium text-foreground/70">&quot;{q6.toLowerCase()}&quot;</span> гэдгээ мэдсээр байж өөрийнхөө боломжийн дөнгөж {q2.match(/\d+-\d+%/)?.[0] || "багахан хувийг"} ашиглан амьдарч байгаа нь таны буруу биш, энэ бол зөвхөн одон орны энергийн буруу хуваарилалт юм.
                            </p>
                        </div>

                        <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-b from-primary/5 to-transparent p-1">
                            <div className="absolute inset-0 bg-card/95 z-10 flex flex-col items-center justify-center p-6 text-center border border-primary/15 rounded-xl">
                                <div className="mb-3 text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                                </div>
                                <h4 className="text-primary font-serif font-semibold text-lg flex items-center gap-2">
                                    Шийдэл: Хэмнэлийг Засах
                                </h4>
                                <p className="text-foreground/40 text-sm mt-2 mb-4 font-serif">
                                    Энэ гацалтаас гарах гарц буюу таны 2026 оны алтан боломжуудын нарийвчилсан 3 хэсэгт анализ.
                                </p>

                                <Button
                                    onClick={() => {
                                        setStep("payment");
                                        setTimeLeft(15 * 60);
                                    }}
                                    className="w-full font-bold font-serif text-[15px]"
                                >
                                    ✦ Тийм, би гацаанаас гармаар байна
                                </Button>
                            </div>

                            <div className="p-4 space-y-4 opacity-20 select-none pointer-events-none">
                                <div className="h-4 bg-primary/10 rounded w-3/4"></div>
                                <div className="h-4 bg-primary/10 rounded w-full"></div>
                                <div className="h-4 bg-primary/10 rounded w-5/6"></div>
                                <div className="mt-6 h-4 bg-primary/10 rounded w-1/2"></div>
                                <div className="h-4 bg-primary/10 rounded w-full"></div>
                                <div className="h-4 bg-primary/10 rounded w-4/5"></div>
                            </div>
                        </div>
                    </div>
                );

            case "payment":
                return (
                    <div className="space-y-6 text-left">
                        <div className="text-center">
                            <h2 className="text-2xl font-serif text-primary mb-2">Хувийн Зурхайгаа Авах</h2>
                            <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive text-xs font-semibold px-3 py-1.5 rounded-full border border-destructive/20 uppercase tracking-widest mt-1 font-serif">
                                <span className="w-2 h-2 rounded-full bg-destructive" />
                                Уншлага устгагдах хугацаа: {formatTime(timeLeft)}
                            </div>
                        </div>

                        <div className="bg-card/60 border border-primary/15 rounded-xl p-6 flex flex-col items-center space-y-6">
                            <div className="w-full flex items-center justify-between border-b border-primary/10 pb-4">
                                <span className="text-foreground/60 font-serif">Гал Морин Жилийн Код (3 хэсэгт):</span>
                                <span className="text-primary font-serif font-semibold text-lg">5,000₮</span>
                            </div>

                            <div className="w-48 h-48 bg-card rounded-xl flex items-center justify-center p-2 border border-primary/15">
                                <div className="w-full h-full bg-foreground/5 rounded-lg flex items-center justify-center text-foreground/40 font-serif font-bold text-center text-sm p-4">
                                    [ Энд бодит QPay QR код байрлана ]
                                </div>
                            </div>

                            <div className="space-y-2 w-full">
                                <Label className="text-primary/80 font-serif">Таны Инстаграм хаяг</Label>
                                <p className="text-xs text-foreground/30 mb-1 leading-relaxed font-serif">
                                    Бид төлбөр баталгаажмагц шууд DM-ээр 3 хэсэг бүхий нарийвчилсан зөвлөгөөгөө илгээх болно.
                                </p>
                                <Input
                                    placeholder="@username"
                                    value={igHandle}
                                    onChange={(e) => {
                                        setIgHandle(e.target.value);
                                        if (igError) validateIg(e.target.value);
                                    }}
                                    className="bg-card/60 border-primary/15 text-foreground placeholder:text-foreground/25 text-lg focus-visible:ring-primary/50 font-serif"
                                />
                                {igError && <p className="text-destructive text-xs">{igError}</p>}
                            </div>

                            {apiError && (
                                <div className="bg-destructive/10 border border-destructive/20 p-3 rounded-lg w-full">
                                    <p className="text-destructive text-sm">{apiError}</p>
                                </div>
                            )}

                            <Button
                                onClick={() => {
                                    if (validateIg(igHandle)) {
                                        handleGenerateReading();
                                    }
                                }}
                                className="w-full h-12 text-md font-bold font-serif bg-primary hover:bg-primary/90"
                                disabled={isSubmitting || timeLeft === 0}
                            >
                                {isSubmitting ? "Зурхайг үүсгэж байна..." : "Төлбөр Шалгах"}
                            </Button>

                            {timeLeft === 0 && (
                                <p className="text-destructive text-sm font-semibold text-center">
                                    Хугацаа дууссан. Хуудасаа шинэчилж дахин эхэлнэ үү.
                                </p>
                            )}
                        </div>
                        <div className="text-center">
                            <button
                                onClick={() => setStep("teaser")}
                                className="text-xs text-foreground/30 hover:text-primary transition-colors font-serif"
                                disabled={isSubmitting}
                            >
                                &larr; Буцах
                            </button>
                        </div>
                    </div>
                );

            case "success":
                return (
                    <div className="space-y-6 py-4 text-left">
                        <div className="flex flex-col items-center space-y-3 text-center mb-4">
                            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center border border-primary/20">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>
                            </div>
                            <h2 className="text-2xl font-serif text-primary">{name}, таны зурхай бэлэн боллоо!</h2>
                            <p className="hero-gradient-text text-sm font-serif">
                                {readingData?.animal} жил • {readingData?.element} махбодь • Амьдралын зам #{readingData?.lifePath}
                            </p>
                        </div>

                        {aiReading && aiReading.map((message, index) => (
                            <div
                                key={index}
                                className="bg-card/60 border border-primary/10 rounded-xl p-5 space-y-2"
                            >
                                <p className="text-foreground/70 text-[15px] leading-relaxed whitespace-pre-wrap font-serif">
                                    {message}
                                </p>
                            </div>
                        ))}

                        {!aiReading && (
                            <div className="bg-card/60 border border-primary/10 rounded-xl p-5 text-center">
                                <p className="text-foreground/40 text-sm font-serif">Уншлагын мэдээлэл олдсонгүй.</p>
                            </div>
                        )}

                        <div className="pt-4 w-full space-y-3">
                            <p className="text-center text-foreground/30 text-xs font-serif">
                                Мөн бид <span className="font-bold text-primary">{igHandle}</span> руу DM-ээр илгээх болно 🐎✦
                            </p>
                            <Button
                                onClick={() => {
                                    setStep("init");
                                    setName("");
                                    setYear("");
                                    setMonth("");
                                    setDay("");
                                    setQ1("");
                                    setQ2("");
                                    setQ3("");
                                    setQ4("");
                                    setQ5("");
                                    setQ6("");
                                    setQ7("");
                                    setIgHandle("");
                                    setAiReading(null);
                                    setApiError(null);
                                }}
                                className="w-full h-12 text-md font-serif bg-card text-foreground hover:bg-card/80 border border-primary/15"
                            >
                                Өөр хүний зурхай бодох
                            </Button>
                        </div>
                    </div>
                );
        }
    };

    return (
        <Card className="w-full bg-card/60 border-primary/10 shadow-lg shadow-primary/5 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <CardContent className="p-6 md:p-8 min-h-[300px] flex flex-col justify-center">
                {renderContent()}
            </CardContent>
        </Card>
    );
}
