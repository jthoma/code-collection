# Just a collection of code snippets

* [AWS/Cloud Watch UAPI xml logger](./aws/cloud-watch-uapi-xml-logger.js) 


## AWS/Cloud Watch UAPI xml logger

### Introduction

[TravelPort UAPI](https://support.travelport.com/webhelp/uapi/uAPI.htm) Travelport Universal API offers an array of travel content for air, hotel, car, and rail, including ancillaries (optional services). It also provides functionality to build complete traveler, agency, branch, and account profiles. 

[TravelPort-Ukrane uapi-json](https://github.com/Travelport-Ukraine/uapi-json) Best Travelport Universal API wrapper ever, needed some extra features like xml logging ([Issue:391](https://github.com/Travelport-Ukraine/uapi-json/issues/391#issuecomment-595560699)). This provides a solution to the same as suggested.

### Guidelines

Create the Cloud Watch Log Group and provide through environment variable (cwLogGroup) or constant in code line 12 value for logGroupName. AWS_LAMBDA_LOG_STREAM_NAME is a [Runtime Reserved Environment Variable](https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html), require this library and set the entry point as logFunction property of options property of settings object as specified [here](https://github.com/Travelport-Ukraine/uapi-json#options). 