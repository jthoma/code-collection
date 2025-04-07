const path = require('path');
const db = require('lib/db.js'); 
const sessions = require('lib/sessions');
const router = require('lib/router');
const handlers = require('./lib/handlers');
exports.handler = async (event) => {
  try {
    const url = event.path; 
    const method = event.httpMethod;
    const parsed = router.jparse(event);
    const fileName = parsed.fileName;
  console.log({fileName, url, method});
   if((!handlers.includes(fileName)){
     console.log("Handler not exist: " +fileName);
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Requested resource not found' }),
      };
   }

    let handlerModule;
    try {
      handlerModule = require(`./routes/${fileName}`);
    } catch (error) {
      console.error('Handler module not found:', fileName, error);
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Requested resource not found' }),
      };
    }

/*
* may need additional params 
* also check the DYNAMIC ROUTES array in 
* lib/router and make sure to add  patterns of url
* which you expect to contain url embedded variables 
* which in case captured will be parsed.vars  
*/
    return await handlerModule.handler(event, db, sessions, parsed);

  } catch (error) {
    console.error('Error in main handler:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
