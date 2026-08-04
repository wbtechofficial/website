import { createApp } from './app.js';
import { connectDatabase, disconnectDatabase } from './config/db.js';
import { env } from './config/env.js';

async function bootstrap(): Promise<void> {
  await connectDatabase();

  const app = createApp();

  const server = app.listen(env.PORT, () => {
    console.log(`[server] Listening on http://localhost:${env.PORT} (${env.NODE_ENV})`);
  });

  const shutdown = (signal: string) => {
    console.log(`[server] Received ${signal}, shutting down`);
    server.close(async () => {
      await disconnectDatabase();
      process.exit(0);
    });
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

bootstrap().catch((error) => {
  console.error('[server] Failed to start', error);
  process.exit(1);
});
