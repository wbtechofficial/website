import { Router } from 'express';
import authRoutes from './auth.routes.js';
import eventRoutes from './event.routes.js';
import projectRoutes from './project.routes.js';
import showcaseRoutes from './showcase.routes.js';
import submissionRoutes from './submission.routes.js';
import upvoteRoutes from './upvote.routes.js';
import userRoutes from './user.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/events', eventRoutes);
router.use('/projects', projectRoutes);
router.use('/showcase', showcaseRoutes);
router.use('/submissions', submissionRoutes);
router.use('/upvotes', upvoteRoutes);
router.use('/users', userRoutes);

export default router;
