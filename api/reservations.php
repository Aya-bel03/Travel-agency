<?php
/**
 * API des réservations
 * GET /api/reservations.php - Liste les réservations de l'utilisateur connecté
 * GET /api/reservations.php?type=local - Filtrer par type de voyage
 * POST /api/reservations.php - Créer une réservation
 * DELETE /api/reservations.php?id=1 - Annuler une réservation
 */

require_once 'config/db.php';

$method = $_SERVER['REQUEST_METHOD'];

try {
    $db = getDBConnection();
    
    // Pour ce projet, on récupère le user_id depuis les paramètres ou le token
    // Dans un vrai projet, on utiliserait verifyAuth()
    
    switch ($method) {
        case 'GET':
            // Récupérer l'ID utilisateur (depuis query param ou token)
            $userId = isset($_GET['user_id']) ? intval($_GET['user_id']) : null;
            $type = isset($_GET['type']) ? $_GET['type'] : null;
            
            if (!$userId) {
                sendJSONResponse(['error' => 'ID utilisateur requis'], 400);
            }
            
            // Construire la requête pour récupérer les réservations avec les détails du voyage
            $sql = "SELECT r.*, v.type as voyage_type, v.destination, v.wilaya, v.prix, 
                           v.date_depart, v.date_retour, v.description, v.image
                    FROM reservations r
                    JOIN voyages v ON r.voyage_id = v.id
                    WHERE r.user_id = ?";
            
            $params = [$userId];
            
            if ($type && in_array($type, ['local', 'international'])) {
                $sql .= " AND v.type = ?";
                $params[] = $type;
            }
            
            $sql .= " ORDER BY r.date_reservation DESC";
            
            $stmt = $db->prepare($sql);
            $stmt->execute($params);
            $reservations = $stmt->fetchAll();
            
            // Calculer le prix total pour chaque réservation
            foreach ($reservations as &$reservation) {
                $reservation['prix_total'] = $reservation['prix'] * $reservation['nb_personnes'];
            }
            
            // Séparer par type
            $reservationsLocaux = array_filter($reservations, function($r) {
                return $r['voyage_type'] === 'local';
            });
            
            $reservationsInternational = array_filter($reservations, function($r) {
                return $r['voyage_type'] === 'international';
            });
            
            sendJSONResponse([
                'success' => true,
                'count' => count($reservations),
                'reservations' => $reservations,
                'reservations_locaux' => array_values($reservationsLocaux),
                'reservations_internationaux' => array_values($reservationsInternational)
            ]);
            break;
            
        case 'POST':
            $data = getJSONInput();
            
            // Validation des champs requis
            if (empty($data['user_id']) || empty($data['voyage_id'])) {
                sendJSONResponse(['error' => 'user_id et voyage_id sont requis'], 400);
            }
            
            $userId = intval($data['user_id']);
            $voyageId = intval($data['voyage_id']);
            $nbPersonnes = isset($data['nb_personnes']) ? intval($data['nb_personnes']) : 1;
            
            if ($nbPersonnes < 1) {
                sendJSONResponse(['error' => 'Le nombre de personnes doit être au moins 1'], 400);
            }
            
            // Vérifier si le voyage existe
            $stmt = $db->prepare("SELECT id, prix FROM voyages WHERE id = ?");
            $stmt->execute([$voyageId]);
            $voyage = $stmt->fetch();
            
            if (!$voyage) {
                sendJSONResponse(['error' => 'Voyage non trouvé'], 404);
            }
            
            // Vérifier si l'utilisateur a déjà réservé ce voyage
            $stmt = $db->prepare("SELECT id FROM reservations WHERE user_id = ? AND voyage_id = ?");
            $stmt->execute([$userId, $voyageId]);
            
            if ($stmt->fetch()) {
                sendJSONResponse(['error' => 'Vous avez déjà réservé ce voyage'], 409);
            }
            
            // Créer la réservation
            $stmt = $db->prepare("INSERT INTO reservations (user_id, voyage_id, nb_personnes) VALUES (?, ?, ?)");
            $result = $stmt->execute([$userId, $voyageId, $nbPersonnes]);
            
            if ($result) {
                $reservationId = $db->lastInsertId();
                $prixTotal = $voyage['prix'] * $nbPersonnes;
                
                sendJSONResponse([
                    'success' => true,
                    'message' => 'Réservation créée avec succès',
                    'reservation_id' => $reservationId,
                    'prix_total' => $prixTotal
                ], 201);
            } else {
                sendJSONResponse(['error' => 'Erreur lors de la création de la réservation'], 500);
            }
            break;
            
        case 'DELETE':
            $id = isset($_GET['id']) ? intval($_GET['id']) : null;
            $userId = isset($_GET['user_id']) ? intval($_GET['user_id']) : null;
            
            if (!$id) {
                sendJSONResponse(['error' => 'ID de réservation requis'], 400);
            }
            
            if (!$userId) {
                sendJSONResponse(['error' => 'ID utilisateur requis'], 400);
            }
            
            // Vérifier que la réservation appartient à l'utilisateur
            $stmt = $db->prepare("SELECT id FROM reservations WHERE id = ? AND user_id = ?");
            $stmt->execute([$id, $userId]);
            
            if (!$stmt->fetch()) {
                sendJSONResponse(['error' => 'Réservation non trouvée ou non autorisée'], 404);
            }
            
            // Supprimer la réservation
            $stmt = $db->prepare("DELETE FROM reservations WHERE id = ?");
            $result = $stmt->execute([$id]);
            
            if ($result) {
                sendJSONResponse([
                    'success' => true,
                    'message' => 'Réservation annulée avec succès'
                ]);
            } else {
                sendJSONResponse(['error' => 'Erreur lors de l\'annulation'], 500);
            }
            break;
            
        default:
            sendJSONResponse(['error' => 'Méthode non autorisée'], 405);
    }
    
} catch (Exception $e) {
    sendJSONResponse(['error' => 'Erreur serveur: ' . $e->getMessage()], 500);
}
