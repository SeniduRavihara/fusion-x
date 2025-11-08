"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollVideoProps {
  src: string;
  className?: string;
  start?: string;
  end?: string;
  scrub?: number | boolean;
  pin?: boolean;
}

export default function ScrollVideo({
  src,
  className = "",
  start = "top top",
  end = "bottom top",
  scrub = 1,
  pin = false,
}: ScrollVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Wait for video metadata to load
    const handleLoadedMetadata = () => {
      const videoDuration = video.duration;

      // Create ScrollTrigger to control video playback
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: start,
        end: end,
        scrub: scrub,
        pin: pin,
        onUpdate: (self) => {
          // Calculate the current time based on scroll progress
          const currentTime = self.progress * videoDuration;

          // Only update if the difference is significant to avoid jitter
          if (Math.abs(video.currentTime - currentTime) > 0.1) {
            video.currentTime = currentTime;
          }
        },
        onEnter: () => {
          // Ensure video is ready to play
          if (video.paused) {
            video.play().catch(console.error);
          }
        },
        onLeave: () => {
          // Pause video when leaving the trigger area
          video.pause();
        },
        onEnterBack: () => {
          // Resume playing when scrolling back
          if (video.paused) {
            video.play().catch(console.error);
          }
        },
        onLeaveBack: () => {
          // Pause when scrolling back past the start
          video.pause();
        },
      });
    };

    // Load video metadata
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    // Preload video
    video.load();

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      // Kill ScrollTrigger instance
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [start, end, scrub, pin]);

  return (
    <div ref={containerRef} className={`scroll-video-container ${className}`}>
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="metadata"
        className="w-full h-auto"
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
}