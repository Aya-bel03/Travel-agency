<?php
/**
 * API d'inscription
 * POST /api/register.php
 * Body: { nom, prenom, email, password }
 */

require_once 'config/db.php';

// Vérifier que la méthode est POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJSONResponse(['error' => 'Méthode non autorisée'], 405);
}

// Récupérer les données
$data = getJSONInput();

// Validation des champs
$requiredFields = ['nom', 'prenom', 'email', 'password'];
foreach ($requiredFields as $field) {
    if (empty($data[$field])) {
        sendJSONResponse(['error' => "Le champ '$field' est requis"], 400);
    }
}

$nom = trim($data['nom']);
$prenom = trim($data['prenom']);
$email = trim($data['email']);
$password = $data['password'];

// Validation de l'email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    sendJSONResponse(['error' => 'Adresse email invalide'], 400);
}

// Validation du mot de passe (minimum 6 caractères)
if (strlen($password) < 6) {
    sendJSONResponse(['error' => 'Le mot de passe doit contenir au moins 6 caractères'], 400);
}

try {
    $db = getDBConnection();
    
    // Vérifier si l'email existe déjà
    $stmt = $db->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    
    if ($stmt->fetch()) {
        sendJSONResponse(['error' => 'Cet email est déjà utilisé'], 409);
    }
    
    // Hasher le mot de passe
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
    
    // Insérer l'utilisateur
    $stmt = $db->prepare("INSERT INTO users (nom, prenom, email, password) VALUES (?, ?, ?, ?)");
    $stmt->execute([$nom, $prenom, $email, $hashedPassword]);
    
    $userId = $db->lastInsertId();
    
    // Générer un token
    $token = generateToken();
    
    // Stocker le token (créer la table si nécessaire)
    $db->exec("CREATE TABLE IF NOT EXISTS user_tokens (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        token VARCHAR(255) NOT NULL,
        expires_at DATETIME NOT NULL DEFAULT (DATE_ADD(NOW(), INTERVAL 24 HOUR)),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )");
    
    $stmt = $db->prepare("INSERT INTO user_tokens (user_id, token, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 24 HOUR))");
    $stmt->execute([$userId, $token]);
    
    // Réponse de succès
    sendJSONResponse([
        'success' => true,
        'message' => 'Inscription réussie',
        'user' => [
            'id' => $userId,
            'nom' => $nom,
            'prenom' => $prenom,
            'email' => $email
        ],
        'token' => $token
    ], 201);
    
} catch (Exception $e) {
    sendJSONResponse(['error' => 'Erreur serveur: ' . $e->getMessage()], 500);
}
