import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_SKILLS_BY_CATEGORY } from '@/services/queries';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const Skills = () => {
  const { loading, error, data } = useQuery(GET_SKILLS_BY_CATEGORY);

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

  const skillsByCategory = data?.skillsByCategory || [];

  const getLevelWidth = (level) => {
    const levels = {
      Débutant: '25%',
      Intermédiaire: '50%',
      Avancé: '75%',
      Expert: '100%',
    };
    return levels[level] || '50%';
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
              <Link to="/skills" className="text-primary-600 font-medium">
                Compétences
              </Link>
              <Link to="/experience" className="text-gray-700 hover:text-primary-600 transition">
                Expérience
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mes Compétences</h1>
          <p className="text-xl text-gray-600">
            Technologies et outils que je maîtrise
          </p>
        </div>

        {skillsByCategory.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Aucune compétence disponible pour le moment.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {skillsByCategory.map((category, catIndex) => (
              <div key={catIndex} className="bg-white rounded-xl shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {category.category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.skills.map((skill) => (
                    <div key={skill.id}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-gray-900">{skill.name}</span>
                        <span className="text-sm text-gray-600">{skill.level}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-primary-600 h-3 rounded-full transition-all duration-500"
                          style={{ width: getLevelWidth(skill.level) }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Skills;