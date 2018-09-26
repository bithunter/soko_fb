<?php
if (!isset($_SESSION)) {
	session_start();
}
include "../../Connections/heritrace.php";

if(isset($_POST['table'])) 
{

	$mysqli=openDataBase(); 
	if($mysqli->query("delete from ".$_POST['table'].".posts where posts.postID =".$_POST['postID']))
	{
		$targetFile = ".." . $ds. $storeFolder . $ds . $_POST['nameNew'];
		if (file_exists($targetFile)) {
		  unlink($targetFile);
    	}
    	$data = array( 
        	'success' => true, 
        	'result' => $targetFile,
    	); 

	} else {
		$data = array( 
        	'success' => false, 
    	    'result' => NULL 
    	);
	}
   	echo json_encode($data);
	$mysqli->close();

}
else
{
	// Parameter fehlen
}