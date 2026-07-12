import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

const BASE = process.cwd();
const dataDir = path.join(BASE, "data");
const dbPath = path.join(dataDir, "db.json");

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

async function main() {
  console.log("Seeding database...");

  const passwordHash = await bcrypt.hash("admin123", 10);

  const seedData = {
    fabricTypes: [
      { id: 1, name: "Lace", slug: "lace", description: null, isPreloaded: true },
      { id: 2, name: "Satin", slug: "satin", description: null, isPreloaded: true },
      { id: 3, name: "Beaded Lace", slug: "beaded-lace", description: null, isPreloaded: true },
      { id: 4, name: "Ankara", slug: "ankara", description: null, isPreloaded: true },
      { id: 5, name: "Mikado", slug: "mikado", description: null, isPreloaded: true },
      { id: 6, name: "Silk", slug: "silk", description: null, isPreloaded: true },
      { id: 7, name: "Jonkuso", slug: "jonkuso", description: null, isPreloaded: true },
      { id: 8, name: "Other", slug: "other", description: null, isPreloaded: true },
    ],
    fabrics: [
      {
        id: 1, name: "Premium French Lace", slug: "premium-french-lace",
        fabricTypeId: 1, description: "Exquisite French lace with delicate floral patterns on a soft mesh base.",
        specs: null, price: 15000, images: "[]", isActive: true,
      },
      {
        id: 2, name: "Classic Ankara Print", slug: "classic-ankara-print",
        fabricTypeId: 4, description: "Vibrant Ankara fabric with traditional African prints. 100% cotton.",
        specs: null, price: 5000, images: "[]", isActive: true,
      },
      {
        id: 3, name: "Luxury Silk Charmeuse", slug: "luxury-silk-charmeuse",
        fabricTypeId: 6, description: "Pure silk charmeuse with a lustrous finish.",
        specs: null, price: 25000, images: "[]", isActive: true,
      },
    ],
    colourVariants: [
      { id: 1, fabricId: 1, colourName: "Royal Blue", colourHex: "#1E3A5F", stockQuantity: 20, lowStockThreshold: 5, isActive: true },
      { id: 2, fabricId: 1, colourName: "Ivory White", colourHex: "#FFFFF0", stockQuantity: 15, lowStockThreshold: 5, isActive: true },
      { id: 3, fabricId: 1, colourName: "Burgundy", colourHex: "#7B1F3E", stockQuantity: 10, lowStockThreshold: 3, isActive: true },
      { id: 4, fabricId: 2, colourName: "Blue", colourHex: "#1565C0", stockQuantity: 25, lowStockThreshold: 5, isActive: true },
      { id: 5, fabricId: 2, colourName: "Green", colourHex: "#2E7D32", stockQuantity: 20, lowStockThreshold: 5, isActive: true },
      { id: 6, fabricId: 2, colourName: "Red", colourHex: "#C62828", stockQuantity: 18, lowStockThreshold: 3, isActive: true },
      { id: 7, fabricId: 3, colourName: "Champagne", colourHex: "#F7E7CE", stockQuantity: 12, lowStockThreshold: 3, isActive: true },
      { id: 8, fabricId: 3, colourName: "Blush Pink", colourHex: "#DEB6C1", stockQuantity: 8, lowStockThreshold: 3, isActive: true },
    ],
    customers: [],
    orders: [],
    orderItems: [],
    staffUsers: [
      { id: 1, name: "Admin", email: "admin@fabricstore.com", passwordHash, role: "owner", isActive: true, lastLoginAt: null },
    ],
    activityLogs: [],
    stockAdjustments: [],
    domesticDeliveryFees: [
      { id: 1, state: "Lagos", fee: 1500 },
      { id: 2, state: "Abuja", fee: 2500 },
      { id: 3, state: "Rivers", fee: 3000 },
      { id: 4, state: "Kano", fee: 4000 },
      { id: 5, state: "Oyo", fee: 2000 },
    ],
    internationalDeliveryFees: [
      { id: 1, country: "United States", zone: "North America", fee: 15000 },
      { id: 2, country: "United Kingdom", zone: "Europe", fee: 12000 },
      { id: 3, country: "Canada", zone: "North America", fee: 15000 },
      { id: 4, country: "South Africa", zone: "Africa", fee: 8000 },
      { id: 5, country: "Ghana", zone: "Africa", fee: 5000 },
    ],
    businessSettings: [
      { key: "pod_deposit_type", value: '"percentage"' },
      { key: "pod_deposit_value", value: '"20"' },
      { key: "exchange_rate", value: '"1"' },
      { key: "exchange_rate_source", value: '"manual"' },
    ],
  };

  fs.writeFileSync(dbPath, JSON.stringify(seedData, null, 2));
  console.log(`✅ Database seeded to ${dbPath}`);
  console.log("   Admin: admin@fabricstore.com / admin123");
  console.log("   Fabric types: 8");
  console.log("   Products: 3");
  console.log("   Colour variants: 8");
  console.log("\nRun: npm run dev");
}

main().catch((e) => {
  console.error("Seeding failed:", e);
  process.exit(1);
});
