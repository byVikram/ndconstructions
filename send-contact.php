<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["name"] ?? '');
    $email = htmlspecialchars($_POST["email"] ?? '');
    $phone = htmlspecialchars($_POST["phone"] ?? '');
    $projectType = htmlspecialchars($_POST["project_type"] ?? '');
    $message = htmlspecialchars($_POST["message"] ?? '');
    $consent = isset($_POST["consent"]) ? 'Yes' : 'No';

    if (!$name || !$email || !$message || $consent !== 'Yes') {
        echo "Please fill in all required fields and agree to the privacy policy.";
        exit;
    }

    $to = "kmvikram2001@email.com";  // Replace with your email
    $subject = "New Contact Form Submission from $name";
    $body = "Name: $name\nEmail: $email\nPhone: $phone\nProject Type: $projectType\nConsent: $consent\n\nMessage:\n$message";
    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo "Message sent successfully!";
    } else {
        echo "Message failed to send.";
    }
}
?>
