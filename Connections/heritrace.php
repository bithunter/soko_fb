<?php
if (!isset($DATABASE_INCLUDED)) {

	$eregi=($_SERVER['HTTP_HOST']==='localhost:8888')? 2: 1;
	
	//$eregi = 2;
	

	
switch($eregi) {
	case 1:
	$hostName = "db663813595.db.1and1.com";
	$username = "dbo663813595";
	$password = "jjKKlluuVV00RRuutt11@@";
	$databaseName = "db663813595";

	$url_ = "http://www.heritrace.com/";
	break;
case 2:
	$hostName = "localhost";
	$username = "root";
	$password = "root";
	$databaseName = "heritrace";

	$url_ = "http://localhost:8888/heritrace_nw/heritrace_com/";
	break;
 case 3:
	$hostName = "localhost";
	$username = "bithunter";
	$password = "eF2_s87v";
	$databaseName = "vintage";
}

/*	$mysqli = new mysqli($hostName, $username, $password, $databaseName);

// Check connection
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}
*/

function openDataBase() {
global $hostName, $username, $password, $databaseName;
$mysqli = new mysqli($hostName, $username, $password, $databaseName);

/* check connection */
if ($mysqli->connect_errno) {
    printf("Connect failed: %s\n", $mysqli->connect_error);
    exit();
}
  return $mysqli;
}
$DATABASE_INCLUDED = 1;
}

?>