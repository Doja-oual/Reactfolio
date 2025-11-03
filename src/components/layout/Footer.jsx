import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-slate-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Portfolio
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Développeur passionné par la création d'applications web modernes et performantes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Projets
                </Link>
              </li>
              <li>
                <Link to="/skills" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Compétences
                </Link>
              </li>
              <li>
                <Link to="/experience" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Expérience
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <div className="space-y-3">
              <a
                href="mailto:contact@portfolio.com"
                className="flex items-center text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Mail className="w-5 h-5 mr-2" />
                contact@portfolio.com
              </a>
              <div className="flex gap-4 mt-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-purple-500 transition-all"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-500 transition-all"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 flex items-center justify-center">
            © {currentYear} Portfolio. Fait avec <Heart className="w-4 h-4 mx-2 text-red-500 fill-current" /> et React
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
