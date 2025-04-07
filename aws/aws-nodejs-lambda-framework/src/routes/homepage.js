/*
 *
 * this is the handler for root '/' url
 * and get method
 */
function greethtml(message){
return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello welcome</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="d-flex align-items-center justify-content-center vh-100">

    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
<p align="center">${message}</p>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`;

}

function formhtml(message){

return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello welcome to homepage</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="d-flex align-items-center justify-content-center vh-100">

    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <form action="" method="post">
                    <div class="mb-3">
                        <label for="fullName" class="form-label">Provide your full name</label>
                        <input type="text" name="myname" class="form-control" id="fullName" placeholder="Enter your full name">
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`;

}

function handler(event,db,ses) {
 let sessionid = ses.start(event);
 let myname = ses.get(sessionid, "myname");
 let message = "Hello, what can I do today!";
 let body = formhtml(message);
 if(myname){
    message = `Hello ${myname} , wish you a great day!`;
    body = greethtml(message);
 }
 let hdr = ses.hdr(sessionid);
    return {
      statusCode: 200,
      "multiValueHeaders": {
        "Set-Cookie": hdr,
        "Content-Type":"text/html"
      },
      body: body,
    };
}

module.exports = {handler};

