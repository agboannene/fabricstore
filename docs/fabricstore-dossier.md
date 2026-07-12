# FabricStore — Business Requirements Dossier
### Full-Stack E-commerce & Operations Platform for a Fabric Business

---

## 1. Overview

FabricStore is a two-sided platform: a public online store where customers browse and buy fabric — locally and internationally — and an internal dashboard where the business team manages orders, stock, sales, and staff, all feeding off the same live data.

## 2. The Problem This Solves

A fabric business selling online today typically juggles a website (or Instagram page) for customers, a separate notebook or spreadsheet for stock, and WhatsApp for staff coordination — with no single place to see what's been ordered, what's in stock by colour, who's handling what, and whether the business is actually profitable. This is compounded by international customers, different fabric types with very different demand patterns, and a growing base of returning customers worth recognizing. FabricStore brings all of that into one connected system.

## 3. The Two Sides of the Platform

- **Side 1 — Customer-Facing Store (Public):** anyone, in Nigeria or abroad, can browse fabrics, add to cart, check out, pay, and track their order.
- **Side 2 — Internal Ops Dashboard (Staff Only):** the Owner, Manager, Sales Reps, and Packing Staff log in with their own accounts to manage orders, stock, sales, and each other's activity, each seeing only what's relevant to their job.

---

## 4. Side 1 — Customer-Facing Store

### Landing Page
Hero section, About, Featured Fabrics, Testimonials, Contact.

### Product Catalogue
Every fabric listed with name, image, price per yard or metre, **fabric type** (e.g., Lace, Satin, Beaded Lace, Ankara, Mikado, Silk, Jonkuso), and available colours. Customers can filter by fabric type to find what they want quickly.

### Product Detail Page
Large product image, description, fabric specs, a colour selector, and a quantity selector. The quantity selector respects real stock for the specific colour chosen.

### Shopping Cart
Add, remove, and update quantities before checking out.

### Customer Accounts & Returning Customer Login
Customers log in using the same ID each time they order (their phone number or email address). Rather than setting a password, they receive a **one-time code by SMS or email** each time they want to log in — they enter that code and they're in. This means:
- Returning customers can see their past orders without needing to dig up an old order ID, and without ever having to remember a password.
- The system can automatically recognize someone as a **returning customer** once they've ordered more than once — laying the groundwork for future incentives (a discount code, priority handling, or a small loyalty perk for repeat buyers), even if the incentive itself isn't built in this phase.
- New customers go through the same one-time-code process the very first time — there's no separate "sign up" step, just entering their phone/email and confirming the code sent to them.

### Checkout
Customer details, delivery address, country/state selection — feeding into the delivery calculator below.

### Delivery Fee Calculator
Calculates delivery cost automatically:
- **Within Nigeria:** based on the state selected, using a fee table the business maintains.
- **International orders:** based on destination country or shipping zone, using a separate international fee table — since international shipping costs behave very differently from local delivery and typically need their own rate structure.

### Payment Options
1. **Pay on Delivery** — Nigeria only, with a small deposit required upfront; balance paid on delivery.
2. **Bank Transfer** — for Nigerian customers, a local transfer confirmed manually by staff; for international customers, this becomes an international wire transfer, also confirmed manually.
3. **Paystack / Flutterwave** — supports both local and international card payments, confirmed automatically. For international orders, the customer's currency is captured and converted to Naira automatically using a live exchange rate, the same approach used on your other dashboard.

### Order Confirmation
Confirmation page plus a confirmation email with order details and an order ID.

### Order Tracking Page
Customers can check status either by entering their order ID, or automatically by logging into their account and viewing all their orders in one place.

---

## 5. Side 2 — Internal Ops Dashboard

### Role-Based Login
Each staff member logs in with their own name and password — every action traceable to a person, with login activity visible to the Owner.

### Order Management
View all orders, update status, assign to a team member.

