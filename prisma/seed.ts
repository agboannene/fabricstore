import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const dbPath = path.join(process.cwd(), "data", "db.json");
  const db = JSON.parse(fs.readFileSync(dbPath, "utf8"));

  console.log("Seeding database...");

  // Fabric Types
  for (const ft of db.fabricTypes) {
    await prisma.fabricType.upsert({
      where: { id: ft.id },
      update: {},
      create: {
        id: ft.id,
        name: ft.name,
        slug: ft.slug,
        description: ft.description,
        isPreloaded: ft.isPreloaded,
      },
    });
  }
  console.log(`  ✓ ${db.fabricTypes.length} fabric types`);

  // Fabrics
  for (const f of db.fabrics) {
    await prisma.fabric.upsert({
      where: { id: f.id },
      update: {},
      create: {
        id: f.id,
        fabricTypeId: f.fabricTypeId,
        name: f.name,
        slug: f.slug,
        description: f.description,
        specs: f.specs,
        price: f.price,
        images: f.images,
        isActive: f.isActive,
      },
    });
  }
  console.log(`  ✓ ${db.fabrics.length} fabrics`);

  // Colour Variants
  for (const cv of db.colourVariants) {
    await prisma.colourVariant.upsert({
      where: { id: cv.id },
      update: {},
      create: {
        id: cv.id,
        fabricId: cv.fabricId,
        colourName: cv.colourName,
        colourHex: cv.colourHex,
        stockQuantity: cv.stockQuantity,
        lowStockThreshold: cv.lowStockThreshold,
        isActive: cv.isActive,
      },
    });
  }
  console.log(`  ✓ ${db.colourVariants.length} colour variants`);

  // Admin user
  const adminPasswordHash = await bcrypt.hash("admin123", 10);
  await prisma.staffUser.upsert({
    where: { email: "admin@fabricstore.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@fabricstore.com",
      passwordHash: adminPasswordHash,
      role: "owner",
      isActive: true,
    },
  });
  console.log("  ✓ admin user (admin@fabricstore.com / admin123)");

  // Domestic Delivery Fees
  for (const fee of db.domesticDeliveryFees) {
    await prisma.domesticDeliveryFee.upsert({
      where: { id: fee.id },
      update: {},
      create: { id: fee.id, state: fee.state, fee: fee.fee },
    });
  }
  console.log(`  ✓ ${db.domesticDeliveryFees.length} domestic delivery fees`);

  // International Delivery Fees
  for (const fee of db.internationalDeliveryFees) {
    await prisma.internationalDeliveryFee.upsert({
      where: { id: fee.id },
      update: {},
      create: { id: fee.id, country: fee.country, zone: fee.zone, fee: fee.fee },
    });
  }
  console.log(`  ✓ ${db.internationalDeliveryFees.length} international delivery fees`);

  // Business Settings
  for (const s of db.businessSettings) {
    await prisma.businessSetting.upsert({
      where: { key: s.key },
      update: {},
      create: { key: s.key, value: s.value },
    });
  }
  console.log(`  ✓ ${db.businessSettings.length} business settings`);

  console.log("\nSeeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
