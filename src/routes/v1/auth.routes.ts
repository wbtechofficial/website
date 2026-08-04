import { Router } from 'express';
import { login, register } from '../../controllers/auth.controller.js';
import { authLimiter } from '../../middleware/rateLimit.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import { loginSchema, registerSchema } from '../../schemas/auth.schema.js';

const router = Router();

router.post('/register', authLimiter, validate(registerSchema), register);
router.post('/login', authLimiter, validate(loginSchema), login);

export default router;