### Inventory
Fabric stock levels tracked **per colour** within each fabric, low stock alerts per colour, and a restock log. Fabric **type** (Lace, Ankara, Silk, etc.) is tracked as its own category, separate from colour, so stock and sales can be viewed either way — by specific colour variant, or rolled up by type.

### Sales Tracker
Daily, weekly, and monthly revenue and profit — with a breakdown **by fabric type** (e.g., how Lace is performing versus Ankara versus Silk) in addition to the usual per-product breakdown. This lets the Owner see which categories of fabric are actually driving the business, not just which individual items.

### Product Manager
Add, edit, or delete fabrics; upload images; set prices; manage fabric type, colour variants, and their individual stock levels.

### Staff Activity Log
Who did what and when — order changes, product edits, restocks, logins.

### Customer Database
Every customer who has ordered, with contact details, full order history, and a flag showing whether they're a **first-time** or **returning** customer — built automatically from their account, not a separate manual list.

### Restock Alerts
Any colour variant below its threshold is automatically flagged.

### Daily Summary
Revenue, number of orders, stock changes, and an exportable report.

---

## 6. Roles & Permissions

| Area | Owner | Manager | Sales Rep | Packing Staff |
|---|---|---|---|---|
| View all orders | ✅ | ✅ | ✅ | 🔸 Assigned orders only |
| Update order status | ✅ | ✅ | ✅ | ✅ (packing-related statuses only) |
| Assign orders to staff | ✅ | ✅ | 🚫 | 🚫 |
| View customer database | ✅ | ✅ | ✅ | 🚫 |
| View cost prices & profit margins | ✅ | ✅ | 🚫 | 🚫 |
| View Sales Tracker (revenue/profit, by product & by fabric type) | ✅ | ✅ | 🚫 | 🚫 |
| Add/edit/delete fabrics & prices | ✅ | ✅ | 🚫 | 🚫 |
| Manage stock & restocks | ✅ | ✅ | 🚫 | 🚫 (can mark assigned items packed only) |
| View Staff Activity Log — own team | ✅ | ✅ | 🚫 | 🚫 |
| **View Staff Activity Log — entire business, all teams** | ✅ Owner only | 🚫 | 🚫 | 🚫 |
| **Add/remove staff accounts, assign roles** | ✅ Owner only | 🚫 | 🚫 | 🚫 |
| **Change business-wide settings** (delivery fee tables, exchange rate settings, deposit amount, international shipping zones) | ✅ Owner only | 🚫 | 🚫 | 🚫 |
| Confirm bank transfer / wire payments | ✅ | ✅ | ✅ | 🚫 |
| Export Daily Summary | ✅ | ✅ | 🚫 | 🚫 |

**What changed from before:** the Manager keeps everything previously agreed (profit visibility, product/stock management, order handling). What's now reserved for the **Owner only** is anything that shapes the business as a whole rather than day-to-day running of it: full cross-team visibility into staff activity, the ability to add or remove staff and set their roles, and control over settings like delivery fee tables, exchange rates, and deposit amounts.

---

## 7. Product & Inventory Model

- Each **fabric** belongs to a **fabric type** — a category such as Lace, Satin, Beaded Lace, Ankara, Mikado, Silk, or Jonkuso. This is tracked separately from colour, so the Owner can view performance either by specific product, by colour, or rolled up by type.
- Each fabric can have multiple **colour variants**, each with its own stock count and low-stock threshold.
- Price is assumed to be the same across all colours of a given fabric (flagged in Section 10 — confirm if any colour should be priced differently).
- A sale automatically reduces stock for the specific colour ordered.

### Preloaded Fabric Types
To save setup time, the following are preloaded as starting categories (renameable, and more can be added):
- Lace
- Satin
- Beaded Lace
- Ankara
- Mikado
- Silk
- Jonkuso
- Other

## 8. Payment & Delivery Model

