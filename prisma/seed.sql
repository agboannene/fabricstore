-- Seed Data

INSERT INTO "FabricType" (id, "name", slug, description, "isPreloaded") VALUES (1, 'Lace', 'lace', 'Delicate, open-weave fabric with intricate patterns. Perfect for evening wear, bridal gowns, and special occasion outfits.', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO "FabricType" (id, "name", slug, description, "isPreloaded") VALUES (2, 'Satin', 'satin', 'Lustrous, smooth fabric with a glossy surface and dull back. Ideal for blouses, dresses, and elegant evening wear.', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO "FabricType" (id, "name", slug, description, "isPreloaded") VALUES (3, 'Beaded Lace', 'beaded-lace', 'Hand-beaded lace with intricate embroidery and embellishments. Premium choice for luxury and ceremonial attire.', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO "FabricType" (id, "name", slug, description, "isPreloaded") VALUES (4, 'Ankara', 'ankara', 'Vibrant, colourful cotton fabric with bold African prints. Durable, breathable, and perfect for everyday and ceremonial wear.', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO "FabricType" (id, "name", slug, description, "isPreloaded") VALUES (5, 'Mikado', 'mikado', 'Crisp, structured fabric with a subtle sheen. A popular choice for bridal gowns, evening dresses, and tailored pieces.', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO "FabricType" (id, "name", slug, description, "isPreloaded") VALUES (6, 'Silk', 'silk', 'Luxurious, natural protein fibre fabric prized for its softness, breathability, and natural sheen.', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO "FabricType" (id, "name", slug, description, "isPreloaded") VALUES (7, 'Jonkuso', 'jonkuso', 'Traditional Nigerian fabric with raised textured patterns woven directly into the material. Known for its rich cultural significance.', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO "FabricType" (id, "name", slug, description, "isPreloaded") VALUES (8, 'Other', 'other', 'Browse our collection of specialty fabrics including cotton, velvet, chiffon, organza, and more.', true) ON CONFLICT (id) DO NOTHING;

INSERT INTO "Fabric" (id, "fabricTypeId", "name", slug, description, price, images, "isActive") VALUES (1, 1, 'Premium French Lace', 'premium-french-lace', 'Exquisite French and African lace collection featuring a wide variety of styles — from delicate floral embroidery and sunflower motifs to fully beaded and sequined designs. Each yard features intricate scalloped edges and luxurious drape. Perfect for bridal gowns, reception dresses, traditional ceremonies, and statement evening wear. Browse our selection of classic lace, embroidered lace, beaded lace, and sequined lace in colours ranging from soft pastels to bold jewel tones.', 15000, '["/fabrics/lace.jpg","/fabrics/lace-sunflower.jpg","/fabrics/lace-green.jpg","/fabrics/lace-purple-beaded.jpg","/fabrics/lace-red-beaded.jpg"]', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO "Fabric" (id, "fabricTypeId", "name", slug, description, price, images, "isActive") VALUES (2, 4, 'Classic Ankara Print', 'classic-ankara-print', 'Vibrant Ankara fabric featuring bold, traditional African wax prints on 100% premium cotton. Our collection includes a wide variety of patterns — from peacock motifs and geometric dots to swirls and floral designs. Milled using high-quality wax print techniques that ensure deep, lasting colour. The fabric is breathable, durable, and easy to care for — making it ideal for both everyday wears and special occasions. Each pattern tells a unique story inspired by African heritage. Use it for blouses, skirts, dresses, head wraps, and bespoke tailoring.', 5000, '["/fabrics/ankara.jpg","/fabrics/ankara-green.jpg","/fabrics/ankara-purple.jpg","/fabrics/ankara-orange-purple.jpg","/fabrics/ankara-green-dots.jpg","/fabrics/ankara-blue.jpg"]', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO "Fabric" (id, "fabricTypeId", "name", slug, description, price, images, "isActive") VALUES (3, 6, 'Luxury Silk Charmeuse', 'luxury-silk-charmeuse', 'Pure mulberry silk charmeuse with an ultra-smooth, lustrous surface that drapes beautifully. This 22-momme weight silk offers the perfect balance of luxury and durability. Charmeuse silk is characterized by its satin weave construction, giving it a glossy front and matte back. Naturally temperature-regulating and hypoallergenic, this fabric glides against the skin for unparalleled comfort. Ideal for silk blouses, flowing dresses, lingerie, luxury bedding, and as lining fabric for high-end garments.', 25000, '["/fabrics/silk.jpg"]', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO "Fabric" (id, "fabricTypeId", "name", slug, description, price, images, "isActive") VALUES (4, 2, 'Premium Satin Fabric', 'premium-satin-fabric', 'Luxurious satin fabric with a smooth, glossy surface that catches the light beautifully. Available in a wide range of vibrant colours, this medium-weight satin is perfect for evening wear, prom dresses, bridal parties, and elegant home décor. The fabric has a beautiful drape and feels silky against the skin. Easy to sew and maintain, making it ideal for both beginners and experienced dressmakers.', 8000, '["/fabrics/satin.jpg"]', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO "Fabric" (id, "fabricTypeId", "name", slug, description, price, images, "isActive") VALUES (5, 8, 'Hand-Dyed Adire Fabric', 'hand-dyed-adire-fabric', 'Authentic Nigerian Adire fabric handcrafted using traditional tie-dye techniques. Each piece features unique patterns created by skilled artisans using natural indigo and other plant-based dyes. The resist-dyeing process ensures no two pieces are exactly alike, making every yard truly one-of-a-kind. Perfect for traditional ceremonies, contemporary fashion, home décor, and statement pieces. The fabric softens beautifully with each wash while maintaining its rich colour.', 6000, '["/fabrics/adire.jpg"]', true) ON CONFLICT (id) DO NOTHING;

INSERT INTO "ColourVariant" (id, "fabricId", "colourName", "colourHex", "stockQuantity", "lowStockThreshold", "isActive") VALUES (1, 1, 'Royal Blue', '#1E3A5F', 14, 5, true) ON CONFLICT (id) DO NOTHING;
INSERT INTO "ColourVariant" (id, "fabricId", "colourName", "colourHex", "stockQuantity", "lowStockThreshold", "isActive") VALUES (2, 1, 'Ivory White', '#FFFFF0', 15, 5, true) ON CONFLICT (id) DO NOTHING;
INSERT INTO "ColourVariant" (id, "fabricId", "colourName", "colourHex", "stockQuantity", "lowStockThreshold", "isActive") VALUES (3, 1, 'Burgundy', '#7B1F3E', 10, 3, true) ON CONFLICT (id) DO NOTHING;
INSERT INTO "ColourVariant" (id, "fabricId", "colourName", "colourHex", "stockQuantity", "lowStockThreshold", "isActive") VALUES (4, 2, 'Blue', '#1565C0', 22, 5, true) ON CONFLICT (id) DO NOTHING;
INSERT INTO "ColourVariant" (id, "fabricId", "colourName", "colourHex", "stockQuantity", "lowStockThreshold", "isActive") VALUES (5, 2, 'Green', '#2E7D32', 20, 5, true) ON CONFLICT (id) DO NOTHING;
INSERT INTO "ColourVariant" (id, "fabricId", "colourName", "colourHex", "stockQuantity", "lowStockThreshold", "isActive") VALUES (6, 2, 'Red', '#C62828', 18, 3, true) ON CONFLICT (id) DO NOTHING;
INSERT INTO "ColourVariant" (id, "fabricId", "colourName", "colourHex", "stockQuantity", "lowStockThreshold", "isActive") VALUES (7, 3, 'Champagne', '#F7E7CE', 12, 3, true) ON CONFLICT (id) DO NOTHING;
INSERT INTO "ColourVariant" (id, "fabricId", "colourName", "colourHex", "stockQuantity", "lowStockThreshold", "isActive") VALUES (8, 3, 'Blush Pink', '#DEB6C1', 8, 3, true) ON CONFLICT (id) DO NOTHING;

INSERT INTO "StaffUser" (id, "name", email, "passwordHash", role, "isActive", "lastLoginAt") VALUES (1, 'Admin', 'admin@fabricstore.com', '$2a$10$uve54PTFH4mph5WOyORF2uDhqA.9Cbf9ak2ceCIp8ArLj1CoAGjv2', 'owner', true, '2026-07-12T10:01:21.163Z') ON CONFLICT (id) DO NOTHING;

INSERT INTO "DomesticDeliveryFee" (id, state, fee) VALUES (1, 'Lagos', 1500) ON CONFLICT (id) DO NOTHING;
INSERT INTO "DomesticDeliveryFee" (id, state, fee) VALUES (2, 'Abuja', 2500) ON CONFLICT (id) DO NOTHING;
INSERT INTO "DomesticDeliveryFee" (id, state, fee) VALUES (3, 'Rivers', 3000) ON CONFLICT (id) DO NOTHING;
INSERT INTO "DomesticDeliveryFee" (id, state, fee) VALUES (4, 'Kano', 4000) ON CONFLICT (id) DO NOTHING;
INSERT INTO "DomesticDeliveryFee" (id, state, fee) VALUES (5, 'Oyo', 2000) ON CONFLICT (id) DO NOTHING;

INSERT INTO "InternationalDeliveryFee" (id, country, zone, fee) VALUES (1, 'United States', 'North America', 15000) ON CONFLICT (id) DO NOTHING;
INSERT INTO "InternationalDeliveryFee" (id, country, zone, fee) VALUES (2, 'United Kingdom', 'Europe', 12000) ON CONFLICT (id) DO NOTHING;
INSERT INTO "InternationalDeliveryFee" (id, country, zone, fee) VALUES (3, 'Canada', 'North America', 15000) ON CONFLICT (id) DO NOTHING;
INSERT INTO "InternationalDeliveryFee" (id, country, zone, fee) VALUES (4, 'South Africa', 'Africa', 8000) ON CONFLICT (id) DO NOTHING;
INSERT INTO "InternationalDeliveryFee" (id, country, zone, fee) VALUES (5, 'Ghana', 'Africa', 5000) ON CONFLICT (id) DO NOTHING;

INSERT INTO "BusinessSetting" (key, value) VALUES ('pod_deposit_type', '"percentage"') ON CONFLICT (key) DO NOTHING;
INSERT INTO "BusinessSetting" (key, value) VALUES ('pod_deposit_value', '"20"') ON CONFLICT (key) DO NOTHING;
INSERT INTO "BusinessSetting" (key, value) VALUES ('exchange_rate', '"1"') ON CONFLICT (key) DO NOTHING;
INSERT INTO "BusinessSetting" (key, value) VALUES ('exchange_rate_source', '"manual"') ON CONFLICT (key) DO NOTHING;

-- Reset sequences
SELECT setval(pg_get_serial_sequence('"FabricType"', 'id'), COALESCE((SELECT MAX(id) FROM "FabricType"), 1));
SELECT setval(pg_get_serial_sequence('"Fabric"', 'id'), COALESCE((SELECT MAX(id) FROM "Fabric"), 1));
SELECT setval(pg_get_serial_sequence('"ColourVariant"', 'id'), COALESCE((SELECT MAX(id) FROM "ColourVariant"), 1));
SELECT setval(pg_get_serial_sequence('"StaffUser"', 'id'), COALESCE((SELECT MAX(id) FROM "StaffUser"), 1));
SELECT setval(pg_get_serial_sequence('"DomesticDeliveryFee"', 'id'), COALESCE((SELECT MAX(id) FROM "DomesticDeliveryFee"), 1));
SELECT setval(pg_get_serial_sequence('"InternationalDeliveryFee"', 'id'), COALESCE((SELECT MAX(id) FROM "InternationalDeliveryFee"), 1));