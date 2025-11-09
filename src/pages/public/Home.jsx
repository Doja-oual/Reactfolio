import { Link } from 'react-router-dom';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-white">Portfolio</div>
            
            <div className="hidden md:flex space-x-8">
              <Link to="/" className="text-white hover:text-purple-400 transition-all duration-300">
                Accueil
              </Link>
              <Link to="/projects" className="text-white hover:text-purple-400 transition-all duration-300">
                Projets
              </Link>
              <Link to="/skills" className="text-white hover:text-purple-400 transition-all duration-300">
                Compétences
              </Link>
              <Link to="/experience" className="text-white hover:text-purple-400 transition-all duration-300">
                Expérience
              </Link>
            </div>
            
            <Link to="/admin/login" className="bg-purple-500 text-white px-6 py-2 rounded-full hover:bg-purple-600 transition-all">
              Admin
            </Link>
          </div>
        </nav>
      </header>

      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Bienvenue sur mon Portfolio
            </h1>

            <p className="text-xl text-white/70 mb-12 max-w-3xl mx-auto">
              Développeur Full Stack passionné par la création d applications web modernes et performantes
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to="/projects" className="inline-flex items-center justify-center bg-purple-500 text-white px-8 py-4 rounded-full hover:bg-purple-600 transition-all">
                Voir mes projets
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link to="/experience" className="inline-flex items-center justify-center bg-white/10 border-2 border-white/30 text-white px-8 py-4 rounded-full hover:bg-white/20 transition-all">
                Mon parcours
              </Link>
            </div>

            <div className="flex gap-6 justify-center">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center hover:bg-purple-500 transition-all">
                <Github className="w-6 h-6 text-white" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-500 transition-all">
                <Linkedin className="w-6 h-6 text-white" />
              </a>
              <a href="mailto:contact@example.com" className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center hover:bg-pink-500 transition-all">
                <Mail className="w-6 h-6 text-white" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all">
              <div className="text-5xl font-bold text-white mb-2">10+</div>
              <div className="text-white/70 text-lg">Projets Réalisés</div>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all">
              <div className="text-5xl font-bold text-white mb-2">5+</div>
              <div className="text-white/70 text-lg">Années d Expérience</div>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all">
              <div className="text-5xl font-bold text-white mb-2">15+</div>
              <div className="text-white/70 text-lg">Technologies Maîtrisées</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;