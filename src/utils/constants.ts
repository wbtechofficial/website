export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const PROJECT_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const;

export type ProjectStatus = (typeof PROJECT_STATUS)[keyof typeof PROJECT_STATUS];

export const EVENT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const;

export type EventStatus = (typeof EVENT_STATUS)[keyof typeof EVENT_STATUS];

export const PROJECT_SOURCE = {
  PUBLIC: 'public',
  AUTHENTICATED: 'authenticated',
} as const;

export type ProjectSource = (typeof PROJECT_SOURCE)[keyof typeof PROJECT_SOURCE];

export const SUBMISSION_PHASE = {
  RECEIVED: 'received',
  UNDER_REVIEW: 'under_review',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const;

export type SubmissionPhase = (typeof SUBMISSION_PHASE)[keyof typeof SUBMISSION_PHASE];

export const USER_ROLE = {
  USER: 'user',
  ADMIN: 'admin',
} as const;

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export const SHOWCASE_SORT = {
  TOP: 'top',
  NEWEST: 'newest',
} as const;

export type ShowcaseSort = (typeof SHOWCASE_SORT)[keyof typeof SHOWCASE_SORT];

export const MAX_THUMBNAIL_SIZE_BYTES = 5 * 1024 * 1024;
export const ALLOWED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'] as const;
