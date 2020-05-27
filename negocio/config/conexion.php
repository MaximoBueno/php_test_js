<?php
class conexion{
    private static $servidor="localhost";
    private static $usuario="root";
    private static $contrasenia="";
    private static $basedatos="boceto";
    protected function consultar($consultasql, $autogenerado){
        try{
            $mysqlicon = new mysqli(self::$servidor,self::$usuario, self::$contrasenia,self::$basedatos);
            $mysqlicon->set_charset('utf8');
            $resultado = null;
            if($autogenerado == 1){
                $resultado = $mysqlicon->prepare($consultasql);
                $resultado->execute();
                $resultado = $mysqlicon->query('SELECT @my_id;')->fetch_assoc();
            }else{
                $resultado=$mysqlicon->query($consultasql);
            }   
            $mysqlicon->close();
            return $resultado;
        }catch (Exception $e){
            return "Fallo al conectar a MySQL: ".mysqli_connect_error()."<br>"."Tipo de fallo: ".$e."<br>";
        }
    }
}
?>