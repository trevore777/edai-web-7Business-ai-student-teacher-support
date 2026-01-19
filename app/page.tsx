"use client";

import { useMemo, useState } from "react";
import { getLesson, lessonOptions } from "@/content/lessons";
import LessonView from "@/components/LessonView";

export default function HomePage() {
  const [selected, setSelected] = useState(lessonOptions[0].value);

  const lesson = useMemo(() => getLesson(selected), [selected]);

  return (
    <main className="mx-auto max-w-3xl p-4">
      <header className="mb-4">
        <h1 className="text-2xl font-semibold">Year 7 Business & Economics – Guidance</h1>
        <p className="text-sm opacity-80">
          Choose a lesson, use the prompts, and paste your work into your workbook.
        </p>
      </header>

      <label className="text-sm font-medium">Lesson</label>
      <select
        className="mt-1 w-full rounded border p-2"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        {lessonOptions.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>

      <div className="mt-4">
        <LessonView lesson={lesson} />
      </div>

      <div className="mt-8 text-sm">
        <a className="underline" href="/teacher">Teacher tools</a>
      </div>
    </main>
  );
}
