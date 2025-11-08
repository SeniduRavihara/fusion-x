"use client";

import { doc, getDoc } from "firebase/firestore";
import { Chrome } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase/config";
import AuthService from "../../firebase/services/AuthService";

export default function FooterSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // use global auth context for authoritative admin state; prefer global when available
  const { isAdmin: globalIsAdmin } = useAuth();
  const showAdmin = Boolean(globalIsAdmin || isAdmin);

  const openModal = () => {
    setMessage(null);
    setModalOpen(true);
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const u = await AuthService.googleSignIn();

      if (!u) {
        setMessage("Google sign-in failed.");
        return;
      }

      const adminRef = doc(db, "admins", u.uid);
      const snap = await getDoc(adminRef);
      if (!snap.exists()) {
        setMessage(
          "Signed in. You do not have admin access. Ask an existing admin to promote your account to 'admins' in Firestore."
        );
        setIsAdmin(false);
      } else {
        const data = snap.data() as unknown as { role?: string };
        if (data.role === "admins") {
          setIsAdmin(true);
          setMessage(
            "Signed in with admin access. You can now open the Admin panel."
          );
        } else {
          setIsAdmin(false);
          setMessage("Signed in. You do not have admin access.");
        }
      }
    } catch (err) {
      console.error(err);
      setMessage("Authentication failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

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
            <button
              onClick={openModal}
              className="ml-4 inline-block rounded-full bg-neutral-800/60 px-4 py-2 text-white font-medium hover:bg-neutral-800"
            >
              Admin
            </button>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-full max-w-sm rounded-2xl bg-neutral-900 p-6 border border-neutral-800">
            <h3 className="text-lg font-semibold text-white mb-4">
              Admin sign-in
            </h3>
            <p className="text-sm text-white/70 mb-4">
              Sign in with Google to register as a potential admin. Default role
              is &apos;user&apos;. An existing admin must promote you to
              &apos;admins&apos; to access the panel.
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-3 rounded-lg bg-white text-black py-2 px-4 font-medium hover:brightness-95"
              >
                <Chrome className="w-5 h-5" />
                {loading ? "Signing in..." : "Sign in with Google"}
              </button>

              {message && <p className="text-sm text-white/70">{message}</p>}

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-white/70 hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
