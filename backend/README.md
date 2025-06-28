# ShipTag Backend

A Fastify-based backend service for the ShipTag shipping management system.

## Tech Stack

- **Framework**: Fastify
- **Language**: TypeScript
- **Runtime**: Node.js

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Configuration

Copy the `.env.example` file to `.env` and update the values as needed:

```bash
cp .env.example .env
```

### Development

Run the development server with hot-reload:

```bash
npm run dev
```

The server will start on `http://localhost:3050`

### Production

Build the TypeScript code:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## API Endpoints

All endpoints are prefixed with `/api/v1`

### Shipments

- `GET /api/v1/shipments` - Get paginated shipments with filters
- `GET /api/v1/shipments/stats` - Get shipment statistics
- `POST /api/v1/shipments/bulk-action` - Perform bulk actions on shipments

### Health Check

- `GET /health` - Server health check endpoint

## Scripts

- `npm run dev` - Start development server with hot-reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types without building

## Environment Variables

- `PORT` - Server port (default: 3050)
- `HOST` - Server host (default: 0.0.0.0)
- `NODE_ENV` - Environment (development/production)
- `CORS_ORIGIN` - CORS allowed origin (default: http://localhost:3000)
- `API_PREFIX` - API route prefix (default: /api/v1)
- `LOG_LEVEL` - Logging level (default: info)