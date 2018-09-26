<?php
include "../../Connections/heritrace.php";

if(isset($_POST['postID'])) 
{
  $mysqli=openDataBase();
  $mysqli->query("UPDATE posts SET latitude=".$_POST['latitude'].", longitude=".$_POST['longitude'].",pictureDate='".$_POST['dateMake']."',completed=".$_POST['completed'].", description='".$_POST['description']."' WHERE postID=".$_POST['postID']);

  $data = array( 
        'success' => true
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