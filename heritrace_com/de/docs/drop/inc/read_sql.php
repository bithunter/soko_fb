<?php
if (!isset($_SESSION)) {
	session_start();
}
include "../../../../Connections/heritrace.php";

if(isset($_POST['table'])) 
{
  $table = $_POST['table'];
  $field = $_POST['field'];
  $condition = $_POST['condition'];
}
else
{
	// Parameter fehlen
}
$mysqli=openDataBase(); 
$q_data = $mysqli->query("select ".$field." from ".$table." where ".$condition);
if($r_data = $q_data->fetch_assoc())
{

    $data = array( 
        'success' => true, 
        'result' => $r_data
    ); 

    echo json_encode($data);

} else {
	$data = array( 
        'success' => false, 
        'result' => NULL 
    );
	echo json_encode($data);
}

$mysqli->close();