import Fastify from 'fastify';
import cors from '@fastify/cors';
import sensible from '@fastify/sensible';
import { config } from './config/env';
import shipmentsRoutes from './routes/shipments';

const buildServer = () => {
  const fastify = Fastify({
    logger: {
      level: config.logging.level,
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      },
    },
  });

  // Register plugins
  fastify.register(cors, {
    origin: config.cors.origin,
    credentials: true,
  });

  fastify.register(sensible);

  // Health check route
  fastify.get('/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  });

  // Register routes with prefix
  fastify.register(shipmentsRoutes, { prefix: `${config.api.prefix}/shipments` });

  return fastify;
};

const start = async () => {
  const server = buildServer();

  try {
    await server.listen({
      port: config.server.port,
      host: config.server.host,
    });

    console.log(`
🚀 ShipTag Backend Server is running!
📍 Server: http://${config.server.host}:${config.server.port}
📍 API Endpoint: http://${config.server.host}:${config.server.port}${config.api.prefix}
📍 Health Check: http://${config.server.host}:${config.server.port}/health
🌍 Environment: ${config.environment}
    `);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down server...');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down server...');
  process.exit(0);
});

// Start the server
start();