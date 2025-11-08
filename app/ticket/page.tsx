"use client";

import GenerateTicket from "@/components/GenerateTicket";
import UserService from "@/firebase/services/UserService";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function TicketContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Participant";
  const email = searchParams.get("email") || "";
  const faculty = searchParams.get("faculty") || "";

  const [isValidating, setIsValidating] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const validateRegistration = async () => {
      if (!email) {
        setIsValidating(false);
        setShowError(true);
        setTimeout(() => router.push("/registerpage"), 2000);
        return;
      }

      try {
        const registered = await UserService.isEmailRegistered(email);
        if (!registered) {
          setIsValidating(false);
          setShowError(true);
          setTimeout(() => router.push("/registerpage"), 2000);
          return;
        }
        setIsRegistered(true);
      } catch (error) {
        console.error("Error validating registration:", error);
        setIsValidating(false);
        setShowError(true);
        setTimeout(() => router.push("/registerpage"), 2000);
        return;
      }
      setIsValidating(false);
    };

    validateRegistration();
  }, [email, router]);

  if (isValidating) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-[#191b1f] p-4">
        <div className="w-full max-w-2xl bg-[#1f2227] rounded-xl shadow-xl border border-[#333842]/20 p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Validating Registration
            </h2>
            <p className="text-gray-400">
              Please wait while we verify your registration...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (showError) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-[#191b1f] p-4">
        <div className="w-full max-w-2xl bg-[#1f2227] rounded-xl shadow-xl border border-red-500/20 p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Access Denied
            </h2>
            <p className="text-red-400 text-lg font-semibold mb-2">
              You are not registered!!!
            </p>
            <p className="text-gray-400">Redirecting to registration page...</p>
            <div className="mt-4 w-full bg-gray-700 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!isRegistered) {
    return null; // Will redirect
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#191b1f] p-4">
      <div className="w-full max-w-2xl bg-[#1f2227] rounded-xl shadow-xl border border-[#333842]/20 p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Your Fusion X 1.0 Ticket
          </h1>
          <p className="text-gray-400">
            Congratulations! Your registration was successful. Download your
            ticket below.
          </p>
        </div>

        <GenerateTicket name={name} email={email} faculty={faculty} />

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Please bring this ticket to the event entrance. The QR code will be
            scanned for check-in.
          </p>
        </div>
      </div>
    </main>
  );
}

export default function TicketPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center bg-[#191b1f]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <div className="text-white text-center">
            <h2 className="text-xl font-semibold mb-2">Loading Ticket</h2>
            <p className="text-gray-400">Please wait...</p>
          </div>
        </main>
      }
    >
      <TicketContent />
    </Suspense>
  );
}
