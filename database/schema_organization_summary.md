# Database Schema Organization Summary

I've organized your database schema into **10 functional groups** that align with logical page structures for your application. Each group contains related tables that would typically be managed together.

## Functional Groups Overview

### 1. **Products** (6 tables)
**Core Purpose:** Product catalog management, variants, inventory tracking
- `products` - Main product catalog
- `product_variants` - Product variations (size, color, etc.)
- `product_images` - Product image management
- `product_inventory` - Stock levels per warehouse/bin
- `product_sync_logs` - Platform synchronization logs
- `variant_batches` - Batch tracking for variants

**Typical Pages:** Product listing, product details, inventory management, bulk import/sync

---

### 2. **Warehouses & Inventory** (2 tables)
**Core Purpose:** Physical warehouse and storage location management
- `warehouses` - Warehouse locations
- `bins` - Storage bins within warehouses

**Typical Pages:** Warehouse management, bin organization, storage allocation

---

### 3. **Orders & Shipping** (4 tables)
**Core Purpose:** Order processing, package management, tracking
- `orders` - Customer orders and shipments
- `packages` - Physical package details
- `order_charges` - Additional fees and charges
- `tracking_data` - Shipment tracking information

**Typical Pages:** Order management, package creation, tracking dashboard, shipping history

---

### 4. **Carriers & Shipping Services** (5 tables)
**Core Purpose:** Shipping carrier configuration, rates, and pricing
- `carriers` - Shipping companies (DHL, FedEx, etc.)
- `carrier_services` - Service types per carrier
- `carrier_pickup_options` - Pickup/dropoff options
- `rates` - Customer-facing shipping rates
- `costs` - Internal carrier costs

**Typical Pages:** Carrier management, rate configuration, pricing matrix, service setup

---

### 5. **Users & Authentication** (7 tables)
**Core Purpose:** User management, authentication, profiles
- `users` - Core user data
- `organizations` - Company/team management
- `user_invitations` - Team invitation system
- `personal_profiles` - Individual user profiles
- `freelancer_profiles` - Freelancer-specific data
- `company_profiles` - Business account data
- `addresses` - User address book

**Typical Pages:** User registration, profile management, team management, address book

---

### 6. **Payments & Billing** (7 tables)
**Core Purpose:** Financial transactions, wallet system, payment methods
- `transactions` - All financial transactions
- `wallets` - User wallet balances
- `wallet_transactions` - Wallet transaction history
- `bank_details` - User bank information
- `billing_addresses` - Billing address management
- `coupons` - Discount codes
- `coupon_usages` - Coupon usage tracking

**Typical Pages:** Payment dashboard, wallet management, billing history, coupon management

---

### 7. **Plans & Services** (4 tables)
**Core Purpose:** Subscription plans, service offerings, permissions
- `plans` - Subscription plan definitions
- `services` - Available services/features
- `plan_services` - Services included in each plan
- `user_service_overrides` - Custom service permissions

**Typical Pages:** Plan management, subscription settings, feature toggles, pricing configuration

---

### 8. **Platform Integrations** (3 tables)
**Core Purpose:** Third-party platform connections (Shopify, WooCommerce, etc.)
- `platforms` - Available integration platforms
- `platform_integrations` - User's connected platforms
- `platform_orders` - Orders imported from platforms

**Typical Pages:** Integration marketplace, connected accounts, order synchronization, platform settings

---

### 9. **Geography & Zones** (3 tables)
**Core Purpose:** Geographic data for shipping zones and regions
- `countries` - Country master data
- `zones` - Shipping zones within countries
- `zone_cities` - Cities within zones

**Typical Pages:** Zone configuration, geographic setup, shipping area management

---

### 10. **System & Logging** (4 tables)
**Core Purpose:** Audit trails, system logs, internationalization
- `audit_trail` - Data change tracking
- `logs` - Application logs
- `webhook_logs` - External webhook data
- `translations` - Multi-language support

**Typical Pages:** Admin logs, audit reports, system monitoring, language management

---

## Implementation Recommendations

### For Cursor/AI Development:
1. **Start with core entities first:** Users → Products → Orders → Payments
2. **Use functional grouping** for better AI context understanding
3. **Reference related schemas** when building features that span multiple groups
4. **Maintain foreign key relationships** between groups (e.g., orders reference users, products, etc.)

### Suggested Development Order:
1. Users & Authentication (foundation)
2. Plans & Services (business logic)
3. Products (catalog)
4. Warehouses & Inventory (fulfillment)
5. Geography & Zones (shipping setup)
6. Carriers & Shipping Services (logistics)
7. Orders & Shipping (core operations)
8. Platform Integrations (external connections)
9. Payments & Billing (monetization)
10. System & Logging (observability)

Each schema file can be used independently in Cursor with clear context about its purpose and relationships to other components.