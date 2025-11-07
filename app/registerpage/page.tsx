"use client";

import Link from "next/link";
import { useState } from "react";
import UserService from "../../firebase/services/UserService";

type FormState = {
  email: string;
  name: string;
  whatsapp: string;
  faculty: string;
  year: string;
};

export default function RegisterPage() {
  const [form, setForm] = useState<FormState>({
    email: "",
    name: "",
    whatsapp: "",
    faculty: "",
    year: "",
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [success, setSuccess] = useState("");

  const validate = (): boolean => {
    const e: Partial<FormState> = {};
    if (!form.email) e.email = "Email is required.";
    else if (!/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(form.email))
      e.email = "Enter a valid email.";

    if (!form.name) e.name = "Name is required.";

    if (!form.whatsapp) e.whatsapp = "Whatsapp number is required.";
    else if (!/^[+\d][\d\s()-]{6,}$/i.test(form.whatsapp))
      e.whatsapp = "Enter a valid phone number.";

    if (!form.faculty) e.faculty = "Faculty is required.";
    if (!form.year) e.year = "Year is required.";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((s) => ({ ...s, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await UserService.register(form);
      console.log("Registration saved:", res);
      setSuccess(
        "Registration submitted successfully! We'll contact you via WhatsApp."
      );
      setForm({ email: "", name: "", whatsapp: "", faculty: "", year: "" });
    } catch (error) {
      console.error(error);
      setSuccess("");
      setErrors((prev) => ({
        ...prev,
        email: "Failed to submit. Try again later.",
      }));
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0A0F1A] text-white py-12">
      <div className="w-full max-w-2xl mx-auto p-8 bg-neutral-900/40 rounded-2xl border border-purple-800/30 shadow-lg">
        <h1 className="text-3xl font-extrabold">Register for FusionX 1.0</h1>
        <p className="mt-2 text-white/80">
          Fill in the details below and we&apos;ll reach out with next steps.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-white/90">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={`mt-2 w-full rounded-xl bg-neutral-900/60 border py-3 px-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                errors.email ? "border-red-500" : "border-transparent"
              }`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-red-400 text-sm">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90">
              Name{" "}
              <span className="text-sm text-white/70">
                (this will appear on your certificate)
              </span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={`mt-2 w-full rounded-xl bg-neutral-900/60 border py-3 px-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                errors.name ? "border-red-500" : "border-transparent"
              }`}
              placeholder="Your name as it should appear on the certificate"
            />
            {errors.name && (
              <p className="mt-1 text-red-400 text-sm">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90">
              Whatsapp
            </label>
            <input
              type="tel"
              value={form.whatsapp}
              onChange={(e) => handleChange("whatsapp", e.target.value)}
              className={`mt-2 w-full rounded-xl bg-neutral-900/60 border py-3 px-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                errors.whatsapp ? "border-red-500" : "border-transparent"
              }`}
              placeholder="e.g. +94771234567"
            />
            {errors.whatsapp && (
              <p className="mt-1 text-red-400 text-sm">{errors.whatsapp}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/90">
                Faculty
              </label>
              <input
                type="text"
                value={form.faculty}
                onChange={(e) => handleChange("faculty", e.target.value)}
                className={`mt-2 w-full rounded-xl bg-neutral-900/60 border py-3 px-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.faculty ? "border-red-500" : "border-transparent"
                }`}
                placeholder="Faculty or Department"
              />
              {errors.faculty && (
                <p className="mt-1 text-red-400 text-sm">{errors.faculty}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90">
                Year
              </label>
              <select
                value={form.year}
                onChange={(e) => handleChange("year", e.target.value)}
                className={`mt-2 w-full rounded-xl bg-neutral-900/60 border py-3 px-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.year ? "border-red-500" : "border-transparent"
                }`}
              >
                <option value="">Select year</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="Other">Other</option>
              </select>
              {errors.year && (
                <p className="mt-1 text-red-400 text-sm">{errors.year}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 mt-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-purple-600 px-6 py-3 text-white font-semibold hover:bg-purple-700 transition"
            >
              Submit Registration
            </button>

            <Link href="/" className="text-white/70 hover:text-white">
              Cancel
            </Link>
          </div>

          {success && <p className="mt-4 text-green-400">{success}</p>}
        </form>
      </div>
    </main>
  );
}
