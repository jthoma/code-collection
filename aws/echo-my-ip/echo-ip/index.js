/* jshint esversion: 8 */

console.log("Starting up....");

const rv = {
    statusCode: 200,
    headers: {
        "Content-Type": "text/plain"
    },
    body: ""
};

exports.handler = async (event) => {
    rv.body = event.requestContext.identity.sourceIp;
    return rv;
};
