import { Project } from '../models/Project.js';
import type { StoredAsset } from './r2.service.js';
import { getEventOrThrow } from './event.service.js';
import { deleteThumbnail } from './r2.service.js';
import { createTrackingReference } from './reference.service.js';
import { ApiError } from '../utils/ApiError.js';
import {
  HTTP_STATUS,
  PROJECT_SOURCE,
  PROJECT_STATUS,
  SUBMISSION_PHASE,
  type SubmissionPhase,
} from '../utils/constants.js';

export interface PublicSubmissionInput {
  speakerEmail: string;
  eventId?: string;
  title: string;
  description: string;
  demoUrl?: string;
  repoUrl?: string;
  categories: string[];
  techStack: string[];
}

export interface PublicSubmissionResult {
  referenceCode: string;
  phase: SubmissionPhase;
  message: string;
}

interface StatusMeta {
  title: string;
  categories: string[];
  techStack: string[];
  eventId?: string;
  thumbnailUrl: string;
  submittedAt: Date;
}

interface SubmissionStatusResult {
  referenceCode: string;
  phase: SubmissionPhase;
  submittedAt: Date;
  meta?: StatusMeta;
}

const PHASE_BY_STATUS: Record<string, SubmissionPhase> = {
  [PROJECT_STATUS.PENDING]: SUBMISSION_PHASE.UNDER_REVIEW,
  [PROJECT_STATUS.APPROVED]: SUBMISSION_PHASE.APPROVED,
  [PROJECT_STATUS.REJECTED]: SUBMISSION_PHASE.REJECTED,
};

function toPhase(status: string): SubmissionPhase {
  return PHASE_BY_STATUS[status] ?? SUBMISSION_PHASE.RECEIVED;
}

export async function resolveEventId(eventId?: string): Promise<string | undefined> {
  if (!eventId) {
    return undefined;
  }
  const event = await getEventOrThrow(eventId, true);
  return String(event._id);
}

export async function findExistingSubmission(input: Pick<PublicSubmissionInput, 'eventId' | 'speakerEmail' | 'title'>): Promise<PublicSubmissionResult | null> {
  const referenceCode = createTrackingReference(input.eventId ?? null, input.speakerEmail, input.title);
  const existing = await Project.findOne({ referenceCode }).lean();

  if (!existing) {
    return null;
  }

  return {
    referenceCode: existing.referenceCode,
    phase: toPhase(existing.status),
    message: 'A submission with these details already exists. Use the reference code to track its status.',
  };
}

export async function createPublicSubmission(input: PublicSubmissionInput, thumbnail: StoredAsset): Promise<PublicSubmissionResult> {
  const eventId = input.eventId ? await getEventOrThrow(input.eventId, true).then((event) => String(event._id)) : undefined;
  const referenceCode = createTrackingReference(input.eventId ?? null, input.speakerEmail, input.title);

  try {
    const project = await Project.create({
      title: input.title,
      description: input.description,
      demoUrl: input.demoUrl || undefined,
      repoUrl: input.repoUrl || undefined,
      categories: input.categories,
      techStack: input.techStack,
      event: eventId,
      speakerEmail: input.speakerEmail.toLowerCase(),
      thumbnail,
      status: PROJECT_STATUS.PENDING,
      source: PROJECT_SOURCE.PUBLIC,
      referenceCode,
    });

    return {
      referenceCode: project.referenceCode,
      phase: SUBMISSION_PHASE.UNDER_REVIEW,
      message: 'Submission received. Keep this reference code to track its status.',
    };
  } catch (error) {
    const existingOnRace = await Project.findOne({ referenceCode }).lean();
    if (existingOnRace) {
      void deleteThumbnail(thumbnail.key).catch((deleteError) => {
        console.error('[r2] Failed to remove duplicate thumbnail', deleteError);
      });
      return {
        referenceCode: existingOnRace.referenceCode,
        phase: toPhase(existingOnRace.status),
        message: 'A submission with these details already exists. Use the reference code to track its status.',
      };
    }

    console.error('[submission] Failed to persist submission, removing uploaded asset', error);
    void deleteThumbnail(thumbnail.key).catch((deleteError) => {
      console.error('[r2] Failed to remove orphaned thumbnail', deleteError);
    });
    throw new ApiError(HTTP_STATUS.INTERNAL_SERVER_ERROR, 'Failed to create submission');
  }
}

export async function getSubmissionStatus(referenceCode: string): Promise<SubmissionStatusResult> {
  const project = await Project.findOne({ referenceCode: referenceCode.toUpperCase() }).lean();

  if (!project) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'No submission found for this reference code');
  }

  const result: SubmissionStatusResult = {
    referenceCode: project.referenceCode,
    phase: toPhase(project.status),
    submittedAt: project.createdAt,
  };

  if (project.thumbnail) {
    result.meta = {
      title: project.title,
      categories: project.categories,
      techStack: project.techStack,
      eventId: project.event ? String(project.event) : undefined,
      thumbnailUrl: project.thumbnail.url,
      submittedAt: project.createdAt,
    };
  }

  return result;
}
