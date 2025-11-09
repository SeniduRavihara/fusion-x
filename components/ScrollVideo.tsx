"use client";

import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

interface ScrollVideoProps {
  src: string;
  className?: string;
}

export default function ScrollVideo({ src, className = "" }: ScrollVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Initialize ScrollSmoother FIRST (only once)
    let smoother = ScrollSmoother.get();
    if (!smoother) {
      smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5, // Smoothing duration in seconds
        effects: true,
        smoothTouch: 0.1, // Smooth scrolling on touch devices too
      });
    }

    // Explicitly prevent auto-play
    video.autoplay = false;
    video.pause();

    // Wait for video metadata to load
    const handleLoadedMetadata = () => {
      // Ensure video stays paused
      video.pause();

      // Create ScrollTrigger to control video with pinning
      // Using a lower scrub value for smoother integration with ScrollSmoother
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "+=200%",
        scrub: 0.2, // Reduced from 3.0 for smoother playback
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          video.currentTime = video.duration * self.progress;
        },
      });
    };

    // Prevent any auto-play attempts
    const preventAutoPlay = () => {
      if (!video.paused) {
        video.pause();
      }
    };

    // Load video metadata
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("canplay", preventAutoPlay);
    video.addEventListener("play", preventAutoPlay);

    // Preload video
    video.load();

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("canplay", preventAutoPlay);
      video.removeEventListener("play", preventAutoPlay);
      // Kill all ScrollTriggers for this component
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div ref={containerRef} className={`scroll-video-container ${className}`}>
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        autoPlay={false}
        preload="metadata"
        className="w-[] h-auto"
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
}
