import { Lesson } from "@/lib/types";

export const lessons: Lesson[] = [
  {
    id: "w1l1",
    week: 1,
    lesson: 1,
    title: "I am a consumer",
    learningIntention: "Understand what a consumer is and recognise consumer choices in everyday life.",
    successCriteria: [
      "Define ‘consumer’.",
      "Identify consumer choices I make daily.",
      "Explain why people make different choices."
    ],
    studentFlow: [
      "Starter (5): List 5 things you used/bought today.",
      "Teach (10): Consumer = person who buys/uses goods and services.",
      "Activity (20): Sort school/home/sport/online consumption.",
      "Discussion (10): Why people choose different options?",
      "Workbook (25): Complete prompts.",
      "Exit Ticket (5).",
      "Optional reflection (5)."
    ],
    workbookPrompts: [
      "Write your own definition of consumer (1 sentence).",
      "List 3 goods and 3 services you used in the last 24 hours.",
      "Circle top 3 reasons: price / convenience / quality / friends / advertising / habit.",
      "Explain one choice in 2–3 sentences."
    ],
    exitTicket: [
      "Define consumer.",
      "Give one example of a consumer choice and one reason for it."
    ],
    faithReflection: "How can being a wise consumer be part of stewardship (using resources well)?",
    resources: {
      slides: "",
      worksheet: "",
      workbookTemplate: ""
    },
    teacher: {
      tlapFocus: "Define consumer; link to daily choices; build vocabulary foundation.",
      misconceptions: [
        "Students think consumer only means buying (not using)."
      ],
      notes: [
        "Use local examples: canteen, phone plans, streaming, gaming currency, shoes."
      ]
    },
    ai: {
      keyVocab: ["consumer", "goods", "services", "choice"],
      suggestedButtons: ["Explain", "Examples", "Plan"]
    }
  },
  {
    id: "w1l2",
    week: 1,
    lesson: 2,
    title: "Needs vs wants; goods vs services",
    learningIntention: "Distinguish needs vs wants and classify goods vs services.",
    successCriteria: [
      "Correctly classify needs and wants.",
      "Correctly classify goods and services.",
      "Justify a classification using a reason."
    ],
    studentFlow: [
      "Starter (5): If you had $20 for the week—what comes first?",
      "Teach (15): Needs vs wants; goods vs services.",
      "Practice (20): Fast sorting rounds.",
      "Scenario (15): Family budget squeeze discussion.",
      "Workbook (20).",
      "Exit Ticket (5)."
    ],
    workbookPrompts: [
      "Sort into needs/wants: phone, water, school shoes, Netflix, shelter, sport fees.",
      "Write one sentence: ‘A need is…’ / ‘A want is…’.",
      "Sort into goods/services: haircut, backpack, doctor visit, burger, bus ride, tutoring.",
      "Explain: Why can a ‘want’ feel like a ‘need’?"
    ],
    exitTicket: [
      "Write one need and one want with a reason.",
      "Write one good and one service with a reason."
    ],
    faithReflection: "How does gratitude help us keep wants in perspective?",
    resources: { slides: "", worksheet: "", workbookTemplate: "" },
    teacher: {
      tlapFocus: "Classification + justification; introduce ‘limited resources’ language.",
      misconceptions: [
        "Students assume a want is always ‘bad’; focus on priorities, not shame."
      ],
      notes: [
        "Keep examples relatable; avoid value judgments about family budgets."
      ]
    },
    ai: {
      keyVocab: ["need", "want", "goods", "services", "priority"],
      suggestedButtons: ["Explain", "Examples", "Feedback"]
    }
  }
];

// Helper: dropdown labels
export const lessonOptions = lessons
  .slice()
  .sort((a, b) => (a.week - b.week) || (a.lesson - b.lesson))
  .map(l => ({
    value: l.id,
    label: `Week ${l.week} – Lesson ${l.lesson}: ${l.title}`
  }));

export function getLesson(id: string) {
  return lessons.find(l => l.id === id) ?? lessons[0];
}
