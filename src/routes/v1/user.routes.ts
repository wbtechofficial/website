import { Router } from 'express';
import { myProjectsController } from '../../controllers/user.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';
import { readLimiter } from '../../middleware/rateLimit.middleware.js';

const router = Router();

router.get('/me/projects', readLimiter, authenticate, myProjectsController);

export default router;
