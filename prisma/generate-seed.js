const fs = require('fs');
const db = JSON.parse(fs.readFileSync('data/db.json', 'utf8'));
const lines = [];

function esc(v) {
  if (v === null || v === undefined) return 'NULL';
  if (typeof v === 'number') return v;
  if (typeof v === 'boolean') return v ? 'true' : 'false';
  return "'" + String(v).replace(/'/g, "''") + "'";
}

lines.push('-- Seed Data');
lines.push('');

db.fabricTypes.forEach(f => {
  lines.push(`INSERT INTO "FabricType" (id, "name", slug, description, "isPreloaded") VALUES (${f.id}, ${esc(f.name)}, ${esc(f.slug)}, ${esc(f.description)}, ${f.isPreloaded}) ON CONFLICT (id) DO NOTHING;`);
});

lines.push('');

db.fabrics.forEach(f => {
  lines.push(`INSERT INTO "Fabric" (id, "fabricTypeId", "name", slug, description, price, images, "isActive") VALUES (${f.id}, ${f.fabricTypeId}, ${esc(f.name)}, ${esc(f.slug)}, ${esc(f.description)}, ${f.price}, ${esc(f.images)}, ${f.isActive}) ON CONFLICT (id) DO NOTHING;`);
});

lines.push('');

db.colourVariants.forEach(c => {
  lines.push(`INSERT INTO "ColourVariant" (id, "fabricId", "colourName", "colourHex", "stockQuantity", "lowStockThreshold", "isActive") VALUES (${c.id}, ${c.fabricId}, ${esc(c.colourName)}, ${esc(c.colourHex)}, ${c.stockQuantity}, ${c.lowStockThreshold}, ${c.isActive}) ON CONFLICT (id) DO NOTHING;`);
});

lines.push('');

db.staffUsers.forEach(s => {
  lines.push(`INSERT INTO "StaffUser" (id, "name", email, "passwordHash", role, "isActive", "lastLoginAt") VALUES (${s.id}, ${esc(s.name)}, ${esc(s.email)}, ${esc(s.passwordHash)}, ${esc(s.role)}, ${s.isActive}, ${esc(s.lastLoginAt)}) ON CONFLICT (id) DO NOTHING;`);
});

lines.push('');

db.domesticDeliveryFees.forEach(d => {
  lines.push(`INSERT INTO "DomesticDeliveryFee" (id, state, fee) VALUES (${d.id}, ${esc(d.state)}, ${d.fee}) ON CONFLICT (id) DO NOTHING;`);
});

lines.push('');

db.internationalDeliveryFees.forEach(i => {
  lines.push(`INSERT INTO "InternationalDeliveryFee" (id, country, zone, fee) VALUES (${i.id}, ${esc(i.country)}, ${esc(i.zone)}, ${i.fee}) ON CONFLICT (id) DO NOTHING;`);
});

lines.push('');

db.businessSettings.forEach(b => {
  lines.push(`INSERT INTO "BusinessSetting" (key, value) VALUES (${esc(b.key)}, ${esc(b.value)}) ON CONFLICT (key) DO NOTHING;`);
});

lines.push('');
lines.push('-- Reset sequences');
lines.push(`SELECT setval(pg_get_serial_sequence('"FabricType"', 'id'), COALESCE((SELECT MAX(id) FROM "FabricType"), 1));`);
lines.push(`SELECT setval(pg_get_serial_sequence('"Fabric"', 'id'), COALESCE((SELECT MAX(id) FROM "Fabric"), 1));`);
lines.push(`SELECT setval(pg_get_serial_sequence('"ColourVariant"', 'id'), COALESCE((SELECT MAX(id) FROM "ColourVariant"), 1));`);
lines.push(`SELECT setval(pg_get_serial_sequence('"StaffUser"', 'id'), COALESCE((SELECT MAX(id) FROM "StaffUser"), 1));`);
lines.push(`SELECT setval(pg_get_serial_sequence('"DomesticDeliveryFee"', 'id'), COALESCE((SELECT MAX(id) FROM "DomesticDeliveryFee"), 1));`);
lines.push(`SELECT setval(pg_get_serial_sequence('"InternationalDeliveryFee"', 'id'), COALESCE((SELECT MAX(id) FROM "InternationalDeliveryFee"), 1));`);

fs.writeFileSync('prisma/seed.sql', lines.join('\n'));
console.log('Generated ' + lines.length + ' lines');
