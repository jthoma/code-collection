<?php

$template = file_get_contents('./base.php');

// Sanitize values 
$keys = ['database_name','username','password','endpoint'];

$tplvar = [];
foreach($keys as $key){
  if(!isset($config[$key]) || !is_string($config[$key])){
    header("Bad Request", true, 400);
    exit();
  }
  if($key === 'endpoint'){
    if(!filter_var(gethostbyname($config[$key]), FILTER_VALIDATE_IP)){
      header("Bad Request", true, 400);
      exit();  
    }
  }
  $tplvar[":$key:"] = $config[$key];
}

$tplvar[":prefix:"] = substr($config['database_name'],0,3) . "_";
$tplvar[':sec_keys:'] = file_get_contents('https://api.wordpress.org/secret-key/1.1/salt/');

header("Content-type: text/plain");
echo str_replace(array_keys($tplvar), array_values($tplvar), $template);

