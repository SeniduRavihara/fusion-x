"use client";

import {
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import AuthService from "../firebase/services/AuthService";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  signInWithGoogle: () => Promise<User | null>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  console.log(isAdmin);
  

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      setLoading(false);
      if (u) {
        try {
          const adminRef = doc(db, "admins", u.uid);
          const snap = await getDoc(adminRef);
          if (snap.exists()) {
            const data = snap.data() as unknown as { role?: string };
            console.log(data);
            
            setIsAdmin(data.role === "admins");
          } else {
            setIsAdmin(false);
          }
        } catch (err) {
          console.error("Error checking admin role:", err);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    });

    return () => unsub();
  }, []);

  const signInWithGoogle = async () => {
    const u = await AuthService.googleSignIn();
    return u || null;
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, isAdmin, signInWithGoogle, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export default AuthContext;
