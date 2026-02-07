import { useNavigate } from "react-router-dom";
import { Category } from "../../types";
import { CATEGORY_META } from "../../utils/constants";
import { useAppDispatch } from "../../store";
import { setSelectedCategories } from "../../store/slices/placesSlice";

const categories = Object.values(Category);

export default function CategoryGrid() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCategoryClick = (category: Category) => {
    dispatch(setSelectedCategories([category]));
    navigate("/places");
  };

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Explorez par Catégorie
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Découvrez les meilleures adresses de Nador, classées par catégorie
            pour faciliter votre exploration.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const meta = CATEGORY_META[cat];
            return (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className="group flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-6 text-left shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label={`Explorer ${cat}`}
              >
                <span
                  className="flex-shrink-0 text-3xl"
                  role="img"
                  aria-hidden="true"
                >
                  {meta.icon}
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    {cat}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {meta.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
