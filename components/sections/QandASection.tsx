"use client";

import { useState } from "react";

type QA = {
  id: number;
  question: string;
  answer: string;
};

const qaList: QA[] = [
  {
    id: 1,
    question: "What is Fusion X 1.0?",
    answer:
      "Fusion X 1.0 is a comprehensive 3-day AI learning program followed by a one-month final project phase. Participants learn Python basics, neural networks, and build AI projects with expert guidance.",
  },
  {
    id: 2,
    question: "Do I need prior programming or AI experience?",
    answer:
      "No prior experience is required. The program starts with Python basics and builds up to advanced AI concepts. We welcome beginners and provide all the support needed to succeed.",
  },
  {
    id: 3,
    question: "What will I learn during the 3-day sessions?",
    answer:
      "Day 1: Python fundamentals and programming basics. Day 2: Neural networks and machine learning concepts. Day 3: Hands-on project building with two collaborative AI projects.",
  },
  {
    id: 4,
    question: "What happens during the final project phase?",
    answer:
      "After the 3-day intensive program, you have one month to work on your own AI project. You'll receive ongoing mentorship, regular check-ins, and guidance to develop innovative AI solutions.",
  },
  {
    id: 5,
    question: "What kind of projects can I work on?",
    answer:
      "Any AI-related project that interests you! This could include computer vision applications, natural language processing, predictive analytics, chatbots, recommendation systems, or any innovative AI solution.",
  },
  {
    id: 6,
    question: "Is there any cost to participate?",
    answer:
      "The program details and registration fees will be announced soon. We strive to make AI education accessible to everyone interested in learning.",
  },
];

export default function QandASection() {
  const [openId, setOpenId] = useState<number | null>(qaList[0].id);

  return (
    <section id="qa" className="w-full py-20 bg-black">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Questions & Answers
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Everything you need to know about Fusion X 1.0 — our AI learning
            program and final project phase.
          </p>
        </div>

        <div className="space-y-4">
          {qaList.map((item) => (
            <article
              key={item.id}
              className={`group relative rounded-2xl p-6 bg-linear-to-br from-neutral-900/60 to-neutral-900/30 border border-purple-800/30 hover:shadow-xl transition-shadow duration-300`}
            >
              <button
                onClick={() =>
                  setOpenId((prev) => (prev === item.id ? null : item.id))
                }
                aria-expanded={openId === item.id}
                className="w-full text-left flex items-start gap-4"
              >
                <div className="shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-lg bg-linear-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold">
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
        </div>
      </div>
    </section>
  );
}
