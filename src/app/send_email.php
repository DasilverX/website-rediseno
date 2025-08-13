<?php
// Permite que cualquier dominio acceda a este script (CORS). ¡Ajusta esto en producción a tu dominio de Angular por seguridad!
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Solo procesar si es una petición POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    
    // Obtener el cuerpo de la petición (que es JSON enviado por Angular)
    $json = file_get_contents('php://input');
    $data = json_decode($json);

    // --- Validación y Limpieza de Datos (¡MUY IMPORTANTE!) ---
    if (!isset($data->nombre) || !isset($data->email) || !isset($data->asunto) || !isset($data->mensaje)) {
        http_response_code(400); // Bad Request
        echo json_encode(["message" => "Faltan datos en el formulario."]);
        exit();
    }

    $nombre = filter_var(trim($data->nombre), FILTER_SANITIZE_STRING);
    $email = filter_var(trim($data->email), FILTER_SANITIZE_EMAIL);
    $asunto = filter_var(trim($data->asunto), FILTER_SANITIZE_STRING);
    $mensaje = filter_var(trim($data->mensaje), FILTER_SANITIZE_STRING);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["message" => "El formato del email es inválido."]);
        exit();
    }
    
    // --- Componer y Enviar el Correo ---
    $destinatario = "info@3techpanama.com"; // El email de destino
    $cabeceras = "From: " . $nombre . " <" . $email . ">";
    $cuerpoMensaje = "Nombre: " . $nombre . "\n";
    $cuerpoMensaje .= "Email: " . $email . "\n";
    $cuerpoMensaje .= "Mensaje:\n" . $mensaje;

    // Usar la función mail() de PHP
    if (mail($destinatario, $asunto, $cuerpoMensaje, $cabeceras)) {
        http_response_code(200); // OK
        echo json_encode(["message" => "Correo enviado exitosamente."]);
    } else {
        http_response_code(500); // Internal Server Error
        echo json_encode(["message" => "No se pudo enviar el correo."]);
    }

} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(["message" => "Método no permitido."]);
}
?>