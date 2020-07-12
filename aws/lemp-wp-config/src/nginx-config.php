<?php 

if(!isset($config['domain']) || !is_string($config['domain']) || !filter_var(gethostbyname($config['domain']), FILTER_VALIDATE_IP)){
  header("Bad Request", true, 400);
  exit();
}

$media_domain =  'media'. str_replace('www.','.', $config['domain']);

header("Content-Type: text/plain");
?>
server {
    listen 80;
    root /var/www/<?php echo $config['domain']; ?>;
    index index.php index.html index.htm;
    server_name <?php echo $config['domain']; ?>;

    set $wp_index "index.php";

    charset utf-8;

    location ~ ^/(xmlrpc.php) {
        deny  all;
        access_log off;
        log_not_found off;
    }

	  location ~ ^(/wp-content/themes|/wp-content/uploads)/.*\.(jpe?g|gif|css|png|js|ico|pdf|m4a|mov|mp3)$ {
		     rewrite ^ http://<?php echo $media_domain; ?>$request_uri
		     permanent;
		     access_log off;
	  }

    #avoid processing of calls to unexisting static files by wordpress
    location ~ \.(js|css|png|jpg|gif|swf|ico|pdf|mov|fla|zip|rar)$ {
        try_files $uri =404;
    }

    set $skip_cache 0;

    # POST requests and URLs with a query string should always go to PHP
    if ($request_method = POST) {
        set $skip_cache 1;
    }   

    if ($query_string != "") {
        set $skip_cache 1;
    }   

    # Don't cache URIs containing the following segments
    if ($request_uri ~* "/wp-admin/|/xmlrpc.php|wp-.*.php|/feed/|index.php
                         |sitemap(_index)?.xml") {
        set $skip_cache 1;
    }   

    # Don't use the cache for logged-in users or recent commenters
    if ($http_cookie ~* "comment_author|wordpress_[a-f0-9]+|wp-postpass
        |wordpress_no_cache|wordpress_logged_in") {
        set $skip_cache 1;
    }

    location / {
      index  index.html $wp_index;
      try_files $uri $uri/ /$wp_index?$args;
    }    

    location = /wp-login.php {
        limit_req zone=one burst=1 nodelay;
        fastcgi_pass unix:/var/run/php5-fpm.sock;
        #fastcgi_pass 127.0.0.1:9000;
    }

    location ~ \.php {
        fastcgi_split_path_info  ^(.+\.php)(.*)$;

        #let wordpress catch the calls to unexisting PHP files
        set $fsn /$wp_index;
        if (-f $document_root$fastcgi_script_name){
            set $fsn $fastcgi_script_name;
        }

        fastcgi_pass   unix:/var/run/php/php-fpm.sock;
        include fastcgi_params;
        fastcgi_param  SCRIPT_FILENAME  $document_root$fsn;

        #PATH_INFO and PATH_TRANSLATED can be omitted, but RFC 3875 specifies them for CGI
        fastcgi_param  PATH_INFO        $fastcgi_path_info;
        fastcgi_param  PATH_TRANSLATED  $document_root$fsn;
        fastcgi_cache_bypass $skip_cache;
        fastcgi_no_cache $skip_cache;
        fastcgi_cache WORDPRESS;
        fastcgi_cache_valid 5m;
    }

    # prevent nginx from serving dotfiles (.htaccess, .svn, .git, etc.)
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}


server {
    listen 80;
    root /var/www/<?php echo $config['domain']; ?>;
    server_name <?php echo $media_domain; ?>;

    location ~ / {
      autoindex off; 
    }

    location ~* .(ogg|ogv|svg|svgz|eot|otf|woff|mp4|ttf|css|rss|atom|js|jpg
                  |jpeg|gif|png|ico|zip|tgz|gz|rar|bz2|doc|xls|exe|ppt|tar|mid
                  |midi|wav|bmp|rtf)$ {
        expires max;
        log_not_found off;
        access_log off;
    }    

    # Deny access to uploads that aren’t images, videos, music, etc.
    location ~* .(html|htm|shtml|php)$ {
        deny all;
    }
}    

