import { Request } from "express";

//# ============================================================================
//# SESSION
//# ============================================================================
export const sessionLimit = {
  windowMin: 1,
  max: 15,
  message: 'Too many refresh attempts.',
  keyGen: (req: Request) => `user:login:${req.ip}:${req.body?.email ?? 'anon'}`
};
