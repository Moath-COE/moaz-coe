import type { Site } from "@types";

// Your profile. Everything on the home and About pages reads from here.
export const site: Site = {
  title: { ar: "مدونة معاذ", en: "Moaz-COE" },
  description: {
    ar: "أبني منتجات ذكاء اصطناعي تصنع فرقًا حقيقيًا.",
    en: "I build AI products that deliver real value.",
  },
  expand: {
    ar: "الذكاء الاصطناعي يتطور بسرعة كبيرة، لكن كثير من الناس يركزون على التقنية نفسها بدلًا من المشاكل التي يمكن أن تحلها. أؤمن أن القيمة الحقيقية تبدأ من فهم مشاكل الناس واحتياجاتهم، ثم استخدام الذكاء الاصطناعي لبناء منتجات عملية تقدم حلولًا مفيدة وتصنع فرقًا حقيقيًا.",
    en: "AI is advancing rapidly, but too often, the focus is on the technology itself rather than the problems it can solve. Real value comes from understanding people's needs and turning AI capabilities into practical, reliable products that make a meaningful difference.",
  },
  author: { ar: "معاذ", en: "Moaz" },
  role: { ar: "مهندس ذكاء اصطناعي", en: "AI Engineer" },
  photo: "/me.jpeg",
  github: "Moath-COE", // Your GitHub username. Remove to hide the GitHub section.
  // Profile links shown on the home page and in the footer. Leave a value empty to hide it.
  social: {
    linkedin: "https://www.linkedin.com/in/moaz-abdelaziz-7a8461236/", // TODO: e.g. "https://www.linkedin.com/in/your-name"
    github: "https://github.com/Moath-COE",
    youtube: "https://www.youtube.com/@MoathAbdelaziz/", // TODO: e.g. "https://www.youtube.com/@your-channel"
    x: "https://x.com/Moath_COE",
  },
  contact: { ar: "", en: "" }, // Optional. Add a real address to display a contact link.

  // The three topics shown under the introduction on the home page.
  focus: [
    {
      title: { ar: "الذكاء الاصطناعي", en: "AI engineering" },
      text: {
        ar: "أشارك أفكاري وتجاربي في عالم الذكاء الاصطناعي، من أحدث التقنيات والتطورات إلى تطبيقاتها العملية وكيف يمكن استخدامها لحل مشاكل حقيقية.",
        en: "Exploring AI technologies, emerging trends, and practical applications, with a focus on building intelligent systems that solve real-world problems.",
      },
    },
    {
      title: { ar: "ريادة الأعمال", en: "Entrepreneurship" },
      text: {
        ar: "أشارك أفكاري وما أتعلمه عن ريادة الأعمال، وبناء الشركات الناشئة، وتطوير المنتجات، والتحديات التي تواجه تحويل الأفكار إلى مشاريع ناجحة.",
        en: "Sharing thoughts and lessons on startups, business strategy, product development, and the challenges of turning ideas into successful businesses.",
      },
    },
    {
      title: { ar: "توثيق المشاريع", en: "Project Documentation" },
      text: {
        ar: "أوثّق المشاريع التي أعمل عليها، وأشارك تفاصيل بنائها، والقرارات التقنية، والتحديات التي واجهتني، والحلول والدروس التي تعلمتها خلال العمل.",
        en: "A behind-the-scenes look at projects I work on, documenting technical decisions, challenges, solutions, and lessons learned along the way.",
      },
    },
  ],

  skills: [
    "Python",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "FastAPI",
    "REST APIs",
    "PostgreSQL",
    "MongoDB",
    "SQL",
    "Drizzle ORM",
    "Docker",
    "Linux",
    "AWS",
    "Git",
    "CI/CD",
    "LLMs",
    "AI Agents",
    "Multi-Agent Systems",
    "RAG",
    "Prompt Engineering",
    "Tool Calling",
    "Agent Memory",
    "AI Evaluation",
    "Voice AI",
    "LiveKit",
    "Langfuse",
    "Product Development",
    "Product Strategy",
    "Technical Architecture",
  ],
};
