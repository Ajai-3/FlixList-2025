export function formatReleaseDate(dateString?: string): string {
    if (!dateString) return "Unknown";
  
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }
  