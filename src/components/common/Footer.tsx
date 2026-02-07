import { Link } from "react-router-dom";
import { MapPin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-secondary" aria-hidden="true" />
              <h3 className="text-white font-bold text-lg">Nador Tourism</h3>
            </div>
            <p className="text-sm leading-relaxed">
              Nador, la perle de la Méditerranée, vous invite à découvrir ses
              plages dorées, sa lagune majestueuse de Marchica, le Mont
              Gourougou et la richesse de la culture rifaine.
            </p>
          </div>

          {/* Column 2: Quick links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm hover:text-white transition-colors"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  to="/places"
                  className="text-sm hover:text-white transition-colors"
                >
                  Découvrir Nador
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact</h3>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-secondary" aria-hidden="true" />
              <span>contact@nador-tourism.ma</span>
            </div>
            <p className="text-sm mt-3">
              Nador, Région de l'Oriental, Maroc
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-gray-700 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Guide Touristique Nador. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
