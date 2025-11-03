import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_PROJETS } from '@/services/queries';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Calendar, ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const { data, loading, error } = useQuery(GET_PROJETS);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Erreur de chargement</h2>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  const projets = data?.getProjets || [];

  const getStatutBadgeColor = (statut) => {
    switch (statut) {
      case 'EN_COURS':
        return 'bg-blue-100 text-blue-800';
      case 'TERMINE':
        return 'bg-green-100 text-green-800';
      case 'ARCHIVE':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatutLabel = (statut) => {
    switch (statut) {
      case 'EN_COURS':
        return 'En cours';
      case 'TERMINE':
        return 'Terminé';
      case 'ARCHIVE':
        return 'Archivé';
      default:
        return statut;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Mes Projets
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les projets sur lesquels j'ai travaillé
          </p>
        </div>

        {projets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Aucun projet disponible pour le moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projets.map((projet) => (
              <Link
                key={projet.id}
                to={`/projects/${projet.id}`}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Project Image */}
                <div className="h-48 bg-gradient-to-br from-purple-500 to-blue-500 relative overflow-hidden">
                  {projet.images && projet.images.length > 0 ? (
                    <img
                      src={projet.images[0]}
                      alt={projet.titre}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <span className="text-white text-2xl font-bold opacity-50">
                        {projet.titre.charAt(0)}
                      </span>
                    </div>
                  )}
                  
                  {/* Statut Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatutBadgeColor(projet.statut)}`}>
                      {getStatutLabel(projet.statut)}
                    </span>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {projet.titre}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {projet.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {projet.technologies?.slice(0, 3).map((tech) => (
                      <span
                        key={tech.id}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                      >
                        {tech.nom}
                      </span>
                    ))}
                    {projet.technologies?.length > 3 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                        +{projet.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Date */}
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(projet.dateDebut).toLocaleDateString('fr-FR', {
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    {projet.lienGithub && (
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(projet.lienGithub, '_blank');
                        }}
                        className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        <Github className="w-5 h-5 mr-1" />
                        Code
                      </div>
                    )}
                    {projet.lienDemo && (
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(projet.lienDemo, '_blank');
                        }}
                        className="flex items-center text-purple-600 hover:text-purple-700 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5 mr-1" />
                        Demo
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Projects;
