import { Link } from "react-router-dom";
import type { Place } from "../../types";
import { getCategoryColor, truncateText } from "../../utils/helpers";

interface PlaceCardProps {
  place: Place;
}

export default function PlaceCard({ place }: PlaceCardProps) {
  return (
    <Link
      to={`/places/${place.id}`}
      className="group block rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      aria-label={`Voir les détails de ${place.name}`}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={place.images[0]}
          alt={place.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Category badge */}
        <span
          className={`absolute top-3 left-3 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium text-white ${getCategoryColor(place.category)}`}
        >
          {place.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors mb-2 line-clamp-1">
          {place.name}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
          {truncateText(place.shortDescription, 150)}
        </p>
      </div>
    </Link>
  );
}
