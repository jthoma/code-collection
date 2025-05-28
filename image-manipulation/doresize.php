<?php

$fn = $argv[1];

$output=null;
$retval=null;
exec('identify "'.$fn.'" | awk \'{print $3}\'', $output, $retval);

if($retval == 0){
  list($w,$h) = explode('x',$output[0]);
}else{
 exit ($retval);
}
function resizeToTargetMP($width, $height, $targetMP = 50) {
    $targetPixels = $targetMP * 1000000; 
    $originalPixels = $width * $height;

    if ($originalPixels == 0) {
        return [0, 0]; // Avoid division by zero
    }

    $scale = sqrt($targetPixels / $originalPixels);

    $newWidth = round($width * $scale);
    $newHeight = round($height * $scale);

    return [$newWidth, $newHeight];
}

// Example usage
list($newW, $newH) = resizeToTargetMP($w, $h); 
echo "New dimensions: {$newW}x{$newH}\n";

// lets do it
exec('magick "'.$fn.'" -resize '. $newW .'x'. $newH .' t.jpg', $output, $retval);

date_default_timezone_set('Asia/Kolkata');
$newfile = 'new_' . date("Ymd_His") . '.jpg';

rename("t.jpg", $newfile);
unlink("$fn");


