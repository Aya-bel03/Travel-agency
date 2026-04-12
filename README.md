# 🌍 VoyageAlgérie - Application Web d'Agence de Voyage

Une application web moderne pour une agence de voyage permettant aux utilisateurs de consulter et réserver des voyages locaux (Algérie) et internationaux.

![VoyageAlgérie](https://img.shields.io/badge/Voyage-Algérie-emerald)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![PHP](https://img.shields.io/badge/PHP-8.0+-purple)
![MySQL](https://img.shields.io/badge/MySQL-5.7+-orange)

## 📋 Table des matières

- [Fonctionnalités](#-fonctionnalités)
- [Technologies](#-technologies)
- [Structure du projet](#-structure-du-projet)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Utilisation](#-utilisation)
- [API Endpoints](#-api-endpoints)
- [Captures d'écran](#-captures-décran)

## ✨ Fonctionnalités

### 👤 Authentification
- Inscription avec validation des données
- Connexion sécurisée avec JWT
- Gestion de session
- Protection des routes

### ✈️ Voyages
- **Voyages Locaux (Algérie)** : Découvrez les merveilles de l'Algérie
  - Alger (Casbah, Maqam Echahid)
  - Constantine (Ponts suspendus)
  - Oran (Santa Cruz)
  - Tlemcen, Ghardaïa, Béjaïa, Annaba, Djanet
- **Voyages Internationaux** : Explorez le monde
  - Paris, Istanbul, Dubaï, Barcelone, Rome
  - Marrakech, Djerba, Le Caire, Kuala Lumpur, Bali

### 📅 Réservations
- Réserver un voyage en quelques clics
- Voir l'historique des réservations
- Filtrer par type (local/international)
- Annuler une réservation

### 🔍 Recherche et Filtres
- Recherche par destination
- Filtrage par type de voyage
- Interface responsive (mobile + desktop)

## 🛠 Technologies

### Frontend
- **React 18** - Bibliothèque UI
- **React Router DOM** - Navigation
- **Axios** - Requêtes HTTP
- **Tailwind CSS** - Styling
- **shadcn/ui** - Composants UI
- **Lucide React** - Icônes
- **Sonner** - Notifications

### Backend
- **PHP 8.0+** - Langage serveur
- **MySQL** - Base de données
- **PDO** - Connexion sécurisée
- **JSON** - Format d'échange

## 📁 Structure du projet

```
voyage-algerie/
├── 📁 app/                          # Frontend React
│   ├── 📁 src/
│   │   ├── 📁 components/           # Composants React
│   │   │   ├── Navbar.jsx          # Barre de navigation
│   │   │   ├── Footer.jsx          # Pied de page
│   │   │   ├── VoyageCard.jsx      # Carte de voyage
│   │   │   └── LoadingSpinner.jsx  # Indicateur de chargement
│   │   ├── 📁 pages/               # Pages de l'application
│   │   │   ├── Home.jsx            # Page d'accueil
│   │   │   ├── Login.jsx           # Page de connexion
│   │   │   ├── Register.jsx        # Page d'inscription
│   │   │   └── Reservations.jsx    # Page des réservations
│   │   ├── 📁 services/            # Services API
│   │   │   └── api.js              # Configuration Axios
│   │   ├── App.tsx                 # Composant principal
│   │   └── main.tsx                # Point d'entrée
│   ├── package.json
│   └── vite.config.ts
│
├── 📁 api/                          # Backend PHP
│   ├── 📁 config/
│   │   └── db.php                  # Configuration BDD
│   ├── register.php                # API inscription
│   ├── login.php                   # API connexion
│   ├── voyages.php                 # API voyages
│   └── reservations.php            # API réservations
│
├── 📁 database/                     # Base de données
│   └── voyage_algerie.sql          # Script SQL
│
└── README.md                        # Documentation
```

## 🚀 Installation

### Prérequis
- **Node.js** 18+ et npm
- **XAMPP** (Apache + MySQL + PHP)
- **Git** (optionnel)

### Étape 1 : Cloner le projet

```bash
git clone https://github.com/votre-username/voyage-algerie.git
cd voyage-algerie
```

### Étape 2 : Configurer la base de données

1. **Démarrer XAMPP**
   - Lancer Apache et MySQL depuis le panneau de contrôle XAMPP

2. **Créer la base de données**
   - Ouvrir phpMyAdmin : http://localhost/phpmyadmin
   - Créer une base de données nommée `voyage_algerie`
   - Importer le fichier `database/voyage_algerie.sql`

   OU en ligne de commande :
   ```bash
   mysql -u root -p
   CREATE DATABASE voyage_algerie;
   USE voyage_algerie;
   SOURCE database/voyage_algerie.sql;
   ```

### Étape 3 : Configurer le backend PHP

1. **Copier les fichiers API**
   ```bash
   # Créer le dossier api dans htdocs
   mkdir -p C:/xampp/htdocs/api
   
   # Copier les fichiers PHP
   cp -r api/* C:/xampp/htdocs/api/
   ```

2. **Vérifier la configuration**
   - Ouvrir `C:/xampp/htdocs/api/config/db.php`
   - Modifier si nécessaire :
     ```php
     define('DB_HOST', 'localhost');
     define('DB_NAME', 'voyage_algerie');
     define('DB_USER', 'root');
     define('DB_PASS', ''); // Mot de passe MySQL
     ```

### Étape 4 : Installer et lancer le frontend

```bash
# Se déplacer dans le dossier app
cd app

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'application sera accessible à l'adresse : **http://localhost:5173**

## ⚙️ Configuration

### Configuration CORS (si nécessaire)

Si vous rencontrez des problèmes de CORS, ajoutez dans `api/config/db.php` :

```php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
```

### Configuration de l'URL API

Dans `app/src/services/api.js`, modifiez l'URL selon votre configuration :

```javascript
const API_BASE_URL = 'http://localhost/api'; // XAMPP par défaut
```

## 📖 Utilisation

### Compte de test

Un compte de test est préconfiguré dans la base de données :

- **Email** : amine.benali@email.com
- **Mot de passe** : password123

### Navigation

1. **Page d'accueil** (`/`) : Liste des voyages avec filtres
2. **Connexion** (`/login`) : Se connecter à son compte
3. **Inscription** (`/register`) : Créer un nouveau compte
4. **Mes Réservations** (`/reservations`) : Voir et gérer ses réservations

### Réserver un voyage

1. Naviguez sur la page d'accueil
2. Parcourez les voyages disponibles
3. Cliquez sur "Réserver Maintenant"
4. Choisissez le nombre de personnes
5. Confirmez la réservation

## 🔌 API Endpoints

### Authentification

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/register.php` | Inscription |
| POST | `/api/login.php` | Connexion |

**Body register/login :**
```json
{
  "nom": "Benali",
  "prenom": "Amine",
  "email": "amine@email.com",
  "password": "password123"
}
```

### Voyages

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/voyages.php` | Liste tous les voyages |
| GET | `/api/voyages.php?id=1` | Détail d'un voyage |
| GET | `/api/voyages.php?type=local` | Filtrer par type |
| GET | `/api/voyages.php?search=alger` | Rechercher |
| POST | `/api/voyages.php` | Créer un voyage |

### Réservations

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/reservations.php?user_id=1` | Liste des réservations |
| GET | `/api/reservations.php?user_id=1&type=local` | Filtrer par type |
| POST | `/api/reservations.php` | Créer une réservation |
| DELETE | `/api/reservations.php?id=1&user_id=1` | Annuler |

**Body création réservation :**
```json
{
  "user_id": 1,
  "voyage_id": 5,
  "nb_personnes": 2
}
```

## 📸 Captures d'écran

### Page d'accueil
- Hero section avec recherche
- Liste des voyages avec filtres
- Design moderne et responsive

### Page de connexion/inscription
- Formulaires validés
- Interface épurée
- Messages d'erreur clairs

### Page des réservations
- Tableau de bord personnel
- Gestion des réservations
- Historique complet

## 🔒 Sécurité

- **Hashage des mots de passe** avec bcrypt
- **Protection contre SQL Injection** avec PDO et requêtes préparées
- **Validation des données** côté client et serveur
- **CORS** configuré pour les requêtes cross-origin

## 🛠 Dépannage

### Problème de connexion à la base de données
```
Vérifiez que :
1. MySQL est démarré dans XAMPP
2. Les identifiants dans config/db.php sont corrects
3. La base de données voyage_algerie existe
```

### Erreur CORS
```
Vérifiez que :
1. L'URL dans api.js correspond à votre configuration
2. Les headers CORS sont correctement configurés
```

### Problème de routing React
```
Vérifiez que :
1. Vous utilisez BrowserRouter
2. Les routes sont correctement définies dans App.tsx
```

## 📝 License

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👨‍💻 Auteur

Développé avec ❤️ pour les amateurs de voyage.

---

**Besoin d'aide ?** N'hésitez pas à ouvrir une issue sur GitHub !
