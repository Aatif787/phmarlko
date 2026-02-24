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

// Helper to check if Supabase is configured (always true now due to hardcoded defaults in lib/supabase.ts)
function isSupabaseConfigured() {
  return true;
}

// --- FILE SYSTEM FALLBACKS (Only for local dev if needed) ---
const dataDir = process.env.DATA_DIR || path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "orders.json");

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
    console.warn("File write failed:", error);
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
    // Silent fallback to local file if in development
    if (process.env.NODE_ENV === 'development') {
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
    throw new Error("Failed to create order in Supabase");
  }

  return newOrder as OrderRecord;
}

export async function listOrders(): Promise<OrderRecord[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('createdAt', { ascending: false });

  if (error) {
    console.error("Supabase error:", error);
    if (process.env.NODE_ENV === 'development') {
      return readAllOrdersFile();
    }
    return [];
  }

  return data as OrderRecord[];
}

export async function findOrder(orderId: string): Promise<OrderRecord | undefined> {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('orderId', orderId)
    .single();

  if (error || !data) {
    if (process.env.NODE_ENV === 'development') {
      const orders = await readAllOrdersFile();
      return orders.find((order) => order.orderId === orderId);
    }
    return undefined;
  }
  return data as OrderRecord;
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus
): Promise<OrderRecord | undefined> {
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('orderId', orderId)
    .select()
    .single();

  if (error || !data) {
    if (process.env.NODE_ENV === 'development') {
      const orders = await readAllOrdersFile();
      const index = orders.findIndex((order) => order.orderId === orderId);
      if (index === -1) return undefined;
      orders[index] = { ...orders[index], status };
      await writeAllOrdersFile(orders);
      return orders[index];
    }
    return undefined;
  }
  return data as OrderRecord;
}

export async function deleteOrder(orderId: string): Promise<boolean> {
  const { error } = await supabase
    .from('orders')
    .delete()
    .eq('orderId', orderId);

  if (error) {
    if (process.env.NODE_ENV === 'development') {
      const orders = await readAllOrdersFile();
      const index = orders.findIndex((order) => order.orderId === orderId);
      if (index === -1) return false;
      orders.splice(index, 1);
      await writeAllOrdersFile(orders);
      return true;
    }
    return false;
  }
  return true;
}
