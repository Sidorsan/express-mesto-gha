// const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
// const { getJwtToken } = require('../middlewares/auth');
// const { isAuthorised } = require('../middlewares/auth');
const jwt = require('jsonwebtoken');
const sastErrorCode = require('../errors/sastErrorCode');
const ConflictErrorCode = require('../errors/ConflictErrorCode');
const ForbiddenErrorCode = require('../errors/ForbiddenErrorCode');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedErrorCode = require('../errors/UnauthorizedErrorCode');
const ValidationErrorCode = require('../errors/ValidationErrorCode');

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
  // if (!isAuthorised(req.headers.authorizationn)) {
  //   return res
  //     .status(UNAUTHORIZED_ERROR_CODE)
  //     .send({ message: 'Недостаточно прав' });
  // }
  return (
    User.find({})
      .then((users) => res.send(users))
      // .catch(() => {
      //   res.status(SERVER_ERROR_CODE).send({ message: 'Произошла ошибка' });
      // });
      .catch(next)
  );
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        // res
        //   .status(NOT_FOUND_ERROR_CODE)
        //   .send({ message: 'Запрашиваемый пользователь не найден' });
        // return;
        next(new NotFoundError('Нет пользователя с таким id'));
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new sastErrorCode('Некорректный ID'));
        return;
        // return res.status(CAST_ERROR_CODE).send({ message: 'Некорректный ID' });
      }
      next();
      //   return res
      //     .status(SERVER_ERROR_CODE)
      //     .send({ message: 'Произошла ошибка' });
    });
  // .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)

    .then((user) => {
      // if (!user) {
      //   next(new NotFoundError('Нет пользователя с таким id'));
      //   return;
      //   // res
      //   //   .status(NOT_FOUND_ERROR_CODE)
      //   //   .send({ message: 'Запрашиваемый пользователь не найден' });
      //   // return;
      // }
      res.status(200).send(user);
    }).catch(next)
    // .catch((err) => {
    //   if (err.name === 'CastError') {
    //     next(new sastErrorCode('Некорректный ID'));
    //     return;
    //     // return res.status(CAST_ERROR_CODE).send({ message: 'Некорректный ID' });
    //   }
    //   next();
    //   //   return res
    //   //     .status(SERVER_ERROR_CODE)
    //   //     .send({ message: 'Произошла ошибка' });
    // });
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
        // res
        //   .status(NOT_FOUND_ERROR_CODE)
        //   .send({ message: 'Запрашиваемый пользователь не найден' });
        // return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationErrorCode(err.message));
        return;
        // return res.status(VALIDATION_ERROR_CODE).send({ message: err.message });
      }
      if (err.name === 'CastError') {
        next(new sastErrorCode('Некорректный ID'));
        return;
        // return res.status(CAST_ERROR_CODE).send({ message: 'Некорректный ID' });
      }
      next();
    });
  // .catch(next);
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
        // res
        //   .status(NOT_FOUND_ERROR_CODE)
        //   .send({ message: 'Запрашиваемый пользователь не найден' });
        // return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationErrorCode(err.message));
        return;
        // return res.status(VALIDATION_ERROR_CODE).send({ message: err.message });
      }
      if (err.name === 'CastError') {
        next(new sastErrorCode('Некорректный ID'));
        return;
        // return res.status(CAST_ERROR_CODE).send({ message: 'Некорректный ID' });
      }
      next();
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new ValidationErrorCode(err.message));
    return;
    // return res
    //   .status(VALIDATION_ERROR_CODE)
    //   .send({ message: 'Email или Password не переданы' });
  }
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        next(new ForbiddenErrorCode('Такого пользователя не существует'));
        return;
        // return res
        //   .status(FORBIDDEN_ERROR_CODE)
        //   .send({ message: 'Такого пользователя не существует' });
      }
      bcrypt.compare(password, user.password, (err, isValidPassword) => {
        if (!isValidPassword) {
          next(new UnauthorizedErrorCode('Пароль не верный'));
          return;
          // return res
          //   .status(UNAUTHORIZED_ERROR_CODE)
          //   .send({ message: 'Пароль не верный' });
        }

        const token = jwt.sign({ _id: user._id }, 'some-secret-key', {
          expiresIn: '7d',
        });
        return res.status(200).send(token);
      });
    })
    // .catch(() => {
    //   return res
    //     .status(SERVER_ERROR_CODE)
    //     .send({ message: 'Произошла ошибка' });
    // });
    .catch(next);
};
