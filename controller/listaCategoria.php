<?php
$info = array(array(
    'data' => null,
    'estado' => 0,
    'mensaje' => 'Error al realizar la consulta'
));
if(isset($_POST['valor'])  && $_POST['valor'] != NULL){
    require("./../negocio/Categoria.php");
    $categoria = new Categoria();
    $datos = $categoria->getCategoria();
    header("Content-type: application/json; charset=utf-8");
    echo json_encode($datos);
}else{
    header("Content-type: application/json; charset=utf-8");
    echo json_encode($info);
}
?>