import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { Place, Category } from "../../types";
import { fetchAllPlaces, fetchPlaceById } from "../../services/placesApi";
import { ITEMS_PER_PAGE, MIN_SEARCH_LENGTH } from "../../utils/constants";

interface PlacesState {
  places: Place[];
  filteredPlaces: Place[];
  selectedPlace: Place | null;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategories: Category[];
  currentPage: number;
  itemsPerPage: number;
}

const initialState: PlacesState = {
  places: [],
  filteredPlaces: [],
  selectedPlace: null,
  loading: false,
  error: null,
  searchQuery: "",
  selectedCategories: [],
  currentPage: 1,
  itemsPerPage: ITEMS_PER_PAGE,
};

/** Fetch all places (only active ones) */
export const fetchPlaces = createAsyncThunk("places/fetchAll", async () => {
  const places = await fetchAllPlaces();
  return places.filter((p) => p.isActive);
});

/** Fetch a single place by ID */
export const fetchPlace = createAsyncThunk(
  "places/fetchOne",
  async (id: string) => {
    const place = await fetchPlaceById(id);
    return place;
  }
);

/** Apply search and category filters to the places array */
function applyFilters(
  places: Place[],
  searchQuery: string,
  selectedCategories: Category[]
): Place[] {
  let result = places;

  // Filter by category
  if (selectedCategories.length > 0) {
    result = result.filter((p) => selectedCategories.includes(p.category));
  }

  // Filter by search query (min 3 chars, case-insensitive, name only)
  if (searchQuery.length >= MIN_SEARCH_LENGTH) {
    const query = searchQuery.toLowerCase();
    result = result.filter((p) => p.name.toLowerCase().includes(query));
  }

  return result;
}

const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      state.currentPage = 1;
      state.filteredPlaces = applyFilters(
        state.places,
        state.searchQuery,
        state.selectedCategories
      );
    },
    setSelectedCategories(state, action: PayloadAction<Category[]>) {
      state.selectedCategories = action.payload;
      state.currentPage = 1;
      state.filteredPlaces = applyFilters(
        state.places,
        state.searchQuery,
        state.selectedCategories
      );
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    resetFilters(state) {
      state.searchQuery = "";
      state.selectedCategories = [];
      state.currentPage = 1;
      state.filteredPlaces = state.places;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all places
      .addCase(fetchPlaces.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlaces.fulfilled, (state, action) => {
        state.loading = false;
        state.places = action.payload;
        state.filteredPlaces = applyFilters(
          action.payload,
          state.searchQuery,
          state.selectedCategories
        );
      })
      .addCase(fetchPlaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Impossible de charger les lieux";
      })
      // Fetch single place
      .addCase(fetchPlace.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedPlace = null;
      })
      .addCase(fetchPlace.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPlace = action.payload;
      })
      .addCase(fetchPlace.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Lieu introuvable";
      });
  },
});

export const {
  setSearchQuery,
  setSelectedCategories,
  setCurrentPage,
  resetFilters,
} = placesSlice.actions;

export default placesSlice.reducer;
