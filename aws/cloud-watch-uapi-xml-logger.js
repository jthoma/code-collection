/* jshint esversion: 8 */
const AWS = require("aws-sdk");
const cloudwatchlogs = new AWS.CloudWatchLogs({ apiVersion: '2014-03-28' });

const typeCheck = function(v, t){
  return Object.prototype.toString.call(v) === '[object ' + t + ']';
};

async function tryCreateStream() {

  params = {
    logGroupName: process.env.cwLogGroup, /* required */
    logStreamName: process.env.AWS_LAMBDA_LOG_STREAM_NAME /* required */
  };

  doAction = new Promise((s, f) => {
    cloudwatchlogs.createLogStream(params, function (err, data) {
      if (err) {
        if(err.code === 'ResourceAlreadyExistsException'){
          s();
        }else{
          f(err);
        }
      }
      else {
        console.log(data);           // successful response
        s();
      }
    });
  });

  await doAction;

  return params;
}

async function tryWriteLog(logStream, records) {
  var count = (arguments.length > 2) ? arguments[2] : 0;
  if(count >= 4){
    throw new Error("Attempted thrice.. failing");
  }
  var params = {
    ...logStream,
    logEvents: records
  };
  let doAction = new Promise((s, f) => {
    cloudwatchlogs.putLogEvents(params, async function (err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
        if(err.code === 'InvalidSequenceTokenException' && typeCheck(err.message, 'String')){
          logStream.sequenceToken = err.message.match(/The next expected sequenceToken is: (\d+)/)[1];
          return await tryWriteLog(logStream, records, count++);
        }
      }
      else {
        console.log(data);           // successful response
        s();
      }
    });
  });
  await doAction;
}

module.exports = async function (message, params) {
  if(typeCheck(process.env.AWS_SAM_LOCAL, 'Undefined') || (process.env.AWS_SAM_LOCAL !== 'true')){
    if (message === 'Request XML: ' || message === 'Response SOAP: ') {
      const logStream = await tryCreateStream();
      await tryWriteLog(logStream, [params]);
      return;
    }      
  }
  console.log(message, params);
};
