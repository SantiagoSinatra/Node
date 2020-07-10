const express = require('express'); // Require the express module for controlling HTTP Requests.
const app = express();

const FlightsAdmin = require('./flightsAdmin');
const flightsAdmin = new FlightsAdmin();

const port = process.env.PORT || 3000; // Use a port already defined in the enviornment variables or default to port 3000

app.use(express.json()); // Middleware for the request processing pipeline.
app.listen(port, () => console.log(`Listening on port ${port}...`)); // Start the server on the defined port.


//Handlers for GET requests:
app.get('/', (req, res) => {
  res.status(200).send('Welcome to Flights Administrator! Check my github for instructions on how to use it! https://github.com/SantiagoSinatra/Node');
});

app.get('/flights', (req, res) => {
  res.send(flightsAdmin.showFlightsAvailable());
});

app.get('/flights/:id', (req, res) => {

  const result = flightsAdmin.showFlight(req.params.id);

  res.status(result.status).send(result.message);
});

//Handlers for POST requests:
app.post('/flights/create', (req, res) => {
  
  const result = flightsAdmin.createFlight(req.body.airline, req.body.destination, req.body.departure, req.body.departureTime, req.body.arrivalTime);

  res.status(result.status).send(result.message);
});