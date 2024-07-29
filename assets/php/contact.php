<?php

function SetError($error) {
	$_POST['contactError'] = $error;
}

// If contact button pressed
if($_SERVER['REQUEST_METHOD'] != 'POST' || !isset($_POST['contactButton']))
	return;

// Get values
$name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
$email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
$message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

if(!empty($_POST['phone'])) {
	return;
}

if($_POST['last_name'] !== "uytfcvbnjkiuhg") {
	return;
}

// Check if all fields are filled
if(empty($name) || empty($email) || empty($message)) {
	SetError("Please fill all fields");
	return;
}

// Validate email
if(filter_var($email, FILTER_VALIDATE_EMAIL) === false){
	SetError("Please enter a valid email");
	return;
}

// Setup email
$toEmail = "contact@wilschack.dev";
$emailSubject = "{$name} sent an email through your website";
$headers = ['From' => $email, 'Reply-To' => $email, 'Content-Type' => 'text/html; charset=iso-8859-1'];

$bodyParagraphs = ["Name: {$name} ({$email})", "Message: {$message}"];
$body = join(PHP_EOL, $bodyParagraphs);

echo $toEmail;
echo $emailSubject;
echo $body;
echo implode(", ", $headers);

if(mail($toEmail, $emailSubject, $body, $headers)) {
	SetError("Email Sent!");
} else {
	SetError("Something went wrong, please try again later");
}

?>