<?php
if (!isset($_SESSION)) {
	session_start();
}
include "../inc/htr_config.php";
$path = "../22062014/";

if(isset($_POST['table'])) 
{

	$mysqli=openDataBase(); 
	if($mysqli->query("delete from ".$_POST['table'].".posts where posts.postID =".$_POST['postID']))
	{
		$targetFile = $_POST['nameNew'];
		if (file_exists($path.$targetFile)) {
		  unlink($path.$targetFile);
		  unlink($path.'small_'.$targetFile);
		  unlink($path.'info_'.$targetFile);
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