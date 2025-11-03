import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_PORTFOLIO } from '@/services/queries';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { ArrowRight, Github, Linkedin, Mail, MapPin } from 'lucide-react';

const Home = () => {
  const { data, loading, error } = useQuery(GET_PORTFOLIO);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  const portfolio = data?.getPortfolio;
  const profil = portfolio?.profil;
  const projets = portfolio?.projets || [];
  const competences = portfolio?.competences || [];
  const experiences = portfolio?.experiences || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-white">
              {profil ? `${profil.prenom} ${profil.nom}` : 'Portfolio'}
            </div>
            
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
            {/* Profile Photo */}
            {profil?.photo && (
              <div className="mb-8">
                <img
                  src={profil.photo}
                  alt={`${profil.prenom} ${profil.nom}`}
                  className="w-32 h-32 rounded-full mx-auto border-4 border-white/20 shadow-2xl object-cover"
                />
              </div>
            )}

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              {profil ? (
                <>
                  Bonjour, je suis <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    {profil.prenom} {profil.nom}
                  </span>
                </>
              ) : (
                'Bienvenue sur mon Portfolio'
              )}
            </h1>

            {profil?.titre && (
              <h2 className="text-2xl md:text-3xl text-purple-300 mb-6 font-semibold">
                {profil.titre}
              </h2>
            )}

            <p className="text-xl text-white/70 mb-12 max-w-3xl mx-auto">
              {profil?.bio || 'Développeur Full Stack passionné par la création d\'applications web modernes et performantes'}
            </p>

            {profil?.adresse && (
              <div className="flex items-center justify-center text-white/60 mb-8">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{profil.adresse.ville}, {profil.adresse.pays}</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to="/projects" className="inline-flex items-center justify-center bg-purple-500 text-white px-8 py-4 rounded-full hover:bg-purple-600 transition-all">
                Voir mes projets
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link to="/experience" className="inline-flex items-center justify-center bg-white/10 border-2 border-white/30 text-white px-8 py-4 rounded-full hover:bg-white/20 transition-all">
                Mon parcours
              </Link>
              {profil?.cv && (
                <a
                  href={profil.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-white/10 border-2 border-white/30 text-white px-8 py-4 rounded-full hover:bg-white/20 transition-all"
                >
                  Télécharger CV
                </a>
              )}
            </div>

            <div className="flex gap-6 justify-center">
              {profil?.reseauxSociaux?.github && (
                <a href={profil.reseauxSociaux.github} target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center hover:bg-purple-500 transition-all">
                  <Github className="w-6 h-6 text-white" />
                </a>
              )}
              {profil?.reseauxSociaux?.linkedin && (
                <a href={profil.reseauxSociaux.linkedin} target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-500 transition-all">
                  <Linkedin className="w-6 h-6 text-white" />
                </a>
              )}
              {profil?.email && (
                <a href={`mailto:${profil.email}`} className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center hover:bg-pink-500 transition-all">
                  <Mail className="w-6 h-6 text-white" />
                </a>
              )}
              {profil?.reseauxSociaux?.twitter && (
                <a href={profil.reseauxSociaux.twitter} target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center hover:bg-cyan-500 transition-all">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all">
              <div className="text-5xl font-bold text-white mb-2">{projets.length}+</div>
              <div className="text-white/70 text-lg">Projets Réalisés</div>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all">
              <div className="text-5xl font-bold text-white mb-2">{experiences.length}+</div>
              <div className="text-white/70 text-lg">Expériences</div>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all">
              <div className="text-5xl font-bold text-white mb-2">{competences.length}+</div>
              <div className="text-white/70 text-lg">Compétences Techniques</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;