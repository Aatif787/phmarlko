import { NextResponse } from "next/server";
import { createOrder } from "@/lib/orderStore";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  const formData = await request.formData();

  const fullName = String(formData.get("fullName") ?? "");
  const mobile = String(formData.get("mobile") ?? "");
  const address = String(formData.get("address") ?? "");
  const deliveryTime = String(formData.get("deliveryTime") ?? "");
  const notesValue = formData.get("notes");
  const notes = typeof notesValue === "string" ? notesValue : undefined;
  
  const file = formData.get("prescription") as File | null;
  let prescriptionPath: string | undefined;

  const orderId = `MEDX-${Date.now().toString(36).toUpperCase()}`;

  if (file) {
    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `${orderId}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      
      // Use public/uploads for local development
      // Note: This will fail on Vercel production (read-only fs), but that's expected.
      // We catch the error so the order is still created.
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      
      // Ensure directory exists
      await mkdir(uploadDir, { recursive: true });
      
      const filePath = path.join(uploadDir, filename);
      await writeFile(filePath, buffer);
      prescriptionPath = `/uploads/${filename}`;
    } catch (error) {
      console.error("Error saving file (likely due to read-only environment):", error);
      // Continue without saving file
    }
  }

  const order = await createOrder({
    orderId,
    fullName,
    mobile,
    address,
    deliveryTime,
    notes,
    prescriptionPath
  });

  return NextResponse.json(order);
}
