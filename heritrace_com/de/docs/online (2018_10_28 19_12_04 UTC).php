<?php
if (!isset($_SESSION)) {
	session_start(); }

$_SESSION['profileID']=1;
$_SESSION['profileName']="Andy";

include("../../inc/htr_config.php");
include("../../inc/mapsSelect.php");
?>
<doctype html lang="de">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8'" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name="author" content="">

	  
    <title>
      
        heritrace &middot; 
      
    </title>
	<script src="assets/js/autocomplete.js"></script>
    
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,600' rel='stylesheet' type='text/css'>
    <link href="assets/css/toolkit.css" rel="stylesheet">
    
    <link href="assets/css/application.css" rel="stylesheet">
	<script src="assets/js/jquery-3.3.1.min.js"></script>
	<link rel="stylesheet" type="text/css" href="drop/dropzone.css" />
	<link href="../../img/favicon.ico" rel="icon" type="image/x-icon" />
	<link href="memopicker/foundation-datepicker.min.css" rel="stylesheet">
	<script src="memopicker/foundation-datepicker.min.js"></script>
	<script src="memopicker/foundation-datepicker.de.js"></script>

    <script src="drop/dropzone.js"></script>
	<link type="text/css" rel="stylesheet" href="../../js/magiczoomplus_t/magiczoomplus-trial/magiczoomplus/magiczoomplus.css"/>
	<script type="text/javascript" src="../../js/magiczoomplus_t/magiczoomplus-trial/magiczoomplus/magiczoomplus.js"></script>
    <link rel="stylesheet" type="text/css" href="../../js/magicslideshow/magicslideshow.css" media="screen"/>
    <script src="../../js/magicslideshow/magicslideshow.js" type="text/javascript"></script>
	<script src="../../js/script_index Kopie.js"></script>

	 <?php $h->initMap(MAP_TYPE);  // gewählten Kartentyp initialisieren ?>

    <style>
		/*.ui-datepicker{z-index: 9999 !important}
      /* note: this is a hack for ios iframe for bootstrap themes shopify page */
      /* this chunk of css is not part of the toolkit :)    */
      body {
        width: 1px;
        min-width: 100%;
        *width: 100%;
      }
    </style>
<script>

$(function(){
  var nowTemp = new Date();
  var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), nowTemp.getHours(), nowTemp.getMinutes(), 0, 0);
  var d = new Date(); d.setFullYear(1826,0,1);
  var sd = new Date(d.getFullYear(),0,1,0,0,0,0);
  $('#mdpt').fdatepicker({
		format: 'dd-mm-yyyy hh:ii',
		disableDblClickSelection: true,
		language: 'de',
		pickTime: true,
        leftArrow:'<<',
		rightArrow:'>>',
		closeButton: true,
        closeIcon: '<div id="pop_close" style="background:url(img/closebutton-blue.png) no-repeat top center;width:24px;height:24px;cursor:pointer;opacity:1;"></div>',
        initialDate: now,
	  	startDate: sd
	});
});

	var MagicSlideshowOptions = {
                'width': '480px',
                'height': '300px',
                'selectors': 'right',
				'selectors-style': 'thumbnails',
				'arrows': false,
				'autoplay': true,
				'kenburns': false
            };


	var mzOptions = {
    variableZoom: true
};

var PageProperties = {
			DOMLoaded: false,
			version: {'detected':null, 'preferred':null},
			jsVersion: '?v=001',
			date: {
			local: new Date(),
			update: new Date(1409071301000)
			},
			isFixed: false,
			sp3Top: 0,				// Position der rechten Spalte
			sp3Left: 0,
			sp3Width: 0,
			showForum: true,
			authenticationRequired:false,
			userID: 0,
			facebookID: 0,
			ajaxrequest: 0,
			postID: 0,
			firstID: null,		// ID des ersten dargestellten Posts
			lastID: null	,	// ID des letzten dargestellten (geladenen) Posts; nächstes Post muss ID < lastID haben
			activeScroll: false,
			onewsScroll: null,
			picLoaded: [],
			picLoadedIndex: 0,
			map: null,
			bounds: null,
			marker: [],			// Marker für die Positionsangaben auf der großen Karte
			markerClusterer: null,		// Infofeld für den Marker, zeigt eine Miniaturausgabe des Bildes
			coord: "48.20876112032762, 16.37261580746849",
			searchBox: null,
			gmL: [],						// googlemaps-eventhandler
			homeControlDiv: null,		// home-button in karte
			controlUI: null
			};

/****************************************************************

ID des aktuellsten Eintrags holen (letzter Eintrag hat höchste ID)
Voreingestellte Anzahl von Postings beim Start laden (lim = Anzahl)


****************************************************************/
			$.post("../../script/max_postID_sql.php",	// ajax-request
 	 		{table: 'posts', field: 'postID'},
			function(p, status) {
				var adata = jQuery.parseJSON(p);
				console.log("Höchste Post-ID: "+adata.maxID);
    	  		PageProperties.firstID = adata.maxID;
				PageProperties.lastID = adata.maxID;
				PageProperties.lastID++;

				var sql = "SELECT postID, profileID, dateMake, type, pictureName, pictureOrgName, latitude, longitude, description FROM posts WHERE postID <"+PageProperties.lastID+" ORDER BY postID DESC";

				$.post("../../script/loadpost.php",
 	 			{lim: 4, sql: sql, output: 'browser' },
				function(html, status) {
    	  						if (html != "") 
    	  						{
									/*
										json-Informationen aus dem Rückgabewert holen:
										
										{ json-werte }<div der geladenen postings...>
									*/
									var adata = jQuery.parseJSON(html.slice(0, html.search('}')+1));
    	  							if (adata.success)  
    	  							{
									  //$('#newsfeed').after(html.slice(html.search('}')+1));
									  $( "#newsfeed" ).append(html.slice(html.search('}')+1));
									  MagicZoom.refresh();
									  PageProperties.lastID = adata.lastID;		// ID des letzten geladenen Post (letzter in der Post-Liste)
									  PageProperties.onewsScroll = new newsScroll();	// scrolling der rechten Leiste
										console.log("ID letzter Post: "+PageProperties.lastID);
									} else {
										console.log("Anzahl der Posts konnte nicht festgestellt werden!");
									}
								}				
    	  		});
		});
</script>
  </head>


<body class="with-top-navbar">
  


<div class="growl" id="app-growl"></div>

