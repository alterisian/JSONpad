<?php
$jsonStr = $_GET["jsonData"];

header("Content-Type: text/plain");
header("Content-Length: " . strlen($jsonStr));
header("Content-Disposition: attachment; filename=\"data_" . date('Y-m-d_H-i-s', time()) . ".json\"");

print(stripslashes($jsonStr));
?>
