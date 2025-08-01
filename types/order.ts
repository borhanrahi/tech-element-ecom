import { CartItem } from './cart';

export interface CustomerInfo {
  fullName: string;
  shippingAddress: string;
  phoneNumber: string;
}

export interface Order {
  id: string;
  customerInfo: CustomerInfo;
  items: CartItem[];
  total: number;
  orderDate: string;
  status: 'completed';
}