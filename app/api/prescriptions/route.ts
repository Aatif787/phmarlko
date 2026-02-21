import { NextResponse } from "next/server";
import { createOrder } from "@/lib/orderStore";

export async function POST(request: Request) {
  const formData = await request.formData();

  const fullName = String(formData.get("fullName") ?? "");
  const mobile = String(formData.get("mobile") ?? "");
  const address = String(formData.get("address") ?? "");
  const deliveryTime = String(formData.get("deliveryTime") ?? "");
  const notesValue = formData.get("notes");
  const notes = typeof notesValue === "string" ? notesValue : undefined;

  const orderId = `MEDX-${Date.now().toString(36).toUpperCase()}`;

  const order = await createOrder({
    orderId,
    fullName,
    mobile,
    address,
    deliveryTime,
    notes
  });

  return NextResponse.json(order);
}
