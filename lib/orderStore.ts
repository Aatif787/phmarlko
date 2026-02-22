import { promises as fs } from "fs";
import path from "path";
import { supabase } from "@/lib/supabase";

export type OrderStatus =
  | "Order Received"
  | "Processing"
  | "Purchased"
  | "Out for Delivery"
  | "Delivered";

export interface OrderRecord {
  orderId: string;
  fullName: string;
  mobile: string;
  address: string;
  deliveryTime: string;
  notes?: string;
  prescriptionPath?: string;
  status: OrderStatus;
  createdAt: string;
}

// Fallback mechanism: Local file storage (Only for local dev without DB)
const dataDir = process.env.DATA_DIR || path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "orders.json");

// Helper to check if Supabase is configured
function isSupabaseConfigured() {
  const isConfigured = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!isConfigured && process.env.NODE_ENV === 'production') {
    console.error("Supabase environment variables are missing in production! Falling back to ephemeral file system.");
  }
  return isConfigured;
}

// --- FILE SYSTEM FALLBACKS (Legacy) ---
async function readAllOrdersFile(): Promise<OrderRecord[]> {
  try {
    await fs.mkdir(dataDir, { recursive: true });
    const content = await fs.readFile(dataFile, "utf8");
    return JSON.parse(content) as OrderRecord[];
  } catch {
    return [];
  }
}

async function writeAllOrdersFile(orders: OrderRecord[]): Promise<void> {
  try {
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(dataFile, JSON.stringify(orders, null, 2), "utf8");
  } catch (error) {
    console.warn("File write failed (Vercel read-only or permission error):", error);
  }
}
// --------------------------------------

export async function createOrder(input: {
  orderId: string;
  fullName: string;
  mobile: string;
  address: string;
  deliveryTime: string;
  notes?: string;
  prescriptionPath?: string;
}): Promise<OrderRecord> {
  if (isSupabaseConfigured()) {
    const newOrder = {
      orderId: input.orderId,
      fullName: input.fullName,
      mobile: input.mobile,
      address: input.address,
      deliveryTime: input.deliveryTime,
      notes: input.notes,
      prescriptionPath: input.prescriptionPath,
      status: "Order Received",
      createdAt: new Date().toISOString()
    };

    const { error } = await supabase
      .from('orders')
      .insert([newOrder]);

    if (error) {
      console.error("Supabase error:", error);
      throw new Error("Failed to create order in Supabase");
    }

    return newOrder as OrderRecord;
  } else {
    // Fallback to file
    const orders = await readAllOrdersFile();
    const order: OrderRecord = {
      ...input,
      status: "Order Received",
      createdAt: new Date().toISOString()
    };
    orders.push(order);
    await writeAllOrdersFile(orders);
    return order;
  }
}

export async function listOrders(): Promise<OrderRecord[]> {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return [];
    }

    return data as OrderRecord[];
  } else {
    return readAllOrdersFile();
  }
}

export async function findOrder(orderId: string): Promise<OrderRecord | undefined> {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('orderId', orderId)
      .single();

    if (error || !data) return undefined;
    return data as OrderRecord;
  } else {
    const orders = await readAllOrdersFile();
    return orders.find((order) => order.orderId === orderId);
  }
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus
): Promise<OrderRecord | undefined> {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('orderId', orderId)
      .select()
      .single();

    if (error || !data) return undefined;
    return data as OrderRecord;
  } else {
    const orders = await readAllOrdersFile();
    const index = orders.findIndex((order) => order.orderId === orderId);
    if (index === -1) return undefined;
    orders[index] = { ...orders[index], status };
    await writeAllOrdersFile(orders);
    return orders[index];
  }
}

export async function deleteOrder(orderId: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('orderId', orderId);

    return !error;
  } else {
    const orders = await readAllOrdersFile();
    const index = orders.findIndex((order) => order.orderId === orderId);
    if (index === -1) return false;
    orders.splice(index, 1);
    await writeAllOrdersFile(orders);
    return true;
  }
}
