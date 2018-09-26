
var uploadProperties = {
			picID: 0,
			latitude: 0,
			longitude: 0,
			coord: null,
			nameNew: null,
			userID: null,
			};


function respondToCancel(event) {
	update_posting(PageProperties.postID, $("latbox").value.strip(), $("lngbox").value.strip(), $("picDescr").value, 0);
	_dr0(event);
}
function respondToSave(event) {
	update_posting(PageProperties.postID, $("latbox").value.strip(), $("lngbox").value.strip(), $("picDescr").value, 1);
	_dr0(event);
}

function setMapPos(map,coord) {
  c=coord.split(",");
  myLatlng = new google.maps.LatLng(parseFloat(c[0]), parseFloat(c[1]));
  google.maps.event.trigger(map, 'resize');		// Karte neu zeichnen, da div zuvor unsichtbar und Größe unbek. war
  placeMarker(myLatlng, map, 15);
}


function placeMarker(position, map, zoom) {
  marker.setPosition(position);
  map.panTo(position);
  map.setZoom(zoom);
}
function _dr0(event){
$('multiselect').setStyle({ display: 'block' });
	$('pic_description').setStyle({ display: 'none' });
	$('newpic').setStyle({ display: 'none' });
	$('button-cancel').stopObserve('click', respondToCancel);
	$('button-save').stopObserve('click', respondToSave);
	PageProperties.picID = 0;
	PageProperties.postID = 0;
}