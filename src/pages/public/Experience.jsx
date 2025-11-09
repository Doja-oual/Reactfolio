import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_EXPERIENCES } from '@/services/queries';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Calendar, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const Experience = () => {
  const { loading, error, data } = useQuery(GET_EXPERIENCES);

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
          <h2 className="text-2xl font-bold text-red-600 mb-4">Erreur</h2>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  const experiences = data?.experiences || [];

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMMM yyyy', { locale: fr });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-primary-600">
              Portfolio
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-primary-600 transition">
                Accueil
              </Link>
              <Link to="/projects" className="text-gray-700 hover:text-primary-600 transition">
                Projets
              </Link>
              <Link to="/skills" className="text-gray-700 hover:text-primary-600 transition">
                Compétences
              </Link>
              <Link to="/experience" className="text-primary-600 font-medium">
                Expérience
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mon Parcours</h1>
          <p className="text-xl text-gray-600">
            Expériences professionnelles et formations
          </p>
        </div>

        {experiences.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Aucune expérience disponible pour le moment.</p>
          </div>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-200"></div>

            <div className="space-y-8">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative pl-20">
                  {/* Timeline dot */}
                  <div className="absolute left-6 top-6 w-4 h-4 bg-primary-600 rounded-full border-4 border-white shadow"></div>

                  <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                        <p className="text-lg text-primary-600 font-medium">{exp.company}</p>
                      </div>
                      {exp.current && (
                        <span className="inline-block mt-2 md:mt-0 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          En cours
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(exp.startDate)} -{' '}
                        {exp.current ? "Aujourd'hui" : formatDate(exp.endDate)}
                      </div>
                      {exp.location && (
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {exp.location}
                        </div>
                      )}
                    </div>

                    <p className="text-gray-700 mb-4 leading-relaxed">{exp.description}</p>

                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Experience;