const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  score: {
    type: Number,
    default: 0
  },
  completed: [
    {
      id: {
        type: String,
        required: true
      }
    }
  ]
});

mongoose.model('users', UserSchema);
