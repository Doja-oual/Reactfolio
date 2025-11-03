import { useQuery } from '@apollo/client';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { GET_PROJET } from '@/services/queries';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { ArrowLeft, Calendar, ExternalLink, Github, Tag } from 'lucide-react';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_PROJET, {
    variables: { id },
  });

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
          <Link to="/projects" className="mt-4 inline-block text-purple-600 hover:text-purple-700">
            Retour aux projets
          </Link>
        </div>
      </div>
    );
  }

  const projet = data?.getProjet;

  if (!projet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Projet non trouvé</h2>
          <Link to="/projects" className="mt-4 inline-block text-purple-600 hover:text-purple-700">
            Retour aux projets
          </Link>
        </div>
      </div>
    );
  }

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
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Retour
        </button>

        {/* Project Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          {/* Image Gallery */}
          {projet.images && projet.images.length > 0 && (
            <div className="h-96 bg-gradient-to-br from-purple-500 to-blue-500 relative">
              <img
                src={projet.images[0]}
                alt={projet.titre}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {projet.titre}
                </h1>
                <div className="flex items-center gap-4">
                  <span className={`px-4 py-1 rounded-full text-sm font-medium ${getStatutBadgeColor(projet.statut)}`}>
                    {getStatutLabel(projet.statut)}
                  </span>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>
                      {new Date(projet.dateDebut).toLocaleDateString('fr-FR', {
                        month: 'long',
                        year: 'numeric'
                      })}
                      {projet.dateFin && ` - ${new Date(projet.dateFin).toLocaleDateString('fr-FR', {
                        month: 'long',
                        year: 'numeric'
                      })}`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-4">
                {projet.lienGithub && (
                  <a
                    href={projet.lienGithub}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    Code
                  </a>
                )}
                {projet.lienDemo && (
                  <a
                    href={projet.lienDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Demo
                  </a>
                )}
              </div>
            </div>

            {/* Short Description */}
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              {projet.description}
            </p>

            {/* Long Description */}
            {projet.descriptionLongue && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">À propos du projet</h2>
                <div className="prose prose-lg max-w-none text-gray-700">
                  {projet.descriptionLongue.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies */}
            {projet.technologies && projet.technologies.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Tag className="w-6 h-6 mr-2" />
                  Technologies utilisées
                </h2>
                <div className="flex flex-wrap gap-3">
                  {projet.technologies.map((tech) => (
                    <div
                      key={tech.id}
                      className="px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-lg text-sm font-medium border border-purple-200"
                    >
                      {tech.nom}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Images */}
        {projet.images && projet.images.length > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {projet.images.slice(1).map((image, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img
                  src={image}
                  alt={`${projet.titre} - Image ${index + 2}`}
                  className="w-full h-64 object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
