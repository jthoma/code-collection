# URL Shortener

Based on an AWS Blog Article [Build a Serverless, Private URL Shortener](http://bz2.in/frge6d) this project was done in November 2019 when I got the domain bz2.in but 4 years down thought about sharing my project to the rest of the world since the FOSS community has given me a lot and it is my commitment to give something back.

The meta redirect tags are patched by a node js lambda for which the code is provided. 

## Important 

Please make sure you create the bucket name same as your short domain name, and enable static site hosting on the bucket create bucket and CNAME in DNS (AWS Route53) and provide these two variables to lambda through the environment variables section.

BUCKET_NAME
BUCKET_REGION

## API Gateway

Create API Gateway and proxy integration to this lambda also secure the api gateway with api keys to make sure this will not be abused by unauthorized access.

## Shell Script [shorten.sh][./shorten.sh]

This is a starter, and once everything is buillt, make modifications to the shell script, to update &lt;API-KEY&gt; and &lt;API_GATEWAY_ENDPOINT&gt; in this shell script. This is expected to work on any linux environment where the "curl" is installed properly. and the usage is shorten.sh <url> [short_id]  but if the url is already shortened on this implementaion, the existing shortid will be used instead of the supplied one.


## Upcoming

Soon as I find time and solace the whole actions would be wrapped into an aws sam template and that will be updated in a shoutout. 

## HTML Client [html client frontend](./html-client) 
Recently attempted (March 2024) to create an HTML Frontend with the help of Google Gemini. 