<nav class="navbar navbar-expand-md fixed-top navbar-dark bg-primary app-navbar" id="onHeader">

  <a class="navbar-brand" href="index.html">
    <img src="assets/img/brand-white_he.png" alt="brand">
  </a>

  <button
    class="navbar-toggler navbar-toggler-right d-md-none"
    type="button"
    data-toggle="collapse"
    data-target="#navbarResponsive"
    aria-controls="navbarResponsive"
    aria-expanded="false"
    aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarResponsive">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="index.html">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="profile/index.html">Profile</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="modal" href="#msgModal">Messages</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="docs/index.html">Weltkarte</a>
      </li>

      <li class="nav-item d-md-none">
        <a class="nav-link" href="notifications/index.html">Notifications</a>
      </li>
      <li class="nav-item d-md-none">
        <a class="nav-link" data-action="growl">Growl</a>
      </li>
      <li class="nav-item d-md-none">
        <a class="nav-link" href="login/index.html">Logout</a>
      </li>

    </ul>

    <form class="form-inline float-right d-none d-md-flex">
      <input class="form-control" type="text" data-action="grow" placeholder="Search">
    </form>

    <ul id="#js-popoverContent" class="nav navbar-nav float-right mr-0 d-none d-md-flex">
      <li class="nav-item">
        <a class="app-notifications nav-link" href="notifications/index.html">
          <span class="icon icon-bell"></span>
        </a>
      </li>
      <li class="nav-item ml-2">
        <button class="btn btn-default navbar-btn navbar-btn-avatar" data-toggle="popover">
          <img class="rounded-circle" src="assets/img/avatar-dhg.png">
        </button>
      </li>
    </ul>

    <ul class="nav navbar-nav d-none" id="js-popoverContent">
      <li class="nav-item"><a class="nav-link" href="#" data-action="growl">Growl</a></li>
      <li class="nav-item"><a class="nav-link" href="login/index.html">Logout</a></li>
    </ul>
  </div>
</nav>
<!--

		Liste der Nachrichten, die bei Anklicken eingeblendet werden

-->
<div class="modal fade" id="msgModal" tabindex="-1" role="dialog" aria-labelledby="msgModal" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Messages</h5>
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
      </div>

      <div class="modal-body p-0 js-modalBody">
        <div class="modal-body-scroller">
          <div class="media-list media-list-users list-group js-msgGroup">
            <a href="#" class="list-group-item list-group-item-action">
              <div class="media">
                <img class="rounded-circle media-object d-flex align-self-start mr-3" src="assets/img/avatar-fat.jpg">
                <div class="media-body">
                  <strong>Jacob Thornton</strong> and <strong>1 other</strong>
                  <div class="media-body-secondary">
                    Aenean eu leo quam. Pellentesque ornare sem lacinia quam &hellip;
                  </div>
                </div>
              </div>
            </a>
            <a href="#" class="list-group-item list-group-item-action">
              <div class="media">
                <img class="rounded-circle media-object d-flex align-self-start mr-3" src="assets/img/avatar-mdo.png">
                <div class="media-body">
                  <strong>Mark Otto</strong> and <strong>3 others</strong>
                  <div class="media-body-secondary">
                    Brunch sustainable placeat vegan bicycle rights yeah…
                  </div>
                </div>
              </div>
            </a>
            <a href="#" class="list-group-item list-group-item-action">
              <div class="media">
                <img class="rounded-circle media-object d-flex align-self-start mr-3" src="assets/img/avatar-dhg.png">
                <div class="media-body">
                  <strong>Dave Gamache</strong>
                  <div class="media-body-secondary">
                    Brunch sustainable placeat vegan bicycle rights yeah…
                  </div>
                </div>
              </div>
            </a>
            <a href="#" class="list-group-item list-group-item-action">
              <div class="media">
                <img class="rounded-circle media-object d-flex align-self-start mr-3" src="assets/img/avatar-fat.jpg">
                <div class="media-body">
                  <strong>Jacob Thornton</strong> and <strong>1 other</strong>
                  <div class="media-body-secondary">
                    Aenean eu leo quam. Pellentesque ornare sem lacinia quam &hellip;
                  </div>
                </div>
              </div>
            </a>
            <a href="#" class="list-group-item list-group-item-action">
              <div class="media">
                <img class="rounded-circle media-object d-flex align-self-start mr-3" src="assets/img/avatar-mdo.png">
                <div class="media-body">
                  <strong>Mark Otto</strong> and <strong>3 others</strong>
                  <div class="media-body-secondary">
                    Brunch sustainable placeat vegan bicycle rights yeah…
                  </div>
                </div>
              </div>
            </a>
            <a href="#" class="list-group-item list-group-item-action">
              <div class="media">
                <img class="rounded-circle media-object d-flex align-self-start mr-3" src="assets/img/avatar-dhg.png">
                <div class="media-body">
                  <strong>Dave Gamache</strong>
                  <div class="media-body-secondary">
                    Ich weiß nicht worum es geht, bin aber dagegen!
                  </div>
                </div>
              </div>
            </a>
            <a href="#" class="list-group-item list-group-item-action">
              <div class="media">
                <img class="rounded-circle media-object d-flex align-self-start mr-3" src="assets/img/avatar-fat.jpg">
                <div class="media-body">
                  <strong>Jacob Thornton</strong> and <strong>1 other</strong>
                  <div class="media-body-secondary">
                    Aenean eu leo quam. Pellentesque ornare sem lacinia quam &hellip;
                  </div>
                </div>
              </div>
            </a>
            <a href="#" class="list-group-item list-group-item-action">
              <div class="media">
                <img class="rounded-circle media-object d-flex align-self-start mr-3" src="assets/img/avatar-mdo.png">
                <div class="media-body">
                  <strong>Mark Otto</strong> and <strong>3 others</strong>
                  <div class="media-body-secondary">
                    Brunch sustainable placeat vegan bicycle rights yeah…
                  </div>
                </div>
              </div>
            </a>
            <a href="#" class="list-group-item list-group-item-action">
              <div class="media">
                <img class="rounded-circle media-object d-flex align-self-start mr-3" src="assets/img/avatar-dhg.png">
                <div class="media-body">
                  <strong>Dave Gamache</strong>
                  <div class="media-body-secondary">
                    Brunch sustainable placeat vegan bicycle rights yeah…
                  </div>
                </div>
              </div>
            </a>
          </div>

          <div class="d-none m-3 js-conversation">
            <ul class="media-list media-list-conversation">
              <li class="media media-current-user mb-4">
                <div class="media-body">
                  <div class="media-body-text">
                    Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nulla vitae elit libero, a pharetra augue. Maecenas sed diam eget risus varius blandit sit amet non magna. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Sed posuere consectetur est at lobortis.
                  </div>
                  <div class="media-footer">
                    <small class="text-muted">
                      <a href="#">Dave Gamache</a> at 4:20PM
                    </small>
                  </div>
                </div>
                <img class="rounded-circle media-object d-flex align-self-start ml-3" src="assets/img/avatar-dhg.png">
              </li>

              <li class="media mb-4">
                <img class="rounded-circle media-object d-flex align-self-start mr-3" src="assets/img/avatar-fat.jpg">
                <div class="media-body">
                  <div class="media-body-text">
                   Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                  </div>
                  <div class="media-body-text">
                   Vestibulum id ligula porta felis euismod semper. Aenean lacinia bibendum nulla sed consectetur. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nullam quis risus eget urna mollis ornare vel eu leo. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                  </div>
                  <div class="media-body-text">
                   Cras mattis consectetur purus sit amet fermentum. Donec sed odio dui. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Nulla vitae elit libero, a pharetra augue. Donec id elit non mi porta gravida at eget metus.
                  </div>
                  <div class="media-footer">
                    <small class="text-muted">
                      <a href="#">Fat</a> at 4:28PM
                    </small>
                  </div>
                </div>
              </li>

              <li class="media mb-4">
                <img class="rounded-circle media-object d-flex align-self-start mr-3" src="assets/img/avatar-mdo.png">
                <div class="media-body">
                  <div class="media-body-text">
                   Etiam porta sem malesuada magna mollis euismod. Donec id elit non mi porta gravida at eget metus. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Etiam porta sem malesuada magna mollis euismod. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Aenean lacinia bibendum nulla sed consectetur.
                  </div>
                  <div class="media-body-text">
                   Curabitur blandit tempus porttitor. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
                  </div>
                  <div class="media-footer">
                    <small class="text-muted">
                      <a href="#">Mark Otto</a> at 4:20PM
                    </small>
                  </div>
                </div>
              </li>

              <li class="media media-current-user mb-4">
                <div class="media-body">
                  <div class="media-body-text">
                    Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nulla vitae elit libero, a pharetra augue. Maecenas sed diam eget risus varius blandit sit amet non magna. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Sed posuere consectetur est at lobortis.
                  </div>
                  <div class="media-footer">
                    <small class="text-muted">
                      <a href="#">Dave Gamache</a> at 4:20PM
                    </small>
                  </div>
                </div>
                <img class="rounded-circle media-object d-flex align-self-start ml-3" src="assets/img/avatar-dhg.png">
              </li>

              <li class="media mb-4">
                <img class="rounded-circle media-object d-flex align-self-start mr-3" src="assets/img/avatar-fat.jpg">
                <div class="media-body">
                  <div class="media-body-text">
                   Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                  </div>
                  <div class="media-body-text">
                   Vestibulum id ligula porta felis euismod semper. Aenean lacinia bibendum nulla sed consectetur. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nullam quis risus eget urna mollis ornare vel eu leo. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                  </div>
                  <div class="media-body-text">
                   Cras mattis consectetur purus sit amet fermentum. Donec sed odio dui. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Nulla vitae elit libero, a pharetra augue. Donec id elit non mi porta gravida at eget metus.
                  </div>
                  <div class="media-footer">
                    <small class="text-muted">
                      <a href="#">Fat</a> at 4:28PM
                    </small>
                  </div>
                </div>
              </li>

              <li class="media mb-4">
                <img class="rounded-circle media-object d-flex align-self-start mr-3" src="assets/img/avatar-mdo.png">
                <div class="media-body">
                  <div class="media-body-text">
                   Etiam porta sem malesuada magna mollis euismod. Donec id elit non mi porta gravida at eget metus. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Etiam porta sem malesuada magna mollis euismod. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Aenean lacinia bibendum nulla sed consectetur.
                  </div>
                  <div class="media-body-text">
                   Curabitur blandit tempus porttitor. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
                  </div>
                  <div class="media-footer">
                    <small class="text-muted">
                      <a href="#">Mark Otto</a> at 4:20PM
                    </small>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="userModal" tabindex="-1" role="dialog" aria-labelledby="userModal" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Users</h4>
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
      </div>

      <div class="modal-body p-0">
        <div class="modal-body-scroller">
          <ul class="media-list media-list-users list-group">
            <li class="list-group-item">
              <div class="media w-100">
                <img class="media-object d-flex align-self-start mr-3" src="assets/img/avatar-fat.jpg">
                <div class="media-body">
                  <button class="btn btn-secondary btn-sm float-right">
                    <span class="glyphicon glyphicon-user"></span> Follow
                  </button>
                  <strong>Jacob Thornton</strong>
                  <p>@fat - San Francisco</p>
                </div>
              </div>
            </li>
            <li class="list-group-item">
              <div class="media w-100">
                <img class="media-object d-flex align-self-start mr-3" src="assets/img/avatar-dhg.png">
                <div class="media-body">
                  <button class="btn btn-secondary btn-sm float-right">
                    <span class="glyphicon glyphicon-user"></span> Follow
                  </button>
                  <strong>Dave Gamache</strong>
                  <p>@dhg - Palo Alto</p>
                </div>
              </div>
            </li>
            <li class="list-group-item">
              <div class="media w-100">
                <img class="media-object d-flex align-self-start mr-3" src="assets/img/avatar-mdo.png">
                <div class="media-body">
                  <button class="btn btn-secondary btn-sm float-right">
                    <span class="glyphicon glyphicon-user"></span> Follow
                  </button>
                  <strong>Mark Otto</strong>
                  <p>@mdo - San Francisco</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>


