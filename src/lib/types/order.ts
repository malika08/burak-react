import { OrderStatus } from "../enums/order.enum";
import { Product } from "./product";

export interface OrderItem {
  _id: string;
  itemQuantity: number;
  itemPrice: number;
  productId:string;
  orderId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  _id: string;
  orderTotal: number;
  orderDelivery: number;
  orderStatus: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  /** from aggregation */
  orderItems: OrderItem[];
  productData: Product[];
}

export interface OrderItemInput {
  itemQuantity: number;
  itemPrice: number;
  productId: string;
  orderId?: string;
}

export interface OrderUpdateInput {
  orderId: string;
  orderStatus: OrderStatus;
}

export interface OrderInquiry {
  page: number;
  limit: number;
  orderStatus: OrderStatus;
}
