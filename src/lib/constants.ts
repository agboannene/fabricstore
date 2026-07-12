export const FABRIC_TYPES = [
  "Lace",
  "Satin",
  "Beaded Lace",
  "Ankara",
  "Mikado",
  "Silk",
  "Jonkuso",
  "Other",
] as const;

export const ORDER_STATUSES = {
  PENDING_PAYMENT: "pending_payment",
  CONFIRMED: "confirmed",
  ASSIGNED_TO_PACKING: "assigned_to_packing",
  PACKED: "packed",
  OUT_FOR_DELIVERY: "out_for_delivery",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
  REFUNDED: "refunded",
} as const;

export const ORDER_STATUS_LABELS: Record<string, string> = {
  pending_payment: "Pending Payment",
  confirmed: "Confirmed",
  assigned_to_packing: "Assigned to Packing",
  packed: "Packed",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
  refunded: "Refunded",
};

export const PAYMENT_METHODS = {
  PAY_ON_DELIVERY: "pay_on_delivery",
  BANK_TRANSFER: "bank_transfer",
  PAYSTACK: "paystack",
  FLUTTERWAVE: "flutterwave",
} as const;

export const STAFF_ROLES = {
  OWNER: "owner",
  MANAGER: "manager",
  SALES_REP: "sales_rep",
  PACKING_STAFF: "packing_staff",
} as const;

export const STAFF_ROLE_LABELS: Record<string, string> = {
  owner: "Owner",
  manager: "Manager",
  sales_rep: "Sales Rep",
  packing_staff: "Packing Staff",
};

export const CURRENCY = {
  NGN: "NGN",
  USD: "USD",
  GBP: "GBP",
  EUR: "EUR",
} as const;
