"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAdmin) {
      // Not authorized — redirect to home
      router.push("/");
    }
  }, [loading, isAdmin, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#05060a] text-white">
        <div>Checking permissions...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // while redirecting
  }

  return <>{children}</>;
}
