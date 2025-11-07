import Image from "next/image";
import Link from "next/link";
import logoImg from "../../assets/Final Logo FusionX.png";

const HeaderSection = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-4">
          <Link href="/" aria-label="Home" className="inline-block">
            <Image src={logoImg} alt="FusionX Logo" width={60} height={60} />
          </Link>
        </div>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-6">
          <a
            href="/registerpage"
            className="text-sm text-white hover:underline"
          >
            Register
          </a>
          <a href="#out-vision" className="text-sm text-white hover:underline">
            Our Vision
          </a>
          <a href="#timeline" className="text-sm text-white hover:underline">
            Timeline
          </a>
          <a
            href="#final-project"
            className="text-sm text-white hover:underline"
          >
            Final Project
          </a>
          <a href="#our-team" className="text-sm text-white hover:underline">
            Our Team
          </a>
          <a href="#qa" className="text-sm text-white hover:underline">
            Q&amp;A
          </a>
        </nav>

        {/* mobile menu placeholder */}
        <div className="md:hidden">
          <button aria-label="Open menu" className="text-white">
            Menu
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderSection;
