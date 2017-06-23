<?php
$user = $_POST['user'];
$pass = $_POST['pass'];
require_once '../controlador/conexion.php';
$db = new conexion();
$db->conectar();
$query = "SELECT * FROM usuarios WHERE user = '" . $user . "'";
$consulta = $db->consultaBd($query);
if($db->numero_filas($consulta)>0){
    $query = "SELECT * FROM usuarios WHERE user = '" . $user . "' AND pass = '" . $pass . "'";
    $consulta = $db->consultaBd($query);
    if($db->numero_filas($consulta)>0){
        echo "ok";
    }else{
        echo "pass";
    }
}else{
    echo "user";
}