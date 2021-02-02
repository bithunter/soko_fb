/*  add to Prototype
Element.addMethods({
  closest: function closest (element, Rule) {
	"use strict";
    if (!(element = $(element))) { return false; }// kein Wert mitgeliefert
	var r = (true === element.match(Rule)) ? true : (element.up(Rule) ? true : element.up(1).next(Rule));
	if(r) { return element;} else { return false; }
  }
});
*/

	var markerClusterer = null;
    var map = null;
    var imageUrl = 'http://chart.apis.google.com/chart?cht=mm&chs=24x32&' +
          'chco=FFFFFF,008CFF,000000&ext=.png';

	var zoom = -1;	//parseInt(document.getElementById('zoom').value, 10);
    var size = 20;	//parseInt(document.getElementById('size').value, 10);
    var style = -1;	//parseInt(document.getElementById('style').value, 10);
	zoom = zoom === -1 ? null : zoom;
    size = size === -1 ? null : size;
    style = style === -1 ? null: style;


function getViewportOffset(e) {
  var jwindow = $(window),
    scrollLeft = jwindow.scrollLeft(),
    scrollTop = jwindow.scrollTop(),
    offset = e.offset(),
    rect1 = { x1: scrollLeft, y1: scrollTop, x2: scrollLeft + jwindow.width(), y2: scrollTop + jwindow.height() },
    rect2 = { x1: offset.left, y1: offset.top, x2: offset.left + e.width(), y2: offset.top + e.height() };
  return {
    left: offset.left - scrollLeft,
    top: offset.top - scrollTop,
    insideViewport: rect1.x1 < rect2.x2 && rect1.x2 > rect2.x1 && rect1.y1 < rect2.y2 && rect1.y2 > rect2.y1
  };
}
(function($){
    var win = $(window);
    
    $.fn.viewportOffset = function() {
        var offset = $(this).offset();
        
        return {
            left: offset.left - win.scrollLeft(),
            top: offset.top - win.scrollTop()
        };
    };
})(jQuery);


/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
 
  // The base Class implementation (does nothing)
  this.Class = function(){};
 
  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;
   
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;
   
    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" &&
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;
           
            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];
           
            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);        
            this._super = tmp;
           
            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }
   
    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }
   
    // Populate our constructed prototype object
    Class.prototype = prototype;
   
    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;
 
    // And make this class extendable
    Class.extend = arguments.callee;
   
    return Class;
  };
})();


function uri() {
"use strict"; 
var useSSL = 'https:' === document.location.protocol;
 
var src = (useSSL ? 'https:' : 'http:')+'//localhost:8888/heritrace/www/de/';
 
//alert('<scr' + 'ipt src="' + src + '"></scr' + 'ipt>');
alert(document.location);
}

/****************************************************************

Karte zeichnen
Karte wird an Position Wien, Stephansdom - Großes Tor, zentriert

****************************************************************/
// set center coordinates
var centerlat = 48.20876112032762;
var centerlon = 16.37261580746849;

