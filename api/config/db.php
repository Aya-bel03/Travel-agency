<?php

/**
 * Configuration de la base de données et Headers CORS
 * Version Finale - Sans répétition
 */
ini_set('display_errors', 1);
error_reporting(E_ALL);
// 1. إعدادات الـ CORS (توضع مرة واحدة فقط هنا)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// التعامل مع طلبات OPTIONS (Preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 2. معلومات الاتصال
define('DB_HOST', 'localhost');
define('DB_NAME', 'voyage_algerie');
define('DB_USER', 'root');
define('DB_PASS', ''); 

/**
 * إنشاء الاتصال بقاعدة البيانات
 */
function getDBConnection() {
    try {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];
        return new PDO($dsn, DB_USER, DB_PASS, $options);
    } catch (PDOException $e) {
        // إذا فشل الاتصال نرسل JSON ونحبس الكود
        http_response_code(500);
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'error' => "Connection failed: " . $e->getMessage()]);
        exit();
    }
}

/**
 * دالة إرسال الاستجابة (بدون تكرار الـ Headers)
 */
function sendJSONResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
    exit();
}

/**
 * استقبال بيانات JSON من React
 */
function getJSONInput() {
    $json = file_get_contents('php://input');
    return json_decode($json, true) ?? [];
}

/**
 * التحقق من التوكن (للأمان)
 */
function verifyAuth() {
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? '';
    
    if (empty($authHeader) || !preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
        return false;
    }
    
    $token = $matches[1];
    
    try {
        $db = getDBConnection();
        $stmt = $db->prepare("SELECT u.* FROM users u 
                             JOIN user_tokens ut ON u.id = ut.user_id 
                             WHERE ut.token = ? AND ut.expires_at > NOW()");
        $stmt->execute([$token]);
        return $stmt->fetch() ?: false;
    } catch (Exception $e) {
        return false;
    }
}

function generateToken() {
    return bin2hex(random_bytes(32));
}