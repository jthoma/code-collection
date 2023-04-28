/**
 * <file-name> 
 * project wide configuration file
 * hardcoding database or other credentials is not recommended
 * acording to the platform best use some kind of secrets manager (eg: AWS)
 * best bet would be to use some kind which provides builtin credential rotation
 */


 /* Bare minimum the PORT, any further should be abstracted 
  * and configured 
  */

const PORT = process.env.PORT || '3000';

/** just this one now, if you need more, bring them in and enjoy! */

export {PORT};

