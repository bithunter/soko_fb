<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8'" />
</head>

<body>
<?php
			include "../inc/htr_config.php";
			include "error.php";


	echo "Info: ".$hostName." - ", $username." - ", $password." - ",$_SERVER['PHP_SELF'],"<br><br>";

/*
// Create connection 
$conn = new mysqli($hostName, $username, $password);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

// Create database
$sql = "CREATE DATABASE heritrace";
if ($conn->query($sql) === TRUE) {
    echo "Database created successfully";
} else {
    echo "Error creating database: " . $conn->error;
}

$conn->close();
*/

		$mysqli = mysqli_connect($hostName, $username, $password, $databaseName);

// Check connection
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error. " - Number : " . $mysqli->connect_errno() . "<br><br><br>");
} 
		echo "<br> Verbindung wurde hergestellt <br>";

	mysqli_set_charset($mysqli, 'utf8');

			$sql="DROP TABLE IF EXISTS FBprofile";

	if (mysqli_query($mysqli, $sql)) {
    echo "Alte FBprofile Tabelle gelöscht!<br>";
} else {
    echo "Error deleting table: " . mysqli_error($mysqli);
}
	
	
	$sql="CREATE TABLE FBprofile (
 	 UID bigint(20) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
 	 FBid varchar(100) NOT NULL,
 	 FBNachname varchar(60) NOT NULL,
 	 FBVorname varchar(60) NOT NULL,
 	 FBemail varchar(60) DEFAULT NULL,
	 FBlink varchar(100) NOT NULL,
	 FBlocale varchar(5) NOT NULL
	)";

	if (mysqli_query($mysqli,$sql) === TRUE) {
   		echo "Table FBprofile created successfully<br><br>";
		} else {
   		 echo "Error creating table: " . $mysqli->error . "<br><br><br>";
	}
	/*$sql = "INSERT INTO FBprofile (FBid, FBNachname, FBVorname, FBemail) VALUES 
('1375949719376074', 'Bauer', 'Andreas', 'bithunter35@gmail.com')";
			if (!$mysqli->query($sql) === TRUE) {
    			
   			 	echo "Error: " . $sql . "<br>" . $mysqli->error;
			}*/

			$mysqli->query("DROP TABLE IF EXISTS profile");
			echo "Alte profile Tabelle gelöscht!<br>";

            $sql="CREATE TABLE profile (	profileID bigint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
 							 				firstname varchar(60),
											lastname varchar(60),
							 				facebook			varchar(100) DEFAULT NULL,
											usertype			tinyint unsigned,
											status				tinyint unsigned,
											onlinetext			varchar(120),
											offlinetext			varchar(120),
											gender				tinyint unsigned,
											email				varchar(60),
											country				tinyint unsigned,
											state				tinyint unsigned,
											myplace				varchar(64),
											language			tinyint unsigned,
											nickName			varchar(20),
											password			varchar(50),
											birthdate			DATE,
											question			varchar(40),
											answer				varchar(40),
											newsletter			tinyint unsigned,
											smsnews				tinyint unsigned,
											signIn				DATETIME,
											activation			tinyint unsigned,
											logoff				tinyint unsigned,
											logoffDate			DATE default NULL,
											mailsize			int unsigned,
											switch				tinyint unsigned
										)";

			mysqli_query($mysqli,"SET NAMES 'utf8'");
			mysqli_query($mysqli,"SET CHARACTER SET 'utf8'");
            if (mysqli_query($mysqli,$sql) === TRUE) {
    			echo "Table profile created successfully<br><br>";
				} else {
   			 	echo "Error creating table: " . $mysqli->error . "<br><br><br>";
			}


			$mysqli->query("DROP TABLE IF EXISTS posts");
			echo "Alte posts Tabelle gelöscht!<br>";

            $sql="CREATE TABLE posts (
  							postID bigint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
							profileID bigint unsigned NOT NULL,
							pictureDate DATETIME,
							dateMake timestamp DEFAULT CURRENT_TIMESTAMP,
							type tinyint unsigned,
							pictureName varchar(50) NOT NULL,
							pictureOrgName varchar(50) NOT NULL,
							latitude varchar(255) NOT NULL,
							longitude varchar(255) NOT NULL,
 							description varchar(255) NOT NULL,
							verified tinyint unsigned,
							completed tinyint unsigned
						)";

            if (mysqli_query($mysqli,$sql) === TRUE) {
    			echo "Table posts created successfully<br><br>";
				} else {
   			 	echo "Error creating table: " . $mysqli->error . "<br><br><br>";
			}



			$sql="INSERT INTO posts (profileID, pictureDate, dateMake, type, pictureName, pictureOrgName, latitude, longitude, description, verified, completed) VALUES
