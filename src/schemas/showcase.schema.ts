import { z } from 'zod';
import {
  EVENT_STATUS,
  PROJECT_STATUS,
  SHOWCASE_SORT,
  type EventStatus,
  type ProjectStatus,
  type ShowcaseSort,
} from '../utils/constants.js';

const objectId = z.string().regex(/^[a-f\d]{24}$/i, 'Invalid id');
const mongoPagination = { page: z.coerce.number().int().min(1).default(1), limit: z.coerce.number().int().min(1).max(50).default(20) };

const projectStatusValues = Object.values(PROJECT_STATUS) as [ProjectStatus, ...ProjectStatus[]];
const eventStatusValues = Object.values(EVENT_STATUS) as [EventStatus, ...EventStatus[]];
const showcaseSortValues = Object.values(SHOWCASE_SORT) as [ShowcaseSort, ...ShowcaseSort[]];

export const showcaseQuerySchema = z.object({
  ...mongoPagination,
  sort: z.enum(showcaseSortValues).default(SHOWCASE_SORT.TOP),
  categories: z.string().trim().optional(),
  techStack: z.string().trim().optional(),
  eventId: objectId.optional(),
});

export const moderationQuerySchema = z.object({
  ...mongoPagination,
  status: z.enum(projectStatusValues).optional(),
  eventId: objectId.optional(),
  category: z.string().trim().optional(),
});

export const eventQuerySchema = z.object({
  ...mongoPagination,
  status: z.enum(eventStatusValues).optional(),
});

export const createEventSchema = z.object({
  name: z.string().trim().min(3, 'Event name must be at least 3 characters').max(150),
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase kebab-case'),
  description: z.string().trim().max(2000).optional(),
  status: z.enum(eventStatusValues).optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
});

export const updateEventSchema = createEventSchema.partial();

export const moderationActionSchema = z.object({
  id: objectId,
});

export type ShowcaseQuery = z.infer<typeof showcaseQuerySchema>;
export type ModerationQuery = z.infer<typeof moderationQuerySchema>;
export type EventQuery = z.infer<typeof eventQuerySchema>;
export type CreateEventInput = z.infer<typeof createEventSchema>;
