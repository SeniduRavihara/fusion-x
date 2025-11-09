"use client";

import ScrollVideo from "@/components/ScrollVideo";

export default function RobotVideoSection() {
  return (
    <section className="relative min-h-screen bg-black py-20 px-4 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-purple-900/20 blur-3xl" />
      <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-purple-900/20 blur-3xl" />

      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold text-white text-center mb-20 tracking-tight">
          Robot Animation
        </h1>

        {/* Description */}
        <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
          Watch the robot come to life as you scroll. The video playback is
          perfectly synchronized with your scroll position.
        </p>

        {/* Scroll Video Container */}
        <div className="relative">
          <ScrollVideo
            src="/videos/robo-video-smooth.mp4"
            className="rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20"
          />
        </div>

        {/* Instructions */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 text-lg">
            ↑ Scroll up to rewind • ↓ Scroll down to fast-forward
          </p>
        </div>
      </div>
    </section>
  );
}
