<?php

if (!isset($_SESSION)) {
	session_start(); }
/****************************************************************

Bild auf Server hochladen und mit eindeutigem Namen versehen 


****************************************************************/

	include("../inc/htr_config.php");
	include "mapdata.php";


if (!empty($_FILES)) {

	$ds          = DIRECTORY_SEPARATOR;
	$storeFolder = '../22062014';
	$name = $_FILES['file']['name'];
	$data = file_get_contents($_FILES['file']['tmp_name']);
     
    $tempFile = $_FILES['file']['tmp_name'];             


    $targetPath = $storeFolder . $ds;
     
    $targetFile =  $targetPath . $name;

	// Jedes Bild bekommt einen eindeutigen Namen aus einer Prüfsumme des aktuellen Datums
	// und der User-ID

	$path_parts = pathinfo($name);
	$nameNew = md5(date("d.m.Y H:i:s".$_SESSION['profileID'])).".".$path_parts['extension'];
	rename($targetFile, $targetPath . $nameNew);
	$targetFile =  $targetPath. $nameNew;
 
 	if (file_exists($targetFile)) {
	  unlink($targetFile);
    }

	if (move_uploaded_file($tempFile,$targetFile) /*&& isset($_POST['profileID'])*/)
	{
 		$mysqli = openDataBase();

		// in Testphase altes Bild löschen
		$result = $mysqli->query("SELECT pictureName FROM posts WHERE postID = 10");
		$row = $result->fetch_row(); 

		if($row[0] > 0){
   		 $delName = $result->fetch_object()->pictureName;
		 if (file_exists($targetPath.$delName)) {
		 	unlink($targetPath.$delName);
			unlink($targetPath."small_".$delName);
			unlink($targetPath."info_".$delName);
		 }
		}


		$adata = json_decode(extract_exif_geotags_coordinates($targetFile));

		_makeThumbs("small_", $nameNew, 480);
		_makeThumbs("info_", $nameNew, 200);

		
	$d=mktime($adata->{'hour'}, $adata->{'minute'}, $adata->{'second'}, $adata->{'month'}, $adata->{'day'}, $adata->{'year'});
		
		$mysqli->query("DELETE FROM `posts` WHERE `postID` = 10");		// in Testphase altes Bild löschen
  		$mysqli->query("INSERT INTO `posts` (`postID`, `profileID`, `pictureDate`, `type`, `pictureName`, `pictureOrgName`, `latitude`, `longitude`) VALUES('10', '".$_SESSION['profileID']."', '". date("Y-m-d h:i:s", $d)."', '1', '".$nameNew."', '".$name."', '".$adata->{'latitude'}."', '".$adata->{'longitude'}."')");
  		$picID = mysqli_insert_id($mysqli);


		$mysqli->close();
		$data = array( 
        	'success' => true,
			'picID' => $picID,
			'latitude' => trim($adata->{'latitude'}),
			'longitude' => trim($adata->{'longitude'}),
			'year' => trim($adata->{'year'}),
			'month' => trim($adata->{'month'}),
			'day' => trim($adata->{'day'}),
			'hour' => trim($adata->{'hour'}),
			'minute' => trim($adata->{'minute'}),
			'second' => trim($adata->{'second'}),
			'nameOld' => $name,
			'nameNew' => $nameNew
    	);
		echo json_encode($data);
	}
	else		// Fehler beim Hochladen bzw. nicht angemeldet
	{
		$data = array( 
        	'success' => false
    	);
		echo json_encode($data);
	}
}
/****************************************************************

Vorschaubild für den Newsfeed erstellen  


****************************************************************/
function _makeThumbs($_ap, $source, $max_width) { //, $max_height) {
	// Funktion von IT-Runde.de
	global $targetPath;
	$target = $targetPath . $_ap . $source;

	if (file_exists($target)) {
      //echo $fileName . " already exists. ";
	  unlink($target);
    }

	$image = $targetPath . $source;
	$picsize     = getimagesize($image);
	if(($picsize[2]==1)OR($picsize[2]==2)OR($picsize[2]==3)) {
	if($picsize[2] == 1) {
	  $src_img     = imagecreatefromgif($image);
	}
	if($picsize[2] == 2) {
	  $quality=100;
	  $src_img     = imagecreatefromjpeg($image);
	}
	if($picsize[2] == 3) {
	  $quality=9;
	  $src_img     = imagecreatefrompng($image);
	}
	$src_width   = $picsize[0];
	$src_height  = $picsize[1];
	//$skal_vert = $max_height/$src_height;
	//$skal_hor = $max_width/$src_width;
	$skal = $max_width/$src_width;
	//$skal = min($skal_vert, $skal_hor);
	if ($skal > 1) {
	 $skal = 1;
	}
	$dest_height = $src_height*$skal;
	$dest_width = $src_width*$skal;
	$dst_img = imagecreatetruecolor($dest_width,$dest_height);
	imagecopyresampled($dst_img, $src_img, 0, 0, 0, 0, $dest_width, $dest_height, $src_width, $src_height);
	if($picsize[2] == 1) {
	  imagegif($dst_img, $target);
	}
	if($picsize[2] == 2) {
	  imagejpeg($dst_img, $target, $quality);
	}
	if($picsize[2] == 3) {
	  imagepng($dst_img, $target, $quality);
	}
	imagedestroy($dst_img);
	}
}
?>