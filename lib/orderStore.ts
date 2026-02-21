import { promises as fs } from "fs";
import path from "path";

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
  status: OrderStatus;
  createdAt: string;
}

const dataDir = process.env.DATA_DIR || path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "orders.json");

async function readAllOrders(): Promise<OrderRecord[]> {
  try {
    await fs.mkdir(dataDir, { recursive: true });
    const content = await fs.readFile(dataFile, "utf8");
    return JSON.parse(content) as OrderRecord[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

async function writeAllOrders(orders: OrderRecord[]): Promise<void> {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(dataFile, JSON.stringify(orders, null, 2), "utf8");
}

export async function createOrder(input: {
  orderId: string;
  fullName: string;
  mobile: string;
  address: string;
  deliveryTime: string;
  notes?: string;
}): Promise<OrderRecord> {
  const orders = await readAllOrders();
  const order: OrderRecord = {
    orderId: input.orderId,
    fullName: input.fullName,
    mobile: input.mobile,
    address: input.address,
    deliveryTime: input.deliveryTime,
    notes: input.notes,
    status: "Order Received",
    createdAt: new Date().toISOString()
  };
  orders.push(order);
  await writeAllOrders(orders);
  return order;
}

export async function listOrders(): Promise<OrderRecord[]> {
  return readAllOrders();
}

export async function findOrder(orderId: string): Promise<OrderRecord | undefined> {
  const orders = await readAllOrders();
  return orders.find((order) => order.orderId === orderId);
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus
): Promise<OrderRecord | undefined> {
  const orders = await readAllOrders();
  const index = orders.findIndex((order) => order.orderId === orderId);
  if (index === -1) {
    return undefined;
  }
  orders[index] = { ...orders[index], status };
  await writeAllOrders(orders);
  return orders[index];
}

