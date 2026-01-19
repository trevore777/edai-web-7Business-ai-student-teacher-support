export type Lesson = {
  id: string;              // "w1l1"
  week: number;            // 1..8
  lesson: number;          // 1..16
  title: string;

  learningIntention: string;
  successCriteria: string[];

  studentFlow: string[];   // 80-min flow steps
  workbookPrompts: string[];
  exitTicket: string[];    // exactly 2
  faithReflection?: string;

  resources: {
    slides?: string;       // OneDrive/Compass link
    worksheet?: string;    // OneDrive/Compass link
    workbookTemplate?: string; // Google Doc copy link
  };

  teacher: {
    tlapFocus: string;       // one-liner TLAP intent
    misconceptions: string[];
    notes: string[];
  };

  ai: {
    keyVocab: string[];
    suggestedButtons: Array<"Explain" | "Examples" | "Plan" | "Feedback">;
  };
};
