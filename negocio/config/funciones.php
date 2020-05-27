<?php
include('conexion.php');
class funciones extends conexion{

    public function __construct() {   }

    public function setConsultaMySQL($Consulta){
        return $this->consultar($Consulta, 0);
    }
    
    public function setConsultaMySQL_ID($Consulta){
        return  $this->consultar($Consulta, 1);
    }
} 
?>