<div class="container pt-4 pb-5">
  <div class="row">
    <div id="board" class="col-lg-3">
      <div class="card card-profile mb-4">
        <div class="card-header" style="background-image: url(assets/img/iceland.jpg);"></div>
        <div class="card-body text-center">
          <a href="profile/index.html">
            <img
              class="card-profile-img"
              src="assets/img/avatar-dhg.png">
          </a>

          <h6 class="card-title">
            <a class="text-inherit" href="profile/index.html"><?php echo $_SESSION['profileName']; ?></a>
          </h6>

          <p class="mb-4">Bereit für jede Schandtat</p>

          <ul class="card-menu">
            <li class="card-menu-item">
              <a href="#userModal" class="text-inherit" data-toggle="modal">
                Friends
                <h6 class="my-0">12M</h6>
              </a>
            </li>

            <li class="card-menu-item">
              <a href="#userModal" class="text-inherit" data-toggle="modal">
                Enemies
                <h6 class="my-0">1</h6>
              </a>
            </li>
          </ul>
        </div>
      </div>

	  <div class="card d-md-block d-lg-block mb-4">
        <div class="card-body">
          <h6 class="mb-3">Interaktiv <small>· <a href="#">Edit</a></small></h6>
          <ul class="list-unstyled list-spaced">
            <li><span class="text-muted icon icon-globe mr-3"></span>Weltkarte <a href="javascript: displayMap();">erforschen</a>
          </ul>
        </div>
      </div>

      <div class="card d-md-block d-lg-block mb-4">
        <div class="card-body">
          <h6 class="mb-3">About <small>· <a href="#">Edit</a></small></h6>
          <ul class="list-unstyled list-spaced">
            <li><span class="text-muted icon icon-calendar mr-3"></span>Went to <a href="#">Oh, Canada</a>
            <li><span class="text-muted icon icon-users mr-3"></span>Became friends with <a href="#">Obama</a>
            <li><span class="text-muted icon icon-github mr-3"></span>Worked at <a href="#">Github</a>
            <li><span class="text-muted icon icon-home mr-3"></span>Lives in <a href="#">San Francisco, CA</a>
            <li><span class="text-muted icon icon-location-pin mr-3"></span>From <a href="#">Seattle, WA</a>
          </ul>
        </div>
      </div>

       <div class="card d-md-block d-lg-block mb-4">
        <div class="card-body">
          <h6 class="mb-3">Photos <small>· <a href="#">Edit</a></small></h6>
          <div data-grid="images" data-target-height="150">
            <div>
              <img data-width="640" data-height="640" data-action="zoom" src="assets/img/instagram_5.jpg">
            </div>

            <div>
              <img data-width="640" data-height="640" data-action="zoom" src="assets/img/instagram_6.jpg">
            </div>

            <div>
              <img data-width="640" data-height="640" data-action="zoom" src="assets/img/instagram_7.jpg">
            </div>

            <div>
              <img data-width="640" data-height="640" data-action="zoom" src="assets/img/instagram_8.jpg">
            </div>

            <div>
              <img data-width="640" data-height="640" data-action="zoom" src="assets/img/instagram_9.jpg">
            </div>

            <div>
              <img data-width="640" data-height="640" data-action="zoom" src="assets/img/instagram_10.jpg">
            </div>
          </div>
        </div>
      </div>
    </div>