// set default zoom level
var zoomLevel = 15;
function displayMap() {
"use strict";

	$('#bouncepopup').css('display','block');

	
var mymap, marker, popup;

			if(!PageProperties.map) { 	// wurde schon bei einem vorherigen Upload eine Karte erstellt?
				mymap = L.map('popup_map').setView([parseFloat(centerlat),parseFloat(centerlon)], zoomLevel);
				PageProperties.map=mymap;

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYW5keTY3ZXIiLCJhIjoiY2prbnJxNTVxMWNvYzNxbWdoNmJ0NGdxYiJ9.WYPw9rPH6_5ImIfsZOaDdA', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(mymap);
		} else {
	mymap=PageProperties.map;
	mymap.setView([parseFloat(centerlat),parseFloat(centerlon)], zoomLevel);
}

/////////////////////////////////////////////////////////////////////////////////////////////
//displaying the data//
/////////////////////////////////////////////////////////////////////////////////////////////

//create empty MarkerCluster group
var markers = L.markerClusterGroup();

//create an empty GeoJSON layer
var dotLayer = L.geoJson(false, {
    onEachFeature: onEachDot
});

//add dots every [dotInterval] ms until there are [dotCount] of them
var dotIndex = 1;
var dotCount = 500;

//populate GeoJSON layer
for (var i=dotIndex ; i< dotCount ; ++i) {
    var newDot = make_dot(i);
    dotLayer.addData(newDot);
	//dotLayer.addData(newDot);
}

//add GeoJSON layer to cluster layer and display it on the map
markers.addLayer(dotLayer);
mymap.addLayer(markers);

/*var myLatlng = new google.maps.LatLng(parseFloat(48.20876112032762), parseFloat(16.37261580746849));


  var mapOptions = {
    center: myLatlng,
	mapTypeControl: true,
    zoomControl: true,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.DEFAULT
    },
    mapTypeId: google.maps.MapTypeId.ROADMAP,
	scrollwheel: true,
	zoom: defZoom
  };

  if(!PageProperties.map) { 	// wurde schon bei einem vorherigen Upload eine Karte erstellt?
 
  	PageProperties.map = new google.maps.Map(document.getElementById("popup_map"), mapOptions);

	var input = /** @type {HTMLInputElement} *///document.getElementById('mpacInput');
	/*PageProperties.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
	// Create a DIV to hold the control and call HomeControl()
	PageProperties.homeControlDiv = document.createElement('div');
	var homeControl = new HomeControl(PageProperties.homeControlDiv, PageProperties.map);
	//  homeControlDiv.index = 1;

	PageProperties.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(PageProperties.homeControlDiv);

	PageProperties.searchBox = new google.maps.places.SearchBox(input);
  } else {
	  PageProperties.map.setMapTypeId(google.maps.MapTypeId.ROADMAP);	// Kartenmodus erzwingen
  }

	// Setup click-event listener: simply set the map to vienna

  PageProperties.gmL.push(google.maps.event.addDomListener(PageProperties.controlUI, 'click', function() {
	  var c=PageProperties.coord.split(",");
  	  var myhome = new google.maps.LatLng(parseFloat(c[0]), parseFloat(c[1]));
	PageProperties.map.setZoom(defZoom);
    PageProperties.map.panTo(myhome);
  }));
/*
Event, wenn Karte vollständig geladen ist

*/
  /*PageProperties.gmL.push(PageProperties.map.addListener('tilesloaded', function() {

		getRangePic();
  }));
  // Grenzen der Karte ermitteln und in Variable speichern
  // Wird aufgerufen, wenn Karte verschoben wird

	PageProperties.gmL.push(PageProperties.map.addListener('center_changed', function() {

		getRangePic();
  }));
 
  // [START region_getplaces]
  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
 
  PageProperties.gmL.push(google.maps.event.addListener(PageProperties.searchBox, 'places_changed', function() {
	document.getElementById('mpacInput').value = "";
    var places = PageProperties.searchBox.getPlaces();

    if (places.length === 0) {
      return;
    }
    var bounds = new google.maps.LatLngBounds();
    var place = places[0];
	bounds.extend(place.geometry.location);
	PageProperties.map.fitBounds(bounds);
	PageProperties.map.setZoom(defZoom);
  }));*/
}
function hideMap() {								// Karte wieder verbergen
"use strict";
	/*for (var i=0;i<PageProperties.gmL.length;i++) {
		google.maps.event.removeListener(PageProperties.gmL[i]);
	}
	PageProperties.gmL = [];
	deletePicMarker();
	document.getElementById('mpacInput').value = "";*/
	$('#bouncepopup').css('display','none');
	//$('bouncepopup').fold();
}

// Alle Marker löschen

function deletePicMarker() {
	"use strict";
  if(!PageProperties.marker.length) {for (var i=0;i<PageProperties.marker.length;i++) { PageProperties.marker[i].setMap(null); }}
  PageProperties.marker = [];
}

/***************************************************************************
	Infos über alle Bilder laden, die  sich in dem dargestellten Kartenstück
	befinden
	Marker werden in die Karte gezeichnet
***************************************************************************/

