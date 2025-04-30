// src/index.js
process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
  process.exit();
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception thrown:', err);
  process.exit();
});


const testrunner = require('./lib/bench');


exports.handler = async (event) => {
    console.log("Event: ", event);
  
    let testRequest;
  
    if (event.body) {
      try {
        testRequest = JSON.parse(event.body);
        console.log("Parsed JSON Body:", testRequest);
      
  
        // Perform further processing with the data
        const responseMessage = await testrunner.runBenchmark(testRequest.url, testRequest.iterations);
  
        const response = {
          statusCode: 200,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: responseMessage,
            receivedData: testRequest,
          }),
        };
        return response;
      } catch (error) {
        console.error("Failed to parse JSON body:", error);
        return {
          statusCode: 400,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ error: "Invalid JSON payload" }),
        };
      }
  
    } else {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ error: "No request body found" }),
      };
    }
  };