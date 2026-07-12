# FabricStore — Product Requirements Document (PRD)

**Status:** Draft v1.0  
**Date:** 2026-07-10  
**Author:** Business Requirements Dossier -> PRD Translation  
**Source:** `docs/fabricstore-dossier.md`

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Overview](#2-product-overview)
3. [Objectives & Success Metrics](#3-objectives--success-metrics)
4. [Target Audience & User Personas](#4-target-audience--user-personas)
5. [Functional Requirements](#5-functional-requirements)
   - 5.1 Customer-Facing Store
   - 5.2 Internal Ops Dashboard
   - 5.3 Shared / Cross-Cutting
6. [Non-Functional Requirements](#6-non-functional-requirements)
7. [Data Model & Schema](#7-data-model--schema)
8. [Business Rules & Logic](#8-business-rules--logic)
9. [User Flows](#9-user-flows)
10. [Roles & Permissions Matrix](#10-roles--permissions-matrix)
11. [API Design](#11-api-design)
12. [UI/UX Requirements](#12-uiux-requirements)
13. [Technical Architecture (Recommended)](#13-technical-architecture-recommended)
14. [Security Requirements](#14-security-requirements)
15. [Performance & Scalability Requirements](#15-performance--scalability-requirements)
16. [Build Phases & Roadmap](#16-build-phases--roadmap)
17. [Assumptions & Open Questions](#17-assumptions--open-questions)
18. [Appendix](#18-appendix)

---

## 1. Executive Summary

FabricStore is a two-sided e-commerce and operations platform for a fabric business serving both domestic (Nigeria) and international customers. The platform consists of a **public-facing online store** where customers browse, select, and purchase fabrics by colour variant, and an **internal staff dashboard** where the business team manages orders, inventory (tracked per colour), sales reporting by fabric type, staff activity, and business-wide settings. The system replaces the current fragmented approach of separate websites, spreadsheets, and messaging apps with a single, connected platform.

The project is currently at the **pre-development / requirements stage**. No source code, technology stack, or infrastructure decisions have been made. This PRD translates the business requirements dossier into actionable engineering, design, and product requirements.

---

## 2. Product Overview

| Attribute | Value |
|---|---|
| **Product Name** | FabricStore |
| **Type** | Full-stack web application |
| **Users** | Customers (domestic & international) + Internal staff (Owner, Manager, Sales Reps, Packing Staff) |
| **Platform** | Web (responsive, mobile-first recommended) |
| **Target Market** | Nigeria (primary) + International (secondary: countries/zones TBD) |
| **Business Model** | Direct fabric sales (B2C), revenue from product sales |

### Core Value Proposition

A customer — local or international — finds fabric by type, sees available colours/quantities, pays in their preferred way (including their own currency), and returns as a recognized returning customer. The Owner opens one dashboard to see what's selling by fabric type and colour, what's profitable, who on the team did what, and what needs attention — with full control over business-wide settings.

---

## 3. Objectives & Success Metrics

### Business Objectives

| ID | Objective | Priority |
|---|---|---|
| OBJ-1 | Eliminate fragmented tooling (website + spreadsheet + WhatsApp) by consolidating all operations into one system | P0 |
| OBJ-2 | Enable sales to both domestic and international customers through a single platform | P0 |
| OBJ-3 | Provide per-colour inventory visibility to prevent overselling | P0 |
| OBJ-4 | Give the Owner visibility into profitability by fabric type, not just by product | P1 |
| OBJ-5 | Build a returning-customer recognition foundation for future loyalty incentives | P2 |
| OBJ-6 | Ensure all staff actions are traceable for accountability | P1 |

### Success Metrics (KPIs)

| KPI | Target | Measured By |
|---|---|---|
| Order processing time | < 5 min from payment confirmation to assignment | System timestamps |
| Inventory accuracy | Zero oversold colour variants | Backend-enforced stock checks |
| Customer login success rate | > 95% one-time code delivery & verification | Auth service logs |
| Dashboard load time (any page) | < 2 seconds | Frontend performance monitoring |
| Staff onboarding time | < 15 minutes to set up a new account | Staff account creation flow |
| International order support | At least 5 priority countries/zones in Phase 3 | Delivery fee table entries |

---

## 4. Target Audience & User Personas

### Customer Personas

| Persona | Description | Needs |
|---|---|---|
| **Local Buyer** (Nigeria) | Nigerian individual buying fabric for personal use or resale | Browse by type, pay on delivery or bank transfer, track order |
| **International Buyer** | Diaspora or foreign customer ordering fabric from abroad | See international delivery cost, pay in their currency, track shipment |
| **Returning Customer** | Has ordered before, wants quick re-order or order history | Passwordless login via one-time code, see past orders, feel recognized |

### Staff Personas

| Persona | Role | Key Responsibilities |
|---|---|---|
| **Chioma** | Owner | Full visibility into everything: profit margins, staff activity, business settings, staff accounts |
| **Dele** | Manager | Day-to-day operations: orders, products, stock, sales reports; no access to staff accounts or business-wide settings |
| **Amara** | Sales Rep | Handles customer inquiries, confirms bank transfers, updates order status; no access to cost prices or profit data |
| **Femi** | Packing Staff | Only sees assigned orders, marks items as packed; no access to customer database, pricing, or reports |

---

## 5. Functional Requirements

### 5.1 Customer-Facing Store (Public)

#### FR-001: Landing Page
**Priority:** P1 | **Phase:** 2

- Hero section with branding and value proposition
- About section describing the business
- Featured Fabrics grid (curated selection, configurable)
- Testimonials / reviews section
- Contact information / inquiry form
- Navigation to Product Catalogue

#### FR-002: Product Catalogue
**Priority:** P0 | **Phase:** 1 (data) / 2 (UI)

- Grid/list view of all fabrics with image, name, price, and available colour swatches
- Filter by **fabric type** (Lace, Satin, Beaded Lace, Ankara, Mikado, Silk, Jonkuso, Other)
- Sort by price (low-high, high-low), name, newest
- Search by fabric name
- Pagination or infinite scroll
- Each card links to Product Detail Page

#### FR-003: Product Detail Page
**Priority:** P0 | **Phase:** 1 (data) / 2 (UI)

- Large product image(s) with gallery/zoom
- Product name, description, fabric specs (material, width, care instructions)
- Fabric type badge/category
- **Colour selector** — visual colour swatches; selecting a colour shows:
  - Available stock quantity for that colour
  - Quantity selector limited to available stock
- Price display (assumed same across colours per FRD assumption)
- "Add to Cart" button
- Related products section

#### FR-004: Shopping Cart
**Priority:** P0 | **Phase:** 2

- Add items (fabric + colour variant + quantity)
- View cart summary: line items with image, name, colour, quantity, unit price, subtotal
- Update quantities (respecting stock limits)
- Remove items
- Cart subtotal and estimated total
- Persistent cart (local storage for guest users; server-side for logged-in customers)
- "Proceed to Checkout" button

#### FR-005: Customer Account & Passwordless Login
**Priority:** P0 | **Phase:** 3

- Login ID: phone number or email address
- No password — one-time code sent via SMS or email upon login attempt
- Code entry screen with resend option (with cooldown)
- Session management (JWT or session cookie)
- First-time user flow: same as returning user (enter phone/email, receive code, logged in) — no separate sign-up step
- Account dashboard: view order history, track current orders, manage profile (name, phone, email, default address)
- Returning-customer flag: automatically set after 2nd completed order (visible to staff in Customer Database)

#### FR-006: Checkout
**Priority:** P0 | **Phase:** 3

- Multi-step or single-page checkout
- Steps:
  1. **Contact info** — pre-filled from account if logged in, else collect phone/email
  2. **Delivery address** — full address, country, state/region
  3. **Delivery fee** — auto-calculated based on country (international) or state (Nigeria)
  4. **Payment method selection** — see FR-007
  5. **Order review** — summary of items, delivery fee, total
  6. **Place order**
- Guest checkout allowed (customer account created automatically at order placement)

#### FR-007: Payment Options
**Priority:** P0 | **Phase:** 3

Three payment methods:

1. **Pay on Delivery** (Nigeria only)
   - Requires upfront deposit (amount/percentage configurable by Owner)
   - Order sits at "Pending Payment" until deposit confirmed
   - Balance collected on delivery
   - Not available for international orders

2. **Bank Transfer / International Wire**
   - Local transfer for Nigerian customers
   - International wire for customers abroad
   - Order sits at "Pending Payment" until staff manually confirms
   - Staff can view payment instructions and confirm receipt

3. **Paystack / Flutterwave**
   - Automatic payment confirmation (webhook-based)
   - Supports both local (NGN) and international (card in customer's currency) payments
   - International amounts converted to Naira using live exchange rate
   - Order moves to "Confirmed" immediately on payment success

#### FR-008: Delivery Fee Calculator
**Priority:** P0 | **Phase:** 3

- **Domestic (Nigeria):** state-based table, configured by Owner
  - On country = Nigeria, show state dropdown, calculate fee from domestic table
- **International:** country or shipping-zone based table, configured by Owner
  - On country != Nigeria, look up country/zone in international table, calculate fee
- Fallback: if country/state not found in tables, show "Contact us for delivery quote"

#### FR-009: Order Confirmation
**Priority:** P0 | **Phase:** 3

- Order confirmation page with:
  - Order ID (displayed prominently)
  - Order summary (items, quantities, prices)
  - Delivery address
  - Payment method and status
  - Estimated delivery timeline
- Confirmation email sent to customer with same information

#### FR-010: Order Tracking
**Priority:** P1 | **Phase:** 3

- Track by entering Order ID (no login required)
- Auto-display all orders when logged into customer account
- Simplified status display: Pending → Confirmed → Packing → Out for Delivery → Delivered
  - (Maps from internal statuses but hides staff assignment details)
- Estimated delivery date if available

### 5.2 Internal Ops Dashboard (Staff Only)

#### FR-011: Role-Based Login
**Priority:** P0 | **Phase:** 4

- Staff login with name/email + password
- Role-based authorization: Owner, Manager, Sales Rep, Packing Staff
- Session management with token expiry
- Login activity logged and visible to Owner
- Password change on first login (optional)

#### FR-012: Order Management Dashboard
**Priority:** P0 | **Phase:** 4

- List view of all orders (filtered by role permissions)
- Columns: Order ID, Customer, Date, Total, Status, Assigned To, Payment Method, Payment Status
- Filters: status, date range, payment method, assigned staff
- Sort: by date, status, total
- Bulk actions (where permitted by role)

#### FR-013: Order Detail & Status Updates
**Priority:** P0 | **Phase:** 4

- Order detail view: items, customer info, delivery address, payment info, status history with timestamps
- Status update actions (permitted based on role):
  - Confirm payment (for bank transfer / Pay on Delivery deposit)
  - Assign to team member (Owner, Manager)
  - Mark as Packed (Packing Staff — assigned orders only)
  - Mark as Out for Delivery
  - Mark as Delivered
  - Cancel / Refund (with reason required)
- Status change triggers:
  - Log entry in Staff Activity Log
  - Notification to relevant parties (future)
  - Email update to customer (future)

#### FR-014: Product Manager (CRUD)
**Priority:** P0 | **Phase:** 1

- List all fabrics with search and filter
- Add new fabric:
  - Name, description, fabric type (from preloaded list + custom), images (upload), price
  - Add colour variants (colour name, initial stock, low-stock threshold)
- Edit fabric: update all fields, add/remove colour variants, adjust stock
- Delete fabric (soft delete recommended to preserve order history)
- Bulk image upload support

#### FR-015: Inventory Management
**Priority:** P0 | **Phase:** 1 (basic) / 5 (full)

- View stock levels per colour variant for each fabric
- Stock adjustments (add/remove) with reason logged
- Restock log: date, staff, colour variant, quantity added, notes
- Low-stock indicators (visual badge when stock <= threshold)
- Filter: fabrics with low-stock variants, by fabric type

#### FR-016: Sales Tracker
**Priority:** P1 | **Phase:** 5

- Dashboard with revenue and profit metrics:
  - Daily, Weekly, Monthly views
  - Period-over-period comparison
- Breakdowns:
  - By **fabric type** (e.g., Lace vs. Ankara vs. Silk)
  - By **product**
- Charts/graphs: bar, line (trend over time)
- Profit calculation: revenue minus cost price (cost price visible to Owner and Manager only)
- Export to CSV/Excel

#### FR-017: Customer Database
**Priority:** P1 | **Phase:** 5

- Searchable list of all customers
- Customer detail: contact info, first-time/returning flag, order history, total spend
- Filter: first-time vs. returning, date range of first/last order
- Export to CSV

#### FR-018: Staff Activity Log
**Priority:** P1 | **Phase:** 5

- Chronological log of all staff actions:
  - Order status changes (who, what status, when)
  - Product edits (who, what field changed)
  - Stock adjustments (who, what variant, quantity)
  - Login/logout events
  - Payment confirmations
- Filters: by staff member, action type, date range
- **Owner** sees all teams' activity; **Manager** sees their own team only; Sales Rep and Packing Staff see own activity only

#### FR-019: Restock Alerts
**Priority:** P1 | **Phase:** 5

- Dashboard widget showing all colour variants where stock <= low-stock threshold
- Grouped by fabric type
- Quick-action button to navigate to restock screen

#### FR-020: Daily Summary
**Priority:** P2 | **Phase:** 5

- Summary view: revenue, order count (new, delivered, cancelled), stock changes
- Date picker for historical daily summaries
- Export report (PDF or CSV)
- Email daily summary to Owner (optional, future)

#### FR-021: Business Settings (Owner Only)
**Priority:** P1 | **Phase:** 4

- **Domestic Delivery Fee Table:** add/edit/delete state entries (state name, fee)
- **International Delivery Fee Table:** add/edit/delete entries (country/zone, fee)
- **Exchange Rate Settings:** manual override or API source for live Naira conversion
- **Deposit Amount:** fixed amount or percentage for Pay on Delivery
- **International Shipping Zones:** define zone groupings for simplified rate setting

#### FR-022: Staff Account Management (Owner Only)
**Priority:** P1 | **Phase:** 4

- List all staff accounts with roles and status (active/inactive)
- Add new staff: name, email, role, temporary password
- Edit staff: change role, reset password, activate/deactivate
- Delete staff (soft delete, deactivate)
- Login history per staff member

### 5.3 Shared / Cross-Cutting

#### FR-023: Fabric Types (Preloaded + Custom)
**Priority:** P0 | **Phase:** 1

- Preloaded types: Lace, Satin, Beaded Lace, Ankara, Mikado, Silk, Jonkuso, Other
- Renameable
- Owner/Manager can add new types
- Used for product categorization, filtering, and sales rollup reporting

#### FR-024: Notification System
**Priority:** P2 | **Phase:** Future

- Customer order confirmation email (Phase 3)
- Customer order status change email (Phase 3)
- Staff notification on new order (Phase 4+)
- Low-stock notification (Phase 5+)
- Daily summary email (Phase 5+)

---

## 6. Non-Functional Requirements

| ID | Requirement | Target | Priority |
|---|---|---|---|
| NFR-01 | **Responsive Design** | All pages functional and readable on mobile (320px+), tablet, and desktop | P0 |
| NFR-02 | **Page Load Time** | < 2s for initial page load, < 500ms for subsequent navigations | P1 |
| NFR-03 | **API Response Time** | < 500ms for 95% of API requests (excluding image uploads) | P1 |
| NFR-04 | **Concurrent Users** | Support 100+ concurrent customers; 20+ concurrent staff | P1 |
| NFR-05 | **Uptime** | 99.5% uptime during business hours (8am–8pm WAT) | P1 |
| NFR-06 | **Accessibility** | WCAG 2.1 Level AA compliance for public store | P2 |
| NFR-07 | **SEO** | Public store pages crawlable by search engines (server-side rendering or meta tags) | P2 |
| NFR-08 | **Data Backup** | Automated daily database backup, retained for 30 days | P0 |
| NFR-09 | **Internationalization** | Currency and delivery calculations support NGN + foreign currencies | P0 |
| NFR-10 | **Audit Trail** | Every staff action logged with timestamp, user ID, and action detail; immutable | P0 |
| NFR-11 | **Graceful Degradation** | If SMS provider fails, fall back to email for one-time codes (and vice versa) | P1 |
| NFR-12 | **Offline Mode** | Not required (online-only application) | — |

---

## 7. Data Model & Schema

### 7.1 Entity Relationship Overview

```
FabricType (1) ---< (N) Fabric
Fabric (1) ---< (N) ColourVariant
ColourVariant (1) ---< (N) OrderItem
Order (1) ---< (N) OrderItem
Customer (1) ---< (N) Order
StaffUser (1) ---< (N) Order (assigned)
StaffUser (1) ---< (N) ActivityLog
StaffUser (1) ---< (N) StockAdjustment
```

### 7.2 Entity Definitions

#### FabricType
| Field | Type | Constraints | Notes |
|---|---|---|---|
| id | UUID / SERIAL | PK | |
| name | VARCHAR(100) | UNIQUE, NOT NULL | e.g., "Lace", "Ankara" |
| slug | VARCHAR(100) | UNIQUE, NOT NULL | URL-friendly |
| description | TEXT | NULLABLE | |
| is_preloaded | BOOLEAN | DEFAULT false | True for the 8 seed types |
| created_at | TIMESTAMP | NOT NULL | |
| updated_at | TIMESTAMP | NOT NULL | |

#### Fabric
| Field | Type | Constraints | Notes |
|---|---|---|---|
| id | UUID / SERIAL | PK | |
| fabric_type_id | UUID / INT | FK -> FabricType.id, NOT NULL | |
| name | VARCHAR(200) | NOT NULL | |
| slug | VARCHAR(200) | UNIQUE, NOT NULL | |
| description | TEXT | NULLABLE | |
| specs | JSONB | NULLABLE | Fabric specs (width, material, care instructions) |
| price | DECIMAL(10,2) | NOT NULL, CHECK > 0 | Price per yard/metre |
| images | TEXT[] / JSONB | NOT NULL | Array of image URLs |
| is_active | BOOLEAN | DEFAULT true | Soft delete / hide |
| created_at | TIMESTAMP | NOT NULL | |
| updated_at | TIMESTAMP | NOT NULL | |

#### ColourVariant
| Field | Type | Constraints | Notes |
|---|---|---|---|
| id | UUID / SERIAL | PK | |
| fabric_id | UUID / INT | FK -> Fabric.id, NOT NULL, ON DELETE CASCADE | |
| colour_name | VARCHAR(100) | NOT NULL | e.g., "Royal Blue", "Ivory" |
| colour_hex | VARCHAR(7) | NULLABLE | Hex code for swatch (#RRGGBB) |
| stock_quantity | INT | NOT NULL, CHECK >= 0, DEFAULT 0 | |
| low_stock_threshold | INT | NOT NULL, CHECK >= 0, DEFAULT 5 | |
| is_active | BOOLEAN | DEFAULT true | |
| created_at | TIMESTAMP | NOT NULL | |

**Constraint:** UNIQUE(fabric_id, colour_name)

#### Customer
| Field | Type | Constraints | Notes |
|---|---|---|---|
| id | UUID / SERIAL | PK | |
| phone | VARCHAR(20) | UNIQUE, NULLABLE | At least one of phone/email required |
| email | VARCHAR(255) | UNIQUE, NULLABLE | |
| name | VARCHAR(200) | NULLABLE | |
| is_returning | BOOLEAN | DEFAULT false | Auto-set after 2nd completed order |
| first_order_at | TIMESTAMP | NULLABLE | |
| last_order_at | TIMESTAMP | NULLABLE | |
| total_orders | INT | DEFAULT 0 | |
| total_spent | DECIMAL(12,2) | DEFAULT 0 | |
| created_at | TIMESTAMP | NOT NULL | |

#### Order
| Field | Type | Constraints | Notes |
|---|---|---|---|
| id | UUID / SERIAL | PK | |
| order_id_display | VARCHAR(20) | UNIQUE, NOT NULL | Human-readable order ID (e.g., "FS-1001") |
| customer_id | UUID / INT | FK -> Customer.id, NOT NULL | |
| status | ENUM | NOT NULL | See status enum below |
| payment_method | ENUM | NOT NULL | pay_on_delivery, bank_transfer, paystack, flutterwave |
| payment_status | ENUM | NOT NULL | pending, confirmed, refunded |
| payment_currency | VARCHAR(3) | NOT NULL, DEFAULT 'NGN' | Customer's payment currency |
| payment_amount_ngn | DECIMAL(12,2) | NOT NULL | Amount in Naira for reporting |
| delivery_fee | DECIMAL(10,2) | NOT NULL | |
| total_amount | DECIMAL(12,2) | NOT NULL | Subtotal + delivery fee |
| delivery_address_line1 | TEXT | NOT NULL | |
| delivery_address_line2 | TEXT | NULLABLE | |
| delivery_city | VARCHAR(100) | NOT NULL | |
| delivery_state | VARCHAR(100) | NULLABLE | |
| delivery_country | VARCHAR(100) | NOT NULL | |
| delivery_notes | TEXT | NULLABLE | |
| assigned_to | UUID / INT | FK -> StaffUser.id, NULLABLE | |
| staff_notes | TEXT | NULLABLE | Internal notes |
| is_domestic | BOOLEAN | NOT NULL | True for Nigeria |
| created_at | TIMESTAMP | NOT NULL | |
| updated_at | TIMESTAMP | NOT NULL | |

**Order Status Enum:** `pending_payment`, `confirmed`, `assigned_to_packing`, `packed`, `out_for_delivery`, `delivered`, `cancelled`, `refunded`

#### OrderItem
| Field | Type | Constraints | Notes |
|---|---|---|---|
| id | UUID / SERIAL | PK | |
| order_id | UUID / INT | FK -> Order.id, NOT NULL, ON DELETE CASCADE | |
| colour_variant_id | UUID / INT | FK -> ColourVariant.id, NOT NULL | |
| quantity | INT | NOT NULL, CHECK > 0 | |
| unit_price | DECIMAL(10,2) | NOT NULL | Price at time of order (snapshot) |
| subtotal | DECIMAL(12,2) | NOT NULL | quantity * unit_price |

#### StaffUser
| Field | Type | Constraints | Notes |
|---|---|---|---|
| id | UUID / SERIAL | PK | |
| name | VARCHAR(200) | NOT NULL | |
| email | VARCHAR(255) | UNIQUE, NOT NULL | Login identifier |
| password_hash | VARCHAR(255) | NOT NULL | bcrypt or similar |
| role | ENUM | NOT NULL | owner, manager, sales_rep, packing_staff |
| is_active | BOOLEAN | DEFAULT true | Soft delete / deactivate |
| last_login_at | TIMESTAMP | NULLABLE | |
| created_at | TIMESTAMP | NOT NULL | |
| updated_at | TIMESTAMP | NOT NULL | |

#### ActivityLog
| Field | Type | Constraints | Notes |
|---|---|---|---|
| id | UUID / SERIAL | PK | |
| staff_user_id | UUID / INT | FK -> StaffUser.id, NOT NULL | |
| action_type | VARCHAR(50) | NOT NULL | e.g., "order_status_update", "product_edit", "stock_adjustment", "login" |
| entity_type | VARCHAR(50) | NOT NULL | e.g., "order", "product", "colour_variant" |
| entity_id | VARCHAR(50) | NOT NULL | ID of the affected entity |
| description | TEXT | NOT NULL | Human-readable action description |
| metadata | JSONB | NULLABLE | Additional structured data (before/after values) |
| created_at | TIMESTAMP | NOT NULL | |

#### StockAdjustment
| Field | Type | Constraints | Notes |
|---|---|---|---|
| id | UUID / SERIAL | PK | |
| colour_variant_id | UUID / INT | FK -> ColourVariant.id, NOT NULL | |
| staff_user_id | UUID / INT | FK -> StaffUser.id, NOT NULL | |
| quantity_change | INT | NOT NULL | Positive for restock, negative for removal |
| reason | TEXT | NOT NULL | |
| reference_type | VARCHAR(50) | NULLABLE | e.g., "order", "restock", "adjustment" |
| reference_id | VARCHAR(50) | NULLABLE | |
| created_at | TIMESTAMP | NOT NULL | |

#### DomesticDeliveryFee
| Field | Type | Constraints | Notes |
|---|---|---|---|
| id | UUID / SERIAL | PK | |
| state | VARCHAR(100) | UNIQUE, NOT NULL | |
| fee | DECIMAL(10,2) | NOT NULL, CHECK >= 0 | |

#### InternationalDeliveryFee
| Field | Type | Constraints | Notes |
|---|---|---|---|
| id | UUID / SERIAL | PK | |
| country | VARCHAR(100) | UNIQUE, NOT NULL | |
| zone | VARCHAR(100) | NULLABLE | Shipping zone grouping |
| fee | DECIMAL(10,2) | NOT NULL, CHECK >= 0 | |

#### BusinessSetting
| Field | Type | Constraints | Notes |
|---|---|---|---|
| id | UUID / SERIAL | PK | |
| key | VARCHAR(100) | UNIQUE, NOT NULL | e.g., "pod_deposit_type", "pod_deposit_value", "exchange_rate", "exchange_rate_source" |
| value | JSONB | NOT NULL | Flexible value storage |
| updated_by | UUID / INT | FK -> StaffUser.id | |
| updated_at | TIMESTAMP | NOT NULL | |

---

## 8. Business Rules & Logic

### 8.1 Inventory Rules

| Rule ID | Description | Enforcement |
|---|---|---|
| INV-01 | Stock is tracked per colour variant, not per fabric | Database model |
| INV-02 | Quantity selector at checkout cannot exceed available stock for the selected colour variant | Backend validation at order creation |
| INV-03 | On order placement (confirmed payment), stock is decremented for each colour variant ordered | Atomic DB transaction |
| INV-04 | On order cancellation/refund, stock is restored for each colour variant | Service layer |
| INV-05 | Low-stock alert triggers when stock_quantity <= low_stock_threshold per colour variant | Dashboard query filter |
| INV-06 | Stock can go to 0 but not below 0 | CHECK constraint |

### 8.2 Pricing Rules

| Rule ID | Description |
|---|---|
| PRI-01 | Price is set at the fabric level (same across all colour variants) — **assumption, pending confirmation** |
| PRI-02 | Price snapshot is captured in OrderItem at time of order (future price changes don't affect existing orders) |
| PRI-03 | Cost price is stored separately from selling price and is only visible to Owner and Manager roles |

### 8.3 Payment Rules

| Rule ID | Description |
|---|---|
| PAY-01 | Pay on Delivery only available for domestic (Nigeria) orders |
| PAY-02 | Pay on Delivery requires upfront deposit (fixed amount or percentage, configured by Owner) |
| PAY-03 | Bank Transfer / Wire orders sit at "Pending Payment" until staff manually confirms |
| PAY-04 | Paystack/Flutterwave orders advance to "Confirmed" immediately upon successful webhook |
| PAY-05 | International card payments via Paystack/Flutterwave: capture foreign currency, convert to Naira using live exchange rate for reporting |
| PAY-06 | Payment method is recorded on the order and cannot be changed after creation |

### 8.4 Customer Rules

| Rule ID | Description |
|---|---|
| CUS-01 | Customer identity is phone number OR email (at least one required) |
| CUS-02 | Login is passwordless: one-time code sent to phone or email |
| CUS-03 | One-time code expires after 10 minutes (configurable) |
| CUS-04 | Customer account is auto-created on first login attempt (no separate sign-up) |
| CUS-05 | Returning-customer flag is set to true when customer completes their 2nd order |
| CUS-06 | Guest checkout creates a customer record if phone/email doesn't exist |

### 8.5 Order Rules

| Rule ID | Description |
|---|---|
| ORD-01 | Order lifecycle: Pending Payment → Confirmed → Assigned to Packing → Packed → Out for Delivery → Delivered |
| ORD-02 | Exit states: Cancelled (anytime before Delivered), Refunded (after payment confirmed) |
| ORD-03 | Status transitions are validated server-side (e.g., cannot skip from Confirmed to Delivered) |
| ORD-04 | Payment method determines initial status: Pay on Delivery / Bank Transfer → Pending Payment; Paystack/Flutterwave → Confirmed |
| ORD-05 | Each status change is logged in ActivityLog with staff user, timestamp, and reason |
| ORD-06 | Customer-facing tracking shows simplified status map (not internal assignment detail) |

### 8.6 Delivery Rules

| Rule ID | Description |
|---|---|
| DLV-01 | Domestic delivery fee uses state-based table |
| DLV-02 | International delivery fee uses country/zone-based table, separate from domestic |
| DLV-03 | Delivery fee is calculated at checkout and stored on the order (not recalculated) |
| DLV-04 | If country/state not in fee table, show "Contact us for delivery quote" and allow manual override by staff |

### 8.7 Staff & Role Rules

| Rule ID | Description |
|---|---|
| STF-01 | Every staff action that mutates data is logged with staff_user_id, timestamp, action_type, and entity reference |
| STF-02 | Staff accounts can be deactivated (not hard-deleted) to preserve audit trail integrity |
| STF-03 | Login attempts (successful and failed) are logged and visible to Owner |
| STF-04 | Owner-only actions (staff management, business settings) are enforced server-side regardless of UI hiding |

---

## 9. User Flows

### 9.1 Customer Purchase Flow (Full)

```
Landing Page → Browse Catalogue → Filter by Type → 
Product Detail (select colour, qty) → Add to Cart → 
View Cart → Proceed to Checkout →
[Login / Enter Phone or Email → Verify One-Time Code] →
Enter Delivery Address → Auto-calculate Delivery Fee →
Select Payment Method → Review Order →
Place Order → Order Confirmation Page → Email Confirmation
```

### 9.2 Staff Order Processing Flow

```
Login to Dashboard → View Orders (filtered by role) →
Open Order Detail → [Confirm Payment (if bank transfer)] →
Assign to Packing Staff (Owner/Manager) →
Packing Staff logs in → Views Assigned Orders →
Marks as Packed →
Owner/Manager marks Out for Delivery →
Mark as Delivered →
(Exit: Cancel or Refund at any stage before Delivered)
```

### 9.3 Owner Business Settings Flow

```
Login → Navigate to Settings →
Select area (Delivery Fees / Exchange Rate / Deposit / Shipping Zones) →
View current values → Edit → Save → Logged in Activity Log
```

### 9.4 Customer Account Flow

```
Enter Phone/Email → Receive One-Time Code → 
Enter Code → Logged In →
View Order History → Track Active Orders →
Update Profile / Default Address
```

---

## 10. Roles & Permissions Matrix

| Area | Owner | Manager | Sales Rep | Packing Staff |
|---|---|---|---|---|
| View all orders | ✅ | ✅ | ✅ | 🔸 Assigned only |
| Update order status | ✅ | ✅ | ✅ | 🔸 Packing statuses only |
| Assign orders to staff | ✅ | ✅ | 🚫 | 🚫 |
| View customer database | ✅ | ✅ | ✅ | 🚫 |
| View cost prices & profit | ✅ | ✅ | 🚫 | 🚫 |
| View Sales Tracker | ✅ | ✅ | 🚫 | 🚫 |
| Add/edit/delete fabrics | ✅ | ✅ | 🚫 | 🚫 |
| Manage stock & restocks | ✅ | ✅ | 🚫 | 🚫 (pack assigned only) |
| View Staff Activity Log (own team) | ✅ | ✅ | 🚫 | 🚫 |
| View Staff Activity Log (all teams) | ✅ Owner only | 🚫 | 🚫 | 🚫 |
| Add/remove staff accounts | ✅ Owner only | 🚫 | 🚫 | 🚫 |
| Change business settings | ✅ Owner only | 🚫 | 🚫 | 🚫 |
| Confirm bank/wire payments | ✅ | ✅ | ✅ | 🚫 |
| Export Daily Summary | ✅ | ✅ | 🚫 | 🚫 |
| Manage fabric types | ✅ | ✅ | 🚫 | 🚫 |
| Create/edit products | ✅ | ✅ | 🚫 | 🚫 |

---

## 11. API Design

### 11.1 API Conventions

- Base URL: `/api/v1`
- Authentication: JWT (Bearer token) for staff; one-time-code session token for customers
- Response format: JSON with envelope `{ success: boolean, data: {}, error?: string, meta?: {} }`
- Pagination: `?page=1&limit=20` with `meta: { total, page, limit, pages }`
- Error codes: Standard HTTP status codes with descriptive error messages

### 11.2 Endpoint Groups

#### Products & Catalogue
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/v1/products` | List fabrics (filter by type, search, sort, paginate) | Public |
| GET | `/api/v1/products/:id` | Product detail with colour variants & stock | Public |
| GET | `/api/v1/fabric-types` | List all fabric types | Public |
| POST | `/api/v1/products` | Create fabric | Owner/Manager |
| PUT | `/api/v1/products/:id` | Update fabric | Owner/Manager |
| DELETE | `/api/v1/products/:id` | Soft-delete fabric | Owner/Manager |
| POST | `/api/v1/products/:id/images` | Upload images | Owner/Manager |
| PUT | `/api/v1/products/:id/variants/:variantId/stock` | Update stock | Owner/Manager |
| GET | `/api/v1/products/low-stock` | List low-stock variants | Owner/Manager |

#### Customer Auth
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/v1/auth/customer/request-code` | Request one-time code | Public |
| POST | `/api/v1/auth/customer/verify-code` | Verify code & get session | Public |
| GET | `/api/v1/auth/customer/me` | Get current customer profile | Customer |

#### Cart & Checkout
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/v1/cart` | Get current cart | Customer/Optional |
| POST | `/api/v1/cart/items` | Add item to cart | Customer/Optional |
| PUT | `/api/v1/cart/items/:itemId` | Update cart item qty | Customer/Optional |
| DELETE | `/api/v1/cart/items/:itemId` | Remove cart item | Customer/Optional |
| POST | `/api/v1/checkout/calculate` | Calculate delivery + total | Customer/Optional |
| POST | `/api/v1/orders` | Place order | Customer/Optional |

#### Orders
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/v1/orders` | List orders (filtered by role) | Staff |
| GET | `/api/v1/orders/:id` | Order detail | Staff/Customer |
| PATCH | `/api/v1/orders/:id/status` | Update order status | Staff (role-gated) |
| PATCH | `/api/v1/orders/:id/assign` | Assign to staff | Owner/Manager |
| GET | `/api/v1/orders/track/:orderId` | Customer order tracking | Public |

#### Customers
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/v1/customers` | List customers | Staff (role-gated) |
| GET | `/api/v1/customers/:id` | Customer detail | Staff (role-gated) |
| GET | `/api/v1/customers/:id/orders` | Customer order history | Staff (role-gated) |

#### Delivery
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/v1/delivery/domestic` | Get domestic fee table | Public |
| GET | `/api/v1/delivery/international` | Get international fee table | Public |
| PUT | `/api/v1/delivery/domestic` | Update domestic fee table | Owner |
| PUT | `/api/v1/delivery/international` | Update international fee table | Owner |

#### Payments
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/v1/payments/paystack/initialize` | Initialize Paystack payment | Customer |
| POST | `/api/v1/payments/paystack/webhook` | Paystack webhook handler | Public (signed) |
| POST | `/api/v1/payments/flutterwave/initialize` | Initialize Flutterwave payment | Customer |
| POST | `/api/v1/payments/flutterwave/webhook` | Flutterwave webhook handler | Public (signed) |
| POST | `/api/v1/payments/bank-transfer/confirm` | Confirm bank transfer | Staff (role-gated) |

#### Staff Auth & Management
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/v1/auth/staff/login` | Staff login | Public |
| GET | `/api/v1/staff` | List staff | Owner |
| POST | `/api/v1/staff` | Create staff account | Owner |
| PUT | `/api/v1/staff/:id` | Update staff | Owner |
| DELETE | `/api/v1/staff/:id` | Deactivate staff | Owner |
| GET | `/api/v1/staff/activity` | Activity log (filtered by role) | Staff (role-gated) |

#### Sales & Reports
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/v1/sales` | Sales data (daily/weekly/monthly) | Owner/Manager |
| GET | `/api/v1/sales/by-type` | Sales breakdown by fabric type | Owner/Manager |
| GET | `/api/v1/sales/by-product` | Sales breakdown by product | Owner/Manager |
| GET | `/api/v1/summary/daily` | Daily summary | Owner/Manager |

#### Settings
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/v1/settings` | Get business settings | Owner |
| PUT | `/api/v1/settings` | Update business settings | Owner |

---

## 12. UI/UX Requirements

### 12.1 Design Principles

- **Mobile-first**: The public store will be primarily accessed on mobile devices; the dashboard will be used on desktop primarily but must be tablet-friendly
- **Visual clarity**: Fabric images and colour swatches are the primary decision drivers — large, high-quality, zoomable
- **Minimal friction**: Passwordless login, guest checkout, quantity limited to available stock to prevent errors
- **Role-aware UI**: Dashboard only shows actions the logged-in user is permitted to take; hidden buttons are backended, not just hidden

### 12.2 Public Store Pages

| Page | Key UI Components |
|---|---|
| Landing Page | Hero banner, featured products carousel, about section, testimonials, contact form, footer with links |
| Catalogue | Filter sidebar/drawer (fabric type checkboxes), sort dropdown, product card grid, search bar, pagination |
| Product Detail | Image gallery with lightbox, colour swatch row (click to select), quantity stepper (bounded by stock), add-to-cart button, specs accordion, related products |
| Cart | Line items with image thumbnails, colour indicator, quantity stepper, remove button, subtotal, checkout CTA |
| Checkout | Step indicator, form sections (contact, address, delivery, payment), fee calculation inline, order summary sidebar |
| Order Confirmation | Success state, order ID (large, copyable), summary card, email sent notice, "Track Order" button |
| Order Tracking | Order ID input (or auto from account), progress stepper showing simplified status, timeline view |

### 12.3 Dashboard Pages

| Page | Key UI Components |
|---|---|
| Login | Simple form: name/email + password, role-aware redirect |
| Order Dashboard | Data table with filters and sorting, status badges with colour coding, quick-actions dropdown per row |
| Order Detail | Status history timeline, customer info card, items list, payment info card, action buttons (role-gated), staff assignment dropdown |
| Product Manager | Table/card view, search, add button opens modal/form, colour variant sub-table on expand |
| Inventory View | Per-product stock table, colour variant rows, stock level bars, low-stock badges, restock button |
| Sales Tracker | Date range selector, KPI cards (revenue, profit, orders), bar chart by fabric type, line chart over time, export button |
| Customer Database | Searchable table, customer detail slide-out panel, order history mini-table, returning customer badge |
| Activity Log | Filtered timeline view, expandable entries with before/after details, export |
| Settings | Tabbed interface: Delivery (domestic + international), Exchange Rates, Deposit, Shipping Zones — inline editing |
| Staff Management | Staff list table, add/edit modal, role selector, status toggle, login history panel |

### 12.4 Navigation Structure

**Public Store:**
```
Home | Catalogue | Track Order | Contact | Login (icon)
```

**Dashboard (sidebar navigation):**
```
Dashboard Home | Orders | Products | Inventory | Sales | Customers | Activity Log | Settings | Staff Management | Daily Summary
```

---

## 13. Technical Architecture (Recommended)

### 13.1 Technology Stack Recommendations

| Layer | Recommended Options | Notes |
|---|---|---|
| **Backend** | Node.js (Express/Fastify) or Python (Django/DRF) or PHP (Laravel) | Choose based on team expertise |
| **Frontend (Store)** | Next.js (SSR for SEO) or Nuxt.js or Remix | SSR critical for public store SEO |
| **Frontend (Dashboard)** | React / Vue / Svelte (SPA, role-based routing) | Could be same Next.js app with separate route group |
| **Database** | PostgreSQL (recommended) | Strong relational support, JSONB for flexible fields, great with Node/ Python |
| **ORM / Query Builder** | Prisma, Drizzle, SQLAlchemy, Eloquent | Type-safe, migration support |
| **Auth** | JWT-based for both customer (one-time code) and staff (password) | Short-lived tokens, refresh token rotation |
| **SMS Provider** | Twilio, Termii, or Africa's Talking | Nigerian SMS provider preferred for reliability |
| **Email** | SendGrid, Mailgun, or AWS SES | For one-time codes (fallback) and order confirmations |
| **Payments** | Paystack API + Flutterwave API | Both have excellent Node.js SDKs |
| **File Storage** | Cloudinary (optimized for images) or AWS S3 + CloudFront | Fabric images need optimization + CDN |
| **Hosting** | Vercel / Netlify (frontend), Railway / Render / DigitalOcean (backend + DB) | Or all-in-one: Railway / Heroku |
| **CI/CD** | GitHub Actions | |

### 13.2 High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Client Layer                          │
│  ┌──────────────────────┐  ┌──────────────────────────┐ │
│  │  Public Store (SSR)  │  │  Dashboard (SPA)          │ │
│  │  nextjs.vercel.app   │  │  dashboard.fabricstore.com│ │
│  └──────────┬───────────┘  └───────────┬──────────────┘ │
└─────────────┼──────────────────────────┼────────────────┘
              │                          │
              └──────────┬───────────────┘
                         │ HTTPS
              ┌──────────▼───────────────┐
              │   API Gateway / Load      │
              │   Balancer (NGINX / Caddy)│
              └──────────┬───────────────┘
                         │
              ┌──────────▼───────────────┐
              │    Backend API Server     │
              │   (Node.js / Express)     │
              │   - Auth Service          │
              │   - Product Service       │
              │   - Order Service         │
              │   - Payment Service       │
              │   - Reporting Service     │
              └──────────┬───────────────┘
                         │
              ┌──────────▼───────────────┐
              │      PostgreSQL DB        │
              └──────────────────────────┘

External Services:
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│  Twilio  │ │ SendGrid │ │Paystack  │ │Cloudinary│
│  (SMS)   │ │ (Email)  │ │Flutterwave││ (Images) │
└──────────┘ └──────────┘ └──────────┘ └──────────┘
```

### 13.3 Key Architectural Decisions

| Decision | Recommendation | Rationale |
|---|---|---|
| Monolith vs. Microservices | **Monolith first** (modular monolith) | Team size, speed of development; split later if needed |
| SSR vs. CSR for Store | **SSR (Next.js/Nuxt)** | SEO is critical for customer acquisition |
| SPA vs. MPA for Dashboard | **SPA** (CSR with lazy loading) | Internal tool, auth-gated, no SEO needed |
| Database | **PostgreSQL** | Relational integrity for orders/stock, JSONB for flexible settings, robust in production |
| Image Management | **Cloudinary** | Automatic optimization, CDN delivery, transformations for thumbnails |
| Caching | **Redis** (optional, Phase 3+) | For product catalogue, session store, rate limiting |
| Deployment | **Containerized** (Docker) | Consistent dev/prod environments, easy scaling |

---

## 14. Security Requirements

| ID | Requirement | Priority |
|---|---|---|
| SEC-01 | All traffic served over HTTPS (TLS 1.2+) | P0 |
| SEC-02 | Staff passwords hashed with bcrypt (cost factor >= 10) | P0 |
| SEC-03 | Customer one-time codes: single-use, expiring (10 min TTL), rate-limited (max 3 requests per 5 min per phone/email) | P0 |
| SEC-04 | JWT secrets stored in environment variables, not in code | P0 |
| SEC-05 | API input validation and sanitization on all endpoints (server-side, not just client-side) | P0 |
| SEC-06 | SQL injection prevention via parameterized queries / ORM | P0 |
| SEC-07 | Paystack/Flutterwave webhooks verified via signature validation | P0 |
| SEC-08 | Role-based access control enforced server-side (middleware on every protected route) | P0 |
| SEC-09 | Rate limiting on auth endpoints (login, code requests) | P1 |
| SEC-10 | CORS configured to allow only trusted origins | P1 |
| SEC-11 | File upload validation: allowed types (jpg, png, webp), max size (5MB per image), virus scanning optional | P1 |
| SEC-12 | Environment-specific configs (dev/staging/prod) with secrets management | P1 |
| SEC-13 | Audit log is insert-only (no deletion or modification) | P0 |
| SEC-14 | Session timeout for dashboard (30 min inactivity) | P1 |
| SEC-15 | Regular security dependency scanning (npm audit, Snyk, or Dependabot) | P2 |

---

## 15. Performance & Scalability Requirements

| ID | Requirement | Target | Priority |
|---|---|---|---|
| PERF-01 | Product catalogue page load < 2s (including images) | 95th percentile | P1 |
| PERF-02 | API p95 response time < 500ms (excluding image uploads) | 95th percentile | P1 |
| PERF-03 | Product images served via CDN with responsive sizes | WebP format, srcset | P1 |
| PERF-04 | Database queries for product listing indexed (fabric_type_id, is_active, name) | EXPLAIN ANALYZE < 50ms | P1 |
| PERF-05 | Dashboard queries (sales reports, activity log) cached or materialized for frequent date ranges | Cache TTL: 5 min | P2 |
| PERF-06 | Concurrent user support: 100 store visitors + 20 staff | Load test validated | P1 |
| PERF-07 | Database connection pooling configured | Max 20 connections per instance | P1 |
| PERF-08 | Static assets (JS, CSS) bundled, minified, and CDN-cached with long cache headers | Cache-Control: 1 year for hashed assets | P1 |

---

## 16. Build Phases & Roadmap

### Phase 1 — Foundation: Product Catalogue + Inventory (Est.: 3-4 weeks)

**Goal:** Build the data layer and product management tools so everything else depends on a solid foundation.

| Deliverable | FR Ref | Dependencies |
|---|---|---|
| Database schema implementation + migrations | All | None |
| Fabric Types seed data (8 preloaded types) | FR-023 | Schema |
| Product CRUD API + Product Manager dashboard | FR-014 | Schema, Fabric Types |
| Colour variants CRUD (inline within product) | FR-014 | Product CRUD |
| Stock tracking (per colour variant) | FR-015 | Colour variants |
| Image upload service (Cloudinary/S3 integration) | FR-014 | File storage setup |
| Admin user (Owner) seed account | FR-011 | Schema |

**Acceptance Criteria:**
- Owner/Manager can log in, add a fabric with images and 3+ colour variants with stock
- Stock levels are persisted and queryable
- Product data is ready for storefront consumption

---

### Phase 2 — Customer Store: Browse + Cart (Est.: 3-4 weeks)

**Goal:** Build the public-facing browsing experience.

| Deliverable | FR Ref | Dependencies |
|---|---|---|
| Landing page with hero, about, featured, testimonials | FR-001 | |
| Product catalogue page with type filtering | FR-002 | Phase 1 API |
| Product detail page with colour selector + stock-aware quantity | FR-003 | Phase 1 API |
| Shopping cart (local storage + API-backed for logged-in) | FR-004 | |
| Responsive navigation and footer | FR-001 | |
| SEO meta tags, sitemap, Open Graph | NFR-07 | |

**Acceptance Criteria:**
- Customer can browse products, filter by type, select a colour, see available stock
- Customer can add items to cart, update quantities (bounded by stock), remove items
- Cart persists across page reloads (local storage)
- Pages are indexed by search engines

---

### Phase 3 — Checkout + Payments + Orders (Est.: 4-5 weeks)

**Goal:** Enable actual purchases.

| Deliverable | FR Ref | Dependencies |
|---|---|---|
| Passwordless customer auth (one-time code via SMS/email) | FR-005 | SMS provider, email provider |
| Checkout multi-step flow | FR-006 | Phase 2 cart |
| Domestic delivery fee calculator | FR-008 | Delivery fee table schema |
| International delivery fee calculator | FR-008 | Delivery fee table schema |
| Paystack integration (initialize, webhook, confirm) | FR-007 | |
| Flutterwave integration (initialize, webhook, confirm) | FR-007 | |
| Bank Transfer / Wire flow placeholders | FR-007 | |
| Pay on Delivery flow with deposit | FR-007 | |
| Order creation with stock decrement | ORD-01 | Phase 2 cart, Phase 1 stock |
| Order confirmation page + email | FR-009 | Email provider |
| Order tracking page (by ID) | FR-010 | |
| Customer account dashboard (order history) | FR-005 | Customer auth |

**Acceptance Criteria:**
- Customer can complete a full purchase: browse → cart → checkout → pay → confirmation
- Paystack/Flutterwave payments confirmed automatically via webhook
- Bank Transfer orders created at Pending Payment
- Stock decremented on confirmed orders
- Customer can track order by ID

---

### Phase 4 — Ops Dashboard: Orders + Roles (Est.: 3-4 weeks)

**Goal:** Staff can manage orders with proper role-based access.

| Deliverable | FR Ref | Dependencies |
|---|---|---|
| Staff auth API (login, JWT, middleware) | FR-011 | |
| Role-based authorization middleware | FR-011 | Staff auth |
| Order management list (filtered, sorted, paginated) | FR-012 | Phase 3 orders |
| Order detail view with status history timeline | FR-013 | |
| Order status update actions (role-gated) | FR-013 | RBAC middleware |
| Order assignment to staff | FR-013 | |
| Business settings page (delivery fees, exchange rate, deposit) | FR-021 | Owner role |
| Staff account management page | FR-022 | Owner role |

**Acceptance Criteria:**
- Owner can create/edit/deactivate staff accounts
- Each staff role sees only permitted actions (enforced server-side)
- Order lifecycle can be managed end-to-end through the dashboard
- Business settings are editable by Owner and persisted

---

### Phase 5 — Full Ops Suite: Reports + Inventory + Audit (Est.: 4-5 weeks)

**Goal:** Complete the dashboard with full operational visibility.

| Deliverable | FR Ref | Dependencies |
|---|---|---|
| Inventory management (stock adjustments, restock log) | FR-015 | Phase 1 variants |
| Low-stock alerts widget | FR-019 | FR-015 |
| Sales Tracker dashboard (revenue/profit by type and product) | FR-016 | Phase 3 orders, cost prices |
| Customer database with search and returning-customer flag | FR-017 | Phase 3 customers |
| Staff Activity Log (filtered, per-role visibility) | FR-018 | Phase 4 RBAC |
| Daily Summary report | FR-020 | FR-016 |
| Export functionality (CSV for reports, customer data) | FR-016, FR-017, FR-020 | |

**Acceptance Criteria:**
- Owner/Manager can view revenue and profit broken down by fabric type and product
- Low-stock variants are flagged and actionable
- Customer database shows first-time/returning status accurately
- Staff Activity Log provides complete audit trail
- Daily summary is exportable

---

### Future Phases (Post-MVP)

| Feature | Description | Priority |
|---|---|---|
| Returns & Refunds workflow | Full return/refund management with RMA tracking | P2 |
| Customer loyalty program | Discount codes, points, priority handling based on returning-customer flag | P2 |
| WhatsApp integration | Order notifications and status updates via WhatsApp Business API | P2 |
| Multi-currency storefront | Display prices in customer's local currency | P2 |
| Abandoned cart recovery | Automated email/SMS reminders for abandoned carts | P2 |
| Bulk order / wholesale | Special pricing for bulk purchases | P3 |
| Inventory barcode scanning | Scan barcodes for stock adjustments via mobile | P3 |
| Advanced analytics | Year-over-year comparisons, forecasting, demand prediction | P3 |
| Mobile app | Native mobile app for customers (React Native / Flutter) | P3 |

---

## 17. Assumptions & Open Questions

### 17.1 Assumptions (from Dossier)

| ID | Assumption | Status | Impact if Wrong |
|---|---|---|---|
| A-01 | Same price across colour variants of a given fabric | ⚠️ **Needs confirmation** | Requires colour-level pricing override |
| A-02 | Deposit amount for Pay on Delivery is a fixed value or percentage set by Owner | ✅ Accepted | Owner-configurable field |
| A-03 | Low-stock threshold is set per colour variant, not per fabric | ✅ Accepted | Implementation matches requirement |
| A-04 | Returns/refunds are out of scope for MVP | ✅ Accepted | Will be added post-MVP |
| A-05 | Customer login via one-time code (no password) | ✅ Accepted | Affects auth design |
| A-06 | Returning customer flag triggers after 2nd completed order | ✅ Accepted | Simple counter logic |
| A-07 | Manager retains day-to-day operational access; Owner controls staff/settings/cross-team visibility | ✅ Accepted | Drives RBAC design |
| A-08 | International delivery included with separate fee table and currency handling | ✅ Accepted | Dual fee table + currency conversion |

### 17.2 Open Questions (to Resolve Before Build)

| ID | Question | Asked By | Decision Needed From |
|---|---|---|---|
| Q-01 | Which countries/regions should be prioritized first for international delivery? | PRD | Owner (business decision) |
| Q-02 | Is there a fixed deposit amount or percentage in mind for Pay on Delivery? | PRD | Owner (configurable in settings, but need default) |
| Q-03 | Should the store and dashboard be subdomains of the same domain (store.fabricstore.com, dashboard.fabricstore.com) or separate? | Technical | Owner (branding/SEO preference) |
| Q-04 | What is the preferred tech stack? Any existing preferences or team expertise? | PRD | Development team |
| Q-05 | Should colour variants be allowed to have different prices? (Re: Assumption A-01) | PRD | Owner |
| Q-06 | What SMS provider is preferred for Nigerian phone numbers? (Twilio, Termii, Africa's Talking) | PRD | Owner / Team |
| Q-07 | How are fabric images currently stored? Can they be migrated to a cloud service? | PRD | Owner |

---

## 18. Appendix

### 18.1 Glossary

| Term | Definition |
|---|---|
| **Fabric Type** | A category of fabric (e.g., Lace, Ankara, Silk) used for categorization and rollup reporting |
| **Colour Variant** | A specific colour option for a fabric, with its own stock count and low-stock threshold |
| **One-Time Code** | A temporary numeric code sent via SMS or email for passwordless customer authentication |
| **Returning Customer** | A customer who has completed 2 or more orders, flagged in the Customer Database |
| **Pay on Delivery (PoD)** | Payment method where customer pays a deposit upfront and balance on delivery; Nigeria only |
| **Pending Payment** | Initial order status for PoD and Bank Transfer orders, awaiting staff confirmation |
| **Assigned to Packing** | Order status after a staff member is assigned to pack the order |
| **Fabric Type Rollup** | Aggregating sales or stock data across all products within a fabric category |
| **Staff Activity Log** | Immutable audit trail recording all staff actions with timestamps and user attribution |

### 18.2 Reference Documents

| Document | Location |
|---|---|
| Business Requirements Dossier | `docs/fabricstore-dossier.md` |
| Product Requirements Document (this document) | `docs/fabricstore-prd.md` |

### 18.3 Revision History

| Version | Date | Author | Changes |
|---|---|---|---|
| v1.0 | 2026-07-10 | PRD Translation | Initial comprehensive PRD derived from business requirements dossier |
