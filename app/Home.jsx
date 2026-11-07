import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plane, MapPin, Search, Globe, Landmark, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import VoyageCard from '../components/VoyageCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { getVoyages } from '../services/api';
import { toast } from 'sonner';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [voyages, setVoyages] = useState([]);
  const [voyagesLocaux, setVoyagesLocaux] = useState([]);
  const [voyagesInternational, setVoyagesInternational] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Récupérer les voyages au chargement
  useEffect(() => {
    fetchVoyages();
  }, []);

  // Gérer le paramètre de type dans l'URL
  useEffect(() => {
    const typeParam = searchParams.get('type');
    if (typeParam === 'local') {
      setActiveTab('local');
    } else if (typeParam === 'international') {
      setActiveTab('international');
    }
  }, [searchParams]);

  const fetchVoyages = async (params = {}) => {
    setIsLoading(true);
    try {
      const response = await getVoyages(params);
      if (response.success) {
        setVoyages(response.voyages);
        setVoyagesLocaux(response.voyages_locaux);
        setVoyagesInternational(response.voyages_internationaux);
      }
    } catch (error) {
      toast.error('Erreur lors du chargement des voyages');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchVoyages({ search: searchQuery });
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
    if (value === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ type: value });
    }
  };

  // Statistiques
  const stats = [
    { label: 'Destinations', value: '50+', icon: MapPin },
    { label: 'Voyages Organisés', value: '1000+', icon: Plane },
    { label: 'Clients Satisfaits', value: '5000+', icon: Star },
    { label: 'Années d\'Expérience', value: '15+', icon: Globe },
  ];

  // Fonctionnalités
  const features = [
    {
      title: 'Voyages Locaux',
      description: 'Découvrez les merveilles de l\'Algérie, de la Casbah d\'Alger aux ponts de Constantine.',
      icon: Landmark,
      color: 'bg-emerald-500',
    },
    {
      title: 'Voyages Internationaux',
      description: 'Explorez le monde entier avec nos forfaits vers les destinations les plus prisées.',
      icon: Globe,
      color: 'bg-blue-500',
    },
    {
      title: 'Prix Compétitifs',
      description: 'Les meilleurs tarifs garantis pour des voyages de qualité à petit prix.',
      icon: Star,
      color: 'bg-amber-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-6 bg-white/20 text-white border-0 hover:bg-white/30">
              ✈️ Votre agence de voyage de confiance
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Découvrez le Monde avec{' '}
              <span className="text-emerald-200">VoyageAlgérie</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Des voyages exceptionnels en Algérie et à travers le monde. 
              Réservez dès maintenant et vivez des expériences inoubliables.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Rechercher une destination..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-14 text-gray-900 bg-white border-0 shadow-lg text-lg"
                  />
                </div>
                <Button
                  type="submit"
                  className="h-14 px-8 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold shadow-lg"
                >
                  Rechercher
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="#F9FAFB"
            />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <stat.icon className="h-8 w-8 mx-auto mb-3 text-emerald-500" />
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pourquoi Choisir VoyageAlgérie ?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nous vous offrons les meilleures expériences de voyage avec un service de qualité et des prix compétitifs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Voyages Section */}
      <section id="voyages" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Nos Voyages</h2>
              <p className="text-gray-600 max-w-xl">
                Découvrez notre sélection de voyages soigneusement préparés pour vous offrir des expériences uniques.
              </p>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="mb-8 bg-white p-1 rounded-xl shadow-sm">
              <TabsTrigger
                value="all"
                className="px-6 py-3 rounded-lg data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                Tous les Voyages
              </TabsTrigger>
              <TabsTrigger
                value="local"
                className="px-6 py-3 rounded-lg data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                <Landmark className="h-4 w-4 mr-2" />
                Locaux (Algérie)
              </TabsTrigger>
              <TabsTrigger
                value="international"
                className="px-6 py-3 rounded-lg data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                <Globe className="h-4 w-4 mr-2" />
                International
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              {isLoading ? (
                <div className="py-20">
                  <LoadingSpinner text="Chargement des voyages..." />
                </div>
              ) : voyages.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {voyages.map((voyage) => (
                    <VoyageCard key={voyage.id} voyage={voyage} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <Plane className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucun voyage trouvé</h3>
                  <p className="text-gray-500">Essayez de modifier vos critères de recherche.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="local" className="mt-0">
              {isLoading ? (
                <div className="py-20">
                  <LoadingSpinner text="Chargement des voyages..." />
                </div>
              ) : voyagesLocaux.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {voyagesLocaux.map((voyage) => (
                    <VoyageCard key={voyage.id} voyage={voyage} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <Landmark className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucun voyage local trouvé</h3>
                </div>
              )}
            </TabsContent>

            <TabsContent value="international" className="mt-0">
              {isLoading ? (
                <div className="py-20">
                  <LoadingSpinner text="Chargement des voyages..." />
                </div>
              ) : voyagesInternational.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {voyagesInternational.map((voyage) => (
                    <VoyageCard key={voyage.id} voyage={voyage} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <Globe className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucun voyage international trouvé</h3>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à Partir à l'Aventure ?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de voyageurs satisfaits et réservez votre prochain voyage dès maintenant.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-emerald-600 hover:bg-gray-100 font-semibold px-8"
              onClick={() => document.getElementById('voyages').scrollIntoView({ behavior: 'smooth' })}
            >
              Explorer les Voyages
              <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
