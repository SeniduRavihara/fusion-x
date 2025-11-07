"use client";

import { useEffect, useState } from "react";
import AdminService, {
  RegistrationRecord,
} from "../../firebase/services/AdminService";

export default function AdminPage() {
  const [items, setItems] = useState<RegistrationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    const unsub = AdminService.listenRegistrations((list) => {
      setItems(list);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const toggleArrival = async (id: string, current: boolean | undefined) => {
    try {
      setUpdating(id);
      await AdminService.setArrival(id, !current);
    } catch (err) {
      console.error(err);
      alert("Failed to update arrival status. Check console for details.");
    } finally {
      setUpdating(null);
    }
  };

  function fmt(ts: unknown) {
    if (!ts) return "-";
    // Firestore serverTimestamp is an object with toDate()
    if (typeof (ts as { toDate?: () => Date }).toDate === "function") {
      return (ts as { toDate: () => Date }).toDate().toLocaleString();
    }
    try {
      const d = new Date(String(ts));
      if (!isNaN(d.getTime())) return d.toLocaleString();
    } catch {}
    return String(ts);
  }

  return (
    <main className="min-h-screen p-8 bg-[#05060a] text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin — Registrations</h1>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-neutral-800 bg-neutral-900/30">
            <table className="w-full text-left">
              <thead className="bg-neutral-900/50">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Whatsapp</th>
                  <th className="px-4 py-3">Faculty</th>
                  <th className="px-4 py-3">Year</th>
                  <th className="px-4 py-3">Registered At</th>
                  <th className="px-4 py-3">Arrived</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-4 py-6 text-center text-white/70"
                    >
                      No registrations found.
                    </td>
                  </tr>
                )}

                {items.map((r) => (
                  <tr
                    key={r.id}
                    className="border-t border-neutral-800/40 hover:bg-neutral-900/20"
                  >
                    <td className="px-4 py-3">{r.name || "-"}</td>
                    <td className="px-4 py-3">{r.email || "-"}</td>
                    <td className="px-4 py-3">{r.whatsapp || "-"}</td>
                    <td className="px-4 py-3">{r.faculty || "-"}</td>
                    <td className="px-4 py-3">{r.year || "-"}</td>
                    <td className="px-4 py-3">{fmt(r.createdAt)}</td>
                    <td className="px-4 py-3">{r.is_arrived ? "Yes" : "No"}</td>
                    <td className="px-4 py-3">
                      <button
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
                          r.is_arrived ? "bg-green-600" : "bg-purple-600"
                        }`}
                        onClick={() => toggleArrival(r.id, r.is_arrived)}
                        disabled={updating === r.id}
                      >
                        {updating === r.id
                          ? "Updating..."
                          : r.is_arrived
                          ? "Mark not arrived"
                          : "Mark arrived"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
