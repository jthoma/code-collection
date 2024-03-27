# HTML Client

Code written with the help of gemini.google.com and with a wee bit of bugfixing and further tweaking was ready to deploy in about less than an hour otherwise could have taken like 2 - 4 hours to build this. Before attempting to try this out make sure you have deployed the aws services as per the repository.
* s3 bucket with static hosting
* AWS Lambda to create a redirection entry in s3
* API Gateway to expose the Lambda
* API Key to secure the API Gateway or limit usage or apply plans

Make sure the variable values are updated in the script.js before using this.