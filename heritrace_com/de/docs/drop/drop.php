<?php

if (!isset($_SESSION)) {
	session_start();

$_SESSION['profileID'] = 123;

}
		require_once( '../../../Connections/heritrace.php' );
		//include( "../WA_SecurityAssist/Helper_PHP.php" );
		include "../../inc/include.php";
		//include "../inc/facebookApi.php";



//if (!WA_Auth_RulePasses("Logged Facebook")){
//	WA_Auth_RestrictAccess("startup.php"); // falls nicht angemeldet, Intro laden }
?>
<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>Dropzone-Demo</title>

<script src="prototype.js"></script>
<script src="dropzone.js"></script>

<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBycEf-6t4rOfVDajZAQg97KTHK2WpN5mE&libraries=places&sensor=true"></script>

<link rel="stylesheet" type="text/css" href="dropzone.css" />
<link rel="stylesheet" type="text/css" href="drop.css" />

</head>

<body>


<div class="mydropzone" id="drop_div">
<form action="upload.php" id="fileUpload" class="dropzone">
	<div class="fallback">
    	<input name="file" type="file" />
  	</div>
</form>
</div>
<div id="position" class="position">
	<div class="pdescr" id="pic_description"></div>
	<div id="newpic">
		<input id="pacInput" class="controls" type="text" placeholder="Ort suchen">
		<div id="mapcontainer"></div>
	</div>
</div>

<script>
// Upload gibt hier Infos über das Bild zurück

