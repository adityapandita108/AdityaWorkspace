<?php
/*
|--------------------------------------------------------------------------
| Simple PHP Backend for Portfolio Contact Form
| File: backend.php
|--------------------------------------------------------------------------
| How it works:
| - Accepts POST request
| - Validates name, email, message
| - Sends email
| - Returns JSON response
|--------------------------------------------------------------------------
*/

// CHANGE THIS EMAIL TO YOUR EMAIL
$adminEmail = "your.email@example.com";

// Set JSON response header
header("Content-Type: application/json");

// Allow only POST requests
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid request. Please submit the form properly."
    ]);
    exit;
}

// Get form data safely
$name    = trim($_POST["name"] ?? "");
$email   = trim($_POST["email"] ?? "");
$message = trim($_POST["message"] ?? "");

// Validation
if (empty($name) || empty($email) || empty($message)) {
    echo json_encode([
        "status" => "error",
        "message" => "All fields are required."
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid email address."
    ]);
    exit;
}

// Email content
$subject = "New Portfolio Message from $name";
$body = "
You have received a new message from your portfolio website.

Name: $name
Email: $email

Message:
$message
";

$headers  = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8";

// Send email
if (mail($adminEmail, $subject, $body, $headers)) {
    echo json_encode([
        "status" => "success",
        "message" => "Message sent successfully!"
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Message could not be sent. Server error."
    ]);
}
?>
