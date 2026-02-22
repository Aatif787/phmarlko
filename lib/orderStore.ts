import { promises as fs } from "fs";
import path from "path";
import connectToDatabase from "@/lib/mongodb";
import Order, { IOrder } from "@/models/Order";

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

// Helper to check if we are using MongoDB
async function shouldUseMongoDB() {
  const db = await connectToDatabase();
  return !!db;
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
  const useDB = await shouldUseMongoDB();

  if (useDB) {
    await connectToDatabase();
    const newOrder = await Order.create({
      ...input,
      status: "Order Received",
      createdAt: new Date().toISOString()
    });
    return {
      orderId: newOrder.orderId,
      fullName: newOrder.fullName,
      mobile: newOrder.mobile,
      address: newOrder.address,
      deliveryTime: newOrder.deliveryTime,
      notes: newOrder.notes,
      prescriptionPath: newOrder.prescriptionPath,
      status: newOrder.status as OrderStatus,
      createdAt: newOrder.createdAt
    };
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
  const useDB = await shouldUseMongoDB();
  
  if (useDB) {
    await connectToDatabase();
    const orders = await Order.find({}).sort({ createdAt: -1 }).lean();
    return orders.map(o => ({
      orderId: o.orderId,
      fullName: o.fullName,
      mobile: o.mobile,
      address: o.address,
      deliveryTime: o.deliveryTime,
      notes: o.notes,
      prescriptionPath: o.prescriptionPath,
      status: o.status as OrderStatus,
      createdAt: o.createdAt
    }));
  } else {
    return readAllOrdersFile();
  }
}

export async function findOrder(orderId: string): Promise<OrderRecord | undefined> {
  const useDB = await shouldUseMongoDB();

  if (useDB) {
    await connectToDatabase();
    const order = await Order.findOne({ orderId }).lean();
    if (!order) return undefined;
    return {
      orderId: order.orderId,
      fullName: order.fullName,
      mobile: order.mobile,
      address: order.address,
      deliveryTime: order.deliveryTime,
      notes: order.notes,
      prescriptionPath: order.prescriptionPath,
      status: order.status as OrderStatus,
      createdAt: order.createdAt
    };
  } else {
    const orders = await readAllOrdersFile();
    return orders.find((order) => order.orderId === orderId);
  }
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus
): Promise<OrderRecord | undefined> {
  const useDB = await shouldUseMongoDB();

  if (useDB) {
    await connectToDatabase();
    const updated = await Order.findOneAndUpdate(
      { orderId },
      { status },
      { new: true }
    ).lean();
    
    if (!updated) return undefined;
    
    return {
      orderId: updated.orderId,
      fullName: updated.fullName,
      mobile: updated.mobile,
      address: updated.address,
      deliveryTime: updated.deliveryTime,
      notes: updated.notes,
      prescriptionPath: updated.prescriptionPath,
      status: updated.status as OrderStatus,
      createdAt: updated.createdAt
    };
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
  const useDB = await shouldUseMongoDB();

  if (useDB) {
    await connectToDatabase();
    const result = await Order.deleteOne({ orderId });
    return result.deletedCount > 0;
  } else {
    const orders = await readAllOrdersFile();
    const index = orders.findIndex((order) => order.orderId === orderId);
    if (index === -1) return false;
    orders.splice(index, 1);
    await writeAllOrdersFile(orders);
    return true;
  }
}
