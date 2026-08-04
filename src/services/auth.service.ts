import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { Types } from 'mongoose';
import { env } from '../config/env.js';
import { User } from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';
import { HTTP_STATUS, USER_ROLE, type UserRole } from '../utils/constants.js';

const SALT_ROUNDS = 10;

export interface AuthUserPayload {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface PublicUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}

interface UserFields {
  _id: Types.ObjectId;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}

function toPublicUser(user: UserFields): PublicUser {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };
}

function issueAccessToken(user: UserFields): string {
  const payload: AuthUserPayload = {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    role: user.role,
  };
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRES_IN as jwt.SignOptions['expiresIn'],
  });
}

export async function registerUser(input: { name: string; email: string; password: string }): Promise<{ user: PublicUser; token: string }> {
  const existing = await User.findOne({ email: input.email.toLowerCase() });
  if (existing) {
    throw new ApiError(HTTP_STATUS.CONFLICT, 'An account with this email already exists');
  }

  const passwordHash = await bcrypt.hash(input.password, SALT_ROUNDS);
  const user = await User.create({
    name: input.name,
    email: input.email.toLowerCase(),
    passwordHash,
    role: USER_ROLE.USER,
  });

  return { user: toPublicUser(user), token: issueAccessToken(user) };
}

export async function loginUser(input: { email: string; password: string }): Promise<{ user: PublicUser; token: string }> {
  const user = await User.findOne({ email: input.email.toLowerCase() });
  if (!user) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid credentials');
  }

  const passwordMatches = await bcrypt.compare(input.password, user.passwordHash);
  if (!passwordMatches) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid credentials');
  }

  return { user: toPublicUser(user), token: issueAccessToken(user) };
}
