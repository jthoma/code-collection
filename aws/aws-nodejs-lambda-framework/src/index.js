const path = require('path');
const sessions = require('lib/sessions');

function stripId(urlPath) {
      return urlPath.replace(/\/(\d+)/g, '');
  }



exports.handler = async (event) => {
  try {
    const request = {
      url: {
        path: event.path, 
      },
      method: event.httpMethod,
    };

    const { url, method } = request;
      var endpoint = url.path;
         endpoint = stripId(endpoint);
      const methodName = method.toLowerCase();
      const endpointName = endpoint.replace(/[^a-zA-Z0-9]/g, '_');
      const funcName = `${methodName}_${endpointName}`;
      const fileName = `${funcName}.js`;

  console.log({fileName, url, method});

    let handlerModule;
    try {
      handlerModule = require(`./routes/${fileName}`);
    } catch (error) {
      console.error('Handler module not found:', fileName, error);
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Handler not found' }),
      };
    }

// may need additional params db,session,aws,cloudsearch
    return await handlerModule.handler(event, sessions, db);

  } catch (error) {
    console.error('Error in main handler:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
