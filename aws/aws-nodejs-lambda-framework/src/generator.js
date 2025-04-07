var http = require('http');
const path = require('path');
const router = require('lib/router');

//create a server object:
http.createServer(function (req, res) {
  res.write('Hello World!'); //write a response to the client
  res.end(); //end the response
}).listen(8080); //the server object listens on port 8080


/*
    const url = event.path; 
    const method = event.httpMethod;
    const fileName = router.jparse(event);

  console.log({fileName, url, method});

*/
