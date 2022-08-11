const mongoose = require('mongoose');
const validator = require('validator');

<<<<<<< HEAD
// function validateUrl (val) {
//   const regex = /^(https||http):\/\/(www\.)?([\w+\-._~:/?#[\]@!$&'()*+,;=])+$/;
//   return val === regex;
// }

const exampleRegExp = new RegExp('/^(https||http):\/\/(www\.)?([\w+\-._~:/?#[\]@!$&'()*+,;=])+$/');

=======
>>>>>>> e32f122fef9656a2b37f9402589f3048bf6ea366
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator(v) {
          return validator.isEmail(v);
        },
      },
      minlength: 2,
      maxlength: 30,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },

    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      required: true,
    },
    about: {
      type: String,
      default: 'Исследователь',
      required: true,
    },
    avatar: {
      type: String,
      default:
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      required: true,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', userSchema);
