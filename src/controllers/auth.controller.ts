import type { Request, Response } from 'express';
import { loginUser, registerUser } from '../services/auth.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { HTTP_STATUS } from '../utils/constants.js';
import type { LoginInput, RegisterInput } from '../schemas/auth.schema.js';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const input = req.body as RegisterInput;
  const result = await registerUser(input);
  res.status(HTTP_STATUS.CREATED).json(new ApiResponse('Account created successfully', result));
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const input = req.body as LoginInput;
  const result = await loginUser(input);
  res.status(HTTP_STATUS.OK).json(new ApiResponse('Logged in successfully', result));
});
