<?php
if (!isset($_SESSION)) {
	session_start();
}
include "../../../../Connections/heritrace.php";

if(isset($_POST['table'])) 
{
  $table = $_POST['table'];
  $field = $_POST['field'];
  $name = $_POST['name'];	// Name der Sessionvarible, die das Ergebnis speichert
  $path ="../";
}
else
{
	// Parameter fehlen
}
$mysqli=openDataBase(); 
$q_data = $mysqli->query("select ".$field." from ".$table." where profileID = 1");
if($r_data = $q_data->fetch_assoc())
{

    $data = array( 
        'success' => true, 
        'facebookID' => $r_data[$field] 
    ); 

    echo json_encode($data);

	$_SESSION[$name] = $r_data[$field];
} else {
	$data = array( 
        'success' => false, 
        'facebookID' => NULL 
    );
	echo json_encode($data);
}

$mysqli->close();