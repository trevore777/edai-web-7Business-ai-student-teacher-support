"use client";

import { useMemo, useState } from "react";
import { lessons } from "@/content/lessons";

export default function TeacherPage() {
  const [pin, setPin] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function unlock() {
    setError(null);
    const res = await fetch("/api/ai?mode=pin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin })
    });

    if (res.ok) setUnlocked(true);
    else setError("Incorrect PIN.");
  }

  const tlapRows = useMemo(() => lessons.slice().sort((a, b) => (a.week - b.week) || (a.lesson - b.lesson)), []);

  if (!unlocked) {
    return (
      <main className="mx-auto max-w-3xl p-4">
        <h1 className="text-2xl font-semibold">Teacher tools</h1>
        <p className="text-sm opacity-80">Enter PIN to view TLAP guidance.</p>

        <div className="mt-3 flex gap-2">
          <input
            className="w-40 rounded border p-2"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="PIN"
            inputMode="numeric"
          />
          <button className="rounded border px-3" onClick={unlock}>
            Unlock
          </button>
        </div>

        {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl p-4">
      <h1 className="text-2xl font-semibold">TLAP guidance (Teacher)</h1>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="border p-2 text-left">Week</th>
              <th className="border p-2 text-left">Lesson</th>
              <th className="border p-2 text-left">Title</th>
              <th className="border p-2 text-left">TLAP focus</th>
              <th className="border p-2 text-left">Misconceptions</th>
            </tr>
          </thead>
          <tbody>
            {tlapRows.map(l => (
              <tr key={l.id}>
                <td className="border p-2">{l.week}</td>
                <td className="border p-2">{l.lesson}</td>
                <td className="border p-2">{l.title}</td>
                <td className="border p-2">{l.teacher.tlapFocus}</td>
                <td className="border p-2">{l.teacher.misconceptions.join(" • ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm opacity-80">
        Tip: Add Compass/OneDrive links in <code>/content/lessons.ts</code> to publish resources immediately.
      </p>
    </main>
  );
}
