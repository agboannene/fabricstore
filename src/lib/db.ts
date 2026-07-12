import fs from "fs";
import path from "path";

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

let data: Record<string, any[]> = {};

function getFilePath(): string {
  return path.join(process.cwd(), "data", "db.json");
}

function load(): void {
  const filePath = getFilePath();
  if (fs.existsSync(filePath)) {
    try {
      data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } catch {
      data = {};
    }
  }
  // Ensure all tables exist
  const tables: TableName[] = [
    "fabricTypes", "fabrics", "colourVariants", "customers",
    "orders", "orderItems", "staffUsers", "activityLogs",
    "stockAdjustments", "domesticDeliveryFees", "internationalDeliveryFees",
    "businessSettings", "orderStatusHistory",
  ];
  for (const table of tables) {
    if (!data[table]) data[table] = [];
  }
}

function save(): void {
  const dir = path.dirname(getFilePath());
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(getFilePath(), JSON.stringify(data, null, 2));
}

// Initialize
load();

// Public API
export const db = {
  getAll<T>(table: TableName): T[] {
    return data[table] as T[];
  },

  getById<T extends { id: number }>(table: TableName, id: number): T | undefined {
    return (data[table] as T[]).find((item: any) => item.id === id);
  },

  getByField<T>(table: TableName, field: string, value: any): T[] {
    return (data[table] as T[]).filter((item: any) => item[field] === value) as T[];
  },

  getOneByField<T>(table: TableName, field: string, value: any): T | undefined {
    return (data[table] as T[]).find((item: any) => item[field] === value) as T | undefined;
  },

  create<T extends { id: number }>(table: TableName, item: Omit<T, "id">): T {
    const items = data[table] as any[];
    const maxId = items.reduce((max, curr) => Math.max(max, curr.id || 0), 0);
    const newItem = { ...item, id: maxId + 1 } as T;
    items.push(newItem);
    save();
    return newItem;
  },

  update<T>(table: TableName, id: number, updates: Partial<T>): T | undefined {
    const items = data[table] as any[];
    const index = items.findIndex((item: any) => item.id === id);
    if (index === -1) return undefined;
    items[index] = { ...items[index], ...updates };
    save();
    return items[index] as T;
  },

  delete(table: TableName, id: number): boolean {
    const items = data[table] as any[];
    const index = items.findIndex((item: any) => item.id === id);
    if (index === -1) return false;
    items.splice(index, 1);
    save();
    return true;
  },

  count(table: TableName): number {
    return (data[table] as any[]).length;
  },

  reset(seedData: Record<string, any[]>): void {
    data = {};
    for (const [key, items] of Object.entries(seedData)) {
      data[key] = JSON.parse(JSON.stringify(items));
    }
    save();
  },
};
