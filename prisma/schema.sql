-- FabricStore PostgreSQL Schema
-- Paste this into Neon SQL Editor

CREATE TABLE IF NOT EXISTS "StaffUser" (
  id SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  "passwordHash" TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'sales_rep',
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "lastLoginAt" TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "FabricType" (
  id SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  "isPreloaded" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "Fabric" (
  id SERIAL PRIMARY KEY,
  "fabricTypeId" INTEGER NOT NULL REFERENCES "FabricType"(id),
  "name" TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  specs TEXT,
  price DOUBLE PRECISION NOT NULL,
  images TEXT NOT NULL DEFAULT '[]',
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "ColourVariant" (
  id SERIAL PRIMARY KEY,
  "fabricId" INTEGER NOT NULL REFERENCES "Fabric"(id),
  "colourName" TEXT NOT NULL,
  "colourHex" TEXT,
  "stockQuantity" INTEGER NOT NULL DEFAULT 0,
  "lowStockThreshold" INTEGER NOT NULL DEFAULT 5,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "Customer" (
  id SERIAL PRIMARY KEY,
  phone TEXT,
  email TEXT,
  "name" TEXT,
  "passwordHash" TEXT,
  "isReturning" BOOLEAN NOT NULL DEFAULT false,
  "firstOrderAt" TEXT,
  "lastOrderAt" TEXT,
  "totalOrders" INTEGER NOT NULL DEFAULT 0,
  "totalSpent" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "Order" (
  id SERIAL PRIMARY KEY,
  "orderIdDisplay" TEXT NOT NULL,
  "customerId" INTEGER NOT NULL REFERENCES "Customer"(id),
  status TEXT NOT NULL DEFAULT 'pending_payment',
  "paymentMethod" TEXT NOT NULL DEFAULT 'pay_on_delivery',
  "paymentStatus" TEXT NOT NULL DEFAULT 'pending',
  "paymentCurrency" TEXT NOT NULL DEFAULT 'NGN',
  "paymentAmountNgn" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "deliveryFee" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "totalAmount" DOUBLE PRECISION NOT NULL,
  "deliveryAddressLine1" TEXT NOT NULL DEFAULT '',
  "deliveryAddressLine2" TEXT,
  "deliveryCity" TEXT NOT NULL DEFAULT '',
  "deliveryState" TEXT,
  "deliveryCountry" TEXT NOT NULL DEFAULT 'Nigeria',
  "deliveryNotes" TEXT,
  "assignedTo" INTEGER,
  "staffNotes" TEXT,
  "isDomestic" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "OrderItem" (
  id SERIAL PRIMARY KEY,
  "orderId" INTEGER NOT NULL REFERENCES "Order"(id),
  "colourVariantId" INTEGER NOT NULL REFERENCES "ColourVariant"(id),
  quantity INTEGER NOT NULL,
  "unitPrice" DOUBLE PRECISION NOT NULL,
  subtotal DOUBLE PRECISION NOT NULL
);

CREATE TABLE IF NOT EXISTS "OrderStatusHistory" (
  id SERIAL PRIMARY KEY,
  "orderId" INTEGER NOT NULL REFERENCES "Order"(id),
  "fromStatus" TEXT,
  "toStatus" TEXT NOT NULL,
  "changedBy" INTEGER,
  reason TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "ActivityLog" (
  id SERIAL PRIMARY KEY,
  "staffUserId" INTEGER NOT NULL,
  "actionType" TEXT NOT NULL,
  "entityType" TEXT NOT NULL,
  "entityId" TEXT NOT NULL,
  description TEXT NOT NULL,
  metadata TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "StockAdjustment" (
  id SERIAL PRIMARY KEY,
  "colourVariantId" INTEGER NOT NULL,
  "quantityChange" INTEGER NOT NULL,
  reason TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "DomesticDeliveryFee" (
  id SERIAL PRIMARY KEY,
  state TEXT NOT NULL UNIQUE,
  fee DOUBLE PRECISION NOT NULL
);

CREATE TABLE IF NOT EXISTS "InternationalDeliveryFee" (
  id SERIAL PRIMARY KEY,
  country TEXT NOT NULL,
  zone TEXT,
  fee DOUBLE PRECISION NOT NULL
);

CREATE TABLE IF NOT EXISTS "BusinessSetting" (
  id SERIAL PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  "updatedBy" INTEGER,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "PasswordResetToken" (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  "expiresAt" TIMESTAMP NOT NULL,
  used BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now()
);
