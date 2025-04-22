# A Simple Framework for AWS Lambda NodeJs 

This can be considered as a starting point of a framework with the basics only as of now. There is a session manager with sessions written into memcached. The included sam template is expected to deploy everything needed. This will cater to creating a rest api on serverless super fast. like the routes folder if written with get_path_to_service.js GET /path/to/service will invoke this and the sample template can be used to further incorporate functionality. The root '/' handlers for get and post is given as get__.js and post__.js in the routes folder. refer these for better understanding of the framework. Brought in a major change though still path to handler is dynamic there is scope for configuring static and positional variables with fixed handlers for any route. Dynamic handler identification and attempt to require using try catch could lead to a DoS situation. Hence the list of handlers are added to an exported array in the `lib/handlers.js` and this can be achieved using terminal commands very easy, as shown here.

`
cd routes
echo 'var mdule.exports = [' > ../lib/handlers.js
for i in *.js ; do  echo "'$i',"; done >> ../lib/handlers.js
echo '];' >> ../lib/handlers.js
`
or familiarize the current structure of the said file `lib/handlers.js` and update it whenever you add a new handler. When adding a handler make sure to follow the request method and path format and or update the configurations for DYNAMIC_ROUTES and STATIC_ROUES in the lib/router.js. Also if any url embedded variables are to be captured, then the DYNAMIC_ROUTES with placeholders is required. Or try and parse the embedded variables in your handler code. The handler method is also passed with the original lambda triggered event.

Version 1.02
the lib/router.php is updated with more enhanced static and dynamic routes. Retain those needed, remove those not needed, add anything that is needed and not exists. Check the handlers in routes/* and implement the lib/handlers.js update code when you deploy. The included node module is elasticache for the sessions. Others should be added as and when needed. 
The generator.js is renamed to localtest.js enabling testing of the functionality within a terminal environment listen on localhost:8080 and an aws lambda event object is created with minimal properties for downstream processing. 
Once you make modifications to lib/router.js for your preferences, make sure to test those using the t.js modifying the testdata to have your method and path possiblities and then run it using node t.js 
