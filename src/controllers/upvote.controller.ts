import type { Request, Response } from 'express';
import { getUpvoteState, toggleUpvote } from '../services/upvote.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { HTTP_STATUS } from '../utils/constants.js';

export const toggleUpvoteController = asyncHandler(async (req: Request, res: Response) => {
  const projectId = req.params.id as string;
  const result = await toggleUpvote(req.user!.id, projectId);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(result.upvoted ? 'Project upvoted' : 'Upvote removed', result));
});

export const getUpvoteStateController = asyncHandler(async (req: Request, res: Response) => {
  const { ids } = req.query as { ids?: string };
  const projectIds = ids ? ids.split(',') : [];
  const state = await getUpvoteState(req.user!.id, projectIds);
  res.status(HTTP_STATUS.OK).json(new ApiResponse('Upvote state fetched', state));
});
