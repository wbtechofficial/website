import { Router } from 'express';
import {
  createProjectController,
  deleteProjectController,
  getProjectController,
  getRelatedProjectsController,
  updateProjectController,
} from '../../controllers/project.controller.js';
import { authenticate, optionalAuthenticate } from '../../middleware/auth.middleware.js';
import { uploadThumbnail } from '../../middleware/error.middleware.js';
import { projectWriteLimiter, readLimiter } from '../../middleware/rateLimit.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import { createProjectSchema, projectIdSchema, updateProjectSchema } from '../../schemas/project.schema.js';

const router = Router();

router.post('/', projectWriteLimiter, authenticate, uploadThumbnail.single('thumbnail'), validate(createProjectSchema), createProjectController);

router.get('/:id', readLimiter, optionalAuthenticate, validate(projectIdSchema, 'params'), getProjectController);
router.get('/:id/related', readLimiter, validate(projectIdSchema, 'params'), getRelatedProjectsController);

router.put('/:id', projectWriteLimiter, authenticate, uploadThumbnail.single('thumbnail'), validate(updateProjectSchema), updateProjectController);
router.delete('/:id', projectWriteLimiter, authenticate, validate(projectIdSchema, 'params'), deleteProjectController);

export default router;
