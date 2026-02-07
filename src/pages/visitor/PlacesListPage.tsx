import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  fetchPlaces,
  setSearchQuery,
  setSelectedCategories,
  setCurrentPage,
  resetFilters,
} from "../../store/slices/placesSlice";
import type { Category } from "../../types";
import { DEBOUNCE_DELAY } from "../../utils/constants";
import { useDebounce } from "../../utils/helpers";
import { scrollToTop } from "../../utils/helpers";
import PlaceCard from "../../components/visitor/PlaceCard";
import SearchBar from "../../components/visitor/SearchBar";
import CategoryFilter from "../../components/visitor/CategoryFilter";
import Pagination from "../../components/visitor/Pagination";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";
import { SlidersHorizontal, SearchX } from "lucide-react";

export default function PlacesListPage() {
  const dispatch = useAppDispatch();
  const {
    filteredPlaces,
    loading,
    error,
    searchQuery,
    selectedCategories,
    currentPage,
    itemsPerPage,
  } = useAppSelector((s) => s.places);

  const [localSearch, setLocalSearch] = useState(searchQuery);
  const debouncedSearch = useDebounce(localSearch, DEBOUNCE_DELAY);

  // Fetch places on mount
  useEffect(() => {
    dispatch(fetchPlaces());
  }, [dispatch]);

  // Sync debounced search to Redux
  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredPlaces.length / itemsPerPage);
  const paginatedPlaces = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPlaces.slice(start, start + itemsPerPage);
  }, [filteredPlaces, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    scrollToTop();
  };

  const handleCategoryChange = (cats: Category[]) => {
    dispatch(setSelectedCategories(cats));
  };

  const handleReset = () => {
    setLocalSearch("");
    dispatch(resetFilters());
  };

  const hasFilters = searchQuery.length > 0 || selectedCategories.length > 0;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Découvrez Nador
          </h1>
          <p className="mt-1 text-gray-500">
            {filteredPlaces.length} lieu{filteredPlaces.length !== 1 && "x"}{" "}
            trouvé{filteredPlaces.length !== 1 && "s"}
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4 rounded-xl bg-white p-5 border border-gray-100 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center gap-2 text-gray-700 font-medium text-sm">
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
              Filtres
            </div>
            <div className="flex-1 w-full">
              <SearchBar value={localSearch} onChange={setLocalSearch} />
            </div>
            {hasFilters && (
              <button
                onClick={handleReset}
                className="whitespace-nowrap text-sm text-primary hover:text-blue-700 font-medium transition-colors"
              >
                Réinitialiser les filtres
              </button>
            )}
          </div>
          <CategoryFilter
            selected={selectedCategories}
            onChange={handleCategoryChange}
          />
        </div>

        {/* Content */}
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage
            message="Impossible de se connecter au serveur. Veuillez réessayer."
            onRetry={() => dispatch(fetchPlaces())}
          />
        ) : paginatedPlaces.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <SearchX className="h-16 w-16 text-gray-300 mb-4" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Aucun lieu ne correspond à vos critères
            </h2>
            <p className="text-gray-400 mb-6 max-w-md">
              Essayez de modifier votre recherche ou de réinitialiser les
              filtres pour voir plus de résultats.
            </p>
            {hasFilters && (
              <button
                onClick={handleReset}
                className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
              >
                Réinitialiser les filtres
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedPlaces.map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </main>
  );
}