<!--*******************************************
**
**    News-Stream - Mittlere Hauptspalte
**
********************************************-->
		<div id="newscol" class="col-lg-6">

      <ul class="list-group media-list media-list-stream mb-4">

        <li class="media list-group-item p-4 mb-2">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Message">
            <div class="input-group-btn">
              <button type="button" class="btn btn-secondary align-self-stretch">
                <span class="icon icon-camera"></span>
              </button>
            </div>
          </div>
        </li>


<li class="media list-group-item p-4 mb-2">
<div class="input-group">
	<div class="mydropzone" id="drop_div">
		<form action="../../script/upload.php" id="fileUpload" class="dropzone">
			<div class="fallback">
    		<input name="file" type="file" class="form-control" />
			</div>
	</form>
	</div>

<div id="position" class="position mb-3">
<div class="container">
<div class="row">
<div class="alert" id="slider-size-warning" style="display:none;">Achtung: An dieser Position bzw. in unmittelbarer Umgebung, gibt es bereits Bilder.
Falls eines dieser Bilder das gleiche Objekt wie das Ihre zeigt, dann klicken Sie bitte mit der Maus darauf um die beiden Bilder zu verbinden.</div>
	<div class="row justify-content-between"><div class="col-6" id="pic_description"></div><div class="col-6" id="post-controls"></div></div>
	</div>
	<div class="row"><div class="pdate" id="pic_date">Aufnahmedatum: 
	  <input class="mdpt" type="text" value="" id="mdpt" name="mdpt">
		</div></div>
    <div class="row">
    <div id="showSlide"></div>
	</div>
	<div class="row">
		<!--input id="pacInput" type="text" placeholder="Ort suchen"> <!-- https://nominatim.openstreetmap.org/search/Hauptstr%20129%207051?format=json&addressdetails=1&limit=1&polygon_svg=1 -->
		<input autocomplete="off" id="search" type="text"/>
    <script>
      var autocomplete = new kt.OsmNamesAutocomplete(
          'search', 'https://geocoder.tilehosting.com/', 'azg0OT5zA96eEmbRB9Uv');
      autocomplete.registerCallback(function(item) {
        //console.log(JSON.stringify(item, ' ', 2));
		  var myObj = JSON.parse(JSON.stringify(item, ' ', 2));
        //alert(myObj.boundingbox[3]);

		  //console.log(myObj.boundingbox[1]+", "+myObj.boundingbox[0]);
		  uploadProperties.map.setView([(myObj.boundingbox[1]), (myObj.boundingbox[0])]);
		  uploadProperties.mapMarker.setLatLng([(myObj.boundingbox[1]), (myObj.boundingbox[0])]);
		  $("#latbox").val(myObj.boundingbox[1]);
    	  $("#lngbox").val(myObj.boundingbox[0]);

      });
    </script>
	</div>
	<div class="row">
		<div class="container"><div class="row"><div id="mapcontainer" style="width: 100%; height: 240px;"></div></div></div>
	</div>
	</div>
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
			year: 0,			// Aufnahmedatum + Zeit des Bildes
			month: 0,
			day: 0,
			hour: 0,
			minute: 0,
			second: 0,
			userID: '<?php echo $_SESSION['profileID']; ?>',
			file: 0,				// Dropzone file-object
			map: null,			// googlemaps map-object
			mapMarker: null,	// Marker beim Hochladen von Bildern
			gmL: [],				// googlemaps event-handler
			marker: []			// aktueller Marker der Karte zur Positionsbestimmung des hochgeladenen Bildes
			};

  // myDropzone is the configuration for the element that has an id attribute
  // with the value my-dropzone (or myDropzone)