function getRangePic() {
	"use strict";
var mbounds = PageProperties.map.getBounds();
	if (mbounds) {
		mbounds = mbounds.toString().replace(/\(/g,"").replace(/\)/g,"");
		var c=mbounds.split(",");



// Array mit allen Posts füllen, die innerhalb des dargestellten Bereichs liegen
	//console.log(PageProperties.marker);
	if (PageProperties.markerClusterer) {
		  deletePicMarker();
          PageProperties.markerClusterer.clearMarkers();
		  PageProperties.markerClusterer = null;
    }
	$.post("../script/getRangePosts.php",
 	 		{sw_lat: c[0], sw_long: c[1], ne_lat: c[2], ne_long: c[3] },
			function(p, status) {
    	  		if (p !== "") 
    	  			{	//console.log(p);
						//	json-Informationen aus dem Rückgabewert holen:

								var adata = jQuery.parseJSON(p.slice(0, p.search('}')+1));
								//console.log("Ergebnis: "+adata.success);
    	  						if (adata.success === true)  
    	  						{
								  //console.log("RangePost: "+p.responseText.slice(p.responseText.search('}')+1));
								  var id=adata.posts.split(",");
								  var names=adata.names.split(",");
								  var files=adata.files.split(",");
								  var pos=adata.coord.split(";");
								  var description=adata.description.split(",");
								  for(var i=0;i<id.length;i++) {
									  c=pos[i].split(",");
									  	var mkr = new google.maps.Marker({
      									position: new google.maps.LatLng(parseFloat(c[0]), parseFloat(c[1])),
     									//map: PageProperties.map,
	  									draggable: false,
      									title: names[i] });
									    var infowindow = new google.maps.InfoWindow({
    										maxWidth: 200
  										});

									  var contentString = '<div id="content">'+
									  '<div id="siteNotice">'+
									  '</div>'+
									  '<h1 id="firstHeading" class="firstHeading">'+names[i]+'</h1>'+
									  '<div id="bodyContent">'+
									  '<p>'+description[i]+'</p>'+
									  '<img src="../22062014/'+files[i]+'" width="200" alt="Bild">'+
									  '</div>'+
									  '</div>';
									  
									  google.maps.event.addListener(mkr,'click', (function(mkr,contentString,infowindow){ 
									   return function() {
										   infowindow.setContent(contentString);
										   infowindow.open(PageProperties.map,mkr);
									   };
									  })(mkr,contentString,infowindow)); 

									  

									// if(mkr do not exist) {	mkr.position vergleichen
											//mkr.setPosition(mkr.position);
										PageProperties.marker.push(mkr);
									//}
								   }
								   PageProperties.markerClusterer = new MarkerClusterer(PageProperties.map, PageProperties.marker, {
          									maxZoom: zoom,
          									gridSize: size,
         									//styles: styles[style],
         									imagePath: '../images/clusterer/m'
    								});
								} 
				  }
			});
	}
}
/****************************************************************

Newsfeed scrollen

Kommentarleiste bei erreichen des letzten Eintrages fixieren


****************************************************************/
var newsScroll = Class.extend({

	init: function () {
		"use strict";
		// all size values in pixels

		this.newscol = $('#newscol');
		this.comment = $('#comment');
		this.comh = this.comment.height();		// Höhe in Pixeln von Kommentarleiste und Kopfzeile
		this.header = $('#onHeader').height();
		//this.msie6 = $.browser == 'msie' && $.browser.version < 7;
		//alert(navigator.appName);
		this.firstIndex = 0;
		this.lastIndex = 0;
		this.isfixed = false;

		$(window).scroll(this.scrollNews.bind(this));
		$(window).resize(this.scrollNews.bind(this));
	},
	scrollNews: function() {
		"use strict";
		var x = this.comment.position();
		PageProperties.sp3Top=x.top;
		PageProperties.sp3With=this.comment.width();

	  if (PageProperties.activeScroll === false) {
		PageProperties.activeScroll = true;
		var wd = $(window).height(); 							// Höhe des Fensters (wird dynamisch angepasst

		//this.top = document.viewport.getScrollOffsets().top;	// scroll-offset im Fenster - beim Scrollen erhöht sich Wert
		this.top = $(window).scrollTop();
		var infiniteSpinnerY = $('#infiniteSpinner').viewportOffset().top; // beim Nachladen wird Wert wieder größer
		var _scroll = infiniteSpinnerY - wd;
		  
		if (_scroll < -200) {					// Bis an das Ende der Liste gescrollt?
	
			  if(PageProperties.lastID!==null) {	// Eintrag nachladen
				  //console.log("End of List: "+_scroll+" LastID: "+PageProperties.lastID);
				  this.loadPost(PageProperties.lastID, "<", false);
			  }	else {
				  console.log('EOF');
			  }
			//}
	  	}
		var e = this.comment;
		  x = $( "#newsfeed" ).viewportOffset().top;
		  var y = $( "#endcomment" ).viewportOffset().top;
		  _scroll = y+x;
		if (_scroll < 100) {
        // if so, ad the fixed class
 
		  if (!this.isfixed) {
			this.isfixed = true;
			var htmlFixed=e.html();							// HTML der Kommentarleiste holen
			PageProperties.sp3Top = e.viewportOffset().top;

			e.html("<div id='fixit' style='position: fixed !important; top:"+PageProperties.sp3Top+"px; width:"+PageProperties.sp3With+"px'>"+htmlFixed+"</div>");
		  }

        } else if (_scroll >= 100 && this.isfixed) {
        	// otherwise remove it
			this.isfixed = false;
			var htmlMove=$("#fixit").html();
			e.html(htmlMove);
      	}
		  PageProperties.activeScroll = false;
	  }
	},
	/************************************************************
	
	Nachladen von Posts beim Scrollen
	Post wird nach voreingestellten Kriterien geladen
	Stadt, Koordinaten, Straßennamen, etc...
	
	//Post mit einer bestimmten ID laden
	Bei position === true wird der Post an den Beginn gesetzt (neue Posts)
	
	*************************************************************/
	loadPost: function(postID, operator, position) {
		"use strict";
		//console.log("loadPostPostID: "+postID);
		/*
			bei komplexem Aufbau von sql bei suche eines Posts nach ganz genauen
			Kriterien, eventuell die Erstellung von sql in eigene Funktion
			auslagern!
		*/
		var sql = "SELECT postID, profileID, dateMake, type, pictureName, pictureOrgName, latitude, longitude, description FROM posts WHERE postID "+operator+" "+postID+" ORDER BY postID DESC LIMIT 1";
		$.post("../../script/loadpost.php",
 	 		{lim: 1, sql: sql, output: 'browser' },
			function(html, status) {
    	  					if (html !== "") 
    	  					{
								/*
									json-Informationen aus dem Rückgabewert holen:
										
									{ json-werte }<div der geladenen postings...>
								*/
								var adata = jQuery.parseJSON(html.slice(0, html.search('}')+1));
    	  						if (adata.success && adata.lastID !== 0)  
    	  						{
								  if (position) {
									  $('#newsfeed').after(html.slice(html.search('}')+1));
									} else {
									  $('#post'+postID).after(html.slice(html.search('}')+1));
								  }
								  MagicZoom.refresh();
									console.log("nachgeladen");
								}
								PageProperties.lastID = adata.lastID;
								if(adata.lastID === 0) {	// Keine Posts mehr zum Nachladen vorhanden
									$('#eof').html('<button class="Button__button___2b6e    Button__type--local___1PIMj   talk-load-more-button">Keine weiteren Einträge vorhanden</button>');
								}
								
							}
			});
	}
});

