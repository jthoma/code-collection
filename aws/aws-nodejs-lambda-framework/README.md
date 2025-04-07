# A Simple Framework for AWS Lambda NodeJs 

This can be considered as a starting point of a framework with the basics only as of now. There is a session manager with sessions written into memcached. The included sam template is expected to deploy everything needed. This will cater to creating a rest api on serverless super fast. like the routes folder if written with get_path_to_service.js GET /path/to/service will invoke this and the sample template can be used to further incorporate functionality. The root '/' handlers for get and post is given as get__.js and post__.js in the routes folder. refer these for better understanding of the framework. Brought in a major change though still path to handler is dynamic there is scope for configuring static and positional variables with fixed handlers for any route. Dynamic handler identification and attempt to require using try catch could lead to a DoS situation. Hence the list of handlers are added to an exported array in the `lib/handlers.js` and this can be achieved using terminal commands very easy, as shown here.

`
cd routes
echo 'var mdule.exports = [' > ../lib/handlers.js
for i in *.js ; do  echo "'$i',"; done >> ../lib/handlers.js
echo '];' >> ../lib/handlers.js
`
or familiarize the current structure of the said file `lib/handlers.js` and update it whenever you add a new handler. When adding a handler make sure to follow the request method and path format and or update the configurations for DYNAMIC_ROUTES and STATIC_ROUES in the lib/router.js. Also if any url embedded variables are to be captured, then the DYNAMIC_ROUTES with placeholders is required. Or try and parse the embedded variables in your handler code. The handler method is also passed with the original lambda triggered event.
