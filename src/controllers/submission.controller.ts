import type { Request, Response } from 'express';
import { createPublicSubmission, findExistingSubmission, getSubmissionStatus, resolveEventId } from '../services/submission.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { HTTP_STATUS } from '../utils/constants.js';
import { withThumbnail } from '../utils/thumbnailUpload.js';
import type { CreateSubmissionInput } from '../schemas/submission.schema.js';

export const createSubmissionController = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Thumbnail image is required');
  }

  const input = req.body as CreateSubmissionInput;
  await resolveEventId(input.eventId);
  const existing = await findExistingSubmission(input);
  if (existing) {
    res.status(HTTP_STATUS.OK).json(new ApiResponse(existing.message, existing));
    return;
  }

  const result = await withThumbnail(req.file, (asset) =>
    createPublicSubmission(
      { ...input, demoUrl: input.demoUrl || undefined, repoUrl: input.repoUrl || undefined },
      asset,
    ),
  );

  res.status(HTTP_STATUS.CREATED).json(new ApiResponse(result.message, result));
});

export const getSubmissionStatusController = asyncHandler(async (req: Request, res: Response) => {
  const { referenceCode } = req.query as { referenceCode: string };
  const result = await getSubmissionStatus(referenceCode);
  res.status(HTTP_STATUS.OK).json(new ApiResponse('Submission status fetched', result));
});
