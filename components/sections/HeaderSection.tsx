"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import logoImg from "../../assets/Final Logo FusionX.png";

const HeaderSection = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/90 backdrop-blur-xl border-b border-purple-500/20 shadow-[0_8px_32px_0_rgba(168,85,247,0.15)]"
          : "bg-black/70 backdrop-blur-md border-b border-neutral-800/50"
      }`}
    >
      {/* Animated gradient line at top */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50 animate-pulse" />
      
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4 group">
          <Link href="/" aria-label="Home" className="relative inline-block">
            {/* Glow effect behind logo */}
            <div className="absolute inset-0 bg-purple-600/30 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500" />
            <div className="relative transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <Image 
                src={logoImg} 
                alt="FusionX Logo" 
                width={50} 
                height={50}
                className="drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]"
              />
            </div>
          </Link>
        </div>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-1">
          <Link
            href="/registerpage"
            className="group relative px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:text-purple-400"
          >
            <span className="relative z-10">Register</span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-purple-600/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-purple-500 to-cyan-400 group-hover:w-3/4 transition-all duration-300" />
          </Link>
          
          {[
            { id: "out-vision", label: "Our Vision" },
            { id: "timeline", label: "Timeline" },
            { id: "final-project", label: "Final Project" },
            { id: "our-team", label: "Our Team" },
            { id: "qa", label: "Q&A" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="group relative px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:text-purple-400 hover:scale-105"
            >
              <span className="relative z-10">{item.label}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-purple-600/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-purple-500 to-cyan-400 group-hover:w-3/4 transition-all duration-300" />
            </button>
          ))}
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            aria-label="Toggle menu"
            className="relative text-white p-2 hover:bg-purple-600/20 rounded-lg transition-all duration-300 group"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="absolute inset-0 bg-purple-600/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
            <svg
              className="w-6 h-6 relative z-10 transform group-hover:scale-110 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu overlay with animation */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-purple-500/20 shadow-[0_20px_50px_rgba(168,85,247,0.2)] transition-all duration-300 overflow-hidden ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col items-center py-6 space-y-2">
            <Link
              href="/registerpage"
              className="group relative w-48 text-center px-6 py-3 text-sm font-medium text-white hover:text-purple-400 transition-all duration-300 hover:scale-105"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="relative z-10">Register</span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute inset-0 border border-purple-500/0 group-hover:border-purple-500/50 rounded-lg transition-all duration-300" />
            </Link>
            
            {[
              { id: "out-vision", label: "Our Vision" },
              { id: "timeline", label: "Timeline" },
              { id: "final-project", label: "Final Project" },
              { id: "our-team", label: "Our Team" },
              { id: "qa", label: "Q&A" }
            ].map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="group relative w-48 text-center px-6 py-3 text-sm font-medium text-white hover:text-purple-400 transition-all duration-300 hover:scale-105"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute inset-0 border border-purple-500/0 group-hover:border-purple-500/50 rounded-lg transition-all duration-300" />
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default HeaderSection;