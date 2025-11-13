export function getDeviceType(userAgent: string): "desktop" | "mobile" | "tablet" | "unknown" {
  if (/mobile|android|iphone|ipad|phone/i.test(userAgent)) return "mobile";
  if (/tablet|ipad/i.test(userAgent)) return "tablet";
  if (/windows|macintosh|linux/i.test(userAgent)) return "desktop";
  return "unknown";
}
