import HeroSection from "../../components/visitor/HeroSection";
import CategoryGrid from "../../components/visitor/CategoryGrid";
import NewsletterForm from "../../components/visitor/NewsletterForm";

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <HeroSection />

      {/* Category grid */}
      <CategoryGrid />

      {/* About Nador */}
      <section className="py-16 bg-gradient-to-b from-sand/40 to-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            À propos de Nador
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Nichée sur la côte méditerranéenne du Maroc, Nador est une ville
              qui séduit par la diversité de ses paysages et la richesse de son
              patrimoine culturel. La <strong>lagune de Marchica</strong>,
              véritable joyau naturel, offre un spectacle unique où les eaux
              turquoise rencontrent un ciel d'un bleu immaculé.
            </p>
            <p>
              Les amateurs de plages trouveront leur bonheur à{" "}
              <strong>Charrana</strong> et <strong>Boukana</strong>, où le sable
              fin et les eaux cristallines invitent à la détente. Pour les
              passionnés de nature, le <strong>Mont Gourougou</strong> domine
              majestueusement la région et offre des randonnées inoubliables
              avec des panoramas à couper le souffle.
            </p>
            <p>
              La culture <strong>rifaine</strong> se vit au quotidien dans les
              souks colorés, les cafés traditionnels et la gastronomie locale.
              Nador est une destination qui allie authenticité et modernité, où
              chaque visiteur trouve sa propre aventure méditerranéenne.
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-primary to-blue-700">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">
            Restez Informé
          </h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Inscrivez-vous à notre newsletter pour recevoir les dernières
            actualités, événements et bons plans touristiques de Nador.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </main>
  );
}