- **Domestic Delivery Fee Table:** state-by-state, maintained by the Owner.
- **International Delivery Fee Table:** country or shipping-zone based, maintained by the Owner, kept separate from the domestic table since international rates work differently.
- **Currency:** Naira is the default; international customers can pay in their own currency where supported (via Paystack/Flutterwave), with the amount converted to Naira automatically using a live exchange rate for consistent reporting — the same pattern as your other dashboard.
- **Pay on Delivery:** Nigeria only, with a small deposit upfront; not offered for international orders (not physically practical to collect on delivery abroad).
- **Bank Transfer:** local transfer domestically, international wire transfer for customers abroad — both confirmed manually by staff.
- **Paystack/Flutterwave:** works for both domestic and international customers, confirmed automatically.

## 9. Order Lifecycle & Status Flow

**Pending Payment → Confirmed → Assigned to Packing → Packed → Out for Delivery → Delivered**
*(with Cancelled / Refunded as exit points at any stage before Delivered)*

- Pay on Delivery and Bank/Wire Transfer orders sit at **Pending Payment** until confirmed by staff.
- Paystack/Flutterwave orders move to **Confirmed** immediately, regardless of the customer's currency.
- The customer-facing Order Tracking page shows a simplified version of this without exposing internal staff-assignment detail.

---

## 10. Assumptions Made — Please Confirm

1. **International delivery** is now included, with its own fee table and currency handling separate from the domestic Nigeria setup.
2. **Customer login method** — confirmed as a one-time code sent by SMS or email each time the customer logs in, using their phone number or email as their ID. No password to set or remember.
3. **Returning-customer recognition** — assumed to trigger automatically after a customer's second order, shown as a flag in the Customer Database. The actual incentive (discount, priority handling, etc.) is not being built yet — this phase just lays the foundation of knowing who qualifies.
4. **Same price across colour variants** of a given fabric — confirm if any colour should be priced differently.
5. **Manager vs. Owner split** — Manager retains full day-to-day operational access (profit, stock, products, orders); Owner exclusively controls staff accounts/roles, business-wide settings, and full cross-team activity visibility, as detailed in Section 6.
6. **Deposit amount for Pay on Delivery** — assumed to be a fixed amount or percentage set by the Owner; exact figure to be decided separately.
7. **Low stock threshold** — set per colour variant, not per fabric overall.
8. **Returns/refunds** — not explicitly described in the original brief; assumed out of scope for this build, addable as a later phase.

## 11. What Success Looks Like

A customer — local or international — can find a fabric by type, see exactly what colours and quantities are available, pay the way that suits them in their own currency, and log back in next time as a recognized returning customer without re-entering everything. Meanwhile, the Owner can open the dashboard and see, in one place: what's selling by fabric type and colour, what's profitable, who on the team did what, and what needs attention today — with full control over the business-wide settings that only they should touch.

## 12. Build Phases

**Phase 1 — Foundation: Product Catalogue + Inventory**
Set up fabrics with images, details, fabric type, colour variants, and per-colour stock. Build the Product Manager. This is the data layer everything else depends on.

**Phase 2 — Customer Store: Landing Page + Catalogue + Cart**
Build the full public-facing browsing experience, including fabric-type filtering and colour/quantity selection. No checkout yet.

**Phase 3 — Checkout + Payments + Order Creation**
Build checkout, both delivery fee calculators (domestic and international), all payment options including currency handling, and customer account login. Orders created and confirmed on submission.

**Phase 4 — Ops Dashboard: Orders + Role-Based Access**
Build staff login, role permissions (including the Owner-exclusive settings), order management, and status updates.

**Phase 5 — Full Ops Suite: Inventory, Sales, Reports, Staff Log**
Complete the dashboard with inventory management, the Sales/Profit Tracker (by product and by fabric type), Daily Summaries, the Customer Database with returning-customer flagging, and the full Staff Activity Log.

This order lets the business start selling (Phases 1–3) before the full internal reporting suite (Phase 5) is finished.

## 13. Open Questions Before Build

- Which countries or regions should be prioritized first for international delivery, so the international fee table can be built out realistically rather than for every country at once?
- Is there a fixed deposit amount or percentage in mind for Pay on Delivery orders?