Dropzone.options.fileUpload = {
	  paramName: "file", // The name that will be used to transfer the file
	  optheight: null,
	  dictDefaultMessage: "Bild/Foto hierher ziehen",
	  dictHoverMessage: "Bild/Foto hier ablegen",
  
  	maxFilesize: 10, // MB
	parallelUploads: 1,
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
		  }),
	
		  this.on("complete", function(files) {	// Upload abgeschlossen
			   if(!uploadProperties.latitude) uploadProperties.latitude='48.208708';
			   if(!uploadProperties.longitude) uploadProperties.longitude='16.372303';
			  if(uploadProperties.day){	// Aufnahmezeit im Bild gespeichert
				  var picdate = uploadProperties.day+"-"+uploadProperties.month+"-"+uploadProperties.year+" "+uploadProperties.hour+":"+uploadProperties.minute;
			  } else {
				var nowTemp = new Date();
  				var picdate = nowTemp.getDate()+'-'+nowTemp.getMonth()+'-'+nowTemp.getFullYear()+' '+nowTemp.getHours()+':'+nowTemp.getMinutes();
			  }
			  $('#mdpt').val(picdate);
			  /*console.log("-Lat: "+uploadProperties.latitude);
			  console.log("-PicID: "+uploadProperties.picID);
			  console.log("-Year: "+uploadProperties.year);
			  console.log("-Month: "+uploadProperties.month);
			  console.log("-Day: "+uploadProperties.day);*/
		
	
	//	notwendige Informationen zum hochgeladenen Bild holen
	//  GPS - Infos und Abbruch/Speicher-Button darstellen
	//  Zusatz für textarea: onKeyUp="javascript: console.log($(\'#picDescr\').val().length
	
			$('#pic_description').html('<textarea id="picDescr" class="cdtxt" placeholder="Bildbeschreibung..." rows="4" );"></textarea>');
	
			$('#post-controls').html('<input type="text" class="input input--sm" id="latbox" value="'+uploadProperties.latitude+'" readonly><input type="text" class="input input--sm" id="lngbox" value="'+uploadProperties.longitude+'" readonly><div class="cdsupl" id="cntrBtn"><div style="float:left" id="rb"><a onClick="" class="btn btn--sm btn--white hp-sign__btn"><span class="btn-txt">Abbrechen</span></a></div><div style="float:right" id="sb"><a onClick="" class="btn btn--sm btn--white hp-sign__btn"><span class="btn-txt">Speichern</span></a></div></div>');
	
	 // Capture the Dropzone instance as closure.
			var _this = this;
	/****************************************************************
	
	Abbruch-Button gedrückt
	Bild vom Server löschen, Bildschirm wieder herstellen
	
	
	****************************************************************/
			  $('#rb').bind('click', function(event) {
			  // Make sure the button click doesn't submit the form:
			  event.preventDefault();
			  event.stopPropagation();
	
			  // Remove the file preview.
			  _this.removeFile(uploadProperties.file);
			  for (i=0;i<uploadProperties.gmL.length;i++) google.maps.event.removeListener(uploadProperties.gmL[i]);
			  uploadProperties.gmL = [];
			  //deleteMarker();
				//console.log("Neuer Name (zu löschen): "+uploadProperties.nameNew);
			  delete_posting("heritrace", uploadProperties.picID, uploadProperties.nameNew);
			  $('#fileUpload').animate({height: 75}, 1500);
			  $('#position').slideUp("fast","swing");
			  //setTimeout(_hideSlide(), 2000);		// Slideshow (falls vorhanden) löschen
			});
	/****************************************************************
	
	Speichern-Button gedrückt
	Änderungen und Eingaben speichern, Bildschirm wieder herstellen
	
	
	****************************************************************/
			  $('#sb').bind('click', function(event) {
			  // Make sure the button click doesn't submit the form:
			  event.preventDefault();
			  event.stopPropagation();
				  //console.log($("textarea#picDescr").val());
			  update_posting(uploadProperties.picID, $.trim($("#latbox").val()), $.trim($("#lngbox").val()), $.trim($("#Datepicker1").val()+" 12:00:00"), $("textarea#picDescr").val(), '1');
			  // remove the File from display
			  _this.removeFile(uploadProperties.file);
			  //$("rb").removeEventListener("click");
			  //MagicSlideshow.stop('slide-1');
			  //for (i=0;i<uploadProperties.gmL.length;i++) google.maps.event.removeListener(uploadProperties.gmL[i]);
			  uploadProperties.gmL = [];
			  //deleteMarker();
			  $('#fileUpload').animate({height: 75}, 1500);
			  $('#position').slideUp("fast","swing");
			  //setTimeout(_hideSlide(), 2000);		// Slideshow (falls vorhanden) löschen
			  //PageProperties.onewsScroll.loadPost(uploadProperties.picID, "=", true); // neuen Post an oberste Position
			  var sql = "SELECT postID, profileID, dateMake, type, pictureName, pictureOrgName, latitude, longitude, description FROM posts WHERE postID = "+uploadProperties.picID+" ORDER BY postID DESC LIMIT 1";
			  $.post("../../script/loadpost.php",
 	 			{lim: 1, sql: sql, output: 'browser' },
				function(html, status) {
    	  						if (html != "") 
    	  						{
									/*
										json-Informationen aus dem Rückgabewert holen:
										
										{ json-werte }<div der geladenen postings...>
									*/
									var adata = jQuery.parseJSON(html.slice(0, html.search('}')+1));
    	  							if (adata.success)  
    	  							{
										// 2 Zeilen für die Testphase:
										$( "#post10" ).remove();
										$( "#post9" ).before(html.slice(html.search('}')+1));

									  //$( "#post"+PageProperties.firstID ).before(html.slice(html.search('}')+1));
									  MagicZoom.refresh();
									  PageProperties.firstID = adata.lastID;	// ID des ersten Post in der Liste
									} else {
										console.log("Anzahl der Posts konnte nicht festgestellt werden!");
									}
								} else {
										console.log("Post konnte nicht gespeichert werden");
									}				
    	  		});
	 });
	
	/****************************************************************
	
	Ausgewählte Karte zeichnen
	Karte wird an Bildposition zentriert
	Sollten beim Bild keine Informationen über den Aufnahmeort
	gespeichert sein, dann wird am Stephansplatz in Wien 
	zentriert
	
	****************************************************************/
			  //console.log("Map: "+uploadProperties.map);
			  //console.log(uploadProperties.latitude+" - "+uploadProperties.longitude);
	var type=<?php echo MAP_TYPE;?>;
	switch (type) {
			case 1:
	/****************************************************************
	
	OpenStreetMaps-Karte zeichnen
	
	****************************************************************/
			var mymap, marker, popup;

			$('#position').slideDown("fast","swing",function(){
			if(!uploadProperties.map) { 	// wurde schon bei einem vorherigen Upload eine Karte erstellt?
				mymap = L.map('mapcontainer').setView([uploadProperties.latitude,uploadProperties.longitude], 15);
				uploadProperties.map=mymap;

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYW5keTY3ZXIiLCJhIjoiY2prbnJxNTVxMWNvYzNxbWdoNmJ0NGdxYiJ9.WYPw9rPH6_5ImIfsZOaDdA', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(mymap);


	marker = L.marker([uploadProperties.latitude,uploadProperties.longitude], {draggable: 'true'}).addTo(mymap);
	uploadProperties.mapMarker=marker;
	popup = L.popup();
	marker.bindPopup("Erster Zug für die U1."); //.openPopup();

	//mymap.attributionControl.setPrefix(false);
  mymap.on('click', onMapClick);
  marker.on({'dragend':moveMarker}); //, 'mouseover':mouseOver, 'mouseout': mouseOut
		} else {
	mymap=uploadProperties.map;
	marker=uploadProperties.mapMarker;
	mymap.setView([uploadProperties.latitude,uploadProperties.longitude], 15);
	marker.setLatLng([uploadProperties.latitude,uploadProperties.longitude]);
}
			});

function onMapClick(e) {
	marker.setLatLng(e.latlng);
    /*popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
	*/
	$("#latbox").val(e.latlng.lat);
    $("#lngbox").val(e.latlng.lng);
}
function moveMarker(e) {
    var position = marker.getLatLng();
	//alert("lat: "+position.lat+" lng: "+position.lng);
    /*popup
		.setLatLng(position)
        .setContent("You moved the marker at lat: "+position.lat+" lng: "+position.lng)
        .openOn(mymap);*/
    $("#latbox").val(position.lat);
    $("#lngbox").val(position.lng); //.keyup();
}
function mouseOver(e) {
    var position = marker.getLatLng();
	//alert("lat: "+position.lat+" lng: "+position.lng);
    popup
		.setLatLng(position)
        .setContent("Der erste Zug für die U1")
        .openOn(mymap);
    //$("#Latitude").val(position.lat);
    //$("#Longitude").val(position.lng).keyup();
}
function mouseOut(e) {
    if (popup && mymap) {
        mymap.closePopup(popup);
    }
}


  /*$("#Latitude, #Longitude").change(function() {
    var position = [parseInt($("#Latitude").val()), parseInt($("#Longitude").val())];
    marker.setLatLng(position, {
      draggable: 'true'
    }).bindPopup(position).update();
    map.panTo(position);
*/

  //mymap.addLayer(marker);
				break;
			case 2:
	/****************************************************************
	
	GoogleMaps-Karte zeichnen
	
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
		zoom: defZoom,
		minZoom: 4
	  };
	
	  if(!uploadProperties.map) { 	// wurde schon bei einem vorherigen Upload eine Karte erstellt?
	 
		uploadProperties.map = new google.maps.Map(document.getElementById("mapcontainer"), mapOptions);
	
		/*var defaultBounds = new google.maps.LatLngBounds(
		new google.maps.LatLng(-33.8902, 151.1759),
		new google.maps.LatLng(-33.8474, 151.2631));
		uploadProperties.map.fitBounds(defaultBounds);*/
	
		var input = /** @type {HTMLInputElement} */document.getElementById('pacInput');
		uploadProperties.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
	
		var searchBox = new google.maps.places.SearchBox(input);
		uploadProperties.searchBox = searchBox;
	  } else {
		  searchBox = uploadProperties.searchBox;
		  uploadProperties.map.setMapTypeId(google.maps.MapTypeId.ROADMAP);	// Kartenmodus erzwingen
	  }
		uploadProperties.marker.push(new google.maps.Marker({
		  position: myLatlng,
		  map: uploadProperties.map,
		  draggable: true,
		  title: 'Bildposition bestimmen'
		}));  
	  uploadProperties.gmL.push(uploadProperties.map.addListener('click', function(event) {
		placeMarker(uploadProperties.marker[0], event.latLng, uploadProperties.map, defZoom);
		_findSimilar(event);
	  }));
	  /*
	Event, wenn Karte vollständig geladen ist
	
	*/
	  uploadProperties.gmL.push(uploadProperties.map.addListener('tilesloaded', function() {
	
			_findSimilar(event);
	  }));
	/*********************************************
	
	Marker wurde an neue Position bewegt
	
	**********************************************/
	  uploadProperties.gmL.push(google.maps.event.addListener(uploadProperties.marker[0], 'dragend', function(event) {
		_findSimilar(event);
	  }));
	
	  // [START region_getplaces]
	  // Listen for the event fired when the user selects an item from the
	  // pick list. Retrieve the matching places for that item.
	  uploadProperties.gmL.push(google.maps.event.addListener(searchBox, 'places_changed', function() {
		var places = searchBox.getPlaces();
	
		if (places.length == 0) {
		  return;
		}
		var bounds = new google.maps.LatLngBounds();
		place = places[0];
		//uploadProperties.map.panTo(place.geometry.location);
		bounds.extend(place.geometry.location);
		uploadProperties.map.fitBounds(bounds);
		placeMarker(uploadProperties.marker[0], place.geometry.location, uploadProperties.map, defZoom);
		_findSimilar(event);
	  }));
	
	
			//$('position').setStyle({ display: 'block' });
			$('#position').slideDown("fast","swing");
			//MagicSlideshow.start('history_slide');
			//console.log(uploadProperties.coord);
			setMapMarkerPos(uploadProperties.map,uploadProperties.coord, uploadProperties.marker[0], defZoom);
			_findSimilar();
				break;
			}		  
	
	
	
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
	
			});		// onComplete end
	  }  // init end
};

