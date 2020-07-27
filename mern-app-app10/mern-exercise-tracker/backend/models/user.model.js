const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { //Validations for the username.
    type: String,
    required: true, //Is required.
    unique: true, //Has to be unique.
    trim: true, //Trims whitespace at the end.
    minlength: 3 //Has to have at least 3 chars.
  },
}, {
  timestamps: true, //Automatically creates the fields for when it was created and modified.
});

const User = mongoose.model('User', userSchema);

module.exports = User;