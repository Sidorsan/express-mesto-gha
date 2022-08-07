const User = require('../models/user');
const bcrypt = require('bcrypt');
// const { getJwtToken } = require('../middlewares/auth');
// const { isAuthorised } = require('../middlewares/auth');
const jwt = require('jsonwebtoken');
const CastErrorCode = require('../errors/CastErrorCode');
const ConflictErrorCode = require('../errors/ConflictErrorCode');
const ForbiddenErrorCode = require('../errors/ForbiddenErrorCode');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedErrorCode = require('../errors/UnauthorizedErrorCode');
const ValidationErrorCode = require('../errors/ValidationErrorCode');
// console.log(new CastErrorCode('ewce'));
// const {
//   SERVER_ERROR_CODE,
//   VALIDATION_ERROR_CODE,
//   CAST_ERROR_CODE,
//   NOT_FOUND_ERROR_CODE,
//   CONFLICT_ERROR_CODE,
//   FORBIDDEN_ERROR_CODE,
//   UNAUTHORIZED_ERROR_CODE,
// } = require('../errors/errors');
// const { log } = require('console');
// const user = require('../models/user');
const SALT_ROUNDS = 10;

module.exports.getUsers = (req, res, next) => {
  return User.find({})
    .then((users) => res.send(users))

    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Нет пользователя с таким id'));
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastErrorCode('Некорректный ID'));
        return;
      }
      next();
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name, about, avatar } = req.body;
  if (!email || !password) {
    next(new ValidationErrorCode(err.message));
    return;
  }
  User.findOne({ email }).then((user) => {
    if (user) {
      next(new ConflictErrorCode('Такой пользователь уже существует'));
      return;
    }
  });
  bcrypt.hash(password, SALT_ROUNDS).then((hash) => {
    User.create({ email, password: hash, name, about, avatar })
      .then((user) => res.status(201).send(user))
      .catch(() => next);
  });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Нет пользователя с таким id'));
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationErrorCode(err.message));
        return;
      }
      if (err.name === 'CastError') {
        next(new CastErrorCode('Некорректный ID'));
        return;
      }
      next();
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Нет пользователя с таким id'));
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationErrorCode(err.message));
        return;
      }
      if (err.name === 'CastError') {
        next(new CastErrorCode('Некорректный ID'));
        return;
      }
      next();
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new ValidationErrorCode(err.message));
    return;
  }
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        next(new ForbiddenErrorCode('Такого пользователя не существует'));
        return;
      }
      bcrypt.compare(password, user.password, (err, isValidPassword) => {
        if (!isValidPassword) {
          next(new UnauthorizedErrorCode('Пароль не верный'));
          return;
        }

        const token = jwt.sign({ _id: user._id }, 'some-secret-key', {
          expiresIn: '7d',
        });
        return res.status(200).send(token);
      });
    })

    .catch(next);
};


