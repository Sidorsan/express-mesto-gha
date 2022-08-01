const User = require('../models/user');
const bcrypt = require('bcrypt');
const { getJwtToken } = require('../middlewares/auth');
const { isAuthorised } = require('../middlewares/auth');

const {
  SERVER_ERROR_CODE,
  VALIDATION_ERROR_CODE,
  CAST_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  CONFLICT_ERROR_CODE,
  FORBIDDEN_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
} = require('../errors');
// const user = require('../models/user');
const SALT_ROUNDS = 10;
module.exports.getUsers = (req, res) => {
  // if (!isAuthorised(req.headers.authorizationn)) {
  //   return res
  //     .status(UNAUTHORIZED_ERROR_CODE)
  //     .send({ message: 'Недостаточно прав' });
  // }
  return User.find({})
    .then((users) => res.send(users))
    .catch(() => {
      res.status(SERVER_ERROR_CODE).send({ message: 'Произошла ошибка' });
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: 'Запрашиваемый пользователь не найден' });
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(CAST_ERROR_CODE).send({ message: 'Некорректный ID' });
      }
      return res
        .status(SERVER_ERROR_CODE)
        .send({ message: 'Произошла ошибка' });
    });
};

module.exports.createUser = (req, res) => {
  const { email, password, name, about, avatar } = req.body;
  if (!email || !password) {
    return res
      .status(VALIDATION_ERROR_CODE)
      .send({ message: 'Email или Password не переданы' });
  }

  User.findOne({ email }).then((user) => {
    if (user) {
      return res
        .status(CONFLICT_ERROR_CODE)
        .send({ message: 'Такой пользователь уже существует' });
    }

    bcrypt.hash(password, SALT_ROUNDS).then((hash) => {
      User.create({ email, password: hash, name, about, avatar })
        .then((user) => res.status(201).send(user))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            return res
              .status(VALIDATION_ERROR_CODE)
              .send({ message: err.message });
          }
          return res
            .status(SERVER_ERROR_CODE)
            .send({ message: 'Произошла ошибка' });
        });
    });
  });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: 'Запрашиваемый пользователь не найден' });
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(VALIDATION_ERROR_CODE).send({ message: err.message });
      }
      if (err.name === 'CastError') {
        return res.status(CAST_ERROR_CODE).send({ message: 'Некорректный ID' });
      }
      return res
        .status(SERVER_ERROR_CODE)
        .send({ message: 'Произошла ошибка' });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: 'Запрашиваемый пользователь не найден' });
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(VALIDATION_ERROR_CODE).send({ message: err.message });
      }
      if (err.name === 'CastError') {
        return res.status(CAST_ERROR_CODE).send({ message: 'Некорректный ID' });
      }
      return res
        .status(SERVER_ERROR_CODE)
        .send({ message: 'Произошла ошибка' });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(VALIDATION_ERROR_CODE)
      .send({ message: 'Email или Password не переданы' });
  }
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res
          .status(FORBIDDEN_ERROR_CODE)
          .send({ message: 'Такого пользователя не существует' });
      }
      bcrypt.compare(password, user.password, (err, isValidPassword) => {
        if (!isValidPassword) {
          return res
            .status(UNAUTHORIZED_ERROR_CODE)
            .send({ message: 'Пароль не верный' });
        }

        const token = getJwtToken(User.id);

        return res.status(200).send({ token });
      });
    })
    .catch(() => {
      return res
        .status(SERVER_ERROR_CODE)
        .send({ message: 'Произошла ошибка' });
    });
};
