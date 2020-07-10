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

// Handler for the / request that responds with a 'hello world'
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Handler for the /api/courses request that responds with an array of numbers (this can be used to send data from a database)
app.get('/api/courses', (req, res) => {
  res.send(courses);
});

// Handler for creating a new course via the POST method
app.post('/api/courses', (req, res) => {
  const course = {
    id: courses.length + 1, // Add 1 to the quantity of courses in the array above to get the proper ID for the new course. 
    name: req.body.name
  };
  courses.push(course);  // Push the new course object into the array.
  res.send(course); // Respond to the client with the course 'by convention'.
});

// Handler with a variable parameter in the url this can be used for example to reach an specific course.
app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id)); //This looks for the course in the courses array via the course id comparing it to the (parsed to Int) String parameter that comes from the url
  if (!course) res.status(404).send('The course with the given id was not found.'); // If the course was not found then send a 404 with a message. Else send the course.
  res.send(course);
});

// Handler with two variable parameter in the url that can read query parameters. 
app.get('/api/posts/:year/:month', (req, res) => {
  res.send(req.query);
});

// Environment variable that looks for the correspondent port or uses the 3000 instead.
const port = process.env.PORT || 3000;

// Start the server on the correspondent port.
app.listen(port, () => console.log(`Listening on port ${port}...`));