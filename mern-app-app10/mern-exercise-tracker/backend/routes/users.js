const router = require('express').Router(); //Use express router.
let User = require('../models/user.model'); //Use the User model.

//Handlers for GET requests.

//Users list request.
router.route('/').get((req, res) => {
  User.find() //Mongoose method that returns (a promise) the list of all the Users (in this case) that exist in the database.
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Handlers for post requests.

//User creation request.
router.route('/add').post((req,res) => {
  const username = req.body.username; //Get the value of username that comes in the body of the request.

  const newUser = new User({username}); //Create a new user using the username value. (this goes to the User model, validates the username an then creates a new instance of User)

  newUser.save() //Save the new user into the database.
    .then(() => res.json('User added successfully'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;