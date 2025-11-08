"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

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

    // Explicitly prevent auto-play
    video.autoplay = false;
    video.pause();

    // Wait for video metadata to load
    const handleLoadedMetadata = () => {
      // Ensure video stays paused
      video.pause();

      // Create ScrollTrigger to control video with pinning
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "+=1000%",
        scrub: 3.0,
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
