const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  username: { //Validations for the username.
    type: String,
    required: true //Is required.
   },

  description: { //Validations for the description.
    type: String,
    required: true //Is required.
  },

  duration: { //Validations for the duration.
    type: Number,
    required: true //Is required.
  },

  date: { //Validations for the date.
    type: Date,
    required: true //Is required.
  },
  
}, {
  timestamps: true, //Automatically creates the fields for when it was created and modified.
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;