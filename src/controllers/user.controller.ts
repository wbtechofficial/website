import type { Request, Response } from 'express';
import { listUserProjects } from '../services/project.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { HTTP_STATUS } from '../utils/constants.js';

export const myProjectsController = asyncHandler(async (req: Request, res: Response) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 20));
  const result = await listUserProjects(req.user!.id, page, limit);
  res.status(HTTP_STATUS.OK).json(new ApiResponse('Your projects fetched', result));
});
