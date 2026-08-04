import { Router } from 'express';
import { createSubmissionController, getSubmissionStatusController } from '../../controllers/submission.controller.js';
import { uploadThumbnail } from '../../middleware/error.middleware.js';
import { statusLookupLimiter, strictLimiter } from '../../middleware/rateLimit.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import { createSubmissionSchema, submissionStatusQuerySchema } from '../../schemas/submission.schema.js';

const router = Router();

router.post(
  '/',
  strictLimiter,
  uploadThumbnail.single('thumbnail'),
  validate(createSubmissionSchema),
  createSubmissionController,
);

router.get('/status', statusLookupLimiter, validate(submissionStatusQuerySchema, 'query'), getSubmissionStatusController);

export default router;
