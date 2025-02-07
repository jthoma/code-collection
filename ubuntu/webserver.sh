#!/bin/bash

# Function to install packages
install_packages() {
    sudo apt update -y
    sudo apt install -y nginx mysql-server php8.2 php8.2-fpm php8.2-mysql php8.2-intl php8.2-json php8.2-mbstring php8.2-git php8.2-curl php8.2-zip php8.2-unzip phpmyadmin
}

# Function to configure Nginx
configure_nginx() {
    # Replace 'your_domain.com' with your actual domain name
    domain="your_domain.com"

    # Configure Nginx default site
    sudo nano /etc/nginx/sites-available/default

    # Paste the following configuration, replacing placeholders:
    server {
        listen 80;
        server_name $domain;

        location / {
            proxy_pass http://127.0.0.1:9000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        location ~ \.php$ {
            include snippets/fastcgi_params;
            fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
            fastcgi_index index.php;
        }
    }

    # Enable SSL with Certbot
    sudo certbot --nginx -d $domain

    # Restart Nginx
    sudo systemctl restart nginx
}

# Function to configure MySQL
configure_mysql() {
    # Secure MySQL installation
    sudo mysql_secure_installation

    # Create a database and user for your application
    mysql -u root -p
    CREATE DATABASE your_database_name;
    CREATE USER 'your_user_name'@'%' IDENTIFIED BY 'your_password';
    GRANT ALL PRIVILEGES ON your_database_name.* TO 'your_user_name'@'%';
    FLUSH PRIVILEGES;
    exit
}

# Function to configure PHP-FPM
configure_php_fpm() {
    # Edit PHP-FPM pool configuration
    sudo nano /etc/php/8.2/fpm/pool.d/www.conf

    # Adjust settings as needed, especially the listen directive
    listen = /var/run/php/php8.2-fpm.sock

    # Restart PHP-FPM
    sudo systemctl restart php8.2-fpm
}

# Function to configure phpMyAdmin
configure_phpmyadmin() {
    # Configure phpMyAdmin
    sudo ln -s /usr/share/phpmyadmin /usr/share/nginx/html/phpmyadmin

    # Edit Nginx configuration to allow access to phpMyAdmin
    # Add the following to your Nginx default site configuration:
    location /phpmyadmin {
        auth_basic "phpMyAdmin";
        auth_basic_user_file /etc/phpmyadmin/.htpasswd;
        proxy_pass http://localhost/phpmyadmin;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Create .htpasswd file for phpMyAdmin
    sudo htpasswd /etc/phpmyadmin/.htpasswd your_username

    # Restart Nginx
    sudo systemctl restart nginx
}

# Main execution
install_packages
configure_nginx
configure_mysql
configure_php_fpm
configure_phpmyadmin

echo "Nginx, MySQL, PHP-FPM, and phpMyAdmin have been installed and configured. Please access your website at https://$domain"
