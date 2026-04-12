<?php
require_once 'config/db.php'; // هذا الملف هو اللي يبعث الـ Header المرة الأولى

$method = $_SERVER['REQUEST_METHOD'];

try {
    $db = getDBConnection();
    
    switch ($method) {
        case 'GET':
            // Récupérer les paramètres
            $id = isset($_GET['id']) ? intval($_GET['id']) : null;
            $type = isset($_GET['type']) ? $_GET['type'] : null;
            $search = isset($_GET['search']) ? trim($_GET['search']) : null;
            
            if ($id) {
                // Récupérer un voyage spécifique
                $stmt = $db->prepare("SELECT * FROM voyages WHERE id = ?");
                $stmt->execute([$id]);
                $voyage = $stmt->fetch();
                
                if (!$voyage) {
                    sendJSONResponse(['error' => 'Voyage non trouvé'], 404);
                }
                
                sendJSONResponse([
                    'success' => true,
                    'voyage' => $voyage
                ]);
            } else {
                // Construire la requête avec filtres
                $whereClause = [];
                $params = [];
                
                if ($type && in_array($type, ['local', 'international'])) {
                    $whereClause[] = "type = ?";
                    $params[] = $type;
                }
                
                if ($search) {
                    $whereClause[] = "(destination LIKE ? OR wilaya LIKE ? OR description LIKE ?)";
                    $searchTerm = "%$search%";
                    $params[] = $searchTerm;
                    $params[] = $searchTerm;
                    $params[] = $searchTerm;
                }
                
                $sql = "SELECT * FROM voyages";
                if (!empty($whereClause)) {
                    $sql .= " WHERE " . implode(" AND ", $whereClause);
                }
                $sql .= " ORDER BY created_at DESC";
                
                $stmt = $db->prepare($sql);
                $stmt->execute($params);
                $voyages = $stmt->fetchAll();
                
                // Organiser les voyages par type
                $voyagesLocaux = array_filter($voyages, function($v) {
                    return $v['type'] === 'local';
                });
                
                $voyagesInternational = array_filter($voyages, function($v) {
                    return $v['type'] === 'international';
                });
                
                sendJSONResponse([
                    'success' => true,
                    'count' => count($voyages),
                    'voyages' => $voyages,
                    'voyages_locaux' => array_values($voyagesLocaux),
                    'voyages_internationaux' => array_values($voyagesInternational)
                ]);
            }
            break;
            
        case 'POST':
            // Vérifier l'authentification (optionnel pour ce projet)
            // $user = verifyAuth();
            // if (!$user) {
            //     sendJSONResponse(['error' => 'Non authentifié'], 401);
            // }
            
            $data = getJSONInput();
            
            // Validation des champs requis
            $requiredFields = ['type', 'destination', 'prix', 'date_depart', 'date_retour', 'description'];
            foreach ($requiredFields as $field) {
                if (empty($data[$field])) {
                    sendJSONResponse(['error' => "Le champ '$field' est requis"], 400);
                }
            }
            
            // Validation du type
            if (!in_array($data['type'], ['local', 'international'])) {
                sendJSONResponse(['error' => "Le type doit être 'local' ou 'international'"], 400);
            }
            
            // Si type local, la wilaya est requise
            if ($data['type'] === 'local' && empty($data['wilaya'])) {
                sendJSONResponse(['error' => "La wilaya est requise pour un voyage local"], 400);
            }
            
            $stmt = $db->prepare("INSERT INTO voyages (type, destination, wilaya, prix, date_depart, date_retour, description, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            
            $result = $stmt->execute([
                $data['type'],
                $data['destination'],
                $data['wilaya'] ?? null,
                floatval($data['prix']),
                $data['date_depart'],
                $data['date_retour'],
                $data['description'],
                $data['image'] ?? 'default-voyage.jpg'
            ]);
            
            if ($result) {
                $voyageId = $db->lastInsertId();
                sendJSONResponse([
                    'success' => true,
                    'message' => 'Voyage créé avec succès',
                    'voyage_id' => $voyageId
                ], 201);
            } else {
                sendJSONResponse(['error' => 'Erreur lors de la création du voyage'], 500);
            }
            break;
            
        default:
            sendJSONResponse(['error' => 'Méthode non autorisée'], 405);
    }
    
} catch (Exception $e) {
    sendJSONResponse(['error' => 'Erreur serveur: ' . $e->getMessage()], 500);
}
