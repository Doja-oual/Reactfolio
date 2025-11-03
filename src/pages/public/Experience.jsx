import { useQuery } from '@apollo/client';
import { GET_EXPERIENCES } from '@/services/queries';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

const Experience = () => {
  const { data, loading, error } = useQuery(GET_EXPERIENCES);

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

  const experiences = data?.getExperiences || [];

  const getTypeLabel = (type) => {
    switch (type) {
      case 'CDI':
        return 'CDI';
      case 'CDD':
        return 'CDD';
      case 'FREELANCE':
        return 'Freelance';
      case 'STAGE':
        return 'Stage';
      case 'ALTERNANCE':
        return 'Alternance';
      default:
        return type;
    }
  };

  const getTypeBadgeColor = (type) => {
    switch (type) {
      case 'CDI':
        return 'bg-green-100 text-green-800';
      case 'CDD':
        return 'bg-blue-100 text-blue-800';
      case 'FREELANCE':
        return 'bg-purple-100 text-purple-800';
      case 'STAGE':
        return 'bg-orange-100 text-orange-800';
      case 'ALTERNANCE':
        return 'bg-cyan-100 text-cyan-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Mon Parcours
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez mon expérience professionnelle et mes réalisations
          </p>
        </div>

        {experiences.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Aucune expérience disponible pour le moment.</p>
          </div>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-200 to-blue-200"></div>

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div key={exp.id} className="relative pl-20">
                  {/* Timeline dot */}
                  <div className="absolute left-6 w-5 h-5 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full border-4 border-white shadow-lg"></div>

                  <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Briefcase className="w-6 h-6 text-purple-600" />
                          <h3 className="text-2xl font-bold text-gray-900">{exp.poste}</h3>
                        </div>
                        <h4 className="text-xl text-purple-600 font-semibold mb-2">
                          {exp.entreprise}
                        </h4>
                      </div>
                      <span className={`px-4 py-2 rounded-full text-sm font-medium ${getTypeBadgeColor(exp.type)}`}>
                        {getTypeLabel(exp.type)}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>
                          {formatDate(exp.dateDebut)} - {exp.enCours ? 'Présent' : formatDate(exp.dateFin)}
                        </span>
                      </div>
                      {exp.lieu && (
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{exp.lieu}</span>
                        </div>
                      )}
                      {exp.enCours && (
                        <div className="flex items-center text-green-600">
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          <span className="font-medium">En cours</span>
                        </div>
                      )}
                    </div>

                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {exp.description}
                    </p>

                    {exp.competences && exp.competences.length > 0 && (
                      <div>
                        <h5 className="text-sm font-semibold text-gray-900 mb-3">Compétences utilisées</h5>
                        <div className="flex flex-wrap gap-2">
                          {exp.competences.map((comp) => (
                            <span
                              key={comp.id}
                              className="px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-full text-sm font-medium"
                            >
                              {comp.nom}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Experience;
