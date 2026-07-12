import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // 1. Fabric Types
  const fabricTypeNames = [
    "Lace",
    "Satin",
    "Beaded Lace",
    "Ankara",
    "Mikado",
    "Silk",
    "Jonkuso",
    "Other",
  ];

  const fabricTypes = await Promise.all(
    fabricTypeNames.map((name) =>
      prisma.fabricType.upsert({
        where: { name },
        update: {},
        create: {
          name,
          slug: name.toLowerCase().replace(/\s+/g, "-"),
          isPreloaded: true,
        },
      })
    )
  );
  console.log(`  ✅ ${fabricTypes.length} fabric types`);

  // 2. Admin Staff User
  const passwordHash = await bcrypt.hash("admin123", 10);
  const admin = await prisma.staffUser.upsert({
    where: { email: "admin@fabricstore.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@fabricstore.com",
      passwordHash,
      role: "owner",
    },
  });
  console.log(`  ✅ Admin user: ${admin.email} / admin123`);

  // 3. Sample Products
  const laceType = fabricTypes.find((t) => t.name === "Lace")!;
  const ankaraType = fabricTypes.find((t) => t.name === "Ankara")!;
  const silkType = fabricTypes.find((t) => t.name === "Silk")!;

  const sampleFabrics = [
    {
      name: "Premium French Lace",
      slug: "premium-french-lace",
      fabricTypeId: laceType.id,
      description:
        "Exquisite French lace with delicate floral patterns on a soft mesh base. Perfect for weddings and special occasions.",
      price: 15000,
    },
    {
      name: "Classic Ankara Print",
      slug: "classic-ankara-print",
      fabricTypeId: ankaraType.id,
      description:
        "Vibrant Ankara fabric with traditional African prints. 100% cotton, comfortable and durable.",
      price: 5000,
    },
    {
      name: "Luxury Silk Charmeuse",
      slug: "luxury-silk-charmeuse",
      fabricTypeId: silkType.id,
      description:
        "Pure silk charmeuse with a lustrous finish. Lightweight, smooth, and elegant.",
      price: 25000,
    },
  ];

  for (const fabric of sampleFabrics) {
    const existing = await prisma.fabric.findUnique({
      where: { slug: fabric.slug },
    });
    if (!existing) {
      await prisma.fabric.create({
        data: {
          ...fabric,
          images: "[]",
          colourVariants: {
            create: [
              { colourName: "Royal Blue", colourHex: "#1E3A5F", stockQuantity: 20, lowStockThreshold: 5 },
              { colourName: "Ivory White", colourHex: "#FFFFF0", stockQuantity: 15, lowStockThreshold: 5 },
              { colourName: "Burgundy", colourHex: "#7B1F3E", stockQuantity: 10, lowStockThreshold: 3 },
            ],
          },
        },
      });
      console.log(`  ✅ Created: ${fabric.name}`);
    } else {
      console.log(`  ⏭️  Skipped (exists): ${fabric.name}`);
    }
  }

  // 4. Business Settings
  const defaultSettings = [
    { key: "pod_deposit_type", value: JSON.stringify("percentage") },
    { key: "pod_deposit_value", value: JSON.stringify("20") },
    { key: "exchange_rate", value: JSON.stringify("1") },
    { key: "exchange_rate_source", value: JSON.stringify("manual") },
  ];

  for (const setting of defaultSettings) {
    await prisma.businessSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }
  console.log("  ✅ Business settings");

  // 5. Delivery Fees
  const domesticStates = [
    { state: "Lagos", fee: 1500 },
    { state: "Abuja", fee: 2500 },
    { state: "Rivers", fee: 3000 },
    { state: "Kano", fee: 4000 },
    { state: "Oyo", fee: 2000 },
    { state: "Delta", fee: 3000 },
    { state: "Enugu", fee: 3000 },
    { state: "Kaduna", fee: 4000 },
  ];

  for (const d of domesticStates) {
    await prisma.domesticDeliveryFee.upsert({
      where: { state: d.state },
      update: {},
      create: d,
    });
  }
  console.log(`  ✅ ${domesticStates.length} domestic delivery fees`);

  const internationalCountries = [
    { country: "United States", zone: "North America", fee: 15000 },
    { country: "United Kingdom", zone: "Europe", fee: 12000 },
    { country: "Canada", zone: "North America", fee: 15000 },
    { country: "Germany", zone: "Europe", fee: 12000 },
    { country: "France", zone: "Europe", fee: 12000 },
    { country: "South Africa", zone: "Africa", fee: 8000 },
    { country: "Ghana", zone: "Africa", fee: 5000 },
  ];

  for (const i of internationalCountries) {
    await prisma.internationalDeliveryFee.upsert({
      where: { country: i.country },
      update: {},
      create: i,
    });
  }
  console.log(`  ✅ ${internationalCountries.length} international delivery fees`);

  console.log("\n🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
