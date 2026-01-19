"use client";

import { Lesson } from "@/lib/types";
import AiCoach from "@/components/AiCoach";

function ResourceLink({ label, href }: { label: string; href?: string }) {
  if (!href) return null;
  return (
    <a className="underline" href={href} target="_blank" rel="noreferrer">
      {label}
    </a>
  );
}

export default function LessonView({ lesson }: { lesson: Lesson }) {
  return (
    <section className="rounded border p-4">
      <h2 className="text-xl font-semibold">
        Week {lesson.week} – Lesson {lesson.lesson}: {lesson.title}
      </h2>

      <div className="mt-3">
        <h3 className="font-semibold">Learning intention</h3>
        <p>{lesson.learningIntention}</p>
      </div>

      <div className="mt-3">
        <h3 className="font-semibold">Success criteria</h3>
        <ul className="list-disc pl-5">
          {lesson.successCriteria.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      </div>

      <div className="mt-3">
        <h3 className="font-semibold">Lesson flow (80 minutes)</h3>
        <ol className="list-decimal pl-5">
          {lesson.studentFlow.map((s, i) => <li key={i}>{s}</li>)}
        </ol>
      </div>

      <div className="mt-3">
        <h3 className="font-semibold">Resources</h3>
        <div className="flex flex-col gap-1">
          <ResourceLink label="Slides" href={lesson.resources.slides} />
          <ResourceLink label="Worksheet" href={lesson.resources.worksheet} />
          <ResourceLink label="Workbook template" href={lesson.resources.workbookTemplate} />
          {!lesson.resources.slides && !lesson.resources.worksheet && !lesson.resources.workbookTemplate ? (
            <p className="text-sm opacity-70">Teacher will provide links.</p>
          ) : null}
        </div>
      </div>

      <div className="mt-3">
        <h3 className="font-semibold">Workbook prompts</h3>
        <ul className="list-disc pl-5">
          {lesson.workbookPrompts.map((p, i) => <li key={i}>{p}</li>)}
        </ul>
      </div>

      <div className="mt-3">
        <h3 className="font-semibold">Exit ticket (2)</h3>
        <ol className="list-decimal pl-5">
          {lesson.exitTicket.map((q, i) => <li key={i}>{q}</li>)}
        </ol>
      </div>

      {lesson.faithReflection ? (
        <div className="mt-3 rounded bg-neutral-50 p-3">
          <h3 className="font-semibold">Faith reflection (optional)</h3>
          <p>{lesson.faithReflection}</p>
        </div>
      ) : null}

      <div className="mt-4">
        <AiCoach lesson={lesson} />
      </div>
    </section>
  );
}
