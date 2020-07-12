<?php

define('DB_NAME', ':database_name:');
define('DB_USER', ':username:');
define('DB_PASSWORD', ':password:');
define('DB_HOST', ':endpoint:');
define('DB_CHARSET', 'utf8');
define('DB_COLLATE', '');
:sec_keys:

$table_prefix  = ':prefix:';
define('WP_DEBUG', false);

if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

require_once(ABSPATH . 'wp-settings.php');

