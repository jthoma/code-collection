

  // get_state_list
  // TODO: Implement your business logic here
  // The url had an integer which was removed... 
function handler(event,db,ses, parsed) {

   // :insert-query-here:
    return {
      statusCode: 200,
      body: JSON.stringify(event),
    };
}

module.exports = {handler};

