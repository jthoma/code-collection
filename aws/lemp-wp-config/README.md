# Nginx and Wordpress Configuration - AWS SAM template

I personally do a lot of wordpress deployments and when it comes to deploying on a new AWS account ( or a Organisational Sub-Account) for a starter, the creation of resources and installation used to take about an hour with some shell scripts. But the nginx configuration to build from scratch always was a nightmare. So finally with due respect and courtesy to all those who provided insights towards the configuration tips, and corrections, the configuration builder is being offered publicly.

## Requires AWS SAM 

This requires installed AWS [SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html) cli to deploy to aws. Sorry this version does not have any sort of security. Any one can download make changes and use. Please suggest changes if you feel like sharing those. 

## About this

This script uses [stackery/php](https://github.com/stackery/php-lambda-layer) lambda layer to run a php snippet. Actually I built this to demonstrate how to leverage php knowledge into AWS Serveless for a handful of aspiring AWS enthusiasts, who already know something about php. 

Deploy this using ```sam deploy``` and then start using the api endpoint with curl. WordPress configuration can be fetched using <b>POST</b> to <b>api-end-point</b>/wp-config with json payload of struct ```{"database_name":"DBNAME","username":"DBUSER","password":"DBPASS","endpoint":"DBHOST"}```, the output is directly content for wp-config.php. Nginx configuration is a bit more complicated, though fetching is easy by <b>POST</b> to <b>api-end-point</b>/nginx-config with json payload of struct ```{"domain":"primary-domain"}``` which would generate a configuration for the primary domain and a media domain ( cookie free, without php execution and max cache headers). This configuration is based on my preferences, and it is not implied that these may be the optimal or best in any kind.  ;) jthoma stands for Jiju Thomas Mathew, which is my full name
