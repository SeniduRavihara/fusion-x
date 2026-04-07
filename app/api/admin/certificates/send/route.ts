import { NextRequest, NextResponse } from "next/server";
import { sendCertificateEmail } from "@/lib/certificate-service";

// Utility to add delay between requests
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Cache buster: 2026-04-05-22-41-FIX
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { certificates } = body;

    if (!certificates || !Array.isArray(certificates) || certificates.length === 0) {
      return NextResponse.json(
        { error: "Invalid payload: 'certificates' must be a non-empty array" },
        { status: 400 }
      );
    }

    const maxBatchSize = 10;
    if (certificates.length > maxBatchSize) {
      return NextResponse.json(
        { error: "Cannot process more than " + maxBatchSize + " certificates per request" },
        { status: 400 }
      );
    }

    const batchResults = [];
    let successfulCount = 0;
    let failedCount = 0;

    // Process certificates SEQUENTIALLY to respect Resend's 5 requests/sec rate limit
    for (const cert of certificates) {
      const { name, email, certificateUrl } = cert;
      
      if (!name || !email || !certificateUrl) {
         batchResults.push({
            email: email || "unknown",
            success: false,
            error: "Missing name, email, or certificateUrl"
         });
         failedCount++;
         continue;
      }

      // Send ONE at a time
      const result = await sendCertificateEmail(name, email, certificateUrl);
      
      if (result.success) {
        successfulCount++;
      } else {
        failedCount++;
      }
      
      batchResults.push({
        email,
        success: result.success,
        error: result.error
      });

      // Add a 500ms delay between EACH send to be ultra-safe (max 2 requests/sec)
      // This ensures we always stay well under the 5 requests/sec limit.
      await sleep(500);
    }

    return NextResponse.json({
      success: true,
      message: "Processed " + certificates.length + " emails. Successful: " + successfulCount + ", Failed: " + failedCount,
      results: batchResults
    });

  } catch (error: any) {
    console.error("API error in certificate sending:", error);
    return NextResponse.json(
      { error: "Internal server error: " + (error.message || "Unknown error") },
      { status: 500 }
    );
  }
}
