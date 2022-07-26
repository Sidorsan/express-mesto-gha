const mongoose = require('mongoose');
const validator = require('validator')
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator(v){
          return validator.isEmail(v);
        }
      },
      minlength: 2,
      maxlength: 30,
    },
    password: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    about: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('user', userSchema);
