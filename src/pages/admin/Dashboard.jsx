import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { LayoutDashboard, FolderKanban, Award, Briefcase, User, LogOut } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const menuItems = [
    { to: '/admin/profile', icon: User, label: 'Profil', color: 'bg-blue-500' },
    { to: '/admin/projects', icon: FolderKanban, label: 'Projets', color: 'bg-green-500' },
    { to: '/admin/skills', icon: Award, label: 'Compétences', color: 'bg-purple-500' },
    { to: '/admin/experience', icon: Briefcase, label: 'Expériences', color: 'bg-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <LayoutDashboard className="w-6 h-6 text-primary-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-700">
                Bienvenue, <span className="font-medium">{user?.firstName || user?.email}</span>
              </span>
              <button
                onClick={logout}
                className="inline-flex items-center text-red-600 hover:text-red-700"
              >
                <LogOut className="w-5 h-5 mr-1" />
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Tableau de bord</h2>
          <p className="text-gray-600">Gérez votre portfolio depuis cette interface</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition group"
            >
              <div className={`inline-flex p-3 rounded-lg ${item.color} mb-4 group-hover:scale-110 transition`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.label}</h3>
              <p className="text-gray-600 text-sm">Gérer les {item.label.toLowerCase()}</p>
            </Link>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Liens rapides</h3>
          <div className="space-y-3">
            <a href="/" target="_blank" rel="noopener noreferrer" className="block text-primary-600 hover:text-primary-700">
              → Voir le site public
            </a>
            <Link to="/admin/profile" className="block text-primary-600 hover:text-primary-700">
              → Modifier mon profil
            </Link>
            <Link to="/admin/projects" className="block text-primary-600 hover:text-primary-700">
              → Ajouter un nouveau projet
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;