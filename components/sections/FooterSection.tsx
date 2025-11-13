"use client";

import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

export default function FooterSection() {
  // use global auth context for authoritative admin state; prefer global when available
  const { isAdmin: globalIsAdmin } = useAuth();
  const showAdmin = Boolean(globalIsAdmin);

  return (
    <footer className="w-full py-12 bg-black">
      <div className="max-w-6xl mx-auto px-6 text-center text-white/80 flex items-center justify-between">
        <p>© {new Date().getFullYear()} FusionX. All rights reserved.</p>

        <div>
          {showAdmin ? (
            <Link
              href="/admin"
              className="ml-4 inline-block rounded-full bg-purple-600 px-4 py-2 text-white font-medium hover:bg-purple-700"
            >
              Admin
            </Link>
          ) : (
            <Link
              href="/admin-login"
              className="ml-4 inline-block rounded-full bg-neutral-800/60 px-4 py-2 text-white font-medium hover:bg-neutral-800"
            >
              Admin
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
}
