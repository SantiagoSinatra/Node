
const http = require('http');

//Starts a Node.js server that listens for requests and handles it. In the future this will be handled by express framework.
const server = http.createServer((request, response) => {
  if(request.url === '/'){
    response.write('Hello World');
    response.end();
  }

  //Request that returns an array of objects using JSON that could represent a database (in this case is an array of numbers)
  if (request.url === '/api/courses') {
    response.write(JSON.stringify( [1, 2, 3] ));
    response.end();
  }
});

// Starts a Node.js server on port 3000 using the http Module.
/* server.on('connection', (socket) => { // Listener for emitter signal triggered by a new connection.
  console.log('New connection...');
}); */

server.listen(3000); // Listen to port 3000

console.log('Listening on port 3000...');