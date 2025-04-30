process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
  process.exit(1); // It's often better to exit with an error code (1)
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception thrown:', err);
  process.exit(1); // Exit with an error code
});

const testrunner = require('./lib/bench');

async function testrun(){  
  let testRequest = {"url": "http://127.0.0.1:8080", "iterations": 5};
  try {
      const benchData = await testrunner.runBenchmark(testRequest.url, testRequest.iterations);
      console.log(JSON.stringify(benchData, null, 2)); // Pretty print the JSON
  } catch (error) {
      console.error("Test run failed:", error);
  }
}

testrun().then(() => console.log("Test run complete")).catch(err => console.error("Test run error", err));