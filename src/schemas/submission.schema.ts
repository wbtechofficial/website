import { z } from 'zod';
import { optionalJsonArray, optionalString } from './coerce.js';
import { MAX_THUMBNAIL_SIZE_BYTES } from '../utils/constants.js';

export const createSubmissionSchema = z.object({
  speakerEmail: z.string().trim().email('Invalid email address'),
  eventId: z.preprocess(optionalString, z.string().regex(/^[a-f\d]{24}$/i, 'Invalid event id').optional()),
  title: z.string().trim().min(3, 'Title must be at least 3 characters').max(200, 'Title is too long'),
  description: z.string().trim().min(20, 'Description must be at least 20 characters').max(5000, 'Description is too long'),
  demoUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  repoUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  categories: z.preprocess(
    optionalJsonArray,
    z.array(z.string().trim().min(1).max(50)).min(1, 'At least one category is required').max(10, 'At most 10 categories'),
  ),
  techStack: z.preprocess(
    optionalJsonArray,
    z.array(z.string().trim().min(1).max(50)).min(1, 'At least one tech stack entry is required').max(20, 'At most 20 tech stack entries'),
  ),
});

export const submissionStatusQuerySchema = z.object({
  referenceCode: z
    .string()
    .trim()
    .min(8, 'Reference code is too short')
    .max(16, 'Reference code is too long')
    .regex(/^[A-Z0-9]+$/i, 'Invalid reference code format'),
});

export type CreateSubmissionInput = z.infer<typeof createSubmissionSchema>;

export const MAX_THUMBNAIL = MAX_THUMBNAIL_SIZE_BYTES;
