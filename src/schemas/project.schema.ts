import { z } from 'zod';
import { optionalJsonArray, optionalString } from './coerce.js';

const urlOrEmpty = z.union([z.string().url('Must be a valid URL'), z.literal('')]).optional();

const categoryList = z.preprocess(
  optionalJsonArray,
  z.array(z.string().trim().min(1).max(50)).min(1, 'At least one category is required').max(10, 'At most 10 categories'),
);

const techStackList = z.preprocess(
  optionalJsonArray,
  z.array(z.string().trim().min(1).max(50)).min(1, 'At least one tech stack entry is required').max(20, 'At most 20 tech stack entries'),
);

export const createProjectSchema = z.object({
  title: z.string().trim().min(3, 'Title must be at least 3 characters').max(200, 'Title is too long'),
  description: z.string().trim().min(20, 'Description must be at least 20 characters').max(5000, 'Description is too long'),
  demoUrl: urlOrEmpty,
  repoUrl: urlOrEmpty,
  categories: categoryList,
  techStack: techStackList,
  eventId: z.preprocess(optionalString, z.string().trim().optional()),
});

export const updateProjectSchema = createProjectSchema.partial();

export const projectIdSchema = z.object({
  id: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid project id'),
});

export const eventIdSchema = z.object({
  id: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid event id'),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
