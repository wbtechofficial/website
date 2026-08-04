import type { Request, Response } from 'express';
import {
  getEventShowcase,
  getGlobalShowcase,
  getModerationList,
  setProjectFeatured,
  setProjectStatus,
} from '../services/showcase.service.js';
import { getUpvoteState } from '../services/upvote.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { HTTP_STATUS, PROJECT_STATUS, type ProjectStatus } from '../utils/constants.js';
import type { ModerationQuery, ShowcaseQuery } from '../schemas/showcase.schema.js';
import type { SerializedProject } from '../services/project.service.js';

async function attachUpvoteState(items: SerializedProject[], userId?: string): Promise<SerializedProject[]> {
  if (!userId || items.length === 0) {
    return items;
  }
  const state = await getUpvoteState(userId, items.map((item) => item.id));
  return items.map((item) => ({ ...item, hasUpvoted: state[item.id] ?? false }));
}

export const globalShowcaseController = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query as unknown as ShowcaseQuery;
  const result = await getGlobalShowcase(query);
  result.items = await attachUpvoteState(result.items, req.user?.id);

  res.status(HTTP_STATUS.OK).json(new ApiResponse('Global showcase fetched', result));
});

export const eventShowcaseController = asyncHandler(async (req: Request, res: Response) => {
  const eventId = req.params.id as string;
  const query = req.query as unknown as Omit<ShowcaseQuery, 'eventId'>;
  const result = await getEventShowcase(eventId, query);
  result.items = await attachUpvoteState(result.items, req.user?.id);

  res.status(HTTP_STATUS.OK).json(new ApiResponse('Event showcase fetched', result));
});

export const moderationListController = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query as unknown as ModerationQuery;
  const result = await getModerationList(query);
  res.status(HTTP_STATUS.OK).json(new ApiResponse('Moderation queue fetched', result));
});

function assertValidStatus(value: string): asserts value is ProjectStatus {
  if (!Object.values(PROJECT_STATUS).includes(value as ProjectStatus)) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Invalid status');
  }
}

export const moderateProjectController = asyncHandler(async (req: Request, res: Response) => {
  const projectId = req.params.id as string;
  const { action } = req.body as { action?: string };

  const actions: Record<string, ProjectStatus> = {
    approve: PROJECT_STATUS.APPROVED,
    reject: PROJECT_STATUS.REJECTED,
  };

  const status = actions[action ?? ''];
  if (!status) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Action must be 'approve' or 'reject'");
  }

  const project = await setProjectStatus(projectId, status);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(`Project ${action}d`, project));
});

export const featureProjectController = asyncHandler(async (req: Request, res: Response) => {
  const projectId = req.params.id as string;
  const { featured } = req.body as { featured?: unknown };

  if (typeof featured !== 'boolean') {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'featured must be a boolean');
  }

  const project = await setProjectFeatured(projectId, featured);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(featured ? 'Project featured' : 'Project unfeatured', project));
});
