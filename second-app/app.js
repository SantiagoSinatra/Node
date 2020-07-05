
/* console.log(module); // This will print the module object and its properties */

var logger = require('./logger'); //importing the logger from 'logger.js' module

/* console.log(logger); // This will print the elements that are stored in the logger variable */

/* logger.log('message'); // When executed this will print 'message' in the console. */

logger('message'); //This is an alternative method that works when we exported a single function with the alternative method of exporting.