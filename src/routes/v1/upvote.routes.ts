import { Router } from 'express';
import { getUpvoteStateController, toggleUpvoteController } from '../../controllers/upvote.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';
import { upvoteLimiter } from '../../middleware/rateLimit.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import { projectIdSchema } from '../../schemas/project.schema.js';

const router = Router();

router.post('/projects/:id/upvote', authenticate, upvoteLimiter, validate(projectIdSchema, 'params'), toggleUpvoteController);
router.get('/state', authenticate, getUpvoteStateController);

export default router;
