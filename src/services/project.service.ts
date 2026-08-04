import type { FilterQuery } from 'mongoose';
import { Project, type ProjectDocument } from '../models/Project.js';
import { getEventOrThrow } from './event.service.js';
import { deleteThumbnail } from './r2.service.js';
import { ApiError } from '../utils/ApiError.js';
import {
  HTTP_STATUS,
  PROJECT_SOURCE,
  PROJECT_STATUS,
  type ProjectStatus,
  type ProjectSource,
} from '../utils/constants.js';

export interface StoredAssetInput {
  key: string;
  url: string;
  contentType: string;
}

export interface ProjectListResult {
  items: SerializedProject[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface SerializedProject {
  id: string;
  title: string;
  description: string;
  demoUrl?: string;
  repoUrl?: string;
  categories: string[];
  techStack: string[];
  thumbnail: { key: string; url: string; contentType: string };
  upvoteCount: number;
  featured: boolean;
  status: ProjectStatus;
  source: ProjectSource;
  referenceCode: string;
  event?: { id: string; name: string; slug: string } | null;
  author?: { id: string; name: string } | null;
  speakerEmail?: string;
  hasUpvoted?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface ProjectQueryResult {
  _id: unknown;
  title: string;
  description: string;
  demoUrl?: string;
  repoUrl?: string;
  categories: string[];
  techStack: string[];
  thumbnail: { key: string; url: string; contentType: string };
  upvoteCount: number;
  featured: boolean;
  status: ProjectStatus;
  source: ProjectSource;
  referenceCode: string;
  event?: { id: string; name: string; slug: string } | null;
  author?: { id: string; name: string } | null;
  speakerEmail?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type { ProjectQueryResult };

function serializeProject(project: ProjectQueryResult, hasUpvoted?: boolean): SerializedProject {
  return {
    id: String(project._id),
    title: project.title,
    description: project.description,
    demoUrl: project.demoUrl ?? undefined,
    repoUrl: project.repoUrl ?? undefined,
    categories: project.categories,
    techStack: project.techStack,
    thumbnail: project.thumbnail,
    upvoteCount: project.upvoteCount,
    featured: project.featured,
    status: project.status,
    source: project.source,
    referenceCode: project.referenceCode,
    event: project.event ?? null,
    author: project.author ?? null,
    speakerEmail: project.speakerEmail ?? undefined,
    hasUpvoted,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  };
}

export { serializeProject };

export async function createProject(
  authorId: string,
  input: {
    title: string;
    description: string;
    demoUrl?: string;
    repoUrl?: string;
    categories: string[];
    techStack: string[];
    eventId?: string;
  },
  thumbnail: StoredAssetInput,
  referenceCode: string,
): Promise<SerializedProject> {
  const eventId = input.eventId ? await getEventOrThrow(input.eventId, true).then((event) => event._id) : undefined;

  const project = await Project.create({
    ...input,
    demoUrl: input.demoUrl || undefined,
    repoUrl: input.repoUrl || undefined,
    event: eventId,
    thumbnail,
    author: authorId,
    status: PROJECT_STATUS.PENDING,
    source: PROJECT_SOURCE.AUTHENTICATED,
    referenceCode,
  });

  const populated = await Project.findById(project._id).populate('author', 'name').populate('event', 'name slug').lean();
  return serializeProject(populated as unknown as ProjectQueryResult);
}

export async function getProjectForViewer(projectId: string, viewerId?: string, isAdmin = false): Promise<SerializedProject> {
  const project = await Project.findById(projectId)
    .populate('author', 'name')
    .populate('event', 'name slug')
    .lean();

  if (!project) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Project not found');
  }

  const isOwner = viewerId !== undefined && project.author !== null && String((project.author as { _id: unknown })._id) === viewerId;
  if (project.status !== PROJECT_STATUS.APPROVED && !isOwner && !isAdmin) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Project not found');
  }

  return serializeProject(project as unknown as ProjectQueryResult);
}

export async function updateProject(
  projectId: string,
  actorId: string,
  isAdmin: boolean,
  input: {
    title?: string;
    description?: string;
    demoUrl?: string;
    repoUrl?: string;
    categories?: string[];
    techStack?: string[];
    eventId?: string;
  },
  thumbnail?: StoredAssetInput,
): Promise<SerializedProject> {
  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Project not found');
  }

  const isOwner = project.author !== null && String(project.author) === actorId;
  if (!isOwner && !isAdmin) {
    throw new ApiError(HTTP_STATUS.FORBIDDEN, 'You cannot edit this project');
  }

  const updates: Record<string, unknown> = { ...input };
  if (input.eventId !== undefined) {
    updates.event = input.eventId ? await getEventOrThrow(input.eventId, true).then((event) => event._id) : null;
  }
  delete updates.eventId;
  if (thumbnail) {
    updates.thumbnail = thumbnail;
  }

  const updated = await Project.findByIdAndUpdate(projectId, updates, { new: true, runValidators: true })
    .populate('author', 'name')
    .populate('event', 'name slug')
    .lean();

  if (!updated) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Project not found');
  }

  if (thumbnail && project.thumbnail.key !== thumbnail.key) {
    void deleteThumbnail(project.thumbnail.key).catch((error) => {
      console.error('[r2] Failed to remove replaced thumbnail', error);
    });
  }

  return serializeProject(updated as unknown as ProjectQueryResult);
}

export async function deleteProject(projectId: string, actorId: string, isAdmin: boolean): Promise<void> {
  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Project not found');
  }

  const isOwner = project.author !== null && String(project.author) === actorId;
  if (!isOwner && !isAdmin) {
    throw new ApiError(HTTP_STATUS.FORBIDDEN, 'You cannot delete this project');
  }

  await Project.deleteOne({ _id: projectId });
  void deleteThumbnail(project.thumbnail.key).catch((error) => {
    console.error('[r2] Failed to remove deleted project thumbnail', error);
  });
}

export async function listUserProjects(
  userId: string,
  page: number,
  limit: number,
): Promise<ProjectListResult> {
  const filter: FilterQuery<ProjectDocument> = { author: userId };
  const [items, total] = await Promise.all([
    Project.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('author', 'name')
      .populate('event', 'name slug')
      .lean(),
    Project.countDocuments(filter),
  ]);

  return {
    items: items.map((item) => serializeProject(item as unknown as ProjectQueryResult)),
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
}

export async function listRelatedProjects(
  projectId: string,
  categories: string[],
  eventId?: string,
  limit = 6,
): Promise<SerializedProject[]> {
  const filter: FilterQuery<ProjectDocument> = {
    _id: { $ne: projectId },
    status: PROJECT_STATUS.APPROVED,
    $or: [{ categories: { $in: categories } }, ...(eventId ? [{ event: eventId }] : [])],
  };

  const items = await Project.find(filter)
    .sort({ upvoteCount: -1, createdAt: -1 })
    .limit(limit)
    .populate('author', 'name')
    .populate('event', 'name slug')
    .lean();

  return items.map((item) => serializeProject(item as unknown as ProjectQueryResult));
}

export async function listProjectIds(userId: string): Promise<string[]> {
  const projects = await Project.find({ author: userId }).select('_id').lean();
  return projects.map((project) => String(project._id));
}