/*
document.observe('dom:loaded', function() {
  $('user_loggedin').prototip.show();
});

function deleteMarker() {
  uploadProperties.marker[0].setMap(null);
  for (i=0;i<uploadProperties.marker.length;i++) uploadProperties.marker[i].setMap(null);
  uploadProperties.marker = [];
}
function _hideSlide() {
	if($('#slide-1').length) {
		MagicSlideshow.stop('slide-1');
		$('#showSlide').empty();
	}
}*/
/****************************************************************

Gibt es an der gewählten Position bereits Bilder?

Überprüfen, ob an der Bildposition breits Bilder existieren
Größe des Umfeldes mit 'coordRec' festgelegt

Falls ja, wird Slideshow mit den gefunden Informationen angezeigt


****************************************************************/
/*function _findSimilar(e) {
    $("#latbox").val(uploadProperties.marker[0].getPosition().lat());
    $("#lngbox").val(uploadProperties.marker[0].getPosition().lng());
	//console.log($('#lngbox').val());

	// Bilder in unmittelbarer Umgebung ermitteln und darstellen
	// Benutzer kann so Duplikate vermeiden und sein Bild zu bereits bestehenden hinzufügen

	var neLat = parseFloat($.trim($("#latbox").val()))+coordRec;
	var swLat = parseFloat($.trim($("#latbox").val()))-coordRec;
	var neLng = parseFloat($.trim($("#lngbox").val()))+coordRec;
	var swLng = parseFloat($.trim($("#lngbox").val()))-coordRec;

	// Array mit allen Posts füllen, die innerhalb des dargestellten Bereichs liegen

	$.post("../script/getRangePosts.php",
 	 		{sw_lat: swLat, sw_long: swLng, ne_lat: neLat, ne_long: neLng, picID: uploadProperties.picID },
			function(p, status) {
    	  			if (p !== "") {	
						//	json-Informationen aus dem Rückgabewert holen:

								var adata = jQuery.parseJSON(p.slice(0, p.search('}')+1));
    	  						if (adata.success === true)  
    	  						{
								  //console.log("RangePost: "+p.responseText.slice(p.responseText.search('}')+1));
								  var id=adata.posts.split(",");
								  var names=adata.names.split(",");
								  var pos=adata.coord.split(";");
								  //console.log("Bilder in Nähe: "+adata.posts);

	// Slideshow erstellen
							   	  if(!$("#slide-1").length) {
									var node = document.createElement("div");
									node.id="slide-1";
									for(var i=0; i<names.length;i++)
									{
										var div = document.createElement("div");
										var img = document.createElement('img');
										img.src = storeFolder+"small_"+names[i];
										div.appendChild(img);
										c=pos[i].split(",");
										//img = document.createElement('img');
										//img.src = "http://maps.googleapis.com/maps/api/staticmap?center="+c[0]+","+c[1]+"&zoom=15&size=470x90&markers=color:orange|label:?|"+c[0]+","+c[1];
										//div.appendChild(img);
										node.appendChild(div);
									}
									document.getElementById("showSlide").appendChild(node);
									$("#slide-1").addClass("MagicSlideshow");
									MagicSlideshow.refresh('slide-1');
									MagicSlideshow.start('slide-1');
								  } else {
									console.log("no data");
								  }
								}
					}
	});
}*/
</script>
		  </li>
<!--****************************************************************

newsfeed

Darstellung von Bildern, Karten, Kommentaren und
Bewertungen der User

Bilder können angesehen, kommentiert, bewertet und verglichen
werden

