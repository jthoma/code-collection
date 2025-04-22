/**
*  NOTE: this implementation is for a localhost
*        testing and the modules are abstracted 
*        for this environment only.
*/


var http = require('http');
const path = require('path');
const router = require('./lib/router');

// the local server req only has url and this needs to be
// parsed to get the properties hence use this 
const url = require('node:url');
//create a server object:
http.createServer(function (req, res) {
    const parsed = url.parse(req.url); 
    // simulate a aws event structure needed by router.
    var event = {
         path: parsed.path,
         httpMethod: req.method
	};
    const fileName = router.jparse(event);
    console.log({fileName, event}); 
    //console.log(req)
  res.write('Hello World!'); //write a response to the client
  res.end(); //end the response
}).listen(8080); //the server object listens on port 8080



