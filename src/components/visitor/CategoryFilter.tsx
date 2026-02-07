import { Category } from "../../types";
import { CATEGORY_META } from "../../utils/constants";

interface CategoryFilterProps {
  selected: Category[];
  onChange: (categories: Category[]) => void;
}

const allCategories = Object.values(Category);

export default function CategoryFilter({
  selected,
  onChange,
}: CategoryFilterProps) {
  const toggle = (cat: Category) => {
    if (selected.includes(cat)) {
      onChange(selected.filter((c) => c !== cat));
    } else {
      onChange([...selected, cat]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer par catégorie">
      {allCategories.map((cat) => {
        const isActive = selected.includes(cat);
        const meta = CATEGORY_META[cat];
        return (
          <button
            key={cat}
            onClick={() => toggle(cat)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 border focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 ${
              isActive
                ? "bg-primary text-white border-primary shadow-sm"
                : "bg-white text-gray-600 border-gray-200 hover:border-primary/40 hover:text-primary"
            }`}
            aria-pressed={isActive}
            aria-label={`Filtrer par ${cat}`}
          >
            <span aria-hidden="true">{meta.icon}</span>
            {cat}
          </button>
        );
      })}
    </div>
  );
}
