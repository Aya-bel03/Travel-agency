-- =====================================================
-- Base de données : Voyage Algérie
-- Description : Agence de voyage - Voyages locaux et internationaux
-- =====================================================

-- Création de la base de données
CREATE DATABASE IF NOT EXISTS voyage_algerie CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE voyage_algerie;

-- =====================================================
-- Table : users (Utilisateurs)
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Table : voyages (Voyages)
-- =====================================================
CREATE TABLE IF NOT EXISTS voyages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('local', 'international') NOT NULL,
    destination VARCHAR(255) NOT NULL,
    wilaya VARCHAR(100) NULL,
    prix DECIMAL(10, 2) NOT NULL,
    date_depart DATE NOT NULL,
    date_retour DATE NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(500) DEFAULT 'default-voyage.jpg',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Table : reservations (Réservations)
-- =====================================================
CREATE TABLE IF NOT EXISTS reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    voyage_id INT NOT NULL,
    nb_personnes INT NOT NULL DEFAULT 1,
    date_reservation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (voyage_id) REFERENCES voyages(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Insertion des données de test : VOYAGES LOCAUX (Algérie)
-- =====================================================

-- Alger
INSERT INTO voyages (type, destination, wilaya, prix, date_depart, date_retour, description, image) VALUES
('local', 'Alger', 'Alger', 15000.00, '2024-06-15', '2024-06-18', 
'Découvrez la capitale algérienne avec ses trésors historiques. Visite de la Casbah classée au patrimoine mondial de l\'UNESCO, le Maqam Echahid emblématique, la Grande Poste d\'Alger, le jardin d\'essai du Hamma et la basilique Notre-Dame d\'Afrique. Un voyage culturel riche en histoire et en découvertes.', 
'https://images.unsplash.com/photo-1586016413664-864c0dd76f53?w=800');

-- Constantine
INSERT INTO voyages (type, destination, wilaya, prix, date_depart, date_retour, description, image) VALUES
('local', 'Constantine', 'Constantine', 18000.00, '2024-07-10', '2024-07-14', 
'La ville des ponts suspendus vous attend ! Admirez le célèbre pont de Sidi M\'Cid suspendu à 175m de hauteur, le pont Mellah, le palais Ahmed Bey, le musée national Cirta et les gorges du Rhummel. Une expérience vertigineuse et historique unique.', 
'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800');

-- Oran
INSERT INTO voyages (type, destination, wilaya, prix, date_depart, date_retour, description, image) VALUES
('local', 'Oran', 'Oran', 16000.00, '2024-08-05', '2024-08-09', 
'Découvrez la ville radieuse avec son fort de Santa Cruz dominant la baie, la chapelle de Santa Cruz, la place du 1er Novembre, la cathédrale Sacré-Cœur et le front de mer d\'Oran. Profitez également de la cuisine oranaise et de son ambiance méditerranéenne.', 
'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800');

-- Tlemcen
INSERT INTO voyages (type, destination, wilaya, prix, date_depart, date_retour, description, image) VALUES
('local', 'Tlemcen', 'Tlemcen', 14000.00, '2024-06-20', '2024-06-23', 
'Explorez la perle du Maghreb avec la Grande Mosquée de Tlemcen, le mausolée de Sidi Boumédiène, les cascades de El Ourit, le palais El Mechouar et les grottes de Beni Add. Une ville chargée d\'histoire andalouse.', 
'https://images.unsplash.com/photo-1548013146-72479768bada?w=800');

-- Ghardaïa
INSERT INTO voyages (type, destination, wilaya, prix, date_depart, date_retour, description, image) VALUES
('local', 'Ghardaïa', 'Ghardaïa', 22000.00, '2024-09-12', '2024-09-16', 
'Aventurez-vous dans la vallée du M\'zab, classée au patrimoine mondial de l\'UNESCO. Découvrez les ksour pentagonaux, l\'architecture mozabite unique, le marché de Ghardaïa et le paysage désertique spectaculaire du Sahara algérien.', 
'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800');

-- Béjaïa
INSERT INTO voyages (type, destination, wilaya, prix, date_depart, date_retour, description, image) VALUES
('local', 'Béjaïa', 'Béjaïa', 13000.00, '2024-07-25', '2024-07-28', 
'Profitez de la côte kabyle avec le pic des Singes, les ruines romaines de Tikjda, le port de Béjaïa, la casbah et les plages de la région. Une escapade entre mer et montagne dans un cadre naturel exceptionnel.', 
'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800');

-- Annaba
INSERT INTO voyages (type, destination, wilaya, prix, date_depart, date_retour, description, image) VALUES
('local', 'Annaba', 'Annaba', 17000.00, '2024-08-15', '2024-08-19', 
'Visitez la ville de Saint-Augustin avec ses ruines romaines d\'Hippone, la basilique Saint-Augustin, les plages de Rizi Amor, le mont Edough et le port d\'Annaba. Un mélange fascinant d\'histoire antique et de beauté méditerranéenne.', 
'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800');

-- Djanet
INSERT INTO voyages (type, destination, wilaya, prix, date_depart, date_retour, description, image) VALUES
('local', 'Djanet', 'Illizi', 35000.00, '2024-10-05', '2024-10-12', 
'Expédition dans le Tassili n\'Ajjer, patrimoine mondial de l\'UNESCO. Admirez les peintures rupestres millénaires, les formations rocheuses uniques, les dunes de sable orange et les paysages lunaires du Sahara profond.', 
'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800');

-- =====================================================
-- Insertion des données de test : VOYAGES INTERNATIONAUX
-- =====================================================

-- France - Paris
INSERT INTO voyages (type, destination, wilaya, prix, date_depart, date_retour, description, image) VALUES
('international', 'Paris, France', NULL, 85000.00, '2024-06-20', '2024-06-27', 
'Découvrez la ville lumière ! Visite de la Tour Eiffel, le Louvre, Notre-Dame, les Champs-Élysées, Montmartre et le Sacré-Cœur. Croisière sur la Seine et dégustation de cuisine française. Un séjour romantique inoubliable.', 
'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800');

-- Turquie - Istanbul
INSERT INTO voyages (type, destination, wilaya, prix, date_depart, date_retour, description, image) VALUES
('international', 'Istanbul, Turquie', NULL, 65000.00, '2024-07-15', '2024-07-22', 
'Entre Orient et Occident, découvrez la mosquée Bleue, Sainte-Sophie, le palais de Topkapi, le Grand Bazar et le Bosphore. Profitez des bains turcs et de la gastronomie ottomane dans une ville aux mille visages.', 
'https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800');

-- Émirats Arabes Unis - Dubaï
INSERT INTO voyages (type, destination, wilaya, prix, date_depart, date_retour, description, image) VALUES
('international', 'Dubaï, EAU', NULL, 95000.00, '2024-08-10', '2024-08-17', 
'Vivez le luxe ultime à Dubaï ! Burj Khalifa, Dubai Mall, Palm Jumeirah, safari dans le désert, souks traditionnels et plages de sable fin. Une expérience entre modernité extravagante et traditions arabes.', 
'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800');

-- Espagne - Barcelone
INSERT INTO voyages (type, destination, wilaya, prix, date_depart, date_retour, description, image) VALUES
('international', 'Barcelone, Espagne', NULL, 55000.00, '2024-09-05', '2024-09-12', 
'Découvrez la capitale catalane avec la Sagrada Familia, le Park Güell, la Rambla, le quartier gothique et la plage de Barceloneta. Architecture de Gaudí, tapas et ambiance méditerranéenne garanties.', 
'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800');

-- Italie - Rome
INSERT INTO voyages (type, destination, wilaya, prix, date_depart, date_retour, description, image) VALUES
('international', 'Rome, Italie', NULL, 70000.00, '2024-10-10', '2024-10-17', 
'Explorez la ville éternelle ! Colisée, Vatican et chapelle Sixtine, fontaine de Trevi, Panthéon et quartier du Trastevere. Gastronomie italienne authentique et dolce vita dans la capitale historique.', 
'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800');

-- Maroc - Marrakech
INSERT INTO voyages (type, destination, wilaya, prix, date_depart, date_retour, description, image) VALUES
('international', 'Marrakech, Maroc', NULL, 35000.00, '2024-11-15', '2024-11-20', 
'Plongez dans l\'ambiance des mille et une nuits ! Place Jemaa el-Fna, jardins Majorelle, palais de la Bahia, médina et souks colorés. Découvrez l\'art de vivre marocain et l\'hospitalité légendaire.', 
'https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=800');

-- Tunisie - Djerba
INSERT INTO voyages (type, destination, wilaya, prix, date_depart, date_retour, description, image) VALUES
('international', 'Djerba, Tunisie', NULL, 28000.00, '2024-06-25', '2024-06-30', 
'Île des rêves en Méditerranée ! Plages de sable fin, village de Guellala, synagogue El Ghriba, souk de Houmt Souk et excursions dans le désert du Sahara. Détente et découvertes au programme.', 
'https://images.unsplash.com/photo-1559628233-eb1b1ee29747?w=800');

-- Égypte - Le Caire
INSERT INTO voyages (type, destination, wilaya, prix, date_depart, date_retour, description, image) VALUES
('international', 'Le Caire, Égypte', NULL, 75000.00, '2024-12-05', '2024-12-12', 
'À la découverte des pharaons ! Pyramides de Gizeh, sphinx, musée égyptien, citadelle de Saladin, Khan el-Khalili et croisière sur le Nil. Un voyage dans le temps vers l\'Égypte antique.', 
'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=800');

-- Malaisie - Kuala Lumpur
INSERT INTO voyages (type, destination, wilaya, prix, date_depart, date_retour, description, image) VALUES
('international', 'Kuala Lumpur, Malaisie', NULL, 90000.00, '2024-08-20', '2024-08-28', 
'Découvrez la capitale malaisienne avec les Tours Petronas, la grotte de Batu, le quartier chinois de Petaling Street, les jardins botaniques et la diversité culturelle unique de cette métropole asiatique.', 
'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800');

-- Indonésie - Bali
INSERT INTO voyages (type, destination, wilaya, prix, date_depart, date_retour, description, image) VALUES
('international', 'Bali, Indonésie', NULL, 110000.00, '2024-09-15', '2024-09-25', 
'Paradis tropical indonésien ! Temples d\'Uluwatu et Tanah Lot, rizières en terrasses d\'Ubud, plages de Seminyak, monkey forest et traditions balinaises. Détente, spiritualité et nature exotique.', 
'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800');

-- =====================================================
-- Création d'un utilisateur de test
-- Mot de passe : password123 (hashé avec bcrypt)
-- =====================================================
INSERT INTO users (nom, prenom, email, password) VALUES
('Benali', 'Amine', 'amine.benali@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- =====================================================
-- Fin du script
-- =====================================================
