<?php
if (!isset($DATABASE_INCLUDED)) {
/**
 * Das sind die Login-Angaben für die Datenbank
 */

	$eregi=($_SERVER['HTTP_HOST']==='localhost:8888')? 2: 1;

	define ("MAP_TYPE", 1);		// 1=OpenStreetMap     2=GoogleMaps
	

// Wieviel Einträge pro Seite sollen dargestellt werden?
define("MAX_EINTRAEGE",6);

// Wieviel Seitenzahlen in der Navigationsleiste angezeigt werden. Ausgabe kann sein
// << < 2 3 4 5 6 7 8 9 10 11 12 > >>
// Die Berechnung erfolgt nur für ungerade Zahlen!!!
define("NAV_LEISTE",9);

define("MAKE_LIST",25);		// Anzahl Listeneinträge beim ersten Laden
define("LOAD_LIST",10);		// Anzahl Listeneinträge beim Nachladen

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
	$port = "3306";

	$url_ = "http://localhost:8888/heritrace_up/heritrace_com/";
	break;
 case 3:
	$hostName = "localhost";
	$username = "bithunter";
	$password = "eF2_s87v";
	$databaseName = "vintage";
	$port = "3306";
}

/*	$mysqli = new mysqli($hostName, $username, $password, $databaseName);

// Check connection
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}
*/

function openDataBase() {
global $hostName, $username, $password, $databaseName, $port;
	
$conn = mysqli_connect($hostName, $username, $password, $databaseName);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error. " - Number : " . $conn->connect_errno());
} 
return $conn;
}
$DATABASE_INCLUDED = 1;
}
?>