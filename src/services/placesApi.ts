import type { Place } from "../types";
import api from "./api";

/** Fetch all places from the API */
export async function fetchAllPlaces(): Promise<Place[]> {
  const response = await api.get<Place[]>("/places");
  return response.data;
}

/** Fetch a single place by ID */
export async function fetchPlaceById(id: string): Promise<Place> {
  const response = await api.get<Place>(`/places/${id}`);
  return response.data;
}
