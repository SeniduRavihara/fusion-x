"use client";

import QrScanner from "qr-scanner";
import { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import { useAuth } from "../../context/AuthContext";
import AdminService, {
  RegistrationRecord,
} from "../../firebase/services/AdminService";

export default function AdminPage() {
  const [items, setItems] = useState<RegistrationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    email: true,
    whatsapp: true,
    faculty: true,
    year: true,
    registeredAt: false,
    arrived: true,
    actions: true,
  });
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);

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

  const startScanning = async () => {
    if (!videoRef.current) return;

    setScanning(true);
    setScanResult("");

    try {
      scannerRef.current = new QrScanner(
        videoRef.current,
        (result) => {
          setScanResult(result.data);
          handleScanResult(result.data);
        },
        {
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );

      await scannerRef.current.start();
    } catch (err) {
      console.error("Error starting scanner:", err);
      setScanning(false);
    }
  };

  const stopScanning = () => {
    if (scannerRef.current) {
      scannerRef.current.stop();
      scannerRef.current = null;
    }
    setScanning(false);
  };

  const handleScanResult = async (email: string) => {
    try {
      // Find the registration by email
      const registration = items.find((item) => item.email === email);
      if (!registration) {
        alert(`No registration found for email: ${email}`);
        return;
      }

      if (registration.is_arrived) {
        alert(`${registration.name} has already checked in!`);
        return;
      }

      // Update arrival status
      await AdminService.setArrival(registration.id, true);
      alert(`✅ ${registration.name} checked in successfully!`);

      // Stop scanning after successful check-in
      stopScanning();
    } catch (err) {
      console.error("Error processing scan:", err);
      alert("Failed to process ticket scan. Check console for details.");
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

  const { signOut, user } = useAuth();
  const [signingOut, setSigningOut] = useState(false);

  const handleLogout = async () => {
    try {
      setSigningOut(true);
      await signOut();
    } catch (err) {
      console.error("Logout failed", err);
      alert("Logout failed. See console for details.");
    } finally {
      setSigningOut(false);
    }
  };

  const downloadExcel = () => {
    const data = items.map((r) => ({
      ID: r.id,
      Name: r.name || "",
      Email: r.email || "",
      Whatsapp: r.whatsapp || "",
      Faculty: r.faculty || "",
      Year: r.year || "",
      "Registered At": fmt(r.createdAt),
      Arrived: r.is_arrived ? "Yes" : "No",
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Registrations");
    XLSX.writeFile(
      wb,
      `registrations_${new Date().toISOString().split("T")[0]}.xlsx`
    );
  };

  return (
    <main className="min-h-screen p-8 bg-[#05060a] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Admin — Registrations</h1>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setShowColumnMenu(!showColumnMenu)}
                className="rounded-full bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700"
              >
                Columns
              </button>
              {showColumnMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg z-10">
                  <div className="p-3">
                    <div className="space-y-2">
                      {Object.entries(visibleColumns).map(([key, visible]) => (
                        <label
                          key={key}
                          className="flex items-center gap-2 text-white"
                        >
                          <input
                            type="checkbox"
                            checked={visible}
                            onChange={(e) =>
                              setVisibleColumns((prev) => ({
                                ...prev,
                                [key]: e.target.checked,
                              }))
                            }
                            className="rounded"
                          />
                          {key === "registeredAt"
                            ? "Registered At"
                            : key.charAt(0).toUpperCase() + key.slice(1)}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={downloadExcel}
              className="rounded-full bg-green-600 px-4 py-2 text-white font-medium hover:bg-green-700"
            >
              Download Excel
            </button>
            {user && <div className="text-sm text-white/80">{user.email}</div>}
            <button
              onClick={handleLogout}
              disabled={signingOut}
              className="rounded-full bg-neutral-800/60 px-4 py-2 text-white/90 hover:bg-neutral-800"
            >
              {signingOut ? "Signing out..." : "Logout"}
            </button>
          </div>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {/* QR Scanner Section */}
            <div className="mb-6 bg-neutral-900/30 rounded-lg border border-neutral-800 p-6">
              <h2 className="text-xl font-semibold mb-4">Ticket Scanner</h2>
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="flex-1">
                  {!scanning ? (
                    <button
                      onClick={startScanning}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium"
                    >
                      Start Scanning Tickets
                    </button>
                  ) : (
                    <button
                      onClick={stopScanning}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium"
                    >
                      Stop Scanning
                    </button>
                  )}
                  {scanResult && (
                    <div className="mt-2 p-2 bg-neutral-800 rounded text-sm">
                      Last scanned: {scanResult}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  {scanning && (
                    <div className="relative">
                      <video
                        ref={videoRef}
                        className="w-full max-w-md rounded-lg border border-neutral-700"
                        playsInline
                        muted
                      />
                      <div className="absolute inset-0 border-2 border-green-400 rounded-lg pointer-events-none opacity-50"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-md px-4 py-2 rounded-lg bg-neutral-800/60 border border-neutral-700 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="overflow-x-auto rounded-lg border border-neutral-800 bg-neutral-900/30">
              <table className="w-full text-left">
                <thead className="bg-neutral-900/50">
                  <tr>
                    {visibleColumns.name && <th className="px-4 py-3">Name</th>}
                    {visibleColumns.email && (
                      <th className="px-4 py-3">Email</th>
                    )}
                    {visibleColumns.whatsapp && (
                      <th className="px-4 py-3">Whatsapp</th>
                    )}
                    {visibleColumns.faculty && (
                      <th className="px-4 py-3">Faculty</th>
                    )}
                    {visibleColumns.year && <th className="px-4 py-3">Year</th>}
                    {visibleColumns.registeredAt && (
                      <th className="px-4 py-3">Registered At</th>
                    )}
                    {visibleColumns.arrived && (
                      <th className="px-4 py-3">Arrived</th>
                    )}
                    {visibleColumns.actions && (
                      <th className="px-4 py-3">Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    const filteredItems = items.filter((item) =>
                      item.email
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    );
                    const visibleCount =
                      Object.values(visibleColumns).filter(Boolean).length;
                    return (
                      <>
                        {filteredItems.length === 0 && (
                          <tr>
                            <td
                              colSpan={visibleCount}
                              className="px-4 py-6 text-center text-white/70"
                            >
                              No registrations found.
                            </td>
                          </tr>
                        )}

                        {filteredItems.map((r) => (
                          <tr
                            key={r.id}
                            className="border-t border-neutral-800/40 hover:bg-neutral-900/20"
                          >
                            {visibleColumns.name && (
                              <td className="px-4 py-3">{r.name || "-"}</td>
                            )}
                            {visibleColumns.email && (
                              <td className="px-4 py-3">{r.email || "-"}</td>
                            )}
                            {visibleColumns.whatsapp && (
                              <td className="px-4 py-3">{r.whatsapp || "-"}</td>
                            )}
                            {visibleColumns.faculty && (
                              <td className="px-4 py-3">{r.faculty || "-"}</td>
                            )}
                            {visibleColumns.year && (
                              <td className="px-4 py-3">{r.year || "-"}</td>
                            )}
                            {visibleColumns.registeredAt && (
                              <td className="px-4 py-3">{fmt(r.createdAt)}</td>
                            )}
                            {visibleColumns.arrived && (
                              <td className="px-4 py-3">
                                {r.is_arrived ? "Yes" : "No"}
                              </td>
                            )}
                            {visibleColumns.actions && (
                              <td className="px-4 py-3">
                                <button
                                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
                                    r.is_arrived
                                      ? "bg-green-600"
                                      : "bg-purple-600"
                                  }`}
                                  onClick={() =>
                                    toggleArrival(r.id, r.is_arrived)
                                  }
                                  disabled={updating === r.id}
                                >
                                  {updating === r.id
                                    ? "Updating..."
                                    : r.is_arrived
                                    ? "Mark not arrived"
                                    : "Mark arrived"}
                                </button>
                              </td>
                            )}
                          </tr>
                        ))}
                      </>
                    );
                  })()}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
