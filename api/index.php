<?php
/**
 * Point d'entrée de l'API VoyageAlgérie
 * Fichier : /api/index.php
 */
require_once 'config/db.php';
// Réponse par défaut
$response = [
    'success' => true,
    'message' => 'Bienvenue sur l\'API VoyageAlgérie',
    'version' => '1.0.0',
    'endpoints' => [
        'auth' => [
            'POST /register.php' => 'Inscription d\'un nouvel utilisateur',
            'POST /login.php' => 'Connexion d\'un utilisateur',
        ],
        'voyages' => [
            'GET /voyages.php' => 'Liste des voyages (paramètres: type, search)',
            'GET /voyages.php?id=1' => 'Détail d\'un voyage',
            'POST /voyages.php' => 'Créer un voyage',
        ],
        'reservations' => [
            'GET /reservations.php?user_id=1' => 'Liste des réservations',
            'POST /reservations.php' => 'Créer une réservation',
            'DELETE /reservations.php?id=1&user_id=1' => 'Annuler une réservation',
        ],
    ],
    'documentation' => 'Voir README.md pour plus de détails',
];

echo json_encode($response, JSON_PRETTY_PRINT);
