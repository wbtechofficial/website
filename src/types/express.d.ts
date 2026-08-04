import type { Request } from 'express';
import type { JwtPayload } from 'jsonwebtoken';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

export type AuthenticatedJwtPayload = JwtPayload & AuthUser;

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}
