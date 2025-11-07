"use client";

import { useMemo, useState } from "react";

type QA = {
  id: number;
  question: string;
  answer: string;
};

const qaList: QA[] = [
  {
    id: 1,
    question: "What is FusionX 1.0 and who should join?",
    answer:
      "FusionX 1.0 is an intensive hands-on program for builders and makers who want to accelerate product prototyping and team collaboration. It's ideal for students, early-stage founders, and developers interested in applied AI and robotics.",
  },
  {
    id: 2,
    question: "Do I need prior experience in robotics or AI?",
    answer:
      "No. The program welcomes beginners and experienced participants. We provide mentorship and workshops that cover fundamentals and advanced topics so teams can progress together.",
  },
  {
    id: 3,
    question: "How long is the program and what is the time commitment?",
    answer:
      "FusionX 1.0 runs for 8 weeks with a mix of weekend workshops and weekday mentor sessions. Typical commitment is 6-10 hours per week depending on your role in the team.",
  },
  {
    id: 4,
    question: "Is there a certificate or demo day at the end?",
    answer:
      "Yes — participants present their final projects during a demo day. Outstanding projects receive recognition and networking opportunities with partners.",
  },
];

export default function QandASection() {
  const [openId, setOpenId] = useState<number | null>(qaList[0].id);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return qaList;
    const q = query.toLowerCase();
    return qaList.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <section id="qa" className="w-full py-20 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Questions & Answers
            </h2>
            <p className="mt-2 text-white/80 max-w-2xl">
              Answers to common questions about FusionX — if you don&apos;t find
              what you&apos;re looking for, drop us a message.
            </p>
          </div>

          <div className="w-full md:w-1/3">
            <label htmlFor="qa-search" className="sr-only">
              Search questions
            </label>
            <div className="relative">
              <input
                id="qa-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search questions..."
                className="w-full rounded-full bg-neutral-900/60 border border-purple-700/30 py-3 px-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400">
                🔍
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((item) => (
            <article
              key={item.id}
              className={`group relative rounded-2xl p-6 bg-gradient-to-br from-neutral-900/60 to-neutral-900/30 border border-purple-800/30 hover:shadow-xl transition-shadow duration-300`}
            >
              <button
                onClick={() =>
                  setOpenId((prev) => (prev === item.id ? null : item.id))
                }
                aria-expanded={openId === item.id}
                className="w-full text-left flex items-start gap-4"
              >
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold">
                    Q
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">
                    {item.question}
                  </h3>
                  <div
                    className={`mt-4 text-white/80 overflow-hidden transition-[max-height] duration-300 ${
                      openId === item.id ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <p className="leading-relaxed">{item.answer}</p>
                  </div>
                </div>
                <div className="ml-4 flex items-center">
                  <svg
                    className={`w-5 h-5 text-purple-400 transform transition-transform duration-300 ${
                      openId === item.id ? "rotate-180" : "rotate-0"
                    }`}
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M6 8l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>
            </article>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-1 md:col-span-2 rounded-2xl p-8 bg-neutral-900/40 border border-neutral-800 text-center text-white/70">
              No results. Try another keyword.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
