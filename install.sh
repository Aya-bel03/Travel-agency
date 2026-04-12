#!/bin/bash

# Script d'installation pour VoyageAlgérie
# Ce script automatise l'installation du projet

echo "==================================="
echo "  Installation de VoyageAlgérie"
echo "==================================="
echo ""

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
print_message() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[ATTENTION]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERREUR]${NC} $1"
}

# Vérifier si on est sur Windows ou Linux/WSL
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    IS_WINDOWS=true
else
    IS_WINDOWS=false
fi

# ============================================
# Étape 1 : Vérifier les prérequis
# ============================================
echo ""
echo "=== Vérification des prérequis ==="
echo ""

# Vérifier Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    print_message "Node.js trouvé : $NODE_VERSION"
else
    print_error "Node.js n'est pas installé. Veuillez l'installer depuis https://nodejs.org/"
    exit 1
fi

# Vérifier npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    print_message "npm trouvé : $NPM_VERSION"
else
    print_error "npm n'est pas installé"
    exit 1
fi

# ============================================
# Étape 2 : Installer les dépendances frontend
# ============================================
echo ""
echo "=== Installation du Frontend ==="
echo ""

cd app

print_message "Installation des dépendances npm..."
npm install

if [ $? -eq 0 ]; then
    print_message "Dépendances installées avec succès !"
else
    print_error "Erreur lors de l'installation des dépendances"
    exit 1
fi

# ============================================
# Étape 3 : Build du frontend
# ============================================
echo ""
echo "=== Build du Frontend ==="
echo ""

print_message "Compilation du frontend..."
npm run build

if [ $? -eq 0 ]; then
    print_message "Build réussi !"
else
    print_warning "Le build a échoué, mais vous pouvez continuer avec le mode développement"
fi

cd ..

# ============================================
# Étape 4 : Configuration du backend
# ============================================
echo ""
echo "=== Configuration du Backend ==="
echo ""

if [ "$IS_WINDOWS" = true ]; then
    XAMPP_PATH="/c/xampp"
    HTDOCS_PATH="$XAMPP_PATH/htdocs"
else
    XAMPP_PATH="/opt/lampp"
    HTDOCS_PATH="$XAMPP_PATH/htdocs"
fi

print_message "Configuration du backend PHP..."

# Vérifier si XAMPP est installé
if [ -d "$XAMPP_PATH" ]; then
    print_message "XAMPP trouvé à $XAMPP_PATH"
    
    # Créer le dossier api dans htdocs
    if [ ! -d "$HTDOCS_PATH/api" ]; then
        mkdir -p "$HTDOCS_PATH/api"
        print_message "Dossier api créé dans htdocs"
    fi
    
    # Copier les fichiers PHP
    print_message "Copie des fichiers API..."
    cp -r api/* "$HTDOCS_PATH/api/"
    
    print_message "Fichiers API copiés avec succès !"
    print_warning "Assurez-vous que XAMPP (Apache et MySQL) est démarré"
else
    print_warning "XAMPP n'a pas été trouvé à $XAMPP_PATH"
    print_warning "Veuillez copier manuellement le dossier 'api' dans le dossier htdocs de XAMPP"
fi

# ============================================
# Étape 5 : Configuration de la base de données
# ============================================
echo ""
echo "=== Configuration de la Base de Données ==="
echo ""

print_message "Instructions pour la base de données :"
echo ""
echo "1. Démarrez XAMPP (Apache et MySQL)"
echo "2. Ouvrez phpMyAdmin : http://localhost/phpmyadmin"
echo "3. Créez une base de données nommée 'voyage_algerie'"
echo "4. Importez le fichier 'database/voyage_algerie.sql'"
echo ""
echo "OU en ligne de commande :"
echo "  mysql -u root -p"
echo "  CREATE DATABASE voyage_algerie;"
echo "  USE voyage_algerie;"
echo "  SOURCE database/voyage_algerie.sql;"
echo ""

# ============================================
# Étape 6 : Instructions finales
# ============================================
echo ""
echo "==================================="
echo "  Installation Terminée !"
echo "==================================="
echo ""
print_message "Pour démarrer l'application :"
echo ""
echo "1. Frontend (mode développement) :"
echo "   cd app"
echo "   npm run dev"
echo ""
echo "2. Backend (XAMPP doit être démarré) :"
echo "   - Apache doit être actif"
echo "   - MySQL doit être actif"
echo ""
echo "3. Accédez à l'application :"
echo "   Frontend : http://localhost:5173"
echo "   API      : http://localhost/api"
echo ""
echo "Compte de test :"
echo "   Email    : amine.benali@email.com"
echo "   Password : password123"
echo ""
echo "==================================="
