# Attach a lambda to existing S3 Bucket 

## Attempt with CloudFormation

This was attempted from a cloudformation but finally found that it could not be done
with a simple process and needed a custom resource to finally attach lambda to the s3bucket 
using notification configuration. 

this is first deployed using sam deploy -g from the folder and the output is the function arn. Since in template the AWS::Serverless::Function, the optional property FunctionName is omitted, the name would be curated by cloudformation and unique for each stack.

## DevOps mindset tackled it differently

My thought was to finalize with a simple aws-cli command and that now need a manual edit of the
cli-input/notification.json in line 4 value of key "LambdaFunctionArn" is not proper and should be updated
once the function is deployed and the function arn is displayed in the output. 

## The cli command

```
aws s3api put-bucket-notification-configuration --bucket <bucketname> --notification-configuration file://cli-input/notification.json
```;) jthoma stands for Jiju Thomas Mathew, which is my full name
