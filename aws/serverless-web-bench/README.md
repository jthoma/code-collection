# Serverless URL Benchmark

This project provides a serverless API (deployed with AWS Lambda and API Gateway) that performs basic benchmarking of provided URLs. It's built using Node.js and the AWS Serverless Application Model (SAM).

## Functionality

The API exposes an endpoint that accepts POST requests with a JSON payload. The payload should contain:

* `url`: The URL you want to benchmark.
* `iterations`: The number of requests to send to the URL.

The Lambda function then performs the following:

1.  Sends the specified number of HTTP requests to the target URL.
2.  Measures the response time for each request.
3.  Calculates and returns statistics including:
    * Average response time
    * Minimum response time
    * Maximum response time
    * Success rate

## Code Structure

The project consists of the following main components:

* `src/index.js`: The AWS Lambda function handler. It receives the POST request, parses the input, calls the benchmarking logic, and returns the results.
* `src/lib/bench.js`:  This module contains the benchmarking logic. It uses `node-fetch` to make HTTP requests and `perf_hooks` to measure performance.
* 'src/test.js': `npm run test` will test this locally and expects a webserver to be there on http://127.0.0.1:8080 you can have something there like http-server or php -S 127.0.0.1:8080 run from a folder with just one html file or a php code as follows
* `template.yaml`: The AWS SAM template that defines the infrastructure for deploying the Lambda function and API Gateway.

## test server index.php
`
<?php

header('Content-Type: application/json');

$data = [];
$start = microtime(true);

// Simulate some processing
for ($i = 0; $i < 10000; $i++) {
    $data[] = $i * 2;
}

$end = microtime(true);
$processingTime = ($end - $start) * 1000; // in milliseconds

$response = [
    'message' => 'Hello from PHP',
    'processingTime' => round($processingTime, 2),
    'dataLength' => count($data)
];

echo json_encode($response);

?>

`
## Deployment

The project is deployed using AWS SAM. To deploy it, you will need:

* An AWS account
* AWS CLI installed and configured
* AWS SAM CLI installed

**Deployment Steps:**

1.  **Package the application:**

    ```bash
    sam package --template-file template.yaml --output-template-file packaged.yaml --s3-bucket YOUR_S3_BUCKET
    ```

    Replace `YOUR_S3_BUCKET` with the name of an S3 bucket where you want to store the packaged artifacts.

2.  **Deploy the application:**

    ```bash
    sam deploy --template-file packaged.yaml --stack-name YOUR_STACK_NAME --capabilities CAPABILITY_IAM
    ```

    Replace `YOUR_STACK_NAME` with a name for your CloudFormation stack.

    The `--capabilities CAPABILITY_IAM` flag is required because the deployment creates IAM roles.

## Example Usage

Send a POST request to the API endpoint (e.g., using `curl`, `Postman`,'curl' or similar) with the following JSON payload:

```json
{
  "url": "https://www.example.com",
  "iterations": 10
}

# Web Performance Benchmarking Tool

**Warning: This tool is intended for legitimate website performance testing on websites where you have explicit permission to do so (e.g., your own websites or testing environments).**

**Unethical and illegal use, such as conducting Denial-of-Service (DoS) attacks against websites without authorization, is strictly prohibited. The developer of this tool is not responsible for any misuse.**

This script allows you to measure the performance of a website by sending a specified number of requests and analyzing the response times. Please use it responsibly and ethically.

**Ethical Guidelines:**

* Only test websites where you have permission.
* Avoid sending an excessive number of requests that could harm the target website's availability.
* Respect the resources of the websites you are testing.

By using this tool, you acknowledge and agree to use it for legitimate purposes only.;) jthoma stands for Jiju Thomas Mathew, which is my full name
