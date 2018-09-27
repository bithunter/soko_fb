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

			return 0;//error: unupported/no exif info found...

/* Inhalt (Beispiel): 

Response: FILE.FileName: 35e8dda4224b1be898c812dcfd3154e5.jpg<br>
FILE.FileDateTime: 1537544847<br>
FILE.FileSize: 885137<br>
FILE.FileType: 2<br>
FILE.MimeType: image/jpeg<br>
FILE.SectionsFound: ANY_TAG, IFD0, THUMBNAIL, EXIF, GPS, INTEROP<br>
COMPUTED.html: width="4032" height="3024"<br>
COMPUTED.Height: 3024<br>
COMPUTED.Width: 4032<br>
COMPUTED.IsColor: 1<br>
COMPUTED.ByteOrderMotorola: 0<br>
COMPUTED.ApertureFNumber: f/2.4<br>
COMPUTED.UserComment: <br>
COMPUTED.UserCommentEncoding: UNDEFINED<br>
COMPUTED.Thumbnail.FileType: 2<br>
COMPUTED.Thumbnail.MimeType: image/jpeg<br>
COMPUTED.Thumbnail.Height: 384<br>
COMPUTED.Thumbnail.Width: 512<br>
IFD0.Orientation: 6<br>
IFD0.YCbCrPositioning: 1<br>
IFD0.XResolution: 72/1<br>
IFD0.YResolution: 72/1<br>
IFD0.ResolutionUnit: 2<br>
IFD0.Make: samsung<br>
IFD0.Model: SM-G965F<br>
IFD0.Software: G965FXXU1BRF8<br>
IFD0.DateTime: 2018:07:19 06:19:38<br>
IFD0.Exif_IFD_Pointer: 213<br>
IFD0.GPS_IFD_Pointer: 766<br>
THUMBNAIL.ImageWidth: 512<br>
THUMBNAIL.ImageLength: 384<br>
THUMBNAIL.Compression: 6<br>
THUMBNAIL.Orientation: 6<br>
THUMBNAIL.JPEGInterchangeFormat: 1073<br>
THUMBNAIL.JPEGInterchangeFormatLength: 13733<br>
EXIF.ExposureTime: 1/1942<br>
EXIF.FNumber: 240/100<br>
EXIF.ExposureProgram: 2<br>
EXIF.ISOSpeedRatings: 50<br>
EXIF.ExifVersion: 0220<br>
EXIF.DateTimeOriginal: 2018:07:19 06:19:38<br>
EXIF.DateTimeDigitized: 2018:07:19 06:19:38<br>
EXIF.ShutterSpeedValue: 1094/100<br>
EXIF.ApertureValue: 252/100<br>
EXIF.BrightnessValue: 940/100<br>
EXIF.ExposureBiasValue: 0/10<br>
EXIF.MaxApertureValue: 116/100<br>
EXIF.MeteringMode: 2<br>
EXIF.Flash: 0<br>
EXIF.FlashPixVersion: 0100<br>
EXIF.ComponentsConfiguration: ����<br>
EXIF.FocalLength: 430/100<br>
EXIF.SubSecTime: 0008<br>
EXIF.SubSecTimeOriginal: 0008<br>
EXIF.SubSecTimeDigitized: 0008<br>
EXIF.UserComment: �������������<br>
EXIF.ColorSpace: 1<br>
EXIF.ExifImageWidth: 4032<br>
EXIF.ExifImageLength: 3024<br>
EXIF.ExposureMode: 0<br>
EXIF.WhiteBalance: 0<br>
EXIF.FocalLengthIn35mmFilm: 26<br>
EXIF.SceneCaptureType: 0<br>
EXIF.ImageUniqueID: I12LLKF00SM I12LLLD01GM
<br>
EXIF.InteroperabilityOffset: 736<br>
GPS.GPSVersion: ����<br>
GPS.GPSLatitudeRef: N<br>
GPS.GPSLatitude: Array<br>
GPS.GPSLongitudeRef: E<br>
GPS.GPSLongitude: Array<br>
GPS.GPSAltitudeRef: �<br>
GPS.GPSAltitude: 2071/1<br>
GPS.GPSDateStamp: 2018:07:19<br>
GPS.GPSTimeStamp: Array<br>
GPS.GPSProcessingMode: ASCII���GPS�<br>
INTEROP.InterOperabilityIndex: R98<br>
INTEROP.InterOperabilityVersion: 0100<br>
*/
 
		//echo "Explode: ".multiexplode(array(":"," "),@$exif['EXIF']['DateTimeOriginal'])[2]." - ".multiexplode(array(":"," "),@$exif['EXIF']['DateTimeOriginal'])[3];

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

			//return $lat.' , '.$lon;//return coordinates
			$data = array( 
        	'success' => true,
			'latitude' => $lat,
			'longitude' => $lon,
			'year' => multiexplode(array(":"," "),@$exif['EXIF']['DateTimeOriginal'])[0],
			'month' => multiexplode(array(":"," "),@$exif['EXIF']['DateTimeOriginal'])[1],
			'day' => multiexplode(array(":"," "),@$exif['EXIF']['DateTimeOriginal'])[2],
			'hour' => multiexplode(array(":"," "),@$exif['EXIF']['DateTimeOriginal'])[3],
			'minute' => multiexplode(array(":"," "),@$exif['EXIF']['DateTimeOriginal'])[4],
			'second' => multiexplode(array(":"," "),@$exif['EXIF']['DateTimeOriginal'])[5]
    	);
		return json_encode($data);

		}

	}
	else

	{

		//return false;	//error: file does not exist
		$data = array( 
        	'success' => false,
			'latitude' => '48.208708',
			'longitude' => '16.372303',
			'year' => '1900',
			'month' => '01',
			'day' => '01');
		return json_encode($data);

	}

}
function multiexplode ($delimiters,$string) {
   
    $ready = str_replace($delimiters, $delimiters[0], $string);
    $launch = explode($delimiters[0], $ready);
    return  $launch;
}
?>