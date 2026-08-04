import { Router } from 'express';
import {
  eventShowcaseController,
  featureProjectController,
  globalShowcaseController,
  moderateProjectController,
  moderationListController,
} from '../../controllers/showcase.controller.js';
import { authorizeAdmin, authenticate, optionalAuthenticate } from '../../middleware/auth.middleware.js';
import { adminLimiter, readLimiter } from '../../middleware/rateLimit.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import { showcaseQuerySchema, moderationQuerySchema } from '../../schemas/showcase.schema.js';

const router = Router();

router.get('/global', readLimiter, optionalAuthenticate, validate(showcaseQuerySchema, 'query'), globalShowcaseController);

router.get('/events/:id', readLimiter, optionalAuthenticate, validate(showcaseQuerySchema, 'query'), eventShowcaseController);

router.get('/moderation', adminLimiter, authenticate, authorizeAdmin, validate(moderationQuerySchema, 'query'), moderationListController);
router.patch('/moderation/:id', adminLimiter, authenticate, authorizeAdmin, moderateProjectController);

router.patch('/:id/feature', adminLimiter, authenticate, authorizeAdmin, featureProjectController);

export default router;
