import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

export default function NotFoundPage() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" aria-hidden="true" />
        <h1 className="text-6xl font-extrabold text-gray-200 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Page introuvable
        </h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          Retour à l'accueil
        </Link>
      </div>
    </main>
  );
}
