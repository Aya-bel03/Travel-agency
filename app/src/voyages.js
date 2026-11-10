// Données extraites de database/voyage_algerie.sql (mode démo statique, sans PHP/MySQL)
export const VOYAGES = [
  {
    "id": 1,
    "type": "local",
    "destination": "Alger",
    "wilaya": "Alger",
    "prix": 15000.0,
    "date_depart": "2024-06-15",
    "date_retour": "2024-06-18",
    "description": "Découvrez la capitale algérienne avec ses trésors historiques. Visite de la Casbah classée au patrimoine mondial de l'UNESCO, le Maqam Echahid emblématique, la Grande Poste d'Alger, le jardin d'essai du Hamma et la basilique Notre-Dame d'Afrique. Un voyage culturel riche en histoire et en découvertes.",
    "image": "https://images.unsplash.com/photo-1586016413664-864c0dd76f53?w=800"
  },
  {
    "id": 2,
    "type": "local",
    "destination": "Constantine",
    "wilaya": "Constantine",
    "prix": 18000.0,
    "date_depart": "2024-07-10",
    "date_retour": "2024-07-14",
    "description": "La ville des ponts suspendus vous attend ! Admirez le célèbre pont de Sidi M'Cid suspendu à 175m de hauteur, le pont Mellah, le palais Ahmed Bey, le musée national Cirta et les gorges du Rhummel. Une expérience vertigineuse et historique unique.",
    "image": "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800"
  },
  {
    "id": 3,
    "type": "local",
    "destination": "Oran",
    "wilaya": "Oran",
    "prix": 16000.0,
    "date_depart": "2024-08-05",
    "date_retour": "2024-08-09",
    "description": "Découvrez la ville radieuse avec son fort de Santa Cruz dominant la baie, la chapelle de Santa Cruz, la place du 1er Novembre, la cathédrale Sacré-Cœur et le front de mer d'Oran. Profitez également de la cuisine oranaise et de son ambiance méditerranéenne.",
    "image": "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800"
  },
  {
    "id": 4,
    "type": "local",
    "destination": "Tlemcen",
    "wilaya": "Tlemcen",
    "prix": 14000.0,
    "date_depart": "2024-06-20",
    "date_retour": "2024-06-23",
    "description": "Explorez la perle du Maghreb avec la Grande Mosquée de Tlemcen, le mausolée de Sidi Boumédiène, les cascades de El Ourit, le palais El Mechouar et les grottes de Beni Add. Une ville chargée d'histoire andalouse.",
    "image": "https://images.unsplash.com/photo-1548013146-72479768bada?w=800"
  },
  {
    "id": 5,
    "type": "local",
    "destination": "Ghardaïa",
    "wilaya": "Ghardaïa",
    "prix": 22000.0,
    "date_depart": "2024-09-12",
    "date_retour": "2024-09-16",
    "description": "Aventurez-vous dans la vallée du M'zab, classée au patrimoine mondial de l'UNESCO. Découvrez les ksour pentagonaux, l'architecture mozabite unique, le marché de Ghardaïa et le paysage désertique spectaculaire du Sahara algérien.",
    "image": "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800"
  },
  {
    "id": 6,
    "type": "local",
    "destination": "Béjaïa",
    "wilaya": "Béjaïa",
    "prix": 13000.0,
    "date_depart": "2024-07-25",
    "date_retour": "2024-07-28",
    "description": "Profitez de la côte kabyle avec le pic des Singes, les ruines romaines de Tikjda, le port de Béjaïa, la casbah et les plages de la région. Une escapade entre mer et montagne dans un cadre naturel exceptionnel.",
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800"
  },
  {
    "id": 7,
    "type": "local",
    "destination": "Annaba",
    "wilaya": "Annaba",
    "prix": 17000.0,
    "date_depart": "2024-08-15",
    "date_retour": "2024-08-19",
    "description": "Visitez la ville de Saint-Augustin avec ses ruines romaines d'Hippone, la basilique Saint-Augustin, les plages de Rizi Amor, le mont Edough et le port d'Annaba. Un mélange fascinant d'histoire antique et de beauté méditerranéenne.",
    "image": "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800"
  },
  {
    "id": 8,
    "type": "local",
    "destination": "Djanet",
    "wilaya": "Illizi",
    "prix": 35000.0,
    "date_depart": "2024-10-05",
    "date_retour": "2024-10-12",
    "description": "Expédition dans le Tassili n'Ajjer, patrimoine mondial de l'UNESCO. Admirez les peintures rupestres millénaires, les formations rocheuses uniques, les dunes de sable orange et les paysages lunaires du Sahara profond.",
    "image": "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800"
  },
  {
    "id": 9,
    "type": "international",
    "destination": "Paris, France",
    "wilaya": null,
    "prix": 85000.0,
    "date_depart": "2024-06-20",
    "date_retour": "2024-06-27",
    "description": "Découvrez la ville lumière ! Visite de la Tour Eiffel, le Louvre, Notre-Dame, les Champs-Élysées, Montmartre et le Sacré-Cœur. Croisière sur la Seine et dégustation de cuisine française. Un séjour romantique inoubliable.",
    "image": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800"
  },
  {
    "id": 10,
    "type": "international",
    "destination": "Istanbul, Turquie",
    "wilaya": null,
    "prix": 65000.0,
    "date_depart": "2024-07-15",
    "date_retour": "2024-07-22",
    "description": "Entre Orient et Occident, découvrez la mosquée Bleue, Sainte-Sophie, le palais de Topkapi, le Grand Bazar et le Bosphore. Profitez des bains turcs et de la gastronomie ottomane dans une ville aux mille visages.",
    "image": "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800"
  },
  {
    "id": 11,
    "type": "international",
    "destination": "Dubaï, EAU",
    "wilaya": null,
    "prix": 95000.0,
    "date_depart": "2024-08-10",
    "date_retour": "2024-08-17",
    "description": "Vivez le luxe ultime à Dubaï ! Burj Khalifa, Dubai Mall, Palm Jumeirah, safari dans le désert, souks traditionnels et plages de sable fin. Une expérience entre modernité extravagante et traditions arabes.",
    "image": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800"
  },
  {
    "id": 12,
    "type": "international",
    "destination": "Barcelone, Espagne",
    "wilaya": null,
    "prix": 55000.0,
    "date_depart": "2024-09-05",
    "date_retour": "2024-09-12",
    "description": "Découvrez la capitale catalane avec la Sagrada Familia, le Park Güell, la Rambla, le quartier gothique et la plage de Barceloneta. Architecture de Gaudí, tapas et ambiance méditerranéenne garanties.",
    "image": "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800"
  },
  {
    "id": 13,
    "type": "international",
    "destination": "Rome, Italie",
    "wilaya": null,
    "prix": 70000.0,
    "date_depart": "2024-10-10",
    "date_retour": "2024-10-17",
    "description": "Explorez la ville éternelle ! Colisée, Vatican et chapelle Sixtine, fontaine de Trevi, Panthéon et quartier du Trastevere. Gastronomie italienne authentique et dolce vita dans la capitale historique.",
    "image": "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800"
  },
  {
    "id": 14,
    "type": "international",
    "destination": "Marrakech, Maroc",
    "wilaya": null,
    "prix": 35000.0,
    "date_depart": "2024-11-15",
    "date_retour": "2024-11-20",
    "description": "Plongez dans l'ambiance des mille et une nuits ! Place Jemaa el-Fna, jardins Majorelle, palais de la Bahia, médina et souks colorés. Découvrez l'art de vivre marocain et l'hospitalité légendaire.",
    "image": "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=800"
  },
  {
    "id": 15,
    "type": "international",
    "destination": "Djerba, Tunisie",
    "wilaya": null,
    "prix": 28000.0,
    "date_depart": "2024-06-25",
    "date_retour": "2024-06-30",
    "description": "Île des rêves en Méditerranée ! Plages de sable fin, village de Guellala, synagogue El Ghriba, souk de Houmt Souk et excursions dans le désert du Sahara. Détente et découvertes au programme.",
    "image": "https://images.unsplash.com/photo-1559628233-eb1b1ee29747?w=800"
  },
  {
    "id": 16,
    "type": "international",
    "destination": "Le Caire, Égypte",
    "wilaya": null,
    "prix": 75000.0,
    "date_depart": "2024-12-05",
    "date_retour": "2024-12-12",
    "description": "À la découverte des pharaons ! Pyramides de Gizeh, sphinx, musée égyptien, citadelle de Saladin, Khan el-Khalili et croisière sur le Nil. Un voyage dans le temps vers l'Égypte antique.",
    "image": "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=800"
  },
  {
    "id": 17,
    "type": "international",
    "destination": "Kuala Lumpur, Malaisie",
    "wilaya": null,
    "prix": 90000.0,
    "date_depart": "2024-08-20",
    "date_retour": "2024-08-28",
    "description": "Découvrez la capitale malaisienne avec les Tours Petronas, la grotte de Batu, le quartier chinois de Petaling Street, les jardins botaniques et la diversité culturelle unique de cette métropole asiatique.",
    "image": "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800"
  },
  {
    "id": 18,
    "type": "international",
    "destination": "Bali, Indonésie",
    "wilaya": null,
    "prix": 110000.0,
    "date_depart": "2024-09-15",
    "date_retour": "2024-09-25",
    "description": "Paradis tropical indonésien ! Temples d'Uluwatu et Tanah Lot, rizières en terrasses d'Ubud, plages de Seminyak, monkey forest et traditions balinaises. Détente, spiritualité et nature exotique.",
    "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800"
  }
];
