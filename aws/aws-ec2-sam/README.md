# AWS::EC2::Instance 

For various purposes like checking library or bundled software versions, and other actions time to time, I may need to create ec2 instances. Going into the AWS Web Console to do this is an overkill for me. Hence this sam template is built. There is nothing much to explain.

Very short and down to earth.. no AccessProfile or other things are thought of, just an ec2 instance.

```
sam deploy -g
```

Will ask for the parameters and deploy into the account. Credentials should be configured beforehand and exported into environment.  

;) jthoma stands for Jiju Thomas Mathew, which is my full name
