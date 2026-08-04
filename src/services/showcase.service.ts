import type { FilterQuery, SortOrder } from 'mongoose';
import { Project, type ProjectDocument } from '../models/Project.js';
import { serializeProject, type ProjectListResult, type ProjectQueryResult, type SerializedProject } from './project.service.js';
import { getEventOrThrow } from './event.service.js';
import { ApiError } from '../utils/ApiError.js';
import {
  HTTP_STATUS,
  PROJECT_STATUS,
  SHOWCASE_SORT,
  type ProjectStatus,
  type ShowcaseSort,
} from '../utils/constants.js';

interface ShowcaseOptions {
  page: number;
  limit: number;
  sort: ShowcaseSort;
  categories?: string;
  techStack?: string;
  eventId?: string;
}

interface ModerationOptions {
  page: number;
  limit: number;
  status?: ProjectStatus;
  eventId?: string;
  category?: string;
}

interface ModerationResult extends ProjectListResult {
  totalsByStatus: Record<string, number>;
}

const SHOWCASE_PROJECTION: Record<string, number> = {
  description: 0,
  speakerEmail: 0,
  updatedAt: 0,
};

const SORTS: Record<ShowcaseSort, Record<string, SortOrder>> = {
  [SHOWCASE_SORT.TOP]: { featured: -1, upvoteCount: -1, createdAt: -1 },
  [SHOWCASE_SORT.NEWEST]: { featured: -1, createdAt: -1 },
};

function buildShowcaseFilter(options: ShowcaseOptions): FilterQuery<ProjectDocument> {
  const filter: FilterQuery<ProjectDocument> = { status: PROJECT_STATUS.APPROVED };

  if (options.categories) {
    filter.categories = { $in: options.categories.split(',').map((value) => value.trim()).filter(Boolean) };
  }
  if (options.techStack) {
    filter.techStack = { $in: options.techStack.split(',').map((value) => value.trim()).filter(Boolean) };
  }
  if (options.eventId) {
    filter.event = options.eventId;
  }

  return filter;
}

async function fetchProjects(
  filter: FilterQuery<ProjectDocument>,
  sort: Record<string, SortOrder>,
  page: number,
  limit: number,
  projection?: Record<string, number>,
): Promise<{ items: SerializedProject[]; total: number }> {
  const [items, total] = await Promise.all([
    Project.find(filter, projection)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('author', 'name')
      .populate('event', 'name slug')
      .lean(),
    Project.countDocuments(filter),
  ]);

  return {
    items: items.map((item) => serializeProject(item as unknown as ProjectQueryResult)),
    total,
  };
}

export async function getGlobalShowcase(options: ShowcaseOptions): Promise<ProjectListResult> {
  const filter = buildShowcaseFilter(options);
  const { items, total } = await fetchProjects(filter, SORTS[options.sort], options.page, options.limit, SHOWCASE_PROJECTION);

  return {
    items,
    page: options.page,
    limit: options.limit,
    total,
    totalPages: Math.ceil(total / options.limit),
  };
}

export async function getEventShowcase(eventId: string, options: Omit<ShowcaseOptions, 'eventId'>): Promise<ProjectListResult> {
  const event = await getEventOrThrow(eventId);
  if (!event) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Event not found');
  }

  const filter = buildShowcaseFilter({ ...options, eventId });
  const { items, total } = await fetchProjects(filter, SORTS[options.sort], options.page, options.limit, SHOWCASE_PROJECTION);

  return {
    items,
    page: options.page,
    limit: options.limit,
    total,
    totalPages: Math.ceil(total / options.limit),
  };
}

export async function getModerationList(options: ModerationOptions): Promise<ModerationResult> {
  const filter: FilterQuery<ProjectDocument> = {};
  if (options.status) {
    filter.status = options.status;
  }
  if (options.eventId) {
    filter.event = options.eventId;
  }
  if (options.category) {
    filter.categories = options.category;
  }

  const [items, total, totalsByStatus] = await Promise.all([
    Project.find(filter)
      .sort({ createdAt: -1 })
      .skip((options.page - 1) * options.limit)
      .limit(options.limit)
      .populate('author', 'name')
      .populate('event', 'name slug')
      .lean(),
    Project.countDocuments(filter),
    Project.aggregate<{ _id: string; count: number }>([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]),
  ]);

  const statusTotals = Object.values(PROJECT_STATUS).reduce<Record<string, number>>(
    (acc, status) => {
      acc[status] = 0;
      return acc;
    },
    {},
  );
  for (const entry of totalsByStatus) {
    statusTotals[entry._id] = entry.count;
  }

  return {
    items: items.map((item) => serializeProject(item as unknown as ProjectQueryResult)),
    page: options.page,
    limit: options.limit,
    total,
    totalPages: Math.ceil(total / options.limit),
    totalsByStatus: statusTotals,
  };
}

export async function setProjectStatus(projectId: string, status: ProjectStatus): Promise<SerializedProject> {
  const updated = await Project.findByIdAndUpdate(
    projectId,
    { status },
    { new: true, runValidators: true },
  )
    .populate('author', 'name')
    .populate('event', 'name slug')
    .lean();

  if (!updated) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Project not found');
  }

  return serializeProject(updated as unknown as ProjectQueryResult);
}

export async function setProjectFeatured(projectId: string, featured: boolean): Promise<SerializedProject> {
  const updated = await Project.findByIdAndUpdate(
    projectId,
    { featured },
    { new: true, runValidators: true },
  )
    .populate('author', 'name')
    .populate('event', 'name slug')
    .lean();

  if (!updated) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Project not found');
  }

  return serializeProject(updated as unknown as ProjectQueryResult);
}
