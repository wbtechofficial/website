import { Router } from 'express';
import {
  createEventController,
  listActiveEventsController,
  listAllEventsController,
  updateEventController,
} from '../../controllers/event.controller.js';
import { authorizeAdmin, authenticate } from '../../middleware/auth.middleware.js';
import { adminLimiter, readLimiter } from '../../middleware/rateLimit.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import { createEventSchema, eventQuerySchema, updateEventSchema } from '../../schemas/showcase.schema.js';

const router = Router();

router.get('/active', readLimiter, listActiveEventsController);
router.get('/', adminLimiter, authenticate, authorizeAdmin, validate(eventQuerySchema, 'query'), listAllEventsController);
router.post('/', adminLimiter, authenticate, authorizeAdmin, validate(createEventSchema), createEventController);
router.patch('/:id', adminLimiter, authenticate, authorizeAdmin, validate(updateEventSchema), updateEventController);

export default router;
