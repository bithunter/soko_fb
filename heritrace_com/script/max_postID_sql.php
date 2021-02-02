<?php
if (!isset($_SESSION)) {
	session_start();
}
include "../inc/htr_config.php";

if(isset($_POST['table'])) 
{
	$mysqli=openDataBase();
	$q_data = mysqli_query($mysqli,"SELECT ".$_POST['field']." FROM ".$_POST['table']." ORDER BY postID DESC LIMIT 1");
	if($r_data = mysqli_fetch_assoc($q_data))
	{

	    $data = array( 
        'success' => true,
        'maxID' => $r_data['postID']);
	} else {
		$data = array( 
        'success' => false );
	}
	mysqli_close();
} else {
	$data = array( 
    'success' => false );
}
echo json_encode($data);
?>