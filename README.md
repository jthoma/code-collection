# Just a collection of code snippets

* [AWS/Cloud Watch UAPI xml logger](./aws/cloud-watch-uapi-xml-logger.js) 
* [Node/API Key Generator](./node/api-key.js)
* [AWS/SNS to CloudWatch log](./aws/sns-cw-log.js)
* [Node/Postman to code builder](./node/generator.js)
* [AWS/Echo MY IP](./aws/echo-my-ip)
* [AWS/AWS::EC2::Instance](./aws/aws-ec2-sam)
* [AWS/EC2 Kubernetes Cluster](./aws/aws-cf-kubecluster)
* [AWS/s3-trigger](./aws/s3-trigger/)
* [AWS/Short URL](./aws/short-url/README.md)
* [AWS/url-redirect](./aws/url-redirect/README.md)
* [AWS Cloud Watch Log backup to s3 in chronological files](./aws/cw-to-s3/)
* [Kubernetes Cluster with Vagrant and VirtualBox](./kubernetes-cluster)
* [AWS/VPC::EIP::Lambda](./aws/vpc-eip-lambda)
* [AWS/Wordpress and Nginx Config](./aws/lemp-wp-config)
* [UBUNTU](./ubuntu/)
* [gTerm](./gterm/)
* [HTML Text Editor](./textedit) Feature rich text editor in pure html and hosted on aws through [short url](https://bz2.in/texdit)
* [AWS/Migrate DynamoDB](./aws/migrate-dynamodb/)
* [AWS EC2 Inactive Shutdown](./aws/ec2-inactivity-shutdown/)
* [AWS Lambda Framework for Node js](./aws/aws-nodejs-lambda-framework)
* [Serverless URL Benchmark](./aws/serverless-web-bench/)
## AWS/Cloud Watch UAPI xml logger

### Introduction

[TravelPort UAPI](https://support.travelport.com/webhelp/uapi/uAPI.htm) Travelport Universal API offers an array of travel content for air, hotel, car, and rail, including ancillaries (optional services). It also provides functionality to build complete traveler, agency, branch, and account profiles. 

[TravelPort-Ukrane uapi-json](https://github.com/Travelport-Ukraine/uapi-json) Best Travelport Universal API wrapper ever, needed some extra features like xml logging ([Issue:391](https://github.com/Travelport-Ukraine/uapi-json/issues/391#issuecomment-595560699)). This provides a solution to the same as suggested.

### Guidelines

Create the Cloud Watch Log Group and provide through environment variable (cwLogGroup) or constant in code line 12 value for logGroupName. AWS_LAMBDA_LOG_STREAM_NAME is a [Runtime Reserved Environment Variable](https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html), require this library and set the entry point as logFunction property of options property of settings object as specified [here](https://github.com/Travelport-Ukraine/uapi-json#options). 


## Node/API Key Generator

### Introduction

[Javascript API Credentials](http://www.php-trivandrum.org/code-snippets/javascript-api-credentials-just-a-port/) was actually a port from a site when needed for a project to be used in the front end. Now the same functionality is needed on a serverless project and just some mods to adopt into the [node.js](https://nodejs.org/) environment. I am aware of other generators like thos which use the crypto module as in this [Secure random token in Node.js](https://stackoverflow.com/questions/8855687/secure-random-token-in-node-js) which explains the use as 

```
require('crypto').randomBytes(48, function(err, buffer) {
  var token = buffer.toString('hex');
});
```

### Guidelines

Nothing much than just require the module, and invoke the functions. 

### Functions

* [.access_key()](#access_key)
* [.secret_key()](#secret_key)
* [.any_key(int length, [] chars)](#any_key)

<a name="access_key"></a>
#### .access_key

A preset function which generates random string from uppercase alphabets and has a size of 20 characters, to simulate the [AWS_ACCESS_KEY_ID](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys), though is not any way related to AWS.


<a name="secret_key"></a>
#### .secret_key()

A preset function which generates random string from alphanumerals along with some special characters and has a size of 40 characters, to simulate the [AWS_SECRET_ACCESS_KEY](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys), though is not any way related to AWS.

<a name="any_key"></a>
#### .any_key(int length, [] chars)

This method provides the most flexibilty that one should specify the char list as array and length as a rounded number. The generated string will be of the said length and uses random chars from supplied list. 

## AWS/SNS to CloudWatch log

### Introduction

Nothing much, an SNS Payload with solid subject and string message is expected which will be consoled by this lambda.

## Postman to NodeJS Code Generator

Generate code abstraction by reading the postman export. Any rest api can be abstracted to node.js code module using this code writer.

## gTerm

gterm - a console app in php to learn and test Travelport Galileo GDS Terminal Commands [demo on YouTube](https://youtu.be/30wohPsWBa4)

## AWS/Migrate DynamoDB

Few scripts which when used *responsibily* will help one to copy any number of dynamodb tables from one region to another. 

## [termux/](termux/)

My contributions to developers working in Android and Termux
;) jthoma stands for Jiju Thomas Mathew, which is my full name
