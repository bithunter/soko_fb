<!doctype html>
<?php 
    class maps 
        { 
        var $testvariable = "12345"; 

        function maps() 
            { 
            # dieses "function" heisst wie die Klasse - sobald die 
            # Klasse mit NEW erstellt wird, wird diese function 
            # als erstes aufgerufen - ohne dass wir sie manuell 
            # starten 
            } 

        function initMap($type) 
        { 
            switch ($type) {
            case 1:                 // openStreetMap
                echo '<link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css"
   integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
   crossorigin="">
 <script src="https://unpkg.com/leaflet@1.3.4/dist/leaflet.js"
   integrity="sha512-nMMmRyTVoLYqjP9hrbed9S+FzjZHW5gY1TWCHA5ckwXZBadntCNs8kEqAWdrb9O7rxbCaA4lKTIWjDXZxflOcA=="
   crossorigin=""></script>';
                break;

            case 2:                 // googleMaps
                break;
            //default:
} 
        } 

        function drawStaticMap($type,$lat,$lng) 
            { 
            	switch ($type) {
					case 1:
						echo '<img src="../../inc/staticmap.php?center='.$lat.','.$lng.'&zoom=16&size=300x120&maptype=landscape&maptype=mapnik&markers='.$lat.','.$lng.',ol-marker-green" width="100%" height="120px">';
						break;
					case 2:
						echo '<img src="https://maps.googleapis.com/maps/api/staticmap?center='.$lat.','.$lng.'&maptype=roadmap&zoom=15&size=470x120&markers=color:blue%7Clabel:S%7C'.$lat.','.$lng.'&key=AIzaSyAfCDbptvrgd56EmthAWko3xI_btbu3JBc">';
						break;
				}
            } 

		function drawMap($type) 
            { 
            	switch ($type) {
					case 1:
						
						break;
					case 2:
						
						break;
				}
            }
        function schreibetestvariable() 
            { 
            echo $this->testvariable . "<br>"; 
            } 
        } 

    $h = NEW maps(); 
    /*$h->schreibehallo(); 
    $h->schreibetext("du da ..."); 
    $h->schreibetestvariable(); 

    $h->testvariable = "67890"; 
    $h->schreibetestvariable();*/ 
?>