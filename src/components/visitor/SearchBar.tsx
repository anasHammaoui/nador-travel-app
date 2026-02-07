import { Search, X } from "lucide-react";
import { MIN_SEARCH_LENGTH } from "../../utils/constants";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Rechercher un lieu..."
        aria-label="Rechercher un lieu"
        className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-10 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Effacer la recherche"
        >
          <X className="h-4 w-4" />
        </button>
      )}
      {value.length > 0 && value.length < MIN_SEARCH_LENGTH && (
        <p className="absolute -bottom-5 left-0 text-xs text-gray-400">
          Saisissez au moins {MIN_SEARCH_LENGTH} caractères
        </p>
      )}
    </div>
  );
}
