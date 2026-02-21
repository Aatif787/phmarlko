import { NextResponse } from "next/server";
import { findOrder, updateOrderStatus } from "@/lib/orderStore";
import type { OrderStatus } from "@/lib/orderStore";

export async function GET(
  request: Request,
  context: { params: { orderId: string } }
) {
  const order = await findOrder(context.params.orderId ?? "");
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }
  return NextResponse.json(order);
}

export async function PATCH(
  request: Request,
  context: { params: { orderId: string } }
) {
  const adminKey = process.env.ADMIN_KEY;
  if (adminKey && request.headers.get("x-admin-key") !== adminKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { status?: OrderStatus };
  if (!body.status) {
    return NextResponse.json({ error: "Missing status" }, { status: 400 });
  }

  const updated = await updateOrderStatus(context.params.orderId ?? "", body.status);
  if (!updated) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}
