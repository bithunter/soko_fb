<?php
/****************************************************************

newsfeed - Postings laden


****************************************************************/
include("../inc/htr_config.php");
include "../script/mapdata.php";

$path = "../../22062014/";

$mysqli = openDataBase();
$post = "";
$postID=0;
$lim = $_POST['lim'];												// max. zu ladende posts
$q_data = $mysqli->query($_POST['sql']);

$sqlKey = array("profileID","firstname","lastname","profile");
do
{
	if($post_data = $q_data->fetch_assoc()) {
		$postID = $post_data['postID'];
		$sql = "SELECT profileID, firstname, lastname FROM profile WHERE profileID = ".$post_data['profileID'];
		$q1_data = $mysqli->query($sql);
		$profile_data = $q1_data->fetch_assoc();
	
		$profilename = "../profile/".$profile_data['profileID'].'.jpeg';
		$picname = $path.$post_data['pictureName'];
	
		if (!file_exists($profilename)) { $profilename ='../img/person_unknown_tiny.png'; }
	
		$latitude = $post_data['latitude'];
		$longitude = $post_data['longitude'];
		//$picLarge = data_uri($path.$post_data['pictureName'],'image/png');
		//$picSmall = data_uri($path.'small_'.$post_data['pictureName'],'image/png');
		
		if(!$description = $post_data['description']) $description=" heritrace - tracing back the heritage ";

/*		
<img alt="Profilbild von Philipp19" style="background:url(/static/images/upload/5457/6fcd55cf407efa35f2ba/3971b6202bdfef12e30fb67a690f3e8f019de15c37e62175_6b2ab7daa86e011e8c075e6340c553f2_crop_mask.jpg?1415016397)" src="../img/photo_overlay-dfa2001-1.png" width="480" height: auto>	
		
*/
		switch($_POST['output']){
			case "browser":
				$post.='<li class="media list-group-item p-4 mb-2" id="post'.$postID.'">
				<img class="media-object d-flex align-self-start mr-3" src="assets/img/avatar-mdo.png"><div class="media-body"><div class="media-heading"><small class="float-right text-muted">posted '.$post_data['dateMake'].'</small><h6>'.$profile_data['firstname'].'  '.$profile_data['lastname'].'</h6>
				</div>			
				<p>'.$description.'</p>
				<div style="overflow: hidden; width: 480px; height: auto;"><div style="overflow: auto; width: 480px; height: auto;"><a title="'.$post_data['pictureOrgName'].'" href="'.$path.$post_data['pictureName'].'" id="zoom'.$post_data['postID'].'" data-options="zoomWidth:400px; zoomHeight:400px; smoothing-speed:15; hint:always; zoomOn: click;" class="MagicZoom" ><img src="'.$path.'small_'.$post_data['pictureName'].'"/></a></div></div>
				<div class="mb-3"><img src="../../inc/staticmap.php?center='.$latitude.','.$longitude.'&zoom=16&size=300x120&maptype=landscape&maptype=mapnik&markers='.$latitude.','.$longitude.',ol-marker-green" width="100%" height="120px"></div><ul class="media-list">
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
            </ul></div></li>';
				
				/*<img class="heart-icon-empty"><img src="../img/bars-16x11.gif" width="16" height="11" /></span><span class="unfollow" style="visibility:hidden;display:none;"><img class="heart-icon-full">you heart this</span></a></div></div><div id="'.$post_data['postID'].'" class="block" ></div></div>';*/
				break;
			case "mobile":
				break;
		}
	} else {
		break;
	}
$lim--;
}
while($lim>=1);
$data = array( 
    'success' => true,
	'lastID' => $postID );		// ID des letzten geladenen Post
echo json_encode($data);
echo $post;

$mysqli->close();

// Eventuell Bilder als Daten einfügen - somit kein Link auf die Bilder
function data_uri($file, $mime)
{
  $contents = file_get_contents($file);
  $base64   = base64_encode($contents);
  return ('data:' . $mime . ';base64,' . $base64);
}

//<img src="<?php echo data_uri('elephant.png','image/png')...
?>