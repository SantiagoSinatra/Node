
var url = 'http://mylogger.io/log';

function log(message) {
  // Send an HTTP request
  console.log(message);
}

/* module.exports.log = log; // Exports a log object that has a method called log. */
/* module.exports.endPoint = url; //Exports a endPoint object that has a single variable called url. This is not necessary to export. */

module.exports = log; //this is an alternative way to export a function (it only works if we are exporting a single function)