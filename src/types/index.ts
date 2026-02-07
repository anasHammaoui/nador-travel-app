/** Categories of places in Nador */
export const Category = {
  BEACHES: "Plages",
  NATURAL_SITES: "Sites naturels",
  MONUMENTS: "Monuments et patrimoine",
  MUSEUMS: "Musées et culture",
  RESTAURANTS: "Restaurants",
  HOTELS: "Hôtels et hébergements",
  CAFES: "Cafés et salons de thé",
  SHOPPING: "Shopping et souks",
  ENTERTAINMENT: "Loisirs et divertissements",
} as const;

export type Category = (typeof Category)[keyof typeof Category];

/** Transportation options */
export const Transportation = {
  BUS: "Bus",
  TAXI: "Taxi",
  CAR: "Voiture",
  WALKING: "À pied",
  BIKE: "Vélo",
} as const;

export type Transportation = (typeof Transportation)[keyof typeof Transportation];

/** Weekly schedule */
export interface Schedule {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
}

/** Main Place entity */
export interface Place {
  id: string;
  name: string;
  category: Category;
  description: string;
  shortDescription: string;
  images: string[];
  schedule?: Schedule;
  prices?: string;
  address?: string;
  transportation?: Transportation[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Newsletter subscription payload */
export interface NewsletterSubscription {
  email: string;
  firstName: string;
}

/** API response for newsletter */
export interface NewsletterResponse {
  success: boolean;
  message: string;
}
