<?php

$path = $argv[1];

$code = file_get_contents($path);

$cleaned = preg_replace('/^\s*[\r\n]+/m', '', $code);
$cleaned = preg_replace('/^\s+|\s+$/m', '', $cleaned);
$cleaned = preg_replace('!/\*.*?\*/!s', '', $cleaned); // remove multi-line comments
$cleaned = preg_replace('/\/\/.*$/m', '', $cleaned);   // remove single-line comments

file_put_contents($path, $cleaned);
?>
