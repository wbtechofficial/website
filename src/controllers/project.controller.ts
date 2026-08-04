import type { Request, Response } from 'express';
import {
  createProject,
  deleteProject,
  getProjectForViewer,
  listRelatedProjects,
  updateProject,
} from '../services/project.service.js';
import { getUpvoteState } from '../services/upvote.service.js';
import { createRandomReference } from '../services/reference.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { HTTP_STATUS } from '../utils/constants.js';
import { withThumbnail } from '../utils/thumbnailUpload.js';
import type { CreateProjectInput, UpdateProjectInput } from '../schemas/project.schema.js';

export const createProjectController = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Thumbnail image is required');
  }

  const input = req.body as CreateProjectInput;
  const project = await withThumbnail(req.file, (asset) =>
    createProject(req.user!.id, input, asset, createRandomReference()),
  );

  res.status(HTTP_STATUS.CREATED).json(new ApiResponse('Project submitted for review', project));
});

export const getProjectController = asyncHandler(async (req: Request, res: Response) => {
  const projectId = req.params.id as string;
  const viewerId = req.user?.id;
  const isAdmin = req.user?.role === 'admin';

  const project = await getProjectForViewer(projectId, viewerId, isAdmin);
  if (viewerId) {
    const state = await getUpvoteState(viewerId, [projectId]);
    project.hasUpvoted = state[projectId] ?? false;
  }

  res.status(HTTP_STATUS.OK).json(new ApiResponse('Project fetched', project));
});

export const updateProjectController = asyncHandler(async (req: Request, res: Response) => {
  const projectId = req.params.id as string;
  const input = req.body as UpdateProjectInput;
  const isAdmin = req.user!.role === 'admin';

  const project = req.file
    ? await withThumbnail(req.file, (asset) => updateProject(projectId, req.user!.id, isAdmin, input, asset))
    : await updateProject(projectId, req.user!.id, isAdmin, input);

  res.status(HTTP_STATUS.OK).json(new ApiResponse('Project updated', project));
});

export const deleteProjectController = asyncHandler(async (req: Request, res: Response) => {
  const projectId = req.params.id as string;
  const isAdmin = req.user!.role === 'admin';

  await deleteProject(projectId, req.user!.id, isAdmin);
  res.status(HTTP_STATUS.NO_CONTENT).send();
});

export const getRelatedProjectsController = asyncHandler(async (req: Request, res: Response) => {
  const projectId = req.params.id as string;
  const project = await getProjectForViewer(projectId);

  const related = await listRelatedProjects(projectId, project.categories, project.event?.id);
  res.status(HTTP_STATUS.OK).json(new ApiResponse('Related projects fetched', { items: related }));
});
