import { rateLimit } from 'express-rate-limit';
import { HTTP_STATUS } from '../utils/constants.js';

export const strictLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many submission requests. Please try again later.',
  },
  statusCode: HTTP_STATUS.TOO_MANY_REQUESTS,
});

export const statusLookupLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many status lookups. Please slow down.',
  },
  statusCode: HTTP_STATUS.TOO_MANY_REQUESTS,
});

export const upvoteLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many upvote requests. Please slow down.',
  },
  statusCode: HTTP_STATUS.TOO_MANY_REQUESTS,
});

export const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again later.',
  },
  statusCode: HTTP_STATUS.TOO_MANY_REQUESTS,
});

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests. Please try again later.',
  },
  statusCode: HTTP_STATUS.TOO_MANY_REQUESTS,
});

export const readLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many read requests. Please slow down.',
  },
  statusCode: HTTP_STATUS.TOO_MANY_REQUESTS,
});

export const projectWriteLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many project create/update requests. Please try again later.',
  },
  statusCode: HTTP_STATUS.TOO_MANY_REQUESTS,
});

export const adminLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many admin requests. Please slow down.',
  },
  statusCode: HTTP_STATUS.TOO_MANY_REQUESTS,
});
