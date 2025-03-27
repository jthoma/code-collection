const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const cloudwatchlogs = new AWS.CloudWatchLogs();

const logGroupName = process.env.LOG_GROUP_NAME;
const bucketName = process.env.S3_BUCKET_NAME;

exports.handler = async () => {
  try {
    // Get yesterday's date
    const now = new Date();
    now.setUTCDate(now.getUTCDate() - 1); // Move to yesterday
    now.setUTCHours(0, 0, 0, 0); // Start of yesterday

    const startTime = now.getTime();
    const endTime = startTime + 24 * 60 * 60 * 1000 - 1; // End of yesterday

    let nextToken = null;
    let logs = [];

    do {
      const params = {
        logGroupName,
        startTime,
        endTime,
        nextToken,
      };
      const data = await cloudwatchlogs.filterLogEvents(params).promise();
      if (data.events.length > 0) {
        logs.push(...data.events.map((e) => e.message));
      }
      nextToken = data.nextToken;
    } while (nextToken);

    if (logs.length === 0) {
      console.log("No logs found for yesterday.");
      return;
    }

    // Format yesterday's date as DDMMYYYY
    const fileName = `${String(now.getUTCDate()).padStart(2, "0")}${String(
      now.getUTCMonth() + 1
    ).padStart(2, "0")}${now.getUTCFullYear()}.log`;

    // Upload log file to S3
    await s3
      .putObject({
        Bucket: bucketName,
        Key: fileName,
        Body: logs.join("\n"),
        ContentType: "text/plain",
      })
      .promise();
    console.log(`Uploaded ${fileName} to S3`);

    // Delete old log streams (optional, as CloudWatch has retention policies)
    const logStreams = await cloudwatchlogs.describeLogStreams({ logGroupName }).promise();
    for (const stream of logStreams.logStreams) {
      if (stream.lastEventTimestamp < endTime) {
        await cloudwatchlogs.deleteLogStream({
          logGroupName,
          logStreamName: stream.logStreamName,
        }).promise();
        console.log(`Deleted log stream: ${stream.logStreamName}`);
      }
    }

    return { status: "Success", file: fileName };
  } catch (error) {
    console.error("Error processing logs:", error);
    return { status: "Error", message: error.message };
  }
};
