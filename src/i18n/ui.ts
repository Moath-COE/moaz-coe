import type { Lang, Multi } from "@types";

export const languages: Multi = {
  ar: "العربية",
  en: "English",
};

export const defaultLang: Lang = "ar";

export const labels: Record<
  Lang,
  {
    home: string;
    blog: string;
    about: string;
    tags: string;
    empty: string;
    previous: string;
    next: string;
    rss: string;
    updated: string;
    rights: string;
    recent: string;
    allPosts: string;
    newer: string;
    older: string;
    skip: string;
    theme: string;
    notFound: string;
    notFoundText: string;
    contents: string;
    focus: string;
    skills: string;
    copy: string;
    copied: string;
    github: string;
    pinned: string;
    less: string;
    more: string;
    profile: string;
    social: string;
  }
> = {
  ar: {
    home: "الرئيسية",
    blog: "المقالات",
    about: "من انا",
    tags: "التصنيفات",
    empty: "لا توجد مقالات منشورة بعد. ستظهر هنا قريبًا.",
    previous: "السابق",
    next: "التالي",
    rss: "RSS",
    updated: "اخر تحديث",
    rights: "جميع الحقوق محفوظة",
    recent: "أحدث المقالات",
    allPosts: "كل المقالات",
    newer: "الأحدث",
    older: "الأقدم",
    skip: "انتقل إلى المحتوى",
    theme: "تبديل المظهر",
    notFound: "الصفحة غير موجودة",
    notFoundText: "ربما نُقلت هذه الصفحة أو لم تُكتب بعد.",
    contents: "في هذا المقال",
    focus: "مواضيع المقالات",
    skills: "الأدوات والمهارات",
    copy: "نسخ",
    copied: "تم النسخ",
    github: "على GitHub",
    pinned: "مشاريع مثبّتة",
    less: "أقل",
    more: "أكثر",
    profile: "الملف على GitHub",
    social: "حساباتي",
  },
  en: {
    home: "Home",
    blog: "Writing",
    about: "About",
    tags: "Topics",
    empty: "No published posts yet. Check back soon.",
    previous: "Previous",
    next: "Next",
    rss: "RSS",
    updated: "Updated",
    rights: "All rights reserved",
    recent: "Recent writing",
    allPosts: "All posts",
    newer: "Newer",
    older: "Older",
    skip: "Skip to content",
    theme: "Toggle theme",
    notFound: "Page not found",
    notFoundText: "This page may have moved, or it hasn’t been written yet.",
    contents: "In this post",
    focus: "What I write about",
    skills: "Skills & tools",
    copy: "Copy",
    copied: "Copied",
    github: "On GitHub",
    pinned: "Pinned projects",
    less: "Less",
    more: "More",
    profile: "GitHub profile",
    social: "Find me on",
  },
};

export const kinds: Record<
  Lang,
  Record<"engineering" | "business" | "project", string>
> = {
  ar: { engineering: "هندسة", business: "أعمال", project: "دراسة حالة" },
  en: {
    engineering: "Engineering",
    business: "Business",
    project: "Case study",
  },
};

export function readingTime(locale: Lang, minutes: number): string {
  if (locale === "en") return `${minutes} min read`;
  const n = new Intl.NumberFormat("ar").format(minutes);
  switch (new Intl.PluralRules("ar").select(minutes)) {
    case "one":
      return "دقيقة واحدة للقراءة";
    case "two":
      return "دقيقتان للقراءة";
    case "few":
      return `${n} دقائق للقراءة`;
    default:
      return `${n} دقيقة للقراءة`;
  }
}

export function postCount(locale: Lang, count: number): string {
  if (locale === "en") return `${count} ${count === 1 ? "post" : "posts"}`;
  const n = new Intl.NumberFormat("ar").format(count);
  switch (new Intl.PluralRules("ar").select(count)) {
    case "zero":
      return "لا مقالات";
    case "one":
      return "مقال واحد";
    case "two":
      return "مقالان";
    case "few":
      return `${n} مقالات`;
    case "many":
      return `${n} مقالًا`;
    default:
      return `${n} مقال`;
  }
}

export function contributions(locale: Lang, count: number): string {
  if (locale === "en")
    return `${count.toLocaleString("en")} ${count === 1 ? "contribution" : "contributions"}`;
  const n = new Intl.NumberFormat("ar").format(count);
  switch (new Intl.PluralRules("ar").select(count)) {
    case "zero":
      return "لا مساهمات";
    case "one":
      return "مساهمة واحدة";
    case "two":
      return "مساهمتان";
    case "few":
      return `${n} مساهمات`;
    case "many":
      return `${n} مساهمةً`;
    default:
      return `${n} مساهمة`;
  }
}

export const ogStrings: Multi = { ar: "ar_AR", en: "en_US" };
