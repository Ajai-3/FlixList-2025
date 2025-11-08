import { createLimit } from '../createLimit';

export const authLimitConfig = createLimit({
  windowMin: 15,
  max: 5,
  message: 'Too many auth attempts.',
  keyGen: (req) => `auth:${req.ip}:${req.body.email ?? 'anon'}`,
});