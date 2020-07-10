const Joi = require('joi'); // Require the joi module to validate inputs.
const express = require('express'); // Require the express module
const app = express(); // Use the express module

app.use(express.json()); // Middleware for the request processing pipeline.

// Array of courses
const courses = [
  { id: 1, name: 'course1'},
  { id: 2, name: 'course2'},
  { id: 3, name: 'course3'},
  { id: 4, name: 'course4'},
];

// Handler for the / request that responds with a 'hello world' (GET)
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Handler for the /api/courses request that responds with an array of numbers (this can be used to send data from a database) (GET)
app.get('/api/courses', (req, res) => {
  res.send(courses);
});

// Handler for creating a new course via the POST method (POST)
app.post('/api/courses', (req, res) => {
  const schema = {
    name: Joi.string().min(3).required() //Joi validation check joi documentation for more information.
  }

  const result = Joi.validate(req.body, schema); // Validate the response with Joi
  /* console.log(result); */

  if (result.error) {
    res.status(400).send(result.error.details[0].message); // Respond with the error message only.
    /* res.status(400).send(result.error); */ // Respond with the error.
    return;
  }

  // Manual way to validate inputs.
  /* if (!req.body.name || req.body.name.length < 3) {
    // 400 Bad Request
    res.status(400).send('The name is required and has to be at minimum 3 characters');
    return;
  } */

  const course = {
    id: courses.length + 1, // Add 1 to the quantity of courses in the array above to get the proper ID for the new course. 
    name: req.body.name
  };
  courses.push(course);  // Push the new course object into the array.
  res.send(course); // Respond to the client with the course 'by convention'.
});

// Handler for PUT method (Used to update elements from a database or in this case from the constant); (PUT)
app.put('/api/courses/:id', (req, res) => {
  // Look up the course in the array
  const course = courses.find(c => c.id === parseInt(req.params.id));

  // If not existing, return 404
  if (!course) {
    return res.status(404).send('The course with the given id was not found.');
  }

  /* // Validate Manually
  const schema = {
    name: Joi.string().min(3).required() //Joi validation check joi documentation for more information.
  }
  const result = Joi.validate(req.body, schema); */

  // Validate using a function (defined below) this function could be used also in the HTTP Post method.
  const result = validateCourse(req.body);

  //const { error } = validateCourse(req.body); Object destructuring. 

  // If invalid, return 400 - Bad request
  if (result.error) { // If using object destructuring this line will have to change to if (error) { but I'd rather use the old way because it is more descriptive.
    res.status(400).send(result.error.details[0].message); // Respond with the error message only.
    /* res.status(400).send(result.error); */ // Respond with the error.
    return;
  }

  // Update course
  course.name = req.body.name;

  // Return the updated course
  res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
  // Look up the course
  const course = courses.find(c => c.id === parseInt(req.params.id));

  // Not existing, return 404
  if (!course) res.status(404).send('The course with the given id was not found.');

  //Delete
  const index = courses.indexOf(course);
  courses.splice(index, 1); // adds or removes the elements of an array. element to remove, quantity to remove, element to add.

  // Return the deleted course
  res.send(course);

});

// Handler with a variable parameter in the url this can be used for example to reach an specific course. (GET)
app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id)); //This looks for the course in the courses array via the course id comparing it to the (parsed to Int) String parameter that comes from the url
  if (!course) res.status(404).send('The course with the given id was not found.'); // If the course was not found then send a 404 with a message. Else send the course.
  res.send(course);
});

// Handler with two variable parameter in the url that can read query parameters. (GET)
app.get('/api/posts/:year/:month', (req, res) => {
  res.send(req.query);
});

// Environment variable that looks for the correspondent port or uses the 3000 instead.
const port = process.env.PORT || 3000;

// Start the server on the correspondent port.
app.listen(port, () => console.log(`Listening on port ${port}...`));

//function to validate courses
function validateCourse(course){
  const schema = {
    name: Joi.string().min(3).required() //Joi validation check joi documentation for more information.
  }
  return Joi.validate(course, schema);
}