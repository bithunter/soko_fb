<?php
function extract_exif_geotags_coordinates($local_filename)

{
	if(file_exists($local_filename)) //check this only with local files

	{
		$exif=@exif_read_data($local_filename,0,true);
		/*foreach ($exif as $key => $section) {
    	 foreach ($section as $name => $val) {
        echo "$key.$name: $val<br />\n";
        if ($name=="GPSLatitude"){
          print_r($val);
          echo "<br>";
        }
    
        if ($name=="GPSLongitude"){
          print_r($val);
          echo "<br>";
        }
  		}
		}*/

		if(!$exif)

			return false;//error: unupported/no exif info found...

		if(@$exif['GPS']['GPSLongitude'][0])//check only one - should be enough

		{
			$grad_a = explode("/", $exif['GPS']['GPSLongitude'][0]); $grad = ($grad_a[1] ? $grad_a[0]/$grad_a[1] : $grad_a[0]);
			$min_a = explode("/", $exif['GPS']['GPSLongitude'][1]); $min = ($min_a[1] ? $min_a[0]/$min_a[1] : $min_a[0]);
			$sek_a = explode("/", $exif['GPS']['GPSLongitude'][2]); $sek = ($sek_a[1] ? $sek_a[0]/$sek_a[1] : $sek_a[0]);


			$lon=($grad+($min+$sek/60)/60);

			$lonref=$exif['GPS']['GPSLongitudeRef'];

			if($lonref=='W')

				$lon=-$lon;

			$grad_a = explode("/", $exif['GPS']['GPSLatitude'][0]); $grad = ($grad_a[1] ? $grad_a[0]/$grad_a[1] : $grad_a[0]);
			$min_a = explode("/", $exif['GPS']['GPSLatitude'][1]); $min = ($min_a[1] ? $min_a[0]/$min_a[1] : $min_a[0]);
			$sek_a = explode("/", $exif['GPS']['GPSLatitude'][2]); $sek = ($sek_a[1] ? $sek_a[0]/$sek_a[1] : $sek_a[0]);


			$lat=($grad+($min+$sek/60)/60);


			$latref=$exif['GPS']['GPSLatitudeRef'];

			if($latref=='S')

				$lat=-$lat;

			return $lat.', '.$lon;//return coordinates

		} else return false;	//error: no geo-information

	}
	else

	{

		return false;	//error: file does not exist

	}

}
?>