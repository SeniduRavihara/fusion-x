"use client";

import { useState, useRef } from "react";
import * as XLSX from "xlsx";
import { Mail, Upload, Play, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CertificateRecord {
  name: string;
  email: string;
  certificateUrl: string;
  status: "pending" | "sending" | "success" | "error";
  errorMessage?: string;
  index: number; // To track original position
}

export default function CertificateDashboard() {
  const [data, setData] = useState<CertificateRecord[]>([]);
  const [fileName, setFileName] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [testEmail, setTestEmail] = useState("");
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [testStatus, setTestStatus] = useState<{success: boolean; message: string} | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();

    reader.onload = (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer;
      const data = new Uint8Array(arrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json<any>(worksheet);

      // Parse and map to our expected structure
      const parsedData: CertificateRecord[] = jsonData.map((row, idx) => {
        // Robust mapping to handle variations in CSV headers
        const name = row["Name"] || row["name"] || row["NAME"] || "";
        const email = row["Email"] || row["email"] || row["EMAIL"] || "";
        const certificateUrl = row["Certificate URL"] || row["certificate url"] || row["certificateUrl"] || row["URL"] || row["url"] || "";

        return {
          name,
          email,
          certificateUrl,
          status: "pending",
          index: idx,
        };
      });

      setData(parsedData.filter(r => r.name && r.email)); // Filter out empty rows
    };
    reader.readAsArrayBuffer(file);
  };

  const sendTestEmail = async () => {
    if (!testEmail || data.length === 0) return;
    
    setIsSendingTest(true);
    setTestStatus(null);
    
    try {
      const testRecord = data[0]; 
      
      const res = await fetch("/api/admin/certificates/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          certificates: [
            {
              name: testRecord.name,
              email: testEmail, 
              certificateUrl: testRecord.certificateUrl,
            }
          ]
        })
      });

      const responseData = await res.json();
      
      if (res.ok && responseData.results?.[0]?.success) {
        setTestStatus({ success: true, message: "Test email successfully sent to " + testEmail });
      } else {
        setTestStatus({ 
          success: false, 
          message: responseData.results?.[0]?.error || responseData.error || "Failed to send test email"
        });
      }
    } catch (error: any) {
      setTestStatus({ success: false, message: error.message || "Network error occurred"});
    } finally {
      setIsSendingTest(false);
    }
  };

  const sendBatch = async () => {
    if (isProcessing) return;
    
    const pendingRecords = data.filter(r => r.status === "pending" || r.status === "error");
    if (pendingRecords.length === 0) return;

    setIsProcessing(true);

    const batchSize = 10;
    const batch = pendingRecords.slice(0, batchSize);
    
    setData(prev => {
      const next = [...prev];
      batch.forEach(item => {
        next[item.index] = { ...next[item.index], status: "sending" };
      });
      return next;
    });

    try {
      const payload = {
        certificates: batch.map(r => ({
          name: r.name,
          email: r.email,
          certificateUrl: r.certificateUrl
        }))
      };

      const res = await fetch("/api/admin/certificates/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const responseData = await res.json();

      setData(prev => {
        const next = [...prev];
        batch.forEach((item) => {
          const result = responseData.results?.find((r: any) => r.email === item.email);
          
          if (res.ok && result?.success) {
            next[item.index] = { ...next[item.index], status: "success" };
          } else {
            next[item.index] = { 
              ...next[item.index], 
              status: "error", 
              errorMessage: result?.error || responseData.error || "Unknown error" 
            };
          }
        });
        return next;
      });

    } catch (error: any) {
      console.error("Batch sending failed", error);
      setData(prev => {
        const next = [...prev];
        batch.forEach(item => {
          next[item.index] = { ...next[item.index], status: "error", errorMessage: error.message || "Network error" };
        });
        return next;
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const pendingCount = data.filter(d => d.status === "pending").length;
  const successCount = data.filter(d => d.status === "success").length;
  const errorCount = data.filter(d => d.status === "error").length;

  return (
    <main className="min-h-screen p-4 sm:p-6 lg:p-8 bg-[#05060a] text-white">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Certificate Delivery
            </h1>
            <p className="text-neutral-400 mt-2">Manage and dispatch digital certificates securely via Resend.</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-neutral-900/50 p-3 rounded-xl border border-neutral-800">
             <Mail className="text-blue-400 h-5 w-5" />
             <span className="text-sm font-medium">Resend Configuration Active</span>
          </div>
        </div>

        {/* Top Controls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* File Upload Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-neutral-900/40 rounded-2xl border border-neutral-800 p-6 flex flex-col justify-center items-center h-full min-h-[220px]"
          >
            {data.length === 0 ? (
              <div className="text-center w-full">
                <input
                  type="file"
                  accept=".csv,.xlsx"
                  onChange={handleFileUpload}
                  className="hidden"
                  ref={fileInputRef}
                />
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="cursor-pointer border-2 border-dashed border-neutral-700 hover:border-purple-500 hover:bg-purple-500/10 transition-all rounded-xl p-8 w-full flex flex-col items-center gap-4"
                >
                  <div className="bg-neutral-800 p-4 rounded-full">
                     <Upload className="h-8 w-8 text-neutral-300" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Upload Dataset</h3>
                    <p className="text-sm text-neutral-400 mt-1">Import your CSV/XLSX file to begin</p>
                  </div>
                </div>
              </div>
            ) : (
                <div className="w-full flex-1 flex flex-col">
                   <div className="flex justify-between items-start mb-6">
                     <div>
                        <h3 className="text-lg font-medium text-white">Dataset Loaded</h3>
                        <p className="text-sm text-neutral-400">{fileName}</p>
                     </div>
                     <button 
                       onClick={() => {
                         setData([]);
                         setFileName("");
                       }}
                       className="text-sm text-red-400 hover:text-red-300 transition-colors"
                     >
                       Change File
                     </button>
                   </div>
                   
                   <div className="grid grid-cols-3 gap-3 mb-6">
                     <div className="bg-neutral-800/50 rounded-lg p-3 text-center border border-neutral-700/50">
                        <div className="text-xl font-bold text-neutral-200">{data.length}</div>
                        <div className="text-xs text-neutral-400 uppercase tracking-wider mt-1">Total</div>
                     </div>
                     <div className="bg-green-500/10 rounded-lg p-3 text-center border border-green-500/20">
                        <div className="text-xl font-bold text-green-400">{successCount}</div>
                        <div className="text-xs text-green-400/70 uppercase tracking-wider mt-1">Sent</div>
                     </div>
                     <div className="bg-red-500/10 rounded-lg p-3 text-center border border-red-500/20">
                        <div className="text-xl font-bold text-red-400">{errorCount}</div>
                        <div className="text-xs text-red-400/70 uppercase tracking-wider mt-1">Failed</div>
                     </div>
                   </div>

                   <button
                     onClick={sendBatch}
                     disabled={isProcessing || pendingCount === 0}
                     className="mt-auto w-full group relative overflow-hidden rounded-xl bg-purple-600 px-6 py-4 font-medium text-white transition-all hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                     <div className="flex items-center justify-center gap-2 relative z-10">
                       {isProcessing ? (
                         <>
                           <Loader2 className="h-5 w-5 animate-spin" />
                           Sending Batch...
                         </>
                       ) : (
                         <>
                           <Play className="h-5 w-5 fill-current" />
                           Send Next 10 Certificates
                         </>
                       )}
                     </div>
                     {!isProcessing && pendingCount > 0 && (
                        <div className="absolute inset-0 h-full w-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                     )}
                   </button>
                </div>
            )}
          </motion.div>

          {/* Test Operations Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-neutral-900/40 rounded-2xl border border-neutral-800 p-6 flex flex-col min-h-[220px]"
          >
            <h3 className="text-lg font-medium text-white mb-2">Test Configuration</h3>
            <p className="text-sm text-neutral-400 mb-6">Send a sample certificate generated from your dataset to a private email block to verify HTML rendering and delivery.</p>
            
            <div className="space-y-4 flex-1">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1.5">Test Recipient Email</label>
                <input
                  type="email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full px-4 py-3 bg-neutral-800/80 border border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-white placeholder-neutral-500"
                />
              </div>

              <button
                onClick={sendTestEmail}
                disabled={!testEmail || data.length === 0 || isSendingTest}
                className="w-full bg-neutral-800 hover:bg-neutral-700 text-white font-medium py-3 px-4 rounded-xl transition-all border border-neutral-700 hover:border-neutral-600 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSendingTest ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Mail className="h-4 w-4" />
                )}
                Send Test Draft
              </button>
            </div>

            <AnimatePresence>
                {testStatus && (
                <motion.div 
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    className={"p-4 rounded-xl flex items-start gap-3 " + (
                    testStatus.success 
                        ? "bg-green-500/10 border border-green-500/30 text-green-400" 
                        : "bg-red-500/10 border border-red-500/30 text-red-400"
                    )}
                >
                    {testStatus.success ? (
                       <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
                    ) : (
                       <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                    )}
                    <span className="text-sm font-medium leading-relaxed">{testStatus.message}</span>
                </motion.div>
                )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Data Table */}
        {data.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-neutral-900/40 rounded-2xl border border-neutral-800 overflow-hidden"
          >
            <div className="px-6 py-5 border-b border-neutral-800 flex justify-between items-center bg-neutral-900/60 pl-6">
              <h3 className="font-semibold text-lg">Delivery Queue</h3>
              <div className="flex items-center gap-2">
                 <span className="flex h-2 w-2 rounded-full bg-purple-500"></span>
                 <span className="text-sm text-neutral-400">{pendingCount + " remaining"}</span>
              </div>
            </div>
            
            <div className="overflow-x-auto max-h-[600px] overflow-y-auto custom-scrollbar">
              <table className="w-full text-left text-sm">
                <thead className="bg-neutral-900/80 sticky top-0 z-10 backdrop-blur-sm">
                  <tr>
                    <th className="px-6 py-4 font-medium text-neutral-400 w-16">#</th>
                    <th className="px-6 py-4 font-medium text-neutral-400">Name</th>
                    <th className="px-6 py-4 font-medium text-neutral-400">Email</th>
                    <th className="px-6 py-4 font-medium text-neutral-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60">
                  {data.map((record) => (
                    <tr 
                      key={record.index} 
                      className={"transition-colors hover:bg-neutral-800/30 " + (record.status === "sending" ? "bg-purple-900/10" : "")}
                    >
                      <td className="px-6 py-4 text-neutral-500">{record.index + 1}</td>
                      <td className="px-6 py-4 font-medium">{record.name || <span className="text-red-400/50 italic">Missing</span>}</td>
                      <td className="px-6 py-4 text-neutral-300">{record.email || <span className="text-red-400/50 italic">Missing</span>}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {record.status === "pending" && (
                            <span className="inline-flex items-center rounded-md bg-neutral-800 px-2 py-1 text-xs font-medium text-neutral-300 ring-1 ring-inset ring-neutral-700/50">Pending</span>
                          )}
                          {record.status === "sending" && (
                            <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-400 ring-1 ring-inset ring-purple-500/30">
                              <Loader2 className="mr-1 h-3 w-3 animate-spin" /> Sending
                            </span>
                          )}
                          {record.status === "success" && (
                            <span className="inline-flex items-center rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/30">Sent</span>
                          )}
                          {record.status === "error" && (
                            <div className="flex flex-col gap-1">
                              <span className="inline-flex items-center rounded-md bg-red-500/10 px-2 py-1 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-500/30 w-fit">Failed</span>
                              <span className="text-xs text-red-400/70">{record.errorMessage}</span>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
