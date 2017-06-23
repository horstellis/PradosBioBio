<?php
$nombre = $_POST['nombre'];
$telefono = $_POST['numero'];
$correo = $_POST['correo'];
$mensaje = $_POST['mensaje'];
$body ="Contacto desde pradosbiobio.cl<br/>==============================<br/>Nombre: " . $nombre . "<br/>Telefono: " . $telefono . "<br/>Correo: " . $correo . "<br/>Mensaje:<br/>" . $mensaje;
//echo "Nombre: " . $nombre . "<br/>Telefono: " . $telefono . "<br/>Correo: " . $correo . "<br/>Mensaje: " . $mensaje;  
require '../controlador/phpmailer/PHPMailerAutoload.php';
$mail = new PHPMailer();
$mail->isSMTP();
$mail->SMTPDebug = 2;
$mail->Debugoutput = 'html';
$mail->Host = 'mail.pradosbiobio.cl';
$mail->Port = 25;
//$mail->SMTPSecure = 'tls';
$mail->SMTPAuth = true;
$mail->Username = "felipe@pradosbiobio.cl";
$mail->Password = "caballo17!";
$mail->setFrom('felipe@pradosbiobio.cl','Felipe Berndt');
$mail->addReplyTo('felipe@pradosbiobio.cl','Felipe Berndt');
$mail->addAddress('felipe@pradosbiobio.cl','Felipe Berndt');
$mail->addCC($correo,$nombre);
$mail->Subject = 'Mensaje desde web :::pradosbiobio.cl:::';
$mail->msgHTML($body);
if(!$mail->send()){
    echo "falla";
}else{
    echo "perfecto";
}
?>