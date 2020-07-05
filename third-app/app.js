
/* const path = require('path');

var pathObj = path.parse(__filename); //turns the path into an object.

console.log(pathObj); */

/* const os = require('os');

var totalMemory = os.totalmem(); // returns the total memory of the device.
var freeMemory = os.freemem(); // returns the free memory of the device. */

/* console.log(totalMemory + ' ' + freeMemory); //This is the old method to print variables and string */

/* console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`); */

const fs = require('fs');

/* const files = fs.readdirSync('./'); //Synchronous method
console.log(files); */

const files = fs.readdir('$', function(err, files) {
  if (err) console.log('error', err);
  else console.log('Result:', files);
});