(1, '1876-12-03 18:27:45', '2015-12-03 18:27:45', 1, 'fa572b645a8deef46061d9e700f7f502.jpg', 'Franz-Josef-Kai_1876.jpg', '48.212436538126106', '16.375355353858936', 'KuK Armee am Kai', 0, 0),
(1, '1863-03-12 11:17:22', '2015-12-04 18:27:45', 1, 'e1505be18dc769646b8e1581063c2529.jpg', 'Bau_Staatsoper_1863.jpg','48.203034238547495', '16.36901461174773', 'Bau der Staatsoper war Handarbeit', 0, 0),
(1, '1963-12-11 22:10:15', '2015-12-06 18:27:45', 1, 'e8b8d36f8b564f55448c43880206bcc3.jpg', '1963_Nussdorfer_Str.jpg','48.23138961405218', '16.35481499722289', 'Einfach Kotany', 0, 0),
(1, '1915-10-03 14:47:05', '2015-12-08 18:27:45', 1, '79d1e12aefbcc4058c7bffb6a3ffda9e.jpg', '3Radetzkystr.27-1915.jpg','48.2120018', '16.3906993833', 'Anstellen um Essen', 0, 0),
(1, '2013-03-12 11:17:22', '2015-12-09 18:27:45', 1, 'd70fa9e2f3c058975c4693550e46ce07.jpg', 'Nordbahnhof.jpg','48.220257364022245', '16.391083827522266', 'Der alte Nordbahnhof', 0, 0),
(1, '1969-12-11 22:10:15', '2015-12-13 18:27:45', 1, 'bd7d8f35e9f2b572169b05c9d41bab0f.jpg', 'parlament_1969.jpg','48.20703132054828', '16.359712710884082', 'Parlament anno dazumal', 0, 0),
(1, '2013-10-07 19:43:52', '2015-12-15 18:27:45', 1, '17a57bc6a606277282403f48e58d3d48.jpg', '3_ubahn.jpg','48.2010028972', '16.36893581670006', 'Ein gro&#223;es Loch f&#252;r die Ubahn', 0, 0),
(1, '2014-12-11 22:10:15', '2015-12-17 18:27:45', 1, '5c77507e4136926ecebb89f861eae98d.jpg', '2_ubahn.jpg','48.2010028972', '16.36893581670006', 'Der erste Zug f&#252;r die U1', 0, 0),
(1, '1872-12-03 18:27:45', '2015-12-24 18:27:45', 1, '950439c87c7ead2d87c395e1fa826567.jpg', 'Burgring_1872.jpg','48.20389946521798', '16.363811126258838', 'Wiener Burgring', 0, 0),
(1, '1875-10-07 19:43:52', '2015-12-31 18:27:45', 1, '5839e8d8029e8ac2ee9fdeb74d37590e.jpg', 'Schottenring_Wien_1875.jpg','48.2140108139', '16.362130466700023', 'Am Schottentor in Wien', 0, 0)";

			if (mysqli_query($mysqli,$sql) === TRUE) {
    			echo "New records in table posts created successfully<br><br>";
				} else {
   			 	echo "Error inserting Lines: " . $sql . "<br>" . $mysqli->error . "<br><br><br>";
			}

/******************************************************************************/


$sql = "INSERT INTO profile (firstname, lastname, facebook, email, password) VALUES 
('Andreas', 'Bauer', '1375949719376074', 'bithunter35@gmail.com', 'aaeee1a7a34fc6d3d4f03278eb8fbff5')";
			mysqli_query($mysqli,"SET NAMES 'utf8'");
			mysqli_query($mysqli,"SET CHARACTER SET 'utf8'");
			if (!mysqli_query($mysqli,$sql) === TRUE) {
    			
   			 	echo "Error: " . $sql . "<br>" . $mysqli->error . "<br><br><br>";
			}
$sql = "INSERT INTO profile (`firstname`, `lastname`) VALUES
('Patricia', 'Herting'),
('Benedikt', 'Altenhöfer'),
('Marc', 'Wekkeli'),
('Jens', 'Hohn'),
('Monika', 'Gruber'),
('Winfried', 'Unterer'),
('Lena-Katrin', 'Hopp'),
('Roswitha', 'Säubert'),
('Stephan', 'Bauer'),
('Sabine', 'Rausch'),
('Josef', 'Muser'),
('Dieter', 'Sauren'),
('Ullrich', 'Niedzwetzki'),
('Diana', 'Ashman'),
('Bastian', 'Dombret'),
('Nerantzia', 'Chalou'),
('Katharina', 'Meister'),
('Gerd', 'Liedtke'),
('Georg', 'Kressierer'),
('Carina', 'Wegmann'),
('Johann', 'Leinthaler'),
('Katharina', 'Thies'),
('Jöszi', 'Piwak'),
('Silvia', 'Newin'),
('Martina',  'Volkert'),
('Waltraud', 'Kink'),
('Oliver-Michael', 'Löbcke'),
('Angelika', 'Andrae'),
('Michael', 'Adolf')";

			mysqli_query($mysqli,"SET NAMES 'utf8'");
			mysqli_query($mysqli,"SET CHARACTER SET 'utf8'");
			mysqli_set_charset($mysqli, 'utf8');
			if (mysqli_query($mysqli,$sql) === TRUE) {
    			echo "New records in table profile created successfully<br><br>";
				} else {
   			 	echo "Error: " . $sql . "<br>" . $mysqli->error . "<br><br><br>";
			}

			$mysqli->query("DROP TABLE IF EXISTS membersOnline");
			echo "Alte membersOnline Tabelle gelöscht!<br>";

			$sql="CREATE TABLE membersOnline(    userID int unsigned NOT NULL PRIMARY KEY,
											facebook varchar(100) NOT NULL,
											type tinyint unsigned,
											IP VARCHAR(15),
											sess_ID VARCHAR(32),
											Activity DATETIME	)";
			if (mysqli_query($mysqli,$sql) === TRUE) {
    			echo "Table membersOnline created successfully<br><br>";
				} else {
   			 	echo "Error creating table: " . $mysqli->error . "<br><br><br>";
			}


	$mysqli->close();
?>
</body>
</html>
