/**
 * Just a random key generator; No guarantee for a unique set
 * @author Jiju TM <jijutm@gmail.com>
 * @repo   jthoma/code-collection/node
 */

/**
 * @const {array} char list
 */
const secret_salt = [
  "a","b","c","d","e","f","g","h","i","j","k",
  "l","m","n","o","p","q","r","s","t","u","v",
  "w","x","y","z","0","1","2","3","4","5","6",
  "7","8","9","A","B","C","D","E","F","G","H",
  "I","J","K","L","M","N","O","P","Q","R","S",
  "T","U","V","W","X","Y","Z","/","$","%","."
];

/**
 * @const {array} char list upper case only
 */
const access_salt = [
  "A","B","C","D","E","F","G","H","I","J","K",
  "L","M","N","O","P","Q","R","S","T","U","V",
  "W","X","Y","Z"
];

/**
 * string genKey
 * @description Returns random string from chars array with length
 * @var {int} length
 * @var {array} chars
 * @return {string}
 */
function genKey(length, chars) {
  if(length > 0) { 
    var rand_id = "";
    for(var i = 0; i < length; i++) {
      num = Math.floor(Math.random() * chars.length);
      rand_id += chars[num];
    }
  }
  return rand_id;
}


module.exports = {
   /**
    * string access_key
    * @description preset with 20 chars from uppercase alphabets only ;) similar to AWS ACCESS_KEY_ID
    */
   access_key: function(){
	return genKey(20, access_salt);
   },
   /**
    * string secret_key
    * @description Preset with 40 chars from secret_salt, similar to AWS_SECRET_ACCESS_KEY 
    */
   secret_key: function(){
	return genKey(40, secret_salt);
   },
   /**
    * string any_key ( length, chars )
    * @description Expose private function genKey for full flexibility
    */
   any_key:genKey
}

