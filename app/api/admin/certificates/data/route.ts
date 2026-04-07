import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import * as XLSX from "xlsx";

export async function GET(request: NextRequest) {
  try {
    const csvPath = path.join(process.cwd(), "final.csv");
    
    // Check if file exists
    try {
      await fs.access(csvPath);
    } catch {
      return NextResponse.json(
        { error: "final.csv not found in root directory" },
        { status: 404 }
      );
    }

    // Read file buffer
    const fileBuffer = await fs.readFile(csvPath);
    
    // Parse using XLSX
    const workbook = XLSX.read(fileBuffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json<any>(worksheet);

    // Map and sanitize the records
    const sanitizedData = jsonData.map((row: any, idx: number) => {
      return {
        name: row["Name"] || row["name"] || "",
        email: row["Email"] || row["email"] || "",
        certificateUrl: row["Certificate URL"] || row["certificate url"] || row["certificateUrl"] || row["URL"] || "",
        status: "pending",
        index: idx
      };
    });

    return NextResponse.json({
      success: true,
      count: sanitizedData.length,
      data: sanitizedData
    });

  } catch (error: any) {
    console.error("Error reading final.csv:", error);
    return NextResponse.json(
      { error: "Failed to read certificate data: " + (error.message || "Unknown error") },
      { status: 500 }
    );
  }
}
