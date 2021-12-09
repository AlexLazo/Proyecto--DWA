<?php
if(empty($_POST['name']) || empty($_POST['subject']) || empty($_POST['message']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
  http_response_code(500);
  exit();
}

$name = strip_tags(htmlspecialchars($_POST['name']));
$email = strip_tags(htmlspecialchars($_POST['email']));
$m_subject = strip_tags(htmlspecialchars($_POST['subject']));
$message = strip_tags(htmlspecialchars($_POST['message']));

$to = "alex.lazo1403@gmail.com";
$subject = "$m_subject:  $name";
$body = "Has recibido un nuevo mensaje de tu sitio web.\n\n"."Aquí están los detalles:\n\nNombre: $name\n\n\nE-mail: $email\n\nMotivo: $subject\n\nMensaje: $message";
$header = "From: $email";
$header = "Reply-To: $email";	

if(!mail($to, $subject, $body, $header))
  http_response_code(500);
?>