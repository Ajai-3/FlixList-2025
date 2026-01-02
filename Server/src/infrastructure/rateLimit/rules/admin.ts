import { Request } from "express";

//# ============================================================================
//# ADMIN
//# ============================================================================
export const adminLoginLimit = {
  windowMin: 5,
  max: 5,
  message: 'Too many admin login attempts.',
  keyGen: (req: Request) => `admin:login:${req.ip}:${req.body?.email ?? 'anon'}`
};

export const adminLogoutLimit = {
  windowMin: 5,
  max: 30,
  message: 'Admin logout spam detected.',
  keyGen: (req: Request) => `admin:logout:${req.ip}`
};
