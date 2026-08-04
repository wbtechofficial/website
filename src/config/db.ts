import mongoose from 'mongoose';
import { env } from './env.js';

export async function connectDatabase(): Promise<void> {
  mongoose.connection.on('connected', () => {
    console.log('[db] MongoDB connected');
  });
  mongoose.connection.on('error', (error) => {
    console.error('[db] MongoDB connection error', error);
  });

  await mongoose.connect(env.MONGODB_URI, {
    autoIndex: env.NODE_ENV !== 'production',
  });
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
}
