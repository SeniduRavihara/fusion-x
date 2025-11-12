"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RegisterPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center text-white py-12">
      <div className="w-full max-w-2xl mx-auto p-8 bg-neutral-900/40 rounded-2xl border border-purple-800/30 shadow-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Redirecting...
          </h2>
          <p className="text-gray-400">
            Registration is closed. Taking you back to the home page.
          </p>
        </div>
      </div>
    </main>
  );
}
