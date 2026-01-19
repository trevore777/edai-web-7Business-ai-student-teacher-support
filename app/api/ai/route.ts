import { NextResponse } from "next/server";
import OpenAI from "openai";
import { isTeacherPinCorrect } from "@/lib/security";

export const runtime = "nodejs";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function buildStudentPrompt(payload: any) {
  const { mode, lessonTitle, keyVocab, learningIntention, promptText } = payload;

  const baseRules = `
You are a Year 7 Business & Economics learning coach in a faith-based school.
Keep answers short, clear, and step-by-step.
Do NOT ask for or store personal information. Remind the student not to include names.
Do NOT write a full “final submission” intended to be copied as-is. Instead: explain, scaffold, and give sentence starters.
Use these key vocabulary words where relevant: ${Array.isArray(keyVocab) ? keyVocab.join(", ") : ""}.
Learning intention: ${learningIntention}
Lesson: ${lessonTitle}
`;

  if (mode === "Explain") {
    return `${baseRules}
Task: Explain the key concept(s) for this lesson in 5–8 short sentences, then give 2 examples.
End with 1 question to check understanding.
Student text (optional): ${promptText || "(none)"}
`;
  }

  if (mode === "Examples") {
    return `${baseRules}
Task: Provide 5 examples (Year 7 level). For each example, include a 1-sentence explanation using key vocabulary.
Student text (optional): ${promptText || "(none)"}
`;
  }

  if (mode === "Plan") {
    return `${baseRules}
Task: Help the student plan a short paragraph answer.
Give:
1) A simple structure (Point → Evidence → Explain).
2) 3 sentence starters.
3) A checklist of 4 items to self-check.
Student text (optional): ${promptText || "(none)"}
`;
  }

  // Feedback
  return `${baseRules}
Task: Give feedback on the student's draft.
Return:
- 2 strengths
- 2 improvements
- A revised version that is ONLY a scaffold (sentence starters + blank spots), not a full final answer.
Draft:
${promptText || "(no draft provided)"}
`;
}

export async function POST(req: Request) {
  const payload = await req.json().catch(() => ({}));

  // PIN check mode (used by /teacher page)
  if (payload?.mode === "pin") {
    const ok = isTeacherPinCorrect(String(payload?.pin || ""));
    return ok
      ? NextResponse.json({ ok: true })
      : NextResponse.json({ ok: false }, { status: 401 });
  }

  // If you haven't configured OPENAI_API_KEY, fail gracefully.
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({
      text: "AI is not configured on this site yet."
    });
  }

  const input = buildStudentPrompt(payload);

  // OpenAI Responses API (recommended path)
  const response = await client.responses.create({
    model: "gpt-5.2",
    input
  });

  return NextResponse.json({ text: response.output_text });
}