/*
$('#c64').on('myTask', function(event, p1, p2){
	"use strict";
	switch(p1) {
		case 1: getPicToDo(); break;
		case 2: $("#user_loggedin").html(p2); break;
	}
});
*/


// Add a Home control that returns the user to vienna
function HomeControl(controlDiv, map) {
	"use strict";
  controlDiv.style.padding = '5px';
  PageProperties.controlUI = document.createElement('div');
  PageProperties.controlUI.style.backgroundColor = 'yellow';
  PageProperties.controlUI.style.border='1px solid';
  PageProperties.controlUI.style.cursor = 'pointer';
  PageProperties.controlUI.style.textAlign = 'center';
  PageProperties.controlUI.title = 'Zurück nach Wien';
  controlDiv.appendChild(PageProperties.controlUI);
  var controlText = document.createElement('div');
  controlText.style.fontFamily='Arial,sans-serif';
  controlText.style.fontSize='12px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.innerHTML = '<b>Home<b>';
  PageProperties.controlUI.appendChild(controlText);
}
//
// Marker darstellen und Karte auf Position zentrieren
//
function setMapMarkerPos(map,coord, mymarker, myzoom) {
	"use strict";
  var c=coord.split(",");
  var myLatlng = new google.maps.LatLng(parseFloat(c[0]), parseFloat(c[1]));
  //google.maps.event.trigger(map, 'resize');		// Karte neu zeichnen, da div zuvor unsichtbar und Größe unbek. war
  placeMarker(mymarker, myLatlng, map, myzoom);
}


function placeMarker(mkr, position, map, zoom) {
	"use strict";
  mkr.setPosition(position);
  map.setCenter(position); //map.panTo(position);
  map.setZoom(zoom);
}
//
// Kartenmittelpunkt auf gewünschte Position bringen
//
function setMapPos(map,coord,myzoom) {
	"use strict";
	var c=coord.split(",");
  	var myLatlng = new google.maps.LatLng(parseFloat(c[0]), parseFloat(c[1]));
	map.setCenter(myLatlng);
  	map.setZoom(myzoom);
}