var uploadProperties = {
			picID: 0,			// ID des Bildes in der Datenbank
			latitude: 0,			// Bildposition
			longitude: 0,
			coord: null,			// lat und long durch Komma getrennt
			nameNew: null,		// neuer, verschlüsselter und eindeutiger Bildname - keine Duplikate möglich
			userID: <?php echo $_SESSION['profileID']; ?>,
			file: 0,				// Dropzone file-object
			map: null,			// googlemaps map-object
			marker: null			// aktueller Marker der Karte
			};


  // myDropzone is the configuration for the element that has an id attribute
  // with the value my-dropzone (or myDropzone)
  Dropzone.options.fileUpload = {
	  paramName: "file", // The name that will be used to transfer the file
	  optheight: null,
	  dictDefaultMessage: "Bild/Foto hierher ziehen",
	  dictHoverMessage: "Bild/Foto hier ablegen",
  
  maxFilesize: 5, // MB
  uploadMultiple: false,
  accept: function(file, done) {
    if (file.name == "justinbieber0.jpg") {
      done("Naha, you don't.");				// Fehlermeldung bei diesem Filenamen, kein Upload
    }
    else { done(); }
  },
    init: function() {
      this.on("addedfile", function(file) {

		uploadProperties.file = file;
	
	  this.on("complete", function(files) { 		// Upload abgeschlossen



//	notwendige Informationen zum hochgeladenen Bild holen

		$('pic_description').innerHTML = '<div id="pic-descr"><textarea id="picDescr" class="cdtxt" placeholder="Bildbeschreibung eingeben..." rows="5"></textarea></div>';

		$('post-controls').innerHTML = '<div><input type="text" class="text" id="latbox" value="'+uploadProperties.latitude+'" readonly></div><div><input type="text" class="text" id="lngbox" value="'+uploadProperties.longitude+'" readonly></div><div class="cdsupl" id="cntrBtn"><button id="rb" class="cancelBtn">Abbruch</button><button id="sb" class="saveBtn">Speichern</button></div>';
 
 // Capture the Dropzone instance as closure.
        var _this = this;
/****************************************************************

Abbruch-Button gedrückt
Bild vom Server löschen, Bildschirm wieder herstellen


****************************************************************/
		  $("rb").addEventListener("click", function(e) {
          // Make sure the button click doesn't submit the form:
          e.preventDefault();
          e.stopPropagation();

          // Remove the file preview.
          _this.removeFile(file);
		  $('position').setStyle({ display: 'none' });
		  //$('pic_description').innerHTML = '';
		  //$('post-controls').innerHTML = '';
		  //$("rb").removeEventListener("click");
		  uploadProperties.marker.setMap(null);
		  uploadProperties.marker= null;
		  for (i=0;i<3;i++) google.maps.event.removeListener(gmL[i]);

          // If you want to the delete the file on the server as well,
          // you can do the AJAX request here.
		  delete_posting("heritrace", uploadProperties.picID, uploadProperties.nameNew);
		});
/****************************************************************

Speichern-Button gedrückt
Änderungen und Eingaben speichern, Bildschirm wieder herstellen


****************************************************************/
        $("sb").addEventListener("click", function(e) {
          // Make sure the button click doesn't submit the form:
          e.preventDefault();
          e.stopPropagation();

          // remove the File from display
          _this.removeFile(file);
		  $('position').setStyle({ display: 'none' });
		  //$('pic_description').innerHTML = '';
		  //$('post-controls').innerHTML = '';
		  //$("rb").removeEventListener("click");
		  uploadProperties.marker.setMap(null);
		  uploadProperties.marker= null;
		  for (i=0;i<3;i++) google.maps.event.removeListener(gmL[i]);
		  $('position').setStyle({ display: 'none' });

		  // If you want to the save the file in a database,
         // you can do the AJAX request here.


 });

/****************************************************************

Karte zeichnen
Karte wird an Bildposition zentriert
Sollten beim Bild keine Informationen über den Aufnahmeort
gespeichert sein, dann wird am Stephansplatz in Wien 
zentriert

****************************************************************/
var myLatlng = new google.maps.LatLng(parseFloat(48.208708), parseFloat(16.372303));
var defZoom = 15;

  var mapOptions = {
    center: myLatlng,
	mapTypeControl: true,
    zoomControl: true,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.DEFAULT
    },
    mapTypeId: google.maps.MapTypeId.ROADMAP,
	zoom: defZoom
  }
  if(!uploadProperties.map) { 	// wurde schon bei einem vorherigen Upload eine Karte erstellt?
 
  	var map = new google.maps.Map($("mapcontainer"), mapOptions);
  	uploadProperties.map = map;

	/*var defaultBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(-33.8902, 151.1759),
    new google.maps.LatLng(-33.8474, 151.2631));
	map.fitBounds(defaultBounds);*/

	var input = /** @type {HTMLInputElement} */$('pacInput');
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

	var searchBox = new google.maps.places.SearchBox(input);
	uploadProperties.searchBox = searchBox;
  } else {
	  map = uploadProperties.map;
	  searchBox = uploadProperties.searchBox;
	  map.setMapTypeId(google.maps.MapTypeId.ROADMAP);	// Kartenmodus erzwingen
  }

  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
	  draggable: true,
      title: 'Bildposition bestimmen'
  });
  uploadProperties.marker = marker;
  
  var gmL = [];
  gmL[0]=google.maps.event.addListener(map, 'click', function(event) {
    placeMarker(event.latLng, map, defZoom);
	$("latbox").value = event.latLng.lat();
    $("lngbox").value = event.latLng.lng();
  });

  gmL[1]=google.maps.event.addListener(marker, 'dragend', function (event) {
    $("latbox").value = this.getPosition().lat();
    $("lngbox").value = this.getPosition().lng();
});

  // [START region_getplaces]
  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
  gmL[2]=google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    var bounds = new google.maps.LatLngBounds();
    place = places[0];
	//map.panTo(place.geometry.location);
	bounds.extend(place.geometry.location);
	map.fitBounds(bounds);
	placeMarker(place.geometry.location, map, defZoom);
	$("latbox").value = place.geometry.location.lat();
    $("lngbox").value = place.geometry.location.lng();
  });


		$('position').setStyle({ display: 'block' });
		setMapPos(map,uploadProperties.coord);




function setMapPos(map,coord) {
  c=coord.split(",");
  myLatlng = new google.maps.LatLng(parseFloat(c[0]), parseFloat(c[1]));
  //google.maps.event.trigger(map, 'resize');		// Karte neu zeichnen, da div zuvor unsichtbar und Größe unbek. war
  placeMarker(myLatlng, map, defZoom);
}


function placeMarker(position, map, zoom) {
  marker.setPosition(position);
  map.setCenter(position); //map.panTo(position);
  map.setZoom(zoom);
}

function delete_posting(table, postID, nameNew) {
	new Ajax.Request('inc/', {
  		parameters: {table: table, postID: postID, nameNew: nameNew },
		onSuccess:	function(data) {
				var adata = data.responseText.evalJSON();
    	  		if (adata.success)  
    	  			{

    	  			} else { console.log("Fehler beim Löschen des Postings")}
  	  	}
	});
}
	//form = $("fileUpload");
	//newname = form['newName'];
	//alert(newname);
		//alert($(newname).getValue());


		/*new Ajax.Request('inc/read_sql.php', {
  			parameters: {table: "posts", field: field, name: name },
			onSuccess:	function(data) {
				var adata = data.responseText.evalJSON();
    	  		if (adata.success) 
    	  			{
		 				//if (name=="facebookID") $('C64').fire("pic:newtask", { task: 2, facebookID: adata.facebookID });
    	  			}
  	  		}
		});*/

		});
      });
    }
  };

/*
document.observe('dom:loaded', function() {
  $('user_loggedin').prototip.show();
});
*/
</script>

</body>
</html>