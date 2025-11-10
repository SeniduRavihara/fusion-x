"use client";

import Image from "next/image";
import backgroundImg from "../../assets/background.png";
import SessionsStack from "./SessionsStack";
import TimelineVideoSection from "./TimelineVideoSection";

const TimelineSection = () => {
  return (
    <section
      id="timeline"
      className="w-full -mt-10 bg-black md:min-h-screen relative py-20 md:py-20"
    >
      {/* Background pattern - top left corner */}
      <div className="absolute top-8 left-8 z-0 opacity-10">
        <Image
          src={backgroundImg}
          alt=""
          width={400}
          height={400}
          className="w-64 h-64 md:w-96 md:h-96 object-contain"
        />
      </div>

      {/* Background pattern - bottom right corner */}
      <div className="absolute bottom-8 right-8 z-0 opacity-10">
        <Image
          src={backgroundImg}
          alt=""
          width={200}
          height={200}
          className="w-32 h-32 md:w-48 md:h-48 object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            3-Day AI Learning Journey
          </h2>
          <p className="text-white/70 text-lg max-w-3xl">
            A comprehensive intensive learning experience designed to transform
            beginners into AI practitioners.
          </p>
        </div>

        {/* Two-column layout: Video (sticky) + Timeline Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column: Sticky Robot Video */}
          <div className="lg:sticky mt-20 lg:top-8 lg:self-start">
            <TimelineVideoSection />
          </div>

          {/* Right Column: Stacked Cards */}
          <div className="relative">
            <SessionsStack />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
