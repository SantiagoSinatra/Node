const Joi = require('joi');

class FlightsAdmin {

  constructor(flights) {

  // List of flights to represent a DB.
  this.flights = [
    { id: 1, airline: 'Divided Airlines', destination: 'California', departure: 'New Jersey', departureTime: '13:00', arrivalTime: '13:30'},
    { id: 2, airline: 'TotallyReliable Airlines', destination: 'Unknown', departure: 'Somewhere', departureTime: '13:00', arrivalTime: '12:99'},
    { id: 3, airline: 'Brutish Airways', destination: 'India', departure: 'China', departureTime: '13:00', arrivalTime: '14:00'},
    { id: 4, airline: 'Brutish Airways', destination: 'London', departure: 'California', departureTime: '11:00', arrivalTime: '17:30'},
    { id: 5, airline: 'Brutish Airways', destination: 'California', departure: 'New Jersey', departureTime: '13:30', arrivalTime: '15:30'},
    { id: 6, airline: 'Divided Airlines', destination: 'Miami', departure: 'California', departureTime: '15:00', arrivalTime: '19:22'},
    { id: 7, airline: 'Beta Airlines', destination: 'California', departure: 'Miami', departureTime: '13:10', arrivalTime: '13:59'},
    { id: 8, airline: 'Divided Airlines', destination: 'California', departure: 'New Jersey', departureTime: '19:00', arrivalTime: '20:30'},
    { id: 9, airline: 'TotallyReliable Airlines', destination: 'Buenos Aires', departure: 'Buenos Aires', departureTime: '13:00', arrivalTime: '22:30'},
    { id: 10, airline: 'TotallyReliable Airlines', destination: 'California', departure: 'New Jersey', departureTime: '13:00', arrivalTime: '23:30'},
    { id: 11, airline: 'Beta Airlines', destination: 'California', departure: 'Boston', departureTime: '13:00', arrivalTime: '14:30'},
    { id: 12, airline: 'Beta Airlines', destination: 'Chicago', departure: 'New Jersey', departureTime: '07:00', arrivalTime: '09:40'},
    { id: 13, airline: 'Sinatra Airlines', destination: 'California', departure: 'New York', departureTime: '13:00', arrivalTime: '13:10'},
    { id: 14, airline: 'Sinatra Airlines', destination: 'New York', departure: 'California', departureTime: '13:20', arrivalTime: '13:30'},
    { id: 15, airline: 'Sinatra Airlines', destination: 'Miami', departure: 'New York', departureTime: '09:17', arrivalTime: '09:27'},
  ];

  }
  
  showFlightsAvailable() {
    return this.flights; // Return the complete array of flights
  }

  showFlight(id) {
    
    const flight = this.searchFlight(id); // Search for a specific flight via the id using the function defined below.

    const res = { // Create an object that will be the response of this method.
      status: '',
      message: ''
    }

    if(!flight) { // Check if the flight exists in the array.

      // Respond with an error message and a not found status.
      res.status = 404;
      res.message = "We are sorry but your flight doesn't seem to exist. Please try again later."

      return res;
    } else {

      // Respond with the flight in the message and an ok status.
      res.status = 200;
      res.message = flight;

      return res;
    }

  }

  createFlight(airline, destination, departure, departureTime, arrivalTime) {
    // Create a response
    const res = {
      status: '',
      message: '',
    }

    // Grab the data collected from the request and create a new flight
    const newFlight = {
      airline: airline,
      destination: destination,
      departure: departure,
      departureTime: departureTime,
      arrivalTime: arrivalTime,
    }

    // Validate the flight using the joi validateFlight function created below
    const result = this.validateFlight(newFlight);

    // If the flight has errors, respond with 400 and the errors.
    if(result.error){

      res.status = 400;
      res.message = result.error.details[0].message;

      return res;
    } else {
      
    // else return message with the flight.

      newFlight.id = this.flights.length + 1;
      this.flights.push(newFlight);

      res.status = 201;
      res.message = newFlight;

      return res;
    }
  }

  modifyFlight(id, airline, destination, departure, departureTime, arrivalTime) {
    const flight = this.searchFlight(id); // Search for the flight to modify using the function below.
    const res = {
      status: '',
      message: ''
    }

    if(!flight) {
      res.status = 404
      res.message = 'The flight you selected to change does not exist. Please try again later.'

      return res;
    } else {
      // create a new flight to validate user input using the already created function.
      const userFlightInput = { id: id, airline: airline, destination: destination, departure: departure, departureTime: departureTime, arrivalTime: arrivalTime}

      const validation = this.validateFlight(userFlightInput);
      if(validation.error) {
        res.status = 400,
        res.message = validation.error.details[0].message;

        return res;
      } else {
        // Modify the flight properties.
        flight.airline = airline;
        flight.destination = destination;
        flight.departure = departure;
        flight.departureTime = departureTime;
        flight.arrivalTime = arrivalTime;

        res.status = 200;
        res.message = flight;
        
        return res;
      }

    }
  }

  deleteFlight(id){
    const flight = this.searchFlight(id);
    const res = {
      status: '',
      message: ''
    }

    if(!flight) {
      res.status = 404;
      res.message = 'The flight you selected to delete does not exist. Please try again later.';

      return res;
    } else {
      const flightToDelete = this.flights.indexOf(flight);
      this.flights.splice(flightToDelete, 1);

      res.status = 200;
      res.message = flight;

      return res;
    }
  }

  searchFlight(id){
    return this.flights.find(f => f.id === parseInt(id)); //find the flight with the String parsed to Int id by comparing it to the flights id of the array.
  }

  validateFlight(flight) { // Method that validates the flight using Joi library.
    const schema = {
      id: Joi.number().integer(),
      airline: Joi.string().min(5).required(),
      destination: Joi.string().min(5).required(),
      departure: Joi.string().min(5).required(),
      departureTime: Joi.number().integer().min(0).max(2359),
      arrivalTime: Joi.number().integer().min(0).max(2359),
    }
    return Joi.validate(flight, schema);
  }

}

module.exports = FlightsAdmin;
