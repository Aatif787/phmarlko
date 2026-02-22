import { NextResponse } from "next/server";
import { listOrders } from "@/lib/orderStore";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const adminKey = process.env.ADMIN_KEY;
  if (adminKey && request.headers.get("x-admin-key") !== adminKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orders = await listOrders();
  return NextResponse.json(orders, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "Pragma": "no-cache",
      "Expires": "0",
    },
  });
}

