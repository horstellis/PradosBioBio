<?php 
class conexion{
	private $conexionBd;

	public function conectar(){
		if(!isset($this->conexionBd)){
			//No existe 
			//Primero Host, usuario, contraseña
			$this->conexionBd=(mysql_connect("localhost","root",""));
			mysql_select_db("horstell_pradosbiobio",$this->conexionBd)or die ("Error ".mysql_error());
			mysql_query("SET NAMES 'UTF8'");
		}
	}
	public function consultaBd($consulta){
		$result=mysql_query($consulta,$this->conexionBd);
		if(!$result){
			echo 'Error Mysql : '.mysql_error();
			exit;
		}
		return $result;
	}
	public function numero_filas($result){
		return mysql_num_rows($result);
	}
	public function fetch_array($result){
		return mysql_fetch_array($result);
	}
	public function cerrarConexion(){
		if(isset($this->conexionBd)){
			mysql_close($this->conexionBd);
		}else{
			echo 'No existe una conexion abierta.';
		}
	}

}