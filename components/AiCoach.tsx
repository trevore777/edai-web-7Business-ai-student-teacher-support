"use client";

import { useState } from "react";
import { Lesson } from "@/lib/types";

export default function AiCoach({ lesson }: { lesson: Lesson }) {
  const [draft, setDraft] = useState("");
  const [mode, setMode] = useState<"Explain" | "Examples" | "Plan" | "Feedback">("Explain");
  const [out, setOut] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function run() {
    setLoading(true);
    setOut("");
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mode,
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        keyVocab: lesson.ai.keyVocab,
        learningIntention: lesson.learningIntention,
        promptText: draft
      })
    });
    const data = await res.json();
    setOut(data?.text || "No response.");
    setLoading(false);
  }

  return (
    <section className="rounded border p-3">
      <h3 className="font-semibold">AI Guidance (optional)</h3>
      <p className="text-sm opacity-80">
        Do not include names or personal details. Use this to plan and improve your own work.
      </p>

      <div className="mt-2 flex flex-wrap gap-2">
        {(["Explain", "Examples", "Plan", "Feedback"] as const).map(m => (
          <button
            key={m}
            className={`rounded border px-3 py-1 text-sm ${mode === m ? "bg-neutral-100" : ""}`}
            onClick={() => setMode(m)}
          >
            {m}
          </button>
        ))}
      </div>

      <textarea
        className="mt-2 w-full rounded border p-2 text-sm"
        rows={4}
        placeholder={mode === "Feedback" ? "Paste your draft here for feedback..." : "Optional: add your idea or question here..."}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
      />

      <div className="mt-2">
        <button className="rounded border px-3 py-1 text-sm" onClick={run} disabled={loading}>
          {loading ? "Thinking..." : "Get guidance"}
        </button>
      </div>

      {out ? (
        <div className="mt-3 whitespace-pre-wrap rounded bg-neutral-50 p-3 text-sm">
          {out}
        </div>
      ) : null}
    </section>
  );
}
