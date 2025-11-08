"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const TimelineSection = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Description animation
      gsap.fromTo(
        descriptionRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: descriptionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Timeline items staggered animation
      itemsRef.current.forEach((item, index) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
            scale: 0.9,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  const timelineItems = [
    {
      day: "Day 1",
      title: "Python Basics & Fundamentals",
      description:
        "Introduction to Python programming, data structures, and basic concepts essential for AI development.",
    },
    {
      day: "Day 2",
      title: "Neural Networks & Machine Learning",
      description:
        "Hands-on learning about neural networks, basic machine learning algorithms, and practical implementations.",
    },
    {
      day: "Day 3",
      title: "Project Building Workshop",
      description:
        "Collaborative session where participants build two AI projects with guidance from mentors.",
    },
  ];

  return (
    <section id="timeline" className="w-full py-28 bg-transparent">
      <div ref={timelineRef} className="max-w-6xl mx-auto px-6">
        <h2 ref={titleRef} className="text-3xl font-bold text-white mb-4">
          Timeline
        </h2>
        <p ref={descriptionRef} className="text-white/90 max-w-3xl mb-12">
          A comprehensive 3-day intensive AI learning experience followed by a
          one-month project development phase.
        </p>

        <div className="relative">
          {/* Extended Timeline line that goes beyond this section */}
          <div
            className="absolute left-8 top-0 w-0.5 bg-linear-to-b from-purple-500 to-blue-500"
            style={{ height: "calc(100vh + 200px)" }}
          ></div>

          <div className="space-y-12">
            {timelineItems.map((item, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) itemsRef.current[index] = el;
                }}
                className="relative flex items-start gap-8"
              >
                {/* Timeline dot */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-linear-to-br from-purple-600 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg">
                  {index + 1}
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                  <div className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {item.day}: {item.title}
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
