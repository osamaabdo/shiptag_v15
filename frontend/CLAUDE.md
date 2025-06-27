# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development with Turbopack (fastest)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint

# Type checking (not in package.json, but recommended)
npx tsc --noEmit
```

## Project Architecture

This is a **ShipTag** shipping and logistics management platform built with:

- **Next.js 15.3.4** with App Router
- **React 19** with TypeScript
- **TailwindCSS 4** for styling
- **next-intl** for internationalization (English/Arabic with RTL support)
- **Radix UI** components with custom theming
- **Recharts** for data visualization
- **Turbopack** for fast development builds

### Key Architecture Patterns

**Internationalization Setup:**
- Supports English (`en`) and Arabic (`ar`) with RTL layout support
- Uses `next-intl` with file-based routing: `/[locale]/...`
- Translation files in `/messages/` directory
- Middleware handles locale detection and routing
- Arabic uses Cairo font, English uses Geist fonts

**Component Structure:**
- Custom UI components in `/components/ui/` based on Radix UI primitives
- Business components in `/components/` (charts, tables, navigation)
- Uses `cn()` utility for conditional Tailwind classes (clsx + tailwind-merge)
- Shadcn/ui pattern with `components.json` configuration

**Dashboard Architecture:**
- Main dashboard at `/[locale]/dashboard`
- Sidebar navigation with collapsible sections
- Data visualization with interactive charts (Area, Bar, Donut)
- Data table with sorting/filtering capabilities
- Responsive design with container queries

**Theming:**
- Dark/light mode with `next-themes`
- CSS custom properties for chart colors
- RTL-aware layouts and typography

### API Layer Architecture

**Mock API Backend Structure:**
- Implement a **mock API backend layer** in a top-level `backend/` folder:
  - API logic lives in `backend/handlers/{module}.ts`
  - Mocked data lives in `backend/mocks/{module}.ts`
  - Utility functions (e.g. latency simulation) in `backend/utils/`
- Frontend accesses data through `lib/api/{module}.ts` only (acts as a wrapper)
- Use TypeScript types in `types/{module}.ts`
- All data access must go through this API layer

**API Layer Requirements:**
- Simulate real API behavior (pagination, filters, sorting, etc.)
- Be designed to easily swap with an external Fastify backend
- Include a bearer token from `getAccessTokenFromClient()` in the `Authorization` header
- Never hardcode tokens or assume a specific auth provider
- Use `process.env.NEXT_PUBLIC_API_BASE` for all fetch URLs
- Simulate appropriate delays using utility functions

**Standard File Structure for Features:**
```
/frontend
  /app/(dashboard)/{feature}/page.tsx
  /components/{feature}/
    - {Feature}Table.tsx
    - {Feature}Filters.tsx
    - {Feature}Actions.tsx
    - etc.
  /lib/api/{feature}.ts
  /types/{feature}.ts
  /utils/getAccessTokenFromClient.ts

/backend
  /handlers/{feature}.ts
  /mocks/{feature}.ts
  /utils/simulateLatency.ts
```

**Data Handling Patterns:**
- All fetch calls must:
  - Go through the `lib/api/{module}.ts` module
  - Internally delegate to `backend/handlers/{module}.ts`
  - Use types defined in `types/{module}.ts`
  - Include bearer token from `getAccessTokenFromClient()` in `Authorization` header
  - Use `process.env.NEXT_PUBLIC_API_BASE` as the base URL
- Simulate delay, filtering, sorting, and pagination logic in the mock API

### Important Files

- `middleware.ts` - Handles i18n routing and locale detection
- `i18n/routing.ts` - Defines supported locales and routing config
- `lib/utils.ts` - Contains the essential `cn()` utility function
- `components/ui/chart.tsx` - Custom chart wrapper with theming support
- `app/[locale]/layout.tsx` - Root layout with i18n and theme providers

### Development Notes

- The working directory is `frontend/` (not root)
- Uses absolute imports with `@/` prefix
- TypeScript strict mode enabled
- Charts use custom tooltip/legend components with proper typing
- All UI components follow Radix UI patterns with forwardRef
- Data is currently mock data from `data.json` files
- All UI components must come from the existing UI library (ShadCN/Radix UI)
- Use existing **design system** (ShadCN, TailwindCSS, etc.) and **design tokens**

## Database Architecture

The project uses a comprehensive PostgreSQL database with 43 tables organized into 10 functional groups:

### Core Entities
- **Users & Authentication**: Multi-tenant user system with organizations, profiles, and invitations
- **Plans & Services**: Subscription-based feature access with user overrides
- **Products & Inventory**: Product catalog with variants, batch tracking, and multi-platform sync
- **Orders & Shipping**: Order management with package tracking and charges
- **Carriers & Shipping**: Rate management with plan-based pricing structures
- **Geography & Zones**: Regional shipping zones and country data
- **Warehouses**: Physical inventory locations with bin-level tracking
- **Platform Integrations**: OAuth connections to e-commerce platforms (Shopify, WooCommerce)
- **Payments & Billing**: Wallet system with transactions and coupon management
- **System & Logging**: Audit trails, webhooks, and internationalization

### Database Design Patterns
- **Multi-tenancy**: `user_id` and `organization_id` for data isolation
- **UUID Primary Keys**: Modern tables use `gen_random_uuid()` 
- **JSONB Metadata**: Flexible data storage for addresses, product data, webhooks
- **Plan-based Access Control**: Features and pricing tied to subscription plans
- **External Integration**: `external_id` fields for platform synchronization
- **Soft Deletes**: `is_active` flags instead of hard deletes
- **Audit Trails**: Comprehensive change tracking and webhook logging

### Key Relationships
- Users belong to Organizations with role-based access
- Products sync across multiple e-commerce Platforms
- Orders reference Users, Products, and Carriers
- Inventory tracked at Warehouse → Bin level
- Rates vary by Plan and geographic Zone
- Transactions flow through Wallet system

### Mock Data Structure
Current frontend uses JSON mock data that should map to these database entities:
- Dashboard charts likely represent order volumes, carrier performance, geographic distribution
- Tables show recent shipments, inventory levels, financial transactions
- User data includes organization context and plan-based permissions

### Styling Approach

- Utility-first with TailwindCSS V4
- Dark mode support 
- RTL layout support for Arabic locale using native Tailwindcss v4 support
- Responsive design