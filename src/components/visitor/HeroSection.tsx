import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
          alt="Plage méditerranéenne de Nador"
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center text-white">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6 drop-shadow-lg">
          Découvrez la Perle de la Méditerranée
        </h1>
        <p className="mx-auto max-w-2xl text-lg sm:text-xl text-white/90 mb-8 leading-relaxed">
          Nador vous accueille avec ses plages dorées, sa lagune majestueuse, ses
          montagnes verdoyantes et la chaleur de la culture rifaine.
        </p>
        <Link
          to="/places"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
        >
          Explorer les Lieux
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
