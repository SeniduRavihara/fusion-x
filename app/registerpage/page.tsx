import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0A0F1A] text-white">
      <div className="max-w-2xl mx-auto p-8">
        <h1 className="text-3xl font-bold">Register</h1>
        <p className="mt-4 text-white/80">
          Registration page placeholder. Add form here.
        </p>
        <div className="mt-6">
          <Link href="/" className="text-blue-400 hover:underline">
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}
