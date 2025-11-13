"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function AdminLoginPage() {
  const { user, loading, isAdmin, signInWithGoogle } = useAuth();
  const router = useRouter();
  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Don't auto-redirect - let users see the login page
  }, [user, loading, isAdmin, router]);

  const handleGoogleSignIn = async () => {
    try {
      setSigningIn(true);
      setError("");
      await signInWithGoogle();
      // Redirect will happen in useEffect when isAdmin becomes true
    } catch (err) {
      console.error("Google sign-in failed:", err);
      setError("Failed to sign in with Google. Please try again.");
      setSigningIn(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#05060a] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (user && isAdmin) {
    return (
      <div className="min-h-screen bg-[#05060a] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-neutral-900/30 rounded-lg border border-neutral-800 p-8 text-center">
          <div className="text-green-400 text-xl font-semibold mb-4">
            Already Logged In
          </div>
          <div className="text-white/70 mb-6">
            You are already logged in as an admin.
          </div>
          <div className="space-y-3">
            <button
              onClick={() => router.push("/admin")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Go to Admin Panel
            </button>
            <button
              onClick={() => router.push("/")}
              className="w-full bg-neutral-600 hover:bg-neutral-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (user && !isAdmin) {
    return (
      <div className="min-h-screen bg-[#05060a] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-neutral-900/30 rounded-lg border border-neutral-800 p-8 text-center">
          <div className="text-red-400 text-xl font-semibold mb-4">
            Access Denied
          </div>
          <div className="text-white/70 mb-6">
            You don&apos;t have admin privileges. Please contact an
            administrator to grant you access.
          </div>
          <button
            onClick={() => router.push("/")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05060a] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-neutral-900/30 rounded-lg border border-neutral-800 p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-white/70">Sign in with your Google account</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-700 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <button
          onClick={handleGoogleSignIn}
          disabled={signingIn}
          className="w-full bg-white hover:bg-gray-100 text-gray-900 px-6 py-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {signingIn ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
              Signing in...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </>
          )}
        </button>

        <div className="mt-6 text-center">
          <button
            onClick={() => router.push("/")}
            className="text-white/70 hover:text-white text-sm transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
