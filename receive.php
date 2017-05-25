<?php
	$text = "";
	$possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for( $i=0; $i < 9; $i++ ){
	  $text = $text . $possible[rand(0,strlen($possible)-1)];
	}

	$unhashedServerKey = $text;
	$hashedServerKey = hash('sha512', $unhashedServerKey);

	switch ($_POST['action']) {
		case 0:
			echo $text . $hashedServerKey;
			break;
		case 1:
			echo $text; 
			break;
		
		default:
			break;
	}
?>