# CloudWatch Log backup to S3 using aws sam

Running ```sam deploy -g``` from the folder will ask a series of questions and at the end the Lambda ARN will be shown. To use this one should have [AWS SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-getting-started.html) an an [AWS Account](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/). 

Well this was for my use with a specific refrigerator power saver project where quite a lot of logs were written into the cloudwatch log group which had retention period set for a week. Later this had to be analyzed and hence this backup is being performed.
