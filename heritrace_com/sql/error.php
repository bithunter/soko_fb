<?php

	// Fehlerbedingung auslösen
	function showerror()
	{
		if (mysql_errno() || mysql_error())
			trigger_error("MySQL error: " .
							mysql_errno() .
							" : " . mysql_error(),
							E_USER_ERROR);
		else
		trigger_error("Could not connect to DBMS", E_USER_ERROR);
	}

	// Bricht bei einem fehler ab und löscht die Session-Variablen,
	// um eine saubere Umgebung zu hinterlassen.
	
	function errorHandler($errno, $errstr, $errfile, $errline)
	{
		switch ($errno)
		{
			case E_USER_NOTICE:
			case E_USER_WARNING:
			case E_WARNING:
			case E_NOTICE:
			case E_CORE_WARNING:
			// case E_CORE_NOTICE:
			case E_COMPILE_WARNING:
				break;
			case E_USER_ERROR:
			case E_ERROR:
			case E_PARSE:
			case E_CORE_ERROR:
			case E_COMPILE_ERROR:
				session_start();

				if (session_is_registered("message")) session_unregister("message");

				$errorString =
	"Onlinestatistik - System Error: $errstr (#$errno).<br>\n" .
	"Bitte übermitteln Sie folgende Informationen an den Administrator:<br>\n" . "Fehler in Zeile $errline in Seite $errfile.<br>\n";

				// Administrator per e-Mail über den Fehler informieren
				error_log($errorString, 1, "hugh");
?>
<h2>Onlinestatistik - Service derzeit nicht erreichbar!</h2>
Folgende Informationen wurden an den Administrator übermittelt:
<br><b><font color="red"><?=$errorString;?></font></b>
<?php
				// System anhalten
				die();

			default:
				break;
		}
	}
?>
