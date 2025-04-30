const fetch = require('node-fetch');

async function benchmark(url, numRequests = 100) {
  const results = [];

  for (let i = 0; i < numRequests; i++) {
    const startTime = Date.now(); 
    try {
        const response = await fetch(url);
        const endTime = Date.now();
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseTime = endTime - startTime;
        results.push(responseTime);
    } catch (error) {
        console.error(`Request ${i + 1} failed:`, error);
        results.push(null);
    }
  }
  return results;
}

async function analyzeResults(results) {
    const validResults = results.filter(result => result !== null);
    if (validResults.length === 0) {
        return {
            average: 'N/A',
            min: 'N/A',
            max: 'N/A',
            successRate: 0
        };
    }
    const sum = validResults.reduce((acc, val) => acc + val, 0);
    const average = sum / validResults.length;
    const min = Math.min(...validResults);
    const max = Math.max(...validResults);
    const successRate = (validResults.length / results.length) * 100;
  
    return {
      average: average.toFixed(2),
      min: min.toFixed(2),
      max: max.toFixed(2),
      successRate: successRate.toFixed(2)
    };
}

async function runBenchmark(url, numRequests) {
  console.log(`Starting benchmark for ${url} with ${numRequests} requests...`);
  const results = await benchmark(url, numRequests);
  const analysis = await analyzeResults(results);
  return JSON.stringify({results, analysis});
}

module.exports = {runBenchmark};
