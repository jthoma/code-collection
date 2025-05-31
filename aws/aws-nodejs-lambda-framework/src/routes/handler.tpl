
  // %description%
  // TODO: Implement your business logic here
  // %if dynamic route%
function handler(event,db,ses) {

   // :insert-query-here:
   // if success 
    return {
      statusCode: %success_code%,
      body: JSON.stringify('%success_message%'),
    };
  // 
   // if failed 
    return {
      statusCode: %failed_code%,
      body: JSON.stringify('%failed_message%'),
    };
  // 
}

module.exports = {handler};

