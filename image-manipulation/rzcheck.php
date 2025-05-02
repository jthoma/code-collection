<?php

$w = $argv[1];
$h = $argv[2];


$factor = 1000000;  // 1 megapixels in pixels
$currentPixels = $w * $h;

echo round($currentPixels / $factor) , "\n"; // current mp


