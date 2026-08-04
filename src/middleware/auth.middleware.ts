import type { NextFunction, Request, RequestHandler, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import type { AuthenticatedJwtPayload } from '../types/express.js';
import { ApiError } from '../utils/ApiError.js';
import { HTTP_STATUS, USER_ROLE } from '../utils/constants.js';

function extractBearerToken(req: Request): string | null {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return null;
  }
  const token = header.slice('Bearer '.length).trim();
  return token.length > 0 ? token : null;
}

export const authenticate: RequestHandler = (req: Request, _res: Response, next: NextFunction) => {
  const token = extractBearerToken(req);
  if (!token) {
    next(new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Authentication required'));
    return;
  }

  try {
    const payload = jwt.verify(token, env.JWT_ACCESS_SECRET) as AuthenticatedJwtPayload;
    req.user = {
      id: payload.id,
      email: payload.email,
      name: payload.name,
      role: payload.role,
    };
    next();
  } catch {
    next(new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid or expired token'));
  }
};

export const optionalAuthenticate: RequestHandler = (req: Request, _res: Response, next: NextFunction) => {
  const token = extractBearerToken(req);
  if (!token) {
    next();
    return;
  }

  try {
    const payload = jwt.verify(token, env.JWT_ACCESS_SECRET) as AuthenticatedJwtPayload;
    req.user = {
      id: payload.id,
      email: payload.email,
      name: payload.name,
      role: payload.role,
    };
  } catch {
    req.user = undefined;
  }
  next();
};

export const authorizeAdmin: RequestHandler = (req: Request, _res: Response, next: NextFunction) => {
  if (req.user?.role !== USER_ROLE.ADMIN) {
    next(new ApiError(HTTP_STATUS.FORBIDDEN, 'Admin access required'));
    return;
  }
  next();
};
