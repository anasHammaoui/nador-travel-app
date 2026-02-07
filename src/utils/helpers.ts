import { useEffect, useState } from "react";

/**
 * Custom hook to debounce a value.
 * Returns the debounced value after the specified delay.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Truncate text to a maximum length and append ellipsis.
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}

/**
 * Get a CSS class for a category badge color.
 */
export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    Plages: "bg-blue-500",
    "Sites naturels": "bg-green-600",
    "Monuments et patrimoine": "bg-amber-700",
    "Musées et culture": "bg-purple-600",
    Restaurants: "bg-red-500",
    "Hôtels et hébergements": "bg-indigo-500",
    "Cafés et salons de thé": "bg-orange-500",
    "Shopping et souks": "bg-pink-500",
    "Loisirs et divertissements": "bg-teal-500",
  };
  return colors[category] ?? "bg-gray-500";
}

/**
 * Scroll to top of the page smoothly.
 */
export function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
