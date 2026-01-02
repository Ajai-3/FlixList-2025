export const getRatingColor = (rating: number): string => {
    if (rating >= 8) {
      return "text-green-500";
    } else if (rating >= 6) {
      return "text-yellow-500";
    } else if (rating >= 4) {
      return "text-orange-500";
    } else {
      return "text-red-500";
    }
  };
  