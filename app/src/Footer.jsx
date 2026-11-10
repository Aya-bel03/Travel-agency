import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    voyages: [
      { label: 'Voyages Locaux', href: '/?type=local' },
      { label: 'Voyages Internationaux', href: '/?type=international' },
      { label: 'Destinations Populaires', href: '/#voyages' },
      { label: 'Offres Spéciales', href: '/#voyages' },
    ],
    entreprise: [
      { label: 'À Propos', href: '#' },
      { label: 'Notre Équipe', href: '#' },
      { label: 'Carrières', href: '#' },
      { label: 'Contact', href: '#' },
    ],
    support: [
      { label: 'Centre d\'Aide', href: '#' },
      { label: 'Conditions Générales', href: '#' },
      { label: 'Politique de Confidentialité', href: '#' },
      { label: 'FAQ', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'Youtube' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Plane className="h-8 w-8 text-emerald-400" />
              <span className="text-xl font-bold">
                Voyage<span className="text-emerald-400">Algérie</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Votre agence de voyage de confiance pour découvrir les merveilles de l'Algérie 
              et du monde. Des expériences uniques et mémorables vous attendent.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Voyages Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-emerald-400">Nos Voyages</h3>
            <ul className="space-y-2">
              {footerLinks.voyages.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-emerald-400">Entreprise</h3>
            <ul className="space-y-2">
              {footerLinks.entreprise.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-emerald-400">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  123 Rue des Voyages<br />
                  Alger, Algérie
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">+213 123 456 789</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">contact@voyagealgerie.dz</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              {currentYear} VoyageAlgérie. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-6">
              <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Conditions d'utilisation
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
