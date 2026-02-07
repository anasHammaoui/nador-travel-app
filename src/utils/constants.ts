import { Category } from "../types";

/** Number of items to display per page */
export const ITEMS_PER_PAGE = 9;

/** Minimum characters to trigger search */
export const MIN_SEARCH_LENGTH = 3;

/** Debounce delay in milliseconds */
export const DEBOUNCE_DELAY = 300;

/** Category display info: icon label and color */
export const CATEGORY_META: Record<
  Category,
  { icon: string; color: string; description: string }
> = {
  [Category.BEACHES]: {
    icon: "🏖️",
    color: "bg-blue-500",
    description: "Découvrez les plus belles plages de Nador",
  },
  [Category.NATURAL_SITES]: {
    icon: "🏔️",
    color: "bg-green-600",
    description: "Explorez les merveilles naturelles de la région",
  },
  [Category.MONUMENTS]: {
    icon: "🏛️",
    color: "bg-amber-700",
    description: "Visitez les monuments historiques et patrimoine",
  },
  [Category.MUSEUMS]: {
    icon: "🎭",
    color: "bg-purple-600",
    description: "Plongez dans la culture et l'art rifain",
  },
  [Category.RESTAURANTS]: {
    icon: "🍽️",
    color: "bg-red-500",
    description: "Savourez la gastronomie locale et méditerranéenne",
  },
  [Category.HOTELS]: {
    icon: "🏨",
    color: "bg-indigo-500",
    description: "Trouvez l'hébergement idéal pour votre séjour",
  },
  [Category.CAFES]: {
    icon: "☕",
    color: "bg-orange-500",
    description: "Détendez-vous dans les cafés et salons de thé",
  },
  [Category.SHOPPING]: {
    icon: "🛍️",
    color: "bg-pink-500",
    description: "Parcourez les souks et boutiques traditionnelles",
  },
  [Category.ENTERTAINMENT]: {
    icon: "🎡",
    color: "bg-teal-500",
    description: "Profitez des activités et loisirs pour tous",
  },
};

/** French day names mapping */
export const FRENCH_DAYS: Record<string, string> = {
  monday: "Lundi",
  tuesday: "Mardi",
  wednesday: "Mercredi",
  thursday: "Jeudi",
  friday: "Vendredi",
  saturday: "Samedi",
  sunday: "Dimanche",
};

/** Transport icons mapping */
export const TRANSPORT_ICONS: Record<string, string> = {
  Bus: "🚌",
  Taxi: "🚕",
  Voiture: "🚗",
  "À pied": "🚶",
  Vélo: "🚲",
};
