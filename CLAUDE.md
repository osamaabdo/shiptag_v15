# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a Next.js 15 frontend application for ShipTag, a shipping and logistics management platform. The project structure follows Next.js App Router conventions:

- `frontend/` - Main Next.js application
- `frontend/app/` - App Router pages and layouts
- `frontend/components/` - Reusable React components
- `frontend/components/ui/` - UI primitives (shadcn/ui components)
- `frontend/lib/` - Utility functions and configurations

## Development Commands

Run these commands from the `frontend/` directory:

```bash
# Development server (uses Turbopack)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives with custom styling (shadcn/ui pattern)
- **Icons**: Tabler Icons and Lucide React
- **Charts**: Recharts
- **Theming**: next-themes for dark/light mode
- **TypeScript**: Configured with strict mode
- **Path Aliases**: `@/*` maps to `frontend/*`

## Architecture Notes

### Component Organization
- UI primitives are in `components/ui/` following shadcn/ui conventions
- Business components are in `components/` root
- Navigation components (`nav-*`) handle different parts of the sidebar
- Charts use a consistent pattern with Recharts integration

### Application Structure
- Dashboard-focused application with sidebar navigation
- Theme provider configured for system/light/dark modes
- Typography uses Geist fonts (sans and mono variants)
- Responsive design with mobile-first approach

### Key Features
- Dashboard with interactive charts and data tables
- Sidebar navigation with main nav and footer sections
- User profile management in sidebar
- Search functionality
- Order and shipment management interface

## Component Patterns

When creating new components:
- Use TypeScript with proper typing
- Follow the existing icon pattern (Tabler Icons for nav, Lucide for general use)
- Implement responsive design with Tailwind classes
- Use the established theming system
- Follow the shadcn/ui component structure for UI primitives

## Styling Guidelines

- Use Tailwind CSS classes exclusively
- Follow the CSS custom properties pattern for theming
- Maintain consistent spacing and typography scales
- Use the established color palette and design tokens