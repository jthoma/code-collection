const https = require("https");
const url = "https://ifconfig.me";

exports.handler = function (event, context, callback){
  https.get(url, res => {
    res.setEncoding("utf8");
    let body = "";
    res.on("data", data => {
      body += data;
    });
    res.on("end", () => {
      callback(null, {
        responseCode: 200,
        headers: {
          "Content-type": "text/plain"
        },
        body: body
      });
    });
  });
};

