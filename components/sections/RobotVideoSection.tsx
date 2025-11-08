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
          Watch the robot come to life as you scroll. The video playback is perfectly synchronized with your scroll position.
        </p>

        {/* Scroll Video Container */}
        <div className="relative">
          <ScrollVideo
            src="/videos/robot-animation.mp4" // Replace with your actual video path
            className="rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20"
            start="top center"
            end="bottom center"
            scrub={0.5}
            pin={false}
          />

          {/* Overlay text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 opacity-80">
                Scroll to Control
              </h2>
              <p className="text-lg text-gray-300 opacity-60">
                The robot animation follows your scroll
              </p>
            </div>
          </div>
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