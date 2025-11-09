"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useEffect, useRef } from "react";
import ScrollVideo from "@/components/ScrollVideo";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const TimelineSection = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initialize ScrollSmoother if not already done
      let smoother = ScrollSmoother.get();
      if (!smoother) {
        smoother = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.5,
          effects: true,
          smoothTouch: 0.1,
        });
      }

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

      // Timeline items with scroll-triggered highlighting
      itemsRef.current.forEach((item, index) => {
        // Initial state - all items dimmed
        gsap.set(item, { opacity: 0.3, scale: 0.95 });

        // Create ScrollTrigger for each timeline item
        ScrollTrigger.create({
          trigger: item,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            // Highlight current item
            gsap.to(item, {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              ease: "power2.out"
            });
            // Dim previous items
            itemsRef.current.forEach((prevItem, prevIndex) => {
              if (prevIndex < index) {
                gsap.to(prevItem, {
                  opacity: 0.6,
                  scale: 0.98,
                  duration: 0.3
                });
              }
            });
          },
          onLeaveBack: () => {
            // Dim current item when scrolling back
            gsap.to(item, {
              opacity: 0.3,
              scale: 0.95,
              duration: 0.3
            });
          }
        });

        // Staggered entrance animation
        gsap.fromTo(
          item,
          {
            opacity: 0,
            x: 50,
            scale: 0.9,
          },
          {
            opacity: 0.3,
            x: 0,
            scale: 0.95,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Progress indicator animation
      if (progressRef.current) {
        gsap.fromTo(
          progressRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 3,
            ease: "none",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top bottom",
              end: "bottom bottom",
              scrub: 1,
            }
          }
        );
      }

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
    <section id="timeline" className="w-full py-28 bg-transparent min-h-screen">
      <div ref={timelineRef} className="max-w-7xl mx-auto px-6">
        <h2 ref={titleRef} className="text-3xl font-bold text-white mb-4">
          Timeline
        </h2>
        <p ref={descriptionRef} className="text-white/90 max-w-3xl mb-12">
          A comprehensive 3-day intensive AI learning experience followed by a
          one-month project development phase.
        </p>

        {/* Two-column layout: Video (sticky) + Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column: Sticky Robot Video */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div ref={videoContainerRef} className="relative">
              <ScrollVideo
                src="/videos/robo-video-smooth.mp4"
                className="rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20 w-full"
              />
              {/* Progress bar */}
              <div className="mt-4 w-full bg-neutral-800 rounded-full h-2 overflow-hidden">
                <div
                  ref={progressRef}
                  className="h-full bg-linear-to-r from-purple-500 to-blue-500 rounded-full origin-left"
                ></div>
              </div>
            </div>
          </div>

          {/* Right Column: Timeline Content */}
          <div className="relative">
            {/* Extended Timeline line */}
            <div
              className="absolute left-8 top-0 w-0.5 bg-linear-to-b from-purple-500 to-blue-500"
              style={{ height: "calc(100% + 200px)" }}
            ></div>

            <div className="space-y-16">
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
                    <div className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800 transition-all duration-500">
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
      </div>
    </section>
  );
};

export default TimelineSection;