function getPicToDo() {
	"use strict";
	$.post("../script/getPicToDo.php",
 	 		{ },
			function(data, status) {
				var adata = jQuery.parseJSON(data);
    	  		if (adata.success)  
    	  			{
            			//alert(adata.picID);
						$('#picToDoNumber').html(adata.numb);
    	  			} else { console.log("error - can't load pic to do");}
	});
}
function write_new_posting(profileID, pictureName, latitude, longitude, pictext) {
	"use strict";
	$.post("../script/write_posting_sql.php",
 	 		{profileID: profileID, pictureName: pictureName, latitude: latitude, longitude: longitude, description: pictext, dateMake: new Date(), verified: "0", completed: "0" },
			function(data, status) {
				var adata = jQuery.parseJSON(data);
    	  		if (adata.success)  
    	  			{
            			//alert(adata.picID);
						PageProperties.postID = adata.postID;
						getPicToDo();  
    	  			} else { console.log("error writing new posting");}
	});
}
// ermittelt die höchste ID-Nummer bei den Postings
// zu dem Zeitpunkt = ID des aktuellsten Eintrages,
// da ID mit jedem Posting um eins steigt

function max_postID(table,field){
	"use strict";
	$.post("../../script/max_postID_sql.php",
 	 		{table: table, field: field },
			function(data, status) {
				var adata = jQuery.parseJSON(data);
    	  		var maxID = adata.maxID;
				//console.log("return: "+maxID);
				return maxID;
	});
}
function update_posting(postID, latitude, longitude, picdate, pictext, completed){
	"use strict";
	$.post("../../script/update_posting_sql.php",
 	 		{postID: postID, latitude: latitude, longitude: longitude, dateMake: picdate, description: pictext, completed: completed },
			function(data, status) {
				var adata = jQuery.parseJSON(data);
    	  		if (adata.success)  
    	  			{
            			//getPicToDo(); 
    	  			} else { alert("error");}
	});
}
function delete_posting(table, postID, nameNew) {
	"use strict";
	$.post("../../script/deletePost.php",
 	 		{table: table, postID: postID, nameNew: nameNew },
			function(data, status) {
				var adata = jQuery.parseJSON(data);
    	  		if (adata.success)  
    	  			{

    	  			} else { console.log("Fehler beim Löschen des Postings");}
	});
}
function write_sql(profileID, table, field, content) {
	"use strict";
	$.post("../script/write_sql.php",
 	 		{ID: profileID, table: table, field: field, content: content },
			function(data, status) {
				var adata = jQuery.parseJSON(data);
    	  		if (adata.success)  
    	  			{
						//alert(html.responseText);    
    	  			}
	});
}


var read_sql = function(profileID, table, field, name) {
	"use strict";
	$.post("../script/read_sql.php",
 	 		{ID: profileID, table: table, field: field, name: name },
			function(data, status) {
				var adata = jQuery.parseJSON(data);
    	  		if (adata.success) 
    	  			{
						$('#C64').trigger("myTask", [ '2', adata.facebookID ]);
    	  			}
	});
};
var WindowSize = Class.extend({
    width: function()
    {
		"use strict";
        var myWidth = 0;
        if (typeof(window.innerWidth) === 'number')
        {
            //Non-IE
            myWidth = window.innerWidth;
        }
        else if (document.documentElement && document.documentElement.clientWidth)
        {
            //IE 6+ in 'standards compliant mode'
            myWidth = document.documentElement.clientWidth;
        }
        else if (document.body && document.body.clientWidth)
        {
            //IE 4 compatible
            myWidth = document.body.clientWidth;
        }
        return myWidth;
    },
    height: function()
    {
		"use strict";
        var myHeight = 0;
        if (typeof(window.innerHeight) === 'number')
        {
            //Non-IE
            myHeight = window.innerHeight;
        }
        else if (document.documentElement && document.documentElement.clientHeight)
        {
            //IE 6+ in 'standards compliant mode'
            myHeight = document.documentElement.clientHeight;
        }
        else if (document.body && document.body.clientHeight)
        {
            //IE 4 compatible
            myHeight = document.body.clientHeight;
        }
        return myHeight;
    }
});


