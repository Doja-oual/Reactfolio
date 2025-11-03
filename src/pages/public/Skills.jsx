import { useQuery } from '@apollo/client';
import { GET_COMPETENCES } from '@/services/queries';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Code, Database, Server, Cloud, Wrench } from 'lucide-react';

const Skills = () => {
  const { data, loading, error } = useQuery(GET_COMPETENCES);

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

  const competences = data?.getCompetences || [];

  // Group skills by category
  const groupedSkills = competences.reduce((acc, skill) => {
    if (!acc[skill.categorie]) {
      acc[skill.categorie] = [];
    }
    acc[skill.categorie].push(skill);
    return acc;
  }, {});

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'FRONTEND':
        return <Code className="w-8 h-8" />;
      case 'BACKEND':
        return <Server className="w-8 h-8" />;
      case 'DATABASE':
        return <Database className="w-8 h-8" />;
      case 'DEVOPS':
        return <Cloud className="w-8 h-8" />;
      default:
        return <Wrench className="w-8 h-8" />;
    }
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'FRONTEND':
        return 'Frontend';
      case 'BACKEND':
        return 'Backend';
      case 'DATABASE':
        return 'Base de Données';
      case 'DEVOPS':
        return 'DevOps';
      case 'AUTRE':
        return 'Autres';
      default:
        return category;
    }
  };

  const getNiveauColor = (niveau) => {
    switch (niveau) {
      case 'EXPERT':
        return 'from-green-500 to-emerald-500';
      case 'AVANCE':
        return 'from-blue-500 to-cyan-500';
      case 'INTERMEDIAIRE':
        return 'from-yellow-500 to-orange-500';
      case 'DEBUTANT':
        return 'from-red-500 to-pink-500';
      default:
        return 'from-gray-500 to-slate-500';
    }
  };

  const getNiveauLabel = (niveau) => {
    switch (niveau) {
      case 'EXPERT':
        return 'Expert';
      case 'AVANCE':
        return 'Avancé';
      case 'INTERMEDIAIRE':
        return 'Intermédiaire';
      case 'DEBUTANT':
        return 'Débutant';
      default:
        return niveau;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Mes Compétences
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Un aperçu de mes compétences techniques et de mon expertise
          </p>
        </div>

        {Object.keys(groupedSkills).length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Aucune compétence disponible pour le moment.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedSkills).map(([category, skills]) => (
              <div key={category} className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-white mr-4">
                    {getCategoryIcon(category)}
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {getCategoryLabel(category)}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-900">{skill.nom}</h3>
                        <span className={`px-3 py-1 bg-gradient-to-r ${getNiveauColor(skill.niveau)} text-white text-xs font-medium rounded-full`}>
                          {getNiveauLabel(skill.niveau)}
                        </span>
                      </div>

                      {skill.pourcentage !== null && skill.pourcentage !== undefined && (
                        <div className="mt-4">
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                            <span>Maîtrise</span>
                            <span className="font-semibold">{skill.pourcentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className={`h-2.5 rounded-full bg-gradient-to-r ${getNiveauColor(skill.niveau)}`}
                              style={{ width: `${skill.pourcentage}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Skills;
