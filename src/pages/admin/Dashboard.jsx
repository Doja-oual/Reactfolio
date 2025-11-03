import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_PORTFOLIO } from '@/services/queries';
import { useAuth } from '@/hooks/useAuth';
import { FolderKanban, Award, Briefcase, User, TrendingUp } from 'lucide-react';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const Dashboard = () => {
  const { user } = useAuth();
  const { data, loading } = useQuery(GET_PORTFOLIO);

  const portfolio = data?.getPortfolio;
  const stats = {
    projets: portfolio?.projets?.length || 0,
    competences: portfolio?.competences?.length || 0,
    experiences: portfolio?.experiences?.length || 0,
    profilComplete: portfolio?.profil ? 100 : 0,
  };

  const menuItems = [
    { to: '/admin/profile', icon: User, label: 'Profil', color: 'bg-blue-500', count: stats.profilComplete + '%' },
    { to: '/admin/projects', icon: FolderKanban, label: 'Projets', color: 'bg-green-500', count: stats.projets },
    { to: '/admin/skills', icon: Award, label: 'Compétences', color: 'bg-purple-500', count: stats.competences },
    { to: '/admin/experience', icon: Briefcase, label: 'Expériences', color: 'bg-orange-500', count: stats.experiences },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de bord</h1>
        <p className="text-gray-600">
          Bienvenue, <span className="font-medium">{user?.username || user?.email}</span>
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {menuItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`inline-flex p-3 rounded-lg ${item.color} group-hover:scale-110 transition`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{item.count}</div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.label}</h3>
            <p className="text-gray-600 text-sm">Gérer les {item.label.toLowerCase()}</p>
          </Link>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Projects */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Projets récents</h3>
            <Link to="/admin/projects" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              Voir tout →
            </Link>
          </div>
          {portfolio?.projets && portfolio.projets.length > 0 ? (
            <div className="space-y-3">
              {portfolio.projets.slice(0, 3).map((projet) => (
                <div key={projet.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{projet.titre}</div>
                    <div className="text-sm text-gray-600">{projet.statut}</div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(projet.dateDebut).toLocaleDateString('fr-FR')}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">Aucun projet pour le moment</p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-6 h-6 text-purple-600 mr-2" />
            <h3 className="text-xl font-bold text-gray-900">Actions rapides</h3>
          </div>
          <div className="space-y-3">
            <Link
              to="/admin/profile"
              className="block p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg hover:from-purple-100 hover:to-blue-100 transition-colors"
            >
              <div className="font-medium text-gray-900">Modifier mon profil</div>
              <div className="text-sm text-gray-600">Mettre à jour vos informations personnelles</div>
            </Link>
            <Link
              to="/admin/projects"
              className="block p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg hover:from-green-100 hover:to-emerald-100 transition-colors"
            >
              <div className="font-medium text-gray-900">Ajouter un projet</div>
              <div className="text-sm text-gray-600">Créer un nouveau projet</div>
            </Link>
            <Link
              to="/admin/skills"
              className="block p-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg hover:from-orange-100 hover:to-amber-100 transition-colors"
            >
              <div className="font-medium text-gray-900">Gérer les compétences</div>
              <div className="text-sm text-gray-600">Ajouter ou modifier vos compétences</div>
            </Link>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg hover:from-blue-100 hover:to-cyan-100 transition-colors"
            >
              <div className="font-medium text-gray-900">Voir le site public</div>
              <div className="text-sm text-gray-600">Ouvrir votre portfolio dans un nouvel onglet</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;