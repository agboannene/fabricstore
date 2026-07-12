export interface StaffUser {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
  role: "owner" | "manager" | "sales_rep" | "packing_staff";
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface FabricType {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  isPreloaded: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Fabric {
  id: number;
  fabricTypeId: number;
  name: string;
  slug: string;
  description: string | null;
  specs: string | null;
  price: number;
  images: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ColourVariant {
  id: number;
  fabricId: number;
  colourName: string;
  colourHex: string | null;
  stockQuantity: number;
  lowStockThreshold: number;
  isActive: boolean;
  createdAt: string;
}

export interface Customer {
  id: number;
  phone: string | null;
  email: string | null;
  name: string | null;
  passwordHash: string | null;
  isReturning: boolean;
  firstOrderAt: string | null;
  lastOrderAt: string | null;
  totalOrders: number;
  totalSpent: number;
  createdAt: string;
}

export interface Order {
  id: number;
  orderIdDisplay: string;
  customerId: number;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  paymentCurrency: string;
  paymentAmountNgn: number;
  deliveryFee: number;
  totalAmount: number;
  deliveryAddressLine1: string;
  deliveryAddressLine2: string | null;
  deliveryCity: string;
  deliveryState: string | null;
  deliveryCountry: string;
  deliveryNotes: string | null;
  assignedTo: number | null;
  staffNotes: string | null;
  isDomestic: boolean;
}

export interface OrderItem {
  id: number;
  orderId: number;
  colourVariantId: number;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface DomesticDeliveryFee {
  id: number;
  state: string;
  fee: number;
}

export interface InternationalDeliveryFee {
  id: number;
  country: string;
  zone: string | null;
  fee: number;
}

export interface ActivityLog {
  id: number;
  staffUserId: number;
  actionType: string;
  entityType: string;
  entityId: string;
  description: string;
  metadata: string | null;
  createdAt: string;
}

export interface OrderStatusHistory {
  id: number;
  orderId: number;
  fromStatus: string | null;
  toStatus: string;
  changedBy: number | null;
  reason: string | null;
  createdAt: string;
}

export interface BusinessSetting {
  id: number;
  key: string;
  value: string;
  updatedBy: number | null;
  updatedAt: string;
}
