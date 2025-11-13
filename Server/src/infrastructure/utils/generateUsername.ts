export function generateUsername(name: string) {
  const sanitized = name.toLowerCase().replace(/\s+/g, "");
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${sanitized}_${random}`;
}