function get_windowsize() {
	"use strict";
	var myWidth = 0, myHeight = 0;
	if( typeof( window.innerWidth ) === 'number' ) {
		myWidth = window.innerWidth;
		myHeight = window.innerHeight;
	} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
		myWidth = document.documentElement.clientWidth;
		myHeight = document.documentElement.clientHeight;
	} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
		myWidth = document.body.clientWidth;
		myHeight = document.body.clientHeight;
	}
	return Array(myWidth, myHeight);
}
function get_document_body_size() {
	"use strict";
	var body_width = false;
	var body_height = false;
	if(document.documentElement && document.documentElement.clientWidth) {
		body_width = document.documentElement.clientWidth;
		body_height = document.documentElement.clientHeight;
	} else if(document.body) {
		body_width = document.body.offsetWidth;
		body_height = document.body.offsetHeight;
	}
	return Object({'width':body_width,'height':body_height});
}
function get_window_scroll_pos() {
	"use strict";
	var x_scroll_pos = 0;
	var y_scroll_pos = 0;
	if (window.innerHeight) {
		y_scroll_pos = window.pageYOffset;
	} else if (document.documentElement && document.documentElement.scrollTop) {
		y_scroll_pos = document.documentElement.scrollTop;
	} else if (document.body) {
		y_scroll_pos = document.body.scrollTop;
	}
	if (window.innerWidth) {
		x_scroll_pos = window.pageXOffset;
	} else if (document.documentElement && document.documentElement.scrollLeft) {
		x_scroll_pos = document.documentElement.scrollLeft;
	} else if (document.body) {
		x_scroll_pos = document.body.scrollLeft;
	}
	return Array(x_scroll_pos, y_scroll_pos);
}
function get_saved_window_scroll_pos() {
	"use strict";
	if(typeof(kmm_curr_window_scroll_pos) !== 'undefined' && kmm_curr_window_scroll_pos !== null) {
		return kmm_curr_window_scroll_pos;
	} else {
		return save_curr_window_scroll_pos();
	}
}
function save_curr_window_scroll_pos() {
	"use strict";
	kmm_curr_window_scroll_pos = get_window_scroll_pos();
	return kmm_curr_window_scroll_pos;
}
function kmm_get_scroll_direction() {
	"use strict";
	var pre_scroll_pos = get_saved_window_scroll_pos();
	var curr_scroll_pos = get_window_scroll_pos();
	var return_obj = new Object({'x':'none','y':'none'});
	if(curr_scroll_pos[0] > pre_scroll_pos[0]) {
		return_obj.x = 'right';
	} else if(curr_scroll_pos[0] < pre_scroll_pos[0]) {
		return_obj.x = 'left';
	}
	if(curr_scroll_pos[1] > pre_scroll_pos[1]) {
		return_obj.y = 'down';
	} else if(curr_scroll_pos[1] < pre_scroll_pos[1]) {
		return_obj.y = 'up';
	}
	return return_obj;
}
/////////////////////////////////////////////////////////////////////////////////////////////
//styling functions//
/////////////////////////////////////////////////////////////////////////////////////////////

function onEachDot(feature, layer) {
    layer.bindPopup('<table style="width:150px"><tbody><tr><td><b>Name:</b></td><td>' + feature.properties.popup + '</td></tr><tr><td><b>Year:</b></td><td>' + feature.properties.year + '</td></tr><tr><td><b>Size:</b></td><td>' + Math.round(feature.properties.size) + '</td></tr></tbody></table>');
}

/////////////////////////////////////////////////////////////////////////////////////////////
//functions to great synthetic GeoJSON//
/////////////////////////////////////////////////////////////////////////////////////////////

//cheapo normrand function
function normish(mean, range) {
    var num_out = ((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random() - 4) / 4) * range + mean;
    return num_out;
}

//create geojson data with random ~normal distribution
function make_dot(id) {

    //set up random variables
    x = normish(0, .1);
    y = normish(0, .1);

    //create points randomly distributed about center coordinates
    var g = {
        "type": "Point",
            "coordinates": [((x * 0.11) + centerlon), ((y * 0.1) + centerlat)]
    };

    //create feature properties, roughly proportional to distance from center coordinates
    var p = {
        "id": id,
            "popup": "Dot_" + id,
            "year": parseInt(Math.sqrt(x * x + y * y) * 60 * (1 - Math.random() / 1.5) + 1900),
            "size": Math.round((parseFloat(Math.abs((normish(y*y, 2) + normish(x*x, 2)) * 50) + 10)) * 100) / 100
    };

    //create features with proper geojson structure        
    dot = {
    	"type": "Feature",
		"geometry": g,
		"properties": p
    };
    return dot;

}