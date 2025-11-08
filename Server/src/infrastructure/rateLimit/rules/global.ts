import { createLimit } from '../createLimit';

export const globalLimit = createLimit({
  windowMin: 15,
  max: 100,
  message: 'Too many requests from this IP.',
});