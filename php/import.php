<?php
header("Content-Type: text/html; charset=utf-8");

require_once 'lib/xml2json.php';

sleep(1);


if ($_POST['importType'] == "file") {
	$tmpName = $_FILES['localData']['tmp_name'];

	$fp = fopen($tmpName, 'r');
	if (filesize($tmpName) > 0)
		$content = fread($fp, filesize($tmpName));
	else
		$content = "";
	fclose($fp);
} elseif ($_POST['importType'] == "url") {
	$ch = curl_init(); // create curl resource

	curl_setopt($ch, CURLOPT_URL, $_POST['remoteData']); // set url
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); //return the transfer as a string

	$content = curl_exec($ch); // $content contains the output string

	curl_close($ch); // close curl resource to free up system resources
}

if ($_POST['dataType'] == "json") {
	$arr = array (success => true, data => $content);
} elseif ($_POST['dataType'] == "xml") {
	$arr = array (success => true, data => xml2json::convertSimpleXmlElementObjectIntoArray(simplexml_load_string($content)));
}
echo json_encode($arr);
?>