"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Inline chevron icons
function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className={className}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className={className}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
    </svg>
  );
}

// Team member interface
interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

// Team members array
const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Olivia Wilson",
    role: "Manager",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Avery Davis",
    role: "CEO",
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Benjamin Shah",
    role: "Marketing",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Emma Rodriguez",
    role: "Designer",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    name: "Michael Chen",
    role: "Developer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
  },
];

export default function OurTeamSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [dots, setDots] = useState<number[]>([]);

  // Calculate items per view
  const getItemsPerView = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1280) return 4;
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }
    return 3;
  };

  // Update items per view and dots on mount and resize
  useEffect(() => {
    const updateItemsPerView = () => {
      const newItemsPerView = getItemsPerView();
      setItemsPerView(newItemsPerView);
      const numDots = Math.ceil(teamMembers.length / newItemsPerView);
      setDots(Array.from({ length: numDots }, (_, i) => i));
    };

    updateItemsPerView();

    if (typeof window !== "undefined") {
      window.addEventListener("resize", updateItemsPerView);
      return () => window.removeEventListener("resize", updateItemsPerView);
    }
  }, []);

  const maxIndex = Math.max(0, teamMembers.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section
      id="our-team"
      className="relative min-h-screen bg-black py-32 px-4 overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      {/* Subtle glow accent */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title Section */}
        <div className="text-center mb-24">
          <span className="text-purple-400 text-xs font-semibold tracking-[0.2em] uppercase mb-6 block">
            Our Team
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            Meet the Team Behind{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              FusionX
            </span>
          </h1>

        </div>

        {/* Carousel */}
        <div className="overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="shrink-0 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 flex flex-col items-center group"
              >
                {/* Card */}
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:bg-gray-800/50 hover:shadow-2xl hover:shadow-purple-500/20 w-full max-w-sm">
                  {/* Image Container */}
                  <div className="relative mb-6 flex justify-center">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 scale-110" />
                    <div className="relative rounded-full p-1 bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500">
                      <div className="relative w-48 h-48 rounded-full overflow-hidden bg-black">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/40 via-transparent to-blue-600/40 mix-blend-overlay" />
                      </div>
                    </div>
                  </div>

                  {/* Member Info */}
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-300 italic">
                      {member.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-3 mt-12">
          {dots.map((index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "bg-purple-500 w-8"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
