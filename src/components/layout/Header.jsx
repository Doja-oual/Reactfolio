import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/90 border-b border-gray-200 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Portfolio
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Accueil
            </Link>
            <Link to="/projects" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Projets
            </Link>
            <Link to="/skills" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Compétences
            </Link>
            <Link to="/experience" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Expérience
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-purple-600"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-700 hover:text-purple-600 transition-colors font-medium"
            >
              Accueil
            </Link>
            <Link
              to="/projects"
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-700 hover:text-purple-600 transition-colors font-medium"
            >
              Projets
            </Link>
            <Link
              to="/skills"
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-700 hover:text-purple-600 transition-colors font-medium"
            >
              Compétences
            </Link>
            <Link
              to="/experience"
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-700 hover:text-purple-600 transition-colors font-medium"
            >
              Expérience
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
