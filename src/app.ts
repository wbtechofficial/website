import cors from 'cors';
import express, { type Express } from 'express';
import helmet from 'helmet';
import { corsOrigins } from './config/env.js';
import { errorMiddleware, notFoundMiddleware } from './middleware/error.middleware.js';
import { apiLimiter } from './middleware/rateLimit.middleware.js';
import v1Routes from './routes/v1/index.js';

export function createApp(): Express {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: corsOrigins.includes('*') ? true : corsOrigins,
      credentials: true,
    }),
  );
  app.use(apiLimiter);
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));

  app.get('/health', (_req, res) => {
    res.json({ success: true, message: 'OK' });
  });

  app.use('/api/v1', v1Routes);

  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  return app;
}
