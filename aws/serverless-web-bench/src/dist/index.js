// index.js
exports.handler = async (event) => {
  console.log("Event: ", event);
  let testRequest;
  if (event.body) {
    try {
      testRequest = JSON.parse(event.body);
      console.log("Parsed JSON Body:", testRequest);
      const response = JSON.stringify(event);
      return response;
    } catch (error) {
      console.error("Failed to parse JSON body:", error);
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ error: "Invalid JSON payload" })
      };
    }
  } else {
    return {
      statusCode: 400,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ error: "No request body found" })
    };
  }
};
