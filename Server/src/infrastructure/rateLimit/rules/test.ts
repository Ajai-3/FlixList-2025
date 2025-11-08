export const testLimitConfig = {
  windowMin: 0.5,
  max: 1,
  message: "TEST 429 - wait 30 s",
  keyGen: (req: any) => `test:${req.ip}`,
};
