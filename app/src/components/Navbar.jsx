import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getCurrentUser, logout, isAuthenticated } from '../services/api';
import { Plane, Menu, X, User, LogOut, Calendar, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const currentUser = getCurrentUser();
    setUser(currentUser);

    // Gérer le scroll pour changer le style de la navbar
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Accueil', icon: Home },
    { path: '/#voyages', label: 'Voyages', icon: Plane },
  ];

  if (user) {
    navLinks.push({ path: '/reservations', label: 'Mes Réservations', icon: Calendar });
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-gradient-to-r from-emerald-600 to-teal-600'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Plane
              className={`h-8 w-8 transition-colors ${
                scrolled ? 'text-emerald-600' : 'text-white'
              }`}
            />
            <span
              className={`text-xl font-bold transition-colors ${
                scrolled ? 'text-gray-900' : 'text-white'
              }`}
            >
              Voyage<span className={scrolled ? 'text-emerald-600' : 'text-emerald-200'}>Algérie</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? scrolled
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-white/20 text-white'
                    : scrolled
                    ? 'text-gray-700 hover:bg-gray-100 hover:text-emerald-600'
                    : 'text-white/90 hover:bg-white/20 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`flex items-center space-x-2 ${
                      scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        scrolled ? 'bg-emerald-100 text-emerald-600' : 'bg-white/20 text-white'
                      }`}
                    >
                      <User className="h-4 w-4" />
                    </div>
                    <span className="font-medium">
                      {user.prenom} {user.nom}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium">{user.prenom} {user.nom}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/reservations')}>
                    <Calendar className="mr-2 h-4 w-4" />
                    Mes Réservations
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className={scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'}
                  >
                    Connexion
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    className={
                      scrolled
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-white text-emerald-600 hover:bg-emerald-50'
                    }
                  >
                    S'inscrire
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className={`h-6 w-6 ${scrolled ? 'text-gray-700' : 'text-white'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${scrolled ? 'text-gray-700' : 'text-white'}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200/20">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 rounded-lg text-sm font-medium flex items-center ${
                    isActive(link.path)
                      ? scrolled
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-white/20 text-white'
                      : scrolled
                      ? 'text-gray-700 hover:bg-gray-100'
                      : 'text-white/90 hover:bg-white/20'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <link.icon className="h-4 w-4 mr-2" />
                  {link.label}
                </Link>
              ))}

              {user ? (
                <>
                  <div
                    className={`px-4 py-3 rounded-lg flex items-center ${
                      scrolled ? 'text-gray-700' : 'text-white'
                    }`}
                  >
                    <User className="h-4 w-4 mr-2" />
                    {user.prenom} {user.nom}
                  </div>
                  <button
                    onClick={handleLogout}
                    className={`px-4 py-3 rounded-lg text-sm font-medium flex items-center text-left ${
                      scrolled
                        ? 'text-red-600 hover:bg-red-50'
                        : 'text-red-200 hover:bg-white/20'
                    }`}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`px-4 py-3 rounded-lg text-sm font-medium flex items-center ${
                      scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Connexion
                  </Link>
                  <Link
                    to="/register"
                    className={`px-4 py-3 rounded-lg text-sm font-medium flex items-center ${
                      scrolled
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'bg-white text-emerald-600 hover:bg-emerald-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    S'inscrire
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