****************************************************************-->
        <div id="newsfeed"></div>
        <?php //include "../script/loadpost.php"; ?>
        <div id="infiniteSpinner" class="cardtop">
  		  <!--div class="talk-load-more"><button class="Button__button___2b6e    Button__type--local___1PIMj   talk-load-more-button">Weitere Kommentare anzeigen</button></div-->
		</div>
		  <div id="eof"><img src="../../img/loadPost.gif" width="100%" height="240px"></div>
        <div class="cardbottom"></div>
		<li class="media list-group-item p-4 mb-2">
          <img
            class="media-object d-flex align-self-start mr-3"
            src="assets/img/avatar-mdo.png">
          <div class="media-body">
            <div class="media-heading">
              <small class="float-right text-muted">posted 2015-12-17 18:27:45</small>
              <h6>Mark Otto</h6>
            </div>

            <p>
              Der erste Zug für die U1 - fix.
            </p>

            <div class="media-body-inline-grid mb-0" data-grid="images">
              <img style="display: none" data-width="640" data-height="640" data-action="zoom" src="../../22062014/5c77507e4136926ecebb89f861eae98d.jpg">
            </div>
			<div class="mb-3">
			<?php $h->drawStaticMap(MAP_TYPE,48.20107504,16.36899852);  // gewählten Kartentyp initialisieren ?>
			</div>
			
			  <!--div id="mapid" style="width: 100%; height: 120px;"></div-->
  
            <ul class="media-list">
              <li class="media mb-3">
                <img
                  class="media-object d-flex align-self-start mr-3"
                  src="assets/img/avatar-dhg.png">
                <div class="media-body">
                  <strong>Dave Gamache: </strong>
                  Donec id elit non mi porta gravida at eget metus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec ullamcorper nulla non metus auctor fringilla. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Sed posuere consectetur est at lobortis.
                </div>
              </li>
			  <li class="media mb-3">
                <img
                  class="media-object d-flex align-self-start mr-3"
                  src="assets/img/avatar-fat.jpg">
                <div class="media-body">
                  <strong>Jacon Thornton: </strong>
                  Donec id elit non mi porta gravida at eget metus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec ullamcorper nulla non metus auctor fringilla. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Sed posuere consectetur est at lobortis.
                </div>
              </li>
              <li class="media">
                <img
                  class="media-object d-flex align-self-start mr-3"
                  src="assets/img/avatar-mdo.png">
                <div class="media-body">
                  <strong>Mark Otto: </strong>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
                </div>
              </li>
            </ul>
          </div>
        </li>
		<li class="media list-group-item p-4 mb-2">
          <img
            class="media-object d-flex align-self-start mr-3"
            src="assets/img/avatar-mdo.png">
          <div class="media-body">
            <div class="media-heading">
              <small class="float-right text-muted">posted 2015-12-17 18:27:45</small>
              <h6>Mark Otto</h6>
            </div>

            <p>
              Der erste Zug für die U1 - fix noch einmal.
            </p>

            <div class="media-body-inline-grid mb-0" data-grid="images">
              <img style="display: none" data-width="640" data-height="640" data-action="zoom" src="../../22062014/5c77507e4136926ecebb89f861eae98d.jpg">
            </div>
			<div class="mb-3">
			<?php $h->drawStaticMap(MAP_TYPE,48.20107504,16.36899852);  // gewählten Kartentyp initialisieren ?>
			</div>
			
			  <!--div id="mapid" style="width: 100%; height: 120px;"></div-->
  
            <ul class="media-list">
              <li class="media mb-3">
                <img
                  class="media-object d-flex align-self-start mr-3"
                  src="assets/img/avatar-dhg.png">
                <div class="media-body">
                  <strong>Dave Gamache: </strong>
                  Donec id elit non mi porta gravida at eget metus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec ullamcorper nulla non metus auctor fringilla. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Sed posuere consectetur est at lobortis.
                </div>
              </li>
			  <li class="media mb-3">
                <img
                  class="media-object d-flex align-self-start mr-3"
                  src="assets/img/avatar-fat.jpg">
                <div class="media-body">
                  <strong>Jacon Thornton: </strong>
                  Donec id elit non mi porta gravida at eget metus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec ullamcorper nulla non metus auctor fringilla. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Sed posuere consectetur est at lobortis.
                </div>
              </li>
              <li class="media">
                <img
                  class="media-object d-flex align-self-start mr-3"
                  src="assets/img/avatar-mdo.png">
                <div class="media-body">
                  <strong>Mark Otto: </strong>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
                </div>
              </li>
            </ul>
          </div>
        </li>
        <li class="media list-group-item p-4 mb-2">
          <img
            class="media-object d-flex align-self-start mr-3"
            src="assets/img/avatar-dhg.png">
          <div class="media-body">
            <div class="media-heading">
              <small class="float-right text-muted">4 min</small>
              <h6>Dave Gamache</h6>
            </div>

            <p>
              Aenean lacinia bibendum nulla sed consectetur. Vestibulum id ligula porta felis euismod semper. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            </p>

            <div class="media-body-inline-grid" data-grid="images">
              <div style="display: none">
                <img data-action="zoom" data-width="1050" data-height="700" src="assets/img/unsplash_1.jpg">
              </div>

              <div style="display: none">
                <img data-action="zoom" data-width="640" data-height="640" src="assets/img/instagram_1.jpg">
              </div>

              <div style="display: none">
                <img data-action="zoom" data-width="640" data-height="640" src="assets/img/instagram_13.jpg">
              </div>

              <div style="display: none">
                <img data-action="zoom" data-width="1048" data-height="700" src="assets/img/unsplash_2.jpg">
              </div>
            </div>

            <ul class="media-list mb-2">
              <li class="media mb-3">
                <img
                  class="media-object d-flex align-self-start mr-3"
                  src="assets/img/avatar-fat.jpg">
                <div class="media-body">
                  <strong>Jacon Thornton: </strong>
                  Donec id elit non mi porta gravida at eget metus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec ullamcorper nulla non metus auctor fringilla. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Sed posuere consectetur est at lobortis.
                </div>
              </li>
              <li class="media">
                <img
                  class="media-object d-flex align-self-start mr-3"
                  src="assets/img/avatar-mdo.png">
                <div class="media-body">
                  <strong>Mark Otto: </strong>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
                </div>
              </li>
            </ul>
          </div>
        </li>

        <li class="media list-group-item p-4 mb-2">
          <img
            class="media-object d-flex align-self-start mr-3"
            src="assets/img/avatar-fat.jpg">
          <div class="media-body">
            <div class="media-body-text">
              <div class="media-heading">
                <small class="float-right text-muted">12 min</small>
                <h6>Jacob Thornton</h6>
              </div>
              <p>
                Donec id elit non mi porta gravida at eget metus. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
        </li>

		  <li class="media list-group-item p-4 mb-2">
          <img
            class="media-object d-flex align-self-start mr-3"
            src="assets/img/avatar-dhg.png">
          <div class="media-body">
            <div class="media-heading">
              <small class="float-right text-muted">4 min</small>
              <h6>Dave Gamache</h6>
            </div>

            <p>
              Aenean lacinia bibendum nulla sed consectetur. Vestibulum id ligula porta felis euismod semper. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            </p>

            <div class="media-body-inline-grid" data-grid="images">
              <div style="display: none">
                <img data-action="zoom" data-width="1050" data-height="700" src="assets/img/unsplash_1.jpg">
              </div>

              <div style="display: none">
                <img data-action="zoom" data-width="640" data-height="640" src="assets/img/instagram_1.jpg">
              </div>

              <div style="display: none">
                <img data-action="zoom" data-width="640" data-height="640" src="assets/img/instagram_13.jpg">
              </div>

              <div style="display: none">
                <img data-action="zoom" data-width="1048" data-height="700" src="assets/img/unsplash_2.jpg">
              </div>
            </div>

            <ul class="media-list mb-2">
              <li class="media mb-3">
                <img
                  class="media-object d-flex align-self-start mr-3"
                  src="assets/img/avatar-fat.jpg">
                <div class="media-body">
                  <strong>Jacon Thornton: </strong>
                  Donec id elit non mi porta gravida at eget metus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec ullamcorper nulla non metus auctor fringilla. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Sed posuere consectetur est at lobortis.
                </div>
              </li>
              <li class="media">
                <img
                  class="media-object d-flex align-self-start mr-3"
                  src="assets/img/avatar-mdo.png">
                <div class="media-body">
                  <strong>Mark Otto: </strong>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
                </div>
              </li>
            </ul>
          </div>
        </li>

        <li class="media list-group-item p-4 mb-2">
          <img
            class="media-object d-flex align-self-start mr-3"
            src="assets/img/avatar-fat.jpg">
          <div class="media-body">
            <div class="media-body-text">
              <div class="media-heading">
                <small class="float-right text-muted">12 min</small>
                <h6>Jacob Thornton</h6>
              </div>
              <p>
                Donec id elit non mi porta gravida at eget metus. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
        </li>

        <li class="media list-group-item p-4 mb-2">
          <img
            class="media-object d-flex align-self-start mr-3"
            src="assets/img/avatar-mdo.png">
          <div class="media-body">
            <div class="media-heading">
              <small class="float-right text-muted">34 min</small>
              <h6>Mark Otto</h6>
            </div>

            <p>
              Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.
            </p>

            <div class="media-body-inline-grid" data-grid="images">
              <img style="display: none" data-width="640" data-height="640" data-action="zoom" src="assets/img/instagram_3.jpg">
            </div>

            <ul class="media-list">
              <li class="media">
                <img
                  class="media-object d-flex align-self-start mr-3"
                  src="assets/img/avatar-dhg.png">
                <div class="media-body">
                  <strong>Dave Gamache: </strong>
                  Donec id elit non mi porta gravida at eget metus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec ullamcorper nulla non metus auctor fringilla. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Sed posuere consectetur est at lobortis.
                </div>
              </li>
            </ul>
          </div>
        </li>
		</ul>
		</div>
