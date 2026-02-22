import mongoose, { Schema, Document, Model } from 'mongoose';
import { OrderStatus } from '@/lib/orderStore';

export interface IOrder extends Document {
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

const OrderSchema = new Schema<IOrder>({
  orderId: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  deliveryTime: { type: String, required: true },
  notes: { type: String },
  prescriptionPath: { type: String },
  status: { 
    type: String, 
    required: true,
    enum: ["Order Received", "Processing", "Purchased", "Out for Delivery", "Delivered"],
    default: "Order Received"
  },
  createdAt: { type: String, default: () => new Date().toISOString() }
});

// Prevent model overwrite in hot-reload
const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
