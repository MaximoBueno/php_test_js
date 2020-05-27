<?php
require('config/funciones.php');
class Categoria{
    public function __construct() {   }

    public function getCategoria(){
        $consultar = new funciones();
        $headerConsulta = "SELECT id_categoria, categoria FROM categoria;";
        $resultado = $consultar->setConsultaMySQL($headerConsulta);
        $impro_ret = array(array(
            'data' => null,
            'estado' => 10,
            'mensaje' => 'No existen Categorias'
        ));
        if($resultado != null){
            $datos = array();
            while($fila=$resultado->fetch_assoc()){
                array_push($datos,
                array(
                'data'                  => $fila,
                'estado'                => 1,
                'mensaje'               => 'Categorias Encontradas'));
            }
            return (count($datos) > 0 ? $datos: $impro_ret );
        }else{
            return $impro_ret;
        }
    }
} 
?>