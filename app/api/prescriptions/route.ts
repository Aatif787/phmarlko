import { NextResponse } from "next/server";
import { createOrder } from "@/lib/orderStore";
import { supabase } from "@/lib/supabase";

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
      const filename = `${orderId}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      
      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('prescriptions')
        .upload(filename, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error("Supabase Storage Error:", error);
        // Fallback: If bucket doesn't exist or other error, we log it but can't save the file
        // We could throw an error, but let's try to create the order anyway
      } else if (data) {
        // Construct public URL
        // Note: The bucket must be public for this to work
        const { data: { publicUrl } } = supabase.storage
          .from('prescriptions')
          .getPublicUrl(filename);
          
        prescriptionPath = publicUrl;
      }
    } catch (error) {
      console.error("Error uploading file:", error);
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