<!----------------------------------------------------
   Rechte Spalte für News, Werbung...

----------------------------------------------------->

    <div id="comment" class="col-lg-3">
		<div id="weiterLesen">
			<div id="weiterLesenScroll">
      <div class="alert alert-warning alert-dismissible d-none d-lg-block" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <a class="alert-link" href="profile/index.html">Visit your profile!</a> Check your self, you aren't looking well.
      </div>

      <div class="card mb-4 d-none d-lg-block">
        <div class="card-body">
          <h6 class="mb-3">Sponsored</h6>
          <div data-grid="images" data-target-height="150">
            <img class="media-object" data-width="640" data-height="640" data-action="zoom" src="assets/img/instagram_2.jpg">
          </div>
          <p><strong>It might be time to visit Iceland.</strong> Iceland is so chill, and everything looks cool here. Also, we heard the people are pretty nice. What are you waiting for?</p>
          <button class="btn btn-outline-primary btn-sm">Buy a ticket</button>
        </div>
      </div>

      <div class="card mb-4 d-none d-lg-block">
        <div class="card-body">
        <h6 class="mb-3">Likes <small>· <a href="#">View All</a></small></h6>
        <ul class="media-list media-list-stream">
          <li class="media mb-2">
            <img
              class="media-object d-flex align-self-start mr-3"
              src="assets/img/avatar-fat.jpg">
            <div class="media-body">
              <strong>Jacob Thornton</strong> @fat
              <div class="media-body-actions">
                <button class="btn btn-outline-primary btn-sm">
                  <span class="icon icon-add-user"></span> Follow</button>
              </div>
            </div>
          </li>
           <li class="media">
            <a class="media-left" href="#">
              <img
                class="media-object d-flex align-self-start mr-3"
                src="assets/img/avatar-mdo.png">
            </a>
            <div class="media-body">
              <strong>Mark Otto</strong> @mdo
              <div class="media-body-actions">
                <button class="btn btn-outline-primary btn-sm">
                  <span class="icon icon-add-user"></span> Follow</button></button>
              </div>
            </div>
          </li>
        </ul>
        </div>
        <div class="card-footer">
          Dave really likes these nerds, no one knows why though.
        </div>
      </div>
	<div class="card mb-4 d-none d-lg-block">
        <div class="card-body">
          <h6 class="mb-3">Sponsored</h6>
          <div data-grid="images" data-target-height="150">
            <img class="media-object" data-width="640" data-height="640" data-action="zoom" src="assets/img/instagram_2.jpg">
          </div>
          <p><strong>It might be time to visit Iceland.</strong> Iceland is so chill, and everything looks cool here. Also, we heard the people are pretty nice. What are you waiting for?</p>
          <button class="btn btn-outline-primary btn-sm">Buy a ticket</button>
        </div>
      </div>

      <div class="card mb-4 d-none d-lg-block">
        <div class="card-body">
        <h6 class="mb-3">Likes <small>· <a href="#">View All</a></small></h6>
        <ul class="media-list media-list-stream">
          <li class="media mb-2">
            <img
              class="media-object d-flex align-self-start mr-3"
              src="assets/img/avatar-fat.jpg">
            <div class="media-body">
              <strong>Jacob Thornton</strong> @fat
              <div class="media-body-actions">
                <button class="btn btn-outline-primary btn-sm">
                  <span class="icon icon-add-user"></span> Follow</button>
              </div>
            </div>
          </li>
           <li class="media">
            <a class="media-left" href="#">
              <img
                class="media-object d-flex align-self-start mr-3"
                src="assets/img/avatar-mdo.png">
            </a>
            <div class="media-body">
              <strong>Mark Otto</strong> @mdo
              <div class="media-body-actions">
                <button class="btn btn-outline-primary btn-sm">
                  <span class="icon icon-add-user"></span> Follow</button></button>
              </div>
            </div>
          </li>
        </ul>
        </div>
        <div class="card-footer">
          Dave really likes these nerds, no one knows why though.
        </div>
      </div>

      <div class="card card-link-list">
        <div class="card-body">
          © 2018 Bootstrap
          <a href="#">About</a>
          <a href="#">Help</a>
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Cookies</a>
          <a href="#">Ads </a>
          <a href="#">Info</a>
          <a href="#">Brand</a>
          <a href="#">Blog</a>
          <a href="#">Status</a>
          <a href="#">Apps</a>
          <a href="#">Jobs</a>
          <a href="#">Advertise</a>
        </div>
      </div>
	  		</div>
	</div><div id="endcomment"></div>
    </div>
  </div>
</div>
<div id="bouncepopup" style="background-color:rgba(0,0,0,0.7);top:0;left:0;bottom:0;right:0;position:fixed;z-index:10; display:none">
<div id="popup_container" style="padding:0;position:relative;background-color:white;margin:70px auto 0 auto;width:1450px;height:850px;z-index:0;border-radius: .8rem;"><div id="pop_close" style="position:absolute;right:-7px;top:-7px;z-index:1005;background:url(img/closebutton-blue.png) no-repeat top center;width:24px;height:24px;cursor:pointer;opacity:1;" onClick="javascript: hideMap();">
</div>
<div id="popup_map" style="width:100%; height:100%; border-color: #010101; border-style: solid; border-radius: .8rem;">
</div>
</div></div>

	<!--script src="assets/js/jquery-ui-1.12.1.custom/jquery-ui.min.js"></script-->
    <script src="assets/js/popper.min.js"></script>
    <script src="assets/js/chart.js"></script>
    <script src="assets/js/toolkit.js"></script>
    <script src="assets/js/application.js"></script>
    <script>
      // execute/clear BS loaders for docs
      $(function(){while(window.BS&&window.BS.loader&&window.BS.loader.length){(window.BS.loader.pop())()}})

	/*$(function() {
	$( "#Datepicker1" ).datepicker({
	  showButtonPanel: true,
	  yearRange: "1826:" + (new Date().getFullYear()),
	  dateFormat: "yy-mm-dd",
	  changeMonth: true,
      changeYear: true,
	  stepMonths: 12,
	  gotoCurrent: true
    });
});*/
<?php if (MAP_TYPE===2) echo 'async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAfCDbptvrgd56EmthAWko3xI_btbu3JBc&libraries=places">'; ?>

</script>
  </body>
</html>