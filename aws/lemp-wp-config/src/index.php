<?php 

$action = substr($_SERVER['PATH_INFO'], 1);

// Takes raw data from the request
$json = file_get_contents('php://input');

// Converts it into a PHP object
$config = json_decode($json, true);

if(file_exists($action . '.php')){
  include $action . '.php';
}else{
  header("Bad Request", true, 400);
}