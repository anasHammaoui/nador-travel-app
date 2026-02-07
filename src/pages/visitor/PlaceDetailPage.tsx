import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Tag, Bus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchPlace } from "../../store/slices/placesSlice";
import { getCategoryColor } from "../../utils/helpers";
import { FRENCH_DAYS, TRANSPORT_ICONS } from "../../utils/constants";
import PhotoGallery from "../../components/visitor/PhotoGallery";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";

export default function PlaceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { selectedPlace: place, loading, error } = useAppSelector(
    (s) => s.places
  );

  useEffect(() => {
    if (id) dispatch(fetchPlace(id));
  }, [id, dispatch]);

  if (loading) return <LoadingSpinner message="Chargement du lieu..." />;

  if (error || !place) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <ErrorMessage
            message={
              error === "Request failed with status code 404" || !place
                ? "Ce lieu n'existe pas ou n'est plus disponible."
                : "Une erreur est survenue. Veuillez réessayer."
            }
            onRetry={id ? () => dispatch(fetchPlace(id)) : undefined}
          />
          <div className="text-center mt-4">
            <Link
              to="/places"
              className="inline-flex items-center gap-2 text-primary hover:text-blue-700 font-medium transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour à la liste
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const dayKeys = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ] as const;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <Link
          to="/places"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary font-medium mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour à la liste
        </Link>

        {/* Photo Gallery */}
        <PhotoGallery images={place.images} placeName={place.name} />

        {/* Title & badge */}
        <div className="mt-6 mb-8">
          <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-medium text-white ${getCategoryColor(place.category)} mb-3`}
          >
            {place.category}
          </span>
          <h1 className="text-3xl font-bold text-gray-900">{place.name}</h1>
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Description
          </h2>
          <div className="text-gray-600 leading-relaxed whitespace-pre-line">
            {place.description}
          </div>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Schedule */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-primary" aria-hidden="true" />
              <h2 className="text-lg font-semibold text-gray-900">
                Horaires d'ouverture
              </h2>
            </div>
            {place.schedule ? (
              <table className="w-full text-sm">
                <tbody>
                  {dayKeys.map((day) => (
                    <tr key={day} className="border-b border-gray-50 last:border-0">
                      <td className="py-2 font-medium text-gray-700">
                        {FRENCH_DAYS[day]}
                      </td>
                      <td className="py-2 text-gray-500 text-right">
                        {place.schedule?.[day] || "Fermé"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-400 text-sm">Horaires non renseignés</p>
            )}
          </div>

          {/* Prices & Address & Transport */}
          <div className="space-y-6">
            {/* Prices */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="h-5 w-5 text-primary" aria-hidden="true" />
                <h2 className="text-lg font-semibold text-gray-900">Tarifs</h2>
              </div>
              <p className="text-gray-600 text-sm">
                {place.prices || "Tarifs non renseignés"}
              </p>
            </div>

            {/* Address */}
            {place.address && (
              <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Adresse
                  </h2>
                </div>
                <p className="text-gray-600 text-sm">{place.address}</p>
              </div>
            )}

            {/* Transport */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Bus className="h-5 w-5 text-primary" aria-hidden="true" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Accessibilité
                </h2>
              </div>
              {place.transportation && place.transportation.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {place.transportation.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700"
                    >
                      <span aria-hidden="true">
                        {TRANSPORT_ICONS[t] || "🚏"}
                      </span>
                      {t}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">
                  Informations non disponibles
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
