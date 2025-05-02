<?php

$w = $argv[1];
$h = $argv[2];
$tp = $argv[3];

$targetPixels = $tp * 1000000;  // megapixels
$currentPixels = $w * $h;

// Calculate scale factor
$scaleFactor = sqrt($targetPixels / $currentPixels);

// Convert to percentage
$resizePercentage = $scaleFactor * 100;

// Round to a reasonable value
echo round($resizePercentage) ,'%';

