import { prisma } from "./prisma";

type TableName =
  | "fabricTypes"
  | "fabrics"
  | "colourVariants"
  | "customers"
  | "orders"
  | "orderItems"
  | "staffUsers"
  | "activityLogs"
  | "stockAdjustments"
  | "domesticDeliveryFees"
  | "internationalDeliveryFees"
  | "businessSettings"
  | "orderStatusHistory";

function getModel(table: TableName) {
  const map: Record<TableName, any> = {
    fabricTypes: prisma.fabricType,
    fabrics: prisma.fabric,
    colourVariants: prisma.colourVariant,
    customers: prisma.customer,
    orders: prisma.order,
    orderItems: prisma.orderItem,
    staffUsers: prisma.staffUser,
    activityLogs: prisma.activityLog,
    stockAdjustments: prisma.stockAdjustment,
    domesticDeliveryFees: prisma.domesticDeliveryFee,
    internationalDeliveryFees: prisma.internationalDeliveryFee,
    businessSettings: prisma.businessSetting,
    orderStatusHistory: prisma.orderStatusHistory,
  };
  return map[table];
}

export const db = {
  async getAll<T>(table: TableName): Promise<T[]> {
    return getModel(table).findMany() as Promise<T[]>;
  },

  async getById<T>(table: TableName, id: number): Promise<T | null> {
    return getModel(table).findUnique({ where: { id } }) as Promise<T | null>;
  },

  async getByField<T>(table: TableName, field: string, value: any): Promise<T[]> {
    return getModel(table).findMany({ where: { [field]: value } }) as Promise<T[]>;
  },

  async getOneByField<T>(table: TableName, field: string, value: any): Promise<T | null> {
    return getModel(table).findFirst({ where: { [field]: value } }) as Promise<T | null>;
  },

  async create<T>(table: TableName, item: any): Promise<T> {
    return getModel(table).create({ data: item }) as Promise<T>;
  },

  async update<T>(table: TableName, id: number, updates: any): Promise<T | null> {
    return getModel(table).update({ where: { id }, data: updates }) as Promise<T | null>;
  },

  async delete(table: TableName, id: number): Promise<boolean> {
    try {
      await getModel(table).delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  },

  async count(table: TableName): Promise<number> {
    return getModel(table).count();
  },
};
