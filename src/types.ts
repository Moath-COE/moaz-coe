export type Lang = "ar" | "en";
export type Multi = Record<Lang, string>;

export interface Site {
  title: Multi;
  description: Multi;
  expand: Multi;
  author: Multi;
  role: Multi;
  photo: string;
  github?: string;
  social: { linkedin?: string; github?: string; youtube?: string; x?: string };
  contact: Multi;
  focus: { title: Multi; text: Multi }[];
  skills: string[];
}
