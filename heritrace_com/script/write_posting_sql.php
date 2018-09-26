<?php
include "../../Connections/heritrace.php";

if(isset($_POST['profileID'])) 
{
  $mysqli=openDataBase();
  $mysqli->query("INSERT INTO `posts` (`profileID`, `type`, `pictureName`, `latitude`, `longitude`, `description`, `verified`, `completed`) VALUES(".$_POST['profileID'].", 1,'".$_POST['pictureName']."','".$_POST['latitude']."', '".$_POST['longitude']."', '".$_POST['description']."', 0, 0)");
  $postID = $mysqli->insert_id;

  $data = array( 
        'success' => true,
		'postID' => $postID
    );
	echo json_encode($data);

$mysqli->close();
}
else
{
	$data = array( 
        'success' => false
    );
	echo json_encode($data);
}