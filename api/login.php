<?php
/**
 * API de connexion
 * POST /api/login.php
 * Body: { email, password }
 */

require_once 'config/db.php';

// Vérifier que la méthode est POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJSONResponse(['error' => 'Méthode non autorisée'], 405);
}

// Récupérer les données
$data = getJSONInput();

// Validation des champs
if (empty($data['email']) || empty($data['password'])) {
    sendJSONResponse(['error' => 'Email et mot de passe requis'], 400);
}

$email = trim($data['email']);
$password = $data['password'];

try {
    $db = getDBConnection();
    
    // Récupérer l'utilisateur par email
    $stmt = $db->prepare("SELECT id, nom, prenom, email, password FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    
    // Vérifier si l'utilisateur existe
    if (!$user) {
        sendJSONResponse(['error' => 'Email ou mot de passe incorrect'], 401);
    }
    
    // Vérifier le mot de passe
    if ($password !== $user['password']) {
        sendJSONResponse(['error' => 'Email ou mot de passe incorrect'], 401);
    }
    
    // Générer un token
    $token = generateToken();
    
    // Créer la table des tokens si elle n'existe pas
    $db->exec("CREATE TABLE IF NOT EXISTS user_tokens (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        token VARCHAR(255) NOT NULL,
        expires_at DATETIME NOT NULL DEFAULT (DATE_ADD(NOW(), INTERVAL 24 HOUR)),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )");
    
    // Supprimer les anciens tokens de l'utilisateur
    $stmt = $db->prepare("DELETE FROM user_tokens WHERE user_id = ?");
    $stmt->execute([$user['id']]);
    
    // Insérer le nouveau token
    $stmt = $db->prepare("INSERT INTO user_tokens (user_id, token, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 24 HOUR))");
    $stmt->execute([$user['id'], $token]);
    
    // Réponse de succès
    sendJSONResponse([
        'success' => true,
        'message' => 'Connexion réussie',
        'user' => [
            'id' => $user['id'],
            'nom' => $user['nom'],
            'prenom' => $user['prenom'],
            'email' => $user['email']
        ],
        'token' => $token
    ]);
    
} catch (Exception $e) {
    sendJSONResponse(['error' => 'Erreur serveur: ' . $e->getMessage()], 500);
}
