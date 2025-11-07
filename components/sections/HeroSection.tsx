import Image from "next/image";
import Link from "next/link";
import heroImg from "../../assets/hero-image.png";

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#0A0F1A]">
      {/* logo moved to site header */}

      {/* subtle overlay to act like a texture (hex pattern asset not found) */}
      <div
        aria-hidden
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(rgba(64,169,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          mixBlendMode: "overlay",
          opacity: 0.6,
        }}
      />

      <div className="relative z-20 grid grid-cols-1 lg:grid-cols-2 items-center min-h-screen">
        {/* Left column - text */}

        <div className="flex flex-col justify-center h-full px-8 py-20 lg:px-24 lg:py-0">
          <h1 style={{ fontFamily: 'var(--font-fusionx)' }} className="font-fusionx text-[#40A9FF] leading-tight text-5xl sm:text-6xl md:text-[5rem]">
            FusionX 1.0
          </h1>
          <p className="mt-6 max-w-xl text-[#F0F4F8] text-base sm:text-lg">
            Intelligent Protection for Tomorrow&apos;s Threats
          </p>

          <div className="mt-8">
            <Link
              href="/registerpage"
              className="inline-flex items-center gap-4 bg-linear-to-r from-purple-700 via-purple-600 to-purple-400 rounded-full px-8 py-3 text-white font-medium shadow-lg hover:brightness-105 transition"
            >
              <span>Register</span>
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-linear-to-br from-purple-900 to-purple-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-5 h-5 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14M12 5l7 7-7 7"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        {/* Right column - image */}
        <div className="flex items-center justify-center px-6 py-12 lg:py-0">
          <div className="w-full max-w-3xl">
            <Image
              src={heroImg}
              alt="Robot"
              className="object-contain"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
